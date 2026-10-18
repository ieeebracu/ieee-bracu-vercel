import type { Metadata } from "next";
import { organogramTiers } from "@/data/site/about";

export const metadata: Metadata = {
  title: "Organogram — IEEE BRACU SB",
  description: "The organizational hierarchy and governing structure of IEEE BRAC University Student Branch and its technical affinity groups.",
};

export default function OrganogramPage() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="border-b border-[#E3DFD5] pb-8">
        <h1 className="m-0 font-serif text-[clamp(32px,4vw,48px)] font-bold tracking-tight text-[#0A2540]">
          Branch Organogram
        </h1>
        <p className="m-0 mt-3 max-w-[70ch] text-[16.5px] leading-relaxed text-[#4A4E54]">
          The organizational hierarchy and governing structure of IEEE BRAC University Student Branch and its technical affinity groups.
        </p>
      </div>

      {/* Organogram Chart Viewer */}
      <div className="overflow-hidden rounded-2xl border border-[#E3DFD5] bg-white shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E3DFD5] bg-[#F5F3EE]/50 px-6 py-4">
          <div>
            <h3 className="m-0 font-serif text-[18px] font-bold text-[#0A2540]">
              Official Structure Chart
            </h3>
            <p className="m-0 text-[12.5px] text-[#6E7178]">
              High-resolution organizational tree diagram
            </p>
          </div>
          <a
            href="/assets/branding/organogram.png"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#E3DFD5] bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-[#00629B] shadow-xs transition-all hover:bg-[#EAF1F6] hover:border-[#00629B]/30 cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Open Full Size
          </a>
        </div>

        <div className="p-6 sm:p-10 flex justify-center bg-[#FAF9F5]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/branding/organogram.png"
            alt="IEEE BRACU Student Branch Organogram"
            className="max-w-full rounded-xl border border-[#E3DFD5] shadow-md object-contain"
          />
        </div>
      </div>

      {/* Structural Hierarchy Overview Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {organogramTiers.map((tier) => (
          <div key={tier.step} className="rounded-2xl border border-[#E3DFD5] bg-white p-6 shadow-xs">
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl font-bold text-[14px] ${tier.accent}`}>
              {tier.step}
            </div>
            <h3 className="m-0 text-[15.5px] font-bold text-[#0A2540]">{tier.title}</h3>
            <p className="m-0 mt-2 text-[13px] leading-relaxed text-[#6E7178]">
              {tier.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
