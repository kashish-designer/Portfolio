"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import testimonialsContent from "@/data/testimonials.json";
import type { TestimonialsContent } from "@/types/content";

const testimonials: TestimonialsContent = testimonialsContent;

/**
 * Quote carousel — the reference's feedback row, with the paging controls
 * bottom-right.
 *
 * The track is a real scroll container with scroll-snap, and the buttons just
 * scroll it. That means the quotes stay reachable by trackpad, touch swipe,
 * and keyboard arrows even before any JavaScript runs — the buttons are an
 * accelerator, not the only way in. A state-driven slider that renders one
 * quote at a time would hide two thirds of the content from find-in-page and
 * from anyone whose JS fails.
 *
 * Nothing auto-advances. Auto-rotating content without a pause control fails
 * WCAG 2.2.2, and a quote that slides away mid-sentence is hostile besides.
 *
 * No portraits — see the note on `TestimonialsContent`.
 */
export default function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /** Disabled states have to track real scroll position, not a slide index:
   *  the user can swipe the track directly and never touch the buttons. */
  const syncEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    setAtStart(track.scrollLeft <= 1);
    setAtEnd(track.scrollLeft >= maxScroll - 1);
  }, []);

  useEffect(() => {
    syncEdges();

    const track = trackRef.current;
    if (!track) return;

    const observer = new ResizeObserver(syncEdges);
    observer.observe(track);
    return () => observer.disconnect();
  }, [syncEdges]);

  const page = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;

    const step = track.firstElementChild?.clientWidth ?? track.clientWidth;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <section
      id="testimonials"
      className="border-b border-rule pb-3xl pt-4xl"
    >
      <div className="px-gutter">
        <h2 className="poster-heading min-w-0 max-w-[12ch] text-ink">
          {testimonials.heading}
        </h2>
        <p className="mt-md max-w-[46ch] text-base text-ink-2">
          {testimonials.lede}
        </p>
      </div>

      <ul
        ref={trackRef}
        onScroll={syncEdges}
        tabIndex={0}
        aria-label={testimonials.heading}
        className="quote-track mt-2xl flex snap-x snap-mandatory gap-lg overflow-x-auto px-gutter pb-md"
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
      </ul>

      <div className="mt-lg flex justify-end gap-sm px-gutter">
        <button
          type="button"
          onClick={() => page(-1)}
          disabled={atStart}
          className="pager"
        >
          <span className="sr-only">{testimonials.previousLabel}</span>
          <span aria-hidden="true">&larr;</span>
        </button>
        <button
          type="button"
          onClick={() => page(1)}
          disabled={atEnd}
          className="pager"
        >
          <span className="sr-only">{testimonials.nextLabel}</span>
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </section>
  );
}
