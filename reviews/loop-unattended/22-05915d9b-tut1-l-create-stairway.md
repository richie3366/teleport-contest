# Review 22 — 05915d9b — tut-1 packed `des.stair` / `l_create_stairway` force (D-1061)

## Metadata
- Full / short hash: `05915d9b74e87378cf656ac68042f11641c94b8e` / `05915d9b`
- Parent: `ecd37108` (D-1060 ACCEPT; Must-fix empty; popped Open tut-1 stairs)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 04:19:29 +0200
- D-id: **D-1061**
- Stats: 11 files, +179 / −50 — `js/mklev.js` +93 (new `l_create_stairway`; `mkstairs(..., force)`; tut-1 call)
- Claims to close: Open queue tut-1 stairs only (not box / food / `place_lregion` / key / nhcore). Stamped **Addressed:** D-1061 on the archive row **without** the short hash (chicken-egg). This review commit fills `05915d9b`.
- JS / map: `mklev.js` `l_create_stairway` / `mkstairs` / `load_tut1`; `c-js-map/startup.md`. Cadence still **#1335** **44**/44.

## Intent vs deliverable

Git subject promises: “Match C l_create_stairway so tut-1 packed des.stair forces ROOM before the dungeon-end no-op.”

C `sp_lev.c:4147–4212` is `l_create_stairway`: unpack dir/coord, `get_location_coord(DRY)`, `deltrap`, `SpLev_Map[x][y]=1`, then ladder **or** `mkstairs(..., !(scoord & SP_COORD_IS_RANDOM))`. C `mklev.c:2172–2189` assigns `ROOM` when `force` **then** returns on dungeon-end. The queue line was tut-1 stairs. The diff ships a JS `l_create_stairway` used from `load_tut1` in place of raw `mkstairs(xstart+58, ystart+10, 0, null)`, and retouches shared `mkstairs` with a `force` parameter defaulting false.

It does **not** add Lua argc table/string parse. Loaders pass unpacked `up, rx, ry, croom, using_ladder`. Named. It does **not** rewire `splev_create_stair` / `splev_room_stair` / other `load_*` `des.stair` to this helper (those still raw `mkstairs` without force). Named. It does **not** port tut-1 large-box / food / `place_lregion` / `tut_key` / nhcore disable. Those remain Open.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `l_create_stairway` | C function, new JS | `sp_lev.c:4147–4212`; unpacked args, not `lua_State` |
| packed `get_location` | inlined C path | `sp_lev.c:1222–1224` + isok fallback `1260–1268`; humidity unused for packed |
| random `get_location` | existing helpers | `get_location_random` / `get_location_coord_in_room` + `good_stair_loc` |
| `t_at` | imported C callee | `trap.c:6502–6511` walks `ftrap`; JS `trap.js:836–842` walks `level.traps` (pre-existing) |
| inline deltrap | **clone** of `trap.c:6531–6549` | ftrap unlink + `level.traps` splice; **not** `clear_conjoined_pits` / Sokoban |
| `trap.js` `deltrap` | pre-existing subset | splices `level.traps` only; **not** called here |
| `SpLev_Map.add` | existing JS encoding | C `char SpLev_Map[][]`; JS `Set` of `"x,y"` (pre-existing) |
| ladder arm | C branch | `sp_lev.c:4191–4207`; skips `mkstairs` (no dungeon-end no-op) |
| `mkstairs` | C function, retouched | `mklev.c:2159–2197`; new `force` then end-check |
| `stairway_add` | imported C callee | `stairs.c`; JS `mklev.js:282–290` |
| `load_tut1` call | C `des.stair` site | `dat/tut-1.lua:289` `{ dir="down", coord={58,10} }` |
| `splev_create_stair` / `splev_room_stair` | pre-existing clones | **not** switched to `l_create_stairway` |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names in control flow. `(58,10)` is the baked `tut-1.lua` coord already used by the previous raw `mkstairs`, not a public-trace hardcode. Rule #2 clean. Frozen contracts untouched.

## Constitution / playbook

