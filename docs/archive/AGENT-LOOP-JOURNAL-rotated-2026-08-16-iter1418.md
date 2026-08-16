# Rotated from AGENT-LOOP-JOURNAL.md after #1418 D-1115 dipfountain mkgold

## 2026-08-16 20:12 — #1403 D-1103 db_under_typ / waterbody_name SURFACE_AT

**Objective:** Open queue — `dbridge.c` `db_under_typ` /
`hack.c` `waterbody_name` SURFACE_AT (named from D-1077
review **38**). Not `goodpos`.
**C locus:** `dbridge.c` `db_under_typ` 116–128; `rm.h`
`SURFACE_AT`; `pager.c` `waterbody_name` 561–611;
`pickup.c` `describe_decor`.
**Change:** shared `hack.js` `db_under_typ` + `SURFACE_AT`.
`waterbody_name` uses SURFACE_AT. `pickup.js` `describe_decor`
drops the DRAWBRIDGE_UP-as-typ stub. Did not pull
`classify_terrain` / display glyphs / getpos typ-gate /
hideunder macros / `is_ice` shared. Stamped review **38**
item 4 (waterbody/`db_under_typ`) and **51** item 2.
Filled D-1102 hash `ebe1f041`. Rotated #1388. Open 10 after
archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1400** **44**/44; next
@**#1405**).
**Verified:** private canary **46**/46; green+strict seed8000/0900;
cohort **14**/14 (1500/1800/0060/0102/0700/0017/0106/0107/4500/
0014/0360/2200/0009/0367) + strict 0014/4500/0360/2200/0367/0009.
Public traces **unhit**.
**Next:** Open `fountain.c` `dryup` `angry_guards` after real
dryup. Not wizard yn.
**Blocked:** none.
