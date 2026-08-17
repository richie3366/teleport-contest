# Rotated from AGENT-LOOP-JOURNAL.md after #1459 D-1148 deal_with_overcrowding

## 2026-08-17 05:00 — #1444 D-1136 mongrantswish tmp_at glyph hide

**Objective:** Open queue — `fountain.c` `mongrantswish` `tmp_at`
glyph hide (named). Not dowaterdemon makemon.
**C locus:** `potion.c` `mongrantswish` 2794–2811; `display.c`
`glyph_at` 2478–2482 / `tmp_at` DISP_ALWAYS; `fountain.c`
`dowaterdemon` 78–82.
**Change:** snapshot gbuf `loc.disp_*` before splice+newsym; wrap
`makewish` in `tmp_at(DISP_ALWAYS)` + `tmp_at(mx,my)` +
`DISP_END`. Not `mon_glyph` (no extra Hallu rng). Did not pull
full C `mongone` or `djinni_from_bottle`. Did not rewrite
`dowaterdemon` `makemon`. Filled D-1135 archive hash `b166bda5`.
Rotated #1429. Open refill 7→12. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1440** **44**/44; next
@**#1445**).
**Verified:** private canary **27**/27; green+strict seed8000/0900;
cohort **24**/24 (0006 demon + 0014 fountain + 0007 snakes +
0002 drinksink + 0383/0399 Hallu + 0108/0360/2200/4500 +
1500/1800/0060/0004/0009/0012/0030/0116/0367/0398/0373/0106)
+ strict 8000/0900/0002/0014/0006/0106/0108/0360/2200/4500/
0030. Path public-unhit on the wish hide.
**Next:** Open `region.c` `make_gas_cloud` enveloped pline.
Not create_gas_cloud size-1. Audit @**#1445**.
**Blocked:** none.
