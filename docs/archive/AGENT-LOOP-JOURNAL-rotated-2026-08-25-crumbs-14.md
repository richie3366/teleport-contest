# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-25 — D-1502 artifact.c doinvoke TAMING/CHARGE/PORTAL/BANISH

**Objective:** Open `artifact.c` `doinvoke` TAMING / CHARGE_OBJ /
CREATE_PORTAL / BANISH (named). Not HEALING/storm.
**C locus:** `artifact.c` `invoke_taming` `:1768–1777`,
`invoke_charge_obj` `:1847–1864`, `invoke_create_portal`
`:1866–1931`, `invoke_banish` `:1962–2019`; callees
`read.c` `seffect_taming`/`charge_ok`/`recharge`,
`dog.c` `tamedog` `:1247`.
**JS locus:** `js/artifact.js`; `js/read.js`; `js/dog.js`;
export `js/mon.js` `migrate_mon`, `js/zap.js` `resist`,
`js/dungeon.js` `dunlevs_in_dungeon`/`ledger_no`.
**Change:** live switch arms; zeroobj TAMING pseudo (no
oclass); CHARGE cancel refunds age; portal same-dungeon
disoriented; BANISH `migrate_mon` Gehennom. GETOBJ_ALLOWCNT
named. Rule #2: no fs.
**Verify:** private canary **13**/13; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `mklev.c` minetn-6 load_special (named). Not
minetn-1.

## 2026-08-25 — D-1501 potion.c H2Opotion_dip useeit ublindf

**Objective:** Open `potion.c` `H2Opotion_dip` useeit
`ublindf && Blindfolded_only` (named). Not mix.
**C locus:** `potion.c` `potion_dip` `:2461` +
`H2Opotion_dip` `:1497–1589` + towel `:2608–2613`;
`youprop.h` Blindfolded; callee `trap.c` `water_damage`.
**JS locus:** `js/potion.js` `potion_dip`/`H2Opotion_dip`;
`js/trap.js` `water_damage`; `js/iactions.js` comment.
**Change:** useeit disjunct; unpaid POT_WATER shop;
`PLNMSG_OBJ_GLOWS`; `mentioned_water` `makeknown`; towel
soak; invent container/grease plines. Recovered comment
(no session name). Rule #2: no fs.
**Verify:** private canary **14**/14; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `artifact.c` `doinvoke` TAMING / CHARGE_OBJ /
CREATE_PORTAL / BANISH (named). Not HEALING/storm.

## 2026-08-25 — D-1500 potion.c dip_into #altdip

**Objective:** Open `potion.c` `dip_into` (named). Not dodip.
**C locus:** `potion.c` `dip_into` `:2374–2405`; caller
`iactions.c` IA_DIP_OBJ; callees getobj `drink_ok`/`dip_ok`,
`inaccessible_equipment`, `potion_dip`.
**JS locus:** `js/potion.js` `dip_into`; `js/iactions.js`
`itemactions_pushkeys`.
**Change:** reverse getobj (canned potion then object);
ignores floor; IA_DIP_OBJ queues `dip_into`+invlet. Rule #2:
no fs.
**Verify:** private canary **17**/17; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `potion.c` `H2Opotion_dip` useeit
`ublindf && Blindfolded_only` (named). Not mix.

## 2026-08-25 — D-1499 potion.c potion_dip poly_obj / obj_unpolyable

**Objective:** Open `potion.c` `potion_dip` `poly_obj`/`obj_unpolyable`
(named). Not mixtype.
**C locus:** `potion.c` `potion_dip` `:2468–2502`; callees
`zap.c` `obj_unpolyable` / `poly_obj`; `mkobj.c`
`replace_object` invent.
**JS locus:** `js/potion.js` `potion_dip`; export
`js/zap.js` `poly_obj`/`obj_unpolyable`.
**Change:** unpolyable resist gate; else polypiles +
`poly_obj(STRANGE_OBJECT)` then makeknown/useup/`prinv` or
nothing_seems/`poof`. Invent replace + erosion/oil/lamp
polish in the callee. Worn `set_wear` named.
**Verify:** green seed8000/0900 + strict PASS; cohort
seed1500/1800/0012/0004/0007/2200/0383 + strict PASS.
**Next:** Open `potion.c` `dip_into`. Not dodip.

## 2026-08-25 — D-1498 potion.c potion_dip oil/lamp

**Objective:** Open `potion.c` `potion_dip` oil/lamp
(named). Not poison-coat.
**C locus:** `potion.c` `potion_dip` `:2645–2724`. Macros
`is_weptool`/`is_ammo`/`is_rustprone`/`is_corrodeable`;
callees `fire_damage`/`make_glib`/`explode`/`check_unpaid`.
Caller `dodip`.
**Change:** POT_OIL lit `fire_damage` / cursed glib /
weapon gleam-derust; `more_dips` OIL_LAMP/MAGIC_LAMP fill
(empty MAGIC→OIL; age>1000 full else `4/3*age/2` clamp
1500). `poly_obj` named. Rule #2: no fs.
**Score:** fortress unchanged (public-unhit #dip oil).
**Verified:** private canary **23**/23; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `potion.c` `potion_dip` `poly_obj`/
`obj_unpolyable` (named). Not mixtype.
**Blocked:** none.

## 2026-08-25 — D-1497 potion.c potion_dip poison-coat / unpoison

**Objective:** Open `potion.c` `potion_dip` poison-coat /
healing unpoison (named). Not unicorn mix.
**C locus:** `potion.c` `potion_dip` `:2615–2636`. Macro
`obj.h` `is_poisonable`; callee `permapoisoned` /
`poof`. Caller `dodip`.
**Change:** After mix, sickness coats `is_poisonable`
`!opoisoned`; healing/extra/full strip `!permapoisoned`.
Local skill-window clone (mkobj named-missile RNG subset
untouched). oil/lamp / `poly_obj` named. Rule #2: no fs.
**Score:** fortress unchanged (public-unhit #dip coat).
**Verified:** private canary **19**/19; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `potion.c` `potion_dip` oil/lamp (named).
Not poison-coat.
**Blocked:** none.
