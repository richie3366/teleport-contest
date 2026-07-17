## 2026-07-17 10:40 — #672 D-0602 pick_room wizard≡debug
- Objective: seed0361 @12288 C `shrine_pos` vs JS `pick_room`.
- C locus: `flag.h` `#define wizard flags.debug`; `mkroom.c` `pick_room`.
- Change: `pick_room` accepts on `flags.wizard || flags.debug`. Falsified
  THEMEROOM/doorct FORCE — C D:17 rooms match JS; C temples rooms[3].
- Verification: prefix **12288→12294** Scr 205; green+strict PASS;
  cohort **31/31** PASS.
- Next: seed0361 @12294 priest/makemon `next_ident` vs `rn2(75)`.


# Rotated journal crumbs

## 2026-07-17 10:30 — #671 D-0601 niches/mimic + @12288 peel
- Objective: seed0361 @12288 C `shrine_pos` vs JS `pick_room`.
- C locus: `mklev.c` `make_niches`/`makeniche`/`dosdoor`/`makelevel`
  G_GONE; themerms THEMEROOM; `mkroom.c` `pick_room`.
- Change: niches use `depth`+`!noteleport`; `Can_fall_thru` for holes;
  dosdoor trapped→mimic `makemon`/`set_mimic_sym`; special-room G_GONE.
  FORCE: THEMEROOM on r1+r4 + r2 doorct=1 → would reach **12294**.
- Verification: green+strict PASS; cohort **18/18** PASS; seed0361
  still @12288 Scr 205.
- Next: themerm `type=themed` for those rooms + r2 extra join door.
