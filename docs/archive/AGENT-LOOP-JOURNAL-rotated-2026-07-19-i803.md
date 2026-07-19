# Rotated from AGENT-LOOP-JOURNAL.md (#803)

## 2026-07-19 00:52 — #787 D-0708 mfndpos cnt (diagnose)
- Objective: seed0014 @49039 C `distfleeck` `rn2(5)` vs JS `rn2(6)`.
- C locus: `monmove.c` `m_move`/`mfndpos` (not `distfleeck` body).
- Falsified: distfleeck arity; single-flank corners (@3061); squeeze/gas
  on `(22,10)`. Real: peaceful gnome `mfndpos` cnt 6 vs C 5.
- Verification: green PASS; no code change. Drop-any →49300 experiment.
- Next: which neighbor C omits + C predicate; or travel/map shared blocker.

## 2026-07-19 — #797 seed0108 #invoke (D-0715)
- Objective: seed0108 @2958 distfleeck vs rn2(36) (CURRENT primary).
- C locus: `artifact.c` `doinvoke`/`arti_invoke`; `cmd.c` `"invoke"`.
- Change: EXT_CMDS `#invoke`→`doinvoke`; Mjollnir !inv_prop →
  nothing_happens+ECMD_TIME; `rest_on_space` space→donull branch.
  Falsified: force ROS=true (@2869 More regression).
- Verification: green+strict PASS; seed0108 **2958→3011**; cohort 33/33.
- Next: @3011 post-invoke spaces before chest wish (More vs wait).

