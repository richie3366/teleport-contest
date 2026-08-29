# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-29 — D-1674 objects.h oc_uses_known extract

**Objective:** Open `o_init.c` oc_uses_known extract (named). Not
rename_disco.
**C locus:** `objclass.h` `oc_uses_known`; `objects.h` BITS uskn;
`mkobj.c` `unknow_object` `:851–865`; `o_init.c` `rename_disco` dummy.
**JS locus:** `scripts/extract-objects.py` + `js/generated/objects_data.js`;
`js/mkobj.js` `unknow_object`; `js/objnam.js` `otyp_uses_known`.
**Change:** dump table `oc_uses_known`; `unknow_object` sets
`known = uskn ? 0 : 1`; drop class/name stand-in. steal/muse named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary (uskn polarity + dummy known); green+strict
seed8000/0900; cohort **9**/9 + strict.
**Next:** Open `iactions.c` remaining pushkeys unwield/name/eat/engrave.
Not offer/tip/invoke.
**Blocked:** none.
## 2026-08-29 — D-1673 do_name.c distant_monnam astral high-cleric

**Objective:** Open `do_name.c` distant_monnam astral high-cleric
(named). Not do_mgivenname.
**C locus:** `do_name.c` `distant_monnam` `:1168–1186` /
`:1178–1182`; `m_next2u`; `Is_astralevel`.
**JS locus:** `js/do_name.js` `distant_monnam` /
`distant_monnam_none`.
**Change:** conceal non-adjacent Astral `PM_HIGH_CLERIC` as
`"the high priest(ess)"`; else `x_monnam(..., TRUE)`. priestname
`" of "` god named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary (far/adjacent/hallu/non-astral);
green+strict seed8000/0900; cohort **9**/9 + strict.
**Next:** Open `o_init.c` oc_uses_known extract. Not rename_disco.
**Blocked:** none.
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
