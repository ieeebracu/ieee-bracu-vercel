"use client";

import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight =
            document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const currentScroll = window.scrollY;

          if (totalHeight > 0) {
            const progress = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
            setScrollProgress(progress);
          }

          setVisible(currentScroll > 350);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SVG circle calculations
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`group fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#00629B] shadow-[0_4px_20px_rgba(10,37,64,0.15)] ring-1 ring-[#E3DFD5] transition-all duration-300 hover:-translate-y-1 hover:bg-[#00629B] hover:text-white hover:shadow-[0_8px_25px_rgba(0,98,155,0.3)] focus:outline-none focus:ring-2 focus:ring-[#00629B] cursor-pointer ${
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto scale-100"
          : "translate-y-4 opacity-0 pointer-events-none scale-90"
      }`}
    >
      {/* Circular Progress Ring */}
      <svg className="absolute inset-0 h-full w-full -rotate-90 p-0.5" viewBox="0 0 48 48">
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="#E3DFD5"
          strokeWidth="2.5"
          className="opacity-40"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-[stroke-dashoffset] duration-150"
        />
      </svg>

      {/* Up Arrow Icon */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
