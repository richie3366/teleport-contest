# Rotated from AGENT-LOOP-JOURNAL — #603 D-0543

## 2026-07-16 18:25 — #588 D-0529 Bar-loca + traptype_rnd
- Objective: seed0373 @4571 C nhlib shuffle vs JS u_on_rndspot.
- C locus: `dat/Bar-loca.lua`; `mklev.c` `traptype_rnd`
  (`level_difficulty`).
- Change: `load_bar_loca` + dispatch; `traptype_rnd` uses
  `level_difficulty()` (was `dlevel`).
- Verification: rng-diff **4571→5082**; runner RNG **5133**/35386;
  green+strict; cohort 28/28 PASS; seed0116 RNG full.
- Next: m_initweap @5082; or seed5006 dosounds @8468.
