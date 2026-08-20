# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-20 — D-1314 mon.c m_respond

**Objective:** Open `mon.c` m_respond (named from D-1301). Not
snuff_candle.
**C locus:** `mon.c` `m_respond` `:4120–4131` + shrieker/medusa
helpers; callers `dochug` / boomhit / `bhitm`.
**Change:** adjacent `MS_SHRIEK` shriek + 1/10 summon + always
`aggravate`; Medusa `couldsee` AT_GAZE walk (**gazemu named**);
hostile Erinys `m_canseeu` `aggravate`; `bhitm` `!*ushops`
`hot_pursuit`. Compare mndx. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit @**#1665**.
**Verified:** canary **14**/14; green+strict seed8000/0900; cohort
**7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
Filled D-1313 archive hash `27751021`.
**Next:** Open `dothrow.c` throwit ACURRSTR urange (named). Not tether.
**Blocked:** none.
## 2026-08-20 — D-1313 dothrow.c throwit_mon_hit snuff_candle / hot_pursuit

**Objective:** Open `dothrow.c` throwit_mon_hit snuff_candle /
hot_pursuit (named from D-1301). Not m_respond.
**C locus:** `dothrow.c` `throwit_mon_hit` `:1482–1506`;
`apply.c` `snuff_candle`; `shk.c` `hot_pursuit` / `inside_shop`.
**Change:** snuff candles/candelabrum before `thitmonst`; then
`m_at` + shk `!inside_shop` / `!strchr` `hot_pursuit`. Lamps
not snuffed. `inside_shop` exported. m_respond named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit @**#1665**.
**Verified:** canary **16**/16; green+strict seed8000/0900; cohort
**7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
Filled D-1312 archive hash `77606a78`.
**Next:** Open `mon.c` m_respond (named from D-1301). Not snuff_candle.
**Blocked:** none.
## 2026-08-20 — D-1312 dothrow.c thitmonst leader catch / finish_quest

**Objective:** Open `dothrow.c` thitmonst leader catch /
finish_quest (named). Not vanish pline.
**C locus:** `dothrow.c` `thitmonst` `:2104–2149`; `quest.c`
`finish_quest` `:226–279`.
**Change:** catch when `mcanmove`; keep invoked unique≠AoY or
angry; else `finish_quest` + hands/tosses + `!next2u` FLASH
walk + addinv. `quest_complete_no_bell` live. offeredit bodies
/ chat got_thanks named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit @**#1665**.
**Verified:** canary **16**/16; green+strict seed8000/0900; cohort
**7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
Filled D-1311 archive hash `3633eb61`.
**Next:** Open `dothrow.c` throwit_mon_hit snuff_candle / hot_pursuit.
Not m_respond.
**Blocked:** none.
## 2026-08-20 — D-1311 dothrow.c throwit tethered DISP_TETHER / BACKTRACK

**Objective:** Open `dothrow.c` throwit tethered DISP_TETHER /
BACKTRACK (named from D-1303). Not leader catch.
**C locus:** `dothrow.c` throwit `:1523` / `:1577–1578` /
`:1712–1713` / `:1761–1762`; `display.c` `tether_glyph` +
tmp_at TETHER/BACKTRACK; `zap.c` bhit open (JS fly stands in).
**Change:** live cord (`tether_glyph` zap type 2) + BACKTRACK
delay walk; swallow/fly open DISP_TETHER; fail/consumed END 0.
Leader `finish_quest` / zap bhit THROWN_TETHERED / isqrt named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit @**#1665**.
**Verified:** canary **31**/31; green+strict seed8000/0900; cohort
**7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
Filled D-1310 archive hash `734449dc`.
**Next:** Open `dothrow.c` thitmonst leader catch / finish_quest.
Not vanish pline.
**Blocked:** none.
## 2026-08-20 — #1660 review D-1307–D-1310 + cadence

