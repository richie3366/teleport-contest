# Rotated from AGENT-LOOP-JOURNAL.md (#966 / D-0837)

## 2026-07-20 04:05 — #952 D-0828 dmonsfree / mondead keep-fmon
- Objective: seed0383 @10374 — mid-pass gnome skip vs fleeck order.
- C locus: `mon.c` `m_detach` + `dmonsfree`.
- Change: dead stay on `fmon` until `dmonsfree` in `movemon`. Falsified
  waitmask skip and dead-between-EE-vortex as @10374 cause. Refined:
  C vortex before gnome@46,2 (JS reverse). Prefix still **10374**.
- Verification: green+strict PASS; cohort 7/7.
- Next: earlier makemon/reorder for 165 vs 108.

## 2026-07-20 03:36 — #951 D-0827 mattacku uswallow only-ustuck
- Objective: seed0383 @10374 — C skips gnome dochug / fmon order.
- C locus: `mhitu.c` `mattacku` uswallow→only `u.ustuck`.
- Change: port that early-out. Falsified EOT fmon-order hyp (both
  `156,165,108` + matching mcalcmove). Prefix still **10374**; RNG
  matched **10724→10762**.
- Verification: green+strict PASS; cohort 7/7.
- Next: mid-pass gnome skip gate (not EOT order).

## 2026-07-20 03:16 — #950 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score-only; no port patch).
- Change: refresh CURRENT Score from `__RESULTS_JSON__`.
- Verification: green+strict PASS; suite **38/44**; Scr **8938**/11405;
  RNG **660393**/792838 (83.29%); speed `36+0.22/turn`. Δ vs #945:
  Scr +1, RNG +627, PASS 0. seed0383 Scr 142, RNG 10724 (−159).
- Next: seed0383 @10374 — C gnome skip / fmon order (NOTES hyp).
