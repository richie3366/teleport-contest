# Rotated from AGENT-LOOP-JOURNAL (#441)

## 2026-07-15 15:20 — #427 trapmove + Burdened botl (D-0401)
- Objective: seed0004 @29 caught-in-bear (PRIMARY).
- C locus: hack.c trapmove/domove; botl.c enc_stat; attrib.c exerper;
  trap.c mintrap rn2(40); dogmove.c defer newsym to postmov.
- Change: ported trapmove+wire; botl Burdened; exerper wounded/encumb;
  mintrap escape RNG; dog_move newsym→postmov only.
- Verification: seed0004 Scr **29→52**/409 (prefix ~46); RNG
  **4114→5331**/12084; green+strict PASS; cohort 23/23 PASS.
- Next: @46 caught+wriggle same topline; or RNG @4394 DEX rn2(67/64).

## 2026-07-15 15:10 — #426 encumber_msg wounded legs (D-0400)

- Objective: seed0004 @27 bear-trap `--More--` (hypothesized flush_topl).
- C locus: do.c set_wounded_legs → encumber_msg; hack.c weight_cap
  WT_WOUNDEDLEG_REDUCT; pickup.c encumber_msg; allmain preamble.
- Change: ported encumber_msg + wounded-leg carrcap; call from
  set_wounded_legs + moveloop_preamble. Falsified “flush alone” —
  second load pline drives more().
- Verification: seed0004 @27/@28 match; RNG 4087→4114; Scr 29/409
  (@29 caught-in-bear next); green+strict PASS; cohort 23/23 PASS.
- Next: seed0004 @29 `You are caught in a bear trap.`; or seed0002
  eatcorpse.

