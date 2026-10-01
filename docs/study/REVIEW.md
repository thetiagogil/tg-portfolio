# Portfolio study: whole-app review (2026-09-29)

A review of every page in `index.html` after the simplification pass: Home, Projects, the 14 project pages, the
Timeline, About and the 6 role and degree pages, at desktop (1280) and phone (390), light and dark, English and
Portuguese (192 rendered states). Checks: automated passes over every state (overflow, clipped text, broken images,
dead links, keyboard reach, duplicate ids, tap targets), measured spacing, contrast of every text colour on every
band, a code audit of the spacing and type values, and a visual pass over 16 full-page captures and close-up crops.
Unlike the Voydex review, clear problems were fixed on the spot; what's left is listed at the end.

---

## The short version

**What works.** The structure holds on every page and frame: every band keeps the same padding (112 desktop, 96
tablet, 72 phone), every section heading sits the same distance above its content (64, or 48 on phones), nothing
overflows, no text is clipped, no image is broken, and every text colour passes WCAG AA on every band (the tightest
pair, the lightest grey on the deeper band, is 4.7:1).

**What was broken (now fixed).** Links that did nothing (the CV everywhere, the thesis, certification markers), file
links that pointed nowhere in the study, no keyboard access to internal links, a copy button that didn't copy,
Portuguese dates rendered as numbers, one button wider than the phone, and a few spacing values that differed from
page to page.

**One bug is in the React app too.** Portuguese month-and-year dates: `pt-PT` formats a short month with a year as
"01/2025". The study is fixed; the code needs the same fix when this is ported (see "Still open").

---

## 1. Fixed

### Didn't work
- **Dead links.** *Download CV* (hero, Let's talk and the footer, so on every page), *Read the thesis (PDF)* on
  About, and the three certification markers on the Timeline chart did nothing. They now open the CV, the thesis and
  the course pages.
- **File links that pointed nowhere.** The thesis and the Ironhack certificate on the degree pages used site paths
  (`/education/faul/thesis.pdf`) that don't exist in the study. The PDFs are now copied into `assets/` and site paths
  resolve there.
- **No keyboard access.** None of the ~200 internal links (nav, cards, rows, breadcrumbs, pagers) could be reached
  with Tab, because the study's links had no address. All can now, and Enter opens them.
- **Copy email** did nothing. It copies the address and says *Copied* / *Copiado* for two seconds.
- **The header's Contact and the email links** did nothing in the study (email links are held back so a review doesn't
  open the mail app). They now show a short note: "On the live site this opens your email app."
- **Portuguese dates** read "01 2025", "fev" was "02", and the footer said "29/09/2026". They now read "jan 2025" and
  "29 set 2026" (month and year are formatted separately).
- **Overflow.** On a phone in Portuguese, the thesis's second button ("Faculdade de Arquitetura, Universidade de
  Lisboa") was 35px wider than the screen. Buttons now wrap a long label onto a second line.
- **"See selected work"** could land with the heading under the sticky header. Sections now stop clear of it.

### Spacing
- **Where a page starts.** Projects, Timeline and About began 112px under the header, Home 80, project and role pages
  56. All begin at 80 now (72 on tablets, 56 on phones).
- **Label to title.** The breadcrumb sat 64px above a project's or role's title while "PROJECTS", "TIMELINE" and
  "ABOUT" sit 24px above theirs. The breadcrumb now works like those labels: 24px.
- **Heading to content.** On phones the featured cards sat 56px under their heading, every other section 48. Now 48.
- **Footer and link lists.** Rows differed by 2 to 3px depending on the link type (plain, with an arrow). Every row
  is now 28px, 8px apart, so the Index and Contact columns line up row for row.
- **Off-scale values.** 36px under the hero's text and two 10px gaps moved to 32 and 8, so spacing sits on a 4/8
  scale. The small offsets left (2, 3, 6px) are optical alignments of labels to headings.
- **Toolbox on phones** listed one tool per line (about 45 lines). It now uses two columns.
- **Room around the hover** (owner's note). Hover plates were exactly as wide as the text, so a hovered row's first
  letters and its arrow touched the plate's edges (Where I've worked, Education, the Timeline's chart and list,
  products, the collection, Previous / Next). A first fix let the rows hang past the column; the owner found the
  hovered rows misaligned with the headings. Final: plates and row lines stay flush with the column (aligned with the
  heading's left edge and the action's right edge) and the row content is padded 16px (12 on phones), like cells in
  a table. Applied to every ruled list, hover or not. The Home year labels, the chart's year lines and the timeline's
  year markers follow the same padding, so they still line up (measured: 0px off).

---

## 2. Measured and fine

| Check | Result |
| --- | --- |
| Band padding | 112 / 96 / 72, top and bottom, on every band of every page |
| Section heading → content | 64 / 48 (the thesis's text follows its intro at 20, on purpose) |
| Page start → first label, label → title | 80 / 72 / 56, then 24 (Home's hero: 28, for the larger headline) |
| Overflow, clipped text, broken images, duplicate ids | None in 192 states |
| Contrast (WCAG AA 4.5:1) | All pass. Lowest: grey labels on the deeper band, 4.7:1 |
| Hover plates | Flush with the column; 16px of room left and right of the text (12 on phones), 24 to 40px above and below |
| Tap targets (phone) | Buttons 48px; text links 26 to 28px (above the 24px AA minimum); card titles cover the whole card |

---

## 3. Still open

### For the React app (when porting)
- **Portuguese dates** (`src/features/portfolio/lib/portfolio-dates.ts`): `formatMonthYear` and
  `formatMonthYearCompact` format a short month with a year in `pt-PT`, which gives "01/2025" and "01 2025". Format
  the month on its own (`{ month: "short" }`) and add the UTC year.
- **`getYearDateParts`** uses `getFullYear()` (local time) on UTC dates; the rest of the file uses UTC.
- **Project screenshots** have empty `alt` text in the study; the site should describe at least each project's first
  image.
- **Type sizes** mix px and rem for the same values (15px and .9375rem, 14px and .875rem); map them to one scale.

### Small, needs a call
- **Tabs that scroll sideways on phones** (project types, timeline categories) show no hint that more is off-screen,
  like the timeline chart. A fade at the right edge would signal it.

### Study-only behaviour (not for the site)
- Internal links use `#screen:...` addresses so they can be focused; email links show a note instead of opening mail.

---

## 4. Decisions for the owner

1. **Method on About.** It left Home to keep Home to four sections. Right place?
2. **The two switches.** Image marks and Motion: keep the proposals (On, Calm)?
3. **Em dashes.** Three strings per language still use one: the hero's intro, the About thesis line and the home
   link's screen-reader label. Rewrite them?
4. **Sideways scrolling on phones.** Add a hint to the timeline chart and the tab rows, or leave them?
