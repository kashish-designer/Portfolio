import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import site from "@/data/site.json";

/**
 * Two families, both Geist: the sans carries body copy and — at weight 800 —
 * every poster heading, and the mono is the outlier register for indexes and
 * labels.
 *
 * Cormorant Garamond used to be the display face. The redesign moved every
 * heading to the poster face, and the last three serif holdouts (the closing
 * CTA, the contact heading, the quote mark) went with it, leaving a self-
 * hosted family loaded for nothing.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
