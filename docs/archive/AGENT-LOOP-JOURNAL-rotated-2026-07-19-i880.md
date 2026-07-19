# Rotated from AGENT-LOOP-JOURNAL.md at loop #880

## 2026-07-19 13:01 — #869 hell_tweaks `.w.` + @98492 linedup diag (D-0772)
- Objective: seed0360 @98492 C distfleeck rn2(5) vs JS rn2(3).
- C locus: `nhlib.lua` hell_tweaks `[[.w.]]`; `mthrowu.c` linedup;
  `mkmaze.c` get_level_extends.
- Change: hell_tweaks match `'.w.'` (not `'[.w.]'`); extends xmin/xmax
  clamps. DIAG: JS linedup boulder rn2 for mumak LOS; C still fleeck.
- Verification: green+strict PASS; cohort **11/11**; prefix still **98492**.
- Next: @98492 why C skips linedup boulder rn2 (couldsee / m_move).
## 2026-07-19 12:45 — #868 wizard2 load_special (D-0771)
- Objective: seed0360 @86170 C nhlib shuffle vs JS rn2(79) after getbones.
- C locus: `dat/wizard2.lua` / `sp_lev.c` `load_special` / mazewalk.
- Change: `load_wizard2` + dispatch (mazegrid + zoo + mazewalk + ladders
  + hell_tweaks). Fingerprint ruled out hellfill (no hellno before walkfrom).
- Verification: green+strict PASS; cohort **35/35**; seed0360 prefix
  **86170→98492**; RNG **86170→98507**; Scr **273→275**/833.
- Next: @98492 C distfleeck rn2(5) vs JS rn2(3) (wizard3/hellfill if shuffle).
## 2026-07-19 12:37 — #867 flyer trap + poisoncloud (D-0770)
- Objective: seed0360 @86100 track rn2(8) vs JS sleep-gas rnd(25).
- C locus: `trap.c` `m_harmless_trap`/`check_in_air`/`mintrap`;
  `mon.c` `mfndpos` gas_glyph; `region.c` `make_gas_cloud`.
- Change: flyer floor_trigger harmless + mintrap in-air skip; mfndpos
  avoids only `S_poisoncloud` (not fog/steam). Bat regained track cell.
- Verification: green+strict PASS; cohort **37/37**; seed0360 prefix
  **86100→86170**; RNG **86137→86170**; Scr **273**/833.
- Next: @86170 C nhlib `shuffle` vs JS `rn2(79)` after getbones
  (wizard2/hellfill).
## 2026-07-19 12:24 — #866 maybe_unhide_at (D-0769)
- Objective: seed0360 @86029 distfleeck rn2(5) vs JS rn2(20).
- C locus: `mon.c` `maybe_unhide_at`; `monmove.c` `m_move` ≈2060.
- Change: port `maybe_unhide_at` after place so postmov hide `rn2(5)`
  runs when dest has no cover (snake left hiding). Omit youmonst path.
- Verification: green+strict PASS; cohort **35/35**; seed0360 prefix
  **86029→86100**; RNG **86118→86137**; Scr **273**/833.
- Next: @86100 C track `rn2(8)` vs JS `rnd(25)` sleep-gas.
## 2026-07-19 12:12 — #865 wizard1 + public score (D-0768)
- Objective: mandatory full `sessions` score; seed0360 @82982 wizard1.
- C locus: `dat/wizard1.lua` / `sp_lev.c` `load_special` / `create_door`.
- Change: `load_wizard1` + dispatch (mazegrid + center map + east
  mazewalk + morgue secret door + ladder + hell_tweaks). Omit
  hellfill/wizard2–3/fakewiz.
- Verification: green+strict PASS; cohort **35/35**; seed0360 prefix
  **82982→86029**; RNG **82989→86118**; Scr **273**/833. Full suite
  **37/44**; Scr **8278**/11405; RNG **616720**/792838 (77.79%);
  speed `36+0.20/turn` (R² 0.822). Δ vs #860: Scr **+6**, RNG **+14,263**.
- Next: @86029 C `distfleeck`/`m_move` vs JS `rn2(20)` (post-wizard1
  gameplay); or wizard2 if next special.
