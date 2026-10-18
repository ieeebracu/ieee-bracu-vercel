"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { getMainEB, getChapterEB, CURRENT_YEAR } from "@/data/members";

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/ieeebracusb",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 011-1h3v-4h-3a5 5 0 00-5 5v2.01h-2l-.396 3.98h2.396v8.01z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCQmAlgoB1G5wGPFb5-xOyeQ",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M23 9.71a8.5 8.5 0 00-.91-4.13 2.92 2.92 0 00-1.72-1A78.36 78.36 0 0012 4.27a78.45 78.45 0 00-8.34.3 2.87 2.87 0 00-1.46.74c-.9.83-1 2.25-1.1 3.45a48.29 48.29 0 000 6.48 9.55 9.55 0 00.3 2 3.14 3.14 0 00.71 1.36 2.86 2.86 0 001.49.78 45.18 45.18 0 006.5.33c3.5.05 6.57 0 10.2-.46a2.9 2.9 0 001.53-.78 2.49 2.49 0 00.61-1 10.58 10.58 0 00.52-3.4c.04-.56.04-3.94.04-4.54zM9.74 14.85V8.66l5.92 3.11c-1.66.92-3.85 1.96-5.92 3.08z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/ieee-bracu-student-branch",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const contactInfo = [
  {
    label: "Visit Us",
    value: "IEEE Office, 4th Floor\nBRAC University, Kha 224\nBir Uttam Rafiqul Islam Ave\nDhaka 1212, Bangladesh",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: "Email Us",
    value: "chair@ieeebracu.com\nieeebracuds@gmail.com",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Office Hours",
    value: "Sunday – Thursday\n10:00 AM – 5:00 PM",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const contactChapters = [
  {
    abbr: "PES",
    chapter: "IEEE PES BRACU SBC",
    advisor: "Prof. Shahidul Islam Khan, EEE",
    advisorImage: "/assets/people/Advisors/Shahidul-Islam-Khan.jpeg",
  },
  {
    abbr: "CS",
    chapter: "IEEE CS BRACU SBC",
    advisor: "Mr. Annajiat Alim Rasel, CSE",
    advisorImage: "/assets/people/Advisors/Annajiat-Alim-Rasel.jpg",
  },
  {
    abbr: "RAS",
    chapter: "IEEE RAS BRACU SBC",
    advisor: "Prof. Md. Khalilur Rahman, CSE",
    advisorImage: "/assets/people/Advisors/Khalilur-Rhaman.jpg",
  },
  {
    abbr: "AESS",
    chapter: "IEEE AESS BRACU SBC",
    advisor: "Mr. Atib Mohammad Oni, EEE",
    advisorImage: "/assets/people/Advisors/Atib-Mohammad-Oni.jpg",
  },
  {
    abbr: "ComSoc",
    chapter: "IEEE ComSoc BRACU SBC",
    advisor: "Tasfin Mahmud",
    advisorImage: "/assets/people/Advisors/Tasfin-Mahmud.jpg",
  },
  {
    abbr: "EDS",
    chapter: "IEEE EDS BRACU SBC",
    advisor: "Dr. Twisha Titirsha, Ph.D.",
    advisorImage: "/assets/people/Advisors/Twisha-Titirsha.jpg",
  },
];

export default function ContactPage() {
  const mainEB = useMemo(() => getMainEB(CURRENT_YEAR), []);
  const chapterEBs = useMemo(() => {
    return contactChapters.map((ch) => ({
      ...ch,
      members: getChapterEB(ch.abbr, CURRENT_YEAR),
    }));
  }, []);

  return (
    <main className="min-h-screen bg-[#F5F3EE] font-sans">
      <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-8 sm:py-8">
        {/* Compact Header */}
        <div className="mb-6 border-b border-[#E3DFD5] pb-4">
          <h1 className="m-0 font-serif text-[22px] font-bold tracking-tight text-[#191B1E] sm:text-[26px]">
            Contact Us
          </h1>
        </div>

        {/* 3 Contact Info Cards */}
        <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {contactInfo.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-4 rounded-2xl border border-[#E3DFD5] bg-white p-6 shadow-xs"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#EAF1F6] to-[#D6E6F2] text-[#00629B]">
                {item.icon}
              </div>
              <div>
                <h3 className="m-0 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#6E7178]">
                  {item.label}
                </h3>
                <p className="m-0 mt-2 whitespace-pre-line text-[14.5px] leading-[1.65] text-[#191B1E]">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 2-Column: Map & Socials | Common Questions */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* LEFT: Map & Socials */}
          <div className="space-y-6 lg:col-span-6">
            {/* map embed */}
            <div className="overflow-hidden rounded-2xl border border-[#E3DFD5] bg-white shadow-xs">
              <iframe
                title="BRAC University Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.6034954830074!2d90.40122811543133!3d23.750078484588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8bdb9e07b29%3A0x47a3f20e1d99de0c!2sBRAC%20University!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                width="100%"
                height="260"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* social */}
            <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#E3DFD5] bg-white p-5 shadow-xs sm:flex-row">
              <div>
                <h3 className="m-0 text-[13px] font-semibold text-[#191B1E]">
                  Connect with us on social media
                </h3>
                <p className="m-0 mt-0.5 text-[12px] text-[#6E7178]">
                  Stay updated with our latest workshops, events, and announcements.
                </p>
              </div>
              <div className="flex shrink-0 gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] text-[#6E7178] transition-all hover:border-[#00629B]/30 hover:bg-[#00629B] hover:text-white hover:shadow-xs"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: FAQ quick links */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-[#E3DFD5] bg-white p-6 shadow-xs sm:p-7">
              <h3 className="m-0 mb-4 font-serif text-[18px] font-semibold text-[#191B1E]">
                Common Questions
              </h3>
              <div className="space-y-3.5">
                {[
                  {
                    q: "How do I join IEEE?",
                    a: "Visit our Join IEEE page to learn about membership benefits and the registration process.",
                    href: "/join",
                  },
                  {
                    q: "Can non-members attend events?",
                    a: "Most of our public seminars and workshops are open to all BRAC University students. Chapter-specific events may require membership.",
                  },
                  {
                    q: "How can I collaborate with the branch?",
                    a: "We welcome partnerships with student organizations, companies, and academic institutions. Reach out via email to chair@ieeebracu.com or visit our office.",
                  },
                ].map((faq, i) => (
                  <details
                    key={i}
                    className="group rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] transition-colors open:bg-white"
                  >
                    <summary className="flex cursor-pointer items-center justify-between px-5 py-3.5 text-[14.5px] font-semibold text-[#191B1E] [&::-webkit-details-marker]:hidden">
                      {faq.q}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="shrink-0 text-[#B0B4B9] transition-transform group-open:rotate-180"
                      >
                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </summary>
                    <div className="px-5 pb-4 text-[13.5px] leading-[1.65] text-[#6E7178]">
                      {faq.a}{" "}
                      {faq.href && (
                        <Link href={faq.href} className="font-semibold text-[#00629B] hover:underline">
                          Learn more →
                        </Link>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Contact Directory ── */}
      <div className="border-t border-[#E3DFD5] bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-8 sm:py-12">
          <div className="mb-8 text-center sm:mb-10">
            <div className="mb-3 flex items-center justify-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#00629B]">
              <span className="inline-block h-0.5 w-[20px] bg-[#00629B]" />
              Directory
              <span className="inline-block h-0.5 w-[20px] bg-[#00629B]" />
            </div>
            <h2 className="m-0 font-serif text-[22px] font-semibold tracking-[-0.02em] text-[#191B1E] sm:text-[28px]">
              Reach the right person directly
            </h2>
          </div>

          {/* Counselor */}
          <div className="mx-auto mb-12 max-w-[700px]">
            <div className="rounded-2xl border border-[#E3DFD5] bg-gradient-to-br from-[#F5F3EE] to-white p-6 text-center shadow-xs">
              <div className="relative mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full border-2 border-[#00629B]/20 shadow-xs">
                <Image
                  src="/assets/people/branch-counselor.jpg"
                  alt="Prof. AKM Abdul Malek Azad, PhD"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <h3 className="m-0 font-serif text-[20px] font-semibold text-[#191B1E]">Prof. AKM Abdul Malek Azad, PhD</h3>
              <p className="m-0 mt-1 text-[13px] font-medium uppercase tracking-[0.08em] text-[#00629B]">Counselor · Founder, IEEE BRACU SB</p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <a href="mailto:a.azad@bracu.ac.bd" className="rounded-lg border border-[#E3DFD5] bg-white px-4 py-2 text-[13px] font-medium text-[#191B1E] transition-colors hover:border-[#00629B]/30 hover:text-[#00629B]">a.azad@bracu.ac.bd</a>
                <a href="mailto:a.azad@ieee.org" className="rounded-lg border border-[#E3DFD5] bg-white px-4 py-2 text-[13px] font-medium text-[#191B1E] transition-colors hover:border-[#00629B]/30 hover:text-[#00629B]">a.azad@ieee.org</a>
                <a href="https://engineering.bracu.ac.bd/profile/akm-abdul-malek-azad-phd" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#00629B] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#004E7C]">View Profile</a>
              </div>
            </div>
          </div>

          {/* Main EB */}
          <div className="mb-12">
            <h3 className="m-0 mb-6 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6E7178]">
              <span className="inline-block h-0.5 w-[20px] bg-[#E3DFD5]" />Main Executive Body ({CURRENT_YEAR})
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {mainEB.map((m) => (
                <div key={`${m.name}-${m.role}`} className="rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] px-5 py-4 transition-colors hover:bg-white hover:border-[#00629B]/30">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#00629B]">{m.role}</div>
                  <div className="mt-1 text-[15px] font-semibold text-[#191B1E]">{m.name}</div>
                  {m.email && (
                    <a href={`mailto:${m.email}`} className="mt-1 block truncate text-[13px] text-[#6E7178] transition-colors hover:text-[#00629B]">{m.email}</a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chapter EBs */}
          <div className="space-y-8">
            {chapterEBs.map((ch) => (
              <div key={ch.chapter}>
                <h3 className="m-0 mb-3 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6E7178]">
                  <span className="inline-block h-0.5 w-[20px] bg-[#E3DFD5]" />{ch.chapter}
                </h3>
                <div className="mb-5 flex justify-center">
                  <div className="inline-flex items-center gap-3.5 rounded-2xl border border-[#E3DFD5] bg-[#FBFAF7] px-5 py-2.5 shadow-xs transition-colors hover:border-[#00629B]/30 hover:bg-white">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[#00629B]/20 bg-[#EAF1F6]">
                      <Image
                        src={ch.advisorImage}
                        alt={ch.advisor}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#00629B]">
                        Chapter Advisor
                      </div>
                      <div className="text-[14px] font-semibold text-[#191B1E]">{ch.advisor}</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {ch.members.map((m) => (
                    <div key={`${m.name}-${m.role}`} className="rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] px-5 py-4 transition-colors hover:bg-white hover:border-[#00629B]/30">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#00629B]">{m.role}</div>
                      <div className="mt-1 text-[15px] font-semibold text-[#191B1E]">{m.name}</div>
                      {m.email && (
                        <a href={`mailto:${m.email}`} className="mt-1 block truncate text-[13px] text-[#6E7178] transition-colors hover:text-[#00629B]">{m.email}</a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
