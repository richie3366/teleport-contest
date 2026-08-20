# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
