/**
 * Shapes for the per-section JSON content files in `src/data/`.
 * Each section owns one JSON file; this is the contract between the two.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteContent {
  name: string;
  discipline: string;
  title: string;
  description: string;
  /** One list of section links, read by both `Header` and `Footer`. They used
   *  to keep separate copies in site.json and footer.json, which drifted. */
  nav: {
    openLabel: string;
    closeLabel: string;
    links: NavLink[];
    cta: NavLink;
  };
}

/** A photographic slot. `file` names a placeholder in
 *  `public/images/placeholders/`; `alt` describes the INTENDED subject, so it
 *  stays correct once the real photo replaces it. */
export interface ImageSlot {
  file: string;
  alt: string;
}

export interface HeroContent {
  /** First person. Sits in the panel's left column, in the slot the reference
   *  design gives a QR code — a statement earns that space, a QR to nowhere
   *  does not. Keep it under ~50 characters. */
  headline: string;
  /** OWNER-CONFIRM — an availability claim, not a design string. It is true or
   *  false depending on Kashish's actual capacity on any given week. Keep it
   *  current or set it to an empty string, which hides it.
   *  Never let it drift into a fabricated number ("2 slots left for Q4"). */
  status: string;
  /** The label row riding above the poster name. Three short tokens — more
   *  than three and the row collides with the name below 400px. */
  tags: string[];
  /** Scroll cue pointing at the work section below — the Work section has no
   *  visible heading of its own and relies on this. */
  cue: string;
  image: ImageSlot;
}

/** PLACEHOLDER DATA — clients, years, and roles below are invented for layout
 *  purposes and must be replaced with Kashish's real projects before launch. */
export interface WorkContent {
  /** Scroll cue rendered by the hero, which introduces this section. */
  cue: string;
  heading: string;
  lede: string;
  /** Accessible names for the carousel controls. */
  previousLabel: string;
  nextLabel: string;
  /** Closing line under the slider. */
  note: string;
  /** The featured-project block. `projectSlug` points at an entry in
   *  `projects` rather than repeating its image and alt text — one project,
   *  one definition. A slug with no match renders nothing rather than
   *  crashing the page. */
  showcase: {
    heading: string;
    lede: string;
    projectSlug: string;
  };
  /** Rendered as a slider, so the list can grow past three without the layout
   *  needing to change. */
  projects: {
    slug: string;
    client: string;
    year: string;
    role: string;
    image: ImageSlot;
  }[];
}

export interface AboutContent {
  heading: string;
  body: string[];
  /** FABRICATED DATA — MUST BE REPLACED BEFORE LAUNCH.
   *
   *  The figures currently in about.json (6+ / 40+ / 20+) are placeholders
   *  requested to fill the layout. Nobody counted them; they are not Kashish's
   *  numbers. They sit on the most quotable part of the page, and a visitor,
   *  a journalist, or a prospective client has no way to tell them from real
   *  ones — which is what makes an invented metric different from an
   *  unfinished section.
   *
   *  Replace with her real counts before this goes public, or empty each
   *  `figure` (they then render as an em-dash), or delete the array entirely
   *  (an empty array hides the strip). */
  stats: {
    figure: string;
    label: string;
  }[];
}

/** Credentials — the merged Skills + Certificates section.
 *
 *  One JSON per section, per the architecture note in CLAUDE.md. These used to
 *  be `skills.json` and `certificates.json` back when they were two sections;
 *  the section merged, so the data did too.
 *
 *  PLACEHOLDER DATA, on two counts:
 *
 *  1. The skill list is plausible for the discipline but is not Kashish's own
 *     inventory. Confirm before launch.
 *  2. The certificates DO NOT EXIST and their issuing bodies are deliberately
 *     FICTIONAL. Do not swap in real issuer names (Google, Coursera, NN/g,
 *     IDF) as placeholders: an invented credential from a real institution is
 *     a false claim about that institution, not an unfinished section.
 *     Replace with Kashish's actual credentials, or delete the array.
 *
 *  Issuer logos were left out for the same reason — a logo wall is only worth
 *  building once the issuers are real. */
