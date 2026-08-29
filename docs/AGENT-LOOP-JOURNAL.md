# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
## 2026-08-29 — D-1680 do_name.c oname via_naming livelog

**Objective:** Open `do_name.c` oname via_naming livelog (named). Not
wield restrict_name.
**C locus:** `do_name.c` `oname` `:371–426`; caller `do_oname` `:367`.
**JS locus:** `js/do_name.js` `oname`.
**Change:** via_naming `literate++` `livelog_printf`; uwep
`set_artifact_intrinsic`; unpaid `alter_cost`; `OBJ_INVENT`
`update_inventory`; `new_oname`; uswapwep `set_twoweap`. Named:
`untwoweapon` You() / wield `restrict_name`.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary; green+strict seed8000/0900; cohort
**9**/9 + strict.
**Next:** Open `do_name.c` `'i'` getobj_name clone. Not #if 0 EXCLUDE.
**Blocked:** none.
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
