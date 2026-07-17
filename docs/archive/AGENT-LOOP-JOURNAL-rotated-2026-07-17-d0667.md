# Rotated from AGENT-LOOP-JOURNAL (#739 / D-0667)

## 2026-07-17 16:47 — #725 score + D-0653 goodpos pool air
- Objective: mandatory full `sessions` (#725÷5) + seed0367 @27121.
- C locus: teleport.c goodpos pool/lava/eel; mon.c m_in_air.
- Change: port goodpos is_swimmer/m_in_air/likes_lava + eel rn2(13)
  (D-0653). Was blanket-rejecting MOAT for S_VORTEX. Score: **34/44**;
  Scr **6924**/11405; RNG **442068**/792838 (55.76%); `34+0.16/turn`.
- Verification: @27121→27126 (RNG 27153, Scr 170); green+strict PASS;
  cohort sample PASS; full suite post-fix.
- Next: @27126 C rndmonst_adj rn2(3) vs JS rn2(75).
## 2026-07-17 16:45 — #724 D-0652 align_shift oldmoves + moves=0 mklev
- Objective: seed0367 @26695 C rndmonst_adj rn2(3) vs JS rn2(5).
- C locus: makemon.c align_shift (static oldmoves/Is_special);
  u_init.c u_init_role moves=1 after mklev; allmain.c newgame order.
- Change: port align_shift cache + ternary align; moves=0 through
  starting mklev; reset cache on newgame (D-0652). Was recomputing
  medusa chaotic ash while C still had stale bigrm align 0.
- Verification: @26695→27121 (RNG 27146, Scr 170); seed0009 PASS;
  green+strict PASS; cohort 32/32 prior-PASS.
- Next: @27121 C next_ident rnd(2) vs JS makemon_rnd_goodpos rn2(77).

