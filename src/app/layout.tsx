import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import site from "@/data/site.json";

/**
 * Cormorant is self-hosted rather than pulled through `next/font/google`.
 *
 * Google's CSS hands Next a variable-font URL for this family that returns
 * 404 from fonts.gstatic.com, while the static per-weight files it serves to
 * browsers resolve fine. The build only appeared to work because `.next` had
 * the downloaded files cached; clearing that cache broke the build outright
 * with ten module-not-found errors and no way to recover offline.
 *
 * The two weights actually used are committed under `src/fonts`, so the build
 * no longer depends on a third-party CDN at compile time. Geist stays on
 * `next/font/google` because it resolves correctly.
 */
const cormorant = localFont({
  variable: "--font-cormorant",
  display: "swap",
  src: [
    { path: "../fonts/cormorant-garamond-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/cormorant-garamond-600.woff2", weight: "600", style: "normal" },
  ],
});

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
      className={`${cormorant.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
