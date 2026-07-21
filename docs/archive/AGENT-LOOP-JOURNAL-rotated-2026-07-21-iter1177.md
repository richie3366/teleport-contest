# Rotated from AGENT-LOOP-JOURNAL @#1177

## 2026-07-21 15:05 — #1166 unmap_object map_background + fight_empty

- Objective: seed4500 @1048 Blind map `:_` vs C DEC ROOM `~~`.
- C locus: `display.c` `unmap_object` (background not objects);
  `hack.c` `domove_fight_empty` always unmap.
- Change: `map_background` + fix `unmap_object`; fight_empty always
  unmap (+ boulder/statue remap); export `map_object` (D-0928 #1166).
- Verification: green+strict PASS; cohort 19/19; prefix **@1048→@1053**;
  Scr **1434→1413**.
- Next: @**1053** carrots alternate-weapons prinv vs bites.

## 2026-07-21 14:49 — #1165 public score + Blind ice diagnosis

- Objective: cadence full `sessions` @#1165; diagnose seed4500 @1048.
- C locus: `display.c` `feel_location` / Blind memory vs `map_object`
  (Punished chain + corpse); ICE typ still suspected under C `~~`.
- Change: docs only — Score **42**/44 Scr **11024**/11405 RNG
  **100%** `30+0.25/turn`; @1048 = 2 cells C ice vs JS `:`/`_`.
- Verification: green+strict PASS; focused seed4500 **1434**/1814.
- Next: C dump typ/glyph at map `(42,6)`/`(43,6)`, or port
  `feel_location` / ice persistence (D-0928).

## 2026-07-21 14:42 — #1164 makemon_appear_msg wizgenesis

- Objective: seed4500 @1034 invent `appears close by` vs C path.
- C locus: `makemon.c` !MM_NOMSG appear Norep (Amonnam +
  next2u(**requested** x,y) + MM_NOEXCLAM); `read.c`
  `create_particular_creation` has no caller pline.
- Change: drop invent create_particular appear; add
  `makemon_appear_msg` + await from creation (D-0928 #1164).
- Verification: green+strict PASS; cohort 36/36; Scr **1433→1434**;
  prefix **@1034→@1048**.
- Next: @**1048** Blind map `(41,7)`/`(42,7)` C `~~` vs JS `:_`.

