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
## 2026-07-15 06:56 — D-0366 doup + in-memory getlev (seed0012 @6924)
- Objective: seed0012 @6924 C getlev rnd(10) vs JS fleeck.
- C locus: do.c doup; dungeon.c prev_level; restore.c getlev hide rnd(10).
- Change: `<`→doup/prev_level; stash VISITED|LFILE_EXISTS+omoves; restore
  + mon_catchup + hide_monst gate; climb-up pline (D-0366).
- Verification: prefix 6924→6952; RNG 7052→7202; green+strict; cohort 24/24.
- Next: seed0012 @6952 C dog_move rn2(12) vs JS rn2(1).

## 2026-07-15 06:50 — D-0365 multi `,` query_objlist (seed0012 @3483)
- Objective: seed0012 @3483 C dog_goal obj_resists vs JS dog_move rn2(3).
- C locus: pickup.c pickup/query_objlist PICK_ANY; hack.c dopickup.
- Change: multi-object `,` menu (letter toggle + Enter); was stub that
  leaked b/\\n/n as movement → hero desync → skipped invent resists.
- Verification: prefix 3483→6924; RNG 3638→7052; green+strict; cohort 24/24.
- Next: seed0012 @6924 C getlev rnd(10) vs JS fleeck.

## 2026-07-15 06:35 — D-0364 dog_nutrition oc_delay (seed0012 @3248)
- Objective: seed0012 @3248 C fleeck vs JS obj_resists after pet fleeck.
- C locus: dogmove.c dog_nutrition/dog_eat; monmove.c m_move meating.
- Change: dog_nutrition reads objects[].oc_delay + FOOD nutrition×msize;
  non-food owt/20 (D-0364). Was instance oc_delay→meating=1 after tripe.
- Verification: prefix 3248→3483; RNG 3304→3638; green+strict; cohort 24/24.
- Next: seed0012 @3483 C dog_goal obj_resists vs JS dog_move rn2(3).

## 2026-07-15 06:20 — #385 score + D-0364 diagnose (seed0012 @3248)
- Objective: mandatory full `sessions` score (#385÷5); primary seed0012 @3248.
- C locus: dogmove.c dog_goal/dog_move; zap.c obj_resists (DIAG only).
- Change: none in js/. Score refresh 24/44 (Scr 3640/11405, RNG 243833/792838).
  DIAG: pet dog_goal obj_resists on CHEST/STATUE/CORPSE/ICE_BOX; skip dog_move
  RNG → prefix 3483 (falsifier only — reverted).
- Verification: green+strict PASS; full suite 24/44.
- Next: fix fobj membership near pet (D-0364); do not skip dog_move.

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
