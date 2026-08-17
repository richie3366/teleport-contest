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

## 2026-08-17 18:05 — #1486 D-1169 run_regions hero_inside bit

**Objective:** Open — `region.c` `run_regions` `hero_inside` bit
(named). Not walk caller.
**C locus:** `region.c` `run_regions` 439–441 after ttl age;
callee `inside_gas_cloud` 1091–1165 (D-1146). Caller
`allmain.c:274` after `nh_timeout`.
**Change:** hero `inside_f` uses `hero_inside(reg)` (`REG_HERO_INSIDE`)
instead of `inside_region(u.ux,u.uy)`. Gas tag + monster list
unchanged. Did not flip `region_danger` / `region_safety`
(still geometric). Filled D-1168 archive hash already
`0ff54fb4`. Rotated #1471. Open 10 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1485** **44**/44; next
@**#1490**).
**Verified:** private canary **26**/26 (C/JS hero_inside vs
geometry; allmain nh_timeout then run_regions; danger/safety
still geometric; no fs/FORCE; fog ttl bit-set/geo-miss fires,
bit-clear/geo-hit does not; both/neither; NO_CALLBACK skip;
monster list independent; ttl==0 expire; empty; overlap only
bit-set; human dam0 no fog +5; age before inside_f; thenable);
green+strict seed8000/0900; cohort **41**/41 (CURRENT shared +
0014/0383/4500/2600) + strict 0101/0012/0360/4500/2200/0014/
0004/0367/0373/0002/0700/0015. Path public-unhit on stale bit
vs cell.
**Next:** Open `teleport.c` `rloc_to` occupation `dochugw`
(named). Not mintrap.
**Blocked:** none.

## 2026-08-17 17:35 — #1485 review D-1165–D-1168 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `dothrow.c` `hurtle_step` 784–790 / `region.c`
`in_out_region` 480–527; `do.c` `goto_level` 1974–1996;
`hack.c` `domove_core` 2873–2884 / `monmove.c` `m_postmove_effect`
672–683; `allmain.c` `moveloop_core` 370–377 / `mkmaze.c`
`fumaroles` 1484–1514.
**Change:** reviews **126** ACCEPT D-1165 (else-if after `isok`
before `*range==0`; real `in_out_region`; `mhurtle_step` named),
**127** ACCEPT D-1166 (`(void)` landing-cell await; `obj_delivery`
/ shop / fall named), **128** ACCEPT D-1167 (occupy then
youmonst helper at `u.ux0`; everyturn fog named), **129** ACCEPT
D-1168 (EOT water/air `movebubbles` else `fumaroles`; callee
D-1156; `intervene`/`amulet()` named). Must-fix empty. Filled
D-1168 archive hash `0ff54fb4`. Rotated #1470. Open 11 (no
refill). Rule #2: no fs.
**Score:** cadence **#1485** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `33+0.27/turn` (R² 0.86). Next
@**#1490**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `region.c` `run_regions` `hero_inside` bit (named).
Not walk caller.
**Blocked:** none.

## 2026-08-17 17:12 — #1484 D-1168 moveloop EOT fumaroles

**Objective:** Open — `allmain.c` `moveloop` `fumaroles` (named).
Not mklev.
**C locus:** `allmain.c` `moveloop_core` 370–377 after wipe /
udemigod (named) before `multi<0`; callee `mkmaze.c` `fumaroles`
1484–1514 (D-1156). Twin `do.c` `goto_level` 1831–1834.
**Change:** EOT `Is_waterlevel||Is_airlevel` `movebubbles` else
`flags.fumaroles` `await fumaroles()`. Water/air short-circuit.
Did not pull udemigod `intervene`, `glibr`, `do_storms`,
`amulet()`, `mkot_trap_warn`, or `m_everyturn` youmonst. Filled
D-1167 archive hash `d6ba6ede`. Rotated #1469. Open 11 after
archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1480** **44**/44; next
@**#1485**).
**Verified:** private canary **27**/27 (C/JS if/else; wipe then
fumaroles then multi; import; water/air arm no fumaroles;
goto_level twin; C body ungated; ordinary none / flag fumaroles /
water+flag bubbles / air+flag bubbles; !flag no RNG; flag-on
`rn2(3)`; callee still `clear_heros_fault`; thenable; ordinary
movebubbles no-op; no fs/FORCE); green+strict seed8000/0900;
cohort **41**/41 (CURRENT shared + 0014/0383/4500/2600) + strict
0101/0012/0360/4500/2200/0014/0004/0367/0373/0002/0700/0015.
Path public-unhit on EOT lava whoosh.
**Next:** Open `region.c` `run_regions` `hero_inside` bit (named).
Not walk caller.
**Blocked:** none.

