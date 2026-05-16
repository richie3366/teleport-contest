# NetHack C→JS port — **current slice** (read this first)

Thin handoff for the next coding session. **Gap inventory (not yet ported):** [`c-to-js-port-remaining.md`](c-to-js-port-remaining.md). Deep parity tables and history: [`c-to-js-port-progress.md`](c-to-js-port-progress.md) and [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md). **Repeatable user/agent prompt:** [`.cursor/prompts/continue-nethack-port.md`](../prompts/continue-nethack-port.md).

## Contract (non-negotiable)

- Port from **C semantics** in `nethack-c/upstream/` (init submodule if empty). Do **not** derive behavior from binaries or memorize the 44 public sessions.
- **Frozen** (do not edit): `js/isaac64.js`, `js/terminal.js`, `js/storage.js`.
- **Plain ES modules**, no build/WASM/network in contest code; RNG via `js/rng.js`; match **clang** evaluation order for multi-call expressions.
- API: [`docs/API.md`](../../docs/API.md); overview: [`README.md`](../../README.md).

**Last slice:** **`mon.c`** **`angry_guards`** — **`shop.js`** **`angryGuardsSilentLikeC`**: iterate peaceful **`is_watch`** watchmen (**`isWatchMonsterLikeC`**); **`canspotmon`** subset + **`m_next2u`** (**`mNext2uShopdig`**); clear **`msleeping`/`mfrozen`**; set **`mpeaceful`** **0**; plines (wake / adjacent / approaching / whistle) unless **`silent`**. **`mcanmove`** defaults true when unset. **`watch_dig.js`** docstring (**`angry_guards`** no longer stub). **`npm run score`:** **0/44**; **`seed0060`** **991/3626** (unchanged).

## Next steps (highest impact from latest fire/lava work)

1. Extend **`distfleeck`** to further moveloop steps — match **`monmove.c`** **`dochug`** (**`distfleeck`** ~791, **`m_move`**/**`m_throw`**, **`distfleeck`** recalc ~915) per monster; peel harness only when per-mon draw counts match C (step **3** row is interleaved **`rn2(5)`**/**`rn2(32)`**, not N× first-**`distfleeck`** only); grid **`domove`**, **`attack`**, …; remainder **`flooreffects`** (**`hmon`/`mondied`** full, teeter); fuller **`sellobj`** (**`ynaq`**, **`dropped_container`**, bones **`robbed`**); then wire full **`dig()`** / **`dighole`** (non-wizard path) and remaining shop pit / full **`digactualhole`/`maketrap`**; **`zap_dig`** **`uswallow`**/**`pit_flow`**/**`dighole`** from pit; shop **`PASSED_DESTROY_TRAP`**; call **`spotChecksLikeC`** from other **`dighole`**-equivalent exits when terrain at **`(x,y)`** changes ( **`apply.c`** **`do_break_wand`**, **`music.c`** **`do_earthquake`** ) once those paths exist; **`dozap`** **`getobj`**/**cursed `backfire`**/**`zapyourself`**/**`zapnodir`**; **`SPE_DIG`**; fuller **`setmangry`**; **`zombie_form`** / **`ZOMBIFY_MON`**; fuller **`revive`** / egg **`TIMER_OBJECT`**; full **`digactualhole`** / **`placebc`**; **`mbuzzOffensiveWandFromMonsterTowardMux`** from real **`monmove`** + **`find_offensive`**; full **`rloc`** / **`usteed`**; hero fountain **`dryup`** (**`in_town`** / wizard **`y_n`**); full **`mondied`/`xkilled`** so pool survivor tail consumes RNG like C; **`spoteffects`**: full pooleffects / **`set_uinwater`**, **`meltIceAt`** alignment, sink+Levitation / float_down / **`in_steed_dismounting`**; **`switch_terrain`**: steed/**`dismount`**, **`classify`** / **`drawbridge`** parity; **`steed.c`**-style **`steedVsStealthLikeC`** on mount/dismount when **`usteed`** is ported; **`repair_damage`** remainder (**`picking_at`**, ball&chain **`litter_scatter`**, bill **`subfrombill`**); **`kick.js`** **`bhit`** remainder (**`thitmonst`**, **`ship_object`**, **`scatter`**, shop **`costly`**) / secret doors / full **`attack_checks`** / poly **`AT_KICK`**; full **`dungeon.c`** **`init_dungeons`**/**`place_level`** so **`sp_levchn`** + minetn **`dlevel`** match C (**`bootstrapSpLevchnMinesMinetnFromBranchStubLikeC`** activates); **`watch_dig`** **`stop_occupation`** when **`is_digging`** matches C; **`angry_guards`** remainder (**`Soundeffect`**, **`You_hear`** vs **`pline`**, full **`canspotmon`**/**`vtense`**/**`plur`**); **`zap_dig`** rock path **`xname`**; **`destroy_drawbridge`** **`e_died`/`scatter`** full parity; **`dig_up_grave`** **`mkclass`**/**`tt_oname`** full parity.
2. **`chest_trap`** / **`dofiretrap`** — full **`pickup.c`** **`#loot`** / menu (**`u_handsy`** done for trapped **`#l`** / **`heroOpenTrapped`** only); **`lock.c`** remainder: **`apply`**/**`doapply`** / **`get_adjacent_loc`** / resume **`xlock`** / **`touch_artifact`**; fuller **`insight.c`** beyond **`#i`** item-bulk lines; wire **`bTrappedTinNoPartHeroLikeC`** when **`eat.c`** **`consume_tin`** is ported; **`losexp`** / **`rehumanize`** — still TODO: full **`polyman`** stack (**`nomul`**, **`update_inventory`**, **`retouch_equipment`**, **`selftouch`**, **`emits_light`**), wizard **`done`** explore branch, **`u.uhp`** path vs C **`really_done`**.
3. **Scroll discovery remainder** — **`read`/`pickup`** when those modules match C; optional shared **`makeknown`-style** helper (avoid import cycles); audit **`mklev.js`** **`otyp`** literals vs **`objects_nums`**.

## After you ship a slice

1. Append **one table row** to [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md) (same columns as existing rows).
2. Refresh **this file** (next steps + one-line “last slice”).
3. Run **`npm run score`** when the change touches RNG-visible behavior.
4. **`git commit`** — one commit per meaningful slice (see [`.cursor/prompts/continue-nethack-port.md`](../prompts/continue-nethack-port.md)); conventional message (`feat(js):` / `fix(js):` / `docs(port):`, …).

---

## Copy-paste: continue the port

Prefer the **canonical** text in [`.cursor/prompts/continue-nethack-port.md`](../prompts/continue-nethack-port.md) (includes `c-to-js-port-remaining.md` skim + **git commit per slice**). Legacy one-liners:

```
Continue NetHack 5.0 C→JS: read .cursor/reports/c-to-js-port-current.md first (not the full progress doc). Do the top next step; port from nethack-c/upstream C semantics; do not tune to public sessions; do not edit js/isaac64.js, js/terminal.js, js/storage.js. When done: update c-to-js-port-current.md, append one row to c-to-js-port-changelog-archive.md, npm run score if relevant, git commit this slice.
```

Shorter variant:

```
Continue port: read .cursor/reports/c-to-js-port-current.md, top next step, C upstream only, frozen js/* harness untouched, then refresh current + one changelog row + score if needed + git commit the slice.
```
