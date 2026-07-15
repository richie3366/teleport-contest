# Rotated journal entries

## 2026-07-15 14:15 — #419 teleds materialize + gold botl (D-0393)
- Objective: seed0012 @237 C materialize `--More--` vs JS blank / $:7.
- C locus: teleport.c teleds TELEDS_TELEPORT+verbose You + spoteffects;
  pickup.c pickup_object disp.botl before gold prinv.
- Change: async teleds/vault_tele materialize pline + spoteffects;
  gold flags.botl so flush paints $:307 before deferred more().
- Verification: seed0012 Scr **268→275**/308; @237–258 match; first fail
  @259 bag prompt; green+strict PASS; cohort 24/24 PASS.
- Next: seed0012 @259 empty-bag apply prompt order.
