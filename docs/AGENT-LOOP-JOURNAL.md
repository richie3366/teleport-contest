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
## YYYY-MM-DD HH:MM — <objective>
- Objective: …
- C locus: …
- Change or falsified theory: …
- Verification: …
- Next: …
```

## 2026-07-16 15:36 — D-0503 TIN known + otyp_uses_known
- Objective: seed0007 @150 Take-out `a tin` vs `a tin of lichen`
- C locus: `objnam.c` xname_flags TIN+known; `eat.c` tin_details;
  `mkobj.c` unknow_object; FOOD unk
- Change: gate tin_details on `obj.known`; TIN/EGG in
  `otyp_uses_known` so mksobj starts known=0 (D-0503)
- Verification: Scr **291→294**/302 RNG full; green+strict;
  cohort 26/26; @161 very burnt leather next
- Next: `add_erosion_words` oeroded/oeroded2 degrees

## 2026-07-16 15:31 — #560 score + D-0502 find_ac ARM_BONUS
- Objective: mandatory full `sessions` score (#560÷5); seed0007 @124 AC
- C locus: `do_wear.c` `find_ac` / `hack.h` `ARM_BONUS`
- Change: `js/u_init.js` `find_ac` — erosion via ARM_BONUS + rings/
  amulet/HProt/uspellprot; botl on change (D-0502)
- Verification: seed0007 Scr **126→291**/302 RNG full; green+strict;
  cohort 26/26; full suite **28/44** Scr **5285**/11405 RNG 303218
  (38.24%) speed `25+0.13/turn`
- Next: seed0007 @150 Take-out `a tin` vs `a tin of lichen` (D-0503)


## 2026-07-16 15:28 — D-0501 lootabc + take-out sort + gold bot()
- Objective: primary seed0007 screen peel @116 (`#loot` take-out;
  first cell miss was @111 lootabc letters).
- C locus: `pickup.c` `in_or_out_menu` / `menu_loot` / `query_objlist`
  / `out_container`; `invent.c` `sortloot` / `let_to_name`.
- Change: `js/pickup.js` — paint a/b/c/d/e when `flags.lootabc`;
  take-out INVORDER_SORT headings + `$`/letters; `await bot()` after
  gold remove (was botl flag only).
- Verification: Scr **116→126**/302; @111/@116 match; RNG full;
  green+strict; cohort **26/26** PASS.
- Next: @124 botl `AC:9` vs `AC:7` (D-0502).

## 2026-07-16 15:21 — D-0500 botl hu_stat hunger
- Objective: primary seed0007 screen peel @85 (Satiated botl).
- C locus: `botl.c` `do_statusline2` `u.uhs != NOT_HUNGRY` → `hu_stat[]`;
  `eat.c` `hu_stat`.
- Change: `js/display.js` `_statusLine2` — emit `HU_STAT` before
  `enc_stat` when `uhs !== NOT_HUNGRY` (field already SATIATED via D-0438).
- Verification: Scr **85→116**/302; @85 match; RNG full; green+strict;
  cohort **28/28** PASS.
- Next: @116 `#loot` take-out menu (D-0501).

## 2026-07-16 15:18 — D-0499 doset per-bool pline
- Objective: primary seed0007 screen peel @38 (showexp/time botl).
- C locus: `options.c` `optfn_boolean` one pline/bool + botl before
  pline; topline NEED_MORE append/`more`.
- Change: `js/options.js` `doset` — drop join-2 msgBuf; `await pline`
  per selected bool so showexp botl paints during price_quotes More
  before `time` applies.
- Verification: Scr **84→85**/302; @38 match; RNG full; green+strict
  PASS; cohort 26/26 PASS.
- Next: @85 botl `Satiated` / D-0500.

## 2026-07-16 15:14 — D-0498 doset fmt + bool defaults
- Objective: primary seed0007 screen peel (Scr 60 with full RNG).
- C locus: `options.c` `doset`/`doset_add_menu` `%-Ns [val]`;
  `optlist.h` On initvals; `optfn_boolean` showexp/time → botl.
- Change: `js/options.js` format_doset_opt_line + DOSET_BOOL_DEFAULT_ON
  + addr fixes; help 4-space indent; showexp/time set flags.botl.
  First miss was mO menu @20 (not post-combat newsym).
- Verification: Scr **60→84**/302; RNG full; green+strict PASS;
  cohort 26/26 PASS.
- Next: @38 showexp/time botl vs message order (D-0499).

## 2026-07-16 15:05 — #555 score + D-0497 mhitm_ad_drst
- Objective: mandatory #555 full score; primary D-0497 seed0007 @16346.
- C locus: `uhitm.c` `mhitm_ad_drst` (mhitu) — mgc gate before hitmsg.
- Change: port `mhitm_ad_drst_u` for AD_DRST/DRDX/DRCO; leather a_can=1
  negates poison arm after rn2(10)=1.
