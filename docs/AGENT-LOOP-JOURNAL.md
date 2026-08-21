# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-21 — review D-1334–D-1337 (audit #1695)

**Objective:** C-fidelity review of JS SHAs since
`reviews/loop-unattended/` `1eef5d0c`, plus full `sessions` score.
**C locus:** `mthrowu.c:849–965` / `objnam.c:1942–2005` /
`mon.c:3998–4017` / `apply.c:1518–1572` vs `487daa2f` `31d32cad`
`a7ac5e52` `2bd70a77`.
**Change:** reviews **296–299** ACCEPT-WITH-DEBT; no Must-fix.
Filled archive D-1337 `2bd70a77`. Next Open gazemm. No `js/` edits.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
(100%) speed `36+0.30/turn` (R² 0.84) at `2bd70a77`. Next audit
@**#1700**.
**Verified:** `node frozen/ps_test_runner.mjs sessions` this iter.
**Next:** Open `mhitm.c` gazemm (named from D-1328). Not AD_WRAP.
**Blocked:** none.
## 2026-08-21 — D-1337 apply.c splash_lit

**Objective:** Open `apply.c` `splash_lit` (named from D-1242). Not
snuff_candle.
**C locus:** `apply.c` `splash_lit` `:1518–1572`; callers `trap.c`
`water_damage` `:4722` and rust-trap walks `:1632–1636` / `:1697–1701`.
**Change:** live `splash_lit` in `apply.js` — brass lantern rust-trap
stays lit (crackle/flicker); dunk snuffs then drains age; other lit
lamps/candles go through `snuff_lit`/`end_burn`. trap.js stub
`lamplit=0` replaced with dynamic import. gulpmu invent / gulpum /
litroom / pickup still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1695**.
**Verified:** canary **30**/30; green+strict seed8000/0900; cohort
**7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `mhitm.c` gazemm (named from D-1328). Not AD_WRAP.
**Blocked:** none.
## 2026-08-21 — D-1336 mon.c maybe_mnexto + dokick evade

**Objective:** Open `dokick.c` `maybe_mnexto` evade (named from
D-1310). Not kickstr.
**C locus:** `mon.c` `maybe_mnexto` `:3998–4017`; caller
`dokick.c` `kick_monster` `:267–285`.
**Change:** evade now calls `maybe_mnexto` (20× enexto+couldsee+
NODIAG `rloc_to`, no montelecontrol) and returns with the
teleports/floats/swoops/slides/jumps pline when the monster
moves. Stay-put still `kickdmg`. `abuse_dog` / knockback /
`kickstr` named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1695**.
**Verified:** canary **17**/17; green+strict seed8000/0900;
cohort **7**/7 + seed0060 kick + strict.
**Next:** Open `apply.c` `splash_lit` (named from D-1242). Not
snuff_candle.
**Blocked:** none.
## 2026-08-21 — D-1335 objnam.c killer_xname (dokick kickobjnam)

**Objective:** Open `dokick.c` `killer_xname` (kickobjnam still
xname). Not special_dmgval.
**C locus:** `objnam.c` `killer_xname` `:1942–2005`; callers
`dokick.c` `kick_object` `:498` and petrify `:551–554`.
**Change:** kickobjnam and barefoot petrify now use
`killer_xname` (full ID, article, corpse type, slime mold
"deadly", restore). `kickstr` still named. Remaining eat/zap/
dothrow callers named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1695**.
**Verified:** canary **29**/29; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `dokick.c` `maybe_mnexto` evade (named from
D-1310). Not kickstr.
**Blocked:** none.
## 2026-08-21 — D-1334 mthrowu.c return_from_mtoss snuff_candle

**Objective:** Open `mthrowu.c` `snuff_candle` (C `:942` notcaught
land). Not throwit land.
**C locus:** `mthrowu.c` `return_from_mtoss` `:942`; callee
`apply.c` `snuff_candle` `:1472–1491`; caller `m_throw` `:829`.
**Change:** notcaught return land now snuffs candles/candelabrum
before `ship_object`/`flooreffects("drop")`. Tethered AKLYS
`m_throw` sets `return_flightpath` instead of `drop_throw`.
Lamps stay lit. `thrwmu` always_toss / polearm still named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1695**.
**Verified:** canary **17**/17; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `dokick.c` `killer_xname` (kickobjnam still xname).
Not special_dmgval.
**Blocked:** none.
## 2026-08-21 — #1690 review D-1330–D-1333 + cadence

