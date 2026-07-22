# Archived from AGENT-LOOP-JOURNAL.md

## 2026-07-22 04:45 — #1267 D-0997 statue trap + Blind kick feel

**Objective:** map-driven — STATUE_TRAP activate / Blind feel cluster
(CURRENT next after D-0996).
**C locus:** `trap.c` animate_statue/activate_statue_trap/
trapeffect_statue_trap; `dokick.c` kick_dumb/ouch/door/really_kick;
`zap.c` break_statue; `detect.c` dosearch0.
**Change:** port animate_statue + activate_statue_trap; wire Blind
feel_location/feel_newsym/wake_nearto + kick STATUE_TRAP; break_statue
shatter-activate + historic guilt; dosearch0/dotrap; export
montraits/cant_revive — D-0997.
**Verified:** green+strict PASS; kick/search cohort **10**/10
(incl. seed0060). Rule #2: no fs.
**Next:** potion/scroll/vault thin; or dopay appease; or apply camera.
**Blocked:** none.
