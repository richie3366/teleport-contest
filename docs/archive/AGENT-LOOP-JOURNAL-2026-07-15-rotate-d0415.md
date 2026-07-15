## 2026-07-15 15:50 — #431 seed0004 @9795 dog_goal IS_ROOM (D-0405)
- Objective: seed0004 @9795 PRIMARY — C `dog_move` `rn2(16)` vs JS `rn2(4)`.
- C locus: dogmove.c dog_goal `!IS_ROOM || !rn2(4)` (~575); dog_move mtrack
  (~1250).
- Falsified: mtrack `MTSZ*(k-j)` arity. DIAG: JS hero stuck ROOM `(40,5)`
  rolls `rn2(4)`; C already DOOR/CORR after `n`/`n`/`l` skips it → mtrack
  `rn2(16)`. Post-2nd `,` pickup, rhack sees `n` only @9816 (mid-monster).
- Verification: green+strict PASS; no js/ change; seed0004 still @9795.
- Next: key ownership after pickup (steps 240–250) before dog_goal peel.

