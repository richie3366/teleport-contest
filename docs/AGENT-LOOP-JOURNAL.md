# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-29 — D-1679 pickup.c choose_tip_container_menu

**Objective:** Open `pickup.c` choose_tip_container_menu (named). Not
tip getobj.
**C locus:** `pickup.c` `choose_tip_container_menu` `:3500–3558`;
caller `dotip` `:3598`.
**JS locus:** `js/pickup.js`.
**Change:** boxes>1 PICK_ONE of floor containers + preselected dummy
invent row (`'i'` unless lootabc). Letter tips that box; Space/`'i'`
→ getobj; ESC cancel. Named: MENU_SEARCH / spill / tiphat /
`tipcontainer_gettarget`.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary; green+strict seed8000/0900; cohort
**9**/9 + strict.
**Next:** Open `do_name.c` oname via_naming livelog. Not wield
restrict_name.
**Blocked:** none.
## 2026-08-29 — D-1678 pray.c offer_corpse

**Objective:** Open `pray.c` offer_corpse (named). Not floorfood
sacrifice getobj.
**C locus:** `pray.c` `offer_corpse` `:1958–2120`;
`eval_offering` `:1898–1956`; `consume_offering` `:1445–1475`;
`sacrifice_your_race` `:1697–1778`; `sacrifice_value` `:1838–1850`.
**JS locus:** `js/pray.js`; `js/pickup.js` export `rider_corpse_revival`.
**Change:** CORPSE arm runs the C body (gnostic, cockatrice, rider,
same-race, former pet, eval, consume, luck). Named:
`offer_different_alignment_altar` / `bestow_artifact` / `angry_priest`
/ amulet offers.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary; green+strict seed8000/0900; cohort
**7**/7 + strict.
**Next:** Open `pickup.c` choose_tip_container_menu. Not tip getobj.
**Blocked:** none.
## 2026-08-29 — D-1677 iactions IA_TWOWEAPON

**Objective:** Open `iactions.c` IA_TWOWEAPON (named). Not
offer/tip/invoke.
**C locus:** `iactions.c` `itemactions` `:653–682`;
`itemactions_pushkeys` `:260–262`; `wield.c` TWOWEAPOK; `obj.h`
bimanual; `mondata.h` `could_twoweap`.
**JS locus:** `js/iactions.js`; `js/wield.js` export TWOWEAPOK /
bimanual.
**Change:** `'X'` Toggle row from MAYBETWOWEAPON; canned
`dotwoweapon` no invlet. rub/swap/whatis named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary; green+strict seed8000/0900; cohort
**9**/9 + strict.
**Next:** Open `pray.c` offer_corpse. Not floorfood sacrifice getobj.
**Blocked:** none.
## 2026-08-29 — D-1676 iactions IA_BUY_OBJ shop pay

**Objective:** Open `iactions.c` IA_BUY_OBJ shop pay (named). Not
offer/tip/invoke.
**C locus:** `iactions.c` `itemactions` `:485–494`;
`itemactions_pushkeys` `:203–206`; `shk.c` `dopay` /
`pay_billed_items`.
**JS locus:** `js/iactions.js`; `js/shk.js` `pay_take_canned_billed`.
**Change:** unpaid `'p'` Buy row; queue `dopay`+invlet; consume canned
billed invlet as `queuedpay`. Traditional itemize / cheapest_item
named. rub/swap/two-weapon/whatis named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary; green+strict seed8000/0900; cohort
**9**/9 + strict.
**Next:** Open `iactions.c` IA_TWOWEAPON. Not offer/tip/invoke.
**Blocked:** none.
## 2026-08-29 — D-1675 iactions remaining pushkeys unwield/name/eat/engrave

**Objective:** Open `iactions.c` remaining pushkeys unwield/name/eat/
engrave (named). Not offer/tip/invoke.
**C locus:** `iactions.c` `itemactions_pushkeys` `:150–187`;
`do_wear.c` `remarm_swapwep` `:3060–3087`; `eat.c` `floorfood`
`iflags.menu_requested`; `engrave.c` `stylus_ok`.
**JS locus:** `js/iactions.js`; `js/do_wear.js`; `js/eat.js`;
`js/do_name.js` `getobj_name`; `js/engrave.js` `getobj_stylus`.
**Change:** live those four pushkey arms + `#altunwield`; eat
`is_edible` row; canned KEY on name/stylus; floorfood `iflags`.
buy/rub/swap/two-weapon/whatis named.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary; green+strict seed8000/0900; cohort
**9**/9 + strict.
**Next:** Open `iactions.c` IA_BUY_OBJ shop pay. Not offer/tip/invoke.
**Blocked:** none.
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
