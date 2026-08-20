# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-20 — D-1268 hack.c spoteffects switch_terrain

**Objective:** Open `hack.c` `spoteffects` `switch_terrain` (named
from D-1129). Not dissolve_bars.
**C locus:** `hack.c` `spoteffects` `:3342–3347` (dest-typ ≠ origin
or `iflags.terrain_typ == MAX_TYPE` then `switch_terrain` before
`pooleffects`).
**Change:** `pickup.js` `spoteffects` awaits live D-1129 body under
that gate. Named: recursion / Warning ice / hidden monster;
`digactualhole` / dothrow hurtle / `u_on_rndspot` / objnam wish.
Rule #2: no fs.
**Score:** fortress 44/44; public-unhit unless a session walks onto
blocklev terrain while Lev/Fly. Next audit @**#1610**.
**Verified:** private canary **13**/13; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `dig.c` `digactualhole` `switch_terrain` (named from
D-1129). Not dissolve_bars.
**Blocked:** none.

## 2026-08-20 — D-1267 hack.c set_uinwater switch_terrain

**Objective:** Open `hack.c` `set_uinwater` `switch_terrain` (named
from D-1129). Not dissolve_bars.
**C locus:** `hack.c` `set_uinwater` `:3221–3227`; callers
`do.c` `boulder_hits_pool` `:128`, `trap.c` `drown` `:5170`,
`do.c` `goto_level` `:1621` / `:1716`.
**Change:** `set_uinwater` writes 0/1 only when `in_out` differs
from `(int)u.uinwater`, then awaits live `switch_terrain`. Wired
boulder dry-land, drown fail-crawl, goto_level leave+after-getlev.
Named: pooleffects leave / drown wade / zap freeze. Rule #2: no fs.
**Score:** fortress 44/44; public-unhit unless a session enters or
leaves water via those setters. Next audit @**#1610**.
**Verified:** private canary **18**/18; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `hack.c` `spoteffects` `switch_terrain` (named from
D-1129). Not dissolve_bars.
**Blocked:** none.

## 2026-08-20 — #1605 review D-1263–D-1266 + cadence

**Objective:** audit — C-fidelity reviews **225–228** of JS SHAs
since `72757d4c`, plus full `sessions` score. No `js/` port.
**C locus:** `dothrow.c` `hitfloor`; `uhitm.c` `gulpum` / `hmonas`
altwep; `hack.c` fight_empty `explum(null)`.
**Change:** four reviews, all **ACCEPT-WITH-DEBT**. No Must-fix
(named omits stay map: invent/pickup/toss_up `hitfloor`; skipdrin /
pit kick; pick-dig; `set_uinwater`). Filled D-1266 archive hash
`42d50a53`. Open 10 (no refill). Rule #2: no fs.
**Score:** cadence **#1605** HEAD `42d50a53` **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`36+0.30/turn` (R² 0.852). seed0383 PASS. Next audit @**#1610**.
**Verified:** `__RESULTS_JSON__` at HEAD `42d50a53`; branch-by-branch
vs pinned C (`hitfloor` dropz TRUE; `rnd(20+i)` `gulpum`; fight_empty
wake+`explum(null)`+rehumanize; altwep orig-slot + cursed drop).
**Next:** Open `hack.c` `set_uinwater` `switch_terrain` (named from
D-1129). Not dissolve_bars.
**Blocked:** none.

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
