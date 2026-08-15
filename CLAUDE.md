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

**Verify visual/CSS work against `next build` + `next start`, not `next dev`.** The dev server in this project has repeatedly served stale CSS chunks after edits to `globals.css` and `tokens.css` — changes appear to have no effect, or a fix looks broken when it is correct. Next also refuses a second `next dev` in the same directory, and a just-killed `next start` can still hold its port (`EADDRINUSE`), silently serving the *previous* build to whatever you inspect next. Confirm the served HTML contains your change (`curl … | grep`) before trusting a browser check.

## Architecture

### Content lives in JSON, never in components

Every section reads its copy from `src/data/<section>.json`, typed by an interface in `src/types/content.ts`. Components own layout only; they contain no display strings. This exists because the site's niche is expected to change — a repositioning should be a data edit, not a hunt through JSX.

The types file is the contract, and it is also where honesty constraints about placeholder data are recorded. Read those comments before touching the data: several sections carry fabricated content (clients, testimonials, credentials, blog posts) with explicit notes on which are merely unfinished and which become dishonest the moment the site is public.

Two JSON gotchas already hit here:
- JSON imports infer `string`, not literal unions. Model a two-state flag as `boolean` rather than `"wide" | "narrow"`, or the build fails.
- `src/app/actions.ts` is `"use server"` and may export **only async functions**. A const exported from there is stripped and arrives `undefined` on the client — that is why `INITIAL_CONTACT_STATE` lives in `src/types/contact.ts`.

### Design tokens drive everything

`src/styles/tokens.css` is the single source for colour, type, spacing, and easing. Tokens are declared inside Tailwind v4's `@theme`, which generates the utilities directly — `bg-paper-3`, `text-ink-2`, `font-display`, `pt-4xl` are project tokens, not Tailwind defaults. There is no `tailwind.config.js`; v4 is configured CSS-first.

Rules that are enforced by review, not by tooling:
- No raw colour or `font-family` values outside `tokens.css`. If a value is needed, add a named token first.
- Tokens outside Tailwind's namespaces (`--z-*`, `--dur-*`, `--rule-*`, `--color-scrim-*`) sit in the `:root` block below `@theme`.
- **Lightning CSS silently drops `color-mix()` whose arguments are `var()`.** The rule vanishes from the stylesheet with no build error. Write the composed value as its own literal token instead — this is why the scrim tokens exist.
- `--color-muted` fails 4.5:1 for small text on the blush band (`--color-paper-3`). Use `--color-ink-2` there.

Verify contrast by computing it in the browser against the *effective* background, not by eye. For text over the hero photograph, sample the image's brightest pixels and composite the scrim alpha — the section's own background is transparent, so naive checks report false failures.

### Page composition

`src/app/page.tsx` assembles ordered sections; each is a self-contained component in `src/components/sections/`. `Header` is absolutely positioned over the hero photograph and therefore renders in bone, not ink. Surfaces alternate paper / blush / ink to give the page rhythm, and section padding is deliberately uneven — no two adjacent sections share a padding pair.

Placeholder imagery resolves through `src/config/placeholders.ts` to files in `public/images/placeholders/`. They are local and grayscale on purpose: remote placeholder services rate-limited and returned 500s through the image optimiser, and arbitrary colour photography fights the palette. Swapping in real assets should be a change to that one module.

## Design system

The page was built with the **Hallmark** skill (`.claude/skills/hallmark/`), an anti-AI-slop design system. `src/styles/tokens.css` opens with a stamp recording the macrostructure, theme, genre, and gate results; `.hallmark/log.json` records the build for diversification. Keep both accurate — a stamp that no longer matches what shipped is itself a flagged defect.

Practical consequences when adding UI here:
- No two sections use the same component archetype. Check what is already in use before reaching for a card grid.
- Banned outright: three-column icon-tile feature grids, card-in-card, italic headings, gradient text, emoji as icons, eyebrow labels beside headings, `transition-all`, uniform `hover:scale`, auto-rotating carousels, and the four-column Product/Company/Resources/Legal footer.
- Interactive elements need all eight states, and form controls must keep a constant border-width, use `outline` for focus, share one 44px base height, and reserve their helper-text slot.
- Never invent metrics, testimonials, or credentials from real organisations. A number-shaped hole is honest; a fabricated number is not.

Project conventions in `instructions.md` (brand palette, section list) and `.claude/prompts/coding-rules.md` (DRY, component-based, no over-engineering, follow existing architecture) still apply. Note that `instructions.md` still lists the original mauve palette; the shipped palette is "Bone & Ink" in `tokens.css`, deliberately left divergent.

## Known gaps

The contact form validates server-side but has no email provider wired — a valid submission reports that plainly rather than faking success. Work cards and blog entries are intentionally not links because their target pages do not exist. The footer's social row is empty by design.
