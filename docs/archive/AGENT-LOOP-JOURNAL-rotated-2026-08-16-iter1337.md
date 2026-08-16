# Rotated from AGENT-LOOP-JOURNAL.md after D-1068 dosit hider

## 2026-08-16 04:13 — #1337 D-1061 tut-1 packed des.stair l_create_stairway

**Objective:** Open queue — tut-1 stairs only (not box / food /
`place_lregion` / key / nhcore).
**C locus:** `sp_lev.c` `l_create_stairway` / `lspo_stair`;
`mklev.c` `mkstairs` force; `dat/tut-1.lua` `des.stair` (58,10).
**Change:** packed path deltrap + SpLev_Map + `mkstairs(..., force)`
so ROOM is set before dungeon-end return. Tutorial is dlevel 1 of
2 so down stairs place. Ladder arm skips the mkstairs end-check.
Did not rewire `splev_create_stair` / other loaders. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1335** **44**/44; next
@**#1340**).
**Verified:** private node 2-lev HWALL→STAIRS, botlevel force ROOM,
deltrap, ladder on botlevel. green+strict PASS; seed0009 **73**/73;
cohort **11**/11 (8000/0900/0009/1500/1800/0060/0102/0360/2200/0030/
0373). Path unhit except seed0009 prefix.
**Next:** Open tut-1 large-box contents only.
**Blocked:** none.
