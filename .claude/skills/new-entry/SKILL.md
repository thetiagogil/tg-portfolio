---
name: new-entry
description: Adds a new project, role, degree or certification to the portfolio in English and Portuguese, with its stack, dates, links and images, then validates it. Use when Tiago wants to add or document new work.
---

# New entry

1. **Ask Tiago first** (in one message): the kind (project, role, degree, certification), title, dates, who it was
   for (client, personal, learning) and status for projects, links, the stack to list, and a few rough lines about it
   in Tiago's own words. Ask for screenshots for projects.
2. Delegate the writing to the **content-editor** agent with those answers. It reads `docs/OWNER.md` and
   `docs/CONTENT.md`, creates `src/content/<collection>/<slug>.ts` from an existing entry of the same kind, and
   writes both languages. Any missing fact becomes a question, never a guess.
3. Add screenshots under `assets/projects/<slug>/` (PDFs under `public/`) and run `npm run images`.
4. Run the **verify** skill.
5. Show Tiago the new page (desktop and phone, both languages) with screenshots, and the text in both languages for
   approval. Log the addition in `docs/DECISIONS.md` only if it changed a rule or the design.
