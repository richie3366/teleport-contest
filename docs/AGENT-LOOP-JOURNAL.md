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

## 2026-07-20 20:16 — #1040 score + D-0889 peaceful swap x_monnam
- Objective: cadence full `sessions` + seed0014 @558 peaceful gnome.
- C locus: `hack.c` `domove_swap_with_pet` `x_monnam(...,"peaceful")`.
- Change: swap pline uses full `x_monnam` article/adj/frighten; export
  `type_is_pname`. Score @#1040: **40/44** Scr **9504**/11405 RNG
  **676373**/792838 (85.31%) `32+0.23/turn`.
- Verification: green+strict PASS; cohort 9/9; seed0014 Scr **641→644**.
- Next: @560 trap-trigger map/glyph (topline already matches).

## 2026-07-20 20:10 — #1039 D-0888 cream pie The(xname)
- Objective: seed0014 @505 `The cream pie splashes…` vs JS `Cream pie…`.
- C locus: `uhitm.c` hmon CREAM_PIE `The(xname)` / `An(singular)`.
- Change: export `The`/`An` from `objnam.js`; wire cream-pie splash
  (was capitalize-only `xname`).
- Verification: green+strict PASS; cohort 7/7 PASS; seed0014 Scr
  **640→641**/714 (RNG FULL); @505 matches.
- Next: @558 C `You swap places with the peaceful gnome.` vs JS bare
  `… with the gnome.`.

## 2026-07-20 20:05 — #1038 D-0887 could_seduce hitmm/missmm
- Objective: seed0014 @457 nymph smiles/engagingly vs JS hits (SSEX).
- C locus: `mhitu.c` `could_seduce`; `mhitm.c` `hitmm`/`missmm`;
  `mhitu.c` `hitmsg`/`missmu`/`wildmiss`.
- Change: port `could_seduce` + wire mon-vs-mon smile/pretend and
  mhitu seduce hit/miss/wildmiss arms (pet fight @457–458).
- Verification: green+strict PASS; cohort 15/15 PASS; seed0014 Scr
  **638→640**/714 (RNG FULL).
- Next: @505 C `The cream pie splashes…` vs JS `Cream pie…`.

## 2026-07-20 19:53 — #1037 D-0886 rloc appear + flee RLOC_MSG
- Objective: seed0014 @424 fountain dryup missing `--More--`.
- C locus: `monmove.c` `dochug` flee `rloc(RLOC_MSG)`; `teleport.c`
  `rloc_to_core` post-place appear/close-by.
- Change: await `rloc(mtmp, RLOC_MSG)` in flee-teleport; port appear
  pline after `rloc_to` (nymph appear forces more on fountain topline).
- Verification: green+strict PASS; cohort 8/8 PASS; seed0014 Scr
  **636→638**/714 (RNG FULL).
- Next: @457 C nymph smiles/engagingly vs JS hits (SSEX).

## 2026-07-20 19:45 — #1036 D-0883…D-0885 take-off AC + nymph flee
- Objective: seed0014 @415 botl AC after shield take-off; @416–417 steal.
- C locus: `do_wear.c` `armoroff` (no find_ac); `steal.c`
  `worn_item_removal`/`steal` named++; `teleport.c` RLOC_MSG vanish;
  `uhitm.c` `mhitm_ad_sedu` `rloc(..., RLOC_MSG)`.
- Change: drop delay-0 armoroff find_ac; on→from + She stole; async
  rloc vanish + mhitu/monmove await RLOC_MSG.
- Verification: green+strict PASS; cohort 8/8 PASS; seed0014 Scr
  **633→636**/714 (RNG FULL).
- Next: @424 fountain “dries up!” missing `--More--`.

## 2026-07-20 19:40 — #1035 score + D-0882 merged coin bknown
- Objective: mandatory public score @#1035; restore seed0007 regression.
- C locus: `invent.c` `merged` — coin `bknown=0` before ID reconcile.
- Change: reorder `addinv` merge to match C (D-0882). First cadence
  measure was 39/44 (D-0879 order bug); after fix **40/44**.
- Verification: green+strict PASS; seed0007 PASS; seed0014 Scr 633/714;
  full suite Scr **9493**/11405 RNG **676373**/792838 (85.31%);
  speed `32+0.23/turn`.
- Next: seed0014 @415 take-off botl AC:10 vs AC:14; nymph @416–417.

## 2026-07-20 19:35 — #1034 D-0881 short_oname dip yn
- Objective: seed0014 @388 C `Dip a -4 orcish helm` vs JS cursed thoroughly rusty.
- C locus: `objnam.c` `short_oname`; `potion.c` `dodip` formats via
  `short_oname(doname, thesimpleoname, QBUFSZ-sizeof getobj dip)`.
- Change: port `short_oname` (+simpleonames/thesimpleoname); `dodip`
  uses it. Thoroughly rusty tips past lenlimit→strip BUC/erosion for
  display only. Named omit: other short_oname callers; pair_of them;
  pool/sink dip prompts.
- Verification: green+strict PASS; cohort 11/12 (seed0007 pre-existing
  FAIL); seed0014 Scr **624→633** (RNG FULL); @388/@393 fixed.
- Next: @415 botl AC:10 vs AC:14 after take-off shield; nymph steal
  wording @416–417.
