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

## 2026-07-21 00:09 — #1071 D-0920 TROUBLE_HIT fix_worst_trouble
- Objective: seed4500 @61689 C `fix_worst_trouble` `rnd(5)` vs
  JS `rn2(1000)` after matched `pleased` `rnl(2)`.
- C locus: `pray.c` `critically_low_hp` / `in_trouble` /
  `fix_worst_trouble` TROUBLE_HIT / `pleased` action switch.
- Change: port critically_low_hp + TROUBLE_HIT detect/fix; wire
  pleased `min(action,5)` cases. Root: stubbed in_trouble→0 skipped
  HIT `rnd(5)` uhpmax boost.
- Verification: prefix **61689→61698** RNG **61837** Scr **654**;
  green+strict PASS; cohort 15/15 PASS.
- Next: @61698 C nhlib.lua shuffle `rn2(3)` vs JS `rn2(79)`.

## 2026-07-20 00:05 — #1070 D-0919 FAST TIMEOUT + score
- Objective: cadence score + seed4500 @61462 C distfleeck rn2(5) vs
  JS rn2(1000) (prayer_done rnz early).
- C locus: `timeout.c` `nh_timeout` `case FAST`; `youprop.h` Very_fast.
- Change: decrement HFast TIMEOUT; You_feel slow-down when !Very_fast.
  Root: sticky Very_fast → free umove → skip post-descend EOT → early #pray.
- Verification: full suite **42/44** Scr **10233**/11405 RNG **94.13%**;
  prefix **61462→61689** RNG **61766** Scr **643**; green+strict;
  cohort 15/15.
- Next: @61689 C `fix_worst_trouble` rnd(5) vs JS rn2(1000).

## 2026-07-20 23:57 — #1069 D-0918 drag_down / ballrelease
- Objective: seed4500 @55990 C `drag_down` rn2(2) vs JS rn2(50).
- C locus: `ball.c` `drag_down`/`ballrelease`/`litter`; `do.c`
  `goto_level` descend; `youprop.h` Punished≡(uball!=0).
- Change: port drag_down/ballrelease/litter; wire stair-fall when
  `u.uball` (not sticky `u.Punished`). Named omit: litter hitfloor/
  yname/Soundeffect; ballfall.
- Verification: prefix **55990→61462** RNG **61496** Scr **622**;
  green+strict PASS; cohort 13/13 PASS + strict lengths.
- Next: @61462 C `distfleeck` rn2(5) vs JS rn2(1000); cadence @#1070.

## 2026-07-20 23:51 — #1068 D-0917 fill_ordinary_room subroom recursion
- Objective: seed4500 @54329 C somex rn2(2) vs JS rn2(12).
- C locus: `mklev.c` `fill_ordinary_room` nsubrooms loop before needfill.
- Change: recurse `fill_ordinary_room(subroom, false)` then needfill gate
  (Nesting mid/inner fill before outer). Named omit: Fake Delphi/Huge/
  Mausoleum/Twin nested bodies; `u.uhave.amulet` arm of sleeping-mon gate.
- Verification: prefix **54329→55990** RNG **57748** Scr **613**;
  green+strict PASS; cohort 13/13 PASS + strict lengths.
- Next: @55990 C `drag_down` rn2(2) vs JS rn2(50); cadence @#1070.

## 2026-07-20 23:50 — #1067 D-0916 Nesting nested + lspo_door rnddoor
- Objective: seed4500 @52803 C themerms/nhlib rn2(5) vs JS rn2(1000).
- C locus: `themerms.lua` Nesting contents; `nhlib.lua` math.random;
  `sp_lev.c` create_subroom / lspo_door / rnddoor / create_door.
- Change: `themeroom_nesting_contents` mid+inner subrooms/doors;
  `splev_room_door` burns rnddoor() when state=random (mask stays -1).
  Named omit: Fake Delphi/Huge/Mausoleum/Twin nested; Random-feature
  center terrain.
