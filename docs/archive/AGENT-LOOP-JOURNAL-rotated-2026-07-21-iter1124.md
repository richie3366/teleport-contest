## 2026-07-21 05:25 — #1110 cadence + minliquid eel monflee
- Objective: cadence full `sessions` + seed4500 @101710 postmov vs rn2(8).
- C locus: `mon.c` `minliquid_core` → `monflee(mtmp,2,FALSE,FALSE)`.
- Change: `mon.js` `minliquid` await `monflee` (was inline flee bits
  without `mon_track_clear`). Stale track forced JS `rn2(8)` track
  avoid while C hid in `postmov`.
- Verification: prefix **101710→103071** (runner RNG **103190** Scr
  **928**); green+strict PASS; cohort 5/5; full suite **42/44** Scr
  **10518** RNG **787753** (99.36%) speed `29+0.25/turn`.
- Next: @**103071** C `rn2(3) @ select_newcham_form` vs JS `rn2(330)`.
