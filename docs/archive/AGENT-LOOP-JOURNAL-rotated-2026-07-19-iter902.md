## 2026-07-19 16:28 — #888 seed0360 C typ dump falsifies HWALL (D-0779)
- Objective: seed0360 @100738 C `levl` typ / bat mfndpos cnt.
- C locus: `mon.c` `mfndpos`; `sp_lev.c` `flip_level`; Wiz-strt.
- Change or falsified theory: C@100733 bat@(34,1) cnt=7 all ROOM
  typ=25 (not HWALL admit). Post-flip spawn matches JS; CLOUD(37,*)
  off-by-one then movement Y drift to peel. No production patch.
- Verification: green+strict PASS; seed0360 still @100738; DIAG gone.
- Next: cloud/row (37,*) pre-flip or first separating bat move (D-0779).
