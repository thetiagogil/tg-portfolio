# thetiagogil.com

Tiago Gil's portfolio: a frontend developer with a background in architecture. Bilingual (English and European
Portuguese). Rebuilt from scratch on the `rebuild` branch; what's left before launch is in `docs/PLAN.md`.

## Read first

@AGENTS.md

**Next.js 16 changed APIs since most training data:** read the relevant guide in `node_modules/next/dist/docs/`
before writing Next.js code (static export, fonts, metadata, routing). `AGENTS.md` is written by `next dev`; keep it.

| File | When |
| --- | --- |
| `docs/OWNER.md` | Before writing copy, proposing design, or any larger task. How Tiago likes to work. |
| `docs/CODE.md` | Before writing or reviewing code. Where things go and the house style. |
| `docs/DESIGN.md` | Before touching anything visual. The design system (tokens, type, layout, components, pages). |
| `docs/CONTENT.md` | Before touching content. The model and the writing rules for both languages. |
| `docs/PLAN.md` | Before starting work. The phases, their status, what needs Tiago's approval. |
| `docs/DECISIONS.md` | When asking "why is it like this?" Add an entry for every decision Tiago makes. |
| `docs/study/` | The original visual spec, kept as a reference but no longer updated: `DESIGN.md`, `DECISIONS.md` and the site itself are newer. |

## Stack

Next.js (App Router, `output: "export"`, static files only), React, TypeScript (strict), Tailwind 4, Geist and
Geist Mono via `next/font`, Vitest, Playwright + axe. No UI library: native `<dialog>` for modals. Hosted on
Cloudflare (Workers static assets) at thetiagogil.com.

## Structure and style

The folder map and the house style are in `docs/CODE.md`. In short:

```
src/
  app/          routes only; English at /, Portuguese mirrored under /pt with the same paths
  features/     one folder per page (home, projects, records, about, timeline, link-previews): the page and its
                sections, one file each
  components/   ui/ (generic), layout/ (the site shell), entries/ (cards, status, pager, image viewer…)
  content/      the data, one file per entry with en and pt side by side; ui/en.ts and ui/pt.ts
  lib/          constants, dates (UTC), i18n, entry paths, metadata, link previews, the chart scale
  styles/       the little CSS left: tokens, base (type, grid, bands), links and icons, crop marks, motion
tests/          unit/ (Vitest) and e2e/ (Playwright + axe, with its config)
assets/         source images (screenshots, portrait), kept in git, never shipped as-is
public/         PDFs and the CV; `public/images/` is generated (git-ignored)
docs/           project docs and the study
```

Styling is Tailwind in the markup. The tokens (`src/styles/tokens.css`) are Tailwind colours (`bg-paper`,
`text-ink-2`, `border-line`); the type scale, grid and bands are a few classes in `src/styles/base.css` (`title`,
`lead`, `an`, `wrap`, `page-grid`, `band`). Breakpoints are Tailwind's defaults, which match the design (sm 40rem,
md 48rem, lg 64rem). File names are kebab-case.

## Commands

`npm run dev` · `build` (static site in `out/`) · `preview` (serves `out/` on port 4000) · `lint` · `format` /
`format:check` · `typecheck` · `test` (Vitest, `tests/unit/`) · `test:e2e` (Playwright + axe against `out/`, in
the installed Chrome; build first) · `images` (WebP sizes from `assets/` into `public/images/`, runs before dev and
build) · `icons` (favicons from `src/app/icon.svg`) · `verify` (all checks; run it before saying something works).
Screenshots with real phone emulation: `node scripts/screenshot.mjs <url> <out.png> [width] [height] [light|dark] [full]`
(headless Chrome's own window can't go below ~500px, so don't use it for phone captures). Previews: `.claude/launch.json` has `dev` (port 3000) and `study` (the study on port 4410).

## Hard rules

- **Git:** commit messages are the title line only, conventional style (`feat: add timeline filters`). No body, no
  co-author or attribution lines. Never push, merge, deploy or delete branches without asking.
- **Answer Tiago's questions before acting.** Give one recommendation and an honest verdict; no menus of options.
- **Code follows `docs/CODE.md`:** one job per file, small files, a page split into section files, Tailwind in the
  markup, few comments, text only from `src/content`. `npm run lint` checks part of it.
- **Visual changes go straight into the code** (no study mockup first, since 2026-10-02). Follow `docs/DESIGN.md`, share
  screenshots of the result, and log the decision in `docs/DECISIONS.md`.
- **Role names are never translated:** Frontend Developer, Full-Stack Developer. Spelling: *Frontend* (one word),
  *Full-Stack* (hyphen).
- **Portuguese is pt-PT.** Dates as "jan 2025" (format the month alone, then the year), never "01/2025".
- **Dates are UTC** everywhere (`getUTCFullYear`, `timeZone: "UTC"`).
- **Large text only for short intros** (2–3 lines); long paragraphs use the reading style (`read`).
- **Lines only separate rows**, at the content width; never boxes, never full-width rules.
- **Avoid em dashes** in UI text (open question; default to commas).
- **Never invent content.** Copy comes from `src/content` or from Tiago. When unsure, ask.

## Verifying work

- Run `npm run verify`. For anything visible, check the page in the preview at desktop 1280 and phone 390, light and
  dark, English and Portuguese, against `docs/DESIGN.md`. Share a screenshot.
- Agents in `.claude/agents/`: **qa-runner** (all checks), **code-reviewer** (changed code vs `docs/CODE.md`),
  **design-reviewer** (page vs study and DESIGN.md), **a11y-auditor** (keyboard, contrast, semantics),
  **content-editor** (writes content in both languages).
- Skills: `/verify`, `/new-entry`, `/compare-study`. Code review: the built-in `/code-review`.
