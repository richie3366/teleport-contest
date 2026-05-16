# NetHack C→JS port — **current slice** (read this first)

Thin handoff for the next coding session. Deep parity tables and history: [`c-to-js-port-progress.md`](c-to-js-port-progress.md) and [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md).

## Contract (non-negotiable)

- Port from **C semantics** in `nethack-c/upstream/` (init submodule if empty). Do **not** derive behavior from binaries or memorize the 44 public sessions.
- **Frozen** (do not edit): `js/isaac64.js`, `js/terminal.js`, `js/storage.js`.
- **Plain ES modules**, no build/WASM/network in contest code; RNG via `js/rng.js`; match **clang** evaluation order for multi-call expressions.
- API: [`docs/API.md`](../../docs/API.md); overview: [`README.md`](../../README.md).

**Last slice:** **`hack.c`** **`switch_terrain`** / **`classify_terrain`** via **`js/switch_terrain.js`**: **`spoteffects`** calls when **`spotterrain != levl[ux0][uy0].typ`** or **`iflags.terrain_typ`** unset/**`MAX_TYPE`**; **`blocklev`** (**`IS_OBSTRUCTED`**, **`closed_door`**, **`IS_WATERWALL`**, **`LAVAWALL`**) toggles **`BLevitation`/`BFlying`** **`FROMOUTSIDE`**, **`You can't levitate/fly in here.`**; unblock clears mask, **`float_up`** subset (**`trap.c`**: no **`utrap`/`uinwater`/`uswallow`** yet), **`You start flying.`**; **`classifyTerrainHeroLikeC`** sets **`iflags.terrain_typ`** (**`rm.h`** **`X_*`** indices in **`const.js`**). **`allmain`**: **`HLevitation`/`ELevitation`/`BLevitation`/`HFlying`/`EFlying`/`BFlying`** init **0**. Still TODO: **`float_vs_flight`**, full **`float_up`**, C **`classify`** gating vs **`flags.terrainstatus`**, **`drawbridge`**/**`db_under_typ`**, Medusa moat **`xSEA`**; **`spoteffects`** sink+Levitation / **`HLevitation`** timeout / **`gi.in_steed_dismounting`**, full pooleffects/**`set_uinwater`**. **`npm run score`:** **0/44**; **`seed0060`** RNG **991/3626** (unchanged).

## Next steps (highest impact from latest fire/lava work)

1. **`melt_ice` / cold remainder** — wire full **`dig()`** / **`dighole`** (non-wizard path) and remaining shop pit / **`digactualhole`**; **`zap_dig`** **`u.dz`**/**`uswallow`**/**`pit_flow`**/**`watch_dig`**/**`dighole`** from pit; **`dozap`** **`getobj`**/**cursed `backfire`**/**`zapyourself`**/**`zapnodir`**; **`SPE_DIG`**; fuller **`setmangry`**; **`zombie_form`** / **`ZOMBIFY_MON`**; fuller **`revive`** / egg **`TIMER_OBJECT`**; full **`digactualhole`** / **`placebc`**; **`mbuzzOffensiveWandFromMonsterTowardMux`** from real **`monmove`** + **`find_offensive`**; full **`rloc`** / **`usteed`**; hero fountain **`dryup`** (**`in_town`** / wizard **`y_n`**); full **`mondied`/`xkilled`** so pool survivor tail consumes RNG like C; **`spoteffects`**: full pooleffects / **`set_uinwater`**, **`meltIceAt`** alignment, sink+Levitation / float_down / **`in_steed_dismounting`**; **`switch_terrain`** **`float_vs_flight`** / full **`float_up`** / **`classify`** parity; **`repair_damage`** remainder (**`picking_at`**, ball&chain **`litter_scatter`**, bill **`subfrombill`**); **`kick.js`** **`bhit`** remainder (**`thitmonst`**, **`ship_object`**, **`scatter`**, shop **`costly`**) / secret doors / full **`attack_checks`** / poly **`AT_KICK`**.
2. **`minuhpmax`/`setuhpmax`/`losexp`** ( **`dofiretrap`** human branch ); underwater/steam **`dofiretrap`** box branch; **`shieldeff`/`monstseesu`**.
3. **Wire `discoverScrollOtyp`** from **`read`** / **`pickup`** / **`makeknown`** when scroll ID is learned; audit remaining **`mklev.js`** **`otyp`** literals vs **`objects_nums`**.

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
