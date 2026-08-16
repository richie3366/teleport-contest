# Rotated from AGENT-LOOP-JOURNAL.md after #1396 D-1097

## 2026-08-16 15:20 — #1381 D-1085 can_reach_floor Flying via uprops

**Objective:** Must-fix — `engrave.c` `can_reach_floor` `Flying()`
via `uprops[FLYING]` (review **43**). Not steal.c `remove_worn_item`.
**C locus:** `youprop.h` Flying (~247–255); `engrave.c`
`can_reach_floor` (~206–207); `do_wear.c` Amulet_on flying
(~1056–1058).
**Change:** `Flying()` ORs H/E flats **and** `uprops[FLYING]`
intrinsic/extrinsic; keep steed `is_flyer`; keep `!BFlying` /
`prop.blocked` (eat.js shape, no sticky skip of blocked).
Worn amulet skips `check_pit`. Did not rewrite `confer_oc_oprop`.
Stamped review **43** **Addressed:** D-1085 (hash next SHA).
Rotated #1367 to archive. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1380** **44**/44; next
@**#1385**).
**Verified:** private canary 20/20 (confer amulet EFlying unset
skips pit; HFlying; unskilled rider still false; BFlying;
MZ_HUGE; shaft; swallow/ceiling before Flying); green+strict
seed8000/0900; cohort **14**/14 + strict 1800/0004/0101/0103/
0360/2200/4500.
**Next:** Open `steal.c` `remove_worn_item` armor `*_off`.
**Blocked:** none.
