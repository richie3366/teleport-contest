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

## 2026-07-20 18:15 — #1026 D-0874 trapeffect_landmine
- Objective: seed0014 @50259 C `rnd(16)` landmine vs JS `rn2(5)`.
- C locus: `trap.c` `trapeffect_landmine` / `blow_up_landmine`; mon
  `rn2(cwt+1) < WT_ELF/2` early return (this peel underweight).
- Change: wire LANDMINE in selector; port landmine + partial blow_up
  (omit scatter/fill_pit/drawbridge/iron-shoes which_armor).
- Verification: green+strict PASS; seed0014 **50259→52043**; cohort
  20/20 PASS.
- Next: @52043 C nhlib.lua shuffle rn2(3) vs JS rn2(79); leaderboard cron.

## 2026-07-20 18:05 — #1023 D-0873 create_monster female overwrite
- Objective: seed0399 @483 dwarf lord vs lady (Hallu theory falsified).
- C locus: `sp_lev.c` `create_monster` `mtmp->female = m->female` after
  makemon; `des.monster()` keeps female=0.
- Change: always overwrite female in `splev_create_monster` /
  room variants; `makemon` MM_MALE/MM_FEMALE.
- Verification: green+strict PASS; seed0399 **PASS** 532/532; cohort
  15/15.
- Next: seed0014 @50259 (D-0708); leaderboard cron.

## 2026-07-20 17:52 — #1022 D-0872 unique known leak (silver bell)
- Objective: seed0399 @300 `a` vs `the` silver bell.
- C locus: `objnam.c` `xname_flags` `!nn && oc_uses_known && oc_unique`.
- Change: `clear_unique_known_leak` in `xname`/`doname`; uses_known
  heuristic for Bell/Candelabrum/Amulet/Book (+ Bell charged).
- Verification: green+strict PASS; seed0399 Scr **530→531**; cohort
  7/7 PASS (0399 still 531/532).
- Next: @483 Hallu dwarf lord/lady (display-rng gender?).

## 2026-07-20 17:45 — #1021 D-0871 MUSE_POT_SPEED mquaffmsg
- Objective: seed0399 @113 puton prinv missing `--More--`.
- C locus: `muse.c` `use_misc` MUSE_POT_SPEED; `worn.c` `mon_adjust_speed`.
- Change: await `mquaffmsg` before speed adjust; async give_msg pline
  + `learnwand`; `castmu` awaits `mon_adjust_speed`.
- Verification: green+strict PASS; seed0399 Scr **525→530** (RNG/cursors
  FULL); cohort 7/7 PASS.
- Next: @300 `a`/`the` silver bell; @483 Hallu dwarf lord/lady.

## 2026-07-20 17:36 — #1020 full public score refresh
- Objective: mandatory score cadence (iteration % 5 == 0).
- C locus: n/a (docs-only).
- Change: full `sessions` — **39/44** PASS; Scr **9433**/11405
  (+96 vs #1015); RNG **667614**/792838 (84.21%, +273); speed
  `32+0.24/turn` (R² 0.841). seed0399 Scr 525 RNG FULL; first miss
  @113 puton prinv missing `--More--`.
- Verification: green+strict PASS; suite exit 0.
- Next: seed0399 @113 puton/on_msg More; alt @300/@483; or D-0708;
  score @#1025.

