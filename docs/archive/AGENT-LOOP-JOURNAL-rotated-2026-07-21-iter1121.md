# Rotated from AGENT-LOOP-JOURNAL @#1121

## 2026-07-21 04:52 — #1107 movemon_singlemon S_EEL hideunder
- Objective: seed4500 @101608 C `rn2(4) @ movemon_singlemon` vs JS `rn2(40)`.
- C locus: `mon.c` `movemon_singlemon` eel arm → `hideunder`.
- Change: `mon.js` else-if S_EEL `!mundetected` `(mflee||!m_next2u)`
  `!canseemon` `!rn2(4)` → existing `hideunder` (was deferred).
- Verification: prefix **101608→101616** (runner RNG **101621** Scr
  **926**); green+strict PASS; cohort 7/7.
- Next: @**101616** C `rn2(5) @ distfleeck` vs JS `rnd(20) @ mattacku`.

## 2026-07-21 04:49 — #1106 u_rooted (brown mold)
- Objective: seed4500 @101391 C `distfleeck` `rn2(5)` vs JS `rn2(61)`.
- C locus: `hack.c` `u_rooted` / `domove_core` (mmove==0).
- Change: `cmd.js` `u_rooted` after attack path; spend turn, no step.
  Symptom was early `#wizwish` after omitted rooted `k` turns.
- Verification: prefix **101391→101608** (runner RNG **102013**);
  Scr **924**; green+strict PASS.
- Next: @**101608** `movemon_singlemon` `rn2(4)` vs JS `rn2(40)`.

