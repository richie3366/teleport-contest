# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
