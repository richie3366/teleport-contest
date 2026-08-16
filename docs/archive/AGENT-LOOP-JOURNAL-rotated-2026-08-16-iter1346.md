# Rotated from AGENT-LOOP-JOURNAL.md after D-1065 / #1346

## 2026-08-16 03:00 — #1331 D-1057 dosit furniture sit_message

**Objective:** Open queue — `sit.c` `dosit` sink / altar / grave /
stairs / ladder sit messages only. Not lava/ice/drawbridge.
**C locus:** `sit.c` `dosit` ~526–538; `defsym.h` S_sink/S_altar/
S_grave; `pray.c` `altar_wrath`.
**Change:** sit_message for IS_SINK (rump/underside) + IS_ALTAR +
`altar_wrath` (dynamic import) + IS_GRAVE + STAIRS `"stairs"` +
LADDER `"ladder"`. Filled D-1056 hash `2e79451d`. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1330** **44**/44; next
@**#1335**).
**Verified:** private node sink rump/underside no throne `rnd(6)`;
grave/stairs/ladder not having-fun; altar `rn2(4)` no throne;
ROOM having-fun; throne still `rnd(6)`. green+strict PASS;
cohort **6**/6 (seed1500/1800/0060/0102/0360/2200). Path unhit.
**Next:** Open `dosit` lava / ice / drawbridge sit.
**Blocked:** none.
