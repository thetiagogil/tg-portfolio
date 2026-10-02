# Code

How the code is organised and written. Follow it for every new file and every edit, so the codebase keeps reading
as one hand. `npm run lint` and `npm run format` enforce what a tool can check (marked **lint**); the rest is on
whoever writes the code. Tiago's general defaults live in `~/.claude/CLAUDE.md`; this file is how they apply here.

---

## 1. Where things go

```
src/
  app/                    routes only: each file picks the language and hands over to a feature
    (en)/…                English at /
    (pt)/pt/…             Portuguese at /pt, the same paths
    og/[image]/           the link-preview images
  features/<page>/        one folder per page: the page, its sections (one file each), its helpers
    home/ projects/ records/ about/ link-previews/
    timeline/             timeline-page, timeline-items, timeline-filters, chart/, list/
  components/
    ui/                   generic pieces that know nothing about the content: Button, Icon, Dialog, Tabs, Facts…
    layout/               the site shell: RootShell, header and menu, footer, theme and language switches
    entries/              pieces that show content entries: ProjectCard, ProjectMedia, StatusMark, Pager, Part…
  content/                the data: one file per entry (English and Portuguese side by side), ui/en.ts and ui/pt.ts
  lib/                    plain functions shared by several places: constants, dates, i18n, entries (paths),
                          metadata, og, scale, motion, cn, image-loader
  styles/                 the little CSS left: tokens, base, links and icons, crop marks, motion
tests/
  unit/                   Vitest: dates, i18n, paths, the scale, the Timeline's filters, the content rules
  e2e/                    Playwright by area (a11y, site, pages, timeline), helpers.ts and playwright.config.ts
scripts/                  build scripts (images, icons) and the screenshot tool
```

- **Every file and folder name is kebab-case**, the way Next names its own files (`page.tsx`, `layout.tsx`):
  `site-header.tsx`, `use-timeline-view.ts`. What a file exports keeps its own case: `site-header.tsx` exports
  `SiteHeader`. One rule for everything, and no import that works on a Mac but breaks on the Linux build.
- **One job per file.** A file holds one component, one hook, or one subject's plain functions (`dates.ts`).
- **Files stay small:** about 150 lines for a component, 200 at most. Split before that.
- **A page is one main function** that lists its sections (`HomePage` renders `<Hero />`, `<SelectedWork />`,
  `<WorkHistory />`, `<Contact />`); each section is its own file beside it. Plain helper functions go in a
  `<feature>-utils.ts`. A big feature groups its files in sub-folders (`timeline/chart/`, `timeline/list/`).
- **A component used by one page lives in that page's folder.** It moves to `components/` when a second page needs
  it: `ui/` if it knows nothing about the content, `entries/` if it does, `layout/` if it's part of the shell.
- **Shared values** (site URL and name, image widths, the paper colour, preview size) live in
  `lib/constants.ts`, which the app, `next.config.ts` and the scripts all read. A value used by one file stays in
  that file.
- **Route files only route.** They wire `generateStaticParams`, `generateMetadata` and the page from the feature
  (`features/projects/project-route.ts`); the page finds its entry and calls `notFound()` itself.
- **Caches stay out of the root:** TypeScript's build info and Playwright's failure reports go to
  `node_modules/.cache/`. The root only shows what's edited, plus `out/` and `.next/` after a build (git-ignored).

## 2. A component, top to bottom

```tsx
"use client"; // only when it needs the browser (state, effects, events)

import { useEffect, useState } from "react"; // 1. packages
import { Tab, Tabs } from "@/components/ui/tabs"; // 2. the app, through "@/"
import type { Lang, Project } from "@/content/types";
import { getT } from "@/lib/i18n";
import { ProjectCards } from "./project-cards"; // 3. the same folder

type ProjectGridProps = {
  projects: Project[];
  lang: Lang;
};

const SIZES = "(min-width: 48rem) 45vw, 100vw"; // constants in UPPER_CASE, after the props type

export function ProjectGrid({ projects, lang }: ProjectGridProps) {
  const [filter, setFilter] = useState("all"); // 1. state and hooks

  const t = getT(lang); // 2. values worked out from them
  const shown = projects.filter(…);

  function select(type: string) {} // 3. handlers

  useEffect(() => {}, []); // 4. effects

  return (
    <>
      <Tabs label={t("projects.filterLabel")}>…</Tabs>

      <ProjectCards>…</ProjectCards>
    </>
  );
}
```

- **Imports** grouped (packages, `@/…`, `./…`) and sorted, no blank lines between groups. **lint**
- **Spacing:** each group above (state, derived values, handlers, effects, markup) separated by a blank line; a
  blank line before every `return` and after a group of declarations **lint**. In the markup, a blank line between
  major blocks.
