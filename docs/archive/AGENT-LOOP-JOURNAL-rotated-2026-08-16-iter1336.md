# Rotated from AGENT-LOOP-JOURNAL.md after D-1068 dosit hider

## 2026-08-16 03:55 — #1336 D-1060 dosit Fire/Cold uprops[]

**Objective:** Must-fix — `dosit` lava/ice sit Fire_resistance /
Cold_resistance must read C `youprop.h` `uprops[FIRE_RES]` /
`[COLD_RES]` (review 19 QUALITY-RISK).
**C locus:** `youprop.h:26–32`; `sit.c` `dosit` ~548–553;
`worn.c` `setworn` `oc_oprop`.
**Change:** sit helpers OR flats + `uprops[]` (invent.js
`hero_Fire_resistance` shape). Did not rewrite `confer_oc_oprop`;
did not retouch zap/trap/explode aliases; did not pull `is_lava`
DRAWBRIDGE_UP+DB_LAVA. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1335** **44**/44; next
@**#1340**).
**Verified:** private node worn FIRE_RES ring `EFire` unset →
`d(2,10)`; `HFire` only → `d(2,10)`; no-res → `d(10,10)`; COLD_RES
ring on ICE skips “ice feels cold”; trap TT_LAVA still
`rnd(4)`+`d(2,10)`. green+strict PASS; cohort **6**/6
(seed1500/1800/0060/0102/0360/2200). Path unhit.
**Next:** Open tut-1 stairs only.
**Blocked:** none.
