# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
