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

## 2026-07-16 16:58 — #576 D-0518 print_dungeon(TRUE)
- Objective: shared `^V?` getbones blocker (seed0116 @6373 / seed0373 @2549).
- C locus: `dungeon.c` `print_dungeon`/`tport_menu`/`print_branch`;
  `teleport.c` `level_tele` levTport_menu force_dest.
- Change: bymenu PICK_ONE menu + `?`/menu_requested → force_dest
  `schedule_goto`; export `select_menu_pick_one`.
- Verification: seed0116 **6373→6383** (getbones+); seed0373
  **2549→2550**; Scr unchanged; green+strict; cohort **30/30**.
  seed5006 still @8468.
- Next: quest/`makemaz` special (0373/0116) or seed5006 `dosounds`.

## 2026-07-16 16:53 — #575 formal public score
- Objective: mandatory full `sessions` (#575÷5).
- Measured: **30/44** PASS; Scr **5895**/11405; RNG
  **314432**/792838 (39.66%); speed `26+0.14/turn` (R² 0.79).
- Δ vs #570: Scr +375, RNG +10941, PASS +1 (seed0398 formal).
- Notable non-PASS: seed0116 6373/107; seed5006 8507/121;
  seed0373 2578/20; seed2200 229/230 parked.
- Green+strict PASS. No port code this iteration.
- Next: shared `print_dungeon` (`^V?` / seed0373 / seed0116 @6373)
  or seed5006 `dosounds`.

## 2026-07-16 16:51 — #574 D-0517 wizard Force + pleased
- Objective: seed0116 @6246 C wipe rn2(70) vs JS gethungry rn2(20).
- C locus: `pray.c` dopray Force; `eat.c` gethungry uinvulnerable;
  `pray.c` pleased.
- Change: Force yn → p_type 3 + uinvulnerable; pleased You_feel/rn1/rnz(350).
- Verification: seed0116 **6246→6373** Scr **101→107**/127;
  green+strict; cohort **30/30**. seed5006 still @8468.
- Next: seed0116 @6373 getbones / `print_dungeon` `^V?` /
  seed0373 / seed5006 dosounds.

## 2026-07-16 16:42 — #573 D-0516 zap_dig WAN_DIGGING
- Objective: seed0116 @5910 C `zap_dig` rn1(18,8) vs JS rn2(5).
- C locus: `zap.c` `weffects`; `dig.c` `zap_dig`.
- Change: `zap_dig` horizontal beam + door/maze/obstructed dig;
  `weffects` dig dispatch.
- Verification: seed0116 **5910→6246** Scr **79→101**/127;
  green+strict; cohort **30/30**. seed5006 still @8468.
- Next: seed0116 @6246 moveloop / seed5006 `dosounds` /
  seed0373 `print_dungeon`.

## 2026-07-16 16:40 — #572 D-0515 ^V level_tele numeric
- Objective: near-miss survey — shared getbones blockers.
- C locus: `cmd.c` wizlevelport; `wizcmds.c` `wiz_level_tele`;
  `teleport.c` `level_tele`; `dungeon.c` `get_level`; `allmain.c`
  `deferred_goto` after rhack.
- Change: bind `^V`; wizard getlin numeric → `get_level` →
  `schedule_goto`; moveloop `deferred_goto`.
- Verification: seed0116 **2978→5910** Scr **9→79**; seed5006
  **4182→8468** Scr **4→121**; green+strict; cohort **28/28**.
  seed0373 still @2549 (`print_dungeon` `?`). Suite survey **30/44**.
- Next: seed0116 `zap_dig` / seed5006 `dosounds` / seed0373 menu.

## 2026-07-16 16:35 — #571 D-0513/D-0514 seed0398 PASS
- Objective: seed0398 @48 shudder + remaining end screens.
- C locus: `zap.c` `zapwrapup`; `end.c` `done2` Dump core / stopprint;
  `topten.c` wizard early-exit; `really_done` trailing raw blanks.
- Change: `You_feel` shudder; wizard `Dump core?` ynq; skip rip on
  stopprint; wizard topten msg; `raw_print_blanks(2)`; GameDisplay
  `getCursor`.
- Verification: seed0398 **87/87 PASS**; green+strict; cohort **28/28**.
- Next: near-miss survey / LB gap; suite refresh @#575.

## 2026-07-16 16:30 — #570 score + D-0512 !verbose drop topline
- Mandatory full `sessions` (#570÷5): **29/44**, Scr **5520**/11405,
  RNG **303491**/792838 (38.28%), `27+0.12/turn`. Δ vs #565 Scr +224.
- Objective: seed0398 @28 blank vs C drop getobj leftover.
- C: `getobj`→`yn_function` leaves toplines; `!verbose` silent `drop`;
  `parse` `clear_nhwindow(WIN_MESSAGE)`; cursor on hero for leftovers.
- Fix: `getobj_drop` via `yn_function` + `mark_topline_prompt`;
  `clear_nhwindow_message` clears pending; drop getobj cursor steal
  from `flush_screen`.
- Verify: seed0398 Scr **77→83**/87; green+strict; cohort **27/27**;
  full suite still **29/44**.
- Next: @48 `You feel shuddering vibrations.`

## 2026-07-16 16:21 — #569 D-0511 set_playmode plname wizard
- Objective: seed0398 first-cell screen (Scr 0/87, RNG full)
- C: `options.c` `set_playmode` → `strcpy(plname,"wizard")` when
  wizard; unixmain calls before plnamesuffix. JS `setup_role_race_from_rc`
  re-applied `OPTIONS=name` after that.
- Fix: `js/options.js` `set_playmode`; `jsmain` call after rc flags;
  drop `u_init` plname rewrite from opts.name.
- Verify: seed0398 Scr **0→77**/87; green+strict PASS; cohort **27/27**
  PASS. First remaining miss @28 blank drop getobj topline.
- Next: seed0398 @28 `What do you want to drop?` capture/paint

## 2026-07-16 16:17 — #568 D-0510 wizgenesis create_particular
- Objective: seed0398 @2960 C collect_coords rn2(8) vs JS rnl(20)
- C: `wizcmds.c` wiz_genesis → `read.c` create_particular →
  makemon(MM_NOEXCLAM) → enexto/collect_coords
- Fix: EXT_CMDS `#wizgenesis` + `create_particular` named path;
  `^G` wired. Missing runner made `jackal` keys hit apply/rnl(20).
- Verify: seed0398 RNG **2960→3026**/3026 full; Scr still 0/87;
  green+strict PASS; cohort **29/29** PASS
- Next: seed0398 first-cell screen peel

## 2026-07-16 16:12 — #567 D-0509 IMMEDIATE poly bhit
- Objective: seed0398 @2852 C weffects rn2(8) vs JS rn2(5)
- C: `zap.c` IMMEDIATE `bhit(rn1(8,6))` + `bhito` WAN_POLYMORPH;
  `learnwand`→`makeknown`→`exercise` on seen shudder
- Fix: `js/zap.js` bhit/bhito/poly_obj; learnwand→makeknown;
  `js/mkobj.js` replace_object floor + oc_merge_of export
- Verify: seed0398 RNG **2853→2960**/3026 (prefix 2852→2960);
  green+strict PASS; cohort **27/27** PASS
- Next: @2960 C `collect_coords` rn2(8) vs JS rnl(20)
