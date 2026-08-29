# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-29 — D-1621 invent.c adjust_split

**Objective:** Open `invent.c` `adjust_split` GC_ECHOFIRST|GC_CONDHIST
(named). Not get_count.
**C locus:** `invent.c` `adjust_split` `:5007–5065`; `doorganize_core`
nobj `:5089–5239`; caller `iactions.c` `itemactions_pushkeys`
IA_ADJUST_STACK.
**JS locus:** `js/invent.js` `adjust_split` / `doorganize_core`;
`js/iactions.js` pushkeys; `js/u_init.js` `assigninvlet` export.
**Change:** getobj `"split"` + yn digit + `get_count` flags then
`splitobj`+core. Cancel unsplit. Occupied bump. `#altadjust`
INTERNALCMD canned. wonky-gold named. Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **12**/12; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `questpgr.c` `com_pager_core` synopsis. Not
restore_msghistory.
**Blocked:** none.
## 2026-08-29 — review D-1612–D-1620 (audit #2020)

**Objective:** C-fidelity review of nine `js/` SHAs since **572**;
cadence score. No `js/` edits.
**C locus:** yn ^P; `get_count` historicmsg; `restore_msghistory`;
`consume_obj_charge` known; `reset_hostility`; dog_move
`lose_guardian_angel`; MS_HUMANOID; `take_off`; floor
`query_classes`.
**JS locus:** reviews **573–581** (`7012e194`…`cb4d8a91`).
**Change:** ACCEPT-WITH-DEBT 573–581. No QUALITY-RISK / Must-fix.
Filled archive D-1620 `%h` `cb4d8a91`.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
`39+0.30/turn` (R² 0.853) at `cb4d8a91`. seed4500 PASS.
**Verified:** cadence `__RESULTS_JSON__`; `check-hot-docs --review 573-581`.
**Next:** Open `adjust_split`. Not get_count.
**Blocked:** none.
## 2026-08-29 — D-1620 pickup.c floor query_classes

**Objective:** Open `pickup.c` floor `query_classes` (named). Not
traditional_loot.
**C locus:** `pickup.c` `pickup` `:793–891`; `query_classes`
`:140–262`; `hack.h` ynaq/ynNaq; `count_unpaid` nobj.
**JS locus:** `js/pickup.js` `pickup` / `pickup_traditional_floor` /
`query_classes`.
**Change:** TRADITIONAL && !menu_requested && ct>=2: There +
query_classes getlin then yn/`pickup_object` (default `'y'`). `'m'`
→ query_objlist allow_all/-3. `count_unpaid` for `'u'`. hideunder /
`safe_qbuf` / engulfer named. Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **14**/14; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `invent.c` `adjust_split` GC_ECHOFIRST|GC_CONDHIST.
Not get_count.
**Blocked:** none.
## 2026-08-29 — D-1619 do_wear.c take_off occupation

**Objective:** Open `do_wear.c` `take_off` occupation (named). Not
ggetobj.
**C locus:** `do_wear.c` `take_off` `:2899–2987`; `do_takeoff`
`:2823–2896`; `takeoff_order` `:17–21`; caller `doddoremarm`
`:3050`; `Amulet_off` `:1089–1189`.
**JS locus:** `js/do_wear.js` `take_off` / `do_takeoff` /
`Amulet_off`.
**Change:** occupation walks `takeoff_order` with `oc_delay` (cloak/
suit extra, start `--`); `do_takeoff` I_SPECIAL then cursed+`*_off`;
continue `'A'` `set_occupation`. ESP/`RESTFUL_SLEEP` `Amulet_off`.
`menu_remarm` named. Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **19**/19; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `pickup.c` floor `query_classes`. Not traditional_loot.
**Blocked:** none.
## 2026-08-29 — D-1618 sounds.c peaceful MS_HUMANOID

**Objective:** Open `sounds.c` peaceful MS_HUMANOID (named). Not
mplayer_talk.
**C locus:** `sounds.c` `domonnoise` MS_HUMANOID `:1025–1104`;
MS_ORC remap `:705–709`; epilogue `:1222–1241`.
**JS locus:** `js/sounds.js` `domonnoise`.
**Change:** hostile else `"threatens you."` then peaceful
flee/moan/Huh/blind/trapped/hungry/race switch; MS_ORC `same_race`
or Hallu remaps so gnome gag is reachable. Epilogue `verbalize`
not invented `says:`. MS_BOAST named. Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **34**/34; green+strict seed8000/0900;
cohort **9**/9 + strict.
**Next:** Open `do_wear.c` `take_off` occupation. Not ggetobj.
**Blocked:** none.
## 2026-08-29 — D-1617 dogmove.c Conflict lose_guardian_angel

**Objective:** Open `dogmove.c` Conflict `lose_guardian_angel` caller
(named). Not gain_guardian_angel.
**C locus:** `dogmove.c` `dog_move` `:1046–1053`; callee
`minion.c` `lose_guardian_angel` `:467–494` (D-1608).
**JS locus:** `js/dogmove.js` `dog_move`; body `js/minion.js`.
**Change:** Conflict `!edog` awaits `lose_guardian_angel(mtmp)` then
`MMOVE_DIED` instead of returning DIED with the angel still on the
map. C is 8 lines (density exception). dismount_steed DISMOUNT_THROWN
named. Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **17**/17; green+strict seed8000/0900;
cohort **7**/7 + strict (incl. seed0004 Conflict).
**Next:** Open `sounds.c` peaceful MS_HUMANOID. Not mplayer_talk.
**Blocked:** none.
## 2026-08-29 — D-1616 priest.c reset_hostility

**Objective:** Open `mon.c` `reset_hostility` (named). Not
gain_guardian_angel. (C is `priest.c`; caller `do.c` `final_level`.)
**C locus:** `priest.c` `reset_hostility` `:754–768`; caller
`do.c` `final_level` `:2046` `iter_mons`.
**JS locus:** `js/priest.js` `reset_hostility`; `js/do.js`
`final_level`.
**Change:** isminion aligned cleric/angel whose emin.min_align
differs from hero align becomes hostile then set_malign; always
newsym after those checks. Astral `madeNew` walks fmon first.
ACH_ASTR named. Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **18**/18; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open dogmove Conflict `lose_guardian_angel` caller. Not
gain_guardian_angel.
**Blocked:** none.
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
