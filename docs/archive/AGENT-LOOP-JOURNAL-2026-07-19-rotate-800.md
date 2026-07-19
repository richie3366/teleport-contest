# Agent loop journal archive (rotated at #800)

## 2026-07-19 00:13 — #784 D-0705 lookaround mon_visible + Wait invis
- Objective: seed0014 @43308 C distfleeck rn2(5) vs JS kick_ouch rn2(2).
- C locus: hack.c lookaround mon_visible; uhitm.c attack_checks Wait!.
- Cause: JS lookaround assumed all mons seen → ended H run on invisible
  bugbear; yank never More'd; walk-in meleed instead of Wait!.
- Rejected: flush_topl_more before every parse get_count (broke green).
- Change: js/cmd.js lookaround mon_visible+M_AP; js/uhitm.js Wait!.
- Verification: green+strict PASS; prefix 43308→43341 Scr 575; cohort
  12/12 PASS.
- Next: seed0014 @43341 maybe_kick/gethungry vs kick_ouch stub.
