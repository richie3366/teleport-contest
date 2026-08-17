# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. When this file exceeds ~15 entries,
move older ones into `docs/archive/`.

Use this shape:

```text
## YYYY-MM-DD HH:MM — #NNNN short title

- Objective: …
- C locus: …
- Change: …
- Verification: …
- Next: …
```

## 2026-08-17 09:35 — #1463 D-1151 switch_terrain classify_terrain

**Objective:** Open — `hack.c` `classify_terrain` (named from
switch_terrain). Not invocation.
**C locus:** `hack.c` `classify_terrain` 3131–3214;
`switch_terrain` 3257–3258; `rm.h` xFLOOR…xWATERWALL.
**Change:** port `classify_terrain`; `switch_terrain` calls it when
`flags.terrainstatus`. lastseentyp remaps; Underwater ≡ `uinwater`;
botl iff option && !run. Option bag `flags.terrainstatus` (C).
Did not paint `terrain_descr[]`, options toggle, MAX_TYPE
sentinels, or other callers. Filled D-1150 archive hash
`505df513`. Rotated #1448. Open 8 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1460** **44**/44; next
@**#1465**).
**Verified:** private canary **32**/32 (ice/pool/floor/ground/tree;
door; drawbridge; Medusa/Juiblex; WATER wall; uinwater; sticky
ignore; run/off gates; switch_terrain On/Off); green+strict
seed8000/0900; cohort **23**/23 (0007 options + 0012 vault +
0004/0002/0006/0009/0014/0017/0030/0060/0102/0106/0108/0116/
0360/0367/0373/0383/0700/1500/1800/2200/4500) + strict
0007/0012/0360/4500/2200/0004/0002/0006/0030. Path public-unhit
(`terrainstatus` default Off).
**Next:** Open `teleport.c` `rloc_to` `maybe_unhide_at` (named).
Not vanish-msg. Audit @**#1465**.
**Blocked:** none.

## 2026-08-17 09:22 — #1462 D-1150 domove walk invocation_message

**Objective:** Open — `hack.c` `domove` `invocation_message` (named).
Not teleds.
**C locus:** `hack.c` `domove` 2964–2973; callee
`invocation_message` 3064–3085 / `invocation_pos` 982–986.
**Change:** after `vision_recalc(1)`, await `invocation_message`
when `ux0!=ux||uy0!=uy`. Callee already D-1141. Did not place
`mkmaze.c` `inv_pos`, share `dungeon.c` `Invocation_lev`, or fold
apply.js clone. Filled review **109** D-1149 hash `cdaccd3a`.
Rotated #1447. Open 9 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1460** **44**/44; next
@**#1465**).
**Verified:** private canary **19**/19 (walk onto inv_pos feet +
nomul; off-square; On_stairs; not Invocation_lev; unset inv_pos;
Lev/Fly/blocked-Lev; steed; spe==7 glow; Blind throb; walk away;
STONE; diagonal); green+strict seed8000/0900; cohort **23**/23
(0012 vault + 0004 pony + 0002/0006/0007/0009/0014/0017/0030/
0060/0102/0106/0108/0116/0360/0367/0373/0383/0700/1500/1800/
2200/4500) + isolated strict 0014/0012/0360/4500/2200/0030/
0004/0002/0006/0367. Path public-unhit on Invocation_lev.
**Next:** Open `hack.c` `classify_terrain` (named from
switch_terrain). Not invocation. Audit @**#1465**.
**Blocked:** none.

## 2026-08-17 09:05 — #1461 D-1149 mongone mdrop_special_objs

