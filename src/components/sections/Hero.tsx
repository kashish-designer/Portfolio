import Image from "next/image";

import { placeholderImage } from "@/config/placeholders";
import heroContent from "@/data/hero.json";
import siteContent from "@/data/site.json";
import type { HeroContent, SiteContent } from "@/types/content";

const hero: HeroContent = heroContent;
const site: SiteContent = siteContent;

/**
 * Poster fold.
 *
 * The name is set in paper on paper, and the rose panel rides up over its
 * lower two thirds — so the letterforms are only legible where they cross the
 * panel, and the name reads as cut out of the colour rather than printed on
 * it. That overlap is the whole idea; see `.poster-name` in globals.css for
 * the geometry, which is derived from `--text-poster` so the two can never
 * drift apart.
 *
 * The label row rides the name's cap line the way a masthead's issue line
 * does. The panel's left column takes the positioning statement — the slot the
 * reference design gives a QR code, which here would encode nothing and would
 * be decoration standing in for information.
 */
export default function Hero() {
  return (
    // `id="top"` is the target of the footer's back-to-top control.
    <section id="top" className="relative isolate overflow-hidden pt-4xl">
      {/* The labels cluster rather than spread edge to edge: spaced across the
          full gutter they stop reading as one masthead line and start reading
          as four unrelated captions. */}
      <div className="flex flex-wrap items-baseline gap-x-2xl gap-y-2xs px-gutter font-outlier text-xs uppercase tracking-[0.14em] text-ink-2">
        {hero.tags.map((tag) => (
          <p key={tag}>{tag}</p>
        ))}
        {hero.status ? (
          <p className="flex items-center gap-xs sm:ml-auto">
            <span
              className="inline-block h-2xs w-2xs shrink-0 bg-accent"
              aria-hidden="true"
            />
            {hero.status}
          </p>
        ) : null}
      </div>

      <h1 className="poster-name px-gutter text-paper">{site.name}</h1>

      {/* No bottom padding: the portrait runs to the panel's edge, the way the
          reference fold does. The side columns carry their own. */}
      <div className="poster-panel bg-rose px-gutter">
        <div className="grid items-end gap-lg lg:grid-cols-12 lg:gap-2xl">
          <p className="min-w-0 max-w-[22ch] text-md leading-[1.35] text-rose-ink lg:col-span-3 lg:pb-3xl">
            {hero.headline}
          </p>

          {/* TODO: Replace with a real portrait of Kashish, target size: 1200×1600.
              The reference fold is carried entirely by the photograph; the desk
              placeholder is standing in for one, not substituting for it. */}
          <div className="relative aspect-[3/4] max-h-[62dvh] w-full min-w-0 self-end lg:col-span-6 lg:col-start-4">
            <Image
              src={placeholderImage(hero.image.file)}
              alt={hero.image.alt}
              fill
              priority
              // Explicit: `priority` alone did not emit fetchpriority or a
              // preload link in this Next version, and this is the LCP element.
              fetchPriority="high"
              loading="eager"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-top"
            />
          </div>

          <p className="font-outlier text-xs uppercase tracking-[0.14em] text-rose-ink lg:col-span-3 lg:col-start-10 lg:pb-3xl lg:text-right">
            {hero.cue}&nbsp;↓
          </p>
        </div>
      </div>
    </section>
  );
}
