"use client";

import Link from "next/link";
import { useState } from "react";

type BenefitItem = {
  name: string;
  desc: string;
  url?: string;
  badge?: string;
};

type BenefitSection = {
  id: string;
  title: string;
  tagline: string;
  items: BenefitItem[];
};

const benefitSections: BenefitSection[] = [
  {
    id: "featured",
    title: "Featured & Student Benefits",
    tagline: "Essential tools and student software privileges",
    items: [
      {
        name: "IEEE memberNet",
        desc: "IEEE's exclusive online membership directory and collaboration network, connecting student and professional members worldwide.",
        url: "https://www.ieee.org/membership/membernet.html",
        badge: "Network",
      },
      {
        name: "Microsoft Student Software Offer",
        desc: "The IEEE, in conjunction with Microsoft, offers a curated selection of development software, tools, and cloud credits to IEEE Student members.",
        url: "https://www.ieee.org/membership/students/index.html",
        badge: "Software",
      },
      {
        name: "IEEE.tv Internet Broadcasting",
        desc: "Special-interest internet broadcasting network delivering award-winning programming, lectures, and documentaries on technology and engineering.",
        url: "https://ieeetv.ieee.org/",
        badge: "Media",
      },
    ],
  },
  {
    id: "trusted-voice",
    title: "Trusted Voice & Publications",
    tagline: "Authoritative research, journals, and world-class technical news",
    items: [
      {
        name: "IEEE Xplore Digital Library",
        desc: "Access to millions of peer-reviewed articles, table of contents, and abstracts from IEEE transactions, journals, and conference proceedings.",
        url: "https://ieeexplore.ieee.org/",
        badge: "Research",
      },
      {
        name: "IEEE Spectrum Magazine",
        desc: "Flagship monthly magazine covering the latest developments in technology, engineering, and science both in print and online.",
        url: "https://spectrum.ieee.org/",
        badge: "Magazine",
      },
      {
        name: "IEEE Potentials Magazine",
        desc: "Award-winning magazine dedicated to undergraduate and graduate students exploring emerging technologies and career strategies.",
        url: "https://www.ieee.org/membership/benefits/potentials.html",
        badge: "Students",
      },
      {
        name: "The Institute Newsletter",
        desc: "Monthly publication providing the latest news about IEEE, its members, events, and the profession worldwide.",
        url: "https://theinstitute.ieee.org/",
        badge: "Newsletter",
      },
      {
        name: "AskIEEE Document Delivery",
        desc: "Rapid document delivery service providing papers and articles from thousands of leading scientific and engineering publishers.",
        url: "https://www.ieee.org/",
        badge: "Service",
      },
      {
        name: "What's New @ IEEE",
        desc: "Curated email newsletters across 10 specialized technical topic areas keeping you updated on the newest breakthroughs.",
        url: "https://www.ieee.org/",
        badge: "Updates",
      },
    ],
  },
  {
    id: "global-community",
    title: "Global Community & Discounts",
    tagline: "Connecting you with members, events, and global privileges",
    items: [
      {
        name: "IEEE Sections & Local Branch",
        desc: "Network locally through the IEEE BRAC University Student Branch and the IEEE Bangladesh Section.",
        url: "https://ieeebracu.com/",
        badge: "Local",
      },
      {
        name: "Technical Society Chapters",
        desc: "Join and engage with specialized societies (PES, CS, RAS, AESS, ComSoc, EDS) through hands-on workshops and conferences.",
        url: "/chapters/pes",
        badge: "Chapters",
      },
      {
        name: "IEEE e-mail Alias (@ieee.org)",
        desc: "Professional @ieee.org email forwarding address equipped with virus protection and spam filtering.",
        url: "https://www.ieee.org/membership/benefits/email-alias.html",
        badge: "Identity",
      },
      {
        name: "ShopIEEE Discounts",
        desc: "Discounts of up to 50% on IEEE standards, technical publications, books, and merchandise.",
        url: "https://www.ieee.org/",
        badge: "Savings",
      },
      {
        name: "IEEE Conference Discounts",
        desc: "Substantial member discounts on registration fees for hundreds of international technical conferences.",
        url: "https://www.ieee.org/conferences/index.html",
        badge: "Events",
      },
      {
        name: "myIEEE Member Portal",
        desc: "Personalized, members-only gateway providing one-stop access to all your IEEE subscriptions, tools, and branch records.",
        url: "https://www.ieee.org/",
        badge: "Portal",
      },
      {
        name: "Volunteering & Leadership",
        desc: "Opportunities to hold executive roles, lead organizing committees, and gain leadership recognition on your resume.",
        badge: "Leadership",
      },
    ],
  },
  {
    id: "career",
    title: "Career, Education & Profession",
    tagline: "Accelerating your professional journey and industry connections",
    items: [
      {
        name: "IEEE Job Site",
        desc: "Locate global career opportunities, internships, and engineering jobs easily and confidentially.",
        url: "https://jobs.ieee.org/",
        badge: "Careers",
      },
      {
        name: "IEEE Mentoring Connection",
        desc: "Online program that pairs students with experienced IEEE members and industry veterans for career guidance.",
        url: "https://www.ieee.org/membership/mentoring.html",
        badge: "Mentorship",
      },
      {
        name: "Career Alert Newsletter",
        desc: "Weekly newsletter containing actionable career advice and the featured job of the week from the IEEE Job Site.",
        badge: "Weekly",
      },
      {
        name: "Education Partners Program",
        desc: "Up to a 10% tuition discount on online degree and certificate programs from partner universities.",
        url: "https://www.ieee.org/education/partners/index.html",
        badge: "Education",
      },
      {
        name: "IEEE Scholarships & Grants",
        desc: "Enhance your resume and fund your academic journey with IEEE foundation scholarships, travel grants, and student awards.",
        url: "https://www.ieee.org/about/awards/scholarships.html",
        badge: "Funding",
      },
      {
        name: "Awards & Peer Recognition",
        desc: "Celebrate and recognize the technical and organizational accomplishments of yourself and your branch peers.",
        badge: "Awards",
      },
      {
        name: "Consultants Database",
        desc: "Global directory service matching technical consultants with clients seeking specialized engineering expertise.",
        badge: "Consulting",
      },
      {
        name: "Today's Engineer",
        desc: "Monthly online resource devoted to navigating workplace culture, career development, and engineering trends.",
        badge: "Articles",
      },
    ],
  },
  {
    id: "additional",
    title: "Specialized Societies & Affinity Groups",
    tagline: "Tailor your membership to your exact passion and field",
    items: [
      {
        name: "39 IEEE Technical Societies",
        desc: "Customize your membership by joining any of the 39 IEEE Societies spanning Power, Robotics, Computer, Communications, and more.",
        url: "https://www.ieee.org/communities/societies/index.html",
        badge: "Societies",
      },
      {
        name: "IEEE Standards Association (IEEE-SA)",
        desc: "Engage with the world-renowned standards that define modern Wi-Fi (802.11), Ethernet (802.3), and power systems.",
        url: "https://standards.ieee.org/",
        badge: "Standards",
      },
      {
        name: "IEEE Women in Engineering (WIE)",
        desc: "Global network dedicated to promoting women engineers and scientists, and inspiring girls around the world to follow academic interests in STEM.",
        url: "https://wie.ieee.org/",
        badge: "WIE",
      },
      {
        name: "Proceedings of the IEEE",
        desc: "Leading authoritative journal providing in-depth review and tutorial coverage of electrical and computing technology.",
        url: "https://proceedingsoftheieee.ieee.org/",
        badge: "Journal",
      },
    ],
  },
];

