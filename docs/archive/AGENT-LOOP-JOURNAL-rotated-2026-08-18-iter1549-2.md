# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-18 12:41 — #1549 D-1220 revive_corpse BURIED FALLTHROUGH impossible

**Objective:** Open — `do.c` `revive_corpse` BURIED `!is_zomb`
FALLTHROUGH `impossible` (named). Not Soundeffect.
**C locus:** `do.c` `revive_corpse` 2217–2241; FALLTHROUGH
2236–2240 into default `impossible`.
**Change:** drop the silent `break` so buried non-zomb falls
into `default` `impossible("revive_corpse: lost corpse @ %d",
where)` like C. Zomb pit/claw/`fill_pit` unchanged. Did not
pull `Soundeffect(se_scratching)`. Filled D-1219 archive
`925e5b77`. Rotated #1534. Open 9 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1545** **44**/44; next
@**#1550**).
**Verified:** private canary **25**/25; green+strict
seed8000/0900; cohort **5**/5 + strict 1500/1800/0012/0004/
0007. Public-unhit unless buried non-zomb `revive()` succeeds.
**Next:** Open `do.c` `revive_corpse` `Soundeffect` se_scratching
(named). Not BURIED pit.
**Blocked:** none.

## 2026-08-18 12:24 — #1548 D-1219 show_glyph glyph_updates

**Objective:** Open — `display.c` `show_glyph_change` glyph_updates
(named). Not opt_accessiblemsg.
**C locus:** `display.c` `show_glyph` 2011–2028 / 2059–2070;
`docrt_flags` `in_docrt` 1717–1720 / 1772; `optlist.h`
`mention_map` `&a11y.glyph_updates` 427–428 Off.
**Change:** doset/`OPTIONS=` write `a11y.glyph_updates`;
`show_glyph_cell` announce analogue + `pline_xy`; `docrt`
`in_docrt`. Did not pull integer glyphs / `in_getlev` /
await-`newsym` More when On / `spot_monsters`/`mon_movement`
addr. Filled D-1218 archive `b59f294b`. Rotated #1533. Open 10
after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1545** **44**/44; next
@**#1550**).
**Verified:** private canary **26**/26; green+strict
seed8000/0900; cohort **11**/11 + strict 0007/2200/1500/1800/
0012/0360/4500/0014/0004. Public-unhit unless `mention_map` On.
**Next:** Open `do.c` `revive_corpse` BURIED `!is_zomb`
FALLTHROUGH `impossible` (named). Not Soundeffect.
**Blocked:** none.

## 2026-08-18 12:00 — #1547 D-1218 opt_accessiblemsg → a11y.accessiblemsg

**Objective:** Open — `options.c` `opt_accessiblemsg` wire
`a11y.accessiblemsg` (named). Not dolookaround.
**C locus:** `optlist.h` 140–142 `&a11y.accessiblemsg` Off;
`options.c` `optfn_boolean` 5286 SET + 5327–5328 `opt_initial`
return + 5428–5430 in-game `msg_loc` zero + 5438–5440 toggle
pline.
**Change:** doset/`OPTIONS=` write `a11y.accessiblemsg`; in-game
toggle zeros `msg_loc` before the toggle pline; jsmain applies
rc. Did not pull `spot_monsters`/`glyph_updates`/`mon_movement`
addr or `show_glyph_change`. Filled D-1217 archive `dc34d705`.
Rotated #1532. Open 11 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1545** **44**/44; next
@**#1550**).
**Verified:** private canary **42**/42; green+strict
seed8000/0900; cohort **9**/9 + strict 0007/2200/1500/1800/0012/
0360/4500/0014/0004. Public-unhit unless `accessiblemsg` On.
**Next:** Open `display.c` `show_glyph_change` glyph_updates
(named). Not opt_accessiblemsg.
**Blocked:** none.

## 2026-08-18 11:46 — #1546 D-1217 dolookaround / #lookaround

