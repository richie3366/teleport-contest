# Rotated journal crumbs

## 2026-07-16 12:15 — #535 public score + D-0485 dog_move diagnosis
- Objective: mandatory full `sessions` score (#535); seed0007 @2832 peel.
- C locus: `dogmove.c` `dog_move` ~1255; `mon.c` `mfndpos`.
- Change: docs only — Score **28/44** Scr **5014** RNG **289809**
  (36.55%) `24+0.13/turn`. D-0485 open: JS never hits `j==0` because
  it keeps `(37,17)`; C likely skips that cell → same-dist `rn2(1)`.
  Falsified pool-terrain skip (ROOM). No js/ patch.
- Verification: green+strict PASS; full suite 28/44; rng-diff still 2832.
- Next: prove C skip of `(37,17)` (silent ALLOW_M / mfndpos).

## 2026-07-16 10:35 — D-0485 force-skip confirms omit (37,17)
- Objective: seed0007 @2832 dog_move `rn2(1)` vs JS `distfleeck` (D-0485).
- C locus: `dogmove.c` `dog_move` ~1255; `mon.c` `mfndpos`.
- Change or falsified theory: no production patch. DIAG force-skip of
  cand `(37,17)` extends RNG **2832→2838**. Falsified hero-on-cell /
  JS pool / mon balk. Gate still unknown — do not ship coord skip.
- Verification: green+strict PASS; rng-diff still @2832 after DIAG remove.
- Next: prove C silent omit (mfndpos arm vs dog_move continue).
