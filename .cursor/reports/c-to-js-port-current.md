# NetHack C→JS port — **current slice** (read this first)

Thin handoff for the next coding session. **Canonical strategy:** [**`c-to-js-port-strategy.md`**](c-to-js-port-strategy.md) (read once; agents obey §5 moratorium). **C oracles:** [`c-oracles/`](c-oracles/). **Harness debt:** [`c-to-js-port-harness-debt.md`](c-to-js-port-harness-debt.md). **Workflow:** [**batch port**](c-to-js-port-batch-workflow.md) + [**function checklist**](c-to-js-port-function-checklist.md). **Pre-commit:** `bash tools/port-batch-gate.sh`. **Score + milestones:** [`c-to-js-port-dashboard.md`](c-to-js-port-dashboard.md). **Repeatable prompt:** [`.cursor/prompts/continue-nethack-port.md`](../prompts/continue-nethack-port.md).

## Working principle (read every session)

**Port from C; score is regression only.** Pick batches from the **reliability phase** below and [`c-to-js-port-function-checklist.md`](c-to-js-port-function-checklist.md) — not from “what might pass another public session.” **Fast-verify** each batch (`diag_rng_window`, locator session); run **full `npm run score` at milestones** — see [`c-to-js-port-batch-workflow.md`](c-to-js-port-batch-workflow.md). Do not add **`fastforward.js`** / harness bytes without porting the matching C call site. Full rule: [`.cursor/rules/port-from-c-not-score.mdc`](../rules/port-from-c-not-score.mdc).

**Motto:** complete port = **C dependency order + delete scaffolding**, not nearest PASS or longest peel chain. Token budget is irrelevant; **regression net + subsystem closure** matter.

## Reliability phases (complete-port order)

Authoritative milestone ordering: [`c-to-js-port-remaining.md`](c-to-js-port-remaining.md) §5. Use this when lanes compete.

| Phase | C anchor | JS focus | Unlocks |
|-------|----------|----------|---------|
| **P1** | `mkobj.c`, `u_init.c` `ini_inv`, `invent.c` | **`game.invent`**, NH5 **`otyp`**, real **`ini_inv`** | items, skills, tutorial **MD-1**, most mid-game RNG |
| **P2** | `monmove.c`, `dogmove.c` | **General** `movemon` / `dochug` / `fmon` / `dog_goal` — **peel flags are debt** | moveloop truth; shrink `monmove.js` harness |
| **P3** | `allmain.c` post-hero tail | `moveloop_aux.js` → real end-of-turn (`dosounds`, exercise hooks) | per-turn RNG after hero move |
| **P4** | `cmd.c`, `do.c`, menus | throw, wear, pray, read, `getobj`, … | most session inputs after moveloop |
| **P5** | `uhitm.c`, `mhitu.c`, `weapon.c` | AC, to-hit, real damage, death | combat sessions |
| **P6** | `dungeon.c`, `sp_lev.c`, `nhlua.c` | `place_level`, `lspo_*`, Lua RNG (**MD-3**) | branches, mines, tours |
| **P7** | `dat/tut-*.lua`, nhcore | **Lane E** after [tutorial gate](../../docs/plans/tutorial-port-gate.md) **MD-1 … MD-7** | tutorial vertical |
| **P8** | `save.c`, quest/endgame | persistence semantics vs API | long-run continuity |

**Checklist today:** **49 partial, 3 stub, 0 done** — no row is closed until exercised paths have **no known wrong RNG**.

## Peel moratorium (**enforced** — [`c-to-js-port-strategy.md`](c-to-js-port-strategy.md) §5)

**STOP:** no new `_wizD1CommaPostTwentyFifth*` (or higher) / numbered comma-`U` peels. `tools/port-batch-gate.sh` fails the commit.

| Signal | Action |
|--------|--------|
| Tempted to widen `seed0006` with peel N+1 | **Read** [`c-oracles/monmove.c.md`](c-oracles/monmove.c.md); port **`movemon()`** loop or **delete** one PostSeventh…PostTwelfth band |
| Next **3+** batches would only add peel flags | **P1** `mkobj`/`ini_inv` **or** P2 general `dochug` arm — not locator peel |
| Moveloop batch lands | **Three canaries** + update **harness debt** if flags changed |
| Learned C ordering | **Oracle card first**, peel code second (or skip peel) |

## Moveloop regression canaries (mandatory)

After **any** edit to `monmove.js`, `m_move_mon.js`, `dogmove_mon.js`, `moveloop_turn_advance.js`, or `moveloop_aux.js`:

| Session | Fast-verify window | Role |
|---------|-------------------|------|
| `seed8000-tourist-starter` | RNG **2900–3129** | short OPTIONS moveloop |
| `seed0077-rogue-chargen` | RNG **3180–3242**; screen step **17** | rogue tutorial `#search` / west apport |
| `seed0102-ranger-name-cancel` | full session (**4485** RNG) | twin `#search` + extcmd (full PASS anchor) |

Locator-only (not regression-required every batch): `seed0006` **3054–3130**, `seed0900` **2480–2990**.

## Priority matrix (methodical)

Use when **`Next steps`** feels stale. Order: **(1)** reliability phase **P1–P2** debt → **(2)** failing session as **locator** only → **(3)** one C function / call graph → **(4)** never score-chase.

