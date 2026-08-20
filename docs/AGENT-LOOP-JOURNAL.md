# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-20 — D-1283 dothrow.c throwit swallowit

**Objective:** Open `dothrow.c` throwit swallowit (named from
D-1274). Not returning_missile.
**C locus:** `dothrow.c` `swallowit` `:1468–1475`; `throwit`
`:1569–1578` before `u.dz`; `:1704–1706`; fail-path `:1751/:1772`.
**Change:** swallowed throw skips `u.dz`/bhit; `thitmonst(ustuck)`
then `mpickobj`; AutoReturn fail-catch / fail-to-return swallowit
not dropy/land. `mpickobj` clears `thrownobj`. Named: slip;
stamina; steed; boomhit; throw_gold swallow; vanish pline.
Rule #2: no fs.
**Score:** fortress 44/44; public-unhit unless a session throws
while swallowed. Next audit @**#1630**.
**Verified:** private canary **13**/13; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `mon.c` `meatobj` (named from D-1271). Not meatcorpse.
**Blocked:** none.
## 2026-08-20 — #1625 review D-1279–D-1282 + cadence

**Objective:** audit — C-fidelity reviews **241–244** of JS SHAs
since `bc4e5a2f`, plus full `sessions` score. No `js/` port.
**C locus:** `objnam.c` `wizterrainwish`; `trap.c` `maketrap`
`set_levltyp`; `hack.c` `moverock_core` Blind feel; `dothrow.c`
`throwit` returning_missile.
**Change:** four reviews, all **ACCEPT-WITH-DEBT**. No Must-fix
(named omits stay map: traps/door/wall/drawbridge; DRAWBRIDGE_UP
ice/shop add_damage; next_boulder/Blind feel_location; swallowit/
boomhit/slip). Filled D-1282 archive hash `7d61ee8b`. Open 9 (no
refill). Rule #2: no fs.
**Score:** cadence **#1625** HEAD `7d61ee8b` **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`38+0.31/turn` (R² 0.844). seed0383 PASS. Next audit @**#1630**.
**Verified:** `__RESULTS_JSON__` at HEAD `7d61ee8b`; branch-by-branch
vs pinned C (madeterrain `switch_terrain`; STONE→CORR morph; Blind
gbuf feel before nopick; AutoReturn ceiling + `rn2(100)`).
**Next:** Open `dothrow.c` throwit swallowit (named from D-1274).
Not returning_missile.
**Blocked:** none.
## 2026-08-20 — D-1282 dothrow.c throwit returning_missile

**Objective:** Open `dothrow.c` throwit returning_missile (named from
D-1274). Not swallowit.
**C locus:** `dothrow.c` `AutoReturn` `:30–34`; `throwit_return`
`:1460–1465`; `throwit` `:1564–1599` ceiling + `:1710–1777`
post-bhit; `return_throw_to_inv` `:1855–1908`; caller `throw_obj`
wep_mask.
**Change:** `iflags.returning_missile` via AutoReturn; `u.dz<0 &&
!impaired` hits ceiling and returns to hand; post-flight `rn2(100)`
return-to-hand / fail-catch dropy / 1% fail-to-return land.
throw_ok AutoReturn SUGGEST. Named: swallowit; slip; stamina;
steed potion; boomhit; `sho_obj_return_to_u`. Rule #2: no fs.
**Score:** fortress 44/44; public-unhit unless a session throws
wielded aklys / Valk Mjollnir. Next audit @**#1625**.
**Verified:** private canary **14**/14; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `dothrow.c` throwit swallowit (named from D-1274).
Not returning_missile.
**Blocked:** none.
## 2026-08-20 — D-1281 hack.c moverock_core Blind unseen feel

