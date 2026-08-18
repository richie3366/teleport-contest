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

## 2026-08-18 09:00 — #1538 D-1211 mhitm mdamagem gz.zombify around monkilled

**Objective:** Open — `mhitm.c` `gz.zombify` at monkilled
(named). Not make_corpse.
**C locus:** `mhitm.c` `mdamagem` 1083–1089.
**Change:** wrap both `mdamagem` death `monkilled` calls with
`game.zombify = (!mwep && zombie_maker(magr) && (AT_TUCH ||
AT_CLAW || AT_BITE) && zombie_form(mdef) !== NON_PM)` then
FALSE. Did not pull troll_baned, gulpmm swap, or passivemm
shock. Filled D-1210 archive hash `f1a3518a`. Rotated #1523.
Open 8 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1535** **44**/44; next
@**#1540**).
**Verified:** private canary **23**/23; green+strict
seed8000/0900; cohort **12**/12 + strict 0012/0004/1500/1800.
**Next:** Open `do.c` `revive_corpse` OBJ_MINVENT / OBJ_CONTAINED
(named). Not BURIED.
**Blocked:** none.

## 2026-08-18 08:50 — #1537 D-1210 zombie_maker + xkilled gz.zombify

**Objective:** Open — `mon.c` `zombie_maker` + `gz.zombify` at
`make_corpse` (named). Not mhitm.
**C locus:** `mon.c` `zombie_maker` 362–379; `xkilled` 3619–3624.
**Change:** `zombie_maker` (S_ZOMBIE except ghoul/skeleton, S_LICH,
!mcan; mndx compare). `xkilled` sets `game.zombify` around
`make_corpse` (`!thrownobj && !stoned && !uwep` + youmonst +
victim `zombie_form`) then FALSE. Did not pull mhitm monkilled
zombify. Filled D-1209 archive hash `b3c0d228`. Rotated #1522.
Open 9 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1535** **44**/44; next
@**#1540**).
**Verified:** private canary **36**/36; green+strict
seed8000/0900; cohort **12**/12 + strict lengths (fresh
process seed0012).
**Next:** Open `mhitm.c` `gz.zombify` at monkilled (named). Not
make_corpse.
**Blocked:** none.

## 2026-08-18 08:33 — #1536 D-1209 dotelecmd m-prefix mode menu

