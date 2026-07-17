# Rotated journal crumbs

## 2026-07-17 12:05 — #687 D-0617 tower1 candle get_location_coord
- Objective: seed0361 @23223 C `get_location` rn2(15) vs JS `rnd(2)`.
- C locus: `sp_lev.c` `create_object`/`get_location_coord`; `tower1.lua` chest contents.
- Change: `load_tower1` wax/tallow candles use `get_location_coord_random(DRY)`
  instead of raw `rn2(sx/sy)` before `mksobj_at`.
- Verification: prefix **23223→31644** Scr **289**/366; green+strict PASS;
  cohort **31/31** PASS.
- Next: seed0361 @31644 nhlib shuffle rn2(3) vs JS rn2(79); or Pri-strt.

## 2026-07-17 12:05 — #686 D-0616 qt_pager pline vs NHW_TEXT
- Objective: seed0361 @23016 Home movemon vs ^V→Dlvl:37 getbones.
- C locus: `questpgr.c` deliver_by_pline; `quest.lua` Arc nexttime default output.
- Change: `qt_pager` uses pline when no newline (C default); window if `\n`/long.
  NHW_TEXT had stolen `e` → `s` search turn → distfleeck before getbones.
- Verification: prefix **23016→23223** Scr **271→289**; green+strict PASS;
  cohort **31/31** PASS.
- Next: seed0361 @23223 tower1 `get_location` rn2(15) vs `rnd(2)`; or Pri-strt.
