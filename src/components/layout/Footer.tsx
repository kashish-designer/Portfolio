import Link from "next/link";

import footerContent from "@/data/footer.json";
import siteContent from "@/data/site.json";
import type { FooterContent, SiteContent } from "@/types/content";

const footer: FooterContent = footerContent;
const site: SiteContent = siteContent;

/**
 * Full rose band closing the page, with the name cropped by the bottom edge —
 * the reference footer. This is the third and last appearance of the mid-rose
 * (hero panel, showcase mount, here), so the colour brackets the page.
 *
 * The large affordance is a real `mailto:` when an address exists and a link
 * to the on-page form when it does not. See the OWNER-CONFIRM note on
 * `FooterContent.email` for why no address is invented to fill the slot.
 *
 * Section links come from `site.nav.links`, the same list the header renders.
 *
 * The year is evaluated at build time, so a rebuild refreshes it. If the site
 * is left unbuilt across a new year it will read stale.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  const hasEmail = Boolean(footer.email);

  return (
    <footer className="relative overflow-hidden bg-rose pt-4xl text-rose-ink">
      <div className="grid gap-2xl px-gutter lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-7">
          <p className="text-sm opacity-80">{footer.invitation}</p>

          <a
            href={hasEmail ? `mailto:${footer.email}` : footer.fallback.href}
            className="footer-contact mt-sm"
          >
            {hasEmail ? footer.email : footer.fallback.label}
          </a>

          {/* Renders nothing until real profile URLs exist. */}
          {footer.social.length ? (
            <ul className="mt-2xl flex flex-wrap gap-x-lg gap-y-sm">
              {footer.social.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    rel="me noreferrer"
                    target="_blank"
                    className="footer-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-2xl flex flex-wrap gap-x-lg gap-y-2xs text-sm opacity-80">
            <p>
              © {year} {site.name}. All rights reserved.
            </p>
            <p>{footer.colophon}</p>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-3 lg:col-start-10">
          <p className="max-w-[32ch] text-sm opacity-80">{footer.tagline}</p>

          <nav aria-label="Footer" className="mt-lg">
            <ul className="flex flex-col items-start gap-2xs">
              {site.nav.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="mt-3xl flex items-end gap-lg px-gutter">
        <a href="#top" className="back-to-top">
          <span className="sr-only">{footer.backToTopLabel}</span>
          <span aria-hidden="true">&uarr;</span>
        </a>

        {/* Cropped by the footer's own overflow — the name runs off the bottom
            edge rather than sitting neatly inside it. */}
        <p className="footer-wordmark min-w-0 flex-1">{site.name}</p>
      </div>

    </footer>
  );
}
