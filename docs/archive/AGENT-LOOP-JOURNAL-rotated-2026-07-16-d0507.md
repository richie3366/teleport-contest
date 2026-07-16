## 2026-07-16 14:48 — D-0493 set_move_cmd clears travel
- Objective: primary D-0493 — seed0007 @15284 wanderer rn2(4) vs dog_move.
- C locus: `cmd.c` `set_move_cmd` clears `travel`/`travel1` before run.
- Change: walk + capital/Ctrl run clear stale travel (after `_`). Was:
  `continue_run` findtravelpath rewrote H dx/dy SE onto pet → false
  nearby wanderer. Falsified: dog_move cnt; peaceful reorder; !nearby.
- Verification: rng-diff **15284→15877**; RNG 15898/16373 Scr 60;
  green+strict PASS; cohort 26/26 PASS.
- Next: @15877 Amulet_on rnd(98) vs distfleeck (D-0494).
## 2026-07-16 14:45 — #550 public score + D-0493 diagnosis
- Objective: mandatory full `sessions` score (#550); seed0007 @15284 peel.
- C locus: `monmove.c` `dochug` want_move; `dogmove.c` `dog_move`.
- Change: docs only. Score **28/44** Scr **5054** RNG **302184** (38.11%)
  `25+0.13/turn`. D-0493: JS wanderer `rn2(4)` at nearby peaceful kitten;
  C early want_move short-circuit → `dog_move` `rn2(12)`. Peaceful-first
  falsified (@2837). Force `!nearby` → invent/goal `obj_resists` next.
- Verification: green+strict PASS; full suite 28/44; no js/ patch.
- Next: prove C early short-circuit (mflee/nearby); then invent/goal fobj.
