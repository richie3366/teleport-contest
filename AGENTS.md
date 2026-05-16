# Agent notes (Teleport fork)

This repository is a **Teleport Coding Challenge** fork: port NetHack 5.0 to JavaScript with behavior matching the official C recorder (see `README.md` and `docs/API.md`).

**Start here:** [.cursor/README.md](.cursor/README.md) lists Cursor rules under `.cursor/rules/` and links to canonical docs.

**Port handoff (agents):** [.cursor/reports/c-to-js-port-current.md](.cursor/reports/c-to-js-port-current.md) — read this first for next steps; use [.cursor/reports/c-to-js-port-progress.md](.cursor/reports/c-to-js-port-progress.md) only when you need the full parity report.

**Do not edit** contest-frozen harness files (the judge overlays them): `js/isaac64.js`, `js/terminal.js`, `js/storage.js`.

**C reference** lives in the submodule `nethack-c/upstream/` (NetHack 5.0.0 release tag). Initialize it with `git submodule update --init nethack-c/upstream` before deep work in that tree.
