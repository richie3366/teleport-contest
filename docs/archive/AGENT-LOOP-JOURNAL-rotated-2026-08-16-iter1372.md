# Rotated from AGENT-LOOP-JOURNAL.md after #1372 D-1078

## 2026-08-16 10:05 — #1357 D-1070 can_reach_floor Levitation (H||E)&&!B

**Objective:** Must-fix — `can_reach_floor` Levitation + sit
`Levitation()` must be C `youprop.h` `(H||E)&&!B`, not sticky
`u.Levitation`. Review **30** QUALITY-RISK.
**C locus:** `engrave.c` `can_reach_floor`; `sit.c` `dosit`
`else if (Levitation)`; `youprop.h:235–240`.
**Change:** helper and sit message read H/E flats and honor
`BLevitation`. Keep air/water exception. Did not pull hugs /
ceiling_hider / MZ_HUGE / rewrite `confer_oc_oprop` / other clones.
Inserted Open hugs-before-lap. Rotated #1342 to archive. Rule #2:
no fs.
**Score:** fortress unchanged (cadence **#1355** **44**/44; next
@**#1360**).
**Verified:** private node boots/potion tumble `ECMD_OK`; B sits;
air/water sit; swallow no-seats; sticky-only reaches. green+strict
PASS; cohort **14**/14 (8000/0900/1500/1800/0060/0102/0700/0106/
0107/0101/0116/2200/4500/0009). Path unhit.
**Next:** Open `can_reach_floor` ustuck AT_HUGS + `!sticks` (before
dosit lap).
**Blocked:** none.
