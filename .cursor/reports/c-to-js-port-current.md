# NetHack C→JS port — **current slice** (read this first)

Thin handoff for the next coding session. **Score + milestones:** [`c-to-js-port-dashboard.md`](c-to-js-port-dashboard.md) (regenerate: `node tools/port-score-snapshot.mjs --update-dashboard`). **Gap inventory:** [`c-to-js-port-remaining.md`](c-to-js-port-remaining.md). Deep parity tables and history: [`c-to-js-port-progress.md`](c-to-js-port-progress.md) and [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md). **Repeatable user/agent prompt:** [`.cursor/prompts/continue-nethack-port.md`](../prompts/continue-nethack-port.md).

## Working principle (read every session)

**Port from C; score is regression only.** Pick work from C gaps and [`c-to-js-port-remaining.md`](c-to-js-port-remaining.md), not from “what might pass another public session.” Run **`npm run score`** to catch regressions after RNG/screen slices — do not add **`fastforward.js`** / harness bytes without porting the matching C call site. Full rule: [`.cursor/rules/port-from-c-not-score.mdc`](../rules/port-from-c-not-score.mdc).

## Contract (non-negotiable)

- Port from **C semantics** in `nethack-c/upstream/` (init submodule if empty). Do **not** derive behavior from binaries or memorize the 44 public sessions.
- **Finding C sources:** `nethack-c/upstream` is a **nested git repo** (submodule). Some IDE / Cursor **code search** (e.g. workspace **Glob** or default ripgrep scope) **skips or under-indexes** that tree even when it is checked out. Use **`read_file`**, terminal **`rg`/`grep`** with an explicit path under `nethack-c/upstream/`, or **`rg --no-ignore-vcs`**, and run **`git submodule update --init nethack-c/upstream`** on clones where the directory is empty.
- **Frozen** (do not edit): `js/isaac64.js`, `js/terminal.js`, `js/storage.js`.
- **Plain ES modules**, no build/WASM/network in contest code; RNG via `js/rng.js`; match **clang** evaluation order for multi-call expressions.
- API: [`docs/API.md`](../../docs/API.md); overview: [`README.md`](../../README.md).

**Strategic priority:** Port **tty startup + interactive chargen** toward C **`wintty.c` / `role.c`** parity. **Eleven** public sessions ship **`nethackrc` without** embedded `OPTIONS=name:` / `role:` (and similar); C runs **“Who are you?”**, **[ynaq]**, and role/race/gender/align pickers with real **RNG**. Sessions that already set identity in **OPTIONS** must keep the **C fast path** (skip full menus when rc fixes role/race/gender/align).

