"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

import { heroSlides } from "@/data/site/hero";
import { HeroStats } from "./HeroStats";

const AUTOPLAY = 5500;

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (dir: number) => setCurrent((c) => (c + dir + heroSlides.length) % heroSlides.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), AUTOPLAY);
    return () => clearInterval(t);
  }, [paused, go, current]);

  const s = heroSlides[current];

  return (
    <section className="bg-[#F5F3EE] font-sans">
      {/* Full-bleed hero */}
      <div
        className="relative h-[72vh] min-h-[520px] overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-roledescription="carousel"
      >
        {heroSlides.map((sl, i) => (
          <Image
            key={sl.id}
            src={sl.image}
            alt={sl.title}
            fill
            priority={i === 0}
            unoptimized
            sizes="100vw"
            className={`object-cover transition-opacity duration-1000 ${
              i === current ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />
        ))}

        {/* Navy scrim: left-weighted + bottom gradient (exact prototype formula) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(6,20,36,.86) 0%, rgba(6,20,36,.62) 42%, rgba(6,20,36,.18) 100%), linear-gradient(0deg, rgba(6,20,36,.55) 0%, rgba(6,20,36,0) 45%)",
          }}
        />

        <div className="relative mx-auto flex h-full max-w-[1200px] flex-col justify-center px-8">
          <div key={current} className="max-w-[640px] animate-[ibUp_.7s_ease]">
            <div className="mb-5 flex items-center gap-3.5 text-[12.5px] font-bold uppercase tracking-[0.18em] text-[#CFE0EC]">
              <span className="inline-block h-0.5 w-[38px] bg-[#3E9BD6]" />
              {s.eyebrow}
            </div>
            <h1 className="mb-[18px] font-serif text-[clamp(32px,4.5vw,56px)] font-bold leading-[1.08] tracking-[-0.02em] text-white">
              {s.title}
            </h1>
            <p className="mb-[30px] max-w-[52ch] text-[16.5px] leading-[1.6] text-white/85">
              {s.desc}
            </p>
            <div className="flex gap-3">
              <Link
                href={s.cta.href}
                className="rounded-[7px] bg-[#00629B] px-[18px] py-[9px] text-[13.5px] font-semibold text-white transition-colors hover:bg-[#004E7C]"
              >
                {s.cta.label}
              </Link>
              <Link
                href="/news"
                className="rounded-[7px] border border-white/55 px-[18px] py-[9px] text-[13.5px] font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                All events
              </Link>
            </div>
          </div>

          {/* Structured controls positioned on the right */}
          <div className="absolute right-8 bottom-14 sm:bottom-16 flex items-center gap-4 sm:gap-5">
            <div className="flex items-baseline gap-1.5 font-serif text-white">
              <span className="text-[22px] sm:text-[24px] font-semibold">0{current + 1}</span>
              <span className="text-[12px] sm:text-[13px] text-white/60">/ 0{heroSlides.length}</span>
            </div>
            <div className="hidden sm:block h-0.5 w-[140px] md:w-[180px] overflow-hidden bg-white/25">
              <span
                key={current}
                className="block h-full w-0 bg-white"
                style={{ animation: `ibFill ${AUTOPLAY}ms linear` }}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => go(-1)}
                aria-label="Previous slide"
                className="flex h-[38px] w-[38px] sm:h-[42px] sm:w-[42px] items-center justify-center rounded-full border border-white/40 bg-white/[0.06] text-[18px] sm:text-[20px] leading-none text-white transition-colors hover:bg-white hover:text-[#0A2540] cursor-pointer"
              >
                ‹
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next slide"
                className="flex h-[38px] w-[38px] sm:h-[42px] sm:w-[42px] items-center justify-center rounded-full border border-white/40 bg-white/[0.06] text-[18px] sm:text-[20px] leading-none text-white transition-colors hover:bg-white hover:text-[#0A2540] cursor-pointer"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip with slight overlay */}
      <HeroStats />
    </section>
  );
}
export default HeroCarousel;