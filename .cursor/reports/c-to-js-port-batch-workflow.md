# NetHack C→JS — **batch port workflow**

**Purpose:** Faster iteration without **score-chasing** or **full `npm run score` after every line change. This complements (does not replace) [`.cursor/rules/port-from-c-not-score.mdc`](../rules/port-from-c-not-score.mdc).

**Strategy:** [`.cursor/reports/c-to-js-port-strategy.md`](c-to-js-port-strategy.md). **Next batch:** [`.cursor/reports/c-to-js-port-current.md`](c-to-js-port-current.md). **Oracles:** [`c-oracles/`](c-oracles/). **Gate:** `bash tools/port-batch-gate.sh`. **Checklist:** [`.cursor/reports/c-to-js-port-function-checklist.md`](c-to-js-port-function-checklist.md).

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
- **Navigate (batch start):** `graphify query` / `path` on split graphs — see [agent playbook](c-to-js-port-agent-playbook.md) § Tool picker and [`.cursor/docs/graphify.md`](../docs/graphify.md) (`npm run graphify:c` on first clone).
- **Debug RNG order (mid-batch):** `diag_rng_window.mjs`, `diag_prefix_rng.mjs`, read C — not graphify.
- Port **control flow, flags, and RNG order** into existing `js/` modules (extend before inventing parallel files).
- **Do not edit** frozen: `js/isaac64.js`, `js/terminal.js`, `js/storage.js`.
- **Do not** grow `fastforward.js` / `monmove.js` harness rows without the matching C call site.

### 3. Verify the batch (fast, before commit)

Use **one or more** of these — in order of usefulness:

| Check | When | Command / action |
|-------|------|------------------|
| **RNG window** | Batch touches `rn2`/`rnd`/`rne` | `node tools/diag_rng_window.mjs sessions/<session>.session.json <start> <end>` — session chosen only to **exercise this subsystem** |
| **Move prefix** | Moveloop timing (“which key owns index N?”) | `node tools/diag_prefix_rng.mjs sessions/<session>.session.json <movePrefixLen>` |
| **Canary regression** | Touched `monmove` / moveloop | `node tools/diag_rng_window.mjs sessions/seed8000-tourist-starter.session.json 2900 3129` |
| **Narrow score** | Optional; same locator session | Run harness for **one** session if cheap in your environment |
| **Unit-style** | Pure helpers only (`depth`, material macros, parsers) | Small `node --input-type=module -e '…'` or a `tools/` script — **not** a substitute for integrated RNG when the function reads `game` / `in_mklev` |
| **Lint** | Always cheap | Editor / `read_lints` on touched `js/` files |

**Do not** require **44/44** before commit. **Do** require that you did not knowingly add harness/score-chasing bytes.

### 4. Update docs + commit (local)

1. Mark batch rows **`partial`** or **`done`** in **`c-to-js-port-function-checklist.md`**.
2. Refresh **`c-to-js-port-current.md`** (last slice + next batch).
3. Append **one row** to **`c-to-js-port-changelog-archive.md`**.
4. **`bash tools/port-batch-gate.sh`** — peel moratorium (required if `js/` changed).
5. **`git commit`** — one commit per meaningful batch (conventional message; **why** = C parity).
6. **Push** when you want CI / shared backup — not required every batch.
7. Optional: `npm run graphify:js` after `js/` edits (local cache; gitignored).

### 5. Milestone: full regression

Run **`npm run score`** when:

- A **milestone** in [`c-to-js-port-remaining.md`](c-to-js-port-remaining.md) §5 closes (e.g. mkobj tail, `ini_inv`, moveloop tail peel),
- The batch touched **RNG or screens** and you are unsure,
- Before declaring a lane “stable” or updating the dashboard,
- The user explicitly asks for a score check.

On regression: **fix or revert** the batch that broke anchors; do not “fix” by session memorization. **Moveloop edits:** always fast-verify **all three** regression canaries in [`c-to-js-port-current.md`](c-to-js-port-current.md) § Moveloop regression canaries — not `seed8000` alone.

Refresh dashboard optionally: `node tools/port-score-snapshot.mjs --update-dashboard`.

### 6. Integration pass (late)

After large checklist areas move to **`done`**, expect a dedicated phase:

- Full **`npm run score`**
- Screen/cursor forks (botl, map, legacy tty)
- Peel remaining **`monmove`** / **`moveloop_aux`** harness with **measured** RNG per path

