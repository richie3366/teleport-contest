## 2026-07-16 14:16 — D-0490 #loot MENU_FULL take-out
- Objective: primary D-0490 — seed0007 @7142 missing obj_resists.
- C locus: `pickup.c` use_container/menu_loot/query_category/out_container;
  `dogmove.c` dog_goal invent dogfood.
- Change: MENU_FULL take-out (skip single-class category); `@` invert;
  accept lootabc `a`→take-out; gold `$` enters invent before TRIPE.
  Was: invent stop after 7 dogfoods; C burned +1 on looted gold.
- Verification: rng-diff **7142→7175**; Scr 60; green+strict PASS;
  cohort seed0004/0012/0013/0006/0002 + 22 PASS held.
- Next: @7175 exercise rn2(19) / destroy_arm (D-0491).
