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

## 2026-07-21 18:35 — #1194 ^X rank==role + eaten_stat

- Objective: seed4500 @1808 C `Knight, level 15 male human` +
  `(1 of 3)` vs JS `a level … Knight` + `(1 of 2)`.
- C locus: `insight.c` `background_enlightenment` `!strcmpi(rank,role)`;
  status Punished/Wounded_legs; attributes Jumping/umortality;
  `mkobj.c`/`eat.c` `weight`→`eaten_stat`.
- Change: `invent.js` role/rank clause + status/attr lines;
  `mkobj.js` FOOD/CORPSE `oeaten` `eaten_stat` (D-0928 #1194).
- Verification: green+strict PASS; cohort 10/10; seed4500 **PASS**
  Scr **1812→1814**.
- Next: leaderboard gap; cadence @**#1195** suite Scr reconfirm.

## 2026-07-21 18:20 — #1193 Kni goal_first / goal_next

- Objective: seed4500 @1799 C swamp-exit hole NHW_TEXT vs JS heat/smoke.
- C locus: `dat/quest.lua` Kni `goal_first`; `quest.c` `on_goal` →
  `qt_pager("goal_first")` before `temperature_change_msg`.
- Change: `questpgr.js` add Kni `goal_first`/`goal_next` from quest.lua
  (D-0928 #1193).
- Verification: green+strict PASS; cohort 7/7; focused Scr
  **1807→1812**; first miss **@1799→@1808**.
- Next: @**1808** ^X `background_enlightenment` rank==role branch.

## 2026-07-21 18:12 — #1192 cmd_safety iflags.cmdassist

- Objective: seed4500 @1770 C short waiting-hit tip vs JS blank.
- C locus: `do.c` `cmd_safety_prevention` — `iflags.cmdassist ||
  !(*flagcounter)++` (seed toggled cmdassist off via Options `j`).
- Change: `do.js` read `iflags.cmdassist` (default On), not
  `flags.cmdassist` (D-0928 #1192).
- Verification: green+strict PASS; cohort 7/7; focused Scr
  **1803→1807**; first miss **@1770→@1799**.
- Next: @**1799** C swamp-exit hole pline vs JS heat/smoke More.

## 2026-07-21 18:05 — #1191 castmu plines + urgent_pline

- Objective: seed4500 @1761 C mold + spell-at-you vs JS early rehumanize.
- C locus: `mcastu.c` `castmu` cast pline + `mcast_psi_bolt`;
  `pline.c` `urgent_pline`; `polyself.c` `polyman` was_blind
  `make_blinded`.
- Change: `mcastu.js` cast+PSI/OPEN severity plines before `mdamageu`;
  `display.js` `urgent_pline`/WIN_NOSTOP; `polyself.js` urgent return
  + was_blind Blind restore (D-0928 #1191).
- Verification: green+strict PASS; cohort 7/7; focused Scr
  **1799→1803**; first miss **@1761→@1770**.
- Next: @**1770** C keeps `Are you waiting to get hit?` vs JS clear.

## 2026-07-21 17:51 — #1190 done2 cancel clear + score

- Objective: cadence full `sessions` @#1190; seed4500 @1712 `#quit`
  yn `n` leftover prompt vs C clear.
- C locus: `end.c` `done2` cancel → `clear_nhwindow(WIN_MESSAGE)`.
- Change: `end.js` `done2` — `clear_nhwindow_message()` on `!ok`
  (D-0928 #1190).
- Verification: green+strict PASS; full suite **42**/44 Scr
  **11389**/11405 RNG **100%** speed `30+0.25/turn`; focused Scr
  **1798→1799**; first miss **@1712→@1761**.
- Next: @**1761** C brown-mold + spell-at-you vs JS rehumanize.

## 2026-07-21 17:45 — #1189 getpos mMoOdDxX gather_locs

- Objective: seed4500 @1698 C `open door` + cursor (63,7) vs JS blank.
- C locus: `getpos.c` `mMoOdDxX` → `gather_locs` / `gather_locs_interesting`
  (GLOC_DOOR) + `cmp_coord_distu`; doors skipped in feature matching[].
- Change: `getpos.js` gather_locs cycle for m/M/o/O/d/D/x/X + `@` SELF
  (D-0928 #1189).
- Verification: green+strict PASS; cohort 7/7; Scr **1796→1798**;
  first miss **@1698→@1712**.
- Next: @1712 `#quit` yn `n` C clears topline vs JS keeps prompt.

## 2026-07-21 17:33 — #1188 blank S_stone before typ CORR

- Objective: seed4500 @1691 Blind farlook C `stone` vs JS `corridor`.
- C locus: `pager.c` `lookat` case `S_stone` — seenv → `"stone"`
  (STONE|SCORR or fallthrough defsyms) even when typ is CORR.
- Change: `pager.js` `brief_at`/`describe_looked` + `getpos.js`
  `auto_describe_text` — blank + stone memory before typ CORR
  (D-0928 #1188).
- Verification: green+strict PASS; cohort 8/8 (0012/0360); Scr
  **1794→1796**; first miss **@1691→@1698**.
- Next: @1698 getpos C `open door` + cursor vs JS blank/stale.

## 2026-07-21 17:27 — #1187 getpos redraw_cmd ^R

- Objective: seed4500 @1689 C getpos goal msg vs JS Unknown `^R`.
- C locus: `getpos.c` HELP/`redraw_cmd` → `getpos_refresh` +
  `show_goal_msg`; `cmd.c` `redraw_cmd` → doredraw (C('r')).
- Change: `getpos.js` `redraw_cmd` + `getpos_refresh` (`flush_screen`)
  on `?`/`^R`; no full Blind `docrt`.
- Verification: green+strict PASS; cohort 4/4; Scr **1793→1794**;
  first miss **@1689→@1691**.
- Next: @1691 farlook `stone` vs `corridor` (auto_describe/lastseentyp).

## 2026-07-21 17:25 — #1186 doapply nohands + invent Blind

- Objective: seed4500 @1679 tools-current-form; then @1681 invent
  typed ring/wand under Blind mold.
- C locus: `apply.c` `doapply` nohands+`check_capacity` before getobj;
  `invent.c` sortloot_item `!Blind` observe (prop Blind).
- Change: `apply.js` gates; `invent.js` `invent_lines`/
  `display_pickinv_reply` use `Blind()` not sticky `u.Blind`.
- Verification: green+strict PASS; cohort 6/6; Scr **1784→1793**;
  first miss **@1679→@1689**.
- Next: @1689 getpos vs JS `Unknown direction: '^R'`.

## 2026-07-21 17:17 — #1185 doeat check_capacity + score

- Objective: cadence full `sessions` @#1185; seed4500 @1674 carry vs eat.
- C locus: `eat.c` `doeat` → `hack.c` `check_capacity` after `floorfood`,
  before `is_edible`.
- Change: `eat.js` `doeat` EXT_ENCUMBER gate + You_cant carry message
  (D-0928 #1185). Score refresh **42**/44 Scr **11374**/11405 RNG 100%.
- Verification: green+strict PASS; seed1800 PASS; focused Scr
  **1783→1784**; first miss **@1674→@1679**.
- Next: @**1679** `doapply` `nohands` before getobj (tools current form).

## 2026-07-21 17:15 — #1184 dosearch0 Blind feel_location

- Objective: seed4500 @1658 C `/` vs JS `#` (misread as open door).
- C locus: `detect.c` `dosearch0` — Blind/`visible_region_at` →
  `feel_location`; SDOOR/SCORR feel; `unmap_invisible`.
- Change: `detect.js` prop Blind + feel arms (D-0928 #1184); felt
  `WAN_OPENING` at (25,9).
- Verification: green+strict PASS; cohort 9/9; Scr **1732→1783**;
  first miss **@1658→@1674**.
- Next: @**1674** C carry-so-much-stuff vs JS eat-that.

## 2026-07-21 17:04 — #1183 wizwhere NHW_MENU dmore

- Objective: seed4500 @1650 C ` --More--` (col9) vs JS `--More--`.
- C locus: `dungeon.c` `print_dungeon` `NHW_MENU` putstr;
  `wintty.c` `dmore` offset 2 (not NHW_TEXT offset 1).
- Change: `dungeon.js` `print_dungeon(FALSE)` → `show_nhw_menu_text`
  (D-0928 #1183).
- Verification: green+strict PASS; cohort 7/7; Scr **1724→1732**;
  first miss **@1650→@1658**.
- Next: @**1658** map open-door `/` vs wall `#`.

## 2026-07-21 17:01 — #1182 dopay Blind canspotmon You_cant

- Objective: seed4500 @1625 C `You can't see...` vs JS Kabalebo pay.
- C locus: `shk.c` `dopay` — `canspotmon` seensk; Blind/`Blind_telepat`;
  `You_cant("see...")`.
- Change: `shk.js` `dopay` real `canspotmon` + Blind gates + see arm
  (D-0928 #1182).
- Verification: green+strict PASS; cohort 7/7; Scr **1723→1724**;
  first miss **@1625→@1650**.
- Next: @**1650** `#wizwhere` ` --More--` vs `--More--`.

## 2026-07-21 16:55 — #1181 show_achievements + record

- Objective: seed4500 @1573 Voluntary challenges More r11 vs C r20.
- C locus: `insight.c` `show_achievements`/`record_achievement`;
  `exper.c` `pluslvl` ranks; `do.c` ACH_HELL/MINE/SOKO;
  `hack.c` ACH_TOWN.
- Change: real `uachieved` + wizard `#conduct` Achievements block;
  wire rank/hell/mines/town (+SHOP/TMPL imports) (D-0928 #1181).
- Verification: green+strict PASS; cohort 6/6; Scr **1722→1723**;
  first miss **@1573→@1625**.
- Next: @**1625** C `You can't see...` vs JS Kabalebo pay.

## 2026-07-21 16:50 — #1180 score + prop Blind doname

- Objective: cadence full `sessions` @#1180; seed4500 @1501 wish
  `a ring` vs `engagement ring` (Blind mold).
- C locus: `objnam.c` `xname_flags`/`doname` `!Blind`→`observe_object`;
  `youprop.h` Blind ≡ props (not sticky `u.Blind`).
- Change: `objnam.js` prop Blind for `xname`/`doname` observe
  (D-0928 #1180). Suite score: **42**/44 Scr **11312**/11405 RNG
  **100%** speed `30+0.25/turn`.
- Verification: green+strict PASS; cohort 6/6; Scr **1720→1722**;
  first miss **@1501→@1573**.
- Next: @**1573** Voluntary challenges leftover `--More--`.
