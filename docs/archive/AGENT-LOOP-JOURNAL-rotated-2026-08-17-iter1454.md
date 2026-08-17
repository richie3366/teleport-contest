# Rotated from AGENT-LOOP-JOURNAL.md after #1454 D-1144 djinni_from_bottle

## 2026-08-17 04:00 — #1439 D-1132 teleds buried_ball_to_punishment

**Objective:** Open queue — `teleport.c` `teleds`
`buried_ball_to_punishment` (named). Not Punished ball.
**C locus:** `teleport.c` `teleds` 456–459; `dig.c`
`buried_ball_to_punishment` 1934–1955 / `buried_ball`.
**Change:** port `buried_ball_to_punishment` (extract, `punish`
reuse, `reset_utrap(FALSE)`, `del_engr_at`/`newsym`). `teleds`
calls it when `utraptype==TT_BURIEDBALL` before `ball_active`.
Did not wire trapmove/`unearth_objs`/`digactualhole`/`level_tele`/
`domagicportal`. Filled D-1131 hash `00956ae8`. Dropped leftover
#1424 stub (already archived). Open 11 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1435** **44**/44; next
@**#1440**).
**Verified:** private canary **49**/49; green+strict seed8000/0900;
cohort **22**/22 (0012 vault + 0004 + 0007 snake + 0009 swim +
0360/0367/0373/4500/2200/1500/1800/0030/0002/0116/0060/0102/0700/
0017/0361/0108/0383/5002) + strict 0012/0360/4500/0004/2200/0367/
0373/0030/0009/0002. Path public-unhit on buried-ball teleds.
**Next:** Open `teleport.c` `tele()` / trap teledest. Not
tele_trap wrenching.
**Blocked:** none.
