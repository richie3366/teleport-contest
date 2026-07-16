# Rotated from AGENT-LOOP-JOURNAL.md (D-0449 handoff)

## 2026-07-16 02:16 — #468 u_maybe_impaired (D-0437)
- Objective: seed0002 @10550 C `rn2(5)` @ `distfleeck` vs JS `rn2(12)` @
  `m_move` (PRIMARY — was monmove path split after confusion).
- C locus: `hack.c` `u_maybe_impaired` / `impaired_movement`; `cmd.c`
  `confdir`.
- Change: JS `domove` skipped Confusion `!rn2(5)`; ported helpers and
  call before `m_at` (C `domove_core` order). DIAG showed JS already in
  hostile `m_move` track while C still on first `distfleeck`.
- Verification: seed0002 prefix **10550→10634**; Scr still **233**/595;
  RNG matched **10667**/27158; green+strict; cohort **26/26**.
- Next: seed0002 @10634 `peffect_booze` `d(3,8)`.
