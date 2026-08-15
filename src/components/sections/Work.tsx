import Image from "next/image";

import { placeholderImage } from "@/config/placeholders";
import workContent from "@/data/work.json";
import type { WorkContent } from "@/types/content";

const work: WorkContent = workContent;

/**
 * F6 · Card grid, landscape 4/3, 3-up.
 * The Marquee hero's below-fold "becomes a list of work" — so this section
 * carries no display heading of its own; the hero's cue introduces it. The
 * heading below is for screen readers only.
 *
 * Cards are hairline-separated, not boxed: no borders around the card, no
 * shadow, no nested containers. Nothing is clickable yet — case-study pages
 * don't exist, and a link to nowhere is worse than no link.
 */
export default function Work() {
  return (
    <section id="work" className="px-gutter pt-2xl pb-3xl">
      <h2 className="sr-only">{work.cue}</h2>

      <ul className="grid gap-x-lg gap-y-2xl sm:grid-cols-2 lg:grid-cols-3">
        {work.projects.map((project, index) => (
          <li key={project.slug} className="min-w-0">
            {/* TODO: Replace with real project screenshot, target size: 1200×900 */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-2">
              <Image
                src={placeholderImage(project.image.file)}
                alt={project.image.alt}
                fill
                // The first card sits just under the fold on a laptop; lazy
                // there means it pops in as soon as scrolling starts.
                loading={index === 0 ? "eager" : "lazy"}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="mt-md flex items-baseline justify-between gap-sm border-t border-rule pt-sm">
              <h3 className="font-display text-md font-semibold text-ink">
                {project.client}
              </h3>
              <span className="font-outlier text-xs tabular-nums text-muted">
                {project.year}
              </span>
            </div>

            <p className="mt-2xs text-sm text-ink-2">{project.role}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
