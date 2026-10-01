# Portfolio redesign: decisions and plan

Living record of the portfolio redesign that started on 2026-09-28. Newest decisions are added to the log at the
bottom; the sections above always reflect the current state. The visual reference is `index.html` in this folder
(open it in Chrome; it works straight from the folder).

---

## 1. Where we are

- **Direction: the drawing set, simplified.** The portfolio of an architect who builds interfaces. Architectural
  where a convention reads on its own, plain wherever it could confuse, and quick to take in at a glance.
- **Sections are bands**: every top-level section is a full-width band, alternating paper and a deeper paper; the
  footer closes every page in graphite. Inside a band: a heading, then content on a 12-column grid, tables where
  there are lists (the structure of the Timeline and of "Where I've worked", the two parts the owner likes most).
- **Owner feedback so far.** 2026-09-28: likes the concept, but it's *a bit distracting*. 2026-09-29, in order: one
  version with few adjustments, not so architectural that it confuses; sections felt lost; loved the Timeline's
  chart and "Where I've worked"; still hard to identify sections ("maybe bg color differences"); then "a bit too
  complex and hard to quickly analyze".
- **Mockups first.** The direction is settled in this study before the code changes again, the same way as the
  Voydex study. The first build of the concept is on the `redesign` branch of `~/Documents/Dev/Tiago/tg-portfolio`
  (not committed); it still has everything this version removes.
- **Earlier attempts are archived.** The old site (`main`, the "Cardex" portfolio) and the Claude Design workspace
  (`~/Documents/Dev/Tiago/TG Portfolio`) are references only; don't follow their rules.
- **Content is real.** `data/content.js` is exported from the repo's `src/content` (projects, roles, degrees,
  certifications, profile, EN and PT dictionaries) by `tools/export-content.mjs`. Re-run it when the content changes;
  don't edit the data file by hand.

## 2. The rules

The Voydex study's "once real content carries a page, the metaphor around it steps back" is the idea behind all of
them.

1. **Quick to take in.** A visitor should get each page in a few seconds: few sections, short entries, one idea per
   section, nothing said twice. When in doubt, leave it to the detail page.
2. **Architecture you can read without a legend.** A convention stays only if a visitor gets it without knowing
   drawing conventions: a timeline drawn like a section, a line that measures how long a role lasted, hatching for
   what isn't built. Anything that needs decoding goes (sheet codes, numbering, figure captions, usage dots, lettered
   grid bubbles).
3. **Every section is a band.** Top-level sections run the full width and alternate two paper tones, so you always
   know which section you're in and where it ends. The page's own header (or the Home hero) is always the first,
   lighter band; the footer is always graphite.
