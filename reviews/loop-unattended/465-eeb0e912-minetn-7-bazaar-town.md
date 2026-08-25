# Review 465 — eeb0e912 — mklev.c minetn-7 load_special Bazaar Town (D-1504)

## Metadata
- Full / short hash: `eeb0e91248d4004a2f7cf49fa8b7071f12b63638` / `eeb0e912`
- Parent: `0b70f28f` (audit #1890). This file audits **this SHA only** (first of nine `js/` commits since review **464**). Archive **Addressed:** D-1504 `eeb0e912`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 23:57:46 +0200
- D-id: **D-1504**
- Stats: 9 files, +308 / −49 — `js/mklev.js` +232 / −20. Band 150–350.
- Claims to close: Open `mklev.c` minetn-7 `load_special` (named from D-1503 / review **464**). Not `ensure_way_out`. `reviews/loop-2026-08-15/` has no unpaid Bazaar Town Must-fix.
- JS / map: `mklev.js` `load_minetn_7` / `load_special_proto`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **451** / **464** named minetn-7 empty-maze.

## Intent vs deliverable

Git subject promises: mines town variant 7 is Bazaar Town (nested rooms, chance shops, sink) instead of an empty maze.

Pinned C is `dat/minetn-7.lua` (NetHack-3.7 Kelly Bailey “Bazaar Town”) via `sp_lev.c` `load_special`, dispatched from `mkmaze.c` `makemaz` when proto is `minetn-7`. Lua: `nhlib` shuffle align; outer `des.room` ordinary lit 30×15 center; two fountains; eleven `percent(75)` nests (gnome+monkeys, `n`, gnome king, `G`, sink at 0,0); chance shops (monkfood 50, tool 50, candle 100, general 60, monkfood 50, tool 30); `des.door` south `pos=0` on the nymph nest; temple `align[1]` shrine + two gnomish wizards; peaceful watch (four watchmen, one captain) then **three** `des.monster("gnome")`, gnome lord, two monkeys; four ordinary stair/trap rooms; `des.random_corridors`; C `load_special` wallification / `flip_level_rnd(3,false)` / `fixup_special`. Lua does **not** set `inaccessibles`.

Old JS: `load_special_proto` dispatched minetn-1..6 only.

The diff **does** dispatch `minetn-7` and port that lua sequence with the same helper family as minetn-2/3/4 (`splev_des_room`, `splev_room_door`, `splev_room_monster`, `splev_room_altar_shrine` → `priestini`). It **does** forward lua `pos` through `splev_room_door` into `create_door`. It **does** add `splev_room_feature_sink` (`sel_set_feature` SINK, skip `IS_FURNITURE`). It **does not** run a Lua VM. It **does not** implement `ensure_way_out`. Named (`sym` NOT FOUND). The lua clone **does not** match the town-room gnome count (C-wrong below).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `load_special_proto('minetn-7')` | C `load_special`, **LIVE this SHA** | |
| `load_minetn_7` | C `minetn-7.lua`, **CLONE of the lua script** | not a Lua VM; **diverges** on town gnomes |
| `nhlib_shuffle_align` | C `nhlib.lua` shuffle, **LIVE** | |
| `splev_des_room` / `splev_build_room` | C `lspo_room`, **LIVE** | chance → OROOM still built |
| `percent` | C `nhlib.lua` `rn2(100)<t`, **LIVE** | |
| `splev_room_door` | C `lspo_door` `:4713–4720`, **LIVE this SHA** | now forwards `pos` |
| `create_door` | C `sp_lev.c:1714–1806`, **LIVE** | `dpos==-1` then `rn2` else `dpos` |
| `splev_room_monster` | C `create_monster`, **LIVE** | peaceful `> BOOL_RANDOM` |
| `splev_room_feature_fountain` | C `lspo_feature` fountain, **LIVE** | pre-existing |
| `splev_room_feature_sink` | C `lspo_feature`/`sel_set_feature` SINK `:4633–4644` `:4908`, **CLONE this SHA** | skip furniture; bumps `nsinks` |
| `splev_room_altar_shrine` | C `create_altar`, **LIVE** | `priestini` when TEMPLE |
| `priestini` | C `priest.c`, **LIVE** | |
| `monkfoodshop` | C `nhlib.lua`, **LIVE** | monk → health-food |
| `splev_ordinary_room` / stair / trap | C `lspo_room` fillers, **LIVE** | |
| `makecorridors` | C `des.random_corridors`, **LIVE** | |
| `wallification` / `flip_level_rnd` / `fixup_special` | C `load_special` tail, **LIVE** | |
| `ensure_way_out` | C inaccessibles, **OMIT named** | **NOT FOUND**; lua has no that flag |

`node scripts/sym.mjs load_minetn_7 load_special_proto splev_des_room splev_room_door splev_room_monster splev_room_feature_sink splev_room_altar_shrine monkfoodshop percent priestini makecorridors wallification flip_level_rnd fixup_special nhlib_shuffle_align ensure_way_out create_door`:

```
load_minetn_7    NOT EXPORTED — 1 LOCAL js/mklev.js:8576
load_special_proto NOT EXPORTED — 1 LOCAL js/mklev.js:1423
splev_des_room   NOT EXPORTED — 1 LOCAL js/mklev.js:12043
splev_room_door  NOT EXPORTED — 1 LOCAL js/mklev.js:11979
splev_room_monster NOT EXPORTED — 1 LOCAL js/mklev.js:11721
splev_room_feature_sink NOT EXPORTED — 1 LOCAL js/mklev.js:12067
splev_room_altar_shrine NOT EXPORTED — 1 LOCAL js/mklev.js:12081
monkfoodshop     NOT EXPORTED — 1 LOCAL js/mklev.js:11826
percent          NOT EXPORTED — 1 LOCAL js/mklev.js:17182
priestini        NOT EXPORTED — 1 LOCAL js/mklev.js:16148
makecorridors    NOT EXPORTED — 1 LOCAL js/mklev.js:18937
wallification    NOT EXPORTED — 1 LOCAL js/mklev.js:19410
flip_level_rnd   NOT EXPORTED — 1 LOCAL js/mklev.js:9295
fixup_special    NOT EXPORTED — 1 LOCAL js/mklev.js:1015
nhlib_shuffle_align NOT EXPORTED — 1 LOCAL js/mklev.js:10048
ensure_way_out   NOT FOUND in js/**
create_door      NOT EXPORTED — 1 LOCAL js/mklev.js:11889
```

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded session coordinates. Rule #2 clean.

**New gameplay RNG:** nhlib Fisher–Yates `rn2(i)` on align; eleven `percent(75)` = `rn2(100)<75`; chance shops `rn2(100)<chance`; `induced_align(80)` per monster; `find_montype_gender`; `enexto` on occupied; `priestini` `rn2(N_DIRS)`; door `create_door` `rn2(4)` wall pick (pos=0 skips the south `rn2` width); ordinary rooms `rn2(100)` then `create_room`; trap `traptype_rnd`; `flip_level_rnd(3,false)`. Public fortress: no session is documented as rolling `minetn-7`.

## C ↔ JS fidelity

Dispatch. `load_special_proto === 'minetn-7'` → `load_minetn_7(); return true`. **Match makemaz.** Comment lists minetn-7 among live protos. Empty-maze fallthrough for this proto is gone.

nhlib. `nhlib_shuffle_align` then `align[0]` for Lua `align[1]`. **Match** (same as minetn-3/4/6).

Outer room. Lua `type="ordinary", lit=1, x=3,y=3, xalign=center, yalign=center, w=30,h=15`. JS the same via `splev_des_room`. **Match.** Two fountains at (12,7) and (11,13). **Match lua.** Fountain helper still does not skip `IS_FURNITURE` (pre-existing; C `sel_set_feature` `:4641–4642` does). Town floor is ROOM, so this path is live.

Eleven `percent(75)` nests. Order, sizes, door walls, occupants (gnome+3 monkeys; `n`; gnome king; `G`; sink room) match lua line-for-line. **Match those eleven arms.**

`pos=0` door. Lua `des.door({ state="closed", wall="south", pos=0 })` on the 4×2 nest at 14,2. C `lspo_door` `:4717` `tmpd.pos = get_table_int_opt(..., "pos", -1)`. JS `splev_room_door(r, 'closed', 'south', 0)` → `create_door` `dpos===-1 ? rn2(width) : dpos`. `0 ?? -1` stays **0**. C south: `x = broom->lx + dpos`. **Match `:1767–1769`.** Other doors still default `-1`. **Match.**

Sink. Lua `des.feature("sink", 00,00)` in the 2×2 nest. C `lspo_feature` packs coords, `get_location_coord` relative to `croom`, `sel_set_feature` skip furniture then `typ=SINK` (`:4633–4644`). JS `splev_room_feature_sink(r, 0, 0)`: `lx+rx`, skip `IS_FURNITURE`, set SINK, bump `nsinks`. Coord **Match.** C does not increment `nsinks` here (`count_level_features` named); JS fountain already bumps `nfountains` the same way. Not a new silent stub.

Chance shops. monkfood 50 @19,5; tool 50 @2,10; candle lit (chance 100) @5,10; shop 60 @14,10; monkfood 50 @25,11; tool 30 @25,2. `splev_build_room`: `(!chance || rn2(100)<chance) ? wantType : OROOM`, contents still run. **Match C `lspo_room` chance.** `monkfoodshop()` monk → health-food. **Match nhlib.**

Temple. 4×4 lit @24,6; west closed door; altar (2,1) shrine `align[0]`; two gnomish wizards. `splev_room_altar_shrine` calls `priestini` because `rtype===TEMPLE`. **LIVE.** **Match lua + `create_altar`.**

Town-room monsters. Lua after the temple, still inside the outer `contents`:

```
des.monster({ id = "watchman", peaceful = 1 }) ×4
des.monster({ id = "watch captain", peaceful = 1 })
des.monster("gnome") ×3
des.monster("gnome lord")
des.monster("monkey") ×2
```

JS (`mklev.js` ~8710–8720): four watchmen + captain (peaceful 1, `1 > BOOL_RANDOM` so `mpeaceful=1`) **Match**, then **four** `splev_room_monster(town, 'gnome')`, gnome lord, two monkeys. That is **one extra gnome** versus pinned lua. Each `splev_room_monster` burns `induced_align(80)` (`rn2(100)` and maybe dungeon align) then `makemon` dice. Clone diverges from C. **C-wrong, not a named omit.** D-log “monster order” canary did not catch the count.

Fillers. Four `splev_ordinary_room`: up stair; down+trap+two gnomes; dwarf; trap+gnome. **Match lua.** `makecorridors`; `!corrmaze` wallify; `flip_level_rnd(3,false)`; `fixup_special`. **Match other minetn / C load_special tail.** Lua has no `inaccessibles`; skipping `ensure_way_out` is honest here (still named globally).

Callee closure. LIVE: des_room, percent, door+create_door, monster, fountain, altar/priestini, ordinary/stair/trap, corridors, wallify/flip/fixup. CLONE: lua script as JS function (**town gnome count wrong**); sink helper (furniture skip matches C; nsinks bump matches fountain clone). OMIT named: ensure_way_out, door-link extras, map_cleanup. STUB: none in a live arm. **Arm may ship after the extra gnome is deleted.** Shipping the clone with a wrong spawn list is QUALITY-RISK, not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject variant 7 is Bazaar Town instead of empty maze: **true** once `makemaz` picks `minetn-7`, **false as a full lua clone** because the town floor has four gnomes. D-log nested 30×15, 11× percent(75), chance shops, pos=0, sink, altar align[0], stair rooms, wallify/flip/fixup: **true**. D-log “monster order” / canary 16/16: **false on gnome count**. Map phrase “sink `pos=0` door” mashes two rooms (nymph nest vs sink nest). Stamping **Addressed:** D-1504 for **dispatch + nested town** is fair only with the gnome C-wrong queued. Do **not** stamp “Match C Lua VM.” Do **not** stamp “Match C `ensure_way_out`.” Do **not** treat fortress PASS as Bazaar Town (public-unhit unless `rnd` hits variant 7).

This is **not** “dispatch ported, callee stubbed.” Room/monster/altar/door callees already lived. It **is** a clone that contradicts pinned lua.

## Density

One lua special, same envelope as minetn-2/3/4. +232 JS. Playbook §2b. Did not glue leftovers/candles. Acceptable size; the miss is transcription, not density.

## Branch-by-branch confirm

1. `load_special_proto('minetn-7')` → `load_minetn_7`. **Match.**
2. Outer 30×15 center lit + two fountains. **Match lua.**
3. Eleven `percent(75)` nests, same coords/walls/occupants. **Match.**
4. Nymph nest south door `pos=0`. **Match `:4717` + `:1767–1769`.**
5. Sink at relative 0,0, skip furniture. **Match `sel_set_feature`.**
6. Chance shops + candle 100 + `monkfoodshop`. **Match.**
7. Temple shrine `align[0]` + `priestini` + two wizards. **Match.**
8. Watch peaceful ×4 + captain. **Match.**
9. Town `des.monster("gnome")` ×3 then lord + two monkeys. **JS has ×4 gnomes. Miss.**
10. Four ordinary stair/trap rooms + corridors + wallify/flip/fixup. **Match.**
11. `ensure_way_out` absent. **Named omit** (lua also omits inaccessibles).
12. **Public-unhit** unless a session rolls variant 7.

## Callers / RNG ledger

C: `makemaz` → `load_special("minetn-7")`. JS `load_special_proto`. Extra gnome adds one `induced_align` + `makemon` stream after the third town gnome, before gnome lord. Public traces stay whatever variant they already rolled.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs (layout is a JS clone, not `readFileSync` of `.lua`). No FORCE. Coordinates are lua source, not a public-trace hardcode.

## Verification

D-log: private canary **16**/16 (dispatch, 30×15, fountains, 11× percent, chance shops, pos=0, sink, altar, **monster order**, stairs, wallify/flip/fixup, Rule #2). That canary **did not** count town gnomes against lua. Green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** unless variant 7. Cohort is shared-startup, not a mines-town screen.

## Actionable C-wrongs

1. `mklev.js` `load_minetn_7` town-room monster list must match C `dat/minetn-7.lua`: four peaceful watchmen, one peaceful watch captain, **three** `des.monster("gnome")`, then gnome lord, then two monkeys. JS currently calls `splev_room_monster(town, 'gnome')` four times (`js/mklev.js` ~8714–8717). Delete the extra call so `induced_align(80)` + `makemon` match C. Not `ensure_way_out`. Not a Lua VM. Not minetn-6.

Remaining named (map / Open, already queued elsewhere): `ensure_way_out` when some other proto sets inaccessibles; `link_doors_rooms` extras; `map_cleanup`; `count_level_features`. Do not Must-fix “should have run a Lua VM.” Do not Must-fix “sink should skip `nsinks++`” (fountain clone already counts). Do not Must-fix “fountain should skip `IS_FURNITURE`” in this SHA (pre-existing helper; town cells are ROOM).

Verdict: **QUALITY-RISK**
