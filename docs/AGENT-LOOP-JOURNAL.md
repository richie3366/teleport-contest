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

## 2026-07-20 21:28 — #1051 D-0901 Pillars terr shuffle
- Objective: seed4500 @8925 nhlib shuffle rn2(7) vs JS rn2(5).
- C locus: `themerms.lua` Pillars; `nhlib.lua` shuffle; `sp_lev.c`
  `lspo_terrain`/`create_room`.
- Change: port Pillars contents — shuffle 7-char terr + 2×2 terrain
  blocks. Named omit: Random-feature center; nested room bodies.
- Verification: seed4500 prefix **8925→9974** Scr **284**; green+strict;
  cohort 11/11 PASS.
- Next: seed4500 @9974 shkveg rnd(860); leaderboard cron; cadence @#1055.

## 2026-07-20 21:25 — #1050 D-0900 spitmm + score cadence
- Objective: mandatory full `sessions` score @#1050; seed4500 @8491.
- C locus: `mthrowu.c` `spitmm`/`spitmu`/`m_lined_up`; `mhitu.c` AT_SPIT.
- Change: port spit venom path + wire `mattacku`; score refresh.
  Named omit: mon-mon `mattackm` AT_SPIT; breamm/breamu.
- Verification: full suite **42/44** Scr **9874**/11405 RNG
  **694676**/792838 (87.62%) `32+0.24/turn`; seed4500 prefix
  **8491→8925** Scr **264→284**; green+strict; cohort 7/7.
- Next: seed4500 @8925 nhlib shuffle; leaderboard cron; cadence @#1055.

## 2026-07-20 21:20 — #1049 D-0899 #jump dojump/jump
- Objective: seed4500 knight coverage (prefix 2869 mfndpos arity).
- C locus: `apply.c` `dojump`/`jump`/`is_valid_jump_pos`/`check_jump`;
  `dothrow.c` `walk_path`; `getpos.c` getvalid.
- Change: port physical `#jump` + knight chess dist; walk_path;
  getpos_getvalid `(invalid target)`. Named omit: SPE_JUMPING;
  hurtle_step; S_goodpos hilite glyphs; steed/trap-escape.
- Verification: green+strict PASS; cohort 7/7; seed4500 prefix
  **2869→8491** Scr **19→264**.
- Next: seed4500 @8491 `next_ident` vs `rn2(12)`; leaderboard cron;
  cadence @#1050.

## 2026-07-20 21:10 — #1048 D-0897/D-0898 seed2600 PASS
- Objective: seed2600 BIND=`v:inventory` / remaining screens.
- C locus: `options.c` `parsebindings`/`txt2key`; `cmd.c` bind overlay;
  `u_init.c` `ini_inv_use_obj` → `setworn` armor.
- Change: BIND→`Cmd.binds`+rhack inventory (D-0897); armor `setworn`
  confers Antimagic (D-0898). Named omit: full cmdbinds; SYMBOLS=;
  weapon setuwep path; other bind targets.
- Verification: green+strict PASS; cohort 12/12; seed2600 **PASS**;
  suite **42/44** Scr **9609**/11405 RNG **687602**/792838 (86.73%).
- Next: seed4500 knight coverage; leaderboard cron; cadence @#1050.

## 2026-07-20 21:05 — #1047 D-0896 bigrm-9 load_special
- Objective: seed2600 @2917 nhlib shuffle (makemaz after getbones).
- C locus: `dat/bigrm-9.lua` via `mkmaze.c` `makemaz` → `load_special`;
  nhlib shuffle; eye map + pupil lit rings; noflip.
- Change: `load_bigrm_9` + dispatch (D-0896). Named omit: other bigrm-N;
  BIND=`v:inventory`.
- Verification: green+strict PASS; cohort 6/6; seed2600 RNG **FULL
  11647** Scr **23→35**; suite **41/44** Scr **9606**/11405 RNG
  **687602**/792838 (86.73%).
- Next: seed2600 BIND= / remaining 3 screens; seed4500; cadence @#1050.

## 2026-07-20 20:59 — #1046 D-0895 Temple of the gods fill
- Objective: seed2600 first blocker (not BIND yet — gen @395).
- C locus: `themerms.lua` Temple of the gods; `sp_lev.c` create_altar /
  get_free_room_loc; themes nhlib shuffle → `splev_align`.
- Change: `themeroom_fill_temple_of_the_gods` + store themes align
  (D-0895). Named omit: Ice/Trap/Garden/Massacre/Statuary/…; BIND=.
- Verification: green+strict PASS; cohort 5/5; seed2600 RNG **395→2917**
  Scr **3→23** (runner 2929/23).
- Next: seed2600 @2917 nhlib shuffle on special-level load; BIND later;
  seed4500; leaderboard cron; cadence @#1050.

## 2026-07-20 20:54 — #1045 score + D-0894 dryup town warn
- Objective: cadence full `sessions` + seed0014 @712 watchman vs dryup.
- C locus: `fountain.c` `dryup` / `watchman_warn_fountain`.
- Change: town first-use SET_FOUNTAIN_WARNED + watchman yell + return
  without drying (D-0894). Named omit: angry_guards; Deaf shake; wizard yn.
- Verification: green+strict PASS; cohort 35/35; seed0014 **PASS 714/714**;
  full suite **41/44** Scr **9574**/11405 RNG **676373**/792838 (85.31%)
  `33+0.23/turn`.
- Next: leaderboard cron; seed2600/4500 coverage; seed2200 parked @158.

## 2026-07-20 20:50 — #1044 D-0893 setgemprobs ledger_no
- Objective: seed0014 @631 black vs orange gem in look_here pile.
- C locus: `o_init.c` `setgemprobs` via `ledger_no`/`maxledgerno`.
- Change: stop forcing lev=0; Mines minefill gem weights match C.
- Verification: green+strict PASS; cohort 17/17; seed0014 Scr **678→712**.
- Next: @712 watchman yell vs fountain dries up.

## 2026-07-20 20:45 — #1043 D-0892 do_attack unweapon bash
- Objective: seed0014 @624 bare-hands begin-bashing topline.
- C locus: `uhitm.c` `do_attack` `gu.unweapon` verbose pline.
- Change: clear `game.gu.unweapon` + emit bash/strike bare|gloved msg.
- Verification: green+strict PASS; cohort 17/17; seed0014 Scr **676→678**.
- Next: @631 C `a black gem` vs JS `an orange gem`.

## 2026-07-20 20:40 — #1042 D-0891 maketrap HOLE unhideable_trap
- Objective: seed0014 @600 trap `^` vs floor `·` (68,16).
- C locus: `trap.h` `unhideable_trap`; `trap.c` `maketrap` tseen init.
- Change: `unhideable_trap` + `maketrap` `tseen = unhideable_trap(typ)`
  (HOLE always seen).
- Verification: green+strict PASS; cohort 13/13; seed0014 Scr **645→676**.
- Next: @624 bare-hands bash topline vs plain miss/hit.

## 2026-07-20 20:32 — #1041 D-0890 launch_obj FLASH + pline vision
- Objective: seed0014 @560 trap-trigger map (boulder + LOS).
- C locus: `trap.c` `launch_obj` tmp_at DISP_FLASH; `pline.c` dirty
  `vision_recalc` before flush.
- Change: FLASH roll loop + delaycnt=2; pline runs vision_recalc when
  `vision_full_recalc` (boulder extract unblock).
- Verification: green+strict PASS; cohort 6/6; seed0014 Scr **644→645**.
- Next: @600 JS `·` vs C `^` trap glyph (68,16).

