import whyContent from "@/data/why.json";
import type { WhyContent } from "@/types/content";

const why: WhyContent = whyContent;

/**
 * F1 · Bento, irregular spans — the first section on the page with an uneven
 * grid, which is what keeps the page from reading as one long column.
 *
 * Tiles are separated by a hairline above each, not boxed: no borders around
 * the tile, no fill, no nesting. Spans alternate wide/narrow/narrow/wide so no
 * two rows match, which is the difference between a bento and a card grid.
 *
 * S4 · inline head — the heading runs into its lede on one line rather than
 * sitting in its own block, since About and Services already own the stacked
 * and sticky treatments.
 */
export default function Why() {
  return (
    <section id="why" className="px-gutter pt-2xl pb-4xl">
      <div className="max-w-[58ch] text-base text-ink-2">
        <h2 className="mr-sm inline font-outlier text-xs uppercase tracking-[0.14em] text-ink">
          {why.heading}
        </h2>
        <span>{why.lede}</span>
      </div>

      <ul className="mt-2xl grid gap-x-lg gap-y-xl sm:grid-cols-2 lg:grid-cols-3">
        {why.reasons.map((reason) => (
          <li
            key={reason.title}
            className={`min-w-0 border-t border-rule pt-md ${
              reason.wide ? "lg:col-span-2" : "lg:col-span-1"
            }`}
          >
            <h3 className="max-w-[24ch] font-display text-md font-semibold leading-[1.2] text-ink">
              {reason.title}
            </h3>
            <p className="mt-sm max-w-[52ch] text-base text-ink-2">
              {reason.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
