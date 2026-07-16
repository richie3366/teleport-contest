# Rotated from AGENT-LOOP-JOURNAL (#545 score)

## 2026-07-16 12:10 — D-0484 dofire empty-quiver letter ownership
- Objective: seed0007 @2824 JS `rn2(7)` do_attack vs C `mcalcmove`.
- C locus: `dothrow.c` `dofire`; getobj/`tty_yn_function` more;
  `tty_nhgetch` NEED_MORE→NON_EMPTY.
- Change: `dofire` continues after doquiver; `mark_topline_seen` after
  ammo pline so invent letter is not More-eaten.
- Verification: rng-diff **2824→2832**; green+strict; cohort 1500/1800/
  0101/0013/0006 PASS. Scr still 20/302.
- Next: dog_move @2832 `rn2(1)` (mfndpos order / whappr).

## 2026-07-16 11:50 — D-0483 revert D-0480 serialize coerce
- Objective: undo judge PASS 23→22 after D-0480 (seed0013-rogue 59→58).
- C locus: n/a (revert contestant serialize); keep insight vanqsort strcmpi.
- Change: restore pre-D-0480 `serialize_for_scoring` color path.
- Verification: green+strict; seed0013/0002/0004/0012/0030 local PASS.
- Next: next judge cron; seed0007 snake swamp.

## 2026-07-16 11:40 — D-0482 seed0006 disclose invent PASS
- Objective: seed0006 @110 invent pages after possessions yn.
- C locus: `end.c` disclose/really_done; `windows.c` add_menu_heading;
  `objnam.c` ring spe; `mkobj.c` unknow_object; `insight.c` list_vanquished;
  `dungeon.c` print_mapseen; `calendar.c` night.
- Change: invent 'y' display + ID walk; gameover ATR_NONE headings;
  charged-ring spe + mksobj uskn; enlightenment night/moon/attrs;
  vanquished ask yn; overview levels range.
- Verification: seed0006 **PASS** 123/123; green+strict; 28 cohort;
  full suite **28/44** Scr **5014**.
- Next: seed0007 snake swamp Scr 20/302.

## 2026-07-16 11:20 — D-0481 makemon newsym after spawn
- Objective: seed0006 @102 JS `.` vs C `&` after water-demon unleash.
- C locus: `makemon.c` `makemon` `!gi.in_mklev` → `newsym` (+ byyou).
- Change: `js/makemon.js` `newsym(mx,my)` after invent when not
  mklev; early byyou `newsym`. Omit `set_apparxy` (circular import).
- Verification: seed0006 Scr **106→110**/123 @102→@110; RNG full;
  green+strict; 25 PASS cohort held.
- Next: seed0006 @110 disclose invent pages (or seed0007).

## 2026-07-16 10:35 — LB 23-vs-27 investigate + D-0480
- Objective: close judge 14-cell gap on seed0002/0004/0012/0030.
- C locus: tty blank fg; `insight.c` vanqsort `strcmpi`; altar DEC (D-0293).
- Change or falsified theory: local+hub PASS 100%; cannot repro judge
  misses. D-0480 serialize space NO_COLOR + vanqsort strcmpi. Rejected
  SO-wrap `{`/`\`` (C encoding mix / ROCK_CLASS).
- Verification: green+strict; four gap sessions PASS local+hub.
- Next: next judge cron; else upstream #5-style report; seed0006 @102.

