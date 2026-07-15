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

## 2026-07-15 19:30 — #451 RING xname descr (D-0420)
- Objective: seed0004 @277 PRIMARY — C `an engagement ring` vs JS
  `a ring of conflict` (look_here).
- C locus: `objnam.c` `xname_flags` RING_CLASS (`nn` / `dn`).
- Change: `objnam.js` `pretty_base` RING — `oc_name_known` only
  (not `obj.known`); dknown+!nn → `<descr> ring`.
- Verification: seed0004 Scr **382→389**/409; miss @277→@285; RNG
  full; green+strict; cohort **25/25**.
- Next: seed0004 @285 `choose_ring_hand` yn `[rl]` via C
  `yn_function`/`rightleftchars`.

## 2026-07-15 19:20 — #450 score + map_trap tseen (D-0419)
- Objective: mandatory full `sessions` (#450÷5); seed0004 @248 PRIMARY —
  C trap `^` vs JS floor.
- C locus: `display.c` `map_trap` / `_map_location`; `defsym.h` trap
  PCHARs; `display.h` `covers_traps`.
- Change: `display.js` `trap_glyph` + `map_trap` wired into
  `map_location`/`newsym` when `tseen && !covers_traps`. Hallu trap
  glyphs deferred.
- Verification: full score **25/44** Scr **4336**/11405 RNG
  **263155**/792838 `22+0.13/turn`; seed0004 Scr **254→382**/409
  (miss @248→@277); green+strict; cohort **25/25**.
- Next: seed0004 @277 look_here `an engagement ring` vs
  `a ring of conflict`.

## 2026-07-15 19:12 — #449 seed0004 @240 WEAPON poisoned xname (D-0418)
- Objective: seed0004 @240 PRIMARY — C `a - 10 darts` /
  `b - a poisoned dart` vs JS `a - a dart` / `b - 10 darts`.
- C locus: `objnam.c` xname WEAPON poisoned; doname_base strip;
  `invent.c` loot_xname → sortloot.
- Change: `objnam.js` `is_poisonable_obj` + `poisoned ` in
  pretty_base; doname strip/reinsert before erosion/spe.
- Verification: seed0004 Scr **245→254**/409; miss @240→@248; RNG
  full; green+strict PASS; cohort **25/25**.
- Next: seed0004 @248 trap `^` vs `.`.

## 2026-07-15 19:04 — #448 seed0004 @239 Ysimple_name2 emptymsg (D-0417)
- Objective: seed0004 @239 PRIMARY — C `The bag is empty.` vs JS
  `the bag is empty.`
- C locus: `pickup.c` `use_container` emptymsg/`pline1`;
  `objnam.c` `Ysimple_name2`.
- Change: `pickup.js` `simpleonames`/`ysimple_name`/`Ysimple_name2`;
  preformat emptymsg when `!outokay`; loot-out empty uses it.
- Verification: seed0004 Scr **244→245**/409; miss @239→@240; RNG
  full; green+strict PASS; cohort **23/23**.
- Next: seed0004 @240 floor pickup `10 darts` vs `a dart`.

## 2026-07-15 18:58 — #447 seed0004 @182 cursemsg canseemon (D-0416)
- Objective: seed0004 screen-only PRIMARY — first cell miss after full RNG.
- C locus: `dogmove.c` `dog_move` cursemsg `(wasseen || canseemon)`;
  `display.h` `_canseemon`.
- Change: replace always-true local `canseemon` stub in `dogmove.js`
  with `display.canseemon` (LOS + mon_visible). Out-of-sight cursed
  pet step no longer plines.
- Verification: seed0004 Scr **243→244**/409; miss @182→@239; RNG
  full; green+strict PASS; cohort **23/23**.
- Next: seed0004 @239 `The bag is empty.` vs `the bag is empty.`
  (`Ysimple_name2` / upstart).

## 2026-07-15 18:50 — #446 seed0004 throw carrot feed (D-0415)
- Objective: seed0004 @11722 PRIMARY — C `next_ident` vs JS `distfleeck`.
- C locus: dothrow.c thitmonst befriend; dog.c tamedog mtame+obj;
  dogmove.c dog_eat; mondata.h befriend_with_obj.
- Change: getobj_throw `*` pickinv; throwit mon-hit food→tamedog;
  tamedog already-tame dogfood/dog_eat (before mtame<10 bump).
- Verification: seed0004 RNG **12084**/12084; Scr **243**/409;
  green+strict PASS; cohort **25/25**.
- Next: seed0004 screen-only peel (cells 243/409).

## 2026-07-15 18:34 — #445 score + dog ALLOW_U mattacku (D-0414)
- Objective: mandatory full `sessions` score (#445÷5); seed0004 @11708
  PRIMARY — C `mattacku` vs JS `distfleeck`.
- C locus: `dogmove.c` newdogpos `ALLOW_U`→`mattacku`; not bare dochug.
- Change: `dogmove.js` chosen-candidate `ALLOW_U` attacks hero then
  `MMOVE_DONE` (leash-break pline stub; full `m_unleash` deferred).
- Verification: full score **25/44** Scr **4194**/11405 RNG
  **262860**/792838 `21+0.13/turn`; seed0004 prefix **11708→11722**
  (RNG 11790); green+strict; cohort **25/25**.
- Next: seed0004 @11722 `next_ident` vs `distfleeck`.

## 2026-07-15 18:30 — #444 seed0004 Conflict fightm (D-0413)
- Objective: seed0004 @11568 PRIMARY — C `resist_conflict` vs JS
  `distfleeck` mid-travel.
- C locus: `mon.c` `movemon_singlemon` Conflict→`fightm`; `mhitm.c`
  `fightm`; `monmove.c` `dochug` `hero_conflict` + PHASE FOUR.
- Change: port `fightm` (always `resist_conflict`); wire before
  `dochugw`; dochug uses `hero_conflict` + peaceful P4 resist.
- Verification: seed0004 prefix **11568→11708** (RNG 11774); green+strict
  PASS; cohort **25/25**.
- Next: seed0004 @11708 `mattacku` vs `distfleeck`.

## 2026-07-15 18:20 — #443 seed0004 findtravelpath (D-0412)
- Objective: seed0004 @10966 PRIMARY — C `distfleeck` vs JS `dopush`.
- C locus: `hack.c` `findtravelpath` / `test_move(TEST_TRAV)` boulder delay.
- Change: falsified after_calc/leftover theory (DIAG 9→21 UNENC). Root:
  hero→dest BFS walked onto boulder. Ported dest→hero BFS + `dirs_ord`
  + boulder-node skip + `TRAVP_GUESS` fallback in `cmd.js`.
- Verification: seed0004 prefix **10966→11568** (RNG 11662); green+strict
  PASS; cohort **25/25**.
- Next: seed0004 @11568 `resist_conflict` vs `distfleeck`.

## 2026-07-15 18:05 — #442 seed0004 @10966 after_calc diag (D-0412)
- Objective: seed0004 @10966 PRIMARY — C `distfleeck` vs JS `dopush`.
- C locus: `allmain.c` `u_calc_moveamt` / EOT; `hack.c` near_capacity.
- Change: diagnosis only (DIAG/FORCE removed). Invent @miss: inv=-15
  owt≡live; force after=9|leftover0+SLT|before=-3+UNENC→10979. Heal
  frame 51 double-EOT syncs 9→21 both sides — leftover0-alone falsified
  as sole cause. C second gethungry @10977 proves after<12 at miss EOT.
- Verification: green+strict PASS; seed0004 still @10966.
- Next: before=9⇒need EXT/mmove anomaly, or post-heal leftover→0 + ≥16
  aum SLT gap (BoH factor wrong direction).

## 2026-07-15 17:45 — #441 seed0004 @10966 after_calc diag (D-0412)
- Objective: seed0004 @10966 PRIMARY — C `distfleeck` vs JS `dopush`.
- C locus: `allmain.c` `u_calc_moveamt` / EOT; `hack.c` near_capacity.
- Change: diagnosis only (DIAG removed). Reconfirmed force leftover0+SLT
  / after=9 →10979; SLT|leftover0 alone no. JS sticky 9→21 UNENC since
  heal; inv=-15; !usteed. Silent 0→12 vs 9→21 possible under UNENC.
- Verification: green+strict PASS; seed0004 still @10966.
- Next: ≥16 aum inv/cap gap at miss; or how C leftover →0 after heal.

## 2026-07-15 17:30 — #440 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score-only; no port patch).
- Change: remasured suite post D-0408…D-0411 — still **25/44** PASS;
  screens **4196**/11405 (unchanged); RNG 261626→**262087**/792838;
  speed `21+0.13/turn` (R² 0.82). Green+strict PASS.
- Verification: `node frozen/ps_test_runner.mjs sessions`; seed0004
  still FAIL @10966 (RNG 11029/12084, Scr 242/409); seed0002 RNG 5199.
- Next: seed0004 @10966 after_calc<12 (weight/leftover+SLT|EXT).

## 2026-07-15 17:15 — #439 seed0004 @10966 youmonst/moveloop (D-0411)
- Objective: seed0004 @10966 PRIMARY — C `distfleeck` vs JS `dopush`
  exercise; umovement after_calc.
- C locus: `u_init.c` umonnum/set_uasmon basic; `allmain.c` encumber_msg
  + mvl_wtcap after monsters.
- Change: basic `youmonst.data`; moveloop order. Experiments: need
  after_calc<12 (leftover0+SLT or leftover9+EXT); inv=-15 barely under.
- Verification: seed0004 still @10966; green+strict PASS; cohort 23/23.
- Next: ≥16 aum weight/cap gap or heal leftover desync + SLT.

## 2026-07-15 17:00 — #438 seed0004 @10713 gethungry (D-0410)
- Objective: seed0004 @10713 PRIMARY — C `exercise` `rn2(19)` vs JS
  `rn2(2)` after lichen eat EOT.
- C locus: `eat.c` `gethungry` metabolic `uhunger--` + accessorytime
  odd/even Regen/encumb/Hunger/Conflict.
- Change: `eat.js` `gethungry` diet via `hero_form_data`; accessory
  burns; `monsters.js` `metallivorous`. Ring/amulet + `newuhs` deferred.
- Verification: seed0004 RNG 11027→11029; prefix 10713→10966; miss
  @10966 C `distfleeck` vs JS `dopush` exercise (umove=21); green+strict
  PASS; cohort 25/25.
- Next: seed0004 @10966 umovement / encumbrance drift.
