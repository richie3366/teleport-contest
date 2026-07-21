# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. When this file exceeds ~15 entries,
move older ones into `docs/archive/`.

Use this shape:

```text
## 2026-07-21 11:10 — #1134 Kni-goal load_special; RNG complete
- Objective: seed4500 @107646 C nhlib shuffle rn2(3) vs JS rn2(79).
- C locus: `dat/Kni-goal.lua`; `sp_lev.c` `load_special`; `mkmaze.c` `makemaz`.
- Change: no Kni-goal loader → empty maze → ordinary `rn2(79)`. Port
  `load_kni_goal` (map + Mirror + stock + Ixoth/quasits/jellies) + dispatch.
- Verification: green+strict PASS; cohort 12/12; rng-diff **108275**/108275;
  runner Scr **941→947**.
- Next: seed4500 screen peel (RNG done); cadence @#1135.

## 2026-07-21 11:01 — #1133 You-die notdied short-circuit; @107646
- Objective: seed4500 @107645 C getbones missing (keystream).
- C locus: `topl.c` `update_topl` notdied short-circuit; yn Die?.
- Change: C dump @107446 — WIN_STOP+no room never assigns notdied from
  "You die"; #1132 always-clear made yn more() eat Die? key. Match C
  short-circuit in `pline`.
- Verification: green+strict PASS; cohort 6/6; prefix **107645→107646**
  (RNG **107651** Scr **941**).
- Next: @**107646** nhlib.lua shuffle rn2(3) vs rn2(79); cadence @#1135.

## YYYY-MM-DD HH:MM — <objective>
- Objective: …
- C locus: …
- Change or falsified theory: …
- Verification: …
- Next: …
```

## 2026-07-21 10:52 — process: C dump for keystream/more too
- Objective: extend §7 C-dump guidance beyond geometry.
- C locus: n/a (docs); live peel still @107645 NEED_MORE/unmul.
- Change: playbook §7 table + §9; runbook §C.5; agent-notes;
  CURRENT/NOTES next-falsify = C dump at hitmsg@107426 vs unmul.
- Verification: n/a (docs-only).
- Next: loop peels dump C more-state before another WIN_STOP shim.

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

## 2026-07-21 10:14 — #1130 score + vamp dochng mndx; @107470 legs
- Objective: cadence full `sessions`; seed4500 @107304 mcalcmove vs d(4,8).
- C locus: `mon.c` `decide_to_shapeshift`/`newcham` (`ptr != mon->data`).
- Change: `mons()` fresh-object made fog→fog always `dochng`; compare
  `mndx` in `decide_to_shapeshift` + `newcham`. Suite **42/44** Scr
  **10531**/11405 RNG **792061**/792838 (99.90%) `30+0.25/turn`.
- Verification: green+strict PASS; cohort 7/7; prefix **107304→107470**
  (runner RNG **107498** Scr **941**).
- Next: @**107470** C `mhitm_ad_legs` rn2(2) vs JS rn2(3); cadence @#1135.

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

## 2026-07-21 09:07 — #1125 score cadence + @106838 hypothesis
- Objective: mandatory full `sessions` @#1125; sharpen seed4500 peel.
- C locus: `monmove.c:1963` `rn2(4*(cnt-j))` (track skip in `m_move`).
- Change: no `js/` patch. Score **42/44** Scr **10529**/11405 RNG
  **791421**/792838 (99.82%) speed `31+0.25/turn`. @106838 is same
  site — C arg 20 vs JS 32 ⇒ cnt−j 5 vs 8 (mfndpos/`mtrack`), not a
  missing literal rn2(32).
- Verification: green+strict PASS; full sessions documented in CURRENT.
- Next: dump C/JS `cnt`/`j`/`mtrack` at track-skip; cadence @#1130.

## 2026-07-21 09:03 — #1124 dowear verysmall/nohands
- Objective: seed4500 @106540 Unchanging wear vs C (invent-letter hyp).
- C locus: `do_wear.c` `dowear` verysmall/nohands → "Don't even bother."
- Change: C wish letter `t` then `W` while brown-mold rejects Wear;
  `t`/`z` become throw/zap. JS deferred the gate → put on Unchanging.
  Port early reject; invent-letter theory falsified.
- Verification: green+strict PASS; cohort 6/6; prefix **106540→106838**
  (runner RNG **106858** Scr **939**).
- Next: @**106838** C `m_move` `rn2(20)` vs JS `rn2(32)`; cadence @#1125.

## 2026-07-21 08:58 — #1123 castmu PSI_BOLT→mdamageu/rehumanize
- Objective: seed4500 @106540 C fleeck rn2(5) vs JS rn2(25).
- C locus: `mcastu.c` `mcast_psi_bolt`/`mdamageu`; `polyself.c` `rehumanize`.
- Change: burn+apply PSI_BOLT/OPEN_WOUNDS; `mdamageu`→`rehumanize`;
  Unchanging+mh<1→`done(DIED)`. Still @106540: JS wears wished
  amulet of unchanging (savelife keeps Upolyd); force-ignore
  Unchanging → **106540→106838**. Courage hyp falsified.
- Verification: green+strict PASS; cohort 4/4; prefix still **106540**.
- Next: Put-on / invent-letter for amulet of unchanging vs C.

## 2026-07-21 08:28 — #1122 mattacku AT_MAGC→castmu
- Objective: seed4500 @106536 C choose_monster_spell rn2(23) vs JS rn2(5).
- C locus: `mhitu.c` `mattacku` AT_MAGC → `castmu`; `mcastu.c` dmg dice.
- Change: JS omitted AT_MAGC (default no-op). Wired castmu/buzzmu;
  burn `d((ml/2)+1,6)` before deferred mcast_spell.
- Verification: green+strict PASS; cohort 6/6; prefix **106536→106540**
  (runner RNG **106559** Scr **937**).
- Next: @**106540** C fleeck rn2(5) vs JS rn2(25); cadence @#1125.

## 2026-07-21 08:19 — #1121 set_uasmon MR_* + getmattk lich cold
- Objective: seed4500 @106531 C hitmu d(2,6) vs JS d(3,6).
- C locus: `polyself.c` `set_uasmon` resist_from_form; `mhitu.c` `getmattk` lich cold→PHYS.
- Change: brown-mold poly omitted COLD_RES FROMFORM; master lich stayed 3d6.
  Port MR_* PROPSETs + getmattk cold-resist arm (mdef null=hero).
- Verification: green+strict PASS; cohort 6/6; prefix **106531→106536**
  (runner RNG **106546** Scr **937**).
- Next: @**106536** C `choose_monster_spell` rn2(23) vs JS rn2(5); cadence @#1125.

