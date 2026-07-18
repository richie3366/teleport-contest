## 2026-07-18 18:20 — #749 D-0674 gas-cloud does_block
- Objective: seed0367 @283 C blank vs JS `·` (26 cells).
- C locus: `vision.c` `does_block`; `region.c` `add_region`/`run_regions`;
  `allmain.c` after `nh_timeout`.
- Change: D-0674 — `_blocks`→`visible_region_at`; create/expire
  `recalc_block_point`; `run_regions` ttl. Was fog on LOS (22,13),
  not Algorithm-C. Next D-0675 @297 (23,14) wall.
- Verification: prefix **283→297** Scr **315→314** RNG FULL;
  green+strict PASS; cohort **32**/32.
- Next: @297 map(23,14) C `x` vs JS blank (D-0675).
