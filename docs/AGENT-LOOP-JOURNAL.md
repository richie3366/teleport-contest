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

## 2026-08-17 13:20 — #1470 review D-1153–D-1156 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `teleport.c` `vault_tele` 772–783 / `tele` 841–845;
`mkmaze.c` `pick_vibrasquare_location` 1042–1093 /
`sp_lev.c` `create_trap` VS 1818–1821 / `hellfill.lua` 437–441 /
`mklev.c` `occupied` 1806–1811; `region.c` `expire_gas_cloud`
1046–1087 / `run_regions` 419–473; `mkmaze.c` `fumaroles`
1484–1514 / `region.h` `clear_heros_fault`.
**Change:** reviews **114** ACCEPT D-1153 (`tele()` else after
vault `teleds`; `dotele` teledest named), **115** ACCEPT D-1154
(hellfill picker + VS `maketrap`; `makemaz("")` named),
**116** ACCEPT D-1155 (thin around-you / You_see; thick half+ttl=2),
**117** ACCEPT D-1156 (`clear_heros_fault` + Norep whoosh;
moveloop named). Must-fix empty. Filled D-1156 archive hash
`16e8d88b`. Rotated #1455. Open 8 (no refill). Rule #2: no fs.
**Score:** cadence **#1470** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `32+0.27/turn` (R² 0.87). Next
@**#1475**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `hack.c` walk `in_out_region` (named). Not teleds.
**Blocked:** none.

## 2026-08-17 13:05 — #1469 D-1156 fumaroles clear_heros_fault / Norep whoosh

**Objective:** Open — `mklev.c` `fumaroles` `clear_heros_fault` /
Norep whoosh (named). Not expire dissipation.
**C locus:** `mkmaze.c` `fumaroles` 1484–1514; `region.h`
`clear_heros_fault`; `do.c` `goto_level` 1833–1834.
**Change:** after lava `create_gas_cloud`, `clear_heros_fault` so
natural steam is not the hero's. `snd`/`loud` (`distu<15`); `!Deaf`
Norep whoosh / loud whoosh. Exported `clear_heros_fault`. Did not
pull allmain moveloop caller, selection create, or walk
`in_out_region`. Filled D-1155 archive hash `df99ab32`. Rotated
#1454. Open 8 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1465** **44**/44; next
@**#1470**).
**Verified:** private canary **36**/36 (src order; bit; player-made
then clear; fire+hot REG_NOT_HEROS + template; Deaf/EDeaf/uroleplay
silent; no lava / !flag; far not-loud; close loud; sticky;
in_mklev; temp0 nmax=0); green+strict seed8000/0900; cohort
**14**/14 (0373 fire + 0002 drinksink + 0014 fountain + 0361/0383
fog + 0360/2200/0004/0006/0012/1500/1800/0030/0108) + strict
8000/0900/0373/0002/0014/0361/0383/0360/2200/0030/0004/0006 +
0012 alone. Path public-unhit on whoosh.
**Next:** Open `hack.c` walk `in_out_region` (named). Not teleds.
**Blocked:** none.

## 2026-08-17 12:50 — #1468 D-1155 expire_gas_cloud dissipation plines

