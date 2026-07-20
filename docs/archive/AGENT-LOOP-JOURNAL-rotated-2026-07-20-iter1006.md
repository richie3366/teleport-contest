# Rotated from AGENT-LOOP-JOURNAL.md @#1006

## 2026-07-20 13:27 — #993 gulpmu Hallu vision_off falsified (D-0852)
- Objective: seed0383 @195; close remaining warn gap after D-0852.
- C locus: mhitu.c gulpmu `vision_recalc(2)`; display.c display_warning.
- Diagnosis: dlvl12 Hallu `docrt` can run with empty viz (cells=0) after
  gulpmu `vision_recalc(2)` without warn burns; successful menu docrt +
  goto_leave each burn 9×5. Session warn 38 vs C 45 (−7).
- Falsified: Hallu `vision_off_newsym_gbuf` in gulpmu → session warn 45
  but Scr **196→174**; burn-only spatial rn2(5) → core RNG 11527;
  memory restore after vision_off still Scr 174. No JS kept.
- Verification: green+strict PASS; seed0383 Scr **196** RNG FULL (baseline).
- Next: C ~drn2 gulp→expel window vs JS; display_nhwindow before vr(2)
  (D-0841) may own timing; do not retry gulpmu vision_off.

## 2026-07-20 13:15 — #992 D-0852 Hallu vision_recalc(2) warn burns
- Objective: seed0383 @195 Hallu; restore missing display_warning burns.
- C locus: vision.c `vision_recalc(2)` update loop; display.c
  `display_warning` / `docrt`; do.c `goto_level` leave.
- Change: Hallu-only `vision_off_newsym_gbuf({useLiveViz:true})` in
  `docrt` + `goto_level` leave; bones `_leave_viz_burned` skip.
  Falsified: global ctrl=2 loop (Scr 174); non-Hallu vision_off
  (cohort −screens). Stale `_leave_viz_snapshot` must not override
  live viz.
- Verification: seed0383 Scr **196** RNG FULL; green+strict PASS;
  cohort seed0002/0012/0013-restore/0360/0398 PASS.
- Next: remaining cluster0 warn gap / @195 cells; flush parked.

## 2026-07-20 12:51 — #991 seed0383 C ~drn2 falsifier (D-0852)
- Objective: C display-RNG inventory for seed0383 levtport→@195.
- C locus: display.c `display_warning` / `docrt` / `see_monsters`;
  rnd.c `rn2_on_display_rng(WARNCOUNT-1)`.
- Change: diagnosis only. Rerecorded with `NETHACK_RNGLOG_DISP=1`.
  C @195 = **70** (~drn2): pre-gen **19×5**+4×463+40×383; post-gen
  **7**. Session warn **45** vs JS **16** (`HWarning` set — not gap).
  Cluster1 counts match; values skew from missing warn burns.
- Verification: green+strict PASS; seed0383 Scr **194** RNG FULL;
  no JS patch.
- Next: menu-dismiss `docrt` warn-only `display_warning` path vs C.

