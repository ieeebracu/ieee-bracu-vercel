import Link from "next/link";

export function AboutSection() {
  return (
    <section className="border-b border-[#E3DFD5] bg-[#F5F3EE] py-24 font-sans">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-16 px-8 md:grid-cols-2">
        {/* Left: Statement */}
        <div>
          <div className="mb-5 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#00629B]">
            <span className="inline-block h-0.5 w-[26px] bg-[#00629B]" />
            About the branch
          </div>
          <h2 className="m-0 font-serif text-[clamp(28px,3.2vw,42px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#191B1E]">
            A student branch advancing technology{" "}
            <span className="text-[#6E7178]">for the benefit of humanity.</span>
          </h2>
        </div>

        {/* Right: Copy */}
        <div>
          <p className="m-0 mb-5 text-[16.5px] leading-[1.7] text-[#44474C]">
            Founded in 2008, the IEEE BRAC University Student Branch is one of the
            most active student communities in Bangladesh — a home for engineers,
            researchers, and builders across six technical societies.
          </p>
          <p className="m-0 mb-5 text-[16.5px] leading-[1.7] text-[#44474C]">
            We run seminars, workshops, industry tours, and competitions that bridge
            the classroom and the profession, connecting members to the global IEEE
            network of over 400,000 technologists worldwide.
          </p>
          <Link
            href="/about"
            className="group mt-2 inline-flex items-center gap-2 text-[14px] font-semibold text-[#0A2540]"
          >
            Read our story
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
