# NetHack C→JS port — **canonical strategy**

**Status:** adopted **2026-06-08** — supersedes ad-hoc peel chains as the default workflow.  
**Audience:** humans and autonomous agents (including `loop-nethack-port-agent.sh`).  
**Thin handoff:** [`c-to-js-port-current.md`](c-to-js-port-current.md) (next batch only). **This file** = durable methodology.

---

## 0. Human operator vs autonomous agent

**Operator (human) does only:**

- Run / stop [`tools/loop-nethack-port-agent.sh`](../../tools/loop-nethack-port-agent.sh) (or paste [`continue-nethack-port.md`](../prompts/continue-nethack-port.md) in chat).
- Occasional milestone `npm run score` or `node tools/port-score-snapshot.mjs --update-dashboard` when asked in handoff.
- **Not** expected to pick batches, read C, edit `js/`, or maintain peel/oracle docs.

**Agent (loop or chat) owns everything else:**

- Read **`c-to-js-port-current.md` next step #1** — obey it over habit.
- Port from **`nethack-c/upstream/`**; persist learning in **oracles**, **harness debt**, **checklist**, **changelog**.
- **Never** ask operator to run shell commands you can run (`diag_rng_window`, `port-batch-gate.sh`, `git commit`).
- **Never** recommend restarting the whole `js/` port — peel debt is localized; delete bands or interleave **P1 mkobj**.

**Loop contract:** each iteration = one batch, one commit, update handoff shelves. If last **3** commits were all comma-`U` peel deletes, **next must be P1 mkobj or dog_goal (C)** — see §9.

---

## 1. Thesis

| Do | Don't |
|----|--------|
| Port **C subsystems** (one function / call graph per batch) | Port **sessions** (next N RNG indices on `seed0006`) |
| **Shrink** scaffolding each milestone | Grow `_*LikeC` peel flags without deleting old ones |
| Persist learning in **oracle cards** + **harness debt ledger** | Rely on chat / agent transcript |
| Use public sessions as **locators** only | Treat session JSON as spec |
| Verify with **narrow RNG windows** + **3 canaries** | Run full `npm run score` every commit |

**Complete port** = upstream call order in plain JS, not a replay state machine per role/D:1/comma-`U`.

### Structure-first within batch (not big-bang)

**Good strategy:** port **C structure and call order** into JS **without** running full `npm run score` on every edit — then **debug that slice** using public recorded runs as **locators**, not as the implementation spec.

| Phase | What | Score? |
|-------|------|--------|
| **A — Port** | Read C; wire control flow, flags, data; update oracle | **No** full score |
| **B — Locate** | Pick **one** public session + RNG window that exercises this slice (`diag_rng_window`, `diag_prefix_rng`) | **No** full score |
| **C — Fix** | Align RNG at **named C call sites** until window passes; moveloop canaries if applicable | **No** full score |
| **D — Milestone** | `npm run score` (~every 5 batches or phase done) | **Yes** |

**Why not “translate everything, debug once at the end”:** RNG is a **single global chain**. A wrong draw in `mkobj` or chargen can surface hundreds of indices later in `movemon`. Late integration turns one upstream mistake into a whole-repo hunt — the peel-chain failure mode at scale.

**Public sessions are for phase B only:** they answer *where* parity broke (subsystem + index range), not *what* JS should do. Ground truth stays `nethack-c/upstream/`.

**When phase A can skip phase B until a later batch:** tables and plumbing with **no** `rn2`/`rnd`/`rne` on the exercised path (e.g. `otyp` maps, struct wiring). Anything that touches moveloop, `mkobj`, chargen menus, or `mklev` fill → **always** run phase B before commit.

**Phase B+ — C call sites (optional, high leverage):** the patched C recorder logs every PRNG draw with `@ caller(file:line)` in `NETHACK_RNGLOG` (stripped from public sessions). Tools: `scripts/record-session.mjs --save-rng-log`, `tools/diag_c_rng_callers.mjs`. Use to open the right upstream `.c` lines — **not** to replay RNG into JS.

**Do not** restart the whole `js/` port from scratch; moveloop debt is localized (peel deletion + optional strangler `movemon` core later).

---

## 2. The three layers (never confuse them)

```
┌─────────────────────────────────────────────────────────┐
│  Layer 1 — C truth (nethack-c/upstream/)                │
│  Ground truth: functions, flags, RNG at call sites      │
└───────────────────────────┬─────────────────────────────┘
                            │ port
┌───────────────────────────▼─────────────────────────────┐
│  Layer 2 — JS implementation (js/)                      │
│  Faithful control flow; checklist row → done            │
└───────────────────────────┬─────────────────────────────┘
                            │ temporary bridges
┌───────────────────────────▼─────────────────────────────┐
│  Layer 3 — Scaffolding (peels, explicit rn2, stubs)     │
│  MUST shrink over time — see harness debt ledger        │
└─────────────────────────────────────────────────────────┘
```

Layer 3 is **allowed** only when Layer 2 is not yet faithful **and** the batch records what C fact the peel encodes in an **oracle card** for later deletion.

---

## 3. Port unit = one C slice (batch definition)

