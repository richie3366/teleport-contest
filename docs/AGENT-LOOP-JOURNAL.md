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

## 2026-08-18 00:16 — #1509 D-1188 teleport.c domagicportal

**Objective:** Must-fix human canary seed8243 `teleport.c`
`domagicportal` activate / tutorial ATSTAIRS stunmsg. Not
maybe_smudge. Not kill_genocided.
**C locus:** `teleport.c` `domagicportal` 1444–1488 /
`trap.c` `trapeffect_magic_portal` 2710–2722; `dotrap`
`!undestroyable_trap` 3035; `mklev.c` `mktrap` dst 2108–2110;
`do.c` `goto_level` reset uz0 1967.
**Change:** hero MAGIC_PORTAL `feeltrap`+`domagicportal`.
Activate pline; tutorial leave ATSTAIRS + "Resuming regular
play."; else PORTAL + stunmsg + `make_stunned`. Seen-escape
skips `rn2(5)` on undestroyable traps. `mktrap` dst from
`ucamefrom`. `goto_level` resets uz0 so later steps fire.
Did not pull `level_tele_trap` / `UTOTYPE_RMPORTAL` / rhack
`visctrl`. Filled D-1187 archive hash `77ead396`. Rotated
#1494. Open 10 + Must-fix visctrl = 11 (no refill). Rule #2:
no fs.
**Score:** fortress unchanged (cadence **#1505** **44**/44; next
@**#1510**). Cohort this iter was the full public 44.
**Verified:** canary Scr **108→128**/129 RNG **2570→2768**/2768
(leftover @117 `Unknown command '^C'`); green+strict
seed8000/0900; cohort **44**/44 + strict
1500/0700/0009/0361/0015/0012/2200.
**Next:** Must-fix seed8243 `cmd.c` rhack `visctrl` `^C`.
Not maybe_smudge_engr.
**Blocked:** none.

## 2026-08-18 00:08 — #1508 D-1187 avoid_trap_andor_region ParanoidTrap

**Objective:** Must-fix human canary seed8243 `hack.c`
`avoid_trap_andor_region` ParanoidTrap portal yn. Not
maybe_smudge. Not kill_genocided.
**C locus:** `hack.c` `avoid_trap_andor_region` 2515–2581 /
`domove_core` 2825–2828; `trap.c` `into_vs_onto` 5375–5388 /
`immune_to_trap` 2783–2934 (MAGIC_PORTAL hero NOT_IMMUNE).
**Change:** yn `"Really step into that magic portal?"` via
`paranoid_query(ParanoidConfirm)` (default bits → yn, not
getlin yes). Call after `u_rooted` before `u.utrap`. Silent
TEST_MOVE subset. Gas-region arm via local clones. Did not
pull hero `domagicportal`. Filled D-1186 archive hash
`4dd396cc`. Rotated #1493. Open 10 + Must-fix portal
activate = 11 (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1505** **44**/44; next
@**#1510**).
**Verified:** canary Scr **107→108**/129 (yn matches; @108
leftover yn vs C activate); green+strict seed8000/0900;
cohort **42**/42 (CURRENT shared + 0014/0383/0399/4500/2600
+ green) + strict 1500/0700/0009/0361/0015/0012.
**Next:** Must-fix seed8243 `teleport.c` `domagicportal`
`"You activated a magic portal!"` / tutorial ATSTAIRS.
Not maybe_smudge_engr.
**Blocked:** none.

## 2026-08-17 23:55 — #1507 D-1186 cmd.c g/G PREFIXCMD rush

**Objective:** Must-fix human canary seed8243 `cmd.c` `g` rush
prefix vs JS Unknown command. Not maybe_smudge. Not offx.
**C locus:** `cmd.c` `do_rush`/`do_run` 1588–1617 / `set_move_cmd`
1387–1399 / rhack PREFIXCMD + `DOMOVE_RUSH` 3762–3801.
**Change:** `rhack` `g`→run=2 / `G`→run=3 + `DOMOVE_RUSH`,
`move=0` like `F`/`m` (no inner `parse` getch). Following walk
keeps run and sets first-step multi/mv. Double-prefix cancel;
non-walk after pending prefix pline. Did not pull nested F+g/G.
Filled D-1185 archive hash `4750946a`. Rotated #1492. Open 10 +
Must-fix portal yn = 11 (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1505** **44**/44; next
@**#1510**).
**Verified:** canary Scr **106→107**/129 (`g` Unknown gone; @22
empty); remaining @107 ParanoidTrap portal yn; green+strict
seed8000/0900; cohort **8**/8
(1500/1800/0700/0361/0014/2200/0009/0012) + strict
1500/0700/0009/0361.
**Next:** Must-fix seed8243 `hack.c` `avoid_trap_andor_region`
ParanoidTrap portal yn. Not maybe_smudge_engr.
**Blocked:** none.

## 2026-08-17 23:35 — #1506 D-1185 doddoremarm A empty-worn

**Objective:** Must-fix human canary seed8243. Queued as chargen
`offx`; dump first.
**C locus:** `wintty.c` H2344 `tty_display_nhwindow` NHW_MENU offx
(confirm already matched); first real miss `do_wear.c`
`doddoremarm` 3022–3034 / `cmd.c` `'A'` takeoffall.
**Change:** local C re-record replaces truncated `\e[72C` capture
(H2344 `\e[40C` already matched JS; do not revert D-0078).
`doddoremarm` empty-worn You are not wearing anything. Did not
pull `ggetobj`/`menu_remarm`/`take_off`. Did not port `g` rush.
Rotated #1491. Open 10 + Must-fix `g` prefix = 11 (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1505** **44**/44; next
@**#1510**).
**Verified:** canary Scr **102→106**/129 (four `A`); remaining @22
`g`; green+strict seed8000/0900; cohort **8**/8
(1500/1800/0700/0361/0014/2200/0009/0012) + strict
1500/0700/0009/0361.
**Next:** Must-fix seed8243 `cmd.c` `g` rush prefix. Not
maybe_smudge_engr.
**Blocked:** none.

## 2026-08-17 23:15 — #1505 review D-1181–D-1184 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `teleport.c` `rloc` 1884–1888 / `pline.c` `impossible`
584–634; `teleport.c` `rloc_pos_ok` 1592–1615; `teleport.c`
`rloc_to_core` 1710–1711; `teleport.c` `scrolltele` 861–863 /
`potion.c` `make_blinded` 261–331; docs canary `wintty.c` NHW_MENU
`offx` vs `nhw_menu_geometry`.
**Change:** reviews **142** ACCEPT D-1181 (`RLOC_ERR` `impossible`
envelope; paniclog/vault bit named), **143** ACCEPT D-1182
(`!xx` updest/dndest XOR; migrate bit 2 / `mon_arrive` named),
**144** ACCEPT D-1183 (ustuck-together `You()` via `mon_nam`;
`makeknown`/`set_msg_xy` named), **145** ACCEPT D-1184
(`!Blinded` `make_blinded(0,FALSE)` live `do.js` callee; W-tower
Override named), **146** ACCEPT docs seed8243 private canary
(Must-fix already; do not hardcode offx 72 / revert D-0078).
Must-fix not prepended. Filled D-1184 archive hash `1b94d8d3`.
Rotated #1490. Open 11 (no refill). Rule #2: no fs.
**Score:** cadence **#1505** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `33+0.28/turn` (R² 0.87). Next
@**#1510**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Must-fix human canary seed8243 `wintty.c` NHW_MENU `offx`.
Not `kill_genocided`. Not `built` date.
**Blocked:** none.

## 2026-08-17 22:40 — #1504 D-1184 scrolltele make_blinded

**Objective:** Open — `teleport.c` `scrolltele` make_blinded (named).
Not W-tower amulet.
**C locus:** `teleport.c` `scrolltele` 861–863 after noteleport
return, before amulet/W-tower `rn2(3)`.
**Change:** `if (!Blinded()) await make_blinded(0, false)` via
dynamic `do.js` import. `Blinded` ≡ `HBlinded && !BBlinded` (not
Blindfold). Skip when Blinded so timeout/FROMFORM is not cured.
Did not pull W-tower Override yn. Filled D-1183 archive hash
`d2512b22`. Rotated #1489. Open 10 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1500** **44**/44; next
@**#1505**).
**Verified:** private canary **52**/52 (C/JS order; Blinded≠Blind;
0,FALSE not 1L; noteleport before; timeout/FROMFORM kept; Eyes
leftover TIMEOUT cleared; Blindfold uses Blinded; wizard still
calls; amulet after; no fs/FORCE); green+strict seed8000/0900;
cohort **12**/12 (1500/1800/0015/0002/0014/2200/4500/0367/0360/
0012/0004/0006) + strict 1500/0012/0360/4500/2200/0014/0004.
Path public-unhit unless Eyes leftover timeout on teleport.
**Next:** Open `do.c` `goto_level` `kill_genocided_monsters`
(named). Not run_timers.
**Blocked:** none.

## 2026-08-17 22:25 — #1503 D-1183 rloc_to_core ustuck-together

**Objective:** Open — `teleport.c` `rloc_to_core` ustuck-together
pline (named). Not telemsg.
**C locus:** `teleport.c` `rloc_to_core` 1710–1711 first post-msg
arm after dest, before telemsg/appear.
**Change:** `mtmp==ustuck && !u_at(ux0,uy0)` →
`You("and %s teleport together.")` via `mon_nam`; else-if telemsg
reappear; else appear/arrives. Did not pull wand `makeknown` or
`set_msg_xy`. Filled D-1182 archive hash `01c8c41f`. Rotated
#1488. Open 11 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1500** **44**/44; next
@**#1505**).
**Verified:** private canary **44**/44 (C/JS order; together beats
telemsg; grab adjacent ux==ux0 silent; grab ux!=ux0 together;
grab far unstuck; RLOC_NOMSG; same-cell; in_mklev; Blind arrives;
`mon_nam` the- not The-; no fs/FORCE); green+strict seed8000/0900;
cohort **12**/12 (green + 1500/1800/0015/0002/0014/2200/4500/0367/
0360/0012) + strict 1500/0012/0360/4500/2200/0014. Path
public-unhit unless swallowed/ustuck teleports with messages.
**Next:** Open `teleport.c` `scrolltele` make_blinded (named). Not
W-tower amulet.
**Blocked:** none.

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

