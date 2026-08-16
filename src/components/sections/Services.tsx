import Image from "next/image";

import { placeholderImage } from "@/config/placeholders";
import servicesContent from "@/data/services.json";
import type { ServicesContent } from "@/types/content";

const services: ServicesContent = servicesContent;

/**
 * Disclosure list — the reference's service accordion.
 *
 * Built on native `<details name="services">`. The shared `name` makes it an
 * exclusive accordion at the HTML level, so opening one row closes the others
 * with no state, no effect, and no client component. Keyboard operation, the
 * expanded/collapsed semantics, and find-in-page all come for free; a hand-
 * rolled version would reimplement them worse.
 *
 * Nothing animates open. Height and grid-template-rows are layout properties,
 * and animating them is the jank this codebase avoids everywhere else — the
 * panel's content fades instead.
 *
 * State coverage on the summary is default / hover / focus-visible / active /
 * open. Disabled, loading, error, and success have no meaning for a
 * disclosure: there is nothing to submit and nothing that can fail.
 */
export default function Services() {
  return (
    <section
      id="services"
      className="border-b border-rule px-gutter pb-3xl pt-4xl"
    >
      <h2 className="poster-heading min-w-0 max-w-[12ch] text-ink">
        {services.heading}
      </h2>
      <p className="mt-md max-w-[42ch] text-base text-ink-2">{services.lede}</p>

      <div className="mt-3xl">
        {services.services.map((service, index) => (
          <details
            key={service.slug}
            name="services"
            open={index === 0}
            className="service-row"
          >
            <summary className="service-summary">
              <h3 className="poster-heading min-w-0 text-ink">
                {service.name}
              </h3>
              <span className="service-marker" aria-hidden="true" />
            </summary>

            <div className="service-panel grid gap-lg pb-2xl lg:grid-cols-12 lg:gap-2xl">
              <p className="max-w-[38ch] text-base leading-[1.6] text-ink-2 lg:col-span-4">
                {service.description}
              </p>

              {/* TODO: Replace with real work from this engagement type,
                  target size: 1200×900. Currently reusing project placeholders. */}
              <div className="relative aspect-[4/3] w-full min-w-0 overflow-hidden bg-paper-2 lg:col-span-7 lg:col-start-6">
                <Image
                  src={placeholderImage(service.image.file)}
                  alt={service.image.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