export default function MembershipBenefitsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSections = benefitSections
    .map((sec) => {
      if (activeTab !== "all" && sec.id !== activeTab) return null;
      const matchedItems = sec.items.filter(
        (item) =>
          searchQuery === "" ||
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.badge?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matchedItems.length === 0) return null;
      return { ...sec, items: matchedItems };
    })
    .filter(Boolean) as BenefitSection[];

  return (
    <main className="min-h-screen bg-[#F5F3EE] font-[family-name:var(--font-sans)]">
      {/* Header */}
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
            href="/members"
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
            Members
          </Link>
          <div className="mt-4 mb-5 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#7FB4DA]">
            <span className="inline-block h-0.5 w-[26px] bg-[#7FB4DA]" />
            Complete Catalog
          </div>
          <h1 className="m-0 font-[family-name:var(--font-serif)] text-[clamp(32px,4.5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-white">
            Membership Benefits
          </h1>
          <p className="m-0 mt-4 max-w-[56ch] text-[16px] leading-[1.6] text-white/55">
            Bringing together a trusted voice, global community, and profession — empowering student
            engineers and researchers with industry-leading resources.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/members/why-how-do-you-join-ieee"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#00629B] px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#004E7C]"
            >
              Why &amp; How to Join IEEE →
            </Link>
            <a
              href="https://www.ieee.org/membership/benefits/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-5 py-2.5 text-[13.5px] font-medium text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              Official IEEE Benefits Portal ↗
            </a>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="border-b border-[#E3DFD5] bg-white">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-4 px-8 py-4 md:flex-row md:items-center md:justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Benefits" },
              { id: "featured", label: "Featured & Software" },
              { id: "trusted-voice", label: "Trusted Voice" },
              { id: "global-community", label: "Global Community" },
              { id: "career", label: "Career & Education" },
              { id: "additional", label: "Societies & WIE" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#0A2540] text-white shadow-sm"
                    : "border border-[#E3DFD5] bg-[#FBFAF7] text-[#6E7178] hover:border-[#00629B]/30 hover:text-[#191B1E]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-[260px]">
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
              placeholder="Search benefits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] py-2 pl-10 pr-4 text-[13.5px] text-[#191B1E] placeholder:text-[#B0B4B9] focus:border-[#00629B]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00629B]/10"
            />
          </div>
        </div>
      </div>

      {/* Main Benefits Content */}
      <div className="mx-auto max-w-[1320px] px-8 py-16">
        {filteredSections.length === 0 ? (
          <div className="rounded-2xl border border-[#E3DFD5] bg-white py-20 text-center">
            <p className="text-[17px] font-medium text-[#6E7178]">
              No benefits found matching &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveTab("all");
                setSearchQuery("");
              }}
              className="mt-3 text-[14px] font-semibold text-[#00629B] hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-16">
            {filteredSections.map((sec) => (
              <div key={sec.id}>
                <div className="mb-6">
                  <div className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#00629B]">
                    <span className="inline-block h-0.5 w-[26px] bg-[#00629B]" />
                    {sec.title}
                  </div>
                  <p className="mt-1 text-[14px] text-[#6E7178]">{sec.tagline}</p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {sec.items.map((item) => (
                    <div
                      key={item.name}
                      className="group flex flex-col rounded-2xl border border-[#E3DFD5] bg-white p-6 shadow-xs transition-all duration-300 hover:border-[#00629B]/30 hover:shadow-[0_12px_32px_rgba(0,98,155,0.08)]"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        {item.badge && (
                          <span className="rounded-md bg-[#EAF1F6] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#00629B]">
                            {item.badge}
                          </span>
                        )}
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#9A9E9F] transition-colors group-hover:text-[#00629B]"
                            title="Learn more"
                          >
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                          </a>
                        )}
                      </div>

                      <h3 className="m-0 font-[family-name:var(--font-serif)] text-[18px] font-semibold text-[#191B1E]">
                        {item.name}
                      </h3>

                      <p className="m-0 mt-2.5 flex-1 text-[13.5px] leading-[1.65] text-[#6E7178]">
                        {item.desc}
                      </p>

                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-1 text-[12.5px] font-semibold text-[#00629B] hover:underline"
                        >
                          Access Resource
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              d="M5 12h14M12 5l7 7-7 7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Callout Banner */}
        <div className="mt-20 rounded-3xl border border-[#E3DFD5] bg-gradient-to-br from-[#0A2540] to-[#004E7C] p-10 text-center text-white sm:p-14">
          <h2 className="m-0 font-[family-name:var(--font-serif)] text-[clamp(24px,3vw,36px)] font-semibold">
            Ready to Take Full Advantage?
          </h2>
          <p className="mx-auto mt-3 max-w-[50ch] text-[15px] leading-relaxed text-white/70">
            Join the IEEE BRAC University Student Branch today for USD $27.00/year and unlock the full
            benefits portfolio.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/members/why-how-do-you-join-ieee"
              className="rounded-xl bg-white px-7 py-3.5 text-[14px] font-semibold text-[#0A2540] transition-colors hover:bg-[#F5F3EE]"
            >
              How to Join Step-by-Step →
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-[14px] font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              Contact Branch
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
