## 2026-07-19 — #803 seed0108 throw self + cream Blind (D-0720/21)
- Objective: seed0108 first screen misses after RNG FULL (Scr 148).
- C locus: `cmd.c` getdir SELF; `dothrow.c` throw_obj self refuse;
  `potion.c` make_blinded/`toggle_blindness` vision_recalc.
- Change: getdir `.`/`s` → self + throw_obj refuse pline (D-0720);
  cream-pie make_blinded on sight toggle → vision_recalc(0) (D-0721).
- Verification: green+strict PASS; seed0108 Scr **148→156** RNG FULL;
  cohort 14/14 PASS.
- Next: seed0108 @78 `#polyself` gnome cloak More / glyph / botl.
