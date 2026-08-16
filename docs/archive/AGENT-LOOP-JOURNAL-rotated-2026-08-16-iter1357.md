# Rotated from AGENT-LOOP-JOURNAL.md after #1357

## 2026-08-16 05:20 — #1342 D-1063 tut-1 create_object food objects

**Objective:** Open queue — tut-1 food objects only (not
`place_lregion` / key / nhcore).
**C locus:** `sp_lev.c` `create_object` / `lspo_object` /
`get_table_buc`; `dat/tut-1.lua` apple/candy/lichen at (50,3).
**Change:** `create_object` corpsenm (`NON_PM` skip, else
`set_corpsenm`). `l_create_object` buc map + STATUE/EGG/CORPSE/TIN/
FIGURINE montype (pmnames, not find_montype gender RNG). CORPSE
`spe`=CORPSTAT lflags. `load_tut1` uses it for the three foods only.
Did not rewire knife/ring/other `tut1_object`. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1340** **44**/44; next
@**#1345**).
**Verified:** private node: pile of 3 at packed (50,3); lichen
`corpsenm=PM_LICHEN` `spe=0`; candy wrapper spe 1..12. green+strict
PASS; seed0009 **73**/73; cohort **9**/9
(0009/0030/0060/0102/0360/0373/1500/1800/2200).
**Next:** Open tut-1 `place_lregion` only.
**Blocked:** none.
