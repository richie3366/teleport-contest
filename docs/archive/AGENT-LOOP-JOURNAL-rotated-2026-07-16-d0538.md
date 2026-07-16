# Rotated from AGENT-LOOP-JOURNAL.md (#583)

## 2026-07-16 17:49 — #583 D-0525 Bar-strt selection_do_randline
- Objective: peel seed0373 @3289 C `selection_do_randline` rn2(7) vs
  JS rn2(79) after forest replace_terrain.
- C locus: `selvar.c` `selection_do_randline`; `nhlsel.c`
  `l_selection_randline` (rec=12); `dat/Bar-strt.lua`.
- Change: port selection new/get/set + `selection_do_randline` in
  `js/mklev.js`; wire path carve + portal free spot in `load_bar_strt`.
- Verification: seed0373 **3289→3303**; runner RNG **3343**/35386
  Scr 20; green+strict; cohort PASS sample held; seed0116 RNG full.
- Next: @3303 C `induced_align` rn2(3) (Pelias/makemon) vs wallify;
  or seed5006 dosounds @8468.
