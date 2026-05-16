# NetHack C→JS port — **current slice** (read this first)

Thin handoff for the next coding session. Deep parity tables and history: [`c-to-js-port-progress.md`](c-to-js-port-progress.md) and [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md).

## Contract (non-negotiable)

- Port from **C semantics** in `nethack-c/upstream/` (init submodule if empty). Do **not** derive behavior from binaries or memorize the 44 public sessions.
- **Frozen** (do not edit): `js/isaac64.js`, `js/terminal.js`, `js/storage.js`.
- **Plain ES modules**, no build/WASM/network in contest code; RNG via `js/rng.js`; match **clang** evaluation order for multi-call expressions.
- API: [`docs/API.md`](../../docs/API.md); overview: [`README.md`](../../README.md).

**Last slice:** **Monster fire trap** — [`js/trap.js`](../../js/trap.js) **`trapeffectFireTrapForMonster`** (**`trap.c`** **`trapeffect_fire_trap`** non-hero): **`d(2,4)`**, **`fireResistant`/`raceptr`**, golem alt via **`mname`**, **`thitm`**-style kill or **`mhpmax`** **`rn2(num+1)`**, **`rn2(3)`** gate ( **`burnarmor`** / destroy / ignite **TODO**); **`burnFloorObjects(tx,ty,see_it,false)`**; smoke **`dist2≤9`**; **`meltIceAt(tx,ty)`**; **`seetrap`**. Caller **`mintrap`** / monmove still **TODO**.

## Next steps (highest impact from latest fire/lava work)

1. **`mintrap`** / monmove — call **`trapeffectFireTrapForMonster`** (and other **`trapeffect_*`**) when a monster steps on a trap; **`burnarmor(mtmp)`** + **`destroy_items`** + **`ignite_items`** parity on mon fire.
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
