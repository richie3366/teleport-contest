# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-21 — audit cadence every 10; progressive review writes

**Objective:** human process change (loop stopped). Audit when
`n % 10 == 0` (9 port/js iters, then review+score). Reviewer
writes each SHA’s file before the next SHA; still **one grouped
commit** at the end.
**C locus:** n/a (loop scripts / prompts / CURRENT).
**Change:** `LOOP_CADENCE_EVERY` default 10;
`agent-port-loop.review.prompt.md` Write order. No `js/`.
**Score:** fortress unchanged (not a score iter).
**Verified:** next audit remains **#1760** (`1760 % 10 == 0`).
**Next:** operator restarts the loop.
**Blocked:** none.

## 2026-08-21 — D-1387 spell.c unskilled FIREBALL getdir cancel

**Objective:** Must-fix `spell.c` unskilled SPE_FIREBALL/CONE
`getdir` cancel leftover dirs (review **346**). Not Open
FORCE_BOLT.
**C locus:** `cmd.c` `getdir` `:4095–4111`; caller
`spell.c` `spelleffects` `:1488–1510`.
**Change:** live `lock.js` `getdir` instead of `getdir_spell`
zero-on-cancel; leftover-dir ESC `weffects`. No trailing
`confdir` on shared `getdir`. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts unskilled fireball/cone with leftover dirs).
**Verified:** private canary **14**/14; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` `spelleffects` SPE_FORCE_BOLT (named).
Not fireball.
**Blocked:** none.

## 2026-08-21 — review D-1379–D-1386 (audit #1755)

**Objective:** audit — C-fidelity reviews **339–346** of JS SHAs
`ad7b89c7` / `ef8a60b0` / `e0594454` / `6077050a` /
`970c6097` / `ec703f48` / `5be02746` / `1f94d5e3` plus full
`sessions` score.
**C locus:** `zap.c:2569–2585`; `makemon.c:1556–1590`;
`uhitm.c:555–563` / `:1812–1822`; `mthrowu.c:680–686`;
`zap.c:3984–3992`; `uhitm.c:3713–3724`; `spell.c:1454–1514`;
`cmd.c:4095–4111`.
**Change:** no `js/` edits. **339–345** ACCEPT-WITH-DEBT.
**346** QUALITY-RISK: unskilled FIREBALL `getdir_spell` cancel
zeros dirs (C `getdir` reuses leftover). Must-fix prepended.
Filled archive D-1386 `1f94d5e3`. Rule #2: no fs.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
(100%) speed `38+0.31/turn` (R² 0.85).
**Verified:** full `sessions` at HEAD `1f94d5e3`; public-unhit
on create/wish/leprechaun/shade/AD_CONF/unskilled fireball.
**Next:** Must-fix unskilled FIREBALL/CONE `getdir` cancel.
Not Open FORCE_BOLT.
**Blocked:** none.

## 2026-08-21 — D-1386 spell.c unskilled FIREBALL FALLTHROUGH

**Objective:** Open `spell.c` unskilled SPE_FIREBALL/CONE
FALLTHROUGH weffects (named from D-1378). Not skilled scatter.
**C locus:** `spell.c` `spelleffects` `:1454–1514`; callee
`zap.c` `weffects` `:3461–3462` `BZ_U_SPELL`/`BZ_OFS_SPE`.
**Change:** unskilled FIREBALL/CONE FALLTHROUGH FORCE_BOLT
`physical_damage` then getdir + `zapyourself`/`weffects`;
SPE RAY `ubuzz`. FORCE_BOLT IMMEDIATE named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts unskilled fireball/cone).
**Verified:** private canary **17**/17; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` `spelleffects` SPE_FORCE_BOLT (named).
Not fireball.
**Blocked:** none.

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
