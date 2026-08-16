# Rotated from AGENT-LOOP-JOURNAL.md after #1399 D-1100

## 2026-08-16 16:25 — #1384 D-1088 m_initweap priest/guardian ptr.msound

**Objective:** Open queue — `makemon.c` `m_initweap` `ptr.msound`
for MS_GUARDIAN / MS_PRIEST (still mndx after D-1079). Not
peace_minded.
**C locus:** `makemon.c` `m_initweap` 263–327; `m_initinv` 721–727;
`quest_mon_represents_role` 11–13; `monflag.h` MS_PRIEST=41 /
MS_GUARDIAN=38.
**Change:** priest/guardian kits (and `m_initinv` priest) gate on
`ptr.msound`; `quest_mon_represents_role` uses LEADER/NEMESIS
msound not ldrnum/neminum. Did not pull PM_NINJA weap or
MS_NEMESIS mitem. Filled D-1087 hash `d5038ac7`. Rotated #1370
to archive. Open 9 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1380** **44**/44; next
@**#1385**).
**Verified:** private canary (synth HUMAN+MS_PRIEST mace; silent
chieftain no sword; Priest-role Twoflower mace); green+strict
seed8000/0900; cohort **16**/16 (incl. 0361/0367/0373 quest) +
strict 0367/0361/0373/0014/4500/0360/2200. Synth public-unhit.
**Next:** Open `dbridge.c` `is_pool` / `is_moat` DRAWBRIDGE_UP +
`DB_MOAT`. Audit @**#1385**.
**Blocked:** none.
