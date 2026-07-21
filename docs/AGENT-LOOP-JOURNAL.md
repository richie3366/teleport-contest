# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. When this file exceeds ~15 entries,
move older ones into `docs/archive/`.

Use this shape:

```text
## YYYY-MM-DD HH:MM — #NNNN short title

- Objective: …
- C locus: …
- Change: …
- Verification: …
- Next: …
```

## 2026-07-21 22:59 — #1216 D-0948 zap_over_floor shop door/bars

- Objective: map-driven — retire `zap_over_floor` closed-door/SDOOR/
  IRONBARS shopdamage + `dobuzz` `pay_for_damage`.
- C locus: `zap.c` `zap_over_floor`/`dobuzz`; `lock.c` `picking_at`.
- Change: door destroy by damgtype, bars dissolve + shop bill, SDOOR
  reveal, trailing pay strings (D-0948). Deferred: ice/fountain/WEB/
  POOL→PIT; burn_floor_objects; explode/apply pay; pickaxe dig.
- Verification: green+strict; zap/shop cohort 12/12; seed0116/0398/
  0108 PASS. Suite fortress held (no full cadence; next @#1220).
- Next: explode/apply break-wand pay / dig occupation `is_digging`.

## 2026-07-21 22:56 — #1215 cadence score + D-0947 kick_door shop/watch

- Objective: cadence full `sessions` @#1215 + map-driven
  `kick_door` shop/`pay_for_damage` + town watch.
- C locus: `dokick.c` `kick_door`/`watchman_thief_arrest`/
  `watchman_door_damage`; `shk.c` `add_damage`/`pay_for_damage`.
- Change: wire shopdoor `in_rooms` + bill + town arrest/warn (D-0947).
  Deferred: Blind feel_location; mon_yells polish; explode/apply/
  dig-occupation pay sites; pickaxe `is_digging`.
- Verification: full sessions **44**/44 Scr **11405**/11405 RNG
  **100%** speed `31+0.29/turn`; green+strict; kick/shop cohort 12/12.
- Next: explode/apply `pay_for_damage` / `is_digging`. Cadence @#1220.

## 2026-07-21 22:55 — #1214 D-0946 eatspecial PAPER/potion/ring

- Objective: map-driven — retire `eatspecial` PAPER/potion/ring/amulet
  + leash/trident/flint/`uwepgone`/`unpunish`.
- C locus: `eat.c` `eatspecial`/`eataccessory`/`bounded_increase`;
  `wield.c` uwepgone*; `read.c` `unpunish`; `apply.c` `o_unleash`.
- Change: port remaining `eatspecial` body + `eataccessory`; wire
  helpers (D-0946). Deferred: vault_gd; Ring_gone sink; float_up;
  rescham; choke(strangle); set_mimic_blocking.
- Verification: green+strict PASS; eat/role cohort 12/12.
- Next: dig `pay_for_damage` sites / pickaxe `is_digging`. Cadence
  @#1215.

## 2026-07-21 22:47 — #1213 D-0945 cpostfx were/mimic/attrcurse

- Objective: map-driven — retire remaining `cpostfx` were*/mimic/`attrcurse`.
- C locus: `eat.c` `cpostfx`/`eatmdone`; `were.c` `set_ulycn`; `sit.c` `attrcurse`.
- Change: port `set_ulycn`/`attrcurse`/`eatmdone`; wire were*/mimic/
  disenchanter in `cpostfx` (D-0945). Deferred: `retouch_equipment`,
  `set_mimic_blocking`, eatspecial PAPER+.
- Verification: green+strict PASS; eat/role cohort 12/12.
- Next: eatspecial PAPER/potion/ring; dig `pay_for_damage` sites /
  pickaxe `is_digging`. Cadence @#1215.

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

## 2026-07-21 22:00 — #1205 score + D-0937 still_chewing

- Objective: cadence full `sessions` @#1205; map-driven metallivore
  beartrap/bars/`still_chewing` cluster.
- C locus: `eat.c` `floorfood`/`doeat` hands_obj; `hack.c`
  `still_chewing`; `monmove.c` `dissolve_bars`.
- Change: floorfood beartrap+IRONBARS; doeat hands_obj; still_chewing
  + dissolve_bars (D-0937). Score **44**/44 Scr **11405** RNG **100%**
  speed `32+0.27/turn`.
- Verification: green+strict; eat cohort; full `sessions` post-fix.
- Next: `cprefx` / `costly_tin`+`use_tin_opener` / still_chewing shop
  polish; or other `debt.md` row.

## 2026-07-21 21:55 — #1204 D-0936 is_edible + doeat_nonfood

- Objective: map-driven — retire `debt.md` eat.js metallivore non-food.
- C locus: `eat.c` `is_edible`/`doeat_nonfood`/`eatspecial`/`foodword`/
  floorfood gold; `objclass.h` metallic/organic; `invent.c` `g_at`.
- Change: poly diet `is_edible`; non-food meal path; floor gold yn;
  export `g_at`/`is_metallic`/`is_organic` (D-0936).
- Verification: green+strict PASS; eat cohort 8/8.
- Next: beartrap/bars/`still_chewing` or `cprefx`/`costly_tin`; hold
  fortress. Cadence full `sessions` @#1205.

