# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. When this file exceeds ~15 entries,
move older ones into `docs/archive/`.

Use this shape:

```text
## YYYY-MM-DD HH:MM — #NNNN short title

- Objective: …
- C locus: …
- Change: …
- Verification: …
- Next: …
```

## 2026-08-18 18:00 — D-1221 gbuf_show_kind stop Hallu reroll

**Objective:** Must-fix review **181** — `display.c` `show_glyph` /
JS `gbuf_show_kind` must not re-call `mon_glyph`/`obj_glyph` on
every `show_glyph_cell`. Keep mention_map addr. seed0383.
**C locus:** `display.c` `show_glyph` 2011–2028; `glyphs.c`
`glyph_to_cmap`; `display.h` `glyph_is_monster`.
**Change:** classifier uses displayable-monster occupancy +
`M_AP_TYPE` mimic, cansee floor object, trap/terrain ch match.
No Hallu `rn2_on_display_rng`. Addr/`in_docrt` unchanged. Did
not pull integer glyphs / Soundeffect. Stamped review **181**
**Addressed:** D-1221 (hash next SHA). Open 9 after archive
(no refill). Rule #2: no fs.
**Score:** full `sessions` **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `38+0.31/turn` (R² 0.848).
seed0383 PASS. Next audit @**#1555**.
**Verified:** private canary **17**/17; green+strict
seed8000/0900; focused seed0383; cohort + full `sessions`.
**Next:** Open `do.c` `revive_corpse` `Soundeffect` se_scratching
(named). Not BURIED pit.
**Blocked:** none.

## 2026-08-18 13:05 — #1550 review D-1217–D-1220 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `cmd.c` `dolookaround` 1262–1368 / `getpos.c`
482–503 / `allmain.c` 845–848; `optlist.h` 140–142 /
`options.c` `optfn_boolean` 5286 / 5428–5440; `display.c`
`show_glyph` 2011–2070 / `docrt_flags` 1717–1772 /
`optlist.h` 427–428; `do.c` `revive_corpse` 2217–2241.
**Change:** reviews **179** ACCEPT-WITH-DEBT D-1217 (`dolookaround`
+ GLOC_INTERESTING; firstmatch is lookat clone), **180** ACCEPT
D-1218 (`a11y.accessiblemsg` addr + in-game loc zero), **181**
QUALITY-RISK D-1219 (`gbuf_show_kind` Hallu `mon_glyph`/`obj_glyph`
on every `show_glyph_cell`; mention_map addr kept), **182** ACCEPT
D-1220 (BURIED FALLTHROUGH live `impossible`). Filled D-1220
archive hash `b09b013d`. Must-fix prepend review **181** item 1.
Open 9 + Must-fix 1 = 10 (no refill). Rotated #1535. Rule #2: no fs.
**Score:** cadence **#1550** **43**/44 Scr **11353**/11405 RNG
**787315**/792838 (99.30%) speed `35+0.29/turn` (R² 0.849).
**Notable FAIL:** seed0383-wizard-hallucinate. Next audit @**#1555**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Must-fix `gbuf_show_kind` stop Hallu reroll. Keep
mention_map addr. Not Soundeffect.
**Blocked:** none.

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

## 2026-08-18 10:47 — #1543 D-1215 pline_xy/pline_mon

