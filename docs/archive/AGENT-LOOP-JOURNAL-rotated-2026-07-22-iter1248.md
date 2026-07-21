# Rotated from AGENT-LOOP-JOURNAL.md @#1248

## 2026-07-22 00:22 — #1232 D-0962 conjoined/autodig/boulder

- Objective: map-driven — retire dig `conjoined_pits` + autodig quiet
  + `dighole` boulder-fill under fortress.
- C locus: `trap.c` `conjoined_pits`/`delfloortrap`; `cmd.c`
  `xytodir`; `dig.c` `pick_can_reach`/`use_pick_axe2`/`dighole`.
- Change: port helpers; wire pit reach/debris join/autodig quiet;
  boulder settle-or-KADOOM (retval false) (D-0962). Deferred:
  desecrate_altar/`god_zaps_you`; magical-trap explode; zap_dig
  pitdig; clear_conjoined_pits callers.
- Verification: green+strict PASS; dig/shared cohort 16/16 PASS.
  Suite fortress held (no full cadence; next @#1235).
- Next: desecrate_altar/`god_zaps_you`. Cadence @#1235.