**Objective:** audit — C-fidelity reviews **269–272** of JS SHAs
since `3ecd2824` / `49dab44b`, plus full `sessions` score. No `js/`
port.
**C locus:** `uhitm.c` helmet / `m_slips_free`; `objnam.c` doname
candle / lamp `(lit)`; `mhitu.c` `mattacku` AT_TENT; `dokick.c`
`kick_monster` poly AT_KICK.
**Change:** four reviews, all **ACCEPT-WITH-DEBT**. No Must-fix
(named omits stay map: mhitu AD_DRIN / candelabrum / explmu / AT_HUGS
/ `find_roll_to_hit` mlevel / tether BACKTRACK). Filled D-1310
archive hash `734449dc`. Open first row still throwit tethered
DISP_TETHER / BACKTRACK. Rule #2: no fs.
**Score:** cadence **#1660** HEAD `734449dc` **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`36+0.30/turn` (R² 0.85). seed0383 PASS. Next audit @**#1665**.
**Verified:** `__RESULTS_JSON__` at HEAD `734449dc`; branch-by-branch
vs pinned C (slip then `rn2(8)` then `eat_brains`; candle `<` +
peek reconstruct; TENT `rnd(20+i)` not INT drain; NATTK KICK then
return).
**Next:** Open `dothrow.c` throwit tethered DISP_TETHER / BACKTRACK.
Not leader catch.
**Blocked:** none.
## 2026-08-20 — D-1310 dokick.c kick_monster poly AT_KICK

**Objective:** Open `dokick.c` poly AT_KICK loop (named). Not
hmonas pit kick.
**C locus:** `dokick.c` `kick_monster` `:183–223` `Upolyd &&
attacktype(AT_KICK)` then return; `uhitm.c` `find_roll_to_hit`
AT_KICK martial_bonus.
**Change:** NATTK KICK-only `rnd(20)` / `special_dmgval(W_ARMF)` /
shade break / `damageum`+`passive` or `missum`+`passive`. kickdmg
`special_dmgval` / `maybe_mnexto` named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit @**#1660**.
**Verified:** canary **17**/17; green+strict seed8000/0900; cohort
**7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
Filled D-1309 archive hash `07ac10e0`.
**Next:** Open `dothrow.c` throwit tethered DISP_TETHER / BACKTRACK.
Not leader catch.
**Blocked:** none.
## 2026-08-20 — D-1309 mhitu.c mattacku AT_TENT melee

**Objective:** Open `mhitu.c` AT_TENT melee (named from D-1261).
Not mswings.
**C locus:** `mhitu.c` `mattacku` `:793–821` `case AT_TENT:` with
claw/kick/bite; pit kick; weapon/petrify gate; `failed_grab`;
thick-skinned kick skip `hitmu`.
**Change:** add AT_TENT to HTH switch; port same-arm gates.
Local `Conflict()`. explmu / AT_HUGS / mhitu AD_DRIN / mattackm
AT_TENT named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit @**#1660**.
**Verified:** canary **22**/22; green+strict seed8000/0900; cohort
**7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
Filled D-1308 archive hash `2b9c2c6a`.
**Next:** Open `dokick.c` poly AT_KICK loop. Not hmonas pit kick.
**Blocked:** none.
## 2026-08-20 — D-1308 objnam candle partly used / lamp (lit)

**Objective:** Open `objnam.c` candle `partly used` (named from
D-1295). Not MEAT_RING.
**C locus:** `objnam.c` `doname_base` TOOL `:1455–1478`;
`mkobj.c` `mksobj_init` `:989–993`.
**Change:** `"partly used "` from remaining burn vs `20*oc_cost`
(lit reconstructs via `peek_timer(BURN_OBJECT)-moves`); lamp/candle
`" (lit)"`; `mksobj` tallow 200 / wax 400. Candelabrum / leash /
W_TOOL / POT_OIL named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit @**#1660**.
**Verified:** canary **35**/35; green+strict seed8000/0900; cohort
**7**/7 + strict 1500/1800/0012/0004/0007/2200/0383; seed0361 PASS.
Filled D-1307 archive hash `b97b1fc6`.
**Next:** Open `mhitu.c` AT_TENT melee. Not mswings.
**Blocked:** none.
## 2026-08-20 — D-1307 uhitm helmet / m_slips_free

