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
## 2026-07-15 13:20 — #411 doset_simple_menu (D-0385)
- Objective: seed0012 @58 Options — port C `doset_simple_menu`.
- C locus: options.c doset_simple_menu; windows.c choose_classes_menu;
  wintty.c multipage fullscreen + status-after-clear.
- Change: allopt-driven Options menu + extract; choose_classes ATR/stay-open;
  status suppress across submenu; symset get_val.
- Verification: seed0012 Scr **187→199**; green+strict PASS; cohort
  seed1500/1800/0009 PASS.
- Next: seed0012 @70 post-Options map DEC vs Unicode restore.

## 2026-07-15 12:42 — #410 public score
- Objective: mandatory full `sessions` (#410 divisible by 5).
- C locus: n/a (score cadence); primary remains seed0012 @58 Options.
- Change: documented suite aggregates; sharpened Options hypothesis to
  C `doset_simple_menu` vs JS stub (no port this iteration).
- Verification: green+strict PASS; full suite **24/44** Scr **3854**/11405
  (33.79%) RNG **255075**/792838 (32.17%) `21+0.12/turn` (R² 0.80).
  vs #405: same PASS set; Scr +8, RNG +678 (seed0002 47→50 / 4520→5198).
- Next: port `doset_simple_menu` from `options.c` for seed0012 @screen58.

## 2026-07-15 11:47 — D-0383/84 ice-box stacks + pickup INVORDER_SORT
- Objective: seed0012 screens @31 Contents / @43 Pick up what?
- C locus: mkobj.c add_to_container/mksobj spe; end.c container_contents;
  invent.c sortloot; pickup.c query_objlist INVORDER_SORT + let_to_name.
- Change: merge+corpse gender+sortloot doname (D-0383); pack-order class
  headings + prompt ATR_INVERSE (D-0384).
- Verification: Scr **184→187**/308; green+strict; cohort 22/22 PASS.
- Next: seed0012 @screen58 `O` Options menu geometry / missing rows.

## 2026-07-15 11:30 — D-0382 in_or_out_menu prompt/SELECTED (seed0012 Scr)
- Objective: seed0012 @screen30 ice-box `Do what with…` menu.
- C locus: pickup.c in_or_out_menu; wintty.c tty_end_menu /
  process_menu_window SELECTED `*`; menu_headings ATR_INVERSE.
- Change: `js/pickup.js` — prompt ATR_INVERSE; default `q * done|do nothing`.
- Verification: Scr **182→184**/308; green+strict; cohort 22/22 PASS.
- Next: seed0012 @screen31 ice-box `container_contents` sortloot stacks.

## 2026-07-15 11:17 — #405 score + seed0012 Scr 14→182 (D-0379/80/81)
- Objective: mandatory full `sessions` (#405); primary seed0012 screens.
- C locus: role.c maybe_skip_seps; u_init.c SPELL_LEV_PW; pickup.c
  use_container locked; vault.c clear_fcorr blackout/map_location.
- Change: maybe_skip_seps counts ok_* roles (D-0379); num_spells→
  SPELL_LEV_PW(1) bump (D-0380); locked Hmmm pline (D-0381); clear_fcorr
  blackout/map_location/deltrap/del_engr (faithful side).
- Verification: full suite **24/44** Scr **3640→3846** RNG 254397;
  seed0012 Scr **14→182**/308; green+strict; cohort 24/24.
- Next: seed0012 @screen30 ice-box menu layout/attr.

## 2026-07-15 10:48 — D-0378 restfakecorr/clear_fcorr (seed0012 @13700)
- Objective: seed0012 @13700 C move_special rn2(1) vs JS fleeck rn2(5).
- C locus: vault.c clear_fcorr/restfakecorr; gd_move um_dist + post-dig.
- Change: symptom was shk !onlineu mill skip — root hero walked onto
  unrestored vault door (71,13). Ported clear_fcorr+restfakecorr; wire
  um_dist branch and after dig step (D-0378). Not priest pri_move.
- Verification: RNG 13754→13878/13878 (full C log); cursors 279→291/308;
  green+strict PASS; cohort 24/24. Screens still 14/308.
- Next: seed0012 screen/vision after clear_fcorr, or seed0004/0002.

## 2026-07-15 10:28 — D-0377 gd_move dig while-loop (seed0012 @13576)
- Objective: seed0012 @13576 C dog_move rn2(1) vs JS rn2(4).
- C locus: vault.c gd_move nextpos while-loop; find_guard_dest incr_radius;
  um_dist !rn2(10).
- Change: JS gd_move dug only primary step; C redirects wall/corner onto
  west STONE→CORR so hero can follow. Ported while-loop + incr_radius +
  rn2(10) gate (D-0377).
- Verification: mismatch 13576→13700; RNG 13635→13754/13878 cursors
  270→279/308; green+strict PASS; cohort 22/22.
- Next: seed0012 @13700 C move_special rn2(1) vs JS rn2(5).

## 2026-07-15 10:05 — D-0376 bag put-in (seed0012 @13517)
- Objective: seed0012 @13517 C move_special rn2(1) vs JS fleeck rn2(5).
- C locus: pickup.c use_container/in_container/menu_loot/query_category;
  jsmain CR→LF; cmd C('j') rush; symptom shk_move onlineu.
- Change: port put-in coins path (query_putin_category + menu_loot_putin +
  in_container). Root: stubbed 'i' left $\r$\r → LF rush-south → uy+1 →
  missed earlier onlineu home return (D-0376).
- Verification: prefix 13517→13576; RNG 13591→13635 cursors 259→270;
  green+strict PASS; cohort 22/22.
- Next: seed0012 @13576 C dog_move rn2(1) vs JS rn2(4).

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

