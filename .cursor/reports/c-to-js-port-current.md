# NetHack C→JS port — **current slice** (read this first)

Thin handoff for the next coding session. Deep parity tables and history: [`c-to-js-port-progress.md`](c-to-js-port-progress.md) and [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md).

## Contract (non-negotiable)

- Port from **C semantics** in `nethack-c/upstream/` (init submodule if empty). Do **not** derive behavior from binaries or memorize the 44 public sessions.
- **Frozen** (do not edit): `js/isaac64.js`, `js/terminal.js`, `js/storage.js`.
- **Plain ES modules**, no build/WASM/network in contest code; RNG via `js/rng.js`; match **clang** evaluation order for multi-call expressions.
- API: [`docs/API.md`](../../docs/API.md); overview: [`README.md`](../../README.md).

**Last slice:** **`trap.js`** monster **`trapeffect_*`** from **`trap.c`** — **`BEAR_TRAP`** (size/amorphous/air/whirly/unsolid, **`thitm`** leg **`d(2,4)`**, iron boots), **`SLP_GAS_TRAP`** (**`rnd(25)`** + **`resistsSleep`/`breathless`**, **`msleeping`** stub), **`RUST_TRAP`** (**`rn2(5)`** vs **`mworn`** + lit **`minvent`** extinguish + iron golem kill), **`PIT`/`SPIKED_PIT`** (**`groundedMon`**, Sokoban **`inescapable`**, **`passes_walls`**, **`wearingIronShoesMonster`**, **`thitm`** **`rnd(10|6)`**), **`WEB`** (**`webmaker`/`mu_maybe_destroy_web`** stubs, tear heuristics via **`mname`/`msize`**, **`delTrap`**). **`mondata.js`:** **`MR_SLEEP`**, **`resistsSleep`**. **`mintrap`:** after selector, **`maybeMonsterUnhideAfterTrap`** (**`mundetected`** clear when **`canseemonRip`**). Still **TODO:** monster **`water_damage`** without hero “your” plines; **`sleep_monst`** **`mfrozen`**; **`HOLE`/`LANDMINE`/`mlevel_tele_trap`**; full **`maybe_unhide_at`**.

## Next steps (highest impact from latest fire/lava work)

1. Monster **`trapeffect_*`** for **`HOLE`/`TRAPDOOR`** (**`mlevel_tele_trap`**), **`LANDMINE`** (**`blow_up_landmine`**, weight gate); hero-grade **`water_damage`** / **`splash_lit`** on **`minvent`** for rust; **`sleep_monst`** parity (**`mfrozen`/`mcanmove`** on **`mtmp`**).
2. **`dofiretrap`** poly branch — **`u.mhmax`** handling vs C.
3. **`useupf`** / shop / **`distant_name`/`An`** on floor burn (`burn_floor_objects.js` gaps).
4. **`obj_resists`** / **`xname`** — replace stubs where fire paths depend on them.
5. **Full `melt_ice`** — **`obj_ice_effects`**, **`unearth_objs`**, **`boulder_hits_pool`**, **`cnv_trap_obj`** for mine/bear on ice, **`minliquid`**, **`MELT_ICE_AWAY`** timers.

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