**Objective:** Open — `teleport.c` `dotelecmd` m-prefix mode menu
(named). Not energy gate.
**C locus:** `teleport.c` `dotelecmd` 917–1031; `spell.c`
`tport_spell` 1707–1757; `cmd.c` `C('t')` CMD_M_PREFIX 1890–1891.
**Change:** non-wizard `dotele(FALSE)`; wizard save H/E; `!m`
ignore restrictions; else PICK_ONE n/s/t/w (`w` preselected);
ESC ECMD_OK; `tport_spell` hide/add then reverse; rhack keeps
`menu_requested` for ^T. Snapshot-then-clear (JS split rhack).
Did not pull energy/`spelleffects`, LEVEL_TELEP yn, or
`#teleport` doextcmd. Rotated #1521. Open 10 after archive
(no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1535** **44**/44; next
@**#1540**).
**Verified:** private canary **28**/28; green+strict
seed8000/0900; cohort **8**/8 + strict 1500/0012/0360/0361/
4500/2200/0014/0004.
**Next:** Open `mon.c` `zombie_maker` + `gz.zombify` at
`make_corpse` (named). Not mhitm.
**Blocked:** none.

## 2026-08-18 07:55 — #1535 review D-1205–D-1208 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `teleport.c` `scrolltele` 874–882 / `trap.c`
`unconscious` 6776–6786; `do_name.c` `mon_nam` 1041–1046;
`pline.c` `vpline` 162–189 / `getpos.c` `coord_desc` 557–635 /
`cmd.c` `directionname` 4313–4322; `teleport.c` `dotele`
1041–1161 / `hack.c` `u_locomotion` 1817–1828.
**Change:** reviews **167** ACCEPT D-1205 (unconscious fail then
`safe_teleds`; clone matches `trap.c` prefixes), **168** ACCEPT
D-1206 (`whobuf` + imported `mon_nam`, not `y_monnam`; §2b thin
but C-exact), **169** ACCEPT-WITH-DEBT D-1207 (`pline`/`Norep`
consume live; `opt_accessiblemsg`/`pline_xy` named Open, not
Must-fix), **170** ACCEPT-WITH-DEBT D-1208 (`teleds`/vault/`!trap`
hunger live; LEVEL_TELEP yn + energy named, not Must-fix).
Filled D-1208 archive hash `bd8c2161`. No new Must-fix prepend.
Open 11 (no refill). Rotated #1520. Rule #2: no fs.
**Score:** cadence **#1535** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `34+0.28/turn` (R² 0.871). Next
@**#1540**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `teleport.c` `dotelecmd` m-prefix mode menu
(named). Not energy gate.
**Blocked:** none.

## 2026-08-18 07:36 — #1534 D-1208 dotele trap-at-feet teledest

**Objective:** Open — `teleport.c` `dotele` trap-at-feet teledest
(named). Not vault_tele.
**C locus:** `teleport.c` `dotele` 1041–1161; TELEP_TRAP arm
1054–1066; dispatch 1145–1153; morehungry 1159–1160.
**Change:** `t_at` tseen TELEP_TRAP jump via `u_locomotion`
(Lev/Fly). trap_once vault yn/deltrap then existing
`vault_tele()`. `isok(teledest)` `teleds` (no displace/
settrack). Else D-0789 travelcc+`tele()`. `!trap`
`morehungry(100)`. LEVEL_TELEP yn treated as declined.
Did not pull energy/spellcast or `dotelecmd` m-prefix.
Filled D-1207 archive hash `08d2e6b0`. Rotated #1519.
Open 11 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1530** **44**/44; next
@**#1535**).
**Verified:** private canary **20**/20; green+strict
seed8000/0900; cohort **8**/8 + strict 1500/0012/0360/0361/
4500/2200/0014/0004. Public-unhit unless ^T on a seen
TELEP_TRAP.
**Next:** Open `teleport.c` `dotelecmd` m-prefix mode menu
(named). Not energy gate.
**Blocked:** none.

## 2026-08-18 07:11 — #1533 D-1207 vpline accessiblemsg consume

**Objective:** Open — `pline.c` `vpline` accessiblemsg consume
(named). Not set_msg_xy.
**C locus:** `pline.c` `vpline` 162–189; `getpos.c` `coord_desc`
/`dxdy_to_dist_descr`; `cmd.c` `directionname`.
**Change:** snapshot+reset `a11y.msg_loc` on every `pline`/`Norep`
(empty and suppress included). On+`isok` prefix `coord_desc: `
(NONE→COMFULL; unit `directionname`). Did not pull `pline_xy` /
`set_msg_dir` / `opt_accessiblemsg` wire / `dolookaround`. Filled
D-1206 archive hash `319bf51c`. Rotated #1518. Open 7 after
archive; refilled Open to 12. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1530** **44**/44; next
@**#1535**).
**Verified:** private canary **36**/36; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/0012/0360/4500/
2200/0014/0004. Public-unhit unless `accessiblemsg` On.
**Next:** Open `teleport.c` `dotele` trap-at-feet teledest
(named). Not vault_tele.
**Blocked:** none.

## 2026-08-18 06:56 — #1532 D-1206 scrolltele steed whobuf

**Objective:** Open — `teleport.c` `scrolltele` steed whobuf
(named). Not unconscious.
**C locus:** `teleport.c` `scrolltele` 877–882 after unconscious
before learnscroll/getpos; `do_name.c` `mon_nam`.
**Change:** `whobuf` `"you"` then if `u.usteed` append
`" and " + mon_nam(usteed)` (not `y_monnam`). Did not pull
dotele trap-at-feet or dotelecmd m-prefix. Filled D-1205
archive hash `f389c2b4`. Rotated #1517. Open 8 after archive
(no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1530** **44**/44; next
@**#1535**).
**Verified:** private canary **33**/33; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/0012/0360/4500/
2200/0014/0004. Public-unhit unless controlled teleport
while riding.
**Next:** Open `pline.c` `vpline` accessiblemsg consume (named).
Not set_msg_xy.
**Blocked:** none.

## 2026-08-18 06:48 — #1531 D-1205 scrolltele unconscious

**Objective:** Open — `teleport.c` `scrolltele` unconscious (named).
Not Override yn.
**C locus:** `teleport.c` `scrolltele` 874–876 / `trap.c`
`unconscious` 6776–6786 after Override before steed whobuf.
**Change:** local `unconscious()` clone; fail pline then
fall through `learnscroll`+`safe_teleds` (no getpos). Did not
pull steed whobuf. D-1204 archive already `dbd3a08b`. Rotated
#1516. Open 9 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1530** **44**/44; next
@**#1535**).
**Verified:** private canary **37**/37; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/0012/0360/4500/
2200/0014/0004. Public-unhit unless controlled teleport
while `multi<0` sleep or a matching wake `nomovemsg`.
**Next:** Open `teleport.c` `scrolltele` steed whobuf (named).
Not unconscious.
**Blocked:** none.

## 2026-08-18 06:35 — #1530 review D-1201–D-1204 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `artifact.c` `init_artifacts` 111–116 /
`hack_artifacts` 87–107 / `allmain.c` 792; `do.c` `revive_mon`
2251–2295 / `zombify_mon` 2298–2315 / `timeout.c` 1982–1983 /
`mon.c` `zombie_form` 386–413; `wizcmds.c` `wiz_level_change`
444–487 / `exper.c` `losexp` 214–217; `eat.c` `eatspecial`
2432–2447 / `wield.c` `uwepgone` 873–885 / `apply.c`
`o_unleash` 711–722.
**Change:** reviews **163** ACCEPT D-1201 (memset + gift/Excalibur/
questarti live; `restore_artifacts` / sparse `questarti` named),
**164** ACCEPT-WITH-DEBT D-1202 (callbacks + `mkobj.js` dispatch
live; `gz.zombify` setters / `set_corpsenm` `oeaten` / `fill_pit`
settle named, not Must-fix), **165** ACCEPT D-1203 (drain loop +
`#levelchange` override + `ulevelmax`; `+N sscanf` named),
**166** ACCEPT-WITH-DEBT D-1204 (MAIL pline + snuff/`end_burn`
live; sticky `Blind_w` / local `Tobjnam` clone debt, not
Must-fix). Filled D-1204 archive hash `dbd3a08b`. No new Must-fix
prepend. Open 10 (no refill). Rotated #1515. Rule #2: no fs.
**Score:** cadence **#1530** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `32+0.27/turn` (R² 0.868). Next
@**#1535**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `teleport.c` `scrolltele` unconscious (named).
Not Override yn.
**Blocked:** none.

## 2026-08-18 06:17 — #1529 D-1204 eatspecial SCR_MAIL + uwepgone light

**Objective:** Open — `eat.c` `eatspecial` (named). Not
doeat_nonfood.
**C locus:** `eat.c` `eatspecial` 2432–2447 MAIL_STRUCTURES
`SCR_MAIL` before scare/YUM/salt; `wield.c` `uwepgone` 873–885
`artifact_light`/`end_burn`/Tobjnam; gone-trio + `apply.c`
`o_unleash` `update_inventory`.
**Change:** junk-mail PAPER arm; async `uwepgone` snuff+shine
before `setuwep`; inventory on gone trio/`o_unleash`; await
from eat/steal/`selftouch`. Did not pull lesshungry
choke/fullwarn or setuwep begin_burn. Filled D-1203 archive
hash `a16884ab`. Rotated #1514. Open 10 after archive (no
refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1525** **44**/44; next
@**#1530**).
**Verified:** canary **17**/17; green+strict seed8000/0900;
cohort **16**/16 + strict lengths (1500/1800/0014/0006/0361/
0108/0116/0004/0012/0360/4500/2200/0002/0007/0398/0373).
Public-unhit unless a metallivore eats mail or last lit
Sunsword is destroyed.
**Next:** Open `teleport.c` `scrolltele` unconscious (named).
Not Override yn.
**Blocked:** none.

## 2026-08-18 06:02 — #1528 D-1203 wiz_level_change drain

**Objective:** Open — `cmd.c` `wiz_level_change` (named). Not
notice_mon_off.
**C locus:** `wizcmds.c` `wiz_level_change` 444–487; `exper.c`
`losexp` 214–217 (`#levelchange` nulls drainer before
`resists_drli`); registered `cmd.c` extcmdlist.
**Change:** drain loop `losexp("#levelchange")` + clamp `<1` to
1; `u.ulevelmax = u.ulevel` after drain/raise; `losexp`
override so Drain_resistance does not block the wizard request
and it is never fatal; ESC/empty → Never_mind + ECMD_OK.
Did not pull `makemap_prepost` / `wiz_makemap`, Upolyd mh, or
level-1 `done(DIED)`. Filled D-1202 archive hash `dfed1743`.
Rotated #1513. Open 11 after archive (no refill). Rule #2: no
fs.
**Score:** fortress unchanged (cadence **#1525** **44**/44; next
@**#1530**).
**Verified:** `losexp` canary **9**/9; green+strict
seed8000/0900; cohort **16**/16 + strict lengths (0360/0361/
0373/0108/0116/0006/2200/4500/1500/1800/0004/0012/0367/0398).
Public raise tours unhit on the drain arm.
**Next:** Open `eat.c` `eatspecial` (named). Not doeat_nonfood.
**Blocked:** none.

## 2026-08-18 05:52 — #1527 D-1202 REVIVE/ZOMBIFY

**Objective:** Open — `timeout.c` REVIVE/ZOMBIFY (named). Not
`run_timers`.
**C locus:** `do.c` `revive_mon` 2251–2295 / `zombify_mon`
2298–2315 (table `timeout.c` 1982–1983); `mon.c` `zombie_form`
386–413; `timeout.c` `obj_has_timer` 2404–2409; `mkobj.c`
`start_corpse_timeout` 1425–1428; buried pit `do.c`
`revive_corpse` 2217–2234.
**Change:** `revive_mon`/`zombify_mon` + `run_timers` dispatch;
`zombie_form`; zombify `rn1(15,5)` arm; `obj_has_timer`; buried
zombie pit. Did not pull `gz.zombify` setters, MINVENT/CONTAINED,
or `rot_corpse` worn plines. Filled D-1201 archive hash
`4ffc2264`. Rotated #1512. Open 7 after archive → refill to 12.
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1525** **44**/44; next
@**#1530**).
**Verified:** `zombie_form`/`is_displacer` unit; green+strict
seed8000/0900; cohort **16**/16 + strict lengths (fresh
process). Public-unhit unless a REVIVE/ZOMBIFY timer expires.
**Next:** Open `cmd.c` `wiz_level_change` (named). Not
notice_mon_off.
**Blocked:** none.

## 2026-08-18 05:36 — #1526 D-1201 init_artifacts

**Objective:** Open — `artifact.c` `init_artifacts` (named).
Not wizkit.
**C locus:** `artifact.c` `init_artifacts` 109–116 memset
artiexist/artidisco then `hack_artifacts` 85–106. Caller
`allmain.c` 792 after `init_dungeons`/`role_init`, before
`u_init_misc`.
**Change:** `init_artifacts` rebuilds artilist from generated
raw then gift-role align / Excalibur `!Knight` `role=NON_PM` /
`questarti` align+role. `newgame` calls it at the C site.
Did not pull `save_artifacts`/`restore_artifacts`, wizkit, or
`reset_glyphmap`. Rotated #1511. Open 8 after archive (no
refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1525** **44**/44; next
@**#1530**).
**Verified:** private canary **27**/27; green+strict
seed8000/0900; cohort **16**/16 + strict 1500/1800/0012/0360/
4500/2200/0014/0004/0700/0006/0108/0116.
**Next:** Open `timeout.c` REVIVE/ZOMBIFY (named). Not
run_timers.
**Blocked:** none.

## 2026-08-18 05:25 — #1525 review D-1197–D-1200 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `teleport.c` `scrolltele` 865–870 / `hack.h` `y_n` /
`pline.c` `You_feel`; `dog.c` `migrate_to_level` 913–915 /
`dungeon.c` `In_W_tower`; `dog.c` `mon_arrive` 607–613 /
`losedogs` 390–401 / `mon.c` `mnearto` FALSE; `allmain.c`
`newgame` 771 / 844–848 / `hack.c` `notice_all_mons`.
**Change:** reviews **159** ACCEPT D-1197 (W-tower OR + live
`yn_function` Override; unconscious/steed named), **160**
ACCEPT D-1198 (`In_W_tower` `|=2` on pre-relmon coords; `my`
still 0 until D-1199), **161** ACCEPT-WITH-DEBT D-1199
(After_you copies `my=xyflags` then `rloc`/`mnearto`;
failed_arrivals/wander/`MON_STILL_ARRIVING` named, not
Must-fix), **162** ACCEPT D-1200 (newgame off/on + catch-up
after Hello; `dolookaround` / vision.c caller named). Filled
D-1200 archive hash `15cb4a37`. No new Must-fix prepend.
Open 9 (no refill). Rotated #1510. Rule #2: no fs.
**Score:** cadence **#1525** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `31+0.27/turn` (R² 0.878). Next
@**#1530**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `artifact.c` `init_artifacts` (named). Not
wizkit.
**Blocked:** none.

## 2026-08-18 05:12 — #1524 D-1200 newgame notice_mon_off

**Objective:** Open — `allmain.c` `newgame` `notice_mon_off`
(named). Not wizkit.
**C locus:** `allmain.c` `newgame` 771 first after locals;
844–848 after `welcome(TRUE)`. Macros `flag.h` 233–237;
callee `hack.c` `notice_all_mons` 1744–1783 (D-1142).
**Change:** `notice_mon_off` at newgame entry; `notice_mon_on`
+ `notice_all_mons(TRUE)` after welcome (`!glyph_updates`).
Did not pull `dolookaround`, `reset_glyphmap`, vision.c
`:856`, mapping/wizcmds/save, `init_artifacts`, or
`spot_monsters` wiring. Default Off so public catch-up is a
no-op. Filled D-1199 archive hash `4dc76022`. Rotated #1509.
Open 9 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1520** **44**/44; next
@**#1525**).
**Verified:** private canary **38**/38; green+strict
seed8000/0900; cohort **14**/14 + strict 1500/1800/0012/0360/
4500/2200/0014/0004/0700/0006/0108/0116.
**Next:** Open `artifact.c` `init_artifacts` (named). Not
wizkit.
**Blocked:** none.