Grep of the `js/mklev.js` hunks: no trace-index gates, no `fastforward` burns. Packed coords come from the embedded map loader (D-0477-style dat in `js/`), not a seed-shaped stair. Contest Rule #2: no Node builtins in scored code.

## C ↔ JS fidelity

### Packed origin — C `get_location` for `*x >= 0` does **not** test DRY

C `l_create_stairway` after unpacking a table `dir`/`coord`:

```
scoord = SP_COORD_PACK(x, y);
get_location_coord(&x, &y, DRY, gc.coder->croom, scoord);
```

`get_unpacked_coord` for non-random yields `c.x, c.y` from `SP_COORD_X/Y` (`sp_lev.h:82–84`). `get_location` (`sp_lev.c:1222–1224`):

```
if (*x >= 0) { /* normal locations */
    *x += mx;
    *y += my;
}
```

`mx/my` are `croom->lx/ly` or `gx.xstart/gy.ystart`. Humidity DRY is **not** consulted on this arm. Then (`1260–1268`): if `!(ANY_LOC)` and `!isok`, set `x_maze_max, y_maze_max`.

JS packed (`mklev.js:9924–9933`): `mx + rx`, `my + ry` from `croom.lx/ly` or `game.splev_xstart/ystart`; `!isok` → `X_MAZE_MAX, Y_MAZE_MAX`. `load_tut1` sets those origins from `splev_map_center_start` **before** the stair call (`mklev.js:8399–8403`). Previous raw call used the same local `xstart+58, ystart+10`. Match for packed.

`set_ok_location_func(good_stair_loc)` is live around C `get_location_coord`, but `is_ok_location` only runs on the **random** arm (`*x < 0`). Packed tut-1 never calls `good_stair_loc`. JS packed skips it. Match.

### Tut-1 cell is ROOM `.`, not a dungeon-end no-op

Pinned `dat/tut-1.lua:289`: `des.stair({ dir = "down", coord = { 58,10 } })`. Map row 10 col 58 is `'.'` → `ROOM` (`splev_chr2typ`; `SPLEV_CHAR2TYP` `'.' → ROOM`). Tutorial dungeon `base = 2` (`dungeon.lua:319–331`; `dungeon_data.js:327–342`): tut-1 is **dlevel 1 of 2**, not `Is_botlevel`. C `mkstairs` end-check (`mklev.c:2188–2189`):

```
if (dunlev(&u.uz) == (up ? 1 : dunlevs_in_dungeon(&u.uz)))
    return;
```

Down (`up==0`) on dlevel 1 of 2: `1 == 2` is false. Stairs **place**. JS `Is_botlevel` is `dlevel === num_dunlevs` (`const.js:2971–2976`). Same. Prior JS `mkstairs(xstart+58, ystart+10, 0, null)` would also have passed the end-check and set `STAIRS`. The D-log **symptom** “`mkstairs` returned on dungeon-end *before* C's `force` ROOM assign” is **false for tut-1**. The **Fix** paragraph already admits “tut-1 is Tutorial dlevel 1 of 2, so down stairs place.” The subject’s “before the dungeon-end no-op” names C’s **order**, which this SHA did ship, not a tut-1 early-return that was happening in production.

Force on a ROOM cell: C `if (force) levl[x][y].typ = ROOM` is a no-op, then `stairway_add` + `set_levltyp(STAIRS)`. JS `if (force && loc) loc.typ = ROOM` then, after the end-check, `loc.typ = STAIRS`. End glyph STAIRS. Match for this map cell.

Private node “2-lev HWALL→STAIRS” / “botlevel force ROOM and no stairway node” are the right checks for **force order**, not for a public tut-1 FAIL.

### `mkstairs` force then return — branch order

C `mklev.c:2168–2196`: `!x || !isok` return (plus `impossible`); **`if (force) typ = ROOM`**; `ltyp` ROOM/CORR/ICE `impossible` (does **not** return); **dungeon-end return**; `stairway_add`; `set_levltyp(STAIRS)`; `ladder` field.

