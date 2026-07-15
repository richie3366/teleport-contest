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

## 2026-07-15 16:50 — #437 seed0004 @10657 eatcorpse youmonst (D-0409)
- Objective: seed0004 @10657 PRIMARY — C `eatcorpse` `rn2(10)` vs JS
  `distfleeck` after lichen kill/`e`/`y`.
- C locus: `eat.c` `eatcorpse` palatable via `herbivorous(gy.youmonst.data)`.
- Change: `eat.js` `hero_form_data()` (`u.umonnum ?? urole.mnum`) so
  omnivore diet is true and palatable `rn2(10)` is not short-circuited
  when `set_uasmon`/youmonst unset.
- Verification: seed0004 RNG 10685→11027; prefix 10657→10713; miss
  @10713 `exercise` rn2(19) vs rn2(2); green+strict PASS; cohort 25/25.
- Next: seed0004 @10713 post-eat `exerper`/`lesshungry` polarity.

## 2026-07-15 16:39 — #436 seed0004 @10563 getpos `>` travel (D-0408)
- Objective: seed0004 @10563 PRIMARY — C `gethungry`/`hitum` vs JS
  `distfleeck` after post-teleport travel.
- C locus: `getpos.c` dungeon-feature scan for `>`/`<` stairs glyphs.
- Change: `getpos.js` two-pass `find_dungeon_feature` for STAIRS/LADDER
  so travel `_>` targets downstairs (was “already here” on hero tile).
- Verification: seed0004 RNG 10569→10685; prefix 10563→10657; miss
  @10657 `eatcorpse`; green+strict PASS; cohort 23/23.
- Next: seed0004 @10657 eatcorpse rn2(10) vs distfleeck.

## 2026-07-15 16:30 — #435 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score-only; no port patch).
- Change: remasured suite post D-0405…D-0407 — still **25/44** PASS;
  screens 4187→**4196**/11405; RNG 260949→**261626**/792838;
  speed `22+0.13/turn`. Green+strict PASS.
- Verification: `node frozen/ps_test_runner.mjs sessions`; seed0004
  focused still FAIL @10563 (C gethungry/hitum vs JS distfleeck).
- Next: seed0004 @10563 travel-end / walk-into-monster path.

## 2026-07-15 16:26 — #434 seed0004 @10382 SCR_TELEPORTATION (D-0407)
- Objective: seed0004 @10382 PRIMARY — C `exercise` `rn2(19)` vs JS
  `rn2(5)` (read teleport → `safe_teleds`).
- C locus: `read.c` `seffect_teleportation`/`learnscrolltyp`;
  `teleport.c` `scrolltele`/`safe_teleds`; invent getobj `?` pickinv.
- Change: getobj-read `?`/`*`; SCR_TELEPORTATION → scrolltele/safe_teleds;
  learnscroll → makeknown+XP; oc_magic exercise before seffects switch.
- Verification: seed0004 RNG 10409→10569; Scr 241→242; miss @10563;
  green+strict PASS; cohort 23/23.
- Next: seed0004 @10563 gethungry/hitum vs distfleeck (post-travel `l`).

## 2026-07-15 16:20 — #433 seed0004 @10370 Conflict / MENU_INVERT_ALL (D-0406)
- Objective: seed0004 @10370 PRIMARY — C `resist_conflict` `rnd(20)` vs
  JS `dog_move` `rn2(16)`.
- C locus: `wintty.c` MENU_INVERT_ALL; `mondata.c` `resist_conflict`;
  `dogmove.c` / `mon.c` `mon_allowflags`.
- Change: PICK_ANY `@`/`.`/`-`; `resist_conflict` + worn-ring
  `hero_conflict`; wire dog_move + mon_allowflags. Root was ignored `@`
  so conflict ring never picked up.
- Verification: seed0004 RNG 10399→10409; miss @10382; green+strict;
  cohort 23/23.
- Next: seed0004 @10382 exercise rn2(19) vs rn2(5) (teleport scroll).

## 2026-07-15 16:15 — #432 seed0004 @9795 run_timers ROT_CORPSE (D-0405)
- Objective: seed0004 @9795 PRIMARY — dog_goal IS_ROOM / post-pickup keys.
- C locus: timeout.c run_timers/start_timer; dig.c rot_corpse; pickup.c
  query_objlist sortloot(SORTLOOT_LOOT|PACK).
- Change: real timer queue + floor rot_corpse from nh_timeout; floor pickup
  uses shared sortloot. Unrotted mklev jackal corpse made `c`/`d` pick
  corpse+sack → HVY EOTs (not bare key ownership).
- Verification: seed0004 RNG 9892→10399 Scr 233→241; miss @10370; green+
  strict PASS; cohort 23/23.
- Next: seed0004 @10370 resist_conflict rnd(20) vs dog_move rn2(16).

## 2026-07-15 15:50 — #431 seed0004 @9795 dog_goal IS_ROOM (D-0405)
- Objective: seed0004 @9795 PRIMARY — C `dog_move` `rn2(16)` vs JS `rn2(4)`.
- C locus: dogmove.c dog_goal `!IS_ROOM || !rn2(4)` (~575); dog_move mtrack
  (~1250).
- Falsified: mtrack `MTSZ*(k-j)` arity. DIAG: JS hero stuck ROOM `(40,5)`
  rolls `rn2(4)`; C already DOOR/CORR after `n`/`n`/`l` skips it → mtrack
  `rn2(16)`. Post-2nd `,` pickup, rhack sees `n` only @9816 (mid-monster).
- Verification: green+strict PASS; no js/ change; seed0004 still @9795.
- Next: key ownership after pickup (steps 240–250) before dog_goal peel.

