# Rotated from AGENT-LOOP-JOURNAL.md after #1323 review D-1050/D-1051

## 2026-08-15 21:35 — #1310 D-1043 should_mulch_missile hero rnl(4)

**Objective:** Must-fix review 02 item 2 — `should_mulch_missile`
hero blessed save `!rnl(4)` not `!rn2(4)`.
**C locus:** `dothrow.c` `should_mulch_missile` (~1976–2002);
callers `thitmonst` / `mthrowu.c` `ohitmon`.
**Change:** hero arm uses existing `rnl(4)`; monster path stays
`rn2(3)`. Rule #2: no fs.
**Score:** cadence **#1310** full `sessions` **44**/44 Scr
**11405**/11405 RNG **100%** speed `31+0.27/turn` (R² 0.874).
Next @**#1315**.
**Verified:** green+strict PASS; throw/combat/zap cohort **4**/4
(seed0361 Scr **366**/366; seed1800 throw; seed0060 kick;
seed2200 zap). Private node **11**/11. Path **unhit** by public
traces.
**Next:** Must-fix `special_obj_hits_leader` `urole.questarti`.
**Blocked:** none.
