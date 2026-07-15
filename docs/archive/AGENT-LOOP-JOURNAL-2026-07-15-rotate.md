## 2026-07-15 09:35 — #400 score + D-0376 shk off-home diagnosis
- Objective: mandatory full `sessions` score (#400÷5); peel seed0012 @13517.
- C locus: shk.c shk_move onlineu/satdoor; priest.c move_special.
- Change or falsified theory: no JS patch. Falsified “move_special cand-count”
  — JS satdoor mill faithful; @13517 JS shk off-home appr=1 after mill~11069
  stuck on !onlineu; C satdoor mill ⇒ missed earlier appr=1 return (D-0376 open).
- Verification: green+strict PASS; full **24/44** Scr **3640**/11405 RNG
  **254110**/792838 speed `21+0.13/turn`.
- Next: falsify first onlineu(11,12) miss hero path 11072–13517.

## 2026-07-15 09:28 — D-0375 bag apply + gd_move escort (seed0012 @13392)
- Objective: seed0012 @13392 C distfleeck rn2(5) vs JS rn2(7).
- C locus: invent.c display_pickinv/getobj `?`; apply.c use_container;
  pickup.c out_container/menu_loot; vault.c gd_move/hidden_gold.
- Change: getobj `?` invent pick; sack apply → take-out gold; hidden_gold;
  OBJ_CONTAINED extract; peaceful gd_move corridor step (D-0375). Root was
  apply `?`→Never mind desync (a?jo$ bag loot) then stub gd_move.
- Verification: prefix 13392→13517; RNG 13430→13591 cursors 254→259;
  green+strict PASS; cohort 24/24.
- Next: seed0012 @13517 C move_special rn2(1) vs JS rn2(5).


