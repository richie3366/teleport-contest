## 2026-07-19 20:25 — #906 D-0790 mux-image m_move_aggress
- Objective: seed0360 @110880; port C post-select no-place.
- C locus: `monmove.c` `m_move` post-select + `m_move_aggress`.
- Change: track `chi`; `ALLOW_U`→mux; `nix==mux`→`m_move_aggress`
  (empty Displacement image → DONE). @110612 was aftermath of earlier
  mux-image walks JS placed.
- Verification: green+strict PASS; cohort 13/13 PASS; seed0360
  **110880→112243**, focused RNG **112272**, Scr **391**.
- Next: @112243 C distfleeck rn2(5) vs JS rn2(12).

