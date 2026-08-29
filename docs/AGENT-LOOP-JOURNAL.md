# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-29 — D-1672 do_name.c docall sink-fluid / safe_qbuf

**Objective:** Open `do_name.c` docall sink-fluid / safe_qbuf (named).
Not `'o'` getobj.
**C locus:** `do_name.c` `docall` `:635–676` + `docall_xname`
`:604–633`; `objnam.c` `safe_qbuf` (D-1654); `OBJ_DESCR`.
**JS locus:** `js/do_name.js` `docall` / `docall_xname`.
**Change:** sink `objectDescrs[oc_descr_idx]` fluid prompt; else
`safe_qbuf` Call/:/thing; class/otyp xname fixups;
`update_inventory` OBJ_INVENT/carrying-walk. `undiscover_object`
named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary (booze/water OBJ_DESCR, shuffled idx,
lastR `thing`); green+strict seed8000/0900; cohort **9**/9 + strict.
**Next:** Open `distant_monnam` astral high-cleric. Not do_mgivenname.
**Blocked:** none.
## 2026-08-29 — D-1671 do_name.c docallcmd cmdq_pop canned

**Objective:** Open `do_name.c` docallcmd cmdq_pop canned (named).
Not `'o'` getobj.
**C locus:** `do_name.c` `docallcmd` `:511–518` + `:508–550`
lootabc/`gi.invent`; `cmd.c` `cmdq_pop`/`cmdq_clear`.
**JS locus:** `js/do_name.js` `docallcmd`; `js/cmd.js` export.
**Change:** KEY skip-menu else `cmdq_clear`; lootabc gacc; omit i/o
when `!invent`; `ECMD_OK`. iactions Call / `'i'` clone named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary (canned `q` / non-KEY clear / invent-gate
/ lootabc `m`); green+strict seed8000/0900; cohort **9**/9 + strict.
**Next:** Open `docall` sink-fluid / safe_qbuf. Not `'o'` getobj.
**Blocked:** none.
## 2026-08-29 — D-1670 do_name.c do_oname artifact_name slip

**Objective:** Open `do_name.c` do_oname artifact_name slip /
restrict_name / wipeout_text (named). Not `'o'` getobj.
**C locus:** `do_name.c` `do_oname` `:331–357`; `artifact.c`
`restrict_name` `:574–623`; `wipeout_text`; `rnd_on_display_rng`.
**JS locus:** `js/do_name.js` `do_oname`; `js/artifact.js`
`restrict_name`; `js/rng.js` `rnd_on_display_rng`.
**Change:** port `restrict_name`; slip `wipeout_text` + literate++;
canonical Sting/Orcrist; `is_plural`+`safe_qbuf`. wield restrict /
oname livelog named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary (Sting quan/Excalibur/Orb prefix);
green+strict seed8000/0900; cohort **7**/7 + strict.
**Next:** Open `do_name.c` docallcmd cmdq_pop canned. Not `'o'`
getobj.
**Blocked:** none.
## 2026-08-29 — D-1669 options.c wizweight optfn_boolean after-change

**Objective:** Open `options.c` wizweight optfn_boolean after-change
(named). Not fixinv.
**C locus:** `options.c` `optfn_boolean` `:5353–5361`; doset
`:8842–8843`; `objnam.c` doname `:1695–1709`.
**JS locus:** `js/options.js` `optfn_boolean_do_set`; `js/objnam.js`;
`js/shk.js` `doname_with_price`.
**Change:** set_wizonly mO when wizard; OPTIONS=`iflags.wizweight`;
after-change reassign+`update_inventory`; doname `aum`; paydoname
save/restore; with_price merge. wizmgender named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary (iflags/aum/paydoname); green+strict
seed8000/0900; cohort **7**/7 + strict.
**Next:** Open `do_name.c` do_oname artifact_name slip /
restrict_name / wipeout_text. Not `'o'` getobj.
**Blocked:** none.
## 2026-08-29 — D-1668 invent.c noarmor uskin embedded pline

