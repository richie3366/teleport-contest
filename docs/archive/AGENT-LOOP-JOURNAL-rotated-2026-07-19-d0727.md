# Rotated from AGENT-LOOP-JOURNAL.md (#808 / D-0727)

## 2026-07-19 01:52 — #792 D-0711 cream pie + D-0712 #wipe
- Objective: seed0108 @2807 use_cream_pie (CURRENT primary).
- C locus: `apply.c` `use_cream_pie`; `do.c` `dowipe`/`wipeoff`.
- Change: port cream-pie apply (`rnd(25)` blindinc); EXT_CMDS `#wipe`+
  wipeoff occupation (glop-off → `make_blinded(0,TRUE)`). D-0711/12 fixed.
- Verification: green+strict PASS; seed0108 **2807→2864**; cohort 14/14
  prior PASS stay PASS.
- Next: @2864 C `exercise` `rn2(2)` vs JS `rn2(7)` (#polyself); or D-0708.

## 2026-07-19 01:59 — #793 D-0713 #polyself / polymon
- Objective: seed0108 @2864 exercise/polyself (CURRENT primary).
- C locus: `wizcmds.c` `wiz_polyself`; `polyself.c` `polyself`/`polymon`.
- Change: EXT_CMDS `#polyself`; new `js/polyself.js` controlled getlin→
  polymon (exercise, sex rn2(10), mtimedone, mhmax, sliparm). D-0713 fixed.
- Verification: green+strict PASS; seed0108 **2864→2881**; cohort 33/33 PASS.
- Next: @2881 pet `obj_resists` short; or D-0708.
