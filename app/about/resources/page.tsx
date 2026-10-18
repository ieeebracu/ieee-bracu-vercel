import Image from "next/image";
import type { Metadata } from "next";
import { brandColors, brandLogos } from "@/data/site/about";

export const metadata: Metadata = {
  title: "Resources & Brand Assets — IEEE BRACU SB",
  description: "Official visual assets, society emblems, and color standards for IEEE BRAC University Student Branch and its technical chapters.",
};

export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      {/* Header Section: Compact & Minimal (matches Photo Gallery pattern) */}
      <div className="flex flex-col justify-between gap-3 border-b border-[#E3DFD5] pb-4 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="m-0 font-serif text-[22px] sm:text-[26px] font-bold tracking-tight text-[#191B1E]">
              Resources &amp; Brand Assets
            </h1>
            <span className="rounded-full border border-[#E3DFD5] bg-white px-2.5 py-0.5 text-[11.5px] font-medium text-[#6E7178]">
              {brandLogos.length} logos
            </span>
          </div>
          <p className="mt-1 text-[13px] text-[#6E7178]">
            Official visual assets, chapter emblems, and color palette for IEEE BRAC University Student Branch.
          </p>
        </div>
      </div>

      {/* Brand Color Guide */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#E3DFD5] pb-2.5">
          <h2 className="m-0 font-serif text-[18px] sm:text-[20px] font-bold text-[#0A2540]">
            Brand Color Palette
          </h2>
          <span className="text-[12px] font-semibold text-[#6E7178]">
            Color Specifications
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {brandColors.map((color) => (
            <div
              key={color.name}
              className="overflow-hidden rounded-2xl border border-[#E3DFD5] bg-white p-4 shadow-xs"
            >
              <div
                className="h-14 w-full rounded-xl shadow-inner border border-black/5"
                style={{ backgroundColor: color.hex }}
              />
              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[13.5px] text-[#191B1E]">{color.name}</span>
                  <code className="rounded bg-[#F5F3EE] px-2 py-0.5 text-[11px] font-mono font-bold text-[#00629B]">
                    {color.hex}
                  </code>
                </div>
                <p className="m-0 mt-1 text-[12px] text-[#6E7178]">
                  {color.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Logo Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#E3DFD5] pb-2.5">
          <h2 className="m-0 font-serif text-[18px] sm:text-[20px] font-bold text-[#0A2540]">
            Official Chapter Logos
          </h2>
          <span className="text-[12px] font-bold text-[#00629B]">
            PNG Transparent
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {brandLogos.map((logo) => (
            <div
              key={logo.name}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E3DFD5] bg-white p-5 shadow-xs transition-all hover:border-[#00629B]/40 hover:shadow-md"
            >
              <div>
                <div className="mb-2.5 flex items-center justify-between">
                  <span className="rounded-full bg-[#EAF1F6] px-2.5 py-0.5 text-[10.5px] font-bold text-[#00629B]">
                    {logo.type}
                  </span>
                </div>

                <div className="relative mb-4 flex h-[140px] sm:h-[150px] w-full items-center justify-center rounded-xl bg-[#FAF9F5] p-4">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <h3 className="m-0 text-[15px] font-bold text-[#0A2540]">
                  {logo.name}
                </h3>
              </div>

              <div className="mt-5 flex flex-col gap-2 border-t border-[#F0ECE1] pt-3.5">
                {logo.driveZipUrl && (
                  <a
                    href={logo.driveZipUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#00629B] px-3.5 py-2 text-[12px] font-semibold text-white shadow-xs transition-colors hover:bg-[#004E7C] cursor-pointer"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Download ZIP Pack</span>
                  </a>
                )}
                <a
                  href={logo.src}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#E3DFD5] bg-[#F5F3EE] px-3 py-1.5 text-[11.5px] font-semibold text-[#191B1E] transition-colors hover:bg-[#EAE6DD] cursor-pointer"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Download PNG</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
