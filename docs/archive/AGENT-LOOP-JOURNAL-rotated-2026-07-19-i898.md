# Rotated from AGENT-LOOP-JOURNAL.md (#898)

## 2026-07-19 15:35 — #884 seed0360 @100738 bat mfndpos HWALL (D-0779)
- Objective: @100738 C rn2(6) vs JS rn2(5) m_move chcnt.
- C locus: `monmove.c:1970` / `mon.c` `mfndpos`; Wiz-strt post-FlipY.
- Change or falsified theory: Not a generic chcnt off-by-one. Vampire
  bat@(34,2) JS cnt=4 vs C≥7; rejects HWALL@(33–35,3)+quasit@(34,1).
  Matched `rn2(5)` was JS distfleeck vs C still in chcnt. FORCE-open
  those 3 walls → prefix **100738→100804**. No production patch;
  next is why C sees walkable terrain there.
- Verification: green+strict PASS; focused FAIL @100738; experiment only.
- Next: Wiz-strt terrain at post-FlipY (33–35,3) vs C (D-0779).

