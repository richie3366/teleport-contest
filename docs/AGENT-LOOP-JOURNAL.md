# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).

## 2026-08-22 — review D-1396–D-1404 (audit #1770)

**Objective:** audit — C-fidelity reviews **356–364** of JS SHAs
`66018a5a` / `f5e00af7` / `a938a5b9` / `64d4d089` /
`dce9ac86` / `88587b68` / `2a3da9b9` / `d9134735` /
`cc7284d4` plus full `sessions` score.
**C locus:** `uhitm.c:4410–4420` / `:4142–4157` / `:4138–4141`;
`spell.c:1584–1587` / `:1552–1567` / `:1549–1551` /
`:1588–1590` / `:1528–1531`; `zap.c:2559–2568`.
**Change:** no `js/` edits. **356–364** ACCEPT-WITH-DEBT.
No Must-fix. Filled archive D-1404 `cc7284d4`. Rule #2: no fs.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
(100%) speed `39+0.31/turn` (R² 0.85).
**Verified:** full `sessions` at HEAD `cc7284d4`; public-unhit
on STUN leftover / JUMPING / CURE_SICKNESS / CURE_BLINDNESS /
CHAIN / CREATE_MONSTER / mwep dmgval / kick-thick / WAN_STASIS.
**Next:** Open `uhitm.c` `mhitm_ad_fire` leftover.
Not STUN.
**Blocked:** none.

## 2026-08-22 — D-1404 zap.c zapnodir WAN_STASIS

**Objective:** Open `zap.c` `zapnodir` WAN_STASIS (named from
D-1380). Not enlightenment.
**C locus:** `zap.c` `zapnodir` `:2559–2568`; consumers
`teleport.c` `noteleport_level`, `apply.c` magic whistle,
`do.c` `revive_mon` displacer already live.
**Change:** silent `stasis_until` max `moves+rn1(21,10)`;
`known` stays FALSE (no learnwand). SPE_DETECT_UNSEEN named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session zaps WAN_STASIS).
**Verified:** private canary **15**/15; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `uhitm.c` `mhitm_ad_fire` leftover (named
from D-1385). Not STUN.
**Blocked:** none.

## 2026-08-22 — D-1403 uhitm.c mhitm_ad_phys AT_KICK thick_skinned

