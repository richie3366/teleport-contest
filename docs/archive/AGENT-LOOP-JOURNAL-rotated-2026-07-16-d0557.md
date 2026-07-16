# Rotated from AGENT-LOOP-JOURNAL.md (#618 / D-0557)

## 2026-07-16 19:31 — #603 D-0543 soko1-2 load_special
- Objective: peel seed0373 @22651 C nhlib `shuffle` `rn2(3)` vs JS
  `rn2(79)` after matched `makemaz` `rnd(2)=2`.
- C locus: `dat/soko1-2.lua`; `sp_lev.c` `load_special`; `mkmaze.c`
  `makemaz`.
- Change: `js/mklev.js` `load_soko1_2` + dispatch (map, traps,
  mimics, zoo, percent(25) reward, flip).
- Verification: rng-diff **22651→24531**; runner RNG **24545**/35386
  Scr 22/124; green+strict; cohort 28/28.
- Next: makemon rn2(5) @24531; or dosounds @8468.
