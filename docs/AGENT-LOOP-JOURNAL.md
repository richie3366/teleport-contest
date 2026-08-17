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

## 2026-08-17 20:50 — #1495 review D-1173–D-1176 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `mon.c` `mnexto` 3974–3978 / `teleport.c`
`control_mon_tele` 1898–1934; `mhitm.c` `mdisplacem` 178–267 /
`region.c` 598–611; `allmain.c` 481 / `monmove.c`
`m_everyturn_effect` 650–663; `dothrow.c` `mhurtle_step` 1000 /
`region.c` `m_in_out_region` 533–576.
**Change:** reviews **134** ACCEPT D-1173 (`control_mon_tele(..., FALSE)`
+ savemm copy; public Off; not rloc via_rloc TRUE), **135** ACCEPT
D-1174 (real `mdisplacem` + region after defender tail; `should_displace`
keeps public arm unhit), **136** ACCEPT D-1175 (Fog at current `u.ux`
after bot before `context.move`; not `ux0` trail), **137** ACCEPT
D-1176 (`will_hurtle && m_in_out_region` three-loop; gas never rejects;
`place_monster` vs rloc named). Must-fix empty. Filled D-1176 archive
hash `b652fbf3`. Rotated #1480. Open 8 (no refill). Rule #2: no fs.
**Score:** cadence **#1495** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `32+0.27/turn` (R² 0.87). Next
@**#1500**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `do.c` `goto_level` `obj_delivery` (named). Not
in_out_region.
**Blocked:** none.

## 2026-08-17 20:25 — #1494 D-1176 mhurtle_step m_in_out_region

**Objective:** Open — `dothrow.c` `mhurtle_step` `m_in_out_region`
(named). Not hurtle_step.
**C locus:** `dothrow.c` `mhurtle_step` `:1000`; callee `region.c`
533–576.
**Change:** three-loop `m_in_out_region` (attach_2_m skip;
can_enter/leave then leave/enter; gas NO_CALLBACK never rejects).
`mhurtle_step` `will_hurtle && m_in_out_region` before place.
`make_gas_cloud` `attach_2_m=0`. Did not pull steed `u_on_newpos`,
petrify, `place_monster` vs rloc, NODIAG, minliquid, or
`goto_level` `obj_delivery`. Filled D-1175 archive hash
`7188da5b`. Rotated #1479. Open 8 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1490** **44**/44; next
@**#1495**).
**Verified:** private canary **53**/53 (C/JS `&&` source; gas
add/stay/remove; can_enter/leave reject; attach_2_m skip; leave
then enter; NO_CALLBACK; null; empty; no fs/FORCE); green+strict
seed8000/0900; cohort **43**/43 (CURRENT shared + 0014/0383/4500/
2600 + green) + strict 0101/0012/0360/4500/2200/0014/0004/0103/
0104/0367/0373/0002/0700/0015/0116/0106. Path public-unhit on
knock through a live force field.
**Next:** Open `do.c` `goto_level` `obj_delivery` (named). Not
in_out_region. Audit @**#1495**.
**Blocked:** none.

## 2026-08-17 20:12 — #1493 D-1175 youmonst m_everyturn_effect

**Objective:** Open — `allmain.c` `m_everyturn_effect` youmonst
(named). Not m_postmove_effect.
**C locus:** `allmain.c` 481 after bot before `context.move`;
callee `monmove.c` `m_everyturn_effect` 658–674 `is_u?u.ux:mx`.
**Change:** await `m_everyturn_effect(youmonst)` once-per-input.
Helper: fog at current `u.ux` (`data.mndx`); await
`create_gas_cloud(1,0)`; `movemon_singlemon` awaits. Human no-op.
Did not pull udemigod/`amulet()`/`glibr`/`do_storms`/
`mkot_trap_warn` or `mhurtle_step`. Filled D-1174 archive hash
`e5ec6685`. Rotated #1478. Open 9 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1490** **44**/44; next
@**#1495**).
**Verified:** private canary **27**/27 (C/JS after bot before
context.move; helper `is_u` ux not ux0; import; await create;
data.mndx first; null; human no cloud/RNG; Hezrou/Steam not this
function; fog ux not ux0/not mx; size-1 dmg 0; ttl `rn1`;
heros_fault; hero_inside; no envelop; thenable; door skip;
visible_region skip; monster mx/my; stale mnum; `mon_moving`;
region elsewhere; no fs/FORCE); green+strict seed8000/0900;
cohort **43**/43 (CURRENT shared + 0014/0383/4500/2600 + green)
+ strict 0101/0012/0360/4500/2200/0014/0004/0103/0104/0367/
0373/0002/0700/0015/0116/0106. Path public-unhit on polyed Fog.
**Next:** Open `dothrow.c` `mhurtle_step` `m_in_out_region` (named).
Not hurtle_step.
**Blocked:** none.

