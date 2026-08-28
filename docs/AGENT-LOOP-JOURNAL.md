# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
## 2026-08-28 — D-1583 vision.c nv_range circle

**Objective:** Open `vision.c` `nv_range` circle (named).
Not unblock_point.
**C locus:** `vision.c` `vision_recalc` `:670–700`;
`u_init_misc` nv_range=1; `circle_ptr`.
**JS locus:** 3×3 lighting-loop stand-in after D-1571.
**Change:** `apply_nv_range_in_sight` after xray; drop 3×3.
Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **28**/28; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `mk_mplayer`. Not nv_range.
**Blocked:** none.
## 2026-08-28 — D-1582 cmd.c PREFIXCMD / cmdq_shift

**Objective:** Open `cmd.c` PREFIXCMD / `cmdq_shift` (named).
Not do_repeat.
**C locus:** `cmd.c` PREFIXCMD `:3762–3774`; `cmdq_shift`
`:354–370`; doextcmd `:3753–3760`.
**JS locus:** named omit after D-1563/D-1186; g/G returned;
REPEAT replace; no shift.
**Change:** `got_prefix_input` loop; REPEAT append; ext_tlist
shift. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **11**/11; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open nv_range circle. Not PREFIXCMD.
**Blocked:** none.
## 2026-08-28 — D-1581 pickup.c traditional_loot / invent.c askchain

**Objective:** Open `pickup.c` traditional_loot askchain (named).
Not `'r'` reversed.
**C locus:** `pickup.c` `traditional_loot` `:3229–3261`;
`query_classes` `:140–262`; `invent.c` `askchain` `:2376–2541`.
**JS locus:** named omit after D-1567; MENU_FULL `menu_loot_*`.
**Change:** live query_classes + askchain; TRADITIONAL take-out /
put-in; INVLET sortloot; yn `#`. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **16**/16; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open PREFIXCMD / `cmdq_shift`. Not nv_range.
**Blocked:** none.
## 2026-08-28 — D-1580 invent.c gacc / BALL `'0'`

**Objective:** Open `invent.c` gacc / `'0'` ball class (named).
Not mime_action.
**C locus:** `invent.c` `display_pickinv` `:3323–3325`;
`let_to_name` `:4799–4839`; `drawing.c` `def_oc_syms`;
`wintty.c` `process_menu_window` gacc collect + `'0'` vs count.
**JS locus:** named omit after D-1579; digits always counted.
**Change:** live `def_oc_syms` + collect/take gacc; getobj
want_reply stays gacc 0. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **21**/21; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open traditional_loot askchain. Not `'r'` reversed.
**Blocked:** none.
## 2026-08-28 — D-1579 invent.c mime_action

**Objective:** Open `invent.c` mime_action (named). Not force_invmenu.
**C locus:** `invent.c` `mime_action` `:1677–1706`; `getobj`
`:1946–1949`; `hacklib.c` `ing_suffix` `:362–396`.
**JS locus:** named omit after D-1578; typed `'-'` returned null.
**Change:** live mime + getobj/getobj_adjust typed hands; canonical
`ing_suffix` (clones retired). Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **20**/20; green+strict seed8000/0900; cohort
**7**/7 + strict.
**Next:** Open gacc / `'0'` ball class. Not traditional_loot.
**Blocked:** none.
## 2026-08-28 — D-1578 invent.c force_invmenu `*`/`?` redo

**Objective:** Open `invent.c` force_invmenu `*`/`?` redo (named).
Not hands/xtra.
**C locus:** `invent.c` `getobj` `:1923–2001`; `display_pickinv`
`:3345–3366`.
**JS locus:** named omit after D-1569; n==1 already skipped
message_menu when force.
**Change:** Special `*`/`?` rows + query; getobj auto `?`/`*`
oneloop; redo_menu in `getobj_display_pickinv`. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **21**/21; green+strict seed8000/0900; cohort
**7**/7 + strict.
**Next:** Open mime_action. Not gacc.
**Blocked:** none.
