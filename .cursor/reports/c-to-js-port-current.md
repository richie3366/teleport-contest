# NetHack C→JS port — **current slice** (read this first)

Thin handoff for the next coding session. **Workflow:** [**batch port**](c-to-js-port-batch-workflow.md) + [**function checklist**](c-to-js-port-function-checklist.md). **Score + milestones:** [`c-to-js-port-dashboard.md`](c-to-js-port-dashboard.md) (regenerate: `node tools/port-score-snapshot.mjs --update-dashboard`). **Gap inventory:** [`c-to-js-port-remaining.md`](c-to-js-port-remaining.md). Deep parity tables and history: [`c-to-js-port-progress.md`](c-to-js-port-progress.md) and [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md). **Repeatable user/agent prompt:** [`.cursor/prompts/continue-nethack-port.md`](../prompts/continue-nethack-port.md).

## Working principle (read every session)

**Port from C; score is regression only.** Pick the **next batch** from [`c-to-js-port-function-checklist.md`](c-to-js-port-function-checklist.md) and domain gaps in [`c-to-js-port-remaining.md`](c-to-js-port-remaining.md), not from “what might pass another public session.” **Fast-verify** each batch (`diag_rng_window`, locator session); run **full `npm run score` at milestones** — see [`c-to-js-port-batch-workflow.md`](c-to-js-port-batch-workflow.md). Do not add **`fastforward.js`** / harness bytes without porting the matching C call site. Full rule: [`.cursor/rules/port-from-c-not-score.mdc`](../rules/port-from-c-not-score.mdc).

## Priority matrix (methodical)

Use this when **`Next steps`** below feels stale or several lanes compete. Order by **(1)** failing session only as a **locator** → **(2)** one C function / call graph → **(3)** dependencies → **(4)** score vs C-depth tradeoff for this sprint.

| Lane | Goal | Typical C / JS | When to favor |
|------|------|----------------|----------------|
| **A — Chargen / TTY** | More sessions with real identity pickers | `wintty.c`, `role.c` → **`chargen_tty.js`**, **`chargen_rigid.js`** | Short-term **score ROI**; rc without embedded `OPTIONS` identity |
| **B — NHL / des** | C-faithful `.lua` specials when `makemaz` resolves a protofile | `nhlua.c`, `sp_lev.c` `lspo_*` → **`nhl_lua.js`**, **`des_api.js`**, **`nhl_des_runtime.js`** | Mines / branch specials; extend one **`dat/*.lua`** + bindings per slice ([`nhl-port-notes.md`](nhl-port-notes.md)) |
| **C — Travel / dogs** | Orthogonal moveloop prep | `dog.c`, `goto_level` → **`mon_arrive.js`**, **`goto_level_hero.js`** | Good interleave when pausing Lua; bounded C surfaces |
| **D — Objects / mkobj** | Floor + invent parity | `mkobj.c`, `u_init.c` → **`mklev.js`**, `nh5*` maps | After chargen milestone or when sessions diverge on items |
| **E — Tutorial** | Optional `tut-1` branch at newgame | `allmain.c`, `do.c`, `nhlua.c`, `dat/tut-*.lua` → **`tutorial_*`**, **`goto_level_hero.js`**, **`nhl_lua.js`** | **Only when** [tutorial port gate](../../docs/plans/tutorial-port-gate.md) **MD-1 … MD-7** are all satisfied — then **primary** until [10-tutorial.md](../plans/nethack-port/10-tutorial.md) exit criteria |

**Gated (not “never”):** tutorial / `tut-1` — blocked on mandatory dependencies in [`docs/plans/tutorial-port-gate.md`](../../docs/plans/tutorial-port-gate.md); large **`monmove`** / **`moveloop_aux`** harness peels remain parallel long tail — see extended backlog sections below.

## Contract (non-negotiable)

- Port from **C semantics** in `nethack-c/upstream/` (init submodule if empty). Do **not** derive behavior from binaries or memorize the 44 public sessions.
- **Finding C sources:** `nethack-c/upstream` is a **nested git repo** (submodule). Some IDE / Cursor **code search** skips that tree — use **`read_file`**, terminal **`rg`/`grep`** with an explicit path, or **`rg --no-ignore-vcs`**.
- **Frozen** (do not edit): `js/isaac64.js`, `js/terminal.js`, `js/storage.js`.
- **Plain ES modules**, no build/WASM/network in contest code; RNG via `js/rng.js`; match **clang** evaluation order for multi-call expressions.
- API: [`docs/API.md`](../../docs/API.md); overview: [`README.md`](../../README.md).

