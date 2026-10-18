import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { chaptersDetailData } from "@/data/site/chapters";

export const metadata: Metadata = {
  title: "Technical Chapters — IEEE BRAC University Student Branch",
  description:
    "Explore the 6 specialized technical chapters of IEEE BRAC University Student Branch: PES, CS, RAS, AESS, ComSoc, and EDS.",
};

export default function ChaptersDirectoryPage() {
  return (
    <main className="min-h-screen bg-[#F5F3EE] font-[family-name:var(--font-sans)]">
      {/* Header Hero */}
      <div className="relative overflow-hidden bg-[#0A2540]">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 40%, #3E9BD6 0%, transparent 50%), radial-gradient(circle at 70% 60%, #00629B 0%, transparent 50%)",
          }}
        />
        <div className="relative mx-auto max-w-[1320px] px-8 pb-16 pt-20">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[13px] font-medium text-white backdrop-blur transition-colors hover:bg-white/20"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Home
          </Link>
          <div className="mt-4 mb-5 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#7FB4DA]">
            <span className="inline-block h-0.5 w-[26px] bg-[#7FB4DA]" />
            Technical Societies &amp; Chapters
          </div>
          <h1 className="m-0 font-[family-name:var(--font-serif)] text-[clamp(32px,4.5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-white">
            Six Societies, One Branch
          </h1>
          <p className="m-0 mt-4 max-w-[58ch] text-[16px] leading-[1.6] text-white/60">
            Each chapter runs its own workshops, symposiums, competitions, and technical community,
            focused on a distinct discipline of electrical engineering, computer science, and applied
            technology.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/about/branch"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-[13px] font-medium text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              Branch Overview →
            </Link>
            <Link
              href="/members?tab=eb"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-[13px] font-medium text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              Leadership Directory →
            </Link>
          </div>
        </div>
      </div>

      {/* Chapters Grid Section */}
      <div className="mx-auto max-w-[1320px] px-8 py-20">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#00629B]">
              <span className="h-0.5 w-5 bg-[#00629B]" />
              Select a chapter
            </div>
            <h2 className="m-0 font-[family-name:var(--font-serif)] text-[28px] font-semibold text-[#191B1E]">
              Explore by Technical Domain
            </h2>
          </div>
          <p className="m-0 max-w-[38ch] text-[14.5px] leading-relaxed text-[#6E7178]">
            Click any chapter below to learn about its executive leadership, faculty advisors, founding
            milestones, and annual publications.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {chaptersDetailData.map((c) => (
            <Link
              key={c.slug}
              href={`/chapters/${c.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#E3DFD5] bg-white transition-all duration-300 hover:border-[#00629B]/30 hover:shadow-[0_16px_40px_rgba(20,22,24,0.10)]"
            >
              {/* Image banner */}
              <div className="relative h-[200px] w-full overflow-hidden bg-[#0A2540]">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(10,37,64,.70) 0%, rgba(10,37,64,.15) 60%)",
                  }}
                />
                <span className="absolute left-4 top-4 rounded-lg bg-white/95 px-3 py-1 font-[family-name:var(--font-serif)] text-[14px] font-bold tracking-[0.04em] text-[#00629B] shadow-sm backdrop-blur">
                  {c.abbr}
                </span>
                <span className="absolute right-4 bottom-3 text-[12px] font-semibold text-white/80">
                  Est. {c.founded}
                </span>
              </div>

              {/* Content body */}
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="m-0 font-[family-name:var(--font-serif)] text-[20px] font-semibold leading-tight text-[#191B1E] group-hover:text-[#00629B] transition-colors">
                    {c.name}
                  </h3>
                  <span className="mt-1 shrink-0 text-[#B9BDC0] transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#00629B]">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M7 17L17 7M17 7H7M17 7V17"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>

                <p className="m-0 text-[14px] leading-[1.65] text-[#6E7178] line-clamp-3">
                  {c.desc[0]}
                </p>

                <div className="mt-6 border-t border-[#F0ECE1] pt-4 flex items-center justify-between text-[12.5px]">
                  <span className="font-medium text-[#8F949B]">{c.focus}</span>
                  <span className="font-semibold text-[#00629B] group-hover:underline">
                    View Chapter →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
