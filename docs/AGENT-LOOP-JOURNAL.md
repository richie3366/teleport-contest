# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).

## 2026-08-21 — D-1385 mhitm.c mdamagem AD_CONF leftover

**Objective:** Open `mhitm.c` `mdamagem` AD_CONF leftover
(named from D-1352). Not STON.
**C locus:** `uhitm.c` `mhitm_ad_conf` mhitm `:3713–3724`;
caller `mhitm.c` `mdamagem` `:1059`.
**Change:** `!mcan && !mconf && !mspec_used` vis
`"looks confused."` + `mconf=1` + clear WAITFORU; leftover
`d()` kept. uhitm/mhitu named. STUN/FIRE leftover named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session has vis mon-vs-mon AD_CONF).
**Verified:** private canary **12**/12; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` unskilled SPE_FIREBALL/CONE FALLTHROUGH
weffects (named from D-1378). Not skilled scatter.
**Blocked:** none.

## 2026-08-21 — D-1384 uhitm.c hmon shade_miss

**Objective:** Open `uhitm.c` `hmon` `shade_miss` caller (named from
D-1354). Not zap.
**C locus:** `uhitm.c` `hmon_hitmon` `:1812–1822` + barehands
`:842–844`; callee `shade_miss` `:2016–2051` (JS `mhitm.js`).
**Change:** melee/applied `dmg<1` shade
`shade_miss(youmonst,mon,obj,FALSE,TRUE)`; unarmed shade dmg 0.
Thrown/kicked skip (D-1383). `mhitm_ad_phys` named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session melees a shade with a non-glare weapon).
**Verified:** private canary **17**/17; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `mhitm.c` `mdamagem` AD_CONF leftover (named from
D-1352). Not STON.
**Blocked:** none.

## 2026-08-21 — D-1383 zap.c bhit shade_miss

**Objective:** Open `zap.c` `shade_miss` caller (named from
D-1354). Not mthrowu.
**C locus:** `zap.c` `bhit` `:3972–3992`; callee
`uhitm.c` `shade_miss` `:2016–2051` (JS `mhitm.js`).
**Change:** thrown/kicked `shade_miss(youmonst,mtmp,obj,TRUE,TRUE)`
clears mtmp and keeps flying. ZAPPED_WAND still fhitm.
M_AP_OBJECT / WEB / throwit fly named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session kicks/tethers through a shade).
**Verified:** private canary **13**/13; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `uhitm.c` `hmon` `shade_miss` caller (named from
D-1354). Not zap.
**Blocked:** none.

## 2026-08-21 — D-1382 mthrowu.c m_throw shade_miss

**Objective:** Open `mthrowu.c` `shade_miss` caller (named from
D-1354). Not uhitm hmon.
**C locus:** `mthrowu.c` `m_throw` `:680–686`; callee
`uhitm.c` `shade_miss` `:2016–2051` (JS `mhitm.js`).
**Change:** `mtmp && shade_miss(mon,mtmp,singleobj,TRUE,TRUE)`
skips `ohitmon` and keeps flying. Silver glare still ohitmon.
Zap/hmon callers named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session has a monster missile through a shade).
**Verified:** private canary **12**/12; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `shade_miss` caller (named from D-1354).
Not mthrowu.
**Blocked:** none.
## 2026-08-21 — D-1381 uhitm.c do_attack leprechaun evade

**Objective:** Open `uhitm.c` `do_attack` leprechaun evade
(named from D-1373). Not wipe.
**C locus:** `uhitm.c` `do_attack` `:555–563`; callee
`monmove.c` `m_move`.
**Change:** `S_LEPRECHAUN` `!rn2(7)` `m_move(0)` then stumble /
`return FALSE` so domove continues. Stay-put falls through to
hitum. Wipe stays D-1373. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session melees an alert leprechaun that leaves).
**Verified:** private canary **13**/13; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `mthrowu.c` `shade_miss` caller (named from
D-1354). Not uhitm hmon.
**Blocked:** none.
## 2026-08-21 — D-1380 zap.c zapnodir WAN_WISHING

**Objective:** Open `zap.c` `zapnodir` WAN_WISHING (named).
Not create.
**C locus:** `zap.c` `zapnodir` `:2575–2585`; `you.h` `Luck`.
**Change:** `Luck()+rn2(5)<0` unfortunately else
`known=!!dknown` + `makewish()`. Enlighten/stasis named.
Create stays D-1379. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session zaps WAN_WISHING).
**Verified:** private canary **12**/12; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `uhitm.c` `do_attack` leprechaun evade
(named from D-1373). Not wipe.
**Blocked:** none.
## 2026-08-21 — D-1379 zap.c zapnodir WAN_CREATE_MONSTER

**Objective:** Open `zap.c` `zapnodir` WAN_CREATE_MONSTER (named).
Not light.
**C locus:** `zap.c` `zapnodir` `:2569–2574`; callee
`makemon.c` `create_critters` `:1556–1590`.
**Change:** `create_critters(rn2(23)?1:rn1(7,2), null, false)`
+ eel `enexto` short-circuit + seen/`dknown` learnwand.
Wish/enlighten/stasis + scroll/spell create named. Rule #2:
no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session zaps WAN_CREATE_MONSTER).
**Verified:** private canary **19**/19; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zapnodir` WAN_WISHING (named). Not
create.
**Blocked:** none.
## 2026-08-21 — review D-1375–D-1378 (audit #1750)

