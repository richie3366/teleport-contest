# Rotated from AGENT-LOOP-JOURNAL.md

## 2026-07-21 22:55 — #1214 D-0946 eatspecial PAPER/potion/ring

- Objective: map-driven — retire `eatspecial` PAPER/potion/ring/amulet
  + leash/trident/flint/`uwepgone`/`unpunish`.
- C locus: `eat.c` `eatspecial`/`eataccessory`/`bounded_increase`;
  `wield.c` uwepgone*; `read.c` `unpunish`; `apply.c` `o_unleash`.
- Change: port remaining `eatspecial` body + `eataccessory`; wire
  helpers (D-0946). Deferred: vault_gd; Ring_gone sink; float_up;
  rescham; choke(strangle); set_mimic_blocking.
- Verification: green+strict PASS; eat/role cohort 12/12.
- Next: dig `pay_for_damage` sites / pickaxe `is_digging`. Cadence
  @#1215.
