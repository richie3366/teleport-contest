# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