## 2026-08-17 16:48 — #1483 D-1167 youmonst m_postmove_effect

**Objective:** Open — `hack.c` `m_postmove_effect` youmonst
(named). Not in_out_region.
**C locus:** `hack.c` `domove_core` 2877 after occupy before
steed; callee `monmove.c` `m_postmove_effect` 672–683.
**Change:** await `m_postmove_effect(youmonst)` after occupy.
Helper uses `is_u ? u.ux0 : mx/my`, `data.mndx`, awaits
`create_gas_cloud`. Hezrou 1×8 / Steam `!mcan` 1×0 trail
behind. Human form no-op. Monster `m_move` now awaits.
Did not pull `allmain` `m_everyturn_effect` youmonst or
moveloop fumaroles. Filled D-1166 archive hash `0cb3acbe`.
Rotated #1468. Open 12 after archive (refilled 5 from
`turns.md` / do.js named omits). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1480** **44**/44; next
@**#1485**).
**Verified:** private canary **30**/30 (src occupy/postmove/steed
+ helper `is_u` ux0; C same; import; null; human no cloud/RNG;
fog not this fn; Hezrou ux0 not ux/not mx; damage 8; trail not
inside / no envelop; Steam ux0 damage 0; `mcan`; monster mx/my;
data vs stale mnum; same-cell immune; thenable; `mon_moving`);
green+strict seed8000/0900; cohort **41**/41 (CURRENT shared +
0014/0383/4500/2600) + strict 0101/0012/0360/4500/2200/0014/
0004/0367/0373/0002/0700/0015. Path public-unhit on polyed
Hezrou/Steam walk.
**Next:** Open `allmain.c` `moveloop` `fumaroles` (named). Not
mklev.
**Blocked:** none.

## 2026-08-17 16:35 — #1482 D-1166 goto_level in_out_region

**Objective:** Open — `do.c` `goto_level` `in_out_region` (named).
Not walk.
**C locus:** `do.c` `goto_level` 1980–1981 after `obj_delivery`
before `fix_shop_damage`/`pickup`; callee `region.c`
`in_out_region` 480–527.
**Change:** await `in_out_region(u.ux,u.uy)` at that site and
`(void)` the return — do not abort the level change. Gas
`NO_CALLBACK` never rejects. Restored `REG_HERO_INSIDE` follows
the landing cell. Did not pull `obj_delivery` /
`fix_shop_damage` / `do_fall_dmg` or `run_regions` `hero_inside`
bit. Filled D-1165 archive hash `6d44ab7f`. Rotated #1467. Open 8
after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1480** **44**/44; next
@**#1485**).
**Verified:** private canary **36**/36 (src void+order; empty;
enter/leave/stay-in/stay-out; `attach_2_u`; overlap; A→B; gas
NO_CALLBACK; can_enter/leave reject still completes; enter_f/
leave_f; same-level early return; rect edge; mixed attach);
green+strict seed8000/0900; cohort **41**/41 (CURRENT shared +
0014/0383/4500/2600) + strict 0101/0012/0360/4500/2200/0014/
0004/0367/0373/0002/0700/0015. Path public-unhit on arriving into
a live restored region.
**Next:** Open `hack.c` `m_postmove_effect` youmonst (named). Not
in_out_region.
**Blocked:** none.

## 2026-08-17 16:15 — #1481 D-1165 hurtle_step in_out_region

**Objective:** Open — `dothrow.c` `hurtle_step` `in_out_region`
(named). Not walk.
**C locus:** `dothrow.c` `hurtle_step` 787–790 after `isok` before
`*range==0`; callee `region.c` `in_out_region` 480–527.
**Change:** await `in_out_region(x,y)` at that site, C `else if`
order so range==0 still updates `REG_HERO_INSIDE` then returns
false without occupying. Gas `NO_CALLBACK` never rejects. Did not
pull do.c `goto_level` or `mhurtle_step` `m_in_out_region`.
Rotated #1466. Open 9 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1480** **44**/44; next
@**#1485**).
**Verified:** private canary **41**/41 (empty; enter/leave/stay-in/
stay-out; can_enter/leave reject vs allow; gas NO_CALLBACK;
`attach_2_u`; A→B; overlap; range==0 bit; isok skip; m_at bump
bit; no-dir/ustuck/utrap); green+strict seed8000/0900; cohort
**41**/41 (CURRENT shared + 0014/0383/4500/2600) + strict
0101/0012/0360/4500/2200/0014/0004/0367/0373/0002. Path
public-unhit on hurtle through a live region.
**Next:** Open `do.c` `goto_level` `in_out_region` (named). Not
walk.
**Blocked:** none.

