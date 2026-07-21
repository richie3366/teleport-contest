## 2026-07-21 10:47 — #1132 unmul more ate ^V; @107645
- Objective: seed4500 @107645 C getbones rn2(3) vs JS missing.
- C locus: `topl.c` update_topl You-die/WIN_STOP; `tty_yn_function`;
  symptom `unmul`→pline→more.
- Change: diagnosed keystream — NEED_MORE `"xan pricks…"` makes
  survived pline call more() eating `^V ? \n`. Ported C You-die
  `skip=FALSE` after clear WIN_STOP + yn clear WIN_STOP after flush.
  Prefix unchanged (still @107645).
- Verification: green+strict PASS; cohort 6/6.
- Next: Die?/hitmsg more@107426 vs C ESC→yn; clear NEED_MORE before
  unmul; cadence @#1135.
## 2026-07-21 10:24 — #1131 mhitm_ad_legs mhitu; @107645 getbones
- Objective: seed4500 @107470 C `mhitm_ad_legs` rn2(2) vs JS rn2(3).
- C locus: `uhitm.c` `mhitm_ad_legs` (mhitu arm); `mhitm_adtyping`.
- Change: ported `mhitm_ad_legs_u` + wired `AD_LEGS` in
  `mhitm_adtyping_u` (was default-zero → later rn2(3)).
- Verification: green+strict PASS; cohort 6/6; prefix
  **107470→107645** (runner RNG **107645** Scr **939**).
- Next: @**107645** C `getbones` rn2(3) vs JS missing; cadence @#1135.
