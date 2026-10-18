"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { CURRENT_YEAR } from "@/data/members";
import { Member, ChapterEB, getMainEBMumbers, getChapterEBs } from "@/data/site/executive";

function PersonCard({ member }: { member: Member }) {
  return (
    <div className="group flex flex-col items-center text-center">
      <div className="relative mb-3.5 flex h-32 w-32 min-[400px]:h-36 min-[400px]:w-36 items-center justify-center rounded-full border-2 border-[#E3DFD5] bg-white p-1.5 shadow-[0_4px_18px_rgba(20,22,24,0.06)] transition-all duration-300 group-hover:border-[#00629B] group-hover:shadow-[0_12px_32px_rgba(0,98,155,0.18)] sm:h-44 sm:w-44 md:h-48 md:w-48 lg:h-56 lg:w-56">
        <div className="relative h-full w-full overflow-hidden rounded-full bg-[#F5F3EE]">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="(max-width: 400px) 128px, (max-width: 640px) 144px, (max-width: 768px) 176px, (max-width: 1024px) 192px, 224px"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#EAF1F6] to-[#D6E6F2] text-[#00629B]">
              <span className="font-serif text-[24px] font-bold sm:text-[28px]">
                {member.name
                  .split(" ")
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((w) => w[0]?.toUpperCase())
                  .join("")}
              </span>
            </div>
          )}
        </div>
      </div>
      <h3 className="m-0 text-[14.5px] font-semibold tracking-[-0.01em] text-[#191B1E] sm:text-[16.5px]">
        {member.name}
      </h3>
      <span className="mt-1 text-[11.5px] font-medium uppercase tracking-[0.08em] text-[#00629B] sm:text-[13px]">
        {member.role}
      </span>
    </div>
  );
}

interface ExecutiveBodyProps {
  year?: number;
}

