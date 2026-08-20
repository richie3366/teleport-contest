# Review 239 — 20c69ccf — dothrow.c hurtle_step dest-typ switch_terrain (D-1277)

## Metadata
- Full / short hash: `20c69ccfc2cc56b74f45c0e907a99fd80d9034ec` / `20c69ccf`
- Parent: `2860794e` (D-1276). This file audits **this SHA only**. Archive row **Addressed:** D-1277 `20c69ccf` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 13:18:08 +0200
- D-id: **D-1277**
- Stats: 10 files, +114 / −48 — `js/dothrow.js` +10 / −2; comments `js/hack.js`.
- Claims to close: Open `dothrow.c` `hurtle_step` `switch_terrain` (named from D-1129 / reviews **230**/**231**). Not `u_on_rndspot`. `reviews/loop-2026-08-15/` has no unpaid hurtle Must-fix.
- JS / map: `dothrow.js` `hurtle_step`; live `hack.js` `switch_terrain`; `c-js-map/turns.md`. drown / `check_special_room` / traps / Passes_walls / `u_on_rndspot` / objnam wish named.
- Prior reviews this SHA claims to close: **230**/**231** named omit dothrow hurtle after `spoteffects` / `digactualhole`.

## Intent vs deliverable

Git subject promises: “Match C dothrow.c hurtle_step so occupying a cell of different terrain runs switch_terrain after flush, instead of skipping leftover Lev/Fly FROMOUTSIDE.”

C `hurtle_step` (`dothrow.c:794–795`) captures dest `ltyp = lev->typ` before the bump/`m_at` returns; after occupy (`:907–917`) `u_on_newpos` / `newsym(ox,oy)` / `vision_recalc(1)` / `flush_screen(1)` then `if (ltyp != levl[ox][oy].typ) switch_terrain()` before `check_special_room`. Body live D-1129 (`hack.c:3178–3217`). Callers: `hurtle` via `walk_path`; `hurtle_jump`.

Old JS: occupy + `newsym`/`vision_recalc`/`flush_screen` then decrement `*range`; named omit listed `switch_terrain`.

The diff **does** await live `switch_terrain` under that dest-typ gate after flush. It does **not** port `u_on_newpos` (still `u.ux=x`), Passes_walls, Sokoban diagonal, `drag_ball`, `check_special_room`, drown/waterwall, jumping `I_SPECIAL`, petrify bump, trap pass-over, or `u_on_rndspot`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| dest-typ gate after flush | C `:916–917`, **wired** | dest `ltyp` vs origin typ saved before occupy |
| `switch_terrain` | C `hack.c:3178`, **imported live** | D-1129 / D-1151; not a stub |
| occupy `u.ux`/`usteed` | C `u_on_newpos`, **pre-existing clone** | no `MAX_TYPE` write (named on `u_on_newpos`) |
| `check_special_room` | C `:921`, **named omit** | after switch_terrain in C |
| drown / lava Norep | C `:923–935`, **named omit** | |
| Passes_walls / `may_passwall` | C `:797`, **named omit** | JS still bumps obstructed |
| `u_on_rndspot` / objnam wish | **named omit** | next SHA / still Open |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. `FORCEBUNGLE` in this file is a pre-existing C const, not ALIGN. Rule #2 clean. **No new RNG** in the await.

## C ↔ JS fidelity

Pinned C (`dothrow.c:907–917`):

```
    ox = u.ux;
    oy = u.uy;
    u_on_newpos(x, y);
    newsym(ox, oy);
    vision_recalc(1);
    flush_screen(1);
    if (ltyp != levl[ox][oy].typ)
        switch_terrain();
```

`ltyp` is dest typ captured at `:795` before bump returns. After `u_on_newpos`, `levl[ox][oy].typ` is still the origin cell. JS saves `originTyp` before writing `u.ux`, compares dest `ltyp` (already captured the same way) after flush. Equivalent unless occupy mutated origin typ — `u_on_newpos` does not.

Callee is **live** `switch_terrain`: `blocklev` = obstructed / closed door / waterwall / LAVAWALL → set BLev/BFly `FROMOUTSIDE` (skip `float_down`); else clear leftover bits + `float_up` / `float_vs_flight`. ROOM→ROOM skips the call (C same) so leftover on same typ stays — that is C. STONE→ROOM runs the body and unblocks. WATER dest with leftover fly: body sees waterwall/pool? `IS_WATERWALL` / `LAVAWALL` are `blocklev`; ordinary POOL is not this function’s drown arm (named). Say so: this is **not** “Match C full hurtle drown”; it **is** “Match C dest-typ dispatch into live `switch_terrain`.”

JS still assigns `ux,uy` instead of `u_on_newpos` (no `lastseentyp` / `MAX_TYPE`). Hurtle’s gate does not need `MAX_TYPE`; C hurtle uses dest-typ, not the MAX_TYPE reader. Pre-existing occupy clone, named on `classify_terrain`, not a false switch_terrain.

Range decrement stays after the await, matching C `*range` after the terrain block (C does more work in between — named).

## Hallucinations / overclaim

Subject + D-1277 say occupying a different-typ cell runs `switch_terrain` after flush. **The dest-typ await is the hunk.** Stamping **Addressed:** D-1277 is fair. Do **not** stamp “Match C `u_on_newpos` `MAX_TYPE`.” Do **not** stamp “Match C drown / `check_special_room` / trap `dotrap` / Passes_walls through stone.” Do **not** stamp “Match C `u_on_rndspot`.” `async` is the existing D-1129 await, not invented input.

## Density

One C `if` at a named `switch_terrain` caller. ~10 JS lines. Same envelope as D-1268/D-1269 (one caller, live callee). Did not glue `u_on_rndspot`.

## Branch-by-branch confirm

1. ROOM→ROOM: skip `switch_terrain`; leftover BLev stays. Match C skip.
2. STONE→ROOM: await; clear BLev/BFly `FROMOUTSIDE`; maybe `float_up`. Match.
3. ROOM→CORR: typ differs; run body; not `blocklev`. Match.
4. ROOM→ICE: typ differs; unblock leftover. Match.
5. ROOM→WATERWALL / LAVAWALL: `blocklev`; You_cant lev/fly. Match body. Drown named.
6. Bump wall / bars / boulder / monster: return before occupy; no call. Match.
7. `*range==0` / `!isok` / `in_out_region` false: return before occupy. Match (D-1165).
8. Passes_walls through rock: JS still bumps. Named skip.
9. `check_special_room` / traps: not this SHA. Match the skip.
10. Public Tourist not hurtling: no-op. Match.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM.

## Verification

Journal: private canary **13**/13 (C dest-typ after flush; JS await after flush; ROOM→ROOM skip leftover BLev; STONE→ROOM clear BLev/BFly; ROOM→WATER You_cant; ROOM→LAVAWALL fly; ROOM→STONE bump no occupy; ROOM→CORR range--; `*range==0` skip; ROOM→ICE unblock; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session hurtles onto different terrain with leftover Lev/Fly FROMOUTSIDE. Cadence this audit: full `sessions` at HEAD `851d3e08` **44**/44 Scr **11,405**/11,405 RNG **100%**.

## Actionable C-wrongs

None for Must-fix. The gate matches C dest vs origin after flush; the callee is the live D-1129 body, not a no-op. Same-typ skip leaving leftover bits is C. Drown after this call is a named later arm, not a fake `switch_terrain`.

Named omits (map, not Must-fix):

1. `check_special_room`; drown / `is_waterwall`; lava Norep; trap `dotrap`
2. Passes_walls / `may_passwall`; Sokoban diagonal halt; `drag_ball`; jumping `I_SPECIAL`
3. `u_on_newpos` `map_location` / `MAX_TYPE`; dungeon.c `u_on_rndspot`; objnam wish

Do not Must-fix “JS occupy is `u.ux=x` not `u_on_newpos`.” Do not Must-fix “originTyp `| 0` when `at()` missing” (hero cell is on-map). Do not pull `u_on_rndspot` this SHA.

## Callers / RNG ledger

C: `hurtle` / jump `walk_path`. JS `hurtle_step` from `hurtle`. No new RNG. Public fortress is not evidence a hurtle crossed STONE→ROOM.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: hurtle occupy now awaits live `switch_terrain` when dest typ differs after flush; drown / Passes_walls / rndspot stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1277 `20c69ccf`.
