# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-19 04:20 — #1590 review D-1250–D-1253 + cadence

**Objective:** audit — C-fidelity reviews **212–215** of JS SHAs
since `a0c40286`, plus full `sessions` score. No `js/` port.
**C locus:** `uhitm.c` hmonas AT_HUGS / `explum` / `demonpet`;
`hack.c` `cannot_push` giant pickup; `weapon.c` `special_dmgval`.
**Change:** **212 QUALITY-RISK** — hug grab/crush live, but
`special_dmgval` `mon_hates_silver` is M2_WERE|M2_DEMON only
(C `hates_silver` includes shade/vampire/imp). Must-fix prepend.
**213–215 ACCEPT-WITH-DEBT.** Filled D-1253 archive hash
`d384e339`. Cadence HEAD `d384e339` **44**/44 Scr **11405**
RNG **100%** speed `36+0.29/turn` (R² 0.854).
**Next:** Must-fix `weapon.c` `mon_hates_silver` (review **212**).
**Blocked:** none.

## 2026-08-19 04:05 — #1589 D-1253 cannot_push giant pickup

**Objective:** Open `hack.c` giant pickup/maneuver (named from
D-1239). Not cannot_push squeeze.
**C locus:** `hack.c` `cannot_push` `:264–301`; callees
`inv_cnt`, `carrying`, `pickup.c` `autopick_testobj`.
**Change:** `throws_rocks` vain-push no longer abort `-1`:
`canpickup`/`willpickup` plines easily-pick / maneuver-and-could /
maneuver; unskilled riding You skip `sokoban_guilt`; else guilt;
always `return 0` occupy. Squeeze D-1239 unchanged. nopick m-dir
still named. Rule #2: no fs.
**Verified:** private canary **29**/29; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless a `throws_rocks` hero vain-pushes a boulder.
**Next:** Open `objnam.c` glob / doname CXN_ARTICLE|CXN_NOCORPSE
(named from D-1234). Not unique/pname adjective.
**Blocked:** none.

## 2026-08-19 03:49 — #1588 D-1252 demonpet spawn

**Objective:** Open `makemon.c` `demonpet` spawn (named from
D-1233). Not AT_EXPL.
**C locus:** `uhitm.c` `demonpet` `:2133–2145`; `damageum`
`:4848–4851`; callees `minion.c` `ndemon`, `makemon.c`
`makemon` NO_MM_FLAGS, `dog.c` `tamedog` null FALSE,
`attrib.c` `exercise(A_WIS)`.
**Change:** unarmed M2_DEMON poly (not succubus/balrog) 1/13
now plines hell-p, 1/6 `ndemon` else clone of `youmonst.data`,
`makemon`+`tamedog`+appear_msg, then WIS exercise and MISS.
AT_ENGL / fight_empty / altwep still named. Rule #2: no fs.
**Verified:** private canary **24**/24; green+strict seed8000/0900;
cohort **9**/9 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless a public session Upolyd-melees as a demon
unarmed.
**Next:** Open `hack.c` giant pickup/maneuver (named from D-1239).
Not cannot_push.
**Blocked:** none.

## 2026-08-19 03:35 — #1587 D-1251 hmonas AT_EXPL explum

**Objective:** Open `uhitm.c` AT_EXPL (named from D-1233). Not
AT_HUGS.
**C locus:** `uhitm.c` `explum` `:4891–4928`; `hmonas` AT_EXPL
`:5762–5767`; post-switch `dhit==-1` `:5821–5824`; `explode.c`
`adtyp_to_expltype`.
**Change:** poly AT_EXPL no longer `continue`s like AT_NONE:
wakeup, `You explode!`, `explum` (BLND/HALU + COLD/FIRE/ELEC
you-caused `explode`), then `mh=-1` `rehumanize` before
passive. fight_empty `explum` / AT_ENGL still named. Rule #2:
no fs.
**Verified:** private canary **42**/42; green+strict seed8000/0900;
cohort **9**/9 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless a public session Upolyd-explodes.
**Next:** Open `makemon.c` `demonpet` spawn (named from D-1233).
Not AT_EXPL.
**Blocked:** none.

## 2026-08-19 03:22 — #1586 D-1250 hmonas AT_HUGS

**Objective:** Open `uhitm.c` AT_HUGS (named from D-1233). Not
remaining `pline_mon`.
**C locus:** `uhitm.c` `hmonas` AT_HUGS `:5671–5759`; `do_attack`
`notonhead` `:518–520`; `weapon.c` `special_dmgval`/`silver_sears`;
`mondata.c` `can_be_strangled`/`sticks`; `polyself.c` `uunstick`.
**Change:** poly hug grab/crush/throttle (skip holders/swallow/
notonhead/byhand+uwep via continue); `special_dmgval` callee;
`do_attack` sets `notonhead`. AT_EXPL/ENGL still named. Rule #2:
no fs.
**Verified:** private canary **35**/35; green+strict seed8000/0900;
cohort **9**/9 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless a public session Upolyd-hugs.
**Next:** Open `uhitm.c` AT_EXPL (named from D-1233). Not AT_HUGS.
**Blocked:** none.

## 2026-08-19 03:00 — #1585 review D-1246–D-1249 + cadence

**Objective:** audit — C-fidelity reviews **208–211** of JS SHAs
since `e86c2788`, plus full `sessions` score. No `js/` port.
**C locus:** `monmove.c` `bee_eat_jelly`/`find_pmmonst`/`grow_up`
bee `!victim`; postmov IRONBARS; `mon_yells`; `dokick.c`
`container_impact_dmg` dropz/throwit.
**Change:** four reviews, all **ACCEPT-WITH-DEBT**. No Must-fix
(named omits stay map: `little_to_big`; `gelcube_digests`;
ALLOW_BARS rust; `switch_terrain`; `watch_dig`; hitfloor
`dropz(TRUE)`). Filled D-1249 archive hash `7f54b762`. Open 11
(no refill). Rule #2: no fs.
**Score:** cadence **#1585** HEAD `7f54b762` **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`36+0.29/turn` (R² 0.852). seed0383 PASS. Next audit @**#1590**.
**Verified:** `__RESULTS_JSON__` at HEAD `7f54b762`; branch-by-branch
vs pinned C (`grow_up` bee arm live `set_mon_data`; `dissolve_bars`
live; `Amonnam`/`verbalize` live; helper D-0989 not a stub).
**Next:** Open `uhitm.c` AT_HUGS (named from D-1233). Not remaining
`pline_mon`.
**Blocked:** none.
