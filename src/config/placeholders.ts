/**
 * Placeholder imagery — TEMPORARY.
 *
 * Every placeholder image on the site resolves through this one module, so
 * swapping in Kashish's real assets is a single-file change.
 *
 * Files are checked into `public/images/placeholders/` rather than fetched
 * from a remote host: remote placeholder services rate-limit and time out,
 * which surfaced as 500s from the image optimiser and broken images on the
 * page. Local files also mean no third-party request from a visitor's browser.
 *
 * They are deliberately grayscale — arbitrary colour photography fights the
 * Bone & Ink palette, and desaturating keeps the page coherent until real
 * work lands.
 *
 * TO REPLACE: drop Kashish's real files into `public/images/`, point the
 * callers at those paths, and delete this module along with the placeholder
 * directory.
 */

export const PLACEHOLDER_BASE = "/images/placeholders";

/** Local placeholder photo path. `name` matches a file in the base directory. */
export function placeholderImage(name: string): string {
  return `${PLACEHOLDER_BASE}/${name}.jpg`;
}
