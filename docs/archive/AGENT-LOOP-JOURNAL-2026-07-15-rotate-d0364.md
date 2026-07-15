## 2026-07-15 02:30 — #370 score + D-0349 tutorial yes-path
- Objective: mandatory full `sessions` score; seed0009 Entering `--More--`.
- C locus: `allmain.c` `maybe_do_tutorial`; `do.c` `schedule_goto`/
  `deferred_goto`/`goto_level` `pickup(1)`; `mklev.c` `Is_special`→
  `makemaz("tut-1")`.
- Change: schedule/deferred + tut-1 map skeleton + nofollowers keepdogs
  (D-0349). Rejected bare pline without deferred_goto.
- Verification: full suite **23/44** Scr **3565** RNG **240160**;
  seed0009 Scr **13→14**; green+strict; cohort descend/0107 PASS.
- Next: finish `load_tut1` des.* so @14 map cells match (133 misses).
