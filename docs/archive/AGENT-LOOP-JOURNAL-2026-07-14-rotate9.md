# Rotated journal entries

## 2026-07-14 20:00 — D-0304 xkilled post-drop newsym

- Objective: seed0030 Scr peel (CURRENT primary); prefix first-miss @484.
- C locus: `mon.c` `xkilled` — `newsym(x,y)` after treasure/corpse.
- Change: call final `newsym` after drops (mondead paints before treasure).
  Falsified mimic/`M_AP_OBJECT` theory — floor `TIN_WHISTLE` unpainted.
- Verification: prefix **484→485**; Scr **1348→1370**; RNG full;
  green+strict; 19-session PASS cohort + strict sample.
- Next: @485 C `a whistle` vs JS `a tin whistle` (`objnam` descr).

