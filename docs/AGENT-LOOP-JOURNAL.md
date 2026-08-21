# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-21 — review D-1338–D-1341 (audit #1700)

**Objective:** audit — C-fidelity reviews **300–303** of JS SHAs
since `38b3ff39`, plus full `sessions` score. No `js/` port.
**C locus:** `mhitm.c` gazemm / explmm / AT_HUGS; `uhitm.c`
`shade_miss` + `hitmm`.
**Change:** **300–303** ACCEPT-WITH-DEBT. No Must-fix. Filled
D-1341 archive hash `e3a30202`. Cadence **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`36+0.29/turn` (R² 0.85) at `e3a30202`. Rule #2: no fs.
**Score:** fortress held. Next audit @**#1705**.
**Verified:** `node frozen/ps_test_runner.mjs sessions` (this iter).
**Next:** Open `artifact.c` `arti_reflects` W_WEP (named from
D-1328). Not gazemu.
**Blocked:** none.
## 2026-08-21 — D-1341 uhitm.c shade_miss + hitmm

**Objective:** Open `mhitm.c` hitmm `shade_miss` (named from D-0887).
Not AT_HUGS.
**C locus:** `uhitm.c` `shade_miss` `:2016–2051`; caller `mhitm.c`
`hitmm` `:659–661`.
**Change:** unarmed (and dmgval-0) melee vs a shade returns
`M_ATTK_MISS` with harmlessly-through and wakes. `dmgval`
shade/`shade_glare` still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1700**.
**Verified:** canary **13**/13; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `artifact.c` `arti_reflects` W_WEP (named from
D-1328). Not gazemu.
**Blocked:** none.
## 2026-08-21 — D-1340 mhitm.c AT_HUGS

**Objective:** Open `mhitm.c` AT_HUGS (named from D-1327). Not explmm.
**C locus:** `mhitm.c` `mattackm` `:476–490`; `hitmm` `:691–695`.
**Change:** AT_HUGS no longer falls through `mattackm` default.
Auto-hit iff prev two slots are exact `M_ATTK_HIT`; `failed_grab`
else `hitmm` with no weapon. Vis `"squeezes"` unless
`magr==u.ustuck`. `shade_miss` named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1700**.
**Verified:** canary **12**/12; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `mhitm.c` hitmm `shade_miss` (named from D-0887).
Not AT_HUGS.
**Blocked:** none.
## 2026-08-21 — D-1339 mhitm.c explmm

**Objective:** Open `mhitm.c` explmm (named from D-1326). Not gazemm.
**C locus:** `mhitm.c` `explmm` `:970–1010`; caller `mattackm`
AT_EXPL `:497–508`; callee `mdamagem` + `mhitm_ad_halu` mhitm
`:3911–3919`.
**Change:** AT_EXPL no longer falls through `mattackm` default.
`mcan` miss; cansee explodes else noises; FIRE/COLD/ELEC
`mon_explodes`; else mdamagem then mondead; tame melancholy;
leashed slack. AT_HUGS / `shade_miss` named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1700**.
**Verified:** canary **33**/33; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `mhitm.c` AT_HUGS (named from D-1327). Not explmm.
**Blocked:** none.
## 2026-08-21 — D-1338 mhitm.c gazemm

**Objective:** Open `mhitm.c` gazemm (named from D-1328). Not AD_WRAP.
**C locus:** `mhitm.c` `gazemm` `:736–803`; caller `mattackm`
AT_GAZE `:492–495`; callee `uhitm.c` `mhitm_ad_blnd` mhitm
`:2986–3011`.
**Change:** AT_GAZE no longer falls through `mattackm` default.
Vis gaze pline; cancelled/blind-target/invis/sleep miss; Medusa
reflect stones magr; Archon extra blind + `rn2(2)` stun then
mdamagem leftover dice zero. explmm / AT_HUGS / `shade_miss` /
ston/conf/stun/fire leftover named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1700**.
**Verified:** canary **18**/18; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `mhitm.c` explmm (named from D-1326). Not gazemm.
**Blocked:** none.
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
