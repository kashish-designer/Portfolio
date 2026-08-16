import Image from "next/image";

import { placeholderImage } from "@/config/placeholders";
import writingContent from "@/data/writing.json";
import type { WritingContent } from "@/types/content";

const writing: WritingContent = writingContent;

/**
 * Three-up post strip — the reference's blog row.
 *
 * Equal tiles on purpose: this is the one section where uniformity is the
 * point, because the posts are peers and none is featured. The Work strip
 * directly above earns its irregularity by having a lead project; this does
 * not, and faking a hierarchy here would just be decoration.
 *
 * Entries are not links: no post pages exist yet, and a headline that looks
 * clickable and goes nowhere is worse than one that plainly does not.
 */
export default function Writing() {
  return (
    <section
      id="writing"
      className="border-b border-rule px-gutter pb-3xl pt-4xl"
    >
      <h2 className="poster-heading min-w-0 max-w-[12ch] text-ink">
        {writing.heading}
      </h2>
      <p className="mt-md max-w-[46ch] text-base text-ink-2">{writing.note}</p>

      <ul className="mt-2xl grid gap-x-lg gap-y-2xl sm:grid-cols-2 lg:grid-cols-3">
        {writing.posts.map((post) => (
          <li key={post.slug} className="min-w-0">
            {/* TODO: Replace with real post artwork, target size: 1200×900 */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-2">
              <Image
                src={placeholderImage(post.image.file)}
                alt={post.image.alt}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <time
              dateTime={post.date}
              className="mt-md block text-sm tabular-nums text-muted"
            >
              {post.dateLabel}
            </time>

            <h3 className="mt-2xs min-w-0 max-w-[26ch] text-md font-medium leading-[1.25] text-ink [overflow-wrap:anywhere]">
              {post.title}
            </h3>

            <p className="mt-sm max-w-[42ch] text-sm text-ink-2">
              {post.excerpt}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
