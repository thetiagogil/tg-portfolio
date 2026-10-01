---
name: compare-study
description: Puts a page of the app side by side with the same screen in the Direction Study (docs/study) and reports the differences, with screenshots. Use while building a page, or when Tiago asks whether something matches the design.
---

# Compare with the study

1. Start both previews from `.claude/launch.json`: `dev` (the app, port 3000) and `study` (port 4410).
2. Map the page to the study's link: Home `#home`, Projects `#projects`, a project `?project=<slug>#project`,
   Timeline `#timeline` (add `?filters=open` for the modal), About `#about`, a role or degree
   `?record=<id>#record`. Add `.desktop` or `.mobile`, and `theme=dark` / `lang=pt` as needed.
3. Delegate the comparison to the **design-reviewer** agent with the two URLs, or for a quick check, take matching
   screenshots at 1280 and 390 wide and compare them yourself.
4. Show Tiago the screenshots side by side and list the differences, most visible first. Fix only what Tiago agrees
   with; if the study itself should change, update `docs/study/src/study-src.html`, rebuild with
   `python3 docs/study/src/build.py`, and log the decision.