- Verification: prefix **52803→54329** RNG **54647** Scr **613**;
  green+strict PASS; cohort 13/13 PASS + strict lengths.
- Next: @54329 C somex rn2(2) vs JS rn2(12); cadence @#1070.

## 2026-07-20 23:45 — #1066 D-0915 goto_level unplacebc/placebc
- Objective: seed4500 @52643 C distfleeck rn2(5) vs JS move_special rn2(1).
- C locus: `do.c` `goto_level`; `ball.c` `unplacebc`/`placebc`.
- Change: Punished `unplacebc` before savelev + `placebc` after arrival.
  Stranded ball caused false drag `cause_delay` aborting travel → shk
  `onlineu` polarity (not a shk FORCE). Named omit: Blind glyph;
  maybe_unhide_at; waterlevel swallow; obj_delivery.
- Verification: prefix **52643→52803** RNG **52925** Scr **611**;
  green+strict PASS; cohort 10/10 PASS.
- Next: @52803 themerms/nhlib rn2(5) vs rn2(1000); cadence @#1070.

## 2026-07-20 23:38 — #1065 public score cadence
- Objective: mandatory full `sessions` @#1065; diagnose seed4500 @52643.
- C locus: `shk.c` `shk_move` satdoor/`onlineu` → `move_special` mill.
- Change: no port patch. Score refresh. DIAG: JS shk@home(65,6)
  hero(65,17) `onlineu` → `appr=0` `rn2(1)`; C next `distfleeck`
  ⇒ C `!onlineu` (hero-path desync; do not FORCE shk). Same class as
  D-0376 polarity flip.
- Verification: suite **42/44** Scr **10198**/11405 RNG
  **737530**/792838 (93.02%) `33+0.25/turn`; green+strict PASS;
  seed4500 still prefix **52643** RNG **52967** Scr **608**.
- Next: find when JS hero left C's line vs shk; leaderboard cron;
  cadence @#1070.

## 2026-07-20 23:32 — #1064 D-0914 mk_knox_portal place (wizard)
- Objective: seed4500 @50844 C `mkshop` `rnd(100)` vs JS `rn2(7)`
- C locus: `mklev.c` `mk_knox_portal`; `dungeon.c` `insert_branch`
- Change: under `playmode:debug`/`wizard`, C still burns `rn2(3)` but
  does not defer — depth-eligible vaults assign Ludios `end1` +
  `place_branch`. JS stub burned RNG then left portal floating, so
  later vaults re-burned `rn2(3)` and shifted shop gate. Named omit:
  non-debug deferral already matched; portal dest polish.
- Verification: prefix **50844→52643** RNG **52967** Scr **608**;
  green+strict PASS; cohort 10/10 PASS.
- Next: @52643 C `distfleeck` `rn2(5)` vs JS `rn2(1)`.

## 2026-07-20 23:18 — #1063 D-0913 `x`/doswapweapon
- Objective: seed4500 @50338 C `distfleeck` `rn2(5)` vs JS `rn2(3)`
- C locus: `cmd.c` `'x'`→`doswapweapon`; `worn.c` `setworn` twoweap clear
- Change: wire `rhack` `'x'`; `setuwep`/`setuswapwep` clear twoweap;
  ready_weapon are/can_no_longer. Named omit: cantwield ridiculous; #swap.
- Verification: prefix **50338→50844** RNG **50936** Scr **594**;
  green+strict PASS; cohort 5/5 PASS (seed4500 still FAIL later).
- Next: @50844 C `mkshop` `rnd(100)` vs JS `rn2(7)`.

## 2026-07-20 23:03 — #1062 D-0912 #turn / doturn
- Objective: seed4500 @50290 C `exercise` `rn2(19)` vs JS `mcalcmove`
- C locus: `pray.c` `doturn` / `maybe_turn_mon_iter`; `cmd.c` `"turn"`
- Change: port Knight/Cleric `#turn` (chant + `exercise(A_WIS)` + undead
  iter + `nomul`); wire EXT_CMDS. Named omit: SPE_TURN_UNDEAD fallback;
  Hallu `halu_gname` RNG; resist TELL pline.
