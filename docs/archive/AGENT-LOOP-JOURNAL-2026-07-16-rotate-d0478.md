# Rotated from AGENT-LOOP-JOURNAL.md (#515 / D-0478)

## 2026-07-16 06:46 — #503 D-0465 TER_MAP trap strip
- Objective: seed0002 @502 #terrain C floor/`·` vs JS trap `^`.
- C locus: `detect.c` `reveal_terrain_getglyph` `glyph_is_trap` strip.
- Change: `js/display.js` classify tseen traps + `glyph_is_trap_at`
  after mon→memory; keep_traps `trap_to_glyph` restore; TER_MAP strip.
- Verification: @502 matches; first miss @502→@525; Scr 561→563;
  RNG full; green+strict; cohort 26/26.
- Next: D-0466 apply getobj compactify `[ch-kop]` vs `[chijkop]`.

## 2026-07-16 06:40 — #502 D-0464 doname locked-box prefixes
- Objective: seed0002 @454 C `You see here a locked chest.` vs JS
  `You see here a chest.`
- C locus: `objnam.c` `doname_base` trap/lock prefixes; `obj.h` `Is_box`.
- Change: `js/objnam.js` `doname` adds `trapped`/`locked`/`unlocked`/
  `broken`; `js/const.js` exports `Is_box`. Greased deferred.
- Verification: @454 matches; first miss @454→@502 (#terrain);
  Scr 560→561; RNG full; green+strict; cohort 26/26.
- Next: D-0465 TER_MAP still shows traps @502.

## 2026-07-16 06:34 — #501 D-0463 wear on_msg xname
- Objective: seed0002 @363 C `polished silver shield` vs JS
  `shield of reflection` on wear pline.
- C locus: `do_wear.c` `on_msg`; `objnam.c` `xname`/`obj_is_pname`.
- Change: `js/do_wear.js` `on_msg` uses `xname` + `an`/`the`
  (was `objectNameStrs` type name).
- Verification: @363 matches; first miss @363→@454
  (`locked chest`); Scr 559→560; RNG full; green+strict; cohort
  26/26.
- Next: D-0464 doname locked-box prefix @454.