**One batch** = one commit touching one **primary C anchor**:

- A **named function** in one `.c` file (e.g. `movemon`, `dochug`, `mksobj_init`), or
- One **dispatch arm** (e.g. `trapeffect_fire` hero path), or
- One **data pipeline** (e.g. `ini_inv` → `game.invent` for one role table)

**Not a batch:**

- “Post-twenty-fifth `movemon` peel for comma-`U`”
- “Align RNG 3610–3640 on `seed0006`” without naming the C function being ported
- Touching 5 JS files with only new `g.context._…` flags

**Phase order** when choosing the next C slice: [`c-to-js-port-remaining.md`](c-to-js-port-remaining.md) §5 and [`c-to-js-port-current.md`](c-to-js-port-current.md) § Reliability phases (**P1** … **P8**).

---

## 4. Context persistence (escape amnesia)

Chat and agent sessions are ephemeral. **Durable memory** lives only in these files:

| Shelf | Path | What to store |
|-------|------|----------------|
| **Next batch** | [`c-to-js-port-current.md`](c-to-js-port-current.md) | One-line last slice; **one** top next step; first fail index |
| **Reflection** | [`c-to-js-port-reflection.md`](c-to-js-port-reflection.md) | Last meta-review date; lane drift; next 3 batches (~every 5 commits) |
| **C oracles** | [`c-oracles/*.md`](c-oracles/) | Call order, RNG sites, peels-to-delete, wrong hypotheses |
| **Harness debt** | [`c-to-js-port-harness-debt.md`](c-to-js-port-harness-debt.md) | Peel counts, moratorium, deletion queue |
| **Symbol status** | [`c-to-js-port-function-checklist.md`](c-to-js-port-function-checklist.md) | stub / partial / done per C symbol |
| **History** | [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md) | One row per batch |

**Oracle rule:** Before adding a peel flag, add a row to the relevant **`c-oracles/<file>.md`** under “Peels to delete” with the **C equivalent** you intend to implement. If you cannot name the C equivalent, **stop** — read C first.

**Do not create** new `notes-*.md`, per-session agent files, or grow `AGENTS.md` with debug state.

---

## 5. Peel moratorium (enforced)

**Observed failure mode (2026-06):** 24+ numbered `seed0006` comma-`U` peels; `monmove.js` >5k lines; token burn with no general `movemon.c` closure.

### Forbidden (batch gate fails)

- New `_*CommaPost{Ordinal}*` / `_*PostTwenty*`** numbered peel flags** (e.g. twenty-fifth `movemon`) — see [`tools/port-batch-gate.sh`](../tools/port-batch-gate.sh)
- New `g.context._*Peel*` / `_*PendingLikeC` **without** oracle update + harness debt ledger update
- Batch that **only** widens a locator RNG window with **no** named C function ported

### Allowed peel work (narrow)

- Peel whose **purpose is deletion**: general code now passes the same `diag_rng_window` → **remove** peel in same or next batch
- Peel for **non-moveloop** locator with **≤2** role-specific guards and a checklist row pointing to C function

### Pivot triggers

If **any** is true, next batch **must not** add moveloop peels:

1. Last **3** commits each added peel flags only (check changelog)
2. Harness debt **net** increased (ledger)
3. `current.md` next step was another “PostNth” comma-`U` slice

**Then pick:** **P1** (`mkobj`/`ini_inv`) **or** **P2 general** (`movemon`/`dochug`/`fmon` from C) **or** delete ≥1 peel band with C-backed replacement.

---

## 6. Batch acceptance gate (before commit)

Run:

```bash
bash tools/port-batch-gate.sh
```

**Pass** requires:

1. **Gate script** — no forbidden peel patterns in staged `js/` diff
2. **Oracle** — if `js/monmove.js` / `moveloop_*.js` / `dogmove_mon.js` changed, relevant `c-oracles/*.md` touched **or** batch is peel **deletion** only
3. **Harness debt** — if peel flags added or removed, [`c-to-js-port-harness-debt.md`](c-to-js-port-harness-debt.md) counts updated
4. **Canaries** — after moveloop edits: `seed8000` 2900–3129, `seed0077` 3180–3242, `seed0102` full (see `current.md`)
5. **Handoff** — `current.md` + checklist + one changelog row

**Success metric** for a moveloop batch (prefer in order):

1. Checklist row closer to **done** with C function name
2. **Net −1** peel band (ledger)
3. Locator window widened **with** general C semantics (not flag-only)

---

## 7. Token economics

| Expensive (avoid) | Cheap (prefer) |
|-------------------|----------------|
| Read full `monmove.js` (~5k lines) every session | Read **C function** + **oracle** + graphify `path` to 1–3 JS files |
| Full `npm run score` (~35s × 44) every commit | `diag_rng_window` 20–40 indices |
| 10 peel commits in a row | 1 general C batch + 1 peel **deletion** |
| Re-derive C order from session JSON | Read oracle “wrong hypotheses” |
| `graphify update .` on repo root | `graphify query` on split graph |

**Read order each batch:**

