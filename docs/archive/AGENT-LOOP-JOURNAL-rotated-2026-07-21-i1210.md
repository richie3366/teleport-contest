# Rotated from AGENT-LOOP-JOURNAL.md @#1210

## 2026-07-21 19:24 — D-0934 recorder get_configfile (§1.2)

- Objective: human carve-out — seed2200 path otherwise impossible.
- C locus: `cfgfiles.c` `get_configfile`; CONSTITUTION §1.2 / §5.4.
- Change: §1.2 exception + cursor rule; `options.js` default =
  contest-recorder absolute path (D-0934).
- Verification: seed2200 Scr **230**/230; green+strict PASS.
- Next: LB cron D-0930…D-0934; suite confirm @**#1200**.

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

