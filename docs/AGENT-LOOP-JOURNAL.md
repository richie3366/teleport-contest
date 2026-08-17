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

## 2026-08-17 22:10 — #1502 D-1182 rloc_pos_ok mx==0 updest/dndest

**Objective:** Open — `teleport.c` `rloc_pos_ok` mx==0 updest/dndest
(named). Not room lock.
**C locus:** `teleport.c` `rloc_pos_ok` 1592–1615 in the `!xx`
arm after `goodpos`, before on-map room lock.
**Change:** migrating `my` flags: `dndest.nlx`+`On_W_tower_level`
dest-in-exclude XOR `my&2`; else updest.lx moving-up minus nlx;
else dndest.lx moving-down minus nlx. On-map isshk/ispriest +
`tele_jump_ok` unchanged. Did not pull `migrate_to_level` bit 2
or `mon_arrive` `my=xyflags`. Filled D-1181 archive hash
`0b488053`. Rotated #1487. Open 7 after archive; refilled to 12
(wand makeknown / set_msg_xy / scrolltele Override / migrate
bit 2 / mon_arrive my=xyflags). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1500** **44**/44; next
@**#1505**).
**Verified:** private canary **84**/84 (C/JS order; goodpos first;
no dests fallthrough; down lx/exclude; up vs dndest.lx; W-tower
XOR precedence; nlx==0; !On_W_tower uses lx; on-map ignores lx;
tele_jump_ok; room lock on-map only; migrating shk unlocked;
rloc lands in dndest; on-map rloc can leave lx; no fs/FORCE);
green+strict seed8000/0900; cohort **12**/12 (green + 1500/1800/
0015/0002/0014/2200/4500/0367/0360/0012) + strict 1500/0012/
0360/4500/2200/0014. Path public-unhit on migrating arrival.
**Next:** Open `teleport.c` `rloc_to_core` ustuck-together pline
(named). Not telemsg.
**Blocked:** none.

## 2026-08-17 21:53 — #1501 D-1181 rloc RLOC_ERR impossible

**Objective:** Open — `teleport.c` `rloc` `RLOC_ERR` impossible()
(named). Not vanish-msg.
**C locus:** `teleport.c` `rloc` 1884–1888 after candy; callee
`pline.c` `impossible` 584–634.
**Change:** no `rloc_pos_ok` and no `goodpos` backup + `RLOC_ERR`
→ urgent `"rloc(): couldn't relocate monster"` then disorder /
report then FALSE. Without the bit, silent FALSE. Thin
`display.js` `impossible` (`in_sanity_check` skip extra;
`something_worth_saving` save-hint). Did not pull ustuck-together,
wand `makeknown`, `set_msg_xy`, or `rloc_pos_ok` mx==0. Named
omit paniclog file / recursive panic / debug_fuzzer / CRASHREPORT.
Filled no prior missing archive hash. Rotated #1486. Open 8 after
archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1500** **44**/44; next
@**#1505**).
**Verified:** private canary **25**/25 (no-flag silent false;
RLOC_MSG-only silent; RLOC_ERR bug+disorder+report; NOMSG still
impossible; worth_saving hint; sanity skip extra; recursive
no-op; %s; null; exact C string; flag bits); green+strict
seed8000/0900; cohort **12**/12 (green + 1500/1800/0015/0002/
0014/2200/4500/0367/0360/0012) full RNG+screens. Path
public-unhit unless a RLOC_ERR caller cannot place.
**Next:** Open `teleport.c` `rloc_pos_ok` mx==0 updest/dndest
(named). Not room lock.
**Blocked:** none.

## 2026-08-17 21:40 — #1500 review D-1177–D-1180 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `dokick.c` `obj_delivery` 1769–1851 / `do.c` 1815+1978;
`shk.c` `fix_shop_damage` 4849–4874 / `repair_damage` 4731–4845;
`do.c` `do_fall_dmg` 1805–1809 + 1988–1994; `teleport.c`
`rloc_to_core` 1658–1659 + 1712–1719.
**Change:** reviews **138** ACCEPT D-1177 (XOR FALSE/TRUE +
`OBJ_MIGRATING` extract; `rloco` internals / wizkit named), **139**
ACCEPT D-1178 (`!new` catchup; silent post-`block_point`;
`shk_fixes_damage` named), **140** ACCEPT D-1179 (`d(max(dist,1),6)`
after catchup; `ballfall` / W-tower bit 2 named), **141** ACCEPT
D-1180 (reappear suffix + same-cell return; ustuck / `RLOC_ERR`
named). Must-fix empty. Filled D-1180 archive hash `665bbe09`.
Rotated #1485. Open 9 (no refill). Rule #2: no fs.
**Score:** cadence **#1500** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `32+0.27/turn` (R² 0.87). Next
@**#1505**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `teleport.c` `rloc` `RLOC_ERR` impossible() (named).
Not vanish-msg.
**Blocked:** none.

## 2026-08-17 21:26 — #1499 D-1180 rloc_to_core telemsg

