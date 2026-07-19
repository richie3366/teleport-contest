## 2026-07-19 21:20 — #909 D-0793 makemon mux/muy = 0
- Objective: seed0360 @112243 Neferet CLOSE / movement peel.
- C locus: `makemon.c` `zeromonst` (mux/muy 0 until `set_apparxy`).
- Change: `js/makemon.js` stop init mux/muy to spawn xy. DIAG: CLOSE
  skip → EOT; FORCE clear+mux=hero matches ~112246; clear-only burns
  Displacement `rn2(4)`.
- Verification: green+strict PASS; cohort 7/7 PASS; seed0360 still
  @112243 / RNG 112272 Scr 391.
- Next: C path clearing Neferet CLOSE with mux at hero (not FORCE).

