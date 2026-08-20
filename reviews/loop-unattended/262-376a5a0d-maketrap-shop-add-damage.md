# Review 262 — 376a5a0d — trap.c maketrap shop add_damage (D-1300)

## Metadata
- Full / short hash: `376a5a0d2550b9629d77b522212f18c2ee3e30f5` / `376a5a0d`
- Parent: `eca3330c` (D-1299). This file audits **this SHA only**. Archive row **Addressed:** D-1300 `376a5a0d` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 19:21:32 +0200
- D-id: **D-1300**
- Stats: 11 files, +217 / −136 — `js/trap.js` +30 / −~6; journal rotate in the same SHA.
- Claims to close: Open `trap.c` maketrap shop `add_damage` (named from D-1280 / reviews **242** / **258**). Not DRAWBRIDGE_UP ice. `reviews/loop-2026-08-15/` has no unpaid shop-hole Must-fix.
- JS / map: `trap.js` `maketrap`; live `shk.js` `add_damage`; `c-js-map/data.md` + `turns.md`. overwrite `reset_utrap` / Knox / Sokoban finish named.
- Prior reviews this SHA claims to close: **242** named omit shop `add_damage` above `set_levltyp`; **258** named it again above ice morph.

## Intent vs deliverable

Git subject promises: “Match C trap.c maketrap so a shop hole, door, or wall trap schedules add_damage (SHOP_HOLE_COST when the hero breaks a door/wall) before terrain morph, instead of leaving the shop repair list empty.”

C `maketrap` PIT/SPIKED/HOLE/TRAPDOOR (`trap.c:514–527`) after `hole_destination`, **before** DRAWBRIDGE_UP / `set_levltyp`:

```
        if (*in_rooms(x, y, SHOPBASE)
            && (is_hole(typ) || IS_DOOR(lev->typ) || IS_WALL(lev->typ)))
            add_damage(x, y,
                       ((IS_DOOR(lev->typ) || IS_WALL(lev->typ))
                        && !svc.context.mon_moving) ? SHOP_HOLE_COST : 0L);
```

`SHOP_HOLE_COST` is 200 (`hack.h:78`). Callee `add_damage` (`shk.c:4398–4437`): door cells only if a shopkeeper's `shd` entrance; else accumulate `damagelist` and snapshot `lev->typ`/`flags`. `digactualhole` still bills `SHOP_PIT_COST` on PIT after create (unchanged C, not this SHA).

Old JS: named omit after D-1280 / D-1296; morph ran with an empty repair list.

The diff **does** the `in_rooms` + hole/door/wall gate and live `add_damage` before ice/`set_levltyp`. It does **not** port overwrite `reset_utrap`, Knox `single_level_branch`, Sokoban finish, or TELEP `teledest`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| shop `add_damage` call | C `:523–527`, **new** | before morph so typ snapshot is original |
| `in_rooms(..., SHOPBASE)` | C `hack.c`, **imported live** | JS `''` falsy ≡ C `*in_rooms` empty |
| `is_hole` | C `is_hole` HOLE\|TRAPDOOR, **imported live** | `const.js`; PIT is not a hole |
| `IS_DOOR` / `IS_WALL` | C `rm.h`, **imported live** | JS `typ===DOOR`; walls `VWALL…DBWALL` |
| `SHOP_HOLE_COST` | C `hack.h:78` = 200, **imported live** | |
| `mon_moving` | C `svc.context.mon_moving`, **wired** | `game.context.mon_moving` |
| `add_damage` | C `shk.c:4398`, **imported live** | not a clone; door `shd` early-return |
| DRAWBRIDGE_UP ice | C `:532–545`, **pre-existing** | D-1296 |
| `set_levltyp` morph | C `:546–564`, **pre-existing** | D-1280 |
| overwrite `reset_utrap` | C `:470–475`, **named omit** | |
| Knox / Sokoban finish | C, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG** in the shop bill (cost is 0 or 200; `choose_trapnote` / statue / launch unchanged).

## C ↔ JS fidelity

Pinned C (`trap.c:521–527`) then morph (`:529–564`). JS:

```
        if (in_rooms(x, y, SHOPBASE)
            && (is_hole(typ) || IS_DOOR(lev?.typ) || IS_WALL(lev?.typ))) {
            add_damage(x, y,
                ((IS_DOOR(lev?.typ) || IS_WALL(lev?.typ))
                    && !game.context?.mon_moving)
                    ? SHOP_HOLE_COST : 0);
        }
```

