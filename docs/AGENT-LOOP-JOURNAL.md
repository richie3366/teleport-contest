# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).

Use this shape:

```text
## YYYY-MM-DD HH:MM — #NNNN short title

- Objective: …
- C locus: …
- Change: …
- Verification: …
- Next: …
```
## 2026-08-19 02:05 — #1581 D-1246 bee_eat_jelly

**Objective:** Open `monmove.c` `bee_eat_jelly` (named). Not
mind_blast / iron bars.
**C locus:** `monmove.c` `find_pmmonst` `:374–388` /
`bee_eat_jelly` `:394–420` / dochug `:868–874`; `makemon.c`
`grow_up` killer-bee `!victim` → queen.
**Change:** no-queen eat (delay 3/5/7, split, `pline_mon`,
`delobj`, `grow_up` queen, freeze); live queen -1; geno
`mondied`. iron bars / `mon_yells` / `gelcube_digests` named.
Rule #2: no fs.
**Verified:** private canary **31**/31; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless a killer bee `dochug`s on jelly with no
living queen.
**Next:** Open `monmove.c` postmov iron bars (named). Not bee_eat.
**Blocked:** none.
## 2026-08-19 01:50 — #1580 review D-1242–D-1245 + cadence

**Objective:** audit — C-fidelity reviews **204–207** of JS SHAs
since `271e92e2`, plus full `sessions` score. No `js/` port.
**C locus:** `mhitm.c` gulpmm `snuff_lit` / `!goodpos` / AD_DGST
eat; `hack.c` hideunder after tread.
**Change:** four reviews, all **ACCEPT-WITH-DEBT**. No Must-fix
(named omits stay map: gulpmu invent; Medusa stone; NC_SHOW_MSG;
little_to_big; mimic unhide; container_impact; bee/bars/yells).
Filled D-1245 archive hash `6115dc58`. Open 10 (no refill).
Rule #2: no fs.
**Score:** cadence **#1580** HEAD `6115dc58` **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`36+0.29/turn` (R² 0.853). seed0383 PASS. Next audit @**#1585**.
**Verified:** `__RESULTS_JSON__` at HEAD `6115dc58`; branch-by-branch
vs pinned C (`snuff_lit` live `end_burn`; `goodpos` live;
`mondead` digest; `hideunder` youmonst live, not stubs).
**Next:** Open `monmove.c` `bee_eat_jelly` (named). Not hideunder.
**Blocked:** none.
## 2026-08-19 01:40 — #1579 D-1245 hideunder after tread

**Objective:** Open `hack.c` hideunder after impact (named from
D-1229). Not container_impact.
**C locus:** `hack.c` `domove_core` `:2949–2951` after tread
`:2944–2947`; `mon.c` `hideunder` youmonst `u.uundetected`.
**Change:** `hero_hideunder_after_move` after tread, before dest
`newsym`. `hides_under||S_EEL||dx||dy`. Mimic unhide /
container_impact named. Rule #2: no fs.
**Verified:** private canary **23**/23; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless Upolyd `hides_under`/eel or leftover
`u.uundetected`.
**Next:** Open `monmove.c` `bee_eat_jelly` (named). Not hideunder.
**Blocked:** none.
## 2026-08-19 01:23 — #1578 D-1244 gulpmm AD_DGST eat

**Objective:** Open `mhitm.c` gulpmm AD_DGST eat (named). Not
`!goodpos`.
**C locus:** `uhitm.c` `mhitm_ad_dgst` `:4506–4566` mhitm arm;
`mhitm.c` `mdamagem` `:1096–1116`; `mon.c` `monkilled`
disintegested; `mon_givit`; swallowed boom; `grow_up` null.
**Change:** instant digest + `mondead` (no corpse); cham/slime/
wraith `m_lev++`/nurse/`mon_givit`; tame `dog_nutrition`.
gulpmu invent / Medusa stone / NC_SHOW_MSG pline named. Rule #2:
no fs.
**Verified:** private canary **29**/29; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless AT_ENGL+AD_DGST magr gulps another mon.
**Next:** Open `hack.c` hideunder after impact (named from D-1229).
**Blocked:** none.
## 2026-08-19 00:59 — #1577 D-1243 gulpmm !goodpos return-home

**Objective:** Open `mhitm.c` gulpmm `!goodpos` return-home (named).
Not snuff_lit.
**C locus:** `mhitm.c` `gulpmm` `:932–947`; `teleport.c` `goodpos`
occupancy via grid `m_at`.
**Change:** DEF_DIED `!goodpos(..., MM_IGNOREWATER)` sends magr
home; hospitable dest stays. `teleport.js` `m_at` skips dead/
`MON_OFFMAP` (C grid). AD_DGST eat named. Rule #2: no fs.
**Verified:** private canary **26**/26; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless AT_ENGL gulps a wall-walk victim on stone.
**Next:** Open `mhitm.c` gulpmm AD_DGST eat (named). Not `!goodpos`.
**Blocked:** none.
## 2026-08-19 00:52 — #1576 D-1242 gulpmm snuff_lit minvent

