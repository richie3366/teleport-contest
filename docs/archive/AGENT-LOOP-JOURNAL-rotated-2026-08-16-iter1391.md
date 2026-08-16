# Rotated from AGENT-LOOP-JOURNAL.md after #1391 D-1093 dogmove pal/target numeric msound

## 2026-08-16 14:15 — #1376 D-1081 cprefx rider revive_corpse after lifesave

**Objective:** Open queue — `eat.c` `cprefx` `revive_corpse` after
rider lifesave (debt.md).
**C locus:** `eat.c` `cprefx` 831–849; `do.c` `revive_corpse`
2111–2246.
**Change:** after `done(DIED)`+`exercise`, revive CORPSE
`victual.piece` (tins skip) then `zero_victual`. Moved helper to
`do.js` (C home); floor Death/Pestilence/Famine suffixes.
Did not pull MINVENT/CONTAINED/BURIED / Adjmonnam. Filled no prior
missing Addressed hash. Rotated #1361 to archive. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1375** **44**/44; next
@**#1380**).
**Verified:** private canary (tin-skip/norevive keep; lizard zeros
victual; invent/uwep; rider `data.mndx`); green+strict
seed8000/0900; cohort **14**/14 + strict 1800/0004/0361/4500/0360/2200.
**Next:** Open `engrave.c` `can_reach_floor` ceiling_hider / MZ_HUGE.
**Blocked:** none.
