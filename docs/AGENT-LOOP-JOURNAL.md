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
## 2026-07-15 08:00 — D-0370 fountain monster_detect (seed0012 @8384)
- Objective: seed0012 @8384 C mtrack rn2(8) vs JS rn2(4).
- C locus: fountain.c case 26; detect.c monster_detect/browse_map.
- Change: port monster_detect (fmon array); wire drinkfountain case 26.
  Root was missing detect getpos — B/H were farlook not run.
- Verification: 8384→8802; RNG 8944→9447; cursors 128→186; green+strict;
  cohort 24/24.
- Next: seed0012 @8802 C dog_goal rn2(4) vs JS rn2(12).

## 2026-07-15 07:47 — D-0369 dochug wipe_engr_at (seed0012 @7312)
- Objective: seed0012 @7312 C wipeout_text rn2(11) vs JS distfleeck rn2(5).
- C locus: monmove.c dochug wipe_engr_at before set_apparxy/distfleeck.
- Change: call wipe_engr_at(mx,my,1,false) after wake gate (D-0369).
- Verification: mismatch 7312→8384; RNG 7558→8944; green+strict; cohort 24/24.
- Next: seed0012 @8384 C dog_move mtrack rn2(8) vs JS rn2(4).

## 2026-07-15 07:45 — D-0368 O/@ autopick (seed0012 @7288)
- Objective: seed0012 @7288 C dog_move rn2(1) vs JS obj_resists.
- C locus: options.c doset_simple/dotogglepickup; pickup.c autopick_testobj.
- Change: bind O/@; choose_classes_menu pickup_types; autopick filter (D-0368).
- Verification: mismatch 7288→7312; RNG 7495→7558; green+strict; cohort 22/22.
- Next: seed0012 @7312 C wipeout_text vs JS distfleeck.

## 2026-07-15 07:32 — D-0367 save_track/rest_track (seed0012 @6952)
- Objective: seed0012 @6952 C rn2(12) vs JS rn2(1) (wrong dog_goal gg).
- C locus: track.c save_track/rest_track; dogmove.c dog_goal gettrack.
- Change: in-memory save_track/rest_track on goto_level stash (D-0367).
  Was wipe-only initrack → gettrack null → wantdoor gg=(62,16).
- Verification: prefix 6952→7288; RNG 7202→7495; green+strict; cohort 24/24.
- Next: seed0012 @7288 C dog_move rn2(1) vs JS obj_resists.

## 2026-07-15 07:14 — #390 public score
- Objective: mandatory full `sessions` score (iteration 390 % 5).
- C locus: n/a (score cadence; no port patch).
- Change: none — measured suite only.
- Verification: green+strict PASS; full suite **24/44** Scr **3640**/11405
  (31.92%) RNG **247757**/792838 (31.25%) `19+0.12/turn` (R² 0.80).
  vs #385: same PASS set; RNG matched +3924; Scr unchanged.
- Next: D-0367 C `gg`/`view_from` falsifier (seed0012 @6952).

## 2026-07-15 07:12 — D-0367 dog_goal gg @6952 (diagnosed)
- Objective: seed0012 @6952 C rn2(12) vs JS rn2(1) in dog_move.
- C locus: dogmove.c dog_goal/wantdoor; vision.c view_from.
- Falsified: same-gg approach short-circuit; inject (54,17); skip-only
  (55,17). Established: JS wantdoor gg=(62,16); C arity ≡ gg≈(56,17);
  force → prefix 6965. No code change.
- Verification: green+strict PASS; rng-diff still @6952.
- Next: C gg/view_from capture at this dog_move (D-0367).

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

