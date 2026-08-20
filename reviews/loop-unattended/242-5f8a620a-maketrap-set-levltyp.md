# Review 242 — 5f8a620a — trap.c maketrap PIT/HOLE set_levltyp (D-1280)

## Metadata
- Full / short hash: `5f8a620a28143d40557cbb3b76d2c94a1637c23b` / `5f8a620a`
- Parent: `12d815ca` (D-1279). This file audits **this SHA only**. Archive row **Addressed:** D-1280 `5f8a620a` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 14:16:46 +0200
- D-id: **D-1280**
- Stats: 15 files, +228 / −188 — `js/trap.js` +107; `js/music.js` −29 inline morph; comments `js/hack.js`/`dig.js`/`pickup.js`.
- Claims to close: Open `trap.c` `maketrap` PIT/HOLE `set_levltyp` (named from D-1269 / review **231**). Not liquid_flow. `reviews/loop-2026-08-15/` has no unpaid maketrap-morph Must-fix.
- JS / map: `trap.js` `maketrap` / local `set_levltyp` / `maketrap_unearth_objs`; `music.js` `do_pit` drops D-0972 inline; `c-js-map/turns.md` + `data.md`. DRAWBRIDGE_UP ice / shop `add_damage` / `liquid_flow` named.
- Prior reviews this SHA claims to close: **231** named omit maketrap morph so encased-rock `switch_terrain` still saw `blocklev`.

## Intent vs deliverable

Git subject promises: “Match C trap.c maketrap so a PIT or HOLE on STONE/SCORR/wall morphs via set_levltyp, instead of leaving the cell obstructed so leftover Lev/Fly stays blocked.”

C `maketrap` (`trap.c:514–565`): PIT/SPIKED `conjoined=0` FALLTHROUGH HOLE/TRAPDOOR; `hole_destination` if hole; shop `add_damage` (named); then DRAWBRIDGE_UP keep mask + ice→floor (named) else `set_levltyp` IS_ROOM→ROOM / STONE|SCORR→CORR / wall|SDOOR maze?ROOM:cavernous?CORR:DOOR; `if (clear_flags) lev->flags=0`; `unearth_objs`; `recalc_block_point`. Callee `mkmaze.c` `set_levltyp` `:77–121`. Caller `dig.c` `digactualhole` `:690` before D-1269 `switch_terrain`. `music.c` `do_pit` `:228` calls `maketrap`, no duplicate morph.

Old JS: HOLE/TRAPDOOR `hole_destination` only; `do_pit` inlined IS_ROOM/STONE subset (D-0972).

The diff **does** the C if-else in shared `maketrap` and deletes the `do_pit` inline. It does **not** port shop `add_damage`, DRAWBRIDGE_UP `DB_FLOOR`/ice melt, overwrite `reset_utrap`, Knox `LEVEL_TELEP`, or Sokoban finish. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| PIT/SPIKED/HOLE/TRAPDOOR morph | C `:514–565`, **wired** | conjoined=0 + fallthrough |
| `set_levltyp` | C `mkmaze.c:77`, **clone** | trap.js cannot import mkmaze analog; not a no-op |
| `maketrap_unearth_objs` | C `dig.c` `unearth_objs`, **clone** | cycle vs `dig.js`; buried-ball named |
| `recalc_block_point` | C, **imported live** | |
| `obj_ice_effects` / `spot_stop_timers` | C, **imported live** | used when clone sees ICE→not-ICE |
| `CAN_OVERWRITE_TERRAIN` | C `rm.h:320`, **clone** | already in trap.js |
| `do_pit` inline | D-0972 subset, **deleted** | now shared `maketrap` |
| DRAWBRIDGE_UP `DB_FLOOR` / ice | C `:532–545`, **named omit** | JS only `clear_flags=false` |
| shop `add_damage` | C `:523–527`, **named omit** | |
| SDOOR→AIR arboreal | C `set_levltyp:83–87`, **named omit** | not a maketrap newtyp |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG** in the morph (shop cost named; `choose_trapnote` / statue / launch unchanged).

## C ↔ JS fidelity

Pinned C (`trap.c:546–564`):

```
        } else if (IS_ROOM(lev->typ)) {
            (void) set_levltyp(x, y, ROOM);
        } else if (lev->typ == STONE || lev->typ == SCORR) {
            (void) set_levltyp(x, y, CORR);
        } else if (IS_WALL(lev->typ) || lev->typ == SDOOR) {
            (void) set_levltyp(x, y, svl.level.flags.is_maze_lev ? ROOM
                                     : svl.level.flags.is_cavernous_lev ? CORR
                                       : DOOR);
        }
        if (clear_flags)
            lev->flags = 0;
        unearth_objs(x, y);
        recalc_block_point(x, y);
```

