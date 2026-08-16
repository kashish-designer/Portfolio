import certificatesContent from "@/data/certificates.json";
import skillsContent from "@/data/skills.json";
import type { CertificatesContent, SkillsContent } from "@/types/content";

const skills: SkillsContent = skillsContent;
const certificates: CertificatesContent = certificatesContent;

/**
 * One credentials strip, replacing the separate Skills and Certificates
 * sections.
 *
 * Both were full-width blocks with a mono-caps label and hairline rows, which
 * is the shape that made the whole page read as one repeating section. Held
 * together in a single band they behave like the résumé line they actually
 * are: dense, small, and clearly subordinate to the work above.
 *
 * This is the only section that still uses the mono outlier face — it is the
 * page's register for indexes and labels, and spreading it across seven
 * sections turned a register into a third body font.
 */
export default function Credentials() {
  return (
    <section
      id="credentials"
      className="grid gap-2xl bg-paper-3 px-gutter pb-3xl pt-3xl lg:grid-cols-12 lg:gap-2xl"
    >
      <div className="min-w-0 lg:col-span-7">
        <h2 className="font-outlier text-xs uppercase tracking-[0.14em] text-ink-2">
          {skills.heading}
        </h2>
        <p className="mt-sm max-w-[46ch] text-sm text-ink-2">{skills.note}</p>

        <div className="mt-xl grid gap-lg sm:grid-cols-2">
          {skills.groups.map((group) => (
            <div key={group.label} className="min-w-0">
              <h3 className="font-outlier text-xs uppercase tracking-[0.14em] text-ink-2">
                {group.label}
              </h3>
              <ul className="skill-list mt-sm max-w-[34ch] text-base leading-[1.5] text-ink">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="min-w-0 lg:col-span-4 lg:col-start-9">
        <h2 className="font-outlier text-xs uppercase tracking-[0.14em] text-ink-2">
          {certificates.heading}
        </h2>
        <p className="mt-sm max-w-[40ch] text-sm text-ink-2">
          {certificates.note}
        </p>

        <ul className="mt-xl">
          {certificates.certificates.map((certificate) => (
            <li
              key={certificate.name}
              className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-md border-t border-rule py-md"
            >
              <span className="text-sm tabular-nums text-muted">
                {certificate.year}
              </span>
              <span className="min-w-0">
                <span className="block text-base text-ink [overflow-wrap:anywhere]">
                  {certificate.name}
                </span>
                <span className="mt-3xs block text-sm text-ink-2">
                  {certificate.issuer}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
