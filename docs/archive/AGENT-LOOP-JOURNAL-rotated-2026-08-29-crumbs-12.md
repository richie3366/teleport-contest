# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
