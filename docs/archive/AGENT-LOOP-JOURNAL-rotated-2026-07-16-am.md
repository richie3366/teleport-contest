# Rotated from AGENT-LOOP-JOURNAL.md

## 2026-07-15 19:34 — #452 choose_ring_hand yn [rl] (D-0421)
- Objective: seed0004 @285 PRIMARY — C `…Left? [rl]` vs JS without
  choices.
- C locus: `do_wear.c` `accessory_or_armor_on`; `decl.c`
  `rightleftchars`; `win/tty/topl.c` `tty_yn_function`.
- Change: `choose_ring_hand` → `yn_function(q,'rl','\0')`;
  `yn_function` treats `'\0'` def like C (no `(c)`, return def).
- Verification: seed0004 Scr **389→390**/409; @285 fixed; miss
  @288 invent More; RNG full; green+strict; cohort **25/25**.
- Next: seed0004 @288 invent long scroll `--More--` vs corner
  `Scrolls` heading.

## 2026-07-15 19:30 — #451 RING xname descr (D-0420)
- Objective: seed0004 @277 PRIMARY — C `an engagement ring` vs JS
  `a ring of conflict` (look_here).
- C locus: `objnam.c` `xname_flags` RING_CLASS (`nn` / `dn`).
- Change: `objnam.js` `pretty_base` RING — `oc_name_known` only
  (not `obj.known`); dknown+!nn → `<descr> ring`.
- Verification: seed0004 Scr **382→389**/409; miss @277→@285; RNG
  full; green+strict; cohort **25/25**.
- Next: seed0004 @285 `choose_ring_hand` yn `[rl]` via C
  `yn_function`/`rightleftchars`.

## 2026-07-15 19:20 — #450 score + map_trap tseen (D-0419)
- Objective: mandatory full `sessions` (#450÷5); seed0004 @248 PRIMARY —
  C trap `^` vs JS floor.
- C locus: `display.c` `map_trap` / `_map_location`; `defsym.h` trap
  PCHARs; `display.h` `covers_traps`.
- Change: `display.js` `trap_glyph` + `map_trap` wired into
  `map_location`/`newsym` when `tseen && !covers_traps`. Hallu trap
  glyphs deferred.
- Verification: full score **25/44** Scr **4336**/11405 RNG
  **263155**/792838 `22+0.13/turn`; seed0004 Scr **254→382**/409
  (miss @248→@277); green+strict; cohort **25/25**.
- Next: seed0004 @277 look_here `an engagement ring` vs
  `a ring of conflict`.

## 2026-07-15 19:12 — #449 seed0004 @240 WEAPON poisoned xname (D-0418)
- Objective: seed0004 @240 PRIMARY — C `a - 10 darts` /
  `b - a poisoned dart` vs JS `a - a dart` / `b - 10 darts`.
- C locus: `objnam.c` xname WEAPON poisoned; doname_base strip;
  `invent.c` loot_xname → sortloot.
- Change: `objnam.js` `is_poisonable_obj` + `poisoned ` in
  pretty_base; doname strip/reinsert before erosion/spe.
- Verification: seed0004 Scr **245→254**/409; miss @240→@248; RNG
  full; green+strict PASS; cohort **25/25**.
- Next: seed0004 @248 trap `^` vs `.`.

## 2026-07-15 19:04 — #448 seed0004 @239 Ysimple_name2 emptymsg (D-0417)
- Objective: seed0004 @239 PRIMARY — C `The bag is empty.` vs JS
  `the bag is empty.`
- C locus: `pickup.c` `use_container` emptymsg/`pline1`;
  `objnam.c` `Ysimple_name2`.
- Change: `pickup.js` `simpleonames`/`ysimple_name`/`Ysimple_name2`;
  preformat emptymsg when `!outokay`; loot-out empty uses it.
- Verification: seed0004 Scr **244→245**/409; miss @239→@240; RNG
  full; green+strict PASS; cohort **23/23**.
- Next: seed0004 @240 floor pickup `10 darts` vs `a dart`.