**Objective:** Open — `region.c` `expire_gas_cloud` dissipation
plines (named). Not inside_gas HP.
**C locus:** `region.c` `expire_gas_cloud` 1046–1087;
`run_regions` 419–473.
**Change:** port `expire_gas_cloud` (thick `arg>=5` half+`ttl=2`;
thin Blind one-pass; `!uswallow` `u_at` within else `cansee`
seen++). `run_regions` resets gg flags, `NO_CALLBACK||callback`
then remove, then around-you / `You_see a|some` with
`xray_range<=1` suppress. Pass 1 unblock stays `remove_region`
rebuild. Did not pull fumaroles whoosh, selection create, or
geometric bit. Filled D-1154 archive hash `10904562`. Rotated
#1453. Open 9 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1465** **44**/44; next
@**#1470**).
**Verified:** private canary **54**/54 (src order; thick 8→4 ttl
age 2→1 silent; 5/2 trunc; within; seen a/some; unseen; Blind/
uswallow; xray -1/1/>1; overlap; two clouds; NO_CALLBACK; ttl>0;
stale gg; arg=4 thin; second expire after half); green+strict
seed8000/0900; cohort **14**/14 (0002 drinksink + 0014 fountain
+ 0361/0383 fog + 0006/0007/0360/2200/0030/0004/1500/1800/0012/
0108) + strict 8000/0900/0002/0014/0361/0383/0360/2200/0030/
0004/0006/0012. Path public-unhit on dissipation plines.
**Next:** Open `mklev.c` `fumaroles` `clear_heros_fault` / Norep
whoosh (named). Not expire dissipation.
**Blocked:** none.

## 2026-08-17 12:32 — #1467 D-1154 inv_pos / VIBRATING_SQUARE

