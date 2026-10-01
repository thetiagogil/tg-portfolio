# Code

How the code is organised and written. Follow it for every new file and every edit, so the codebase keeps reading
as one hand. `npm run lint` and `npm run format` enforce what a tool can check (marked **lint**); the rest is on
whoever writes the code.

---

## 1. Where things go

```
src/
  app/                    routes only: thin files that pick the language, load the entry and set the metadata
    (en)/…                English at /
    (pt)/pt/…             Portuguese at /pt, the same paths
  features/<page>/        one folder per page: the page component, its private parts, its CSS, its logic
    home/ projects/ records/ about/ timeline/
  components/
    ui/                   generic pieces with no knowledge of the content: Button, Icon, Dialog, Band, heads, links
    layout/               the site shell: RootShell, header and menu, footer, theme and language switches
    entries/              pieces that show content entries: ProjectCard, ProjectMedia, StatusMark, Pager, Part,
                          Lightbox, Dim, Glyph, Stack
  content/                the data: one file per entry (English and Portuguese side by side), ui/en.ts and ui/pt.ts
  lib/                    plain functions shared by several places: dates, i18n, entries (paths), metadata, og,
                          scale, motion, image-loader, cn
  styles/                 tokens.css and base.css only (type, grid, bands, motion)
e2e/                      Playwright tests, one file per area, plus helpers.ts
scripts/                  build scripts (images, icons) and the screenshot tool
```

- **A component used by one page lives in that page's folder.** It moves to `components/` only when a second page
  needs it: `ui/` if it knows nothing about the content, `entries/` if it does, `layout/` if it's part of the shell.
- **Logic used by one page** lives in that page's folder too (`features/timeline/filters.ts`). It moves to `lib/`
  when shared.
- **CSS sits next to what it styles:** `components/ui/ui.css`, `features/timeline/timeline.css`, and so on, all
  imported once in `app/globals.css` in this order: tokens, base, ui, layout, entries, then the pages.
- **Tests sit next to the code** they test (`dates.test.ts` beside `dates.ts`); end-to-end tests in `e2e/`.

## 2. A file, top to bottom

```tsx
"use client"; // only when the component needs the browser (state, effects, events)

import Link from "next/link"; // 1. packages
import { Band } from "@/components/ui/Band"; // 2. the app, through "@/"
import type { Lang } from "@/content/types";
import { getT } from "@/lib/i18n";
import { ProjectGrid } from "./ProjectGrid"; // 3. the same folder

// The props type, named after the component.
type ProjectsPageProps = {
  lang: Lang;
};

const SIZES = "(min-width: 48rem) 45vw, 100vw"; // module constants in UPPER_CASE

/** One line on what it is, only when the name doesn't already say it. */
export function ProjectsPage({ lang }: ProjectsPageProps) {
  const t = getT(lang); // 1. text, 2. derived data, 3. handlers, then the markup
  return <Band>…</Band>;
}

// Private parts below the export, in the order they appear on the page.
function Section() {}
```

- **Imports** are grouped (packages, `@/…`, `./…`) and sorted, with no blank lines between groups. **lint**
- **One exported component per file**, named like the file. Small variants of the same thing may share a file
  (`StackLine` and `StackRow` in `Stack.tsx`; `Lightbox` and `LightboxTrigger`).
- **Pages are composed of named sections:** `HomePage` renders `<Hero />`, `<SelectedWork />`,
  `<WorkHistory />`, `<Contact />`, each a function below it. A section longer than about 80 lines, or used by
  another page, gets its own file.

## 3. Writing it

- **Functions are declarations:** `export function monthYear()`, `function Hero()`. Arrow functions are for
  callbacks and one-line helpers inside a function. **lint** for components.
- **No render helpers inside components.** A piece of markup used twice becomes a small component below
  (`<Spec label>`, `<Option>`), not a `const part = (…) => <div>` inside the parent.
- **Types:** `type`, never `interface` **lint**; props as `type <Component>Props`; type-only imports use
  `type` **lint**. Shared content types come from `@/content/types`; tool types from `@/content/stack`.
- **Names say what things are:** `project`, `record`, `scale`, `filters`, `today`; not `p`, `r`, `sc`, `f`, `now`
  for a build date. Short names only for indexes (`i`), the translator (`t`) and tiny callbacks (`(a, b) =>`).
- **No nested ternaries** **lint**: use early returns or a small helper (`showLabel()`, `endLabel()`).
- **Text** always comes from `src/content`: entries for content, `t("key")` for interface text. Placeholders are
  filled by `t`: `t("lightbox.counter", { n: 2, total: 4 })`. Never hard-code copy in a component.
- **Dates** only through `lib/dates.ts` (`monthYear`, `endLabel`, `duration`); everything in UTC.
- **Links:** `SmartLink` (or `Button` / `ArrowLink`) decides between `next/link` and a plain link that opens in a
  new tab. Paths come from `lib/entries.ts` (`projectHref`, `recordHref`) and `localize()`.
- **Comments** explain why, not what: a decision, a browser quirk, a rule from the design. No comments that repeat
  the code, and no history ("ported from…", "was…").
- **Client code is the exception.** Pages render at build time; only the leaves that need the browser are client
  components (the menu, the theme switch, the Timeline list, the project tabs, the image viewer).

## 4. Styling

- **Classes from the CSS files** for anything with real detail (the study's components); **Tailwind utilities**
  for one-off layout: grid spans (`col-span-full md:col-span-5`), spacing (`mt-8`), and colour tokens
  (`text-ink-3`).
- **Inline `style` only for values computed in code:** chart positions (`left: pct(pos)`) and CSS variables
  (`delay(220)`, `--brand`). A fixed value is a class.
- Conditional classes with `cn()`: `cn("tool-btn", applied > 0 && "on")`.
- New classes: kebab-case, prefixed by their block (`.pager`, `.pager-band`), in the CSS file of the folder that
  owns the component, inside `@layer components`.
- Never reuse a Tailwind utility's name as a component class (`block`, `outline` once broke the layout).

## 5. Tests

- **Unit tests** (Vitest) for logic: dates, i18n, paths, the scale, the Timeline's filters, and
  `content.test.ts`, which checks every entry against `docs/CONTENT.md`. Name tests by behaviour ("lists newest
  first, or oldest first").
- **End-to-end** (Playwright, against the built site, desktop and phone):
  - `a11y.spec.ts`: axe on every page type in both languages, and with each dialog open;
  - `site.spec.ts`: the shell (language, theme, menu, 404, focus rings, links that resolve);
  - `pages.spec.ts`: Home, Projects, a project, a role;
  - `timeline.spec.ts`: the chart, tabs, search, sort, filters and the URL.
- Select by role and name (`getByRole("button", { name: "Filters" })`); fall back to a class only for things
  with no role (`.entry`, `.card`).

## 6. Before calling something done

`npm run verify`: typecheck, lint, format check, unit tests, build, end-to-end. For anything visible, compare the
page with the study (`/compare-study`) and share a screenshot.
