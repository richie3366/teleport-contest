# Rotated from AGENT-LOOP-JOURNAL.md

## 2026-07-15 08:15 — #395 score + D-0371 foul vomit (seed0012 @8802)
- Objective: mandatory full `sessions` (#395); primary seed0012 @8802.
- C locus: fountain.c case 20; eat.c vomit nomul(-2).
- Change: port vomit nomul arm; wire foul fountain (D-0371). Root was
  missing immobilization — JS walked onto DOOR → skipped dog_goal rn2(4).
- Verification: green+strict PASS; cohort 24/24; focused 8802→12439 RNG
  9447→12505 cursors 186→226; full suite **24/44** Scr **3640**/11405
  (31.92%) RNG **253036**/792838 (31.92%) `21+0.12/turn` (R² 0.81).
  vs #390: same PASS set; RNG matched +5279.
- Next: seed0012 @12439 C gethungry rn2(20) vs JS rn2(5).

## 2026-07-15 08:00 — D-0370 fountain monster_detect (seed0012 @8384)
- Objective: seed0012 @8384 C mtrack rn2(8) vs JS rn2(4).
- C locus: fountain.c case 26; detect.c monster_detect/browse_map.
- Change: port monster_detect (fmon array); wire drinkfountain case 26.
  Root was missing detect getpos — B/H were farlook not run.
- Verification: 8384→8802; RNG 8944→9447; cursors 128→186; green+strict;
  cohort 24/24.
- Next: seed0012 @8802 C dog_goal rn2(4) vs JS rn2(12).

