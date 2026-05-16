# NetHack C→JS port — **current slice** (read this first)

Thin handoff for the next coding session. Deep parity tables and history: [`c-to-js-port-progress.md`](c-to-js-port-progress.md) and [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md).

## Contract (non-negotiable)

- Port from **C semantics** in `nethack-c/upstream/` (init submodule if empty). Do **not** derive behavior from binaries or memorize the 44 public sessions.
- **Frozen** (do not edit): `js/isaac64.js`, `js/terminal.js`, `js/storage.js`.
- **Plain ES modules**, no build/WASM/network in contest code; RNG via `js/rng.js`; match **clang** evaluation order for multi-call expressions.
- API: [`docs/API.md`](../../docs/API.md); overview: [`README.md`](../../README.md).

**Last slice:** **`shk.c`** **`repair_damage`** (**`fix_shop_damage`** catch-up): **`js/shop.js`** — **`LANDMINE`/`BEAR_TRAP`** → **`mksobjTrapObjForShopRepair`** + **`rnd(2)`** + **`mpickobjShk`** (**`minvent`**), then **`delTrapIn`**; wall/door restore sets **`loc.typ`/`doormask`/`flags`** then **`litterGetposShopRepair`/`litterScatterShopRepair`** (**`ZAP_POS`**, **`insideShopLevlRoomno`**, boulder/rock **`obliterateObjectInLevel`**, adjacent **`placeFloorObjectInLevel`**+**`stackObj`**), **`repairBlockPoint`** (**`vision_recalc`**), **`litterNewsymsRepair`**. Still TODO: **`Punished`** verbalize + **`unplacebc`**, **`subfrombill`/`onbill`**, **`picking_at`**, full **`recalc_block_point`**, **`payForDamage`**/**`dig`/`kick`**. **`npm run score`:** **0/44** (unchanged).

## Next steps (highest impact from latest fire/lava work)

1. **`melt_ice` / cold remainder** — wire **`payForDamage`** from **`dig`/`kick`** when those modules exist; fuller **`setmangry`**; real **`dozap`** + **`getobj`**; **`zombie_form`** / **`ZOMBIFY_MON`**; fuller **`revive`** / egg **`TIMER_OBJECT`**; full **`digactualhole`** / **`placebc`**; **`mbuzzOffensiveWandFromMonsterTowardMux`** from real **`monmove`** + **`find_offensive`**; full **`rloc`** / **`usteed`**; hero fountain **`dryup`** (**`in_town`** / wizard **`y_n`**); full **`mondied`/`xkilled`** so pool survivor tail consumes RNG like C; extend **`spoteffects`** (**`switch_terrain`**, ice Warning, **`m_at`** piercer, **`meltIceAt`** alignment); **`repair_damage`** remainder (**`picking_at`**, ball&chain **`litter_scatter`**, bill **`subfrombill`**).
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
