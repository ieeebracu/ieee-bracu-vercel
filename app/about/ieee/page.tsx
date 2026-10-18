import Image from "next/image";
import type { Metadata } from "next";
import { ieeeQuickFacts } from "@/data/site/about";

export const metadata: Metadata = {
  title: "About IEEE — IEEE BRAC University Student Branch",
  description: "The world's largest technical professional organization dedicated to advancing technology for the benefit of humanity.",
};

export default function AboutIEEEPage() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="border-b border-[#E3DFD5] pb-8">
        <div className="mb-3 inline-flex items-center rounded-full border border-[#00629B]/20 bg-[#EAF1F6] px-3.5 py-1 text-[12px] font-bold tracking-wider text-[#00629B] uppercase">
          Global Organization
        </div>
        <h1 className="m-0 font-[family-name:var(--font-serif)] text-[clamp(32px,4vw,48px)] font-bold tracking-tight text-[#0A2540]">
          About IEEE
        </h1>
        <p className="m-0 mt-3 max-w-[70ch] text-[16.5px] leading-relaxed text-[#4A4E54]">
          The world&rsquo;s largest technical professional organization dedicated to advancing technology for the benefit of humanity.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Main Article Content */}
        <article className="space-y-10 lg:col-span-8">
          {/* Brand Emblem */}
          <div className="flex items-center justify-center rounded-2xl border border-[#E3DFD5] bg-white py-6 px-8 shadow-xs">
            <Image
              src="/assets/branding/IEEE125_desc.png"
              alt="IEEE 125 Years"
              width={210}
              height={200}
              className="h-auto max-h-[160px] w-auto object-contain"
              priority
            />
          </div>

          {/* What is IEEE */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-[12.5px] font-bold uppercase tracking-[0.14em] text-[#00629B]">
              <span className="h-0.5 w-5 bg-[#00629B]" />
              Introduction
            </div>
            <h2 className="m-0 font-serif text-[26px] font-bold text-[#0A2540]">
              What is IEEE?
            </h2>
            <p className="m-0 text-[16px] leading-[1.8] text-[#3C4046]">
              A non-profit organization, IEEE is the world&rsquo;s leading professional association for the advancement of technology. The IEEE name was originally an acronym for the <em>Institute of Electrical and Electronics Engineers, Inc.</em> Today, the organization&rsquo;s scope of interest has expanded into numerous interdisciplinary fields, universally recognized simply by the letters <strong>I-E-E-E</strong> (pronounced <em>Eye-triple-E</em>).
            </p>
          </section>

          {/* Who IEEE Serves */}
          <section className="space-y-4">
            <h2 className="m-0 font-serif text-[26px] font-bold text-[#0A2540]">
              Who IEEE Serves
            </h2>
            <p className="m-0 text-[16px] leading-[1.8] text-[#3C4046]">
              Through its global membership, IEEE is a leading authority on areas ranging from aerospace systems, computers, and telecommunications to biomedical engineering, electric power, and consumer electronics. Members rely on IEEE as a premier source of technical and professional information, peer-reviewed resources, and global networking services. To foster lifelong interest in engineering and sciences, IEEE actively serves student members in colleges and universities around the globe.
            </p>
          </section>

          {/* Mission & Vision Cards */}
          <section className="space-y-6">
            <h2 className="m-0 font-serif text-[26px] font-bold text-[#0A2540]">
              Mission &amp; Vision
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Mission Card */}
              <div className="relative overflow-hidden rounded-2xl border border-[#E3DFD5] bg-white p-7 shadow-xs transition-all hover:border-[#00629B]/40 hover:shadow-md">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF1F6] text-[#00629B]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                  </svg>
                </div>
                <h3 className="m-0 text-[13px] font-bold uppercase tracking-wider text-[#00629B]">
                  Our Mission
                </h3>
                <p className="m-0 mt-3 text-[15px] leading-relaxed text-[#4A4E54]">
                  IEEE&rsquo;s core purpose is to foster technological innovation and excellence for the benefit of humanity.
                </p>
              </div>

              {/* Vision Card */}
              <div className="relative overflow-hidden rounded-2xl border border-[#E3DFD5] bg-white p-7 shadow-xs transition-all hover:border-[#00629B]/40 hover:shadow-md">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0A2540] text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3 className="m-0 text-[13px] font-bold uppercase tracking-wider text-[#0A2540]">
                  Our Vision
                </h3>
                <p className="m-0 mt-3 text-[15px] leading-relaxed text-[#4A4E54]">
                  IEEE will be essential to the global technical community and recognized worldwide for the contributions of technology in improving global conditions.
                </p>
              </div>
            </div>
          </section>
        </article>

        {/* Sidebar: Quick Facts */}
        <aside className="lg:col-span-4">
          <div className="sticky top-28 space-y-6">
            <div className="rounded-2xl border border-[#E3DFD5] bg-white p-6 shadow-xs">
              <div className="mb-5 flex items-center justify-between border-b border-[#E3DFD5] pb-4">
                <h3 className="m-0 font-serif text-[18px] font-bold text-[#0A2540]">
                  IEEE Quick Facts
                </h3>
                <span className="rounded-full bg-[#EAF1F6] px-2.5 py-0.5 text-[11px] font-bold text-[#00629B]">
                  Global
                </span>
              </div>
              <div className="space-y-3.5">
                {ieeeQuickFacts.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-baseline justify-between border-b border-[#F0ECE1] pb-3 last:border-0 last:pb-0"
                  >
                    <span className="font-serif text-[18px] font-bold text-[#00629B]">
                      {s.value}
                    </span>
                    <span className="text-[12.5px] font-medium text-[#6E7178]">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="https://www.ieee.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#00629B] px-6 py-3.5 text-[14px] font-semibold text-white shadow-xs transition-all hover:bg-[#004E7C] hover:shadow-md cursor-pointer"
            >
              <span>Visit Official IEEE.org</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <a
              href="https://www.ieee.org/about/corporate/governance/p7-8.html"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-center gap-2 rounded-xl border border-[#E3DFD5] bg-white px-5 py-3 text-[13px] font-semibold text-[#00629B] shadow-2xs transition-all hover:bg-[#F5F3EE] hover:border-[#00629B]/30 cursor-pointer"
            >
              <span>IEEE Code of Ethics</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
