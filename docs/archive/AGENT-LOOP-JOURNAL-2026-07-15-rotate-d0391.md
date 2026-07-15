# Rotated from AGENT-LOOP-JOURNAL.md

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