**Objective:** Open `invent.c` `noarmor` uskin (named). Not doprarm.
**C locus:** `invent.c` `noarmor` `:4577–4597`.
**JS locus:** `js/invent.js` `noarmor`.
**Change:** `simpleonames` + `"set of "` fold + `strstri` `" dragon "`
`p.slice(8)`; embedded-skin pline. C is 21 lines. Polyself `uskin=`
named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary (scales/mail + `doprarm` message);
green+strict seed8000/0900; cohort **7**/7 + strict.
**Next:** Open `options.c` wizweight optfn_boolean after-change.
Not fixinv.
**Blocked:** none.
## 2026-08-29 — D-1667 dosacrifice ECMD_TIME after floorfood pick

**Objective:** Must-fix `dosacrifice` `ECMD_TIME` after floorfood
CORPSE/amulet pick. Not `offer_corpse`.
**C locus:** `pray.c` `dosacrifice` `:1874–1895`.
**JS locus:** `js/pray.js` `dosacrifice`.
**Change:** live CORPSE / Yendor / fake `return ECMD_TIME`; empty
pick stays `ECMD_OK`. `offer_*` bodies named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary (canned three otyps TIME / miss OK);
green+strict seed8000/0900; cohort **7**/7 + strict.
**Next:** Open `invent.c` `noarmor` uskin. Not doprarm.
**Blocked:** none.
## 2026-08-29 — D-1666 can_set_perm_invent InvOptOn import

**Objective:** Must-fix `can_set_perm_invent` import `InvOptOn`.
Not can_set rewrite / mO / `strncmpi` #4.
**C locus:** `options.c` `can_set_perm_invent` `:5507–5508`.
**JS locus:** `js/options.js` const import.
**Change:** import `InvOptOn` from `const.js` so None→On is bound.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary (import+load); green+strict
seed8000/0900; cohort **7**/7 + strict.
**Next:** Must-fix `dosacrifice` `ECMD_TIME` after floorfood
CORPSE/amulet pick. Not `offer_corpse`.
**Blocked:** none.
## 2026-08-29 — audit #2070 reviews 618–626 + cadence

**Objective:** C-fidelity review of nine `js/` SHAs since **617**
(`ee4f922a`…`784e3060`, D-1657…D-1665) plus full `sessions`.
**C locus:** overlay BIND=; altar-god; cemetery; `'o'` getobj;
`optfn_perminv_mode`; `qt_pager` common; `dounpaid`; `sanity_check`
gold/invlet; iactions offer/tip/invoke.
**Change:** reviews **618–626**. QUALITY-RISK **622** (InvOptOn
import) and **626** (`dosacrifice` ECMD_TIME). Must-fix prepended.
No `js/` edits. Filled archive D-1665 `%h`.
**Score:** **44**/44, Scr **11,405**/11,405, RNG **792,838**/792,838.
Speed `39+0.31/turn` (R² 0.862) at `784e3060`.
**Verified:** `node frozen/ps_test_runner.mjs sessions`.
**Next:** Must-fix `can_set_perm_invent` import `InvOptOn`. Not
can_set rewrite / mO / `strncmpi` #4.
**Blocked:** none.
## 2026-08-29 — D-1665 iactions remaining pushkeys offer/tip/invoke

**Objective:** Open `iactions.c` remaining pushkeys offer/tip/invoke
(named). Not use_grease.
**C locus:** `iactions.c` `itemactions_pushkeys` IA_SACRIFICE /
IA_TIP_CONTAINER / IA_INVOKE_OBJ; O-row `:472–483`; `eat.c`
`offer_ok`/`floorfood("sacrifice")`; `artifact.c` `doinvoke`;
`pickup.c` `tip_ok`/`dotip` getobj.
**JS locus:** `js/iactions.js`; `js/eat.js`; `js/pray.js`;
`js/artifact.js`; `js/pickup.js`.
**Change:** three canned arms (reqmenu PREFIXCMD); live getobj for
sacrifice/invoke/tip; O-row. offer_corpse / remaining pushkeys named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary; green+strict seed8000/0900; cohort
**7**/7 + strict (9/9 with green).
**Next:** Open `invent.c` `noarmor` uskin. Not doprarm.
**Blocked:** none.
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
