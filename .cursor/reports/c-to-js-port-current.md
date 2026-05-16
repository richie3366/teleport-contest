# NetHack C→JS port — **current slice** (read this first)

Thin handoff for the next coding session. Deep parity tables and history: [`c-to-js-port-progress.md`](c-to-js-port-progress.md) and [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md).

## Contract (non-negotiable)

- Port from **C semantics** in `nethack-c/upstream/` (init submodule if empty). Do **not** derive behavior from binaries or memorize the 44 public sessions.
- **Frozen** (do not edit): `js/isaac64.js`, `js/terminal.js`, `js/storage.js`.
- **Plain ES modules**, no build/WASM/network in contest code; RNG via `js/rng.js`; match **clang** evaluation order for multi-call expressions.
- API: [`docs/API.md`](../../docs/API.md); overview: [`README.md`](../../README.md).

**Last slice:** **`dig.c`** **`zap_dig`** horizontal: **`js/zap_dig.js`** — **`heroZapDigHorizontalLikeC`** (**`rn1(18,8)`** loop, **`maze_dig`** vs **`IS_OBSTRUCTED`** branch order, shop **`addDamageAt`** + **`payAfterHeroDigShopHoleLikeC`**; pit-adjacent **`conjoined_pits`** / **`adj_pit_checks`** skeleton, **`dighole`** from pit + **`pit_flow`** + **`watch_dig`** / **`u.dz`** / **`uswallow`** deferred). **`js/buzz.js`** — **`WAN_DIGGING`** **305**. **`js/extcmd.js`** — wizard **`#d`** → **`heroZapDigHorizontalLikeC`**. Still TODO: wire **`zap_dig`** from real **`dozap`** / wand digging (**`WAN_DIGGING`** vs fire **`BZ_OFS_WAN`** collision), full **`dighole`**, **`kick`** / hero dig **`dig_pay`**; **`maybe_kick_monster`**, **`in_town`**. **`npm run score`:** **0/44**; **`seed0060`** RNG prefix still **991/3626** vs C (unchanged).

## Next steps (highest impact from latest fire/lava work)

1. **`melt_ice` / cold remainder** — **`dozap`** + **`getobj`** for digging wand (**`WAN_DIGGING`**) → **`heroZapDigHorizontalLikeC`** (or spell **`zap_dig`**) without **`#d`**-only harness; hero **`dighole`**/**`dig`** paths: **`add_damage`** + **`payAfterHeroDigShopHoleLikeC`**; **`zap_dig`** **`u.dz`**/**`uswallow`**/**`pit_flow`**/**`watch_dig`**/**`dighole`** from pit; fuller **`setmangry`**; **`zombie_form`** / **`ZOMBIFY_MON`**; fuller **`revive`** / egg **`TIMER_OBJECT`**; full **`digactualhole`** / **`placebc`**; **`mbuzzOffensiveWandFromMonsterTowardMux`** from real **`monmove`** + **`find_offensive`**; full **`rloc`** / **`usteed`**; hero fountain **`dryup`** (**`in_town`** / wizard **`y_n`**); full **`mondied`/`xkilled`** so pool survivor tail consumes RNG like C; extend **`spoteffects`** (**`switch_terrain`**, ice Warning, **`m_at`** piercer, **`meltIceAt`** alignment); **`repair_damage`** remainder (**`picking_at`**, ball&chain **`litter_scatter`**, bill **`subfrombill`**); **`kick.js`** **`maybe_kick_monster`** / object-kick / secret doors.
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
