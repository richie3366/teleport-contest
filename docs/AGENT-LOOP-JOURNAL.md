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

## 2026-08-18 00:50 — #1513 D-1191 goto_level run_timers

**Objective:** Open — `do.c` `goto_level` `run_timers` (named).
Not `kill_genocided`.
**C locus:** `do.c` `goto_level` 1818–1823 after losedogs +
`obj_delivery` + `kill_genocided_monsters` before `u_collide_m`;
callee `timeout.c` 2222–2241 (JS `mkobj.js` D-0405/D-1037).
**Change:** `await run_timers()` after `kill_genocided_monsters`
so dest + delivered timers that expired while away fire before
collide/vision/pickup. Did not peel invent/migrating RANGE_LEVEL
(`obj_is_local` false). Did not pull `notice_mon_off`, cmd.c
`#levelchange`, or REVIVE/ZOMBIFY. Filled D-1190 archive hash
`9a2cbc27`. Rotated #1498. Open 8 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1510** **44**/44; next
@**#1515**).
**Verified:** green+strict seed8000/0900; cohort **16**/16
(1500/1800/0015/0002/0014/2200/4500/0367/0009/0012/0004/
0060/0102/0700/0006/0361) + strict lengths. Public-unhit
unless a due timer is on the restored or delivered queue.
**Next:** Open `allmain.c` `newgame` wizkit `obj_delivery(FALSE)`
(named). Not goto_level.
**Blocked:** none.

## 2026-08-18 00:45 — #1512 D-1190 goto_level kill_genocided_monsters

**Objective:** Open — `do.c` `goto_level` `kill_genocided_monsters`
(named). Not `run_timers`.
**C locus:** `do.c` `goto_level` 1817 after losedogs before
`run_timers` / `u_collide_m`; callee `mon.c` 5639–5677 (D-1097).
**Change:** wire existing `kill_genocided_monsters` after
`losedogs` so migrating G_GENOD mons (and eggs) die on arrival.
Did not pull `run_timers`, `notice_mon_off`, cmd.c
`#levelchange`, or cham `newcham`. Filled D-1189 archive hash
`15dddffe`. Rotated #1497. Open 9 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1510** **44**/44; next
@**#1515**).
**Verified:** green+strict seed8000/0900; cohort **10**/10
(1500/1800/0015/0002/0014/2200/4500/0367/0009/0012) + strict
lengths. Public-unhit unless genocide-then-migrate.
**Next:** Open `do.c` `goto_level` `run_timers` (named). Not
kill_genocided.
**Blocked:** none.

## 2026-08-18 00:40 — #1511 D-1189 cmd.c rhack visctrl ^C

**Objective:** Must-fix human canary seed8243 `cmd.c` rhack
`Unknown command` `visctrl(key)` so Ctrl-C is `^C` not raw ETX.
Not `maybe_smudge_engr`. Not `kill_genocided`.
**C locus:** `cmd.c` `rhack` 3833–3834 /
`hacklib.c` `visctrl` 469–493.
**Change:** unknown-command pline uses existing
`dokeylist.js` `visctrl(key)`. Did not pull
`custompline(SUPPRESS_HISTORY)`, `cmdq_clear` CQ_REPEAT, or
`sanity_no_check`. Rotated #1496. Open 10 (no refill). Rule #2:
no fs.
**Score:** fortress unchanged (cadence **#1510** **44**/44; next
@**#1515**).
**Verified:** private canary Scr **129**/129 RNG **2768**/2768;
green+strict seed8000/0900; cohort **18**/18 + strict
1500/1800/2200/0009/0361/0012.
**Next:** Open `do.c` `goto_level` `kill_genocided_monsters`
(named). Not `run_timers`.
**Blocked:** none.

## 2026-08-18 00:35 — #1510 review D-1185–D-1188 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `do_wear.c` `doddoremarm` 3022–3056 / `invent.c`
`wearing_armor` 2149–2152; `cmd.c` `do_rush`/`do_run` 1590–1617 /
rhack PREFIXCMD 3762–3801; `hack.c` `avoid_trap_andor_region`
2515–2581 / `trap.c` `immune_to_trap` 2783–2934; `teleport.c`
`domagicportal` 1444–1488.
**Change:** reviews **147** ACCEPT D-1185 (empty-worn `A`; `\e[72C`
was truncated capture, not H2344), **148** ACCEPT D-1186 (`g`/`G`
PREFIXCMD keep-run; `rhack(0)` firsttime multi), **149**
ACCEPT-WITH-DEBT D-1187 (portal yn live; sticky
`Stunned`/`Confusion` clone debt, not Must-fix), **150** ACCEPT
D-1188 (`feeltrap`+`domagicportal`; ATSTAIRS; callees live).
Filled D-1188 archive hash `c58efd08`. No new Must-fix prepend.
Open 10 + visctrl = 11 (no refill). Rotated #1495. Rule #2: no fs.
**Score:** cadence **#1510** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `33+0.28/turn` (R² 0.87). Next
@**#1515**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Must-fix seed8243 `cmd.c` rhack `visctrl` `^C`. Not
maybe_smudge_engr.
**Blocked:** none.

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

