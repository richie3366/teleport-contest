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

## 2026-07-15 14:25 — #420 score + bag put-in MENU_FULL (D-0394)
- Objective: mandatory full `sessions` score (#420÷5); seed0012 @259 bag
  empty prompt.
- C locus: pickup.c use_container outmaybe/yname; query_category MENU_FULL;
  invent.c addinv pickup_prev; objnam.c yname / shk_your.
- Change: outmaybe+carried yname; MENU_FULL put-in categories; pickup_prev
  + reset_justpicked; INVORDER class-heading ATR_INVERSE.
- Verification: full sessions **24/44**, Scr **3953**/11405,
  RNG **255082**/792838, `21+0.12/turn`; seed0012 **275→283**/308;
  green+strict PASS; cohort smoke PASS.
- Next: seed0012 @278 doname `containing N item`.

## 2026-07-15 14:15 — #419 teleds materialize + gold botl (D-0393)
- Objective: seed0012 @237 C materialize `--More--` vs JS blank / $:7.
- C locus: teleport.c teleds TELEDS_TELEPORT+verbose You + spoteffects;
  pickup.c pickup_object disp.botl before gold prinv.
- Change: async teleds/vault_tele materialize pline + spoteffects;
  gold flags.botl so flush paints $:307 before deferred more().
- Verification: seed0012 Scr **268→275**/308; @237–258 match; first fail
  @259 bag prompt; green+strict PASS; cohort 24/24 PASS.
- Next: seed0012 @259 empty-bag apply prompt order.

## 2026-07-15 14:08 — #418 stop_occupation counted Ns (D-0392)
- Objective: seed0012 @226 C `You stop searching.` vs JS blank.
- C locus: allmain.c stop_occupation + occupation monster_nearby;
  monmove.c dochugw; cmd.c set_occupation(dosearch,"searching").
- Change: ported stop_occupation; timed set_occupation for counted `s`;
  dochugw + occupation-path interrupt (was deferred / `_repeat_search`).
- Verification: seed0012 Scr **259→268**/308; @226–234 match; first fail
  @237 materialize `--More--`; green+strict PASS; cohort 22/22 PASS.
- Next: seed0012 @237 teleport/materialize pline.

## 2026-07-15 14:05 — #417 parse/get_count digit clear (D-0391)
- Objective: seed0012 @221 dust topline blank after `9` of `9s`.
- C locus: cmd.c parse/get_count; clear_nhwindow(WIN_MESSAGE) once after
  command key (not between digits).
- Change: falsified wipeout/`read_engr_at` — engraving already matched
  @220; JS rhack cleared pending on every key. Ported get_count +
  clear_nhwindow_message.
- Verification: seed0012 Scr **257→259**/308; @220–222 match; first fail
  @226 `You stop searching.`; green+strict PASS; cohort 24/24 PASS.
- Next: seed0012 @226 counted-search stop pline / continue_search.

## 2026-07-15 13:48 — #416 getpos auto_describe TER_DETECT (D-0390)
- Objective: seed0012 @140 tip stuck vs C `unexplored area`.
- C locus: getpos.c auto_describe/getpos msg_given; pager.c lookat;
  do_name.c x_monnam isshk→shkname via distant_monnam.
- Change: getpos auto_describe on display glyphs (blank/mimic/mon);
  distant_monnam_none shopkeeper shkname.
- Verification: seed0012 Scr **244→257**/308; @140–153 match; first fail
  @221 dust engraving; green+strict PASS; cohort 24/24 PASS.
- Next: seed0012 @221 `read_engr_at` wipeout garbled dust text.
