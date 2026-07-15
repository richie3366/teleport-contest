# Rotated journal entries

## 2026-07-15 14:25 — #420 score + bag put-in MENU_FULL (D-0394)
- Objective: mandatory full `sessions` score (#420÷5); seed0012 @259 bag
  empty prompt.
- C locus: pickup.c use_container outmaybe/yname; query_category MENU_FULL;
  invent.c addinv pickup_prev; objnam.c yname / shk_your.
- Change: outmaybe+carried yname; MENU_FULL put-in categories; pickup_prev
  + reset_justpicked; INVORDER class-heading ATR_INVERSE.
- Verification: full sessions **24/44**, Scr **3953**/11405,
  RNG **255082**/792838, `21+0.12/turn`; seed0012 **275→283**/308;
  green+strict PASS; cohort smoke PASS.
- Next: seed0012 @278 doname `containing N item`.
