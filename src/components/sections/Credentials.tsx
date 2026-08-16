import credentialsContent from "@/data/credentials.json";
import type { CredentialsContent } from "@/types/content";

const credentials: CredentialsContent = credentialsContent;

/**
 * Résumé strip — the merged Skills and Certificates sections.
 *
 * Brought onto the poster typography with the rest of the page: one section
 * heading in the poster face, and the two former headings demoted to small
 * column labels. Two poster headings side by side would compete rather than
 * establish a hierarchy.
 *
 * The mono outlier survives here and nowhere else on the page. That is its
 * proper register — labels over an index — and confining it to one section
 * keeps it from becoming a third body font.
 *
 * Surface is paper with a closing hairline, like every other section. It was
 * the only blush band left once the rose was rationed to the hero panel, the
 * showcase mount, and the footer.
 */
export default function Credentials() {
  return (
    <section
      id="credentials"
      className="border-b border-rule px-gutter pb-3xl pt-4xl"
    >
      <h2 className="poster-heading min-w-0 max-w-[12ch] text-ink">
        {credentials.heading}
      </h2>
      <p className="mt-md max-w-[46ch] text-base text-ink-2">
        {credentials.note}
      </p>

      <div className="mt-3xl grid gap-2xl lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-7">
          <h3 className="font-outlier text-xs uppercase tracking-[0.14em] text-ink-2">
            {credentials.skillsLabel}
          </h3>

          <div className="mt-lg grid gap-lg sm:grid-cols-2">
            {credentials.groups.map((group) => (
              <div key={group.label} className="min-w-0">
                <h4 className="text-sm text-muted">{group.label}</h4>
                <ul className="skill-list mt-2xs max-w-[34ch] text-base leading-[1.5] text-ink">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 lg:col-span-4 lg:col-start-9">
          <h3 className="font-outlier text-xs uppercase tracking-[0.14em] text-ink-2">
            {credentials.certificatesLabel}
          </h3>

          <ul className="mt-lg">
            {credentials.certificates.map((certificate) => (
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
      </div>
    </section>
  );
}
