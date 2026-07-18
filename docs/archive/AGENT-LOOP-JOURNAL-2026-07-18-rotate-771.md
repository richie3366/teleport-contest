# Rotated journal crumbs (#771)

## 2026-07-18 19:20 — #756 D-0679 forcelock + supply + SPBOOK mrg
- Objective: seed0014 @3199 C `forcelock` `rn2(100)` vs JS `rn2(20)`.
- C locus: `lock.c` `doforce`/`forcelock`/`breakchestlock`; `mklev.c`
  supply chest; `objects.h` SPELL BITS mrg=0.
- Change: D-0679 — forcelock occupation; supply `add_to_container`;
  `oc_merge_of` excludes SPBOOK/WAND.
- Verification: prefix **3199→6294**, Scr **43→154**/714; green+strict
  PASS; cohort **33**/33.
- Next: @6294 C `exercise` vs JS `rn2(5)`.
