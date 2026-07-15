# Agent loop journal archive (rotated 2026-07-15)

## 2026-07-15 08:24 — D-0372 domove attack before test_move (seed0012 @12439)
- Objective: seed0012 @12439 C gethungry rn2(20) vs JS rn2(5).
- C locus: hack.c domove_core — m_at/domove_attackmon_at before test_move.
- Change: cmd.js domove attacks before closed_door/testdiag/blocksMove
  (D-0372). Hero on DOOR+D_CLOSED; diagonal `b` to hostile was banned.
- Verification: prefix 12439→12489; RNG 12505→12608 cursors 226→227;
  green+strict PASS; cohort 22/22.
- Next: seed0012 @12489 C somex rn2(2) vs JS rn2(5).

