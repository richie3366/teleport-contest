# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-28 — D-1593 dog.c tamedog ustuck expels/unstuck

**Objective:** Open `dog.c` tamedog ustuck expels/unstuck (named). Not
FULL_MOON.
**C locus:** `dog.c` `tamedog` `:1184–1190`; `mhitu.c` `expels`;
`mon.c` `unstuck`; `mondata.c` `sticks`.
**JS locus:** named omit after D-1585 (comment only).
**Change:** live swallow `expels` else `!(Upolyd && sticks)` `unstuck`.
Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **11**/11; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open tamedog `initedog` has_edog. Not ustuck.
**Blocked:** none.
## 2026-08-28 — D-1592 pickup.c more_containers n

**Objective:** Open `pickup.c` more_containers `n` (named). Not
traditional_loot.
**C locus:** `pickup.c` `in_or_out_menu` `:3397–3477`;
`use_container` `:3091`; `do_loot_cont` `:2161`; `doloot_core`
`:2217–2273` `container_at`.
**JS locus:** named omit after D-1581 (no `'n'` row; first box only).
**Change:** live Next default + `'q'` abort vs `'n'` continue +
num_conts>1 PICK_ANY. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **11**/11; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open tamedog ustuck expels. Not more_containers.
**Blocked:** none.
## 2026-08-28 — D-1591 invent.c display_used_invlets

**Objective:** Open `invent.c` `display_used_invlets` (named). Not gacc.
**C locus:** `invent.c` `display_used_invlets` `:3466–3519`; caller
`doorganize_core` `:5146`; `wintty.c` `tty_add_menu`/`tty_end_menu`.
**JS locus:** named omit after D-0127/D-1590 (`?`/`*` Never_mind).
**Change:** live used-letters PICK_ONE (sortpack headings, doname,
obj_glyph, ESC vs empty); `#adjust` `?`/`*` awaits it. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **12**/12; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open more_containers `n`. Not `display_used_invlets`.
**Blocked:** none.
## 2026-08-28 — D-1590 invent.c wizid unid_cnt>0 PICK_ANY

**Objective:** Open `invent.c` wizid unid_cnt>0 PICK_ANY (named). Not gacc.
**C locus:** `invent.c` `display_pickinv` `:3222–3407`; `windows.c`
`menuitem_invert_test`; `wintty.c` group_accel; `visctrl`.
**JS locus:** named omit after D-0928/D-1580/D-1589.
**Change:** live `_`/`^I` SKIPINVERT PICK_ANY + identify_pack /
per-item identify; empty invent pline. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **25**/25; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `display_used_invlets`. Not wizid unid_cnt>0.
**Blocked:** none.
## 2026-08-28 — D-1589 invent.c sortloot inuse_only

**Objective:** Open `invent.c` sortloot inuse_only (named). Not gacc.
**C locus:** `invent.c` `inuse_classify` `:70–144`; `sortloot_cmp`
SORTLOOT_INUSE; `sortloot` filterfunc; `display_pickinv`
`:3186–3317`; `dispinv_with_action`; `doprinuse`/`dopr*`.
**JS locus:** named omit after D-1580/D-1581/D-1588.
**Change:** live INUSE classify + `is_inuse` filter + inuse_headers
+ fake HANDS_SYM + `*` seeall + CMD_M_PREFIX keep. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** inuse sort unit; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open wizid unid_cnt>0 PICK_ANY. Not `display_used_invlets`.
**Blocked:** none.
## 2026-08-28 — D-1588 invent.c putmsghistory

**Objective:** Open `invent.c` putmsghistory (named). Not gacc.
**C locus:** `invent.c` `getobj` `:1926–1928`; `topl.c`
`tty_putmsghistory` `:676–726`; `remember_topl`; `dumplogmsg`.
**JS locus:** named omit after D-1578/D-1580.
**Change:** live `putmsghistory`/`remember_topl`/`dumplogmsg` +
getobj/getobj_adjust `msggiven`. `tty_doprev_message` /
restore_msghistory / get_count historicmsg named. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **9**/9; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open sortloot inuse_only. Not putmsghistory.
**Blocked:** none.
## 2026-08-28 — D-1587 display.c mimic_light_blocking See_invisible

