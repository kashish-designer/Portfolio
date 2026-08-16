import Image from "next/image";

import Carousel from "@/components/ui/Carousel";
import { placeholderImage } from "@/config/placeholders";
import workContent from "@/data/work.json";
import type { WorkContent } from "@/types/content";

const work: WorkContent = workContent;

/**
 * Project slider.
 *
 * Was a fixed three-across strip whose outer two projects bled off the edges.
 * That composition only worked at exactly three projects — a fourth had
 * nowhere to go. As a carousel the same "there is more than fits" read comes
 * from the next card peeking past the right edge, and the list can grow.
 *
 * Scroll behaviour and the pagers live in `Carousel`, shared with
 * Testimonials, so this stays a server component.
 *
 * Cards are a uniform landscape ratio now. The old layout gave the middle
 * project a wider frame to mark it as featured; in a scroller there is no
 * fixed middle, so that emphasis would land on whichever card happened to
 * stop in the centre.
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

      <div className="mt-2xl">
        <Carousel
          label={work.heading}
          previousLabel={work.previousLabel}
          nextLabel={work.nextLabel}
        >
          {work.projects.map((project, index) => (
            <li
              key={project.slug}
              className="min-w-0 shrink-0 basis-[84%] snap-start sm:basis-[56%] lg:basis-[44%]"
            >
              {/* TODO: Replace with real project screenshots, target size: 1600×1200 */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-2">
                <Image
                  src={placeholderImage(project.image.file)}
                  alt={project.image.alt}
                  fill
                  // The slider sits just under the fold on a laptop; lazy on
                  // the first card means it pops in as scrolling starts.
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="(min-width: 1024px) 44vw, (min-width: 640px) 56vw, 84vw"
                  className="object-cover"
                />
              </div>

              <div className="mt-md flex flex-wrap items-baseline gap-x-sm gap-y-3xs border-t border-rule pt-sm">
                <h3 className="text-base font-medium text-ink">
                  {project.client}
                </h3>
                <span className="text-sm tabular-nums text-muted">
                  {project.year}
                </span>
                <p className="w-full text-sm text-ink-2">{project.role}</p>
              </div>
            </li>
          ))}
        </Carousel>
      </div>

      <p className="mx-auto mt-2xl max-w-[62ch] px-gutter text-center text-base text-ink-2">
        {work.note}
      </p>
    </section>
  );
}
