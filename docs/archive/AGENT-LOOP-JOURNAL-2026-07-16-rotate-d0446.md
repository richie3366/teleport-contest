# Rotated from AGENT-LOOP-JOURNAL.md

## 2026-07-16 01:50 — #464 closed-door rush bump (D-0433)
- Objective: seed0002 @8609 C `exercise` rn2(2) vs JS `rnl(20)` (PRIMARY).
- C locus: `hack.c` `test_move` closed_door autoopen/bump; `attrib.c`
  `exercise`.
- Change: JS `end_running()` before autoopen `!run` check forced
  `doopen_indir` on capital-H rush; C bumps when run set. Ported
  orthogonal Ouch+`exercise(A_DEX,FALSE)` / “That door is closed.”
- Verification: seed0002 prefix **8609→8831**; Scr **172→190**/595;
  RNG matched **9227**/27158; green+strict; cohort **24/24**.
- Next: seed0002 @8831 `drinksink` rn2(20) vs JS rn2(5).
