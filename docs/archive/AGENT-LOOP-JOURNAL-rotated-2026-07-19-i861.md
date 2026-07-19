# Rotated from AGENT-LOOP-JOURNAL (#861)

## 2026-07-19 09:55 — #847 hell temperature + temperature_shift (D-0751)
- Objective: seed0360 @38557 C rndmonst_adj rn2(7) vs JS rn2(4).
- C locus: `mklev.c`/`sp_lev.c` temperature=In_hell?1:0; `makemon.c`
  `temperature_shift` + `pm_resistance` MR_FIRE/COLD.
- Change: clear_level_structures hellish→hot; real temperature_shift.
  Sanctum has no lua temperate (unlike valley).
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **38557→41671**; RNG **38600→41693**; Scr 207.
- Next: @41671 C place_lregion rn2(26) vs JS rn2(23).

## 2026-07-19 09:52 — #846 sanctum load + peace_minded is_minion (D-0750)
- Objective: seed0360 @37668 C nhlib shuffle vs JS rn2(79).
- C locus: `dat/sanctum.lua` via `load_special`; `makemon.c` `peace_minded` `is_minion`.
- Change: `load_sanctum` + dispatch; `peace_minded` minion → `record>=0` (no rn2).
  Falsified “post-asmodeus” — next miss after valley is sanctum.
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **37668→38557**; RNG **37686→38600**; Scr 207.
- Next: @38557 C rndmonst_adj rn2(7) vs JS rn2(4) (morgue fill_zoo).

