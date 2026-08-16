# Rotated from AGENT-LOOP-JOURNAL.md after #1358

## 2026-08-16 05:50 — #1343 D-1064 tut-1 levregion_add / place_lregion dests

**Objective:** Open queue — tut-1 `place_lregion` only (not key /
nhcore).
**C locus:** `sp_lev.c` `levregion_add` / `lspo_teleport_region` /
`get_location` ANY_LOC; `mkmaze.c` `fixup_special` TELE dest copy;
`dungeon.c` `u_on_rndspot` → `place_lregion`; `dat/tut-1.lua:59`.
**Change:** `get_location` packed ANY_LOC; `levregion_add`;
`l_teleport_region` (dir both=`LR_TELE`, omit exclude `-1`
`del_islev`). `fixup_special` leftover lregion switch. `load_tut1`
uses it and calls `fixup_special`. Did not rewire other `load_*`
inline lregions; branch fallback still `made_branch`. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1340** **44**/44; next
@**#1345**).
**Verified:** private node packed inarea origin+9,+3, delarea `-1`,
`LR_TELE`; `region_islev` skip; exclude `get_location`. green+strict
PASS; seed0009 **73**/73; cohort **12**/12
(8000/0900/0009/0030/0060/0102/0116/0360/0373/1500/1800/2200).
**Next:** Open tut-1 `tut_key` / eckey only.
**Blocked:** none.
