# NetHack C→JS port — **current slice** (read this first)

Thin handoff for the next coding session. Deep parity tables and history: [`c-to-js-port-progress.md`](c-to-js-port-progress.md) and [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md).

## Contract (non-negotiable)

- Port from **C semantics** in `nethack-c/upstream/` (init submodule if empty). Do **not** derive behavior from binaries or memorize the 44 public sessions.
- **Frozen** (do not edit): `js/isaac64.js`, `js/terminal.js`, `js/storage.js`.
- **Plain ES modules**, no build/WASM/network in contest code; RNG via `js/rng.js`; match **clang** evaluation order for multi-call expressions.
- API: [`docs/API.md`](../../docs/API.md); overview: [`README.md`](../../README.md).

**Last slice:** **`dothrow.c`** **`throwit`** — **`hack.c`**-style **`calc_capacity(xtra_wt)`** via **`encumbr.js`** **`calcCapacityXtraWtLikeC`** + **`throw_hero.js`** **`applyThrowStaminaDropLikeC`** (overload vs **`SLT_ENCUMBER`**, weak/heavy plines, **`exercise(A_CON, false)`**, **`u.dx=u.dy=0; u.dz=1`**); **`u.dz<0`** → **`spoteffects.js`** **`ceilingStringHeroLikeC`** + **`toss_up_hero.js`** **`tossUpHeroThrowitLikeC`** (**`has_ceiling`**, roof **`rn2(5)`**, **`breaktest`**/**`heroBreaksObjLikeC`**, potion class → **`hitfloorHeroLikeC`**, weight damage + **`losehp`** + floor tail, harmless missile subset for scroll/cloth). Omits full **`potionhit`**, cream pie/venom blind, helmet/artifact/Mjollnir return, stoning **`done`**, **`hold_another_object`**, **`litter`**. Prior: **`zap.c`** **`bhit`** thrown **`tmp_at`**. **`npm run score`:** **0/44**; **`seed0060`** **991/3626** (unchanged).

## Next steps (highest impact from latest fire/lava work)

1. **`obj_delivery` / `breaks` tail** — **`hitfloor`** callers remainder (**`hold_another_object`**, **`litter`**) + remainder **`flooreffects`** (**`hmon`/`mondied`** full, teeter); fuller **`sellobj`** (**`ynaq`**, **`dropped_container`**, bones **`robbed`**); then wire full **`dig()`** / **`dighole`** (non-wizard path) and remaining shop pit / full **`digactualhole`/`maketrap`**; **`zap_dig`** **`uswallow`**/**`pit_flow`**/**`dighole`** from pit; shop **`PASSED_DESTROY_TRAP`**; call **`spotChecksLikeC`** from other **`dighole`**-equivalent exits when terrain at **`(x,y)`** changes ( **`apply.c`** **`do_break_wand`**, **`music.c`** **`do_earthquake`** ) once those paths exist; **`dozap`** **`getobj`**/**cursed `backfire`**/**`zapyourself`**/**`zapnodir`**; **`SPE_DIG`**; fuller **`setmangry`**; **`zombie_form`** / **`ZOMBIFY_MON`**; fuller **`revive`** / egg **`TIMER_OBJECT`**; full **`digactualhole`** / **`placebc`**; **`mbuzzOffensiveWandFromMonsterTowardMux`** from real **`monmove`** + **`find_offensive`**; full **`rloc`** / **`usteed`**; hero fountain **`dryup`** (**`in_town`** / wizard **`y_n`**); full **`mondied`/`xkilled`** so pool survivor tail consumes RNG like C; **`spoteffects`**: full pooleffects / **`set_uinwater`**, **`meltIceAt`** alignment, sink+Levitation / float_down / **`in_steed_dismounting`**; **`switch_terrain`**: steed/**`dismount`**, **`classify`** / **`drawbridge`** parity; **`steed.c`**-style **`steedVsStealthLikeC`** on mount/dismount when **`usteed`** is ported; **`repair_damage`** remainder (**`picking_at`**, ball&chain **`litter_scatter`**, bill **`subfrombill`**); **`kick.js`** **`bhit`** remainder (**`thitmonst`**, **`ship_object`**, **`scatter`**, shop **`costly`**) / secret doors / full **`attack_checks`** / poly **`AT_KICK`**; full **`dungeon.c`** **`init_dungeons`**/**`place_level`** so **`sp_levchn`** + minetn **`dlevel`** match C (**`bootstrapSpLevchnMinesMinetnFromBranchStubLikeC`** activates); **`watch_dig`** remainder (**`verbalize`**, **`angry_guards`**, **`get_iter_mons`**); **`zap_dig`** rock path **`xname`**; **`destroy_drawbridge`** **`e_died`/`scatter`** full parity; **`dig_up_grave`** **`mkclass`**/**`tt_oname`** full parity.
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
