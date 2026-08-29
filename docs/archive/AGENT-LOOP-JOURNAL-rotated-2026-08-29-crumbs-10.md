# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-29 — D-1664 wizcmds.c sanity_check gold/invlet

**Objective:** Open `wizcmds.c` `sanity_check` gold/invlet (named).
Not check_invent_gold.
**C locus:** `wizcmds.c` `sanity_check` `:1459–1481`;
`you_sanity_check` `:1401–1441`; `allmain.c:197–198`; `cmd.c`
CMD_INSANE.
**JS locus:** `js/wizcmds.js` `sanity_check`; `js/allmain.js`
`moveloop_core`; `js/cmd.js` `rhack_cmd_insane`.
**Change:** gold/invlet via live `check_invent_gold("invent")`;
opt_in Off caller; ^P `sanity_no_check`; `GOLD_SYM_ADJ`. Wornmask /
other sanity_* named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary; green+strict seed8000/0900; cohort
**7**/7 + strict (9/9 with green).
**Next:** Open `iactions.c` remaining pushkeys offer/tip/invoke.
Not use_grease.
**Blocked:** none.

## 2026-08-29 — D-1663 invent.c dounpaid Iu listing

**Objective:** Open `invent.c` `dounpaid` (named). Not invlet_constant.
**C locus:** `invent.c` `dounpaid` `:3653–3789`; `find_unpaid`
`:3020–3041`; `mkobj.c` `unknwn_contnr_contents` `:682–695`;
`xprname` `:2928–2938`.
**JS locus:** `js/invent.js` `dounpaid`; `js/mkobj.js`
`unknwn_contnr_contents`; `js/objnam.js` `xprname`.
**Change:** Iu one-item pline / NHW_MENU + Total / floor+buried;
cost column; C-home `currency`. Caller `dotypeinv` named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary; green+strict seed8000/0900; cohort
**7**/7 + strict (9/9 with green).
**Next:** Open `wizcmds.c` `sanity_check` gold/invlet. Not
check_invent_gold.
**Blocked:** none.

## 2026-08-29 — D-1662 questpgr.c qt_pager common fallback

**Objective:** Open `questpgr.c` qt_pager common fallback (named).
Not convert_arg.
**C locus:** `questpgr.c` `qt_pager` `:629–634`; `com_pager_core`
`:467–621`.
**JS locus:** `js/questpgr.js` `qt_pager`.
**Change:** role miss retries `com_pager_core("common", TRUE)`
(second nhl_init). Recovered D-1661 options comment (no public
session token in `js/`). Array rn2 / pauper_legacy / killed_nemesis
rawtext named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary; green+strict seed8000/0900; cohort
**7**/7 + strict; quest **4**/4 + strict (13/13 with green).
**Next:** Open `invent.c` `dounpaid`. Not invlet_constant.
**Blocked:** none.

## 2026-08-29 — D-1661 options.c optfn_perminv_mode

**Objective:** Open `options.c` `optfn_perminv_mode` (named). Not
doperminv.
**C locus:** `options.c` `optfn_perminv_mode` `:3045–3135`;
`handler_perminv_mode` `:6010–6083`; `can_set_perm_invent`
`:5487–5527`; `perminv_modes[]`.
**JS locus:** `js/options.js` `optfn_perminv_mode`.
**Change:** OPTIONS= do_set table/digit/`!`; get_val Off suffix;
handler PICK_ONE + can_set tty. mO compound row named (seed0007
letter fortress). Not doperminv.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary; green+strict seed8000/0900; cohort
**7**/7 + strict (9/9 with green).
**Next:** Open qt_pager common fallback. Not convert_arg.
**Blocked:** none.

## 2026-08-29 — D-1660 do_name.c docallcmd `'o'` live getobj call

**Objective:** Open `do_name.c` docallcmd `'o'` getobj call (named).
Not lookup_novel.
**C locus:** `do_name.c` `docallcmd` `:571–589`; `getobj` /
`call_ok` / `xname` observe / `docall`.
**JS locus:** `js/do_name.js` `docallcmd`.
**Change:** live `getobj('call', call_ok, GETOBJ_NOFLAGS)` then
`xname` + `!dknown` You-line / `docall`. cmdq_pop canned / lootabc /
invent-gated i/o / artifact_name slip named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary wiring + `call_ok(null)`; green+strict
seed8000/0900; cohort **7**/7 + strict (9/9 with green).
**Next:** Open `optfn_perminv_mode`. Not doperminv.
**Blocked:** none.

## 2026-08-29 — D-1659 dungeon.c print_mapseen cemetery bones list

**Objective:** Open `dungeon.c` cemetery bones list (named). Not
dooverview PICK_ONE.
**C locus:** `dungeon.c` `print_mapseen` `:3696–3726`;
`recalc_mapseen` `:3247–3260`; `bones.c` `savebones` cemetery.
**JS locus:** `js/dungeon.js` `mapseen_cemetery_lines` /
`recalc_mapseen`; `js/end.js` `savebones`.
**Change:** clone `bonesinfo`; bonesknown from lastseentyp;
kncnt `,`/`.` listing; dead hero only `why===2`; formatkiller how.
knox-drawbridge / save_mapseen JSON / when[] named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary clone+listing; green+strict
seed8000/0900; cohort **7**/7 + strict (9/9 with green).
**Next:** Open `'o'` getobj call. Not lookup_novel.
**Blocked:** none.
