# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-29 — D-1631 termcap.c tty_nhbell / yn cury+intr

**Objective:** Open `topl.c` `tty_yn_function` `tty_nhbell` (named).
Not post-answer toplines.
**C locus:** `win/tty/termcap.c` `tty_nhbell` `:750–757`;
`topl.c` `tty_yn_function` `:475–478`/`:518`/`:544–548`;
optlist silent On; `AppendLongDigit`.
**JS locus:** `js/display.js` `tty_nhbell` / `tty_yn_clean_up_tty`;
`js/getline.js` `yn_function`; `js/jsmain.js` silent; `help_dir`.
**Change:** silent default On; yn invalid + digit abort bell;
wrap `cw->cury` clears leftover not `gt.toplines`; `intr--`.
kill_char named. Rule #2: no stdout BEL.
**Score:** fortress held (not a full-suite iter).
**Verified:** leftover/cury canary; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `getline.c` `kill_char`. Not EDIT_GETLIN.
**Blocked:** none.
## 2026-08-29 — D-1630 do_wear.c menu_remarm

**Objective:** Open `do_wear.c` `menu_remarm` (named). Not take_off
occupation.
**C locus:** `do_wear.c` `menu_remarm` `:3089–3138`; callees
`pickup.c` `query_category` / `query_objlist` / `is_worn_by_type`.
**JS locus:** `js/do_wear.js` `menu_remarm`; `js/pickup.js` exports.
**Change:** MENU_FULL category then invent USE_INVLET PICK_ANY;
COMBINATION ggetobj combo; TRADITIONAL `'m'` retry. `obj_to_glyph`
named.
**Score:** fortress 44/44 (cadence #2030). Green+cohort PASS.
**Verified:** single-class skip canary; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `tty_nhbell`. Not post-answer toplines.
**Blocked:** none.
## 2026-08-29 — review D-1621–D-1629 (audit #2030)

**Objective:** C-fidelity review of nine `js/` SHAs since **581**;
cadence score. No `js/` edits.
**C locus:** `adjust_split`; `com_pager_core`; yn post-answer
toplines; EDIT_GETLIN; `doextlist`; MS_BOAST; DISMOUNT_THROWN;
`restore_gamelog`; `free_edog` / restmon `newedog`.
**JS locus:** reviews **582–590** (`5f2c5f4d`…`54c89bcc`).
**Change:** ACCEPT-WITH-DEBT 582–590. No QUALITY-RISK / Must-fix.
Filled archive D-1629 `%h` `54c89bcc`.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
`39+0.30/turn` (R² 0.856) at `54c89bcc`. seed4500 PASS.
**Verified:** cadence `__RESULTS_JSON__`; `check-hot-docs --review 582-590`.
**Next:** Open `menu_remarm`. Not take_off occupation.
**Blocked:** none.
## 2026-08-29 — D-1629 dog.c free_edog

**Objective:** Open `dog.c` `free_edog` (named). Not initedog ogoal.
**C locus:** `dog.c` `free_edog` `:34–42` (extern-only); pair
`restore.c` `restmon` `:349–361` `newedog`+apport; `save.c`
`savemon` `:860–869`.
**JS locus:** `js/dog.js` `free_edog`; `js/makemon.js`
`restmon_edog`/`savemon_edog`; `js/save.js` / `js/bones.js`.
**Change:** drop EDOG + JS mirror then mtame=0; restmon remirror +
apport≤0→1; savemon fills mextra.edog. JSON absolute times.
Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **13**/13; focused seed0013 restore
PASS; green+strict seed8000/0900; cohort **7**/7 + strict.
**Next:** Open `do_wear.c` `menu_remarm`. Not take_off occupation.
**Blocked:** none.
## 2026-08-29 — D-1628 restore.c restore_gamelog

**Objective:** Open `restore.c` `restore_gamelog` (named). Not
restore_msghistory.
**C locus:** `restore.c` `restore_gamelog` `:1386–1409` caller
`restgamestate` `:721`; pair `save.c` `save_gamelog` `:236–262`
caller `:327`; callee `pline.c` `gamelog_add`.
**JS locus:** `js/save.js` `save_gamelog` / `restore_gamelog`.
**Change:** JSON analogue of Sfi length+chars+turn/flags until `-1`
then `gamelog_add`; save walk no skip-empty; missing field = old
JSON; too-big throws. Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **10**/10; focused seed0013 restore
PASS; green+strict seed8000/0900; cohort **7**/7 + strict.
**Next:** Open `dog.c` `free_edog`. Not initedog ogoal.
**Blocked:** none.
## 2026-08-29 — D-1627 steed.c dismount_steed DISMOUNT_THROWN

**Objective:** Open `steed.c` `dismount_steed` DISMOUNT_THROWN
(named). Not dog_move Conflict.
**C locus:** `steed.c` `dismount_steed` `:603–618` THROWN
FALLTHROUGH KNOCKED/FELL; Flying/Lev `:593–598`; `heal_legs(1)`
`:655–657`; callers `dogmove.c` `:1016–1019`, `dog.c` `wary_dog`
`:1342–1343`.
**JS locus:** `js/steed.js` `dismount_steed`; `js/dogmove.js`;
`js/dog.js` `wary_dog`.
**Change:** usteed-clear Flying/Lev snapshot; `"are thrown"` /
u_locomotion verb; `losehp` Maybe_Half_Phys(`rn1(10,10)`) +
`set_wounded_legs` + skip `heal_legs` when grounded; `heal_legs(1)`
while mounted; wire Conflict steed + `wary_dog`. Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** green+strict seed8000/0900; cohort **7**/7 +
seed2200/0383 + seed0103/0104 + strict.
**Next:** Open `restore.c` `restore_gamelog`. Not restore_msghistory.
**Blocked:** none.
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
