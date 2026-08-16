# Rotated from AGENT-LOOP-JOURNAL.md after #1395 review D-1093–D-1096 + cadence score

## 2026-08-16 15:05 — #1380 review D-1081–D-1084 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `eat.c` `cprefx` 831–849 / `do.c` `revive_corpse`
2111–2246; `engrave.c` `can_reach_floor` 203–211 / `youprop.h`
Flying / `mondata.h` `ceiling_hider`; `trap.c` teeter/shaft;
`sit.c` `throne_sit_effect` 48–61.
**Change:** reviews **42** ACCEPT D-1081, **43** QUALITY-RISK
D-1082 (`Flying()` misses `uprops[FLYING]` for amulet of flying),
**44** ACCEPT D-1083, **45** ACCEPT D-1084. Must-fix prepend
Flying uprops (copy `eat.js`). Filled D-1084 archive hash
`83a3ada5`. Rotated #1366 to archive. Rule #2: no fs.
**Score:** cadence **#1380** **44**/44 Scr **11405**/11405 RNG
**100%** speed `31+0.27/turn` (R² 0.88). Next @**#1385**.
**Verified:** full `sessions` **44**/44; role-init throws **0**/44.
C read of the four loci vs JS hunks; grep FORCE/fs/seed.
**Next:** Must-fix `engrave.c` `can_reach_floor` `Flying()` via
`uprops[FLYING]`. Not steal.c `remove_worn_item`.
**Blocked:** none.
