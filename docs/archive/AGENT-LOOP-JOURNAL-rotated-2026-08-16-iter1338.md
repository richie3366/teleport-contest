# Rotated from AGENT-LOOP-JOURNAL.md after D-1069

## 2026-08-16 04:42 — #1339 D-1062 tut-1 create_object large-box contents

**Objective:** Open queue — tut-1 large-box contents only (not food /
`place_lregion` / key / nhcore).
**C locus:** `sp_lev.c` `create_object` / `lspo_object`;
`get_location_coord`; `shk.c` `delete_contents`; `dat/tut-1.lua`
box (41,6) + nested wand.
**Change:** `l_create_object` unpacked path: packed origin, random
DRY `get_location_coord` double-try, `delete_contents` after
`mkbox_cnts`, `container_obj` push/pop, `stackobj` when not content.
`load_tut1` uses it for the box+wand only. Did not rewire other
`load_*` `des.object`. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1335** **44**/44; next
@**#1340**).
**Verified:** private node 20/20 DRY-only ROOM; box broken/unlocked
wand `spe=30` `cobj` len 1. green+strict PASS; seed0009 **73**/73;
cohort **11**/11 (8000/0900/0009/1500/1800/0060/0102/0360/2200/0030/
0373). Path unhit except seed0009 prefix.
**Next:** Open tut-1 food objects only.
**Blocked:** none.

# Rotated from AGENT-LOOP-JOURNAL.md after review 29 D-1068

## 2026-08-16 04:25 — #1338 review D-1060/D-1061 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`ecd37108` D-1060, `05915d9b` D-1061)
against pinned C, not the journal.
**C locus:** `youprop.h` Fire/Cold; `sit.c` `dosit` ~548–553;
`worn.c` `oc_oprop`; `sp_lev.c` `l_create_stairway`/`get_location`;
`mklev.c` `mkstairs` force; `trap.c` `deltrap`; `dat/tut-1.lua` stair.
**Change:** reviews 21 ACCEPT (sit helpers OR `uprops[FIRE_RES]`/
`[COLD_RES]`; worn ring `d(2,10)`) and 22 ACCEPT (packed origin add;
`force` ROOM then dungeon-end; tut-1 is 2-level so down stairs
place — D-log “early return” was overclaim). No new Must-fix.
Filled Addressed hash `05915d9b`. No `js/` edits. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1335** **44**/44; next
@**#1340**).
**Verified:** C read of `youprop.h:26–32`, `sit.c:539–555`,
`do_wear.js:261–288`, `sp_lev.c:1202–1349`/`4147–4212`,
`mklev.c:2156–2197`, `trap.c:6502–6549`, `tut-1.lua:289`;
JS hunks grepped FORCE/fs/seed.
**Next:** Open tut-1 large-box contents only.
**Blocked:** none.
