## 2026-07-19 16:39 — #889 Wiz-strt throne template escape (D-0779)
- Objective: seed0360 CLOUD(37,*) off-by-one / bat Y drift @100738.
- C locus: `dat/Wiz-strt.lua` throne `\`; JS `load_wiz_strt` map string.
- Change: `WIZ_STRT_MAP` `\.` ate a char (row5 len 75); use `\\`.
  Post-flip CLOUD(37,1)/(37,4) now match C. Peel still @100738 bat Y.
- Verification: green+strict PASS; cohort seed1500/1800/0361/0367/5002
  PASS; seed0360 prefix @100738, RNG matched 101517/120639 Scr 292.
- Next: first move separating bat Y after FlipY (D-0779).
