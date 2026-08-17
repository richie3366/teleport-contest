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
**Next:** Open `teleport.c` `teleds` `vault_guard` `uleftvault`.
Not swallow docrt.
**Blocked:** none.

## 2026-08-17 05:40 — #1447 D-1138 minliquid lava on_fire / xkilled

**Objective:** Open queue — `fountain.c` `gush` lava
`fire_damage_chain` / `xkilled` (named). Not minliquid.
**C locus:** `mon.c` `minliquid_core` 1010–1067;
`trap.c` `fire_damage_chain` 4550–4572; `mondata.c` `on_fire`
1411–1445; `allmain.c` 210–216.
**Change:** lava `on_fire` fate pline; `mon_moving` → `mondead`
else `xkilled(XKILL_NOMSG)`; fire-resist −1 hp +
surrenders/burns-slightly; survivor `fire_damage_chain` then
`rloc(RLOC_MSG)`. Wrap `movemon` with `context.mon_moving` so
Gehennom mumak is `mondead` not hero `xkilled`. Did not pull
overcrowding / steed Fly-Lev / `engulfing_u`. Filled D-1137
archive hash `50136436`. Open 10 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1445** **44**/44; next
@**#1450**).
**Verified:** private canary **42**/42; green+strict seed8000/0900;
cohort **24**/24 (0360 lava + 0014 gush + 4500/2200/0030/0004/
0009/0367/0116/0373/0060/0383/1500/1800/0102/0700/0017/0007/
0361/0002/0006/0108) + strict 8000/0900/0014/0360/4500/2200/
0004/0030.
**Next:** Open `teleport.c` `teleds` swallow `docrt`. Not hideunder.
**Blocked:** none.

## 2026-08-17 05:25 — #1446 D-1137 make_gas_cloud enveloped pline

**Objective:** Open queue — `region.c` `make_gas_cloud` enveloped
pline (named). Not create_gas_cloud size-1.
**C locus:** `region.c` `make_gas_cloud` 1182–1204 / 1197–1203;
`create_gas_cloud` 1229–1236; `zap.c` `zap_over_floor` 5186–5188.
**Change:** after `add_region`, `!in_mklev && !inside_cloud &&
is_hero_inside_gas_cloud` → You noxious/steam +
`PLNMSG_ENVELOPED_IN_GAS`. `set_heros_fault` when player-made.
`create_gas_cloud` async; await fountain/zap/trap/fumaroles.
Did not pull `m_poisongas_ok`, inside_f damage, fumaroles
`clear_heros_fault`/Norep. Filled no prior missing hash (D-1136
already `52aea3d1`). Rotated #1435. Open 11 after archive (no
refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1445** **44**/44; next
@**#1450**).
**Verified:** private canary **35**/35; green+strict seed8000/0900;
cohort **24**/24 (0002 drinksink + 0014 fountain + 0016/2200 zap
+ 0373 + 0360/4500/0108 + 0006/0007/1500/1800/0060/0004/0009/
0012/0030/0383/0399/0116/0106/0102/0700/1150) + strict 8000/0900/
0002/0014/0016/2200/0373/0108/0360/4500/0006/0030. Path
public-unhit on fate 13 / zap envelop.
**Next:** Open `fountain.c` `gush` lava `fire_damage_chain` /
`xkilled`. Not minliquid.
**Blocked:** none.

## 2026-08-17 05:10 — #1445 review D-1133–D-1136 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `teleport.c` `tele_trap` 1506–1532 / `tele()` 841–845
/ `track.c` `settrack`; `fountain.c` `dipfountain` 552 /
`invent.c` `update_inventory` 2781–2809; `do_name.c` `hcolor`
1460–1466 / `hcolors[]` 1441–1458 / `fountain.c` drinksink 642–643;
`potion.c` `mongrantswish` 2794–2811 / `display.c` `glyph_at`
2478–2482 / `tmp_at` DISP_ALWAYS.
**Change:** reviews **94** ACCEPT D-1133 (`next_to_u` sibling;
teledest displace+`teleds` else real `tele()`; `dotele` /
`vault_tele` fallback named), **95** ACCEPT D-1134 (unconditional
`:552` before `dryup`; Excalibur `:441` named), **96** ACCEPT
D-1135 (`hcolors[74]` + display-rng; Blind `"odd"`; other-module
stubs named), **97** ACCEPT D-1136 (`tmp_at` hide real; `glyph_at`
gbuf clone; full `mongone` / djinni named). Must-fix empty. Filled
D-1136 archive hash `52aea3d1`. Rotated #1430. Open 12 (no refill).
Rule #2: no fs.
**Score:** cadence **#1445** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `31+0.26/turn` (R² 0.87). Next
@**#1450**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `region.c` `make_gas_cloud` enveloped pline. Not
create_gas_cloud size-1.
**Blocked:** none.

