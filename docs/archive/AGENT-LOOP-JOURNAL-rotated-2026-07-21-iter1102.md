# Rotated from AGENT-LOOP-JOURNAL.md

## 2026-07-21 02:24 — #1088 D-0928 FlipX sum80 probes (kelp940)
- Objective: seed4500 medusa-3 hero place (D-0928).
- C locus: `sp_lev.c` `flip_level`/`get_level_extends`; `mklev.c`
  `water_has_kelp`; `dat/medusa-3.lua`.
- Falsified: FORCE maxx78/minx1 (kelpW 940→959, place @82419);
  coords-only FlipX (@80989); stone78-clear (land `(42,6)` then
  @83695). Evidence: C kelp count **940**; need last=77 at flip
  without losing edge water. No production JS.
- Verification: green+strict PASS; rng-diff baseline @88377.
- Next: C-cited last=77 ∧ kelp940 ∧ keep edge water; cadence @#1090.

## 2026-07-21 02:33 — #1089 D-0928 exclude78/restore falsified
- Objective: seed4500 medusa-3 hero place (D-0928).
- C locus: `sp_lev.c` `flip_level`/`get_level_extends`; `monmove.c`
  `m_move`; `dat/medusa-3.lua`.
- Falsified: exclude78 (minx=3,maxx=77 keep w78) and stone78_restore
  — both land `(42,6)`/kelp940 then **@82639**; worse than stone78
  **@83695**. @83695 is not missing col78 water. Preflip col78 =
  20×MOAT, mons/objs/traps 0. No production JS.
- Verification: green+strict PASS; rng-diff baseline @88377.
- Next: C-cited last=77; stone78@83695 rn2(28) vs rn2(32); cadence @#1090.

