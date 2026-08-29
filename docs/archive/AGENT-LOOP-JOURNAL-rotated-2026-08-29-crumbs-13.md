# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-29 — D-1686 iactions.c remaining pushkeys rub/swap/whatis

**Objective:** Open `iactions.c` remaining pushkeys rub/swap/whatis
(named). Not two-weapon.
**C locus:** `iactions.c` `itemactions_pushkeys` IA_RUB_OBJ `:221–224`
/ IA_SWAPWEAPON `:257–258` / IA_WHATIS_OBJ `:267–271`; `pager.c`
`do_look` `:1692–1700`; `invent.c` `display_inventory` `:3427–3452`.
**JS locus:** `js/iactions.js` `itemactions_pushkeys`; `js/pager.js`
`do_look`; `js/invent.js` `display_inventory`.
**Change:** queue `dorub`+invlet, `doswapweapon`, `dowhatis` `'i'`+
invlet; `do_look` cmdq_pop KEY skip-menu; `display_inventory` canned KEY;
deleted `pick_inventory_letter`. Named: Traditional itemize / full apply.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **17**/17; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `invent.c` Traditional itemize yn. Not cheapest_item.
**Blocked:** none.


**Objective:** Open `dungeon.c` save_mapseen cemetery JSON (named).
Not print_mapseen cemetery.
**C locus:** `dungeon.c` `save_mapseen` `:2694–2717`;
`load_mapseen` `:2720–2754`; `save.c` `savecemetery` `:616–637`;
`restore.c` `restcemetery` `:987–1017`.
**JS locus:** `js/dungeon.js` `save_mapseen`/`savecemetery`;
`js/save.js` `dosave0`/`try_restore_save`; `js/bones.js`.
**Change:** persist mapseenchn cemetery + savelev bonesinfo JSON;
bones.js uses live helpers. Named: knox/drawbridge / when[].
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **20**/20; green+strict seed8000/0900;
cohort **7**/7 + restore seed0013 + strict.
**Next:** Open `iactions.c` remaining pushkeys rub/swap/whatis. Not
two-weapon.
**Blocked:** none.

## 2026-08-29 — D-1684 shk.c pay_billed_items via_menu (review 637)

**Objective:** Must-fix `pay_billed_items`: delete
`pay_take_canned_billed`. Not `cheapest_item` / Traditional itemize.
**C locus:** `shk.c` `pay_billed_items` `:2042–2097`;
`menu_pick_pay_items` `:1666–1739`; `cmd.c` `rhack` `:3642–3651`.
**JS locus:** `js/shk.js` `pay_billed_items` (deleted
`pay_take_canned_billed`).
**Change:** via_menu always `menu_pick_pay_items`; leftover IA_BUY_OBJ
KEY stays for next `rhack`. Named: cheapest_item / Traditional /
`buy_container`.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **11**/11; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `dungeon.c` save_mapseen cemetery JSON. Not
print_mapseen cemetery.
**Blocked:** none.

## 2026-08-29 — audit #2090 reviews 636–644 + cadence

**Objective:** C-fidelity review of nine `js/` SHAs since **635**
(`9613be3b`…`d2bcd227`, D-1675…D-1683) plus full `sessions`.
**C locus:** remaining pushkeys unwield/name/eat/engrave; IA_BUY_OBJ;
IA_TWOWEAPON; `offer_corpse`; tip-container menu; `oname` livelog;
`'i'` live getobj; `silly_thing`; throne grease spray.
**Change:** reviews **636–644**. QUALITY-RISK **637**
(`pay_take_canned_billed` not C). Must-fix prepended. No `js/`
edits. Filled archive D-1683 `%h`.
**Score:** **44**/44, Scr **11,405**/11,405, RNG **792,838**/792,838.
Speed `39+0.31/turn` (R² 0.862) at `d2bcd227`.
**Verified:** `node frozen/ps_test_runner.mjs sessions`.
**Next:** Must-fix delete `pay_take_canned_billed`. Not
`cheapest_item` / Traditional itemize.
**Blocked:** none.

## 2026-08-29 — D-1683 sit.c special_throne_effect grease spray

**Objective:** Open `sit.c` special_throne_effect grease spray
(named). Not use_grease.
**C locus:** `sit.c` `special_throne_effect` `:266–279`;
`potion.c` `make_glib` `:460–468`.
**JS locus:** `js/sit.js` `special_throne_effect` case 6;
`js/potion.js` `make_glib`.
**Change:** invent non-coin `greased=1`; `make_glib(rn1(101,100))`;
`update_inventory`; gloves `uarmg` refresh. Named: cemetery JSON.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **5**/5; green+strict seed8000/0900;
cohort **9**/9 + strict.
**Next:** Open `dungeon.c` save_mapseen cemetery JSON. Not
print_mapseen cemetery.
**Blocked:** none.

## 2026-08-29 — D-1682 do_name.c #if 0 EXCLUDE / silly_thing

**Objective:** Open `do_name.c` docallcmd #if 0 EXCLUDE (named). Not
`'i'` getobj_name.
**C locus:** `do_name.c` `docallcmd` `:581–585` #if 0 compiled out;
`invent.c` `silly_thing` `:2093–2131`; getobj EXCLUDE; `canwearobj`.
**JS locus:** `js/invent.js` `silly_thing` / `getobj_finish_pick`;
`js/do_name.js` `docallcmd`; `js/do_wear.js` `canwearobj`;
`js/const.js` `silly_thing_to`.
**Change:** live `silly_thing` (Call Amulet / unknown fake); #if 0
arm stays out. Named: sit grease spray.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **22**/22; green+strict seed8000/0900;
cohort **9**/9 + strict.
**Next:** Open `sit.c` special_throne_effect grease spray. Not
use_grease.
**Blocked:** none.

## 2026-08-29 — D-1681 do_name.c `'i'` live getobj name

**Objective:** Open `do_name.c` `'i'` getobj_name clone (named). Not
#if 0 EXCLUDE.
**C locus:** `do_name.c` `docallcmd` `:566–569` `getobj("name",
name_ok, GETOBJ_PROMPT)`; `name_ok` `:466–476`.
**JS locus:** `js/do_name.js` `docallcmd`; `js/iactions.js` `name_ok`.
**Change:** live getobj; export `name_ok`; delete `getobj_name` clone.
Named: #if 0 EXCLUDE.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **24**/24; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `do_name.c` docallcmd #if 0 EXCLUDE. Not `'i'` getobj.
**Blocked:** none.
