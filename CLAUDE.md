# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # next dev — see caveat below
npm run build    # next build (type-checks; a type error fails the build)
npm run lint     # eslint (flat config, eslint-config-next)
npx next start -p 3112   # serve the production build for verification
```

No test framework is installed. `npm run build` is the only automated gate — it runs TypeScript and prerenders the page, so it catches both type errors and render-time crashes.

**Verify visual/CSS work against `next build` + `next start`, not `next dev`.** The dev server here has repeatedly served stale CSS chunks after edits to `globals.css` and `tokens.css` — changes appear to have no effect, or a correct fix looks broken. Next also refuses a second `next dev` in the same directory, and a just-killed `next start` can still hold its port (`EADDRINUSE`), silently serving the *previous* build to whatever you inspect next. Confirm the served output contains your change (`curl … | grep`) before trusting a browser check.

Two failure modes worth knowing, both of which have cost real time here:

- **A green build does not mean the CSS shipped.** An unterminated `/* */` in `tokens.css` swallowed the next declaration (`--color-paper`) and survived two builds and several screenshots, because CSS fails silently and warm-white looks like white. After any bulk or scripted edit to a stylesheet, check the delimiters balance and grep the built chunk in `.next/static/chunks/*.css` for the tokens you expect.
- **`rm -rf .next` can break the build.** It discards the cached Google Font files, and font resolution may then fail offline or against a rotated CDN URL. That is how Cormorant Garamond was found to be unbuildable from a clean checkout.

## Architecture

### Content lives in JSON, never in components

Every section reads its copy from `src/data/<section>.json`, typed by an interface in `src/types/content.ts`. Components own layout only; they contain no display strings, including emoji. One JSON per section — when two sections merged into `Credentials`, `skills.json` and `certificates.json` merged into `credentials.json` with them.

The types file is the contract, and it is where honesty constraints about placeholder data are recorded. **Read those comments before touching the data.** Several sections carry fabricated content, and the comments distinguish what is merely unfinished from what becomes dishonest the moment the site is public — invented testimonials attributed to named people, fictional credential issuers, and the About figure strip, whose numbers nobody counted.

Three gotchas already hit here:

- JSON imports infer `string`, not literal unions. Model a two-state flag as `boolean` rather than `"wide" | "narrow"`, or the build fails.
- `src/app/actions.ts` is `"use server"` and may export **only async functions**. A const exported from there is stripped and arrives `undefined` on the client — that is why `INITIAL_CONTACT_STATE` lives in `src/types/contact.ts`.
- Image *paths* are code, not content. Real assets are `import`ed from `src/images/` so Next content-hashes the URL; only their `alt` text lives in JSON (`ImageAlt`). A file in `public/` is served at a fixed URL under `Cache-Control: max-age=14400`, so replacing it shows returning visitors the old one for four hours. Placeholder images are the exception and still resolve through `src/config/placeholders.ts` (`ImageSlot`); that module can be deleted once every section has real assets.

### Design tokens drive everything

`src/styles/tokens.css` is the single source for colour, type, spacing, and easing. Tokens are declared inside Tailwind v4's `@theme`, which generates the utilities directly — `bg-paper-2`, `text-ink-2`, `font-poster`, `pt-4xl` are project tokens, not Tailwind defaults. There is no `tailwind.config.js`; v4 is configured CSS-first. Only `--z-*`, `--dur-*` and `--rule-*` sit in the `:root` block below `@theme`.

Rules enforced by review, not tooling:

- No raw colour or `font-family` value outside `tokens.css`. If a value is needed, add a named token first.
- **Lightning CSS silently drops `color-mix()` whose arguments are `var()`.** The rule vanishes with no build error. This bites through Tailwind's opacity modifier too: `border-accent/30` compiles to exactly that pattern and disappears. Spell composed values out as their own literal token — that is why `--color-accent-rule` exists.
- Contrast is **computed, never eyeballed**: OKLCH → linear sRGB → WCAG ratio. Several pairs sit within 0.1 of the threshold, and `--color-accent-strong` / `--color-focus` are at the sRGB gamut edge, where raising chroma silently clips.

The palette is one pink hue (8.3) at two lightnesses, and the split is a contrast constraint, not a style choice:

- `--color-hero` (61%) — the fold panel, the name on it, and the menu overlay. **Nothing else may use it.** Paper type on it is 3.83:1, fine under poster-scale type (large text passes at 3:1) and nowhere else.
- `--color-accent` (55%) — every other pink: footer band, showcase mount, links, submit button, quote marks, focus ring, form errors. Secondary copy on these bands runs at `opacity-90`, not the `opacity-80` used on paper; 80% drops to 4.13:1 and fails.

Two known misses are recorded on the tokens themselves: `--color-muted` on `--color-paper-3` (4.07:1 — use `--color-ink-2` there), and the fold's own headline and cue, an accepted trade for the brighter pink.

### Typography

Two families, three roles, no serif. `--font-poster` is the body face (Geist) at weight 800 — every section heading uses the shared `.poster-heading`, and the hero name uses `.poster-name`. `--font-outlier` (Geist Mono) is a register for indexes and labels, deliberately confined to two slots in `Credentials`; spreading it across sections is what previously made every section look alike.

`.poster-name` is the one display header that does **not** set `overflow-wrap: anywhere`. Its size is a `vw` calculation against font metrics, and a one-pixel overshoot would split the name across two lines and double the fold's height. It refuses to wrap so the failure mode is a harmless clip instead.

### Page composition

`src/app/page.tsx` assembles ordered sections, each self-contained in `src/components/sections/`. Sections are separated by hairline rules rather than alternating fills. `Header` is absolutely positioned over the hero and renders in ink, because the fold above the panel is paper.

Only three components are client components — `Header` (menu toggle), `Contact` (form state), and `components/ui/Carousel`. Work and Testimonials are servers that pass items into the shared `Carousel`; keep it that way rather than marking a whole section `"use client"` for one control.

Two behaviours worth not reinventing:

- **Services is a native `<details name="services">` accordion.** The shared `name` gives one-open-at-a-time at the HTML level — no state, no effect, and keyboard operation and find-in-page for free.
- **Carousels are real scroll containers**, and the buttons only call `scrollBy`. Every item stays in the DOM, swipe and keyboard arrows work independently of the buttons, and disabled states track real `scrollLeft` rather than a slide index. Snap containers need `scroll-padding-inline` matching the gutter, or `snap-start` pulls the first item flush and the track silently self-scrolls on load.

Nothing animates open. Height and `grid-template-rows` are layout properties; panels fade instead.

## Design system

Built with the **Hallmark** skill (`.claude/skills/hallmark/`), an anti-AI-slop design system. `tokens.css` opens with a stamp recording macrostructure, theme, genre and gate results; `.hallmark/log.json` records the build. Keep both accurate — a stamp that no longer matches what shipped is itself a flagged defect.

Practical consequences:

- No two sections use the same component archetype. Check what is in use before reaching for a card grid.
- Banned outright: three-column icon-tile feature grids, card-in-card, italic headings, gradient text, emoji as icons, eyebrow labels beside headings, `transition-all`, uniform `hover:scale`, auto-rotating carousels, hand-drawn browser/phone chrome, and the four-column Product/Company/Resources/Legal footer.
- Interactive elements need all eight states. Form controls keep a constant border-width, use `outline` for focus, share one 44px base height, and reserve their helper-text slot.
- Never invent metrics, testimonials, or credentials from real organisations. A number-shaped hole is honest; a fabricated number is not.

`.claude/prompts/coding-rules.md` (DRY, component-based, no over-engineering, follow existing architecture, no hardcoded colours) applies. `instructions.md` holds the original brand palette and section list — note it is currently **empty in the working tree** as an uncommitted deletion; `git show HEAD:instructions.md` recovers it. The shipped palette is not a literal transcription of those hexes.

### Working from the reference designs

`inspirations/` (git-ignored) holds the screenshots this layout was built from. **Measure them, do not eyeball them.** Three separate geometry decisions were derived wrongly by looking — the hero fold twice, the footer wordmark once — and settled correctly only by sampling pixels with PIL and printing a colour map. Reading exact values out of a low-resolution screenshot is guesswork; a fifteen-line script is not.

## Known gaps

The contact form validates server-side but has no email provider wired — a valid submission reports that plainly rather than faking success. Work cards and blog entries are intentionally not links because their target pages do not exist. The footer's social row and email are empty by design, and the email falls back to a contact-form link rather than inventing an address. Every image except the hero portrait is still a grayscale placeholder.
