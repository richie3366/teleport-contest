## 2026-07-15 18:58 — #447 seed0004 @182 cursemsg canseemon (D-0416)
- Objective: seed0004 screen-only PRIMARY — first cell miss after full RNG.
- C locus: `dogmove.c` `dog_move` cursemsg `(wasseen || canseemon)`;
  `display.h` `_canseemon`.
- Change: replace always-true local `canseemon` stub in `dogmove.js`
  with `display.canseemon` (LOS + mon_visible). Out-of-sight cursed
  pet step no longer plines.
- Verification: seed0004 Scr **243→244**/409; miss @182→@239; RNG
  full; green+strict PASS; cohort **23/23**.
- Next: seed0004 @239 `The bag is empty.` vs `the bag is empty.`
  (`Ysimple_name2` / upstart).
