# Rotated from AGENT-LOOP-JOURNAL.md @#1133

## 2026-07-21 07:56 — #1119 S_BAT Inhell MFAST
- Objective: seed4500 @104705 bat@46 mcalcmove 12vs24.
- C locus: `makemon.c` S_BAT / `Inhell` / `is_bat` → `mon_adjust_speed(...,2)`.
- Change: C dump — fmon order matched; bat mspeed MFAST vs JS 0.
  Port `is_bat` + S_BAT hell arm (`permspeed`/`mspeed` MFAST).
- Verification: green+strict PASS; cohort 5/5; prefix **104705→106304**
  (runner RNG **106354** Scr **939**).
- Next: @**106304** C fleeck vs JS `m_lined_up` rn2(25); cadence @#1120.

## 2026-07-21 07:35 — #1118 bat@46 mcalcmove (falsify fleeck rn2(4))
- Objective: seed4500 @104705 C fleeck rn2(5) vs JS rn2(4).
- C locus: `mon.c` `mcalcmove` / `mcalcdistress`; `allmain.c` EOT allot.
- Change: none shipped. DIAG: JS rn2(4)=early `decide_to_shapeshift`;
  missing vamp-bat @46,19 2nd move (mcalcmove add 12 needs 24).
  Leftover after getlev=0; n=140. FORCE +12 →104943 (reverted).
- Verification: green+strict PASS; rng-diff still @104705.
- Next: C why bat@46 mcalcmove slot is 24 (fmon order); cadence @#1120.

## 2026-07-21 07:23 — #1117 carrying_too_much
- Objective: seed4500 @104241 C fleeck vs JS overexertion rn2(20).
- C locus: `hack.c` `carrying_too_much` / `domove_core`.
- Change: C dump falsified umov<12 theory (both after=12 OVERLOADED).
  Port `carrying_too_much` before attack — mold `l` collapses, no overexertion.
- Verification: green+strict PASS; cohort 5/5; prefix **104241→104705**
  (runner RNG **104797** Scr **936**).
- Next: @**104705** C fleeck rn2(5) vs JS rn2(4); cadence @#1120.

