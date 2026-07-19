## 2026-07-19 16:10 — #887 seed0360 bat mfndpos DIAG confirm (D-0779)
- Objective: seed0360 @100738 C vs JS vampire bat mfndpos cnt / terrain.
- C locus: `monmove.c:1871/:1970` `m_move`; `mon.c` `mfndpos`; Wiz-strt.
- Change or falsified theory: no production patch. Live JS DIAG @100733
  confirms cnt=4, HWALL typ=2 @(33–35,3), quasit@(34,1); C chcnt through
  rn2(7); FORCE→100804. Recorder rebuild for C typ incomplete.
- Verification: green+strict PASS; seed0360 still @100738; DIAG/FORCE gone.
- Next: C `levl[33..35][3].typ` via working recorder (D-0779).
