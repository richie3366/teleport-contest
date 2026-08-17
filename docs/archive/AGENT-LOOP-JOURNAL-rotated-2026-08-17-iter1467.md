# Rotated from AGENT-LOOP-JOURNAL.md after #1467 D-1154 inv_pos / VIBRATING_SQUARE

## 2026-08-17 06:47 — #1452 D-1142 teleds notice_mon_off / notice_all_mons

**Objective:** Open queue — `teleport.c` `teleds`
`notice_mon_off` / `notice_all_mons` (named). Not invocation.
**C locus:** `teleport.c` `teleds` 540, 570–571; `flag.h`
`notice_mon_off`/`on` 233–237; `hack.c` `notice_mon` 1708–1731 /
`notice_all_mons` 1744–1783.
**Change:** port `a11y` block + `notice_mon` + `notice_all_mons`
in `hack.js`. `teleds` offs before `vision_recalc`, on +
`notice_all_mons(TRUE)` after invocation. Default Off. Distu
sort You see/notice; hider furniture/object skip. Did not pull
vision_recalc / goto_level / newgame / mapping / postmov callers
or `spot_monsters` option. Filled D-1141 archive hash `4d71520e`.
Open 11 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1450** **44**/44; next
@**#1455**).
**Verified:** private canary **48**/48; green+strict seed8000/0900;
cohort **24**/24 (0012 vault + 0367 Pri ^T + 0004 scroll +
0007 snake + 0009 swim + 0360/0373/4500/2200/1500/1800/0030/
0002/0116/0060/0102/0700/0017/0361/0108/0383/5002/0006/0105)
+ strict 8000/0900/0012/0367/0004/0360/4500/2200/0030/0009/0002.
Path public-unhit on `spot_monsters`.
**Next:** Open `region.c` `in_out_region` enter_msg / leave_msg.
Not update_player_regions.
**Blocked:** none.