**Objective:** Open `uhitm.c` mhitm_ad_drin helmet / m_slips_free
(named from D-1298). Not eat_brains.
**C locus:** `uhitm.c` `m_slips_free` `:2053–2093`; `mhitm_ad_drin`
uhitm `:3204–3220` after headless `:3202`.
**Change:** port `m_slips_free`; headed path slip → helmet `rn2(8)`
→ eat_brains → lifsav skipdrin. Slip/helmet do not skipdrin.
mhitu+mhitm / AD_WRAP caller named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit @**#1660**.
**Verified:** canary **25**/25; green+strict seed8000/0900; cohort
**7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `objnam.c` candle `partly used`. Not MEAT_RING.
**Blocked:** none.
## 2026-08-20 — #1655 review D-1303–D-1306 + cadence

**Objective:** audit — C-fidelity reviews **265–268** of JS SHAs
since `ef16a473`, plus full `sessions` score. No `js/` port.
**C locus:** `dothrow.c` `sho_obj_return_to_u`; `objnam.c`
wizterrainwish secret corridor; `mhitu.c` `mswings` `pline_mon`;
`eat.c` `eat_brains` + uhitm headed caller.
**Change:** four reviews, all **ACCEPT-WITH-DEBT**. No Must-fix
(named omits stay map: tether BACKTRACK / leader toss; drawbridge
/ lava `pooleffects`; AT_ENGL gulps / Snickersnee; helmet /
`m_slips_free` / mhitu+mhitm AD_DRIN). Filled D-1306 archive
hash `49dab44b`. Open first row still helmet / `m_slips_free`.
Rule #2: no fs.
**Score:** cadence **#1655** HEAD `49dab44b` **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`36+0.30/turn` (R² 0.85). seed0383 PASS. Next audit @**#1660**.
**Verified:** `__RESULTS_JSON__` at HEAD `49dab44b`; branch-by-branch
vs pinned C (FLASH `bhitpos-dir` + display rng; CORR→SCORR;
`pline_mon` not wildmiss wrap; `rnd(10)` before DEADMONSTER).
**Next:** Open `uhitm.c` mhitm_ad_drin helmet / m_slips_free.
Not eat_brains.
**Blocked:** none.
## 2026-08-20 — D-1306 eat.c eat_brains

**Objective:** Open `eat.c` eat_brains (named from D-1298). Not helmet.
**C locus:** `eat.c` `eat_brains` `:601–754`; caller
`uhitm.c` `mhitm_ad_drin` `:3216` after helmet (named).
**Change:** port `eat_brains`; headed uhitm calls it; headless
`return` before (C `:3202`). `rnd(10)` before DEADMONSTER.
Helmet / `m_slips_free` / lifsav skipdrin named. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1650**). Public-unhit
unless a poly mind flayer lands a headed tentacle.
**Verified:** private canary 23/23; green+strict 8000/0900;
cohort 7/7 + strict 1500/1800/0012/0004/0007/2200/0383.
Filled D-1305 archive hash `b82b15a8`.
**Next:** Open `uhitm.c` mhitm_ad_drin helmet / m_slips_free.
Not eat_brains.
**Blocked:** none.
## 2026-08-20 — D-1305 mhitu.c mswings pline_mon

