# NetHack C→JS — **batch port workflow**

**Purpose:** Faster iteration without **score-chasing** or **full `npm run score` after every line change. This complements (does not replace) [`.cursor/rules/port-from-c-not-score.mdc`](../rules/port-from-c-not-score.mdc).

**Read first each session:** [`.cursor/reports/c-to-js-port-current.md`](c-to-js-port-current.md) (next C milestone). **Inventory:** [`.cursor/reports/c-to-js-port-function-checklist.md`](c-to-js-port-function-checklist.md). **Domain gaps:** [`.cursor/reports/c-to-js-port-remaining.md`](c-to-js-port-remaining.md).

---

## What we optimize for

| Optimize | De-emphasize |
|----------|----------------|
| C call order and RNG at real call sites | Passing another public session by replay bytes |
| One **C file** or **call graph** per slice (several related functions) | Fixing a single RNG index without reading C |
| Targeted checks before commit | Full 44-session score after every edit |
| **`npm run score` at milestones** | “Port everything, then score once” |

**Why not score only at the end:** RNG parity is **global**. Two locally “correct” functions can still diverge at index 2358 because an upstream path consumed an extra `rn2(100)`. Late integration turns one localized bug into a repo-wide binary search.

---

## Workflow (each agent session)

### 1. Pick a batch (not a session)

1. Read **`c-to-js-port-current.md`** → top **Next step** / milestone.
2. Open the matching rows in **`c-to-js-port-function-checklist.md`** (same C file or call chain).
3. Skim **`c-to-js-port-remaining.md`** §3 for domain context.
4. Use a **failing public session only as a locator** (“RNG diverges in mklev/mkobj”) → then read **`nethack-c/upstream/`** — never paste session JSON into code.

**Batch size:** Prefer **one C compilation unit** or one **obvious call graph** (e.g. `mktrap_victim` + `curse` + `breaktest` + `mkobj` possession loop), typically **~3–15** related functions. Not one function × 200 commits; not the entire upstream tree in one PR.

### 2. Port from C

- Open the **C function(s)** in `nethack-c/upstream/src/` (submodule: `git submodule update --init nethack-c/upstream`).
- Optional navigation: `graphify query "…" --graph nethack-c/graphify-out/graph.json` (see [`.cursor/docs/graphify.md`](../docs/graphify.md); `npm run graphify:c` on first clone).
- Port **control flow, flags, and RNG order** into existing `js/` modules (extend before inventing parallel files).
- **Do not edit** frozen: `js/isaac64.js`, `js/terminal.js`, `js/storage.js`.
- **Do not** grow `fastforward.js` / `monmove.js` harness rows without the matching C call site.

### 3. Verify the batch (fast, before commit)

Use **one or more** of these — in order of usefulness:

| Check | When | Command / action |
|-------|------|------------------|
| **RNG window** | Batch touches `rn2`/`rnd`/`rne` | `node tools/diag_rng_window.mjs sessions/<session>.session.json <start> <end>` — session chosen only to **exercise this subsystem** |
| **Narrow score** | Optional; same locator session | Run harness for **one** session if cheap in your environment |
| **Unit-style** | Pure helpers only (`depth`, material macros, parsers) | Small `node --input-type=module -e '…'` or a `tools/` script — **not** a substitute for integrated RNG when the function reads `game` / `in_mklev` |
| **Lint** | Always cheap | Editor / `read_lints` on touched `js/` files |

**Do not** require **44/44** before commit. **Do** require that you did not knowingly add harness/score-chasing bytes.

### 4. Update docs + commit (local)

1. Mark batch rows **`partial`** or **`done`** in **`c-to-js-port-function-checklist.md`**.
2. Refresh **`c-to-js-port-current.md`** (last slice + next batch).
3. Append **one row** to **`c-to-js-port-changelog-archive.md`**.
4. **`git commit`** — one commit per meaningful batch (conventional message; **why** = C parity).
5. **Push** when you want CI / shared backup — not required every batch.
6. Optional: `npm run graphify:js` after `js/` edits (local cache; gitignored).

### 5. Milestone: full regression

Run **`npm run score`** when:

- A **milestone** in [`c-to-js-port-remaining.md`](c-to-js-port-remaining.md) §5 closes (e.g. mkobj tail, `ini_inv`, moveloop tail peel),
- The batch touched **RNG or screens** and you are unsure,
- Before declaring a lane “stable” or updating the dashboard,
- The user explicitly asks for a score check.

On regression: **fix or revert** the batch that broke anchors (e.g. `seed8000`, `seed0077`); do not “fix” by session memorization.

Refresh dashboard optionally: `node tools/port-score-snapshot.mjs --update-dashboard`.

### 6. Integration pass (late)

After large checklist areas move to **`done`**, expect a dedicated phase:

- Full **`npm run score`**
- Screen/cursor forks (botl, map, legacy tty)
- Peel remaining **`monmove`** / **`moveloop_aux`** harness with **measured** RNG per path

---

## Anti-patterns

- **Big bang:** port 50 files, run score once, debug blind.
- **Session as spec:** copy draws from `sessions/*.session.json` into `fastforward.js` or stubs.
- **Per-function “return value” tests** for `mkobj` / `dochug` without PRNG stream position — misleading green.
- **Score every commit** when working through a checklist table — use milestones instead.
- **Ignoring regressions** on canary sessions after a milestone score.

---

## Canary sessions (locators, not targets)

| Session | Typical use |
|---------|-------------|
| `seed8000-tourist-starter` | Short startup / moveloop / OPTIONS fast path |
| `seed0077-rogue-chargen` | Chargen / tty |
| `seed0900-tourist-explore-actions` | mklev / mkobj / early explore |
| `seed0006-wizard-water-demon` | moveloop / `dochug` / capital `K` |

When a milestone score fails, use **`diag_rng_window.mjs`** at the reported index, then **`rg` in upstream** for that draw shape (`rn2(100)`, `rnd(1000)`, …).

---

## Related documents

| Document | Role |
|----------|------|
| [`c-to-js-port-function-checklist.md`](c-to-js-port-function-checklist.md) | Function-level **done / partial / stub** tracker |
| [`c-to-js-port-current.md`](c-to-js-port-current.md) | Thin handoff — **which batch next** |
| [`c-to-js-port-remaining.md`](c-to-js-port-remaining.md) | Domain gap narrative + §5 milestones |
| [`.cursor/prompts/continue-nethack-port.md`](../prompts/continue-nethack-port.md) | Repeatable agent prompt (batch variant) |
| [`.cursor/rules/port-from-c-not-score.mdc`](../rules/port-from-c-not-score.mdc) | Always-on integrity rule |