then the D-1296 / D-1280 morph unchanged.

Branch order matches: `hole_destination` (holes only) → shop bill → `clear_flags` / DRAWBRIDGE_UP / `set_levltyp` / unearth / `recalc_block_point`. Billing **before** morph is the point: a shop wall snapshots HWALL, not post-morph ROOM/CORR/DOOR.

Cost: door or wall **and** `!mon_moving` → 200; else 0 (shop floor HOLE/TRAPDOOR still `add_damage(0)` so the shk later fills a hole). PIT/SPIKED in a shop: `is_hole` false, `IS_DOOR`/`IS_WALL` only if the cell is still a door/wall — a shop-floor PIT skips the call entirely (C same: PIT is not `is_hole`). SDOOR is not `IS_DOOR` in JS (`typ===DOOR` only) and not `IS_WALL`; a hole on SDOOR bills 0 if `is_hole` — C `IS_DOOR` is also `typ==DOOR`, so SDOOR matches.

Callee is live `shk.js` `add_damage`: door without `shd` returns without enqueue; existing `damagelist` row accumulates cost and refreshes `when`; new row stores `typ`/`flags`. That is **not** a no-op dispatch.

JS `in_rooms` returns `''` or a string of room chars; `if (in_rooms(...))` is the same emptiness test as C `if (*in_rooms(...))`. Filter `typewanted===SHOPBASE` includes `rtype>=SHOPBASE`.

This is **not** “Match C add_damage dispatch, callee is a stub.” Do **not** stamp “Match C overwrite `reset_utrap`.” Ice morph stays D-1296.

## Hallucinations / overclaim

Subject + D-1300 say a shop hole/door/wall trap schedules repair before morph. **The four-line call plus live callee are the hunk.** Stamping **Addressed:** D-1300 is fair. Do **not** stamp “Match C `reset_utrap` when overwriting.” Do **not** stamp “Match C Knox `LEVEL_TELEP`.” Do **not** stamp “Match C Sokoban `maybe_finish_sokoban`.” Do **not** stamp “PIT on shop floor bills 200” — C bills 0 only for holes on door/wall when the hero is moving; floor holes are cost 0; pits skip.

## Density

One C call site in an already-ported `switch` arm. ~30 JS lines. Did not glue overwrite/`teledest`. Right size (small but not a one-`if` peel: the callee was already live and the order vs morph is the cluster).

## Branch-by-branch confirm

1. Shop ROOM HOLE: `is_hole`, not door/wall → `add_damage(..., 0)` then morph. Match `:523–527`.
2. Shop wall HOLE, hero: door/wall && `!mon_moving` → cost 200; damagelist typ is wall. Match.
3. Same, `mon_moving`: cost 0. Match.
4. Shop door HOLE without `shd`: `add_damage` early-returns. Match `shk.c:4407–4416`.
5. Non-shop HOLE: `in_rooms` empty; no call. Match `*in_rooms`.
6. Shop-floor PIT: not hole/door/wall; skip. Match.
7. Ice span after bill: D-1296 `DB_FLOOR` still runs. Match order.
8. overwrite `reset_utrap` still skipped. Named. **Public-unhit** unless a session plants a shop hole/door/wall trap.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM.

## Verification

Journal: private canary **21**/21; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session plants a shop hole/door/wall trap. Cadence this audit: full `sessions` at HEAD `1a7839f7` **44**/44. I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. The shop bill before morph, cost ternary, and live `add_damage` match C `:523–527` / `shk.c:4398–4437`.

Named omits (map, not Must-fix):

1. overwrite `reset_utrap` when replacing a different trap underfoot
2. Knox `single_level_branch` LEVEL_TELEP reject
3. Sokoban `maybe_finish_sokoban`; TELEP `teledest`; `liquid_flow`

Do not Must-fix “`in_rooms` without a leading `*`” (JS string emptiness). Do not Must-fix “optional `lev?.typ`.” Do not wrap `wildmiss` as `pline_mon`. Next Open after this SHA was boomhit (now D-1301).

## Callers / RNG ledger

C: `maketrap` ← dig / wish / `do_pit` / bones. JS same. No new `rn2`. Public fortress is not evidence a shop wall entered `damagelist`.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: shop hole/door/wall traps now `add_damage` before morph like C; overwrite/`teledest` stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1300 `376a5a0d`.
