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
## 2026-07-16 14:45 — #550 public score + D-0493 diagnosis
- Objective: mandatory full `sessions` score (#550); seed0007 @15284 peel.
- C locus: `monmove.c` `dochug` want_move; `dogmove.c` `dog_move`.
- Change: docs only. Score **28/44** Scr **5054** RNG **302184** (38.11%)
  `25+0.13/turn`. D-0493: JS wanderer `rn2(4)` at nearby peaceful kitten;
  C early want_move short-circuit → `dog_move` `rn2(12)`. Peaceful-first
  falsified (@2837). Force `!nearby` → invent/goal `obj_resists` next.
- Verification: green+strict PASS; full suite 28/44; no js/ patch.
- Next: prove C early short-circuit (mflee/nearby); then invent/goal fobj.
## YYYY-MM-DD HH:MM — <objective>
- Objective: …
- C locus: …
- Change or falsified theory: …
- Verification: …
- Next: …
```
## 2026-07-16 14:48 — D-0493 set_move_cmd clears travel
- Objective: primary D-0493 — seed0007 @15284 wanderer rn2(4) vs dog_move.
- C locus: `cmd.c` `set_move_cmd` clears `travel`/`travel1` before run.
- Change: walk + capital/Ctrl run clear stale travel (after `_`). Was:
  `continue_run` findtravelpath rewrote H dx/dy SE onto pet → false
  nearby wanderer. Falsified: dog_move cnt; peaceful reorder; !nearby.
- Verification: rng-diff **15284→15877**; RNG 15898/16373 Scr 60;
  green+strict PASS; cohort 26/26 PASS.
- Next: @15877 Amulet_on rnd(98) vs distfleeck (D-0494).
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
  types → autopick jackal corpse → floorfood skipped eatcorpse.
- Verification: rng-diff **6414→7066**; Scr **20→60**/302; green+strict
  PASS; cohort 10 PASS.
- Next: @7066 C picklock rn2(100) (D-0489).
## 2026-07-16 13:25 — D-0487 picklock + doopen autounlock
- Objective: seed0007 @3219 picklock rn2(100) (D-0487).
- C locus: `lock.c` picklock/`pick_lock`/`doopen_indir` autounlock; `autokey`.
- Change: door LOCKED path ynq + `set_occupation(picklock)`; locked autoopen
  → APPLY_KEY autounlock; default `flags.autounlock`. Was: stub "no door" /
  deferred autounlock so JS stayed in distfleeck.
- Verification: rng-diff **3219→6414**; green+strict PASS; cohort 10 PASS.
  Scr still 20/302.
- Next: D-0488 @6414 `eatcorpse` rn2(20).
## 2026-07-16 13:20 — D-0485 dofire ready More + getdir MV_ANY
- Objective: seed0007 @2832 hero Y drift (D-0485).
- C locus: `cmd.c` getdir/`movecmd(MV_ANY)`; `dothrow.c` dofire; topline More.
- Change: `mark_topline_seen` after fire quiver ready; `dir_from_key` accepts
  capital run + Ctrl-rush like MV_ANY. Was: More ate `=/\r`, getdir saw `H`
  as invalid, help swallowed `Y`; bare `y` walked NW.
- Verification: rng-diff **2832→3219**; green+strict PASS; cohort 10 PASS.
  Scr still 20/302.
- Next: D-0487 @3219 `picklock` rn2(100).
## 2026-07-16 13:15 — #540 public score (mandatory ÷5)
- Objective: full `sessions` score cadence (#540).
- C locus: n/a (score-only; no port patch).
- Change or falsified theory: **28/44** PASS; Scr **5014**/11405;
  RNG **289809**/792838 (36.55%); speed `24+0.14/turn` (R² 0.75).
  Flat vs #535 (Scr/PASS/RNG unchanged). seed0007 still Scr 20/302
  @2832; seed2200 229/230 parked.
- Verification: green+strict PASS; full suite `__RESULTS_JSON__`.
- Next: D-0485 mid-`H` Y drift — `lookaround`/`continue_run`/pet-swap.
## 2026-07-16 13:10 — D-0485 C capture: !couldsee falsified; hero Y drift
- Objective: seed0007 @2832 dog_move `rn2(1)` (D-0485).
- C locus: recorder `dog_goal`/`dog_move`; symptom `hack.c` lookaround/run.
- Change or falsified theory: no production patch. C `sight=1`, gg=hero,
  hero `(36,18)` first cand j=0; JS `(36,17)` only j<0. Spawn both
  `(38,18)`. Force-gettrack was coincidence. Pivot to mid-`H` Y drift.
- Verification: green+strict PASS; rng-diff still @2832; DIAG removed.
- Next: `lookaround`/`continue_run`/pet-swap per-step mid-`H`.
## 2026-07-16 13:05 — D-0486 rogue_vision + D-0485 gettrack theory
- Objective: seed0007 @2832 dog_move `rn2(1)` (D-0485).
- C locus: `vision.c` `rogue_vision`/`vision_recalc`; `dogmove.c` `dog_goal` gettrack.
- Change: ported `rogue_vision` (D-0486). Falsified as peel cause (dlvl1,
  `Is_rogue` false). Force-gettrack → prefix **2846**; JS `couldsee(pet)`
  true in lit room — next is C `!couldsee` cause, not mux/coord hacks.
- Verification: green+strict PASS; cohort 9 PASS; seed0007 still @2832.
- Next: C capture `couldsee(pet)` / LOS at peel; keep D-0485 open.
## 2026-07-16 12:45 — D-0485 ux0/mux ALLOW_U omit path
- Objective: seed0007 @2832 dog_move `rn2(1)` vs JS `distfleeck` (D-0485).
- C locus: `mon.c` `mfndpos` ALLOW_U; `monmove.c` `set_apparxy`;
  `dogmove.c` `dog_move` ~1255.
- Change or falsified theory: no production patch. Omitted cell is
  `ux0` after `H`. `mfndpos` with `mux=ux0` drops it (`cnt=7`); JS
  already has `mux=hero` after `set_apparxy`. Do not ship ux0/coord
  skips. Falsified pool/mon/kicked again.
- Verification: green+strict PASS; rng-diff still @2832 after DIAG remove.
- Next: prove C pet `mux` at `mfndpos` (capture) or other silent omit.
