# Rotated from AGENT-LOOP-JOURNAL.md

## 2026-07-15 16:20 — #433 seed0004 @10370 Conflict / MENU_INVERT_ALL (D-0406)
- Objective: seed0004 @10370 PRIMARY — C `resist_conflict` `rnd(20)` vs
  JS `dog_move` `rn2(16)`.
- C locus: `wintty.c` MENU_INVERT_ALL; `mondata.c` `resist_conflict`;
  `dogmove.c` / `mon.c` `mon_allowflags`.
- Change: PICK_ANY `@`/`.`/`-`; `resist_conflict` + worn-ring
  `hero_conflict`; wire dog_move + mon_allowflags. Root was ignored `@`
  so conflict ring never picked up.
- Verification: seed0004 RNG 10399→10409; miss @10382; green+strict;
  cohort 23/23.
- Next: seed0004 @10382 exercise rn2(19) vs rn2(5) (teleport scroll).
