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
## 2026-07-20 22:05 — #1056 D-0906 hellfill + create_maze
- Objective: seed4500 @32538 C nhlib shuffle `rn2(3)` vs JS `rn2(79)`
  after matched getbones (hellfill.lua / create_maze).
- C locus: `dat/hellfill.lua`; `mkmaze.c` `create_maze`; `sp_lev.c`
  `LVLINIT_MAZE`/`lspo_gold`; `mklev.c` mktrap Inhell FIRE bias.
- Change: port `create_maze`+`LVLINIT_MAZE`; `load_hellfill` 7 styles +
  populatemaze (ROCK_CLASS, gold `rnd(200)`, Inhell traps, LLL→Z).
  Named omit: rnd_hell_prefab; Invocation_lev VS; makemaz(""); fakewiz.
- Verification: green+strict PASS; cohort 10/10; seed4500 prefix
  **32538→49776** Scr **308→459** RNG **49921**/108275.
- Next: @49776 C `mcalcmove` `rn2(12)` vs JS `rnd(20)`; leaderboard
  cron; cadence @#1060.
## 2026-07-20 21:53 — #1055 score + D-0905 Erinys peace_minded
- Objective: cadence full `sessions` @#1055; seed4500 @28249
  C `makemon` sleep `rn2(5)` vs JS `rn2(26)`.
- C locus: `makemon.c` `peace_minded` PM_ERINYS → `!u.ualign.abuse`.
- Change: port Erinys arm (was falling through to co-align
  `rn2(16+record)`). Named omit: MS_LEADER/GUARDIAN/NEMESIS msound.
  Score @#1055: **42/44** Scr **9898**/11405 RNG **717155**/792838
  (90.45%) `33+0.23/turn`.
- Verification: green+strict PASS; cohort 12/12; seed4500 prefix
  **28249→32538** Scr **302→308** RNG **28364→32592**.
- Next: @32538 nhlib shuffle rn2(3) vs rn2(79); leaderboard cron;
  cadence @#1060.
## 2026-07-20 21:50 — #1054 D-0904 level_tele find_hell
- Objective: seed4500 @18153 C `splev_initlev` `rn2(2)` vs JS `rn2(4)`
  after matched getbones + nhlib shuffle.
- C locus: `teleport.c` `level_tele` past-main arm; `dungeon.c`
  `find_hell`.
- Change: ^V “30” was clamping to castle via `get_level`; port
  `find_hell`→valley when past last main depth. Named omit:
  Quest/mines/sanctum deepest clamp; invoked gate.
- Verification: seed4500 prefix **18153→28249** Scr **302** RNG
  **18215→28364**; green+strict PASS; cohort 12/12 PASS.
- Next: @28249 C `makemon` `rn2(5)` vs JS `rn2(26)`; leaderboard cron;
  cadence @#1055.
## 2026-07-20 21:39 — #1053 D-0903 fill_zoo BEEHIVE
- Objective: seed4500 @14216 C `next_ident` vs JS `rn2(3)` after
  matched `fill_ordinary_room` `rn2(5)`.
- C locus: `mkroom.c` `fill_zoo` BEEHIVE center queen/killer + jelly.
- Change: typed `PM_QUEEN_BEE`/`PM_KILLER_BEE` + center +
  `LUMP_OF_ROYAL_JELLY` `rn2(3)` (was `makemon(NULL)`/`rndmonst`).
  Named omit: ANTHOLE antholemon+food; COCKNEST statue loot.
- Verification: seed4500 prefix **14216→18153** Scr **294→302** RNG
  **14271→18215**; green+strict PASS; cohort 11/11 PASS.
- Next: @18153 C `splev_initlev` `rn2(2)` vs JS `rn2(4)` after
  getbones + nhlib shuffle; cadence @#1055.
## 2026-07-20 21:33 — #1052 D-0902 shkveg / mkveggy_at
- Objective: seed4500 @9974 C `shkveg` `rnd(860)` vs JS FOOD `rnd(1000)`.
- C locus: `shknam.c` `veggy_item`/`shkveg`/`mkveggy_at`/`mkshobj_at`;
  `eat.c` `set_tin_variety(HEALTHY_TIN)`.
- Change: port type-only veggy pick + HEALTHY_TIN follow-up; wire
  `VEGETARIAN_CLASS` in `mkshobj_at`. Named omit: Izchak; wizard
  SHOPTYPE; veggy_item obj-path.
- Verification: seed4500 prefix **9974→14216** Scr **284→294** RNG
  **10113→14271**; green+strict; cohort 11/11 PASS.
- Next: seed4500 @14216 next_ident vs rn2(3); leaderboard cron;
  cadence @#1055.
