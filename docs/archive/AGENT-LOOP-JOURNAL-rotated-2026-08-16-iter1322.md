# Rotated from AGENT-LOOP-JOURNAL.md after #1322 D-1051

## 2026-08-15 21:30 — #1309 D-1042 find_mac minvent ARM_BONUS

**Objective:** Must-fix review 02 item 1 — `find_mac` walk monster
`minvent` worn `ARM_BONUS` / amulet of guarding (thitmonst tmp).
**C locus:** `worn.c` `find_mac` (~717–735); `hack.h` `ARM_BONUS`.
**Change:** port the walk in `worn.js`; `mhitm.js` import+re-export
(local binding; re-export-only left `find_mac` undefined in mattackm).
Guarding −2 not `spe`/erosion; `AC_MAX` cap after the walk. Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1305**; next @**#1310**).
**Verified:** green+strict PASS; throw/combat/zap cohort **8**/8
(seed0361 Scr **366**/366; seed1800 throw; seed0060 kick; seed2200
zap). Private node **11**/11. Path **unhit** by public traces.
**Next:** Must-fix `should_mulch_missile` hero `!rnl(4)`.
**Blocked:** none.
