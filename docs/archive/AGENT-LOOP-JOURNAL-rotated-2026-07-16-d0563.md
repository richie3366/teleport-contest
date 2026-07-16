# Rotated from AGENT-LOOP-JOURNAL.md (#623 D-0563)

## 2026-07-16 20:05 — #609 D-0549 level_tele endgame Amulet
- Objective: peel seed0373 @30061 C `next_ident` vs JS `rn2(3)` after
  matched `collect_coords` / mon_arrive.
- C locus: `teleport.c` `level_tele` levTport_menu endgame
  `mksobj(AMULET_OF_YENDOR)`; `mkobj.c` AMULET_CLASS; `invent.c`
  `addinv_core1`.
- Change: `js/teleport.js` grant + `addinv`/`prinv`/`uhave.amulet`;
  `js/mkobj.js` `made_amulet`.
- Verification: rng-diff **30061→30065**; runner RNG **30115**/35386
  Scr 23; green+strict PASS; cohort **28**/28 PASS.
- Next: nhlib shuffle @30065 (endgame plane load); or dosounds @8468.
