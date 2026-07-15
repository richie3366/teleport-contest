# Rotated from AGENT-LOOP-JOURNAL.md

## 2026-07-15 14:40 — #422 drop gold botl + Move along! (D-0396)
- Objective: seed0012 screens after @284 (NOTES said @294 Move along!).
- C locus: invent.c freeinv_core COIN_CLASS botl; vault.c gd_move
  um_dist verbalize Move along!; monmove awaits gd_move.
- Change: do.js freeinv_drop gold `_goldCount`+flags.botl; vault.js
  async gd_move + await verbalize; monmove/shk await. Named omission:
  gd_move_cleanup Suddenly disappears.
- Verification: seed0012 Scr **284→307**/308; @307 sole miss Suddenly;
  green+strict PASS; cohort **22/22** PASS.
- Next: vault.c gd_move_cleanup / Suddenly, the guard disappears.

