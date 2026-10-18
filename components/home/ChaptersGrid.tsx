import Link from "next/link";
import Image from "next/image";
import { technicalChapters } from "@/data/site/chapters";

export function ChaptersGrid() {
  return (
    <section className="bg-[#F5F3EE] py-24 font-sans">
      <div className="mx-auto max-w-[1200px] px-8">
        {/* Section Header */}
        <div className="mb-11 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end md:gap-10">
          <div>
            <div className="mb-5 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#00629B]">
              <span className="inline-block h-0.5 w-[26px] bg-[#00629B]" />
              Technical chapters
            </div>
            <h2 className="m-0 font-serif text-[clamp(26px,3vw,38px)] font-semibold tracking-[-0.02em] text-[#191B1E]">
              Six societies, one branch
            </h2>
          </div>
          <p className="m-0 max-w-[34ch] text-[15px] leading-[1.6] text-[#6E7178]">
            Each chapter runs its own events and community, focused on a distinct
            field of engineering.
          </p>
        </div>

        {/* Chapters Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {technicalChapters.map((c) => (
            <Link
              key={c.slug}
              href={`/chapters/${c.slug}`}
              className="group flex flex-col overflow-hidden rounded-[14px] border border-[#E3DFD5] bg-white transition-shadow hover:shadow-[0_16px_40px_rgba(20,22,24,0.10)]"
            >
              {/* Image header */}
              <div className="relative h-[168px] w-full overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(10,37,64,.55), rgba(10,37,64,0) 55%)",
                  }}
                />
                <span className="absolute left-4 top-4 rounded-md bg-white/95 px-[11px] py-[5px] font-serif text-[14px] font-semibold tracking-[0.04em] text-[#00629B] backdrop-blur">
                  {c.abbr}
                </span>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
                <div className="mb-2.5 flex items-start justify-between gap-3">
                  <h3 className="m-0 font-serif text-[19px] font-semibold leading-tight tracking-[-0.01em] text-[#191B1E]">
                    {c.name}
                  </h3>
                  <span className="mt-1 shrink-0 text-[#B9BDC0] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0A2540]">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M7 17L17 7M17 7H7M17 7V17"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <p className="m-0 text-[13.5px] leading-[1.6] text-[#6E7178]">{c.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ChaptersGrid;