JS `mklev.js:17434–17455`: `!x || !isok` return; `if (force && loc) typ = ROOM`; `up ? dlev===1 : Is_botlevel` return; `stairway_add`; `typ = STAIRS` + `ladder`; also `level.upstair`/`dnstair` (pre-existing extra; C only `stairway_add`).

Default `force = false` keeps every old caller on the pre-D-1061 path (end-check **before** STAIRS, no ROOM assign). Packed `l_create_stairway` passes `!random` → `true`. Random passes `false`. C `!(scoord & SP_COORD_IS_RANDOM)`. Match.

Skipped this SHA: C `impossible` on non-ROOM/CORR/ICE (diagnostic); `set_levltyp` ice-melt / fountain count (`mkmaze.c:77–121`). After `force`, `typ` is ROOM, `CAN_OVERWRITE_TERRAIN(ROOM)` is true (`rm.h:320–321`, only LADDER/STAIRS blocked). JS direct `typ = STAIRS` is the same overwrite for this path. Pre-existing `set_levltyp` omit, not a new force bug.

### Ladder arm — real skip of `mkstairs`

C `using_ladder`: `typ = LADDER`; `stairway_add(..., isladder TRUE, dlevel ± 1)`; `ladder = LA_UP/DOWN`. **No** dungeon-end check. JS (`9956–9967`): `typ = LADDER`; `ladder` field; `stairway_add(..., true, dlev ± 1)`; `return`. Order of `ladder` vs `stairway_add` is swapped; `stairway_add` takes `isladder` as an argument and does not read `loc.ladder`. Match. A down ladder on botlevel still places. Named in the journal. Tut-1 does not call the ladder arm (`using_ladder=false`).

### `deltrap` is a clone; `mkstairs` is not a stub

C `if ((badtrap = t_at(x, y)) != 0) deltrap(badtrap)`. C `t_at` walks `gf.ftrap`. C `deltrap`: `clear_conjoined_pits`; unlink `ftrap`; Sokoban PIT/HOLE `maybe_finish_sokoban`; `dealloc_trap`.

JS `t_at` walks `level.traps` (pre-existing encoding; `maketrap` pushes that array). The new helper inlines: unlink `game.ftrap`, splice `level.traps`. It does **not** call `trap.js` `deltrap` (that function splices `level.traps` only and never unlinks `ftrap`). Missing `clear_conjoined_pits` and Sokoban. The D-log names “deltrap conjoined / Sokoban.”

This is **not** “Match C `mkstairs` dispatch, callee is a stub.” `mkstairs` / `stairway_add` / `t_at` are real. It **is** “Match C `l_create_stairway` includes `deltrap`, and the callee here is a clone.” Tut-1 `(58,10)` is floor `.` with no `des.trap` on that cell (portal is `{66,2}`; trapdoor `{73,15}`). The clone is dead on the claimed tut-1 stair. Same class as D-1058’s named `is_lava` DRAWBRIDGE_UP subset: named, not the force predicate. Do **not** widen this review into a Must-fix “port full `trap.c` `deltrap`.”

`splev_create_stair` / `splev_room_stair` still hand-roll ftrap unlink **without** `level.traps` splice or `SpLev_Map` or `force`. Named. Other `load_*` `des.stair` still raw `mkstairs` without force. A botlevel packed stair on those loaders would still skip ROOM. Not the Open line this SHA popped.

`create_des_coder()` in C is `if (!gc.coder) init`. JS has no coder object; `load_tut1` already wrote `splev_xstart`. Fine for this caller.

`SpLev_Map.add(\`${x},${y}\`)` matches C `SpLev_Map[x][y] = 1` under the existing Set encoding (solidify / maze1xy already use it). Not a 2D-array rewrite.

No gameplay `rn2`/`rnd` on the packed path. Random path burns `rn2` inside `get_location_random` like C `rn2(sx)` / `somexy`. Tut-1 is packed.

