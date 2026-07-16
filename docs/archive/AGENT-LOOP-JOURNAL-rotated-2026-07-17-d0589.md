# Rotated from AGENT-LOOP-JOURNAL (#657 handoff)

## 2026-07-17 00:06 — #643 D-0578 bones utrack / gettrack
- Objective: seed5006 seg1 @2782 `m_move` rn2(16) vs rn2(28).
- C locus: save.c save_track; restore.c rest_track; track.c gettrack;
  monmove.c m_move gg from gettrack.
- Change: bones persist/restore utrack; drop post-mklev initrack wipe.
  C dest (30,5) via grave gettrack — not (32,4) hero-aim.
- Verification: seed5006 RNG **FULL** Scr **217**/249; green+strict
  PASS; cohort **31**/31 PASS.
- Next: seed5006 Scr residual; or seed0116 Scr 114/127.

## 2026-07-16 23:52 — #642 D-0578 kitten first-dest / track shape
- Objective: seed5006 seg1 @2782 `m_move` rn2(16) vs rn2(28).
- C locus: monmove.c m_move:1963; mon.c mfndpos.
- Falsified: empty-ROOM trap/obj/Elbereth; gettrack; shortsighted;
  loot gg; dest=(32,5)→rn2(20). New: JS @(32,4) emits rn2(28)+rn2(24);
  C @2782 one rn2(16); C @2800–2801 is 28+24 (JS shape, next turn).
- Verification: green+strict PASS; seed5006 still 13814/13923 Scr 192.
- Next: prove C first-move dest (gg/poss/appr); or seed0116.
