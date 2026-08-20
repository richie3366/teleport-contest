# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-20 — D-1266 uhitm.c hmonas altwep / uswapwep

**Objective:** Open `uhitm.c` altwep / `uswapwep` (named from D-1252).
Not AT_ENGL.
**C locus:** `uhitm.c` `hmonas` `:5490–5543` / `:5838–5847`;
`wield.c` `drop_uswapwep`; `youprop.h` `Hate_silver`.
**Change:** poly multi-AT_WEAP now toggles onto `uswapwep` (one-handed
wep/weptool, no shield, not launcher/ammo/missile/artifact/silver+Hate),
re-reads the slot after `known_hitum`, and `drop_uswapwep`s a cursed
secondary at `passivedone` before DEADMONSTER. Named: skipdrin / pit
kick. Rule #2: no fs.
**Score:** fortress 44/44; public-unhit unless a poly'd hero dual-swings.
Next audit @**#1605**.
**Verified:** private canary **21**/21; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `hack.c` `set_uinwater` `switch_terrain` (named from
D-1129). Not dissolve_bars.
**Blocked:** none.
## 2026-08-20 — D-1265 hack.c fight_empty explum(null)

**Objective:** Open `uhitm.c` fight_empty `explum` (named from D-1251).
Not AT_ENGL.
**C locus:** `hack.c` `domove_fight_empty` `:2323–2334`; `uhitm.c`
`explum` `:4891–4928` (null mdef).
**Change:** Upolyd AT_EXPL force-fight empty/solid now uses C You()
harmlessly/futilely + explode-at, `nomul(0)`, `wake_nearto(7*7)`,
`explum(null)`, mh=-1 `rehumanize`. Named: altwep / pick-dig /
Underwater / Hallu statue / ansimpleoname. Rule #2: no fs.
**Score:** fortress 44/44; public-unhit unless a poly'd hero
force-fights empty. Next audit @**#1605**.
**Verified:** private canary **28**/28; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `uhitm.c` altwep / `uswapwep` (named from D-1252).
Not AT_ENGL.
**Blocked:** none.
## 2026-08-20 — D-1264 uhitm.c AT_ENGL gulpum

**Objective:** Open `uhitm.c` AT_ENGL `gulpum` (named from D-1251).
Not fight_empty.
**C locus:** `uhitm.c` `gulpum` `:4958–5194`; `start_engulf`
`:4931–4946`; `end_engulf` `:4949–4955`; `hmonas` AT_ENGL
`:5769–5794` (`rnd(20+i)`, shade surround, zombie/mummy Sick).
**Change:** `hmonas` no longer `continue`s AT_ENGL with AT_NONE.
`d()` then `engulf_target` then stuffed-digest/`uswallow` gate;
`!flaming` `snuff_lit`; vampshifter `newcham`; petrify / Rider
`done`; AD_DGST `xkilled` NOCORPSE + nutrition/`nomul`/`afternmv`;
PHYS/ACID/BLND/ELEC/COLD/FIRE/DREN; expel. Named: fight_empty
`explum` / altwep. Rule #2: no fs.
**Score:** fortress 44/44; public-unhit unless a poly'd hero uses
AT_ENGL. Next audit @**#1605**.
**Verified:** private canary **16**/16; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `uhitm.c` fight_empty `explum` (named from D-1251).
Not AT_ENGL.
**Blocked:** none.
## 2026-08-20 — D-1263 dothrow.c hitfloor dropz(TRUE)

