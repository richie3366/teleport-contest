## 2026-07-16 — D-0490 DIAG (seed0007 @7142)
- Objective: primary D-0490 — missing `obj_resists` after box unlock.
- C locus: `dogmove.c` `dog_goal` invent / `dog_move` cand; `dog.c` `dogfood`.
- Falsified: permanent carrot-before-tripe invent order; geometry-only
  hero-cell box cand (matched `@7102` same pet@7,3 without +1). DIAG:
  invent stops on TRIPE; C wants +1 then `rn2(1)`; JS world identical
  at `@7102` vs `@7142` except `moves` 92→93. Probe +1 dogfood → 7175.
- Verification: green+strict PASS; no JS production change (DIAG removed).
- Next: C-only state for that +1 (invent/sack/cand object desync).
## 2026-07-16 13:47 — #545 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score-only; D-0490 left open).
- Change or falsified theory: none — documented suite aggregates.
- Verification: green+strict PASS; full suite **28/44** Scr **5054**/11405
  RNG **294730**/792838 (37.17%) speed `24+0.13/turn`. Δ vs #540:
  Scr +40, RNG +4921 (D-0488/89 absorbed). seed0007 still @7142.
- Next: D-0490 DIAG fourth C `obj_resists` (invent vs fobj dogfood).
## 2026-07-16 13:45 — D-0489 #loot box pick_lock
- Objective: seed0007 @7066 C picklock rn2(100) vs JS rn2(5) (D-0489).
- C locus: `pickup.c` do_loot_cont; `lock.c` pick_lock/picklock box arm.
- Change: do_loot_cont APPLY_KEY → pick_lock(container); picklock box
  occupation (4*DEX+25). Was: #loot locked stubbed; JS skipped rn2(100).
- Verification: rng-diff **7066→7142**; RNG **7309→7885**; Scr 60; green+
  strict; cohort 26 PASS.
- Next: @7142 C obj_resists rn2(100) vs JS dog_move rn2(1) (D-0490).
## 2026-07-16 13:38 — D-0488 mO doset + pickup_types
- Objective: seed0007 @6414 C eatcorpse rn2(20) vs JS rn2(7) (D-0488).
- C locus: `options.c` doset_simple→doset on menu_requested; `cmd.c`
  CMD_M_PREFIX on O; `pickup.c` autopick_testobj.
- Change: keep menu_requested for O; port doset PICK_ANY so session
  sets pickup_types=$"?!=/ (no food). Was: O cleared m-prefix → empty
  pickup_types → floor food auto-pickup → wrong eatcorpse.
- Verification: rng-diff **6414→7066**; green+strict; cohort PASS.
- Next: @7066 #loot box picklock (D-0489).
