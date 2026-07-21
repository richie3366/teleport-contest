## 2026-07-21 03:28 — #1095 public score + @89775 early #pray
- Objective: mandatory full `sessions` score (@#1095 % 5 == 0);
  peel seed4500 @89775 gethungry.
- C locus: `eat.c` `gethungry` (symptom); `pray.c` `dopray`
  (JS early); C session Count:20 wait @Dlvl1 Blind.
- Falsified: missing EOT `gethungry` / wrong accessorytime.
  Evidence: JS `dopray` @**89766** `p_type=3`→`uinvulnerable`
  skips `rn2(20)`; C next `#pray` @**90510** (no shimmer).
  Prior doprays 8690/61356/61518 matched C.
- Change: score docs only; DIAG removed; no production JS.
- Verification: green+strict PASS; suite **42/44** Scr
  **10397**/11405 RNG **774444**/792838 (**97.68%**)
  speed `33+0.26/turn`.
- Next: cmd/key desync before @89766 early `#pray` (post
  ^V-teleport / feel-floor / Count:20).
