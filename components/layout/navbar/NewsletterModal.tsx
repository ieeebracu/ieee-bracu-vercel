"use client";

import { useEffect } from "react";
import { newsletterArchiveList } from "@/data/site/newsletters";

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Student Branch Newsletters"
      className="fixed inset-0 z-50 overflow-hidden font-sans"
    >
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0A2540]/60 backdrop-blur-xs transition-opacity animate-[drawerFadeIn_.25s_ease-out]"
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
        <div className="relative pointer-events-auto w-screen max-w-[420px] bg-white shadow-2xl flex flex-col animate-[drawerSlideIn_.3s_cubic-bezier(0.16,1,0.3,1)]">
          {/* Drawer Header */}
          <div className="border-b border-[#E3DFD5] bg-[#0A2540] p-6 text-white">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[#7FB4DA]">
                  <span className="inline-block h-0.5 w-[20px] bg-[#7FB4DA]" />
                  Publications
                </div>
                <h2 className="m-0 mt-1 font-serif text-[24px] font-semibold text-white">
                  Newsletter
                </h2>
                <p className="m-0 mt-1 text-[13px] text-white/65">
                  Select a year to browse newsletters and publications archive.
                </p>
              </div>

              <button
                onClick={onClose}
                className="rounded-full bg-white/10 p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white cursor-pointer"
                aria-label="Close panel"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Drawer Body: Clean List of Years */}
          <div className="flex-1 overflow-y-auto bg-[#FBFAF7] p-5 space-y-2.5">
            {newsletterArchiveList.map((item) => (
              <a
                key={item.year}
                href={item.driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-[#E3DFD5] bg-white p-4 transition-all duration-200 hover:border-[#00629B]/40 hover:bg-[#F5F3EE] hover:shadow-xs"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF1F6] text-[#00629B] font-serif font-bold text-[15px] group-hover:bg-[#00629B] group-hover:text-white transition-colors">
                    {item.year.toString().slice(-2)}
                  </div>
                  <div>
                    <span className="font-serif text-[17px] font-semibold text-[#191B1E] group-hover:text-[#00629B] transition-colors">
                      {item.label}
                    </span>
                    <p className="m-0 text-[12px] text-[#6E7178]">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FBFAF7] text-[#9A9E9F] transition-all group-hover:translate-x-1 group-hover:bg-[#00629B] group-hover:text-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </a>
            ))}
          </div>

          {/* Drawer Footer */}
          <div className="border-t border-[#E3DFD5] bg-white p-4 text-center">
            <p className="m-0 text-[12px] text-[#6E7178]">
              IEEE BRAC University Student Branch &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
