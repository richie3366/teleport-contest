## 2026-07-20 00:05 — #1070 D-0919 FAST TIMEOUT + score
- Objective: cadence score + seed4500 @61462 C distfleeck rn2(5) vs
  JS rn2(1000) (prayer_done rnz early).
- C locus: `timeout.c` `nh_timeout` `case FAST`; `youprop.h` Very_fast.
- Change: decrement HFast TIMEOUT; You_feel slow-down when !Very_fast.
  Root: sticky Very_fast → free umove → skip post-descend EOT → early #pray.
- Verification: full suite **42/44** Scr **10233**/11405 RNG **94.13%**;
  prefix **61462→61689** RNG **61766** Scr **643**; green+strict;
  cohort 15/15.
- Next: @61689 C `fix_worst_trouble` rnd(5) vs JS rn2(1000).
