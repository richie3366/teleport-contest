# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
