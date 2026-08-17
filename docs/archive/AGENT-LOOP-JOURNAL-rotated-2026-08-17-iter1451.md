# Rotated from AGENT-LOOP-JOURNAL.md after #1451 D-1141 teleds invocation_message

## 2026-08-17 03:35 — #1437 D-1130 teleds update_player_regions

**Objective:** Open queue — `teleport.c` `teleds`
`update_player_regions` (named). Not teleok in_out_region.
**C locus:** `teleport.c` `teleds` 529; `region.c`
`update_player_regions` 582–592; `region.h` hero_inside.
**Change:** port `update_player_regions` in `region.js`.
`teleds` calls it after placebc, before newsym. Absolute
REG_HERO_INSIDE from dest; attach_2_u always clear (C
dangling else). No enter/leave callbacks (not in_out_region).
Did not flip geometric `is_hero_inside_gas_cloud`. Filled
D-1129 hash `410f22a2`. Rotated #1422. Open 8 after archive
(no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1435** **44**/44; next
@**#1440**).
**Verified:** private canary **27**/27; green+strict seed8000/0900;
cohort **22**/22 (0012 vault + 0004 scroll + 0360/0367/0373/
4500/2200/1500/1800/0030/0009/0002/0116/0060/0102/0700/0017/
0007/0361/0108/0383/5002) + strict 0012/0360/4500/0004/2200/
0367/0373/0030/0009/0002. Path public-unhit on gas teleds.
**Next:** Open `teleport.c` `teleds` `hideunder` / mimic.
Not swallow docrt.
**Blocked:** none.
