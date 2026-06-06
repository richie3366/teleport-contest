# Repeatable prompt — NetHack 5.0 C→JS port (Teleport fork)

Use this file when you want a **new agent session** to continue the port without re-explaining context.

**Default workflow:** [**batch port**](.cursor/reports/c-to-js-port-batch-workflow.md) — function checklist + C-file batches + milestone scoring (not full `npm run score` every edit).

---

## Autonomous agent workflow (follow in order)

1. Read **[`.cursor/reports/c-to-js-port-current.md`](../reports/c-to-js-port-current.md)** — authoritative **next batch / milestone**, **last slice**, and contest constraints. Skim **[agent playbook](../reports/c-to-js-port-agent-playbook.md)** for tool choice and known pitfalls.
2. Check **[`docs/plans/tutorial-port-gate.md`](../../docs/plans/tutorial-port-gate.md)** — if **all MD-1 … MD-7** are satisfied, **Lane E (tutorial)** is the primary lane ([`10-tutorial.md`](../plans/nethack-port/10-tutorial.md)); otherwise follow `current` next steps.
3. Open **[`.cursor/reports/c-to-js-port-function-checklist.md`](../reports/c-to-js-port-function-checklist.md)** — pick the **next batch** (rows in one C file or call graph; status **stub** / **partial**). Skim **[`.cursor/reports/c-to-js-port-remaining.md`](../reports/c-to-js-port-remaining.md)** for domain context. Follow **[`c-to-js-port-batch-workflow.md`](../reports/c-to-js-port-batch-workflow.md)** for verify/commit/score cadence.
4. Open the relevant **C** under `nethack-c/upstream/` (init submodule if empty: `git submodule update --init nethack-c/upstream`). At **batch start**, use **graphify** `query` / `path` to map C symbols → JS (`npm run graphify:c` once if missing). Port **semantics and call/RNG order** for the **whole batch**, not public session JSON. See **`.cursor/rules/port-from-c-not-score.mdc`** — score is regression-only; do not add fastforward/harness rows to chase 1/44.
5. Implement the batch in `js/` (respect **`teleport-js-port.mdc`**: ES modules, `rng.js`, clang evaluation order). For JS wiring / C↔JS mapping, prefer `graphify query` / `path` with `--graph` per **[`.cursor/docs/graphify.md`](../docs/graphify.md)** (split JS / C / merged graphs — never `graphify update .` on repo root). For **RNG/moveloop order** bugs, use **[agent playbook](../reports/c-to-js-port-agent-playbook.md)** (`diag_rng_window`, `diag_prefix_rng`, read C) — not graphify.
6. **Never edit** frozen harness files: `js/isaac64.js`, `js/terminal.js`, `js/storage.js`.
7. **Fast verify (before commit):** `node tools/diag_rng_window.mjs sessions/<locator>.session.json <start> <end>` when the batch touches RNG; `diag_prefix_rng.mjs` for moveloop timing; canary `seed8000` 2900–3129 after `monmove` edits. **Full `npm run score`** at **milestones** — not after every function. See [**batch workflow** §3](../reports/c-to-js-port-batch-workflow.md).
8. **Ship the batch:**
   - Update **`c-to-js-port-function-checklist.md`** row statuses.
   - Append **one row** to **[`c-to-js-port-changelog-archive.md`](../reports/c-to-js-port-changelog-archive.md)**.
   - Refresh **`c-to-js-port-current.md`** (last slice + next batch).
   - Optionally refresh **[`c-to-js-port-dashboard.md`](../reports/c-to-js-port-dashboard.md)** after a milestone score: `node tools/port-score-snapshot.mjs --update-dashboard`.
9. **Refresh local code graph (optional, cheap):** `npm run graphify:js` after `js/` edits (~5–15s). See **[`.cursor/docs/graphify.md`](../docs/graphify.md)**.
10. **`git commit` (required every batch — do not wait for the user to ask)** — `git add` + `git commit` before ending the session. One commit per meaningful batch; include `js/`, `.cursor/reports/`, `tools/` as needed. Conventional message; focus on **why** (C parity). Push when the user wants CI — not required every batch. Do **not** commit `graphify-out/` trees (gitignored).

---

## Canonical prompt — **batch workflow** (preferred)

```
Continue NetHack 5.0 C→JS using the batch port workflow: read .cursor/reports/c-to-js-port-current.md and .cursor/reports/c-to-js-port-batch-workflow.md; pick the next batch from .cursor/reports/c-to-js-port-function-checklist.md (port from nethack-c/upstream C only; follow port-from-c-not-score.mdc; do not edit js/isaac64.js, js/terminal.js, js/storage.js). Use graphify (--graph per .cursor/docs/graphify.md) for C/JS call-graph navigation; npm run graphify:js after js edits. Fast-verify the batch (diag_rng_window when RNG changes); npm run score only at milestones or when unsure. When done: update checklist + c-to-js-port-current.md + one changelog row; git commit this batch (no push unless asked).
```

---

## Canonical prompt — **legacy / tight** (score every slice)

```
Continue the NetHack 5.0 C→JS port: read .cursor/reports/c-to-js-port-current.md, skim .cursor/reports/c-to-js-port-remaining.md for scope, then do the top next step from current (port from nethack-c/upstream C only; follow .cursor/rules/port-from-c-not-score.mdc — score is regression-only, no fastforward/harness score-chasing; do not tune to the 44 public sessions; do not edit js/isaac64.js, js/terminal.js, js/storage.js). When done: update c-to-js-port-current.md, append one row to c-to-js-port-changelog-archive.md, run npm run score if RNG/screens may change, then git commit this slice (one meaningful commit; conventional message).
```

---

## Shorter variant (batch)

```
Continue port (batch workflow): current.md + function-checklist.md next batch; C upstream only; graphify per .cursor/docs/graphify.md; frozen isaac64/terminal/storage untouched; diag_rng_window if RNG; milestone npm run score; graphify:js if js changed; commit batch; update checklist + current + changelog.
```

---

## When stuck or choosing between batches

- Prefer **[`c-to-js-port-current.md`](../reports/c-to-js-port-current.md)** — **Priority matrix** and **Next steps**.
- **[`c-to-js-port-batch-workflow.md`](../reports/c-to-js-port-batch-workflow.md)** — anti-patterns (big-bang score, per-function false greens).
- **Tutorial:** [`docs/plans/tutorial-port-gate.md`](../../docs/plans/tutorial-port-gate.md) — Lane E only when **MD-1 … MD-7** pass.
- Gap narrative **§5** in [`c-to-js-port-remaining.md`](../reports/c-to-js-port-remaining.md) — C milestones (chargen → mkobj → movemon → …).
- NHL-only ordering: [`nhl-port-notes.md`](../reports/nhl-port-notes.md).
- Harness peels: only when **measured** per-path RNG matches C; see **`port-from-c-not-score.mdc`**.
- **Code graphs:** [`.cursor/docs/graphify.md`](../docs/graphify.md) — `graphify query` / `path` on `js/graphify-out/`, `nethack-c/graphify-out/`, or merged `graphify-out/`; `npm run graphify:js` / `graphify:c` / `graphify:all`.
