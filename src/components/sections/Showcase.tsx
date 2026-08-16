import Image from "next/image";

import { placeholderImage } from "@/config/placeholders";
import workContent from "@/data/work.json";
import type { WorkContent } from "@/types/content";

const work: WorkContent = workContent;

const featured = work.projects.find(
  (project) => project.slug === work.showcase.projectSlug,
);

/**
 * Featured project, inset on a pink mount.
 *
 * The panel's margin around the screenshot is the whole device: it frames the
 * work the way a mount frames a print, and it is the second and last place the
 * pink appears, which ties the middle of the page back to the fold.
 *
 * The project is looked up by slug from `projects` rather than restated here,
 * so the showcase can never drift out of sync with the strip above it. An
 * unmatched slug renders nothing — a missing section beats a crash.
 */
export default function Showcase() {
  if (!featured) return null;

  return (
    <section
      id="showcase"
      className="border-b border-rule px-gutter pb-4xl pt-4xl"
    >
      <h2 className="poster-heading min-w-0 max-w-[14ch] text-ink">
        {work.showcase.heading}
      </h2>
      <p className="mt-md max-w-[52ch] text-base text-ink-2">
        {work.showcase.lede}
      </p>

      <figure className="mt-2xl bg-hero-deep p-lg sm:p-2xl">
        {/* TODO: Replace with the real case-study screenshot, target size: 1800×1200 */}
        <div className="relative aspect-[3/2] w-full min-w-0 overflow-hidden bg-paper-2">
          <Image
            src={placeholderImage(featured.image.file)}
            alt={featured.image.alt}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="object-cover"
          />
        </div>

        <figcaption className="mt-lg flex flex-wrap items-baseline gap-x-sm gap-y-3xs text-hero-ink">
          <span className="text-base font-medium">{featured.client}</span>
          <span className="text-sm tabular-nums opacity-80">
            {featured.year}
          </span>
          <span className="w-full text-sm opacity-80">{featured.role}</span>
        </figcaption>
      </figure>
    </section>
  );
}
