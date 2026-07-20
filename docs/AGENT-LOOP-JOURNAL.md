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

## 2026-07-20 19:22 — #1033 D-0880 yn_function hard-wrap
- Objective: seed0014 screen@383 yn cursor `[1,1]` vs JS `[80,0]`.
- C locus: `topl.c` `tty_yn_function` → `show_topl`/`topl_putsym`
  hard-wrap at CO-1 (SUPPRESS_HISTORY path).
- Change: `yn_function` paints via `topl_wrap_echo`; cursor at wrap
  end; restore unwrapped prompt on toplines after flush.
- Verification: green+strict PASS; cohort 12/12 PASS; seed0014 Scr
  **623→624** (RNG FULL); @383 fixed; first miss @388 post-rust xname.
- Next: seed0014 @388 C short helm name vs JS still rusty/cursed.

## 2026-07-20 19:13 — #1032 D-0879 addinv compare-learn
- Objective: seed0014 screen@212 compare-items More vs invent line.
- C locus: `invent.c` `merged`/`addinv` known/bknown/rknown + invent pline.
- Change: async `addinv` via `mkobj.mergable`; port ID-dim reconcile +
  `You learn more about your items by comparing them.` Named omit:
  quiver-prefer; worn-slot; oname; globby; `#adjust` invent_merged msg.
- Verification: green+strict PASS; cohort 8/8 PASS; seed0014 Scr
  **621→623** (RNG FULL); @212 fixed; first miss @383 yn cursor.
- Next: seed0014 @383 yn prompt cursor `[1,1]` vs JS `[80,0]`.

## 2026-07-20 19:06 — #1031 D-0878 chest_shatter_msg
- Objective: seed0014 first screen miss (Scr 620/714; miss was @47 not prefix).
- C locus: `lock.c` `chest_shatter_msg` Blind+`singular` + material switch.
- Change: Blind save/restore for `singular(xname)`; fix PAPER=5/GLASS=19/
  WOOD=8 (were 1/11/13). Named omit potionbreathe / Blind hear-see.
- Verification: green+strict PASS; cohort 38/38 PASS; seed0014 Scr
  **620→621** (RNG FULL).
- Next: seed0014 screen@212 compare-items More vs invent line.

## 2026-07-20 19:01 — #1030 public score cadence
- Objective: mandatory full `sessions` score refresh (iter % 5 == 0).
- C locus: n/a (docs-only cadence).
- Change or falsified theory: no port change; suite stable post D-0877.
- Verification: green+strict PASS; full suite **40/44** Scr **9480**/11405
  RNG **676373**/792838 (85.31%); speed `31+0.23/turn` (R² 0.834).
  Non-PASS: seed0014 Scr 620/714 (RNG FULL); seed2200 229/230;
  seed2600; seed4500.
- Next: seed0014 first screen miss @620; next cadence @#1035.

## 2026-07-20 19:00 — #1029 D-0877 dipfountain bath
- Objective: seed0014 @59074 C `exercise` `rn2(2)` vs JS `rn2(3)`.
- C locus: `fountain.c` dipfountain case 28; `steal.c` `somegold`;
  `attrib.c` `exercise` abuse `-rn2(2)`.
- Change: port `somegold` + cases 26–28 (bath/gold/`exercise`); case 29
  mkgold deferred. Named omit Excalibur/wash_hands/uncurse 17–20.
- Verification: green+strict PASS; seed0014 RNG **FULL 59178**, Scr
  620/714; suite **40/44** Scr 9480 RNG 676373 (85.31%).
- Next: seed0014 screen peel @620; leaderboard cron.

## 2026-07-20 18:52 — #1028 D-0876 watch_on_duty
- Objective: seed0014 @58462 C `watch_on_duty` `rn2(3)` vs JS `rn2(10)`.
- C locus: `monmove.c` `watch_on_duty`/`dochug`; `hack.c` `in_town`;
  `mkmaze.c` `fixup_special` `has_town`.
- Change: port `is_watch`+`watch_on_duty`+`in_town`+`picking_lock`; set
  `has_town` for town specials. Named omit mon_yells/angry_guards/
  is_digging/watch_dig/mind_blast body.
- Verification: green+strict PASS; seed0014 **58462→59074**; cohort
  38/38 PASS.
- Next: @59074 C `exercise` `rn2(2)` vs JS `rn2(3)` after dipfountain;
  leaderboard cron.

## 2026-07-20 18:45 — #1027 D-0875 minetn-3 Alley Town
- Objective: seed0014 @52043 C nhlib shuffle `rn2(3)` vs JS `rn2(79)`.
- C locus: `dat/minetn-3.lua` via `makemaz`/`load_special`; nhlib
  `shuffle(align)`.
- Change: port `load_minetn_3` + dispatch; `wand shop`→`WANDSHOP`.
  Named omit: minetn-1/4/6/7.
- Verification: green+strict PASS; seed0014 **52043→58462**; cohort
  38/38 PASS.
- Next: @58462 C `watch_on_duty` rn2(3) vs JS rn2(10); leaderboard cron.