- Verification: prefix **50290→50338** RNG **50401** Scr **594**;
  green+strict PASS; cohort 6/6 PASS.
- Next: @50338 C `distfleeck` `rn2(5)` vs JS `rn2(3)`.

## 2026-07-20 22:56 — #1061 D-0911 extract ox/oy + rotten + HDeaf
- Objective: seed4500 @50111 C `next_ident`/`doeat` vs JS `mcalcmove`
- C locus: `mkobj.c` `obj_extract_self`; `eat.c` `rottenfood`/`Hear_again`;
  `timeout.c` DEAF case
- Change: keep ox/oy after extract (was false drag cause_delay); wire
  ordinary rotten + Hear_again; nh_timeout HDeaf decrement. Named omit:
  TIN/multi-turn non-corpse; make_deaf talk; Blinded/… timeouts.
- Verification: prefix **50111→50290** RNG **50469** Scr **499→596**;
  green+strict PASS; cohort 6/6 PASS
- Next: @50290 exercise rn2(19); leaderboard cron; cadence @#1065

## 2026-07-20 22:45 — #1060 score + D-0910 regen_pw
- Objective: cadence full `sessions` + seed4500 @50054 regen_pw
- C locus: `allmain.c` `regen_pw` + moveloop once-per-turn call
- Change: port regen_pw (period/Energy_regeneration/EMagical_breathing
  + rn1); wire after regen_hp. Named omit: Teleport/Poly EOT arms.
- Verification: prefix **50054→50111** RNG **50220→50240** Scr **499**;
  green+strict PASS; cohort 6/6; suite **42/44** Scr **10089**/11405
  RNG **734803**/792838 (92.68%) `31+0.23/turn`
- Next: @50111 next_ident rnd(2); cadence @#1065

## 2026-07-20 22:36 — D-0909 Punished drag_ball/move_bc
- Objective: seed4500 @50034 C mattacku rnd(20) vs JS rn2(20)
- C locus: ball.c drag_ball/move_bc; hack.c domove Punished arms
- Change: symptom was adjacency drift after punish — port drag_ball +
  sighted move_bc; wire cause_delay→nomul(-2) in domove
- Verification: prefix 50034→50054 RNG 50167→50220 Scr 499;
  green+strict PASS; cohort 6/6 PASS
- Next: @50054 regen_pw rn2(2); cadence @#1060

## 2026-07-20 22:25 — D-0908 SCR_PUNISHMENT punish/placebc
- Objective: seed4500 @49915 C mkobj rnd(1000) vs JS rn2(19)
- C locus: read.c seffect_punishment/punish; ball.c placebc; worn setworn
- Change: port SCR_PUNISHMENT → punish (mkobj CHAIN/BALL + setworn +
  placebc); mksobj where=OBJ_FREE; js/ball.js placebc
- Verification: prefix 49915→50034 Scr 481→499 RNG 50071→50167;
  green+strict PASS; cohort 4/4 PASS
- Next: @50034 mattacku rnd(20) vs rn2(20); cadence @#1060

## 2026-07-20 22:20 — #1057 D-0907 study learn + makeknown
- Objective: seed4500 @49776 C `mcalcmove` `rn2(12)` vs JS `rnd(20)`
  after matched study_book.
- C locus: `spell.c` `study_book`/`learn`; `o_init.c` `makeknown`.
- Change: `set_occupation(learn)` so Very_fast leftover umovement
  cannot start a second `doread` before EOT; learn finish uses
  `makeknown` (credit_hero WIS exercise). Named omit: lenses /
  confused_book / deadbook / novel / dull / check_unpaid.
- Verification: seed4500 prefix **49776→49915** Scr **459→481**
  RNG **49921→50071**; green+strict PASS; cohort 4/4 PASS.
- Next: @49915 C `mkobj` `rnd(1000)` vs JS `rn2(19)`; leaderboard
  cron; cadence @#1060.
