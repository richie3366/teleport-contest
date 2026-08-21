# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-21 — D-1354 weapon.c dmgval shade/shade_glare

**Objective:** Open `weapon.c` `dmgval` shade/`shade_glare`
(named from D-1341). Not hitmm shade_miss.
**C locus:** `weapon.c` `dmgval` `:307–308`; callee
`artifact.c` `shade_glare` `:555–571`.
**Change:** silver or SPFX_DFLAG2+M2_UNDEAD artifact glares;
else shade tmp=0 (dice still burn). Club vs shade is a miss.
Blessed/thick-skin/hmon ranged named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session hits a shade with a non-glare weapon). Next audit @**#1720**.
**Verified:** canary **20**/20; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zapyourself` WAN_LIGHTNING (named).
Not killer_xname.
**Blocked:** none.

## 2026-08-21 — D-1353 muse.c ureflects W_AMUL/W_ARM/dragon

**Objective:** Open `zap.c` `ureflects` W_AMUL/W_ARM/dragon
(named from D-1342). Not W_WEP.
**C locus:** `muse.c` `ureflects` `:2850–2864` after W_WEP;
callers zap dobuzz / pray `god_zaps_you`.
**Change:** zap/pray clones import mhitu `ureflects` (medallion
makeknown, armor/`uskin` luster, silver-dragon scales). Bounce
`Reflecting()` includes uprops+AoR/DSM/form. mcastu named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session bounces off AoR/DSM/silver form). Next audit @**#1720**.
**Verified:** canary **20**/20; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `weapon.c` `dmgval` shade/`shade_glare` (named
from D-1341). Not hitmm shade_miss.
**Blocked:** none.

## 2026-08-21 — D-1352 mhitm.c mdamagem AD_STON leftover

**Objective:** Open `mhitm.c` `mdamagem` AD_STON leftover
(named from D-1338). Not shade_miss.
**C locus:** `uhitm.c` `mhitm_ad_ston` mhitm `:4254–4261`;
`do_stone_mon` `:3944–3978`; caller `mhitm.c` `mdamagem`.
**Change:** cancelled keeps leftover `d()`; else poly golem
or `"turns to stone!"`/`monstone`/`grow_up` done, or leftover
0. `munstone` named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session faces mon-vs-mon AD_STON). Next audit @**#1720**.
**Verified:** canary **11**/11; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `ureflects` W_AMUL/W_ARM/dragon (named
from D-1342). Not W_WEP.
**Blocked:** none.

## 2026-08-21 — D-1351 mhitm.c hitmm silver sear

**Objective:** Open `mhitm.c` hitmm silver sear (named from
D-0887). Not shade_miss.
**C locus:** `mhitm.c` `hitmm` `:652–655` weaponhit/silverhit;
`:706–726` sear after vis hit pline.
**Change:** vis `!compat` `mon_hates_silver && silverhit`
then `s_suffix(Monnam)` `simpleonames` sears; flesh unless
ghost/amorph; self himself→his own. Artifact wep named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session has vis mon-vs-mon silver). Next audit @**#1720**.
**Verified:** canary **16**/16; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `mhitm.c` `mdamagem` AD_STON leftover (named
from D-1338). Not shade_miss.
**Blocked:** none.

## 2026-08-21 — review D-1350 (audit #1715)

**Objective:** audit — C-fidelity review **312** of JS SHA
`d3f2a9e5` since `df69cf2e`, plus full `sessions` score. No `js/` port.
**C locus:** `dokick.c` `kickdmg` `:96–113`.
**Change:** **312** ACCEPT-WITH-DEBT. No Must-fix. Filled
D-1350 archive hash `d3f2a9e5`. Cadence **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`36+0.30/turn` (R² 0.85) at `d3f2a9e5`. Rule #2: no fs.
**Score:** fortress held. Next audit @**#1720**.
**Verified:** `node frozen/ps_test_runner.mjs sessions` this iter.
**Next:** Open `mhitm.c` hitmm silver sear (named from D-0887).
Not shade_miss.
**Blocked:** none.

## 2026-08-21 — D-1350 dokick.c kickdmg martial knockback

**Objective:** Open `dokick.c` martial knockback (named from
D-1332). Not abuse_dog.
**C locus:** `dokick.c` `kickdmg` `:96–113`. Callees
`goodpos` / `m_in_out_region` / `mintrap` / `set_apparxy`.
Caller `kick_monster` after evade, non-poly.
**Change:** after HP subtract, alive martial `!bigmonst`
`!rn2(3)` then `mcanmove`/`!ustuck`/`!mtrapped`. `goodpos`
gpflags=0, reels pline, region, remove/place, apparxy,
`mintrap` Trap_Killed_Mon skips `killed`. Not mhurtle.
`wake_nearby` named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session martial-kicks a small mobile monster). Next audit
@**#1715**.
**Verified:** canary **17**/17; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `mhitm.c` hitmm silver sear (named from
D-0887). Not shade_miss.
**Blocked:** none.
