# Plan: thetiagogil.com

The portfolio was rebuilt from the Direction Study (`docs/study/`) on the `rebuild` branch: new scaffold, fresh
install, new structure, content rebuilt into a new model. This file tracks what's done and what's left before launch.
Nothing is pushed, merged or deployed without the owner's go-ahead.

## Status

| Phase | Status |
| --- | --- |
| 0. Context and tools | Done (2026-10-01): `CLAUDE.md`, `docs/`, agents and skills in `.claude/` |
| 1. Scaffold | Done (2026-10-01): Next.js 16.3, React 19.2, Tailwind 4.3, Vitest 5, Playwright 1.63 (installed Chrome) |
| 2. Content model and migration | Done (2026-10-01): 23 entries and the profile, one file each; stack trimmed with no overlap |
| 3. Foundation | Done (2026-10-01): tokens, type, grid, bands, motion; `/` and `/pt` layouts; header, menu, footer, theme and language switches; 404; image loader |
| 4. Pages | Done (2026-10-01): Home, Projects, 14 project pages with the image viewer, About, 6 role and degree pages, both languages |
| 5. Timeline | Done (2026-10-01): chart, list, tabs, search (`/`), sort, filters dialog; the view lives in the URL |
| 6. Polish | Done (2026-10-01): sitemap, robots, favicon, link previews, analytics (needs the token), accessibility audit fixed, Lighthouse 94–98 / 100 / 100 / 100 |
| Cleanup | Done (2026-10-01): folders by role, CSS next to its components, the house style in `docs/CODE.md` (lint enforces part of it), dead code, CSS and interface text removed, tests reorganised by area |
| 7. Review and launch | Not started |

## Decisions

| Topic | Decision |
| --- | --- |
| Framework | Next.js (App Router), **static export**: real HTML for every page, no server |
| Styling | Tailwind 4 with the study's tokens; the study's component CSS kept as classes, next to each component |
| UI library | **None.** Small components of our own; the native `<dialog>` for the menu, the filters and the image viewer |
| Languages | English at `/`, Portuguese at `/pt/...`, same paths; the switch goes to the same page in the other language |
| URLs | Role and degree pages at `/experience/<slug>` and `/education/<slug>` |
| Hosting | **Cloudflare only** (Workers static assets); the domain **thetiagogil.com** stays on Cloudflare. Vercel: the owner will check later |
| Analytics | Cloudflare Web Analytics (free, no cookies, no banner), on when `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` is set |
| Extras | A 404 page, the full-screen image viewer, analytics; no printable CV page |
| Repo | Private. Work on `rebuild` (from `main`); the redesign snapshot is commit `e676ff7` on `redesign` |
| Commits | Title line only. No body, no co-author lines |

## Phase 7: Review and launch

1. **Reviews:** design-reviewer (every page against the study), qa-runner (all checks), a11y-auditor (final pass).
2. **Content evaluation with the owner**, in both languages, including:
   - real alt text for the project screenshots (at least the first of each project);
   - the open questions in `docs/DECISIONS.md` (em dashes, the PT Aquasis "ecrã" → "ecrãs").
3. **Cloudflare:** Workers static-assets config, a preview deploy for the owner to review; the analytics token.
4. **With the owner's go-ahead:** merge to `main`, deploy to thetiagogil.com, tidy old branches.

## How work is checked

`npm run verify` (typecheck, lint, format, unit tests, build, end-to-end and accessibility) and, for anything
visible, the page compared with the study at desktop and phone, light and dark, in both languages.
