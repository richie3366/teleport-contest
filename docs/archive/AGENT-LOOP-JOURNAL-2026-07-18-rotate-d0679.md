# Rotated from AGENT-LOOP-JOURNAL.md (#756)

## 2026-07-17 19:39 — #741 D-0668 Pri-loca map lit=FALSE
- Objective: seed0367 @203 materialize — JS live Z/memory vs C warn/`~`.
- C locus: `dat/Pri-loca.lua`; `sp_lev.c` `lspo_map` lit=FALSE;
  `mkmaze.c` `set_levltyp_lit`.
- Change: `load_pri_loca` clears `SpLev_Map` `.lit` after map (D-0668).
  Global `sel_set_ter(false)`≡C deferred (seed0009 regress).
- Verification: @203 residual **27** cells (C W/& vs JS warn); Scr still
  267/324; green+strict PASS; cohort **33**/34. RNG FULL.
- Next: C physical W/& on dark morgue cells vs JS mon_warning only.
