# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
## 2026-08-19 02:44 — #1584 D-1249 container_impact_dmg

**Objective:** Open `hack.c` `container_impact_dmg` (named from
D-1229). Not hideunder. Queue said hack.c; C is `dokick.c`.
**C locus:** `dokick.c` `container_impact_dmg` `:409–485`; callers
`do.c:831` dropz `with_impact`; `dothrow.c:1830` throwit `!IS_SOFT`
at throw origin `u.ux,u.uy` (not bhitpos). Kick Is_box `:655`
already D-0989.
**Change:** export live helper; wire those two callers. Kick land
has no C call. hitfloor `dropz(TRUE)` still named. Rule #2: no fs.
**Verified:** private canary **19**/19; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless a container with glass/eggs is impact-dropped
or thrown onto hard terrain.
**Next:** Open `uhitm.c` AT_HUGS (named from D-1233). Not remaining
`pline_mon`.
**Blocked:** none.


**Objective:** Open `monmove.c` `mon_yells` (named). Not iron bars.
**C locus:** `monmove.c` `mon_yells` `:106–129`; `watch_on_duty`
`:186–189`; `dokick.c` watchman `:838–855`.
**Change:** Deaf spotted `pline_mon` angrily waves/shakes; else
`Amonnam` yells or You_hear someone yell then `verbalize1`.
SetVoice empty. Wire watch_on_duty + dokick watchman.
`gelcube_digests` / ALLOW_BARS rust still named. Rule #2: no fs.
**Verified:** private canary **16**/16; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless a peaceful watch yells at lockpick/kick.
**Next:** Open `hack.c` `container_impact_dmg` (named from D-1229).
Not hideunder.
**Blocked:** none.
## 2026-08-19 02:17 — #1582 D-1247 postmov IRONBARS

**Objective:** Open `monmove.c` postmov iron bars (named). Not
bee_eat.
**C locus:** `monmove.c` `postmov` `:1624–1640` else-if of door
arm; `dissolve_bars` `:2170–2178`.
**Change:** rust/corr/metallivore eat + `dissolve_bars` +
return MMOVE_DONE (skip `mdig_tunnel` rnd(12)); else verbose
`Norep` through/between; W_NONDIGGABLE skips eat. `mon_yells` /
ALLOW_BARS rust still named. Rule #2: no fs.
**Verified:** private canary **24**/24; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless a bars-eater or bars-passer `postmov`s
onto IRONBARS.
**Next:** Open `monmove.c` `mon_yells` (named). Not iron bars.
**Blocked:** none.
## 2026-08-19 02:05 — #1581 D-1246 bee_eat_jelly

**Objective:** Open `monmove.c` `bee_eat_jelly` (named). Not
mind_blast / iron bars.
**C locus:** `monmove.c` `find_pmmonst` `:374–388` /
`bee_eat_jelly` `:394–420` / dochug `:868–874`; `makemon.c`
`grow_up` killer-bee `!victim` → queen.
**Change:** no-queen eat (delay 3/5/7, split, `pline_mon`,
`delobj`, `grow_up` queen, freeze); live queen -1; geno
`mondied`. iron bars / `mon_yells` / `gelcube_digests` named.
Rule #2: no fs.
**Verified:** private canary **31**/31; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless a killer bee `dochug`s on jelly with no
living queen.
**Next:** Open `monmove.c` postmov iron bars (named). Not bee_eat.
**Blocked:** none.
## 2026-08-19 01:50 — #1580 review D-1242–D-1245 + cadence

**Objective:** audit — C-fidelity reviews **204–207** of JS SHAs
since `271e92e2`, plus full `sessions` score. No `js/` port.
**C locus:** `mhitm.c` gulpmm `snuff_lit` / `!goodpos` / AD_DGST
eat; `hack.c` hideunder after tread.
**Change:** four reviews, all **ACCEPT-WITH-DEBT**. No Must-fix
(named omits stay map: gulpmu invent; Medusa stone; NC_SHOW_MSG;
little_to_big; mimic unhide; container_impact; bee/bars/yells).
Filled D-1245 archive hash `6115dc58`. Open 10 (no refill).
Rule #2: no fs.
**Score:** cadence **#1580** HEAD `6115dc58` **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`36+0.29/turn` (R² 0.853). seed0383 PASS. Next audit @**#1585**.
**Verified:** `__RESULTS_JSON__` at HEAD `6115dc58`; branch-by-branch
vs pinned C (`snuff_lit` live `end_burn`; `goodpos` live;
`mondead` digest; `hideunder` youmonst live, not stubs).
**Next:** Open `monmove.c` `bee_eat_jelly` (named). Not hideunder.
**Blocked:** none.
## 2026-08-19 01:40 — #1579 D-1245 hideunder after tread

**Objective:** Open `hack.c` hideunder after impact (named from
D-1229). Not container_impact.
**C locus:** `hack.c` `domove_core` `:2949–2951` after tread
`:2944–2947`; `mon.c` `hideunder` youmonst `u.uundetected`.
**Change:** `hero_hideunder_after_move` after tread, before dest
`newsym`. `hides_under||S_EEL||dx||dy`. Mimic unhide /
container_impact named. Rule #2: no fs.
**Verified:** private canary **23**/23; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless Upolyd `hides_under`/eel or leftover
`u.uundetected`.
**Next:** Open `monmove.c` `bee_eat_jelly` (named). Not hideunder.
**Blocked:** none.
## 2026-08-19 01:23 — #1578 D-1244 gulpmm AD_DGST eat

**Objective:** Open `mhitm.c` gulpmm AD_DGST eat (named). Not
`!goodpos`.
**C locus:** `uhitm.c` `mhitm_ad_dgst` `:4506–4566` mhitm arm;
`mhitm.c` `mdamagem` `:1096–1116`; `mon.c` `monkilled`
disintegested; `mon_givit`; swallowed boom; `grow_up` null.
**Change:** instant digest + `mondead` (no corpse); cham/slime/
wraith `m_lev++`/nurse/`mon_givit`; tame `dog_nutrition`.
gulpmu invent / Medusa stone / NC_SHOW_MSG pline named. Rule #2:
no fs.
**Verified:** private canary **29**/29; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless AT_ENGL+AD_DGST magr gulps another mon.
**Next:** Open `hack.c` hideunder after impact (named from D-1229).
**Blocked:** none.