JS copies that if-else, then `flags=0` unless DRAWBRIDGE_UP, then local unearth + live `recalc_block_point`. STONE/SCORR→CORR so a later D-1269 `switch_terrain` sees non-`blocklev` (`IS_OBSTRUCTED` is typ below POOL; CORR is not). That is the claimed leftover-Lev/Fly unblock. Wall: maze ROOM / cavern CORR / else DOOR — match `:556–558`.

The `set_levltyp` helper is a **clone**, not `mkmaze.c` imported. It still writes `lev.typ`, lights lava, melts ICE via live `obj_ice_effects`/`spot_stop_timers`, and increments fountain/sink counts. It is **not** a stub that leaves STONE in place. `count_level_features` full scan is named; incremental ±1 matches the fountain/sink delta C’s recount would apply on this path. SDOOR→AIR arboreal is not a maketrap `newtyp`.

DRAWBRIDGE_UP: C sets `DB_FLOOR` and maybe ice melt; JS only keeps flags. Named omit of that arm’s body, not a STONE morph that no-ops. Shop `add_damage` still before morph in C; JS skips. Named.

`do_pit` no longer double-morphs: C never did; deleting D-0972 inline is the C order (`maketrap` then `liquid_flow`).

## Hallucinations / overclaim

Subject + D-1280 say PIT/HOLE on STONE/SCORR/wall morphs via `set_levltyp`. **The shared case body is the hunk.** Stamping **Addressed:** D-1280 is fair. Do **not** stamp “Match C DRAWBRIDGE_UP ice→floor.” Do **not** stamp “Match C shop `add_damage`.” Do **not** stamp “Match C `mkmaze.c` `set_levltyp` for every caller.” Do **not** stamp “Match C `count_level_features` scan.” Local unearth missing `buried_ball_to_punishment` is named.

## Density

One C switch envelope (PIT/HOLE fallthrough) plus deleting the duplicate `do_pit` subset. ~107 JS lines in trap.js. Related deferral in the same caller. Did not glue Blind feel.

## Branch-by-branch confirm

1. STONE PIT: `set_levltyp` CORR; flags=0; unearth; recalc. Match `:553–554`.
2. SCORR HOLE: same CORR. Match.
3. ROOM / furniture PIT: IS_ROOM→ROOM (fountain/sink counts via clone). Match `:546–547`.
4. Maze WALL: ROOM. Match `:556–557`.
5. Cavern WALL: CORR. Match.
6. Ordinary WALL / SDOOR: DOOR. Match `:558`.
7. DRAWBRIDGE_UP: skip `set_levltyp`, keep flags. Ice/DB_FLOOR named skip.
8. SPIKED_PIT: `conjoined=0` then same morph. Match `:514–518`.
9. `do_pit` drummer: morph now inside `maketrap`, not a second IS_ROOM/STONE write. Match C.
10. Public Tourist not digging STONE. Public-unhit unless seed0015/0002 pit path.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. Clone is local because `trap.js`↔`dig.js` cycle, not because the callee is empty.

## Verification

Journal: private canary **19**/19 (C STONE/SCORR/wall/flags; JS morph+unearth/recalc; STONE PIT leftover HLev unblocks; maze WALL→ROOM / cavern WALL→CORR / ordinary WALL→DOOR; FOUNTAIN nfountains--; DRAWBRIDGE_UP keeps flags; Rule #2); green+strict seed8000/0900; cohort **9**/9 + strict 1500/1800/0012/0004/0007/2200/0383 + seed0002/0015. **Public-unhit** unless a session digs a pit in STONE with leftover Lev/Fly FROMOUTSIDE. Cadence this audit: full `sessions` at HEAD `7d61ee8b` **44**/44 Scr **11,405**/11,405 RNG **100%**.

## Actionable C-wrongs

None for Must-fix. STONE/SCORR/wall morph matches C’s if-else; the clone actually changes typ so D-1269 `switch_terrain` can unblock. Empty DRAWBRIDGE_UP body is a named later arm, not a fake CORR morph.

Named omits (map, not Must-fix):

1. DRAWBRIDGE_UP `DB_FLOOR` + ice `obj_ice_effects` / `MELT_ICE_AWAY`
2. Shop hole `add_damage`; overwrite `reset_utrap`; Sokoban finish
3. `count_level_features` full scan; `unearth_objs` buried-ball; SDOOR→AIR
4. Blind unseen boulder feel; throwit returning_missile (later SHAs)

Do not Must-fix “clone instead of importing mkmaze.” Do not Must-fix “JS `was_ice` is `typ===ICE` not `is_ice()`” on this caller (DRAWBRIDGE_UP never reaches the clone). Do not pull Blind feel this SHA.

## Callers / RNG ledger

C: `digactualhole` / `do_pit` / wizard trap wish (still named in D-1279). JS: same live `maketrap`. No new RNG. Public fortress is not evidence a STONE pit unblocked leftover levitation.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: shared `maketrap` now morphs PIT/HOLE STONE/SCORR/wall via a live-enough `set_levltyp` clone; DRAWBRIDGE_UP ice and shop damage stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1280 `5f8a620a`.
