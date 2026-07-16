# Rotated from AGENT-LOOP-JOURNAL.md during D-0548

## 2026-07-16 16:46 — D-0533 attach_egg_hatch_timeout
- Objective: seed0373 @9839 egg hatch `rnd(151)` vs JS `rn2(79)`.
- C locus: `timeout.c` `attach_egg_hatch_timeout`/`stop_timer`;
  `mkobj.c` `set_corpsenm` EGG + `mksobj` case EGG.
- Change: port hatch roll + `stop_timer`; wire EGG through
  `set_corpsenm`/`mksobj`. `hatch_egg` callback still deferred.
- Verification: rng-diff **9839→9875**; RNG **10034**/35386;
  green+strict PASS; cohort **30**/30 PASS.
- Next: @9875 `next_ident` `rnd(2)` vs `rnd(4)`; or seed5006
  dosounds @8468.
