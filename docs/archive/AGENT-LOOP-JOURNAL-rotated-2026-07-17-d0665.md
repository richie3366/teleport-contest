## 2026-07-17 16:35 — #723 D-0651 medusa-1 load_special
- Objective: seed0367 @26691 C nhlib shuffle vs JS place_lregion.
- C locus: dat/medusa-1.lua; sp_lev.c load_special/create_object Medusa
  statues; mkmaze.c fixup_special Is_medusa_level; mkobj.c STATUE book.
- Change: load_medusa_1 + dispatch; Is_medusa_level; fixup medusa arm;
  STATUE book add_to_container (D-0651).
- Verification: @26691→26695 (RNG 26718, Scr 170); green+strict PASS;
  cohort 34/34 prior-PASS sample.
- Next: @26695 rndmonst_adj weight rn2(3) vs rn2(5) on Perseus rndmonnum.

