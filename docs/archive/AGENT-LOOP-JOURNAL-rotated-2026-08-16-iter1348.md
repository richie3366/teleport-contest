# Rotated from AGENT-LOOP-JOURNAL.md after D-1066 / #1348

## 2026-08-16 03:20 — #1333 D-1058 dosit lava/ice/DRAWBRIDGE_DOWN sit

**Objective:** Open queue — `sit.c` `dosit` lava / ice / drawbridge
sit (terrain, not trap-lava D-1039).
**C locus:** `sit.c` `dosit` ~539–555; `dbridge.c` `is_lava`/`is_ice`;
`mondata.h` `likes_lava`; `youprop.h` Fire/Cold; `timeout.c`
`burn_away_slime`.
**Change:** WWalking lava sit_message + `burn_away_slime` +
`likes_lava` warm vs `d((Fire_resistance?2:10),10)` `"sitting on
lava"`; ice sit_message + !Cold `"ice feels cold"`; DRAWBRIDGE_DOWN
`"drawbridge"`. Local `is_ice` includes DRAWBRIDGE_UP+DB_ICE.
`hack.js` `is_lava` DRAWBRIDGE_UP+DB_LAVA still named. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1330** **44**/44; next
@**#1335**).
**Verified:** private node likes_lava no `d()`; burn `d(10,10)` no
trap `rnd(4)`; Fire_res `d(2,10)`; ice ±Cold; drawbridge; throne
still `rnd(6)`; trap TT_LAVA `rnd(4)`+`d(2,10)`. green+strict PASS;
cohort **6**/6 (seed1500/1800/0060/0102/0360/2200). Path unhit.
**Next:** Open tut-1 `des` kelp only.
**Blocked:** none.