---

## Strategy: peel debt vs general C

**“Perfect” here** = bit-exact PRNG + 24×80 screens on **all 88** sessions (44 held-out). That requires matching **C call order**, not public session JSON. Local RNG windows (e.g. `seed0006` 3035–3053) are milestones, not the finish line.

| Approach | Good for | Bad as end state |
|----------|----------|------------------|
| **C batch + `diag_rng_window`** (this workflow) | Integrity, held-out sessions, finding drift | — |
| **Path-first peels** (`_*LikeC` flags, comma-`U` geometry) | Narrowing moveloop RNG when `fmon`/`dochug` still stubby | Permanent architecture |
| **Explicit RNG draws** (e.g. `rn2(3); rn2(12)×3` without full `mfndpos`) | C-faithful draw **order** when neighbor loop order differs | Unmarked debt — note in changelog |
| **Session memorization / fat `fastforward`** | Short-term public score | Held-out failure; contest rules forbid |
| **Big-bang port + score once** | Writing lots of code fast | Blind RNG binary search |
| **Transpilation** (contest “transpiled” category) | Coverage | Bit-exact PRNG order still hard; different tradeoff |

**Efficiency lever (after early moveloop):** prefer batches that **delete** harness surface, not add it.

- **Favor:** general `dochug` / `fmon` order, one C file done right, peel removed when real path consumes same draws.
- **Accept temporarily:** path-shaped batches when locator shows peel is the only honest next slice — but log **debt** in checklist notes.
- **Shift away from peels when:** the next 3+ batches would only add `g.context._…` flags or explicit draws; invest in the **subsystem** (`dogmove.c` pick loop, `monmove.c` `movemon`, `mkobj`, chargen) instead.

**Scaffolding rules** (also in [`.cursor/rules/teleport-js-port.mdc`](../rules/teleport-js-port.mdc)):

- `fastforward.js`, `monmove.js` `_HARNESS`, and peel flags are **bridges** — grow only with a mapped C call site; shrink when `diag_rng_window` passes without them.
- A batch that widens a locator window but adds **no** general C semantics is a **last resort**, not the default pick from checklist.

---

## Anti-patterns

- **Big bang:** port 50 files, run score once, debug blind.
- **Session as spec:** copy draws from `sessions/*.session.json` into `fastforward.js` or stubs.
- **Per-function “return value” tests** for `mkobj` / `dochug` without PRNG stream position — misleading green.
- **Score every commit** when working through a checklist table — use milestones instead.
- **Ignoring regressions** on canary sessions after a milestone score.

---

## Canary sessions

### Moveloop regression (mandatory after `monmove` / `dogmove` / `moveloop_*` edits)

| Session | Fast-verify window |
|---------|-------------------|
| `seed8000-tourist-starter` | RNG **2900–3129** |
| `seed0077-rogue-chargen` | RNG **3180–3242**; screen step **17** (`diag_first_screen_fail.mjs`) |
| `seed0102-ranger-name-cancel` | full session (PASS anchor) |

### Locators (pick batch; not required every commit)

| Session | Typical use |
|---------|-------------|
| `seed0006-wizard-water-demon` | Deep moveloop / comma-`U` / `dochug` geometry |
| `seed0900-tourist-explore-actions` | mklev / mkobj / early explore + pet moveloop |

When a milestone score fails, use **`diag_rng_window.mjs`** at the reported index, then **`rg` in upstream** for that draw shape (`rn2(100)`, `rnd(1000)`, …).

---

## Related documents

| Document | Role |
|----------|------|
| [`c-to-js-port-agent-playbook.md`](c-to-js-port-agent-playbook.md) | **Tool picker**, moveloop debug loop, known pitfalls |
| [`c-to-js-port-function-checklist.md`](c-to-js-port-function-checklist.md) | Function-level **done / partial / stub** tracker |
| [`c-to-js-port-current.md`](c-to-js-port-current.md) | Thin handoff — **which batch next** |
| [`c-to-js-port-remaining.md`](c-to-js-port-remaining.md) | Domain gap narrative + §5 milestones |
| [`.cursor/prompts/continue-nethack-port.md`](../prompts/continue-nethack-port.md) | Repeatable agent prompt (batch variant) |
| [`.cursor/rules/port-from-c-not-score.mdc`](../rules/port-from-c-not-score.mdc) | Always-on integrity rule |
