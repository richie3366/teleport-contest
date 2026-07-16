## 2026-07-16 17:15 — #577 D-0519 makemaz / bigrm-2 / Bar-strt
- Objective: shared special-level `makemaz` after getbones (0116 @6374 /
  0373 @2550).
- C locus: `mkmaze.c` `makemaz`; `sp_lev.c` load_special / replace_terrain;
  `dat/bigrm-2.lua` / `Bar-strt.lua`; `makemon.c` nymph sleep+invent.
- Change: protofile `rnd(rndlevs)` + loaders; map-relative get_location;
  nymph/jabberwock sleep + S_NYMPH invent.
- Verification: seed0116 **6374→9351** Scr **107→110**; seed0373
  **2550→3289**; green+strict; cohort **30/30**.
- Next: seed0116 @9350 next special; Bar-strt randline; or seed5006
  dosounds.
