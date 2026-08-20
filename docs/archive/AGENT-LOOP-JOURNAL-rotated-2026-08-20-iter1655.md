# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
