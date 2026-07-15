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
## 2026-07-15 09:35 — #400 score + D-0376 shk off-home diagnosis
- Objective: mandatory full `sessions` score (#400÷5); peel seed0012 @13517.
- C locus: shk.c shk_move onlineu/satdoor; priest.c move_special.
- Change or falsified theory: no JS patch. Falsified “move_special cand-count”
  — JS satdoor mill faithful; @13517 JS shk off-home appr=1 after mill~11069
  stuck on !onlineu; C satdoor mill ⇒ missed earlier appr=1 return (D-0376 open).
- Verification: green+strict PASS; full **24/44** Scr **3640**/11405 RNG
  **254110**/792838 speed `21+0.13/turn`.
- Next: falsify first onlineu(11,12) miss hero path 11072–13517.

## 2026-07-15 09:28 — D-0375 bag apply + gd_move escort (seed0012 @13392)
- Objective: seed0012 @13392 C distfleeck rn2(5) vs JS rn2(7).
- C locus: invent.c display_pickinv/getobj `?`; apply.c use_container;
  pickup.c out_container/menu_loot; vault.c gd_move/hidden_gold.
- Change: getobj `?` invent pick; sack apply → take-out gold; hidden_gold;
  OBJ_CONTAINED extract; peaceful gd_move corridor step (D-0375). Root was
  apply `?`→Never mind desync (a?jo$ bag loot) then stub gd_move.
- Verification: prefix 13392→13517; RNG 13430→13591 cursors 254→259;
  green+strict PASS; cohort 24/24.
- Next: seed0012 @13517 C move_special rn2(1) vs JS rn2(5).

## 2026-07-15 09:02 — D-0374 invault / vault guard spawn (seed0012 @13287)
- Objective: seed0012 @13287 C next_ident vs JS wipe_engr rn2(94).
- C locus: vault.c invault/find_guard_dest; allmain.c; makemon mercenary
  m_initweap/m_initinv; teleds urooms.
- Change: vault.js invault + allmain await; teleds in_rooms→urooms;
  MM_EGD + merc weapon/armor/whistle (D-0374).
- Verification: prefix 13287→13392; RNG 13295→13430 cursors 244→254;
  green+strict PASS; cohort 24/24.
- Next: seed0012 @13392 C distfleeck rn2(5) vs JS rn2(7) (gd_move?).

## 2026-07-15 08:44 — D-0373 vault_tele / tele_trap once (seed0012 @12489)
- Objective: seed0012 @12489 C somex rn2(2) vs JS rn2(5).
- C locus: teleport.c vault_tele/tele_trap; trap.c trapeffect_telep_trap.
- Change: hero once-TELEP → deltrap+vault_tele(somexyspace); mon mtele_trap
  (D-0373). DIAG: hero stood on vault TELEP (41,0) while JS skipped effect.
- Verification: prefix 12489→13287; RNG 12608→13295 cursors 227→244;
  green+strict PASS; cohort 24/24.
- Next: seed0012 @13287 C invault makemon next_ident vs JS wipe_engr rn2(94).

## 2026-07-15 08:24 — D-0372 domove attack before test_move (seed0012 @12439)
- Objective: seed0012 @12439 C gethungry rn2(20) vs JS rn2(5).
- C locus: hack.c domove_core — m_at/domove_attackmon_at before test_move.
- Change: cmd.js domove attacks before closed_door/testdiag/blocksMove
  (D-0372). Hero on DOOR+D_CLOSED; diagonal `b` to hostile was banned.
- Verification: prefix 12439→12489; RNG 12505→12608 cursors 226→227;
  green+strict PASS; cohort 22/22.
- Next: seed0012 @12489 C somex rn2(2) vs JS rn2(5).

## 2026-07-15 08:15 — #395 score + D-0371 foul vomit (seed0012 @8802)
- Objective: mandatory full `sessions` (#395); primary seed0012 @8802.
- C locus: fountain.c case 20; eat.c vomit nomul(-2).
- Change: port vomit nomul arm; wire foul fountain (D-0371). Root was
  missing immobilization — JS walked onto DOOR → skipped dog_goal rn2(4).
- Verification: green+strict PASS; cohort 24/24; focused 8802→12439 RNG
  9447→12505 cursors 186→226; full suite **24/44** Scr **3640**/11405
  (31.92%) RNG **253036**/792838 (31.92%) `21+0.12/turn` (R² 0.81).
  vs #390: same PASS set; RNG matched +5279.
- Next: seed0012 @12439 C gethungry rn2(20) vs JS rn2(5).

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
