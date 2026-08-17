# Rotated from AGENT-LOOP-JOURNAL.md after #1450 review D-1137–D-1140 + cadence

## 2026-08-17 03:20 — #1436 D-1129 teleds switch_terrain dest-typ

**Objective:** Open queue — `teleport.c` `teleds` `switch_terrain`
(named). Not fill_pit.
**C locus:** `teleport.c` `teleds` 548–552; `hack.c`
`switch_terrain` 3178–3217; `youprop.h` Levitation/Flying.
**Change:** port `switch_terrain` in `hack.js`. `teleds` awaits
it after vision+materialize when dest typ ≠ origin. Block:
You_cant then `B* |= FROMOUTSIDE` (no `float_down`). Unblock:
clear FROMOUTSIDE, `float_up` / `float_vs_flight` + start
flying. youprop H||E||steed-flyer && !B. Did not pull
`classify_terrain` or other callers. Filled no prior hash
gap. Rotated #1421. Open 9 after archive (no refill). Rule #2:
no fs.
**Score:** fortress unchanged (cadence **#1435** **44**/44; next
@**#1440**).
**Verified:** private canary **46**/46; green+strict seed8000/0900;
cohort **24**/24 (0012 vault + 0004 scroll + 0360/0367/0373/
4500/2200/1500/1800/0030/0009/0002/0116/0060/0102/0700/0017/
0007/0361/0108/0383/5002) + strict 0012/0360/4500/0004/2200/
0367/0373/0030/0009/0002. Path public-unhit on wall-teleport.
**Next:** Open `teleport.c` `teleds` `update_player_regions`.
Not teleok in_out_region.
**Blocked:** none.
