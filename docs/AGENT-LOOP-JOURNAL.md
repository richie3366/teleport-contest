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

## 2026-07-15 14:58 — #424 trapeffect_bear_trap (D-0398)
- Objective: seed0004 first RNG miss @4013 bear trap.
- C locus: trap.c trapeffect_bear_trap / floor_trigger / set_utrap;
  do.c set_wounded_legs.
- Change: ported hero+monster bear trap; wired selector; aligned
  floor_trigger (BEAR/LANDMINE/SLP/RUST/FIRE); set_utrap +
  set_wounded_legs helpers.
- Verification: seed0004 RNG **4025→4087**/12084; Scr 28/409 (first
  miss @26 yellow gem); green+strict PASS; cohort 6/6 PASS; full
  suite still **25/44**.
- Next: seed0004 @26 `a yellow gem` vs `a gem`; or RNG @4039 dochug.

## 2026-07-15 14:52 — #423 gd_move_cleanup Suddenly (D-0397)
- Objective: seed0012 @307 Suddenly, the guard disappears.--More--.
- C locus: vault.c gd_move_cleanup/parkguard; gd_move !u_in_vault
  look-around; do_name.c noit_mon_nam.
- Change: parkguard + gd_move_cleanup; look-around → gddone cleanup;
  early/begone → cleanup; flush_topl_more after Suddenly pline.
- Verification: seed0012 Scr **307→308**/308 PASS; green+strict PASS;
  cohort **25/25** PASS. Score **25/44**.
- Next: seed0004 / seed0002 shared blockers.

## 2026-07-15 14:40 — #422 drop gold botl + Move along! (D-0396)
- Objective: seed0012 screens after @284 (NOTES said @294 Move along!).
- C locus: invent.c freeinv_core COIN_CLASS botl; vault.c gd_move
  um_dist verbalize Move along!; monmove awaits gd_move.
- Change: do.js freeinv_drop gold `_goldCount`+flags.botl; vault.js
  async gd_move + await verbalize; monmove/shk await. Named omission:
  gd_move_cleanup Suddenly disappears.
- Verification: seed0012 Scr **284→307**/308; @307 sole miss Suddenly;
  green+strict PASS; cohort **22/22** PASS.
- Next: vault.c gd_move_cleanup / Suddenly, the guard disappears.

## 2026-07-15 14:32 — #421 doname containing + cknown (D-0395)
- Objective: seed0012 @278 bag `containing 1 item`.
- C locus: objnam.c doname_base containing; invent.c count_contents;
  pickup.c use_container containerdone cknown when used.
- Change: doname suffix; invent count_contents (shoppy deferred);
  use_container sets cknown after successful put-in/loot.
- Verification: seed0012 Scr **283→284**/308; @278 match; green+strict
  PASS; cohort PASS. Next fail @294 `"Move along!"`.
- Next: vault guard escort pline after gold drop.
