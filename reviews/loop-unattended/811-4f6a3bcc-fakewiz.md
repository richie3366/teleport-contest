# Review 811 — 4f6a3bcc — mkmaze.c makemaz fakewiz1/fakewiz2 (D-1841)

## Metadata
- Full / short hash: `4f6a3bccd96f76409c584b5f082be2149a5761a0` / `4f6a3bcc`
- Parent: `35920b53` (audit 794–810). Map-driven Open: PORT-GAP-HELDOUT `fakewiz1`/`fakewiz2` (0 proxy blocks).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-05 04:17:57 +0200
- D-id: **D-1841**
- Stats: `js/mklev.js` +165/−7. `js/` insertions **165** ≤250. Band **80–350**.
- Claims to close: Open fake-tower loaders. Not leftover WIN_STATUS / `do_statusline1`.
- JS / map: `load_fakewiz1` / `load_fakewiz2` / `load_fakewiz_tower`. `c-js-map/data.md`. Archive **Addressed:** D-1841 `4f6a3bcc`.

## Intent vs deliverable

Git subject promises: `makemaz` had no `fakewiz1`/`fakewiz2` loaders, so the fake-tower path fell through `load_special_proto` and left an empty maze.

`node scripts/csym.mjs makemaz` → `mkmaze.c:1126–1223`. `--callers makemaz`: `mklev.c:1270,1272,1274,1285,1289`. `load_special` `sp_lev.c:6453–6502` (`mkmaze.c:1188`). Lua `dat/fakewiz1.lua` `:6–44`, `dat/fakewiz2.lua` `:6–44`. `lspo_mazewalk` `:5768–5869`. `lspo_region` `:5583–5715`. `create_trap` `:1811–1846`. `mkobj_at` `mkobj.c:225–234`.

Parent dispatched zero `fakewiz*`. The diff **does** add both proto branches and one shared island loader.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `load_fakewiz1` / `_2` / `_tower` | LIVE new | lua bodies |
| `load_special_proto` | LIVE | new `fakewiz1`/`2` arms |
| `splev_initlev` / `splev_mazewalk` | LIVE | mazegrid + east walk |
| `l_levregion` / `l_teleport_region` | LIVE | `levregion_add` `get_location` when `!islev` |
| `splev_create_monster` | LIVE | exported `mklev.js:14364` |
| `splev_irregular_oroom` | CLONE | `lspo_region` irregular `:5675–5683` |
| `splev_mktrap_at` | CLONE | explicit-coord `maketrap` |
| `mkobj_at` | LIVE | `js/mkobj.js:1856` / C `:225–234` |
| `hell_tweaks` / epilogue | LIVE | same as wizard1–3 |
| `ensure_way_out` | OMIT named | `sym` NOT FOUND; C TODO |
| humidity `get_location` / `count_level_features` / `create_maze("")` / hellfill | OMIT named | |

`node scripts/sym.mjs`:

```
load_fakewiz1    NOT EXPORTED — 1 LOCAL mklev.js:18309
load_fakewiz2    NOT EXPORTED — 1 LOCAL :18317
load_fakewiz_tower NOT EXPORTED — 1 LOCAL :18329
splev_create_monster js/mklev.js:14364   sync
mkobj_at         js/mkobj.js:1856   sync
l_levregion      js/mklev.js:799   sync
l_teleport_region js/mklev.js:756   sync
ensure_way_out   NOT FOUND in js/**
```

No clone→import in this SHA. FORCE/DIAG/`getRngLog`/`fastforward`: **none**. Rule #2: clean.

## C ↔ JS fidelity

**Dispatch.** C `makemaz` `:1184–1193` `load_special(protofile)` then `dmonsfree`. JS `load_special_proto` now returns true for `'fakewiz1'`/`'fakewiz2'`. **Match the proto names.**

**Lua bodies vs `dat/fakewiz{1,2}.lua`.** mazegrid `bg="-"` → `LVLINIT_MAZEGRID` + `HWALL`. `selection.match("-")` then `fillrect(lx, ly+1, hx-2, hy-1)` before map (same +xstart pattern as wizard2). Center 9×9 map string matches `:14–24` both files. Contents while origin set: three `region_islev=1` stair/branch `{1,0,79,20}` exclude `{0,0,8,8}`; teleport exclude `{2,2,6,6}`; fakewiz1 only `portal` `{4,4,4,4}` `name="wizard3"` (no `region_islev` → `levregion_add` `get_location`). `des.mazewalk(08,05,"east")` → `splev_mazewalk(8,5,W_EAST,true)` matches `lspo_mazewalk` argc==3 stocked default. Monsters `"L"` (class letter), `"vampire lord"`, `"kraken"` at map 4,4 / 3,4 / 6,6. Four `board` traps at 4,3 / 4,5 / 3,4 / 5,4. fakewiz2 `des.object("\"",04,04)` → C `create_object` class path `:2227` `mkobj_at(oclass,x,y,!named)` with `named` false so `artif=TRUE`; JS `mkobj_at(AMULET_CLASS, xstart+4, ystart+4, true)`. `hell_tweaks(bounds2:negate() | island)` then C epilogue `link_doors` → `remove_boundary` → `map_cleanup` → `wallification(1,0,COLNO-1,ROWNO-1)` unless `corrmaze` → `flip_level_rnd(3,false)` (lua default allow_flips 3) → `fixup_special`. **Match those contents / RNG-bearing helpers.**

**Irregular arrival room (`fakewiz1.lua:31`).** C `lspo_region` `:5675–5683`: `get_location` both corners then `flood_fill_rm(dx1,dy1,…)` from `{04,03}` only; `arrival_room` only forces a room to exist (`room_not_needed` `:5652–5654`) — irregular already does. JS `splev_irregular_oroom(xstart+4, ystart+3, false)` floods from that cell, `OROOM`, `needfill=0`, `needjoining=true`. Named migrate-flag omit is extra-field debt, not a missing room.

**Callee closure.** Two protos, one `makemaz` family. Mazegrid / map / levregion / mazewalk / create_monster / mkobj_at / hell_tweaks / load_special epilogue LIVE. Irregular room and board traps are verified CLONEs of `lspo_region` irregular and explicit `maketrap`. Named OMITs only. No STUB in a shipped arm.

## Hallucinations / overclaim

Do **not** stamp `ensure_way_out`, humidity `get_location`, `count_level_features`, or `create_maze("")`. Vacuous hidden verify is **not** a corpus PASS; the queue row cited 0 proxy blocks (HELDOUT content). D-log said so.

## Density

§2b: remaining two fake-tower protos, one island helper. +165. Did **not** glue `do_statusline1`. Right size.

## Verification

This audit: `node scripts/hidden-proxy.mjs verify makemaz --base 4f6a3bcc~1` → `0 session(s) blocked` / `no corpus session is blocked on it at 4f6a3bcc~1`. Queue row was PORT-GAP-HELDOUT (0 corpus blocks). D-log green + cohort + full 44/44.

## Actionable C-wrongs

None that must block the next port. Named stay on the map.

Verdict: **ACCEPT-WITH-DEBT**
