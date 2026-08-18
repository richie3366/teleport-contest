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

## 2026-08-18 05:01 — #1523 D-1199 mon_arrive After_you my=xyflags before rloc

**Objective:** Open — `dog.c` `mon_arrive` `my=xyflags` before
rloc (named). Not migrate bit.
**C locus:** `dog.c` `mon_arrive` 607–613 after xyloc switch
before `mnearto`/`rloc(RLOC_NOMSG)`. Caller `losedogs`
After_you 390–401 (`mux/muy` match `u.uz`, not EXACT_XY).
**Change:** After_you copies `mtrack[0].y` into `my` (`mx`
stays 0) then rloc when xlocale==0 else thin mnearto
(move_other FALSE). RANDOM zeros locale. Did not pull
kops/EXACT_XY Before_you/failed_arrivals/wander/leftovers/
Wiz_arrive. Filled D-1198 archive hash `2f8f7d9f`. Rotated
#1508. Open 10 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1520** **44**/44; next
@**#1525**).
**Verified:** private canary **32**/32; green+strict
seed8000/0900; cohort **10**/10 + strict 1500/0012/0360/4500/
2200/0014/0004/0700/1800/0006.
**Next:** Open `allmain.c` `newgame` `notice_mon_off` (named).
Not wizkit.
**Blocked:** none.

## 2026-08-18 04:42 — #1522 D-1198 migrate_to_level W-tower xyflags bit 2

**Objective:** Open — `dog.c` `migrate_to_level` `In_W_tower`
xyflags bit 2 (named). Not mon_arrive.
**C locus:** `dog.c` `migrate_to_level` 913–915 after depth-up
before mtrack/`mx=my=0`. Callee `dungeon.c` `In_W_tower`.
**Change:** after existing up-bit, `In_W_tower(mx,my,u.uz)`
`xyflags |= 2` (pre-relmon coords, current `u.uz` not dest).
Did not pull `mon_arrive` `my=xyflags`. Filled D-1197 archive
hash `7deb2670`. Rotated #1507. Open 11 after archive (no
refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1520** **44**/44; next
@**#1525**).
**Verified:** private canary **40**/40; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/0012/0360/4500/
2200/0014/0004.
**Next:** Open `dog.c` `mon_arrive` `my=xyflags` before rloc
(named). Not migrate bit.
**Blocked:** none.

## 2026-08-18 04:35 — #1521 D-1197 scrolltele W-tower Override yn

**Objective:** Open — `teleport.c` `scrolltele` W-tower Override yn
(named). Not make_blinded.
**C locus:** `teleport.c` `scrolltele` 865–870 after make_blinded.
`y_n` ≡ `yn_function(..., ynchars, 'n', TRUE)`. `On_W_tower_level`
wiz1/2/3. Callers `tele()` / `seffects` SCR_TELEPORTATION.
**Change:** gate is `amulet || On_W_tower_level` then `!rn2(3)`
`You_feel`; `!wizard || yn_function('Override?') !== 'y'` return
(no learnscroll). `!wizard` short-circuits yn. Did not pull
unconscious or steed whobuf. Filled no prior missing archive
hash. Rotated #1506. Open 7 after archive; refilled to 12.
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1520** **44**/44; next
@**#1525**).
**Verified:** private canary **44**/44; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/0012/0360/4500/
2200/0014/0004.
**Next:** Open `dog.c` `migrate_to_level` `In_W_tower` xyflags
bit 2 (named). Not mon_arrive.
**Blocked:** none.

