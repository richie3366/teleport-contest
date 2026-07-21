# Rotated from AGENT-LOOP-JOURNAL @#1188

## 2026-07-21 16:05 — #1173 sanctum lspo_map lit=FALSE clear

- Objective: seed4500 @1291 look_here map C blank/3×3 vs JS walls.
- C locus: `sp_lev.c` `lspo_map` default lit=FALSE → `set_levltyp_lit`;
  `dat/sanctum.lua` solidfill then map.
- Change: `load_sanctum` clears SpLev_Map lit after map (lava stays);
  global `sel_set_ter(false)`→unlit deferred (tut-1) (D-0928 #1173).
- Verification: green+strict PASS; seed0009 PASS; cohort 14/14;
  Scr **1529→1576**; prefix **@1291→@1322**.
- Next: @**1322** getpos `fountain` vs JS `unexplored area`.
