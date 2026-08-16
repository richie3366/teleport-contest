# Rotated from AGENT-LOOP-JOURNAL.md after #1428 D-1123 rloc_to worm / swallow docrt

## 2026-08-16 22:22 — #1413 D-1111 teleok vibrating / pit-fly

**Objective:** Open queue — `teleport.c` `teleok` vibrating /
pit-fly (named). Not `rloc`.
**C locus:** `teleport.c` `teleok` 422–433; `trap.h`
`is_pit`/`is_hole`/`VIBRATING_SQUARE`; `youprop.h`
Levitation/Flying.
**Change:** local trapok by-value: no trap / VS always ok;
pit/hole iff Levitation||Flying (existing youprop clones +
steed flyer; sticky `u.Levitation`/`u.Flying` ignored). Then
`goodpos(&youmonst, 0)`. `tele_jump_ok`/`in_out_region` still
named. Filled D-1110 hash `fd738eab`. Rotated #1398. Open 12
after archive+refill. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1410** **44**/44; next
@**#1415**).
**Verified:** private canary **56**/56; green+strict seed8000/0900;
cohort **41**/41 (CURRENT list + 4500/0014) + strict 0014/4500/
0360/2200/0367/0009/0004. Path public-unhit.
**Next:** Open `teleport.c` `mlevel_tele_trap` MAGIC_PORTAL /
LEVEL_TELEP / NO_TRAP. Not hole path.
**Blocked:** none.