**Objective:** Open — `mkmaze.c` `inv_pos` / VIBRATING_SQUARE
(named from invocation_pos). Not teleds.
**C locus:** `mkmaze.c` `pick_vibrasquare_location` 1042–1093 /
`makemaz` 1214–1216; `sp_lev.c` `create_trap` VS 1818–1821;
`hellfill.lua` 437–441; `mklev.c` `occupied` 1806–1811.
**Change:** port `pick_vibrasquare_location` (`svi.inv_pos`,
upstairs row/col/diag/`distmin<=11`, `SPACE_POS`, `occupied`;
no-upstairs short-circuit). `create_trap(VS)` then `maketrap`.
hellfill Invocation_lev → VS else down stair. `occupied`
`invocation_pos`. Did not pull `makemaz("")` create_maze,
`Can_dig_down` !Invocation_lev, apply.js clone, or shared
`dungeon.c` export. Filled D-1153 archive hash `b332516f`.
Rotated #1452. Open 10 after archive (no refill). Rule #2:
no fs.
**Score:** fortress unchanged (cadence **#1465** **44**/44; next
@**#1470**).
**Verified:** private canary **33**/33 (range; stairs
row/col/diag/distmin; SPACE_POS; no-stairs 2 `rn2`; occupied +
`invocation_pos` on/off Invocation_lev; botlevel/not-hellish;
maketrap VS / undestroyable; fountain/trap/STONE skip; pool;
stale 99,99; (0,0) vs (1,0); !isok); green+strict seed8000/0900;
cohort **24**/24 (0360/4500 hellfill + 0012 vault + 0004 pony +
2200/0030/0002/0006/0007/0009/0014/0017/0060/0102/0106/0108/
0116/0361/0367/0373/0383/0700/1500/1800) + strict
0012/0004/0360/4500/2200/0030/0002/0367. Path public-unhit on
Invocation_lev.
**Next:** Open `region.c` `expire_gas_cloud` dissipation plines
(named). Not inside_gas HP.
**Blocked:** none.

## 2026-08-17 12:20 — #1466 D-1153 vault_tele tele() fallback

**Objective:** Open — `teleport.c` `vault_tele` `tele()` fallback
(named). Not teleds.
**C locus:** `teleport.c` `vault_tele` 772–783; callee `tele` /
`scrolltele` 840–912.
**Change:** no vault / `somexyspace` fail / `teleok` fail →
`await tele()` (`scrolltele(NULL)` → `safe_teleds`). Success still
`teleds(TELEDS_TELEPORT)` then return. Drop invented boolean.
Did not pull `dotele` trap-at-feet teledest. Filled no prior hash
gap. Rotated #1451. Open 11 after archive (no refill). Rule #2:
no fs.
**Score:** fortress unchanged (cadence **#1465** **44**/44; next
@**#1470**).
**Verified:** private canary **33**/33 (src order; no-vault
`safe_teleds` RNG; empty/OROOM skip; vault-with-space `teleds` no
`rnd`; stone/trap/monster fallback; `hx<0` terminator; subroom
VAULT; `tele_trap` once ± vault; noteleport stay); green+strict
seed8000/0900; cohort **25**/25 (0012 vault + 0004 pony + 0367
Pri ^T + 0360/4500/0373/2200/0014/0009/1500/1800/0060/0102/0700/
0017/0030/0116/0383/0007/0361/0108/0002/5002/2600/0006) + strict
0012/0004/0367/0360/4500/2200/0002/0009/0030/0014. Path
public-unhit on no-vault once-TELEP.
**Next:** Open `mkmaze.c` `inv_pos` / VIBRATING_SQUARE (named from
invocation_pos). Not teleds.
**Blocked:** none.

## 2026-08-17 12:05 — #1465 review D-1149–D-1152 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `mon.c` `mongone` 3267–3282 / `mkobj.c`
`discard_minvent` 2525–2536 / `steal.c` `mdrop_special_objs`
852–870; `hack.c` `domove` 2964–2973 / `invocation_message`
3064–3085; `hack.c` `classify_terrain` 3090–3172 /
`switch_terrain` 3215–3216; `teleport.c` `rloc_to_core`
1700–1701 / `mon.c` `maybe_unhide_at` 4698–4719.
**Change:** reviews **110** ACCEPT D-1149 (unstuck +
`mdrop_special_objs` + discard; `m_detach`/`isgd`/`mongrantswish`
named), **111** ACCEPT D-1150 (walk call after `vision_recalc(1)`;
callee D-1141; `inv_pos` named), **112** ACCEPT D-1151 (lastseentyp
remap + `flags.terrainstatus` bag; botl paint / lastseentyp
under-typ named), **113** ACCEPT D-1152 (dest unhide before
`newsym`; youmonst arm named). Must-fix empty. Filled D-1152
archive hash `9b5ce7b3`. Rotated #1450. Open 12 (no refill).
Rule #2: no fs.
**Score:** cadence **#1465** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `33+0.27/turn` (R² 0.87). Next
@**#1470**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `teleport.c` `vault_tele` `tele()` fallback
(named). Not teleds.
**Blocked:** none.

## 2026-08-17 10:18 — #1464 D-1152 rloc_to maybe_unhide_at dest

**Objective:** Open — `teleport.c` `rloc_to` `maybe_unhide_at`
(named). Not vanish-msg.
**C locus:** `teleport.c` `rloc_to_core` 1700–1701; `mon.c`
`maybe_unhide_at` 4698–4719.
**Change:** export `maybe_unhide_at`; `rloc_to` calls it at dest
after ustuck, before `newsym` (dynamic import; monmove↔teleport
cycle). Did not pull vanish-msg / `set_apparxy` /
`update_monster_region` / shk-home / shop bill / trapped
`mintrap` / youmonst arm. Filled D-1151 archive hash
`6bdf4d49`. Rotated #1448–#1449. Open 7 after archive → refill
to 12. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1460** **44**/44; next
@**#1465**).
**Verified:** private canary **22**/22 (bare dest unhide; cover
stays; visible; non-hider; same-cell; trapped; coins; eel
dry/pool; empty; null; track); green+strict seed8000/0900;
cohort **25**/25 (0012 vault + 0360/4500/0373/0367 +
2200/0014/0004/0009/1500/1800/0060/0102/0700/0017/0030/0116/
0383/0007/0361/0108/0002/5002/2600/0006) + strict
0012/0360/4500/0014/2200/0004/0002/0009/0367/0373/0030. Path
public-unhit on hidden-hider rloc.
**Next:** Open `teleport.c` `vault_tele` `tele()` fallback
(named). Not teleds. Audit @**#1465**.
**Blocked:** none.

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
