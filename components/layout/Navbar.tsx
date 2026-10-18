"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { UtilityBar } from "./navbar/UtilityBar";
import { DesktopNav } from "./navbar/DesktopNav";
import { MobileNav } from "./navbar/MobileNav";
import { Breadcrumbs } from "./navbar/Breadcrumbs";
import { NewsletterModal } from "./navbar/NewsletterModal";

interface NavbarProps {
  pathname?: string;
}

export function Navbar({ pathname = "/" }: NavbarProps) {
  const [newsletterModalOpen, setNewsletterModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Never render public navbar on admin pages
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="font-sans">
      {/* 1. Top utility info & social bar */}
      <UtilityBar />

      {/* 2. Main Sticky Navigation Bar */}
      <header className="sticky top-0 z-50 border-b border-[#E3DFD5] bg-white/92 backdrop-blur-md">
        <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between px-8">
          {/* Brand Logo */}
          <Link href="/" className="flex shrink-0 items-center py-1">
            <Image
              src="/assets/branding/ieee-bracu-logo.png"
              alt="IEEE BRAC University Student Branch"
              width={220}
              height={50}
              priority
              className="h-10 w-auto object-contain transition-opacity hover:opacity-90 sm:h-11"
            />
          </Link>

          {/* Desktop Navigation */}
          <DesktopNav pathname={pathname} onOpenNewsletters={() => setNewsletterModalOpen(true)} />

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Toggle navigation menu"
            className="inline-flex items-center justify-center rounded-md p-2 text-[#3C4046] hover:bg-[#EEEAE0] md:hidden cursor-pointer transition-colors"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Dynamic Breadcrumbs for subpages */}
        <Breadcrumbs pathname={pathname} />
      </header>

      {/* 3. Mobile Navigation Drawer (Mounted outside header to guarantee full 100vh / 100dvh height) */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        pathname={pathname}
        onOpenNewsletters={() => {
          setMobileMenuOpen(false);
          setNewsletterModalOpen(true);
        }}
      />

      {/* 4. Newsletter Slide-Over Drawer */}
      <NewsletterModal
        isOpen={newsletterModalOpen}
        onClose={() => setNewsletterModalOpen(false)}
      />
    </div>
  );
}