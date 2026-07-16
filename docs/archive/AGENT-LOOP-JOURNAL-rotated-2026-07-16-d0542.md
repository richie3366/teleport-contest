# Rotated from AGENT-LOOP-JOURNAL — #602 D-0542

## 2026-07-16 18:20 — #587 D-0528 tower1 + vampshift
- Objective: seed0373 @4159 — was mislabeled Bar-loca; C loads tower1.
- C locus: `dat/tower1.lua`; `makemon.c` cham/newcham; `mon.c`
  pickvampshape; `teleport.c` noteleport_level covetous.
- Change: `load_tower1`; vampshift/newcham; covetous noteleport bypass.
- Verification: rng-diff **4159→4571**; runner RNG **4596**/35386;
  green+strict; cohort 28/28 PASS; seed0116 RNG full.
- Next: Bar-loca @4571 (menu `z`); or seed5006 dosounds @8468.
