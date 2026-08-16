# Rotated from AGENT-LOOP-JOURNAL.md after #1392 D-1094 MS_NEMESIS mitem ptr.msound

## 2026-08-16 14:24 — #1377 D-1082 can_reach_floor ceiling_hider / MZ_HUGE

**Objective:** Open queue — `engrave.c` `can_reach_floor` ceiling_hider /
MZ_HUGE (named from D-1069/D-1071). Not check_pit.
**C locus:** `engrave.c` `can_reach_floor` (~203–207); `mondata.h`
`ceiling_hider`; `youprop.h` Flying; `monflag.h` `MZ_HUGE`.
**Change:** undetected ceiling hiders return FALSE (piercer/lurker;
trapper HIDE-only still reaches; large mimic S_MIMIC excluded).
Then `Flying() || msize >= MZ_HUGE` TRUE. Flying is youprop.h
`(H||E||steed is_flyer)&&!B`, not sticky `u.Flying`. Did not
pull check_pit. Filled D-1081 Addressed hash `cd5af20a`.
Rotated #1362/#1363 to archive. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1375** **44**/44; next
@**#1380**).
**Verified:** private canary (piercer/lurker/trapper/mimic/giant/
HFlying/steed-skill); green+strict seed8000/0900; cohort **20**/20
+ strict 1800/0004/0101/0103/0360/2200/4500.
**Next:** Open `engrave.c` `can_reach_floor(check_pit)` teeter/shaft.
**Blocked:** none.
