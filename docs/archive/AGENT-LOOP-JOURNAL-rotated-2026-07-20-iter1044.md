## 2026-07-20 19:00 — #1029 D-0877 dipfountain bath
- Objective: seed0014 @59074 C `exercise` `rn2(2)` vs JS `rn2(3)`.
- C locus: `fountain.c` dipfountain case 28; `steal.c` `somegold`;
  `attrib.c` `exercise` abuse `-rn2(2)`.
- Change: port `somegold` + cases 26–28 (bath/gold/`exercise`); case 29
  mkgold deferred. Named omit Excalibur/wash_hands/uncurse 17–20.
- Verification: green+strict PASS; seed0014 RNG **FULL 59178**, Scr
  620/714; suite **40/44** Scr 9480 RNG 676373 (85.31%).
- Next: seed0014 screen peel @620; leaderboard cron.
## 2026-07-20 18:52 — #1028 D-0876 watch_on_duty
- Objective: seed0014 @58462 C `watch_on_duty` `rn2(3)` vs JS `rn2(10)`.
- C locus: `monmove.c` `watch_on_duty`/`dochug`; `hack.c` `in_town`;
  `mkmaze.c` `fixup_special` `has_town`.
- Change: port `is_watch`+`watch_on_duty`+`in_town`+`picking_lock`; set
  `has_town` for town specials. Named omit mon_yells/angry_guards/
  is_digging/watch_dig/mind_blast body.
- Verification: green+strict PASS; seed0014 **58462→59074**; cohort
  38/38 PASS.
- Next: @59074 C `exercise` `rn2(2)` vs JS `rn2(3)` after dipfountain;
  leaderboard cron.

