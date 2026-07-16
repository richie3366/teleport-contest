# Rotated from AGENT-LOOP-JOURNAL.md

## 2026-07-16 17:35 — #579 D-0521 load_special must not fill
- Objective: seed0116 @12294 C `place_lregion` vs JS `rn2(1156)` after
  fill_zoo (NOTES guessed irregular/door filter).
- C locus: `sp_lev.c` `load_special` (no fill); `mklev.c:1416`
  `fill_special_room` once after `makemaz`.
- Change: remove premature `fill_special_room` from `load_soko1_1`
  (double zoo fill). Not a cell-filter bug.
- Verification: prefix **12294→12330** (RNG **12368**/12562) Scr 110;
  green+strict; cohort 8/8 PASS.
- Next: `put_lregion_here` accept vs C reject @12330; or Bar-strt /
  dosounds.
