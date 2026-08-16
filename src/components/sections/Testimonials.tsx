import Carousel from "@/components/ui/Carousel";
import testimonialsContent from "@/data/testimonials.json";
import type { TestimonialsContent } from "@/types/content";

const testimonials: TestimonialsContent = testimonialsContent;

/**
 * Quote carousel — the reference's feedback row, with the paging controls
 * bottom-right.
 *
 * Scroll behaviour and the pagers live in `Carousel`, shared with Work. This
 * section is a server component as a result; only the carousel subtree ships
 * JavaScript.
 *
 * No portraits — see the note on `TestimonialsContent`.
 */
export default function Testimonials() {
  return (
    <section id="testimonials" className="border-b border-rule pb-3xl pt-4xl">
      <div className="px-gutter">
        <h2 className="poster-heading min-w-0 max-w-[12ch] text-ink">
          {testimonials.heading}
        </h2>
        <p className="mt-md max-w-[46ch] text-base text-ink-2">
          {testimonials.lede}
        </p>
      </div>

      <div className="mt-2xl">
        <Carousel
          label={testimonials.heading}
          previousLabel={testimonials.previousLabel}
          nextLabel={testimonials.nextLabel}
        >
          {testimonials.testimonials.map((testimonial) => (
            <li
              key={testimonial.name}
              className="min-w-0 shrink-0 basis-[84%] snap-start sm:basis-[56%] lg:basis-[40%]"
            >
              <figure className="border-t border-rule pt-lg">
                <span className="quote-mark" aria-hidden="true">
                  &ldquo;
                </span>

                <blockquote className="mt-sm min-w-0 max-w-[38ch] text-md leading-[1.5] text-ink [overflow-wrap:anywhere]">
                  {testimonial.quote}
                </blockquote>

                <figcaption className="mt-lg text-sm text-ink">
                  {testimonial.name}
                  <span className="mt-3xs block text-ink-2">
                    {testimonial.role}, {testimonial.company}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