**Objective:** Must-fix — `mon.c` `mongone` `mdrop_special_objs` then
discard (elemental_clog victim). Not worn extract.
Source: reviews/loop-unattended/109-27274b3b-overcrowding.md.
**C locus:** `mon.c` `mongone` 3267–3282; `steal.c`
`mdrop_special_objs` 852–870; `mkobj.c` `discard_minvent` 2525–2536;
caller `elemental_clog` 3932–3936.
**Change:** `unstuck` when grabbing; reuse D-1148
`mdrop_special_objs`; discard remaining invent. Did not pull
`isgd`/`grddead`, `m_detach` wiz/shk/worm/`MON_DETACH`, worn
`extract_from_minvent`, or mongrantswish clone. Await vanish/
ghost/`*` genocide callers. Filled review **108** D-1148 hash
`27274b3b`. Rotated #1446. Open 10 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1460** **44**/44; next
@**#1465**).
**Verified:** private canary **26**/26 (Bell/Book/Candelabrum/Amulet/
Rider/quest arti drop; ordinary `rn2(100)` discard; clog victim
Bell + rloc_to; clog skips Amulet holder); green+strict
seed8000/0900; cohort **26**/26 (0014 gush + 0360 lava + 0006
djinni vanish + 4500/2200/0030/0004/0002/0012/0007/0009/0106/
0108/0116/0367/0373/0383/0398/1500/1800/0060/0102/0700/0017) +
strict 8000/0900/0014/0360/4500/2200/0004/0030/0002/0006/0106/
0108. Path public-unhit on endgame clog.
**Next:** Open `hack.c` `domove` `invocation_message` (named).
Not teleds. Audit @**#1465**.
**Blocked:** none.

## 2026-08-17 08:50 — #1460 review D-1145–D-1148 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `fountain.c` `dipfountain` 441 / `invent.c`
`update_inventory` 2781–2809; `region.c` `inside_gas_cloud`
1091–1165 / `run_regions` 439–456 / `mon.c` `m_poisongas_ok`
330–357; `do_name.c` `rndcolor` 1468–1477 / `trap.c` 6474–6476;
`mon.c` `deal_with_overcrowding` 3986–3995 / `mongone` 3267–3282
/ `elemental_clog` 3878–3949.
**Change:** reviews **106** ACCEPT D-1145 (`:441` both arms; callee
default no-op), **107** ACCEPT D-1146 (dam>0 HP + local
`m_poisongas_ok`; expire/mfndpos named), **108** ACCEPT D-1147
(always `rn2(16)`; Blind `blindgas`; only C caller), **109**
QUALITY-RISK D-1148 (limbo/clog pick match; clog victim
`mongone` `minvent=null` skips `mdrop_special_objs`). Must-fix
prepend that `mongone` family. Filled D-1148 archive hash
`27274b3b`. Rotated #1445. Open 10 + Must-fix 1 (no refill).
Rule #2: no fs.
**Score:** cadence **#1460** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `32+0.28/turn` (R² 0.87). Next
@**#1465**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Must-fix `mon.c` `mongone` `mdrop_special_objs` then
discard (elemental_clog victim). Not worn extract. Not
`invocation_message`.
**Blocked:** none.

## 2026-08-17 08:31 — #1459 D-1148 deal_with_overcrowding limbo

**Objective:** Open queue — `fountain.c` `gush`
`deal_with_overcrowding` (named). Not lava xkilled.
**C locus:** `mon.c` `deal_with_overcrowding` 3986–3995;
`m_into_limbo` 3833–3840; `migrate_mon` 3843–3861;
`elemental_clog`/`ok_to_obliterate` 3864–3949; callers
`minliquid_core` 1061–1062 / 1104–1105 and `mnexto` 3966–3968.
**Change:** port dispatcher + limbo/clog arms; wire minliquid
failed survivor `rloc` and `mnexto` failed-enexto. Thin
`mdrop_special_objs` (invocation/`obj_resists(0,0)`). Did not
pull steed Fly/Lev, `engulfing_u`, or full `mdrop_obj` worn.
Filled D-1147 archive hash `5c43dbc9`. Rotated #1444. Open 10
after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1455** **44**/44; next
@**#1460**).
**Verified:** private canary **46**/46; green+strict seed8000/0900;
cohort **24**/24 (0014 gush + 0360 lava + 4500/2200/0030/0004/
0002/0012/0006/0007/0009/0106/0108/0116/0367/0373/0383/0398/
1500/1800/0060/0102/0700/0017) + strict 8000/0900/0014/0360/
4500/2200/0004/0030/0002/0006/0106/0108 (seed0012 isolated
PASS). Path public-unhit on gush `m_at` overcrowding.
**Next:** Open `hack.c` `domove` `invocation_message` (named).
Not teleds. Audit @**#1460**.
**Blocked:** none.

## 2026-08-17 08:14 — #1458 D-1147 rndcolor chest_trap gas