- **Named exports**; a default export only where Next requires one (`page.tsx`, `layout.tsx`, the image loader).
- **Props** as `type <Component>Props`, above the component.
- **One exported component per file.** Small variants of the same thing may share it (`StackLine` and `StackRow`;
  `Tabs` and `Tab`; `Facts` and `Fact`). A private piece under 15 lines may sit below the main component.

## 3. Writing it

- **Functions are declarations:** `export function monthYear()`, `function close()`. Arrow functions are for
  callbacks and one-line helpers inside a function. **lint** for components.
- **No render helpers inside components** (`const row = () => <div>`): make a small component instead.
- **No nested ternaries** **lint**: early returns or a small helper (`showResultsLabel()`, `endLabel()`).
- **Types:** `type`, never `interface` **lint**; type-only imports use `type` **lint**. Content types come from
  `@/content/types`, tool types from `@/content/stack`.
- **Names say what things are:** `project`, `record`, `scale`, `filters`, `today`; not `p`, `r`, `sc`, `f`. Short
  names only for indexes (`i`), the translator (`t`) and tiny callbacks.
- **Text** always comes from `src/content`: entries for content, `t("key")` for interface text, with placeholders
  filled by `t("lightbox.counter", { n: 2, total: 4 })`.
- **Dates** only through `lib/dates.ts` (`monthYear`, `endLabel`, `duration`), in UTC. **Paths** through
  `lib/entries.ts` and `localize()`. **Links** through `SmartLink`, `Button` or `ArrowLink`, which pick between
  `next/link` and a plain link that opens a new tab.
- **Comments are rare.** Only what the code can't say: a reason, a rule from the design, a browser quirk. No
  comment that describes the markup below it or repeats a name.
- **Client code is the exception.** Pages render at build time; only the leaves that need the browser are client
  components (the header and menu, the theme switch, the project tabs, the Timeline list, the image viewer).

## 4. Styling

- **Tailwind in the markup** for everything: layout, spacing, colour, borders, states (`hover:`, `group-hover:`,
  `aria-pressed:`, `dark:`). The design tokens are Tailwind colours (`bg-paper`, `text-ink-2`, `border-line`,
  `bg-hover`), and CSS variables are used directly where needed (`px-(--row-pad)`, `h-(--header-h)`).
- **The design system's basics stay as a few classes** in `src/styles/base.css`: the type scale (`title`,
  `heading`, `subheading`, `lead`, `read`, `an`), the grid (`wrap`, `page-grid`) and the bands (`band`). They sit in
  the components layer, so a utility on the same element always wins (`subheading mt-3`).
- **CSS files only for what utilities express badly:** link underlines and the icons' hover nudge
  (`links-icons.css`), crop marks (`crop-marks.css`), the load-in motion and the chart's draw-in (`motion.css`).
- **Font sizes as arbitrary values** (`text-[15px]`, `text-[0.875rem]`), not `text-sm`: Tailwind's named sizes
  also change the line height.
- **Class names are literal strings.** Tailwind finds classes by reading the source, so never build one from a
  template (`` `px-[${x}]` ``). Conditional or overridable classes go through `cn()`, which also resolves clashes
  (`cn("text-ink-2", ongoing && "text-accent")`: the later one wins).
- **Inline `style` only for values computed in code:** chart positions (`left: pct(pos)`) and CSS variables
  (`delay(220)`, `--brand`, `--bar-delay`).
- Dark mode is a Tailwind variant (`dark:`) that follows the system unless the visitor picked a theme.
- **Class order is automatic:** Prettier sorts classes on save and on `npm run format`, inside `cn()` too. Don't
  order them by hand.
- **Classes in their standard spelling:** write what Tailwind calls canonical (`backdrop-blur-md`, not
  `backdrop-blur-[12px]`; `calc(a+b)`, not `calc(a_+_b)`), each class once **lint**. ESLint fixes both on save and
  with `npm run lint -- --fix`; it doesn't see class strings kept in constants, so check those by hand.

## 5. Tests

- **Unit tests** (Vitest, `tests/unit/`) for logic: dates, i18n, paths, the scale, the Timeline's filters, and
  `content.test.ts`, which checks every entry against `docs/CONTENT.md`. Name tests by behaviour ("lists newest
  first, or oldest first").
- **End-to-end** (Playwright, `tests/e2e/`, against the built site, desktop and phone):
  - `a11y.spec.ts`: axe on every page type in both languages, and with each dialog open;
  - `site.spec.ts`: the shell (language, theme, menu, 404, focus rings, links that resolve);
  - `pages.spec.ts`: Home, Projects, a project, a role;
  - `timeline.spec.ts`: the chart, tabs, search, sort, filters and the URL.
- Find elements the way a visitor would: by role and name (`getByRole("button", { name: "Filters" })`), by
  heading, or by link target. Never by a styling class.

## 6. Before calling something done

`npm run verify`: typecheck, lint, format check, unit tests, build, end-to-end. For anything visible, compare the
page with the study (`/compare-study`) and share a screenshot.
