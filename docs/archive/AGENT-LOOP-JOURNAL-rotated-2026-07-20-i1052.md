# Rotated journal crumbs

## 2026-07-20 19:53 — #1037 D-0886 rloc appear + flee RLOC_MSG
- Objective: seed0014 @424 fountain dryup missing `--More--`.
- C locus: `monmove.c` `dochug` flee `rloc(RLOC_MSG)`; `teleport.c`
  `rloc_to_core` post-place appear/close-by.
- Change: await `rloc(mtmp, RLOC_MSG)` in flee-teleport; port appear
  pline after `rloc_to` (nymph appear forces more on fountain topline).
- Verification: green+strict PASS; cohort 8/8 PASS; seed0014 Scr
  **636→638**/714 (RNG FULL).
- Next: @457 C nymph smiles/engagingly vs JS hits (SSEX).
