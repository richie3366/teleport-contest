# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
