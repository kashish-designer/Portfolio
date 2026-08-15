import servicesContent from "@/data/services.json";
import type { ServicesContent } from "@/types/content";

const services: ServicesContent = servicesContent;

/**
 * F3 · Tabular spec sheet, under an S3 sticky-pinned head.
 *
 * The heading holds position in the left column while the rows scroll past it;
 * below 64rem it unsticks and stacks. Rows are separated by hairlines only —
 * no cards, no icon tiles, no three-column grid. A service list is text, and
 * icons here would be decoration standing in for information.
 */
export default function Services() {
  return (
    <section
      id="services"
      className="grid gap-xl px-gutter pt-3xl pb-4xl lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] lg:gap-2xl"
    >
      <div className="lg:sticky lg:top-xl lg:self-start">
        <h2 className="max-w-[14ch] font-display text-2xl font-semibold leading-[1.08] tracking-[-0.02em] text-ink [overflow-wrap:anywhere] min-w-0 sm:text-3xl">
          {services.heading}
        </h2>
        <p className="mt-lg max-w-[38ch] text-base text-ink-2">
          {services.intro}
        </p>
      </div>

      <dl className="min-w-0">
        {services.services.map((service) => (
          <div
            key={service.name}
            className="grid gap-x-lg gap-y-2xs border-t border-rule py-lg sm:grid-cols-[minmax(0,1fr)_auto]"
          >
            <dt className="font-display text-md font-semibold text-ink">
              {service.name}
            </dt>
            <dd className="font-outlier text-xs uppercase tracking-[0.14em] text-muted sm:col-start-2 sm:row-start-1 sm:text-right">
              {service.meta}
            </dd>
            <dd className="max-w-[58ch] text-base text-ink-2 sm:col-start-1 sm:row-start-2">
              {service.description}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
