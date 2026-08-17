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

## 2026-08-17 19:30 — #1490 review D-1169–D-1172 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `region.c` `run_regions` 439–441 / `hero_inside`
`region.h:17`; `teleport.c` `rloc_to_core` 1761–1763 /
`monmove.c` `dochugw` 204–238; `teleport.c` `rloc_pos_ok`
1620–1626; `teleport.c` `rloc` 1808–1811 / `tele` 842–845.
**Change:** reviews **130** ACCEPT D-1169 (hero `inside_f` bit
not geometry; `region_danger` named), **131** ACCEPT D-1170
(`dochugw(FALSE)` after bill before mintrap; `onscary` named),
**132** ACCEPT D-1171 (dest `levl.roomno` vs shoproom/shroom;
mx==0 named), **133** ACCEPT D-1172 (`tele(); return TRUE`
before iswiz; `mnexto` named). Must-fix empty. Filled D-1172
archive hash `e7c5c8ac`. Rotated #1475. Open 12 (no refill).
Rule #2: no fs.
**Score:** cadence **#1490** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `33+0.27/turn` (R² 0.86). Next
@**#1495**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `mon.c` `mnexto` `control_mon_tele` (named). Not rloc.
**Blocked:** none.

## 2026-08-17 19:10 — #1489 D-1172 rloc steed tele()

**Objective:** Open — `teleport.c` `rloc` steed `tele()` (named). Not
Wizard stair.
**C locus:** `teleport.c` `rloc` 1808–1811 before iswiz stair.
**Change:** `rloc(usteed)` `await tele(); return true` even if tele
does not move (noteleport). Not Wizard stair (D-1122). Did not pull
`mnexto` `control_mon_tele`, vanish-msg, or `RLOC_ERR`. Filled
D-1171 archive hash `822498d3`. Rotated #1474. Open 7 after archive
→ refill Open to 12 from teleport named omits. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1485** **44**/44; next
@**#1490**).
**Verified:** private canary **33**/33 (C tele()+TRUE before iswiz;
teleport_pet FALSE other locus; JS await tele then true; no
`return false` for steed; Wizard stair kept; noteleport TRUE + no
50× rnd + stay + mysterious-force; ordinary still rnd; iswiz steed
not stairs; teleport_pet still FALSE; thenable; no fs/FORCE);
green+strict seed8000/0900; cohort **41**/41 (CURRENT shared +
0014/0383/4500/2600) + strict 0101/0012/0360/4500/2200/0014/0004/
0103/0104/0367/0373/0002/0700/0015/0116/0106. Path public-unhit on
riding `rloc(usteed)`.
**Next:** Open `mon.c` `mnexto` `control_mon_tele` (named). Not rloc.
**Blocked:** none.

## 2026-08-17 18:57 — #1488 D-1171 rloc_pos_ok shk/priest room lock

**Objective:** Open — `teleport.c` `rloc_pos_ok` isshk/ispriest room
lock (named). Not make_angry_shk.
**C locus:** `teleport.c` `rloc_pos_ok` 1620–1626 in the on-map
`xx` arm after `goodpos` before `tele_jump_ok`.
**Change:** dest `levl.roomno` vs ESHK.shoproom / EPRI.shroom
(`unsigned char`) when `isshk && inhishop` else-if
`ispriest && inhistemple`. Not `in_rooms`. Did not pull
`make_angry_shk` (D-1162) or mx==0 updest/dndest. Filled D-1170
archive hash `5a6be1fe`. Rotated #1473. Open 8 after archive
(no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1485** **44**/44; next
@**#1490**).
**Verified:** private canary **25**/25 (C/JS order; dest roomno
not in_rooms; unsigned char; mx==0 deferred; no angry/fs/FORCE;
resident shk/priest stay; ordinary/`!inhishop`/`!shrine` not
locked; candy fallback; SHARED skip; isshk else-if; tele_jump
after; goodpos first; thenable); green+strict seed8000/0900;
cohort **41**/41 (CURRENT shared + 0014/0383/4500/2600) + strict
0101/0012/0360/4500/2200/0014/0004/0367/0373/0002/0700/0015/
0116/0106. Path public-unhit on resident shk/priest dest filter.
**Next:** Open `teleport.c` `rloc` steed `tele()` (named). Not
Wizard stair.
**Blocked:** none.

## 2026-08-17 18:20 — #1487 D-1170 rloc_to occupation dochugw

**Objective:** Open — `teleport.c` `rloc_to` occupation `dochugw`
(named). Not mintrap.
**C locus:** `teleport.c` `rloc_to_core` 1761–1763 after bill
before mintrap; callee `monmove.c` `dochugw` 204–238 (`chug`
FALSE).
**Change:** `rloc_maybe_occupation` when occupation is a function
→ existing `dochugw(mtmp, false)`. Silent `rloc_to` after bill;
`rloc_to_flag` after appear+angry+bill. No extra `dochug`. Did
not pull `onscary` or makemon occupation. Filled D-1169 archive
hash `0f1ce7c6`. Rotated #1472. Open 9 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1485** **44**/44; next
@**#1490**).
**Verified:** private canary **38**/38 (C/JS order; helper
`dochugw(false)`; no fs/FORCE; hostile dest stops; idle/peaceful/
too-far/`!mcanmove`/unseen/minvis keep; Hallu; 81 vs 82;
same-cell; adjacent-to-adjacent; AT_BOOM; thenable; defer until
flag; dest-bare mintrap after; worm skip mintrap); green+strict
seed8000/0900; cohort **41**/41 (CURRENT shared + 0014/0383/4500/
2600) + strict 0101/0012/0360/4500/2200/0014/0004/0367/0373/0002/
0700/0015. Path public-unhit on busy-hero + rloc interrupt.
**Next:** Open `teleport.c` `rloc_pos_ok` isshk/ispriest room lock
(named). Not make_angry_shk.
**Blocked:** none.

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
