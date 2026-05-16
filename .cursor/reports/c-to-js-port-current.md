# NetHack C→JS port — **current slice** (read this first)

Thin handoff for the next coding session. Deep parity tables and history: [`c-to-js-port-progress.md`](c-to-js-port-progress.md) and [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md).

## Contract (non-negotiable)

- Port from **C semantics** in `nethack-c/upstream/` (init submodule if empty). Do **not** derive behavior from binaries or memorize the 44 public sessions.
- **Frozen** (do not edit): `js/isaac64.js`, `js/terminal.js`, `js/storage.js`.
- **Plain ES modules**, no build/WASM/network in contest code; RNG via `js/rng.js`; match **clang** evaluation order for multi-call expressions.
- API: [`docs/API.md`](../../docs/API.md); overview: [`README.md`](../../README.md).

**Last slice:** **`trap.c`** **`dofiretrap`** hero path — C **`Upolyd`** branch: golem **`alt`** (**`PM_PAPER`/`STRAW`/`WOOD`/`LEATHER`** + **`golemFireAltFromMname`** fallback), **`num`** from first **`d(2,4)`**; **`mhmax -= rn2(min(mhmax, num+1))`** when **`mhmax > mons[umonnum].mlevel`** (**`heroPolyFormMlevel`** from **`permonst.mlevel`**); damage **`u.mh`**. Human branch: **second** **`d(2,4)`** for **`uhpmax`** drain + **`losehp`** (**`KILLED_BY_AN`**); **`minuhpmax`** stub. **`const.js`:** golem **`PM_*`**. **`mondata.js`:** **`Permonst.mlevel`**, **`permonstHuman.mlevel`**. Still **TODO:** **`minuhpmax`/`setuhpmax`/`losexp`**; underwater/steam **`dofiretrap`** box branch; **`shieldeff`/`monstseesu`**.

## Next steps (highest impact from latest fire/lava work)

1. **`useupf`** / shop / **`distant_name`/`An`** on floor burn (`burn_floor_objects.js` gaps).
2. **`obj_resists`** / **`xname`** — replace stubs where fire paths depend on them.
3. **Full `melt_ice`** — **`obj_ice_effects`**, **`unearth_objs`**, **`boulder_hits_pool`**, **`cnv_trap_obj`** for mine/bear on ice, **`minliquid`**, **`MELT_ICE_AWAY`** timers.

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
