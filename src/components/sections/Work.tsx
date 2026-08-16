import Image from "next/image";

import { placeholderImage } from "@/config/placeholders";
import workContent from "@/data/work.json";
import type { WorkContent } from "@/types/content";

const work: WorkContent = workContent;

/** The strip centres this project and lets the other two bleed off the edges. */
const FEATURED_INDEX = 1;

/**
 * Bleeding project strip.
 *
 * The row is pulled wider than the gutter on both sides, so the outer two
 * projects run off the edges and the middle one sits whole in the centre —
 * the reference's "there is more of this than fits" composition. The clipping
 * is done by the page's `overflow-x: clip`, not by a scroller: a horizontally
 * scrolling strip would hide two thirds of the work behind a gesture.
 *
 * The centre project is landscape and the flanking two are portrait, which is
 * what gives the row its rhythm — three equal rectangles would just be the
 * card grid this replaced.
 *
 * Nothing is a link: case-study pages don't exist, and a card that looks
 * clickable and goes nowhere is worse than one that plainly is not.
 */
export default function Work() {
  return (
    <section id="work" className="border-b border-rule pb-3xl pt-4xl">
      <div className="px-gutter">
        <h2 className="poster-heading min-w-0 max-w-[12ch] text-ink">
          {work.heading}
        </h2>
        <p className="mt-md max-w-[46ch] text-base text-ink-2">{work.lede}</p>
      </div>

      <ul className="mt-3xl flex items-end justify-center gap-md sm:gap-lg lg:-mx-[8vw]">
        {work.projects.map((project, index) => {
          const featured = index === FEATURED_INDEX;

          return (
            <li
              key={project.slug}
              className={`min-w-0 shrink-0 ${
                featured ? "basis-[62%] lg:basis-[46%]" : "basis-[30%] lg:basis-[26%]"
              }`}
            >
              {/* TODO: Replace with real project screenshots — landscape 1600×1000
                  for the centre slot, portrait 900×1200 for the flanking two. */}
              <div
                className={`relative w-full overflow-hidden bg-paper-2 ${
                  featured ? "aspect-[4/3]" : "aspect-[3/4]"
                }`}
              >
                <Image
                  src={placeholderImage(project.image.file)}
                  alt={project.image.alt}
                  fill
                  // The strip sits just under the fold on a laptop; lazy here
                  // means it pops in as soon as scrolling starts.
                  loading={featured ? "eager" : "lazy"}
                  sizes={featured ? "(min-width: 1024px) 46vw, 62vw" : "(min-width: 1024px) 26vw, 30vw"}
                  className="object-cover"
                />
              </div>

              <div className="mt-sm flex flex-wrap items-baseline gap-x-sm gap-y-3xs">
                <h3 className="text-base font-medium text-ink">
                  {project.client}
                </h3>
                <span className="text-sm tabular-nums text-muted">
                  {project.year}
                </span>
                <p className="w-full text-sm text-ink-2">{project.role}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mx-auto mt-3xl max-w-[62ch] px-gutter text-center text-base text-ink-2">
        {work.note}
      </p>
    </section>
  );
}
