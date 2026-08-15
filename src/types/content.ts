/**
 * Shapes for the per-section JSON content files in `src/data/`.
 * Each section owns one JSON file; this is the contract between the two.
 */

export interface SiteContent {
  name: string;
  discipline: string;
  title: string;
  description: string;
  nav: {
    cta: { label: string; href: string };
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
  headline: string;
  /** Left meta row. Keep to three short tokens — it wraps below 400px. */
  tags: string[];
  /** Right meta row. Scroll cue pointing at the work section below. */
  cue: string;
  image: ImageSlot;
}

/** PLACEHOLDER DATA — clients, years, and roles below are invented for layout
 *  purposes and must be replaced with Kashish's real projects before launch. */
export interface WorkContent {
  cue: string;
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
}

/** PLACEHOLDER DATA — these credentials do not exist.
 *  The issuing bodies are deliberately FICTIONAL. Do not swap in real issuer
 *  names (Google, Coursera, NN/g, IDF) as placeholders: an invented credential
 *  from a real institution is a false claim about that institution, not an
 *  unfinished section. Replace with Kashish's actual credentials, or delete.
 *
 *  Issuer logos were left out for the same reason — a logo wall is only worth
 *  building once the issuers are real. See assets.md § Brand logos for the
 *  Simple Icons approach when that time comes. */
export interface CertificatesContent {
  heading: string;
  note: string;
  certificates: {
    year: string;
    name: string;
    issuer: string;
  }[];
}

/** PLACEHOLDER DATA — these posts do not exist. Titles and excerpts are
 *  invented to size the layout. Entries are intentionally NOT links: there are
 *  no post pages, and a headline that looks clickable and goes nowhere is
 *  worse than one that plainly does not. Wire hrefs when posts exist. */
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
  }[];
}

/** Footer.
 *  `social` is intentionally EMPTY. Placeholder social URLs are worse than
 *  absent ones — a guessed handle can point a visitor at a stranger's profile.
 *  Add real URLs and they render automatically; leave it empty and the row is
 *  omitted rather than rendering dead links. */
export interface FooterContent {
  tagline: string;
  links: { label: string; href: string }[];
  social: { label: string; href: string }[];
  colophon: string;
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
  testimonials: {
    quote: string;
    name: string;
    role: string;
    company: string;
  }[];
}

/** PLACEHOLDER DATA — these are claims about how Kashish works, written to be
 *  plausible and to carry no invented metric. She must confirm each one is
 *  true of her before launch. */
export interface WhyContent {
  heading: string;
  lede: string;
  reasons: {
    title: string;
    body: string;
    /** Grid emphasis — true spans two columns at ≥64rem, false spans one. */
    wide: boolean;
  }[];
}

/** PLACEHOLDER DATA — the skill list is plausible for the discipline but is
 *  not Kashish's own inventory. Confirm before launch. */
export interface SkillsContent {
  heading: string;
  note: string;
  groups: {
    label: string;
    items: string[];
  }[];
}

/** PLACEHOLDER DATA — engagement types below are plausible for the discipline
 *  but are not Kashish's stated offering. Confirm before launch. */
export interface ServicesContent {
  heading: string;
  intro: string;
  services: {
    name: string;
    description: string;
    /** Engagement shape — Project, Retainer, Fixed scope. */
    meta: string;
  }[];
}
