# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-29 — D-1653 sounds.c MS_RIDER Death tribute / u_have_novel

**Objective:** Open `sounds.c` Death_quote / `u_have_novel` (named).
Not read_tribute.
**C locus:** `sounds.c` `domonnoise` MS_RIDER `:1193–1236`;
`invent.c` `u_have_novel` `:1575–1584`; `hacklib.c` `ucase`
`:101–110`; `files.c` `Death_quote` already D-1633.
**JS locus:** `js/sounds.js` `domonnoise`; `js/invent.js`
`u_have_novel`; `js/hacklib.js` `ucase`.
**Change:** Death novel/`Death_quote`/Sandman/War; `pline(ucase)`
no quotes; other riders `verbalize`. save/rest `context.novel`
named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary Mort/Snuff/Wee/quote/Famine;
green+strict seed8000/0900; cohort **7**/7 + strict (9/9 with green).
**Next:** Open `safe_qbuf`. Not floor query_classes.
**Blocked:** none.

## 2026-08-29 — D-1652 sit.c eyecount / mondata.h

**Objective:** Open `sit.c` `eyecount` (named). Not confer_oc_oprop.
**C locus:** `include/mondata.h` `eyecount` `:48–51`; callers
`sit.c` `throne_sit_effect` `:160–179` / `pray.c` TROUBLE_BLIND
`:562` / `potion.c` `potionbreathe` `:1958`.
**JS locus:** `js/monsters.js` `eyecount`; sit Blind case 10;
pray TROUBLE_BLIND; potionbreathe sting.
**Change:** drop sit/pray always-2 stubs and potion `eyecount_pot`
clone; import the C-home export. Spell dull / zap rider named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary 2/1/0; green+strict seed8000/0900;
cohort **7**/7 + strict (9/9 with green).
**Next:** Open Death_quote / `u_have_novel`. Not read_tribute.
**Blocked:** none.

## 2026-08-29 — D-1651 do_name.c lookup_novel

**Objective:** Open `do_name.c` `lookup_novel` (named). Not do_mgivenname.
**C locus:** `do_name.c` `lookup_novel` `:1626–1661`; table
`:1591–1608`; callers `readobjnam` `:5355–5358` /
`create_object` `:2266–2271`.
**JS locus:** `js/do_name.js` `lookup_novel`; wish `js/readobjnam.js`;
`js/mklev.js` `create_object`; table export `js/mkobj.js`.
**Change:** aliases + table/`The` walk + IndexOk miss; SPE_NOVEL
wish replaces name; named level objects `oname` then lookup.
`'o'` getobj / Death_quote named.
**Score:** fortress held (not a full-suite iter).
**Verified:** green+strict seed8000/0900; cohort **7**/7 + strict
(9/9 with green).
**Next:** Open `eyecount`. Not confer_oc_oprop.
**Blocked:** none.

## 2026-08-29 — D-1650 dungeon.c dooverview PICK_ONE

**Objective:** Open `dungeon.c` `dooverview` PICK_ONE (named). Not doextlist.
**C locus:** `dungeon.c` `dooverview` `:3293–3301` / `show_overview`
`:3304–3340` / `traverse_mapseenchn` `:3343–3365` / `print_mapseen`
`:3515–3728`; callees `ledger_to_dnum`/`ledger_to_dlev` /
`query_annotation`; caller `donamelevel`.
**JS locus:** `js/dungeon.js` `dooverview`/`show_overview`.
**Change:** m-prefix why==-1 `select_menu` PICK_ONE with
`ledger_no+1` then `query_annotation`; `donamelevel` keeps
`menu_requested`; two-pass traverse; named-place/`builds_up`/
`endgamelevelname`. Altar-god / cemetery bones named.
**Score:** fortress held (not a full-suite iter).
**Verified:** green+strict seed8000/0900; cohort **7**/7 + strict
(9/9 with green); seed4500 PASS.
**Next:** Open `lookup_novel`. Not do_mgivenname.
**Blocked:** none.

## 2026-08-29 — D-1649 questpgr.c convert_arg remaining % codes

**Objective:** Open `questpgr.c` `convert_arg` (named). Not convert_line %Xh.
**C locus:** `questpgr.c` `convert_arg` `:235–325`; callees
`homebase`/`intermed`/`neminame`; caller `convert_line` `:343`.
**JS locus:** `js/questpgr.js` `convert_arg`.
**Change:** `%c`/`%G`/`%A`/`%D`/`%C`/`%N`/`%L`/`%Z`; `%o` via
`artiname`; C-home helpers. qt_pager common fallback named.
**Score:** fortress held (not a full-suite iter).
**Verified:** green+strict seed8000/0900; cohort **7**/7 + strict
(9/9 with green).
**Next:** Open `dooverview` PICK_ONE. Not doextlist.
**Blocked:** none.

## 2026-08-29 — D-1648 mon.c newcham await remaining NO_NC_FLAGS

**Objective:** Must-fix review **606** await `newcham` at remaining
sync `NO_NC_FLAGS` sites. Not `m_unleash` body. Not `convert_arg`.
**C locus:** `mon.c` `newcham` `:5386–5398` / `:5517–5532`.
**JS locus:** `js/mhitm.js` `mon_poly`/`mon_to_stone`/`vamp_stone`/
`gulpmm`; `js/uhitm.js` `gulpum`; `js/trap.js` `animate_statue`;
`js/zap.js` `revive`/`bhitm`/figurine.
**Change:** await so unleash/Elbereth finish before the caller
continues (C `return 1`). Sync makemon/`load_tower1` named.
**Score:** fortress held (not a full-suite iter).
**Verified:** green+strict seed8000/0900; cohort **7**/7 + strict
(9/9 with green).
**Next:** Open `convert_arg`. Not convert_line %Xh.
**Blocked:** none.
