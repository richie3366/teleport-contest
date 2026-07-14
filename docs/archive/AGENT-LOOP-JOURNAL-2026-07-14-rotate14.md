## 2026-07-14 21:44 — #342 D-0315 Priest xname bknown

- Objective: seed0030 @787 Things that are here (CURRENT).
- C locus: `objnam.c` `xname` `Role_if(PM_CLERIC)` → `obj->bknown=1`.
- Change: force cleric `bknown` in `xname` + `doname` (D-0315). Prior
  map-overlay hypothesis falsified — miss was BUC text.
- Verification: @787 `a cursed candy bar`; Scr **1395→1398**; first miss
  **@791** wand `(0:6)`; RNG full; green+strict; 19 PASS cohort.
- Next: @791 pet pickup `glass wand` vs `glass wand (0:6)`.

