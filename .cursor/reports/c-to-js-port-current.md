# NetHack C→JS port — **current slice** (read this first)

Thin handoff for the next coding session. **Score + milestones:** [`c-to-js-port-dashboard.md`](c-to-js-port-dashboard.md) (regenerate: `node tools/port-score-snapshot.mjs --update-dashboard`). **Gap inventory:** [`c-to-js-port-remaining.md`](c-to-js-port-remaining.md). Deep parity tables and history: [`c-to-js-port-progress.md`](c-to-js-port-progress.md) and [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md). **Repeatable user/agent prompt:** [`.cursor/prompts/continue-nethack-port.md`](../prompts/continue-nethack-port.md).

## Working principle (read every session)

**Port from C; score is regression only.** Pick work from C gaps and [`c-to-js-port-remaining.md`](c-to-js-port-remaining.md), not from “what might pass another public session.” Run **`npm run score`** to catch regressions after RNG/screen slices — do not add **`fastforward.js`** / harness bytes without porting the matching C call site. Full rule: [`.cursor/rules/port-from-c-not-score.mdc`](../rules/port-from-c-not-score.mdc).

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

**Last slice:** Post-east-tail walk distant **`m_move`** — **`fmon`** near+pet only; corridor-style **`rn2(12)`×3** + **`monTrackClear`**; in-**`movemon`** **`runWizEastTailPostCorridorNewTurnLikeC`** + near **`distfleeck`** + **`dogMoveEastTailPostMcalcmovePetLikeC`** after **`mintrap`**; moveloop **`_wizD1PostEastTailWalkNewTurnDoneLikeC`**. **`seed0006`** **2802/6736** RNG (diag **2775–2782**); **2783+** pet **`rn2(4)`** / tail of same **`l`**. **2/44**.

**Handoff refresh:** **Priority matrix** (lanes A–D) + **Next steps** aligned to it.

## Next steps (aligned with matrix)

Pick **one** primary lane per slice; refresh this list after each merge.

**First:** open [`docs/plans/tutorial-port-gate.md`](../../docs/plans/tutorial-port-gate.md) — if **all MD-1 … MD-7** are checked, do **Lane E** step 1 from [10-tutorial.md](../plans/nethack-port/10-tutorial.md) instead of the list below.

1. **Lane C — `seed0006` ~2783** — same **`l`** post: pet **`mfndpos`** **`rn2(4)`** + invent tail (**`dogmove_mon.js`** pick budget / **`dogMovePostCorridorSecondPetMfndposLikeC`**); then **2800+** second distant **`m_move`** / next **`l`** (**`2804+`**). Global first mismatch still **~2630**.
2. **Lane A — Chargen / init** — tty / **`role.c`** pickers when rc omits identity.
3. **Lane B — NHL** — next **`lspo_*`** per [`nhl-port-notes.md`](nhl-port-notes.md).
4. **Lane D — `objects_nums` / mkobj** — audit **`const.js`** vs NH5.

### Extended backlog (unchanged lanes)

- **`mklev` / `mfndpos`:** `setgemprobs`, mineralize drift, legacy floor **`otyp`** vs NH5 when replaying C **`mkobj`**.
- **`pray.c` / `sit.c` / `angrygods` / `read.c` / scroll & trap long tail:** see [`c-to-js-port-remaining.md`](c-to-js-port-remaining.md) §3–§4 and `TODO`s under `js/`.

### Lane E backlog — tutorial (gated)

Mandatory dependencies **MD-1 … MD-7**. Execution checklist: [10-tutorial.md](../plans/nethack-port/10-tutorial.md).

### Deferred backlog (moveloop / traps / fire)

Extend **`distfleeck`** to further moveloop steps; full **`domove`**, **`attack`**, …; remainder **`flooreffects`**; fuller **`sellobj`**; **`dig()`** / **`dighole`**; **`trap.c`** **`blow_up_landmine`**; **`zap_dig`**; **`zombie_form`**; full **`mondied`/`xkilled`**; **`spoteffects`**; **`switch_terrain`**; **`steed.c`**; **`repair_damage`**; **`kick.js`** **`bhit`**; full **`dungeon.c`** **`init_dungeons`**; wire **`dig()`** occupation; **`angry_guards`**; **`context.warntype`**; **`zap_dig`** / **`objnam`**; **`destroy_drawbridge`**; **`dig_up_grave`**.

## After you ship a slice

1. Append **one table row** to [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md).
2. Refresh **this file** (next steps + one-line “last slice”).
3. Run **`npm run score`** when the change touches RNG-visible behavior.
4. **`git commit`** — one commit per meaningful slice.

---

## Copy-paste: continue the port

Prefer [`.cursor/prompts/continue-nethack-port.md`](../prompts/continue-nethack-port.md).

```
Continue NetHack 5.0 C→JS: read .cursor/reports/c-to-js-port-current.md first (not the full progress doc). Do the top next step; port from nethack-c/upstream C semantics; do not edit js/isaac64.js, js/terminal.js, js/storage.js. When done: update c-to-js-port-current.md, append one row to c-to-js-port-changelog-archive.md, npm run score if relevant, git commit this slice.
```
