# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
## 2026-08-29 — D-1610 dog.c initedog ogoal -1 / first-pet livelog

**Objective:** Open `dog.c` `initedog` ogoal `-1` (named). Not has_edog.
**C locus:** `dog.c` `initedog` `:63–87`; consumer `dog_goal` `:617`.
**JS locus:** `js/dog.js` `initedog`; export `js/do_name.js` `mon_pmname`.
**Change:** everything-arm `ogoal` `-1,-1`; livelog when `!pets &&
in_moveloop` then `pets++`. `dog_goal` still tests truthiness.
`free_edog` / restore `newedog` named. Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **11**/11; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open getline ^P `tty_doprev_message`. Not command ^P.
**Blocked:** none.
## 2026-08-29 — D-1609 apply.c m_unleash / mon.c m_detach

**Objective:** Open `mon.c` `m_unleash` (named). Not newcham.
**C locus:** `apply.c` `m_unleash` `:725–742`; caller `mon.c`
`m_detach` `:2741–2742`.
**JS locus:** `js/apply.js` `m_unleash` + `js/mhitm.js` `mondead`
+ trap/uhitm clones + `js/dogmove.js` ALLOW_U.
**Change:** `pline_mon` + `update_inventory`; m_detach FALSE;
ALLOW_U then explmm slack after mondead. SetVoice no-op.
newcham mleashed named. Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **22**/22; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `initedog` ogoal `-1`. Not has_edog.
**Blocked:** none.
## 2026-08-29 — D-1608 minion.c gain_guardian_angel

**Objective:** Open `minion.c` `gain_guardian_angel` (named).
Not create_mplayers.
**C locus:** `minion.c` `:497–565`; `lose_guardian_angel` `:467–494`;
caller `do.c` `final_level` `:2052`.
**JS locus:** `js/minion.js` + `js/do.js` `goto_level`; export
`Hear_again` / `mk_roamer`.
**Change:** Conflict hostiles / fervent named angel; pets
conduct gate; no tamedog. SetVoice no-op. Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **21**/21; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `m_unleash`. Not newcham.
**Blocked:** none.
## 2026-08-29 — D-1607 makemon.c mongets mplayer-sword spe

**Objective:** Open `makemon.c` mongets mplayer-sword spe (named).
Not show_transient_light.
**C locus:** `makemon.c` `mongets` `:2180–2230`.
**JS locus:** `js/makemon.js` `mongets` + `js/objects.js` `is_sword`.
**Change:** mplayer-sword `spe=3+rn2(4)` plus same-function demon /
lminion / candelabrum / Bell / Book arms. One `is_sword`.
Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **31**/31; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `gain_guardian_angel`. Not create_mplayers.
**Blocked:** none.
## 2026-08-29 — D-1606 mplayer.c mplayer_talk

**Objective:** Open `mplayer.c` `mplayer_talk` (named). Not
create_mplayers.
**C locus:** `mplayer.c` `:355–377`; caller `sounds.c` MS_HUMANOID
`:1026–1031`.
**JS locus:** `js/mplayer.js` `mplayer_talk` + `js/sounds.js`
`domonnoise`.
**Change:** hostile endgame `is_mplayer` `#chat` verbalize + one
`rn2(3)`. SetVoice no-op. Peaceful / "threatens you." named.
Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **15**/15; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open mplayer-sword spe. Not show_transient_light.
**Blocked:** none.
## 2026-08-29 — D-1605 cmd.c #seeall EXT_CMDS

**Objective:** Open `cmd.c` `#seeall` EXT_CMDS (named). Not doprinuse.
**C locus:** `cmd.c` `:1848–1849` `"seeall"` `doprinuse`;
`doextcmd` `:505–514`; `accept_menu_prefix` `:3507–3512`.
**JS locus:** `js/getline.js` EXT_CMDS / `doextcmd`.
**Change:** typed `#seeall` runner; flag `accept_menu_prefix`;
`can_do_extcmd`; sibling see* live dopr*. `*` key unchanged.
`doextlist` / BIND= named. Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **21**/21; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `mplayer_talk`. Not create_mplayers.
**Blocked:** none.