**Objective:** audit — C-fidelity reviews **292–295** of JS SHAs
since `6b844816`, plus full `sessions` score. No `js/` port.
**C locus:** `uhitm.c` mhitm AD_DRIN; mhitu AD_WRAP; `dokick.c`
kickdmg `special_dmgval`; `dothrow.c` throwit land `snuff_candle`.
**Change:** **292–295** ACCEPT-WITH-DEBT. No Must-fix. Filled
D-1333 archive hash `b82375a7`. Cadence **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`37+0.30/turn` (R² 0.85) at `b82375a7`. Rule #2: no fs.
**Score:** fortress held. Next audit @**#1695**.
**Verified:** `node frozen/ps_test_runner.mjs sessions` (this iter).
**Next:** Open `mthrowu.c` `snuff_candle` (C `:942` notcaught
land). Not throwit land.
**Blocked:** none.
## 2026-08-21 — D-1333 dothrow.c throwit land snuff_candle

**Objective:** Open `dothrow.c` throwit land `snuff_candle` (C
`:1818`). Not mthrowu.
**C locus:** `dothrow.c` `throwit` `:1818`; callee `apply.c`
`snuff_candle` `:1472–1491`.
**Change:** a thrown lit candle/candelabrum that misses now
snuffs before `ship_object`/`place_object`. Lamps stay lit.
mthrowu `:942` still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1690**.
**Verified:** canary **16**/16; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `mthrowu.c` `snuff_candle` (C `:942` notcaught
land). Not throwit land.
**Blocked:** none.
## 2026-08-21 — D-1332 dokick.c kickdmg special_dmgval

**Objective:** Open `dokick.c` kickdmg `special_dmgval` (named
from D-1310). Not snuff_candle.
**C locus:** `dokick.c` `kickdmg` `:56` / `:90`; callee
`weapon.c` `special_dmgval`.
**Change:** a blessed-boot kick now rolls `rnd(4)` vs
undead/demon and can hurt a shade. JS no longer stubs
`specialdmg = 0`. `maybe_mnexto` / `abuse_dog` still named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1690**.
**Verified:** canary **18**/18; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `dothrow.c` throwit land `snuff_candle` (C
`:1818`). Not mthrowu.
**Blocked:** none.
## 2026-08-21 — D-1331 mhitu.c AD_WRAP

**Objective:** Open `mhitu.c` `u_slip_free` AD_WRAP (named from
D-1307). Not AD_DRIN.
**C locus:** `uhitm.c` `mhitm_ad_wrap` mhitu `:3376–3417`; callee
`mhitu.c` `u_slip_free`; caller `mhitm_adtyping`.
**Change:** an eel/python wrap now slips, grabs (coil/swing),
drowns in a pool, crushes on AT_HUGS, or brushes (verbose). JS
no longer zeros AD_WRAP in `mhitm_adtyping_u`. uhitm/mhitm wrap
arms still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1690**.
**Verified:** canary **23**/23; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `dokick.c` kickdmg `special_dmgval` (named from
D-1310). Not snuff_candle.
**Blocked:** none.
## 2026-08-21 — D-1330 mhitm.c AD_DRIN

**Objective:** Open `mhitm.c` AD_DRIN (named from D-1307). Not mhitu.
**C locus:** `uhitm.c` `mhitm_ad_drin` mhitm `:3272–3301`; `mhitm.c`
`mattackm` AT_TENT `:425`; `hitmm` tentacles suck; `eat_brains`.
**Change:** a mind-flayer tentacle now eats another monster's brain
(headless skipdrin, helm `W_ARMH&&rn2(8)` literal helmet,
`eat_brains(gv.vis)`, lifsav skipdrin). `mattackm` AT_TENT no
longer falls out of the switch. AD_WRAP still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1690**.
**Verified:** canary **14**/14; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `mhitu.c` `u_slip_free` AD_WRAP (named from D-1307).
**Blocked:** none.
## 2026-08-21 — #1685 review D-1326–D-1329 + cadence

