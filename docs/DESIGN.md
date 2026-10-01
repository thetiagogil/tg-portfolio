# Design system

The current design of thetiagogil.com. The visual reference is the study in `docs/study/` (open
`docs/study/index.html`, or run the `study` preview in `.claude/launch.json`). When this file and the study disagree,
the study wins; fix this file. Why each choice was made is in `docs/DECISIONS.md`.

**In one line:** a frontend developer's portfolio with an architect's precision. Warm paper and graphite ink,
one vermilion accent, sections as full-width bands, lists as ruled tables, motion once. Quick to take in.

---

## 1. Rules

1. **Quick to take in.** Few sections, short entries, one idea per section, nothing said twice. When in doubt, leave
   it to the detail page.
2. **Architecture you can read without a legend.** Keep a drawing convention only if a visitor gets it without
   knowing drawing conventions (a duration line, hatching for what isn't built, a break line in the chart). No sheet
   codes, numbering, figure captions or grid bubbles.
3. **Every section is a band.** Top-level sections run the full width and alternate two paper tones. The page's own
   header (or the Home hero) is the first, lighter band; the footer is always graphite.
4. **A band opens with its heading.** Heading on the left, an action on the right when there is one ("All
   projects", "Full timeline"). No labels above headings (except breadcrumbs and page eyebrows).
5. **Lines only for tables.** Hairlines separate the rows of a list. On project and role pages, whose parts share one
   band, an ink rule separates the parts. Lines stay at the content width; they never run to the screen edge and
   never close into boxes. Nothing else draws a line.
6. **Mono capitals only for data.** Geist Mono small capitals for dates, years, durations, counts, statuses and short
   labels. Links, buttons, stacks, chips and sentences use Geist.
7. **Marks mean something.** Dimension lines only where they measure. Line types only for status. Hatching only for
   what isn't built. Crop marks only as the sign that an image opens (hover or focus).
8. **Only the exceptions are labelled.** Lists show *In progress* and *Planned*; finished work has no status. The
   project page shows every status.
9. **Motion once.** The headline rises on load, the chart's bars draw the first time they're seen, sections fade in
   (opacity only). Hovered arrows nudge the way they point. Reduced motion turns all of it off.
10. **Large text only for short intros.** The `lead` size is for 2–3 lines (hero, page intros, project briefs,
    section intros). Anything longer uses the `read` style.

## 2. Tokens

Colours are OKLCH. Dark mode is designed, not inverted.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--paper` | `oklch(0.974 0.004 85)` | `oklch(0.175 0.008 262)` | Page, odd bands |
| `--band` | `oklch(0.945 0.006 85)` | `oklch(0.21 0.009 262)` | Even bands |
| `--paper-2` | `oklch(0.952 0.005 85)` | `oklch(0.205 0.009 262)` | Image placeholders |
| `--paper-3` | `oklch(0.925 0.006 85)` | `oklch(0.24 0.01 262)` | Deeper fills |
| `--ink` | `oklch(0.2 0.012 262)` | `oklch(0.95 0.005 85)` | Text, ink rules |
| `--ink-2` | `oklch(0.41 0.012 262)` | `oklch(0.78 0.008 85)` | Secondary text |
| `--ink-3` | `oklch(0.52 0.01 262)` | `oklch(0.64 0.008 85)` | Labels, faint text (passes AA on both bands: 4.7:1 min) |
| `--line` | ink at 13% | ink at 12% | Hairlines |
| `--line-2` | ink at 26% | ink at 24% | Stronger lines, chip and outline borders |
| `--accent` | `oklch(0.56 0.19 33)` | `oklch(0.7 0.17 40)` | Vermilion: running now, focus, hover, selected tab |
| `--accent-ink` | `oklch(0.52 0.18 33)` | `oklch(0.74 0.15 42)` | Accent as text (AA) |
| `--on-accent` | `oklch(0.985 0.003 85)` | `oklch(0.175 0.008 262)` | Text on accent |
| `--bg` | the band's colour | | Anything that knocks out a line behind it paints `--bg`, never `--paper` |
| `--hover` | ink at 4% over transparent | | Hover washes, so they work on every band |

- **Footer:** graphite in both themes. It scopes the dark tokens; in dark mode its paper is deeper than the page
  (`oklch(0.2 0.012 262)` light-theme footer, `oklch(0.135 0.008 262)` dark-theme footer).
- **Selection:** accent background, `--on-accent` text. **Focus:** 2px accent outline, 3px offset.
- **Easing:** `--settle: cubic-bezier(0.22, 1, 0.36, 1)` for most moves; `--drawing: cubic-bezier(0.65, 0, 0.35, 1)`
  for bars drawing.

## 3. Type

Geist for everything, Geist Mono for data. Headings weight 500, tight tracking, `text-wrap: balance`; paragraphs
`text-wrap: pretty`. Base 16px, line height 1.6.

| Style | Size | Line height | Tracking | Use |
| --- | --- | --- | --- | --- |
| `display` | clamp(2.75rem → 6.5rem) | .94 | -.048em | Home headline |
| `title` | clamp(2.5rem → 5.25rem) | .96 | -.045em | Page titles |
| `heading` | clamp(1.875rem → 3.25rem) | 1.02 | -.04em | Section headings, years |
| `subheading` | clamp(1.25rem → 1.75rem) | 1.15 | -.025em | Card and item titles |
| `lead` | clamp(1.125rem → 1.375rem) | 1.5 | -.012em | Short intros only (2–3 lines) |
| `read` | 17px, 18px from 48rem | 1.65 | -.005em | Long paragraphs (overviews, the bio); max 34em (~70 characters) |
| body | 16px | 1.6 | | Default |
| small | 15px | | | Summaries |
| `an` (mono label) | 11px, uppercase | 1.35 | .08em | Data and labels only |

The fluid sizes scale with the viewport (the study measured them against its frame with `cqi`). Text widths use `em`,
not `ch`: in Geist `ch` is the wide "0", so 58ch is ~80 characters.

## 4. Layout

- **Breakpoints** (Tailwind's defaults): `sm` 40rem, `md` 48rem, `lg` 64rem.
- **Grid:** 4 columns on phones, 8 from `md`, 12 from `lg`. Gap 1.5rem. Container max 90rem; side gutter
  `clamp(1.25rem, 4vw, 3rem)`.
- **Header:** 4rem tall, sticky. Sections jumped to keep clear of it (`scroll-margin-top`).
- **Bands:** padding 72 / 96 / 112px (phone / tablet / desktop), top and bottom. Alternation is by position (even
  bands use `--band`). The first band of a page has no top padding (the page header brings its own).
- **Page start:** the first label (eyebrow or breadcrumb) sits 56 / 72 / 80px under the header; the title 24px below
  it. Home's hero: 28px for the larger headline.
- **Section heading → content:** 48 / 64px.
- **Parts** (project and role pages): an ink rule, the part's name in mono on the left (columns 1–3), content from
  column 4. Long content (stack row, Scope) uses columns 4–12.
- **List rows are padded, not hung:** `--row-pad` 12px (16px from `md`). Lines and hover plates stay flush with the
  column; row content gets the padding, like table cells. Anything that must line up with a row (year labels, chart
  lines, timeline markers) takes the same padding.
- **Spacing scale:** 4 / 8. Link lists are 28px rows, 8px apart. Small optical offsets (2, 3, 6px) are allowed for
  aligning labels to headings.

## 5. Components

| Component | Spec |
| --- | --- |
| **Button** | 48px tall (36 small), 12×20 padding, 15px medium. Solid: ink → accent on hover. Outline: 1px `--line-2` → ink on hover. Long labels wrap instead of overflowing. Icon after the label. |
| **Link** (`lk`) | Underline 1px `--line-2`, an ink underline grows across on hover, text turns `--accent-ink`. |
| **Text link with arrow** | Medium weight, 14px icon after the text. |
| **Arrow icons** | 24-unit box, 1.5 stroke, square caps. On hover of their link or button, the arrow nudges ~2px the way it points (→ right, ← left, ↓ down, ↗ up-right, ↑ up; download: the arrow drops, the tray stays). Only the arrow moves; the box stays, so text never shifts. |
| **Chip** | 28px, 10px padding, 13px, 1px `--line-2` inset border, `--ink-2`. |
| **Stack line** | Tools separated by small dots, 13–15px, `--ink-2` (Timeline entries, products). |
| **Stack row** | On entry pages under the brief or overview: mono "STACK" label then chips, one line in columns 4–12. |
| **Status mark** | Small square glyph + mono label. Solid = completed, hatched = in progress (accent), dashed = planned. |
| **Card** (projects) | Image (crop marks on hover), meta line "2025 · Personal · In progress" (status only when unfinished), title (turns accent on hover; the whole card is the link), subtitle. |
| **Tabs** | Text tabs with counts; the selected tab is ink with an accent count and an underline. Scroll sideways on phones. |
| **Pager** (Previous / Next) | A band with no padding; each link fills its half edge to edge, 56px top and bottom (40 on phones). Only a divider between the halves (a line between them when stacked). No hover plate: the title turns accent and the arrow nudges. Text aligns with the content edge plus `--row-pad`. Only "Next": full width, right-aligned. |
| **Filters modal** | Native `<dialog>`, 640px centred (a bottom sheet under 40rem). Head: title + close. Body: Current only → Project type → Stack (one section with four quieter sub-labels). Options are a checklist in equal columns (3, or 2 under 40rem): a square box that fills ink with a check. Options that would give no results are faded (35%) and disabled. Foot: Clear filters + "Show N results" / "No results". The modal edits a draft; only the button applies it. |
| **Lightbox** | Native `<dialog>`, full screen on paper (not a black overlay): a header row with the project's title and a mono counter ("3 of 7") and a close button; the image fitted (contain); a footer row with previous / next arrows. Keyboard arrows, Escape, swipe on touch, click outside the image to close. Opens from the hero image and every figure (crop marks on hover). |
| **Footer** | Graphite band: name and one line; the index; contact (email, GitHub, LinkedIn, CV); then "© 2026 Tiago Gil · Last updated <build date>" and Back to top. |

## 6. Pages

| Page | Bands |
| --- | --- |
| **Home** | Hero (headline "Frontend developer" + lighter "& architect.", intro, two buttons, portrait 4:5 on the right) · Selected work (three cards, "All projects (14)") · Where I've worked (rows: dates + duration, role, company, a time track with year labels) · Let's talk (one sentence, the email large with Copy, then GitHub, LinkedIn, CV) |
| **Projects** | Title and intro · Tabs All / Client / Personal / Learning with a one-line hint, cards newest first |
| **Project** | Breadcrumb, title, subtitle, links (Visit site, Source code), four facts (Started, Status, Type, Context), main image · Brief (lead) with the stack row, Collection, Figures (open in the lightbox) · Pager |
| **Timeline** | Title, intro and the chart · Sticky toolbar (category tabs with counts, search with `/`, Filters, sort) and the list · |
| **About** | Intro: title "Hi, I'm Tiago.", intro line, portrait, bio (`read`), four facts (Based in, Currently, Degree, Frontend since) · How I got into frontend (four chapters as rows, Full timeline link) · How I work (four columns with thin vertical lines between them, no horizontal rules; 2 × 2 on tablets, stacked on phones) · What I work with (12 tools, 3 rows of 4, monochrome icon + name; brand colour on hover) |
| **Role / degree** | Breadcrumb (Timeline / Experience or Education), title, organisation as a link with ↗ (plus documents with ↓), duration line on the right · Overview (`read`) with the stack row, Scope (four titled points, two columns), Products or Highlights (one column), Projects from this period (cards) · Pager |
| **404** | To design in the same language: title, one line, a link home. |

**The Timeline in detail:**
- **Chart:** two eras on top (Architecture 2014–2023, Software 2023–today) as dimension lines; a break line removes
  2015–2021; one row per role or degree (short labels, ULisboa on phones), then Projects and Certifications as rows of
  markers; year labels, Transition and Today below; a legend. Education bars are outlined; the running role is accent.
- **List:** grouped by year (large year + a datum line with the count). One continuous vertical line runs through
  every entry and year marker. Each entry: date range on one line when it fits, duration below; glyph on the line;
  title, organisation, summary, stack line; status on the right; arrow when it opens a page.

## 7. Icons and images

- Tool logos: Simple Icons (CC0), monochrome in ink, brand colour on hover (near-black brands keep ink). TanStack's
  icon must come from Simple Icons 16+ (older ones draw React Query's atom).
- Line icons (arrows, How I work): 24-unit box, 1.5 stroke, square caps, `currentColor`.
- Images: pre-generated sizes (the `sharp` script). Crop marks only on images that open. Projects with no images show
  a hatched placeholder ("In planning" / "No screenshots yet").
