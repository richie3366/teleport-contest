# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
## 2026-08-20 — D-1302 dothrow.c throw_gold swallow

**Objective:** Open `dothrow.c` throw_gold swallow (named from
D-1283). Not boomhit.
**C locus:** `dothrow.c` `throw_gold` `:2671–2679` after self
`:2661`; caller `throw_obj` `:112` `COIN_CLASS && obj!=uquiver`.
`add_to_minv(ustuck)` not `swallowit`/`mpickobj`; `digests` →
`s_suffix(mon_nam)` + `" entrails"`; `pline_The`.
**Change:** live swallow in `dothrow.js`; wallet `_goldCount`;
self-dot cancels without ingest (You()/unsplit named). Rest of
throw_gold (dz/bhit/ghitm/ship/floor) and quivered gold via
throwit named. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1645**). Public-unhit
unless a session throws gold while `u.uswallow`.
**Verified:** private canary 33/33; green+strict 8000/0900;
cohort 7/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `dothrow.c` sho_obj_return_to_u. Not boomhit.
**Blocked:** none.
## 2026-08-20 — D-1301 zap.c boomhit

**Objective:** Open `dothrow.c` boomhit (named from D-1282). Not
steed.
**C locus:** `zap.c` `boomhit` `:4148–4233` + `dothrow.c`
throwit `:1601–1611` `BOOMERANG && !Underwater` (air/lev
`hurtle` then boomhit; clear AutoReturn; catch
`return_throw_to_inv`).
**Change:** live 10-step curve in `dothrow.js` (zap.c callee;
throwit-only). Catch DEX/`Fumbling`; self-hit `thitu`+
`endmultishot`; sink Klonk; `!ZAP_POS` backup. m_shot in
throw_obj. m_respond / Soundeffect / `sho_obj_return_to_u`
named. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1645**). Public-unhit
unless a session throws a boomerang.
**Verified:** private canary 32/32; green+strict 8000/0900;
cohort 7/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `dothrow.c` throw_gold swallow. Not boomhit.
**Blocked:** none.
## 2026-08-20 — D-1300 trap.c maketrap shop add_damage

**Objective:** Open `trap.c` maketrap shop `add_damage` (named
from D-1280). Not DRAWBRIDGE_UP ice.
**C locus:** `trap.c` `maketrap` `:523–527` after
`hole_destination`, before DRAWBRIDGE_UP/`set_levltyp`.
`*in_rooms(SHOPBASE)` && (`is_hole` || door || wall) then
`add_damage` (`SHOP_HOLE_COST` iff door/wall && `!mon_moving`
else 0).
**Change:** live `add_damage` in `trap.js` before morph so
damagelist snapshots original typ. Floor holes bill 0; shop
entrance door/wall bills 200. overwrite `reset_utrap` / Knox /
Sokoban finish named. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1645**). Public-unhit
unless a session plants a shop hole/door/wall trap.
**Verified:** private canary 21/21; green+strict 8000/0900;
cohort 7/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `dothrow.c` boomhit. Not steed.
**Blocked:** none.
## 2026-08-20 — D-1299 hack.c swap-with-pet seemimic

**Objective:** Open `hack.c` swap-with-pet `seemimic` (named
from D-1275). Not display_self.
**C locus:** `hack.c` `domove_swap_with_pet` `:2098–2224`
(park ux0 / `mundetected=0` / `M_AP_TYPE`→`seemimic` before
refuse); caller `:2920–2926` skip ceiling hiders + restore ux.
**Change:** live swap helper in `hack.js`; occupy then swap;
pit/NODIAG/boulder/mtrapped/`t_at`/mundisplaceable +
`handle_tip(TIP_UNTRAP_MON)`. `goodpos` / mintrap aftermath
named (teleport.js cycle). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1645**). Public-unhit
unless a session walks into a disguised safemon.
**Verified:** private canary 19/19; green+strict 8000/0900;
cohort 7/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `trap.c` maketrap shop `add_damage`. Not ice.
**Blocked:** none.
## 2026-08-20 — #1645 review D-1295–D-1298 + cadence

**Objective:** audit — C-fidelity reviews **257–260** of JS SHAs
since `25fd80e4`, plus full `sessions` score. No `js/` port.
**C locus:** `objnam.c` doname MEAT_RING; `trap.c` maketrap
DRAWBRIDGE_UP ice; `dothrow.c` throwit steed `rn2(6)` +
`potion.c` potionhit crash/saddle/water; `uhitm.c` hmonas
skipdrin / pit kick.
**Change:** four reviews, all **ACCEPT-WITH-DEBT**. No Must-fix
(named omits stay map: candle / shop `add_damage`; remaining
potionhit otyps / boomhit; eat_brains / mhitu+mhitm DRIN
setters). Filled D-1298 archive hash `086eb03d`. Open first row
still `hack.c` swap-with-pet `seemimic`. Rule #2: no fs.
**Score:** cadence **#1645** HEAD `086eb03d` **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`37+0.30/turn` (R² 0.85). seed0383 PASS. Next audit @**#1650**.
**Verified:** `__RESULTS_JSON__` at HEAD `086eb03d`; branch-by-branch
vs pinned C (`goto ring` worn Concat; ice `DB_FLOOR` +
`is_pool||is_lava`; `rn2(6)` then live crash/saddle/water not
remaining otyps; hmonas skipdrin setter + pit `mtrapped_in_pit`).
**Next:** Open `hack.c` swap-with-pet `seemimic`. Not display_self.
**Blocked:** none.
## 2026-08-20 — D-1298 uhitm.c hmonas skipdrin / pit kick

**Objective:** Open `uhitm.c` skipdrin / pit kick (named
from D-1266). Not altwep.
**C locus:** `uhitm.c` `hmonas` `:5451`/`5464`/`5558`;
`mhitm_ad_drin` `:3189`; `mhitu.c` `mtrapped_in_pit`;
`mattackm`/`mattacku` continues.
**Change:** skipdrin continue after wasted tentacle-DRIN;
pit AT_KICK `continue`; shared `mtrapped_in_pit`; uhitm
`mhitm_ad_drin` headless/notonhead setter + slime. eat_brains
/ helmet named. Rule #2: no fs.
**Verified:** private canary **27**/27; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383. **Public-unhit** unless Upolyd pit-kick or
mind-flayer vs headless.
**Next:** Open `hack.c` swap-with-pet `seemimic`. Not
display_self.
**Blocked:** none.
