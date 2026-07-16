# Rotated from AGENT-LOOP-JOURNAL.md (D-0536)

## 2026-07-16 17:46 — #582 D-0524 m_avoid_soko_push_loc
- Objective: peel seed0116 @12521 C `distfleeck` rn2(5) vs JS
  `dog_move` rn2(3).
- C locus: `monmove.c` `m_avoid_soko_push_loc`; `dogmove.c` caller.
- Change: port Sokoban boulder-line skip in `js/mon.js` (was stubbed).
- Verification: seed0116 RNG **full 12562**/12562; Scr still 110/127;
  green+strict; cohort **30/30** PASS.
- Next: seed0116 screen residual; or Bar-strt @3289 / dosounds @8468.

## 2026-07-16 17:40 — #581 D-0523 were_change from m_calcdistress
- Objective: peel seed0116 @12461 C `were_change` `rn2(50)` vs JS
  `mcalcmove` `rn2(12)`.
- C locus: `were.c` `were_change`/`new_were`; `mon.c` `m_calcdistress`.
- Change: new `js/were.js`; call `were_change` after `mon_regen`.
- Verification: prefix **12461→12521** (RNG **12554**/12562) Scr 110;
  green+strict; cohort 28/28 PASS.
- Next: @12521 fleeck `rn2(5)` vs dog_move `rn2(3)`; C transform @12522.

