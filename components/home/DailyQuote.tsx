"use client";

import { useState } from "react";
import { dailyQuotes, getDailyQuoteIndex } from "@/data/site/quotes";

export function DailyQuote() {
  const [index, setIndex] = useState(getDailyQuoteIndex);
  const [isFading, setIsFading] = useState(false);

  const current = dailyQuotes[index];

  const handleNext = () => {
    setIsFading(true);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % dailyQuotes.length);
      setIsFading(false);
    }, 140);
  };

  return (
    <section className="border-y border-[#E3DFD5] bg-white pt-8 pb-11 font-sans sm:pt-9 sm:pb-12">
      <div className="mx-auto max-w-[820px] px-6 text-center">
        {/* Subtle decorative quotation mark icon */}
        <div className="mb-3 text-[#00629B]/35">
          <svg className="mx-auto h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
          </svg>
        </div>

        {/* Quote body */}
        <blockquote
          className={`m-0 transition-opacity duration-150 ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        >
          <p className="m-0 font-serif text-[clamp(18px,2.2vw,24px)] font-medium leading-[1.4] tracking-[-0.01em] text-[#191B1E]">
            &ldquo;{current.text}&rdquo;
          </p>
        </blockquote>

        {/* Attribution & refresh control */}
        <div
          className={`mt-4 flex items-center justify-center gap-3 transition-opacity duration-150 ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="text-[13.5px]">
            <span className="font-semibold text-[#191B1E]">{current.author}</span>
            <span className="mx-2 text-[#C0C4C9]">·</span>
            <span className="text-[13px] text-[#6E7178]">{current.title}</span>
          </div>

          <button
            onClick={handleNext}
            className="group flex h-6 w-6 items-center justify-center rounded-full border border-[#E3DFD5] bg-[#FBFAF7] text-[#9A9E9F] transition-all hover:border-[#00629B]/30 hover:bg-[#EAF1F6] hover:text-[#00629B] active:scale-90 cursor-pointer"
            title="Next quote"
            aria-label="Next quote"
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="transition-transform duration-300 group-hover:rotate-180"
            >
              <path
                d="M21.5 2v6h-6M21.34 15.57a10 10 0 11-.57-8.38l5.67-5.67"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default DailyQuote;
