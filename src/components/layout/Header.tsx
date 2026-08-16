"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import siteContent from "@/data/site.json";
import type { SiteContent } from "@/types/content";

const site: SiteContent = siteContent;

/**
 * Circular menu toggle hard-left, copyright hard-right, nothing between — the
 * reference design's top bar. The wordmark is absent on purpose: the name is
 * already the largest thing on the page directly beneath this.
 *
 * The panel is a plain overlay rather than a focus-trapped dialog. Five links
 * and a close button do not need a trap to be usable, and Escape plus focus
 * return covers the keyboard path. Anything more would be machinery for a
 * five-item menu.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const year = new Date().getFullYear();

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  return (
    <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-md px-gutter py-lg">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="site-menu"
        data-open={open}
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        className="menu-toggle"
      >
        <span className="sr-only">
          {open ? site.nav.closeLabel : site.nav.openLabel}
        </span>
        <span className="menu-toggle__bars" aria-hidden="true" />
      </button>

      <p className="font-outlier text-xs tabular-nums text-ink-2">©{year}</p>

      {open ? (
        <nav
          id="site-menu"
          aria-label="Main"
          className="fixed inset-0 z-30 flex flex-col justify-center gap-md bg-rose px-gutter py-4xl"
        >
          {site.nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className="menu-link"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
