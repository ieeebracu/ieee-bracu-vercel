"use client";

import { useEffect, useRef, useState } from "react";
import { memberYearCounts } from "@/data/site/members-count";

function AnimatedCounter({
  end,
  duration = 1800,
  startAnimation,
}: {
  end: number;
  duration?: number;
  startAnimation: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    let start = 0;
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [end, duration, startAnimation]);

  return <span>{count}</span>;
}

export function MembersCount() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#F5F3EE] py-8 sm:py-10 font-sans border-t border-[#E3DFD5]"
    >
      <div className="mx-auto max-w-[1320px] px-8">
        {/* Section Header */}
        <div className="mb-4 text-center">
          <div className="mb-1.5 flex items-center justify-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#00629B]">
            <span className="inline-block h-0.5 w-[20px] bg-[#00629B]" />
            Growth &amp; Community
            <span className="inline-block h-0.5 w-[20px] bg-[#00629B]" />
          </div>
          <h2 className="m-0 font-serif text-[clamp(24px,2.8vw,32px)] font-semibold tracking-[-0.02em] text-[#191B1E]">
            Members Count by Year
          </h2>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {memberYearCounts.map((item) => (
            <div
              key={item.year}
              className="group relative flex flex-col items-center justify-center rounded-2xl border border-[#E3DFD5] bg-white p-6 text-center shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#00629B]/35 hover:shadow-[0_12px_28px_rgba(0,98,155,0.1)]"
            >
              {/* 3 People Icon */}
              <div className="mb-3.5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF1F6] text-[#00629B] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00629B] group-hover:text-white">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="7" r="3.5" />
                  <path d="M6 20v-1.5a5 5 0 0 1 10 0V20" />
                  <circle cx="5" cy="8.5" r="2.5" />
                  <path d="M1 20v-1a4 4 0 0 1 4-4c.4 0 .8.05 1.2.15" />
                  <circle cx="19" cy="8.5" r="2.5" />
                  <path d="M23 20v-1a4 4 0 0 0-4-4c-.4 0-.8.05-1.2.15" />
                </svg>
              </div>

              {/* Animated Count Number */}
              <div className="flex items-baseline font-serif text-[32px] sm:text-[36px] font-bold tracking-tight text-[#0A2540] transition-colors group-hover:text-[#00629B]">
                <AnimatedCounter end={item.count} startAnimation={isVisible} />
                <span className="ml-0.5 text-[22px] font-semibold text-[#00629B]">+</span>
              </div>

              {/* Year Label */}
              <span className="mt-2 rounded-md bg-[#F5F3EE] px-3 py-0.5 font-serif text-[13.5px] font-semibold text-[#191B1E] transition-colors group-hover:bg-[#00629B] group-hover:text-white">
                {item.year}
              </span>

              {item.label && (
                <span className="mt-1.5 text-[10.5px] font-bold uppercase tracking-wider text-emerald-600">
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MembersCount;
