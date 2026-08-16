import Link from "next/link";

import footerContent from "@/data/footer.json";
import siteContent from "@/data/site.json";
import type { FooterContent, SiteContent } from "@/types/content";

const footer: FooterContent = footerContent;
const site: SiteContent = siteContent;

/**
 * Full pink band closing the page — the deep step of the fold colour, because
 * this band carries running text that the brighter fold pink cannot support.
 *
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
    <footer className="relative overflow-hidden bg-accent pt-4xl text-accent-ink">
      <div className="grid gap-2xl px-gutter lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-7">
          <p className="text-sm opacity-90">{footer.invitation}</p>

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

          <div className="mt-2xl flex flex-wrap gap-x-lg gap-y-2xs text-sm opacity-90">
            <p>
              © {year} {site.name}. All rights reserved.
            </p>
            <p>{footer.colophon}</p>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-3 lg:col-start-10">
          <p className="max-w-[32ch] text-sm opacity-90">{footer.tagline}</p>

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

      {/* The control sits alone on the left and the name closes hard right,
          which is the reference's arrangement. The name is not cropped — see
          `.footer-wordmark`. */}
      <div className="mt-xl flex items-end gap-lg px-gutter">
        <a href="#top" className="back-to-top">
          <span className="sr-only">{footer.backToTopLabel}</span>
          <span aria-hidden="true">&uarr;</span>
        </a>

        <p className="footer-wordmark min-w-0 flex-1">{site.name}</p>
      </div>

      {/* Rule sits inside the gutter so it lines up with the page's other
          hairlines rather than running edge to edge. */}
      <div className="mx-gutter mt-lg border-t border-accent-rule">
        {/* Words are separate elements so the symbol can carry its own
            accessible name, which means the spaces between them come from the
            gap rather than from the text. */}
        <p className="flex flex-wrap items-center justify-center gap-x-xs pb-lg pt-sm text-center text-sm text-accent-ink">
          <span className="opacity-90">{footer.credit.prefix}</span>
          <span role="img" aria-label={footer.credit.symbolLabel}>
            {footer.credit.symbol}
          </span>
          <span className="opacity-90">{footer.credit.connector}</span>
          <a
            href={footer.credit.href}
            target="_blank"
            rel="noreferrer"
            className="footer-link font-semibold"
          >
            {footer.credit.label}
          </a>
        </p>
      </div>

    </footer>
  );
}
