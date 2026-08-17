# Rotated from AGENT-LOOP-JOURNAL.md after #1442 D-1134 dipfountain update_inventory

## 2026-08-17 01:20 — #1427 D-1122 rloc Wizard stair / control_mon_tele

**Objective:** Open queue — `teleport.c` `rloc` Wizard stair /
`mon_telecontrol` (named). Not RLOC_MSG.
**C locus:** `teleport.c` `rloc` 1813–1841; `stairway_find_forwiz`
1786–1794; `control_mon_tele` 1898–1934; `dungeon.c` `In_W_tower`
1912–1938.
**Change:** on-map `iswiz` prefers stair/ladder via `goodpos`
(outside tower: up stair; in tower: down ladder, else up
ladder). Then wizard-mode `control_mon_tele` getpos. Default
Off. Did not pull steed→`tele()` / `mnexto` telecontrol /
RLOC_MSG. Filled D-1121 hash `803a7f5c`. Rotated #1412. Open 11
after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1425** **44**/44; next
@**#1430**).
**Verified:** private canary **33**/33; green+strict seed8000/0900;
cohort **24**/24 (0012 vault + 0360/4500/0373/0367 + 2200/0014/
0004/0009/1500/1800/0060/0102/0700/0017/0030/0116/0383/0007/
0361/0108/0002/5002/2600) + strict 0012/0360/4500/0014/2200/
0004/0009/0367/0373/0030/0002/0116. Path public-unhit on live
Wizard rloc.
**Next:** Open `teleport.c` `rloc_to` worm / ustuck-swallow
`docrt`. Not newsym.
**Blocked:** none.
