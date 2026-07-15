# Rotated from AGENT-LOOP-JOURNAL.md (#400)

## 2026-07-15 06:35 — D-0364 dog_nutrition oc_delay (seed0012 @3248)
- Objective: seed0012 @3248 C fleeck vs JS obj_resists after pet fleeck.
- C locus: dogmove.c dog_nutrition/dog_eat; monmove.c m_move meating.
- Change: dog_nutrition reads objects[].oc_delay + FOOD nutrition×msize;
  non-food owt/20 (D-0364). Was instance oc_delay→meating=1 after tripe.
- Verification: prefix 3248→3483; RNG 3304→3638; green+strict; cohort 24/24.
- Next: seed0012 @3483 C dog_goal obj_resists vs JS dog_move rn2(3).

## 2026-07-15 06:20 — #385 score + D-0364 diagnose (seed0012 @3248)
- Objective: mandatory full `sessions` score (#385÷5); primary seed0012 @3248.
- C locus: dogmove.c dog_goal/dog_move; zap.c obj_resists (DIAG only).
- Change: none in js/. Score refresh 24/44 (Scr 3640/11405, RNG 243833/792838).
  DIAG: pet dog_goal obj_resists on CHEST/STATUE/CORPSE/ICE_BOX; skip dog_move
  RNG → prefix 3483 (falsifier only — reverted).
- Verification: green+strict PASS; full suite 24/44.
- Next: fix fobj membership near pet (D-0364); do not skip dog_move.

