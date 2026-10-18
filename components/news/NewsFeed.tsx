"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useRef, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export interface FormattedNewsItem {
  id: number;
  slug: string;
  image: string | null;
  tag: string;
  chapter: string;
  date: string;
  title: string;
  excerpt: string;
}

interface NewsFeedProps {
  posts: FormattedNewsItem[];
}

const FIRST_PAGE_GRID_COUNT = 9;
const SUBSEQUENT_PAGE_GRID_COUNT = 9;

function NewsFeedContent({ posts }: NewsFeedProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const pageParam = searchParams.get("page");
  const filterParam = searchParams.get("filter");
  const queryParam = searchParams.get("q");

  const initialPage = pageParam ? Math.max(1, parseInt(pageParam, 10) || 1) : 1;
  const initialFilter = filterParam || "All";
  const initialSearch = queryParam || "";

  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const feedRef = useRef<HTMLDivElement>(null);

  // Sync state whenever URL search params change (e.g. browser back/forward)
  useEffect(() => {
    const p = searchParams.get("page");
    const newPage = p ? Math.max(1, parseInt(p, 10) || 1) : 1;
    setCurrentPage(newPage);

    const f = searchParams.get("filter") || "All";
    setActiveFilter(f);

    const q = searchParams.get("q") || "";
    setSearchQuery(q);

    try {
      sessionStorage.setItem("last_news_page", String(newPage));
      sessionStorage.setItem("last_news_filter", f);
      sessionStorage.setItem("last_news_search", q);
    } catch {}
  }, [searchParams]);

  // Synchronize state changes to URL query string & sessionStorage
  const updateUrl = useCallback(
    (newPage: number, newFilter: string, newSearch: string, replace = false) => {
      const params = new URLSearchParams();
      if (newPage > 1) {
        params.set("page", String(newPage));
      }
      if (newFilter && newFilter !== "All") {
        params.set("filter", newFilter);
      }
      if (newSearch && newSearch.trim()) {
        params.set("q", newSearch.trim());
      }

      try {
        sessionStorage.setItem("last_news_page", String(newPage));
        sessionStorage.setItem("last_news_filter", newFilter);
        sessionStorage.setItem("last_news_search", newSearch);
      } catch {}

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

      if (replace) {
        router.replace(newUrl, { scroll: false });
      } else {
        router.push(newUrl, { scroll: false });
      }
    },
    [pathname, router]
  );

  // Dynamically compute available filter tabs (All + Chapters / Categories present in posts)
  const filterTabs = useMemo(() => {
    const defaultTabs = ["All"];
    const uniqueChapters = Array.from(
      new Set(posts.map((p) => p.chapter).filter(Boolean))
    );
    const uniqueTags = Array.from(
      new Set(posts.map((p) => p.tag).filter((t) => t && t !== "General" && t !== "News"))
    );

    const merged = Array.from(new Set([...defaultTabs, ...uniqueChapters, ...uniqueTags]));
    return merged.slice(0, 8); // Keep top row clean
  }, [posts]);

  // Filter posts based on activeFilter and searchQuery
  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesFilter =
        activeFilter === "All" ||
        p.chapter?.toLowerCase() === activeFilter.toLowerCase() ||
        p.tag?.toLowerCase() === activeFilter.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.chapter?.toLowerCase().includes(q) ||
        p.tag?.toLowerCase().includes(q);

      return matchesFilter && matchesSearch;
    });
  }, [posts, activeFilter, searchQuery]);

  // Total pages calculation
  const totalPages = useMemo(() => {
    if (filtered.length === 0) return 0;
    if (filtered.length <= 1 + FIRST_PAGE_GRID_COUNT) return 1;
    const remaining = filtered.length - (1 + FIRST_PAGE_GRID_COUNT);
    return 1 + Math.ceil(remaining / SUBSEQUENT_PAGE_GRID_COUNT);
  }, [filtered.length]);

  // Ensure current page is valid when filtered list changes
  const activePage = Math.min(Math.max(1, currentPage), Math.max(1, totalPages));

  // Determine current page items
  const { featured, gridPosts, startItemIndex, endItemIndex } = useMemo(() => {
    if (filtered.length === 0) {
      return {
        featured: null,
        gridPosts: [],
        startItemIndex: 0,
        endItemIndex: 0,
      };
    }

    if (activePage === 1) {
      const feat = filtered[0];
      const rest = filtered.slice(1, 1 + FIRST_PAGE_GRID_COUNT);
      return {
        featured: feat,
        gridPosts: rest,
        startItemIndex: 1,
        endItemIndex: Math.min(filtered.length, 1 + FIRST_PAGE_GRID_COUNT),
      };
    }

    const start = 1 + FIRST_PAGE_GRID_COUNT + (activePage - 2) * SUBSEQUENT_PAGE_GRID_COUNT;
    const end = start + SUBSEQUENT_PAGE_GRID_COUNT;
    const items = filtered.slice(start, end);

    return {
      featured: null,
      gridPosts: items,
      startItemIndex: start + 1,
      endItemIndex: Math.min(filtered.length, end),
    };
  }, [filtered, activePage]);

  // Page switcher with smooth scroll
  const goToPage = (page: number) => {
    setCurrentPage(page);
    updateUrl(page, activeFilter, searchQuery, false);
    if (feedRef.current) {
      feedRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleFilterChange = (tab: string) => {
    setActiveFilter(tab);
    setCurrentPage(1);
    updateUrl(1, tab, searchQuery, false);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
    updateUrl(1, activeFilter, val, true);
  };

  // Generate numbered pages with ellipsis
  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (activePage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (activePage >= totalPages - 2) {
      return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "...", activePage - 1, activePage, activePage + 1, "...", totalPages];
  }, [totalPages, activePage]);

  return (
    <div ref={feedRef} className="font-sans">
      {/* Filters & Search Bar Strip */}
      <div className="border-b border-[#E3DFD5] bg-[#F5F3EE]">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-4 px-8 py-4 md:flex-row md:items-center md:justify-between">
          {/* Tag / Category Pills */}
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((t) => (
              <button
                key={t}
                onClick={() => handleFilterChange(t)}
                className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all cursor-pointer ${
                  activeFilter === t
                    ? "bg-[#0A2540] text-white shadow-xs"
                    : "border border-[#E3DFD5] bg-white text-[#6E7178] hover:border-[#00629B]/30 hover:text-[#191B1E]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-[280px]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B0B4B9]"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full rounded-xl border border-[#E3DFD5] bg-white py-2.5 pl-10 pr-4 text-[13.5px] text-[#191B1E] placeholder:text-[#B0B4B9] focus:border-[#00629B]/40 focus:outline-none focus:ring-2 focus:ring-[#00629B]/10"
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-[1320px] px-8 py-12">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E3DFD5] bg-white px-6 py-20 text-center shadow-xs">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF1F6] text-[#00629B]">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18 14h-8M15 18h-5M10 6h8v4h-8V6z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="m-0 font-serif text-[18px] font-bold text-[#191B1E]">No news available</h3>
            <p className="mt-2 max-w-md text-[14px] text-[#6E7178]">
              There are currently no news articles or announcements published. Please check back soon!
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E3DFD5] bg-white px-6 py-20 text-center shadow-xs">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5F3EE] text-[#6E7178]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="m-0 font-serif text-[17px] font-bold text-[#191B1E]">
              No posts found
            </h3>
            <p className="mt-1.5 text-[14px] text-[#6E7178]">
              No articles match{searchQuery ? ` "${searchQuery}"` : ""}{activeFilter !== "All" ? ` in ${activeFilter}` : ""}.
            </p>
            <button
              onClick={() => {
                setActiveFilter("All");
                setSearchQuery("");
                setCurrentPage(1);
              }}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-[#E3DFD5] bg-white px-4 py-2 text-[13px] font-semibold text-[#00629B] transition-colors hover:bg-[#F5F3EE] cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {/* Featured Top Card (Page 1 highlight) */}
            {featured && (
              <Link
                href={`/news/${featured.slug}`}
                prefetch={true}
                className="group mb-12 grid grid-cols-1 overflow-hidden rounded-2xl border border-[#E3DFD5] bg-white transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(0,98,155,0.08)] lg:grid-cols-2 cursor-pointer"
              >
                <div className="relative h-[280px] overflow-hidden lg:h-auto lg:min-h-[380px] bg-[#0A2540]">
                  {featured.image ? (
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#00629B] to-[#0A2540] p-8 text-white">
                      <span className="font-serif text-3xl font-bold opacity-30">IEEE BRACU</span>
                    </div>
                  )}
                  <div
                    className="absolute inset-0 lg:hidden"
                    style={{ background: "linear-gradient(0deg, rgba(10,37,64,.3), transparent 50%)" }}
                  />
                </div>

                <div className="flex flex-col justify-center p-8 lg:p-10">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="rounded-md bg-[#EAF1F6] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#00629B]">
                      {featured.tag}
                    </span>
                    <span className="rounded-md bg-[#F5F3EE] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#6E7178]">
                      {featured.chapter}
                    </span>
                    <span className="text-[12px] text-[#B0B4B9]">{featured.date}</span>
                  </div>
                  <h2 className="m-0 mb-4 font-serif text-[clamp(22px,2.5vw,30px)] font-bold leading-[1.2] tracking-[-0.01em] text-[#191B1E] group-hover:text-[#00629B] transition-colors">
                    {featured.title}
                  </h2>
                  <p className="m-0 mb-6 text-[15px] leading-[1.65] text-[#6E7178]">
                    {featured.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#0A2540] transition-colors group-hover:text-[#00629B]">
                    Read full article
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                      <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            )}

            {/* Grid of Remaining Cards */}
            {gridPosts.length > 0 && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {gridPosts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/news/${p.slug}`}
                    prefetch={true}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-[#E3DFD5] bg-white transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(0,98,155,0.07)] cursor-pointer"
                  >
                    <div className="relative h-[200px] overflow-hidden bg-[#0A2540]">
                      {p.image ? (
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#00629B] to-[#0A2540] text-white">
                          <span className="font-serif text-xl font-bold opacity-30">IEEE BRACU</span>
                        </div>
                      )}
                      <div
                        className="absolute inset-0"
                        style={{ background: "linear-gradient(0deg, rgba(10,37,64,.3), transparent 50%)" }}
                      />
                      <span className="absolute left-4 top-4 rounded-md bg-white/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#00629B] backdrop-blur-xs">
                        {p.tag}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-2 flex items-center gap-2.5">
                        <span className="rounded bg-[#F5F3EE] px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[#6E7178]">
                          {p.chapter}
                        </span>
                        <span className="text-[11px] text-[#B0B4B9]">{p.date}</span>
                      </div>
                      <h3 className="m-0 mb-3 font-serif text-[17px] font-bold leading-[1.3] tracking-[-0.01em] text-[#191B1E] group-hover:text-[#00629B] transition-colors">
                        {p.title}
                      </h3>
                      <p className="m-0 text-[13.5px] leading-[1.6] text-[#6E7178]">
                        {p.excerpt && p.excerpt.length > 120
                          ? p.excerpt.slice(0, 120) + "..."
                          : p.excerpt}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[12.5px] font-semibold text-[#0A2540] transition-colors group-hover:text-[#00629B]">
                        Read more
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        >
                          <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[#E3DFD5] pt-8 sm:flex-row">
                <p className="m-0 text-[13.5px] text-[#6E7178]">
                  Showing <span className="font-semibold text-[#191B1E]">{startItemIndex}</span> to{" "}
                  <span className="font-semibold text-[#191B1E]">{endItemIndex}</span> of{" "}
                  <span className="font-semibold text-[#191B1E]">{filtered.length}</span> articles
                </p>

                <nav aria-label="Pagination Navigation" className="flex items-center gap-1.5">
                  {/* Previous Button */}
                  <button
                    onClick={() => goToPage(activePage - 1)}
                    disabled={activePage === 1}
                    className="inline-flex h-9 items-center gap-1 rounded-lg border border-[#E3DFD5] bg-white px-3 text-[13px] font-medium text-[#191B1E] transition-all hover:border-[#00629B]/40 hover:bg-[#F5F3EE] hover:text-[#00629B] disabled:pointer-events-none disabled:opacity-40 cursor-pointer"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  {/* Page Numbers */}
                  {pageNumbers.map((page, idx) => {
                    if (page === "...") {
                      return (
                        <span key={`ellipsis-${idx}`} className="px-2 text-[13px] text-[#9A9E9F]">
                          &hellip;
                        </span>
                      );
                    }
                    const isCurrent = page === activePage;
                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page as number)}
                        className={`flex h-9 min-w-[36px] items-center justify-center rounded-lg px-2 text-[13.5px] font-semibold transition-all cursor-pointer ${
                          isCurrent
                            ? "bg-[#00629B] text-white shadow-xs"
                            : "border border-[#E3DFD5] bg-white text-[#4A4E54] hover:border-[#00629B]/40 hover:bg-[#F5F3EE] hover:text-[#00629B]"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  {/* Next Button */}
                  <button
                    onClick={() => goToPage(activePage + 1)}
                    disabled={activePage === totalPages}
                    className="inline-flex h-9 items-center gap-1 rounded-lg border border-[#E3DFD5] bg-white px-3 text-[13px] font-medium text-[#191B1E] transition-all hover:border-[#00629B]/40 hover:bg-[#F5F3EE] hover:text-[#00629B] disabled:pointer-events-none disabled:opacity-40 cursor-pointer"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export function NewsFeed(props: NewsFeedProps) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[1320px] px-8 py-20 text-center text-[#6E7178]">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-[#00629B] border-t-transparent" />
          <p className="mt-3 text-[14px]">Loading news feed...</p>
        </div>
      }
    >
      <NewsFeedContent {...props} />
    </Suspense>
  );
}