**Objective:** Open — `cmd.c` `dolookaround` (named). Not
glyph_updates.
**C locus:** `cmd.c` 1195–1368 helpers+body / extcmdlist
1760–1761 IFBURIED|GENERALCMD no AUTOCOMPLETE; `getpos.c`
482–503 GLOC_VALID FALLTHROUGH / GLOC_INTERESTING;
`allmain.c` 845–848 glyph_updates then-arm.
**Change:** local selvar floodfill + `lookaround_known_room` +
scan `pline_xy`; `#lookaround` EXT_CMDS only; newgame then-arm
`await dolookaround()`. Did not pull corridor-goes-to /
glyph_at table / GFILTER_AREA / aA / `opt_accessiblemsg`.
Filled D-1216 archive already `517cb217`. Rotated #1531. Open 12
after archive+refill. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1545** **44**/44; next
@**#1550**).
**Verified:** private canary (GLOC_INTERESTING ROOM/CORR/unexplored
vs FOUNTAIN; viz off/on room size; restore filter; doorway
`--More--` is C); green+strict seed8000/0900; cohort **7**/7
+ strict 1500/1800/0012/0102/0108.
**Next:** Open `options.c` `opt_accessiblemsg` wire
`a11y.accessiblemsg` (named). Not dolookaround.
**Blocked:** none.

## 2026-08-18 11:25 — #1545 review D-1213–D-1216 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `dig.c` `rot_corpse` 2146–2189; `hack.c`
`disturb_buried_zombies` 1798–1813 + rumble 494 / tread
2944–2947; `timeout.c` `peek_timer` 2324–2332; `mon.c`
`wake_nearto_core` 4398; `monmove.c` grounded `MMOVE_MOVED`
938–939; `pline.c` `set_msg_xy` 93–97 / `pline_xy` 126–135 /
`pline_mon` 137–150 / `set_msg_dir` 82–89 / `pline_dir`
113–123; `cmd.c` `dirtocoord` 3858–3865.
**Change:** reviews **175** ACCEPT-WITH-DEBT D-1213 (invent Your
+ live `remove_worn_item`; hideunder / CXN_NO_PFX named),
**176** ACCEPT-WITH-DEBT D-1214 (3×3 shrink + four callers +
live peek/stop/start; impact / local wake clones named),
**177** ACCEPT-WITH-DEBT D-1215 (writers + live consume;
youmonst (0,0); remaining `pline_mon` named), **178**
ACCEPT-WITH-DEBT D-1216 (`dirtocoord` leftover+hero; It's-wall
+ buzz hit; boulder `pline_dir` named). Filled D-1216 archive
hash `517cb217`. No new Must-fix prepend. Open 8 (no refill).
Rotated #1530. Rule #2: no fs.
**Score:** cadence **#1545** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `31+0.27/turn` (R² 0.873). Next
@**#1550**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `cmd.c` `dolookaround` (named). Not
glyph_updates.
**Blocked:** none.

## 2026-08-18 11:02 — #1544 D-1216 set_msg_dir/pline_dir

**Objective:** Open — `pline.c` `set_msg_dir` (named). Not
pline_xy.
**C locus:** `pline.c` `set_msg_dir` 82–89 / `pline_dir`
113–123; callee `cmd.c` `dirtocoord` 3858–3865 then +=ux,uy.
Callers `hack.c` 1069 mention_walls, `zap.c` 4964 dobuzz
`xytodir(-dx,-dy)`.
**Change:** `dirtocoord` in `const.js`; `set_msg_dir`+`pline_dir`
in `display.js`. Invalid dir leftover+hero. Wired It's %s +
hits you. Did not pull run>=2 boulder / remaining `pline_mon` /
`msg_mon_movement`. Filled D-1215 archive hash `eaf10f2d`.
Rotated #1529. Open 8 after archive (no refill). Rule #2: no
fs.
**Score:** fortress unchanged (cadence **#1540** **44**/44; next
@**#1545**).
**Verified:** private canary **43**/43; green+strict
seed8000/0900; cohort **9**/9 + strict 1500/1800/0012/0360/
4500/2200/0014/0004/0060.
**Next:** Open `cmd.c` `dolookaround` (named). Not
glyph_updates.
**Blocked:** none.