C `stairdirs[] = { "down", "up" }` with `stairdirs2i[] = { 0, 1 }` and default `"down"` → `up = 0`. JS `load_tut1` passes `l_create_stairway(0, 58, 10, null, false)`. `mkstairs(..., up ? 1 : 0, ..., !random)` therefore gets `up=0`, `force=true`. Match.

`generate_stairs` still calls `mkstairs(pos, 0|1, croom)` with the new default `force=false` (`mklev.js:17468` / `17479`). C `generate_stairs` passes `FALSE`. Minefill / other baked `des.stair` still omit force (named). `croom` is `UNUSED` in C `mkstairs`; JS still accepts it and ignores it. Match.

C `mkstairs` `if (!x || !isok(x, y))` treats x=0 as bogus (column 0 is never a legal stair). JS the same. Packed tut-1 `xstart+58` is in-bounds after CENTER (`splev_map_center_start` forces odd xstart; map width 75). Not a seed coordinate gate.

## Hallucinations / overclaim

“Match C l_create_stairway so tut-1 packed des.stair forces ROOM before the dungeon-end no-op” is **true for packed origin add, `force` then end-check order, ladder skip, `SpLev_Map` mark, and switching tut-1 off raw `mkstairs`.** It is **not** true that tut-1 previously returned on dungeon-end (2-level branch; down stairs place; cell already ROOM). It is **not** true that Lua `des.stair` table parse exists, or that `deltrap` is C `trap.c`, or that every special-level `des.stair` now uses `l_create_stairway`. The D-log deferred list says those. The subject does not claim box/food/key.

Cadence **#1335** 44/44 does not newly prove stairs (seed0009 prefix already had the raw `mkstairs` STAIRS glyph at this cell). Journal admits public path unhit except that prefix. Private HWALL/botlevel/ladder nodes are the right checks for **force order**.

Stamping the Open item **Addressed:** D-1061 is fair for the tut-1 packed envelope. Fill hash `05915d9b` in this commit.

## Density (§2b)

One Open cluster: C’s packed `des.stair` → `l_create_stairway` → `mkstairs` force. New function + one callee retouch in `mklev.js` (~70 executable lines). Sibling random/ladder arms shipped with the function (not a one-`if` peel). Other loaders left named on purpose. Right size. Not “finish sp_lev.c.”

## Verification

Journal: private node 2-level HWALL→STAIRS dest dlevel+1; botlevel `force` ROOM and no stairway node; trap spliced; ladder still places on botlevel. green+strict PASS; seed0009 **73**/73; cohort **11**/11 (8000/0900/0009/1500/1800/0060/0102/0360/2200/0030/0373). Path unhit except seed0009 prefix already in D-0353.

This review iter did not re-run sessions (not a cadence slot). C read of `sp_lev.c:1202–1349` / `4147–4235`, `mklev.c:2156–2197`, `trap.c:6502–6549`, `sp_lev.h:66–85`, `dat/tut-1.lua:33–51`/`289`, `dungeon.lua:319–331`, JS `mklev.js:8398–8403` / `8667–8671` / `9707–9710` / `9915–9971` / `17434–17455`, `const.js:2971–2976` is the audit. Grep of the `js/mklev.js` hunks: no `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / seed names in control flow.

## Actionable C-wrongs

None in the packed force envelope this SHA shipped.

Named omits (map, not queue): tut-1 large-box / food / `place_lregion` / `tut_key` / nhcore disable (live Open); Lua argc parse; `splev_create_stair` / `splev_room_stair` still hand-rolled; other `des.stair` loaders still raw `mkstairs` without force; inline deltrap conjoined / Sokoban; `set_levltyp` side effects; `level.upstair`/`dnstair` extra writes.

Do not skip `mkstairs` `force` ROOM before the dungeon-end return. Do not restore raw `mkstairs` for tut-1 packed `des.stair`. Do not put trailing `confdir` inside shared `getdir`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: packed `l_create_stairway` adds origin like C `get_location`, and `mkstairs` now assigns ROOM when `force` before the dungeon-end return; tut-1 down stairs still place on a 2-level branch.