| Lane | Goal | Typical C / JS | When to favor |
|------|------|----------------|----------------|
| **A — Chargen / TTY** | More sessions with real identity pickers | `wintty.c`, `role.c` → **`chargen_tty.js`**, **`chargen_rigid.js`** | rc without embedded `OPTIONS` identity; **not** the main blocker once chargen RNG aligns |
| **B — NHL / des** | C-faithful `.lua` specials when `makemaz` resolves a protofile | `nhlua.c`, `sp_lev.c` `lspo_*` → **`nhl_lua.js`**, **`des_api.js`**, **`nhl_des_runtime.js`** | Mines / branch specials; extend one **`dat/*.lua`** + bindings per slice |
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

**Strategic priority:** **P1** (`mkobj` / `ini_inv`) and **P2** (general `monmove` / `dogmove`) interleaved — **P2 peel chains only while they generalize C**. **Lane B** (NHL) when pausing moveloop. **Lane A** when a batch is explicitly `wintty.c` / `role.c`. **Lane E** only after tutorial gate.

**Tutorial (Lane E):** Gated on [tutorial port gate](../../docs/plans/tutorial-port-gate.md) **MD-1 … MD-7**.

**Last slice:** **Batch 6** — deleted `_wizD1CommaPostTwelfth*` inline peel; post-twelfth pass via `movemonSinglemonLikeC` (`mon.c`). `seed0006` 3260–3295 + three canaries aligned.

## Next steps (**strategy order** — pick **one**)

**First:** tutorial gate — if **all MD-1 … MD-7**, Lane E from [10-tutorial.md](../plans/nethack-port/10-tutorial.md).

1. **P2 — PostThirteenth peel** — same pattern as batches 1–6; delete `_wizD1CommaPostThirteenth*` inline peel + `mons=[]` when `seed0006` ~3296–3306 + canaries pass. Oracle: [`c-oracles/monmove.c.md`](c-oracles/monmove.c.md).
2. **P1 — `mkobj` / `ini_inv` → `game.invent`** — one checklist row (`mkobj_mklev_like_c.js` / role linker). Oracle: [`c-oracles/mkobj.c.md`](c-oracles/mkobj.c.md). Locator: `seed0900` ~302+.
3. **P2 — `dog_goal` / first `#search` (C, not peel)** — `seed0077` ~3205–3207 invent/apport order per [`c-oracles/dogmove.c.md`](c-oracles/dogmove.c.md); **no** new `PendingLikeC`.
4. **Lane B — NHL** — one `lspo_*` per [`nhl-port-notes.md`](nhl-port-notes.md).
5. ~~**seed0006 @ 3610+ twenty-fifth peel**~~ — **forbidden** until harness debt net −5 (see ledger).

**`seed0006` 3610+** remains a **locator** for testing after (1), not the next batch.

### Extended backlog (unchanged lanes)

- **`mklev` / `mfndpos`:** `setgemprobs`, mineralize drift, legacy floor **`otyp`** vs NH5 when replaying C **`mkobj`**.
- **`pray.c` / `sit.c` / `angrygods` / `read.c` / scroll & trap long tail:** see [`c-to-js-port-remaining.md`](c-to-js-port-remaining.md) §3–§4 and `TODO`s under `js/`.

### Lane E backlog — tutorial (gated)

Mandatory dependencies **MD-1 … MD-7**. Execution checklist: [10-tutorial.md](../plans/nethack-port/10-tutorial.md).

### Deferred backlog (moveloop / traps / fire)

Extend **`distfleeck`** to further moveloop steps; full **`domove`**, **`attack`**, …; remainder **`flooreffects`**; fuller **`sellobj`**; **`dig()`** / **`dighole`**; **`trap.c`** **`blow_up_landmine`**; **`zap_dig`**; **`zombie_form`**; full **`mondied`/`xkilled`**; **`spoteffects`**; **`switch_terrain`**; **`steed.c`**; **`repair_damage`**; **`kick.js`** **`bhit`**; full **`dungeon.c`** **`init_dungeons`**; wire **`dig()`** occupation; **`angry_guards`**; **`context.warntype`**; **`zap_dig`** / **`objnam`**; **`destroy_drawbridge`**; **`dig_up_grave`**.

## Agent playbook

Tool choice, moveloop debug loop, known pitfalls (e.g. rogue **`mnum` 7** vs Ranger **8**): [**c-to-js-port-agent-playbook.md**](c-to-js-port-agent-playbook.md).

## After you ship a batch

1. **`bash tools/port-batch-gate.sh`** — must pass before commit.
2. Update [`c-to-js-port-function-checklist.md`](c-to-js-port-function-checklist.md) row statuses.
3. Update **oracle** + [**harness debt**](c-to-js-port-harness-debt.md) if moveloop flags changed.
4. Append **one row** to [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md).
5. Refresh **this file** (next step + last slice).
6. **`npm run score`** at **milestones** only.
7. **`git commit`** — one batch per commit.

---

## Copy-paste: continue the port

Prefer [`.cursor/prompts/continue-nethack-port.md`](../prompts/continue-nethack-port.md).

```
Continue NetHack 5.0 C→JS per .cursor/reports/c-to-js-port-strategy.md: read c-to-js-port-current.md (next step #1 only); read c-oracles/<c-file>.md for this batch; port one C function from nethack-c/upstream — NO new comma-U PostTwentyFifth+ peels (port-batch-gate.sh). Before commit: gate script + three moveloop canaries if applicable; update checklist, oracle, harness-debt, current.md, changelog; git commit.
```
