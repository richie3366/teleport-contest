# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-18 23:48 — #1571 D-1238 mind_blast

**Objective:** Open `monmove.c` `mind_blast` (named). Not
msg_mon_movement.
**C locus:** `monmove.c` `mind_blast` `:581–645`; `dochug`
`:827–835`.
**Change:** port body (`pline_mon` concentrates; far You-sense
return; soothing vs lock-on + Half_spell `losehp`; fmon nmon
`wakeup`/`rnd(15)`/`monkilled("", AD_DRIN)`) then `set_apparxy`/
`distfleeck`. bee_eat / iron bars / `mon_yells` named. Rule #2:
no fs.
**Verified:** private canary **31**/31; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless a mind flayer `dochug`s with `!rn2(20)`.
**Next:** Open `hack.c` cannot_push squeeze (named from D-1226).
Not run>=2 boulder. Refill Open to 12.
**Blocked:** none.

## 2026-08-18 23:40 — #1570 review D-1234–D-1237 + cadence

**Objective:** audit — C-fidelity reviews **196–199** of JS SHAs
since `824201ab`, plus full `sessions` score. No `js/` port.
**C locus:** `objnam.c` `corpse_xname` unique/pname; `optlist.h`
`spot_monsters`/`mon_movement` addrs; `trap.c` `launch_obj`
TELEP/LEVEL_TELEP.
**Change:** four reviews, all **ACCEPT-WITH-DEBT**. No Must-fix
(named omits stay map: glob/doname CXN, remaining optfn after-change,
landmine/pit/`flooreffects`). Filled D-1237 archive hash
`d81367e2`. Open 8 (no refill). Rule #2: no fs.
**Score:** cadence **#1570** HEAD `d81367e2` **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`35+0.30/turn` (R² 0.856). seed0383 PASS. Next audit @**#1575**.
**Verified:** `__RESULTS_JSON__` at HEAD `d81367e2`; branch-by-branch
vs pinned C (`corpse_xname` live; notice_mon/msg_mon_movement live
addrs; `rloco`/migrate live, not stubs).
**Next:** Open `monmove.c` `mind_blast` (named). Not
msg_mon_movement.
**Blocked:** none.

## 2026-08-18 23:30 — #1569 D-1237 rolling-boulder TELEP pline_xy

**Objective:** Open `teleport.c` rolling-boulder TELEP `pline_xy`
(named). Not `#teleport`.
**C locus:** `trap.c` `launch_obj` 3423–3508 TELEP/LEVEL_TELEP;
`teleport.c` `rloco` 2100 / `random_teleport_level`.
**Change:** ROLL boulder `t_at` TELEP `pline_xy` (cansee) else
`You_hear`; `rloco` or migrate+`get_level`; LEVEL_TELEP same-depth
skip. Did not pull landmine/pit/`flooreffects`. Filled D-1236
archive hash `5c860b0e`. Open 8 after archive (no refill). Rule #2:
no fs.
**Score:** fortress unchanged (cadence **#1565** **44**/44; next
audit @**#1570**).
**Verified:** private canary **18**/18; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
Public-unhit unless a rolling boulder crosses TELEP.
**Next:** Open `monmove.c` `mind_blast` (named). Not
msg_mon_movement.
**Blocked:** none.

## 2026-08-18 23:20 — #1568 D-1236 mon_movement → a11y.mon_movement

**Objective:** Open `options.c` `optlist` `&a11y.mon_movement`
(named). Not spot_monsters.
**C locus:** `optlist.h` 493–494 `NHOPTB(mon_movement, … Off, …,
&a11y.mon_movement)`; `options.c` `optfn_boolean` 5286 no
after-change arm.
**Change:** doset/`OPTIONS=` write `a11y.mon_movement`; colon
true/yes/on/1; jsmain rc apply. Did not pull rolling-boulder
TELEP `pline_xy`. Filled D-1235 archive hash `f631610d`. Open 9
after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1565** **44**/44; next
audit @**#1570**).
**Verified:** private canary **35**/35; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
Public-unhit unless `mon_movement` On (default Off).
**Next:** Open `teleport.c` rolling-boulder TELEP `pline_xy`
(named). Not `#teleport`.
**Blocked:** none.

## 2026-08-18 23:15 — #1567 D-1235 spot_monsters → a11y.mon_notices

**Objective:** Open `options.c` `optlist` `&a11y.spot_monsters`
(named). Not glyph_updates.
**C locus:** `optlist.h` 708–710 `NHOPTB(spot_monsters, … Off, …,
&a11y.mon_notices)`; `options.c` `optfn_boolean` 5286 no
after-change arm.
**Change:** doset/`OPTIONS=` write `a11y.mon_notices`; colon
true/yes/on/1; jsmain rc apply. Did not wire `mon_movement`.
Filled D-1234 archive hash `e0ea385e`. Open 10 after archive
(no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1565** **44**/44; next
audit @**#1570**).
**Verified:** private canary **36**/36; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
Public-unhit unless `spot_monsters` On (default Off).
**Next:** Open `options.c` `optlist` `&a11y.mon_movement`
(named). Not spot_monsters.
**Blocked:** none.

## 2026-08-18 23:05 — #1566 D-1234 unique/pname corpse_xname adjective

**Objective:** Open `do.c` `revive_corpse` unique/pname
`corpse_xname` adjective (named). Not Soundeffect.
**C locus:** `objnam.c` `corpse_xname` 1824–1919; `do.c`
`revive_corpse` 2131–2133; `dig.c` `rot_corpse` 2158 CXN_NO_PFX.
**Change:** unique/pname `s_suffix` + adjective after possessive;
`revive_corpse` passes `"bite-covered"`; `rot_corpse` CXN_NO_PFX.
Did not wire glob / doname CXN_ARTICLE|CXN_NOCORPSE. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1565** **44**/44; next
audit @**#1570**).
**Verified:** private canary **45**/45; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
Public-unhit unless a unique/pname corpse revives.
**Next:** Open `options.c` `optlist` `&a11y.spot_monsters`
(named). Not glyph_updates.
**Blocked:** none.
