# Rotated from AGENT-LOOP-JOURNAL.md (D-0539)

## 2026-07-16 18:00 — #584 D-0526 Bar-strt Pelias→branch
- Objective: peel seed0373 @3303 C `induced_align` (Pelias) vs JS
  wallify after D-0525 randline.
- C locus: `dat/Bar-strt.lua`; `makemon.c` MS_GUARDIAN `m_initweap` +
  eel sleep; `selvar.c` floodfill/rndcoord; `sp_lev.c` load_special
  flip/fixup.
- Change: `load_bar_strt` through branch; floodfill/area/and;
  guardian kit; eel sleep before invent; flip + oneshot LR_BRANCH.
- Verification: rng-diff **3303→4157**; runner RNG **4185**/35386;
  green+strict PASS; cohort **30**/30 PASS.
- Next: @4157 nhlib shuffle; or dosounds @8468; or 0116 screen.
