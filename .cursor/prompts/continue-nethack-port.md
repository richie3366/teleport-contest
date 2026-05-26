# Repeatable prompt — NetHack 5.0 C→JS port (Teleport fork)

Use this file when you want a **new agent session** to continue the port without re-explaining context.

---

## Autonomous agent workflow (follow in order)

1. Read **[`.cursor/reports/c-to-js-port-current.md`](../reports/c-to-js-port-current.md)** — authoritative **next steps**, **last slice**, and contest constraints.
2. Check **[`docs/plans/tutorial-port-gate.md`](../../docs/plans/tutorial-port-gate.md)** — if **all MD-1 … MD-7** are satisfied, **Lane E (tutorial)** is the primary lane ([`10-tutorial.md`](../plans/nethack-port/10-tutorial.md)); otherwise prefer slices that close an open MD-* while following `current` next steps.
3. Skim **[`.cursor/reports/c-to-js-port-remaining.md`](../reports/c-to-js-port-remaining.md)** — **gap inventory** (what is still stub/harness/partial). Use it to avoid duplicating work or to pick a slice if `current` is ambiguous. Optionally refresh **[`c-to-js-port-dashboard.md`](../reports/c-to-js-port-dashboard.md)** after large milestones: `node tools/port-score-snapshot.mjs --update-dashboard`.
4. Open the relevant **C** under `nethack-c/upstream/` (init submodule if empty: `git submodule update --init nethack-c/upstream`). Port **semantics and call/RNG order**, not public session JSON. See **`.cursor/rules/port-from-c-not-score.mdc`** — score is regression-only; do not add fastforward/harness rows to chase 1/44.
5. Implement the **smallest meaningful slice** in `js/` (respect **`teleport-js-port.mdc`**: ES modules, `rng.js`, clang evaluation order).
6. **Never edit** frozen harness files: `js/isaac64.js`, `js/terminal.js`, `js/storage.js`.
7. After shipping:
   - Append **one row** to **[`c-to-js-port-changelog-archive.md`](../reports/c-to-js-port-changelog-archive.md)**.
   - Refresh **`c-to-js-port-current.md`** (last slice + next steps).
   - Run **`npm run score`** when behavior touches **RNG or screens** (or when unsure) — **regression only**; fixing a red session by replay bytes without C port is out of scope.
8. **`git commit` (required every slice — do not wait for the user to ask)** — after step 7, **`git add` + `git commit`** before ending the session. One commit per meaningful slice; include **all** artifacts from that slice:
   - `js/` port code
   - **`.cursor/reports/`** handoff (`c-to-js-port-current.md`, one changelog row)
   - **`tools/`** or **`scripts/`** helpers you added or changed for the slice
   - **`.cursor/rules/`** or **`.cursor/prompts/`** when you add workflow rules
   Message: repo style (`feat(js):`, `fix(js):`, `docs(port):`, `chore(tools):`, …); focus on **why** (C parity / peel / regression). Do not leave a green `npm run score` sitting uncommitted. Do not skip hooks.

---

## Canonical prompt (copy this each session)

```
Continue the NetHack 5.0 C→JS port: read .cursor/reports/c-to-js-port-current.md, skim .cursor/reports/c-to-js-port-remaining.md for scope, then do the top next step from current (port from nethack-c/upstream C only; follow .cursor/rules/port-from-c-not-score.mdc — score is regression-only, no fastforward/harness score-chasing; do not tune to the 44 public sessions; do not edit js/isaac64.js, js/terminal.js, js/storage.js). When done: update c-to-js-port-current.md, append one row to c-to-js-port-changelog-archive.md, run npm run score if RNG/screens may change, then git commit this slice (one meaningful commit; conventional message).
```

---

## Shorter variant (if context window is tight)

```
Continue port: .cursor/reports/c-to-js-port-current.md + skim c-to-js-port-remaining.md; top next step; C upstream only; frozen isaac64/terminal/storage untouched; then refresh current + changelog row + npm run score if needed + git commit the slice.
```

---

## When stuck or choosing between slices

- Prefer **[`c-to-js-port-current.md`](../reports/c-to-js-port-current.md)** — especially the **Priority matrix** and **Next steps (aligned with matrix)**.
- **Tutorial:** [`docs/plans/tutorial-port-gate.md`](../../docs/plans/tutorial-port-gate.md) — do not start Lane E until **MD-1 … MD-7** pass; when open, tutorial overrides other lanes.
- Gap inventory **§5** in [`c-to-js-port-remaining.md`](../reports/c-to-js-port-remaining.md) lists C milestones (chargen → invent/mkobj → movemon → … → branches/Lua → **tutorial when gated**).
- NHL-only ordering: [`nhl-port-notes.md`](../reports/nhl-port-notes.md) § *Methodical ordering (NHL lane only)*.
- Harness peels (**`fastforward.js`**, **`monmove.js`**): only remove replay rows when **measured** per-path RNG consumption matches C; do not “trim” from session guesswork. Do not add harness/FF rows to improve score without porting the C call site (see **`port-from-c-not-score.mdc`**).
