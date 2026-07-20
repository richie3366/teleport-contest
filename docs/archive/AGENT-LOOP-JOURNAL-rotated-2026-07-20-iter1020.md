# Rotated from AGENT-LOOP-JOURNAL.md @ #1020

## 2026-07-20 16:05 — #1008 D-0731 C poss[] DIAG; mon drift
- Objective: seed0399 @10157 mfndpos cnt7vs5 (D-0731).
- C locus: mon.c mfndpos (recorder DIAG); mon positions.
- Change: none in scored js/. Fixed Darwin install sysconf
  (GDBPATH/GREPPATH comment + WIZARDS=*) for recorder rerecord.
  C DIAG: unicorn cnt=5; MON_AT elf×2 + spider; JS elves/spider
  drifted NW while unicorn matched. Falsified ROOM/trap/online omit.
- Verification: green+strict PASS; seed0399 still @10157; C rerecord
  RNG bit-equal to canonical (11409).
- Next: first silent coord diverge of PM_ELF_NOBLE / PM_GIANT_SPIDER;
  or D-0708; score @#1010.

## 2026-07-20 15:51 — #1007 D-0731 DIAG; falsify FORCE→namedesc
- Objective: seed0399 @10157 mfndpos cnt7vs5 (D-0731).
- C locus: mon.c mfndpos; monmove.c m_move track skip.
- Change: none shipped. DIAG reconfirmed unicorn @58,12 cnt=7
  ROOM×7 spider@57,12 WEB+sack@58,13; no engr/online. Falsified
  FORCE→namedesc@10217 as next peel (key desync; JS identify
  rn2(181) vs C rn2(31) not comparable).
- Verification: green+strict PASS; seed0399 still @10157;
  no js/ production change.
- Next: C recorder poss[] DIAG (sysconf in install); or D-0708;
  score @#1010.

## 2026-07-20 15:36 — #1006 monflee mon_track_clear (D-0860)
- Objective: seed0399 @10157 mfndpos cnt7vs5 (D-0731).
- C locus: monmove.c monflee always mon_track_clear; callers music/uhitm/fountain.
- Change: wire mon_track_clear (export + monflee + music/uhitm/fountain).
  DIAG: unicorn @58,12 cnt=7 j=0 mtrack=[59,13]; (57,12) MON_AT mhp34;
  open ROOM×7; FORCE-pair ID still needs C-state (track clear inert here).
- Verification: green+strict PASS; cohort 1500/1800/0383/0398/0108/0013 PASS;
  seed0399 still @10157 rn2(28)vs rn2(20).
- Next: C-state which 2 of 7 cells; or namedesc rn2(31)vs181 after arity;
  D-0708; score @#1010.
