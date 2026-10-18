"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export interface GalleryMarqueePhoto {
  id: string;
  src: string;
  title: string;
  category: string;
  year: string;
  desc?: string;
}

interface GallerySectionProps {
  photos?: GalleryMarqueePhoto[];
}

export function GallerySection({ photos = [] }: GallerySectionProps) {
  const [activePhoto, setActivePhoto] = useState<GalleryMarqueePhoto | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState<"normal" | "slow">("normal");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activePhoto || photos.length === 0) return;
      if (e.key === "Escape") setActivePhoto(null);

      const currentIndex = photos.findIndex((p) => p.id === activePhoto.id);
      if (currentIndex === -1) return;

      if (e.key === "ArrowRight") {
        const next = photos[(currentIndex + 1) % photos.length];
        setActivePhoto(next);
      }
      if (e.key === "ArrowLeft") {
        const prev = photos[(currentIndex - 1 + photos.length) % photos.length];
        setActivePhoto(prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhoto, photos]);

  if (!photos || photos.length === 0) {
    return (
      <section className="relative overflow-hidden bg-[#0A2540] py-12 sm:py-16 font-sans text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 25%, #00629B 0%, transparent 45%), radial-gradient(circle at 85% 75%, #004E7C 0%, transparent 50%)",
          }}
        />
        <div className="relative mx-auto max-w-[1320px] px-4 sm:px-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <div className="mb-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#7FB4DA]">
                <span className="inline-block h-0.5 w-5 bg-[#7FB4DA]" />
                In Focus
              </div>
              <h2 className="m-0 font-serif text-[clamp(22px,2.8vw,32px)] font-bold tracking-tight text-white">
                Moments from the Branch
              </h2>
            </div>
            <Link
              href="/gallery"
              className="group inline-flex h-8 items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 text-[12.5px] font-semibold text-white backdrop-blur transition-all hover:bg-[#00629B] hover:border-[#00629B]"
            >
              <span>Gallery</span>
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-14 text-center backdrop-blur-sm">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#7FB4DA]">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <h3 className="m-0 font-serif text-lg font-bold text-white">No images available</h3>
            <p className="mt-2 max-w-md text-sm text-white/60">
              There are no gallery photos available at the moment. Check back soon for snapshots of our latest events!
            </p>
          </div>
        </div>
      </section>
    );
  }

  const mid = Math.ceil(photos.length / 2);
  const row1Base = photos.slice(0, mid);
  const row2Base = photos.slice(mid).length > 0 ? photos.slice(mid) : photos.slice(0, mid);

  // Duplicate photos to ensure continuous, seamless infinite marquee animation
  const row1 =
    row1Base.length < 5
      ? [...row1Base, ...row1Base, ...row1Base, ...row1Base]
      : [...row1Base, ...row1Base];
  const row2 =
    row2Base.length < 5
      ? [...row2Base, ...row2Base, ...row2Base, ...row2Base]
      : [...row2Base, ...row2Base];

  return (
    <section className="relative overflow-hidden bg-[#0A2540] py-10 sm:py-14 font-sans text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 25%, #00629B 0%, transparent 45%), radial-gradient(circle at 85% 75%, #004E7C 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto mb-5 sm:mb-6 max-w-[1320px] px-4 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="mb-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#7FB4DA]">
              <span className="inline-block h-0.5 w-5 bg-[#7FB4DA]" />
              In Focus
            </div>
            <h2 className="m-0 font-serif text-[clamp(22px,2.8vw,32px)] font-bold tracking-tight text-white">
              Moments from the Branch
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused((v) => !v)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/80 backdrop-blur transition-all hover:bg-white/20 hover:text-white cursor-pointer"
              title={isPaused ? "Resume Motion" : "Pause Motion"}
              aria-label={isPaused ? "Resume Motion" : "Pause Motion"}
            >
              {isPaused ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setSpeed((v) => (v === "normal" ? "slow" : "normal"))}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[11px] font-bold text-white/80 backdrop-blur transition-all hover:bg-white/20 hover:text-white cursor-pointer"
              title={speed === "normal" ? "Normal Speed (1.0x)" : "Slow Speed (0.5x)"}
              aria-label="Toggle speed"
            >
              {speed === "normal" ? "1x" : ".5x"}
            </button>

            <Link
              href="/gallery"
              className="group inline-flex h-8 items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 text-[12.5px] font-semibold text-white backdrop-blur transition-all hover:bg-[#00629B] hover:border-[#00629B]"
            >
              <span>Gallery</span>
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div
        className="relative space-y-4 sm:space-y-5 overflow-hidden"
        style={{ contain: "paint" }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 sm:w-28 bg-gradient-to-r from-[#0A2540] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 sm:w-28 bg-gradient-to-l from-[#0A2540] to-transparent" />

        {/* Row 1 */}
        <div
          className={`flex w-max gap-4 sm:gap-5 will-change-transform ${
            isPaused ? "animate-none" : "animate-exhibit-left"
          } hover:[animation-play-state:paused]`}
          style={{
            animationDuration: speed === "normal" ? "42s" : "75s",
          }}
        >
          {row1.map((item, index) => (
            <div
              key={`row1-${item.id}-${index}`}
              onClick={() => setActivePhoto(item)}
              className="group relative h-[220px] w-[310px] sm:h-[260px] sm:w-[380px] shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-white/15 bg-[#061424] shadow-xl transition-all duration-300 hover:scale-[1.03] hover:border-[#7FB4DA] hover:shadow-[0_12px_36px_rgba(0,98,155,0.35)] transform-gpu backface-hidden"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 310px, 380px"
                loading="eager"
                decoding="async"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#00629B] px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wider text-white">
                    {item.category}
                  </span>
                  <span className="text-[11px] font-medium text-white/70">
                    {item.year}
                  </span>
                </div>
                <h3 className="m-0 mt-1.5 font-serif text-[15.5px] sm:text-[17px] font-bold leading-snug text-white line-clamp-1 group-hover:text-[#7FB4DA] transition-colors">
                  {item.title}
                </h3>
              </div>

              <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white/80 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-[#00629B] hover:scale-110">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div
          className={`flex w-max gap-4 sm:gap-5 will-change-transform ${
            isPaused ? "animate-none" : "animate-exhibit-right"
          } hover:[animation-play-state:paused]`}
          style={{
            animationDuration: speed === "normal" ? "46s" : "80s",
          }}
        >
          {row2.map((item, index) => (
            <div
              key={`row2-${item.id}-${index}`}
              onClick={() => setActivePhoto(item)}
              className="group relative h-[220px] w-[310px] sm:h-[260px] sm:w-[380px] shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-white/15 bg-[#061424] shadow-xl transition-all duration-300 hover:scale-[1.03] hover:border-[#7FB4DA] hover:shadow-[0_12px_36px_rgba(0,98,155,0.35)] transform-gpu backface-hidden"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 310px, 380px"
                loading="eager"
                decoding="async"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#0A2540] border border-white/20 px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wider text-[#7FB4DA]">
                    {item.category}
                  </span>
                  <span className="text-[11px] font-medium text-white/70">
                    {item.year}
                  </span>
                </div>
                <h3 className="m-0 mt-1.5 font-serif text-[15.5px] sm:text-[17px] font-bold leading-snug text-white line-clamp-1 group-hover:text-[#7FB4DA] transition-colors">
                  {item.title}
                </h3>
              </div>

              <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white/80 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-[#00629B] hover:scale-110">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md">
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:bg-white/20 cursor-pointer"
            aria-label="Close Lightbox"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <button
            onClick={() => {
              const currentIndex = photos.findIndex((p) => p.id === activePhoto.id);
              if (currentIndex !== -1) {
                const prev = photos[(currentIndex - 1 + photos.length) % photos.length];
                setActivePhoto(prev);
              }
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:bg-[#00629B] cursor-pointer"
            aria-label="Previous image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            onClick={() => {
              const currentIndex = photos.findIndex((p) => p.id === activePhoto.id);
              if (currentIndex !== -1) {
                const next = photos[(currentIndex + 1) % photos.length];
                setActivePhoto(next);
              }
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:bg-[#00629B] cursor-pointer"
            aria-label="Next image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="flex max-h-[85vh] max-w-5xl flex-col items-center">
            <div className="relative h-[55vh] w-[85vw] max-w-5xl sm:h-[70vh]">
              <Image
                src={activePhoto.src}
                alt={activePhoto.title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <div className="mt-4 text-center">
              <div className="inline-block rounded-full bg-[#00629B] px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
                {activePhoto.category} • {activePhoto.year}
              </div>
              <h3 className="m-0 mt-2 font-serif text-[18px] sm:text-[22px] font-bold text-white">
                {activePhoto.title}
              </h3>
              {activePhoto.desc && (
                <p className="m-0 mt-1 max-w-2xl text-[13px] text-white/70">
                  {activePhoto.desc}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default GallerySection;