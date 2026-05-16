# NetHack C→JS port — **current slice** (read this first)

Thin handoff for the next coding session. Deep parity tables and history: [`c-to-js-port-progress.md`](c-to-js-port-progress.md) and [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md).

## Contract (non-negotiable)

- Port from **C semantics** in `nethack-c/upstream/` (init submodule if empty). Do **not** derive behavior from binaries or memorize the 44 public sessions.
- **Frozen** (do not edit): `js/isaac64.js`, `js/terminal.js`, `js/storage.js`.
- **Plain ES modules**, no build/WASM/network in contest code; RNG via `js/rng.js`; match **clang** evaluation order for multi-call expressions.
- API: [`docs/API.md`](../../docs/API.md); overview: [`README.md`](../../README.md).

**Last slice:** **`mintrap` + monster `trapeffect_*`** — C **`trap.c`** **`mintrap`** **`mtrapped`** branch: **`seetrap`** visibility gate; **`!rn2(40)`** or **`m_easy_escape_pit`** (**`msize >= MZ_HUGE`**, **`PM_PIT_FIEND`** TODO); boulder-in-pit **`sobj_at`/`rn2(2)`** + **`fill_pit`** stub + **`newsym`**; else escape plines + clear **`mtrapped`**; **`metallivorous`** bear (**`delTrap`**, **`meating`**) / spiked pit (**`ttyp→PIT`**). **`thitmMonster`**: **`find_mac`** stub (**`mtmp.mac`** or **`permonst.ac`**), **`rnd(20)`** vs **`tlev`+`spe`**, **`dmgval`**, **`passes_rocks`** rock harmless, **`placeFloorObject`** on miss / **`d_override`**. **`trapeffectMonsterSelector`**: **`ARROW_TRAP`**, **`DART_TRAP`** (**`rn2(6)`** poison), **`ROCK_TRAP`**, **`FIRE_TRAP`**. Remaining C selector cases still **`TRAP_EFFECT_FINISHED`** (no RNG).

## Next steps (highest impact from latest fire/lava work)

1. Monster **`trapeffect_*`** for **`BEAR_TRAP`**, **`WEB`**, **`PIT`/`HOLE`**, **`SLP_GAS`**, **`RUST`**, **`LANDMINE`**, … (match C order / RNG); **`maybe_unhide_at`** after trap; real **`find_mac`** / **`monkilled`** killer strings.
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
