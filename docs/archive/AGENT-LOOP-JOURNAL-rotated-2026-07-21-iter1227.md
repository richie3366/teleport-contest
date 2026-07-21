# Rotated from AGENT-LOOP-JOURNAL.md @#1227

## 2026-07-21 22:43 — #1212 D-0944 mconveys + givit

- Objective: map-driven — retire `corpse_intrinsic`/`givit` debt.
- C locus: `eat.c` `intrinsic_possible`/`should_givit`/`temp_givit`/
  `givit`/`corpse_intrinsic`; `monst.c` MON mr2 (`mconveys`).
- Change: extract `mconveys[]`; wire `mons()` + `control_teleport`/
  `telepathic`; port intrinsic cluster into `cpostfx` (D-0944).
  Deferred: were*/mimic gold/`attrcurse`/eatspecial PAPER+.
- Verification: green+strict PASS; eat/role cohort 12/12.
- Next: eatspecial PAPER/potion/ring; were* `set_ulycn`; other
  `debt.md` row. Cadence @#1215.

## 2026-07-21 22:38 — #1211 D-0943 cpostfx specials

- Objective: map-driven — retire `cpostfx` specials / hallu debt.
- C locus: `eat.c` `cpostfx` (+ `pluslvl`/`make_blinded`/`polyself`/
  `toggle_displacement`/`self_invis_message`/`adjattrib`).
- Change: port specials switch + AD_STUN/AD_HALU `make_hallucinated`
  + newt buzz; export displacement/invis helpers (D-0943). Deferred:
  were*/mimic gold/`attrcurse`/`corpse_intrinsic`/`givit`.
- Verification: green+strict PASS; eat/role cohort 12/12.
- Next: eatspecial PAPER/potion/ring; `mconveys`+`givit`; other
  `pay_for_damage` sites / pickaxe `is_digging`. Cadence @#1215.
