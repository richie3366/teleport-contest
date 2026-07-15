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
## 2026-07-15 06:12 — D-0363 hmon dmg_recalc (seed0012 @3204)
- Objective: seed0012 @3204 C xkilled rn2(6) vs JS rn2(25).
- C locus: weapon.c dbon/weapon_dam_bonus; uhitm.c hmon_hitmon_dmg_recalc.
- Change: port dbon + martial weapon_dam_bonus into hmon before stagger
  (D-0363). JS under-dmg left mon alive → flee rn2(25).
- Verification: prefix 3204→3248; RNG 3255→3304; green+strict; cohort 22 PASS.
- Next: seed0012 @3248 C distfleeck rn2(5) vs JS rn2(100).

## 2026-07-15 06:06 — D-0362 #loot use_container (seed0012 @3152)
- Objective: seed0012 @3152 C dog_move rn2(1) vs JS rn2(3).
- C locus: pickup.c doloot/use_container; end.c container_contents.
- Change: EXT_CMDS loot + doloot `:` look/ESC (D-0362). Root cause was
  hero (4,6) vs C (3,5) after missed timed #loot — not dog_move appr.
- Verification: prefix 3152→3204 (xkilled); green+strict; cohort 24 PASS.
- Next: seed0012 @3204 C xkilled rn2(6) vs JS rn2(25).

## 2026-07-15 05:49 — D-0361 mkbox_cnts ICE_BOX (seed0012 @1245)
- Objective: seed0012 @1245 C `next_ident` vs JS `rnd(100)`.
- C locus: `mkobj.c` `mkbox_cnts` ICE_BOX → `mksobj(CORPSE)`.
- Change: ICE_BOX arm + `add_to_container`/cobj clear + container weight
  sum (D-0361). Was always boxiprobs `rnd(100)`.
- Verification: seed0012 RNG 1285→3346 Scr 13→14; @3152 dog_move next;
  green+strict; cohort 22 PASS.
- Next: seed0012 @3152 C `dog_move` `rn2(1)` vs JS `rn2(3)`.

## 2026-07-15 05:45 — D-0360 hero rocktrap (seed0012 stack overflow)
- Objective: pick shared blocker; seed0012 Maximum call stack exceeded.
- C locus: `trap.c` `trapeffect_rocktrap` hero; `thitm` place after death.
- Change: port hero feeltrap+place ROCK at `u.ux,u.uy`+losehp; `thitm`
  captures mx/my before `monkilled` (D-0360). Was youmonst→thitm→
  `place_object(undefined)` → `can_reach_location` NaN recurse.
- Verification: seed0012 no throw; Scr 0→13 RNG 0→1285; @1245 next;
  green+strict; cohort 22 PASS.
- Next: seed0012 @1245 C `next_ident` vs JS `rnd(100)`.

