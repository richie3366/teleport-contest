## 2026-07-16 15:14 — D-0498 doset fmt + bool defaults
- Objective: primary seed0007 screen peel (Scr 60 with full RNG).
- C locus: `options.c` `doset`/`doset_add_menu` `%-Ns [val]`;
  `optlist.h` On initvals; `optfn_boolean` showexp/time → botl.
- Change: `js/options.js` format_doset_opt_line + DOSET_BOOL_DEFAULT_ON
  + addr fixes; help 4-space indent; showexp/time set flags.botl.
  First miss was mO menu @20 (not post-combat newsym).
- Verification: Scr **60→84**/302; RNG full; green+strict PASS;
  cohort 26/26 PASS.
- Next: @38 showexp/time botl vs message order (D-0499).