**Objective:** audit — C-fidelity reviews **335–338** of JS SHAs
`8a2a32bd` / `61c15769` / `e785f5bb` / `12953730` plus full
`sessions` score.
**C locus:** `dig.c:1328–1335`; `muse.c:1566–1574` /
`:1938–1955`; `artifact.c:2054–2128`; `spell.c:1419–1454` /
`:1655–1701`.
**Change:** no `js/` edits. All four **ACCEPT-WITH-DEBT**.
Filled archive D-1378 `12953730`. Must-fix empty. Next Open
`zapnodir` WAN_CREATE_MONSTER. Rule #2: no fs.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
(100%) speed `38+0.31/turn` (R² 0.84).
**Verified:** full `sessions` at HEAD `12953730`; public-unhit
on axe wipe / monster camera / Sunsword invoke / skilled scatter.
**Next:** Open `zap.c` `zapnodir` WAN_CREATE_MONSTER (named).
Not light.
**Blocked:** none.
## 2026-08-21 — D-1378 spell.c skilled SPE_FIREBALL scatter

**Objective:** Open `spell.c` skilled SPE_FIREBALL scatter
(named from D-1365). Not zapyourself explode.
**C locus:** `spell.c` `spelleffects` `:1419–1454` +
`throwspell` `:1655–1701`; `zap.c` `spell_damage_bonus`
`:3479–3502`. Callee `explode`.
**Change:** skilled FIREBALL/CONE `throwspell` then
`rnd(8)+1` explode scatter olet 0 + Int/level bonus.
Unskilled FALLTHROUGH weffects named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts skilled fireball).
**Verified:** private canary **23**/23; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zapnodir` WAN_CREATE_MONSTER (named).
Not light.
**Blocked:** none.
## 2026-08-21 — D-1377 artifact.c invoke_blinding_ray

**Objective:** Open `artifact.c` `invoke_blinding_ray`
(named from D-1366). Not camera.
**C locus:** `artifact.c` `invoke_blinding_ray` `:2054–2086`
+ `arti_invoke_cost` `:2088–2128`; callees `do_blinding_ray`
/ `litroom` Sunsword radius-0 / `lightdamage`+`flashburn`.
**Change:** extract `inv_prop`; BLINDING_RAY getdir ray /
spot / self / cancel refund. Other specials named. Rule #2:
no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session `#invoke`s Sunsword).
**Verified:** private canary **20**/20; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` skilled SPE_FIREBALL scatter
(named from D-1365). Not zapyourself explode.
**Blocked:** none.
## 2026-08-21 — D-1376 muse.c MUSE_CAMERA lightdamage

**Objective:** Open `muse.c` MUSE_CAMERA `lightdamage`
(named from D-1366). Not zapnodir.
**C locus:** `muse.c` `find_offensive` `:1566–1574` +
`use_offensive` `:1938–1955`; callee `zap.c` `lightdamage`.
**Change:** camera select (`!rn2(6)` after sight/gremlin +
dist2<=2 + spe>0) and use (Hallu cheese / picture / flash
`rnd(51)` / `lightdamage` / spe-- / return 1). SCR_EARTH
and Sunsword invoke still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
hostile fires a charged camera adjacent).
**Verified:** private canary **21**/21; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `artifact.c` `invoke_blinding_ray` (named
from D-1366). Not camera.
**Blocked:** none.
## 2026-08-21 — D-1375 dig.c use_pick_axe2 u_wipe_engr(3)

**Objective:** Open `dig.c` `u_wipe_engr` caller
(named from D-1360). Not dothrow.
**C locus:** `dig.c` `use_pick_axe2` `:1328–1335`; callee
`engrave.c` `u_wipe_engr` `:264–268`.
**Change:** axe-scratch arm (`!ispick` and not LANDMINE/
BEAR_TRAP) calls live `u_wipe_engr(3)` after the scratch
pline. Pick-down / axe on those traps still start digging.
uteetering still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session chops down with an axe on a wipeable engraving).
**Verified:** private canary **22**/22; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `muse.c` MUSE_CAMERA `lightdamage` (named
from D-1366). Not zapnodir.
**Blocked:** none.
## 2026-08-21 — review D-1371–D-1374 (audit #1745)

**Objective:** audit — C-fidelity reviews **331–334** of JS SHAs
`211485a0` / `b3fe3015` / `d5614c8a` / `08007958` plus full
`sessions` score.
**C locus:** `youprop.h:42–44` Shock_resistance; `allmain.c`
`:360–361`; `uhitm.c` `:551–553`; `dothrow.c` `:138`.
**Change:** no `js/` edits. All four **ACCEPT-WITH-DEBT**.
Filled archive D-1374 `08007958`. Must-fix empty. Next Open
`dig.c` wipe. Rule #2: no fs.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
(100%) speed `40+0.33/turn` (R² 0.86).
**Verified:** full `sessions` at HEAD `08007958`; public-unhit
on conferral shock / EOT wipe / melee wipe / throw wipe.
**Next:** Open `dig.c` `u_wipe_engr` caller (named from
D-1360). Not dothrow.
**Blocked:** none.
## 2026-08-21 — D-1374 dothrow.c throw_obj u_wipe_engr(2)

**Objective:** Open `dothrow.c` `u_wipe_engr` caller
(named from D-1360). Not uhitm. Not dig.
**C locus:** `dothrow.c` `throw_obj` `:138`; callee
`engrave.c` `u_wipe_engr` `:264–268`.
**Change:** after self refuse, call live `u_wipe_engr(2)`
before named petrify / multishot. Import live callee.
dig still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session throws on a wipeable engraving).
**Verified:** private canary **19**/19; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `dig.c` `u_wipe_engr` caller
(named from D-1360). Not dothrow.
**Blocked:** none.
