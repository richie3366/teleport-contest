# Review 464 — 1f64431d — mklev.c minetn-6 load_special Bustling Town (D-1503)

## Metadata
- Full / short hash: `1f64431dc9661b32a2c8118f183b118579bffe14` / `1f64431d`
- Parent: `89b85fcc` (D-1502). This file audits **this SHA only** (tenth of ten `js/` commits since review **454**). Archive **Addressed:** D-1503 `1f64431d`. HEAD of this audit window.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 23:24:20 +0200
- D-id: **D-1503**
- Stats: 9 files, +330 / −33 — `js/mklev.js` +241 / −10. Band 150–350.
- Claims to close: Open `mklev.c` minetn-6 `load_special` (named from D-1490 / review **451**). Not minetn-7. `reviews/loop-2026-08-15/` has no unpaid Bustling Town Must-fix.
- JS / map: `mklev.js` `load_minetn_6` / `load_special_proto`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **451** named minetn-6/7 empty-maze.

## Intent vs deliverable

Git subject promises: mines town variant 6 is Bustling Town (mines fill, top-aligned map, shops) instead of an empty maze.

Pinned C is `dat/minetn-6.lua` (NetHack-3.7 Kelly Bailey “Bustling Town”) via `sp_lev.c` `load_special`, dispatched from `mkmaze.c` `makemaz` when proto is `minetn-6`. Lua: `nhlib` `shuffle(align)`; solidfill `fg=" "`; flags `mazelevel`+`inaccessibles`; mines init `fg="."` `bg="-"` HWALL `lit=1` smoothed/joined/walled; table `des.map` `halign=center` `valign=top` (`'x'`=`MAX_TYPE` skip); `des.region` lit 00,00–39,19 then unlit 13,7–14,8; levregion stairs `region_islev=1`; filled candle/tool/shop/`monkfoodshop`/temple; shrine `align[1]` + priest; 17 closed/locked doors; gnomes/dwarves then peaceful watch (two captains); C `load_special` wallification / `flip_level_rnd(3,false)` / `fixup_special`. Lua sets `inaccessibles` so C would call `ensure_way_out` (named; comment: full-height map to avoid shop backdoors).

Old JS: `load_special_proto` dispatched minetn-1..5 only.

The diff **does** dispatch `minetn-6` and port that lua sequence with the same helper family as minetn-5 (`splev_initlev`, `splev_map_aligned_start`, `splev_create_monster`, `addRectRoom`, `priestini`). It **does not** run a Lua VM. It **does not** port minetn-7. Named. It **does not** implement `ensure_way_out`. Named (`sym` NOT FOUND).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `load_special_proto('minetn-6')` | C `load_special`, **LIVE this SHA** | |
| `load_minetn_6` | C `minetn-6.lua`, **CLONE of the lua script** | not a Lua VM |
| `nhlib_shuffle_align` | C `nhlib.lua` top-level shuffle, **LIVE** | |
| `splev_initlev` solidfill + mines | C `splev_initlev`, **LIVE** | mines `lit=1` not BOOL_RANDOM |
| `splev_map_aligned_start` center/top | C `lspo_map` `:6192–6238`, **LIVE** | odd + ROWNO clamp |
| `splev_chr2typ` `'x'`→`MAX_TYPE` | C `nhlua.c`, **LIVE** | skip keep cavern |
| `light_region` | C `sp_lev.c:2858`, **LIVE** | grow only when lighting |
| `levregion_add` | C `levregion`, **LIVE** | `in_islev` |
| `add_room` / `splev_roomtype` / `monkfoodshop` | C, **LIVE** | monk → FODDERSHOP |
| `priestini` | C `priest.c`, **LIVE** | temple exists |
| `splev_create_monster` | C `create_monster`, **LIVE** | peaceful `> BOOL_RANDOM` |
| `placeNamedAt` | C `des.monster(id,x,y)`, **CLONE subset** | coords + `splev_resolve_occupied` |
| `wallification` / `flip_level_rnd` / `fixup_special` | C `load_special` tail, **LIVE** | |
| `ensure_way_out` | C `load_special` inaccessibles, **OMIT named** | **NOT FOUND** in `js/` |
| minetn-7 | C lua, **OMIT named** | still empty-maze |
| `link_doors_rooms` extras / `map_cleanup` | C epilogue, **OMIT named** | same as other minetn |

