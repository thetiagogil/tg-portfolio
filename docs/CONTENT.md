# Content

How the site's content is organised, and the rules for writing it in English and Portuguese (pt-PT). For the owner's
voice, positioning and approved or rejected copy, read `docs/OWNER.md` first.

> The approved copy from the study (hero, overrides, titled Scope, chart labels) is already in the content. The
> study's `data/content.js` is a frozen export of the old content; don't edit it. `src/content/content.test.ts` checks
> everything below; run `npm run test` after any edit.

---

## 1. Model

```
src/content/
  profile.ts              name, email, links, CV, location, portrait, bio (en / pt)
  stack.ts                every tool once: id, name, group, Simple Icons slug, brand colour, main (About panel)
  projects/<slug>.ts      one file per project
  experience/<slug>.ts    one file per role
  education/<slug>.ts     one file per degree or course
  certifications/<slug>.ts
  ui/en.ts                interface text
  ui/pt.ts                same keys as en.ts (enforced by TypeScript)
  index.ts                typed collections, sorted, plus queries used by the pages
```

- **Bilingual fields** use `{ en: string; pt: string }`. Text for both languages sits side by side in the entry's
  file, never in separate trees.
- **Dates** are ISO strings (`"2025-01-01"`), read and formatted in **UTC**. `dateEnd: null` means "present";
  `dateEnd` absent means a single date.
- **Tools** are referenced by id from `stack.ts` (`nextjs`, `shadcn`, `tanstackQuery`…). An entry can't list a tool
  that isn't defined there.
- **Images:** source files live in `assets/projects/<folder>/` and are referenced as `"voydex/voydex-1.png"`; the
  WebP sizes are generated into `public/images/`. **PDFs** live in `public/`. A test checks every file exists.

### Projects

| Field | Notes |
| --- | --- |
| `slug`, `title` | Title isn't translated |
| `type` | `client` · `personal` · `learning` (who it was for) |
| `status` | `completed` · `in progress` · `planned` |
| `dateStart`, `dateEnd?` | |
| `subtitle` (en / pt) | One line, shown on cards ("Pokémon game companion") |
| `brief` (en / pt) | 1–2 sentences, `lead` size |
| `techs` | 3–6 defining tools |
| `links` | `site?`, `repo?` |
| `images` | Paths inside `assets/projects/`; the first is the cover and the link preview |
| `collection?` | Grouped entries (the portfolio sites), each with a label, link and stack |

### Roles (experience) and degrees (education)

| Field | Notes |
| --- | --- |
| `slug`, `title`, `org` | Role titles are never translated (see §2) |
| `link`, `documents?` | Organisation site; PDFs such as the Ironhack certificate |
| `dateStart`, `dateEnd` | `null` = current |
| `summary` (en / pt) | One or two sentences for the Timeline list |
| `overview` (en / pt) | The page's main paragraph, `read` size, 60–90 words |
| `scope` | Four points `{ title, text }` (en / pt): a 1–3-word title and one full sentence (15–25 words) |
| `products?` / `highlights?` | `{ label, description, link?, techs? }` |
| `projects?` | Project slugs from this period |
| `chart?` | Short label and role for the Timeline chart when the full ones don't fit (`{ label, role, labelNarrow? }`) |
| `techs` | 3–6 defining tools |

### Derived, not stored

- **Current:** a role with `dateEnd: null`, or a project `in progress`.
- **Order:** newest first everywhere (projects strictly by start date).
- **Stack groups** for the filters come from `stack.ts`: Frontend, Backend & data, Tools & process, Architecture.

## 2. Writing rules

**Both languages**
- Plain, human words that people actually use. No inflated claims, no outcomes that can't be guaranteed, nothing
  that isn't true. Describe habits and facts, not promises.
- Frontend first; architecture is background, mentioned where it's a fact (the degree, the thesis, the Architect
  role, the chart's eras) and in the hero and About intros.
- Short: one idea per sentence, nothing said twice on a page.
- **Role names are never translated** and read the same in both languages: **Frontend Developer**, **Full-Stack
  Developer**, **Full-Stack Developer Apprentice**. Spelling: *Frontend* (one word); *Full-Stack* (hyphen, capital S
  in a title; "full-stack" mid-sentence when it isn't a title). In Portuguese running text: "um frontend
  developer", "trabalhei como full-stack". *Architect* is translated (Arquiteto).
- The Learning projects are "early work" / "primeiros trabalhos", never "bootcamp apps". "Bootcamp" only appears in
  the Ironhack programme's own name and description.
- **Em dashes:** avoid them in UI text (open question for the owner; the Voydex rule says none). Use commas or
  colons. Date ranges use an en dash with spaces ("Mar 2024 – Feb 2025").
- Availability: "available for freelance", never "open to work" (the owner is employed).

**Portuguese (pt-PT)**
- European Portuguese: "ecrã", "equipa", "planeado", "utilizador", "telemóvel".
- Dates: month alone, then the year: "jan 2025", never "01/2025" (`pt-PT` formats a short month with a year as
  numbers). Footer: "1 out 2026".
- Common English tech words stay in English when that's what people say: frontend, backend, full-stack, workflow,
  code review, refactor, Figma, stack.

**Lengths**
| Text | Length |
| --- | --- |
| Card subtitle | 2–5 words |
| Project brief | 1–2 sentences |
| Timeline summary | 1–2 sentences (15–30 words) |
| Overview | 60–90 words |
| Scope point | title 1–3 words; sentence 15–25 words |
| Section intro | 1 sentence |

## 3. Stack

- `stack.ts` is the single list of tools. It feeds the About panel (the twelve with `main: true`, in the owner's
  order: React, Next.js, TypeScript, JavaScript, Material UI, Tailwind CSS, shadcn/ui, Bootstrap, TanStack Query,
  Supabase, Vercel, PostgreSQL), the filter groups and every chip.
- Each entry lists the **tools that define it** (up to 7), always including its UI library or design system (Joy UI,
  Material UI, Radix UI, shadcn/ui, Bootstrap, Tailwind CSS).
- **No overlap.** A tool can declare what it already includes (`includes` in `stack.ts`): Next.js includes React,
  React includes HTML and CSS, shadcn/ui includes Tailwind CSS and Radix UI, Supabase includes PostgreSQL. An entry
  lists only the top one; a test fails if it lists both. Filters match only what's listed (a Next.js project doesn't
  appear under React).
- Not stack: Microsoft Office, Postman. Ways of working (Agile, Lean, Kanban, Jira) appear only on the Agile
  certificate, whose subject they are; elsewhere they belong in Scope.
- Names: use each tool's own spelling (Next.js, shadcn/ui, TanStack Query, PostgreSQL).

## 4. Adding an entry

Use the `/new-entry` skill, or by hand:
1. Create `src/content/<collection>/<slug>.ts` from an existing entry of the same kind.
2. Fill both languages; follow §2 and `docs/OWNER.md`.
3. Add images to `public/…` and run `npm run images`.
4. Run `npm run verify` (the content tests check languages, dates, tools and files).
5. Check the page in both languages and on a phone.
