# Review 78 — afb86487 — `gush` `minliquid` when `m_at` (D-1117)

## Metadata
- Full / short hash: `afb864876339e4b195965da5f868e892ea6e5711` / `afb86487`
- Parent: `b85be611` (review **74–77** + cadence #1420). This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 00:06:46 +0200
- D-id: **D-1117**
- Stats: 12 files, +177 / −64 — `js/fountain.js` +15 / −4 (`gush` dispatch); `js/mon.js` +85 / −20 (`minliquid` wrapper + iron rust + pool drown).
- Claims to close: Open queue `fountain.c` `gush` `minliquid` body (named). Not dogushforth. Review **77** named omit 4. `reviews/loop-2026-08-15/` has no open gush Must-fix.
- JS / map: `fountain.js` `gush`; `mon.js` `minliquid` / `minliquid_core`. `c-js-map/data.md` fountain + `mon.c` rows. `set_levltyp` side effects, steed Flying/Levitation, lava `xkilled`/`on_fire`/`fire_damage_chain`, `deal_with_overcrowding`, `engulfing_u` flush still named.
- Prior reviews this SHA claims to close: **77** item 4 (`gush` `minliquid` body).

## Intent vs deliverable

Git subject promises: “Match C fountain.c gush so a monster on a new pool runs minliquid instead of a silent newsym.”

Old JS `gush` set `typ=POOL`, damaged objects, then **always** `newsym`, with `void mtmp`. C `fountain.c:157–160` calls `minliquid(mtmp)` when occupied and `newsym` only when empty. A surviving flyer/swimmer, an iron golem that rusts, or a drowning goblin never ran C’s liquid core.

The diff **does** that dispatch and ports the pool envelope of `minliquid_core` that gush can hit: iron-golem `!rn2(5)` `d(2,6)` + `mondied`, drown pline + `mondied` vs `xkilled(XKILL_NOMSG)`, teleport-away `rloc(RLOC_MSG)` actually awaited. It does **not** port lava `on_fire` / `xkilled(!mon_moving)` (still `mondead_liquid`), steed Flying/Levitation, `engulfing_u` flush, or `set_levltyp` beyond `typ`/`flags`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `gush` occupied/empty | C body, **rewritten** | `fountain.c:157–160`; was always `newsym` |
| `minliquid` `sad_feeling` | C wrapper, **rewritten** | `mon.c:947–956`; try/finally ≡ always-clear |
| `minliquid_core` iron golem | C body, **new** | `mon.c:993–1008` |
| `minliquid_core` pool drown | C body, **rewritten** | `mon.c:1068–1109`; was `mondead_liquid` |
| `d(2,6)` | C callee, **imported** | `rng.js`; two `RND(6)+1`, outer log |
| `mondied` | C callee, **imported** | `mhitm.js` ≡ `mon.c` mondied + corpse |
| `xkilled` | C callee, **imported** | `uhitm.js`; dynamic import (cycle) |
| `rloc(..., RLOC_MSG)` | C callee, **imported** | now `await`; flags `0x02` / `0x04` ≡ `hack.h` |
| `water_damage_chain` | C callee, **imported** | invent `FALSE`; floor objects already `TRUE` |
| `Monnam` / `mon_nam` | C callees, **imported** | drown You-line needs `mon_nam` |
| `cant_drown` | C macro, **clone** | `mondata.h`; swimmer\|\|amphibious\|\|breathless |
| lava death | C body, **named omit** | still `mondead_liquid`; gush is pool-only |
| steed Flying/Levitation | C body, **named omit** | `mon.c:980–981`; gush skips `u_at` |
| `engulfing_u` flush | C body, **named omit** | `mon.c:1088–1093` |
| `deal_with_overcrowding` | C callee, **named omit** | after failed survivor `rloc` |
| `set_levltyp` | C callee, **named omit** | JS still `loc.typ = POOL` |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. **New RNG on the iron/drown path:** `!rn2(5)` then `d(2,6)` (iron); drown has no extra roll after the existing `can_teleport`/`rloc` 50× `rnd`/`rn2`. Gremlin `rn2(3)` unchanged (D-1095). Outer `gush` still `rn2(1+distmin)` before the pool.

## Constitution / playbook

Grep of the `js/fountain.js` + `js/mon.js` hunks: no trace-index gates. `x,y` are `gush`/`do_clear_area` cells, not recorded session coordinates. Contest Rule #2: no Node builtins. Dynamic `import('./uhitm.js')` is ESM, not `fs`. One await boundary still `nhgetch`.

## C ↔ JS fidelity

### gush dispatch

C `fountain.c:150–160`:

```
set_levltyp(x, y, POOL);
levl[x][y].flags = 0;
del_engr_at(x, y);
water_damage_chain(svl.level.objects[x][y], TRUE);

if ((mtmp = m_at(x, y)) != 0)
    (void) minliquid(mtmp);
else
    newsym(x, y);
```

JS `679–707`: same skip gates (`(x+y)%2`, `u_at`, `rn2(1+distmin)`, ROOM, boulder, `nexttodoor`, `delfloortrap`), then `typ=POOL` / `flags=0` / `del_engr_at` / `water_damage_chain(..., true)`, then `if (mtmp) await minliquid(mtmp); else newsym`. C ignores `minliquid`’s return; JS same. If the monster lives, C does **not** `newsym` the pool — JS same. Match for the Open line.

### minliquid wrapper

C `mon.c:947–956` sets `iflags.sad_feeling = (mtame && !canseemon)` then `minliquid_core` then **always** clears the flag. JS `1123–1132` uses try/finally. Extra early `if (!mtmp \|\| mhp<=0) return 1` is not in C; `m_at` after a fresh POOL does not return a dead monster. Not a Must-fix.

### Iron golem — branch order and RNG

C `mon.c:987–1008`: gremlin `(inpool\|\|infountain) && rn2(3)` **returns 0**; `else if` iron `inpool && !rn2(5)`. JS is two sequential `if`s because the gremlin arm returns — equivalent, cannot fall through.

Iron: `dam = d(2,6)`; `cansee` → `"%s rusts."`; `mhp -= dam`; `mhpmax > dam` then `mhpmax -= dam`; `DEADMONSTER` → `mondied`; if still dead return 1; else `water_damage_chain(minvent, FALSE)` return 0.

JS `1161–1176`: `!rn2(5)` then `d(2,6)` then the same hp/max/`mondied`/`water_damage_chain` order. `DEADMONSTER` ≡ `mhp <= 0` here. `mondied` is the real `mhitm.js` function (corpse via `corpse_chance`), not a glyph stand-in. Match.

### Pool drown — branch order and RNG

C `mon.c:1068–1109` after gremlin/iron/lava:

1. `(waterwall \|\| !is_clinger) && !cant_drown`
2. `can_teleport && !tele_restrict` then `rloc(RLOC_MSG)` → return 0
3. `cansee`: `mon_moving` → `"%s drowns."` else `You("drown %s.", mon_nam)`
4. `engulfing_u` flush pline (named skip)
5. `mon_moving` → `mondied` else `xkilled(XKILL_NOMSG)`
6. if still alive and not `m_in_air`: `water_damage_chain` + `rloc(RLOC_NOMSG)` / overcrowding
7. return 1 if dead, 0 if lifesaved

JS `1202–1231`: same 1–3, 5–7. `XKILL_NOMSG` is `0x1` ≡ `hack.h:1369`. `RLOC_MSG=0x02` / `RLOC_NOMSG=0x04` ≡ `hack.h:1393–1394`. Old JS passed `rloc(mtmp, 0)` **without await**; `rloc` is `async`, so a Promise is always truthy and a `can_teleport` monster would “escape” without moving or drowning. Awaiting `RLOC_MSG` is the C call, not a new theory.

Gush is a hero action (`dogushforth` from drink/dig), so `context.mon_moving` is false → `xkilled`. C same.

Lava still `mondead_liquid` then `return 1` (no `xkilled`, no `on_fire` pline, no lifesave check). Named; gush never creates lava.

Gremlin arm (D-1095, not this SHA’s claim): `split_mon` then `dryup(..., FALSE)` then `water_damage_chain` only if `inpool`. Still before iron. Iron is `else if` in C; JS sequential `if` after `return 0` — same. `inpool` uses `is_pool(mx,my)` after `typ=POOL`, so a gush victim is in a pool unless flyer/floater (and not Plane of Water). Flyers skip iron and skip drown (`cant_drown` / clinger / `inpool` false). C same.

`dogushforth` still collects `couldsee` cells then `await gush` each — this SHA does not retouch that order. `minliquid` return is still discarded, like C `(void)`.

`pline_mon(mtmp, "%s rusts.", Monnam(mtmp))` ≡ `pline(\`${Monnam(mtmp)} rusts.\`)` under the same `cansee` gate. Drown `You("drown %s.", mon_nam(mtmp))` ≡ `You drown ${mon_nam(mtmp)}.` `sad_feeling` is for `mondead`/`xkilled` unseen pets — drown `xkilled` can use it; iron `mondied` too. Wrapper always clears even if those throw.

Say it explicitly: this is **not** “Match C dispatch, callee is a stub.” `gush` calls `minliquid`. The callee is `mon.c` `minliquid`/`minliquid_core` with the pool arms filled. `mondied` / `xkilled` / `rloc` / `d` are imported C functions. Lava remains a named partial of the **same** function, not a fake success of the Open line.

## Hallucinations / overclaim

D-log / CURRENT / subject say the occupied cell runs `minliquid` instead of silent `newsym`. That is what the `gush` hunk does. They do **not** claim lava `xkilled`, steed, or `set_levltyp`. Map fountain row names those. Stamping **Addressed:** D-1117 is fair. Hash `afb86487` is on the archive row (filled by D-1118).

## Density

Caller `gush` plus the pool envelope of the shared callee (`sad_feeling`, iron, drown, `rloc` flags). One C family (`fountain.c` gush / `mon.c` minliquid). ~100 JS lines. Not a one-`if` peel and not “finish mon.c”. Lava/steed left named in that function — related deferrals, not a second hypothesis.

## Verification

Journal: private canary **19**/19 (dispatch, flyer/swimmer skip, iron hit+miss `d(2,6)`, goblin drown `!mon_moving`/`mon_moving`, gremlin `rn2(3)`, `sad_feeling` clear); green+strict seed8000/0900; cohort **19**/19 including 0014/0360/4500/2200 + fountain/role set; path **public-unhit** (0014 gush cells had no `m_at`). Cadence fortress is not an occupied-pool proof. This audit’s full `sessions` (cadence **#1425**) still **44**/44 — no regression, still not a gush-`m_at` hit.

C read of `fountain.c:134–161`, `mon.c:947–1121`; JS `fountain.js:679–707`, `mon.js:1123–1243`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| empty new pool | `newsym` | **same** |
| occupied | `minliquid` only | **same** |
| iron `rn2(5)==0` | `d(2,6)` rust `mondied` | **same** |
| iron miss | fall through to drown/lava | **same** (return 0 only on the rust arm) |
| drown `!mon_moving` | `xkilled(NOMSG)` | **same** |
| drown `mon_moving` | `mondied` | **same** |
| `can_teleport` escape | `await rloc(RLOC_MSG)` | **same** (was Promise-truthy skip) |
| lava death | `mondead`/`xkilled` + `on_fire` | **still `mondead_liquid`** (named) |
| engulfing flush | pline | **named skip** |
| always `newsym` | (old JS) | **gone** |

## Actionable C-wrongs

None that Must-fix this next iter. Occupied `gush` matches `fountain.c:157–160`; iron and pool drown match `mon.c:993–1008` / `:1081–1109`.

Named omits / do-nots (map / Open, not Must-fix):

1. Lava `minliquid_core` still `mondead_liquid` vs C `mon_moving` → `mondead` else `xkilled` + `on_fire` plines + `fire_damage_chain` (`mon.c:1010–1066`).
2. Steed `Flying \|\| Levitation` early return (`mon.c:980–981`). Gush skips `u_at`; other `minliquid` callers can still hit it.
3. `engulfing_u` drown flush (`mon.c:1088–1093`); `deal_with_overcrowding` after failed survivor `rloc`.
4. `set_levltyp` side effects (`fountain.c:151`); JS still assigns `typ`/`flags`.
5. Do not restore `void mtmp; newsym`. Do not pass `rloc` a Promise-unchecked `0`. Do not skip `xkilled` on `!mon_moving` drown. Do not pull drinksink `polyself` into this SHA — **Addressed:** D-1118 `8a01c200`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: an occupied gush pool now runs `minliquid` (iron rust `d(2,6)`, drown `mondied`/`xkilled`, awaited `rloc(RLOC_MSG)`) instead of a silent `newsym`, while lava/`set_levltyp`/steed stay named.
- Must-fix stays empty for this SHA; next port popped Open drinksink case 10 `polyself`. **Addressed:** D-1118 `8a01c200`. Not dipsink.
