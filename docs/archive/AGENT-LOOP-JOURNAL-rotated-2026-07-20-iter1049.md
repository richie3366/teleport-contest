# Rotated from AGENT-LOOP-JOURNAL.md (iter 1049)

## 2026-07-20 19:35 — #1034 D-0881 short_oname dip yn
- Objective: seed0014 @388 C `Dip a -4 orcish helm` vs JS cursed thoroughly rusty.
- C locus: `objnam.c` `short_oname`; `potion.c` `dodip` formats via
  `short_oname(doname, thesimpleoname, QBUFSZ-sizeof getobj dip)`.
- Change: port `short_oname` (+simpleonames/thesimpleoname); `dodip`
  uses it. Thoroughly rusty tips past lenlimit→strip BUC/erosion for
  display only. Named omit: other short_oname callers; pair_of them;
  pool/sink dip prompts.
- Verification: green+strict PASS; cohort 11/12 (seed0007 pre-existing
  FAIL); seed0014 Scr **624→633** (RNG FULL); @388/@393 fixed.
- Next: @415 botl AC:10 vs AC:14 after take-off shield; nymph steal
  wording @416–417.
