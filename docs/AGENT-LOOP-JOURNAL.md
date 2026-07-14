# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. When this file exceeds ~15 entries,
move older ones into `docs/archive/`.

Use this shape:

```text## YYYY-MM-DD HH:MM — <objective>
- Objective: …
- C locus: …
- Change or falsified theory: …
- Verification: …
- Next: …
```

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

## 2026-07-15 00:47 — #360 score + D-0332/0333 seed0013 PASS

- Objective: mandatory full `sessions` (#360 %5) + seed0013 @23 drop letters.
- C locus: `invent.c` `compactify`/`getobj`; `insight.c` friday13 `enlght_out`.
- Change: drop `compactify_invlets` when suggested>5 (D-0332); friday13
  attributes two-space indent (D-0333).
- Verification: full suite **21/44**, Scr **3424/11405** (30.02%), RNG
  **240657/792838**, speed `18+0.12/turn`; seed0013-rogue **59/59 PASS**;
  green+strict; 21 PASS cohort.
- Next: seed2200 @39 farlook `--More--` vs moreinfo yn.

## 2026-07-15 00:40 — #359 D-0331 getlin/`#` topl wrap

- Objective: seed0030 @1935 `#` extcmd echo wrap (CURRENT).
- C locus: `topl.c` `topl_putsym` (CO-1 wrap); `getline.c` `buf < COLNO`.
- Change: `topl_wrap_echo` in `getlin`/`get_ext_cmd`; raise cap to COLNO
  (D-0331).
- Verification: seed0030 **1953/1953** PASS; green+strict; 17 cohort PASS;
  seed2200 Scr **175→206**/230.
- Next: seed0013 @23 getobj drop `[a-g or ?*]` vs `[abcdefg or ?*]`.

## 2026-07-14 23:58 — #358 D-0330 `;` glance + look_at_monster

- Objective: seed0030 @1832 unbound `;` (CURRENT).
- C locus: `cmd.c` `';'`→`doquickwhatis`; `pager.c` `do_look(1)` /
  `look_at_monster`; putmixed (no forced more).
- Change: bind `;`; `distant_monnam_none`+asleep; skip quick checkfile;
  drop forced more after look pline (D-0330).
- Verification: @1832–@1839 match; Scr **1832→1933**; first miss **@1935**
  farlook wrap; RNG full; green+strict; 19 PASS cohort.
- Next: @1935 `#  farlook -> …` row1 `"  k"` wrap.

## 2026-07-14 23:48 — #357 D-0329 named ghost monnam

- Objective: seed0030 @1830 `You miss Elara's ghost.` (CURRENT).
- C locus: `do_name.c` `x_monnam` PM_GHOST + `s_suffix(MGIVENNAME)`.
- Change: `named_ghost_monnam` in `mon_nam` / tame / `noit_Monnam`
  (D-0329).
- Verification: @1830/@1831 match; Scr **1831→1832**; first miss **@1832**
  `;` unbound; RNG full; green+strict; 17 PASS cohort.
- Next: @1832 cmd `;` → `do_look(1)`.

## 2026-07-14 23:45 — #356 D-0328 savebones clear map memory

- Objective: seed0030 @1821 blank C map vs JS walls after bones descend.
- C locus: `bones.c` `savebones` glyph clear; `display.c` `docrt_flags`
  `vision_recalc(2)`.
- Change: clear seenv/waslit/remembered/disp on bones write+load; `docrt`
  vision shutoff + memory + recalc (D-0328).
- Verification: @1821 match; Scr **1821→1831**; first miss **@1830**
  `Elara's ghost`; RNG full; green+strict; 19 PASS cohort.
- Next: @1830 bones ghost monnam `"s ghost"`.

## 2026-07-14 23:25 — #355 score + D-0327 xkilled destroy

- Objective: mandatory full `sessions` (#355 %5) + seed0030 @1684.
- C locus: `mondata.h` `nonliving`; `mon.c` `xkilled` destroy/kill.
- Change: port `is_golem`/`weirdnonliving`/`nonliving`; `xkilled` verb
  (D-0327).
- Verification: full suite **19/44**, Scr **3258/11405** (28.57%), RNG
  **240657/792838**, speed `17+0.12/turn`; @1684 `destroy`; Scr
  **1820→1821**; first miss **@1821** blank C map; green+strict; 17 PASS
  cohort.
- Next: @1821 map clear/`docrt` on level transition.

## 2026-07-14 23:04 — #354 D-0326 newsym canspotself

- Objective: seed0030 @1606 Invis map `@` vs underfoot `%` (CURRENT).
- C locus: `display.h` `canspotself`; `display.c` `newsym` u_at.
- Change: port Blind/Invis/Invisible + `canspotself`; `map_location(show)`
  when `!see_self`; `display_self` only when spottable (D-0326).
- Verification: @1606 match; Scr **1606→1820**; first miss **@1684**
  destroy vs kill; RNG full; green+strict; 17 PASS cohort.
- Next: @1684 `xkilled` `nonliving` → `"destroy"`.

## 2026-07-14 22:58 — #353 D-0325 ARMOR xname OBJ_DESCR

- Objective: seed0030 @1601 `iron skull cap` vs `orcish helm` (CURRENT).
- C locus: `objnam.c` `xname_flags` ARMOR_CLASS — `!nn` → `dn`.
- Change: port ARMOR nn/un/dn + pair/set/shield !dknown arms (D-0325);
  `armor_simple_name` for called deferred (uses dn).
- Verification: @1601 match; Scr **1605→1606**; first miss **@1606**
  Invis map `@` vs `%`; RNG full; green+strict; 17 PASS cohort.
- Next: @1606 `newsym` `canspotself` — show under-hero glyph when Invisible.

## 2026-07-14 22:53 — #352 D-0324 quit topten how + outentry

- Objective: seed0030 @1484 Galen topten `quit` vs `died` (CURRENT).
- C locus: `end.c` `done`/`really_done`; `topten.c` `outentry`.
- Change: `DEATHS[]` + killer setup for QUIT; NO_KILLER_PREFIX; outentry
  quit/starved share dungeon/level append (D-0324).
- Verification: @1484 match; Scr **1604→1605**; prefix **1601**; RNG full;
  green+strict; 17 PASS cohort. First miss **@1601** iron skull cap.
- Next: @1601 ARMOR `xname` `OBJ_DESCR` (`iron skull cap` vs `orcish helm`).