## 2026-08-17 19:57 — #1492 D-1174 mdisplacem update_monster_region

**Objective:** Open — `mhitm.c` `mdisplacem` `update_monster_region`
(named). Not rloc_to.
**C locus:** `mhitm.c` `mdisplacem` 178–267 / region 256–257;
callee `region.c` 598–611; caller `monmove.c` `m_move` 2025–2037.
**Change:** port `mdisplacem` (sanity, `rn2(7)`, grid-bug, unhide,
wake, petrify, swap); after both `place_monster` and defender
worm tail, `update_monster_region` each. Wire ALLOW_MDISP return
bits. Keep `should_displace` false. Did not pull dogmove caller
or dbridge. Filled D-1173 archive hash `e07eeae7`. Rotated #1477.
Open 10 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1490** **44**/44; next
@**#1495**).
**Verified:** private canary **46**/46 (C/JS tail-before-region;
sanity no rng; 1-in-7 miss; swap enter/leave/stay; attach_2_m;
unhide/wake/meating/seemimic; grid-bug diagonal vs cardinal;
petrify died/gloves/golem-poly/`resists_ston`; thenable; m_move
caller bits; no fs/FORCE); green+strict seed8000/0900; cohort
**43**/43 (CURRENT shared + 0014/0383/4500/2600 + green) + strict
0101/0012/0360/4500/2200/0014/0004/0103/0104/0367/0373/0002/0700/
0015/0116/0106. Path public-unhit while `should_displace` is false.
**Next:** Open `allmain.c` `m_everyturn_effect` youmonst (named).
Not m_postmove_effect.
**Blocked:** none.

## 2026-08-17 19:39 — #1491 D-1173 mnexto control_mon_tele savemm

**Objective:** Open — `mon.c` `mnexto` `control_mon_tele` (named). Not
rloc.
**C locus:** `mon.c` `mnexto` 3974–3978 after enexto; callee
`teleport.c` `control_mon_tele` 1898–1934 via_rloc FALSE.
**Change:** after successful enexto, `iflags.mon_telecontrol` (not
wizard at caller, not mx!=0) `control_mon_tele(..., false)` then
restore savemm coord copy on FALSE so cancel/hero-cell cannot stick.
Default Off. Did not pull vanish-msg, `RLOC_ERR`, or OPTIONS= doset.
Filled no prior missing hash (D-1172 already `e7c5c8ac`). Rotated
#1476. Open 11 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1490** **44**/44; next
@**#1495**).
**Verified:** private canary **38**/38 (C/JS order; via_rloc FALSE;
savemm copy; no wizard/mx gate; Off (11,10); On without wizard;
steed sync; wizard `.` / ESC / hero `h.` restore; STONE force y/n;
mx==0 still prompts; rloc still rnd; thenable; `.` consumed; no
fs/FORCE); green+strict seed8000/0900; cohort **41**/41 (CURRENT
shared + 0014/0383/4500/2600) + strict 0101/0012/0360/4500/2200/
0014/0004/0103/0104/0367/0373/0002/0700/0015/0116/0106. Path
public-unhit on wizard `montelecontrol`.
**Next:** Open `mhitm.c` `mdisplacem` `update_monster_region` (named).
Not rloc_to.
**Blocked:** none.

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