**Objective:** Open — `pline.c` `pline_xy`/`pline_mon`
(named). Not set_msg_dir.
**C locus:** `pline.c` `pline_xy` 126–135 / `pline_mon`
137–150; callee `set_msg_xy` 93–97 then `vpline`. Callers
`weapon.c` 892, `muse.c` 187, `steal.c` 836, `dogmove.c` 460,
`monmove.c` `mb_trapped` 58.
**Change:** `set_msg_xy`+writers in `display.js`; hack
re-exports store. youmonst → (0,0) not ux,uy. Wired live
wield/zap/drop/pickup/`mb_trapped`. Did not pull `set_msg_dir`
/ remaining `pline_mon` / `msg_mon_movement`. Filled D-1214
archive hash `b44c4847`. Rotated #1528. Open 9 after archive
(no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1540** **44**/44; next
@**#1545**).
**Verified:** private canary **31**/31; green+strict
seed8000/0900; cohort **9**/9 + strict 1500/1800/0012/0360/
4500/2200/0014/0004/0060.
**Next:** Open `pline.c` `set_msg_dir` (named). Not pline_xy.
**Blocked:** none.

## 2026-08-18 10:36 — #1542 D-1214 disturb_buried_zombies

**Objective:** Open — `hack.c` `disturb_buried_zombies`
(named). Not zombify_mon.
**C locus:** `hack.c` `disturb_buried_zombies` 1798–1813;
callers rumble `:494`, tread `:2944–2947`, `mon.c`
`wake_nearto_core` `:4398`, `monmove.c` grounded `MMOVE_MOVED`
`:938–939`; `timeout.c` `peek_timer` 2324.
**Change:** buried CORPSE 3×3 `peek` then `max(1,t*2/3)`;
rumble after closed_door; tread `!Lev&&!Fly&&!Stealth&&
cwt>=WT_ELF/2`; wake; grounded move before nearby return.
Did not pull `impact_disturbs_zombies`, local wake clones,
hideunder after tread. Filled D-1213 archive hash `c85424f4`.
Rotated #1527. Open 10 after archive (no refill). Rule #2:
no fs.
**Score:** fortress unchanged (cadence **#1540** **44**/44; next
@**#1545**).
**Verified:** private canary **29**/29; green+strict
seed8000/0900; cohort **6**/6 + strict 1500/1800/0012/0004/
2200/0060.
**Next:** Open `pline.c` `pline_xy`/`pline_mon` (named). Not
set_msg_dir.
**Blocked:** none.

## 2026-08-18 10:20 — #1541 D-1213 rot_corpse invent/minvent worn plines

**Objective:** Open — `dig.c` `rot_corpse` invent/minvent worn
plines (named). Not REVIVE.
**C locus:** `dig.c` `rot_corpse` 2146–2189.
**Change:** invent verbose `Your [wielded ]<corpse> rot(s)
away`; `owornmask` → `remove_worn_item(TRUE)` +
`stop_occupation`; minvent wielded `setmnotwielded`; migrating
`owornmask=0`; invent splice in `obj_extract_self`; invent
`update_inventory` after extract. Did not pull hideunder
expose, contents bury, unique CXN_NO_PFX, or artifact_light.
Rotated #1526. Open 11 after archive (no refill). Rule #2: no
fs.
**Score:** fortress unchanged (cadence **#1540** **44**/44; next
@**#1545**).
**Verified:** private canary **28**/28; green+strict
seed8000/0900; cohort **4**/4 + strict 1500/1800/0012/0004.
**Next:** Open `hack.c` `disturb_buried_zombies` (named). Not
zombify_mon.
**Blocked:** none.

## 2026-08-18 09:50 — #1540 review D-1209–D-1212 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `teleport.c` `dotelecmd` 917–1031 / `spell.c`
`tport_spell` 1707–1757 / `cmd.c` `C('t')` 1890–1891; `mon.c`
`zombie_maker` 362–379 / `xkilled` 3619–3624; `mhitm.c`
`mdamagem` 1083–1089; `do.c` `revive_corpse` 2183–2215 /
`do_name.c` `Adjmonnam` 1142–1148 / `mondata.c` `locomotion`
1380–1392.
**Change:** reviews **171** ACCEPT-WITH-DEBT D-1209 (n/s/t/w +
live `tport_spell`; `'s'` still fail-closed in `dotele`, named),
**172** ACCEPT-WITH-DEBT D-1210 (maker + xkilled wrap live;
`dothrow` `thrownobj` thin, not Must-fix), **173**
ACCEPT-WITH-DEBT D-1211 (`mdamagem` wrap live; troll_baned/
gulpmm named), **174** ACCEPT-WITH-DEBT D-1212 (MINVENT/CONTAINED
+ `Adjmonnam`; buried non-zomb `impossible` named). Filled
D-1212 archive hash `fc314871`. No new Must-fix prepend.
Open 12 (no refill). Rotated #1525. Rule #2: no fs.
**Score:** cadence **#1540** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `32+0.27/turn` (R² 0.829). Next
@**#1545**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `dig.c` `rot_corpse` invent/minvent worn plines
(named). Not REVIVE.
**Blocked:** none.

## 2026-08-18 09:15 — #1539 D-1212 revive_corpse MINVENT/CONTAINED

**Objective:** Open — `do.c` `revive_corpse` OBJ_MINVENT /
OBJ_CONTAINED (named). Not BURIED.
**C locus:** `do.c` `revive_corpse` 2183–2215; `do_name.c`
`Adjmonnam` 1142–1148; `mondata.c` `locomotion` 1380–1392;
`zap.c` `get_obj_location` / `get_container_location`.
**Change:** C MINVENT drop/appear + CONTAINED pack/floor/minvent
sack plines after `revive`. `Adjmonnam` bite-covered (FLOOR +
MINVENT). Pack verb via `locomotion`. Snapshot where/mcarry/
container/oeaten before `revive`. `zap.js` `OBJ_FREE` for
contained `obfree`. Did not pull BURIED `!is_zomb` FALLTHROUGH
impossible or `Soundeffect`. Filled D-1211 archive hash
`481e005b`. Rotated #1524. Open 7 after archive; refill to 12.
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1535** **44**/44; next
@**#1540**).
**Verified:** private canary **20**/20; green+strict
seed8000/0900; cohort **4**/4 + strict 1500/1800/0012/0004.
**Next:** Open `dig.c` `rot_corpse` invent/minvent worn plines
(named). Not REVIVE.
**Blocked:** none.

## 2026-08-18 09:00 — #1538 D-1211 mhitm mdamagem gz.zombify around monkilled

**Objective:** Open — `mhitm.c` `gz.zombify` at monkilled
(named). Not make_corpse.
**C locus:** `mhitm.c` `mdamagem` 1083–1089.
**Change:** wrap both `mdamagem` death `monkilled` calls with
`game.zombify = (!mwep && zombie_maker(magr) && (AT_TUCH ||
AT_CLAW || AT_BITE) && zombie_form(mdef) !== NON_PM)` then
FALSE. Did not pull troll_baned, gulpmm swap, or passivemm
shock. Filled D-1210 archive hash `f1a3518a`. Rotated #1523.
Open 8 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1535** **44**/44; next
@**#1540**).
**Verified:** private canary **23**/23; green+strict
seed8000/0900; cohort **12**/12 + strict 0012/0004/1500/1800.
**Next:** Open `do.c` `revive_corpse` OBJ_MINVENT / OBJ_CONTAINED
(named). Not BURIED.
**Blocked:** none.

## 2026-08-18 08:50 — #1537 D-1210 zombie_maker + xkilled gz.zombify

**Objective:** Open — `mon.c` `zombie_maker` + `gz.zombify` at
`make_corpse` (named). Not mhitm.
**C locus:** `mon.c` `zombie_maker` 362–379; `xkilled` 3619–3624.
**Change:** `zombie_maker` (S_ZOMBIE except ghoul/skeleton, S_LICH,
!mcan; mndx compare). `xkilled` sets `game.zombify` around
`make_corpse` (`!thrownobj && !stoned && !uwep` + youmonst +
victim `zombie_form`) then FALSE. Did not pull mhitm monkilled
zombify. Filled D-1209 archive hash `b3c0d228`. Rotated #1522.
Open 9 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1535** **44**/44; next
@**#1540**).
**Verified:** private canary **36**/36; green+strict
seed8000/0900; cohort **12**/12 + strict lengths (fresh
process seed0012).
**Next:** Open `mhitm.c` `gz.zombify` at monkilled (named). Not
make_corpse.
**Blocked:** none.

## 2026-08-18 08:33 — #1536 D-1209 dotelecmd m-prefix mode menu

**Objective:** Open — `teleport.c` `dotelecmd` m-prefix mode menu
(named). Not energy gate.
**C locus:** `teleport.c` `dotelecmd` 917–1031; `spell.c`
`tport_spell` 1707–1757; `cmd.c` `C('t')` CMD_M_PREFIX 1890–1891.
**Change:** non-wizard `dotele(FALSE)`; wizard save H/E; `!m`
ignore restrictions; else PICK_ONE n/s/t/w (`w` preselected);
ESC ECMD_OK; `tport_spell` hide/add then reverse; rhack keeps
`menu_requested` for ^T. Snapshot-then-clear (JS split rhack).
Did not pull energy/`spelleffects`, LEVEL_TELEP yn, or
`#teleport` doextcmd. Rotated #1521. Open 10 after archive
(no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1535** **44**/44; next
@**#1540**).
**Verified:** private canary **28**/28; green+strict
seed8000/0900; cohort **8**/8 + strict 1500/0012/0360/0361/
4500/2200/0014/0004.
**Next:** Open `mon.c` `zombie_maker` + `gz.zombify` at
`make_corpse` (named). Not mhitm.
**Blocked:** none.