**Objective:** Open `hack.c` Blind unseen boulder feel (named from
D-1262). Not next_boulder.
**C locus:** `hack.c` `moverock_core` `:358–363` before
`next_boulder` / nopick.
**Change:** Blind + `glyph_to_obj(glyph_at)!=BOULDER` →
`"That feels like a boulder."` + `map_object` + `nomul(0)` +
return -1. JS stamps `remembered_glyph.boulder` (no integer
glyph IDs). Named: next_boulder; dopush/cannot_push_msg/
Levitation Blind `feel_location`. Rule #2: no fs.
**Score:** fortress 44/44; public-unhit unless Blind walks onto
an unmapped boulder. Next audit @**#1625**.
**Verified:** private canary **17**/17; green+strict seed8000/0900;
cohort **9**/9 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `dothrow.c` throwit returning_missile (named from
D-1274). Not swallowit.
**Blocked:** none.
## 2026-08-20 — D-1280 trap.c maketrap PIT/HOLE set_levltyp

**Objective:** Open `trap.c` `maketrap` PIT/HOLE `set_levltyp`
(named from D-1269). Not liquid_flow.
**C locus:** `trap.c` `maketrap` `:514–565`; callee `mkmaze.c`
`set_levltyp`.
**Change:** shared `maketrap` IS_ROOM→ROOM / STONE|SCORR→CORR /
wall|SDOOR maze ROOM / cavern CORR / DOOR then `flags=0` + unearth
+ `recalc_block_point`. `do_pit` dropped the D-0972 inline subset.
Named: DRAWBRIDGE_UP ice; shop `add_damage`; liquid_flow. Rule #2:
no fs.
**Score:** fortress 44/44; public-unhit unless a session digs a pit
in STONE with leftover Lev/Fly FROMOUTSIDE. Next audit @**#1625**.
**Verified:** private canary **19**/19; green+strict seed8000/0900;
cohort **9**/9 + strict 1500/1800/0012/0004/0007/2200/0383 +
seed0002/0015.
**Next:** Open `hack.c` Blind unseen boulder feel (named from
D-1262). Not next_boulder.
**Blocked:** none.
## 2026-08-20 — D-1279 objnam.c wizterrainwish switch_terrain

**Objective:** Open `objnam.c` wish `switch_terrain` (named from
D-1129). Not doname EGG.
**C locus:** `objnam.c` `wizterrainwish` `:3907–3910` after
madeterrain; dispatch `readobjnam` wiztrap `:4975–4979`.
**Change:** `readobjnam_wish` furniture/liquid/ice/tree/bars/cloud/
floor then await live D-1129 body. Sync `readobjnam` stays
object-only. Named: traps; door/wall; drawbridge; lava
`pooleffects`. Rule #2: no fs (dynamic import).
**Score:** fortress 44/44; public-unhit unless a wizard furniture
wish with leftover Lev/Fly FROMOUTSIDE. Next audit @**#1625**.
**Verified:** private canary **25**/25; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `trap.c` `maketrap` PIT/HOLE `set_levltyp` (named
from D-1269). Not liquid_flow.
**Blocked:** none.
## 2026-08-20 — #1620 review D-1275–D-1278 + cadence

**Objective:** audit — C-fidelity reviews **237–240** of JS SHAs
since `b166de10`, plus full `sessions` score. No `js/` port.
**C locus:** `display.h` `display_self`; `objnam.c` doname EGG;
`dothrow.c` `hurtle_step`; `dungeon.c` `u_on_rndspot`.
**Change:** four reviews, all **ACCEPT-WITH-DEBT**. No Must-fix
(named omits stay map: find_trap/muse/gender/seemimic; MEAT_RING /
candle; drown/Passes_walls; On_W_tower / sstairs / cmd / wish).
Filled D-1278 archive hash `851d3e08`. Open 8 (no refill). Rule #2:
no fs.
**Score:** cadence **#1620** HEAD `851d3e08` **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`36+0.30/turn` (R² 0.849). seed0383 PASS. Next audit @**#1625**.
**Verified:** `__RESULTS_JSON__` at HEAD `851d3e08`; branch-by-branch
vs pinned C (`display_self` ternary; EGG `ismnum`+laid; hurtle
dest-typ after flush; rndspot unconditional after place).
**Next:** Open `objnam.c` wish `switch_terrain` (named from D-1129).
Not doname EGG.
**Blocked:** none.
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