export interface CredentialsContent {
  heading: string;
  note: string;
  /** Column labels. Small labels rather than headings: the section has one
   *  poster heading, and two more would compete with it. */
  skillsLabel: string;
  certificatesLabel: string;
  groups: {
    label: string;
    items: string[];
  }[];
  certificates: {
    year: string;
    name: string;
    issuer: string;
  }[];
}

export interface WritingContent {
  heading: string;
  note: string;
  posts: {
    slug: string;
    title: string;
    /** ISO date for <time datetime>. */
    date: string;
    /** Human-readable label rendered to the page. */
    dateLabel: string;
    excerpt: string;
    image: ImageSlot;
  }[];
}

/** Footer.
 *  `social` is intentionally EMPTY. Placeholder social URLs are worse than
 *  absent ones — a guessed handle can point a visitor at a stranger's profile.
 *  Add real URLs and they render automatically; leave it empty and the row is
 *  omitted rather than rendering dead links.
 *
 *  Section links are NOT here — the footer reads `site.nav.links`, the same
 *  list the header uses. Two copies drifted apart once already. */
export interface FooterContent {
  /** Small line above the large contact affordance. */
  invitation: string;
  /** OWNER-CONFIRM — Kashish's real address, or an empty string.
   *
   *  Empty renders `fallback` as a link to the on-page form instead. Do NOT
   *  invent one to fill the slot: an invented address is either a dead
   *  `mailto:` or, worse, a live one belonging to a stranger. */
  email: string;
  /** Shown in place of the email when `email` is empty. */
  fallback: NavLink;
  tagline: string;
  social: NavLink[];
  colophon: string;
  /** Build credit, centred under the wordmark. `href` is external, so the
   *  link opens in a new tab with `rel="noreferrer"`.
   *
   *  The symbol is split from the surrounding words so it can be given an
   *  accessible name: it renders as `role="img"` labelled by `symbolLabel`,
   *  which reads as "Developed with love by …" rather than leaving a screen
   *  reader to announce whatever it makes of the raw glyph. */
  credit: {
    prefix: string;
    symbol: string;
    symbolLabel: string;
    connector: string;
    label: string;
    href: string;
  };
  backToTopLabel: string;
}

/** Closing CTA. `href` points at the on-page contact form — instructions.md
 *  specifies a `/contact` page, which does not exist; change the href here if
 *  the form moves to its own route. */
export interface CtaContent {
  line: string;
  button: { label: string; href: string };
}

export interface ContactContent {
  heading: string;
  lede: string;
  fields: {
    name: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    projectType: { label: string; options: string[] };
    message: { label: string; placeholder: string };
  };
  submit: string;
  sending: string;
  privacy: string;
}

/** FABRICATED DATA — HIGHEST RISK ON THE PAGE.
 *  These people do not exist and never said these things. Invented praise
 *  attributed to a named person at a named company is the one placeholder that
 *  crosses from "unfinished" into "dishonest" the moment the site is public.
 *  Replace with real, permissioned quotes or delete the section entirely
 *  before launch — an absent testimonials section beats a fake one. */
export interface TestimonialsContent {
  heading: string;
  lede: string;
  /** Accessible names for the carousel controls. */
  previousLabel: string;
  nextLabel: string;
  /** No portrait field, deliberately. The reference design pairs each quote
   *  with a photograph of the person; pairing an INVENTED name and company
   *  with a stock stranger's face turns unfinished content into a picture of a
   *  real person endorsing work they have never seen. Add portraits only
   *  alongside real, permissioned quotes. */
  testimonials: {
    quote: string;
    name: string;
    role: string;
    company: string;
  }[];
}

/** PLACEHOLDER DATA — the engagements below are plausible for the discipline
 *  but are not Kashish's stated offering. Confirm before launch.
 *
 *  There is deliberately no per-item pricing label. An earlier version tagged
 *  each row Project / Fixed scope / Retainer, which is how a studio prices
 *  itself and read as the clearest agency tell in the copy. Do not reintroduce
 *  it.
 *
 *  The first entry renders open; the rest are collapsed. Order accordingly. */
export interface ServicesContent {
  heading: string;
  lede: string;
  services: {
    slug: string;
    name: string;
    description: string;
    image: ImageSlot;
  }[];
}
