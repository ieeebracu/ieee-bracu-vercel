"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export function AchievementsSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
        setIsZoomed(false);
      }
    };
    if (lightboxOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [lightboxOpen]);

  return (
    <section className="bg-[#F5F3EE] py-8 sm:py-10 font-sans border-t border-[#E3DFD5]">
      <div className="mx-auto max-w-[1200px] px-8">
        {/* Section Header */}
        <div className="text-center mb-4">
          <div className="mb-1.5 flex items-center justify-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#00629B]">
            <span className="inline-block h-0.5 w-[20px] bg-[#00629B]" />
            Recognition
            <span className="inline-block h-0.5 w-[20px] bg-[#00629B]" />
          </div>
          <h2 className="m-0 font-serif text-[clamp(24px,2.8vw,32px)] font-semibold tracking-[-0.02em] text-[#191B1E]">
            Our Achievements
          </h2>
        </div>

        {/* Image Container - Natural Height Banner */}
        <div
          onClick={() => {
            setLightboxOpen(true);
            setIsZoomed(false);
          }}
          className="group relative cursor-pointer overflow-hidden rounded-xl border border-[#E3DFD5] bg-white p-1.5 shadow-xs transition-all duration-300 hover:border-[#00629B]/35 hover:shadow-md"
        >
          <div className="relative w-full overflow-hidden rounded-lg bg-white">
            <Image
              src="/assets/branding/achievements.jpg"
              alt="Our Achievements - IEEE BRAC University Student Branch"
              width={2501}
              height={511}
              className="h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.008]"
              priority
            />
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          onClick={() => {
            setLightboxOpen(false);
            setIsZoomed(false);
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-6 md:p-10 backdrop-blur-md"
        >
          {/* Top Bar Controls */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-2"
          >
            <button
              onClick={() => setIsZoomed((prev) => !prev)}
              className="flex h-10 items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3.5 py-1 text-xs font-medium text-white backdrop-blur-md transition-all hover:bg-white/20 cursor-pointer"
              title={isZoomed ? "Fit to screen" : "Zoom in"}
              aria-label={isZoomed ? "Fit to screen" : "Zoom in"}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                {isZoomed ? (
                  <line x1="8" y1="11" x2="14" y2="11" />
                ) : (
                  <>
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </>
                )}
              </svg>
              <span className="hidden sm:inline">{isZoomed ? "Fit to screen" : "Zoom in"}</span>
            </button>

            <button
              onClick={() => {
                setLightboxOpen(false);
                setIsZoomed(false);
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 cursor-pointer"
              aria-label="Close image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Modal Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative max-h-[90vh] max-w-[95vw] overflow-auto rounded-2xl bg-[#1d1e20] border border-white/10 shadow-2xl transition-all duration-300 ${
              isZoomed ? "cursor-zoom-out w-auto" : "cursor-zoom-in w-full max-w-6xl"
            }`}
          >
            <div
              onClick={() => setIsZoomed((prev) => !prev)}
              className={isZoomed ? "min-w-[1400px] md:min-w-[1800px]" : "w-full"}
            >
              <Image
                src="/assets/branding/achievements.jpg"
                alt="Our Achievements - Full View"
                width={2501}
                height={511}
                sizes="(max-width: 1280px) 95vw, 1400px"
                className="h-auto w-full object-contain select-none block"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AchievementsSection;