**Objective:** Open `uhitm.c` `mhitm_ad_phys` AT_KICK
thick_skinned (named). Not mwep.
**C locus:** `uhitm.c` `mhitm_ad_phys` mhitm `:4138–4141`
after D-1394 shade, before D-1402 mwep; callee
`mondata.h` `thick_skinned`.
**Change:** AT_KICK vs thick hide zeros leftover `d()`
(mwep already nulled). artifact_hit / rustm / poison /
worm-shrieker named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session has mon-vs-mon AT_KICK AD_PHYS vs thick hide).
**Verified:** private canary **12**/12; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zapnodir` WAN_STASIS (named from
D-1380). Not enlightenment.
**Blocked:** none.
## 2026-08-21 — D-1402 uhitm.c mhitm_ad_phys mwep dmgval

**Objective:** Open `uhitm.c` `mhitm_ad_phys` mwep dmgval
(named). Not shade_miss.
**C locus:** `uhitm.c` `mhitm_ad_phys` mhitm `:4142–4157`
after D-1394 shade; callee `weapon.c` `dmgval` +
`which_armor(W_ARMG)` + `do_stone_mon`.
**Change:** AT_WEAP/AT_CLAW `mwep` corpse then `dmgval` + GOP
`rn1(4,3)` + min 1. Kick thick / artifact_hit / rustm /
poison named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session has mon-vs-mon AT_WEAP/AT_CLAW AD_PHYS).
**Verified:** private canary **13**/13; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `uhitm.c` `mhitm_ad_phys` AT_KICK
thick_skinned (named). Not mwep.
**Blocked:** none.
## 2026-08-21 — D-1401 spell.c SPE_CREATE_MONSTER seffects

**Objective:** Open `spell.c` `spelleffects` SPE_CREATE_MONSTER
seffects (named). Not chain.
**C locus:** `spell.c` `spelleffects` `:1528–1531`
`(void) seffects(pseudo)` (no skilled bless). Callee
`read.c` `seffect_create_monster` `:1608–1624` →
`create_critters` (D-1379).
**Change:** SPE_CREATE_MONSTER → `seffects(pseudo)`. Live
`seffect_create_monster` count/blob + doread SCR gate. Dynamic
`read.js`. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts create monster).
**Verified:** private canary **18**/18; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `uhitm.c` `mhitm_ad_phys` mwep dmgval
(named). Not shade_miss.
**Blocked:** none.
## 2026-08-21 — D-1400 spell.c SPE_CHAIN_LIGHTNING cast_chain_lightning

**Objective:** Open `spell.c` `spelleffects` SPE_CHAIN_LIGHTNING
(named). Not cure.
**C locus:** `spell.c` `spelleffects` `:1588–1590`; body
`cast_chain_lightning` `:1002–1100` + `propagate_chain_lightning`
`:951–1000`. Callee `zap.c` `zhitm` `BZ_U_SPELL(AD_ELEC-1)` nd=2.
**Change:** SPE_CHAIN_LIGHTNING → `cast_chain_lightning()`. BFS
queue, peaceful skip, closed-door/WATER block, pool/open-door
spread, swallow TODO, extra Pw on chain-past-mon. Exported
`zhitm`/`resists_elec`. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts chain lightning).
**Verified:** private canary **21**/21; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` `spelleffects` SPE_CREATE_MONSTER
seffects (named). Not chain.
**Blocked:** none.
## 2026-08-21 — D-1399 spell.c SPE_CURE_BLINDNESS healup cream+blind+deaf

**Objective:** Open `spell.c` `spelleffects` SPE_CURE_BLINDNESS
(named). Not sickness.
**C locus:** `spell.c` `spelleffects` `:1549–1551`; callee
`potion.c` `healup` `:1444–1450` cream + `make_blinded` + `make_deaf`.
**Change:** SPE_CURE_BLINDNESS → `healup(0,0,FALSE,TRUE)`. healup
cureblind now calls `make_deaf(0,TRUE)` (was TIMEOUT clear only).
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts cure blindness).
**Verified:** private canary **19**/19; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` `spelleffects` SPE_CHAIN_LIGHTNING
(named). Not cure.
**Blocked:** none.
## 2026-08-21 — D-1398 spell.c SPE_CURE_SICKNESS healup+ill/slime

**Objective:** Open `spell.c` `spelleffects` SPE_CURE_SICKNESS
(named). Not jumping.
**C locus:** `spell.c` `spelleffects` `:1552–1567`; callee
`potion.c` `healup` `:1452–1455` `make_vomiting` + `make_sick`.
**Change:** capture Sick/Slimed; `healup(0,0,TRUE,FALSE)`; ill
pline unless only-slimed; `make_slimed(0)`. healup curesick
now calls make_vomiting/make_sick. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts cure sickness).
**Verified:** private canary **18**/18; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` `spelleffects` SPE_CURE_BLINDNESS
(named). Not sickness.
**Blocked:** none.
## 2026-08-21 — D-1397 spell.c SPE_JUMPING jump(max skill)

