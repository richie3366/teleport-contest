# Cursor context for this fork

This directory holds **Cursor rules** (`.cursor/rules/*.mdc`) that steer agents toward a faithful NetHack 5.0 port and away from contest shortcuts. Canonical project documentation stays in the repo root and `docs/`.

## Rules at a glance

| Rule | When it applies |
|------|-----------------|
| `teleport-contest.mdc` | Always (`alwaysApply: true`) — contest contract, ethics, frozen files, sandbox. |
| `teleport-js-port.mdc` | When editing files under `js/` — ES modules, RNG order, porting style. |
| `nethack-upstream-c.mdc` | When editing files under `nethack-c/upstream/` — C reference tree, tag, patches vs vanilla. |

## Read first (humans and agents)

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