**Objective:** Open `display.c` `mimic_light_blocking` See_invisible
block/unblock (named). Not seemimic.
**C locus:** `display.c` `mimic_light_blocking` `:1531–1540`;
`set_mimic_blocking` `iter_mons`; `youprop.h` See_invisible.
**JS locus:** named omit after D-1574 (`recalc_block_point`).
**Change:** live See_invisible `block_point`/`unblock_point` (not
`recalc`). potion/timeout/polyself callers named. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **21**/21; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open putmsghistory. Not gacc.
**Blocked:** none.
## 2026-08-28 — D-1586 mon.c newcham NC_SHOW_MSG

**Objective:** Open `mon.c` `newcham` NC_SHOW_MSG `pline_mon` (named).
Not Protection cancel.
**C locus:** `mon.c` `newcham` `:5458–5478` + `usmellmon`;
`do_name.c` `noname_monnam`; `hacklib.c` `upstart`.
**JS locus:** named omit after D-1573.
**Change:** live `pline_mon` disappears/appears/turns-into +
`usmellmon`; export `noname_monnam`/`upstart`. `NO_NC_FLAGS`
stays boolean. ustuck / `m_unleash` / break-armor named.
Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **17**/17; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `mimic_light_blocking`. Not NC_SHOW_MSG.
**Blocked:** none.
## 2026-08-28 — D-1585 dog.c tamedog FULL_MOON S_DOG

**Objective:** Open `dog.c` FULL_MOON S_DOG `rn2(6)` (named).
Not wake_nearto.
**C locus:** `dog.c` `tamedog` `:1176–1178` + catch `:1199–1209`;
`objnam.c` `Tobjnam`; `calendar.c` `night`.
**JS locus:** named omit after D-1546/D-1577.
**Change:** live moon refuse (left-to-right `rn2(6)`) + catch
`pline_mon`/big_corpse; export `Tobjnam`. ustuck / has_edog named.
Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary PASS; green+strict seed8000/0900; cohort
**7**/7 + strict.
**Next:** Open `newcham` NC_SHOW_MSG. Not FULL_MOON.
**Blocked:** none.
## 2026-08-28 — review D-1576–D-1584 (audit #1980)

**Objective:** C-fidelity review of nine `js/` SHAs since **536**;
cadence score. No `js/` edits.
**C locus:** region per-cell block; `redraw_worm`; force_invmenu;
`mime_action`; gacc/`'0'`; traditional_loot; PREFIXCMD/`cmdq_shift`;
`nv_range` circle; `mk_mplayer`.
**JS locus:** reviews **537–545** (`7131dc25`…`05c69d9b`).
**Change:** all **ACCEPT-WITH-DEBT**. Must-fix empty. Filled
archive D-1584 `%h` `05c69d9b`.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
`38+0.30/turn` (R² 0.85) at `05c69d9b`. seed4500 PASS.
**Verified:** cadence `__RESULTS_JSON__`; `check-hot-docs --review 537-545`.
**Next:** Open FULL_MOON S_DOG. Not `create_mplayers`.
**Blocked:** none.
## 2026-08-28 — D-1584 mplayer.c mk_mplayer

**Objective:** Open `makemon.c` `mk_mplayer` (named).
Not ndemon.
**C locus:** `mplayer.c` `mk_mplayer` `:117–317`;
`dev_name`/`get_mplname`/`mk_mplayer_armor`;
`sp_lev.c` `:1985–1986`.
**JS locus:** named omit after D-1553; no `js/mplayer.js`.
**Change:** live `mk_mplayer` + splev RANDOM role-id;
export `rnd_*_item`; `monmightthrowwep`. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **13**/13; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open FULL_MOON S_DOG. Not `mk_mplayer`.
**Blocked:** none.