1. `c-to-js-port-current.md` (next step)
2. `c-oracles/<c-file>.md` for this batch
3. C source (`nethack-c/upstream/src/…`)
4. JS via graphify `path`, not directory-wide grep in `monmove.js`

**Milestone score:** every **~5** batches, phase completion, or before declaring a lane stable — not per function.

---

## 8. Verification ladder

```
1. diag_rng_window.mjs  <locator>  <start>  <end>   # batch proof
2. Three moveloop canaries (if moveloop touched)    # regression
3. npm run score                                     # milestone only
```

Locator sessions (pick **one** per batch for (1)):

| Session | Use |
|---------|-----|
| `seed8000-tourist-starter` | Short moveloop |
| `seed0077-rogue-chargen` | Tutorial `#search` / west apport |
| `seed0102-ranger-name-cancel` | Full PASS anchor |
| `seed0006-wizard-water-demon` | Deep moveloop **locator only** — not regression-only |
| `seed0900-tourist-explore-actions` | mklev / mkobj / explore |

---

## 9. Interleave phases (reliable long path)

Do **not** moveloop-only until `monmove.js` debt drops. Suggested rhythm:

| Every N batches | Focus |
|-----------------|--------|
| 1–2 | **P2** — one `monmove.c` / `dogmove.c` function **or** delete one peel band |
| 1 | **P1** — `mkobj` / `ini_inv` / `game.invent` |
| optional | **P6** — one `lspo_*` / NHL binding when pausing moveloop |

**Tutorial (P7):** only after [tutorial port gate](../../docs/plans/tutorial-port-gate.md) **MD-1 … MD-7**.

---

## 10. Periodic self-reflection (not every batch)

**Purpose:** catch lane drift (peel marathon, score-chase, stale `current.md`) before it burns another 10 iterations. Chat is ephemeral — **write conclusions to the reflection shelf**.

**Shelf:** [`c-to-js-port-reflection.md`](c-to-js-port-reflection.md) (overwrite each pass; keep ≤1 screen).

### When to run

| Trigger | Run reflection? |
|---------|-----------------|
| Normal batch | **Skip** — port only |
| **≥5 commits** since `reflection.md` “Last run” date | **Yes** — before picking next batch |
| **Milestone score** (`npm run score` or dashboard refresh) | **Yes** — fold results into reflection |
| §5 **pivot trigger** (3 peel-only commits, debt up, stale PostNth step) | **Yes** — revise `current.md` next steps |
| Phase switch (e.g. P2 moveloop → P1 mkobj) | **Yes** — short pass |
| Gate fails twice / loop “stuck” | **Yes** — human may still only run `stop`; agent diagnoses |

**Do not** reflect every loop iteration — reflection is **~every 5 batches** or on triggers above.

### Checklist (agent asks itself)

1. **Lane:** Last 5 changelog rows — same subsystem? Peel-only? Checklist rows **done**?
2. **Debt:** `rg -c 'LikeC' js/monmove.js …` — net up or down vs last reflection?
3. **Handoff:** Is `current.md` #1 still the best C slice, or habit?
4. **Score:** Canaries vs full score — regression or anchor gain?
5. **Oracles:** Wrong hypotheses to delete? Missing card for next batch?
6. **Next 3 batches:** Write explicit order in `reflection.md`; **update `current.md`** if order changes.

### Outputs

1. Overwrite **`c-to-js-port-reflection.md`** (date + table + decisions).
2. Adjust **`current.md`** next steps if needed.
3. One changelog row prefixed **`Reflect:`** when reflection changed priorities (optional if only confirmatory).
4. Then proceed with **one** normal port batch (unless reflection concluded “fix handoff only”).

---

## 11. Agent loop contract

[`continue-nethack-port.md`](../prompts/continue-nethack-port.md) and `loop-nethack-port-agent.sh` embed this strategy.

**Each iteration:**

1. Read `current.md` → **one** batch (must pass §5 moratorium)
2. Read oracle for that C file
3. Port C slice; avoid reading unrelated JS
4. Fast-verify + canaries
5. `port-batch-gate.sh` → commit → update handoff shelves

**Stop the loop for human review if:** gate script fails twice; or ledger shows 5 consecutive peel-only commits.

**Every ~5 iterations:** read [`c-to-js-port-reflection.md`](c-to-js-port-reflection.md) date — if due, run **§10** **instead of** a port batch that iteration (still commit handoff updates).

---

## 12. Related docs

| Doc | Role |
|-----|------|
| [`c-to-js-port-reflection.md`](c-to-js-port-reflection.md) | Last meta-review; next 3 batches (~every 5 commits) |
| [`c-to-js-port-batch-workflow.md`](c-to-js-port-batch-workflow.md) | Commit ritual, anti-patterns |
| [`c-to-js-port-agent-playbook.md`](c-to-js-port-agent-playbook.md) | Tools, pitfalls |
| [`c-oracles/README.md`](c-oracles/README.md) | Oracle card format |
| [`c-to-js-port-harness-debt.md`](c-to-js-port-harness-debt.md) | Peel inventory |
| [`port-from-c-not-score.mdc`](../rules/port-from-c-not-score.mdc) | Contest integrity |
