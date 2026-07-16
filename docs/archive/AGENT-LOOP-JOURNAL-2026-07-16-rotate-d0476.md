# Rotated from AGENT-LOOP-JOURNAL (#514 / D-0476)

## 2026-07-16 06:30 — #500 D-0462 money2mon `_goldCount` + public score
- Objective: mandatory #500 full `sessions` score; primary D-0462
  seed0002 botl `$:1175` vs `$:1225` after shop pay.
- C locus: `shk.c` `money2mon` / `freeinv_core`; `botl.c` `money_cnt`.
- Change: `js/shk.js` `money2mon` decrements `game._goldCount` by
  payment amount (JS botl `$:` cache).
- Verification: seed0002 @359 botl matches; first miss @359→@363
  (`polished silver shield` vs `shield of reflection`); Scr 363→559;
  RNG full; green+strict; cohort 26/26. Full suite: **26/44** PASS;
  Scr **4868**/11405; RNG **285358**/792838; speed `23+0.13/turn`.
- Next: D-0463 wear pline appearance vs type name @363.

## 2026-07-16 06:26 — #499 D-0461 doname unpaid_cost + paydoname
- Objective: seed0002 screen@345 C slightload prinv unpaid suffix vs
  JS bare shield name.
- C locus: `objnam.c` `doname_base` unpaid / `paydoname`; `shk.c`
  `is_unpaid` / `unpaid_cost` / `count_unpaid`.
- Change: `js/shk.js` unpaid helpers + doname suffix hook;
  `js/objnam.js` `paydoname` (`suppress_price`); pay menu/`dopayobj`
  use `paydoname`. Deferred: `contained_cost`; container paydoname
  rewrite.
- Verification: seed0002 @345 matches; first miss @345→@359; Scr
  361→363; RNG full; green+strict; cohort 24/24.
- Next: D-0462 botl `$:1175` vs `$:1225` after `pay`/`money2mon`.

