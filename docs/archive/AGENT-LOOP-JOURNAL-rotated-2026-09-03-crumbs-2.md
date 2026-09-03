# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-03 — D-1749 display.c feel_location is_worm_tail overlay

**Objective:** Open `display.c` feel_location is_worm_tail (named).
Not Blind levitate-arm.
**C locus:** `display.c` `feel_location` `:745–909` overlay `:901–908`;
`hack.c` `dopush` `:210–215` / `cannot_push_msg` `:257–258` /
monster-behind `:459–460`.
**JS locus:** `js/display.js` `feel_location`; `js/hack.js` `dopush`.
**Change:** suppress gate; `engr_can_be_felt`; cmap darken identity;
Blind boulder feel dest+source so Detect tails paint `PM_LONG_WORM_TAIL`.
Levitate-arm still named.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `display.c:feel_location`; node
21/21; green+strict seed8000/0900; CURRENT cohort **9**/9 + strict.
Rule #2 clean.
**Next:** Open `mhitu.c` doseduce.
**Blocked:** none.

## 2026-09-03 — audit #2160 reviews 701–709 + cadence

**Objective:** C-fidelity review of nine `js/` SHAs since **700**
(`b712f3b6`…`1f6d5487`, D-1740…D-1748) plus full `sessions`.
**C locus:** shk.c `shop_debt`; end.c `get_valuables`; calendar.c
`getyear`; invent.c `dealloc_obj`; weapon.c `possibly_unwield`;
display.c `newsym` dark DETECTED; `see_monsters` MON_STILL_ARRIVING;
`show_mon_or_warn`; `display_monster` pet/detected glyphs.
**Change:** reviews **701–709**, all ACCEPT-WITH-DEBT. No Must-fix.
No `js/` edits. Filled archive D-1748 `%h`.
**Score:** **44**/44, Scr **11,405**/11,405, RNG **792,838**/792,838.
Speed `40+0.31/turn` (R² 0.859) at `1f6d5487`.
**Verified:** `node frozen/ps_test_runner.mjs sessions`.
**Next:** Open `display.c` feel_location is_worm_tail.
**Blocked:** none.

## 2026-09-03 — D-1748 display.c display_monster pet/detected glyphs

**Objective:** Open `display.c` display_monster pet_to_glyph /
detected_mon_to_glyph (named). Not Protection sensed.
**C locus:** `display.c` `display_monster` `:587–618`; `display.h`
`pet_to_glyph` / `detected_mon_to_glyph` / `petnum_to_glyph`;
`wintty.c` `:3927–3936`.
**JS locus:** `js/display.js` `display_monster` / pet+detected helpers /
`glyph_tty_attr`.
**Change:** tame&&!Hallu pet glyphs (tails skip `what_mon`); else
DETECTED inverse; Hallu pets are not MG_PET. Integer glyph ids named.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `display.c:display_monster`; node
25/25; green+strict seed8000/0900; CURRENT cohort **9**/9 + strict.
Rule #2 clean.
**Next:** Open `display.c` feel_location is_worm_tail.
**Blocked:** none.

## 2026-09-02 — D-1747 display.c show_mon_or_warn I-glyph unmap_object

**Objective:** Open `display.c` show_mon_or_warn I-glyph unmap_object
(named). Not map_object observe.
**C locus:** `display.c` `show_mon_or_warn` `:481–496`; callers
`display_monster` `:619` / `display_warning` `:650`.
**JS locus:** `js/display.js` `show_mon_or_warn` / `display_monster` /
`display_warning` / `newsym`.
**Change:** unmap remembered I then cansee `vobj_at` `map_object(o,
FALSE)` before `show_glyph`. Mimic PHYSICALLY_SEEN arms unchanged.
Named: pet/detected glyphs; `feel_location` `is_worm_tail`;
make_blinded Sting(-1).
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `display.c:show_mon_or_warn`; node
24/24; green+strict seed8000/0900; CURRENT cohort **9**/9 + strict.
Rule #2 clean.
**Next:** Open `display.c` display_monster pet_to_glyph /
detected_mon_to_glyph.
**Blocked:** none.

## 2026-09-02 — D-1746 display.c see_monsters MON_STILL_ARRIVING skip

**Objective:** Open `display.c` see_monsters MON_STILL_ARRIVING skip
(named). Not newsym Detect_monsters.
**C locus:** `display.c` `see_monsters` `:1508–1509`; `monst.h`
`:67`; `dog.c` `mon_arrive` `:430`/`:479`/`:622`.
**JS locus:** `js/display.js` `see_monsters`; `js/const.js`;
`js/dog.js` With_you/After_you.
**Change:** skip fmon `newsym`/`see_wsegs`/Sting count while
`mstate & 0x100`. Set/clear on `mon_arrive` clones (usteed return
leaves the bit). Named: pet/detected glyphs; `show_mon_or_warn`
I-glyph; make_blinded Sting(-1).
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `display.c:see_monsters`; node
14/14; green+strict seed8000/0900; CURRENT cohort **9**/9 + strict;
seed0013-friday13-restore PASS+strict. Rule #2 clean.
**Next:** Open `display.c` show_mon_or_warn I-glyph unmap_object.
**Blocked:** none.

## 2026-09-02 — D-1745 display.c newsym !cansee display_monster DETECTED

**Objective:** Open `display.c` newsym !cansee display_monster DETECTED
(named). Not cansee Detect_monsters.
**C locus:** `display.c` `newsym` `:1046–1054`; `display_monster`
`:532`/`:589`.
**JS locus:** `js/display.js` `newsym` / `cell_shows_displayed_monster`.
**Change:** !cansee `display_monster(see_it ? 0 : DETECTED)` instead
of `mon_glyph`+`show_glyph_cell`. Occupancy `!mimic || sensed`.
Named: pet/detected glyphs; `show_mon_or_warn` I-glyph;
`see_monsters` MON_STILL_ARRIVING.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `display.c:newsym`; node 12/12;
green+strict seed8000/0900; CURRENT cohort **9**/9 + strict.
Rule #2 clean.
**Next:** Open `display.c` see_monsters MON_STILL_ARRIVING skip.
**Blocked:** none.
