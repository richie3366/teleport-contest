# Rotated journal entries (pre-#894 keep)

## 2026-07-19 15:00 — #881 Wiz-strt (D-0776); @98505→100104
- Objective: seed0360 @98505 nhlib shuffle vs rn2(79) after getbones.
- C locus: `dat/Wiz-strt.lua` via `load_special`.
- Change or falsified theory: falsified wizard3/earth; proto log at
  rngLen 98505 is Wiz-strt. Ported `load_wiz_strt` (+ spare wizard3/earth
  loaders). Prefix **98505→100104**, Scr **275→292**.
- Verification: green+strict PASS; cohort 6/6; seed0360 **100104**/100408
  Scr **292**.
- Next: @100104 Wiz-strt traps get_location vs rnd(4).

## 2026-07-19 14:47 — #880 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score-only; no port patch).
- Change or falsified theory: documented suite aggregates in CURRENT.md.
  Confirmed seed0360 still @98505: C nhlib shuffle rn2(3) vs JS rn2(79).
- Verification: green+strict PASS; full suite **37/44**, Scr **8280**/11405,
  RNG **629155**/792838 (79.35%), speed `36+0.20/turn`. Δ vs #875:
  Scr 0, RNG **+21** (D-0775), PASS 0.
- Next: wizard3 load_special @98505 (nhlib shuffle after getbones).

## 2026-07-19 14:45 — #879 minliquid (D-0775); @98492→98505
- Objective: seed0360 @98492 why C skips linedup rn2(3).
- C locus: `mon.c` `minliquid` / `movemon_singlemon`.
- Change or falsified theory: ported `minliquid` (lava+pool+eel).
  Recorder: C has mumak@(55,9) on LAVAPOOL, same row9 map as JS;
  C spends movement then dies in minliquid (no dochug). Falsified
  couldsee/missing-boulder/DEC-lava@61. Do not FORCE linedup.
- Verification: green+strict PASS; cohort 35/35; seed0360
  **98505**/98528 Scr **275**.
- Next: wizard3 @98505 nhlib shuffle after getbones; then hellfill.

