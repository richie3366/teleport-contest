## 2026-07-15 07:14 — #390 public score
- Objective: mandatory full `sessions` score (iteration 390 % 5).
- C locus: n/a (score cadence; no port patch).
- Change: none — measured suite only.
- Verification: green+strict PASS; full suite **24/44** Scr **3640**/11405
  (31.92%) RNG **247757**/792838 (31.25%) `19+0.12/turn` (R² 0.80).
  vs #385: same PASS set; RNG matched +3924; Scr unchanged.
- Next: D-0367 C `gg`/`view_from` falsifier (seed0012 @6952).

## 2026-07-15 07:12 — D-0367 dog_goal gg @6952 (diagnosed)
- Objective: seed0012 @6952 C rn2(12) vs JS rn2(1) in dog_move.
- C locus: dogmove.c dog_goal/wantdoor; vision.c view_from.
- Falsified: same-gg approach short-circuit; inject (54,17); skip-only
  (55,17). Established: JS wantdoor gg=(62,16); C arity ≡ gg≈(56,17);
  force → prefix 6965. No code change.
- Verification: green+strict PASS; rng-diff still @6952.
- Next: C gg/view_from capture at this dog_move (D-0367).