**Strategic priority (dual track):** **Lane A** — tty startup + interactive chargen. **Lane B** — NHL / des-file levels. **Eleven** public sessions ship **`nethackrc` without** embedded `OPTIONS=name:` / `role:`.

**Tutorial (Lane E):** Gated on [tutorial port gate](../../docs/plans/tutorial-port-gate.md) **MD-1 … MD-7**.

**Last slice:** **Lane A/D `seed0900` run-east `L` post (~2906–2935)** — diag **2906–2935** match. Seventeenth **`movemon`** (fourth invent/**`mfndpos`** 4× pair-pad + tail; double **`distfleeck`** + phase-2 budget 6 + phase-3); arm seventeenth after sixteenth new-turn. **Open:** **~2936** — eighteenth **`movemon`**. **`seed8000`:** **PASS**. **2/44**.

## Next steps (aligned with matrix)

Pick **one** primary lane per **batch** (several related C functions — see checklist); refresh this list after each merge.

**First:** open [`docs/plans/tutorial-port-gate.md`](../../docs/plans/tutorial-port-gate.md) — if **all MD-1 … MD-7** are checked, do **Lane E** step 1 from [10-tutorial.md](../plans/nethack-port/10-tutorial.md) instead of the list below.

1. **Lane A/D — `seed0900` ~2936** — eighteenth **`movemon`** peel (**`distfleeck`** + invent/**`mfndpos`** ~2936+). Diag **2936–2960**; mirror fourteenth/fifteenth alternating shell pattern.
2. **Lane A — `seed0102` screen 0** — D:1 map + botl after mklev parity.
3. **Lane C — `seed0006` ~2892** — capital **`K`** moveloop tail; screen **35** botl (**`find_ac`** / time).
4. **Lane B — NHL** — next **`lspo_*`** per [`nhl-port-notes.md`](nhl-port-notes.md).

### Extended backlog (unchanged lanes)

- **`mklev` / `mfndpos`:** `setgemprobs`, mineralize drift, legacy floor **`otyp`** vs NH5 when replaying C **`mkobj`**.
- **`pray.c` / `sit.c` / `angrygods` / `read.c` / scroll & trap long tail:** see [`c-to-js-port-remaining.md`](c-to-js-port-remaining.md) §3–§4 and `TODO`s under `js/`.

### Lane E backlog — tutorial (gated)

Mandatory dependencies **MD-1 … MD-7**. Execution checklist: [10-tutorial.md](../plans/nethack-port/10-tutorial.md).

### Deferred backlog (moveloop / traps / fire)

Extend **`distfleeck`** to further moveloop steps; full **`domove`**, **`attack`**, …; remainder **`flooreffects`**; fuller **`sellobj`**; **`dig()`** / **`dighole`**; **`trap.c`** **`blow_up_landmine`**; **`zap_dig`**; **`zombie_form`**; full **`mondied`/`xkilled`**; **`spoteffects`**; **`switch_terrain`**; **`steed.c`**; **`repair_damage`**; **`kick.js`** **`bhit`**; full **`dungeon.c`** **`init_dungeons`**; wire **`dig()`** occupation; **`angry_guards`**; **`context.warntype`**; **`zap_dig`** / **`objnam`**; **`destroy_drawbridge`**; **`dig_up_grave`**.

## After you ship a batch

1. Update [`c-to-js-port-function-checklist.md`](c-to-js-port-function-checklist.md) row statuses.
2. Append **one table row** to [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md).
3. Refresh **this file** (next steps + one-line “last slice”).
4. Run **`npm run score`** at **milestones** or when RNG/screens may have regressed (see [batch workflow](c-to-js-port-batch-workflow.md) §5).
5. **`git commit`** — one commit per meaningful batch (push optional).

---

## Copy-paste: continue the port

Prefer [`.cursor/prompts/continue-nethack-port.md`](../prompts/continue-nethack-port.md).

```
Continue NetHack 5.0 C→JS (batch workflow): read .cursor/reports/c-to-js-port-current.md and .cursor/reports/c-to-js-port-batch-workflow.md; next batch from .cursor/reports/c-to-js-port-function-checklist.md; port from nethack-c/upstream C semantics; do not edit js/isaac64.js, js/terminal.js, js/storage.js. Fast-verify batch (diag_rng_window if RNG); npm run score at milestones or when unsure. When done: update checklist + current.md + changelog row; git commit this batch.
```
