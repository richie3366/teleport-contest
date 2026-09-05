# Review 796 — 159fda3d — mkmaze.c makemaz medusa-2/4 (D-1826)

## Metadata
- Full / short hash: `159fda3d9d4fb95dd560af1ea3012ca297888bdf` / `159fda3d`
- Parent: `637890a4` (D-1825). Map-driven Open. Completes Medusa 4/4.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-04 21:55:09 +0200
- D-id: **D-1826**
- Stats: `js/mklev.js` +402/−4. `js/` insertions **402** >250. Band **80–450**.
- Claims to close: Open `medusa-2`/`medusa-4`. Not water / astral / `buzzmu`.
- JS / map: `load_medusa_2` / `load_medusa_4` / `load_special_proto`. `c-js-map/data.md`. Archive **Addressed:** D-1826 `159fda3d`.

## Intent vs deliverable

Git subject promises: `makemaz` had no `medusa-2`/`-4` loaders so Medusa was a 50% blank `rnd(4)` (1 and 3 live); C loads `dat/medusa-{2,4}.lua`.

`node scripts/csym.mjs makemaz` → `mkmaze.c:1126–1223`. `load_special` `sp_lev.c:6453–6502`; `--callers load_special`: `mkmaze.c:1188`, `wizcmds.c:389`. `lspo_region` `:5583–5715` (argc-2 grow; irregular `flood_fill_rm`; `arrival_room` forces a real OROOM). `selection_rndcoord` `selvar.c:283–318`; `l_selection_rndcoord` `nhlsel.c:406–428` (`removeit` = Lua arg 2). `flood_fill_rm` `mkmap.c:152–242`.

Parent dispatched `medusa-1`/`-3` only. The diff **does** add `load_medusa_2` / `load_medusa_4`, proto branches, and shared `medusa_perseus_statue` / `splev_irregular_oroom` / `medusa_mark_nondig`.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `load_medusa_2` / `load_medusa_4` | LIVE new | lua bodies |
| `medusa_perseus_statue` | LIVE new | 2 swaps 25/75; 4 uses 75/25 |
| `splev_irregular_oroom` | LIVE | `lspo_region` irregular arm |
| `flood_fill_rm` | LIVE | existing |
| `selection_rndcoord` | LIVE | x-outer; `removeit` |
| `l_create_stairway` / `l_create_object` / `splev_create_*` | LIVE | |
| `light_region` | LIVE | lit grows (D-0802) |
| `medusa_empty_statue_at` | CLONE | `create_object` contents=0; named |
| `medDoor` / packed door | CLONE | `sel_set_door`; keep SDOOR |
| humidity `get_location` / `ensure_way_out` / STONE_RES | OMIT named | |

`node scripts/sym.mjs`:

```
load_medusa_2    NOT EXPORTED — 1 LOCAL mklev.js:3417
load_medusa_4    NOT EXPORTED — 1 LOCAL mklev.js:3581
medusa_perseus_statue NOT EXPORTED — 1 LOCAL :2796
splev_irregular_oroom NOT EXPORTED — 1 LOCAL :2825
flood_fill_rm    NOT EXPORTED — 1 LOCAL :20457
selection_rndcoord NOT EXPORTED — 1 LOCAL :20613
l_create_stairway js/mklev.js:14928   sync
```

No clone→import. FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**. Rule #2: clean.

## C ↔ JS fidelity

**medusa-2 counts vs `dat/medusa-2.lua`.** Map 20×75 matches `:10–31`. Flags mazelevel+noteleport. Lit area(0,0,74,19) grow; unlit (2,3)–(5,16) no grow; irregular palace `{61,3,72,16}` `flood_fill_rm` rooms[0]; arrival OROOM `{67,8,69,11}` — C `do_arrival_room` only forces `add_room`, no extra flag; JS `add_room` + `topologize`. Stairs up 4,9 / down 68,10. Locked 71,7. Branch exclude Medusa island. Nondig two rects (STWALL/TREE/bars). Perseus at 68,10 **shield 25 / boots 75** (`:58–62`) — JS `medusa_perseus_statue(68,10,25,75)`. Eight packed empty statues. Boulder 4,4; `/`+boulder 52,9; **six** empty `des.object()`. Magic trap 3,12 + four random. Medusa / gremlin / titan / six eels / three jellyfish (incl. map-relative 0,8) / four golems / two cobras / `A` / yellow light / nine packed random + four empty. **Match those loops.**

**medusa-4 vs `dat/medusa-4.lua`.** 21×76 map. `place:set` four rooms; `rndcoord(1,1)` → `removeit=1` (`nhlsel.c:410`); two draws for medloc/altloc. JS `selection_rndcoord(place,true)` x-outer `rn2(idx)` matches C `:302–316`. Crystal ball 7,8. Perseus **75/25**. altloc empty statue + six random empty + **eight** `des.object()` + **seven** traps. Medusa on medloc before others. Kraken 7,7. Yellow dragon 5,4; baby `percent(50)`/`percent(25)`; eggs same percents. Two eels, two jellies, **14 `S`**, four hatchling+naga pairs. Six locked doors. Lua lights area(0,0,74,19) on the 21-row map — JS keeps that bound. **Match those counts.**

**Callee closure.** Two `load_special` variants. Init/map/region/stair/trap/monster LIVE or verified CLONE. `medusa_empty_statue_at` named. No STUB in a shipped arm.

## Hallucinations / overclaim

Do **not** stamp humidity / `ensure_way_out` / worn STONE_RES. Do **not** “fix” medusa-4’s 74×19 light on a 21×76 map — that is the lua. Public 44/44 does not walk these protos. Vacuous hidden verify is not a corpus PASS.

## Density

§2b: remaining Medusa pair, same `makemaz` family. +402. Did **not** glue water. Right size.

## Verification

This audit: `node scripts/hidden-proxy.mjs verify makemaz --base 159fda3d~1` → `0 session(s) blocked` / `no corpus session is blocked on it`. Queue row was a 50% blank-level coin, not N corpus blocks. Lua `:54–128` vs HEAD `:3517–3723` counted. D-log green + cohort + full 44/44.

## Actionable C-wrongs

None that must block the next port. Named stay on `c-js-map/data.md`.

Verdict: **ACCEPT-WITH-DEBT**
