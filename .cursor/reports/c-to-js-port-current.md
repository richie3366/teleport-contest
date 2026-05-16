# NetHack C→JS port — **current slice** (read this first)

Thin handoff for the next coding session. Deep parity tables and history: [`c-to-js-port-progress.md`](c-to-js-port-progress.md) and [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md).

## Contract (non-negotiable)

- Port from **C semantics** in `nethack-c/upstream/` (init submodule if empty). Do **not** derive behavior from binaries or memorize the 44 public sessions.
- **Frozen** (do not edit): `js/isaac64.js`, `js/terminal.js`, `js/storage.js`.
- **Plain ES modules**, no build/WASM/network in contest code; RNG via `js/rng.js`; match **clang** evaluation order for multi-call expressions.
- API: [`docs/API.md`](../../docs/API.md); overview: [`README.md`](../../README.md).

**Last slice:** **`dig.c`** **`dighole`** **`IS_GRAVE`** + **`dig_up_grave`** — **`js/dig_grave.js`**: **`exercise(A_WIS,FALSE)`**, role/align plines + **`adjalign`** subset, **`emptygrave`** gate + **`rn2(5)`** outcomes ( **`mk_tt_object`**-style corpse + **`TAINT_AGE`** age, **`makemon`** **`PM_HUMAN_ZOMBIE`/`PM_HUMAN_MUMMY`** stand-in for **`mkclass`**, default pline), **`ROOM`**/**`flags`**/**`horizontal`**/**`del_engr`**/**`newsym`**; **`js/dighole.js`**: C order after boulder — **`digactualHoleHeroUtrapSubset`**, **`unearthObjsDigInLevel`**, **`ROOM`** + pit **`maketrap`** subset, dig pline + **`utrap`**, **`digUpGraveLikeC`**; **`surfaceHereString`** **`grave`**; **`js/const.js`**: **`PM_HUMAN_MUMMY`**, **`PM_HUMAN_ZOMBIE`**, **`PM_ARCHEOLOGIST`**, **`PM_WIZARD`** (NH 5.0 **`monsters.h`** enum indices). Still TODO: **`goto_level`**, full **`digactualhole`/`maketrap`**, **`mkclass`** RNG, shop **`add_damage`**, **`PASSED_DESTROY_TRAP`**, **`furniture_handled`**. **`npm run score`:** **0/44** (RNG-visible path; **`seed0060`** **991/3626** until harness picks up new commit).

## Next steps (highest impact from latest fire/lava work)

1. **`melt_ice` / cold remainder** — wire full **`dig()`** / **`dighole`** (non-wizard path) and remaining shop pit / full **`digactualhole`/`maketrap`**; **`zap_dig`** **`uswallow`**/**`pit_flow`**/**`dighole`** from pit + **`dighole`** **`goto_level`**, shop, **`PASSED_DESTROY_TRAP`**; call **`spotChecksLikeC`** from other **`dighole`**-equivalent exits when terrain at **`(x,y)`** changes ( **`apply.c`** **`do_break_wand`**, **`music.c`** **`do_earthquake`** ) once those paths exist; **`dozap`** **`getobj`**/**cursed `backfire`**/**`zapyourself`**/**`zapnodir`**; **`SPE_DIG`**; fuller **`setmangry`**; **`zombie_form`** / **`ZOMBIFY_MON`**; fuller **`revive`** / egg **`TIMER_OBJECT`**; full **`digactualhole`** / **`placebc`**; **`mbuzzOffensiveWandFromMonsterTowardMux`** from real **`monmove`** + **`find_offensive`**; full **`rloc`** / **`usteed`**; hero fountain **`dryup`** (**`in_town`** / wizard **`y_n`**); full **`mondied`/`xkilled`** so pool survivor tail consumes RNG like C; **`spoteffects`**: full pooleffects / **`set_uinwater`**, **`meltIceAt`** alignment, sink+Levitation / float_down / **`in_steed_dismounting`**; **`switch_terrain`**: steed/**`dismount`**, **`classify`** / **`drawbridge`** parity; **`steed.c`**-style **`steedVsStealthLikeC`** on mount/dismount when **`usteed`** is ported; **`repair_damage`** remainder (**`picking_at`**, ball&chain **`litter_scatter`**, bill **`subfrombill`**); **`kick.js`** **`bhit`** remainder (**`thitmonst`**, **`ship_object`**, **`scatter`**, shop **`costly`**) / secret doors / full **`attack_checks`** / poly **`AT_KICK`**; full **`dungeon.c`** **`init_dungeons`**/**`place_level`** so **`sp_levchn`** + minetn **`dlevel`** match C (**`bootstrapSpLevchnMinesMinetnFromBranchStubLikeC`** activates); **`watch_dig`** remainder (**`verbalize`**, **`angry_guards`**, **`get_iter_mons`**); **`zap_dig`** rock path **`xname`**; **`destroy_drawbridge`** **`e_died`/`scatter`** full parity; **`dig_up_grave`** **`mkclass`**/**`tt_oname`** full parity.
2. **`dofiretrap`** remainder — wire **`trap.c`** chest **`b_trapped`** fire cases to **`dofiretrapHeroLikeC(obj)`**; full **`shieldeff`** **`shield_static`** loop; **`losexp`** tail (**`adjabil`**, **`defended(AD_DRLI)`**, **`is_vampshifter`**, poly **`monhp_per_lvl`**).
3. **Scroll discovery remainder** — **`read`/`pickup`** when those modules match C; optional shared **`makeknown`-style** helper (avoid import cycles); audit **`mklev.js`** **`otyp`** literals vs **`objects_nums`**.

## After you ship a slice

1. Append **one table row** to [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md) (same columns as existing rows).
2. Refresh **this file** (next steps + one-line “last slice”).
3. Run **`npm run score`** when the change touches RNG-visible behavior.

---

## Copy-paste: continue the port

```
Continue NetHack 5.0 C→JS: read .cursor/reports/c-to-js-port-current.md first (not the full progress doc). Do the top next step; port from nethack-c/upstream C semantics; do not tune to public sessions; do not edit js/isaac64.js, js/terminal.js, js/storage.js. When done: update c-to-js-port-current.md, append one row to c-to-js-port-changelog-archive.md, npm run score if relevant.
```

Shorter variant:

```
Continue port: read .cursor/reports/c-to-js-port-current.md, top next step, C upstream only, frozen js/* harness untouched, then refresh current + one changelog row + score if needed.
```
