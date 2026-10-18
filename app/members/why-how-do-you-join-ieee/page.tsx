import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why & How Do You Join IEEE? — IEEE BRACU SB",
  description:
    "Learn why to join IEEE and the complete step-by-step procedure to join IEEE BRAC University Student Branch.",
};

export default function WhyHowJoinPage() {
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
            Membership Guide
          </div>
          <h1 className="m-0 font-[family-name:var(--font-serif)] text-[clamp(32px,4.5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-white">
            Why &amp; How Do You Join IEEE?
          </h1>
          <p className="m-0 mt-4 max-w-[54ch] text-[16px] leading-[1.6] text-white/55">
            Discover the advantages of becoming part of the world&rsquo;s largest technical
            professional association and how to register with the BRAC University Student Branch.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-[1320px] px-8 py-16">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          {/* LEFT: Core Content */}
          <article className="space-y-12 lg:col-span-8">
            {/* Why Join Section */}
            <div className="rounded-2xl border border-[#E3DFD5] bg-white p-8 sm:p-10 shadow-xs">
              <div className="mb-4 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#00629B]">
                <span className="inline-block h-0.5 w-[26px] bg-[#00629B]" />
                The Value of IEEE
              </div>
              <h2 className="m-0 font-[family-name:var(--font-serif)] text-[clamp(24px,2.6vw,34px)] font-semibold leading-tight text-[#191B1E]">
                Join the World&rsquo;s Largest Technical Professional Association
              </h2>
              <p className="mt-4 text-[16px] leading-[1.75] text-[#44474C]">
                IEEE is the world&rsquo;s largest technical society, bringing members access to the
                industry&rsquo;s most essential technical information, networking opportunities, career
                development tools, and exclusive member discounts on conferences, publications, and
                certifications.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF1F6] text-[#00629B]">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 6v6l4 2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="m-0 text-[16px] font-semibold text-[#191B1E]">Trusted Voice</h3>
                  <p className="m-0 mt-2 text-[13.5px] leading-[1.6] text-[#6E7178]">
                    When the global scientific and industrial community seeks credible technical answers
                    and standards, it trusts IEEE.
                  </p>
                </div>

                <div className="rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF1F6] text-[#00629B]">
                    <svg
                      width="20"
                      height="20"
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
                  </div>
                  <h3 className="m-0 text-[16px] font-semibold text-[#191B1E]">Global Community</h3>
                  <p className="m-0 mt-2 text-[13.5px] leading-[1.6] text-[#6E7178]">
                    Instant access to a network of 400,000+ technologists across 160+ countries and
                    student branches worldwide.
                  </p>
                </div>

                <div className="rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF1F6] text-[#00629B]">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  </div>
                  <h3 className="m-0 text-[16px] font-semibold text-[#191B1E]">Career Growth</h3>
                  <p className="m-0 mt-2 text-[13.5px] leading-[1.6] text-[#6E7178]">
                    Competitions, workshops, leadership opportunities, publications, and IEEE Xplore
                    digital library access.
                  </p>
                </div>
              </div>
            </div>

            {/* How to Join Step-by-Step */}
            <div className="rounded-2xl border border-[#E3DFD5] bg-white p-8 sm:p-10 shadow-xs">
              <div className="mb-4 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#00629B]">
                <span className="inline-block h-0.5 w-[26px] bg-[#00629B]" />
                Registration Process
              </div>
              <h2 className="m-0 font-[family-name:var(--font-serif)] text-[clamp(24px,2.6vw,32px)] font-semibold text-[#191B1E]">
                How to Join IEEE BRAC University Student Branch
              </h2>
              <p className="mt-3 text-[15.5px] leading-[1.7] text-[#44474C]">
                IEEE BRAC University Student Branch opens recruitment and registration cycles every
                semester. Follow these steps to activate your membership:
              </p>

              <div className="mt-8 space-y-6">
                {[
                  {
                    step: "01",
                    title: "Online Membership Sign-up",
                    desc: "Fill out the registration form announced by the Student Branch during recruitment drives at the beginning of each semester.",
                  },
                  {
                    step: "02",
                    title: "Membership Fee Payment",
                    desc: "The annual student membership fee is approximately USD $27.00. Payment instructions (bKash/cards/branch desk) will be shared during registration.",
                  },
                  {
                    step: "03",
                    title: "Official IEEE Account & Number",
                    desc: "Once confirmed, you will receive your official 8-digit IEEE Member Number and full access to IEEE.org, IEEE Xplore, and society chapter memberships.",
                  },
                  {
                    step: "04",
                    title: "Join Branch & Chapter Activities",
                    desc: "Participate in PES, CS, RAS, AESS, ComSoc, and EDS workshops, webinars, research competitions, and executive committees.",
                  },
                ].map((s) => (
                  <div
                    key={s.step}
                    className="flex items-start gap-5 rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] p-5"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00629B] font-[family-name:var(--font-serif)] text-[16px] font-bold text-white shadow-xs">
                      {s.step}
                    </span>
                    <div>
                      <h3 className="m-0 text-[16px] font-semibold text-[#191B1E]">{s.title}</h3>
                      <p className="m-0 mt-1.5 text-[14px] leading-[1.65] text-[#6E7178]">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* RIGHT: Quick Links & Contact */}
          <aside className="space-y-6 lg:col-span-4">
            <div className="rounded-2xl border border-[#E3DFD5] bg-white p-7 shadow-xs">
              <h3 className="m-0 font-[family-name:var(--font-serif)] text-[18px] font-semibold text-[#191B1E]">
                Explore Benefits
              </h3>
              <p className="mt-2 text-[13.5px] leading-[1.6] text-[#6E7178]">
                Read the comprehensive catalog of IEEE Xplore access, Microsoft student software,
                journals, and local discounts.
              </p>
              <Link
                href="/members/membership-benefits"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00629B] py-3 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#004E7C]"
              >
                View Membership Benefits →
              </Link>
            </div>

            <div className="rounded-2xl border border-[#E3DFD5] bg-white p-7 shadow-xs">
              <h3 className="m-0 font-[family-name:var(--font-serif)] text-[18px] font-semibold text-[#191B1E]">
                Have Questions?
              </h3>
              <p className="mt-2 text-[13.5px] leading-[1.6] text-[#6E7178]">
                Contact our membership team or visit the IEEE Student Branch office at BRAC University.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#00629B] hover:underline"
              >
                Contact Student Branch →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
