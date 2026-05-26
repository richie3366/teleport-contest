# Agent notes (Teleport fork)

This repository is a **Teleport Coding Challenge** fork: port NetHack 5.0 to JavaScript with behavior matching the official C recorder (see `README.md` and `docs/API.md`).

**Start here:** [.cursor/README.md](.cursor/README.md) lists Cursor rules under `.cursor/rules/` and links to canonical docs.

**Port handoff (agents):** [.cursor/reports/c-to-js-port-current.md](.cursor/reports/c-to-js-port-current.md) — read this first for next steps; skim [.cursor/reports/c-to-js-port-remaining.md](.cursor/reports/c-to-js-port-remaining.md) for what is still unported; use [.cursor/reports/c-to-js-port-progress.md](.cursor/reports/c-to-js-port-progress.md) only when you need the full parity report.

**Tutorial gate:** [docs/plans/tutorial-port-gate.md](docs/plans/tutorial-port-gate.md) — mandatory dependencies (**MD-1 … MD-7**). When all are satisfied, **Lane E (tutorial)** becomes the primary port lane until [`.cursor/plans/nethack-port/10-tutorial.md`](.cursor/plans/nethack-port/10-tutorial.md) exit criteria.

**Repeatable “continue port” prompt (copy each session; includes commit-per-slice):** [.cursor/prompts/continue-nethack-port.md](.cursor/prompts/continue-nethack-port.md)

**Git:** commit **each meaningful slice** before ending a session (port code, `.cursor/reports/` handoff, `tools/`/`scripts/` changes) — do not wait for the user to ask; see step 7 in the continue-port prompt.

**GitHub Actions on your fork:** the template ships [`.github/workflows/score.yml`](.github/workflows/score.yml) for per-push scoring. New forks often have Actions disabled until you turn them on once under **Settings → Actions → General** (allow GitHub Actions). This does not affect the official judge, but it restores fast feedback on `main` pushes.

**Port from C, not score-chasing:** always-on rule [.cursor/rules/port-from-c-not-score.mdc](.cursor/rules/port-from-c-not-score.mdc) — implement `nethack-c/upstream/` semantics; use `npm run score` as a regression check only; do not grow `fastforward.js` / harness without matching C call sites.

**Do not edit** contest-frozen harness files (the judge overlays them): `js/isaac64.js`, `js/terminal.js`, `js/storage.js`.

**C reference** lives in the submodule `nethack-c/upstream/` (NetHack 5.0.0 release tag). Initialize it with `git submodule update --init nethack-c/upstream` before deep work in that tree.

**Finding C in tools:** `nethack-c/upstream` is a nested repository, so IDE **Glob** / default workspace **code search** may skip it even when present. Prefer **`read_file`** on paths under that directory, **terminal `rg`/`grep`** with an explicit path (e.g. `rg pattern nethack-c/upstream/include`), or `rg --no-ignore-vcs`. Same reminder lives in **`.cursor/rules/teleport-contest.mdc`** (always applied).
