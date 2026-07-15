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

## 2026-07-15 13:40 — #415 score + cls clear_glyph_buffer (D-0389)
- Objective: mandatory full `sessions` score; seed0012 @138 detect More map.
- C locus: display.c cls → clear_glyph_buffer; detect.c monster_detect.
- Change: JS cls only cleared Terminal; ported clear_glyph_buffer on
  loc.disp_* so sense --More-- shows blank map + mons/@.
- Verification: full sessions **24/44**, Scr **3914**/11405 RNG
  **255082**/792838; seed0012 Scr **240→244**; first fail @140; green+
  strict PASS; cohort 22/22 PASS.
- Next: seed0012 @140 TER_DETECT autodescribe `unexplored area`.

## 2026-07-15 13:35 — #414 prinv total_of gold (D-0388)
- Objective: seed0012 @98/99 `$ - 5 gold pieces (7 in total).`
- C locus: invent.c prinv total_of + xprname quan; pickup.c pickup_prinv.
- Change: JS ignored lift count after gold merge; ported prinv `(N in
  total)` + xprname quan override; pickup_prinv/hold/out_container pass
  pre-merge count.
- Verification: Scr **239→240**/308; @99 match; green+strict PASS;
  cohort 24/24 PASS.
- Next: seed0012 @138 monster-sense More map blanking.

## 2026-07-15 13:32 — #413 autopick check_here (D-0387)
- Objective: seed0012 @75 `You see here a statue of a newt.`
- C locus: pickup.c pickup — after autopick, `check_here(n_picked>0)`.
- Change: JS `pickup` always called check_here only when `!flags.pickup`;
  ported post-autopick check_here + run nomul. Filtered pickup_types left
  statue/sling on floor; look_here was already correct.
- Verification: Scr **236→239**/308; @75/@79 match; green+strict PASS;
  cohort 22/22 PASS.
- Next: seed0012 @98 `$ - 5 gold pieces (7 in total).`

## 2026-07-15 13:26 — #412 hilite_pile ATR_INVERSE (D-0386)
- Objective: seed0012 @70 post-Options map — hypothesized DEC vs Unicode.
- C locus: display.h obj_is_piletop; wintty.c tty_print_glyph MG_OBJPILE
  + hilite_pile + use_inverse → ATR_INVERSE.
- Change: falsified DEC theory (Options `f` toggled hilite_pile); ported
  piletop attr through map_location/newsym + remembered redraw.
- Verification: Scr **199→236**/308; green+strict PASS; cohort 24/24.
- Next: seed0012 @75 `You see here a statue of a newt.`

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

