import aboutContent from "@/data/about.json";
import type { AboutContent } from "@/types/content";

const about: AboutContent = aboutContent;

/**
 * S2 · Hanging section head.
 * The heading sits in negative space above a single prose column — no rule,
 * no border, no eyebrow. Section rhythm differs from the hero deliberately:
 * heavier top padding, tighter bottom, so the page doesn't march evenly.
 */
export default function About() {
  return (
    <section
      id="about"
      className="bg-paper-3 px-gutter pt-3xl pb-2xl sm:pt-4xl sm:pb-3xl"
    >
      <h2 className="max-w-[16ch] font-display text-2xl font-semibold leading-[1.08] tracking-[-0.02em] text-ink [overflow-wrap:anywhere] min-w-0 sm:text-3xl">
        {about.heading}
      </h2>

      <div className="mt-xl max-w-[62ch] space-y-lg text-base text-ink-2 sm:mt-2xl sm:text-md">
        {about.body.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
