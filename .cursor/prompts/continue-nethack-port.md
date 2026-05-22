# Repeatable prompt — NetHack 5.0 C→JS port (Teleport fork)

Use this file when you want a **new agent session** to continue the port without re-explaining context.

---

## Autonomous agent workflow (follow in order)

1. Read **[`.cursor/reports/c-to-js-port-current.md`](../reports/c-to-js-port-current.md)** — authoritative **next steps**, **last slice**, and contest constraints.
2. Skim **[`.cursor/reports/c-to-js-port-remaining.md`](../reports/c-to-js-port-remaining.md)** — **gap inventory** (what is still stub/harness/partial). Use it to avoid duplicating work or to pick a slice if `current` is ambiguous.
3. Open the relevant **C** under `nethack-c/upstream/` (init submodule if empty: `git submodule update --init nethack-c/upstream`). Port **semantics and call/RNG order**, not public session JSON. See **`.cursor/rules/port-from-c-not-score.mdc`** — score is regression-only; do not add fastforward/harness rows to chase 1/44.
4. Implement the **smallest meaningful slice** in `js/` (respect **`teleport-js-port.mdc`**: ES modules, `rng.js`, clang evaluation order).
5. **Never edit** frozen harness files: `js/isaac64.js`, `js/terminal.js`, `js/storage.js`.
6. After shipping:
   - Append **one row** to **[`c-to-js-port-changelog-archive.md`](../reports/c-to-js-port-changelog-archive.md)**.
   - Refresh **`c-to-js-port-current.md`** (last slice + next steps).
   - Run **`npm run score`** when behavior touches **RNG or screens** (or when unsure) — **regression only**; fixing a red session by replay bytes without C port is out of scope.
7. **`git commit`** — create **one commit per meaningful slice** (port code, docs handoff, or both together if tightly coupled). Message: repo style (`feat(js):`, `fix(js):`, `docs(port):`, …); focus on **why** the change matches C or unblocks parity. Do not bundle unrelated work; do not skip hooks.

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

- Prefer **`c-to-js-port-current.md`** ordering — it reflects the latest firefighting.
- If priorities drift, use **§5 “Suggested ordering”** in **`c-to-js-port-remaining.md`** (fastforward → invent/mkobj → real movemon → moveloop_aux → commands → combat → branches → save/display).
- Harness peels (**`fastforward.js`**, **`monmove.js`**): only remove replay rows when **measured** per-path RNG consumption matches C; do not “trim” from session guesswork. Do not add harness/FF rows to improve score without porting the C call site (see **`port-from-c-not-score.mdc`**).
