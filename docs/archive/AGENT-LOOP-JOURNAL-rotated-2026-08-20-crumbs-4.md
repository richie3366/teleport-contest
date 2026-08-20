# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-20 — D-1278 dungeon.c u_on_rndspot switch_terrain

**Objective:** Open `dungeon.c` `u_on_rndspot` `switch_terrain`
(named from D-1129). Not dothrow hurtle.
**C locus:** `dungeon.c` `u_on_rndspot` `:1636–1637` after
`place_lregion` (unconditional).
**Change:** `mklev.js` awaits live D-1129 body after place;
`goto_level` awaits both sites. Named: On_W_tower_level; sstairs;
cmd wiz; objnam wish. Rule #2: no fs.
**Score:** fortress 44/44; public-unhit unless rndspot arrival
with leftover Lev/Fly FROMOUTSIDE. Next audit @**#1620**.
**Verified:** private canary **14**/14; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `objnam.c` wish `switch_terrain` (named from
D-1129). Not doname EGG.
**Blocked:** none.

## 2026-08-20 — D-1277 dothrow.c hurtle_step switch_terrain

**Objective:** Open `dothrow.c` `hurtle_step` `switch_terrain`
(named from D-1129). Not u_on_rndspot.
**C locus:** `dothrow.c` `hurtle_step` `:916–917` dest-typ ≠ origin
after `flush_screen`.
**Change:** `dothrow.js` awaits live D-1129 body when dest `ltyp`
differs from origin. Named: drown / check_special_room / traps /
Passes_walls; `u_on_rndspot`; objnam wish. Rule #2: no fs.
**Score:** fortress 44/44; public-unhit unless a hurtle changes
terrain with leftover Lev/Fly FROMOUTSIDE. Next audit @**#1620**.
**Verified:** private canary **13**/13; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `dungeon.c` `u_on_rndspot` `switch_terrain` (named
from D-1129). Not dothrow hurtle.
**Blocked:** none.

## 2026-08-20 — D-1276 objnam.c doname EGG

**Objective:** Open `objnam.c` doname EGG (named from D-1255). Not
MEAT_RING.
**C locus:** `objnam.c` `doname_base` FOOD EGG `:1524–1535`.
**Change:** `ismnum(corpsenm)` and `(known || MV_KNOWS_EGG)` prepend
`pmnames[NEUTRAL]`; `spe==1` `(laid by you)` after named. `stale_egg`
stays `#if 0`. Named: MEAT_RING / candle `partly used`. Rule #2: no fs.
**Score:** fortress 44/44; public-unhit unless a typed known egg is
shown. Next audit @**#1620**.
**Verified:** private canary **25**/25; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `dothrow.c` `hurtle_step` `switch_terrain` (named from
D-1129). Not u_on_rndspot.
**Blocked:** none.

## 2026-08-20 — D-1275 display.h display_self U_AP_TYPE glyphs

**Objective:** Open `display.c` `display_self` U_AP_TYPE glyphs
(named from D-1260). Not seemimic.
**C locus:** `display.h` `display_self` `:251–260`;
`maybe_display_usteed` `:246–249`.
**Change:** `maybe_display_usteed` then NOTHING `hero_glyph` /
FURNITURE `cmap_to_glyph` / OBJECT `objnum_to_glyph` (not Hallu) /
MONSTER `monnum_to_glyph`. Wired `newsym` / `swallowed` / detect
`monster_detect`. Named: find_trap cls; muse; gender; seemimic.
Rule #2: no fs.
**Score:** fortress 44/44; public-unhit unless imitating. Next
audit @**#1620**.
**Verified:** private canary **19**/19; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `objnam.c` doname EGG (named from D-1255). Not
MEAT_RING.
**Blocked:** none.

## 2026-08-20 — #1615 review D-1271–D-1274 + cadence

**Objective:** audit — C-fidelity reviews **233–236** of JS SHAs
since `a4aa34d3`, plus full `sessions` score. No `js/` port.
**C locus:** `mon.c` `meatmetal`; `invent.c` `hold_another_object`;
`pickup.c` `tipcontainer` highdrop; `dothrow.c` `toss_up`.
**Change:** four reviews, all **ACCEPT-WITH-DEBT**. No Must-fix
(named omits stay map: meatobj / meatcorpse; fatal wished corpse;
altarizing dropy; returning_missile / swallow / steed potion).
Filled D-1274 archive hash `b166de10`. Open 12 (no refill). Rule
#2: no fs.
**Score:** cadence **#1615** HEAD `b166de10` **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`35+0.29/turn` (R² 0.853). seed0383 PASS. Next audit @**#1620**.
**Verified:** `__RESULTS_JSON__` at HEAD `b166de10`; branch-by-branch
vs pinned C (meatmetal spit-then-loop; drop_it `hitfloor(FALSE)`;
highdrop `hitfloor(TRUE)`; toss_up `rn2(5)&&!Underwater`).
**Next:** Open `display.c` `display_self` U_AP_TYPE glyphs (named
from D-1260). Not seemimic.
**Blocked:** none.

## 2026-08-20 — D-1274 dothrow.c toss_up + throwit u.dz

**Objective:** Open `dothrow.c` `toss_up` (named from D-1263). Not
hold_another_object.
**C locus:** `dothrow.c` `toss_up` `:1256–1426`; `throwit` `:1579–1599`.
**Change:** `t`+`<` `toss_up(obj, rn2(5)&&!Underwater)`; getdir `<>`
set dz; downward `hitfloor(TRUE)`. Named: returning_missile /
swallowit / slip / stamina / steed potion. Rule #2: no fs.
**Score:** fortress 44/44; public-unhit unless a session throws
`t`+`<`/`>`. Next audit @**#1615**.
**Verified:** private canary **11**/11; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `display.c` `display_self` U_AP_TYPE glyphs (named from
D-1260). Not seemimic.
**Blocked:** none.
