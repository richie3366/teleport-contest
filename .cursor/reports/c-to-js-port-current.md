# NetHack C→JS port — **current slice** (read this first)

Thin handoff for the next coding session. Deep parity tables and history: [`c-to-js-port-progress.md`](c-to-js-port-progress.md) and [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md).

## Contract (non-negotiable)

- Port from **C semantics** in `nethack-c/upstream/` (init submodule if empty). Do **not** derive behavior from binaries or memorize the 44 public sessions.
- **Frozen** (do not edit): `js/isaac64.js`, `js/terminal.js`, `js/storage.js`.
- **Plain ES modules**, no build/WASM/network in contest code; RNG via `js/rng.js`; match **clang** evaluation order for multi-call expressions.
- API: [`docs/API.md`](../../docs/API.md); overview: [`README.md`](../../README.md).

**Last slice:** **`mon.c`** **`minliquid`** lava survivor tail after **`fire_damage_chain`**: **`rlocMinliquidEscape`** then **`dealWithOvercrowding`** (**`js/mon_limbo.js`** — **`dealWithOvercrowding`**: **`In_endgame`** → **`elementalClog`** with **`You feel besieged.`** gate (**`rn2(2)`** / 200 moves), victim priority **m1…m5** + **`rloc_to`**-style move **`mon`** onto victim tile or **`MON_ENDGAME_MIGR`** down-plane migrate; else **`mIntoLimbo`** = **`MON_LIMBO`** + **`migratingMons`** like **`trap.js`** **`migrateToLevelMon`**). **`melt_ice.js`** wires **`if (!await rlocMinliquidEscape(…, RLOC_MSG)) await dealWithOvercrowding`**. Still TODO: full **`teleport.c`** **`rloc`** (**`usteed`/`tele()`**, **`collect_coords`**, **`rloc_pos_ok`**), pool survivor **`water_damage_chain`+`rloc`+`deal`** when **`mondied`** leaves live mon, **`mdrop_special_objs`** / full **`mongone`**, **`trap.js`** gremlin **`splitMon`**, hero **`dryup`**. **`npm run score`:** **0/44** (unchanged).

## Next steps (highest impact from latest fire/lava work)

1. **`melt_ice` / cold remainder** — wire **`splitMon`/`dryupAt`** from **`trap.js`** gremlin paths for shared RNG slice; pool **`minliquid`** survivor branch when **`mondied`** semantics exist; **`spoteffects`**; **`repair_damage`** trap **`LANDMINE`/`BEAR_TRAP`** **`mksobj`/`mpickobj`**, **`litter_scatter`**, **`block_point`**; wire **`payForDamage`** from **`dig`/`kick`** when those modules exist; fuller **`setmangry`**; real **`dozap`** + **`getobj`**; **`zombie_form`** / **`ZOMBIFY_MON`**; fuller **`revive`** / egg **`TIMER_OBJECT`**; full **`digactualhole`** / **`placebc`**; **`mbuzzOffensiveWandFromMonsterTowardMux`** from real **`monmove`** + **`find_offensive`**; full **`rloc`** / **`usteed`**.
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
