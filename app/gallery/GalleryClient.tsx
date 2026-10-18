"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";

export interface GalleryPhotoItem {
  id: string;
  title: string;
  description: string;
  category: string;
  year: string;
  imageKey: string;
  imageUrl: string;
  aspect: "wide" | "tall" | "square";
  createdAt: number;
}

interface GalleryClientProps {
  initialPhotos: GalleryPhotoItem[];
  initialTotal: number;
  initialHasMore: boolean;
  availableYears: string[];
  availableCategories: string[];
}

export function GalleryClient({
  initialPhotos,
  initialTotal,
  initialHasMore,
  availableYears,
  availableCategories,
}: GalleryClientProps) {
  const [photos, setPhotos] = useState<GalleryPhotoItem[]>(initialPhotos);
  const [totalCount, setTotalCount] = useState<number>(initialTotal);
  const [hasMore, setHasMore] = useState<boolean>(initialHasMore);
  const [page, setPage] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [isFilterLoading, setIsFilterLoading] = useState<boolean>(false);

  // Filter state
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  // Lightbox state
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImageLoaded, setModalImageLoaded] = useState(false);

  // Sentinel ref for infinite scroll
  const observerTarget = useRef<HTMLDivElement | null>(null);
  const isInitialMount = useRef(true);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Refetch when filters or search change
  const fetchFilteredPhotos = useCallback(async () => {
    setIsFilterLoading(true);
    setActivePhotoIndex(null);
    try {
      const params = new URLSearchParams({
        page: "1",
        limit: "12",
        year: selectedYear,
        category: selectedCategory,
      });
      if (debouncedSearch.trim()) {
        params.set("q", debouncedSearch.trim());
      }

      const res = await fetch(`/api/gallery?${params.toString()}`);
      if (res.ok) {
        const data = (await res.json()) as {
          items?: GalleryPhotoItem[];
          total?: number;
          hasMore?: boolean;
        };
        setPhotos(data.items || []);
        setTotalCount(data.total || 0);
        setHasMore(data.hasMore ?? false);
        setPage(1);
      }
    } catch (err) {
      console.error("Failed to filter gallery photos:", err);
    } finally {
      setIsFilterLoading(false);
    }
  }, [selectedYear, selectedCategory, debouncedSearch]);

  // Trigger filter fetch only after initial mount
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    fetchFilteredPhotos();
  }, [fetchFilteredPhotos]);

  // Load next chunk on scroll
  const loadNextPage = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);

    const nextPage = page + 1;
    try {
      const params = new URLSearchParams({
        page: String(nextPage),
        limit: "12",
        year: selectedYear,
        category: selectedCategory,
      });
      if (debouncedSearch.trim()) {
        params.set("q", debouncedSearch.trim());
      }

      const res = await fetch(`/api/gallery?${params.toString()}`);
      if (res.ok) {
        const data = (await res.json()) as {
          items?: GalleryPhotoItem[];
          total?: number;
          hasMore?: boolean;
        };
        const newItems: GalleryPhotoItem[] = data.items || [];
        setPhotos((prev) => {
          // Deduplicate by ID
          const existingIds = new Set(prev.map((p) => p.id));
          const uniqueNew = newItems.filter((p) => !existingIds.has(p.id));
          return [...prev, ...uniqueNew];
        });
        setPage(nextPage);
        setHasMore(data.hasMore ?? false);
        setTotalCount(data.total ?? 0);
      }
    } catch (err) {
      console.error("Failed to load more photos:", err);
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, hasMore, page, selectedYear, selectedCategory, debouncedSearch]);

  // IntersectionObserver for gradual infinite scroll
  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore && !isFilterLoading) {
          loadNextPage();
        }
      },
      {
        rootMargin: "300px", // Trigger early before reaching the very bottom
        threshold: 0.1,
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, isFilterLoading, loadNextPage]);

  // Current active photo in lightbox
  const currentPhoto: GalleryPhotoItem | undefined =
    activePhotoIndex !== null ? photos[activePhotoIndex] : undefined;

  const openLightbox = useCallback((index: number) => {
    setActivePhotoIndex(index);
    setModalImageLoaded(false);
    requestAnimationFrame(() => {
      setModalVisible(true);
    });
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setModalVisible(false);
    setTimeout(() => {
      setActivePhotoIndex(null);
    }, 220);
  }, []);

  const handlePrevPhoto = useCallback(() => {
    if (activePhotoIndex === null) return;
    setModalImageLoaded(false);
    setActivePhotoIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : photos.length - 1
    );
  }, [activePhotoIndex, photos.length]);

  const handleNextPhoto = useCallback(() => {
    if (activePhotoIndex === null) return;
    setModalImageLoaded(false);
    setActivePhotoIndex((prev) =>
      prev !== null && prev < photos.length - 1 ? prev + 1 : 0
    );
  }, [activePhotoIndex, photos.length]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (activePhotoIndex === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseLightbox();
      } else if (e.key === "ArrowLeft") {
        handlePrevPhoto();
      } else if (e.key === "ArrowRight") {
        handleNextPhoto();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePhotoIndex, handleCloseLightbox, handlePrevPhoto, handleNextPhoto]);

  return (
    <div className="min-h-screen bg-[#F5F3EE] py-6 sm:py-8 font-sans">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        {/* Header Section: Compact & Minimal */}
        <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="m-0 font-serif text-[22px] sm:text-[26px] font-bold tracking-tight text-[#191B1E]">
                Photo Gallery
              </h1>
              <span className="rounded-full border border-[#E3DFD5] bg-white px-2.5 py-0.5 text-[11.5px] font-medium text-[#6E7178]">
                {totalCount} {totalCount === 1 ? "photo" : "photos"}
              </span>
            </div>
            <p className="mt-1 text-[13px] text-[#6E7178]">
              Moments, workshops, ceremonies, and industrial tours across IEEE BRAC University Student Branch.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-[220px] shrink-0">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B0B4B9]"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search gallery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-[#E3DFD5] bg-white py-1.5 pl-8 pr-3 text-[12px] text-[#191B1E] placeholder:text-[#B0B4B9] focus:border-[#00629B]/40 focus:outline-none focus:ring-1 focus:ring-[#00629B]/20"
            />
          </div>
        </div>

        {/* Minimal Integrated Filter Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2.5 border-y border-[#E3DFD5] py-2">
          {/* Year pills */}
          <div className="flex flex-wrap items-center gap-1">
            <span className="mr-1 text-[11.5px] font-semibold uppercase tracking-wider text-[#6E7178]">
              Year:
            </span>
            {availableYears.map((year) => {
              const isActive = selectedYear === year;
              return (
                <button
                  key={year}
                  type="button"
                  onClick={() => setSelectedYear(year)}
                  className={`cursor-pointer rounded-full px-2.5 py-0.5 text-[11.5px] font-medium transition-all ${
                    isActive
                      ? "bg-[#0A2540] text-white shadow-xs"
                      : "text-[#6E7178] hover:bg-[#EAE6DD] hover:text-[#191B1E]"
                  }`}
                >
                  {year}
                </button>
              );
            })}
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-[11.5px] font-semibold uppercase tracking-wider text-[#6E7178]">
              Category:
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="cursor-pointer rounded-md border border-[#E3DFD5] bg-white px-2.5 py-1 text-[12px] font-medium text-[#191B1E] focus:border-[#00629B]/40 focus:outline-none"
            >
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Loading Indicator */}
        {isFilterLoading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#00629B] border-t-transparent" />
            <span className="mt-3 text-xs text-[#6E7178]">Updating gallery...</span>
          </div>
        ) : photos.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl border border-[#E3DFD5] bg-white px-6 py-20 text-center shadow-xs">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF1F6] text-[#00629B]">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            {selectedYear !== "All" || selectedCategory !== "All" || debouncedSearch.trim() !== "" ? (
              <>
                <h3 className="m-0 font-serif text-[17px] font-bold text-[#191B1E]">
                  No images match your search
                </h3>
                <p className="mt-1.5 text-[14px] text-[#6E7178]">
                  We couldn&apos;t find any photos matching your current filter criteria.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedYear("All");
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-[#E3DFD5] bg-white px-4 py-2 text-[13px] font-semibold text-[#00629B] transition-colors hover:bg-[#F5F3EE] cursor-pointer"
                >
                  Reset all filters
                </button>
              </>
            ) : (
              <>
                <h3 className="m-0 font-serif text-[18px] font-bold text-[#191B1E]">
                  No images available
                </h3>
                <p className="mx-auto mt-1.5 max-w-md text-[14px] text-[#6E7178]">
                  There are currently no photos in the branch gallery archive. Please check back later!
                </p>
              </>
            )}
          </div>
        ) : (
          /* Masonry Grid */
          <>
            <div className="[column-gap:18px] sm:columns-2 lg:columns-3 xl:columns-4">
              {photos.map((photo, index) => {
                const heightClass =
                  photo.aspect === "tall"
                    ? "h-[360px]"
                    : photo.aspect === "square"
                    ? "h-[270px]"
                    : "h-[210px]";

                return (
                  <div
                    key={photo.id}
                    onClick={() => openLightbox(index)}
                    style={{ contain: "paint layout" }}
                    className="group relative mb-4.5 break-inside-avoid cursor-pointer overflow-hidden rounded-2xl border border-[#E3DFD5] bg-[#EAE6DD] shadow-xs transition-transform duration-200 ease-out hover:-translate-y-1 active:scale-[0.97] hover:border-[#00629B]/40 hover:shadow-md transform-gpu backface-hidden will-change-transform select-none"
                  >
                    <div className={`relative w-full ${heightClass}`}>
                      <Image
                        src={photo.imageUrl}
                        alt={photo.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        loading={index < 4 ? "eager" : "lazy"}
                        decoding="async"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 transform-gpu backface-hidden"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/90 via-[#0A2540]/25 to-transparent opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100" />

                      {/* Year Badge */}
                      <div className="absolute left-3 top-3 rounded-md bg-black/60 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur">
                        {photo.year}
                      </div>

                      {/* Category Tag (Top Right on Hover) */}
                      <div className="absolute right-3 top-3 rounded-md bg-[#00629B]/90 px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wider text-white backdrop-blur opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100">
                        {photo.category}
                      </div>

                      {/* Bottom Caption on Hover */}
                      <div className="absolute inset-x-0 bottom-0 p-3.5 text-white opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100">
                        <h3 className="m-0 font-serif text-[14px] font-medium leading-snug text-white">
                          {photo.title}
                        </h3>
                        {photo.description && (
                          <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-white/80">
                            {photo.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Infinite Scroll Sentinel & Bottom Loading State */}
            <div ref={observerTarget} className="py-8 flex flex-col items-center justify-center">
              {isLoadingMore ? (
                <div className="flex items-center gap-2.5 rounded-full border border-[#E3DFD5] bg-white px-4 py-2 text-xs font-semibold text-[#00629B] shadow-2xs">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#00629B] border-t-transparent" />
                  <span>Loading more moments...</span>
                </div>
              ) : hasMore ? (
                <span className="text-[12px] text-[#9A9E9F]">Scroll down to load more</span>
              ) : photos.length > 12 ? (
                <div className="flex items-center gap-2 text-xs text-[#9A9E9F]">
                  <span className="inline-block h-px w-12 bg-[#E3DFD5]" />
                  <span>End of archive</span>
                  <span className="inline-block h-px w-12 bg-[#E3DFD5]" />
                </div>
              ) : null}
            </div>
          </>
        )}
      </div>

      {/* Lightbox Modal with Smooth Entrance & Crossfade Animation */}
      {activePhotoIndex !== null && currentPhoto && (
        <div
          onClick={handleCloseLightbox}
          className={`fixed inset-0 z-[150] flex items-center justify-center bg-black/92 p-4 backdrop-blur-md transition-opacity duration-200 ease-out ${
            modalVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative flex max-h-[95vh] max-w-[95vw] flex-col items-center justify-center transition-all duration-300 ease-out transform-gpu ${
              modalVisible ? "scale-100 opacity-100" : "scale-[0.93] opacity-0"
            }`}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleCloseLightbox}
              aria-label="Close lightbox"
              className="absolute -top-12 right-0 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/20 text-white transition-all duration-150 hover:bg-white/40 active:scale-90 focus:outline-none"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Prev Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevPhoto();
              }}
              aria-label="Previous photo"
              className="absolute -left-12 top-1/2 -translate-y-1/2 z-20 hidden sm:flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/20 text-[26px] leading-none text-white transition-all duration-150 hover:bg-white/40 active:scale-90 focus:outline-none"
            >
              ‹
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNextPhoto();
              }}
              aria-label="Next photo"
              className="absolute -right-12 top-1/2 -translate-y-1/2 z-20 hidden sm:flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/20 text-[26px] leading-none text-white transition-all duration-150 hover:bg-white/40 active:scale-90 focus:outline-none"
            >
              ›
            </button>

            {/* Image Container with Crossfade */}
            <div className="relative h-[72vh] w-[90vw] max-w-[1200px] overflow-hidden rounded-2xl bg-black/60 shadow-2xl">
              <Image
                key={currentPhoto.id}
                src={currentPhoto.imageUrl}
                alt={currentPhoto.title}
                fill
                priority
                sizes="95vw"
                decoding="async"
                onLoad={() => setModalImageLoaded(true)}
                className={`object-contain transition-opacity duration-250 ease-out ${
                  modalImageLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>

            {/* Caption & Counter Strip */}
            <div className="mt-3 flex w-full max-w-[1200px] flex-col gap-1 px-2 text-white sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="font-serif text-[15px] font-semibold text-white">
                  {currentPhoto.title}
                </div>
                {currentPhoto.description && (
                  <p className="mt-0.5 text-[12.5px] leading-relaxed text-white/70">
                    {currentPhoto.description}
                  </p>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-3 text-[12px] text-white/60">
                <span className="rounded-md bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-white/90">
                  {currentPhoto.year}
                </span>
                <span className="rounded-md bg-[#00629B]/70 px-2 py-0.5 text-[11px] font-semibold text-white">
                  {currentPhoto.category}
                </span>
                <span>
                  {activePhotoIndex + 1} of {photos.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
