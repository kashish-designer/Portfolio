import aboutContent from "@/data/about.json";
import type { AboutContent } from "@/types/content";

const about: AboutContent = aboutContent;

/**
 * Poster heading and prose left, figure strip right, hairline rule closing the
 * section — the reference's About block.
 *
 * The figures are deliberately empty. See the OWNER-CONFIRM note on
 * `AboutContent.stats`: the reference fills this strip with someone else's
 * numbers, and the em-dash is the honest stand-in until Kashish supplies hers.
 * A number-shaped hole reads as unfinished; an invented number reads as a lie.
 */
export default function About() {
  return (
    <section
      id="about"
      className="border-b border-rule px-gutter pb-3xl pt-4xl"
    >
      <h2 className="poster-heading min-w-0 max-w-[10ch] text-ink">
        {about.heading}
      </h2>

      <div className="mt-xl grid gap-x-2xl gap-y-2xl lg:grid-cols-12">
        <div className="max-w-[46ch] space-y-md text-base leading-[1.6] text-ink-2 lg:col-span-5">
          {about.body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>

        {about.stats.length ? (
          <dl className="flex flex-wrap items-end gap-x-xl gap-y-lg self-end lg:col-span-6 lg:col-start-7 lg:justify-end">
            {about.stats.map((stat) => (
              <div
                key={stat.label}
                className="min-w-0 border-l border-rule pl-lg first:border-l-0 first:pl-0 lg:pl-xl"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-poster text-2xl font-extrabold leading-none tracking-[-0.03em] tabular-nums text-ink sm:text-3xl">
                    {/* Empty until Kashish confirms the real figure. */}
                    {stat.figure || "—"}
                  </span>
                  <span
                    className="mt-xs block text-sm text-ink-2"
                    aria-hidden="true"
                  >
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}
