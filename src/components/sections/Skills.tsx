import skillsContent from "@/data/skills.json";
import type { SkillsContent } from "@/types/content";

const skills: SkillsContent = skillsContent;

/**
 * S5 · Bottom-anchored head over a typographic index.
 *
 * The section heading comes FIRST in the DOM and is moved to the bottom
 * visually with `order`. Rendering it last in source put the group <h3>s under
 * the previous section's <h2> in the accessibility tree — the skills were
 * announced as part of Services. Visual inversion must not invert the outline.
 *
 * Skills are set inline at display size rather than as a row table (Services
 * already owns that shape) or as pills, which would be a card grid in costume.
 *
 * The rose accent appears here carrying the separators — a signal, not a
 * surface.
 */
export default function Skills() {
  return (
    <section id="skills" className="flex flex-col bg-paper-3 px-gutter pt-3xl pb-2xl">
      <div className="order-last mt-3xl flex flex-wrap items-baseline justify-between gap-x-lg gap-y-2xs border-t border-rule pt-md">
        <h2 className="font-outlier text-xs uppercase tracking-[0.14em] text-ink-2">
          {skills.heading}
        </h2>
        <p className="max-w-[46ch] text-sm text-ink-2">{skills.note}</p>
      </div>

      <div className="grid gap-2xl">
        {skills.groups.map((group) => (
          <div key={group.label} className="min-w-0">
            <h3 className="font-outlier text-xs uppercase tracking-[0.14em] text-ink-2">
              {group.label}
            </h3>
            <ul className="skill-list mt-md max-w-[34ch] font-display text-lg leading-[1.35] text-ink sm:max-w-[52ch]">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