**Objective:** Open `do.c` hitfloor `dropz(TRUE)` (named from D-1249).
Not container_impact.
**C locus:** `dothrow.c` `hitfloor` `:603–647`; callers `do.c:758–772`
`drop` `!can_reach_floor`; `mkobj.c:2920–2921` hornoplenty tip.
**Change:** live `hitfloor` in `dothrow.js`: soft/water/swallow
`dropy`; altar `doaltarobj` continues; verbosely WAN_STRIKING
strike + tseen trap overlay; `hero_breaks` BRK_FROM_INV;
`ship_object`; `dropz(TRUE)`. Wire drop levitation (no
`how_lost`) + horn tip. Deleted `hitfloor_horn`. Named:
invent hold_another_object / pickup highdrop / toss_up /
throwit dz / litter / finesse_ahriman. Rule #2: no fs.
**Score:** fortress 44/44; public-unhit unless levitation drop
or unreachable-floor horn tip. Next audit @**#1605**.
**Verified:** private canary **16**/16; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `uhitm.c` AT_ENGL `gulpum` (named from D-1251).
Not fight_empty.
**Blocked:** none.
## 2026-08-20 — #1600 review D-1258–D-1262 + cadence

**Objective:** audit — C-fidelity reviews **220–224** of JS SHAs
since `466adf3e`, plus full `sessions` score. No `js/` port.
**C locus:** `mondata.c` `passes_bars`; `monmove.c` `dissolve_bars`;
`hack.c` mimic unhide / `moverock_core` nopick; `mhitu.c` `hitmsg`.
**Change:** five reviews, all **ACCEPT-WITH-DEBT**. No Must-fix
(named omits stay map: hero `test_move` `passes_bars`;
`set_uinwater`/`spoteffects`/`digactualhole`; `display_self`
U_AP_TYPE; `missmu`/`mattacku` AT_TENT/`explmu`; Blind unseen
boulder feel). Filled D-1262 archive hash `72757d4c`. Open 9
(no refill). Rule #2: no fs.
**Score:** cadence **#1600** HEAD `e2aa4dbe` **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`36+0.30/turn` (R² 0.842). seed0383 PASS. Next audit @**#1605**.
**Verified:** `__RESULTS_JSON__` at HEAD `e2aa4dbe`; branch-by-branch
vs pinned C (`passes_bars` eight arms + ustuck; `u_at`
`switch_terrain`; `m_ap_type=NOTHING`; `hitmsg` `pline_mon`;
nopick before Levitation).
**Next:** Open `do.c` hitfloor `dropz(TRUE)` (named from D-1249).
Not container_impact.
**Blocked:** none.
## 2026-08-19 09:52 — D-1262 hack.c nopick m-dir over/against

**Objective:** Open `hack.c` nopick `m<dir>` over/against (named from
D-1253). Not giant pickup.
**C locus:** `hack.c` `moverock_core` `:382–413`; callees
`feel_location` / `throws_rocks` / `could_move_onto_boulder` /
`u_locomotion` / `sokoban_guilt`; caller `domove_core` `:2843–2848`.
**Change:** nopick before Levitation. Giant steps over; squeeze
Flying over/against; else in-way + glyph `door_opened`. Caller
keeps `move` when `door_opened`. Rule #2: no fs.
**Verified:** private canary **15**/15; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless `m<dir>` onto a boulder.
**Next:** Open `do.c` hitfloor `dropz(TRUE)` (named from D-1249).
Not container_impact.
**Blocked:** none.
## 2026-08-19 09:25 — D-1261 mhitu.c hitmsg

**Objective:** Open `mhitu.c` `hitmsg` (named from D-1240). Not
remaining uhitm `pline_mon`.
**C locus:** `mhitu.c` `hitmsg` `:29–81`. Callee `pline_mon`.
`hacklib.c` `s_suffix`; `mondata.h` `thick_skinned`.
**Change:** `pline`→`pline_mon`; AT_TENT `s_suffix` tentacles;
AT_EXPL/BOOM explodes; AT_KICK thick_skinned punct ".". Rule #2:
no fs.
**Verified:** private canary **19**/19; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless `accessiblemsg` On or AT_TENT/EXPL/BOOM /
thick-skinned kick (default Tourist human).
**Next:** Open `hack.c` nopick `m<dir>` over/against (named from
D-1253). Not giant pickup.
**Blocked:** none.
## 2026-08-19 08:53 — D-1260 hack.c mimic unhide

