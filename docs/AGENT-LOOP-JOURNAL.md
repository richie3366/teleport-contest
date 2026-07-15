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

## 2026-07-15 02:16 — #369 D-0348 chargen corner splash

- Objective: seed0009 @9 leftover splash under role-ok (hypothesis inverted).
- C locus: `wintty.c` `tty_display_nhwindow` corner → clear WIN_MESSAGE only;
  `erase_menu_or_text` on destroy.
- Change: `paint_corner_nhw_menu` chargen keeps BASE splash; erase prior
  `_tty_menu_geom` (fullscreen clear / corner cl_end) — D-0348.
- Verification: seed0009 Scr **12→13**/73; seed0077 PASS; green+strict;
  cohort 21 PASS.
- Next: seed0009 @13 `Entering the tutorial.--More--`.

## 2026-07-15 02:05 — #368 D-0346/0347 dosit + weapon_insight twoweap

- Objective: seed0107 @85 sit-on-corpse; then @93 attributes skill limits.
- C locus: `sit.c` `dosit` OBJ_AT; `objnam.c` `xname`/`the` CORPSE bare;
  `insight.c` `weapon_insight` twoweap skill compare.
- Change: port picnic sit+comfort; CORPSE xname="corpse"+`the()`; twoweap
  limited-by lines + COLNO period clip (D-0346/D-0347).
- Verification: seed0107 **98/98 PASS** RNG full; suite **23/44** Scr
  **3561**/11405 RNG **240160**/792838; green+strict; cohort 20 PASS.
- Next: seed0009 @9 leftover splash under role-ok menu (Scr 12/73).

## 2026-07-15 01:56 — #367 D-0345 hitum twoweapon second swing

- Objective: seed0107 @40 miss-only vs C miss+kill (CURRENT primary).
- C locus: `uhitm.c` `hitum` `gt.twohits` / `known_hitum(uswapwep)`;
  `double_punch` / `mon_maybe_unparalyze`.
- Change: port second swing path; Cleaver cleave + hmon twohits dbon deferred.
- Verification: Scr **42→96**/98; RNG **full 2902**; green+strict;
  cohort 20 PASS. First miss `@85` sit-on-corpse.
- Next: `sit.c` `dosit` CORPSE `the(xname)` + comfort pline.

## 2026-07-15 01:51 — #366 D-0344 `#twoweapon` / dotwoweapon

- Objective: seed0107 `@15` unknown `#twoweapon`.
- C locus: `wield.c` `dotwoweapon`/`can_twoweapon`; `cmd.c` flags 0.
- Change: EXT_CMDS body + helpers; not EXT_CMD_AC (unique `#tw` expand).
- Verification: Scr **36→42**/98 RNG **2684→2846**; green+strict;
  cohort 20 PASS. @40 next: `hitum` twohits kill after miss.
- Next: `uhitm.c` `hitum` secondary `uswapwep` swing.

## 2026-07-15 01:40 — #365 score + D-0342/0343 restore PASS

- Objective: #365 public score + seed0013-restore `@71` reveal_terrain.
- C locus: `detect.c` reveal_terrain_getglyph; `getpos.c` tip/quitchars.
- Change: TER_MAP getglyph/show (D-0342); tip skip-docrt under
  terrainmode + space → Done (D-0343).
- Verification: restore **99**/99 PASS; suite **22/44** Scr **3499**/11405
  RNG **239942**/792838 `18+0.12/turn`; green+strict+cohort.
- Next: seed0107 `#twoweapon` unbound @15.

## 2026-07-15 01:26 — #364 D-0340/0341 invent show-* + DEL terrain

- Objective: seed0013-restore @64 `[` doprarm (CURRENT primary).
- C locus: `invent.c` doprarm/doprring/dopramulet/doprtool;
  `cmd.c` `\177`→doterrain.
- Change: worn/empty show-* plines + binds (D-0340); bind DEL to existing
  `doterrain` (D-0341).
- Verification: Scr **69→75**/99; first miss `@71` reveal_terrain still
  paints `@`/`f` vs C `~`; RNG full; green+strict; 21 PASS cohort.
- Next: `@71` `reveal_terrain` TER_MAP hide monsters/objects.

## 2026-07-15 01:20 — #363 D-0339 `)` doprwep

- Objective: seed0013-restore @62 `)` bare handed (CURRENT primary).
- C locus: `invent.c` `doprwep` / `wield.c` `empty_handed`.
- Change: `doprwep` !uwep pline + wielded `xprname`; bind `)` (D-0339).
- Verification: Scr **68→69**/99; first miss `@64` `[`; RNG full;
  green+strict; 21 PASS cohort incl. seed0013-rogue.
- Next: `@64` `[` / `doprarm` worn-armor display.

## 2026-07-15 01:13 — #362 D-0335…0338 save/restore + showgold

- Objective: seed0013-restore Scr 47/99 (CURRENT primary).
- C locus: `save.c` dosave; `restore.c` dorecover; `allmain` welcome/
  preamble; `invent` doprgold; `wintty` dmore quitchars.
- Change: JSON VFS save/restore + `S` (D-0335); welcome-back align gate
  (D-0336); attributes quitchars (D-0337); `$`/`doprgold` (D-0338).
- Verification: RNG **full 4804**; Scr **47→68**/99; first miss `@62` `)`;
  green+strict; 8 PASS cohort incl. seed0013-rogue.
- Next: `@62` `)` bare-handed / `doprwep`.

## 2026-07-15 01:02 — #361 D-0334 farlook checkfile yn

- Objective: seed2200 @39 look `--More--` vs moreinfo yn (CURRENT).
- C locus: `topl.c` `tty_yn_function` NEED_MORE→`more`; `pager.c`
  `checkfile`/`y_n`; `do_screen_description` lookat `found=1`.
- Change: `checkfile` → `yn_function`; stairs/ROOM/CORR `found: 1`
  after parenthetical (D-0334).
- Verification: seed2200 Scr **206→229**/230 (parked @158 only); RNG
  full; green+strict; 19 PASS cohort.
- Next: seed0013-restore Scr 47/99 (or seed0107 @2684).
