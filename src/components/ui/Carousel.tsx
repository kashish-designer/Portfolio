"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

interface CarouselProps {
  /** Accessible name for the scrollable region. */
  label: string;
  previousLabel: string;
  nextLabel: string;
  /** `<li>` elements — the track is a list. Each child sets its own width
   *  basis, so a section can decide how much of the next item peeks. */
  children: ReactNode;
}

/**
 * Snap carousel with paging controls.
 *
 * The track is a real scroll container; the buttons only call `scrollBy` on
 * it. Trackpad, touch swipe, and keyboard arrows therefore work independently
 * of the buttons, and every item stays in the DOM for find-in-page. A
 * state-driven slider that renders one item at a time would hide the rest of
 * the content from both.
 *
 * Nothing auto-advances — auto-rotating content without a pause control fails
 * WCAG 2.2.2.
 *
 * Extracted from Testimonials when Work needed the same behaviour. Keeping it
 * in one place also means both sections stay server components; only this
 * subtree ships JavaScript.
 */
export default function Carousel({
  label,
  previousLabel,
  nextLabel,
  children,
}: CarouselProps) {
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
    <>
      <ul
        ref={trackRef}
        onScroll={syncEdges}
        tabIndex={0}
        aria-label={label}
        className="carousel-track flex snap-x snap-mandatory gap-lg overflow-x-auto px-gutter pb-md"
      >
        {children}
      </ul>

      <div className="mt-lg flex justify-end gap-sm px-gutter">
        <button
          type="button"
          onClick={() => page(-1)}
          disabled={atStart}
          className="pager"
        >
          <span className="sr-only">{previousLabel}</span>
          <span aria-hidden="true">&larr;</span>
        </button>
        <button
          type="button"
          onClick={() => page(1)}
          disabled={atEnd}
          className="pager"
        >
          <span className="sr-only">{nextLabel}</span>
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </>
  );
}
