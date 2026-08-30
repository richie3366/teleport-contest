# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-29 — D-1692 wield.c chwepon restrict_name

**Objective:** Open `artifact.c` wield restrict_name (named). Not
do_oname slip.
**C locus:** `wield.c` `chwepon` `:991–997` / `:1036–1039`; callee
`artifact.c` `restrict_name` `:574–623`; unpaid `alter_cost`;
`costly_alteration` COST_DEGRD/DECHNT.
**JS locus:** `js/wield.js` `chwepon`; `js/artifact.js` `restrict_name`.
**Change:** named restricted artifact faint-glow no spe; Magicbane
`is_art`; unpaid shop; weld `update_inventory`. Named: `useupall`.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **PASS**; green+strict seed8000/0900;
cohort **9**/9 + strict.
**Next:** Open `dungeon.c` print_mapseen knox/drawbridge. Not cemetery
JSON.
**Blocked:** none.

## 2026-08-29 — D-1691 o_init.c undiscover_object / gem_learned

**Objective:** Open `o_init.c` undiscover_object / gem_learned (named).
Not oc_uses_known.
**C locus:** `o_init.c` `undiscover_object` `:497–523`; `shk.c`
`gem_learned` `:3196–3231`; `find_oid` `:2776–2804`; `invent.c` `o_on`
`:1586–1599`; `do_name.c` `docall` `:668–669`.
**JS locus:** `js/o_init.js`; `js/shk.js`; `js/invent.js`; `js/do_name.js`.
**Change:** disco shift on empty Call; unpaid gem `get_cost`; `o_on` /
`find_oid`; `discover_object` moveloop reprice. Named: FIRST_OBJECT
observe skip.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **PASS**; green+strict seed8000/0900;
cohort **9**/9 + strict.
**Next:** Open `artifact.c` wield restrict_name. Not do_oname slip.
**Blocked:** none.

## 2026-08-29 — D-1690 objects.h oc_charged extract

**Objective:** Open `objects.h` oc_charged extract (named). Not oc_merge.
**C locus:** `objclass.h` `oc_charged`; `objects.h` BITS chrg;
`mkobj.c` RING_CLASS `:1128`; `objnam.c` doname/`readobjnam` `:5099`.
**JS locus:** extractor + `js/generated/objects_data.js`;
`otyp_is_charged`; `mksobj_init`; `ini_inv_adjust_obj`; wish spe clamp.
**Change:** dump BITS chrg; table read replaces doname/mkobj/u_init
name-list; non-wizard wish spe clamp. Named: `oc_merge`.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **PASS**; green+strict seed8000/0900;
cohort **9**/9 + strict.
**Next:** Open `o_init.c` undiscover_object / gem_learned. Not oc_uses_known.
**Blocked:** none.

## 2026-08-29 — D-1689 engrave.c doengrave non-hands stylus

**Objective:** Open `engrave.c` doengrave non-hands stylus (named). Not
IA_ENGRAVE pushkeys.
**C locus:** `engrave.c` `doengrave` `:955–1263`;
`doengrave_sfx_item` `:741–892`; `doengrave_sfx_item_WAN` `:582–738`.
**JS locus:** `js/engrave.js` `doengrave` / sfx; `is_blade`/`is_boots`;
`Yobjnam2`.
**Change:** live getobj write-with; wand/weapon/marker/towel/gem sfx;
doname You(); type-mismatch wipe. Named: yn add-to; dulling.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **10**/10; green+strict seed8000/0900;
seed0101; cohort **7**/7 + strict.
**Next:** Open `objects.h` oc_charged extract. Not oc_merge.
**Blocked:** none.

## 2026-08-29 — D-1688 shk.c cheapest_item early return

**Objective:** Open `shk.c` cheapest_item early return (named). Not
Traditional itemize.
**C locus:** `shk.c` `cheapest_item` `:1521–1539`;
`pay_billed_items` `:2060–2080`.
**JS locus:** `js/shk.js` `cheapest_item` / `pay_billed_items` /
`dopay`.
**Change:** min `ibill[].cost`; no-gold You() stashed/` left`; refuse
pay when cash+credit < cheapest. Named: `buy_container`.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **15**/15; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `engrave.c` doengrave non-hands stylus. Not IA_ENGRAVE
pushkeys.
**Blocked:** none.

## 2026-08-29 — D-1687 invent.c dotypeinv Traditional itemize yn

**Objective:** Open `invent.c` Traditional itemize yn (named). Not
cheapest_item.
**C locus:** `invent.c` `dotypeinv` `:3826–4032`; `this_type_only`
`:3792–3823`; `tally_BUCX` `:3578–3616`; `shk.c` `doinvbill`
`:4196–4271`; `pickup.c` `query_objlist` this_title / PICK_ONE.
**JS locus:** `js/invent.js` `dotypeinv`; `js/pickup.js`; `js/shk.js`
`doinvbill`; `js/cmd.js` `'I'`; `js/getline.js` inventtype.
**Change:** Traditional yn_function class prompt + FULL query_category
PICK_ONE; this_type_only filter; doinvbill Ix; query_objlist this_title.
Named: cheapest_item / `buy_container` / yn addcmdq.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **10**/10; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `shk.c` cheapest_item early return. Not Traditional
itemize.
**Blocked:** none.
