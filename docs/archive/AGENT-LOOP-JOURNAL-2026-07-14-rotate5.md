# Rotated journal crumbs

## 2026-07-14 18:47 — D-0293 DECgraphics S_altar meta-{

- Objective: seed0030 Scr peel (CURRENT primary); prefix first-miss @109.
- C locus: `dat/symbols` DECgraphics `S_altar: \xfb`; `display.c` ALTAR.
- Change: DEC altar `{`+dec (ASCII `_`); scoring grid keeps raw `{`
  not Unicode π (frozen DEC_MAP lacks `{`) (D-0293).
- Verification: prefix **109→126**; Scr **821→840**; RNG full; green+strict;
  19-session PASS cohort + strict.
- Next: prefix@126 C hear-noises topline vs JS blank (`dosounds`).


## 2026-07-14 18:50 — D-0292 amulet xname + clear_dknown

- Objective: seed0030 Scr peel (CURRENT primary); runner matched 818 was
  total count — true prefix first-miss was @93.
- C locus: `objnam.c` xname AMULET_CLASS; `mkobj.c` clear_dknown/unknow_object.
- Change: `<descr> amulet` via oc_descr_idx; mksobj clear_dknown (D-0292).
- Verification: prefix **93→109**; Scr **818→821**; RNG full; green+strict;
  17-session PASS cohort + strict.
- Next: prefix@109 JS `_` vs C `{`+DEC (fountain/altar/DECgraphics).


## 2026-07-14 18:40 — D-0291 topten + record VFS + terminate capture

- Objective: seed0030 Scr 161/1953 (CURRENT primary); first miss @78.
- C locus: `topten.c` `topten`/`outheader`/`outentry`; `end.c` → `nh_terminate`
  contest input-boundary capture (no nhgetch after raw_print panel).
- Change: port `js/topten.js` (!toptenwin raw panel + VFS `record`); wire
  after RIP; `game._captureInputBoundary` for final frame (D-0291).
- Verification: Scr@78 match; Scr **161→818**; miss **78→818**; RNG full;
  green+strict; 17-session PASS.
- Next: Scr@818 seg5 cell diff; or seg7 159 vs 172 steps.