**Objective:** Open `spell.c` `spelleffects` SPE_JUMPING (named).
Not clairvoyance.
**C locus:** `spell.c` `spelleffects` `:1584–1587`; callee
`apply.c` `jump` `:1988–2163` (magic ustuck `:2023–2036`).
**Change:** `jump(max(role_skill,1))`; !TIME → nothing_happens.
Callee magic writhe + tame pull-free + air/waterlevel flail.
Dynamic `apply.js`. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts jumping).
**Verified:** private canary **18**/18; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` `spelleffects` SPE_CURE_SICKNESS
(named). Not jumping.
**Blocked:** none.
## 2026-08-21 — D-1396 mhitm.c mdamagem AD_STUN leftover

**Objective:** Open `mhitm.c` `mdamagem` AD_STUN leftover
(named from D-1352). Not CONF.
**C locus:** `uhitm.c` `mhitm_ad_stun` mhitm `:4410–4420`;
caller `mhitm.c` `mdamagem` `:1059`; callee `mondata.c`
`stagger` `:1394–1407` then `mhitm_ad_phys` (D-1394).
**Change:** `mcan` keeps leftover `d()`; else canseemon
stagger pline + `mstun=1` (no spec-used / WAITFORU unlike
CONF) then phys (shade may zero leftover). Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session faces vis mon-vs-mon AD_STUN).
**Verified:** private canary **15**/15; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` `spelleffects` SPE_JUMPING (named).
Not clairvoyance.
**Blocked:** none.
## 2026-08-21 — review D-1387–D-1395 (audit #1760)

**Objective:** audit — C-fidelity reviews **347–355** of JS SHAs
`c3d768d1` / `c6af8407` / `5e8d1fbd` / `b5b5eb34` /
`a4923869` / `adfd4533` / `7863ae2a` / `91827af6` /
`05f8c1a1` plus full `sessions` score.
**C locus:** `cmd.c:4095–4111`; `spell.c:1458–1583` /
`:1569–1571` / `:1104–1177` / `:1572–1580`; `timeout.c:652–661`;
`detect.c:1448–1585`; `zap.c:3986–3992` / `:3926–3938` /
`:2586–2590`; `uhitm.c:4128–4137`.
**Change:** no `js/` edits. **347–355** ACCEPT-WITH-DEBT.
No Must-fix. Filled archive D-1395 `05f8c1a1`. Rule #2: no fs.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
(100%) speed `37+0.30/turn` (R² 0.85).
**Verified:** full `sessions` at HEAD `05f8c1a1`; public-unhit
on leftover-dir fireball / force bolt / familiar / protection /
clairvoyance / mimic skip / WEB / explmm-shade / WAN_ENLIGHTENMENT.
**Next:** Open `mhitm.c` `mdamagem` AD_STUN leftover.
Not CONF.
**Blocked:** none.
## 2026-08-21 — D-1395 zap.c zapnodir WAN_ENLIGHTENMENT

**Objective:** Open `zap.c` `zapnodir` WAN_ENLIGHTENMENT
(named from D-1380). Not stasis.
**C locus:** `zap.c` `zapnodir` `:2586–2590`; helper
`do_enlightenment_effect` `:2525–2532`; callee
`insight.c` MAGIC `enlightenment` (JS `invent.js`, D-1116).
**Change:** `known=!!dknown` then You_feel / flush /
MAGIC enlightenment / pline_The / `exercise(A_WIS)`.
Unseen wand still shows the effect. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session zaps WAN_ENLIGHTENMENT).
**Verified:** private canary **11**/11; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `mhitm.c` `mdamagem` AD_STUN leftover
(named from D-1352). Not CONF.
**Blocked:** none.
## 2026-08-21 — D-1394 uhitm.c mhitm_ad_phys shade_miss

**Objective:** Open `uhitm.c` `mhitm_ad_phys` shade_miss
(named from D-1341). Not hmon.
**C locus:** `uhitm.c` `mhitm_ad_phys` mhitm `:4128–4137`;
callee `shade_miss` `:2016–2051` (JS `mhitm.js`, D-1341);
caller `mhitm.c` `mdamagem` AD_PHYS.
**Change:** null `MON_WEP` unless AT_WEAP/AT_CLAW then
`shade_miss` zeros leftover `d()`. explmm AD_PHYS skips
hitmm so this is the shade gate. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session has mon-vs-shade AD_PHYS via `mdamagem`).
**Verified:** private canary **12**/12; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zapnodir` WAN_ENLIGHTENMENT
(named from D-1380). Not stasis.
**Blocked:** none.
