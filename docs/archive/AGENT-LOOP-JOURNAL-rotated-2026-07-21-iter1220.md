# Agent loop journal archive (rotated @#1220)

## 2026-07-21 22:33 — #1210 score + D-0942 pay_for_damage

- Objective: cadence full `sessions` (@#1210 % 5 == 0); map-driven
  retire `pay_for_damage`/`getcad`/`hot_pursuit` debt.
- C locus: `shk.c` `pay_for_damage`/`getcad`/`hot_pursuit`;
  `hack.c` `still_chewing`; `dig.c` `zap_dig`; `mon.c` `wakeup`.
- Change: port pursuit/bill cluster; wire chew/`zap_dig`/wakeup
  (D-0942). Score refresh **44**/44 Scr **11405**/11405 RNG **100%**
  speed `31+0.26/turn`.
- Verification: green+strict PASS; shop/zap cohort 12/12; full
  `sessions` **44**/44 post-port.
- Next: cpostfx specials; eatspecial PAPER/potion/ring; other
  `pay_for_damage` call sites / pickaxe `is_digging`. Cadence @#1215.

## 2026-07-21 22:30 — #1209 D-0941 still_chewing shop/watch_dig

- Objective: map-driven — retire `still_chewing` shop/`watch_dig` debt.
- C locus: `hack.c` `still_chewing`; `dig.c` `watch_dig`; `mon.c`
  `angry_guards`; `shk.c` `add_damage`; `monmove.c` `watch_on_duty`.
- Change: port `add_damage`/`watch_dig`/`angry_guards`; wire chew,
  `zap_dig`, `mdig_tunnel`, `watch_on_duty` (D-0941).
- Verification: green+strict PASS; dig/role cohort 12/12.
- Next: `pay_for_damage`/`getcad`/`hot_pursuit`; cpostfx; eatspecial
  PAPER/potion/ring. Cadence full `sessions` @#1210.

## 2026-07-21 22:25 — #1208 D-0940 costly_tin + use_tin_opener

- Objective: map-driven — retire tin shop bill + apply tin-opener debt.
- C locus: `eat.c` `costly_tin`/`use_tin_opener`; `mkobj.c`
  `bill_dummy_object`/`costly_alteration`; `shk.c` subfrombill/alter_cost;
  `apply.c` TIN_OPENER.
- Change: port shop alteration helpers; wire `costly_tin` COST_OPEN/
  DSTROY; `use_tin_opener` + apply case (D-0940).
- Verification: green+strict PASS; eat/role cohort 12/12.
- Next: `still_chewing` shop/`watch_dig`; cpostfx specials; or other
  `debt.md` row. Cadence full `sessions` @#1210.

## 2026-07-21 22:20 — #1207 D-0939 cprefx + cannibal/stone/slime

- Objective: map-driven — retire full `cprefx` debt cluster.
- C locus: `eat.c` `cprefx`/`maybe_cannibal`/`fix_petrification`;
  `mondata.h` petrify/slime macros; `mondata.c` `same_race`;
  `were.c` `were_beastie`; `potion.c` `make_stoned`/`make_slimed`;
  `end.c` `delayed_killer`.
- Change: port helpers + `cprefx`; wire `start_eating` (D-0939).
- Verification: green+strict PASS; eat/role cohort 12/12.
- Next: `costly_tin`+`use_tin_opener` / still_chewing shop/`watch_dig`;
  or other `debt.md` row. Cadence full `sessions` @#1210.

## 2026-07-21 22:10 — #1206 D-0938 b_trapped + make_stunned

- Objective: map-driven — retire tin/door/chew/kick `b_trapped` debt.
- C locus: `trap.c` `b_trapped`; `potion.c` `make_stunned`; callers in
  `eat.c`/`hack.c`/`lock.c`/`dokick.c`.
- Change: port `b_trapped` + `make_stunned`; wire consume_tin,
  still_chewing SDOOR/door, picklock/doopen, kick_door (D-0938).
- Verification: green+strict PASS; eat/kick cohort 12/12.
- Next: `cprefx` / `costly_tin`+`use_tin_opener` / still_chewing shop
  polish; or other `debt.md` row. Cadence full `sessions` @#1210.
