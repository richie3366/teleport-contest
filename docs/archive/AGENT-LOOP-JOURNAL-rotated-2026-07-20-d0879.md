# Rotated journal crumbs

## 2026-07-20 17:09 — #1015 score + D-0866 trapeffect_web
- Objective: mandatory full score @#1015; seed0399 @10581
  C mintrap rn2(40) vs JS rn2(20).
- C locus: `trap.c` `trapeffect_web` / `mu_maybe_destroy_web`;
  selector WEB case. Symptom was missing mon `mtrapped` on WEB.
- Change: port mon web catch/tear + destroy/flow; wire selector.
  Score: **39/44** Scr **9337**/11405 RNG **667341**/792838
  (84.17%); speed `32+0.23/turn`. Δ vs #1010 Scr+273 RNG+806.
- Verification: green+strict PASS; prefix **10581→10697** Scr
  **409→429**; cohort 10/10; full sessions post-fix.
- Next: seed0399 @10697 C `tmiss` rn2(3) vs JS rn2(100).
