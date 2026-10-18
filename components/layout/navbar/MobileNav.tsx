"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  chapterLinks,
  ChapterNavItem,
  aboutLinks,
  carcLinks,
} from "@/data/site/navigation";
import { getChapterBySlug } from "@/data/site/chapters";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenNewsletters: () => void;
  pathname?: string;
}

type MobileView =
  | "main"
  | "chapters"
  | "chapter-detail"
  | "chapter-newsletters"
  | "members"
  | "about"
  | "carc";

export function MobileNav({
  isOpen,
  onClose,
  onOpenNewsletters,
  pathname = "/",
}: MobileNavProps) {
  const [mounted, setMounted] = useState(false);
  const [currentView, setCurrentView] = useState<MobileView>("main");
  const [selectedChapter, setSelectedChapter] = useState<ChapterNavItem | null>(null);

  const selectedChapterData = selectedChapter ? getChapterBySlug(selectedChapter.slug) : undefined;
  const selectedNewsletters = selectedChapterData?.newsletters ?? [];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close drawer on Escape key press and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    // Reset drill-down view to main menu after drawer closes
    setTimeout(() => {
      setCurrentView("main");
      setSelectedChapter(null);
    }, 250);
  };

  if (!isOpen || !mounted) {
    return null;
  }

  const drawerContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-[100] md:hidden overflow-hidden font-sans h-screen h-[100dvh]"
    >
      {/* Backdrop overlay */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-[#0A2540]/60 backdrop-blur-sm transition-opacity animate-[drawerFadeIn_.25s_ease-out]"
        aria-hidden="true"
      />

      {/* Slide-over panel container taking full height */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-6 pointer-events-none h-screen h-[100dvh]">
        <div className="relative pointer-events-auto flex h-full h-screen h-[100dvh] w-screen max-w-[340px] sm:max-w-[375px] flex-col bg-white shadow-2xl animate-[drawerSlideIn_.3s_cubic-bezier(0.16,1,0.3,1)]">
          {/* Drawer Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-[#E3DFD5] bg-[#F5F3EE] px-5 py-4">
            <Link href="/" onClick={handleClose} className="flex items-center">
              <Image
                src="/assets/branding/ieee-bracu-logo.png"
                alt="IEEE BRAC University Student Branch"
                width={150}
                height={34}
                className="h-7 w-auto object-contain"
              />
            </Link>
            <button
              onClick={handleClose}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E3DFD5] bg-white text-[#6E7178] transition-colors hover:bg-[#E3DFD5] hover:text-[#191B1E] cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Drawer Body with Smooth Sliding Drill-Down Panels */}
          <div className="relative flex-1 overflow-hidden">
            {/* ── Screen 1: Main Menu ── */}
            <div
              className={`absolute inset-0 overflow-y-auto px-4 py-4 space-y-1.5 transition-transform duration-300 ease-out ${
                currentView === "main"
                  ? "translate-x-0"
                  : "-translate-x-full pointer-events-none"
              }`}
            >
              {/* 1. Home */}
              <Link
                href="/"
                onClick={handleClose}
                className={`flex items-center rounded-lg px-3.5 py-2.5 text-[14.5px] transition-colors ${
                  pathname === "/"
                    ? "bg-[#EAF1F6] text-[#00629B] font-semibold border-l-4 border-[#00629B]"
                    : "font-medium text-[#191B1E] hover:bg-[#F5F3EE] hover:text-[#00629B]"
                }`}
              >
                Home
              </Link>

              {/* 2. News */}
              <Link
                href="/news"
                onClick={handleClose}
                className={`flex items-center rounded-lg px-3.5 py-2.5 text-[14.5px] transition-colors ${
                  pathname.startsWith("/news")
                    ? "bg-[#EAF1F6] text-[#00629B] font-semibold border-l-4 border-[#00629B]"
                    : "font-medium text-[#191B1E] hover:bg-[#F5F3EE] hover:text-[#00629B]"
                }`}
              >
                News
              </Link>

              {/* 3. Members Drill-Down Trigger */}
              <button
                type="button"
                onClick={() => setCurrentView("members")}
                className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-[14.5px] transition-colors cursor-pointer ${
                  pathname.startsWith("/members")
                    ? "bg-[#EAF1F6] text-[#00629B] font-semibold"
                    : "font-medium text-[#191B1E] hover:bg-[#F5F3EE] hover:text-[#00629B]"
                }`}
              >
                <span>Members</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#00629B]">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* 4. Newsletters Button */}
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  onOpenNewsletters();
                }}
                className="flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-[14.5px] font-medium text-[#191B1E] transition-colors hover:bg-[#F5F3EE] hover:text-[#00629B] cursor-pointer"
              >
                <span>Newsletters</span>
                <span className="rounded bg-[#EAF1F6] px-2 py-0.5 text-[11px] font-semibold text-[#00629B]">
                  By Year
                </span>
              </button>

              {/* 5. Chapters Drill-Down Trigger */}
              <button
                type="button"
                onClick={() => setCurrentView("chapters")}
                className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-[14.5px] transition-colors cursor-pointer ${
                  pathname.startsWith("/chapters")
                    ? "bg-[#EAF1F6] text-[#00629B] font-semibold"
                    : "font-medium text-[#191B1E] hover:bg-[#F5F3EE] hover:text-[#00629B]"
                }`}
              >
                <span>Chapters</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#00629B]">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* 6. About Drill-Down Trigger */}
              <button
                type="button"
                onClick={() => setCurrentView("about")}
                className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-[14.5px] transition-colors cursor-pointer ${
                  pathname.startsWith("/about")
                    ? "bg-[#EAF1F6] text-[#00629B] font-semibold"
                    : "font-medium text-[#191B1E] hover:bg-[#F5F3EE] hover:text-[#00629B]"
                }`}
              >
                <span>About</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#00629B]">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* 7. CARC SIGHT Drill-Down Trigger */}
              <button
                type="button"
                onClick={() => setCurrentView("carc")}
                className="flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-[14.5px] font-medium text-[#191B1E] transition-colors hover:bg-[#F5F3EE] hover:text-[#00629B] cursor-pointer"
              >
                <span>CARC SIGHT</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#00629B]">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* 8. Contact */}
              <Link
                href="/contact"
                onClick={handleClose}
                className={`flex items-center rounded-lg px-3.5 py-2.5 text-[14.5px] transition-colors ${
                  pathname.startsWith("/contact")
                    ? "bg-[#EAF1F6] text-[#00629B] font-semibold border-l-4 border-[#00629B]"
                    : "font-medium text-[#191B1E] hover:bg-[#F5F3EE] hover:text-[#00629B]"
                }`}
              >
                Contact
              </Link>
            </div>

            {/* ── Screen 2: Chapters List (No PES, CS logos - pure elegant titles) ── */}
            <div
              className={`absolute inset-0 overflow-y-auto px-4 py-4 space-y-2 transition-transform duration-300 ease-out ${
                currentView === "chapters"
                  ? "translate-x-0"
                  : currentView === "main"
                  ? "translate-x-full pointer-events-none"
                  : "-translate-x-full pointer-events-none"
              }`}
            >
              {/* Header with Back button */}
              <div className="flex items-center justify-between border-b border-[#E3DFD5] pb-2.5 mb-2.5">
                <button
                  type="button"
                  onClick={() => setCurrentView("main")}
                  className="group flex items-center gap-1.5 text-[13px] font-semibold text-[#00629B] hover:text-[#0A2540] transition-colors cursor-pointer rounded px-2 py-1 hover:bg-[#EAF1F6]"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="transition-transform group-hover:-translate-x-0.5"
                  >
                    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Main Menu</span>
                </button>
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#6E7178]">
                  Chapters
                </span>
              </div>

              {/* Directory shortcut banner */}
              <Link
                href="/chapters"
                onClick={handleClose}
                className="flex items-center justify-between rounded-xl bg-[#00629B] px-3.5 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 group"
              >
                <span>All Chapters Directory</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              {/* Chapter Items List — Clean, no badges/logos */}
              <div className="space-y-1.5 pt-1">
                {chapterLinks.map((c) => (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => {
                      setSelectedChapter(c);
                      setCurrentView("chapter-detail");
                    }}
                    className="group flex w-full items-center justify-between rounded-xl border border-[#E3DFD5] bg-white p-3.5 text-left transition-all hover:border-[#00629B]/40 hover:bg-[#F5F3EE] hover:shadow-xs cursor-pointer"
                  >
                    <span className="text-[14px] font-medium text-[#191B1E] transition-colors group-hover:text-[#00629B]">
                      {c.label}
                    </span>
                    <svg
                      width="15"
                      height="15"
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
            </div>

            {/* ── Screen 3: Chapter Sub-Options (Clean, no icons) ── */}
            <div
              className={`absolute inset-0 overflow-y-auto px-4 py-4 space-y-3 transition-transform duration-300 ease-out ${
                currentView === "chapter-detail"
                  ? "translate-x-0"
                  : currentView === "chapter-newsletters"
                  ? "-translate-x-full pointer-events-none"
                  : "translate-x-full pointer-events-none"
              }`}
            >
              {selectedChapter && (
                <>
                  {/* Header with Back button & Chapter Title */}
                  <div className="border-b border-[#E3DFD5] pb-3 mb-2">
                    <button
                      type="button"
                      onClick={() => setCurrentView("chapters")}
                      className="group mb-2 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#00629B] hover:text-[#0A2540] transition-colors cursor-pointer rounded px-2 py-1 hover:bg-[#EAF1F6]"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="transition-transform group-hover:-translate-x-0.5"
                      >
                        <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>Back to Chapters</span>
                    </button>
                    <div className="px-1 text-[16px] font-bold text-[#191B1E] leading-snug">
                      {selectedChapter.label}
                    </div>
                  </div>

                  {/* 4 Clean Options */}
                  <div className="space-y-2 pt-1">
                    {/* 1. About */}
                    <Link
                      href={selectedChapter.href}
                      onClick={handleClose}
                      className="group flex items-center justify-between rounded-xl border border-[#E3DFD5] bg-white px-4 py-3 transition-all hover:border-[#00629B]/40 hover:bg-[#F5F3EE] hover:shadow-xs"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-[14px] font-semibold text-[#191B1E] transition-colors group-hover:text-[#00629B]">
                          About
                        </div>
                        <div className="text-[12px] text-[#6E7178] mt-0.5">
                          Overview, vision &amp; executive body
                        </div>
                      </div>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="shrink-0 text-[#B0B4B9] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#00629B]"
                      >
                        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>

                    {/* 2. [Chapter] Inauguration (only a drive link) */}
                    {selectedChapter.inaugDriveUrl && (
                      <a
                        href={selectedChapter.inaugDriveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleClose}
                        className="group flex items-center justify-between rounded-xl border border-[#E3DFD5] bg-white px-4 py-3 transition-all hover:border-[#00629B]/40 hover:bg-[#F5F3EE] hover:shadow-xs"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 text-[14px] font-semibold text-[#191B1E] group-hover:text-[#00629B] transition-colors">
                            <span>{selectedChapter.abbr} Inauguration</span>
                            <span className="rounded bg-[#EAF1F6] px-1.5 py-0.5 text-[10.5px] font-bold text-[#00629B]">
                              Drive ↗
                            </span>
                          </div>
                          <div className="text-[12px] text-[#6E7178] mt-0.5">
                            Official Google Drive report link
                          </div>
                        </div>
                        <svg
                          width="15"
                          height="15"
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

                    {/* 3. Newsletter */}
                    {selectedNewsletters.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setCurrentView("chapter-newsletters")}
                        className="group flex w-full items-center justify-between rounded-xl border border-[#E3DFD5] bg-white px-4 py-3 text-left transition-all hover:border-[#00629B]/40 hover:bg-[#F5F3EE] hover:shadow-xs cursor-pointer"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[14px] font-semibold text-[#191B1E] transition-colors group-hover:text-[#00629B]">
                              Newsletter
                            </span>
                            <span className="rounded bg-[#EAF1F6] px-1.5 py-0.5 text-[10px] font-bold text-[#00629B]">
                              {selectedNewsletters.length} {selectedNewsletters.length === 1 ? "Edition" : "Editions"}
                            </span>
                          </div>
                          <div className="text-[12px] text-[#6E7178] mt-0.5">
                            Annual society publications &amp; archives
                          </div>
                        </div>
                        <svg
                          width="15"
                          height="15"
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
                      href={selectedChapter.membersHref}
                      onClick={handleClose}
                      className="group flex items-center justify-between rounded-xl border border-[#E3DFD5] bg-white px-4 py-3 transition-all hover:border-[#00629B]/40 hover:bg-[#F5F3EE] hover:shadow-xs"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-[14px] font-semibold text-[#191B1E] transition-colors group-hover:text-[#00629B]">
                          Members
                        </div>
                        <div className="text-[12px] text-[#6E7178] mt-0.5">
                          Executive committee &amp; student members
                        </div>
                      </div>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="shrink-0 text-[#B0B4B9] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#00629B]"
                      >
                        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* ── Screen 3b: Chapter Newsletters Drill-Down ── */}
            <div
              className={`absolute inset-0 overflow-y-auto px-4 py-4 space-y-2 transition-transform duration-300 ease-out ${
                currentView === "chapter-newsletters"
                  ? "translate-x-0"
                  : "translate-x-full pointer-events-none"
              }`}
            >
              {/* Header with Back button & Chapter Title */}
              <div className="border-b border-[#E3DFD5] pb-2.5 mb-2.5">
                <button
                  type="button"
                  onClick={() => setCurrentView("chapter-detail")}
                  className="group mb-1.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#00629B] hover:text-[#0A2540] transition-colors cursor-pointer rounded px-2 py-1 hover:bg-[#EAF1F6]"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="transition-transform group-hover:-translate-x-0.5"
                  >
                    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Back to {selectedChapter?.abbr || "Chapter"}</span>
                </button>
                <div className="flex items-center justify-between px-1">
                  <span className="text-[15px] font-bold text-[#191B1E]">
                    {selectedChapter?.abbr} Newsletters
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6E7178]">
                    By Year
                  </span>
                </div>
              </div>

              {/* Chapter Newsletters List */}
              <div className="space-y-1.5 pt-1">
                {selectedNewsletters.length > 0 ? (
                  selectedNewsletters.map((nl) => (
                    <a
                      key={nl.year}
                      href={nl.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleClose}
                      className="group flex w-full items-center justify-between rounded-xl border border-[#E3DFD5] bg-white p-3.5 text-left transition-all hover:border-[#00629B]/40 hover:bg-[#F5F3EE] hover:shadow-xs"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-[14px] font-semibold text-[#191B1E] group-hover:text-[#00629B] transition-colors">
                          Newsletter {nl.year}
                        </div>
                        <div className="text-[12px] text-[#6E7178] mt-0.5">
                          Google Drive ↗
                        </div>
                      </div>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="shrink-0 text-[#B0B4B9] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#00629B]"
                      >
                        <path d="M7 17L17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ))
                ) : (
                  <div className="py-8 text-center text-[13px] text-[#6E7178]">
                    No newsletters available for this chapter yet.
                  </div>
                )}
              </div>
            </div>

            {/* ── Screen 4: Members Sub-Options Drill-Down (Clean, no icons) ── */}
            <div
              className={`absolute inset-0 overflow-y-auto px-4 py-4 space-y-2.5 transition-transform duration-300 ease-out ${
                currentView === "members"
                  ? "translate-x-0"
                  : "translate-x-full pointer-events-none"
              }`}
            >
              {/* Header with Back button */}
              <div className="flex items-center justify-between border-b border-[#E3DFD5] pb-2.5 mb-2.5">
                <button
                  type="button"
                  onClick={() => setCurrentView("main")}
                  className="group flex items-center gap-1.5 text-[13px] font-semibold text-[#00629B] hover:text-[#0A2540] transition-colors cursor-pointer rounded px-2 py-1 hover:bg-[#EAF1F6]"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="transition-transform group-hover:-translate-x-0.5"
                  >
                    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Main Menu</span>
                </button>
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#6E7178]">
                  Members
                </span>
              </div>

              {/* Members Options List */}
              <div className="space-y-2 pt-1">
                {/* 1. Memberlist by Year */}
                <Link
                  href="/members"
                  onClick={handleClose}
                  className="group flex items-center justify-between rounded-xl border border-[#E3DFD5] bg-white px-4 py-3 transition-all hover:border-[#00629B]/40 hover:bg-[#F5F3EE] hover:shadow-xs"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-[14px] font-semibold text-[#191B1E] group-hover:text-[#00629B] transition-colors">
                      Memberlist by Year
                    </div>
                    <div className="text-[12px] text-[#6E7178] mt-0.5">
                      Executive body &amp; student members directory
                    </div>
                  </div>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-[#B0B4B9] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#00629B]">
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>

                {/* 2. Why & How Do You Join IEEE? */}
                <Link
                  href="/members/why-how-do-you-join-ieee"
                  onClick={handleClose}
                  className="group flex items-center justify-between rounded-xl border border-[#E3DFD5] bg-white px-4 py-3 transition-all hover:border-[#00629B]/40 hover:bg-[#F5F3EE] hover:shadow-xs"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-[14px] font-semibold text-[#191B1E] group-hover:text-[#00629B] transition-colors">
                      Why &amp; How Do You Join IEEE?
                    </div>
                    <div className="text-[12px] text-[#6E7178] mt-0.5">
                      Onboarding instructions &amp; registration guide
                    </div>
                  </div>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-[#B0B4B9] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#00629B]">
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>

                {/* 3. Membership Benefits */}
                <Link
                  href="/members/membership-benefits"
                  onClick={handleClose}
                  className="group flex items-center justify-between rounded-xl border border-[#E3DFD5] bg-white px-4 py-3 transition-all hover:border-[#00629B]/40 hover:bg-[#F5F3EE] hover:shadow-xs"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-[14px] font-semibold text-[#191B1E] group-hover:text-[#00629B] transition-colors">
                      Membership Benefits
                    </div>
                    <div className="text-[12px] text-[#6E7178] mt-0.5">
                      IEEE Xplore, discounts, networking &amp; perks
                    </div>
                  </div>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-[#B0B4B9] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#00629B]">
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* ── Screen 5: About Sub-Options Drill-Down (Clean, no icons) ── */}
            <div
              className={`absolute inset-0 overflow-y-auto px-4 py-4 space-y-2.5 transition-transform duration-300 ease-out ${
                currentView === "about"
                  ? "translate-x-0"
                  : "translate-x-full pointer-events-none"
              }`}
            >
              {/* Header with Back button */}
              <div className="flex items-center justify-between border-b border-[#E3DFD5] pb-2.5 mb-2.5">
                <button
                  type="button"
                  onClick={() => setCurrentView("main")}
                  className="group flex items-center gap-1.5 text-[13px] font-semibold text-[#00629B] hover:text-[#0A2540] transition-colors cursor-pointer rounded px-2 py-1 hover:bg-[#EAF1F6]"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="transition-transform group-hover:-translate-x-0.5"
                  >
                    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Main Menu</span>
                </button>
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#6E7178]">
                  About
                </span>
              </div>

              {/* About Options List */}
              <div className="space-y-2 pt-1">
                {aboutLinks.map((a) => (
                  <Link
                    key={a.href}
                    href={a.href}
                    onClick={handleClose}
                    className="group flex w-full items-center justify-between rounded-xl border border-[#E3DFD5] bg-white px-4 py-3.5 text-left transition-all hover:border-[#00629B]/40 hover:bg-[#F5F3EE] hover:shadow-xs"
                  >
                    <span className="text-[14px] font-medium text-[#191B1E] group-hover:text-[#00629B] transition-colors leading-snug">
                      {a.label}
                    </span>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="shrink-0 text-[#B0B4B9] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#00629B]"
                    >
                      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>

            {/* ── Screen 6: CARC SIGHT Sub-Options Drill-Down (Clean, no icons) ── */}
            <div
              className={`absolute inset-0 overflow-y-auto px-4 py-4 space-y-2.5 transition-transform duration-300 ease-out ${
                currentView === "carc"
                  ? "translate-x-0"
                  : "translate-x-full pointer-events-none"
              }`}
            >
              {/* Header with Back button */}
              <div className="flex items-center justify-between border-b border-[#E3DFD5] pb-2.5 mb-2.5">
                <button
                  type="button"
                  onClick={() => setCurrentView("main")}
                  className="group flex items-center gap-1.5 text-[13px] font-semibold text-[#00629B] hover:text-[#0A2540] transition-colors cursor-pointer rounded px-2 py-1 hover:bg-[#EAF1F6]"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="transition-transform group-hover:-translate-x-0.5"
                  >
                    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Main Menu</span>
                </button>
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#6E7178]">
                  CARC SIGHT
                </span>
              </div>

              {/* CARC SIGHT Options List */}
              <div className="space-y-2 pt-1">
                {carcLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleClose}
                    className="group flex w-full items-center justify-between rounded-xl border border-[#E3DFD5] bg-white px-4 py-3.5 text-left transition-all hover:border-[#00629B]/40 hover:bg-[#F5F3EE] hover:shadow-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-medium text-[#191B1E] group-hover:text-[#00629B] transition-colors leading-snug">
                        {item.label}
                      </span>
                      <span className="rounded bg-[#EAF1F6] px-1.5 py-0.5 text-[10px] font-bold text-[#00629B]">
                        External ↗
                      </span>
                    </div>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="shrink-0 text-[#B0B4B9] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#00629B]"
                    >
                      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="border-t border-[#E3DFD5] bg-[#F5F3EE] p-5 space-y-3 shrink-0">
            <Link
              href="/join"
              onClick={handleClose}
              className="block w-full rounded-lg bg-[#00629B] py-2.5 text-center text-[14px] font-semibold text-white transition-colors hover:bg-[#004E7C]"
            >
              Join IEEE
            </Link>
            <div className="flex items-center justify-center gap-4 pt-1 text-[#6E7178]">
              <a
                href="https://www.facebook.com/ieeebracusb"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="hover:text-[#1877F2] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/ieee-bracu-sb/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="hover:text-[#0A66C2] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/ieeebracusb/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="hover:text-[#E4405F] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@ieeebracustudentbranch"
              target="_blank"
              rel="noopener noreferrer"
              title="YouTube"
              className="hover:text-[#FF0000] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  );

  return createPortal(drawerContent, document.body);
}