## 2026-08-18 04:15 — #1520 review D-1193–D-1196 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `dokick.c` `deliver_obj_to_mon` 1854–1906 /
`makemon.c` 1469–1470 / `do_name.c` 1538–1586; `do.c`
`goto_level` 1839 / 1971–1972 / `hack.c` 1744–1783; `teleport.c`
`rloc_to_core` 1727–1731 / `hack.h` `makeknown`; `teleport.c`
1708 / `pline.c` `set_msg_xy` 93–97.
**Change:** reviews **155** ACCEPT-WITH-DEBT D-1193 (minvent
prepend live; `add_to_minv` merge named, not Must-fix), **156**
ACCEPT D-1194 (off/`docrt` + uz0 catch-up live; vision_recalc
caller named), **157** ACCEPT D-1195 (`makeknown` after dest
msg; `exercise` `rn2(19)` live), **158** ACCEPT-WITH-DEBT D-1196
(store dest `msg_loc`; `vpline` consume named, not Must-fix).
Filled D-1196 archive hash `d0cbc6e3`. No new Must-fix prepend.
Open 8 (no refill). Rotated #1505. Rule #2: no fs.
**Score:** cadence **#1520** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `32+0.27/turn` (R² 0.871). Next
@**#1525**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `teleport.c` `scrolltele` W-tower Override yn
(named). Not make_blinded.
**Blocked:** none.

## 2026-08-18 01:32 — #1519 D-1196 rloc_to_core dest-msg set_msg_xy

**Objective:** Open — `teleport.c` `rloc_to_core` `set_msg_xy`
(named). Not makeknown.
**C locus:** `teleport.c` `rloc_to_core` 1708 after dest-msg gate
before dest plines. Callee `pline.c` `set_msg_xy`.
**Change:** export `hack.js` `set_msg_xy` and call it at dest
before `STRAT_APPEARMSG` clear. Silent / same-cell / `in_mklev`
/ unspotted skip. Did not pull `accessiblemsg` consume or
`scrolltele` W-tower Override. Filled D-1195 archive hash
`143f9a46`. Rotated #1504. Open 8 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1515** **44**/44; next
@**#1520**).
**Verified:** private canary **18**/18; green+strict
seed8000/0900; cohort **14**/14 + strict 1500/0012/0360/4500/
2200/0014.
**Next:** Open `teleport.c` `scrolltele` W-tower Override yn
(named). Not make_blinded.
**Blocked:** none.

## 2026-08-18 01:26 — #1518 D-1195 rloc_to_core wand makeknown

**Objective:** Open — `teleport.c` `rloc_to_core` wand `makeknown`
(named). Not ustuck-together.
**C locus:** `teleport.c` `rloc_to_core` 1727–1731 after delivered
dest pline, before resident shk angry. `dozap` sets
`gc.current_wand` around `weffects`.
**Change:** if `current_wand.otyp === WAN_TELEPORTATION` after a
delivered dest msg, `makeknown(WAN_TELEPORTATION)` (WIS
`rn2(19)` when new). Null / other otyp / no dest msg skip.
Did not pull `set_msg_xy`. Filled D-1194 archive hash
`c4c57ac1`. Rotated #1503. Open 9 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1515** **44**/44; next
@**#1520**).
**Verified:** private canary **27**/27; green+strict
seed8000/0900; cohort **14**/14 + strict 1500/0012/0360/4500/
2200/0014.
**Next:** Open `teleport.c` `rloc_to_core` `set_msg_xy` (named).
Not makeknown.
**Blocked:** none.

## 2026-08-18 01:18 — #1517 D-1194 goto_level notice_mon_off

**Objective:** Open — `do.c` `goto_level` `notice_mon_off`
(named). Not docrt.
**C locus:** `do.c` `goto_level` 1839 after vision_reset before
docrt; 1971–1972 after uz0 before print_level_annotation.
Macros `flag.h` 233–237; callee `hack.c` `notice_all_mons`
1744–1783 (D-1142).
**Change:** `notice_mon_off` before `docrt`; `notice_mon_on` +
`notice_all_mons(TRUE)` after uz0. Did not pull `reset_glyphmap`,
docrt, vision.c `:856`, newgame/mapping/wizcmds/save, or
`spot_monsters` wiring. Default Off so public catch-up is a
no-op. Filled D-1193 archive hash `2d2e68c7`. Rotated #1502.
Open 10 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1515** **44**/44; next
@**#1520**).
**Verified:** private canary **29**/29; green+strict
seed8000/0900; cohort **41**/41 + strict lengths.
**Next:** Open `teleport.c` `rloc_to_core` wand `makeknown`
(named). Not ustuck-together.
**Blocked:** none.