## 2026-08-17 05:00 — #1444 D-1136 mongrantswish tmp_at glyph hide

**Objective:** Open queue — `fountain.c` `mongrantswish` `tmp_at`
glyph hide (named). Not dowaterdemon makemon.
**C locus:** `potion.c` `mongrantswish` 2794–2811; `display.c`
`glyph_at` 2478–2482 / `tmp_at` DISP_ALWAYS; `fountain.c`
`dowaterdemon` 78–82.
**Change:** snapshot gbuf `loc.disp_*` before splice+newsym; wrap
`makewish` in `tmp_at(DISP_ALWAYS)` + `tmp_at(mx,my)` +
`DISP_END`. Not `mon_glyph` (no extra Hallu rng). Did not pull
full C `mongone` or `djinni_from_bottle`. Did not rewrite
`dowaterdemon` `makemon`. Filled D-1135 archive hash `b166bda5`.
Rotated #1429. Open refill 7→12. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1440** **44**/44; next
@**#1445**).
**Verified:** private canary **27**/27; green+strict seed8000/0900;
cohort **24**/24 (0006 demon + 0014 fountain + 0007 snakes +
0002 drinksink + 0383/0399 Hallu + 0108/0360/2200/4500 +
1500/1800/0060/0004/0009/0012/0030/0116/0367/0398/0373/0106)
+ strict 8000/0900/0002/0014/0006/0106/0108/0360/2200/4500/
0030. Path public-unhit on the wish hide.
**Next:** Open `region.c` `make_gas_cloud` enveloped pline.
Not create_gas_cloud size-1. Audit @**#1445**.
**Blocked:** none.

## 2026-08-17 04:45 — #1443 D-1135 hcolor Hallucination drinksink

**Objective:** Open queue — `do_name.c` `hcolor` Hallucination
drinksink synonyms (named). Not hliquid.
**C locus:** `do_name.c` `hcolor` 1460–1466 / `hcolors[]`
1441–1458; `fountain.c` `drinksink` case 4 642–643;
`youprop.h` Hallucination 120.
**Change:** port `hcolors[]` SIZE 74 + `hcolor` in `do_name.js`
(Hallu or NULL pref → `rn2_on_display_rng(SIZE)` only; pref is
not a last choice; gameover does not skip). Wire drinksink case 4
Blind ternary to the shared helper. Did not pull sit/apply/pray/
detect/do/wield/read identity stubs or `rndcolor`. Did not rewrite
`hliquid`. Filled D-1134 archive hash `5f55ceba`. Rotated #1428.
Open 8 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1440** **44**/44; next
@**#1445**).
**Verified:** private canary **110**/110; green+strict seed8000/0900;
cohort **21**/21 (0002 drinksink + 0014 fountain + 0383/0399 Hallu
+ 0006/0007/0106/0108/0360/2200/4500/1500/1800/0004/0009/0012/
0030/0116/0060/0367/0398) + strict 0002/0014/0383/0399/0006/0106/
0108/0360/2200/4500/0030. Path public-unhit on Hallu faucet.
**Next:** Open `fountain.c` `mongrantswish` `tmp_at` glyph hide.
Not dowaterdemon makemon.
**Blocked:** none.

## 2026-08-17 04:35 — #1442 D-1134 dipfountain after-switch update_inventory

