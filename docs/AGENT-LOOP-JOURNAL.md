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

## YYYY-MM-DD HH:MM — <objective>
- Objective: …
- C locus: …
- Change or falsified theory: …
- Verification: …
- Next: …
```

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

## 2026-07-15 15:35 — #430 score + known_hitum int half (D-0404)
- Objective: mandatory full score (#430÷5) + seed0004 @216 PRIMARY.
- C locus: uhitm.c known_hitum mhp < mhpmax/2 (integer) + engulfing_u.
- Change: Math.trunc(mhpmax/2) + engulfing_u in known_hitum flee gate
  (float 1<1.5 falsely entered monflee rnd(100)).
- Verification: full sessions **25/44**; Scr **4187**/11405; RNG
  **260949**/792838; seed0004 Scr **215→233**; RNG **9213→9892**
  @9795; green+strict PASS; cohort 25/25.
- Next: @9795 dog_move rn2(16) vs rn2(4).

## 2026-07-15 15:32 — #429 heal_legs nh_timeout (D-0403)
- Objective: seed0004 @51 leg feels better / unencumbered (PRIMARY).
- C locus: timeout.c nh_timeout WOUNDED_LEGS; do.c heal_legs; allmain.c
  before regen_hp; objnam.c vtense bare singular.
- Change: timeout.js WOUNDED_LEGS expiry → heal_legs(0)+stop_occupation;
  trap.js heal_legs; allmain await nh_timeout; vtense conjugate.
- Verification: seed0004 @51 match; Scr **53→215**/409; RNG
  **5331→9213**/12084 @9183; green+strict PASS; cohort **25/25**.
- Next: @216 / RNG @9183 distfleeck rn2(5) vs JS rnd(100).

## 2026-07-15 15:27 — #428 Norep gp.prevmsg (D-0402)
- Objective: seed0004 @46 caught+wriggle same topline (PRIMARY).
- C locus: pline.c Norep/vpline vs gp.prevmsg; topl.c update_topl concat.
- Change: display.js `_prevmsg` + shared `Norep`; hack/do drop
  `_last_norep` cache (pony pline must clear suppress so escape Norep
  re-shows and concatenates wriggle).
- Verification: seed0004 @46 match; Scr **52→53**/409; RNG still @4394;
  green+strict PASS; cohort 23/23 PASS.
- Next: @51 heal_legs / nh_timeout WOUNDED_LEGS (DEX wipe_engr rn2).

## 2026-07-15 15:20 — #427 trapmove + Burdened botl (D-0401)
- Objective: seed0004 @29 caught-in-bear (PRIMARY).
- C locus: hack.c trapmove/domove; botl.c enc_stat; attrib.c exerper;
  trap.c mintrap rn2(40); dogmove.c defer newsym to postmov.
- Change: ported trapmove+wire; botl Burdened; exerper wounded/encumb;
  mintrap escape RNG; dog_move newsym→postmov only.
- Verification: seed0004 Scr **29→52**/409 (prefix ~46); RNG
  **4114→5331**/12084; green+strict PASS; cohort 23/23 PASS.
- Next: @46 caught+wriggle same topline; or RNG @4394 DEX rn2(67/64).

## 2026-07-15 15:10 — #426 encumber_msg wounded legs (D-0400)

- Objective: seed0004 @27 bear-trap `--More--` (hypothesized flush_topl).
- C locus: do.c set_wounded_legs → encumber_msg; hack.c weight_cap
  WT_WOUNDEDLEG_REDUCT; pickup.c encumber_msg; allmain preamble.
- Change: ported encumber_msg + wounded-leg carrcap; call from
  set_wounded_legs + moveloop_preamble. Falsified “flush alone” —
  second load pline drives more().
- Verification: seed0004 @27/@28 match; RNG 4087→4114; Scr 29/409
  (@29 caught-in-bear next); green+strict PASS; cohort 23/23 PASS.
- Next: seed0004 @29 `You are caught in a bear trap.`; or seed0002
  eatcorpse.

## 2026-07-15 15:05 — #425 score + look_here observe (D-0399)

- Objective: mandatory full score (#425÷5) + seed0004 @26 yellow gem.
- C locus: objnam.c xname_flags observe_object; invent.c look_here.
- Change: look_here observe_object before doname (pile gems).
- Verification: full sessions **25/44**, Scr **3983**/11405, RNG
  **255144**/792838, speed `21+0.12/turn`; seed0004 Scr 28→29;
  seed0002 Scr 50→54; green+strict PASS; cohort 9/9 PASS.
- Next: seed0004 @27 bear `--More--`; or seed0002 eatcorpse rnd(8).

