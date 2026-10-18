"use client";

import Link from "next/link";
import { routeLabels } from "@/data/site/navigation";

function generateBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  let currentPath = "";

  return segments.map((seg, idx) => {
    currentPath += `/${seg}`;
    const cleanSeg = decodeURIComponent(seg).toLowerCase();
    const label =
      routeLabels[cleanSeg] ||
      cleanSeg
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

    return {
      label,
      href: currentPath,
      isLast: idx === segments.length - 1,
    };
  });
}

interface BreadcrumbsProps {
  pathname?: string;
}

export function Breadcrumbs({ pathname = "/" }: BreadcrumbsProps) {

  if (pathname === "/" || pathname.startsWith("/admin")) {
    return null;
  }

  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <div className="border-t border-[#E3DFD5] bg-[#F5F3EE]/90">
      <div className="mx-auto flex h-9 max-w-[1200px] items-center px-4 sm:px-8 text-[12px] text-[#6E7178]">
        <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 overflow-x-auto whitespace-nowrap scrollbar-none py-1">
          <Link
            href="/"
            className="inline-flex items-center gap-1 font-medium text-[#4A4E54] hover:text-[#00629B] transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>Home</span>
          </Link>

          {breadcrumbs.map((crumb) => (
            <div key={crumb.href} className="flex items-center space-x-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#A9ACB2]">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {crumb.isLast ? (
                <span className="font-semibold text-[#00629B] truncate max-w-[180px] sm:max-w-[320px]">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="font-medium text-[#4A4E54] hover:text-[#00629B] transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