**Objective:** Open queue — `do_name.c` `rndcolor` (named from
hcolor). Not sit/apply identity stubs.
**C locus:** `do_name.c` `rndcolor` 1468–1477; `decl.c`
`c_obj_colors[]` 20–37; `trap.c` `blindgas[]` 81–83 /
`chest_trap` 6474–6476; `hack.h` `ROLL_FROM`; `color.h`
`CLR_MAX`/`NO_COLOR`.
**Change:** port `rndcolor` (always `rn2(CLR_MAX)` even Hallu;
Hallu → `hcolor(NULL)` display-rng; else `k==NO_COLOR`
`"colorless"` not table `"transparent"`). Wire chest_trap gas
`Blind ? ROLL_FROM(blindgas) : rndcolor()`. Did not pull
sit/apply/pray/detect/do/wield/read identity `hcolor` stubs.
Filled D-1146 archive hash `fe5cefad`. Rotated #1443. Open 11
after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1455** **44**/44; next
@**#1460**).
**Verified:** private canary **215**/215; green+strict seed8000/0900;
cohort **19**/19 (0002 drinksink + 0014 fountain + 0383/0399 Hallu
+ 0006/0007/0106/0108/0360/2200/4500 + 0004/0009/0012/0030/0116/
0060/1500/1800) + strict 8000/0900/0002/0014/0383/0399/0006/0106/
0108/0360/2200/4500/0030/0060. seed0009 runner PASS (strict
length pre-existing D-0989). Path public-unhit on chest gas.
**Next:** Open `fountain.c` `gush` `deal_with_overcrowding`
(named). Not lava xkilled.
**Blocked:** none.

## 2026-08-17 08:03 — #1457 D-1146 inside_gas_cloud damage

