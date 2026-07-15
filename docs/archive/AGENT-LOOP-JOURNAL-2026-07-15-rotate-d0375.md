# Rotated from AGENT-LOOP-JOURNAL.md (D-0375 handoff)

## 2026-07-15 06:12 — D-0363 hmon dmg_recalc (seed0012 @3204)
- Objective: seed0012 @3204 C xkilled rn2(6) vs JS rn2(25).
- C locus: weapon.c dbon/weapon_dam_bonus; uhitm.c hmon_hitmon_dmg_recalc.
- Change: port dbon + martial weapon_dam_bonus into hmon before stagger
  (D-0363). JS under-dmg left mon alive → flee rn2(25).
- Verification: prefix 3204→3248; RNG 3255→3304; green+strict; cohort 22 PASS.
- Next: seed0012 @3248 C distfleeck rn2(5) vs JS rn2(100).
