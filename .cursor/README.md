# Cursor context for this fork

This directory holds **Cursor rules** (`.cursor/rules/*.mdc`) that steer agents toward a faithful NetHack 5.0 port and away from contest shortcuts. Canonical project documentation stays in the repo root and `docs/`.

## Rules at a glance

| Rule | When it applies |
|------|-----------------|
| `teleport-contest.mdc` | Always (`alwaysApply: true`) — contest contract, ethics, frozen files, sandbox. |
| `port-from-c-not-score.mdc` | Always — **port C first**; `npm run score` is regression-only; anti fastforward/harness score-chasing. |
| `teleport-js-port.mdc` | When editing files under `js/` — ES modules, RNG order, porting style. |
| `nethack-upstream-c.mdc` | When editing files under `nethack-c/upstream/` — C reference tree, tag, patches vs vanilla. |
| `nethack-port-progress.mdc` | When editing `js/` or `.cursor/reports/` — read `c-to-js-port-current.md` first; full progress + changelog archive when needed. |

## Read first (humans and agents)

- [.cursor/reports/c-to-js-port-current.md](reports/c-to-js-port-current.md) — **default for port work:** next batch, constraints.
- [.cursor/reports/c-to-js-port-batch-workflow.md](reports/c-to-js-port-batch-workflow.md) — **batch port workflow** (checklist → C batches → fast verify → milestone `npm run score`).
- [.cursor/reports/c-to-js-port-function-checklist.md](reports/c-to-js-port-function-checklist.md) — **function-level tracker** (stub / partial / done by C file).
- [.cursor/reports/c-to-js-port-dashboard.md](reports/c-to-js-port-dashboard.md) — **score table + milestones** (run `node tools/port-score-snapshot.mjs --update-dashboard` to refresh).
- [.cursor/reports/c-to-js-port-remaining.md](reports/c-to-js-port-remaining.md) — **gap inventory** (domain narrative; what is still stub / harness / missing vs C).
- [docs/plans/tutorial-port-gate.md](../docs/plans/tutorial-port-gate.md) — **tutorial gate** (MD-1 … MD-7); when all pass, **Lane E** is primary ([10-tutorial.md](plans/nethack-port/10-tutorial.md)).
- [.cursor/prompts/continue-nethack-port.md](prompts/continue-nethack-port.md) — **canonical repeatable prompt** + autonomous agent workflow for each session.

- [README.md](../README.md) — contest overview, skeleton layout, scoring, frozen files.
- [docs/API.md](../docs/API.md) — `runSegment`, sessions, PRNG and screen comparison.
- [docs/PHASES.md](../docs/PHASES.md) — two-phase contest mechanics.
- [nethack-c/README.md](../nethack-c/README.md) — recorder build, env vars, why clang.

## C upstream submodule

Reference C lives in `nethack-c/upstream/` (submodule: NetHack/NetHack, tag `NetHack-5.0.0_Release`). If that tree is empty, run:

```bash
git submodule update --init nethack-c/upstream
```

before relying on grep or reads under `nethack-c/upstream/`.
