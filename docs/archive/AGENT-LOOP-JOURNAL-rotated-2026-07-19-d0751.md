# Rotated from AGENT-LOOP-JOURNAL.md (#847 / D-0751)

## 2026-07-19 — #827 mattackm mlstmv + dog return onscary (D-0739)

- Objective: seed5002 @11715 (C distfleeck rn2(5) vs JS rnd(20)).
- C locus: `mhitm.c` `mattackm` `magr->mlstmv`; `dogmove.c` return gate.
- Change: set `magr.mlstmv = moves` in `mattackm`; export `onscary` and
  gate pet return attack `!onscary`. Root was undefined `mlstmv` always
  allowing bat return-attack when C had `mlstmv == moves`.
- Verification: green+strict PASS; cohort 34/34; continuous
  **11715→11725**; Scr 108→114; positional 11895→11788.
- Next: @11725 JS wish `rn2(181)` vs C `distfleeck` (identify wish
  0-RNG in C); or D-0731/D-0708.

## 2026-07-19 — #826 hero_seq + stethoscope seemimic (D-0738)

- Objective: seed5002 @11643 (C do_attack/gethungry vs JS distfleeck).
- C locus: `allmain.c` `hero_seq`; `apply.c` `use_stethoscope` seemimic.
- Change: port `hero_seq = moves<<3` / `hero_seq++`; stethoscope
  mundetected/mappearance `seemimic` + `mstatusline`. Root was stale
  `hero_seq` making every post-first stethoscope TIME (extra movemon /
  `--More--` ate east reveal keys).
- Verification: green+strict PASS; cohort 34/34; continuous
  **11643→11715**; positional **11693→11895** Scr 88→108.
- Next: seed5002 @11715 (`rn2(5)` vs `rnd(20)`); or D-0731/D-0708.