- Verification: rng-diff full **16373**/16373; Scr still 60/302;
  green+strict+cohort PASS; full **28/44** Scr 5054 RNG **303218**
  (38.24%) `26+0.14/turn` (Δ vs #550 RNG +1034).
- Next: seed0007 screen peel (D-0498).

## 2026-07-16 15:00 — D-0496 postmov hides_under / hideunder
- Objective: primary D-0496 — seed0007 @16339 distfleeck vs rnd(20).
- C locus: `monmove.c` `postmov` hides_under/`S_EEL` `rn2(5)` →
  `hideunder` (`mon.c`); `can_hide_under_obj`.
- Change: `js/monmove.js` — gate + mundetected hideunder subset
  (water moccasins are M1_CONCEAL after D-0495 snakes).
- Verification: rng-diff **16339→16346**; seed0007 RNG **16355**/16373
  Scr 60; green+strict PASS; cohort 28/28 PASS.
- Next: @16346 `mhitm_mgc_atk_negated` rn2(10) vs rn2(3) (D-0497).

## 2026-07-16 14:55 — D-0495 dowatersnakes rn1(5,2)
- Objective: primary D-0495 — seed0007 @15983 dryup rn2(3) vs snakes.
- C locus: `fountain.c` `dowatersnakes` — `rn1(5,2)` then makemon
  water moccasins; drink case 22 / dip case 23.
- Change: port `dowatersnakes` in `js/fountain.js`; wire drink 22 + dip 23.
  Hallucination `rndmonnam` deferred.
- Verification: rng-diff **15983→16339**; RNG 16344/16373 Scr 60;
  green+strict PASS; cohort 28/28 PASS.
- Next: @16339 distfleeck rn2(5) vs rnd(20) (D-0496).

## 2026-07-16 14:52 — D-0494 Amulet_on RESTFUL_SLEEP rnd(98)
- Objective: primary D-0494 — seed0007 @15877 Amulet_on vs distfleeck.
- C locus: `do_wear.c` `Amulet_on` AMULET_OF_RESTFUL_SLEEP → `rnd(98)+2`
  into `HSleepy` TIMEOUT.
- Change: port RESTFUL_SLEEP arm in `js/do_wear.js` (was deferred with
  change/strangle/flying). Still `on_msg` when `!on_msg_done`.
- Verification: rng-diff **15877→15983**; RNG 15985/16373 Scr 60;
  green+strict PASS; cohort 26/26 PASS.
- Next: @15983 dowatersnakes rn2(5) vs rn2(3) (D-0495).
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
## 2026-07-16 14:32 — D-0492 eye_of_newt_buzz via cpostfx
- Objective: primary D-0492 — seed0007 @13259 rn2(3) vs rn2(100).
- C locus: `eat.c` done_eating → cpostfx → eye_of_newt_buzz.
- Change: port eye_of_newt_buzz; thin cpostfx for AT_MAGC||PM_NEWT;
  call from done_eating on CORPSE. Was: cpostfx deferred entirely.
- Verification: rng-diff **13259→15284**; RNG 15339/16373; Scr 60;
  green+strict PASS; cohort 28/28 PASS.
- Next: @15284 dog_move rn2(12) vs rn2(4) (D-0493).
## 2026-07-16 14:28 — D-0491 SCR_DESTROY_ARMOR / destroy_arm
- Objective: primary D-0491 — seed0007 @7175 exercise vs rn2(5).
- C locus: `read.c` seffects/seffect_destroy_armor; `do_wear.c`
  destroy_arm/some_armor; `trap.c` erode_obj.
- Change: port uncursed destroy-armor → destroy_arm + erode_obj burn;
  wire doread. Was: scroll unimplemented → no turn → distfleeck at
  C's exercise index. umovement theory falsified (umov=12 at EOT).
- Verification: rng-diff **7175→13259**; RNG ~13657/16373; Scr 60;
  green+strict PASS; cohort 10 PASS.
- Next: @13259 eye_of_newt_buzz (D-0492).
## 2026-07-16 14:16 — D-0490 #loot MENU_FULL take-out
- Objective: primary D-0490 — seed0007 @7142 missing obj_resists.
- C locus: `pickup.c` use_container/menu_loot/query_category/out_container;
  `dogmove.c` dog_goal invent dogfood.
- Change: MENU_FULL take-out (skip single-class category); `@` invert;
  accept lootabc `a`→take-out; gold `$` enters invent before TRIPE.
  Was: invent stop after 7 dogfoods; C burned +1 on looted gold.
- Verification: rng-diff **7142→7175**; Scr 60; green+strict PASS;
  cohort seed0004/0012/0013/0006/0002 + 22 PASS held.
- Next: @7175 exercise rn2(19) / destroy_arm (D-0491).
