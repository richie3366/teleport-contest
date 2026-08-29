# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-29 — D-1615 invent.c consume_obj_charge known

**Objective:** Open `apply.c` `consume_obj_charge` `update_inventory`
(named). Not perm_invent InvInUse.
**C locus:** `invent.c` `consume_obj_charge` `:1336–1346`.
**JS locus:** `js/invent.js` `consume_obj_charge`.
**Change:** after `spe--`, `if (obj.known) update_inventory()`.
C is 11 lines (density exception). Pickup tip-spill / trap
`disarm_squeaky_board` / use_grease trailing `:2652` named.
Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **8**/8; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `reset_hostility`. Not gain_guardian_angel.
**Blocked:** none.

## 2026-08-29 — D-1614 restore.c restore_msghistory

**Objective:** Open `restore.c` `restore_msghistory` (named). Not
putmsghistory.
**C locus:** `restore.c` `restore_msghistory` `:1411–1441`; pair
`save.c` `save_msghistory` `:1029–1056`.
**JS locus:** `js/save.js` `restore_msghistory` / `save_msghistory`.
**Change:** JSON VFS array analogue of Sfo/Sfi length+chars; restore
`putmsghistory(msg,TRUE)` then `NULL` if any; save `getmsghistory`
skip-empty truncate BUFSZ-1. `restore_gamelog` named. Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **11**/11; focused seed0013 restore
PASS; green+strict seed8000/0900; cohort **7**/7 + strict.
**Next:** Open `consume_obj_charge` `update_inventory`. Not
perm_invent InvInUse.
**Blocked:** none.

## 2026-08-29 — D-1613 cmd.c get_count historicmsg

**Objective:** Open `cmd.c` `get_count` historicmsg (named). Not
putmsghistory.
**C locus:** `cmd.c` `get_count` `:5009–5090`.
**JS locus:** `js/cmd.js` `get_count`; `js/invent.js`
`getobj_take_count`.
**Change:** GC_SAVEHIST/CONDHIST/ECHOFIRST; parse GC_NOFLAGS;
getobj SAVEHIST putmsghistory Count+key2txt. Clone retired.
`adjust_split` / restore_msghistory named. Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **18**/18; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `restore_msghistory`. Not putmsghistory.
**Blocked:** none.

## 2026-08-29 — D-1612 topl.c tty_yn_function ^P

**Objective:** Open `topl.c` `tty_yn_function` ^P (named). Not
command ^P. Not getline ^P.
**C locus:** `win/tty/topl.c` `tty_yn_function` `:434–463`.
**JS locus:** `js/getline.js` `yn_function` / `tty_yn_ctrl_p`.
**Change:** inread++/SPECIAL around yn; non-`'s'` zeros inread then
restore; `'s'` double-call then discards next key. Not
`hooked_getlin_ctrl_p`. restore_msghistory / get_count historicmsg
named. Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **14**/14; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `get_count` historicmsg. Not putmsghistory.
**Blocked:** none.

## 2026-08-29 — review D-1603–D-1611 (audit #2010)

**Objective:** C-fidelity review of nine `js/` SHAs since **563**;
cadence score. No `js/` edits.
**C locus:** `beyond_savefile_load`; zap `Blind`; `#seeall`;
`mplayer_talk`; `mongets` spe; `gain_guardian_angel`; `m_unleash`;
`initedog` ogoal; hooked_tty_getlin ^P.
**JS locus:** reviews **564–572** (`d1a832a1`…`21441f2e`).
**Change:** ACCEPT-WITH-DEBT 564–572. No QUALITY-RISK / Must-fix.
Filled archive D-1611 `%h` `21441f2e`.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
`39+0.31/turn` (R² 0.862) at `21441f2e`. seed4500 PASS.
**Verified:** cadence `__RESULTS_JSON__`; `check-hot-docs --review 564-572`.
**Next:** Open yn ^P. Not command ^P.
**Blocked:** none.

## 2026-08-29 — D-1611 getline.c hooked_tty_getlin ^P

**Objective:** Open `getline.c` getlin ^P `tty_doprev_message` (named).
Not command ^P.
**C locus:** `win/tty/getline.c` `hooked_tty_getlin` `:105–141`.
**JS locus:** `js/getline.js` `getlin` / `get_ext_cmd`; `js/display.js`
inread / SPECIAL_PROMPT.
**Change:** zeros `inread` around `tty_doprev_message`; `'s'`/`'c'`
double-call first then continue; else restore prompt. Same C fn for
`#` extcmd. yn ^P named. Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **19**/19; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open yn ^P. Not command ^P.
**Blocked:** none.
