# Decisions

Why the site looks and reads the way it does. Newest entries at the bottom. Add an entry for every decision the
owner makes (date, what was asked, what changed, and why), so the reasoning survives. The current state of the design
is in `docs/DESIGN.md`; this file is the history behind it.

- Entries up to 2026-10-01 come from the Direction Study (`docs/study/REDESIGN.md`, kept unchanged as the original).
- Pronoun note: older entries say "he" for the owner; new entries say "the owner" or "Tiago".

## Open questions

- **Em dashes in UI text:** the Voydex rule says none (it reads as AI-written). The study already avoids them; the
  only one left was the home link's screen-reader label. Default: avoid; confirm with the owner.
- **Sideways scrolling on phones:** the Timeline chart (~670px wide) and the tab rows scroll sideways with no hint.
  Leave them, or fade the right edge?
- **Vercel:** in the About panel but on no entry yet; the owner will check which projects are deployed there (the
  live links of Easyqa, Onesbryne, Trackio, Echoes and Rankex are on vercel.app).
- **Content evaluation:** the owner wants to review all content before launch (Phase 7). Includes **image alt
  text**: project screenshots are described only as "Screenshot 1 of 4 of Voydex"; each needs a real description
  (at least the first per project). Cards use empty alt (the title link beside them names the project).
- **Accessibility, accepted for now:** the Timeline's "/" shortcut is a single-key shortcut with no off switch (it is
  ignored while typing; WCAG 2.1.4); icon buttons are 36px as in the study (above the 24px minimum); links that open
  a new tab don't announce it (advisory).

## Log

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

- **2026-10-01**: Rebuild decided (see `docs/PLAN.md`). Next.js App Router with static export; Tailwind 4 with the
  study's tokens; no UI library (native `<dialog>` for the filters modal and the lightbox; no shadcn: the design needs
  only a few small primitives, all already designed); English at `/`, Portuguese at `/pt/...` with the same paths;
  Cloudflare only (static files, domain thetiagogil.com stays there; Vercel not needed without server features);
  Cloudflare Web Analytics; a 404 page; no printable CV page (the PDF covers it); a full-screen image viewer on project
  pages. Content rebuilt as one file per entry with both languages side by side, a single `stack.ts`, and trimmed
  stacks (3–6 defining tools). Favicon from the TG monogram (SVG adapting to dark mode, PNG for iPhones), a default
  link preview and one per project.
- **2026-10-01**: Repo context for future sessions: `CLAUDE.md`, `docs/` (DESIGN, CONTENT, OWNER, DECISIONS, PLAN,
  the study), and `.claude/` (settings, preview config, four agents: design-reviewer, content-editor, a11y-auditor,
  qa-runner; skills: verify, new-entry, compare-study). The owner's profile is a document every agent reads, not an
  agent of its own. Repo is private.
- **2026-10-01**: Commits are the title line only: no body, no co-author or attribution lines.
- **2026-10-01**: Stacks (owner): keep the design tool (UI library) on every entry; no overlap between a tool and what
  it's built on (Next.js ⊃ React, React ⊃ HTML/CSS, shadcn/ui ⊃ Tailwind + Radix, Supabase ⊃ PostgreSQL): an entry
  lists only the top one, enforced by a test via `includes` in `stack.ts`. Filters match only listed tools (Next.js
  projects never show React). Removed: Microsoft Office (CR Espassos), Postman (React Native certificate), PostgreSQL
  wherever Supabase is listed, Tailwind on Voydex and Rankex (shadcn/ui), React on the Talent Protocol role (Next.js;
  its React products keep React on their own stack line). "Shadcn UI" is now "shadcn/ui". Vercel deferred.
- **2026-10-01**: Content migrated to one file per entry (`src/content/`), English and Portuguese side by side, with
  the study's approved copy and the role-name fixes applied. The home link's screen-reader label lost its em dash
  ("Tiago Gil, home"), so the site has none. Noted for the content review: the PT Aquasis overview says "ligação de
  ecrã frontend" (should be "ecrãs").
- **2026-10-01**: Foundation built. English and Portuguese have separate root layouts (`app/(en)`, `app/(pt)/pt`), so
  each page has the right `lang`; the 404 is Next's `global-not-found` (one static page for both languages, English
  first with the Portuguese below). Theme: follows the system until the visitor picks; the choice is applied before
  the first paint (no flash). Styling split: tokens in Tailwind's theme; the study's component CSS kept as classes in
  `src/styles/`; Tailwind utilities for one-off layout. End-to-end tests run with reduced motion so accessibility checks
  measure final colours, not a fade in progress.
- **2026-10-01**: Pages built (Phase 4) and compared with the study at desktop and phone. Fixes found on the way:
  English months use en-US names ("Sep", not en-GB's "Sept"); the footer's Index and Contact columns stack under
  40rem (side by side they broke the email address); project cards on Projects use an `h2` (the cards are that page's
  top level), `h3` elsewhere. The full-screen image viewer was designed here (not in the study): paper background,
  title and mono counter on top, arrows at the bottom. Image alt text: "Screenshot 2 of 4 of Voydex" (both languages).
- **2026-10-01**: 404 and error copy without the drawing-sheet metaphor (owner): "This page doesn't exist." / "Esta
  página não existe."; "Something went wrong." / "Algo correu mal.". A content test now fails on "sheet" / "folha".
- **2026-10-01**: Timeline built (Phase 5). The view lives in the URL (`?cat=projects&q=react&stack=nextjs,supabase&
  type=client&now=1&sort=oldest`) so a filtered Timeline can be shared and Back works. "Show N results" now counts
  within the current category tab too (the study's count ignored the tab), so the number always matches the list.
  The chart's "Transition" and "Today" labels are grey, as the study renders them (its accent class was overridden).
  The "/" key hint is hidden on phones and touch screens (no keyboard), giving the search box its room.
- **2026-10-01**: Polish (Phase 6). Sitemap (every page, both languages, with alternates) and robots.txt. Favicon from
  the TG monogram (SVG that switches to light-on-dark in dark mode, a 180px PNG for iPhones, favicon.ico). Link
  previews built with the site as real PNG files with stable names (`/og/en.png`, `/og/voydex-pt.png`): the site's
  card (monogram, headline, stack, city) for most pages, each project's own (title, subtitle, first screenshot or the
  hatched panel). Next's `opengraph-image` convention was dropped: inner pages lost the image (a page's own preview
  settings replace the inherited ones) and the files had no extension. Cloudflare Web Analytics is included only
  when `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` is set at build time. Lighthouse (mobile, throttled): accessibility, best
  practices and SEO 100; performance 94–98 (Home and About are held at 94 by the headline's rise-in, kept by
  design). Fixes from it: chart markers are mouse shortcuts out of the keyboard order (the list has every entry with
  a full-size link); the sort button's spoken name includes its visible label; a 960px image size was added.
- **2026-10-01**: Accessibility audit (whole site, both themes, both widths, dialogs open): nothing blocking. Fixed:
  focused Timeline entries could hide under the two sticky bars (scroll room now covers both; 0 of 23 hidden when
  focused); the Timeline list was a live region (now one status line, "14 results"); the outline button clashed with
  Tailwind's `outline` utility (renamed `btn-outline`; it drew an ink outline and a thin focus ring); the search box
  had no accent focus ring; language links now say "English" / "Português" to screen readers; small text links
  (breadcrumb, Back to top, Clear filters) have a taller tap area; card thumbnails have empty alt text.
