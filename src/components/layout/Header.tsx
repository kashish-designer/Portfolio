import Link from "next/link";

import siteContent from "@/data/site.json";
import type { SiteContent } from "@/types/content";

const site: SiteContent = siteContent;

/**
 * N9 · Edge-aligned minimal nav.
 * Wordmark hard-left, one CTA hard-right, nothing in between. The empty span
 * is the design — adding a link row here turns this into the generic SaaS bar.
 *
 * Sits over the hero photograph, so it reads in bone against the scrim rather
 * than ink against paper.
 */
export default function Header() {
  return (
    <header
      className="reveal absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-md px-gutter py-lg"
      style={{ "--i": 0 } as React.CSSProperties}
    >
      <Link
        href="/"
        className="inline-flex min-h-11 items-center font-display text-md font-semibold tracking-[-0.015em] text-paper"
      >
        {site.name}
      </Link>

      <Link
        href={site.nav.cta.href}
        className="inline-flex min-h-11 items-center whitespace-nowrap rounded-none border border-paper-2 px-md text-sm leading-none text-paper transition-[color,border-color,background-color,transform] duration-[var(--dur-micro)] ease-out hover:bg-paper hover:text-ink active:translate-y-px"
      >
        {site.nav.cta.label}&nbsp;→
      </Link>
    </header>
  );
}
