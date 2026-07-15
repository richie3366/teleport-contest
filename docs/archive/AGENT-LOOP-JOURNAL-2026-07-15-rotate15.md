# Rotated journal crumbs

## 2026-07-15 08:44 — D-0373 vault_tele / tele_trap once (seed0012 @12489)
- Objective: seed0012 @12489 C somex rn2(2) vs JS rn2(5).
- C locus: teleport.c vault_tele/tele_trap; trap.c trapeffect_telep_trap.
- Change: hero once-TELEP → deltrap+vault_tele(somexyspace); mon mtele_trap
  (D-0373). DIAG: hero stood on vault TELEP (41,0) while JS skipped effect.
- Verification: prefix 12489→13287; RNG 12608→13295 cursors 227→244;
  green+strict PASS; cohort 24/24.
- Next: seed0012 @13287 C invault makemon next_ident vs JS wipe_engr rn2(94).
