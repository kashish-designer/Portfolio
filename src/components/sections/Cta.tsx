import Link from "next/link";

import ctaContent from "@/data/cta.json";
import type { CtaContent } from "@/types/content";

const cta: CtaContent = ctaContent;

/**
 * Closing CTA on an ink band — the first dark surface since the hero, which
 * bookends the page before the footer. Left-biased, not centred.
 *
 * The band inverts its own text colour rather than relying on inheritance, so
 * nothing here can end up ink-on-ink.
 */
export default function Cta() {
  return (
    <section className="bg-ink px-gutter pt-3xl pb-4xl text-paper">
      <p className="max-w-[20ch] font-display text-2xl font-semibold leading-[1.1] tracking-[-0.02em] text-paper [overflow-wrap:anywhere] min-w-0 sm:text-3xl">
        {cta.line}
      </p>

      <Link href={cta.button.href} className="button-primary mt-xl">
        {cta.button.label}&nbsp;→
      </Link>
    </section>
  );
}
