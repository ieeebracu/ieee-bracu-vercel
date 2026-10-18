import Link from "next/link";
import {
  footerCTA,
  footerQuickLinks,
  footerChapters,
  footerNewsletters,
  footerSocials,
  footerContact,
  footerLegalPolicies,
} from "@/data/site/footer";

export function Footer() {
  return (
    <footer className="font-sans">
      {/* 1. Compact CTA Strip */}
      <div className="bg-[#00629B]">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-4 px-6 py-5 sm:py-6 sm:flex-row">
          <div>
            <h3 className="m-0 font-serif text-[17px] sm:text-[19px] font-semibold text-white">
              {footerCTA.title}
            </h3>
            <p className="m-0 mt-0.5 text-[12.5px] text-white/80">
              {footerCTA.description}
            </p>
          </div>
          <div className="flex gap-2.5 shrink-0">
            <Link
              href={footerCTA.joinHref}
              className="rounded-lg bg-white px-4 py-2 text-[13px] font-semibold text-[#00629B] transition-colors hover:bg-white/90"
            >
              Join IEEE
            </Link>
            <Link
              href={footerCTA.contactHref}
              className="rounded-lg border border-white/40 px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navy Footer (Compact & Balanced) */}
      <div className="bg-[#0A2540] text-white">
        <div className="mx-auto max-w-[1320px] px-6 py-8 sm:py-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-12">
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-3.5">
              <div className="flex items-center gap-2.5">
                <span className="rounded-[3px] border-[1.5px] border-white/40 px-1.5 py-[2px] font-serif text-[16px] font-semibold tracking-[0.06em] text-white">
                  IEEE
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[13px] font-semibold text-white">BRAC University</span>
                  <span className="text-[9.5px] uppercase tracking-[0.16em] text-white/50">
                    Student Branch
                  </span>
                </span>
              </div>
              <p className="m-0 max-w-[32ch] text-[12.5px] leading-relaxed text-white/60">
                Advancing technology for humanity at BRAC University since 2008.
              </p>

              {/* Social Icons */}
              <div className="flex gap-2 pt-1">
                {footerSocials.map((s) => {
                  let icon = null;
                  if (s.label === "Facebook") {
                    icon = (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                        <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 011-1h3v-4h-3a5 5 0 00-5 5v2.01h-2l-.396 3.98h2.396v8.01z" />
                      </svg>
                    );
                  } else if (s.label === "YouTube") {
                    icon = (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                        <path d="M23 9.71a8.5 8.5 0 00-.91-4.13 2.92 2.92 0 00-1.72-1A78.36 78.36 0 0012 4.27a78.45 78.45 0 00-8.34.3 2.87 2.87 0 00-1.46.74c-.9.83-1 2.25-1.1 3.45a48.29 48.29 0 000 6.48 9.55 9.55 0 00.3 2 3.14 3.14 0 00.71 1.36 2.86 2.86 0 001.49.78 45.18 45.18 0 006.5.33c3.5.05 6.57 0 10.2-.46a2.9 2.9 0 001.53-.78 2.49 2.49 0 00.61-1 10.58 10.58 0 00.52-3.4c.04-.56.04-3.94.04-4.54zM9.74 14.85V8.66l5.92 3.11c-1.66.92-3.85 1.96-5.92 3.08z" />
                      </svg>
                    );
                  } else if (s.label === "LinkedIn") {
                    icon = (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    );
                  }
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-[#00629B] hover:bg-[#00629B] hover:text-white"
                    >
                      {icon}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h4 className="m-0 mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">
                Quick Links
              </h4>
              <ul className="m-0 flex list-none flex-col space-y-1.5 p-0">
                {footerQuickLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[12.5px] text-white/60 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Chapters */}
            <div className="lg:col-span-3">
              <h4 className="m-0 mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">
                Chapters
              </h4>
              <ul className="m-0 flex list-none flex-col space-y-1.5 p-0">
                {footerChapters.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={c.href}
                      className="text-[12.5px] text-white/60 transition-colors hover:text-white"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Newsletters */}
            <div className="lg:col-span-3 space-y-3.5">
              <div>
                <h4 className="m-0 mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">
                  Contact
                </h4>
                <p className="m-0 text-[12px] text-white/60 leading-relaxed">
                  {footerContact.address}
                </p>
                <a
                  href={`mailto:${footerContact.email}`}
                  className="mt-1 inline-block text-[12px] text-[#7FB4DA] hover:underline"
                >
                  {footerContact.email}
                </a>
              </div>

              <div>
                <h4 className="m-0 mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">
                  Newsletters
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {footerNewsletters.map((n) => (
                    <a
                      key={n.year}
                      href={n.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] font-medium text-white/60 transition-all hover:border-[#00629B]/50 hover:bg-[#00629B]/20 hover:text-white"
                    >
                      {n.year}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Compact Bottom Bar */}
          <div className="mt-8 border-t border-white/[0.08] pt-4 flex flex-col items-center justify-between gap-2.5 sm:flex-row text-[11.5px] text-white/40">
            <p className="m-0">
              &copy; {new Date().getFullYear()} IEEE BRAC University Student Branch.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              {footerLegalPolicies.map((item, idx) => (
                <span key={item.label} className="inline-flex items-center gap-3">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-white/80"
                  >
                    {item.label}
                  </a>
                  {idx < footerLegalPolicies.length - 1 && (
                    <span className="text-white/20 select-none">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}