4. **A band opens with its heading.** The heading on the left, an action on the right when there is one ("All
   projects", "Full timeline"). No labels above headings, except where the heading needs context (the thesis).
5. **Lines only for tables.** Hairlines separate the rows of a list (roles, chapters, courses, tool groups). On
   project and role pages, whose parts share one band, an ink rule separates the parts. Nothing else draws a line.
   List rows keep their lines and hover plates flush with the column and pad their content 16px (12 on phones), like
   table cells, so a hovered row's plate never touches its text or arrow.
6. **Mono capitals only for data.** Geist Mono small capitals for dates, years, durations, counts, statuses and
   short category names. Links, buttons, tech stacks, chips and sentences use Geist.
7. **Marks mean something.** Dimension lines only where they measure. Line types only for status. Hatching only for
   what isn't built. Crop marks only as the sign that an image opens, on hover or focus.
8. **Only the exceptions are labelled.** Lists show *In progress* and *Planned*; finished work carries no status.
   The project page shows every status.
9. **Motion once.** The headline rises on load, the timeline's bars draw the first time you see them, sections fade in
   (opacity only). Nothing draws itself or slides. Reduced motion turns it all off.

**Visual language.** Warm paper and graphite ink, dark mode designed rather than inverted. One accent, vermilion
(the red of an architect's markup pen), for what's running now, focus, hover and the selected tab. Geist for
everything, Geist Mono for data. Medium-weight headings, tight tracking.

| Tone | Light | Dark |
| --- | --- | --- |
| Paper (odd bands) | `oklch(0.974 0.004 85)` | `oklch(0.175 0.008 262)` |
| Band (even bands) | `oklch(0.945 0.006 85)` | `oklch(0.21 0.009 262)` |
| Footer (graphite) | `oklch(0.2 0.012 262)` | `oklch(0.135 0.008 262)` |

## 3. The version

**Bands, page by page** (paper · band · paper ... · graphite footer):

| Page | Bands |
| --- | --- |
| Home | Hero · Selected work · Where I've worked · Let's talk |
| About | Intro (title, portrait, bio) · Story (with a Full timeline link) · Method · Master's thesis · Toolbox |
| Projects | Title and intro · Type tabs and the grid |
| Timeline | Title, intro and the chart · Tabs, search, filters and the list |
| Project | Title, four facts and the main image · Brief, collection, figures · Previous and next |
| Role or degree | Title and duration · Overview, scope, products, projects, stack · Previous and next |

**Inside the bands:**

| Section | Content |
| --- | --- |
| Hero | One group centred against a larger portrait (text in columns 1 to 7, portrait 9 to 12): the headline, a two-sentence intro, two buttons. No eyebrow, no facts row (the intro says where, what with and for whom) |
| Selected work | Three cards: image, year and type (plus status if unfinished), title, subtitle |
| Where I've worked | Rows with dates, role, company and the time track, unchanged |
| Let's talk | One sentence, the email address large with *Copy email*, then GitHub, LinkedIn and CV in one line |
| Story, Education | Rows with years or dates on the left, unchanged |
| How I work (About) | Four principles in four open columns (two on tablets, one on phones): Design, Structure, Accessibility, Longevity. Each is a line icon (ink; accent on hover) beside a larger title with one sentence below; no lines |
| Master's thesis | Small "Master's thesis" above the question, the abstract, then the buttons |
| What I work with | Twelve tools in the owner's order, three rows of four (two columns on phones): React, Next.js, TypeScript, JavaScript / Material UI, Tailwind CSS, shadcn/ui, Bootstrap / TanStack Query, Supabase, Vercel, PostgreSQL. Framed monochrome icon and name, no years; the icon takes its brand colour on hover |
| Project and role parts | Ink rule between parts, the part's name on the left, content from column 4 |
| Footer | Name and one line, the index, contact (with the email), then "© 2026 · Last updated" and *Back to top* |

| Convention | Where it stays |
| --- | --- |
| Crop marks | Around images that open, on hover or focus |
| Dimension lines | "Where I've worked", the timeline's two eras, a role's or degree's duration |
| Line types for status | Solid = completed, hatched = in progress, dashed = planned |
| Hatching | Projects with no images yet |
| Timeline chart | Break line (2015 to 2021 left out), eras, transition, today, legend |
| Level marks | The years in the timeline list |
| Method icons | About's method section, static |

**Removed along the way:** sheet codes, project and section numbers, nav numbers, figure captions, the header role,
the drawing-sheet labels and the title block in the footer, the grid axes and lettered bubbles, section labels above
headings, the zig-zag featured projects, the tall featured rows (summary, stack and "View project" on Home), the
Method section on Home (it moved to About), the Contact section on About (the footer has it), the Building fact, the
location in the hero's eyebrow, Scope and Data on the project page, the toolbox's usage dots and its note, the lines
along band edges, mono capitals on links, buttons, stacks and chips.

**Two switches** in the study bar (hover a label for what it does):

| Switch | Options | Proposal |
| --- | --- | --- |
| Image marks | On · Off | On |
| Motion | Calm · Off | Calm |

## 4. Screens and scenarios

- **Screens:** Home · Projects (type tabs) · Project · Timeline (chart, category tabs, search with `/`, stack / type /
  status filters, sort) · About. The role and degree pages open from "Where I've worked", the timeline and About.
- **Scenarios:** on Project, *Uparque* (finished), *Voydex* (in progress) and *Lifeflow* (no images yet); on the phone
  frame, the menu open or closed.
- **Frames:** desktop (1280) and phone (390); light and dark; English and Portuguese.
- **Links:** `#screen.frame[.menu]` (e.g. `#timeline.mobile`), plus one-shot overrides for sharing an exact state:
  `?theme=dark&lang=pt&project=voydex&record=exp-aquasis&marks=off&motion=off`, and `?filters=open` on the Timeline.
- **Not mocked** (they exist in the code): the image lightbox, the view transition between a card and its page, the
  copy-email feedback, the skip link, the not-found page.

## 5. Plan (in order)

1. **Owner review** of the simplified version.
2. **Refine here** if needed, breadth-first: page-level notes go to a backlog; system-level issues are fixed on sight.
3. **Port it to the code** on `redesign`. The switches become fixed choices; the live site has no toggles. A `Band`
   wrapper (alternating by position), one `SectionHead` (heading, optional eyebrow and intro, action) and one rail
   part for project and role pages; the graphite footer; Method moves to About; update the dictionaries (§7).
4. **Then the code clean-up** already pending: delete the old UI files and unused packages (needs the owner's OK), an
   Open Graph image, and moving the source PNGs out of `public/`.

## 6. Open questions

- **Quick to take in?** Can you get each page at a glance now: Home, About, a project, a role page?
- **Method on About.** It left Home to keep Home to four sections. Right place?
- **The two switches.** Image marks and Motion: keep the proposals (On, Calm)?
- **Em dashes.** The Voydex rule (no em dashes in UI text, because it reads as AI-written) would apply here too. The
  templates use none, and the rewritten hero intro and thesis line dropped theirs. Only the home link's
  screen-reader label (`nav.homeLabel`, "Tiago Gil — home") still has one. Change it to a comma?
- **Sideways scrolling on phones.** The timeline chart (it needs about 670px) and the tab rows (project types,
  timeline categories) scroll sideways with no hint. Leave them, or fade their right edge?

## 7. Build notes (for implementation)

- **Band tokens.** `--band` is the even bands' tone. `--bg` always holds the colour of the band an element sits on:
  anything that knocks out a line behind it (timeline glyphs and break line, the outlined education bars, level
  marks, the sticky filter bar) paints `--bg`, never `--paper`. Hover washes use `--hover` (4% ink over
  transparent), so they work on every band. Alternation is by position (`.band:nth-child(even)`); the first band of
  a page has no top padding (the page header brings its own).
- **The footer** scopes the dark theme's tokens (graphite paper, warm ink) in both themes; in dark mode its paper is
  deeper than the page. Its contact list includes the email; its two link columns stack on phones.
- **Changed strings (EN / PT):**
  - **Frontend-first copy** (2026-09-29): the site talks about frontend first; architecture stays where it's a fact
    (the degree, the thesis, the chart's eras, the Architect role) plus one line in the hero intro and About's intro.
    In the study these override the dictionary (`COPY_OVERRIDES`); move them into `ui.ts`:

    | Key | EN | PT |
    | --- | --- | --- |
    | `home.hero.line1` | Frontend developer | Frontend developer |
    | `home.hero.line2` (lighter) | & architect. | & arquiteto. |
    | `home.hero.lead` | I work mainly with React, Next.js and TypeScript. My background in architecture makes me care a lot about structure and design. Currently at Aquasis, in Lisbon, and available for freelance. | Trabalho sobretudo com React, Next.js e TypeScript. A minha formação em arquitetura faz-me dar muita atenção à estrutura e ao design. Atualmente na Aquasis, em Lisboa, e disponível para freelance. |
    | `contact.body` | I'm available for freelance projects: websites, web apps and interfaces. The quickest way to reach me is email. | Estou disponível para projetos freelance: websites, aplicações web e interfaces. A forma mais rápida de me contactar é por email. |
    | `projects.title` | From first idea to shipped product. | Da primeira ideia ao produto final. |
    | `project.placeholder.planned` | In planning | Em planeamento |
    | `project.placeholder.none` | No screenshots yet | Ainda sem imagens |
    | `timeline.title` | The path so far. | O percurso até aqui. |
    | `timeline.subtitle` | Studies, work, projects and certifications on one timeline, from my first degree to today. | Estudos, trabalho, projetos e certificações numa só linha do tempo, da primeira formação até hoje. |
    | `timeline.noResults` | Nothing matches these filters. | Nada corresponde a estes filtros. |
    | `about.intro` | A frontend developer with a background in architecture and an interest in UX and UI. | Um frontend developer com formação em arquitetura e interesse por UX e UI. |
    | `about.bio` | I'm based in Lisbon and have been building for the web since 2023, mostly with React, Next.js and TypeScript. ¶ Before that I was an architect, and I wrote my master's thesis on architecture and video games. Games stuck with me: several of my own projects are game companions, like Voydex, a Pokémon companion I'm building now. The rest are mostly small trackers for things I care about, from concerts to finances. | Vivo em Lisboa e construo para a web desde 2023, sobretudo com React, Next.js e TypeScript. ¶ Antes disso fui arquiteto, e a minha tese de mestrado foi sobre arquitetura e videojogos. Os jogos ficaram comigo: vários dos meus projetos são companions de jogos, como o Voydex, um companion de Pokémon que estou a construir agora. Os outros são sobretudo pequenos trackers para coisas de que gosto, de concertos a finanças. |
    | `about.story.software.body` | Full-stack roles at Subvisual and Talent Protocol, then frontend at Aquasis, with client and personal projects along the way. | Funções full-stack na Subvisual e na Talent Protocol, depois frontend na Aquasis, com projetos pessoais e de clientes pelo caminho. |
    | `about.story.title` | How I got into frontend. | Como cheguei ao frontend. |
    | `about.story.software.title` | Frontend | Frontend |
    | `home.method.title` | How I work. | Como trabalho. |
    | `home.method.intro` | Four principles behind everything I build. | Quatro princípios por trás de tudo o que construo. |
    | `home.method.design.*` | Design / I pay attention to hierarchy, spacing and states, so screens are easy to read. | Design / Dou atenção à hierarquia, ao espaçamento e aos estados, para que os ecrãs sejam fáceis de ler. |
    | `home.method.structure.*` | Structure / I plan components and layouts before building, so new features are easier to add. | Estrutura / Planeio componentes e layouts antes de construir, para que seja mais fácil acrescentar funcionalidades. |
    | `home.method.access.*` | Accessibility / I use semantic HTML, keyboard support and good contrast, and test on different screen sizes. | Acessibilidade / Uso HTML semântico, suporte de teclado e bom contraste, e testo em vários tamanhos de ecrã. |
    | `home.method.longevity.*` | Longevity / I write typed, readable code and tidy up as I go, so it stays easy to change. | Longevidade / Escrevo código tipado e legível e arrumo à medida que avanço, para que continue fácil de alterar. |
    | `about.thesis.bridge` | (same, comma instead of the em dash) | (igual, vírgula em vez do travessão) |
    | `footer.note` | Frontend developer and former architect, based in Lisbon. | Frontend developer e ex-arquiteto, baseado em Lisboa. |

    | `project.type.client` / `.personal` / `.learning` | Client / Personal / Learning | Cliente / Pessoal / Aprendizagem |
    | `projects.typeHint.client` | Built for clients. | Feitos para clientes. |
    | `projects.typeHint.personal` | My own products and experiments. | Os meus produtos e experiências. |
    | `projects.typeHint.learning` | My early work, from when I was learning. | Os meus primeiros trabalhos, de quando estava a aprender. |

    **Project kinds** replace the five types (core, product, early work, experiment, design): Client work (Uparque,
    Onesbryne), Personal (Voydex, Lifeflow, Rankex, Trackio, Echoes, Portfolios), Learning (the early-work projects).
    In the content, change each project's `type` to one of the three. **Order:** projects are strictly newest first
    (the old "planned last" exception is gone).

    About's Practice fact now reads software first ("Software since 2023 · Architecture since 2014").
    `home.hero.eyebrow` is no longer used (Home has no eyebrow; other pages keep theirs).
  - `projects.intro`: "Client work, my own products and experiments, and the early work where it all started." /
    "Trabalho para clientes, os meus produtos e experiências, e os primeiros trabalhos onde tudo começou." (the current one explains
    project numbers, which are gone).
  - New: "Last updated" / "Última atualização" (footer), "Master's thesis" / "Tese de mestrado" (thesis eyebrow).
- **Strings likely unused after the port** (check before deleting): `sheet.*`, `footer.project`,
  `footer.projectValue`, `footer.drawing`, `footer.sheet`, `footer.scale`, `footer.drawnBy`, `footer.location`,
  `footer.revision`, `footer.builtWith`, `header.role`, `home.hero.figure`, `home.hero.figureCaption`,
  `home.hero.facts.building`, `project.figure`, `project.clickToEnlarge`, `project.data`, `project.data.*`,
  `home.experience.legend`, `timeline.legend`, `about.toolbox.note`, the section labels (`home.work.label`,
  `home.experience.label`, `home.method.label`, `contact.label`, `about.story.label`, `about.toolbox.label`,
  `about.learning.label`). `project.scope.*` stays for the Timeline's search.
- **Spacing system** (see `REVIEW.md`): bands pad 112 / 96 / 72; a page's first label sits 80 / 72 / 56 under the
  header and its title 24 below it (the breadcrumb counts as that label); a section heading sits 64 / 48 above its
  content; link lists are 28px rows, 8 apart. Everything else on a 4/8 scale.
- **Dates in Portuguese:** format the month on its own and add the year; `pt-PT` renders a short month plus year as
  "01/2025". The same bug is in `portfolio-dates.ts` today.
- **Buttons** wrap a long label onto a second line instead of overflowing (the Portuguese thesis button on phones).
- **Sections** keep clear of the sticky header when jumped to (`scroll-margin-top`).
- **List rows are padded, not hung** (`--row-pad`: 12px, 16px from tablets up): lines and hover plates stay flush with
  the column; row content gets the padding. Applies to every ruled list (roles, chapters, courses, tools, highlights,
  products, Previous / Next, the chart's rows). Whatever must line up with a row takes the same padding: the year
  labels under "Where I've worked" and the chart's year lines. Timeline entries: on desktop only the date and the
  last column are padded, so the spine stays on each year's marker; on phones the whole row is and the marker moves
  with it.
- *Last updated* shows today's date in the study; in the code it should be the build date (`__BUILD_DATE__` in
  `vite.config.ts`).
- *Completed* hidden in lists but shown on the project page matches the old site's rule (`shouldShowProjectStatus`:
  details always, summaries only when not completed).
- The project page's breadcrumb ends in the project's title; a role's or degree's ends in *Experience* or
  *Education*.
- Timeline chart: a year label that sits within 10% of the start label is dropped (2015 collided with 2014 on
  phones).

## 8. Decision log

- **2026-09-28**: Reviewed the old portfolio (`main`) and the Claude Design attempt. Verdict: the Claude Design version
  is competent but generic (the stock "Swiss grid + blue accent + mono labels" look); the architecture background only
  appeared in the headline. Kept its information architecture and the repo's typed, bilingual content system.
- **2026-09-28**: Built the drawing-set direction in code on `redesign`: paper, ink and a vermilion accent; Geist and
  Geist Mono; grid axes, crop marks, dimensions, line types, level marks, a break-line career chart and a title-block
  footer. Portuguese accents restored in the content (174 words, 9 files).
- **2026-09-28**: Owner feedback: likes the concept, finds it a bit distracting. Decided to test in HTML before
  changing code, as in the Voydex study.
- **2026-09-28**: Study created. Every drawing convention was a layer (Axes, Crop marks, Dimensions, Labels, Lines,
  Motion) with three presets: As built, Quiet (proposed) and Minimal.
- **2026-09-29**: Owner: too many options; wants one version with few adjustments and scenarios, leaning towards
  architecture but not so far that it confuses. Replaced the layers and presets with one version: every convention
  that needs decoding is gone. Three switches (Hero grid, Image marks, Motion) and three project scenarios. Education
  bars in the chart are outlined instead of hatched. Date ranges use en dashes. The tablet frame and the not-found
  screen were dropped from the study.
- **2026-09-29**: Owner: sections feel lost; loved the Timeline's chart and "Where I've worked". Gave every section
  the same opening (ink rule, rail label, heading from column 4) and rebuilt the loose sections as ruled rows and
  tables.
- **2026-09-29**: Owner: still hard to identify each section; suggested background colour differences. Every
  top-level section became a full-width band alternating two paper tones, with a graphite footer; the ink rule over
  section heads went.
- **2026-09-29**: Asked whether the style was too much. Verdict given: not in colour or motion, but the detail had
  piled up because "where does a section start" was fixed three times. Owner: "a bit too complex and hard to quickly
  analyze". Simplification pass: Home down to four sections (Method moved to About, featured projects as three simple
  cards); section labels, grid bubbles, band edge lines, the footer's title block, usage dots and repeated facts
  removed; mono capitals kept for data only; contact reduced to the address and three links; the project page shows
  four facts. The Hero grid switch went with the grid. Home is about 40% shorter. Timeline and "Where I've worked"
  unchanged.
- **2026-09-29**: Owner: "a lot better, a lot more readable". Whole-app review (`REVIEW.md`): 24 pages × 2 frames × 2
  themes × 2 languages. Fixed dead links (CV, thesis, certification markers), missing files, keyboard access, Copy
  email, Portuguese dates, a phone overflow, the jump to Selected work, and spacing that differed between pages
  (page tops unified at 80 / 72 / 56, breadcrumb 24 above the title, equal link rows, a two-column toolbox on phones).
  The Portuguese date bug is also in the React code; noted for the port.
- **2026-09-29**: Owner: hover plates in lists touched the text and arrows. First try: rows hanging 16px past the
  column. Owner: hovered rows looked misaligned. Final: plates and lines flush with the column, row content padded
  16px (12 on phones); year labels, chart lines and timeline markers realigned to match.
- **2026-09-29**: Owner: no eyebrow on Home; the whole site should talk more about frontend and less about
  architecture (in words, not design). Home's eyebrow removed; new headline "Frontend developer. / Interfaces built
  to last."; the Practice fact on Home became Main stack; titles, intros, method, footer and empty states rewritten
  without drawing and building metaphors (table in §7). Architecture stays where it's a fact.
- **2026-09-29**: Owner: the hero's overall feeling isn't good, and the headline and intro don't work. Rebuilt it as
  one group centred against a larger portrait (the giant headline no longer floats above a small, detached photo);
  the facts row went (the intro now says where, what with and for whom). Three texts to compare with a temporary
  Hero text switch: Intro ★ ("I'm Tiago, a frontend developer in Lisbon."), Craft, Hello. About's title became "More
  about me." so it doesn't repeat Home's greeting.
- **2026-09-29**: Owner: no "I'm Tiago"; the title should be "Frontend" then "& Architect". Headline is now "Frontend
  developer" with "& architect." as a lighter second line; the intro keeps the stack, focus and current work, adding
  Lisbon. The Hero text switch went; About's title is "Hi, I'm Tiago." again.
- **2026-09-29**: Owner picked the short intro: "I build web apps with React and TypeScript. / Currently at Aquasis,
  in Lisbon." Each sentence on its own line.
- **2026-09-29**: Owner: available for freelance (not "open to work": he's employed, and the site is public); the
  intro could be richer. Intro is now one paragraph of four short sentences: what he builds, why architecture matters,
  where he is, freelance. Let's talk invites freelance projects. Remove both when he's booked.
- **2026-09-30**: Hero intro rewritten from the owner's own draft (edited: no second job title, one idea per
  sentence): "I work mainly with React, Next.js and TypeScript. My background in architecture makes me care a lot about
  structure and design. Currently at Aquasis, in Lisbon, and available for freelance."
- **2026-09-30**: Owner: projects weren't in date order, and the five type tags were too many. The order had a
  "planned last" exception (Lifeflow, the newest, showed last); now strictly newest first. Types became three kinds, by
  who the project was for: Client work, Personal, Learning (owner suggested learning / personal / product; "client"
  avoids calling his own products "not products"). Applied to tabs, cards, the project page and the Timeline filters.
- **2026-09-30**: Category hints shortened ("Built for clients." and so on). About's "Education and certifications" list
  removed: it repeated the Story (both degrees) and the Timeline (everything, with tabs). Story now links to the full
  timeline; About ends on the Toolbox.
- **2026-09-30**: Owner: "What I work with" should be a panel with stack icons, main stack only. Replaced the grouped
  lists with a ruled 4 × 2 panel (2 columns on phones) of the eight most used tools, frontend first, each with a
  monochrome icon (Simple Icons, CC0), its name and the year it first appears on the timeline. The other tools stay on
  the Timeline and project pages.
- **2026-09-30**: Owner: smaller, a few more, more stylish; main eight in his order. Cells went from 168 to 80px
  (framed icon beside name and year), an Also row of six smaller chips was added, and icons pick up their brand
  colour on hover.
- **2026-09-30**: Owner's final stack: twelve tools in three rows, same style, no Also row. Vercel isn't on any
  project or role yet, so it shows no year (add it to the projects deployed there). TanStack's own icon comes from
  Simple Icons 16 (older releases draw React Query's atom, which looked like a second React).
- **2026-09-30**: Owner: no "Since" years in the stack panel. Cells show icon and name only.
- **2026-09-30**: Owner: How I work should be four principles like Design, Structure, Cleanliness, Responsiveness.
  Now Design, Structure, Clean code, Responsive (the usual terms), one sentence each, with new line icons (the old
  architectural drawings didn't fit) in the same ruled panel as the stack.
- **2026-09-30**: Owner: it shouldn't copy the stack panel's design; are these good principles? Verdict: Design and
  Structure yes; Responsive is table stakes and Clean code a cliché that overlaps Structure. Now Design, Structure,
  Accessibility (covers responsive and more), Longevity (clean code with a reason). Layout is open 2 × 2 with
  hairlines and larger titles; icons use the accent, a deliberate exception to the accent rule (switch to ink if
  the owner prefers).
- **2026-09-30**: Owner: four columns; some sentences were ambitious or unrealistic. Rewritten as habits he
  actually has ("I pay attention to…", "I plan…", "I use semantic HTML…", "I write typed, readable code…"), not
  outcomes he can't guarantee.
- **2026-09-30**: Lines above the principles removed. Owner: the section felt different from the rest; the red icons were
  the only decorative colour on the site, so they're ink now and take the accent on hover, like everything else.
- **2026-09-30**: Owner: How I work still felt different (the missing lines). It's now a ruled list on exactly the
  Story's grid: icon in the left column (where Story has years), title at column 4, sentence at column 8.
- **2026-09-30**: Owner: CR Espassos wasn't "Practice", it was his first job. The Story chapter is now "Architect"
  ("Arquiteto"), so the chapters read Architecture school → Architect → The switch → Frontend. The About fact labelled
  "Practice" ("Software since 2023 · Architecture since 2014", hard to read and wrong: 2014 was school) is now
  "Frontend since: 2023"; the degree fact beside it covers architecture.
- **2026-09-30**: The local time beside "Based in" is gone (a leftover from the title block). Full-stack: mentioned
  once, as experience, in About's bio ("I've also worked full-stack, so I'm comfortable with databases, APIs and the
  backend when a project needs it."); the headline stays frontend, and Home's roles already show Full-Stack Developer.
- **2026-09-30**: Footer note "…building clear web interfaces that last" read oddly; now "Frontend developer and former
  architect, based in Lisbon." UX/UI goes in About's intro as "a keen interest in UX and UI" (not "enthusiast", which
  sounds like a hobby), not in the headline.
- **2026-09-30**: Owner: Timeline filters should be their own modal. The Filters button now opens a native dialog
  (centred, 640px; a bottom sheet on phones): Stack, Project type and Status chips, "Clear filters", and a "Show N
  results" button that counts live. Picking a filter updates the list behind it without closing; Escape, the close
  button and a backdrop click close it. Focus lands on the title (no focus ring on a mouse open). Study link:
  `?filters=open#timeline.desktop`.
- **2026-09-30**: Project kinds renamed to Client / Personal / Learning (was "Client work"), so the three labels read
  as a set of one-word modifiers under "Projects". Portuguese unchanged (Cliente / Pessoal / Aprendizagem).
- **2026-09-30**: Project cards (Home and Projects): the status ("In progress", "In planning") moved from the right
  edge into the meta line, after the year and type ("2025 · Personal · In progress"), so it reads as part of the
  project's details and every card's line starts at the same edge. The Timeline list keeps it right-aligned (a column
  every row fills).
- **2026-09-30**: Owner: hovered arrows all slid right, whatever their direction. Now each arrow nudges the way it
  points (→ right, ← left, ↓ down, ↗ up-right, ↑ up; the download icon's arrow drops while its tray stays), about 2px,
  on links, buttons and Timeline rows. Only the arrow moves; the icon's box stays put, so text never shifts. Motion
  "Off" disables it. Porting: wrap each arrow icon's paths in a `<g>` and key the nudge on the icon name.
- **2026-09-30**: Owner: stop calling the Learning projects "bootcamp apps". The Projects intro and the Learning hint
  now say "early work" ("…and the early work where it all started." / "My early work, from when I was learning."; PT
  "primeiros trabalhos"). The tab label stays Learning. "Bootcamp" remains only in the Ironhack degree's own name and
  summary (Timeline, About), where it is the programme's name.
- **2026-09-30**: Owner: the Timeline chart's labels were long and cut off. The chart now uses short labels for the
  three that were cut: University of Lisbon · Architecture (phones: ULisboa), Ironhack · Full-Stack Bootcamp (owner: in line with
  the Full-Stack roles), Subvisual · Full-Stack Apprentice (PT: Universidade de Lisboa · Arquitetura; the other two as EN). The list below the
  chart, the record pages and the hover title keep the full names. Nothing is cut at any width in either language.
  Porting: a `chartLabel` (and `chartRole`) field on those three records, not a table in the component.
- **2026-09-30**: Owner: role names are never translated and read the same in both languages. Spelling: **Frontend**
  (one word) and **Full-Stack** (hyphen; capital S in a job title, "full-stack" mid-sentence when it isn't one), with
  **Developer** untranslated. Study: the PT hero reads "Frontend developer / & arquiteto."; PT About intro "Um frontend
  developer com formação…"; PT footer "Frontend developer e ex-arquiteto…". Content to fix when porting
  (src/content): "Full-stack Developer" → "Full-Stack Developer" in the Subvisual and Talent Protocol details (EN and
  PT), and "o principal developer frontend" → "o principal frontend developer" (Talent Protocol, PT); the unused PT
  keys `home.hero.line2`, `about.intro`, `footer.note` in pt/ui.ts still say "programador frontend".
- **2026-09-30**: Owner: the filter chips had uneven widths and grew when picked (the check appeared). The options
  are now a checklist in equal columns (3 on desktop, 2 on phones), group labels above: a square box that is always
  there and fills (ink, with a check) when picked, so nothing moves. Hover: a light plate. The modal keeps its scroll
  position and focus when an option is toggled. The button reads "No results" / "Sem resultados" at 0. Note: stack
  options combine as AND (React + TypeScript lists items with both), so Voydex, tagged Next.js but not React, drops
  out of a React filter; worth a content check when porting.
- **2026-09-30**: Owner: picks showed up behind the modal straight away, which looked odd and made "Show N results"
  pointless. The modal now edits a draft: picking options only updates the checkboxes and the button's count; the
  list, the tab counts and the Filters badge change only when "Show N results" is clicked. ✕, Escape and a backdrop
  click discard the draft, and the next open starts from the applied filters. "Clear filters" clears the draft (apply
  with the button). The count still includes the current search and category tab.
- **2026-09-30**: Owner: options that would lead to no results should be toned down or disabled. Each unticked
  option now checks whether adding it (to the current picks and search) would leave anything; if not, it's faded
  (35%) and disabled, with no hover. Ticked options are never disabled, so a pick can always be undone. Example: with
  React picked, 17 options fade (AutoCAD, Revit, Personal, Planned…) and every option left enabled gives at least
  one result.
- **2026-09-30**: Owner: About's intro drops "keen" ("…and an interest in UX and UI."), and the bio should sound more
  human, in terms people actually use. Bio rewritten as three short paragraphs: what I build and with what (React,
  Next.js, TypeScript; clean code, simple interfaces); the architecture background in concrete terms (plan before
  building; layout, hierarchy, how people use a product); what I work on now (Aquaworks at Aquasis, client work, side
  projects) and the full-stack line. Removed: "web products", "long-term maintainability", "systems, constraints",
  "sits between frontend engineering and product design", "operational interfaces".
- **2026-10-01**: Owner still didn't like the bio; of three directions (the switch as a story, what I like doing,
  short and direct) the owner picked **short and direct**: two brief paragraphs, who and what (frontend developer in Lisbon;
  React, Next.js, TypeScript; full-stack too), then the architecture years and what carried over (layout, structure).
  Aquaworks and client work are left to the Story, Timeline and Home.
- **2026-10-01**: Owner: skip the bio. About's intro band is now the heading, the intro line, the portrait and the
  four facts (bottom-aligned beside the portrait, like a caption). The full-stack mention moved to the Story's
  Frontend chapter, rewritten in plain terms: "Full-stack roles at Subvisual and Talent Protocol, then frontend at
  Aquasis, with client and personal projects along the way." (was "Frontend-focused roles across a Web3
  apprenticeship, builder-reputation products and an operational platform for water utilities…").
- **2026-10-01**: Owner: About is too empty without the bio; bring it back. Why the earlier versions didn't land:
  each one restated what the page already says (role, stack, Aquasis, architecture). The new bio says something only
  it says, from the owner's own content: the thesis on architecture and video games, the game companions that
  followed (Voydex), and the small trackers (concerts, finances). Two paragraphs; facts back below it at 48px.
- **2026-10-01**: Correction. The owner asked for **four columns**, then felt the open columns lacked lines; the
  2026-09-30 change wrongly turned them into a ruled list of four rows. Now: four columns (2 × 2 on tablets, stacked
  on phones) ruled like a table row: one continuous line above and below, thin vertical lines between the columns,
  no per-column rule on top. Each column: icon, title, sentence. The first column lines up with the Story rows above.
- **2026-10-01**: Rules stay at the content width across the app (owner: no full-width lines, no framing that would
  turn lists into boxes). In "How I work" only: the horizontal rules above and below the four columns are removed;
  the thin vertical lines between the columns stay. Tablets: 2 × 2 with a line between the two columns, 40px between
  rows. Phones: stacked, no lines, 40px apart.
- **2026-10-01**: Owner: the thesis ("What can architecture learn from video games?") belongs on the university page
  only. Removed from About; the FAUL page keeps it (Master's thesis highlight with its description, and "Read the
  thesis"). About is now: Hi, I'm Tiago → How I got into frontend → How I work → What I work with. The bio still
  mentions the thesis topic. Strings no longer used: `about.thesis.question`, `about.thesis.bridge`,
  `about.thesis.read` (check the record page before deleting), and the study's "Master's thesis" eyebrow.
- **2026-10-01**: Timeline list. (1) Years sat 96px under the previous year's last line; each year's top padding
  drops from 64 to 24 (≈56px from the last text; the first year keeps 64 under the toolbar). (2) The spine is now
  one continuous line: it runs on from each year's last entry through the next year's heading to its marker (0px
  gaps, 0px offset at 1200, 800 and 390). On phones and tablets the year number moves beside the line, aligned with
  the entry titles, so the line never crosses it. (3) Date ranges stay on one line when they fit ("Mar 2024 – Feb
  2025", duration below); they break only after the dash where the column is too narrow (1024px desktop).
- **2026-10-01**: Owner: group the stack in the filters (suggested FE, BE, DB, ARQ). Four groups, based on the repo's
  `tech-groups.ts`: Frontend (16), Backend & data (9; backend and databases together, since a DB group would have only
  three and Supabase is both), Tools & process (6), Architecture (3). Web3 is folded in (Wagmi → Frontend, Solidity
  → Backend & data); anything unlisted would fall into "Other" (currently empty). Alphabetical within each group.
  PT: Frontend, Backend e dados, Ferramentas e processo, Arquitetura. Porting: align `tech-groups.ts` with these.
- **2026-10-01**: Owner: the four stack headings read as equal to Project type and Status; is Status even useful;
  join In progress with the current job? The Status filter is gone (it only applied to projects, and Completed covered
  nearly all of them). In its place, one option at the top: **Current only**, "My current job and projects in
  progress" (PT "Apenas o atual", "O meu trabalho atual e projetos em curso"): the role with no end date plus
  projects in progress; planned ones are excluded. Today: Voydex and Frontend Developer at Aquasis. Stack is now one
  section ("STACK") with four quieter sub-labels (Frontend, Backend & data, Tools & process, Architecture), then
  Project type. Entries still show their status marks. Strings unused after the port: `timeline.statuses`.
- **2026-10-01**: Filter order (owner): Current only → Project type → Stack.
- **2026-10-01**: Previous / Next (project and role pages). Owner: the rules above and below made no sense (the
  bands already mark the edges), the whole left and right should be the links, and the padding was too big. The
  pager is now a band with no padding; each link fills its half edge to edge and top to bottom (the hover plate is
  the whole half), with only the divider between them (a line between the stacked links on phones). Text lines up
  with the content edge plus the row padding, like the lists. 56px top and bottom (40 on phones); the band went from
  ~560px to ~225px tall. A page with only "Next" uses the full width, right-aligned.
  Follow-up (owner): the hover tint over a whole half looked like the band above, so the pager has no hover plate;
  hover is the title turning red and the arrow nudging (the whole half stays clickable).
- **2026-10-01**: Entry pages. Owner: should the external link and the stack be at the top? Project pages already
  had both near the top (Visit site / Source code by the title; stack beside the brief); role and degree pages had
  them last. Role and degree pages now match: the organisation's name under the title links to its site ("Aquasis
  ↗"); documents not already in the highlights sit beside it (Ironhack: "View certificate ↓"; FAUL's thesis stays in
  its highlight); the stack sits beside the overview in the same right-hand column as a project's brief. The Stack
  section and the "Visit company / institution" buttons at the bottom are gone. Strings unused after the port:
  `experience.visit`, `education.visit` (check other uses first).
- **2026-10-01**: Entry pages (projects, roles, degrees). Owner: a stack is easier to scan in a row. The stack moved
  from the narrow right column to one row under the brief / overview ("STACK" then the tools), in a wider column (cols
  4–12) so it stays on one line: all 20 pages fit on one row at 1200 and 800 (up to 8 tools); phones wrap. The
  text keeps a readable measure (52ch). Same pattern as the Timeline entries' stack line.
- **2026-10-01**: Scope (role and degree pages). Owner: too many borders and separators. Now a plain bulleted list:
  no rules above, between or below the items (only the section's own rule), 12px apart, small square bullets. On
  desktop the bullets hang in the margin so the text lines up with the overview; on tablets and phones they sit
  inline.
  Follow-up (owner): the plain list looked empty and bland. Scope now has weight without rules: the four points sit
  in two columns (2 × 2, stacked on phones) in the wider column used by the stack row, at a larger size (17–20px,
  ink) with stronger bullets. Checked on all six pages, both languages, three widths: two columns from tablets up,
  no point over three lines, no overflow.
- **2026-10-01**: Text size. Owner: long texts in the large size feel massive. Checked against the usual guidance
  (body 16–18px for long reading; 45–75 characters a line; line spacing 1.2–1.5; a larger "lead" only for a sentence
  or two). Nothing broke a rule, but the 21–22px lead size was used for 5–8-line paragraphs (role and degree
  overviews, 65–82 words; the About bio). New `.read` style for those: 18px (17 on phones), line spacing 1.65,
  ~34em wide (60–70 characters a line on desktop, both languages). Scope points 17px. The large size stays for short
  intros of 2–3 lines (hero, page intros, project briefs, section intros). Note: `ch` in this font is the wide "0",
  so 58ch gave ~80 characters; widths for text use `em`.
- **2026-10-01**: Products (roles) and Highlights (degrees), matching Scope: no box, no rules; items in two columns in
  the wide column (Talent Protocol 2 × 2, CR Espassos 2 + 1); a single item (Aquaworks, the thesis) reads in one column
  at reading width. Each item: name (with ↗ for a site, ↓ for a PDF; the whole item is the link, the name turns red on
  hover), description at body size, its stack line if any. The project pages' Collection keeps its own style.
  Follow-up (owner): Products in one column, one under another (reading width, 32px apart); Scope keeps the two
  columns.
- **2026-10-01**: Scope gets a short title per point (owner: no bullets; Scope should look like Products did). Two
  columns, title + sentence, no bullets or rules. The titles come from each point's own wording; the sentence keeps
  the rest. Titles (EN / PT):
  - Aquasis: Core team / Equipa principal · Design reference / Referência de design · Frontend ownership /
    Ownership frontend · Clients and .NET / Clientes e .NET
  - Talent Protocol: Frontend ownership / Ownership frontend · Features / Funcionalidades · Design to code / Do design
    ao código · Quality / Qualidade
  - Subvisual: Frontend · Agile team / Equipa ágil · Modern workflows / Workflows modernos · Code reviews
  - CR Espassos: Design / Projeto · Documentation / Documentação · Clients / Clientes · Coordination / Coordenação
  - FAUL: Design · Process / Processo · Communication / Comunicação · Research / Investigação
  - Ironhack: Stack · Remote / Remoto · Projects / Projetos · Iteration / Iteração
  Full sentences are in the study's `SCOPE` table; porting: turn each record's scope items into {title, text}.
- **2026-10-01**: Owner: the Scope points should be more complete. Each point is now one full sentence (15–25
  words, 2–3 lines on desktop) built only from the record's own overview, summary and product notes: Aquaworks'
  domain and its Laboratory / Maintenance Plans modules, working with the CTO at Talent Protocol and Build.top from
  Figma, Wordlechain and Talio at Subvisual, the building types at CR Espassos, the three Ironhack projects, the
  thesis topic. EN and PT in the study's `SCOPE` table (projects have no Scope section).