export function ExecutiveBody({ year = CURRENT_YEAR }: ExecutiveBodyProps) {
  const [activeChapter, setActiveChapter] = useState<ChapterEB | null>(null);

  const mainEB = useMemo(() => getMainEBMumbers(year), [year]);
  const chapterEBs = useMemo(() => getChapterEBs(year), [year]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveChapter(null);
    };
    if (activeChapter) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeChapter]);

  return (
    <section className="bg-[#F5F3EE] py-24 font-sans">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <div className="mb-5 flex items-center justify-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#00629B]">
            <span className="inline-block h-0.5 w-[26px] bg-[#00629B]" />
            Leadership
            <span className="inline-block h-0.5 w-[26px] bg-[#00629B]" />
          </div>
          <h2 className="m-0 font-serif text-[clamp(26px,3vw,38px)] font-semibold tracking-[-0.02em] text-[#191B1E]">
            Executive Body {year}
          </h2>
          <p className="mx-auto mt-4 max-w-[48ch] text-[15px] leading-[1.6] text-[#6E7178]">
            The people who run the IEEE BRAC University Student Branch and its six technical chapters.
          </p>
        </div>

        {/* ── Main SB Members ── */}
        <div className="mb-6 text-center">
          <span className="inline-block rounded-md bg-[#0A2540] px-3.5 py-1.5 font-serif text-[13px] font-semibold tracking-[0.04em] text-white">
            Student Branch
          </span>
        </div>
        <div className="mx-auto mb-20 max-w-[1100px] grid grid-cols-2 justify-items-center gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6 md:gap-y-10">
          {mainEB.map((m) => (
            <PersonCard key={`${m.name}-${m.role}`} member={m} />
          ))}
        </div>

        {/* ── Chapter Cards ── */}
        <div className="mb-8 text-center">
          <div className="mb-5 flex items-center justify-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#00629B]">
            <span className="inline-block h-0.5 w-[26px] bg-[#00629B]" />
            Chapter Teams
            <span className="inline-block h-0.5 w-[26px] bg-[#00629B]" />
          </div>
          <p className="mx-auto max-w-[44ch] text-[14px] leading-[1.6] text-[#6E7178]">
            Click a chapter to meet the people behind it.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {chapterEBs.map((c) => (
            <button
              key={c.abbr}
              onClick={() => setActiveChapter(c)}
              className="group relative overflow-hidden rounded-2xl border border-[#E3DFD5] bg-white p-7 text-left transition-all duration-300 hover:border-[#00629B]/25 hover:shadow-[0_16px_40px_rgba(0,98,155,0.08)] cursor-pointer"
            >
              {/* Decorative gradient corner */}
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#00629B]/[0.04] transition-all duration-500 group-hover:h-44 group-hover:w-44 group-hover:bg-[#00629B]/[0.07]" />

              <div className="relative">
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-lg bg-gradient-to-br from-[#00629B] to-[#0A2540] px-3.5 py-1.5 font-serif text-[16px] font-bold tracking-[0.04em] text-white shadow-xs">
                    {c.abbr}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E3DFD5] bg-[#F5F3EE] text-[#B9BDC0] transition-all duration-300 group-hover:border-[#00629B]/30 group-hover:bg-[#00629B] group-hover:text-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                <h3 className="m-0 mb-1.5 font-serif text-[19px] font-semibold leading-tight tracking-[-0.01em] text-[#191B1E]">
                  {c.name}
                </h3>
                <p className="m-0 mb-5 text-[13.5px] leading-[1.5] text-[#6E7178]">
                  {c.desc}
                </p>

                {/* Small member avatar row preview */}
                <div className="flex items-center gap-1">
                  {c.members.map((m, i) => (
                    <div
                      key={m.name}
                      className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-white bg-[#EAF1F6] shadow-xs"
                      style={{ marginLeft: i > 0 ? "-6px" : 0, zIndex: c.members.length - i }}
                    >
                      {m.image ? (
                        <Image
                          src={m.image}
                          alt={m.name}
                          fill
                          sizes="36px"
                          className="object-cover object-center"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center text-[10px] font-bold text-[#00629B]">
                          {m.name.charAt(0)}
                        </span>
                      )}
                    </div>
                  ))}
                  <span className="ml-2 text-[12px] font-medium text-[#6E7178]">
                    {c.members.length} members
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Modal Dialog ── */}
      {activeChapter && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
          onClick={() => setActiveChapter(null)}
        >
          <div
            className="relative w-full max-w-[960px] animate-[modalUp_.35s_ease] overflow-hidden rounded-2xl border border-[#E3DFD5] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative overflow-hidden border-b border-[#E3DFD5] bg-[#F5F3EE] px-8 py-7 sm:px-10 sm:py-8">
              <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#00629B]/[0.05]" />
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-[#00629B]/[0.05]" />

              <div className="relative flex items-start justify-between">
                <div>
                  <span className="mb-3 inline-block rounded-lg bg-gradient-to-br from-[#00629B] to-[#0A2540] px-3.5 py-1.5 font-serif text-[16px] font-bold tracking-[0.04em] text-white shadow-xs">
                    {activeChapter.abbr}
                  </span>
                  <h3 className="m-0 mt-2 font-serif text-[24px] font-semibold tracking-[-0.01em] text-[#191B1E] sm:text-[26px]">
                    {activeChapter.name}
                  </h3>
                  <p className="m-0 mt-1 text-[14px] text-[#6E7178]">
                    Executive Body · {year}
                  </p>
                </div>
                <button
                  onClick={() => setActiveChapter(null)}
                  aria-label="Close"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E3DFD5] bg-white text-[#6E7178] transition-colors hover:bg-[#E3DFD5] hover:text-[#191B1E] cursor-pointer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body — Member Grid */}
            <div className="grid grid-cols-2 justify-items-center gap-x-4 gap-y-8 px-4 py-6 sm:grid-cols-4 sm:gap-x-6 sm:px-10 sm:py-10">
              {activeChapter.members.map((m) => (
                <div key={m.name} className="group flex flex-col items-center text-center">
                  <div className="relative mb-3.5 flex h-28 w-28 min-[400px]:h-32 min-[400px]:w-32 items-center justify-center rounded-full border-2 border-[#E3DFD5] bg-white p-1.5 shadow-xs transition-all duration-300 group-hover:border-[#00629B] group-hover:shadow-[0_8px_24px_rgba(0,98,155,0.14)] sm:h-40 sm:w-40 md:h-44 md:w-44">
                    <div className="relative h-full w-full overflow-hidden rounded-full bg-[#F5F3EE]">
                      {m.image ? (
                        <Image
                          src={m.image}
                          alt={m.name}
                          fill
                          sizes="(max-width: 400px) 112px, (max-width: 640px) 128px, (max-width: 768px) 160px, 176px"
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#EAF1F6] to-[#D6E6F2] text-[#00629B]">
                          <span className="font-serif text-[20px] font-bold">
                            {m.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <h4 className="m-0 text-[13.5px] font-semibold text-[#191B1E] sm:text-[15.5px]">
                    {m.name}
                  </h4>
                  <span className="mt-1 text-[11px] font-medium uppercase tracking-[0.08em] text-[#00629B] sm:text-[12px]">
                    {m.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ExecutiveBody;
