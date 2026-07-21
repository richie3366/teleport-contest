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
## YYYY-MM-DD HH:MM — #NNNN short title

- Objective: …
- C locus: …
- Change: …
- Verification: …
- Next: …
```

## 2026-07-21 19:16 — #1199 NHW_TEXT paint cols−1

- Objective: seed2200 @158 path cells without hardcoding `$HOME`.
- C locus: `wintty.c` `process_text_window` `++curx < cols` after
  `tty_curs(1,n)` (curx 0-based 0) → ≤cols−1 glyphs.
- Change: `pager.js` `show_text_pages` + fullscreen `show_nhw_menu_text`
  paint bound `cols-1` (D-0933). Falsified judge RC elision; keep
  synthetic `get_configfile`; re-park recording path string.
- Verification: green+strict PASS; NHW_TEXT cohort 12/12; seed2200
  still **229**/230; temp recording path + D-0933 → **230**/230
  (reverted).
- Next: LB gap await cron D-0930…D-0933; cadence @**#1200**.

## 2026-07-21 19:05 — unpark seed2200 @158

- Objective: human unpark — sole local miss was being skipped.
- C locus: `cfgfiles.c` `get_configfile`; `options.c` `option_help`.
- Change: docs only — CURRENT primary = seed2200 Scr 230;
  NOTES hypothesis + no-hardcode constraint; D-0006 stays parked.
- Verification: n/a (policy); seed2200 still 229/230 until peel.
- Next: `node frozen/ps_test_runner.mjs sessions/seed2200-wizard-quaff-zap-read.session.json`
  — close path-cell miss without baking recording `$HOME`.

## 2026-07-21 19:02 — #1198 serialize leading bold spaces

- Objective: leaderboard gap — seed0030 strict `aC2_aJ0` after D-0931.
- C locus: `topten.c` `topten_print_bold` → `raw_print_bold` /
  `putstr(..., ATR_BOLD, …)`; bold covers rank pad `"  1"`.
- Change: `serialize_for_scoring` firstCol keep `attr&0x7`
  (inv|bold|uline) so leading bold pads emit under SGR (D-0932).
- Verification: green+strict PASS; seed0030 strict space **0**;
  seed0373 still 0; gap cohort 13/13.
- Next: await LB cron PASS lift.

## 2026-07-21 18:56 — #1197 S_air flush + mid-row space CUF

- Objective: leaderboard gap — seed0373 strict `sp_C6_J8` after D-0930.
- C locus: `display.c` `back_to_glyph` AIR → `S_air`; `defsym.h`
  CLR_CYAN; contest tty mid-row space runs >4 → CSI CUF.
- Change: `_buildScreenOutput` paints set `disp_ch` spaces (incl. AIR);
  `serialize_for_scoring` mid-row same-color space runs >4 → SGR+CUF
  (D-0931; D-0930 gray coerce kept).
- Verification: green+strict PASS; seed0373 strict space **0**; gap
  cohort 12/12 + shared 6/6; seed0013/4500/0007 PASS.
- Next: await LB cron; seed0030 bold-bleed residual deferred.

## 2026-07-21 18:44 — #1196 serialize CLR_GRAY blanks → NO_COLOR

- Objective: leaderboard 32-vs-43 gap — judge cell-only fails on
  full-RNG local-PASS sessions (D-0480 class).
- C locus: `wintty.c` tty ANSI_DEFAULT / empty gray hilite → default
  fg; frozen Terminal clear leaves CLR_GRAY.
- Change: `display.js` `serialize_for_scoring` coerce space+attr0+
  CLR_GRAY → NO_COLOR only (D-0930; no glyph tty_map_color).
- Verification: green+strict PASS; gap cohort 0002/0004/0007/0012/
  0013/0014/0030/0360/0373/0383/0399/4500 PASS; seed0007 j37
  **7080→0**; seed0360/0399 strict SGR clean; seed2200 parked.
- Next: await judge cron (expect public PASS lift); seed0373 cyan
  space leftovers / seed0030 bold-bleed deferred.

## 2026-07-21 18:36 — #1195 public score cadence

- Objective: cadence full `sessions` (iteration % 5 == 0).
- C locus: n/a (score-only; no port patch).
- Change: docs only — CURRENT Score + NOTES + D-0928 suite confirm.
- Verification: green+strict PASS; full suite **43**/44 Scr
  **11404**/11405 RNG **792838**/792838 (100%); speed
  `31+0.26/turn`; seed4500 **PASS** Scr **1814**/1814; seed2200
  sole miss 229/230 parked.
- Next: leaderboard 22-vs-43 gap; next cadence @**#1200**.

## 2026-07-21 18:35 — #1194 ^X rank==role + eaten_stat

- Objective: seed4500 @1808 C `Knight, level 15 male human` +
  `(1 of 3)` vs JS `a level … Knight` + `(1 of 2)`.
- C locus: `insight.c` `background_enlightenment` `!strcmpi(rank,role)`;
  status Punished/Wounded_legs; attributes Jumping/umortality;
  `mkobj.c`/`eat.c` `weight`→`eaten_stat`.
- Change: `invent.js` role/rank clause + status/attr lines;
  `mkobj.js` FOOD/CORPSE `oeaten` `eaten_stat` (D-0928 #1194).
- Verification: green+strict PASS; cohort 10/10; seed4500 **PASS**
  Scr **1812→1814**.
- Next: leaderboard gap; cadence @**#1195** suite Scr reconfirm.

## 2026-07-21 18:20 — #1193 Kni goal_first / goal_next

- Objective: seed4500 @1799 C swamp-exit hole NHW_TEXT vs JS heat/smoke.
- C locus: `dat/quest.lua` Kni `goal_first`; `quest.c` `on_goal` →
  `qt_pager("goal_first")` before `temperature_change_msg`.
- Change: `questpgr.js` add Kni `goal_first`/`goal_next` from quest.lua
  (D-0928 #1193).
- Verification: green+strict PASS; cohort 7/7; focused Scr
  **1807→1812**; first miss **@1799→@1808**.
- Next: @**1808** ^X `background_enlightenment` rank==role branch.

## 2026-07-21 18:12 — #1192 cmd_safety iflags.cmdassist

- Objective: seed4500 @1770 C short waiting-hit tip vs JS blank.
- C locus: `do.c` `cmd_safety_prevention` — `iflags.cmdassist ||
  !(*flagcounter)++` (seed toggled cmdassist off via Options `j`).
- Change: `do.js` read `iflags.cmdassist` (default On), not
  `flags.cmdassist` (D-0928 #1192).
- Verification: green+strict PASS; cohort 7/7; focused Scr
  **1803→1807**; first miss **@1770→@1799**.
- Next: @**1799** C swamp-exit hole pline vs JS heat/smoke More.
