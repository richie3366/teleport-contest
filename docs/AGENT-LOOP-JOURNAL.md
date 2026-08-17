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

## 2026-08-17 15:10 — #1477 D-1162 rloc_to make_angry_shk

**Objective:** Open — `teleport.c` `rloc_to` shk `make_angry_shk`
(named). Not vanish-msg.
**C locus:** `teleport.c` `rloc_to_core` 1651 / 1734–1740;
`shk.c` `make_angry_shk` 1470–1488 / `inhishop` 1039–1048.
**Change:** snapshot `resident_shk` before pickup; dest
`!inhishop` → existing `make_angry_shk`. `rloc_to_flag` defers
angry until after appear pline. Did not pull vanish-msg / minvent
shop bill / occupation `dochugw` / trapped `mintrap`. Filled
D-1161 archive hash `4dfadf3a`. Rotated #1462. Open 12 after
archive+refill. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1475** **44**/44; next
@**#1480**).
**Verified:** private canary **32**/32 (leave-shop angry+following;
stay-shop; already-out; non-shk; same-cell; furious; bill fold;
null; flag appear-then-angry; flag stay; priest; migrating mx==0);
green+strict seed8000/0900; cohort **41**/41 (CURRENT shared +
0014/0383/4500/2600) + strict 0101/0012/0360/4500/2200/0014/0004/
0367/0373/0002. Path public-unhit on resident shk rloc out of shop.
**Next:** Open `teleport.c` `rloc_to` minvent shop bill (named).
Not shk-home.
**Blocked:** none.

## 2026-08-17 14:52 — #1476 D-1161 rloc_to update_monster_region

**Objective:** Open — `teleport.c` `rloc_to` `update_monster_region`
(named). Not set_apparxy.
**C locus:** `teleport.c` `rloc_to_core` 1685; `region.c`
`update_monster_region` 598–611. Contrast `m_in_out_region`
533–576 (walk callbacks).
**Change:** export `update_monster_region`; `rloc_to` calls it
after place, before worm tail. Absolute membership from mx/my;
no enter/leave callbacks; no `attach_2_m` skip. Did not pull
vanish-msg / shk-home / shop bill / trapped `mintrap` / mhitm
displace / dbridge. Rotated #1461. Open 8 after archive (no
refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1475** **44**/44; next
@**#1480**).
**Verified:** private canary **24**/24 (empty; enter; leave;
stay in/out; two-region; attach_2_m; enter_f/leave_f unused;
swap-pop; mx,my; no m_id; rloc enter/leave/same-cell/oldx0/
within/no enter_f); green+strict seed8000/0900; cohort **41**/41
(CURRENT shared + 0014/0383/4500/2600) + strict 0101/0012/0360/
4500/2200/0014/0004/0367/0373/0002. Path public-unhit on rloc
into a live poisoncloud.
**Next:** Open `teleport.c` `rloc_to` shk `make_angry_shk`
(named). Not vanish-msg.
**Blocked:** none.

## 2026-08-17 14:40 — #1475 review D-1157–D-1160 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `hack.c` `domove_core` 2866–2868 / `region.c`
`in_out_region` 480–527 / `is_hero_inside_gas_cloud` 1168–1176;
`region.c` `create_gas_cloud_selection` 1311–1336 / `sp_lev.c`
`lspo_gas_cloud` 4928–4965 / `themerms.lua` Cloud 62–69;
`mon.c` `m_poisongas_ok` 330–357 / `mfndpos` 2172, 2240;
`teleport.c` `rloc_to_core` 1702 / `steed.c` `place_monster`
929 / `monmove.c` `set_apparxy` 2198–2266.
**Change:** reviews **118** ACCEPT D-1157 (walk await + bit helper;
hurtle/`goto_level`/`run_regions` inside_f named), **119** ACCEPT
D-1158 (1×1 bitmap ttl −1 + Cloud `floor(n/4)` fog; xy
`get_location` named), **120** ACCEPT D-1159 (vamp/eel/breath OK;
MINOR still avoids; worn `Resists_Elem` named), **121** ACCEPT
D-1160 (drop mux=hero; real `set_apparxy` after dest `newsym`;
`update_monster_region` named). Must-fix empty. Filled D-1160
archive hash `8efa62e9`. Rotated #1460. Open 9 (no refill).
Rule #2: no fs.
**Score:** cadence **#1475** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `31+0.27/turn` (R² 0.87). Next
@**#1480**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `teleport.c` `rloc_to` `update_monster_region`
(named). Not set_apparxy.
**Blocked:** none.

## 2026-08-17 14:25 — #1474 D-1160 rloc_to set_apparxy dest