**Objective:** Open `hack.c` mimic unhide (named from D-1245). Not
hideunder.
**C locus:** `hack.c` `domove_core` `:2953–2960` after hideunder
before `check_leash`. `monst.h` `U_AP_TYPE` = `m_ap_type &
M_AP_TYPMASK`.
**Change:** `(dx||dy)` + OBJECT/FURNITURE → `m_ap_type=M_AP_NOTHING`
(not `seemimic`; mappearance leftover). After hideunder, before dest
`newsym`. Rule #2: no fs.
**Verified:** private canary **15**/15; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless the hero steps while `U_AP_TYPE` is
furniture/object (eat-mimic gold / `#monster`).
**Next:** Open `mhitu.c` `hitmsg` (named from D-1240). Not remaining
uhitm `pline_mon`.
**Blocked:** none.
## 2026-08-19 08:42 — #1597 D-1259 dissolve_bars switch_terrain

**Objective:** Open `hack.c` `switch_terrain` from `dissolve_bars`
(named from D-1247). Not ALLOW_BARS.
**C locus:** `monmove.c` `dissolve_bars` `:2170–2178`; callers
`still_chewing` / `postmov` / `zap.c` / `hit_bars`; body
`hack.c` `switch_terrain` `:3178–3217`.
**Change:** after `newsym`, `u_at` awaits live `switch_terrain`.
Callers await. IRONBARS is not `IS_OBSTRUCTED`. Rule #2: no fs.
**Verified:** private canary **18**/18; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless bars dissolve on the hero cell.
**Next:** Open `hack.c` mimic unhide (named from D-1245). Not
hideunder.
**Blocked:** none.
## 2026-08-19 07:40 — #1596 D-1258 ALLOW_BARS passes_bars

**Objective:** Open `monmove.c` ALLOW_BARS rust/corr/metallivore
(named from D-1247). Not gelcube. Recover iter-1596
`resource_exhausted` before commit.
**C locus:** `mondata.c` `passes_bars` `:552–563`; `mon.c`
`mon_allowflags` `:2104–2109`; `mfndpos` `:2225–2230`.
**Change:** export `passes_bars`/`dmgtype`/`slithy`; ALLOW_BARS from
C predicate + ustuck unsolid/verysmall subset; rust/corr skip
W_NONDIGGABLE bars. Hero `test_move` / `switch_terrain` named.
Rule #2: no fs.
**Verified:** private canary **40**/40; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless a bars-passer `mfndpos`s toward IRONBARS.
**Next:** Open `hack.c` `switch_terrain` from `dissolve_bars` (named
from D-1247). Not ALLOW_BARS.
**Blocked:** none.
## 2026-08-19 05:20 — #1595 review D-1254–D-1257 + cadence

**Objective:** audit — C-fidelity reviews **216–219** of JS SHAs
since `218836ee`, plus full `sessions` score. No `js/` port.
**C locus:** `mondata.c` `hates_silver`; `objnam.c` glob/doname CXN;
`trap.c` `launch_obj` LANDMINE/PIT; `monmove.c` `gelcube_digests`.
**Change:** four reviews, all **ACCEPT-WITH-DEBT**. No Must-fix
(review **212** silver clone shipped as D-1254; named omits stay
map: `dmgval` silver; EGG/MEAT_RING; `down_gate`; scatter
MAY_FRACTURE; `meatobj`/meatbox/poly). Filled D-1257 archive hash
`466adf3e`. Open 9 (no refill). Rule #2: no fs.
**Score:** cadence **#1595** HEAD `466adf3e` **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`40+0.33/turn` (R² 0.854). seed0383 PASS. Next audit @**#1600**.
**Verified:** `__RESULTS_JSON__` at HEAD `466adf3e`; branch-by-branch
vs pinned C (`hates_silver` mndx; doname skip-article + CXN;
LANDMINE `rn2(10)>2` live `fracture_rock`; gelcube extract+`delobj`).
**Next:** Open `monmove.c` ALLOW_BARS rust/corr/metallivore (named
from D-1247). Not gelcube.
**Blocked:** none.
## 2026-08-19 05:10 — #1594 D-1257 gelcube_digests