**Objective:** Open `mhitu.c` mswings `pline_mon` (named from
D-1291). Not wildmiss.
**C locus:** `mhitu.c` `mswings` `:128–141`; caller AT_WEAP
foundyou `:900–911`; callee `pline.c` `pline_mon` `:137–150`.
**Change:** one `pline` → `pline_mon`. Verb/quan/`mhis`/`xname`
already D-0286. Did not wrap `wildmiss` (D-1291). AT_ENGL
gulps/lunges / AT_TENT / Snickersnee bash named. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1650**). Public-unhit
unless `accessiblemsg` On on a swing line.
**Verified:** private canary 23/23; green+strict 8000/0900;
cohort 7/7 + strict 1500/1800/0012/0004/0007/2200/0383.
Filled D-1304 archive hash `909ef3dc`.
**Next:** Open `eat.c` eat_brains. Not helmet.
**Blocked:** none.
## 2026-08-20 — D-1304 objnam.c wizterrainwish secret corridor

**Objective:** Open `objnam.c` wizterrainwish secret corridor (named
from D-1290). Not door/wall.
**C locus:** `objnam.c` `wizterrainwish` `:3836–3845` after wall
before room; CORR→SCORR else location pline. Dispatch D-1279
wiztrap; leftover BLev via live `switch_terrain`.
**Change:** secret-corridor arm in `readobjnam.js`. Did not pull
drawbridge under / lava `pooleffects` / melting ice. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1650**). Public-unhit
unless a wizard session wishes secret corridor.
**Verified:** private canary 19/19; green+strict 8000/0900;
cohort 7/7 + strict 1500/1800/0012/0004/0007/2200/0383.
Filled D-1303 archive hash `2b1a575c`.
**Next:** Open `mhitu.c` mswings `pline_mon`. Not wildmiss.
**Blocked:** none.
## 2026-08-20 — D-1303 dothrow.c sho_obj_return_to_u

**Objective:** Open `dothrow.c` sho_obj_return_to_u (named from
D-1282). Not boomhit.
**C locus:** `dothrow.c` `sho_obj_return_to_u` `:1440–1456`; throwit
`:1712–1715` tethered BACKTRACK else FLASH walk after `rn2(100)`.
Leader `:2141–2142` named.
**Change:** live walk `bhitpos-dir` + `nh_delay_output`;
`autoreturn_weapon` so wielded aklys skips (BACKTRACK named).
dx=dy=0 / already-on-@ no-op. Display rng only. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1650**). Public-unhit
unless a session throws wielded Valk Mjollnir.
**Verified:** private canary 16/16; green+strict 8000/0900;
cohort 7/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `objnam.c` wizterrainwish secret corridor. Not
door/wall.
**Blocked:** none.
## 2026-08-20 — #1650 review D-1299–D-1302 + cadence

**Objective:** audit — C-fidelity reviews **261–264** of JS SHAs
since `3a861d5a`, plus full `sessions` score. No `js/` port.
**C locus:** `hack.c` swap-with-pet `seemimic`; `trap.c` maketrap
shop `add_damage`; `zap.c` `boomhit` + throwit caller; `dothrow.c`
`throw_gold` swallow.
**Change:** four reviews, all **ACCEPT-WITH-DEBT**. No Must-fix
(named omits stay map: `goodpos`/mintrap; overwrite/`teledest`;
`m_respond`/`sho_obj_return_to_u`; You() self / bhit / quivered
gold). Filled D-1302 archive hash `1a7839f7`. Open first row
still `dothrow.c` `sho_obj_return_to_u`. Rule #2: no fs.
**Score:** cadence **#1650** HEAD `1a7839f7` **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`36+0.30/turn` (R² 0.85). seed0383 PASS. Next audit @**#1655**.
**Verified:** `__RESULTS_JSON__` at HEAD `1a7839f7`; branch-by-branch
vs pinned C (park+live `seemimic`; shop bill before morph; 10-step
`nhits--` curve+catch; swallow `add_to_minv` not `mpickobj`).
**Next:** Open `dothrow.c` `sho_obj_return_to_u`. Not boomhit.
**Blocked:** none.
