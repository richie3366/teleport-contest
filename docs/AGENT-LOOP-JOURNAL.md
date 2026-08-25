# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
## 2026-08-25 — D-1495 trap.c untrap door force + has_magic_key

**Objective:** Must-fix `artifact.c` `invoke_untrap` vs stub
`untrap` (`void force`; door/floor always 0). Source: review
**449**.
**C locus:** `trap.c` `untrap` `:5865–5868` / `:6051–6095`;
`artifact.c` `is_magic_key` / `has_magic_key`; caller
`invoke_untrap` `:1838–1845`.
**Change:** Door D_TRAPPED find/disarm uses `force` (skips
find `rn2`/fail `rnd`). `has_magic_key`→force for `#untrap`.
Floor disarm_*/box/squeaky/pit named. Rule #2: no fs.
**Score:** fortress unchanged (public-unhit Key invoke).
**Verified:** private canary **15**/15; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `potion.c` `potion_dip` poison-coat / healing
unpoison (named). Not unicorn mix.
**Blocked:** none.
## 2026-08-25 — D-1494 artifact.c invoke_healing Blinded 0/1

**Objective:** Must-fix `artifact.c` `invoke_healing` first
`You_feel("better.")` gate uses C `Blinded` 0/1 vs `ucreamed`.
Not ENERGY. Source: review **449**.
**C locus:** `artifact.c` `invoke_healing` `:1787`;
`youprop.h` `:92` `Blinded` / `:93` `BlindedTimeout`.
**Change:** `Blinded()` is `((H&&!B)?1:0)` at the first gate;
keep `BlindedTimeout` for the second `You_feel` and
`make_blinded`. UNTRAP stub still named. Rule #2: no fs.
**Score:** fortress unchanged (public-unhit Staff invoke).
**Verified:** private canary **10**/10; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Must-fix `artifact.c` `invoke_untrap` vs stub
`untrap`. Not ENERGY.
**Blocked:** none.
## 2026-08-25 — review D-1485–D-1493 (audit #1880)

**Objective:** audit — C-fidelity reviews **446–454** of JS SHAs
`e98c0be8` / `9f784a5c` / `8d41bd04` / `00d5d4d6` /
`83fa138f` / `69080895` / `f26e11aa` / `b303c111` /
`8669b5b8` plus full `sessions` score.
**C locus:** `zap.c` `zap_updown` `:3378–3389` / `zap_map`
`:3685–3717`; `potion.c` `potion_dip` unicorn; `objnam.c`
`the()`; `artifact.c` `arti_invoke` `:2149–2228`;
`mklev.c` minetn-1; `worm.c` `:189–297`; `mkobj.c`
`add_to_minv` `:2648–2665`; `allmain.c` `:453–468`.
**Change:** no `js/` edits. **449** QUALITY-RISK (Must-fix:
`invoke_healing` Blinded 0/1; `invoke_untrap` stub callee).
**446** ACCEPT; **447–448**, **450–454** ACCEPT-WITH-DEBT.
Filled archive D-1493 `8669b5b8`. Rule #2: no fs.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
(100%) speed `39+0.30/turn` (R² 0.84).
**Verified:** full `sessions` at HEAD `8669b5b8`; public-unhit
of the new arms.
**Next:** Must-fix `artifact.c` `invoke_healing` first
`You_feel` gate = C `Blinded` 0/1 vs `ucreamed`. Not ENERGY.
**Blocked:** none.
## 2026-08-25 — D-1493 allmain.c see_monsters Hallu / Warn_of_mon

**Objective:** Open `allmain.c` `see_monsters` Hallu / Warn_of_mon
(named). Not DETECT_MONSTERS timeout.
**C locus:** `allmain.c` `:453–468`; callee `display.c`
`see_monsters` `:1513–1524`; `artifact.c` `Sting_effects`
`:2466–2501`.
**Change:** Once-per-input uses C `Hallucination` (H &&
!resist) then objects/traps; else Unblind_telepat|
Warning|Warn_of_mon. Callee counts warntype.obj then
Sting_effects. `any_visible_region` / worm segs /
MATCH_WARN / SPFX_WARN conferral named. Rule #2: no fs.
**Score:** fortress unchanged (public-unhit Sting count).
**Verified:** private canary **43**/43; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `potion.c` `potion_dip` poison-coat /
healing unpoison (named). Not unicorn mix.
**Blocked:** none.
## 2026-08-25 — D-1492 mkobj.c add_to_minv merge

**Objective:** Open `makemon.c` `add_to_minv` merge (named).
Not stolen_booty.
**C locus:** `mkobj.c` `add_to_minv` `:2648–2665`; callee
`invent.c` `merged`.
**Change:** Walk minvent and merge, else prepend
`OBJ_MINVENT`. Live in `mkobj.js`; re-export
`makemon.js`. mergable unpaid/erosion/oname / gnome
`begin_burn` / dog leftovers named. Rule #2: no fs.
**Score:** fortress unchanged (public-unhit merge).
**Verified:** private canary **30**/30; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `allmain.c` `see_monsters` Hallu /
Warn_of_mon (named). Not DETECT_MONSTERS timeout.
**Blocked:** none.
## 2026-08-25 — D-1491 worm.c worm_move / shrink / nomove

**Objective:** Open `worm.c` `worm_move` (named). Not initworm.
**C locus:** `worm.c` `worm_move` `:189–277`; `shrink_worm`
`:170–186`; `worm_nomove` `:280–297`; caller `monmove.c`
`m_move` `:2054–2071`.
**Change:** After place, occupy old dummy and grow or shrink
the tail; failed move shrinks + HP floor 1. cutworm /
wormgone / save/rest / `worm_known` / see_wsegs / muse·mhitu
callers named. Rule #2: no fs.
**Score:** fortress unchanged (public-unhit movement).
**Verified:** private canary **27**/27; green+strict
seed8000/0900; focused seed0373 FULL; cohort **7**/7 +
strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `makemon.c` `add_to_minv` merge (named).
Not stolen_booty.
**Blocked:** none.
