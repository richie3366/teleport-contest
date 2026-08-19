# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-19 09:25 — D-1261 mhitu.c hitmsg

**Objective:** Open `mhitu.c` `hitmsg` (named from D-1240). Not
remaining uhitm `pline_mon`.
**C locus:** `mhitu.c` `hitmsg` `:29–81`. Callee `pline_mon`.
`hacklib.c` `s_suffix`; `mondata.h` `thick_skinned`.
**Change:** `pline`→`pline_mon`; AT_TENT `s_suffix` tentacles;
AT_EXPL/BOOM explodes; AT_KICK thick_skinned punct ".". Rule #2:
no fs.
**Verified:** private canary **19**/19; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless `accessiblemsg` On or AT_TENT/EXPL/BOOM /
thick-skinned kick (default Tourist human).
**Next:** Open `hack.c` nopick `m<dir>` over/against (named from
D-1253). Not giant pickup.
**Blocked:** none.
## 2026-08-19 08:53 — D-1260 hack.c mimic unhide

**Objective:** Open `hack.c` mimic unhide (named from D-1245). Not
hideunder.
**C locus:** `hack.c` `domove_core` `:2953–2960` after hideunder
before `check_leash`. `monst.h` `U_AP_TYPE` = `m_ap_type &
M_AP_TYPMASK`.
**Change:** `(dx||dy)` + OBJECT/FURNITURE → `m_ap_type=M_AP_NOTHING`
(not `seemimic`; mappearance leftover). After hideunder, before dest
`newsym`. Rule #2: no fs.
**Verified:** private canary **15**/15; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless the hero steps while `U_AP_TYPE` is
furniture/object (eat-mimic gold / `#monster`).
**Next:** Open `mhitu.c` `hitmsg` (named from D-1240). Not remaining
uhitm `pline_mon`.
**Blocked:** none.
## 2026-08-19 08:42 — #1597 D-1259 dissolve_bars switch_terrain

**Objective:** Open `hack.c` `switch_terrain` from `dissolve_bars`
(named from D-1247). Not ALLOW_BARS.
**C locus:** `monmove.c` `dissolve_bars` `:2170–2178`; callers
`still_chewing` / `postmov` / `zap.c` / `hit_bars`; body
`hack.c` `switch_terrain` `:3178–3217`.
**Change:** after `newsym`, `u_at` awaits live `switch_terrain`.
Callers await. IRONBARS is not `IS_OBSTRUCTED`. Rule #2: no fs.
**Verified:** private canary **18**/18; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless bars dissolve on the hero cell.
**Next:** Open `hack.c` mimic unhide (named from D-1245). Not
hideunder.
**Blocked:** none.
## 2026-08-19 07:40 — #1596 D-1258 ALLOW_BARS passes_bars

**Objective:** Open `monmove.c` ALLOW_BARS rust/corr/metallivore
(named from D-1247). Not gelcube. Recover iter-1596
`resource_exhausted` before commit.
**C locus:** `mondata.c` `passes_bars` `:552–563`; `mon.c`
`mon_allowflags` `:2104–2109`; `mfndpos` `:2225–2230`.
**Change:** export `passes_bars`/`dmgtype`/`slithy`; ALLOW_BARS from
C predicate + ustuck unsolid/verysmall subset; rust/corr skip
W_NONDIGGABLE bars. Hero `test_move` / `switch_terrain` named.
Rule #2: no fs.
**Verified:** private canary **40**/40; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless a bars-passer `mfndpos`s toward IRONBARS.
**Next:** Open `hack.c` `switch_terrain` from `dissolve_bars` (named
from D-1247). Not ALLOW_BARS.
**Blocked:** none.
## 2026-08-19 05:20 — #1595 review D-1254–D-1257 + cadence

**Objective:** audit — C-fidelity reviews **216–219** of JS SHAs
since `218836ee`, plus full `sessions` score. No `js/` port.
**C locus:** `mondata.c` `hates_silver`; `objnam.c` glob/doname CXN;
`trap.c` `launch_obj` LANDMINE/PIT; `monmove.c` `gelcube_digests`.
**Change:** four reviews, all **ACCEPT-WITH-DEBT**. No Must-fix
(review **212** silver clone shipped as D-1254; named omits stay
map: `dmgval` silver; EGG/MEAT_RING; `down_gate`; scatter
MAY_FRACTURE; `meatobj`/meatbox/poly). Filled D-1257 archive hash
`466adf3e`. Open 9 (no refill). Rule #2: no fs.
**Score:** cadence **#1595** HEAD `466adf3e` **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`40+0.33/turn` (R² 0.854). seed0383 PASS. Next audit @**#1600**.
**Verified:** `__RESULTS_JSON__` at HEAD `466adf3e`; branch-by-branch
vs pinned C (`hates_silver` mndx; doname skip-article + CXN;
LANDMINE `rn2(10)>2` live `fracture_rock`; gelcube extract+`delobj`).
**Next:** Open `monmove.c` ALLOW_BARS rust/corr/metallivore (named
from D-1247). Not gelcube.
**Blocked:** none.
## 2026-08-19 05:10 — #1594 D-1257 gelcube_digests

