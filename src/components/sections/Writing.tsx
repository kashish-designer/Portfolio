import writingContent from "@/data/writing.json";
import type { WritingContent } from "@/types/content";

const writing: WritingContent = writingContent;

/**
 * Post index — two-column text entries.
 *
 * Differentiated from Work (image grid) and Services (full-width rows) by
 * layout rather than by a new head archetype: the cookbook ships five section
 * heads and this page has already used all of them, so contorting the shape
 * here would cost more than reusing a stacked head.
 *
 * Dates lead each entry so the list reads chronologically at a glance. Entries
 * are not links — no post pages exist yet.
 */
export default function Writing() {
  return (
    <section id="writing" className="bg-paper-3 px-gutter pt-2xl pb-2xl">
      <h2 className="max-w-[16ch] font-display text-2xl font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-3xl">
        {writing.heading}
      </h2>
      <p className="mt-md max-w-[46ch] text-base text-ink-2">{writing.note}</p>

      <ul className="mt-2xl grid gap-x-2xl gap-y-xl md:grid-cols-2">
        {writing.posts.map((post) => (
          <li key={post.slug} className="min-w-0 border-t border-rule pt-md">
            <time
              dateTime={post.date}
              className="font-outlier text-xs uppercase tracking-[0.14em] text-ink-2"
            >
              {post.dateLabel}
            </time>
            <h3 className="mt-sm max-w-[26ch] font-display text-lg leading-[1.25] text-ink [overflow-wrap:anywhere] min-w-0">
              {post.title}
            </h3>
            <p className="mt-sm max-w-[46ch] text-base text-ink-2">
              {post.excerpt}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