## 2026-07-15 05:29 — #380 score + D-0359 continue_run smudge
- Objective: public score (#380÷5) + seed0009 RNG @3521 `rnd(5)` vs `mcalcmove`.
- C locus: `hack.c` `domove`/`maybe_smudge_engr`; `allmain.c` continue-run;
  `cmd.c` `set_move_cmd` DOMOVE_WALK/RUSH.
- Change: smudge only when RUSH|WALK succeeded; clear `domove_attempting`
  each step; set flags on first walk/run (D-0359). seed0009 PASS.
- Verification: suite **24/44** Scr **3626**/11405 RNG **240535**/792838
  `19+0.12/turn`; green+strict; cohort 24 PASS.
- Next: pick shared blocker (seed0004/0002/0006/0007/0012/quest).

## 2026-07-15 05:20 — D-0358 death disclose before RIP
- Objective: seed0009 @63 attributes yn vs tombstone (CURRENT).
- C locus: `end.c` `disclose`; `insight.c` enlightenment; `dungeon.c`
  `init_mapseen`/`show_overview`; `wintty` fullscreen `--More--` col 1.
- Change: wire a/v/g/c/o; gameover enlightenment; mklev `init_mapseen`;
  overview `(end)` + ATR_NONE final headings (D-0358).
- Verification: Scr **63→73**/73; RNG still **3708**/3713 (@3514
  mcalcmove); green+strict; cohort 23 PASS.
- Next: seed0009 RNG @3514 `rn2(12)` vs JS `rnd(5)`.

## 2026-07-15 05:05 — D-0357 swim_move_danger + drown/lava
- Objective: seed0009 @45 pool-avoid `--More--` (CURRENT).
- C locus: `hack.c` `swim_move_danger`/`pooleffects`; `cmd.c` `do_reqmenu`;
  `trap.c` `drown`/`lava_effects`.
- Change: ParanoidSwim avoid+tip; `m`→nopick; pooleffects→drown crawl +
  lava `d(6,6)`+`done(BURNING)` (D-0357).
- Verification: Scr **49→63**/73 RNG **3708**; @45–@62 match; next @63
  attrs yn vs RIP; green+strict; cohort 23 PASS.
- Next: BURNING disclose order (attributes before tombstone).

## 2026-07-15 04:45 — D-0356 describe_decor broken door
- Objective: seed0009 @41 “There is a broken door here.” vs blank.
- C locus: `pickup.c` `describe_decor` + `pickup` `!OBJ_AT` mention_decor.
- Change: port `describe_decor`; wire pickup early path + check_here
  LOOKHERE_SKIP_DFEATURE (D-0356). Not bare `look_here` when ct==0.
- Verification: Scr **48→49**/73; @41 match; first miss @45 pool-avoid;
  RNG **3649**; green+strict; cohort 21 PASS.
- Next: @45 “You avoid stepping into the pool of water.--More--”.

## 2026-07-15 04:40 — D-0355 pool/lava/ice DEC glyphs
- Objective: seed0009 @40 terrain `?` vs C DEC pool/lava diamond.
- C locus: `display.c` `back_to_glyph` + `defsym.h` / DECgraphics S_pool.
- Change: `terrain_glyph` POOL/MOAT/WATER/lava/ice; scoring grid keeps
  raw DEC `` ` `` (not Unicode ◆) like altar `{` (D-0355).
- Verification: Scr **40→48**/73; first miss @41 “broken door”; RNG
  **3649**; green+strict; cohort 21 PASS. Score not remeasured (#376).
- Next: `look_here`/`dfeature_at` D_BROKEN “There is a broken door here.”

## 2026-07-15 04:32 — #375 score + D-0354 mention_walls
- Objective: mandatory full `sessions` score (#375 %5) + seed0009 @33 wall.
- C locus: `hack.c` `test_move` mention_walls obstructed bump.
- Change: `mention_walls_obstructed` on `blocksMove` rock/bars (D-0354).
- Verification: full suite **23/44** Scr **3592**/11405 RNG **240471**/792838
  `18+0.12/turn`; seed0009 Scr **39→40**; green+strict; cohort 8 PASS.
- Next: @40 POOL/WATER `terrain_glyph` (`?` vs DEC diamond); then broken door.

## 2026-07-15 04:25 — D-0353 tut-1 remainder + WAITMASK
- Objective: seed0009 finish tut-1 level-gen (CURRENT).
- C locus: `dat/tut-1.lua` loot→end; `mklev.c` mineralize special skip;
  `makemon.c` align_shift; `monmove.c` dochug STRAT_WAITMASK.
- Change: load_tut1 through potion; mineralize early return; real
  align_shift; WAITFORU/WAITMASK gate before distfleeck (D-0353).
- Verification: Scr **38→39** (@33 wall); RNG **3450→3649**; green+strict;
  cohort 7 PASS.
- Next: @33 glance/wall “It's a wall.” vs blank JS topline.

## 2026-07-15 03:15 — D-0352 tut-1 mktrap gate through sling
- Objective: seed0009 @27 door resists vs opens (CURRENT).
- C locus: `mklev.c` mktrap victim `rnd(4)`; `dungeon.c` induced_align
  Is_special; `dat/tut-1.lua` kick→sling.
- Change: falsified doopen chance; `mktrap_seen_victim` + load_tut1 through
  sling; induced_align via sp_levchn (D-0352).
- Verification: Scr **27→38** (first miss @33 wall); RNG **3341→3450**;
  green+strict; cohort 5 PASS.
- Next: load_tut1 large-box mkbox_cnts+contents → place_lregion.

## 2026-07-15 02:58 — D-0351 tut-1 door-area des.*
- Objective: seed0009 @21 S_engroom `` ` `` vs floor (CURRENT).
- C locus: `dat/tut-1.lua` door-area; `sp_lev.c` lspo_engraving/door/trap;
  parse_config newbie options.
- Change: engravings (2,4)/(2,5)/(2,7)/(4,5) + `D_CLOSED` (2,6) + seen
  MAGIC_PORTAL (4,4) + mention_walls/decor/lit_corridor (D-0351).
- Verification: seed0009 Scr **21→27**; green+strict; cohort sample PASS.
- Next: @27 door resists vs opens (`doopen_indir` chance/attrs).

## 2026-07-15 02:50 — D-0350 tut-1 CENTER + arrival
- Objective: seed0009 @14 map cells (133 misses under engraving more).
- C locus: `sp_lev.c` `lspo_map` CENTER; `u_on_rndspot`; Tutorial botl;
  `nhl_gamestate` invent stash; allmain once-per-input `find_ac`.
- Change: center tut-1 map (3,3); updest/`u_on_rndspot`; Tutorial label;
  invent stash without early `find_ac`; moveloop `find_ac`.
- Verification: seed0009 Scr **14→21**; green+strict; cohort 21 PASS.
- Next: @21 next S_engroom engraving / more tut-1.lua des.*.

## 2026-07-15 02:30 — #370 score + D-0349 tutorial yes-path
- Objective: mandatory full `sessions` score; seed0009 Entering `--More--`.
- C locus: `allmain.c` `maybe_do_tutorial`; `do.c` `schedule_goto`/
  `deferred_goto`/`goto_level` `pickup(1)`; `mklev.c` `Is_special`→
  `makemaz("tut-1")`.
- Change: schedule/deferred + tut-1 map skeleton + nofollowers keepdogs
  (D-0349). Rejected bare pline without deferred_goto.
- Verification: full suite **23/44** Scr **3565** RNG **240160**;
  seed0009 Scr **13→14**; green+strict; cohort descend/0107 PASS.
- Next: finish `load_tut1` des.* so @14 map cells match (133 misses).

