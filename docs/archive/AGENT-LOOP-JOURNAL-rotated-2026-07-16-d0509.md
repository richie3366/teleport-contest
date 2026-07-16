## 2026-07-16 14:52 — D-0494 Amulet_on RESTFUL_SLEEP rnd(98)
- Objective: primary D-0494 — seed0007 @15877 Amulet_on vs distfleeck.
- C locus: `do_wear.c` `Amulet_on` AMULET_OF_RESTFUL_SLEEP → `rnd(98)+2`
  into `HSleepy` TIMEOUT.
- Change: port RESTFUL_SLEEP arm in `js/do_wear.js` (was deferred with
  change/strangle/flying). Still `on_msg` when `!on_msg_done`.
- Verification: rng-diff **15877→15983**; RNG 15985/16373 Scr 60;
  green+strict PASS; cohort 26/26 PASS.
- Next: @15983 dowatersnakes rn2(5) vs rn2(3) (D-0495).
