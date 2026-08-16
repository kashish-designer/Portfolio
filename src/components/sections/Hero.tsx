import Image from "next/image";

/**
 * Static import, not a path under `public/`.
 *
 * A file in `public/` is served at a fixed URL, so replacing it leaves the
 * URL unchanged — and the optimiser answers with
 * `Cache-Control: public, max-age=14400`. Swapping the portrait therefore
 * showed returning visitors the previous shot for up to four hours, which is
 * exactly what happened while iterating on this one.
 *
 * Importing it puts a content hash in the filename, so the URL changes
 * whenever the bytes do and the stale copy can never be served. It also lets
 * Next read the intrinsic dimensions at build time and generate the blur
 * placeholder below.
 */
import portrait from "@/images/kash-portrait.jpeg";
import heroContent from "@/data/hero.json";
import siteContent from "@/data/site.json";
import type { HeroContent, SiteContent } from "@/types/content";

const hero: HeroContent = heroContent;
const site: SiteContent = siteContent;

/**
 * Poster fold.
 *
 * The name is coloured type sitting on the paper, and the panel's top edge
 * butts against its baseline — the fold the reference is built around. See
 * `.poster-name` in globals.css for the geometry, which is derived from
 * `--text-poster` so the type size and the fold can never drift apart.
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

      {/* `--color-hero` (#e92869) is used here and on the menu overlay, and
          nowhere else. The showcase mount and the footer band take
          `--color-accent` — same hue, slightly darker — because both carry
          running text this pink cannot support.

          Paper type on it measures 3.83:1, so the headline and cue inside the
          panel are under AA. That is a known, accepted trade for the fold;
          see the contrast note on the token for the value that fixes it. */}
      <h1 className="poster-name px-gutter text-hero">{site.name}</h1>

      {/* Inset by the gutter so its edges line up with the name above it. No
          bottom padding — the portrait runs to the panel's bottom edge. */}
      <div className="poster-panel bg-hero">
        <div className="grid items-end gap-lg px-lg pt-2xl lg:grid-cols-12 lg:gap-2xl">
          <p className="min-w-0 max-w-[22ch] text-md leading-[1.35] text-accent-ink lg:col-span-3 lg:pb-3xl">
            {hero.headline}
          </p>

          {/* Two regimes, because `aspect-[4/5]` and `max-h` disagree:

              - Narrow viewports: the aspect wins, the box is 4:5, and since
                the file is 1024x1097 (0.93) cover trims ~7% off each side —
                the side table and the floor, not her.
              - Desktop: the cap wins, the box comes out landscape, and cover
                trims vertically instead. See `object-position` on the image. */}
          <div className="relative aspect-[4/5] max-h-[72dvh] w-full min-w-0 self-end lg:col-span-6 lg:col-start-4">
            <Image
              src={portrait}
              alt={hero.image.alt}
              fill
              // Free with the static import: Next derives it at build time.
              placeholder="blur"
              priority
              // Explicit: `priority` alone did not emit fetchpriority or a
              // preload link in this Next version, and this is the LCP element.
              fetchPriority="high"
              loading="eager"
              sizes="(min-width: 1024px) 50vw, 100vw"
              // Anchored near the top, not centred. `aspect-[4/5]` and
              // `max-h` disagree at desktop: the cap wins, the box comes out
              // landscape, and cover then trims vertically. Centred, that took
              // ~80px off the top and cut her head off. At 12% the excess
              // comes off the bottom — floor, not face.
              className="object-cover object-[50%_12%]"
            />
          </div>

          <p className="font-outlier text-xs uppercase tracking-[0.14em] text-accent-ink lg:col-span-3 lg:col-start-10 lg:pb-3xl lg:text-right">
            {hero.cue}&nbsp;↓
          </p>
        </div>
      </div>
    </section>
  );
}
