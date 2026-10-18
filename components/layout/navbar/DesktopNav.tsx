"use client";

import Link from "next/link";
import { useState } from "react";
import {
  chapterLinks,
  ChapterNavItem,
  aboutLinks,
  carcLinks,
} from "@/data/site/navigation";
import { getChapterBySlug } from "@/data/site/chapters";

interface DesktopNavProps {
  onOpenNewsletters: () => void;
  pathname?: string;
}

export function DesktopNav({ onOpenNewsletters, pathname = "/" }: DesktopNavProps) {

  const [membersOpen, setMembersOpen] = useState(false);
  const [membershipSubOpen, setMembershipSubOpen] = useState(false);
  const [chaptersOpen, setChaptersOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState<ChapterNavItem | null>(null);
  const [viewingChapterNewsletters, setViewingChapterNewsletters] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [carcOpen, setCarcOpen] = useState(false);

  const activeChapterData = activeChapter ? getChapterBySlug(activeChapter.slug) : undefined;
  const activeNewsletters = activeChapterData?.newsletters ?? [];

  return (
    <nav className="hidden items-center gap-1 md:flex font-sans">
      {/* 1. Home */}
      <Link
        href="/"
        className={`relative rounded-md px-3.5 py-2 text-[13.5px] font-medium transition-colors ${
          pathname === "/"
            ? "bg-[#EAF1F6] text-[#00629B] font-semibold"
            : "text-[#3C4046] hover:bg-[#EEEAE0] hover:text-[#191B1E]"
        }`}
      >
        Home
        {pathname === "/" && (
          <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[#00629B]" />
        )}
      </Link>

      {/* 2. News */}
      <Link
        href="/news"
        className={`relative rounded-md px-3.5 py-2 text-[13.5px] font-medium transition-colors ${
          pathname.startsWith("/news")
            ? "bg-[#EAF1F6] text-[#00629B] font-semibold"
            : "text-[#3C4046] hover:bg-[#EEEAE0] hover:text-[#191B1E]"
        }`}
      >
        News
        {pathname.startsWith("/news") && (
          <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[#00629B]" />
        )}
      </Link>

      {/* 3. Members multi-level dropdown */}
      <div
        className="relative"
        onMouseEnter={() => setMembersOpen(true)}
        onMouseLeave={() => {
          setMembersOpen(false);
          setMembershipSubOpen(false);
        }}
      >
        <button
          className={`relative flex items-center gap-1.5 rounded-md px-3.5 py-2 text-[13.5px] font-medium transition-colors cursor-pointer ${
            pathname.startsWith("/members")
              ? "bg-[#EAF1F6] text-[#00629B] font-semibold"
              : "text-[#3C4046] hover:bg-[#EEEAE0] hover:text-[#191B1E]"
          }`}
        >
          Members
          <svg
            className={`h-2.5 w-2.5 text-[#9A9E9F] transition-transform ${membersOpen ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5.2 7.2a.75.75 0 011.06.02L10 11.17l3.72-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0L5.2 8.27a.75.75 0 01.02-1.06z" />
          </svg>
          {pathname.startsWith("/members") && (
            <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[#00629B]" />
          )}
        </button>

        {membersOpen && (
          <div className="absolute left-0 top-full w-[240px] pt-2 z-50">
            <div className="rounded-[10px] border border-[#E3DFD5] bg-white p-1.5 shadow-[0_12px_30px_rgba(20,22,24,0.10)]">
              {/* Membership sub-item with flyout */}
              <div
                className="relative"
                onMouseEnter={() => setMembershipSubOpen(true)}
                onMouseLeave={() => setMembershipSubOpen(false)}
              >
                <div
                  className={`flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-[13px] transition-colors ${
                    pathname === "/members/why-how-do-you-join-ieee" ||
                    pathname === "/members/membership-benefits"
                      ? "bg-[#EAF1F6] text-[#00629B] font-semibold"
                      : "text-[#4A4E54] hover:bg-[#F5F3EE] hover:text-[#00629B]"
                  }`}
                >
                  <span>Membership</span>
                  <svg className="h-3 w-3 text-[#9A9E9F]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </div>

                {/* Nested Flyout Menu */}
                {membershipSubOpen && (
                  <div className="absolute left-full top-0 w-[270px] pl-1.5 z-50">
                    <div className="rounded-[10px] border border-[#E3DFD5] bg-white p-1.5 shadow-[0_12px_30px_rgba(20,22,24,0.12)]">
                      <Link
                        href="/members/why-how-do-you-join-ieee"
                        className={`block rounded-md px-3 py-2 text-[13px] transition-colors ${
                          pathname === "/members/why-how-do-you-join-ieee"
                            ? "bg-[#EAF1F6] text-[#00629B] font-semibold"
                            : "text-[#4A4E54] hover:bg-[#F5F3EE] hover:text-[#00629B]"
                        }`}
                      >
                        Why &amp; How Do You Join IEEE?
                      </Link>
                      <Link
                        href="/members/membership-benefits"
                        className={`block rounded-md px-3 py-2 text-[13px] transition-colors ${
                          pathname === "/members/membership-benefits"
                            ? "bg-[#EAF1F6] text-[#00629B] font-semibold"
                            : "text-[#4A4E54] hover:bg-[#F5F3EE] hover:text-[#00629B]"
                        }`}
                      >
                        Membership Benefits
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Memberlist by Year */}
              <Link
                href="/members"
                className={`block rounded-md px-3 py-2 text-[13px] transition-colors ${
                  pathname === "/members"
                    ? "bg-[#EAF1F6] text-[#00629B] font-semibold"
                    : "text-[#4A4E54] hover:bg-[#F5F3EE] hover:text-[#00629B]"
                }`}
              >
                Memberlist by Year
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* 4. Newsletters Button */}
      <button
        onClick={onOpenNewsletters}
        className="rounded-md px-3.5 py-2 text-[13.5px] font-medium text-[#3C4046] transition-colors hover:bg-[#EEEAE0] hover:text-[#00629B] cursor-pointer"
      >
        Newsletters
      </button>

      {/* 5. Chapters dropdown with sliding drilldown */}
      <div
        className="relative"
        onMouseEnter={() => setChaptersOpen(true)}
        onMouseLeave={() => {
          setChaptersOpen(false);
          setActiveChapter(null);
          setViewingChapterNewsletters(false);
        }}
      >
        <button
          onClick={() => {
            setChaptersOpen((prev) => !prev);
            if (chaptersOpen) {
              setActiveChapter(null);
              setViewingChapterNewsletters(false);
            }
          }}
          className={`relative flex items-center gap-1.5 rounded-md px-3.5 py-2 text-[13.5px] font-medium transition-colors cursor-pointer ${
            pathname.startsWith("/chapters")
              ? "bg-[#EAF1F6] text-[#00629B] font-semibold"
              : "text-[#3C4046] hover:bg-[#EEEAE0] hover:text-[#191B1E]"
          }`}
        >
          Chapters
          <svg
            className={`h-2.5 w-2.5 text-[#9A9E9F] transition-transform ${chaptersOpen ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5.2 7.2a.75.75 0 011.06.02L10 11.17l3.72-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0L5.2 8.27a.75.75 0 01.02-1.06z" />
          </svg>
          {pathname.startsWith("/chapters") && (
            <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[#00629B]" />
          )}
        </button>

        {chaptersOpen && (
          <div className="absolute left-1/2 top-full w-[316px] -translate-x-1/2 pt-2 z-50">
            <div className="relative overflow-hidden rounded-[12px] border border-[#E3DFD5] bg-white p-2 shadow-[0_16px_36px_rgba(20,22,24,0.12)]">
              {/* Sliding 3-panel track */}
              <div
                className="flex w-[900px] transition-transform duration-300 ease-out"
                style={{
                  transform: viewingChapterNewsletters
                    ? "translateX(-600px)"
                    : activeChapter
                    ? "translateX(-300px)"
                    : "translateX(0px)",
                }}
              >
                {/* Panel 1: Chapters List (width 300px) */}
                <div className="w-[300px] shrink-0 space-y-1 pr-2">
                  <div className="flex items-center justify-between border-b border-[#E3DFD5]/70 px-2 pb-1.5 pt-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6E7178]">
                    <span>Technical Chapters</span>
                    <Link
                      href="/chapters"
                      onClick={() => {
                        setChaptersOpen(false);
                        setActiveChapter(null);
                        setViewingChapterNewsletters(false);
                      }}
                      className="text-[11.5px] font-medium normal-case tracking-normal text-[#00629B] hover:underline"
                    >
                      All Chapters &rarr;
                    </Link>
                  </div>

                  {chapterLinks.map((c) => (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => {
                        setActiveChapter(c);
                        setViewingChapterNewsletters(false);
                      }}
                      className="group flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left transition-all hover:bg-[#F5F3EE] cursor-pointer"
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span className="flex h-5 w-11 shrink-0 items-center justify-center rounded bg-[#EAF1F6] text-[10px] font-bold text-[#00629B] transition-colors group-hover:bg-[#00629B] group-hover:text-white">
                          {c.abbr}
                        </span>
                        <span className="truncate text-[13px] font-medium text-[#191B1E] transition-colors group-hover:text-[#00629B]">
                          {c.label}
                        </span>
                      </div>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="shrink-0 text-[#B0B4B9] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#00629B]"
                      >
                        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  ))}
                </div>

                {/* Panel 2: Chapter Details / Sub-options (width 300px) */}
                <div className="w-[300px] shrink-0 space-y-1 px-1">
                  {activeChapter && (
                    <>
                      {/* Back button & Chapter Title */}
                      <div className="mb-1.5 flex items-center justify-between border-b border-[#E3DFD5] px-1 pb-2 pt-0.5">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveChapter(null);
                            setViewingChapterNewsletters(false);
                          }}
                          className="group flex items-center gap-1 rounded px-1.5 py-1 text-[12px] font-semibold text-[#00629B] transition-colors hover:bg-[#EAF1F6] hover:text-[#0A2540] cursor-pointer"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="transition-transform group-hover:-translate-x-0.5"
                          >
                            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>Back</span>
                        </button>
                        <span className="rounded bg-[#0A2540] px-2 py-0.5 text-[11px] font-bold tracking-wide text-white">
                          {activeChapter.abbr}
                        </span>
                      </div>

                      {/* 1. About */}
                      <Link
                        href={activeChapter.href}
                        onClick={() => {
                          setChaptersOpen(false);
                          setActiveChapter(null);
                          setViewingChapterNewsletters(false);
                        }}
                        className="group flex items-center justify-between rounded-lg px-3 py-2 transition-all hover:bg-[#F5F3EE]"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="text-[13px] font-semibold text-[#191B1E] transition-colors group-hover:text-[#00629B]">
                            About
                          </div>
                          <div className="truncate text-[11px] text-[#6E7178]">
                            Overview &amp; society vision
                          </div>
                        </div>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="shrink-0 text-[#B0B4B9] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#00629B]"
                        >
                          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>

                      {/* 2. [Chapter] Inauguration (Google Drive link) */}
                      {activeChapter.inaugDriveUrl && (
                        <a
                          href={activeChapter.inaugDriveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            setChaptersOpen(false);
                            setActiveChapter(null);
                            setViewingChapterNewsletters(false);
                          }}
                          className="group flex items-center justify-between rounded-lg px-3 py-2 transition-all hover:bg-[#F5F3EE]"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#191B1E] transition-colors group-hover:text-[#00629B]">
                              <span>{activeChapter.abbr} Inauguration</span>
                              <span className="rounded bg-[#EAF1F6] px-1 py-0.5 text-[9.5px] font-bold text-[#00629B]">
                                Drive ↗
                              </span>
                            </div>
                            <div className="truncate text-[11px] text-[#6E7178]">
                              Google Drive link
                            </div>
                          </div>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="shrink-0 text-[#B0B4B9] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#00629B]"
                          >
                            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      )}

                      {/* 3. Newsletter - Drilldown to Panel 3 */}
                      {activeNewsletters.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setViewingChapterNewsletters(true)}
                          className="group flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-all hover:bg-[#F5F3EE] cursor-pointer"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#191B1E] transition-colors group-hover:text-[#00629B]">
                              <span>Newsletter</span>
                              <span className="rounded bg-[#EAF1F6] px-1 py-0.5 text-[9.5px] font-bold text-[#00629B]">
                                {activeNewsletters.length} {activeNewsletters.length === 1 ? "Year" : "Years"}
                              </span>
                            </div>
                            <div className="truncate text-[11px] text-[#6E7178]">
                              Publications by year
                            </div>
                          </div>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="shrink-0 text-[#B0B4B9] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#00629B]"
                          >
                            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      )}

                      {/* 4. Members */}
                      <Link
                        href={activeChapter.membersHref}
                        onClick={() => {
                          setChaptersOpen(false);
                          setActiveChapter(null);
                          setViewingChapterNewsletters(false);
                        }}
                        className="group flex items-center justify-between rounded-lg px-3 py-2 transition-all hover:bg-[#F5F3EE]"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="text-[13px] font-semibold text-[#191B1E] transition-colors group-hover:text-[#00629B]">
                            Members
                          </div>
                          <div className="truncate text-[11px] text-[#6E7178]">
                            Committee &amp; executive body
                          </div>
                        </div>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="shrink-0 text-[#B0B4B9] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#00629B]"
                        >
                          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </>
                  )}
                </div>

                {/* Panel 3: Chapter Newsletters List by Year (width 300px) */}
                <div className="w-[300px] shrink-0 space-y-1 pl-2">
                  {activeChapter && (
                    <>
                      {/* Back button & Chapter Title */}
                      <div className="mb-1.5 flex items-center justify-between border-b border-[#E3DFD5] px-1 pb-2 pt-0.5">
                        <button
                          type="button"
                          onClick={() => setViewingChapterNewsletters(false)}
                          className="group flex items-center gap-1 rounded px-1.5 py-1 text-[12px] font-semibold text-[#00629B] transition-colors hover:bg-[#EAF1F6] hover:text-[#0A2540] cursor-pointer"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="transition-transform group-hover:-translate-x-0.5"
                          >
                            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>Back</span>
                        </button>
                        <span className="rounded bg-[#0A2540] px-2 py-0.5 text-[11px] font-bold tracking-wide text-white">
                          {activeChapter.abbr}
                        </span>
                      </div>

                      <div className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6E7178]">
                        Annual Publications
                      </div>

                      <div className="max-h-[220px] overflow-y-auto space-y-1 pr-1">
                        {activeNewsletters.map((nl) => (
                          <a
                            key={nl.year}
                            href={nl.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              setChaptersOpen(false);
                              setActiveChapter(null);
                              setViewingChapterNewsletters(false);
                            }}
                            className="group flex items-center justify-between rounded-lg px-2.5 py-2 transition-all hover:bg-[#F5F3EE]"
                          >
                            <span className="truncate text-[13px] font-medium text-[#191B1E] transition-colors group-hover:text-[#00629B]">
                              Newsletter {nl.year}
                            </span>
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="shrink-0 text-[#B0B4B9] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#00629B]"
                            >
                              <path d="M7 17L17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </a>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 6. About multi-level dropdown */}
      <div
        className="relative"
        onMouseEnter={() => setAboutOpen(true)}
        onMouseLeave={() => setAboutOpen(false)}
      >
        <button
          className={`relative flex items-center gap-1.5 rounded-md px-3.5 py-2 text-[13.5px] font-medium transition-colors cursor-pointer ${
            pathname.startsWith("/about")
              ? "bg-[#EAF1F6] text-[#00629B] font-semibold"
              : "text-[#3C4046] hover:bg-[#EEEAE0] hover:text-[#191B1E]"
          }`}
        >
          About
          <svg
            className={`h-2.5 w-2.5 text-[#9A9E9F] transition-transform ${aboutOpen ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5.2 7.2a.75.75 0 011.06.02L10 11.17l3.72-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0L5.2 8.27a.75.75 0 01.02-1.06z" />
          </svg>
          {pathname.startsWith("/about") && (
            <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[#00629B]" />
          )}
        </button>

        {aboutOpen && (
          <div className="absolute left-0 top-full w-[310px] pt-2 z-50">
            <div className="rounded-[10px] border border-[#E3DFD5] bg-white p-1.5 shadow-[0_12px_30px_rgba(20,22,24,0.10)]">
              {aboutLinks.map((a) => (
                <Link
                  key={a.href}
                  href={a.href}
                  className={`block rounded-md px-3 py-2 text-[13px] leading-snug transition-colors ${
                    pathname === a.href
                      ? "bg-[#EAF1F6] text-[#00629B] font-semibold"
                      : "text-[#4A4E54] hover:bg-[#F5F3EE] hover:text-[#00629B]"
                  }`}
                >
                  {a.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 7. CARC SIGHT dropdown */}
      <div
        className="relative"
        onMouseEnter={() => setCarcOpen(true)}
        onMouseLeave={() => setCarcOpen(false)}
      >
        <button className="flex items-center gap-1.5 rounded-md px-3.5 py-2 text-[13.5px] font-medium text-[#3C4046] transition-colors hover:bg-[#EEEAE0] hover:text-[#191B1E] cursor-pointer">
          CARC SIGHT
          <svg
            className={`h-2.5 w-2.5 text-[#9A9E9F] transition-transform ${carcOpen ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5.2 7.2a.75.75 0 011.06.02L10 11.17l3.72-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0L5.2 8.27a.75.75 0 01.02-1.06z" />
          </svg>
        </button>

        {carcOpen && (
          <div className="absolute right-0 top-full w-[310px] pt-2 z-50">
            <div className="rounded-[10px] border border-[#E3DFD5] bg-white p-1.5 shadow-[0_12px_30px_rgba(20,22,24,0.10)]">
              {carcLinks.map((cl) => (
                <a
                  key={cl.href}
                  href={cl.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md px-3 py-2 text-[13px] text-[#4A4E54] transition-colors hover:bg-[#F5F3EE] hover:text-[#00629B]"
                >
                  {cl.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 8. Contact & 9. Join Button */}
      <div className="flex items-center gap-3.5 pl-2">
        <Link
          href="/contact"
          className={`text-[13.5px] font-medium transition-colors ${
            pathname.startsWith("/contact")
              ? "text-[#00629B] font-semibold"
              : "text-[#3C4046] hover:text-[#191B1E]"
          }`}
        >
          Contact
        </Link>

        <Link
          href="/join"
          className={`rounded-[7px] px-[18px] py-[9px] text-[13.5px] font-semibold text-white transition-all ${
            pathname.startsWith("/join")
              ? "bg-[#0A2540] shadow-md ring-2 ring-[#00629B]"
              : "bg-[#00629B] hover:bg-[#004E7C]"
          }`}
        >
          Join IEEE
        </Link>
      </div>
    </nav>
  );
}