**Deferred for now:** **`maybe_do_tutorial`** / **`tut-1`** / full **`do.c`** **`goto_level`** (Lua **`tutorial()`** / **`free_tutorial()`**, **`savelev`**, **`gmst_*`**, …) and **`dokick`**/**`dothrow`** vs **`leaving_tutorial`** — strong upstream dependencies (save, specials, fuller **`do.c`**); treat as backlog until chargen / core early-game parity is further along; **`LIVELOGFILE`** parity if the judge ever compares livelog lines.

**Last slice:** **`dungeon_init.js`**: C **`fixup_level_locations`** → **`fixupLevelLocationsLikeC`** (`rogue_level`, `oracle_level`, `medusa_level`, … from **`sp_levchn`**). **`fmon_iter.js`**: first **`#search`** order gate → pet → post-gate peel (C: **`dog_goal`** before tail **`distfleeck`**). **`monmove.js`**: post-gate **`distfleeck`** tail after **`dog_goal`**. Diag (**`tools/diag_mklev_monsters_at_search.mjs`**): D:1 has **7** themed **`needfill`** rooms but **one** sleeping **`makemon`** (RNG); **2** monsters at first **`#search`** (gate + pet) — **`postGatePeel`** empty → **~3209** still **`mcalcmove`** vs four **`distfleeck`**. **`seed0077`:** **3210/3242** (unchanged). **`seed8000`:** **PASS**. **`npm run score`:** **1/44**.

## Next steps

1. **`seed0077` first `#search` peel (~3209–3212)** — With RNG matched through **~3208**, gap is **movemon** / **`fmon`** peel slots (four **`distfleeck`**), not mklev **`rn2(3)`** count (same **1** sleeper as C for this seed). Port door-**`j`** / east-niche **`mgenmklev`** classification (**`mfndpos_mon.js`**, **`preferSleepingLichenDoorNichesLikeC`**) or C **`monmove.c`** peel loop for rogue near path; re-check **`postGatePeel`** when niche fungi exist after **`j`**.

2. **`makeroguerooms` / rogue special level** — when **`Is_rogue_level`** is true (now that **`rogue_level`** is set); separate from rogue **class** on main D:1.

3. **Chargen + `u_init_role` RNG** — **`consumeRogueHumanIniInvUinitRoleRngLikeC`** / **`ini_inv`** when moveloop peel is aligned.

4. **`ini_inv` + `mkobj` → `game.invent`** — wire NH5 **`otyp`/`oclass`** so **`skill_init`**, hidden gold, traps, and combat prep follow C; replace **`ini_inv_stub.js`** overlays when paths match.

5. **Generalize moveloop** — peel **`monmove.js`** / **`moveloop_aux.js`** harness only when **per-path RNG draw counts** match C; **`mklev`/`dig_corridor`/`mfndpos`** when geometry blocks later **`dochug`** steps.

### Extended backlog (unchanged lanes)

- **`mklev` / `mfndpos`:** `setgemprobs`, mineralize drift, legacy floor **`otyp`** vs NH5 when replaying C **`mkobj`** (see **`mklev.js`** audit comments).
- **`pray.c` / `sit.c` / `angrygods` / `read.c` / scroll & trap long tail:** prior handoff bullets 4–6 — see [`c-to-js-port-remaining.md`](c-to-js-port-remaining.md) §3–§4 and `TODO`s under `js/`.

### Deferred backlog — tutorial / `goto_level` / `tut-1` (resume when save + `do.c` bridge are ready)

**`maybe_do_tutorial`** and full **`do.c`** **`goto_level`** when **`tut-1`** is exercised — Lua **`tutorial()`** / **`free_tutorial()`**, **`savelev`**, **`gmst_*`** sequester, … beyond **`applyGotoLevelDirectHeroLikeC`** + **`tutorial_branch.js`** stub; **`LIVELOGFILE`** / judge-visible recorder line if sessions compare livelog; **`dokick`** / **`dothrow`** (non-**`shop.js`**) vs **`leaving_tutorial`** when those call sites need parity.

### Deferred backlog (moveloop / traps / fire — resume after chargen milestone)

Extend **`distfleeck`** to further moveloop steps — match **`monmove.c`** **`dochug`** (**`distfleeck`** ~791, **`m_move`**/**`m_throw`**, **`distfleeck`** recalc ~915) per monster; peel harness only when per-path draw counts match C (step **3** row is interleaved **`rn2(5)`**/**`rn2(32)`**, not N× first-**`distfleeck`** only); grid **`domove`**, **`attack`**, …; remainder **`flooreffects`** (**`hmon`/`mondied`** full, teeter); fuller **`sellobj`** (**`ynaq`**, **`dropped_container`**, bones **`robbed`**); then wire full **`dig()`** / **`dighole`** (non-wizard path) and remaining shop pit / full **`digactualhole`/`maketrap`**; **`zap_dig`** **`uswallow`**/**`pit_flow`**/**`dighole`** from pit; shop **`PASSED_DESTROY_TRAP`**; call **`spotChecksLikeC`** from **`apply.c`** **`do_break_wand`** / **`music.c`** **`do_earthquake`** when those paths change terrain; **`trap.c`** **`blow_up_landmine`** still needs C **`scatter`** and real **`recalc_block_point`** vs full-grid **`vision_recalc`**; hero landmine still missing C **`steed_mid`/`saddle`/`keep_saddle_with_steedcorpse`**; **`dozap`** **`getobj`**/**cursed `backfire`**/**`zapyourself`**/**`zapnodir`**; **`SPE_DIG`**; fuller **`setmangry`**; **`zombie_form`** / **`ZOMBIFY_MON`**; fuller **`revive`** / egg **`TIMER_OBJECT`**; full **`digactualhole`** / **`placebc`**; **`mbuzzOffensiveWandFromMonsterTowardMux`** from real **`monmove`** + **`find_offensive`**; full **`rloc`** / **`usteed`**; hero fountain **`dryup`** (**`in_town`** / wizard **`y_n`**); full **`mondied`/`xkilled`** so pool survivor tail consumes RNG like C; **`spoteffects`**: full pooleffects / **`set_uinwater`**, **`meltIceAt`** alignment, sink+Levitation / float_down / **`in_steed_dismounting`**; **`switch_terrain`**: steed/**`dismount`**, **`classify`** / **`drawbridge`** parity; **`steed.c`**-style **`steedVsStealthLikeC`** on mount/dismount when **`usteed`** is ported; **`repair_damage`** remainder (**`picking_at`**, ball&chain **`litter_scatter`**, bill **`subfrombill`**); **`kick.js`** **`bhit`** remainder (**`thitmonst`**, **`ship_object`**, **`scatter`**, shop **`costly`**) / secret doors / full **`attack_checks`** / poly **`AT_KICK`**; full **`dungeon.c`** **`init_dungeons`**/**`place_level`** so **`sp_levchn`** + minetn **`dlevel`** match C (**`bootstrapSpLevchnMinesMinetnFromBranchStubLikeC`** activates); wire real **`dig()`** occupation to **`setHeroDiggingOccupationLikeC`** (not only wizard **`#D`**); **`angry_guards`**: worm **`worm_known`** / full **`u.uprops`** telepathy property names vs **`HTelepat`** stubs; populate **`context.warntype`** from **`artifact.c`**/**`doapply`** when warn-of rings are ported; **`zap_dig`** / **`objnam`**: full **`xname`** string + **`discover_object`** **`mark_as_known`** / **`disco[]`** class order / Samurai **`Japanese_item_name`** / **`gem_learned`**; **`destroy_drawbridge`** **`e_died`/`scatter`** full parity; **`dig_up_grave`** **`mkclass`**/**`tt_oname`** full parity.

## After you ship a slice

1. Append **one table row** to [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md) (same columns as existing rows).
2. Refresh **this file** (next steps + one-line “last slice”).
3. Run **`npm run score`** when the change touches RNG-visible behavior.
4. **`git commit`** — one commit per meaningful slice (see [`.cursor/prompts/continue-nethack-port.md`](../prompts/continue-nethack-port.md)); conventional message (`feat(js):` / `fix(js):` / `docs(port):`, …).

---

## Copy-paste: continue the port

Prefer the **canonical** text in [`.cursor/prompts/continue-nethack-port.md`](../prompts/continue-nethack-port.md) (includes `c-to-js-port-remaining.md` skim + **git commit per slice**). Legacy one-liners:

```
Continue NetHack 5.0 C→JS: read .cursor/reports/c-to-js-port-current.md first (not the full progress doc). Do the top next step; port from nethack-c/upstream C semantics; do not edit js/isaac64.js, js/terminal.js, js/storage.js. When done: update c-to-js-port-current.md, append one row to c-to-js-port-changelog-archive.md, npm run score if relevant, git commit this slice.
```

Shorter variant:

```
Continue port: read .cursor/reports/c-to-js-port-current.md, top next step, C upstream only, frozen js/* harness untouched, then refresh current + one changelog row + score if needed + git commit the slice.
```