**Objective:** audit — C-fidelity reviews **288–291** of JS SHAs
since `7fcaa15e`, plus full `sessions` score. No `js/` port.
**C locus:** `mhitu.c` explmu / AT_EXPL; `mattacku` AT_HUGS +
`u_slip_free`; `gazemu` / AT_GAZE; `uhitm.c` `mhitm_ad_drin` mhitu.
**Change:** **288–291** ACCEPT-WITH-DEBT. No Must-fix. Filled
D-1329 archive hash `a7a5a835`. Cadence **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`37+0.30/turn` (R² 0.84) at `a7a5a835`. Rule #2: no fs.
**Score:** fortress held. Next audit @**#1690**.
**Verified:** `node frozen/ps_test_runner.mjs sessions` (this iter).
**Next:** Open `mhitm.c` AD_DRIN (named from D-1307). Not mhitu.
**Blocked:** none.
## 2026-08-21 — D-1329 mhitu.c AD_DRIN

**Objective:** Open `mhitu.c` AD_DRIN (named from D-1309). Not gazemu.
**C locus:** `uhitm.c` `mhitm_ad_drin` mhitu `:3222–3271`; callees
`eat_brains`, `u_slip_free`, `losespells`, `drain_weapon_skill`,
`adjattrib` dunce. Caller `mhitm_adtyping_u`.
**Change:** a mind-flayer tentacle now drains (hitmsg, headless
skipdrin, greased helm slip, `uarmh` `rn2(8)` hat/helm, Half then
`mdamageu` and zero leftover dice, `eat_brains` unless dunce,
`adjattrib(A_INT,-rnd(2),FALSE)`, 1/5 spells / 1/5 skill). mhitm
AD_DRIN still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1685**.
**Verified:** canary **19**/19; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `mhitm.c` AD_DRIN (named from D-1307). Not mhitu.
**Blocked:** none.
## 2026-08-21 — D-1328 mhitu.c gazemu

**Objective:** Open `mhitu.c` gazemu (named from D-1314). Not explmu.
**C locus:** `mhitu.c` `gazemu` `:1668–1898`; `mattacku` AT_GAZE
`:832–837`; `mon.c` `m_respond_medusa` `:4109–4118`.
**Change:** AT_GAZE now gazes (skip Medusa in `mattacku`;
`m_respond_medusa` dynamic-imports `gazemu`). AD_STON
reflect/stone, CONF/STUN/BLND/FIRE, cancelled looks-X, Hallu
`rn2(4)`. BEHOLDER AD_SLEE/AD_SLOW stay compiled out. mhitu
AD_DRIN still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1685**.
**Verified:** canary **20**/20; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `mhitu.c` AD_DRIN (named from D-1309). Not gazemu.
**Blocked:** none.
## 2026-08-21 — D-1327 mhitu.c mattacku AT_HUGS

**Objective:** Open `mhitu.c` AT_HUGS (named). Not explmu.
**C locus:** `mhitu.c` `mattacku` AT_HUGS `:823–830`; `u_slip_free`
`:1045–1085`; `uhitm.c` `mhitm_ad_phys` mhitu `:4023–4037`.
**Change:** hug auto-hits after two prior successes or while
ustuck; `failed_grab` pline; `rn2(2)` grab / `u_slip_free` /
crush; rope golem choke. gazemu / AD_WRAP caller still named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1685**.
**Verified:** canary **27**/27; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `mhitu.c` gazemu (named from D-1314). Not explmu.
**Blocked:** none.
## 2026-08-21 — D-1326 mhitu.c explmu + mattacku AT_EXPL

**Objective:** Open `mhitu.c` explmu (named). Not AT_HUGS.
**C locus:** `mhitu.c` `explmu` `:1591–1664`; `mattacku` AT_EXPL
`:839–842`.
**Change:** adjacent AT_EXPL now explodes (`mcan` miss before `d()`,
thin-air/`empty water` vs `hitmsg`, elemental `mon_explodes`,
BLND visible skip-`rnd`, HALU kaleidoscope/`mondead`,
`ugolemeffects`, `wake_nearto 7*7`). `defended` / gazemu / AT_HUGS
still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1685**.
**Verified:** canary **29**/29; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `mhitu.c` AT_HUGS (named). Not explmu.
**Blocked:** none.
