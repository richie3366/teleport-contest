# Rotated from AGENT-LOOP-JOURNAL.md (#1019)

## 2026-07-20 15:28 — #1005 full public score refresh
- Objective: mandatory score (iteration % 5 == 0).
- C locus: n/a (docs-only score cadence).
- Change: full `sessions` → **39/44** PASS; Scr **9021**/11405;
  RNG **666643**/792838 (84.08%); speed `33+0.23/turn` (R² 0.825).
  Δ vs #1000: Scr +10, RNG 0, PASS +1 (seed0383). Non-PASS unchanged
  (0014/0399/2200/2600/4500).
- Verification: green+strict PASS; full suite `__RESULTS_JSON__`.
- Next: seed0399 @10157 needs C-state which 2 mfndpos cells (D-0731);
  or D-0708; next score @#1010.

## 2026-07-20 15:25 — #1004 unicorn noteleport_level + D-0731 DIAG
- Objective: seed0399 @10157 mfndpos cnt7vs5 (D-0731).
- C locus: teleport.c noteleport_level; mon.c mon_allowflags;
  monmove.c m_move avoid / dochug mflee tele.
- Diagnosis: unicorn @58,12 open ROOM; spider excludes 1; FORCE any
  keep-track 2-omit →10217 (WEB not unique); next namedesc rn2(31)
  vs rn2(181). No JS-visible reason for which 2 C drops.
- Change: D-0859 wire noteleport_level (C fidelity; inert on maze).
- Verification: green+strict PASS; cohort 0383/0398/1500/1800 PASS;
  seed0399 still @10157.
- Next: C-state which 2 mfndpos cells; or D-0708; score @#1005.
