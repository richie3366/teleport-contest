# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
## 2026-08-20 — D-1273 pickup.c tipcontainer highdrop hitfloor(TRUE)

**Objective:** Open `pickup.c` highdrop `hitfloor` (named from
D-1263). Not toss_up.
**C locus:** `pickup.c` `tipcontainer` `:3732–3810`.
**Change:** `highdrop=!can_reach_floor(TRUE)`; swallow clears; then
`how_lost`+`hitfloor(TRUE)`. Non-highdrop keeps colon+`place_object`.
Named: altarizing; toss_up; invent getobj tip. Rule #2: no fs.
**Score:** fortress 44/44; public-unhit unless #tip while unable to
reach the floor. Next audit @**#1615**.
**Verified:** private canary **10**/10; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `dothrow.c` `toss_up` (named from D-1263). Not
hold_another_object.
**Blocked:** none.
## 2026-08-20 — D-1272 invent.c hold_another_object hitfloor(FALSE)

**Objective:** Open `invent.c` `hold_another_object` `hitfloor(FALSE)`
(named from D-1263). Not pickup highdrop.
**C locus:** `invent.c` `hold_another_object` `:1245–1305` drop_it
`:1299–1304`.
**Change:** Fumbling / invlet overflow / encumbrance>`pickup_burden`
then `dropx` or `freeinv`+`hitfloor(FALSE)`. Autoquiver on stay.
Named: fatal wished corpse; pickup highdrop; toss_up. Rule #2: no fs.
**Score:** fortress 44/44; public-unhit unless wish/horn/catch while
Fumbling, letter-full, or over burden. Next audit @**#1615**.
**Verified:** private canary **13**/13; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `pickup.c` highdrop `hitfloor` (named from D-1263).
Not toss_up.
**Blocked:** none.
## 2026-08-20 — D-1271 mon.c meatmetal

**Objective:** Open `monmove.c` `meatmetal` (named from D-1247). Not
switch_terrain.
**C locus:** `mon.c` `meatmetal` `:1462–1528`; caller `monmove.c`
`postmov` `:1663–1667`.
**Change:** non-pet metallivore eats top metallic floor object
(`obj_resists(5,95)` + `touch_artifact`); rust !rustprone skip /
rustproof spit+stun; `meating=owt/2+1` then live `m_consume_obj`;
leftover ROCK. Named: meatobj / meatcorpse. Rule #2: no fs.
**Score:** fortress 44/44; public-unhit unless a metallivore
`postmov`s onto metal. Next audit @**#1615**.
**Verified:** private canary **25**/25; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `invent.c` `hold_another_object` `hitfloor(FALSE)`
(named from D-1263). Not pickup highdrop.
**Blocked:** none.
## 2026-08-20 — #1610 review D-1267–D-1270 + cadence

**Objective:** audit — C-fidelity reviews **229–232** of JS SHAs
since `42d50a53`, plus full `sessions` score. No `js/` port.
**C locus:** `hack.c` `set_uinwater` / `spoteffects`; `dig.c`
`digactualhole`; `hack.c` `test_move` IRONBARS.
**Change:** four reviews, all **ACCEPT-WITH-DEBT**. No Must-fix
(named omits stay map: pooleffects leave / drown wade; `u_on_newpos`
MAX_TYPE writer; `maketrap` PIT/HOLE `set_levltyp`; Underwater /
rock Passes_walls). Filled D-1270 archive hash `a4aa34d3`. Open 11
(no refill). Rule #2: no fs.
**Score:** cadence **#1610** HEAD `a4aa34d3` **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`35+0.30/turn` (R² 0.858). seed0383 PASS. Next audit @**#1615**.
**Verified:** `__RESULTS_JSON__` at HEAD `a4aa34d3`; branch-by-branch
vs pinned C (`set_uinwater` change-gate; dest-typ before pooleffects;
PIT/HOLE `switch_terrain` sites; chew-then-`passes_bars`).
**Next:** Open `monmove.c` `meatmetal` (named from D-1247). Not
switch_terrain.
**Blocked:** none.
## 2026-08-20 — D-1270 hack.c hero test_move passes_bars

**Objective:** Open `hack.c` hero `test_move` `passes_bars` (named
from D-1258). Not ALLOW_BARS.
**C locus:** `hack.c` `test_move` `:1024–1036` IRONBARS arm.
**Change:** Passes_walls || `passes_bars(youmonst.data)` allows
bars in TEST_MOVE/`blocksMove`; DO_MOVE rust/corr/metallivore
awaits live `still_chewing`. Named: Underwater; rock Passes_walls
/ tunnels / autodig. Rule #2: no fs.
**Score:** fortress 44/44; public-unhit unless a session
Upolyd-walks onto IRONBARS. Next audit @**#1610**.
**Verified:** private canary **17**/17; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `monmove.c` `meatmetal` (named from D-1247). Not
switch_terrain.
**Blocked:** none.
## 2026-08-20 — D-1269 dig.c digactualhole switch_terrain

**Objective:** Open `dig.c` `digactualhole` `switch_terrain` (named
from D-1129). Not dissolve_bars.
**C locus:** `dig.c` `digactualhole` `:731–735` PIT after
`wake_nearby` (unconditional); `:754–759` HOLE `at_u` then
`Levitation || Flying` → `wont_fall`.
**Change:** `dig.js` awaits live D-1129 body at both sites and
re-reads youprop `Levitation()`/`Flying()`. Named: `maketrap`
PIT/HOLE `set_levltyp`; dothrow hurtle; `u_on_rndspot`; objnam
wish. Rule #2: no fs.
**Score:** fortress 44/44; public-unhit unless a session digs a
pit/hole with leftover Lev/Fly FROMOUTSIDE. Next audit @**#1610**.
**Verified:** private canary **16**/16; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `hack.c` hero `test_move` `passes_bars` (named from
D-1258). Not ALLOW_BARS.
**Blocked:** none.