**Objective:** Open — `teleport.c` `rloc_to_core` telemsg (named).
Not RLOC_ERR.
**C locus:** `teleport.c` `rloc_to_core` 1658–1659 same-cell
return; 1662–1672 set telemsg; 1712–1719 `"%s vanishes and
reappears%s."` next / close-by / closer / farther.
**Change:** emit the reappear pline with C suffix order; same-cell
`rloc_to_flag` return before vanish/appear. Did not pull
ustuck-together, wand `makeknown`, `set_msg_xy`, or `RLOC_ERR`.
Filled D-1179 archive hash `5f08f9e5`. Rotated #1484. Open 9
after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1495** **44**/44; next
@**#1500**).
**Verified:** green+strict seed8000/0900; cohort **10**/10
(green + 1500/1800/0015/0002/0014/2200/4500/0367) full RNG+
screens. Path public-unhit unless a spotted monster teleports
to a still-visible cell.
**Next:** Open `teleport.c` `rloc` `RLOC_ERR` impossible()
(named). Not vanish-msg.
**Blocked:** none.

## 2026-08-17 21:16 — #1498 D-1179 goto_level do_fall_dmg

**Objective:** Open — `do.c` `goto_level` `do_fall_dmg` (named).
Not fix_shop_damage.
**C locus:** `do.c` `goto_level` 1805–1810 falling arm + 1988–1994
after `!new` `fix_shop_damage` before `pickup`; `dist` at 1498.
**Change:** capture `dist` before uz reassignment; on `falling`
`selftouch` then set the flag; after shop repair
`d(max(dist,1),6)` `maybe_half_phys` `losehp` ("falling down a
mine shaft"); fatal skips pickup (C noreturn). Did not pull
Punished `ballfall`, W-tower rndspot bit 2, `kill_genocided`,
`run_timers`, or `notice_mon_off`. Filled D-1178 archive hash
`4a700d08`. Rotated #1483. Open 10 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1495** **44**/44; next
@**#1500**).
**Verified:** green+strict seed8000/0900; cohort **10**/10
(green + 1500/1800/0015/0002/0014/2200/4500/0367) full RNG+
screens. Path public-unhit unless a session falls through a
hole/trap door.
**Next:** Open `teleport.c` `rloc_to_core` telemsg (named). Not
RLOC_ERR.
**Blocked:** none.

## 2026-08-17 21:10 — #1497 D-1178 goto_level fix_shop_damage

**Objective:** Open — `do.c` `goto_level` `fix_shop_damage` (named).
Not obj_delivery.
**C locus:** `do.c` `goto_level` 1985–1986 `if (!new)` after
`in_out_region` before `do_fall_dmg`/`pickup`; callee `shk.c`
`fix_shop_damage` 4849–4874 / `repair_damage` catchup 4731–4845.
**Change:** port catchup repair (`shk_impaired`, delay/occupancy/
trap/owner gates, trap convert, terrain restore, litter
`rn2(9)`). Wire `!madeNew` after `in_out_region`. Catchup skips
only post-`block_point` messages. Did not pull `shk_fixes_damage`
in `shk_move`, allmain/bones callers, or `do_fall_dmg`. Filled
D-1177 archive hash `36e0ce72`. Rotated #1482. Open 11 after
archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1495** **44**/44; next
@**#1500**).
**Verified:** green+strict seed8000/0900; cohort **10**/10
(green + 1500/1800/0015/0002/0014/2200/4500/0367) full RNG+
screens. Path public-unhit unless a session revisits a damaged
shop after 5 turns.
**Next:** Open `do.c` `goto_level` `do_fall_dmg` (named). Not
fix_shop_damage.
**Blocked:** none.

## 2026-08-17 21:00 — #1496 D-1177 goto_level obj_delivery

**Objective:** Open — `do.c` `goto_level` `obj_delivery` (named).
Not in_out_region.
**C locus:** `dokick.c` `obj_delivery` 1769–1851; callers
`do.c` `:1815` FALSE after placebc, `:1978` TRUE after
`check_special_room`; `mkobj.c` `obj_extract_self` OBJ_MIGRATING.
**Change:** port the callee (XOR WITH_HERO; bitmask noscatter;
persistent nx/ny; soft skip; WITH_HERO `breaks` else silent
`breaktest`+`delobj`; scatter `rnd(2)` or newsym; rloco). Wire
both `goto_level` sites. Unlink `OBJ_MIGRATING` in extract.
Did not pull `deliver_obj_to_mon`, wizkit FALSE, shop/fall,
`kill_genocided_monsters`, or `run_timers`. Rotated #1481.
Open 12 after archive+refill. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1495** **44**/44; next
@**#1500**).
**Verified:** green+strict seed8000/0900; cohort **10**/10
(green + 1500/1800/0015/0002/0014/2200/4500/0367) full RNG+
screens. Path public-unhit when `migrating_objs` is empty.
**Next:** Open `do.c` `goto_level` `fix_shop_damage` (named). Not
obj_delivery.
**Blocked:** none.

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