`node scripts/sym.mjs load_minetn_6 load_special_proto splev_initlev splev_map_aligned_start splev_create_monster priestini monkfoodshop nhlib_shuffle_align wallification flip_level_rnd fixup_special ensure_way_out`:

```
load_minetn_6    NOT EXPORTED — 1 LOCAL js/mklev.js:8351
load_special_proto NOT EXPORTED — 1 LOCAL js/mklev.js:1423
splev_initlev    NOT EXPORTED — 1 LOCAL js/mklev.js:10332
splev_map_aligned_start NOT EXPORTED — 1 LOCAL js/mklev.js:5116
splev_create_monster NOT EXPORTED — 1 LOCAL js/mklev.js:10988
priestini        NOT EXPORTED — 1 LOCAL js/mklev.js:15950
monkfoodshop     NOT EXPORTED — 1 LOCAL js/mklev.js:11644
nhlib_shuffle_align NOT EXPORTED — 1 LOCAL js/mklev.js:9866
wallification    NOT EXPORTED — 1 LOCAL js/mklev.js:19212
flip_level_rnd   NOT EXPORTED — 1 LOCAL js/mklev.js:9113
fixup_special    NOT EXPORTED — 1 LOCAL js/mklev.js:1015
ensure_way_out   NOT FOUND in js/**
```

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded session coordinates. The map string is the **lua source**, not a public-trace hardcode. Rule #2 clean.

**New gameplay RNG:** nhlib Fisher–Yates `rn2(i)` on align; solidfill `BOOL_RANDOM` lit `rn2(2)`; mines `mkmap` dice; `induced_align(80)` per monster; `splev_mines_maybe_clear_your_race` `rn2(3)`; `find_montype_gender`; `enexto` on occupied named coords; `priestini` `rn2(N_DIRS)`; `flip_level_rnd(3,false)`. Mines `lit=1` is **not** random. Public fortress: no session is documented as rolling `minetn-6`.

## C ↔ JS fidelity

Dispatch. `load_special_proto === 'minetn-6'` → `load_minetn_6(); return true`. **Match makemaz.** minetn-7 still falls through empty maze. Named.

nhlib. C `nhlib.lua` sets `align={law,neutral,chaos}` then `shuffle(align)` (`math.random` → `1+rn2`). JS `nhlib_shuffle_align` `for i=len; i>1; i--` swap `rn2(i)`. **Match.** Altar uses `align[1]` in Lua (1-based) = JS `align[0]`. **Match.**

Init order. Lua solidfill **then** mazelevel flag **then** mines. JS the same. C comment: walled+join can clear maze flag if mines ran first. **Match lua line order.** Mines `bg="-"` is HWALL (`splev_chr2typ` first match). `filling` defaults to fg=ROOM. C `splev_initlev` MINES: `lvlfill_solid(filling, 0)` then `mkmap`. JS same. `lit=1` skips BOOL_RANDOM. **Match.**

Map. Lua 20×40 table, `halign=center` `valign=top`, default `lit=FALSE` (`sp_lev.c:6121`). JS `MINETN6_MAP` is the same 20 lines (verified against NetHack-3.7 `dat/minetn-6.lua`). `splev_map_aligned_start`: xstart `2+floor((78-2-40)/2)=20` even → **21**; ystart top **3**, `3+20>21` → **1**. C `lspo_map` `:6199–6237` the same clamp. **Match.** `'x'` → `MAX_TYPE` ≥ skip, mines cavern remains. **Match `:6285–6286`.** Written cells then `set_levltyp_lit` false except lava. **Match table lit=FALSE.**

Regions. Lit `area(00,00,39,19)`: JS `light_region(mx+0,my+0,mx+39,my+19,true)` **grows** by 1 (`:16817–16821`). Unlit 13,7–14,8: `light_region(...,false)` **no grow**. **Match C light_region.** Stairs: up `{1,3,21,19}` `in_islev` exclude `{1,0,39,18}`; down `{60,3,75,19}` exclude `{0,0,38,18}`. Lua `01`/`03` are decimal. **Match.**

Rooms. Candle 9,9–11,11; tool 16,6–18,8; shop 23,3–25,5; `monkfoodshop()` 22,14–24,15; temple 31,14–36,16; `filled=1` → `FILL_NORMAL`. **Match lua table regions.** Altar 35,15 shrine + `priestini` because temple room exists (`sp_lev.c` shrine needs temple). **LIVE.** `has_temple=true`.

