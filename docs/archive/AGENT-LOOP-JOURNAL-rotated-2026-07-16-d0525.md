# Rotated from AGENT-LOOP-JOURNAL.md (#583 / D-0525)

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
