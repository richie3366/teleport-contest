# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-29 — D-1626 sounds.c MS_BOAST hostile giants

**Objective:** Open `sounds.c` MS_BOAST hostile giants (named).
Not MS_HUMANOID.
**C locus:** `sounds.c` `domonnoise` MS_BOAST `:1006–1023`;
peaceful FALLTHROUGH MS_HUMANOID; `you.h` `mhis`.
**JS locus:** `js/sounds.js` `domonnoise`; `js/fountain.js` `mhis`.
**Change:** hostile `rn2(4)` gem/`mhis` / mutton / Fee-Fie +
`wake_nearto(7*7)`; case 0 immediate pline then ECMD_TIME;
peaceful FALLTHROUGH into live HUMANOID. Guardian remaps named.
Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** green+strict seed8000/0900; cohort **7**/7 +
seed2200/0383 + strict.
**Next:** Open `steed.c` `dismount_steed` DISMOUNT_THROWN.
Not dog_move Conflict.
**Blocked:** none.

## 2026-08-29 — D-1625 cmd.c doextlist

**Objective:** Open `cmd.c` `doextlist` (named). Not #seeall EXT_CMDS.
**C locus:** `cmd.c` `doextlist` `:560–734` /
`doc_extcmd_flagstr` `:523–557`; `doextcmd` `:516–517` loop;
pager.c `hmenu_doextlist` `:2813–2816`.
**JS locus:** `js/cmd.js` `doextlist`; `js/getline.js` `#?` +
`doextcmd` loop; `js/pager.js` help `k`.
**Change:** NHW_MENU list from EXTCMDLIST; `#?` runner; loop while
doextlist; help calls `doextlist` not `cmdhelp`. BIND= `seeall`
named. Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** green+strict seed8000/0900; cohort **7**/7 +
seed2200/0383 + strict.
**Next:** Open `sounds.c` MS_BOAST hostile giants. Not MS_HUMANOID.
**Blocked:** none.

## 2026-08-29 — D-1624 getline.c EDIT_GETLIN off

**Objective:** Open `getline.c` EDIT_GETLIN (named). Not getline ^P.
**C locus:** `config.h:655` commented; `hooked_tty_getlin` `:70–78`
`#else *bufp='\0'`; `name_from_player` `:105–128`;
`query_annotation` `:2499–2567`; epilogue `:173–186`.
**JS locus:** `js/getline.js` `getlin`/`get_ext_cmd`;
`js/display.js` `hooked_getlin_epilogue`; `js/do_name.js`
`name_from_player`; `js/dungeon.js` `query_annotation`.
**Change:** two-arg getlin with EDIT_GETLIN false; name_from_player
nhUse(defres); annotate find_mapseen + replace prompt +
other-level describe_level; dumplogmsg / extcmd suppress_history.
kill_char named. Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** green+strict seed8000/0900; cohort **7**/7 + strict.
**Next:** Open `cmd.c` `doextlist`. Not #seeall EXT_CMDS.
**Blocked:** none.

## 2026-08-29 — D-1623 topl.c tty_yn_function post-answer toplines

**Objective:** Open `topl.c` `tty_yn_function` post-answer
`toplines=prompt+key` (named). Not yn ^P.
**C locus:** `win/tty/topl.c` `tty_yn_function` clean_up `:532–542`;
`cmd.c` `key2txt`; `pline.c` `dumplogmsg`.
**JS locus:** `js/getline.js` `tty_yn_clean_up` / `yn_function`;
`js/display.js` `tty_yn_rewrite_toplines`; `js/dokeylist.js`
`key2txt` (no clone).
**Change:** rewrite `gt.toplines` to prompt+key2txt (or `#N`) +
dumplogmsg. Not addtopl (leftover stays painted). `tty_nhbell` /
`cw->cury` / `intr` named. Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** green+strict seed8000/0900; cohort **7**/7 + strict.
**Next:** Open `getline.c` EDIT_GETLIN. Not getline ^P.
**Blocked:** none.

## 2026-08-29 — D-1622 questpgr.c com_pager_core synopsis

**Objective:** Open `questpgr.c` `com_pager_core` synopsis (named).
Not restore_msghistory.
**C locus:** `questpgr.c` `com_pager_core` `:467–621`; wrappers
`com_pager`/`qt_pager`; `skip_pager`.
**JS locus:** `js/questpgr.js` `com_pager_core` / `qt_pager` /
`com_pager` / `com_pager_legacy`.
**Change:** howtoput + default+newline synthesize `[text]` then
`convert_line`+`putmsghistory(FALSE)`. Live lua synopsis + legacy
NHW_MENU. pronoun / common fallback / array rn2 named. Rule #2:
no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** green+strict seed8000/0900; cohort **7**/7 +
seed0367/0360/0361/4500 + strict.
**Next:** Open `topl.c` `tty_yn_function` post-answer
`toplines=prompt+key`. Not yn ^P.
**Blocked:** none.

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
