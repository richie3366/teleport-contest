# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
