---
name: verify
description: Runs every check on the portfolio (typecheck, lint, tests, build, end-to-end and accessibility) and a smoke pass of the built pages, then reports pass or fail. Use before saying any change works, and at the end of every phase.
---

# Verify

1. Delegate to the **qa-runner** agent (`.claude/agents/qa-runner.md`) and wait for its report. If the change was
   visible, also ask the **design-reviewer** agent to compare the affected pages with the study.
2. Relay the result to Tiago in plain words: what passed, what failed and why, and what you'll fix. Don't call
   something done while a check fails; say so plainly with the output.
3. If everything passes and the work finishes a phase, update its status in `docs/PLAN.md`.
