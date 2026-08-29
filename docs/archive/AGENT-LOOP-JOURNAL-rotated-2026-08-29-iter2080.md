# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-29 — audit #2080 reviews 627–635 + cadence

**Objective:** C-fidelity review of nine `js/` SHAs since **626**
(`3c77e49a`…`115570e2`, D-1666…D-1674) plus full `sessions`.
**C locus:** InvOptOn import; `dosacrifice` ECMD_TIME; `noarmor`
uskin; wizweight after-change; `do_oname` slip; cmdq_pop canned;
`docall` sink-fluid; `distant_monnam` astral; `oc_uses_known`.
**Change:** reviews **627–635**, all **ACCEPT-WITH-DEBT**. No
Must-fix. No `js/` edits. Filled archive D-1674 `%h`.
**Score:** **44**/44, Scr **11,405**/11,405, RNG **792,838**/792,838.
Speed `39+0.31/turn` (R² 0.858) at `115570e2`.
**Verified:** `node frozen/ps_test_runner.mjs sessions`.
**Next:** Open `iactions.c` remaining pushkeys unwield/name/eat/engrave.
Not offer/tip/invoke.
**Blocked:** none.

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