**Objective:** Open `mhitm.c` gulpmm `snuff_lit` minvent (named).
Not `m_at` swap.
**C locus:** `mhitm.c` `gulpmm` `:868–871`; `apply.c` `snuff_lit`
`:1497–1514` / `snuff_candle` `:1472–1491`.
**Change:** `!flaming` minvent `nobj` walk `snuff_lit` (lamps /
lantern / `POT_OIL` then candles; `end_burn` TRUE). Sunsword otyp
not snuffed. gulpmu invent / `!goodpos` / AD_DGST named.
Rule #2: no fs.
**Verified:** private canary **27**/27; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless a non-flaming AT_ENGL gulps a minvent lamp.
**Next:** Open `mhitm.c` gulpmm `!goodpos` return-home (named).
Not snuff_lit.
**Blocked:** none.
## 2026-08-19 00:35 — #1575 review D-1238–D-1241 + cadence

**Objective:** audit — C-fidelity reviews **200–203** of JS SHAs
since `f217e059`, plus full `sessions` score. No `js/` port.
**C locus:** `monmove.c` `mind_blast`; `hack.c` `cannot_push` squeeze
/ `trap.c` `sokoban_guilt`; `uhitm.c` remaining `pline_mon`;
`mhitm.c` `passivemm` assess_dmg.
**Change:** four reviews, all **ACCEPT-WITH-DEBT**. No Must-fix
(named omits stay map: bee/bars/yells; giant pickup; unported
`mhitm_ad_*`; gulpmm snuff/`!goodpos`/AD_DGST). Filled D-1241
archive hash `9b5bd39d`. Open 9 (no refill). Rule #2: no fs.
**Score:** cadence **#1575** HEAD `9b5bd39d` **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`36+0.30/turn` (R² 0.852). seed0383 PASS. Next audit @**#1580**.
**Verified:** `__RESULTS_JSON__` at HEAD `9b5bd39d`; branch-by-branch
vs pinned C (`mind_blast` live callees; squeeze `return 0`;
`pline_mon` live; `monkilled(magr)` live, not a stub).
**Next:** Open `mhitm.c` gulpmm `snuff_lit` minvent (named). Not
`m_at` swap.
**Blocked:** none.
## 2026-08-19 00:20 — #1574 D-1241 passivemm monkilled(magr)

**Objective:** Open `mhitm.c` `passivemm` AD_RBRE shock
`monkilled` (named). Not troll_baned.
**C locus:** `mhitm.c` `passivemm` `:1304–1457`;
`paralyze_monst` `:1209–1219`.
**Change:** AT_NONE dice; AD_ACID goto assess (splash / erode
`rn2(5)` / weapon acid); AD_ENCH `spe--` after `obj_resists`
10/90; live `rn2(3)` COLD/FIRE/ELEC/PLYS/STUN; assess_dmg
`monkilled(magr)` no zombify. `mon_poly` AD_RBRE already live.
Golem MSLOW / `arti_reflects` / drain ABON named. Rule #2: no fs.
**Verified:** private canary **20**/20; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383. **Public-unhit** unless m-vs-m hits a live
AT_NONE acid/jelly/eye.
**Next:** Open `mhitm.c` gulpmm `snuff_lit` minvent (named).
Not `m_at` swap. Filled D-1240 archive hash `d8f28958`.
Open 9 after archive (no refill).
**Blocked:** none.
## 2026-08-19 00:06 — #1573 D-1240 uhitm remaining pline_mon

**Objective:** Open `uhitm.c` remaining `pline_mon` (named). Not
troll_baned.
**C locus:** `uhitm.c` `light_hits_gremlin` `:6425–6433`;
`mhitm_ad_legs` nuzzle `:4454`; `mhitm_ad_sedu` brag `:4647`.
**Change:** already-ported cry/recoil / nuzzle / brag `pline`→
`pline_mon`. flash awaken/blind, legs reach/prick, sedu charm-fail
stay `pline`. Unported `mhitm_ad_*` / mhitu `hitmsg` named.
Rule #2: no fs.
**Verified:** private canary **21**/21; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383. **Public-unhit** unless `accessiblemsg` is On.
**Next:** Open `mhitm.c` `passivemm` AD_RBRE shock `monkilled`
(named). Not troll_baned. Filled D-1239 archive hash `51a337e7`.
Open 10 after archive (no refill).
**Blocked:** none.
## 2026-08-18 23:55 — #1572 D-1239 cannot_push squeeze

**Objective:** Open `hack.c` cannot_push squeeze (named from
D-1226). Not run>=2 boulder.
**C locus:** `hack.c` `cannot_push` `:304–311`; `trap.c`
`sokoban_guilt` `:7039–7055`.
**Change:** vain-push then squeeze pline + `sokoban_guilt` +
return `0` so the hero occupies the boulder. Sokoban
`sokocheat++`/`change_luck(-1)`. Giant pickup/maneuver still
abort. Rule #2: no fs.
**Verified:** private canary **32**/32; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383. **Public-unhit** unless a squeezable hero walks
into an unpushable boulder.
**Next:** Open `uhitm.c` remaining `pline_mon` (named). Not
troll_baned. Filled D-1238 archive hash `6d2735b0`. Open 11
after archive (no refill).
**Blocked:** none.
