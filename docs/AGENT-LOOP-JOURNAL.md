# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-29 — D-1637 mon.c restore_cham getlev + With_you

**Objective:** Open `mon.c` `restore_cham` (named). Not normal_shape.
**C locus:** `mon.c` `restore_cham` `:4646–4658`; callers
`restore.c` `getlev` `:1217`; `dog.c` `mon_arrive` `:464`;
zap `montraits` `:824` already live.
**JS locus:** `js/mon.js` `restore_cham`; `js/do.js`
`getlev_catchup_monsters`; `js/dog.js` `mon_arrive_with_you`.
**Change:** await restore_cham on getlev catchup (before hide_monst
rnd(10), after REST_LEVELS continue) and With_you before usteed;
PfSC reads uprops H||E plus flats.
**Score:** fortress held (not a full-suite iter).
**Verified:** canary **18**/18; green+strict seed8000/0900; cohort
**7**/7 + strict.
**Next:** Open `do_name.c` `do_mgivenname`. Not kill_char.
**Blocked:** none.
## 2026-08-29 — D-1636 nhlua.c restore_luadata / save_luadata

**Objective:** Open `nhlua.c` `restore_luadata` (named). Not
restore_gamelog.
**C locus:** `nhlua.c` `restore_luadata` `:1344–1363` / `save_luadata`
`:1327–1341` / `get_nh_lua_variables` `:1296–1316`; `dat/nhcore.lua`
`get_variables_string`; `dat/nhlib.lua` `table_stringify`; callers
`restore.c` `:722` / `save.c` `:328`.
**JS locus:** `js/save.js` `restore_luadata` / `save_luadata`;
`js/mklev.js` `l_nhcore_init`; `js/jsmain.js` unixmain no second init.
**Change:** JSON lua source round-trip; `!luacore` init then loadstring;
missing JSON still inits; drop post-restore shuffle.
**Score:** fortress held (not a full-suite iter).
**Verified:** canary **22**/22; focused seed0013 restore PASS+strict;
green+strict seed8000/0900; cohort **7**/7 + strict.
**Next:** Open `mon.c` `restore_cham`. Not normal_shape.
**Blocked:** none.
## 2026-08-29 — D-1635 do.c doddrop / ggetobj drop

**Objective:** Open `invent.c` ggetobj drop (named). Not takeoff/identify.
**C locus:** `do.c` `doddrop` `:922–944` / `menu_drop` `:980–1107` /
`menudrop_split` `:963–977`; `worn.c` `bypass_objlist` /
`nxt_unbypassed_obj`; `cmd.c` `reset_occupations`.
**JS locus:** `js/do.js` `doddrop` / `menu_drop`; `js/cmd.js` `'D'`;
`js/getline.js` `#droptype`.
**Change:** TRADITIONAL `ggetobj("drop", drop)`; FULL
`query_category`+autopick/`query_objlist`; COMBINATION combo
ALL_FINISHED; `'D'`/`#droptype` runners.
**Score:** fortress held (not a full-suite iter).
**Verified:** canary **8**/8; green+strict seed8000/0900; cohort
**7**/7 + strict.
**Next:** Open `nhlua.c` `restore_luadata`. Not restore_gamelog.
**Blocked:** none.
## 2026-08-29 — D-1634 questpgr.c convert_line pronoun %Xh

**Objective:** Open `questpgr.c` `convert_line` pronoun `%Xh` (named).
Not com_pager_core.
**C locus:** `questpgr.c` `qtext_pronoun` `:197–233` / `convert_line`
`:327–420`; `role.c` `genders[]` `:688–694`; `role_init` `ldrgend` /
`godgend`.
**JS locus:** `js/questpgr.js` `convert_line` / `qtext_pronoun`;
`js/roles.js` `genders[]`; `js/u_init.js`.
**Change:** `%Xh`/`%Xi`/`%Xj` when X in dlno; `%o` Eyes/plural they;
`%Xt`; `genders` neuter/group; `godgend`/`ldrgend`.
**Score:** fortress held (not a full-suite iter).
**Verified:** pronoun canary; green+strict seed8000/0900; cohort **7**/7
+ seed0367/0360 + strict.
**Next:** Open `invent.c` ggetobj drop. Not takeoff/identify.
**Blocked:** none.
## 2026-08-29 — D-1633 files.c read_tribute / SPE_NOVEL

**Objective:** Open `files.c` tribute (named). Not putmsghistory.
**C locus:** `files.c` `choose_passage` `:3429–3470` / `read_tribute`
`:3473–3645` / `Death_quote` `:3647–3653`; `spell.c` SPE_NOVEL `:512–534`.
**JS locus:** `js/files.js`; `js/generated/tribute_data.js`;
`js/spell.js` `study_book`; `noveltitle` `js/mkobj.js`.
**Change:** embed `dat/tribute` (Rule #2); reservoir MAXPASSAGES=30;
NHW_MENU + `putmsghistory`; SPE_NOVEL literate/`ACH_NOVL`; latebound
files (TDZ). sounds.c Death_quote named.
**Score:** fortress held (not a full-suite iter).
**Verified:** tribute canary; green+strict seed8000/0900; cohort **7**/7
+ strict.
**Next:** Open `questpgr.c` `convert_line` pronoun `%Xh`. Not
com_pager_core.
**Blocked:** none.
## 2026-08-29 — D-1632 getline.c kill_char / empty-erase bell / intr

**Objective:** Open `getline.c` `kill_char` (named). Not EDIT_GETLIN.
**C locus:** `win/tty/getline.c` `hooked_tty_getlin` `:196–209` /
`:142–160` / `:102–105`; `sys/share/unixtty.c` `gettty` VERASE/VKILL.
**JS locus:** `js/getline.js` `getlin` / `get_ext_cmd`;
`js/display.js` `get_tty_intr`.
**Change:** POSIX DEL erase + C('U') kill; empty erase + invalid
`tty_nhbell`; getline `intr--` `*bufp=0`. Rule #2: no termios.
**Score:** fortress held (not a full-suite iter).
**Verified:** green+strict seed8000/0900; cohort **7**/7 + strict.
**Next:** Open `files.c` tribute. Not putmsghistory.
**Blocked:** none.
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