**Objective:** Open queue — `fountain.c` `dipfountain`
`update_inventory` after switch (named). Not Excalibur gift.
**C locus:** `fountain.c` `dipfountain` 552; `invent.c`
`update_inventory` 2781–2809; `wintty.c` `tty_update_inventory`
3606–3614.
**Change:** after the `rnd(30)` switch, call `update_inventory()`
then `dryup` (C order; unconditional, unlike drinkfountain case 24
`buc_changed`). Existing D-1126 callee: in_moveloop /
`suppress_map_output` / suppress_price=0 around tty
`sync_perminvent`. Default perm_invent Off no RNG. Did not pull
Excalibur `:441`, On WIN_INVEN, or `consume_obj_charge` known.
Filled D-1133 archive hash `a956e990`. Rotated #1427. Open 9 after
archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1440** **44**/44; next
@**#1445**).
**Verified:** private canary **28**/28; green+strict seed8000/0900;
cohort **21**/21 (0014 fountain + 0106 dip + 0007 snakes + 0002
drinksink + 0006 demon + 0108 + 0360/2200/4500 + 0004/0009/0012/
0030/0383/0399/0116/0367/0398 + 1500/1800/0060) + strict 0014/0007/
0002/0006/0106/0108/0360/2200/4500/0030/0004/0009. Path
public-unhit (perm_invent Off).
**Next:** Open `do_name.c` `hcolor` Hallucination drinksink
synonyms. Not hliquid.
**Blocked:** none.

## 2026-08-17 04:25 — #1441 D-1133 tele_trap teledest / else tele()

**Objective:** Open queue — `teleport.c` `tele()` / trap teledest
(named). Not tele_trap wrenching.
**C locus:** `teleport.c` `tele_trap` 1506–1532; `tele()` 841–845;
`track.c` `settrack`.
**Change:** lift `next_to_u` to C's sibling of once. Port teledest:
`settrack`, dest `m_at`, `enexto` fail → shudder, else `rloc_to` then
`teleds(TELEDS_TELEPORT)`; unnamed dest → `tele()`. Did not pull
`dotele` trap-at-feet or `vault_tele` tele() fallback. Rotated
#1426. Open 10 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1440** **44**/44; next
@**#1445**).
**Verified:** private canary **32**/32; green+strict seed8000/0900;
cohort **22**/22 (0012 vault + 0004 + 0007 snake + 0009 swim +
0360/0367/0373/4500/2200/1500/1800/0030/0002/0116/0060/0102/0700/
0017/0361/0108/0383/5002) + strict 0012/0360/4500/0004/2200/0367/
0373/0030/0009/0002. Path public-unhit on named-dest / random TELEP.
**Next:** Open `fountain.c` `dipfountain` `update_inventory` after
switch. Not Excalibur gift.
**Blocked:** none.

## 2026-08-17 04:10 — #1440 review D-1129–D-1132 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `teleport.c` `teleds` 548–552 / `hack.c`
`switch_terrain` 3178–3217; `teleport.c` 529 / `region.c`
`update_player_regions` 582–592; `teleport.c` 493–496 /
`mon.c` `hideunder` 4726–4801; `teleport.c` 456–459 /
`dig.c` `buried_ball_to_punishment` 1934–1955 / `read.c`
`punish`.
**Change:** reviews **90** ACCEPT D-1129 (`switch_terrain` real;
no `float_down` on block; `classify_terrain` named), **91**
ACCEPT D-1130 (dangling-else `attach_2_u` clear; not
`in_out_region`; gas bit reader named), **92** ACCEPT-WITH-DEBT
D-1131 (hideunder+mimic `M_AP_NOTHING`; eel `u.Underwater`
sticky named, not Must-fix), **93** ACCEPT D-1132 (type-only
unearth; `punish` reuse real; other callers named). Must-fix
empty. Filled D-1132 archive hash `a8d04dd2`. Rotated #1425.
Open 11 (no refill). Rule #2: no fs.
**Score:** cadence **#1440** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `31+0.27/turn` (R² 0.87). Next
@**#1445**.
**Verified:** C read of the four loci vs JS hunks; grep
FORCE/fs/seed; full `sessions` `__RESULTS_JSON__`.
**Next:** Open `teleport.c` `tele()` / trap teledest. Not
tele_trap wrenching.
**Blocked:** none.

## 2026-08-17 04:00 — #1439 D-1132 teleds buried_ball_to_punishment

