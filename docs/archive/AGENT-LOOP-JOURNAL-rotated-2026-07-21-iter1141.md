# Rotated journal crumbs (#1127–#1129)

## 2026-07-21 10:06 — #1129 nasty + SUMMON_MONS; @107304 mcalcmove
- Objective: seed4500 @106852 C `nasty` rn2(10) vs JS rn2(5).
- C locus: `wizard.c` `nasty`; `mcastu.c` `mcast_summon_mons`.
- Change: ported `nasty` + wired `castmu` SUMMON_MONS; exported
  `pick_nasty`; unmakemon named omit (mhp=0).
- Verification: green+strict PASS; cohort 7/7; prefix
  **106852→107304** (RNG **107335** Scr **941**).
- Next: @**107304** C `mcalcmove` rn2(12) vs JS `d(4,8)`; cadence @#1130.

## 2026-07-21 09:58 — #1128 STRAT_APPEARMSG + mnexto; @106852 nasty
- Objective: seed4500 @106838 keystream/`k` vs `'l'`.
- C locus: `makemon.c` STRAT_APPEARMSG; `mon.c` mnexto→`rloc_to_flag`;
  `hack.h` RLOC_*; session screens (C also double incapable).
- Change: falsified “C single pickup”; ported APPEARMSG + async
  mnexto/rloc_to_flag + RLOC bit values; Blind `arrives` verb.
  Appear pline forces More before touch — keystream reaches `'l'`.
- Verification: green+strict PASS; cohort 6/6; prefix
  **106838→106852** (RNG **106856** Scr **939**).
- Next: @**106852** `nasty` rn2(10) vs JS rn2(5); cadence @#1130.

## 2026-07-21 09:36 — #1127 pickup notake gate; @106838 keystream
- Objective: seed4500 @106838 track `rn2(20)` vs `rn2(32)`.
- C locus: `pickup.c` `pickup` multi/!pickup/notake; dumps via
  recorder `m_move` @106838.
- Change: C dump — wolf cnt/u already diverge (hero path). JS `'l'`
  step read **`k`** (More stream behind). Ported C shared pickup gate
  + incapable pline (was early-return on `!flags.pickup` only). Pline
  fires; prefix unchanged — suspect double `pickup(1)` @106194.
- Verification: green+strict PASS; cohort 4/4; prefix still **106838**.
- Next: falsify double-pickup More vs C single incapable; cadence @#1130.
