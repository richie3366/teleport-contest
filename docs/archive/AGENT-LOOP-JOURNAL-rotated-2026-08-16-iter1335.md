# Rotated from AGENT-LOOP-JOURNAL.md after reviews 27–28 / cadence #1350

## 2026-08-16 03:50 — #1335 review D-1058/D-1059 + cadence score

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`27f0a233` D-1058, `c0d5279a` D-1059)
against pinned C, not the journal; cadence full `sessions`.
**C locus:** `sit.c` `dosit` ~539–555; `dbridge.c` `is_lava`/`is_ice`;
`youprop.h` Fire/Cold; `do_wear.c`/`worn.c` `setworn` oc_oprop;
`mklev.c` `water_has_kelp`/`mineralize`; `dungeon.h` `In_endgame`.
**Change:** review 19 QUALITY-RISK (lava/ice/drawbridge order matches;
Fire/Cold helpers miss `uprops[]` so a worn FIRE_RES ring still
`d(10,10)`). Review 20 ACCEPT (WATER `!Is_waterlevel` + endgame
return before kelp). Must-fix prepended. Filled Addressed hash
`c0d5279a`. No `js/` edits. Rule #2: no fs.
**Score:** cadence **#1335** **44**/44 Scr **11405**/11405 RNG **100%**
speed `31+0.27/turn` (R² 0.87). Next @**#1340**.
**Verified:** C read of `sit.c:539–555`, `youprop.h:26–32`,
`dbridge.c:62–96`, `timeout.c:448–453`, `mondata.h:190–191`,
`do_wear.js:261–288` confer_oc_oprop (FIRE_RES unmirrored),
`invent.js:1684–1689`, `mklev.c:1430–1550`, `dungeon.h:115`/`141`;
grep `EFire_resistance=`; hunks grepped FORCE/fs/seed.
**Next:** Must-fix sit Fire/Cold `uprops[]` (review 19 item 1).
**Blocked:** none.