**Objective:** Open queue — `region.c` `inside_gas_cloud` damage
(named). Not enveloped pline.
**C locus:** `region.c` `inside_gas_cloud` 1091–1165; `run_regions`
439–456; `create_gas_cloud` 1229–1236; `mon.c` `m_poisongas_ok`
330–357.
**Change:** dam>0 hero sting/`make_blinded`/Half_Phys+towel/`losehp`
or resist cough; mon cough/`setmangry`/blind/`rnd+5` then
`killed`/`monkilled`; local `m_poisongas_ok` (OK/MINOR/BAD);
size-1 envelop gate uses `m_poisongas_ok`; `run_regions` async +
await from `allmain`. Hero inside_f still geometric (walk
`in_out_region` named). Did not pull expire dissipation plines,
fumaroles whoosh, `create_gas_cloud_selection`, or mfndpos's
thinner `mon.js` `m_poisongas_ok`. Filled D-1145 archive hash
`623bc861`. Rotated #1442. Open 12 after archive+refill. Rule #2:
no fs.
**Score:** fortress unchanged (cadence **#1455** **44**/44; next
@**#1460**).
**Verified:** private canary **76**/76; green+strict seed8000/0900;
cohort **20**/20 (0002 drinksink + 0014 fountain + 0361/0383 fog
ttl + 0006/0007/0106/0108/0360/2200/0004/0009/0030/0012/0116/1500/
1800/0060/0102/0700) + strict 8000/0900/0002/0014/0006/0361/0383/
0360/0030/2200/0108/0004/0007/0012. Path public-unhit on dam>0 HP
(fog ttl still matches).
**Next:** Open `do_name.c` `rndcolor` (named from hcolor). Not
sit/apply identity stubs.
**Blocked:** none.

## 2026-08-17 07:42 — #1456 D-1145 Excalibur :441 update_inventory

**Objective:** Open queue — `fountain.c` Excalibur `:441`
`update_inventory` (named). Not artidisco save.
**C locus:** `fountain.c` `dipfountain` 441; `invent.c`
`update_inventory` 2781–2809; `wintty.c` `tty_update_inventory`
3606–3614.
**Change:** after Lady of the Lake gift or deny, call
`update_inventory()` before the ROOM analog (C order; both arms).
Existing D-1126 callee: in_moveloop / `suppress_map_output` /
suppress_price=0 around tty `sync_perminvent`. Default perm_invent
Off no RNG. Excalibur `return` still skips `:552` (C). Did not pull
artidisco save/rest, On WIN_INVEN, or `consume_obj_charge` known.
Filled no prior hash gap. Rotated #1441. Open 8 after archive (no
refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1455** **44**/44; next
@**#1460**).
**Verified:** private canary **38**/38; green+strict seed8000/0900;
cohort **20**/20 (0014 fountain + 0106 dip + 0007 snakes + 0002
drinksink + 0006 demon + knight 0103/0104/4500 + 0108/0360/2200/
0004/0009/0030/0012/0116/0367/1500/1800/0060) + strict 8000/0900/
0014/0106/0006/0007/0002/0103/0104/4500/0108/0360/2200/0004/0030.
Path public-unhit (perm_invent Off; Excalibur dip unhit).
**Next:** Open `region.c` `inside_gas_cloud` damage. Not enveloped
pline.
**Blocked:** none.

## 2026-08-17 07:25 — #1455 review D-1141–D-1144 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `teleport.c` `teleds` 569 / `hack.c`
`invocation_message` 3064–3085 / `invocation_pos` 982–986;
`teleport.c` 540, 570–571 / `flag.h` 233–237 / `hack.c`
`notice_mon` 1708–1783; `region.c` `in_out_region` 505–506,
519–520; `potion.c` `djinni_from_bottle` 2815–2868 /
`apply.c` `dorub` 1816–1831.
**Change:** reviews **102** ACCEPT D-1141 (`invocation_message`
after `spoteffects`; walk/`inv_pos` named), **103**
ACCEPT-WITH-DEBT D-1142 (teleds off/on + real `notice_all_mons`;
`vision_recalc` still silent; `spot_monsters` still
`flags` not `a11y`; not Must-fix), **104** ACCEPT D-1143
(`pline1` after clear/set; `teleok` await; `#if 0` msgs),
**105** ACCEPT D-1144 (MAGIC_LAMP transform then djinni;
dodrink smoky named). Must-fix empty. Filled D-1144 archive
hash `1c1f7ccb`. Rotated #1440. Open 9 (no refill). Rule #2:
no fs.
**Score:** cadence **#1455** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `31+0.27/turn` (R² 0.87). Next
@**#1460**.
**Verified:** C read of the four loci vs JS hunks; grep
FORCE/fs/seed; `teleok(` only in `teleport.js`; full `sessions`
`__RESULTS_JSON__`.
**Next:** Open `fountain.c` Excalibur `:441` `update_inventory`.
Not artidisco save.
**Blocked:** none.

## 2026-08-17 07:12 — #1454 D-1144 djinni_from_bottle mongrantswish

**Objective:** Open queue — `potion.c` `djinni_from_bottle`
`mongrantswish` (named). Not bottle chance RNG.
**C locus:** `potion.c` `djinni_from_bottle` 2815–2868 / `mongrantswish`
2845; `apply.c` `dorub` MAGIC_LAMP 1816–1831.
**Change:** port makemon djinni, Blind cloud/smell, `rn2(5)` BUC remap,
wish `mongrantswish` / `tamedog` / peace / vanish `mongone` / hostile.
MAGIC_LAMP: unpaid + OIL_LAMP transform + `begin_burn` if lamplit then
djinni then `makeknown`/`update_inventory`. Did not wire dodrink smoky
occupant chance. SetVoice / full `mongone` named. Filled D-1143 archive
hash `bb8585ec`. Rotated #1439. Open 9 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1450** **44**/44; next
@**#1455**).
**Verified:** private canary **33**/33; green+strict seed8000/0900;
cohort **24**/24 (0108 `#rub` lamp + 0105 lamp + 0006 demon + 0014
fountain + 0002 drinksink + 0007 snake + 2200/4500/0360/0030/0004/
0009/0012/1500/1800/0060/0116/0361/0367/0373/0383/5002/0106/0399)
+ strict 8000/0900/0108/0006/0014/0002/0105/2200/4500/0360/0030/0004.
Path public-unhit on djinni release.
**Next:** Open `fountain.c` Excalibur `:441` `update_inventory`.
Not artidisco save.
**Blocked:** none.

## 2026-08-17 06:57 — #1453 D-1143 in_out_region enter_msg / leave_msg

**Objective:** Open queue — `region.c` `in_out_region`
enter_msg / leave_msg (named). Not update_player_regions.
**C locus:** `region.c` `in_out_region` 505–506 / 519–520;
`hack.h` `pline1`; `create_msg_region` 954–973 `#if 0`.
**Change:** `in_out_region` awaits `pline(leave_msg)` after
clear_hero_inside and `pline(enter_msg)` after set, when
non-NULL, then the leave_f/enter_f callbacks. `teleok` is
async and all its teleport.js callers await it. Did not
pull force-field `#if 0` callbacks, hack.c/dothrow/`do.c`
walk callers, or flip geometric gas. `teleds` still uses
`update_player_regions` (D-1130). Filled D-1142 archive
hash `52194cc9`. Rotated #1438. Open 10 after archive (no
refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1450** **44**/44; next
@**#1455**).
**Verified:** private canary **40**/40; green+strict seed8000/0900;
cohort **24**/24 (0012 vault + 0367 Pri ^T + 0004 scroll +
0007 snake + 0009 swim + 0360/0373/4500/2200/1500/1800/0030/
0002/0116/0060/0102/0700/0017/0361/0108/0383/5002/0006/0105)
+ strict 8000/0900/0012/0367/0004/0360/4500/2200/0030/0009/0002.
Path public-unhit (`create_msg_region` `#if 0`).
**Next:** Open `potion.c` `djinni_from_bottle` `mongrantswish`.
Not bottle chance RNG.
**Blocked:** none.

## 2026-08-17 06:47 — #1452 D-1142 teleds notice_mon_off / notice_all_mons

**Objective:** Open queue — `teleport.c` `teleds`
`notice_mon_off` / `notice_all_mons` (named). Not invocation.
**C locus:** `teleport.c` `teleds` 540, 570–571; `flag.h`
`notice_mon_off`/`on` 233–237; `hack.c` `notice_mon` 1708–1731 /
`notice_all_mons` 1744–1783.
**Change:** port `a11y` block + `notice_mon` + `notice_all_mons`
in `hack.js`. `teleds` offs before `vision_recalc`, on +
`notice_all_mons(TRUE)` after invocation. Default Off. Distu
sort You see/notice; hider furniture/object skip. Did not pull
vision_recalc / goto_level / newgame / mapping / postmov callers
or `spot_monsters` option. Filled D-1141 archive hash `4d71520e`.
Open 11 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1450** **44**/44; next
@**#1455**).
**Verified:** private canary **48**/48; green+strict seed8000/0900;
cohort **24**/24 (0012 vault + 0367 Pri ^T + 0004 scroll +
0007 snake + 0009 swim + 0360/0373/4500/2200/1500/1800/0030/
0002/0116/0060/0102/0700/0017/0361/0108/0383/5002/0006/0105)
+ strict 8000/0900/0012/0367/0004/0360/4500/2200/0030/0009/0002.
Path public-unhit on `spot_monsters`.
**Next:** Open `region.c` `in_out_region` enter_msg / leave_msg.
Not update_player_regions.
**Blocked:** none.

## 2026-08-17 06:31 — #1451 D-1141 teleds invocation_message

**Objective:** Open queue — `teleport.c` `teleds`
`invocation_message` (named). Not vault_guard.
**C locus:** `teleport.c` `teleds` 569; `hack.c`
`invocation_message` 3064–3085 / `invocation_pos` 982–986;
`dungeon.c` `Invocation_lev` 2017–2021; `stairs.c` `On_stairs`
148–151; `invent.c` `carrying` 1495–1504.
**Change:** port `invocation_pos`/`invocation_message` in
`hack.js`. `teleds` awaits it after `spoteffects`. Gate
`invocation_pos` && !`On_stairs`; nomul; You_feel vibration;
`uvibrated`; lit spe==7 candelabrum throb/glow. Unset inv_pos
is not (0,0). Did not pull `notice_mon_*`, walk `hack.c:2973`,
or `mkmaze.c` `inv_pos`. Filled no prior hash gap. Rotated
#1437. Open 7 after archive → refill to 12. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1450** **44**/44; next
@**#1455**).
**Verified:** private canary **26**/26; green+strict seed8000/0900;
cohort **24**/24 (0012 vault + 0367 Pri ^T + 0004 scroll +
0007 snake + 0009 swim + 0360/0373/4500/2200/1500/1800/0030/
0002/0116/0060/0102/0700/0017/0361/0108/0383/5002/0006/0105)
+ strict 8000/0900/0012/0367/0004/0360/4500/2200/0030/0009/0002.
Path public-unhit on Invocation_lev.
**Next:** Open `teleport.c` `teleds` `notice_mon_off` /
`notice_all_mons`. Not invocation.
**Blocked:** none.

## 2026-08-17 06:20 — #1450 review D-1137–D-1140 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `region.c` `make_gas_cloud` 1182–1204 /
`create_gas_cloud` 1229–1236; `mon.c` `minliquid_core` 1010–1067
/ `mondata.c` `on_fire` 1411–1445 / `trap.c` `fire_damage_chain`
4550–4572 / `allmain.c` 210–216; `teleport.c` `teleds` 487–504
/ `mon.c` `set_ustuck` 3421–3435; `teleport.c` `teleds` 454,
553–566 / `vault.c` `uleftvault` 256–277.
**Change:** reviews **98** ACCEPT D-1137 (You + `PLNMSG_ENVELOPED_IN_GAS`
after add_region analog; `set_heros_fault`; inside_f HP /
`m_poisongas_ok` named), **99** ACCEPT D-1138 (lava `on_fire` /
`mondead` vs `xkilled` + `fire_damage_chain`; `mon_moving` wrap;
gush is pool-only), **100** ACCEPT D-1139 (`set_ustuck(Null)` +
origin `docrt`; not `unstuck`), **101** ACCEPT-WITH-DEBT D-1140
(vault fake/restore + irate/`mpeaceful=0`; hostile `gd_move`
named no-op, not Must-fix). Must-fix empty. Filled D-1140 archive
hash `36fb8797`. Rotated #1436. Open 8 (no refill). Rule #2: no fs.
**Score:** cadence **#1450** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `31+0.27/turn` (R² 0.87). Next
@**#1455**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `teleport.c` `teleds` `invocation_message`. Not
vault_guard.
**Blocked:** none.

## 2026-08-17 06:10 — #1449 D-1140 teleds vault_guard uleftvault

**Objective:** Open queue — `teleport.c` `teleds` `vault_guard`
`uleftvault` (named). Not swallow docrt.
**C locus:** `teleport.c` `teleds` 454, 553–566; `vault.c`
`uleftvault` 254–278.
**Change:** capture origin `vault_occupied`?`findgd`; after dest-typ
`switch_terrain`, fake dest `in_rooms(...,VAULT)`, `uleftvault` if
left, restore `u.urooms` before `spoteffects` (D-0639). Gold +
`um_dist` → irate/`mpeaceful=0`; `!in_fcorridor` → `gd_move`. Did
not pull hostile `gd_move` rloc/`gd_letknow`/`wallify`, invocation,
or `notice_mon_*`. Filled D-1139 archive hash `4071a74d`. Open 8
after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1445** **44**/44; next
@**#1450**).
**Verified:** private canary **23**/23; green+strict seed8000/0900;
cohort **24**/24 (0012 vault + 0367 Pri ^T temple + 0004 scroll +
0007 snake + 0009 swim + 0360/0373/4500/2200/1500/1800/0030/0002/
0116/0060/0102/0700/0017/0361/0108/0383/5002/0006/0105) + strict
8000/0900/0012/0367/0004/0360/4500/2200/0030/0009/0002. Path
public-unhit on gold vault teleport.
**Next:** Open `teleport.c` `teleds` `invocation_message`. Not
vault_guard.
**Blocked:** none.

## 2026-08-17 05:55 — #1448 D-1139 teleds swallow set_ustuck + docrt

**Objective:** Open queue — `teleport.c` `teleds` swallow `docrt`
(named). Not hideunder.
**C locus:** `teleport.c` `teleds` 487–504; `mon.c` `set_ustuck`
3421–3435.
**Change:** after `reset_utrap`, snapshot `uswallow`,
`set_ustuck(null)` (not `unstuck`), then hideunder. If swallowed:
Punished force `ball_active`/no-drag and `await docrt()` at the
origin (gulp→map). Did not pull vault_guard / invocation /
`notice_mon_*`. Filled D-1138 archive hash `068e78df`. Open 9
after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1445** **44**/44; next
@**#1450**).
**Verified:** private canary **21**/21; green+strict seed8000/0900;
cohort **24**/24 (0012 vault + 0004 scroll + 0007 snake + 0009
swim + 0360/0367/0373/4500/2200/1500/1800/0030/0002/0116/0060/
0102/0700/0017/0361/0108/0383/5002/0006/0105) + strict 8000/0900/
0012/0360/4500/0004/2200/0367/0373/0030/0009/0002. Path
public-unhit on swallowed teleds.
**Blocked:** none.
