# Rotated journal entries

## 2026-07-14 19:56 — D-0305 TOOL/WEAPON xname descr

- Objective: seed0030 Scr peel (CURRENT primary); prefix first-miss @485.
- C locus: `objnam.c` `xname_flags` WEAPON/VENOM/TOOL — `!nn` → `dn`.
- Change: `pretty_base` uses `OBJ_DESCR` when `!oc_name_known` (tin/magic
  whistle → `"whistle"`) (D-0305).
- Verification: prefix **485→550**; Scr **1370→1371**; RNG full;
  green+strict; 19-session PASS cohort + strict sample.
- Next: @550 C `You hear someone cursing shoplifters.` vs JS blank
  (`dosounds` shop_msg — RNG burned, `You_hear` omitted).