**Objective:** Open queue — `teleport.c` `teleds`
`buried_ball_to_punishment` (named). Not Punished ball.
**C locus:** `teleport.c` `teleds` 456–459; `dig.c`
`buried_ball_to_punishment` 1934–1955 / `buried_ball`.
**Change:** port `buried_ball_to_punishment` (extract, `punish`
reuse, `reset_utrap(FALSE)`, `del_engr_at`/`newsym`). `teleds`
calls it when `utraptype==TT_BURIEDBALL` before `ball_active`.
Did not wire trapmove/`unearth_objs`/`digactualhole`/`level_tele`/
`domagicportal`. Filled D-1131 hash `00956ae8`. Dropped leftover
#1424 stub (already archived). Open 11 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1435** **44**/44; next
@**#1440**).
**Verified:** private canary **49**/49; green+strict seed8000/0900;
cohort **22**/22 (0012 vault + 0004 + 0007 snake + 0009 swim +
0360/0367/0373/4500/2200/1500/1800/0030/0002/0116/0060/0102/0700/
0017/0361/0108/0383/5002) + strict 0012/0360/4500/0004/2200/0367/
0373/0030/0009/0002. Path public-unhit on buried-ball teleds.
**Next:** Open `teleport.c` `tele()` / trap teledest. Not tele_trap
wrenching.
**Blocked:** none.

## 2026-08-17 03:50 — #1438 D-1131 teleds hideunder / mimic

**Objective:** Open queue — `teleport.c` `teleds` `hideunder` /
mimic (named). Not swallow docrt.
**C locus:** `teleport.c` `teleds` 493–496; `mon.c`
`hideunder` 4726–4801.
**Change:** `teleds` calls `hideunder(youmonst)` after
reset_utrap, before drag_ball. Failed hide + S_MIMIC sets
`m_ap_type=M_AP_NOTHING` (not seemimic). youmonst
`u.uundetected` + newsym when the flag changes. eel
`is_pool`/`couldsee`; concealer `!is_pool && !is_lava`.
Did not pull set_ustuck, swallow docrt, can_hide_under_obj,
cockatrice, or You_see. Filled D-1130 hash `6dd7a794`.
Rotated #1423. Open 12 after archive+refill. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1435** **44**/44; next
@**#1440**).
**Verified:** private canary **47**/47; green+strict seed8000/0900;
cohort **22**/22 (0012 vault + 0004 scroll + 0007 snake +
0009 swim + 0360/0367/0373/4500/2200/1500/1800/0030/0002/
0116/0060/0102/0700/0017/0361/0108/0383/5002) + strict
0012/0360/4500/0004/2200/0367/0373/0030/0009/0002. Path
public-unhit on poly-hider / mimic teleds.
**Next:** Open `teleport.c` `teleds` `buried_ball_to_punishment`.
Not Punished ball.
**Blocked:** none.

## 2026-08-17 03:35 — #1437 D-1130 teleds update_player_regions

**Objective:** Open queue — `teleport.c` `teleds`
`update_player_regions` (named). Not teleok in_out_region.
**C locus:** `teleport.c` `teleds` 529; `region.c`
`update_player_regions` 582–592; `region.h` hero_inside.
**Change:** port `update_player_regions` in `region.js`.
`teleds` calls it after placebc, before newsym. Absolute
REG_HERO_INSIDE from dest; attach_2_u always clear (C
dangling else). No enter/leave callbacks (not in_out_region).
Did not flip geometric `is_hero_inside_gas_cloud`. Filled
D-1129 hash `410f22a2`. Rotated #1422. Open 8 after archive
(no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1435** **44**/44; next
@**#1440**).
**Verified:** private canary **27**/27; green+strict seed8000/0900;
cohort **22**/22 (0012 vault + 0004 scroll + 0360/0367/0373/
4500/2200/1500/1800/0030/0009/0002/0116/0060/0102/0700/0017/
0007/0361/0108/0383/5002) + strict 0012/0360/4500/0004/2200/
0367/0373/0030/0009/0002. Path public-unhit on gas teleds.
**Next:** Open `teleport.c` `teleds` `hideunder` / mimic.
Not swallow docrt.
**Blocked:** none.
