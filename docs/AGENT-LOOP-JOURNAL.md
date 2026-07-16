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
## 2026-07-16 — D-0490 DIAG (seed0007 @7142)
- Objective: primary D-0490 — missing `obj_resists` after box unlock.
- C locus: `dogmove.c` `dog_goal` invent / `dog_move` cand; `dog.c` `dogfood`.
- Falsified: permanent carrot-before-tripe invent order; geometry-only
  hero-cell box cand (matched `@7102` same pet@7,3 without +1). DIAG:
  invent stops on TRIPE; C wants +1 then `rn2(1)`; JS world identical
  at `@7102` vs `@7142` except `moves` 92→93. Probe +1 dogfood → 7175.
- Verification: green+strict PASS; no JS production change (DIAG removed).
- Next: C-only state for that +1 (invent/sack/cand object desync).
## 2026-07-16 13:47 — #545 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score-only; D-0490 left open).
- Change or falsified theory: none — documented suite aggregates.
- Verification: green+strict PASS; full suite **28/44** Scr **5054**/11405
  RNG **294730**/792838 (37.17%) speed `24+0.13/turn`. Δ vs #540:
  Scr +40, RNG +4921 (D-0488/89 absorbed). seed0007 still @7142.
- Next: D-0490 DIAG fourth C `obj_resists` (invent vs fobj dogfood).
## 2026-07-16 13:45 — D-0489 #loot box pick_lock
- Objective: seed0007 @7066 C picklock rn2(100) vs JS rn2(5) (D-0489).
- C locus: `pickup.c` do_loot_cont; `lock.c` pick_lock/picklock box arm.
- Change: do_loot_cont APPLY_KEY → pick_lock(container); picklock box
  occupation (4*DEX+25). Was: #loot locked stubbed; JS skipped rn2(100).
- Verification: rng-diff **7066→7142**; RNG **7309→7885**; Scr 60; green+
  strict; cohort 26 PASS.
- Next: @7142 C obj_resists rn2(100) vs JS dog_move rn2(1) (D-0490).
## 2026-07-16 13:38 — D-0488 mO doset + pickup_types
- Objective: seed0007 @6414 C eatcorpse rn2(20) vs JS rn2(7) (D-0488).
- C locus: `options.c` doset_simple→doset on menu_requested; `cmd.c`
  CMD_M_PREFIX on O; `pickup.c` autopick_testobj.
- Change: keep menu_requested for O; port doset PICK_ANY so session
  sets pickup_types=$"?!=/ (no food). Was: O cleared m-prefix → empty
  pickup_types → floor food auto-pickup → wrong eatcorpse.
- Verification: rng-diff **6414→7066**; green+strict; cohort PASS.
- Next: @7066 #loot box picklock (D-0489).
