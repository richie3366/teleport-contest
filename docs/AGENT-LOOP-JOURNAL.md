# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
## 2026-08-20 — D-1297 dothrow.c throwit steed potionhit rn2(6)

**Objective:** Open `dothrow.c` throwit steed potion (named
from D-1283). Not slip.
**C locus:** `dothrow.c` `throwit` `:1590–1594`; `potion.c`
`potionhit` crash/saddle/`H2Opotion_dip`/POT_WATER.
**Change:** downward potion while mounted can hit the steed
(`rn2(6)` after `dz>0 && usteed && POTION_CLASS`). Monster
`potionhit` crash/saddle/holy-water live. Remaining otyp /
shop unpaid / boomhit named. Rule #2: no fs.
**Verified:** private canary **18**/18; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383. **Public-unhit** unless a session throws a
potion down while mounted.
**Next:** Open `uhitm.c` skipdrin / pit kick. Not altwep.
**Blocked:** none.
## 2026-08-20 — D-1296 trap.c maketrap DRAWBRIDGE_UP ice→DB_FLOOR

**Objective:** Open `trap.c` maketrap DRAWBRIDGE_UP ice (named
from D-1280). Not shop add_damage.
**C locus:** `trap.c` `maketrap` `:532–545`; `dbridge.c`
`is_pool_or_lava` `:77–80`.
**Change:** closed span keeps mask, forces `DB_FLOOR`, melts
ice via `obj_ice_effects` + `MELT_ICE_AWAY`. Gate is
`is_pool||is_lava` so ice/floor spans accept a new pit.
Shop `add_damage` named. Rule #2: no fs.
**Verified:** private canary **17**/17; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383. **Public-unhit** unless a session pits a
closed ice drawbridge.
**Next:** Open `dothrow.c` throwit steed potion. Not slip.
**Blocked:** none.
## 2026-08-20 — D-1295 objnam.c doname MEAT_RING goto ring

**Objective:** Open `objnam.c` doname MEAT_RING (named from
D-1276). Not candle.
**C locus:** `objnam.c` `doname_base` FOOD MEAT_RING
`:1536–1538` `goto ring`; RING_CLASS `ring:` `:1492–1503`.
**Change:** worn meat ring takes RING_CLASS `" (on right "` /
`" (on left "` + `"hand)"`; spe after oeaten if charged
(BITS chrg=0 idle). Candle `partly used` named. Rule #2: no fs.
**Verified:** private canary **23**/23; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383. **Public-unhit** unless a session wears a
meat ring.
**Next:** Open `trap.c` maketrap DRAWBRIDGE_UP ice. Not shop
add_damage.
**Blocked:** none.
## 2026-08-20 — #1640 review D-1291–D-1294 + cadence

**Objective:** audit — C-fidelity reviews **253–256** of JS SHAs
since `8392595f`, plus full `sessions` score. No `js/` port.
**C locus:** `mhitu.c` `wildmiss`; `dothrow.c` throwit slip /
stamina; `hack.c` `moverock` `next_boulder` + `objnam.c` `xname`.
**Change:** four reviews, all **ACCEPT-WITH-DEBT**. No Must-fix
(named omits stay map: Some_Monnam / mswings; steed / boomhit;
Blind `feel_location` / trap arms). Filled D-1294 archive hash
`c37bd683`. Open first row still doname MEAT_RING. Rule #2: no fs.
**Score:** cadence **#1640** HEAD `c37bd683` **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`36+0.30/turn` (R² 0.85). seed0383 PASS. Next audit @**#1645**.
**Verified:** `__RESULTS_JSON__` at HEAD `c37bd683`; branch-by-branch
vs pinned C (`set_msg_xy` then `pline` not `pline_mon`; `!rn2(7)`
slip; stamina after slip; `next_boulder==1` + `moverock_done`).
**Next:** Open `objnam.c` doname MEAT_RING. Not candle.
**Blocked:** none.
## 2026-08-20 — D-1294 hack.c moverock next_boulder

**Objective:** Open `hack.c` moverock next_boulder (named from
D-1281). Not Blind feel.
**C locus:** `hack.c` `moverock_core` `:365–372`; `moverock_done`
`:326–333`; `moverock`; `objnam.c` `xname` ROCK_CLASS `:814–823`.
**Change:** 2nd+ pile boulder `next_boulder=1`; `xname` `"next
boulder"` then clear (`==1`); `moverock_done` zeros leftovers.
Dedicated field. Blind feel_location named. Rule #2: no fs.
**Verified:** private canary **16**/16; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless a session pushes a multi-boulder pile.
**Next:** Open `objnam.c` doname MEAT_RING. Not candle.
**Blocked:** none.
## 2026-08-20 — D-1293 dothrow.c throwit stamina

**Objective:** Open `dothrow.c` throwit stamina (named from D-1283).
Not slip.
**C locus:** `dothrow.c` `throwit` `:1549–1560` (after slip, before
thrownobj); callees `calc_capacity` / `exercise` / `Is_airlevel`.
**Change:** low-HP encumbered heavy throw drops at feet (`You` +
`exercise(A_CON,FALSE)` + `dx=dy=0` `dz=1`). Steed / boomhit named.
Rule #2: no fs.
**Verified:** private canary **15**/15; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless a session throws while HP is low and
encumbered above SLT with a heavy object.
**Next:** Open `hack.c` moverock next_boulder. Not Blind feel.
**Blocked:** none.
