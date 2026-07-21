# Rotated from AGENT-LOOP-JOURNAL.md (#1093)

## 2026-07-21 01:05 — #1080 cadence + D-0928 place DIAG
- Objective: mandatory full `sessions` score; refine Dlvl-24 land.
- C locus: `mkmaze.c` `place_lregion`/`put_lregion_here` →
  `u_on_newpos`; levregion/`dndest`.
- Score: **42/44** Scr **10398**/11405 RNG **773047**/792838
  (97.50%) speed `31+0.26/turn`. Non-PASS: seed2200 229/230;
  seed4500 88484/108275 Scr 808.
- Falsified: place/`collect_coords` RNG mismatch (match 82k–83k).
  DIAG: JS `u_on_newpos(43,6)` @L=82425
  `dndest={lx:40,ly:3,hx:45,hy:8,nlx:82,…}`. No production JS change.
- Next: C vs JS `dndest`/levregion for Dlvl-24; cadence @#1085.

## 2026-07-21 01:01 — #1079 D-0928 linedup falsified → place
- Objective: seed4500 @88377 C `linedup` `rn2(2)` vs JS `rn2(5)`.
- C locus: `mthrowu.c` `linedup` (symptom); real: `teleport.c`
  `collect_coords` after `place_lregion` ~82426.
- Falsified: boulder/`rn2(2+spots)`. DIAG: dragon breath
  `(47,10)→(42,6)` not collinear → no linedup rn2; next mon
  `distfleeck`. C `@`(39,5→39,4) Blind vs JS `(42,6)` from ~82600.
- Verification: green+strict PASS; no production JS change; prefix
  still **88377**.
- Next: port Dlvl-24 hero place / `collect_coords` candidates;
  cadence @#1080.

