## 2026-07-15 15:35 — #430 score + known_hitum int half (D-0404)
- Objective: mandatory full score (#430÷5) + seed0004 @216 PRIMARY.
- C locus: uhitm.c known_hitum mhp < mhpmax/2 (integer) + engulfing_u.
- Change: Math.trunc(mhpmax/2) + engulfing_u in known_hitum flee gate
  (float 1<1.5 falsely entered monflee rnd(100)).
- Verification: full sessions **25/44**; Scr **4187**/11405; RNG
  **260949**/792838; seed0004 Scr **215→233**; RNG **9213→9892**
  @9795; green+strict PASS; cohort 25/25.
- Next: @9795 dog_move rn2(16) vs rn2(4).

## 2026-07-15 15:32 — #429 heal_legs nh_timeout (D-0403)
- Objective: seed0004 @51 leg feels better / unencumbered (PRIMARY).
- C locus: timeout.c nh_timeout WOUNDED_LEGS; do.c heal_legs; allmain.c
  before regen_hp; objnam.c vtense bare singular.
- Change: timeout.js WOUNDED_LEGS expiry → heal_legs(0)+stop_occupation;
  trap.js heal_legs; allmain await nh_timeout; vtense conjugate.
- Verification: seed0004 @51 match; Scr **53→215**/409; RNG
  **5331→9213**/12084 @9183; green+strict PASS; cohort **25/25**.
- Next: @216 / RNG @9183 distfleeck rn2(5) vs JS rnd(100).

## 2026-07-15 15:27 — #428 Norep gp.prevmsg (D-0402)
- Objective: seed0004 @46 caught+wriggle same topline (PRIMARY).
- C locus: pline.c Norep/vpline vs gp.prevmsg; topl.c update_topl concat.
- Change: display.js `_prevmsg` + shared `Norep`; hack/do drop
  `_last_norep` cache (pony pline must clear suppress so escape Norep
  re-shows and concatenates wriggle).
- Verification: seed0004 @46 match; Scr **52→53**/409; RNG still @4394;
  green+strict PASS; cohort 23/23 PASS.
- Next: @51 heal_legs / nh_timeout WOUNDED_LEGS (DEX wipe_engr rn2).