**Objective:** Open `monmove.c` `gelcube_digests` (named from D-1246).
Not `mon_yells`.
**C locus:** `monmove.c` `gelcube_digests` `:422–445`; `dochug`
`:876–878`; `worn.c` `extract_from_minvent`; `mon.c` `m_consume_obj`.
**Change:** first organic non-artifact non-prize minvent;
`eaten_stat` + extract + non-pet `healmon(oc_weight)`/`delobj`.
Prize `obj.h` macros. `meatobj` / meatbox / poly named. Rule #2: no fs.
**Verified:** private canary **40**/40; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless a cube `dochug`s with digestible minvent.
**Next:** Open `monmove.c` ALLOW_BARS rust/corr/metallivore (named from
D-1247). Not gelcube.
**Blocked:** none.
## 2026-08-19 04:55 — #1593 D-1256 landmine·pit mid-roll

**Objective:** Open `trap.c` landmine·pit mid-roll (named from
D-1237). Not rolling-boulder TELEP.
**C locus:** `trap.c` `launch_obj` `:3436–3507` LANDMINE / PIT /
SPIKED_PIT / HOLE / TRAPDOOR; `do.c` `flooreffects` boulder+pit;
`zap.c` `fracture_rock`.
**Change:** ROLL + BOULDER + `t_at`: LANDMINE `rn2(10)>2` `set_msg_xy`
then KAABLAMM / `deltrap` / `fracture_rock` / `scatter`; pit family
`flooreffects("fall")` + `dist=-1`. TELEP D-1237 unchanged.
down_gate / boulder-chain / post-switch flooreffects still named.
Rule #2: no fs.
**Verified:** private canary **23**/23; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless a rolling boulder crosses a landmine or pit.
**Next:** Open `monmove.c` `gelcube_digests` (named from D-1246).
Not `mon_yells`.
**Blocked:** none.
## 2026-08-19 04:45 — #1592 D-1255 glob / doname CXN

**Objective:** Open `objnam.c` glob / doname CXN_ARTICLE|CXN_NOCORPSE
(named from D-1234). Not unique/pname adjective.
**C locus:** `objnam.c` `corpse_xname` `:1841–1900`; `xname_flags`
FOOD_CLASS `:783–789`; `doname_base` `:1288–1291` / `:1507–1523`.
**Change:** glob `OBJ_NAME` + skip omit_corpse; xname small/medium/
large/very large from owt; doname skip article on CORPSE and
`corpse_xname(prefix, CXN_ARTICLE|CXN_NOCORPSE)` so unique/pname
invent is possessive. EGG / MEAT_RING still named. Rule #2: no fs.
**Verified:** private canary **45**/45; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless a public session shows a glob or unique/pname
corpse in invent.
**Next:** Open `trap.c` landmine·pit mid-roll (named from D-1237).
Not rolling-boulder TELEP.
**Blocked:** none.
## 2026-08-19 04:30 — #1591 D-1254 hates_silver

**Objective:** Must-fix `weapon.c` `special_dmgval` `mon_hates_silver`
= C `hates_silver` (review **212**). Not glob/doname.
**C locus:** `mondata.c` `hates_silver` `:524–528` /
`mon_hates_silver` `:517–519`; callers `weapon.c` `special_dmgval`
`:401–422` / `select_hwep` `:734–735`; `muse.c` whip yank.
**Change:** canonical `hates_silver`/`mon_hates_silver` in
`monsters.js` (were / S_VAMPIRE / demon / shade / S_IMP except tengu
+ `is_vampshifter`). Deleted `M2_WERE|M2_DEMON` clones in
`weapon.js`/`muse.js`. Did not pull `dmgval` silver or AT_ENGL.
Rule #2: no fs.
**Verified:** private canary **21**/21; green+strict seed8000/0900;
cohort **9**/9 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless a public session hugs a shade with silver
or a shade/vampire/imp selects a silver hwep.
**Next:** Open `objnam.c` glob / doname CXN_ARTICLE|CXN_NOCORPSE
(named from D-1234). Not unique/pname adjective.
**Blocked:** none.
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
