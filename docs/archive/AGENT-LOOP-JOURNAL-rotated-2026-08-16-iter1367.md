# Rotated from AGENT-LOOP-JOURNAL.md after #1367 D-1076 hero pit/hole

## 2026-08-16 09:28 — #1352 D-1068 dosit hider uundetected except trapper

**Objective:** Open queue — `sit.c` `dosit` hider:
`u.uundetected && is_hider` except trapper. Not `can_reach_floor`
/ ustuck.
**C locus:** `sit.c` `dosit` (~410–412); `mondata.h` `is_hider`;
`monsters.h` `PM_TRAPPER`.
**Change:** after usteed return, clear `u.uundetected` for hiders
that are not `PM_TRAPPER` (ceiling drop). Trapper stays hidden.
No `newsym` (C has none). Did not port `can_reach_floor` / ustuck.
Filled no prior Addressed hashes (already present). Rule #2: no fs.
Rotated #1336/#1337 to archive.
**Score:** fortress unchanged (cadence **#1350** **44**/44; next
@**#1355**).
**Verified:** private node lurker/piercer 1→0; trapper stays 1;
human stays 1; usteed skips clear. green+strict PASS; cohort
**9**/9 (8000/0900/0106/0107/4500/1500/1800/0060/2200). Path unhit.
**Next:** Open `dosit` `can_reach_floor(FALSE)`.
**Blocked:** none.