**Objective:** Open `monmove.c` `gelcube_digests` (named from D-1246).
Not `mon_yells`.
**C locus:** `monmove.c` `gelcube_digests` `:422–445`; `dochug`
`:876–878`; `worn.c` `extract_from_minvent`; `mon.c` `m_consume_obj`.
**Change:** first organic non-artifact non-prize minvent;
`eaten_stat` + extract + non-pet `healmon(oc_weight)`/`delobj`.
Prize `obj.h` macros. `meatobj` / meatbox / poly named. Rule #2: no fs.
**Verified:** private canary **40**/40; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless a cube `dochug`s with digestible minvent.
**Next:** Open `monmove.c` ALLOW_BARS rust/corr/metallivore (named from
D-1247). Not gelcube.
**Blocked:** none.
## 2026-08-19 04:55 — #1593 D-1256 landmine·pit mid-roll

**Objective:** Open `trap.c` landmine·pit mid-roll (named from
D-1237). Not rolling-boulder TELEP.
**C locus:** `trap.c` `launch_obj` `:3436–3507` LANDMINE / PIT /
SPIKED_PIT / HOLE / TRAPDOOR; `do.c` `flooreffects` boulder+pit;
`zap.c` `fracture_rock`.
**Change:** ROLL + BOULDER + `t_at`: LANDMINE `rn2(10)>2` `set_msg_xy`
then KAABLAMM / `deltrap` / `fracture_rock` / `scatter`; pit family
`flooreffects("fall")` + `dist=-1`. TELEP D-1237 unchanged.
down_gate / boulder-chain / post-switch flooreffects still named.
Rule #2: no fs.
**Verified:** private canary **23**/23; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless a rolling boulder crosses a landmine or pit.
**Next:** Open `monmove.c` `gelcube_digests` (named from D-1246).
Not `mon_yells`.
**Blocked:** none.
## 2026-08-19 04:45 — #1592 D-1255 glob / doname CXN

**Objective:** Open `objnam.c` glob / doname CXN_ARTICLE|CXN_NOCORPSE
(named from D-1234). Not unique/pname adjective.
**C locus:** `objnam.c` `corpse_xname` `:1841–1900`; `xname_flags`
FOOD_CLASS `:783–789`; `doname_base` `:1288–1291` / `:1507–1523`.
**Change:** glob `OBJ_NAME` + skip omit_corpse; xname small/medium/
large/very large from owt; doname skip article on CORPSE and
`corpse_xname(prefix, CXN_ARTICLE|CXN_NOCORPSE)` so unique/pname
invent is possessive. EGG / MEAT_RING still named. Rule #2: no fs.
**Verified:** private canary **45**/45; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless a public session shows a glob or unique/pname
corpse in invent.
**Next:** Open `trap.c` landmine·pit mid-roll (named from D-1237).
Not rolling-boulder TELEP.
**Blocked:** none.
## 2026-08-19 04:30 — #1591 D-1254 hates_silver

**Objective:** Must-fix `weapon.c` `special_dmgval` `mon_hates_silver`
= C `hates_silver` (review **212**). Not glob/doname.
**C locus:** `mondata.c` `hates_silver` `:524–528` /
`mon_hates_silver` `:517–519`; callers `weapon.c` `special_dmgval`
`:401–422` / `select_hwep` `:734–735`; `muse.c` whip yank.
**Change:** canonical `hates_silver`/`mon_hates_silver` in
`monsters.js` (were / S_VAMPIRE / demon / shade / S_IMP except tengu
+ `is_vampshifter`). Deleted `M2_WERE|M2_DEMON` clones in
`weapon.js`/`muse.js`. Did not pull `dmgval` silver or AT_ENGL.
Rule #2: no fs.
**Verified:** private canary **21**/21; green+strict seed8000/0900;
cohort **9**/9 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless a public session hugs a shade with silver
or a shade/vampire/imp selects a silver hwep.
**Next:** Open `objnam.c` glob / doname CXN_ARTICLE|CXN_NOCORPSE
(named from D-1234). Not unique/pname adjective.
**Blocked:** none.
