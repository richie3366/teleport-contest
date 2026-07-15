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

## 2026-07-15 14:52 — #423 gd_move_cleanup Suddenly (D-0397)
- Objective: seed0012 @307 Suddenly, the guard disappears.--More--.
- C locus: vault.c gd_move_cleanup/parkguard; gd_move !u_in_vault
  look-around; do_name.c noit_mon_nam.
- Change: parkguard + gd_move_cleanup; look-around → gddone cleanup;
  early/begone → cleanup; flush_topl_more after Suddenly pline.
- Verification: seed0012 Scr **307→308**/308 PASS; green+strict PASS;
  cohort **25/25** PASS. Score **25/44**.
- Next: seed0004 / seed0002 shared blockers.

## 2026-07-15 14:40 — #422 drop gold botl + Move along! (D-0396)
- Objective: seed0012 screens after @284 (NOTES said @294 Move along!).
- C locus: invent.c freeinv_core COIN_CLASS botl; vault.c gd_move
  um_dist verbalize Move along!; monmove awaits gd_move.
- Change: do.js freeinv_drop gold `_goldCount`+flags.botl; vault.js
  async gd_move + await verbalize; monmove/shk await. Named omission:
  gd_move_cleanup Suddenly disappears.
- Verification: seed0012 Scr **284→307**/308; @307 sole miss Suddenly;
  green+strict PASS; cohort **22/22** PASS.
- Next: vault.c gd_move_cleanup / Suddenly, the guard disappears.

## 2026-07-15 14:32 — #421 doname containing + cknown (D-0395)
- Objective: seed0012 @278 bag `containing 1 item`.
- C locus: objnam.c doname_base containing; invent.c count_contents;
  pickup.c use_container containerdone cknown when used.
- Change: doname suffix; invent count_contents (shoppy deferred);
  use_container sets cknown after successful put-in/loot.
- Verification: seed0012 Scr **283→284**/308; @278 match; green+strict
  PASS; cohort PASS. Next fail @294 `"Move along!"`.
- Next: vault guard escort pline after gold drop.

## 2026-07-15 14:25 — #420 score + bag put-in MENU_FULL (D-0394)
- Objective: mandatory full `sessions` score (#420÷5); seed0012 @259 bag
  empty prompt.
- C locus: pickup.c use_container outmaybe/yname; query_category MENU_FULL;
  invent.c addinv pickup_prev; objnam.c yname / shk_your.
- Change: outmaybe+carried yname; MENU_FULL put-in categories; pickup_prev
  + reset_justpicked; INVORDER class-heading ATR_INVERSE.
- Verification: full sessions **24/44**, Scr **3953**/11405,
  RNG **255082**/792838, `21+0.12/turn`; seed0012 **275→283**/308;
  green+strict PASS; cohort smoke PASS.
- Next: seed0012 @278 doname `containing N item`.

## 2026-07-15 14:15 — #419 teleds materialize + gold botl (D-0393)
- Objective: seed0012 @237 C materialize `--More--` vs JS blank / $:7.
- C locus: teleport.c teleds TELEDS_TELEPORT+verbose You + spoteffects;
  pickup.c pickup_object disp.botl before gold prinv.
- Change: async teleds/vault_tele materialize pline + spoteffects;
  gold flags.botl so flush paints $:307 before deferred more().
- Verification: seed0012 Scr **268→275**/308; @237–258 match; first fail
  @259 bag prompt; green+strict PASS; cohort 24/24 PASS.
- Next: seed0012 @259 empty-bag apply prompt order.

## 2026-07-15 14:08 — #418 stop_occupation counted Ns (D-0392)
- Objective: seed0012 @226 C `You stop searching.` vs JS blank.
- C locus: allmain.c stop_occupation + occupation monster_nearby;
  monmove.c dochugw; cmd.c set_occupation(dosearch,"searching").
- Change: ported stop_occupation; timed set_occupation for counted `s`;
  dochugw + occupation-path interrupt (was deferred / `_repeat_search`).
- Verification: seed0012 Scr **259→268**/308; @226–234 match; first fail
  @237 materialize `--More--`; green+strict PASS; cohort 22/22 PASS.
- Next: seed0012 @237 teleport/materialize pline.

## 2026-07-15 14:05 — #417 parse/get_count digit clear (D-0391)
- Objective: seed0012 @221 dust topline blank after `9` of `9s`.
- C locus: cmd.c parse/get_count; clear_nhwindow(WIN_MESSAGE) once after
  command key (not between digits).
- Change: falsified wipeout/`read_engr_at` — engraving already matched
  @220; JS rhack cleared pending on every key. Ported get_count +
  clear_nhwindow_message.
- Verification: seed0012 Scr **257→259**/308; @220–222 match; first fail
  @226 `You stop searching.`; green+strict PASS; cohort 24/24 PASS.
- Next: seed0012 @226 counted-search stop pline / continue_search.

## 2026-07-15 13:48 — #416 getpos auto_describe TER_DETECT (D-0390)
- Objective: seed0012 @140 tip stuck vs C `unexplored area`.
- C locus: getpos.c auto_describe/getpos msg_given; pager.c lookat;
  do_name.c x_monnam isshk→shkname via distant_monnam.
- Change: getpos auto_describe on display glyphs (blank/mimic/mon);
  distant_monnam_none shopkeeper shkname.
- Verification: seed0012 Scr **244→257**/308; @140–153 match; first fail
  @221 dust engraving; green+strict PASS; cohort 24/24 PASS.
- Next: seed0012 @221 `read_engr_at` wipeout garbled dust text.

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

