## 2026-07-16 14:32 — D-0492 eye_of_newt_buzz via cpostfx
- Objective: primary D-0492 — seed0007 @13259 rn2(3) vs rn2(100).
- C locus: `eat.c` done_eating → cpostfx → eye_of_newt_buzz.
- Change: port eye_of_newt_buzz; thin cpostfx for AT_MAGC||PM_NEWT;
  call from done_eating on CORPSE. Was: cpostfx deferred entirely.
- Verification: rng-diff **13259→15284**; RNG 15339/16373; Scr 60;
  green+strict PASS; cohort 28/28 PASS.
- Next: @15284 dog_move rn2(12) vs rn2(4) (D-0493).
## 2026-07-16 14:28 — D-0491 SCR_DESTROY_ARMOR / destroy_arm
- Objective: primary D-0491 — seed0007 @7175 exercise vs rn2(5).
- C locus: `read.c` seffects/seffect_destroy_armor; `do_wear.c`
  destroy_arm/some_armor; `trap.c` erode_obj.
- Change: port uncursed destroy-armor → destroy_arm + erode_obj burn;
  wire doread. Was: scroll unimplemented → no turn → distfleeck at
  C's exercise index. umovement theory falsified (umov=12 at EOT).
- Verification: rng-diff **7175→13259**; RNG ~13657/16373; Scr 60;
  green+strict PASS; cohort 10 PASS.
- Next: @13259 eye_of_newt_buzz (D-0492).
