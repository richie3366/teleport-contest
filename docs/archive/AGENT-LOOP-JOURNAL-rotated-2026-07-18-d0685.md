# Rotated from AGENT-LOOP-JOURNAL.md (#762 / D-0685)

## 2026-07-18 17:45 — #747 D-0673 tower1 map lit=FALSE
- Objective: seed0367 @278 C blank vs JS temple wall scraps.
- C locus: `sp_lev.c` `lspo_map` lit default FALSE; `dat/tower1.lua`.
- Change: `load_tower1` clears map-cell `.lit` after apply (D-0673;
  ≡ Pri-loca D-0668). solidfill BOOL_RANDOM lit was kept by
  `sel_set_ter(...,false)` nochange → over-lit vision past nv=1.
- Verification: Scr **312→315**/324 prefix **278→283**; green+strict;
  cohort **34**/34. RNG FULL.
- Next: @283 materialize More — C blank vs JS `·` (26 cells).

