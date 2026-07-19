# Rotated from AGENT-LOOP-JOURNAL.md (#889)

## 2026-07-19 14:16 — #876 @98492 linedup probes (D-0773)
- Objective: seed0360 @98492 why C skips linedup rn2(3).
- C locus: `mthrowu.c` `linedup`; `vision.c` couldsee; `mkmaze.c` extends.
- Change or falsified theory: no port patch. DIAG: mumak fleeck→linedup
  rn2→post (55,9→55,8); extends FlipY(13)=9 correct (not ymin=0/y=7).
  Probes: skip boulder rn2 (couldsee-true or lined_up-false) → **98502**.
  Do not FORCE.
- Verification: green+strict PASS; seed0360 still **98492**/275.
- Next: C mumak pos / sobj_at(BOULDER,57,9) / blocking_terrain; then
  wizard3 @98502.

## 2026-07-19 14:04 — #875 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score-only; no port patch).
- Change or falsified theory: documented suite aggregates in CURRENT.md.
- Verification: green+strict PASS; full suite **37/44**, Scr **8280**/11405,
  RNG **629134**/792838 (79.35%), speed `38+0.21/turn`. Δ vs #870:
  Scr 0, RNG 0, PASS 0 (flat). seed0360 still @98492.
- Next: @98492 C couldsee(55,9)/does_block vs JS vision block; then wizard3.
## 2026-07-19 14:05 — #874 @98492 fleeck/linedup call-path (D-0773)
- Objective: seed0360 @98492 why C skips linedup rn2(3).
- C locus: `mthrowu.c` `linedup`; `vision.c` couldsee; `monmove.c` fleeck.
- Change or falsified theory: no port patch. DIAG: JS mumak (55,9)
  fleeck@98491 → linedup boulder rn2@98492 → post-fleeck; C @98492 is
  distfleeck (fits post-fleeck after lined_up without rn2). C step368
  has zero linedup rn2(3). viz_clear blocks at ROOM boulder (57,9);
  row10 lava corridor couldsee. Do not FORCE.
- Verification: green+strict PASS; seed0360 still **98492**/275.
- Next: C couldsee(55,9)/does_block vs JS; then wizard3.