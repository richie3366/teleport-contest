# NetHack C→JS port — **current slice** (read this first)

Thin handoff for the next coding session. Deep parity tables and history: [`c-to-js-port-progress.md`](c-to-js-port-progress.md) and [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md).

## Contract (non-negotiable)

- Port from **C semantics** in `nethack-c/upstream/` (init submodule if empty). Do **not** derive behavior from binaries or memorize the 44 public sessions.
- **Frozen** (do not edit): `js/isaac64.js`, `js/terminal.js`, `js/storage.js`.
- **Plain ES modules**, no build/WASM/network in contest code; RNG via `js/rng.js`; match **clang** evaluation order for multi-call expressions.
- API: [`docs/API.md`](../../docs/API.md); overview: [`README.md`](../../README.md).

**Last slice:** **`mon.c`** **`minliquid_core`** ( **`melt_ice.js`** **`minliquidMonsterAfterMelt`** ): **`u.usteed`** + hero **`Flying`/`Levitation`** skip (**`!waterwall`**); gremlin **`rn2(3)`** + **`waterDamageChain`** (no **`split_mon`/`dryup`** yet); iron golem pool **`d(2,6)`** rust / death + wet inventory; lava (**`inlava`**) teleport gate (**`rloc`** stub), **`fireResistant`** branches, **`XKILL_NOCORPSE`** kills, partial **`on_fire`** phrase (**`PM_WATER_ELEMENTAL`** → boils away); pool/waterwall drowning + **`engulfing_u`** pline; land eel **`S_EEL`** **`rn2(mhp)>rn2(8)`** mhp-- (**`monflee`** TODO). **`mondata.js`**: **`S_EEL`**, **`canTeleportMon`**, **`teleRestrictMon`** (**`noteleport`/`stasis_until`**). Still TODO: **`rloc`**, **`split_mon`/`dryup`**, **`fire_damage_chain`**, **`monflee`**, **`deal_with_overcrowding`**, full **`tele_restrict`**. **`npm run score`:** **0/44** (unchanged).

## Next steps (highest impact from latest fire/lava work)

1. **`melt_ice` / cold remainder** — wire **`mbuzzOffensiveWandFromMonsterTowardMux`** from **`muse.c`** when **`monmove`** + **`find_offensive`** exist (**`monmove.js`** still harness); **`minliquid`** **`rloc`** / **`split_mon`/`dryup`/`fire_damage_chain`/`monflee`**; **`spoteffects`**; **`repair_damage`** trap **`LANDMINE`/`BEAR_TRAP`** **`mksobj`/`mpickobj`**, **`litter_scatter`**, **`block_point`**; wire **`payForDamage`** from **`dig`/`kick`** when those modules exist; fuller **`setmangry`**; real **`dozap`** + **`getobj`**; **`zombie_form`** / **`ZOMBIFY_MON`**; fuller **`revive`** / egg **`TIMER_OBJECT`**; full **`digactualhole`** / **`placebc`**.
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
