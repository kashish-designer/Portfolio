import testimonialsContent from "@/data/testimonials.json";
import type { TestimonialsContent } from "@/types/content";

const testimonials: TestimonialsContent = testimonialsContent;

/**
 * T1 · Pull quote with marginalia.
 *
 * The quote holds the wide column; attribution sits in the narrow margin
 * beside it, dropping below the quote under 64rem. Quotes are roman, not
 * italic — an italicised display quote is one of the more reliable AI tells,
 * and Cormorant's italic is too delicate to carry a whole paragraph.
 *
 * No visible section heading: every other head shape on the page is taken, and
 * a quote needs no introduction. The heading below is for screen readers.
 *
 * No carousel. Auto-rotating quotes fail WCAG 2.2.2 and hide two thirds of the
 * proof behind a timer.
 */
export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-paper-3 px-gutter pt-4xl pb-4xl">
      <h2 className="sr-only">{testimonials.heading}</h2>

      <div className="grid gap-2xl">
        {testimonials.testimonials.map((testimonial) => (
          <figure
            key={testimonial.name}
            className="grid gap-x-lg gap-y-md border-t border-rule pt-lg lg:grid-cols-[minmax(0,1.7fr)_minmax(0,0.7fr)]"
          >
            <blockquote className="max-w-[42ch] font-display text-lg leading-[1.35] text-ink [overflow-wrap:anywhere] min-w-0">
              {testimonial.quote}
            </blockquote>

            <figcaption className="font-outlier text-xs uppercase tracking-[0.14em] text-ink lg:text-right">
              {testimonial.name}
              <span className="mt-2xs block normal-case tracking-normal text-ink-2">
                {testimonial.role}, {testimonial.company}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
