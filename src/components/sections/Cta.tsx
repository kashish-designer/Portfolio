import Link from "next/link";

import ctaContent from "@/data/cta.json";
import type { CtaContent } from "@/types/content";

const cta: CtaContent = ctaContent;

/**
 * C3 · Typographic link closer.
 *
 * This was a filled button on a full ink band. The ink now belongs to the
 * quotes — one dark surface per page, not two — and a boxed CTA repeated three
 * inches above the contact form is the closing-sales-band shape that made the
 * page read as a studio's landing page.
 *
 * What is left is a line of type and a link, leading straight into the form
 * below it rather than interrupting the page to ask again.
 */
export default function Cta() {
  return (
    <section className="px-gutter pb-2xl pt-4xl">
      <p className="min-w-0 max-w-[20ch] font-display text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-ink [overflow-wrap:anywhere] sm:text-4xl">
        {cta.line}
      </p>

      <Link href={cta.button.href} className="link-typographic mt-xl">
        <span>{cta.button.label}</span>
        <span aria-hidden="true">↓</span>
      </Link>
    </section>
  );
}
