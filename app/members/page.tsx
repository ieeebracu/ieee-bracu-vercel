"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  availableYears,
  ebFilters,
  studentChapterFilters,
  getExecutiveMembersByYear,
  getStudentMembersByYear,
  type EBLeader,
  type StudentMember,
} from "@/data/members";

type SortKey = "sl" | "name" | "chapter" | "dept";

const quickYears = [2026, 2025, 2024, 2023, 2022];
const olderYears = availableYears.filter((y) => !quickYears.includes(y));

function EBCard({ m, idx }: { m: EBLeader; idx: number }) {
  return (
    <div
      key={`${m.name}-${m.role}-${idx}`}
      className="group flex w-full max-w-[280px] flex-col items-center rounded-2xl border border-[#E3DFD5] bg-white p-6 text-center shadow-xs transition-all duration-300 hover:border-[#00629B]/25 hover:shadow-[0_12px_32px_rgba(0,98,155,0.08)]"
    >
      {/* Circular portrait frame */}
      <div className="relative mb-4 flex h-36 w-36 items-center justify-center rounded-full border-2 border-[#E3DFD5] bg-white p-1.5 shadow-xs transition-all duration-300 group-hover:border-[#00629B] group-hover:shadow-[0_10px_28px_rgba(0,98,155,0.15)] sm:h-44 sm:w-44">
        <div className="relative h-full w-full overflow-hidden rounded-full bg-[#F5F3EE]">
          {m.image ? (
            <Image
              src={m.image}
              alt={m.name}
              fill
              sizes="(max-width: 640px) 144px, 176px"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#EAF1F6] to-[#D6E6F2] text-[#00629B]">
              <span className="font-[family-name:var(--font-serif)] text-[24px] font-bold sm:text-[28px]">
                {m.name
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

      <span className="mb-1 rounded-md bg-[#F5F3EE] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#00629B]">
        {m.body}
      </span>
      <h3 className="m-0 text-[15px] font-semibold text-[#191B1E] sm:text-[16px]">
        {m.name}
      </h3>
      <span className="mt-0.5 text-[12px] font-medium uppercase tracking-[0.08em] text-[#6E7178]">
        {m.role}
      </span>

      {m.email && (
        <a
          href={`mailto:${m.email}`}
          className="mt-3 inline-flex items-center gap-1.5 text-[12px] text-[#00629B] hover:underline"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          Email
        </a>
      )}
    </div>
  );
}

function MembersContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "students" ? "students" : "eb";
  const initialBody = searchParams.get("body") || "All";
  const initialChapter = searchParams.get("chapter") || "All";
  const initialYearParam = searchParams.get("year");
  const parsedYear = initialYearParam ? parseInt(initialYearParam, 10) : 2026;
  const initialYear = availableYears.includes(parsedYear) ? parsedYear : 2026;

  const [activeTab, setActiveTab] = useState<"eb" | "students">(initialTab);
  const [selectedYear, setSelectedYear] = useState<number>(initialYear);
  const [activeEbBody, setActiveEbBody] = useState<string>(initialBody);
  const [activeStudentChapter, setActiveStudentChapter] = useState<string>(initialChapter);
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortKey>("sl");
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  // Load year-specific members from data
  const ebForYear = useMemo(() => {
    return getExecutiveMembersByYear(selectedYear);
  }, [selectedYear]);

  const studentsForYear = useMemo(() => {
    return getStudentMembersByYear(selectedYear);
  }, [selectedYear]);

  // Filtered EB Members
  const filteredEB = useMemo(() => {
    return ebForYear.filter((m) => {
      const matchBody = activeEbBody === "All" || m.body === activeEbBody;
      const q = search.toLowerCase().trim();
      const matchSearch =
        q === "" ||
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.body.toLowerCase().includes(q) ||
        (m.email && m.email.toLowerCase().includes(q));
      return matchBody && matchSearch;
    });
  }, [ebForYear, activeEbBody, search]);

  // Grouped EB Members by body for organized section headers
  const groupedEB = useMemo(() => {
    const bodyOrder = ["Main Body", "PES", "CS", "RAS", "AESS", "ComSoc", "EDS"];
    const groups: Record<string, EBLeader[]> = {};

    filteredEB.forEach((m) => {
      const b = m.body || "Main Body";
      if (!groups[b]) groups[b] = [];
      groups[b].push(m);
    });

    const ordered: [string, EBLeader[]][] = [];
    bodyOrder.forEach((b) => {
      if (groups[b] && groups[b].length > 0) {
        ordered.push([b, groups[b]]);
      }
    });

    Object.keys(groups).forEach((b) => {
      if (!bodyOrder.includes(b) && groups[b].length > 0) {
        ordered.push([b, groups[b]]);
      }
    });

    return ordered;
  }, [filteredEB]);

  // Filtered and Sorted Student Members
  const filteredAndSortedStudents = useMemo(() => {
    const list = studentsForYear.filter((s) => {
      const matchChapter =
        activeStudentChapter === "All" || s.chapters.includes(activeStudentChapter);
      const q = search.toLowerCase().trim();
      const matchSearch =
        q === "" ||
        s.name.toLowerCase().includes(q) ||
        s.chapters.some((c) => c.toLowerCase().includes(q)) ||
        s.dept.toLowerCase().includes(q) ||
        s.sl.toString().includes(q);
      return matchChapter && matchSearch;
    });

    return list.sort((a, b) => {
      let cmp = 0;
      if (sortBy === "sl") cmp = a.sl - b.sl;
      else if (sortBy === "name") cmp = a.name.localeCompare(b.name);
      else if (sortBy === "chapter")
        cmp = a.chapters.join(", ").localeCompare(b.chapters.join(", "));
      else if (sortBy === "dept") cmp = a.dept.localeCompare(b.dept);
      return sortAsc ? cmp : -cmp;
    });
  }, [studentsForYear, activeStudentChapter, search, sortBy, sortAsc]);

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(key);
      setSortAsc(true);
    }
  };

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
            Members &amp; Leadership Directory
          </div>
          <h1 className="m-0 font-[family-name:var(--font-serif)] text-[clamp(32px,4.5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-white">
            Memberlist by Year
          </h1>
          <p className="m-0 mt-4 max-w-[54ch] text-[16px] leading-[1.6] text-white/55">
            Browse Executive Body officers or sort and search student members across all technical
            societies &amp; chapters.
          </p>

          {/* Quick Links */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/members/why-how-do-you-join-ieee"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-[13px] font-medium text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              Why &amp; How to Join →
            </Link>
            <Link
              href="/members/membership-benefits"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-[13px] font-medium text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              Membership Benefits →
            </Link>
          </div>
        </div>
      </div>

      {/* Primary Tab Switcher & Filter Bar */}
      <div className="border-b border-[#E3DFD5] bg-white shadow-xs">
        <div className="mx-auto max-w-[1320px] px-8 py-5">
          {/* Main Category Tabs + Year Selector */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-[#E3DFD5] pb-4">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("eb");
                  setSearch("");
                }}
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[14px] font-semibold transition-all cursor-pointer ${
                  activeTab === "eb"
                    ? "bg-[#0A2540] text-white shadow-sm"
                    : "border border-[#E3DFD5] bg-[#FBFAF7] text-[#6E7178] hover:bg-[#F5F3EE] hover:text-[#191B1E]"
                }`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" />
                  <path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
                Executive Body ({ebForYear.length})
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("students");
                  setSearch("");
                }}
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[14px] font-semibold transition-all cursor-pointer ${
                  activeTab === "students"
                    ? "bg-[#0A2540] text-white shadow-sm"
                    : "border border-[#E3DFD5] bg-[#FBFAF7] text-[#6E7178] hover:bg-[#F5F3EE] hover:text-[#191B1E]"
                }`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                Student Members ({studentsForYear.length})
              </button>
            </div>

            {/* Year Selector */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#6E7178]">
                Year:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {quickYears.map((y) => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => setSelectedYear(y)}
                    className={`rounded-lg px-3 py-1.5 text-[13px] font-semibold transition-all cursor-pointer ${
                      selectedYear === y
                        ? "bg-[#00629B] text-white shadow-sm"
                        : "border border-[#E3DFD5] bg-[#FBFAF7] text-[#4A4E54] hover:bg-[#F5F3EE]"
                    }`}
                  >
                    {y}
                  </button>
                ))}

                {/* Dropdown for older archive years */}
                <div className="relative inline-flex items-center">
                  <select
                    aria-label="Select from older archive years"
                    value={olderYears.includes(selectedYear) ? selectedYear : ""}
                    onChange={(e) => {
                      if (e.target.value) {
                        setSelectedYear(Number(e.target.value));
                      }
                    }}
                    className={`rounded-lg border px-3 py-1.5 text-[13px] font-semibold transition-all cursor-pointer focus:outline-none ${
                      olderYears.includes(selectedYear)
                        ? "border-[#00629B] bg-[#00629B] text-white shadow-sm"
                        : "border-[#E3DFD5] bg-[#FBFAF7] text-[#4A4E54] hover:border-[#00629B]/30 hover:bg-[#F5F3EE]"
                    }`}
                  >
                    <option value="" disabled className="text-[#191B1E] bg-white">
                      {olderYears.includes(selectedYear) ? `Year: ${selectedYear} ▾` : "More Years (2008–2021) ▾"}
                    </option>
                    {olderYears.map((y) => (
                      <option key={y} value={y} className="text-[#191B1E] bg-white">
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Pills & Live Search */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Filter pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#6E7178]">
                {activeTab === "eb" ? "Body:" : "Chapter:"}
              </span>
              {(activeTab === "eb" ? ebFilters : studentChapterFilters).map((item) => {
                const isSelected =
                  activeTab === "eb" ? activeEbBody === item : activeStudentChapter === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      if (activeTab === "eb") setActiveEbBody(item);
                      else setActiveStudentChapter(item);
                    }}
                    className={`rounded-full px-3.5 py-1 text-[12.5px] font-medium transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#0A2540] text-white shadow-sm"
                        : "border border-[#E3DFD5] bg-[#FBFAF7] text-[#6E7178] hover:border-[#00629B]/30 hover:text-[#191B1E]"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            {/* Live Search */}
            <div className="relative w-full md:w-[280px]">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B0B4B9]"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder={
                  activeTab === "eb"
                    ? "Search EB by name, role..."
                    : "Search student by name, chapter..."
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] py-2 pl-10 pr-4 text-[13px] text-[#191B1E] placeholder:text-[#B0B4B9] focus:border-[#00629B]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00629B]/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-[1320px] px-8 py-16">
        {activeTab === "eb" ? (
          /* ── TAB 1: Executive Body Grid ── */
          <div>
            {filteredEB.length === 0 ? (
              <div className="rounded-2xl border border-[#E3DFD5] bg-white py-20 text-center">
                <p className="text-[17px] font-medium text-[#6E7178]">
                  No Executive Body members found for {selectedYear}
                  {activeEbBody !== "All" ? ` in ${activeEbBody}` : ""}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedYear(2026);
                    setActiveEbBody("All");
                    setSearch("");
                  }}
                  className="mt-3 text-[14px] font-semibold text-[#00629B] hover:underline cursor-pointer"
                >
                  View 2026 Executive Body
                </button>
              </div>
            ) : (
              <div className="space-y-16">
                {groupedEB.map(([bodyName, members]) => (
                  <div key={bodyName}>
                    {activeEbBody === "All" && (
                      <div className="mb-8 flex items-center justify-center gap-4">
                        <div className="h-px flex-1 bg-[#E3DFD5]" />
                        <h3 className="m-0 text-center text-[13px] sm:text-[14px] font-semibold uppercase tracking-[0.14em] text-[#6E7178]">
                          {bodyName === "Main Body"
                            ? "Main Executive Body"
                            : bodyName === "WIE"
                            ? "IEEE WIE BRACU AG"
                            : `IEEE ${bodyName} BRACU SBC`}
                        </h3>
                        <div className="h-px flex-1 bg-[#E3DFD5]" />
                      </div>
                    )}
                    <div className="grid grid-cols-2 justify-items-center gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-10">
                      {members.map((m, idx) => (
                        <EBCard key={`${m.name}-${m.role}-${idx}`} m={m} idx={idx} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* ── TAB 2: Student Members Table ── */
          <div>
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="m-0 font-[family-name:var(--font-serif)] text-[22px] font-semibold text-[#191B1E]">
                  IEEE BRACU SB Student Members · {selectedYear}
                </h2>
                <p className="m-0 mt-1 text-[13.5px] text-[#6E7178]">
                  Showing {filteredAndSortedStudents.length} registered student members
                  {activeStudentChapter !== "All" ? ` in ${activeStudentChapter}` : ""}
                  {search ? ` matching "${search}"` : ""}
                </p>
              </div>

              {/* Sort selector for quick switching */}
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#6E7178]">
                  Sort By:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortKey)}
                  className="rounded-lg border border-[#E3DFD5] bg-white px-3 py-1.5 text-[13px] font-medium text-[#191B1E] focus:border-[#00629B] focus:outline-none"
                >
                  <option value="sl">Serial Number (Sl.)</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="chapter">Chapter / Society</option>
                  <option value="dept">Department</option>
                </select>
                <button
                  type="button"
                  onClick={() => setSortAsc(!sortAsc)}
                  title="Toggle Ascending / Descending"
                  className="rounded-lg border border-[#E3DFD5] bg-white p-1.5 text-[#6E7178] hover:bg-[#F5F3EE] cursor-pointer"
                >
                  {sortAsc ? "▲" : "▼"}
                </button>
              </div>
            </div>

            {filteredAndSortedStudents.length === 0 ? (
              <div className="rounded-2xl border border-[#E3DFD5] bg-white py-20 text-center">
                <p className="text-[17px] font-medium text-[#6E7178]">
                  No student members found for {selectedYear}
                  {activeStudentChapter !== "All" ? ` in ${activeStudentChapter}` : ""}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedYear(2026);
                    setActiveStudentChapter("All");
                    setSearch("");
                  }}
                  className="mt-3 text-[14px] font-semibold text-[#00629B] hover:underline cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-[#E3DFD5] bg-white shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#E3DFD5] bg-[#0A2540] text-white">
                        <th
                          onClick={() => handleSort("sl")}
                          className="cursor-pointer px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-white/80 w-[90px] hover:text-white"
                        >
                          Sl. {sortBy === "sl" ? (sortAsc ? "▲" : "▼") : ""}
                        </th>
                        <th
                          onClick={() => handleSort("name")}
                          className="cursor-pointer px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-white/80 hover:text-white"
                        >
                          Full Name {sortBy === "name" ? (sortAsc ? "▲" : "▼") : ""}
                        </th>
                        <th
                          onClick={() => handleSort("chapter")}
                          className="cursor-pointer px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-white/80 hover:text-white"
                        >
                          Chapters / Societies {sortBy === "chapter" ? (sortAsc ? "▲" : "▼") : ""}
                        </th>
                        <th
                          onClick={() => handleSort("dept")}
                          className="cursor-pointer px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-white/80 text-right w-[140px] hover:text-white"
                        >
                          Dept. {sortBy === "dept" ? (sortAsc ? "▲" : "▼") : ""}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E3DFD5]">
                      {filteredAndSortedStudents.map((s) => (
                        <tr
                          key={`${s.sl}-${s.name}`}
                          className="transition-colors hover:bg-[#F5F3EE]/80"
                        >
                          <td className="px-6 py-3.5 text-[13.5px] font-medium text-[#6E7178]">
                            {s.sl}
                          </td>
                          <td className="px-6 py-3.5 text-[14.5px] font-semibold text-[#191B1E]">
                            {s.name}
                          </td>
                          <td className="px-6 py-3.5">
                            <div className="flex flex-wrap gap-1.5">
                              {s.chapters.map((ch) => (
                                <span
                                  key={ch}
                                  className="inline-block rounded-md bg-[#EAF1F6] px-2.5 py-0.5 text-[11.5px] font-semibold text-[#00629B]"
                                >
                                  {ch}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-3.5 text-right">
                            <span
                              className={`inline-block rounded-md px-2.5 py-1 text-[11.5px] font-bold uppercase tracking-[0.06em] ${
                                s.dept.toUpperCase().includes("CSE")
                                  ? "bg-blue-50 text-blue-700"
                                  : s.dept.toUpperCase().includes("EEE")
                                  ? "bg-amber-50 text-amber-800"
                                  : s.dept.toUpperCase().includes("CS")
                                  ? "bg-emerald-50 text-emerald-800"
                                  : "bg-purple-50 text-purple-800"
                              }`}
                            >
                              {s.dept}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default function MembersPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F5F3EE] p-12 text-center text-[#6E7178]">
          Loading directory...
        </div>
      }
    >
      <MembersContent />
    </Suspense>
  );
}
