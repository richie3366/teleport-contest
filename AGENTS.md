# Agent notes (Teleport fork)

This repository is a **Teleport Coding Challenge** fork: port NetHack 5.0 to JavaScript with behavior matching the official C recorder (see `README.md` and `docs/API.md`).

**Start here:** [.cursor/README.md](.cursor/README.md) lists Cursor rules under `.cursor/rules/` and links to canonical docs.

**Port handoff (agents):** [.cursor/reports/c-to-js-port-current.md](.cursor/reports/c-to-js-port-current.md) — read this first for next steps; skim [.cursor/reports/c-to-js-port-remaining.md](.cursor/reports/c-to-js-port-remaining.md) for what is still unported; use [.cursor/reports/c-to-js-port-progress.md](.cursor/reports/c-to-js-port-progress.md) only when you need the full parity report.

**Repeatable “continue port” prompt (copy each session; includes commit-per-slice):** [.cursor/prompts/continue-nethack-port.md](.cursor/prompts/continue-nethack-port.md)

**Port from C, not score-chasing:** always-on rule [.cursor/rules/port-from-c-not-score.mdc](.cursor/rules/port-from-c-not-score.mdc) — implement `nethack-c/upstream/` semantics; use `npm run score` as a regression check only; do not grow `fastforward.js` / harness without matching C call sites.

**Do not edit** contest-frozen harness files (the judge overlays them): `js/isaac64.js`, `js/terminal.js`, `js/storage.js`.

**C reference** lives in the submodule `nethack-c/upstream/` (NetHack 5.0.0 release tag). Initialize it with `git submodule update --init nethack-c/upstream` before deep work in that tree.

**Finding C in tools:** `nethack-c/upstream` is a nested repository, so IDE **Glob** / default workspace **code search** may skip it even when present. Prefer **`read_file`** on paths under that directory, **terminal `rg`/`grep`** with an explicit path (e.g. `rg pattern nethack-c/upstream/include`), or `rg --no-ignore-vcs`. Same reminder lives in **`.cursor/rules/teleport-contest.mdc`** (always applied).