## 2026-08-18 01:12 — #1516 D-1193 deliver_obj_to_mon

**Objective:** Open — `dokick.c` `deliver_obj_to_mon` (named).
Not obj_delivery.
**C locus:** `dokick.c` `deliver_obj_to_mon` 1853–1906; caller
`makemon.c` 1469–1470 DF_NONE after invent; helpers
`do_name.c` `christen_orc`/`rndorcname`/`free_oname`.
**Change:** port the species-delivery loop (DELIVER_PM;
DF_RANDOM/ALL/NONE maxobj; orc named booty mines gang vs
`rn2(2)` Fence; `free_oname`; `add_to_minv`). Wire makemon
before `!in_mklev` newsym. Did not pull dog leftovers,
`mksobj_migr_to_species`, or stolen_booty. Rotated #1501.
Open 11 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1515** **44**/44; next
@**#1520**).
**Verified:** private canary **25**/25; green+strict
seed8000/0900; cohort **39**/39 + strict lengths.
**Next:** Open `do.c` `goto_level` `notice_mon_off` (named).
Not docrt.
**Blocked:** none.

## 2026-08-18 01:05 — #1515 review D-1189–D-1192 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `cmd.c` rhack 3833–3834 / `hacklib.c` `visctrl`
469–493; `do.c` `goto_level` 1817 / `mon.c` 5639–5677; `do.c`
1818–1823 / `timeout.c` 2222–2241; `allmain.c` 826–829 /
`files.c` 2537–2601 / `cfgfiles.c` 1214–1218.
**Change:** reviews **151** ACCEPT D-1189 (`visctrl(key)` `^C`;
callee live), **152** ACCEPT D-1190 (`kill_genocided` after
`losedogs`; `newcham` named), **153** ACCEPT D-1191 (`run_timers`
after wipe; REVIVE named), **154** ACCEPT-WITH-DEBT D-1192
(overflow FALSE at hero live; `wizkit_wishing` unread / `WIZKIT=`
spaces-colon / EOF leftover clone debt, not Must-fix). Filled
D-1192 archive hash `cf9eb066`. No new Must-fix prepend. Open 12
(no refill). Rotated #1500. Rule #2: no fs.
**Score:** cadence **#1515** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `32+0.27/turn` (R² 0.875). Next
@**#1520**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `dokick.c` `deliver_obj_to_mon` (named). Not
obj_delivery.
**Blocked:** none.

## 2026-08-18 00:55 — #1514 D-1192 newgame wizkit obj_delivery(FALSE)

**Objective:** Open — `allmain.c` `newgame` wizkit
`obj_delivery(FALSE)` (named). Not goto_level.
**C locus:** `allmain.c` `newgame` 826–829 after skills before
legacy; `files.c` `read_wizkit` 2584–2601 / `wizkit_addinv`
2537–2559 / `proc_wizkit_line` 2562–2581; `cfgfiles.c`
`cnf_line_WIZKIT`; callee `dokick.c` `obj_delivery` FALSE
(D-1177).
**Change:** VFS `read_wizkit` + `WIZKIT=` parse; wire wizard
`read_wizkit` then `obj_delivery(FALSE)` so overflow kit items
land at the hero. Did not pull `deliver_obj_to_mon`, getenv/
HOME, `wish_history`, `config_error` UI, `option_help` WIZKIT,
`init_artifacts`, or newgame `notice_mon_off`. Filled D-1191
archive hash `cc7d0ef5`. Rotated #1499. Open 7 after archive
→ refill to 12. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1510** **44**/44; next
@**#1515**).
**Verified:** private canary **18**/18; green+strict
seed8000/0900; cohort **23**/23 (incl. wizard debug
0006/0108/0116/0360/0373/0398/2200/4500/5002/5006) + strict
lengths. Public-unhit unless a wizard session has WIZKIT= in
VFS.
**Next:** Open `dokick.c` `deliver_obj_to_mon` (named). Not
obj_delivery.
**Blocked:** none.

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
