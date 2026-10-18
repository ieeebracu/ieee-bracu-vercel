import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404: Page Not Found — IEEE BRAC University Student Branch",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-220px)] flex-col justify-center bg-[#F5F3EE] px-8 py-20 font-sans">
      <div className="mx-auto w-full max-w-[680px] text-center">
        {/* Subtle Status Pill */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E3DFD5] bg-white px-3.5 py-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#00629B] shadow-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00629B]" />
          404 Error
        </div>

        {/* Headline */}
        <h1 className="m-0 font-serif text-[clamp(32px,4.5vw,52px)] font-bold leading-[1.12] tracking-[-0.02em] text-[#191B1E]">
          This page could not be found.
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-4 max-w-[48ch] text-[16px] leading-[1.65] text-[#6E7178]">
          The link you followed may be broken, mistyped, or the page may have been moved. Let us help you find what you need.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#00629B] px-5 py-2.5 text-[14px] font-semibold text-white shadow-xs transition-colors hover:bg-[#004E7C] cursor-pointer"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="9 22 9 12 15 12 15 22" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Home
          </Link>

          <Link
            href="/news"
            className="inline-flex items-center gap-2 rounded-xl border border-[#E3DFD5] bg-white px-5 py-2.5 text-[14px] font-semibold text-[#191B1E] transition-colors hover:border-[#00629B]/40 hover:text-[#00629B] cursor-pointer"
          >
            Browse News &amp; Events
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Clean Divider & Helpful Direct Links */}
        <div className="mt-14 border-t border-[#E3DFD5] pt-8">
          <p className="m-0 mb-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8F949B]">
            Or explore popular sections
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[14px] font-medium text-[#44474C]">
            <Link href="/about/branch" className="transition-colors hover:text-[#00629B]">
              About the Branch
            </Link>
            <span className="text-[#D2CEC5]">•</span>
            <Link href="/chapters" className="transition-colors hover:text-[#00629B]">
              Technical Chapters
            </Link>
            <span className="text-[#D2CEC5]">•</span>
            <Link href="/members" className="transition-colors hover:text-[#00629B]">
              Leadership Directory
            </Link>
            <span className="text-[#D2CEC5]">•</span>
            <Link href="/members/membership-benefits" className="transition-colors hover:text-[#00629B]">
              Membership Benefits
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
