## 2026-07-14 19:04 — D-0297 display_monster M_AP_OBJECT

- Objective: seed0030 Scr peel (CURRENT primary); prefix first-miss @163.
- C locus: `display.c` `display_monster` `M_AP_OBJECT` → `map_object`.
- Change: `newsym` draws/remembers `obj_glyph(mappearance)` for disguised
  mimics instead of mlet `m`.
- Verification: prefix **163→174**; Scr **853→887**; RNG full; green+strict;
  19-session PASS cohort + strict.
- Next: prefix@174 C `You miss…--More--` vs JS without `--More--`.


