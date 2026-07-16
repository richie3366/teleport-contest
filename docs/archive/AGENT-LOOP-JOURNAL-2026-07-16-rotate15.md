# Rotated from AGENT-LOOP-JOURNAL.md

## 2026-07-16 19:40 — #605 score + D-0545 worm-seg MON_AT
- Objective: mandatory 5-iter score; peel seed0373 @25654 C
  `fill_zoo` `rn2(100)` vs JS `rn2(3)`.
- C locus: `makemon.c` `MON_AT`; `rm.h` `place_worm_seg`;
  `mkroom.c` `fill_zoo` gold after null makemon.
- Change: `makemon` MON_AT consults `worm_mon_at` (D-0544 segs).
- Verification: full `sessions` **30/44** Scr **5900**/11405 RNG
  **344063**/792838 (43.40%) `30+0.15/turn`; rng-diff
  **25654→25869**; runner RNG **25885**; green+strict; cohort 30/30.
- Next: m_initinv S_MUMMY `rn2(7)` @25869; or dosounds @8468.

## 2026-07-16 19:36 — #604 D-0544 LONG_WORM initworm
- Objective: peel seed0373 @24531 C `makemon` `rn2(5)` vs JS `rn2(50)`.
- C locus: `makemon.c` LONG_WORM; `worm.c` get_wormno/initworm/
  place_worm_tail_randomly.
- Change: new `js/worm.js` creation path + `_level_monsters`;
  makemon LONG_WORM arm; m_at sees segs; clear_wormdata on level clear.
- Verification: rng-diff **24531→25654**; runner RNG **25657**/35386
  Scr 22/124; green+strict; cohort 28/28; seed0116 RNG full.
- Next: fill_zoo rn2(100) @25654; or dosounds @8468.
