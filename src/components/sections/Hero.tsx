import Image from "next/image";

import { placeholderImage } from "@/config/placeholders";
import heroContent from "@/data/hero.json";
import type { HeroContent } from "@/types/content";

const hero: HeroContent = heroContent;

/**
 * Marquee hero, photographic variant. The archetype permits exactly one image
 * treatment — a single photograph as the fold background — and the type stays
 * bottom-anchored and left-biased over it. No CTA in the fold.
 */
export default function Hero() {
  return (
    <section className="relative isolate grid min-h-[86dvh] content-end gap-xl px-gutter pb-2xl pt-4xl">
      {/* TODO: Replace with a real photograph of Kashish or her workspace, target size: 1920×1280 */}
      <Image
        src={placeholderImage(hero.image.file)}
        alt={hero.image.alt}
        fill
        priority
        // Explicit: `priority` alone did not emit fetchpriority or a preload
        // link in this Next version, and this is the LCP element.
        fetchPriority="high"
        loading="eager"
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="hero-scrim absolute inset-0 -z-10" aria-hidden="true" />

      <h1
        className="reveal max-w-[13ch] font-display text-display font-semibold leading-[1.04] tracking-[-0.02em] text-paper [overflow-wrap:anywhere] min-w-0"
        style={{ "--i": 1 } as React.CSSProperties}
      >
        {hero.headline}
      </h1>

      <div
        className="reveal flex flex-wrap items-baseline justify-between gap-x-lg gap-y-sm font-outlier text-xs uppercase tracking-[0.14em] text-paper-2"
        style={{ "--i": 2 } as React.CSSProperties}
      >
        <p>{hero.tags.join(" · ")}</p>
        <p>{hero.cue}&nbsp;↓</p>
      </div>

      <hr
        className="reveal h-[var(--rule-thick)] w-full border-0 bg-paper"
        style={{ "--i": 3 } as React.CSSProperties}
      />
    </section>
  );
}
