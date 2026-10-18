"use client";

import Link from "next/link";
import { useState } from "react";

export default function JoinPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Who is eligible to join IEEE BRAC University Student Branch?",
      a: "All currently enrolled undergraduate and postgraduate students of BRAC University across all departments (CSE, EEE, CS, APE, Mathematics, BBS, etc.) are eligible to join.",
    },
    {
      q: "What is the annual membership fee?",
      a: "The IEEE student membership fee is approximately USD $27.00 per year (or equivalent in BDT). Special half-year rate discounts are often available during mid-year recruitment cycles.",
    },
    {
      q: "How can I make the payment?",
      a: "You can pay directly online using international credit/debit cards on IEEE.org, or locally via bKash / bank transfer through the IEEE BRACU Student Branch collection desk during active recruitment campaigns.",
    },
    {
      q: "Can I join specialized technical chapters like CS, PES, or RAS?",
      a: "Yes! Once you have an active IEEE membership, you can join any of the six student branch chapters (PES, CS, RAS, AESS, ComSoc, EDS) and IEEE Women in Engineering (WIE). Many chapters offer heavily subsidized or free student introductory packages.",
    },
    {
      q: "How do I get my IEEE Member Number?",
      a: "Upon completing the payment and registration processing, your official 8-digit IEEE Member Number and credentials will be sent to your registered email address.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F5F3EE] font-sans">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-[#0A2540]">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #3E9BD6 0%, transparent 60%), radial-gradient(circle at 80% 70%, #00629B 0%, transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-[1320px] px-8 pb-20 pt-20">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[13px] font-medium text-white backdrop-blur transition-colors hover:bg-white/20"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Home
          </Link>

          <div className="mt-4 mb-5 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#7FB4DA]">
            <span className="inline-block h-0.5 w-[26px] bg-[#7FB4DA]" />
            Membership Campaign
          </div>

          <h1 className="m-0 font-serif text-[clamp(34px,5vw,58px)] font-semibold leading-[1.08] tracking-[-0.02em] text-white">
            Join IEEE BRAC University <br className="hidden sm:inline" />
            Student Branch
          </h1>

          <p className="m-0 mt-5 max-w-[58ch] text-[16.5px] leading-[1.65] text-white/65">
            Become part of the world&rsquo;s largest technical professional community of 400,000+ innovators. Elevate your engineering skills, research capabilities, and global network.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScFY5j1ciSOVxlBWBWgcmdD9_RR_FQgEXavqWnagEGHNZbuMQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#00629B] px-8 py-4 text-[14.5px] font-semibold text-white shadow-[0_8px_24px_rgba(0,98,155,0.35)] transition-all hover:bg-[#004E7C] hover:shadow-[0_12px_32px_rgba(0,98,155,0.5)] cursor-pointer"
            >
              <span>Apply Online via Official Form</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <Link
              href="/members/membership-benefits"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-4 text-[14px] font-medium text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              Explore All Benefits →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="mx-auto max-w-[1320px] px-8 py-20">
        {/* Recruitment Status Notice Card */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 rounded-3xl border border-[#00629B]/20 bg-gradient-to-r from-[#EAF1F6] to-[#F5F3EE] p-8 sm:flex-row sm:items-center sm:p-10 shadow-xs">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#00629B]">
                Current Recruitment Cycle Active
              </span>
            </div>
            <h3 className="m-0 font-serif text-[22px] font-semibold text-[#191B1E]">
              Membership Drive · IEEE BRACU Student Branch
            </h3>
            <p className="m-0 max-w-[62ch] text-[14px] leading-relaxed text-[#5F6368]">
              Registrations are open for new student memberships and chapter inductions for the current academic semester.
            </p>
          </div>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScFY5j1ciSOVxlBWBWgcmdD9_RR_FQgEXavqWnagEGHNZbuMQ/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-xl bg-[#0A2540] px-6 py-3.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#00629B] cursor-pointer"
          >
            Fill Application Form ↗
          </a>
        </div>

        {/* 4 Steps to Join Section */}
        <div className="mb-20">
          <div className="mb-4 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#00629B]">
            <span className="inline-block h-0.5 w-[26px] bg-[#00629B]" />
            Step-by-Step Procedure
          </div>
          <h2 className="m-0 font-serif text-[clamp(26px,3vw,38px)] font-semibold text-[#191B1E]">
            How to Join in 4 Simple Steps
          </h2>
          <p className="mt-2 max-w-[56ch] text-[15px] text-[#6E7178]">
            Follow our streamlined onboarding process to register your global IEEE membership and connect with our student branch.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Complete Online Form",
                desc: "Fill out your student information, academic credentials, and chapter interests in the official membership form.",
              },
              {
                step: "02",
                title: "Membership Fee",
                desc: "Pay the annual student fee (approx. USD $27.00) online or locally via bKash through our branch collection desk.",
              },
              {
                step: "03",
                title: "IEEE ID Verification",
                desc: "Receive your unique 8-digit IEEE Member ID and activate your personal IEEE.org, IEEE Xplore, and @ieee.org accounts.",
              },
              {
                step: "04",
                title: "Chapter & SB Induction",
                desc: "Join our active society workshops, research teams, IEEEXtreme competitions, and executive committees.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="relative flex flex-col rounded-2xl border border-[#E3DFD5] bg-white p-7 shadow-xs transition-all duration-300 hover:border-[#00629B]/30 hover:shadow-[0_12px_32px_rgba(0,98,155,0.08)]"
              >
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#0A2540] font-serif text-[16px] font-bold text-white shadow-xs">
                  {s.step}
                </span>
                <h3 className="m-0 font-serif text-[18px] font-semibold text-[#191B1E]">
                  {s.title}
                </h3>
                <p className="m-0 mt-3 flex-1 text-[13.5px] leading-[1.65] text-[#6E7178]">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Join & Technical Chapters Grid */}
        <div className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left: Why IEEE BRACU SB */}
          <div className="rounded-3xl border border-[#E3DFD5] bg-white p-8 sm:p-10 lg:col-span-7 shadow-xs">
            <div className="mb-3 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#00629B]">
              <span className="inline-block h-0.5 w-[26px] bg-[#00629B]" />
              Why IEEE BRACU SB?
            </div>
            <h3 className="m-0 font-serif text-[26px] font-semibold text-[#191B1E]">
              One of Region 10&rsquo;s Most Vibrant Student Branches
            </h3>
            <p className="mt-4 text-[15px] leading-[1.75] text-[#44474C]">
              IEEE BRAC University Student Branch has established itself as a premier student organization dedicated to contributing to technological advancements for the benefit of humanity.
            </p>

            <div className="mt-8 space-y-4">
              {[
                {
                  title: "IEEE Xplore & Digital Research",
                  desc: "Unlimited access to 5+ million technical papers, journals, and standards essential for theses and academic projects.",
                },
                {
                  title: "Hands-on Workshops & Bootcamps",
                  desc: "Regular technical training sessions on AI, VLSI, Smart Grid, Robotics, IoT, and Cloud Computing.",
                },
                {
                  title: "Global Competitions & Scholarships",
                  desc: "Participate in IEEEXtreme 24-hour coding competitions, hackathons, and apply for IEEE student grants.",
                },
                {
                  title: "Microsoft Student Software Package",
                  desc: "Complimentary developer tools, Azure Cloud credits, and software suites for registered members.",
                },
              ].map((b, i) => (
                <div key={i} className="flex items-start gap-4 rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] p-4">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00629B] text-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="m-0 text-[14.5px] font-semibold text-[#191B1E]">{b.title}</h4>
                    <p className="m-0 mt-1 text-[13px] leading-[1.6] text-[#6E7178]">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Technical Chapters */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#E3DFD5] bg-gradient-to-br from-[#0A2540] to-[#004E7C] p-8 text-white sm:p-10 lg:col-span-5 shadow-xs">
            <div>
              <div className="mb-3 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#7FB4DA]">
                <span className="inline-block h-0.5 w-[26px] bg-[#7FB4DA]" />
                Technical Chapters
              </div>
              <h3 className="m-0 font-serif text-[24px] font-semibold text-white">
                Join Specialized Societies
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-white/70">
                Enhance your focus area by joining our 6 world-class technical society chapters:
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { name: "PES", label: "Power & Energy Society" },
                  { name: "CS", label: "Computer Society" },
                  { name: "RAS", label: "Robotics & Automation" },
                  { name: "AESS", label: "Aerospace & Electronic" },
                  { name: "ComSoc", label: "Communications Society" },
                  { name: "EDS", label: "Electron Devices Society" },
                ].map((ch) => (
                  <div key={ch.name} className="rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur">
                    <span className="font-serif text-[15px] font-bold text-[#7FB4DA]">
                      {ch.name}
                    </span>
                    <p className="m-0 mt-0.5 text-[11px] text-white/70">{ch.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-white/15 pt-6">
              <Link
                href="/members/membership-benefits"
                className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-white hover:underline"
              >
                Learn more about Chapter Privileges →
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <div className="mb-4 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#00629B]">
            <span className="inline-block h-0.5 w-[26px] bg-[#00629B]" />
            Frequently Asked Questions
          </div>
          <h2 className="m-0 font-serif text-[clamp(26px,3vw,36px)] font-semibold text-[#191B1E]">
            Common Questions on Joining
          </h2>

          <div className="mt-8 space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="overflow-hidden rounded-2xl border border-[#E3DFD5] bg-white transition-all shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between px-7 py-5 text-left text-[15.5px] font-semibold text-[#191B1E] transition-colors hover:text-[#00629B] cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FBFAF7] text-[#00629B] font-bold text-lg">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-[#E3DFD5] bg-[#FBFAF7] px-7 py-5">
                      <p className="m-0 text-[14px] leading-[1.7] text-[#5F6368]">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Final CTA Banner */}
        <div className="rounded-3xl border border-[#E3DFD5] bg-gradient-to-br from-[#0A2540] via-[#004E7C] to-[#0A2540] p-10 text-center text-white sm:p-16 shadow-md">
          <h2 className="m-0 font-serif text-[clamp(26px,3.5vw,40px)] font-semibold">
            Ready to Begin Your IEEE Journey?
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-[15.5px] leading-relaxed text-white/75">
            Submit your application today to join IEEE BRAC University Student Branch and start experiencing world-class opportunities.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScFY5j1ciSOVxlBWBWgcmdD9_RR_FQgEXavqWnagEGHNZbuMQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-white px-8 py-4 text-[14.5px] font-semibold text-[#0A2540] shadow-md transition-colors hover:bg-[#F5F3EE] cursor-pointer"
            >
              Fill Out Application Form ↗
            </a>
            <Link
              href="/contact"
              className="rounded-xl border border-white/25 bg-white/10 px-8 py-4 text-[14.5px] font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              Contact Student Branch
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
