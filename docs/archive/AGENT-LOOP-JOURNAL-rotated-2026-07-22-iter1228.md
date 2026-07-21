# Rotated from AGENT-LOOP-JOURNAL.md @#1228

## 2026-07-21 22:47 — #1213 D-0945 cpostfx were/mimic/attrcurse

- Objective: map-driven — retire remaining `cpostfx` were*/mimic/`attrcurse`.
- C locus: `eat.c` `cpostfx`/`eatmdone`; `were.c` `set_ulycn`; `sit.c` `attrcurse`.
- Change: port `set_ulycn`/`attrcurse`/`eatmdone`; wire were*/mimic/
  disenchanter in `cpostfx` (D-0945). Deferred: `retouch_equipment`,
  `set_mimic_blocking`, eatspecial PAPER+.
- Verification: green+strict PASS; eat/role cohort 12/12.
- Next: eatspecial PAPER/potion/ring; dig `pay_for_damage` sites /
  pickaxe `is_digging`. Cadence @#1215.
