## 2026-07-21 06:45 — #1115 mfind0 + wizwhere (score cadence)
- Objective: public score @#1115; seed4500 @104217 exercise peel.
- C locus: `detect.c` `mfind0`; `dungeon.c` `print_dungeon(FALSE)`; `wizcmds.c` `wiz_where`.
- Change: port `mfind0` (search find-unseen → exercise); wire `#wizwhere` text pages so pager `s` does not leak into rhack.
- Verification: suite **42/44** Scr **10516**/11405 RNG **788815**/792838 (99.49%) `31+0.24/turn`; prefix **104217→104241** (runner **104252** Scr **926**); green+strict PASS; cohort 5/5.
- Next: @**104241** C fleeck vs JS `rn2(20)`.
