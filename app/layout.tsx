import type { Metadata } from "next";

import "./globals.css";

import { PublicLayout } from "@/components/layout/PublicLayout";

export const metadata: Metadata = {
  title: "IEEE BRAC University Student Branch",
  description:
    "Advancing Technology for Humanity — IEEE BRAC University Student Branch",
  icons: {
    icon: [
      { url: "/assets/icons/favicon.ico" },
      { url: "/assets/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/assets/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/assets/icons/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/icons/favicon.ico" sizes="any" />
        <link rel="icon" href="/assets/icons/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/assets/icons/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/assets/icons/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F5F3EE] text-[#191B1E] antialiased">
        <PublicLayout>
          {children}
        </PublicLayout>
      </body>
    </html>
  );
}