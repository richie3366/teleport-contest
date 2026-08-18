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
