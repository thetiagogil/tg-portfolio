---
name: compare-study
description: Puts a page of the app side by side with the same screen in the original Direction Study (docs/study, frozen since 2026-10-02) and reports the differences, with screenshots. Use when Tiago asks whether something still matches the original design.
---

# Compare with the study

1. Start both previews from `.claude/launch.json`: `dev` (the app, port 3000) and `study` (port 4410).
2. Map the page to the study's link: Home `#home`, Projects `#projects`, a project `?project=<slug>#project`,
   Timeline `#timeline` (add `?filters=open` for the modal), About `#about`, a role or degree
   `?record=<id>#record`. Add `.desktop` or `.mobile`, and `theme=dark` / `lang=pt` as needed.
3. Delegate the comparison to the **design-reviewer** agent with the two URLs, or for a quick check, take matching
   screenshots at 1280 and 390 wide and compare them yourself.
4. Show Tiago the screenshots side by side and list the differences, most visible first. The study is frozen
   (since 2026-10-02): where `docs/DESIGN.md` or `docs/DECISIONS.md` say something newer, they win, and the study
   isn't updated to match.
