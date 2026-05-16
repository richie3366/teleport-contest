# NetHack C→JS port — **current slice** (read this first)

Thin handoff for the next coding session. Deep parity tables and history: [`c-to-js-port-progress.md`](c-to-js-port-progress.md) and [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md).

## Contract (non-negotiable)

- Port from **C semantics** in `nethack-c/upstream/` (init submodule if empty). Do **not** derive behavior from binaries or memorize the 44 public sessions.
- **Frozen** (do not edit): `js/isaac64.js`, `js/terminal.js`, `js/storage.js`.
- **Plain ES modules**, no build/WASM/network in contest code; RNG via `js/rng.js`; match **clang** evaluation order for multi-call expressions.
- API: [`docs/API.md`](../../docs/API.md); overview: [`README.md`](../../README.md).

**Last slice:** **`hack.c`** **`in_rooms(x,y,SHOPBASE)`** for **`SHARED`** and **`SHARED_PLUS`** tiles — **`js/shop.js`**: **`inRoomsShopbaseSharedNeighborScan`** (**`step`** 2 vs 1, same **`min_x`/`max_x`/`min_y`/`max_y_offset`** edge rules as C), **`pushShopbaseRoomnoUnique`**; **`inRoomsShopbaseRoomnos`** now returns adjacent shop roomnos from shared wall tiles ( **`add_damage`** / **`applyZapShopDoorDamage`**). JSDoc: avoid a **`**/**`** sequence inside block comments (premature **`*/`**). **`npm run score`:** **0/44**.

## Next steps (highest impact from latest fire/lava work)

1. **`melt_ice` / cold remainder** — wire **`zapOverFloorAlongRay`** from real wand/breath/monster **`buzz`** when that harness exists; full **`obj_ice_effects`** (**`obj_timer_checks`**, buried); real **`bury_objs`**/**`unearth_objs`**; fuller **`boulder_hits_pool`** / **`minliquid`** / **`spoteffects`**; **`pay_for_damage`** / **`fix_shop_damage`** consumers of **`damagelist`**; fuller **`setmangry`** ( **`humanoid`**, alignment, **`peacefuls_respond`**).
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