Doors. Seventeen `tnDoor` cells/masks match lua `des.door` closed/locked list (5,4 closed through 33,9 closed). **Match.**

Monsters. Six unnamed gnomes; named gnome 14,8 / gnome lord 14,7 / gnome 27,10; two gnome lords; three dwarves; then peaceful dwarf×2, gnome×2, hobbit, goblin, kobold, dog, watchman×3, watch captain×2. JS `splev_create_monster(id, 1)` because `1 > BOOL_RANDOM(-1)`. Named coords use `placeNamedAt` (not random humidity). **Match lua order.** `makemon` is LIVE. This is **not** a stub town.

Epilogue. `!corrmaze` `wallification`; `flip_level_rnd(3,false)`; `fixup_special`. **Match other minetn loaders / C load_special tail.** `ensure_way_out` still absent. Lua wanted inaccessibles; the map is full playable height so C would rarely need a shop backdoor. Named omit, not a silent success stub.

Callee closure. LIVE: init, map align, chr2typ, light_region, levregion, add_room, priestini, create_monster, wallify/flip/fixup. CLONE: lua script as JS function; `placeNamedAt`. OMIT named: ensure_way_out, minetn-7, door-link extras. STUB: none. **Arm may ship.**

## Hallucinations / overclaim

Subject variant 6 is Bustling Town instead of empty maze: **true** once `makemaz` picks `minetn-6`. D-log mines HWALL `lit=1`, top-align, `'x'` skip, shops/temple/`priestini`, monster order: **true**. Stamping **Addressed:** D-1503 for **this proto** is fair. Do **not** stamp “Match C Lua VM.” Do **not** stamp “Match C `ensure_way_out`.” Do **not** stamp “Match C minetn-7.” Do **not** treat fortress PASS as Bustling Town (public-unhit unless `rnd` hits variant 6).

This is **not** “dispatch ported, callee stubbed.” `splev_create_monster` / `priestini` / `add_room` already lived for minetn-5.

## Density

One lua special, same envelope as minetn-5. +241 JS. Playbook §2b. Did not glue minetn-7. Acceptable.

## Branch-by-branch confirm

1. `load_special_proto('minetn-6')` → `load_minetn_6`. **Match.**
2. Solidfill then maze flag then mines `lit=1` HWALL. **Match lua lines 10–14.**
3. Map 20×40, center/top, ystart clamped to 1, xstart 21. **Match `:6199–6237`.**
4. `'x'` cells keep mines terrain. **Match `'x'`=MAX_TYPE skip.**
5. Lit region grows; unlit 13,7–14,8 does not. **Match light_region.**
6. Levregion stairs with lua numbers and `in_islev`. **Match.**
7. Four shops + temple fill; monk food vs health-food. **Match `monkfoodshop`.**
8. Shrine `align[0]` + `priestini`. **Match `align[1]` + temple.**
9. 17 doors closed/locked. **Match.**
10. Six gnomes then named 14,8 / 14,7 / 27,10 then watch captains peaceful. **Match lua monster block.**
11. Wallify / flip / fixup. **Match load_special tail.**
12. minetn-7 still empty-maze. **Named omit.**
13. **Public-unhit** unless a session rolls variant 6.

## Callers / RNG ledger

C: `makemaz` → `load_special("minetn-6")`. JS `load_special_proto`. Dice as above. Public traces stay whatever variant they already rolled.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs (map embedded, not `readFileSync` of `.lua`). No FORCE. Map glyphs are lua source.

## Verification

D-log: private canary **18**/18 (dispatch, mines HWALL lit=1, top-align, `'x'` skip, map 20×40 lua≡JS, shops/temple/priestini, monster order, minetn-7 omit, Rule #2). Green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** unless variant 6. Cohort is shared-startup, not a mines-town screen.

## Actionable C-wrongs

None that belong on Must-fix. The empty-maze hole for proto 6 is closed with LIVE room/monster/altar callees.

Remaining named (map / Open, already queued minetn-7): `ensure_way_out` when `inaccessibles`; `link_doors_rooms` extras; `map_cleanup`; `count_level_features`; minetn-7 loader. Do not Must-fix “should have run a Lua VM.” Do not Must-fix “mines lit should be BOOL_RANDOM” (lua `lit=1`). Do not Must-fix “ystart=3 without clamp” (C clamps). Do not Must-fix “`placeNamedAt` should have been `splev_create_monster` with coords” (same `makemon` after `enexto`).

Verdict: **ACCEPT-WITH-DEBT**
