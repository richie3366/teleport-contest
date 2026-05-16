# NetHack C→JS port — **current slice** (read this first)

Thin handoff for the next coding session. Deep parity tables and history: [`c-to-js-port-progress.md`](c-to-js-port-progress.md) and [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md).

## Contract (non-negotiable)

- Port from **C semantics** in `nethack-c/upstream/` (init submodule if empty). Do **not** derive behavior from binaries or memorize the 44 public sessions.
- **Frozen** (do not edit): `js/isaac64.js`, `js/terminal.js`, `js/storage.js`.
- **Plain ES modules**, no build/WASM/network in contest code; RNG via `js/rng.js`; match **clang** evaluation order for multi-call expressions.
- API: [`docs/API.md`](../../docs/API.md); overview: [`README.md`](../../README.md).

**Last slice:** **`shk.c`** **`fix_shop_damage`** + **`repair_damage(…,TRUE)`** subset + **`repairable_damage`** / **`shk_impaired`** / **`inhishop`** — **`js/shop.js`**: **`fixShopDamage(g)`** iterates **`isshk`**, **`repairDamageCatchup`** (**`delTrap`**/**`delEngrAt`**/**`newsym`**, restore **`typ`/`flags`/`doormask`**); defers if floor objects (**`litter_scatter`** not ported); no **`mksobj`/`mpickobj`** on trap catch-up; **`eshkShoproomAsLevlRno`** + **`shopKeeperForLevlRoomno`** align **`shoproom`** with C **`levl.roomno`**. **`npm run score`:** **0/44**.

## Next steps (highest impact from latest fire/lava work)

1. **`melt_ice` / cold remainder** — wire **`zapOverFloorAlongRay`** from real wand/breath/monster **`buzz`** when that harness exists; full **`obj_ice_effects`** (**`obj_timer_checks`**, buried); real **`bury_objs`**/**`unearth_objs`**; fuller **`boulder_hits_pool`** / **`minliquid`** / **`spoteffects`**; **`shk.c`** **`pay_for_damage`**; **`repair_damage`** trap **`LANDMINE`/`BEAR_TRAP`** **`mksobj`/`mpickobj`**, **`litter_scatter`**, **`block_point`**; fuller **`setmangry`** ( **`humanoid`**, alignment, **`peacefuls_respond`**).
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