**Objective:** Open — `teleport.c` `rloc_to` `set_apparxy`
(named). Not vanish-msg.
**C locus:** `teleport.c` `rloc_to_core` 1702; `monmove.c`
`set_apparxy` 2198–2266; `steed.c` `place_monster` 898–932.
**Change:** drop mux=hero stand-in (`place_monster` writes mx/my
only). After dest `maybe_unhide_at`/`newsym`, call `set_apparxy`
(dynamic import; monmove↔teleport cycle). Did not pull
vanish-msg / `update_monster_region` / shk-home / shop bill /
trapped `mintrap`. Filled D-1159 archive hash `e42ace32`.
Rotated #1459. Open 9 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1470** **44**/44; next
@**#1475**).
**Verified:** private canary **33**/33 (null; same-cell; already-
know; mux0; pet; ustuck; Invis skip vs `rn2(3)`; Displacement
skip vs `rn2(4)`; displacer; xorn+gold; oldx0; Underwater);
green+strict seed8000/0900; cohort **41**/41 (CURRENT shared +
0014/0383/4500/2600) + strict 0101/0012/0360/4500/2200/0014/
0004/0367/0373/0002. Path public-unhit on Invis/Displaced rloc
with stale mux.
**Next:** Open `teleport.c` `rloc_to` `update_monster_region`
(named). Not set_apparxy. Audit @**#1475**.
**Blocked:** none.

## 2026-08-17 14:11 — #1473 D-1159 mfndpos m_poisongas_ok vamp/eel/breath

**Objective:** Open — `mon.c` `m_poisongas_ok` mfndpos vamp/eel/breath
(named). Not inside_f.
**C locus:** `mon.c` `m_poisongas_ok` 330–357; `mfndpos` 2172/2240.
**Change:** port C order in `js/mon.js`: vampshifter / Hezrou|Vrock
/ eel-or-waterlevel+pool / AT_BREA AD_DRST|RBRE → OK; youmonst
invuln/Breathless/Underwater → OK; resist → MINOR; else BAD.
mfndpos still `=== OK`. region.js keeps a local clone. Did not
pull Resists_Elem worn/artifact or `rloc_to` `set_apparxy`.
Filled D-1158 archive hash `7cc347fc`. Rotated #1458. Open 10
after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1470** **44**/44; next
@**#1475**).
**Verified:** private canary **32**/32; green+strict seed8000/0900;
cohort **39**/39 (CURRENT shared + 0014/0383). Path public-unhit
on vamp/eel/breath walking into poisoncloud.
**Next:** Open `teleport.c` `rloc_to` `set_apparxy` (named). Not
vanish-msg. Audit @**#1475**.
**Blocked:** none.

## 2026-08-17 13:55 — #1472 D-1158 create_gas_cloud_selection

**Objective:** Open — `region.c` `create_gas_cloud_selection`
(named). Not BFS create.
**C locus:** `region.c` `create_gas_cloud_selection` 1311–1336;
`sp_lev.c` `lspo_gas_cloud` 4928–4965; `themerms.lua` Cloud
room 61–69.
**Change:** bitmap 1×1 rects then `make_gas_cloud`; ttl stays −1
(no Fisher-Yates / no `rn1`). `lspo_gas_cloud` xy/`coord` →
size-1 BFS else selection; `ttl > -2` overwrite. Cloud fill:
`selection.room()` + `floor(n/4)` asleep fog + `des.gas_cloud`.
Did not pull Ice/Boulder/… fills or mfndpos `m_poisongas_ok`.
Filled D-1157 archive hash `ed28eef1`. Rotated #1457. Open 11
after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1470** **44**/44; next
@**#1475**).
**Verified:** private canary **41**/41; green+strict seed8000/0900;
cohort **39**/39 (CURRENT shared + 0014/0383). Path public-unhit
on Cloud fill (reservoir pick already burned).
**Next:** Open `mon.c` `m_poisongas_ok` mfndpos vamp/eel/breath
(named). Not inside_f. Audit @**#1475**.
**Blocked:** none.

## 2026-08-17 13:38 — #1471 D-1157 walk in_out_region

**Objective:** Open — `hack.c` walk `in_out_region` (named). Not teleds.
**C locus:** `hack.c` `domove_core` 2866–2868 after `drag_ball`;
callee `region.c` `in_out_region` 480–527; `is_hero_inside_gas_cloud`
1168–1176.
**Change:** `cmd.js` `domove` awaits `in_out_region(newx,newy)`
before occupy. Gas NO_CALLBACK never rejects; still updates
REG_HERO_INSIDE. Flip `is_hero_inside_gas_cloud` to the bit.
Did not pull hurtle / goto_level callers or `run_regions`
geometry. D-1156 hash already `16e8d88b`. Rotated #1456. Open
12 after refill. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1470** **44**/44; next
@**#1475**).
**Verified:** private canary **32**/32; green+strict seed8000/0900;
cohort **39**/39 (CURRENT shared + 0014/0383) + strict 8000/0900/
0002/0014/0012/0004/0030/0360/0361/0383/2200/0006. Path
public-unhit on force-field reject.
**Next:** Open `region.c` `create_gas_cloud_selection` (named).
Not BFS create. Audit @**#1475**.
**Blocked:** none.

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
