import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — IEEE BRAC University Student Branch",
  description: "Learn more about IEEE and the IEEE BRAC University Student Branch.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#F5F3EE] font-sans">
      <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-8 sm:py-8">
        {children}
      </div>
    </main>
  );
}
