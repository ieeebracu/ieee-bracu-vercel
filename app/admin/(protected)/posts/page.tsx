"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface PostItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  publishedAt: number;
  modifiedAt: number;
  chapterId: number | null;
  chapterName: string | null;
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

function resolveMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.includes("{{IMAGE_BASE_URL}}")) {
    return url.replace(/\{\{IMAGE_BASE_URL\}\}/g, "/api/media");
  }
  const clean = url.replace(/^\/+/, "");
  if (clean.startsWith("api/media/")) {
    return `/${clean}`;
  }
  return `/api/media/${clean}`;
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Debounce search input to avoid querying on every keystroke
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 350);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchPosts = async (page: number, limit: number, search: string) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      if (search.trim()) {
        params.set("search", search.trim());
      }
      const res = await fetch(`/api/admin/posts?${params.toString()}`);
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as any;
        throw new Error(body.error || `Failed to load posts (${res.status})`);
      }
      const data = (await res.json()) as any;
      setPosts(data.posts || []);
      if (data.pagination) {
        setPagination(data.pagination);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch when page, limit, or debounced search changes
  useEffect(() => {
    void fetchPosts(pagination.page, pagination.limit, debouncedSearch);
  }, [pagination.page, pagination.limit, debouncedSearch]);

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleDelete = async (post: PostItem) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the post "${post.title}"? This action cannot be undone.`
    );
    if (!confirmDelete) return;

    setDeletingId(post.id);
    try {
      const res = await fetch(`/api/admin/posts/${post.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as any;
        throw new Error(body.error || "Failed to delete post");
      }
      // Re-fetch current page or step back if last item on page deleted
      const targetPage = posts.length === 1 && pagination.page > 1 ? pagination.page - 1 : pagination.page;
      void fetchPosts(targetPage, pagination.limit, debouncedSearch);
    } catch (err: any) {
      alert(err?.message || "Error deleting post");
    } finally {
      setDeletingId(null);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages || newPage === pagination.page) return;
    setPagination((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLimitChange = (newLimit: number) => {
    setPagination((prev) => ({ ...prev, limit: newLimit, page: 1 }));
  };

  const startCount = pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1;
  const endCount = Math.min(pagination.page * pagination.limit, pagination.total);

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20 font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-[#E3DFD5] bg-white/95 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#E3DFD5] bg-[#F5F3EE] px-3 py-1.5 text-xs font-semibold text-[#191B1E] transition-colors hover:bg-[#EAE6DD]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Admin Dashboard
            </Link>
            <span className="text-zinc-300">/</span>
            <h1 className="text-sm font-semibold text-[#191B1E]">Manage Posts</h1>
          </div>

          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 rounded-lg bg-[#00629B] px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#004E7C]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Create New Post
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pt-8">
        {/* Search & Filter Bar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#191B1E]">All Posts</h2>
            <p className="mt-0.5 text-xs text-[#6E7178]">
              {pagination.total > 0
                ? `Showing ${startCount}–${endCount} of ${pagination.total} posts`
                : "Manage and edit your posts"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search by title or slug..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full rounded-xl border border-[#E3DFD5] bg-white py-2 pl-9 pr-4 text-xs text-[#191B1E] placeholder:text-zinc-400 focus:border-[#00629B] focus:outline-none focus:ring-2 focus:ring-[#00629B]/10"
              />
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="absolute left-3 top-2.5 text-zinc-400"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              {searchTerm && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="absolute right-3 top-2.5 text-xs text-zinc-400 hover:text-zinc-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Per-page Selector */}
            <select
              value={pagination.limit}
              onChange={(e) => handleLimitChange(Number(e.target.value))}
              aria-label="Posts per page"
              className="rounded-xl border border-[#E3DFD5] bg-white px-2.5 py-2 text-xs font-medium text-[#191B1E] focus:border-[#00629B] focus:outline-none"
            >
              <option value={10}>10 / page</option>
              <option value={20}>20 / page</option>
              <option value={50}>50 / page</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20 text-zinc-400">
            <svg className="h-6 w-6 animate-spin text-[#00629B]" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
              <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" className="opacity-75" />
            </svg>
            <span className="ml-3 text-sm font-medium text-zinc-600">Loading posts...</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#E3DFD5] bg-white p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-zinc-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <h3 className="mt-3 text-base font-semibold text-[#191B1E]">No posts found</h3>
            <p className="mt-1 text-xs text-[#6E7178]">
              {searchTerm ? "No posts matched your search." : "You haven't created any posts yet."}
            </p>
            {searchTerm ? (
              <button
                onClick={() => handleSearchChange("")}
                className="mt-4 text-xs font-semibold text-[#00629B] hover:underline"
              >
                Clear search filter
              </button>
            ) : (
              <Link
                href="/admin/posts/new"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#00629B] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#004E7C]"
              >
                Create your first post
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-[#E3DFD5] bg-white shadow-xs">
            <div className="divide-y divide-[#E3DFD5]">
              {posts.map((post) => {
                const isDeleting = deletingId === post.id;
                const pubDate = new Date(
                  post.publishedAt > 1e11 ? post.publishedAt : post.publishedAt * 1000
                );
                const formattedDate = pubDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });
                const hasCustomTime =
                  pubDate.getHours() !== 0 || pubDate.getMinutes() !== 0;
                const formattedTime = hasCustomTime
                  ? pubDate.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : null;

                return (
                  <div
                    key={post.id}
                    className="flex flex-col gap-4 p-5 transition-colors hover:bg-[#FBFAF7] sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-start gap-4">
                      {/* Cover Thumbnail */}
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-[#E3DFD5] bg-[#F5F3EE]">
                        {post.featuredImage ? (
                          <img
                            src={resolveMediaUrl(post.featuredImage) || ""}
                            alt=""
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-zinc-400">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <rect x="3" y="3" width="18" height="18" rx="2" />
                              <circle cx="8.5" cy="8.5" r="1.5" />
                              <path d="M21 15l-5-5L5 21" />
                            </svg>
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Link
                            href={`/admin/posts/${post.id}/edit`}
                            className="text-base font-bold text-[#191B1E] hover:text-[#00629B]"
                          >
                            {post.title}
                          </Link>
                          {post.chapterName && (
                            <span className="rounded-md bg-[#F5F3EE] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#6E7178]">
                              {post.chapterName}
                            </span>
                          )}
                        </div>

                        <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-[#6E7178]">
                          <span className="font-mono text-[11px] text-zinc-500">
                            /news/{post.slug}
                          </span>
                          <span>•</span>
                          <span>
                            Published {formattedDate}
                            {formattedTime && (
                              <span className="text-zinc-500"> at {formattedTime}</span>
                            )}
                          </span>
                        </div>

                        {post.excerpt && (
                          <p className="mt-1.5 line-clamp-1 text-xs text-[#6E7178]">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex shrink-0 items-center gap-2 self-end sm:self-center">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#E3DFD5] bg-white px-3 py-1.5 text-xs font-semibold text-[#191B1E] transition-colors hover:border-[#00629B] hover:text-[#00629B]"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        <span>Edit</span>
                      </Link>

                      <a
                        href={`/news/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#E3DFD5] bg-white px-3 py-1.5 text-xs font-semibold text-[#6E7178] transition-colors hover:text-[#191B1E]"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>View</span>
                      </a>

                      <button
                        onClick={() => handleDelete(post)}
                        disabled={isDeleting}
                        aria-label="Delete post"
                        className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 p-1.5 text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50 cursor-pointer"
                      >
                        {isDeleting ? (
                          <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                            <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" className="opacity-75" />
                          </svg>
                        ) : (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls Footer */}
            {pagination.totalPages > 1 && (
              <div className="flex flex-col items-center justify-between gap-4 border-t border-[#E3DFD5] bg-[#FBFAF7] px-6 py-4 sm:flex-row">
                <span className="text-xs text-[#6E7178]">
                  Page <strong className="text-[#191B1E]">{pagination.page}</strong> of{" "}
                  <strong className="text-[#191B1E]">{pagination.totalPages}</strong> (
                  {pagination.total} total posts)
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={!pagination.hasPrev}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#E3DFD5] bg-white px-3 py-1.5 text-xs font-semibold text-[#191B1E] transition-colors hover:bg-[#F5F3EE] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                    Previous
                  </button>

                  {/* Page numbers */}
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                    .filter((p) => {
                      // Show first, last, and pages adjacent to current page
                      return (
                        p === 1 ||
                        p === pagination.totalPages ||
                        Math.abs(p - pagination.page) <= 1
                      );
                    })
                    .map((p, idx, arr) => {
                      const prevPageNum = arr[idx - 1];
                      const showEllipsis = prevPageNum && p - prevPageNum > 1;

                      return (
                        <span key={p} className="flex items-center">
                          {showEllipsis && (
                            <span className="px-1 text-xs text-zinc-400">…</span>
                          )}
                          <button
                            onClick={() => handlePageChange(p)}
                            className={`h-8 w-8 rounded-lg text-xs font-semibold transition-colors ${
                              pagination.page === p
                                ? "bg-[#00629B] text-white"
                                : "border border-[#E3DFD5] bg-white text-[#191B1E] hover:bg-[#F5F3EE]"
                            }`}
                          >
                            {p}
                          </button>
                        </span>
                      );
                    })}

                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={!pagination.hasNext}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#E3DFD5] bg-white px-3 py-1.5 text-xs font-semibold text-[#191B1E] transition-colors hover:bg-[#F5F3EE] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
