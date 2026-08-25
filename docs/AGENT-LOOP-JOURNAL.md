# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).

## 2026-08-25 — D-1505 dog.c mon_arrive MIGR_LEFTOVERS DF_ALL

**Objective:** Open `dog.c` `mon_arrive` `MIGR_LEFTOVERS` DF_ALL
(named). Not stolen_booty.
**C locus:** `dog.c` `mon_arrive` 576–580 after xyloc, before
`my=xyflags`/place; callee `dokick.c` `deliver_obj_to_mon`.
**JS locus:** `js/dog.js` `mon_arrive_after_you`.
**Change:** `migflags&MIGR_LEFTOVERS` and `migrating_objs` →
`deliver_obj_to_mon(mtmp, 0, DF_ALL)`. With_you still
returns first. wander/`somexy` named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1890); public-unhit
until minetn-1 captain arrives.
**Verified:** canary **15**/15; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `makemon.c` gnome candle `begin_burn` after
`!mpickobj` (named). Not add_to_minv.
**Blocked:** none.
## 2026-08-25 — D-1504 mklev.c minetn-7 load_special Bazaar Town

**Objective:** Open `mklev.c` minetn-7 load_special (named).
Not minetn-6.
**C locus:** `dat/minetn-7.lua` via `mkmaze.c` `makemaz` /
`sp_lev.c` `load_special` / `lspo_room` / `lspo_door` pos /
`lspo_feature` sink.
**JS locus:** `js/mklev.js` `load_minetn_7` /
`load_special_proto`.
**Change:** dispatch + clone: nested 30×15 town, percent(75)
nests, chance shops, pos=0 door, sink, temple align[1],
watch. Door helper forwards pos. `ensure_way_out` named.
Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1890); public-unhit
unless `rnd` hits variant 7.
**Verified:** canary **16**/16; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `dog.c` `mon_arrive` `MIGR_LEFTOVERS` DF_ALL
(named). Not stolen_booty.
**Blocked:** none.
## 2026-08-25 — review D-1494–D-1503 (audit #1890)

**Objective:** audit — C-fidelity reviews **455–464** of JS SHAs
`27a1f4b6` / `4722df06` / `08854746` / `377302b9` /
`51ea77da` / `089a9829` / `b96ac27f` / `83b29455` /
`89b85fcc` / `1f64431d` plus full `sessions` score.
**C locus:** `artifact.c` `:1787` Blinded; `trap.c` untrap
door; `polyself.c` body_part callers; `potion.c` dip
poison/oil/poly/`dip_into`/H2O; `artifact.c` TAMING/CHARGE/
PORTAL/BANISH; `dat/minetn-6.lua`.
**Change:** no `js/` edits. All ten **ACCEPT** or
**ACCEPT-WITH-DEBT**. No Must-fix. Filled archive D-1503
`1f64431d`. Rule #2: no fs.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
(100%) speed `38+0.30/turn` (R² 0.849).
**Verified:** full `sessions` at HEAD `1f64431d`; public-unhit
of the new arms.
**Next:** Open `mklev.c` minetn-7 load_special (named). Not
minetn-6.
**Blocked:** none.
## 2026-08-25 — D-1503 mklev.c minetn-6 load_special Bustling Town

**Objective:** Open `mklev.c` minetn-6 load_special (named).
Not minetn-1.
**C locus:** `dat/minetn-6.lua` via `mkmaze.c` `makemaz` /
`sp_lev.c` `load_special` / `lspo_map` / `lspo_region`.
**JS locus:** `js/mklev.js` `load_minetn_6` /
`load_special_proto`.
**Change:** dispatch + clone: solidfill then mines lit=1
bg HWALL, top-aligned 40×20 map (`'x'` skip), shops/temple
`priestini`, peaceful watch. `ensure_way_out` named.
Rule #2: no fs.
**Verify:** private canary **18**/18; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `mklev.c` minetn-7 load_special (named). Not
minetn-6.
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
