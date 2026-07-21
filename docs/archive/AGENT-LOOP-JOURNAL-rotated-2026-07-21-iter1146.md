# Rotated from AGENT-LOOP-JOURNAL.md @#1146

## 2026-07-21 11:01 — #1133 You-die notdied short-circuit; @107646
- Objective: seed4500 @107645 C getbones missing (keystream).
- C locus: `topl.c` `update_topl` notdied short-circuit; yn Die?.
- Change: C dump @107446 — WIN_STOP+no room never assigns notdied from
  "You die"; #1132 always-clear made yn more() eat Die? key. Match C
  short-circuit in `pline`.
- Verification: green+strict PASS; cohort 6/6; prefix **107645→107646**
  (RNG **107651** Scr **941**).
- Next: @**107646** nhlib.lua shuffle rn2(3) vs rn2(79); cadence @#1135.

## 2026-07-21 10:52 — process: C dump for keystream/more too
- Objective: extend §7 C-dump guidance beyond geometry.
- C locus: n/a (docs); live peel still @107645 NEED_MORE/unmul.
- Change: playbook §7 table + §9; runbook §C.5; agent-notes;
  CURRENT/NOTES next-falsify = C dump at hitmsg@107426 vs unmul.
- Verification: n/a (docs-only).
- Next: loop peels dump C more-state before another WIN_STOP shim.
