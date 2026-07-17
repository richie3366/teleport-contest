# Rotated journal tail

## 2026-07-17 09:15 — #663 D-0594 portal landing
- Objective: seed0361 dosounds/nsinks @7837 (PRIMARY).
- C locus: `mkmaze.c` `mkportal`; `mklev.c` `place_branch`; `do.c` portal arm.
- Change: falsified nsinks=0; ported `mkportal` + `goto_level` MAGIC_PORTAL
  land (expulsion was leaving stale ux/uy → spurious `dosearch0` rnl(7)).
- Verification: prefix 7837→7844; RNG 7974→8126 Scr 178→180; green+strict;
  cohort 31/31 PASS.
- Next: seed0361 `maybe_spin_web` @7844; or Pri-strt seed0367.