## 2026-08-17 15:55 — #1480 review D-1161–D-1164 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `teleport.c` `rloc_to_core` 1685 / `region.c`
`update_monster_region` 598–611; `teleport.c` 1651 / 1739–1740 /
`shk.c` `make_angry_shk` 1470–1488 / `inhishop` 1039–1048;
`teleport.c` 1742–1758 / `shk.c` `stolen_value` 3754–3871 /
`onshopbill` 1160–1163; `teleport.c` 1765–1767 / `trap.c`
`mintrap` 3733–3789.
**Change:** reviews **122** ACCEPT D-1161 (absolute membership after
place before tail; mhitm/dbridge named), **123** ACCEPT D-1162
(origin `inhishop` snap + real `hot_pursuit`; D-log “bill fold”
overclaims `addupbill` stub 0 — named, not Must-fix), **124**
ACCEPT D-1163 (dest `!costly_spot` minvent walk; unpaid-not-on-bill
ordinary), **125** ACCEPT D-1164 (dest-bare clear; dest-trap
already-trapped `rn2(40)` not trapeffect; occupation /
`m_easy_escape_pit` named). Must-fix empty. Filled D-1164 archive
hash `6f7e188b`. Rotated #1465. Open 10 (no refill). Rule #2: no fs.
**Score:** cadence **#1480** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `32+0.27/turn` (R² 0.87). Next
@**#1485**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `dothrow.c` `hurtle_step` `in_out_region` (named).
Not walk.
**Blocked:** none.

## 2026-08-17 15:48 — #1479 D-1164 rloc_to trapped mintrap

**Objective:** Open — `teleport.c` `rloc_to` trapped `mintrap`
(named). Not occupation.
**C locus:** `teleport.c` `rloc_to_core` 1765–1767; `trap.c`
`mintrap` 3733–3789 (no-trap / already-trapped).
**Change:** after angry+bill (silent `rloc_to`; after appear in
`rloc_to_flag`), `mtrapped && !wormno` → `mintrap(NO_TRAP_FLAGS)`.
Dest no trap clears mtrapped; dest trap is already-trapped
`rn2(40)`, not a fresh step-on. Dynamic import trap.js. Did
not pull occupation `dochugw`. Filled D-1163 archive hash
`d24ff150`. Rotated #1464. Open 10 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1475** **44**/44; next
@**#1480**).
**Verified:** private canary **35**/35 (dest-bare clear; free dest
pit/dart no step-on; worm skip ± dest trap; same-cell; null;
migrating; flag NOMSG/MSG; dest-dart/pit `rn2(40)` not `rn2(4)`;
leave-origin-pit; undef; second rloc); green+strict
seed8000/0900; cohort **41**/41 (CURRENT shared +
0014/0383/4500/2600) + strict 0101/0012/0360/4500/2200/0014/
0004/0367/0373/0002. Path public-unhit on trapped rloc off a pit.
**Next:** Open `dothrow.c` `hurtle_step` `in_out_region` (named).
Not walk. Audit @**#1480**.
**Blocked:** none.

## 2026-08-17 15:34 — #1478 D-1163 rloc_to minvent shop bill

**Objective:** Open — `teleport.c` `rloc_to` minvent shop bill
(named). Not shk-home.
**C locus:** `teleport.c` `rloc_to_core` 1742–1758; `shk.c`
`find_objowner` / `onshopbill` / `stolen_value` / `costly_spot`.
**Change:** after angry, dest `!costly_spot` walks minvent: clear
`no_charge` else `stolen_value` for `onshopbill`. Export
`onshopbill`; import `Norep` on stolen_value's angry arm. Did
not pull occupation `dochugw` / trapped `mintrap`. Filled D-1162
archive hash `38353d8a`. Rotated #1463. Open 11 after archive
(no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1475** **44**/44; next
@**#1480**).
**Verified:** private canary **44**/44 (billed debit; no_charge;
shop-to-shop; same-shop; ordinary unpaid; no minvent; same-cell;
corridor; shk-home; chain; no_charge-beats-bill; angry robbed;
flag; null; migrating; credit; two billed); green+strict
seed8000/0900; cohort **41**/41 (CURRENT shared +
0014/0383/4500/2600) + strict 0101/0012/0360/4500/2200/0014/
0004/0367/0373/0002. Path public-unhit on billed-minvent rloc
out of shop.
**Next:** Open `teleport.c` `rloc_to` trapped `mintrap` (named).
Not occupation.
**Blocked:** none.

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
