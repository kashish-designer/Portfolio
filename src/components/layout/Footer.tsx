import Link from "next/link";

import footerContent from "@/data/footer.json";
import siteContent from "@/data/site.json";
import type { FooterContent, SiteContent } from "@/types/content";

const footer: FooterContent = footerContent;
const site: SiteContent = siteContent;

const FOOTER_LINK =
  "group inline-flex min-h-11 min-w-11 items-center justify-center whitespace-nowrap font-outlier text-xs uppercase tracking-[0.14em] text-ink-2 transition-colors duration-[var(--dur-micro)] ease-out hover:text-accent";

const FOOTER_LINK_TEXT =
  "underline decoration-rule decoration-1 underline-offset-4 transition-[text-decoration-color] duration-[var(--dur-micro)] ease-out group-hover:decoration-accent";

/**
 * Ft1 · Mast-headed.
 *
 * The wordmark anchors a single horizontal band with the tagline beside it and
 * a small link row below. Explicitly NOT Ft3 — four columns of Product /
 * Company / Resources / Legal above a social-icon row is the most recognisable
 * AI footer, and a one-person portfolio has no sitemap to justify it.
 *
 * Every link here resolves to a section that exists on the page.
 *
 * The year is evaluated at build time, so a rebuild refreshes it. If the site
 * is left unbuilt across a new year it will read stale.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-gutter pt-2xl pb-xl">
      <div className="flex flex-wrap items-baseline justify-between gap-x-2xl gap-y-md border-t border-rule pt-lg">
        <p className="font-display text-xl font-semibold tracking-[-0.015em] text-ink">
          {site.name}
        </p>
        <p className="max-w-[42ch] text-base text-ink-2">{footer.tagline}</p>
      </div>

      <nav
        aria-label="Footer"
        className="mt-xl flex flex-wrap gap-x-lg gap-y-sm"
      >
        {/* Padding sits on the anchor and the underline on an inner span, so
            the hit area reaches 44×44 without a rule stretching past the word. */}
        {footer.links.map((link) => (
          <Link key={link.href} href={link.href} className={FOOTER_LINK}>
            <span className={FOOTER_LINK_TEXT}>{link.label}</span>
          </Link>
        ))}

        {footer.social.map((link) => (
          <a
            key={link.href}
            href={link.href}
            rel="me noreferrer"
            target="_blank"
            className={FOOTER_LINK}
          >
            <span className={FOOTER_LINK_TEXT}>{link.label}</span>
          </a>
        ))}
      </nav>

      <div className="mt-lg flex flex-wrap items-baseline justify-between gap-x-lg gap-y-2xs text-sm text-muted">
        <p>
          © {year} {site.name}
        </p>
        <p>{footer.colophon}</p>
      </div>
    </footer>
  );
}
