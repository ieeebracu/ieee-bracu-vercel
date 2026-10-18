"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function NewsBackLink() {
  const router = useRouter();
  const [backHref, setBackHref] = useState("/news");

  useEffect(() => {
    try {
      const lastPage = sessionStorage.getItem("last_news_page");
      const lastFilter = sessionStorage.getItem("last_news_filter");
      const lastSearch = sessionStorage.getItem("last_news_search");
      const params = new URLSearchParams();

      if (lastPage && parseInt(lastPage, 10) > 1) {
        params.set("page", lastPage);
      }
      if (lastFilter && lastFilter !== "All") {
        params.set("filter", lastFilter);
      }
      if (lastSearch && lastSearch.trim()) {
        params.set("q", lastSearch.trim());
      }

      const qs = params.toString();
      if (qs) {
        setBackHref(`/news?${qs}`);
      }
    } catch {
      // Ignore sessionStorage errors (e.g. incognito/disabled)
    }
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If the user arrived from /news within the current tab session, router.back()
    // returns directly to the exact page and preserves scroll position.
    if (
      typeof window !== "undefined" &&
      window.history.length > 1 &&
      document.referrer.includes("/news")
    ) {
      e.preventDefault();
      router.back();
    }
  };

  return (
    <a
      href={backHref}
      onClick={handleClick}
      className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[13px] font-medium text-white backdrop-blur-xs transition-colors duration-150 hover:bg-white/20 cursor-pointer"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="transition-transform duration-200 ease-out group-hover:-translate-x-1"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      All news
    </a>
  );
}
