import certificatesContent from "@/data/certificates.json";
import type { CertificatesContent } from "@/types/content";

const certificates: CertificatesContent = certificatesContent;

/**
 * T4 · Numbered strip, with the year as the figure.
 *
 * The year carries the scale contrast a stat strip normally gets from a
 * metric — without inventing one. Tabular numerals so the years align down
 * the column edges.
 *
 * No issuer logos: a logo wall is only honest once the issuers are real.
 */
export default function Certificates() {
  return (
    <section id="certificates" className="px-gutter pt-4xl pb-3xl">
      <div className="flex flex-wrap items-baseline justify-between gap-x-lg gap-y-2xs">
        <h2 className="font-outlier text-xs uppercase tracking-[0.14em] text-ink">
          {certificates.heading}
        </h2>
        <p className="max-w-[46ch] text-sm text-ink-2">{certificates.note}</p>
      </div>

      <ul className="mt-xl grid gap-x-lg gap-y-lg sm:grid-cols-3">
        {certificates.certificates.map((certificate) => (
          <li
            key={certificate.name}
            className="min-w-0 border-t border-rule pt-md"
          >
            <p className="font-display text-2xl font-semibold leading-none tabular-nums text-ink">
              {certificate.year}
            </p>
            <h3 className="mt-md max-w-[24ch] font-display text-md font-semibold leading-[1.25] text-ink [overflow-wrap:anywhere] min-w-0">
              {certificate.name}
            </h3>
            <p className="mt-2xs text-sm text-ink-2">{certificate.issuer}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
