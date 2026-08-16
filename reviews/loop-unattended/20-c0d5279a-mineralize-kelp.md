# Review 20 — c0d5279a — mineralize kelp `!Is_waterlevel` + endgame return (D-1059)

## Metadata
- Full / short hash: `c0d5279af0a0abf9266268d3a82d490c4a8733eb` / `c0d5279a`
- Parent: `27f0a233` (D-1058; Open kelp popped; Must-fix empty at that SHA)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 03:33:31 +0200
- D-id: **D-1059**
- Stats: 11 files, +137 / −78 — `js/mklev.js` +31 (restructure `water_has_kelp`; `In_endgame` return before kelp; move −1 defaults into `mineralize`)
- Claims to close: Open queue tut-1 `des` kelp only (not stairs / box / key / `place_lregion`). Stamped **Addressed:** D-1059 on the archive row **without** the short hash (chicken-egg). This review commit fills `c0d5279a`.
- JS / map: `mklev.js` `water_has_kelp` / `mineralize`; `c-js-map/data.md` + `startup.md`. Cadence **#1335** this review iter **44**/44.

## Intent vs deliverable

Git subject promises: “Match C mineralize kelp so WATER uses !Is_waterlevel and endgame returns before the sprinkle.” Body adds: tut-1.lua has no `des.mineralize`; kelp is mklev `mineralize` after `load_tut1` on map P/W.

C `mklev.c:1430–1468` is `water_has_kelp`’s `&&`/`||` (POOL, or WATER && `!Is_waterlevel`, then MOAT) plus `mineralize`’s `if (!skip_lvl_checks && In_endgame) return` **before** the kelp loops. The queue line said tut-1 kelp, not stairs. The diff ships **those two guards** on the shared `mineralize` already called from `level_finalize_topology` after `load_tut1`. It does **not** add a tut-1-only kelp object, `lspo_mineralize`, or `des.stair`. D-log names those. The subject does not claim them.

It does **not** port tut-1 stairs / large-box / food / `place_lregion` / `tut_key`. Those remain Open.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `water_has_kelp` | C function, retouched | `mklev.c:1432–1439`; static in C, local in JS |
| `mineralize_kelp` | JS split of C’s kelp loops | `mklev.c:1465–1468`; no new defaults |
| `mineralize` | C function, retouched | `mklev.c:1449–1477`; now `export`; defaults then endgame return |
| `mksobj_at` | imported C callee | `KELP_FROND`, `TRUE`, `FALSE` — pre-existing |
| `In_endgame` | imported C macro | `dungeon.h:141` `dnum == astral_level.dnum` |
| `Is_waterlevel` | imported C macro | `dungeon.h:115` `Lcheck` dnum+dlevel |
| `load_tut1` | comment only this SHA | map `'P'`→POOL / `'W'`→WATER already; no kelp object |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. `fastforward.js` `fastforward_fill_mineralize` untouched (delete-only). Rule #2 clean. Frozen contracts untouched.

## Constitution / playbook

Grep of the `js/mklev.js` hunks: no trace-index gates, no recorded coordinates, no `fastforward` burns. The tut-1 comment cites C `mineralize(-1,-1,-1,-1,FALSE)`, not a seed-shaped kelp count. Contest Rule #2: no Node builtins in scored code.

## C ↔ JS fidelity

### `water_has_kelp` — C `&&` / `||` short-circuit, call-for-call

C `mklev.c:1432–1439`:

```
if ((kelp_pool && (levl[x][y].typ == POOL
                   || (levl[x][y].typ == WATER && !Is_waterlevel(&u.uz)))
     && !rn2(kelp_pool))
    || (kelp_moat && levl[x][y].typ == MOAT && !rn2(kelp_moat)))
    return TRUE;
return FALSE;
```

JS `mklev.js:18038–18046` is that expression (`game.u?.uz` for `&u.uz`; `!loc` → false is extra and dead inside the `x=2..COLNO-2`, `y=1..ROWNO-1` loops). `POOL=16`, `MOAT=17`, `WATER=18` match `rm.h:72–74`.

| Tile | C RNG | Prior JS | This SHA |
|------|-------|----------|----------|
| POOL, `kelp_pool>0` | `rn2(kelp_pool)` | same | **match** |
| WATER, not water plane | `rn2(kelp_pool)` | same | **match** |
| WATER, `Is_waterlevel` | **no** `rn2(kelp_pool)` (`&&` dies on `!Is_waterlevel`) | **did** `rn2(kelp_pool)` (`POOL \|\| WATER`) | **match C** |
| MOAT, `kelp_moat>0` | skip pool `rn2`; then `rn2(kelp_moat)` | two-if form, same skip | **match** |
| WATER + waterlevel + MOAT clause | second arm `typ==MOAT` false; no `rn2(kelp_moat)` | same | **match** |
| `kelp_pool==0` | first arm false, no `rn2` | same | **match** |

Worked example, `kelp_pool=10`, `kelp_moat=30`, one WATER cell on the water plane: C evaluates `kelp_pool && (POOL || (WATER && !Is_waterlevel))` → `10 && (false || (true && false))` → false, **never** calls `rn2(10)`; MOAT clause false; return false. Prior JS called `rn2(10)` because `POOL || WATER` was true. One WATER cell off the water plane: both C and this SHA call `rn2(10)` then maybe `mksobj_at`. Tut-1 `'W'` is the second case.

Prior JS `kelp_pool && (POOL \|\| WATER) && !rn2(kelp_pool)` burned a gameplay `rn2(10)` on every WATER cell on the water plane. C does not. That is the claimed WATER fix. Tut-1 is not the water plane (`Is_waterlevel` is `water_level` dnum+dlevel, `const.js:2961`). Tut-1 `'W'` tiles still take `rn2(10)` under defaults. Match.

`Is_waterlevel` is the real `Lcheck` helper, not a stub.

### `mineralize` — defaults, then endgame return **before** kelp

C `mklev.c:1457–1468`:

```
if (kelp_pool < 0) kelp_pool = 10;
if (kelp_moat < 0) kelp_moat = 30;
/* Place kelp, except on the plane of water */
if (!skip_lvl_checks && In_endgame(&u.uz))
    return;
for (x = 2; x < (COLNO - 2); x++)
    for (y = 1; y < (ROWNO - 1); y++)
        if (water_has_kelp(...))
            (void) mksobj_at(KELP_FROND, x, y, TRUE, FALSE);
```

The C comment says “plane of water”; the predicate is **all** endgame (`dungeon.h:141` `dnum == astral_level.dnum` — air/fire/water/earth/astral). JS `In_endgame` is that dnum check (`const.js:2959`). JS `mklev.js:18064–18069` moved the −1 defaults **out** of `mineralize_kelp` **into** `mineralize` (C’s place) and added the return. Prior JS kelped in endgame, then still ran the hell/special gold skip. C never kelps in endgame unless `skip_lvl_checks` (Lua `des.mineralize` / `lspo_mineralize`). Match.

`skip_lvl_checks && In_endgame`: C does **not** return; kelp proceeds. JS `if (!skip_lvl_checks && In_endgame) return` — same. Tut-1 uses `mineralize(-1,-1,-1,-1,false)` (`mklev.js:18324`, C `level_finalize_topology` `mklev.c:1550`). `skip` is false. Tut-1 is not endgame. Kelp runs. Then the pre-existing special-level return skips gold/gems (tut-1 is `Is_special`). Not this SHA.

`mineralize_kelp` is only called from `mineralize`. Moving defaults does not strand a `−1` caller.

`mksobj_at(KELP_FROND, x, y, true, false)` is the existing mkobj callee (`TRUE` init, `FALSE` artifact). **Not** “Match C dispatch, callee is a stub.” Loop bounds `x = 2 .. COLNO-2`, `y = 1 .. ROWNO-1` match C `for (x = 2; x < (COLNO - 2); x++)` / `for (y = 1; y < (ROWNO - 1); y++)`. JS `x < COLNO - 2` is the same exclusive end.

Gold/gems after kelp (`mklev.c:1470–1540`) are **not** this SHA. JS already had hell / V_tower / rogue / arboreal / most-special return after kelp, mines `goldprob*=2` / `gemprob*=3`, quest `/=4` `/=6`, `rn2(1000)` bury-vs-place (D-0014 / D-0177 / D-0537). Tut-1 is special + `is_maze_lev`; after kelp it still returns before rock deposits. This SHA must not be read as “Match C mineralize gold.” It did not touch those loops except moving kelp defaults earlier (C already defaulted before the endgame return; unused locals on the return path).

`export function mineralize` is new this SHA. Sole production caller remains `level_finalize_topology`. Harmless.

### Tut-1 path — comment is true; no new kelp object

C `mklev()`: `makelevel()` then `level_finalize_topology()` → `mineralize(-1,-1,-1,-1,FALSE)`. JS `mklev.js:766–775`: `makelevel()` then `level_finalize_topology()` → the same call. Tut-1 is `makemaz("tut-1")` → `load_tut1()`. Map `splev_chr2typ`: `'P'`→`POOL`, `'W'`→`WATER` (`mklev.js:15217–15221`). This SHA only adds a comment at the end of `load_tut1`. No `des.mineralize` opcode. Pinned `dat/tut-1.lua` is not in this tree as a loose file; the baked `TUT1_MAP` has `.P.` / `.W.` and no kelp object line. Match the D-log claim.

`lspo_mineralize` remains unported (named). Tut-1 does not call it.

`game.u?.uz` during `mklev`: C `mineralize` always sees `&u.uz` for the level being built. JS optional-chain: if `uz` were missing, `Is_waterlevel(undefined)` and `In_endgame(undefined)` are false → would kelp. Production `mklev` runs after `u.uz` is the new level. Not a tut-1 divergence.

C `water_has_kelp` is `staticfn`; JS keeps it file-local. C `mineralize` is global; JS export does not change call order.

C callers of `mineralize`: `level_finalize_topology` (`FALSE`) and `lspo_mineralize` (`skip_lvl_checks` TRUE, custom kelp/gold/gem probs). JS has only the first. A Lua `des.mineralize` on an endgame proto would kelp in C and still would not in JS until `lspo_mineralize` exists — named, unused by tut-1.

`In_endgame` is **not** `Is_waterlevel`. Fire/air/earth/astral share the endgame dnum, so C also skips kelp there. JS the same. Do not “fix” the return to `Is_waterlevel` only; that would kelp the plane of fire.

## Hallucinations / overclaim

“Match C mineralize kelp so WATER uses !Is_waterlevel and endgame returns before the sprinkle” is **true for the short-circuit, the defaults, the `In_endgame` return, and the existing `mklev()` call after `load_tut1`.** It is **not** true that `lspo_mineralize` exists, or that tut-1 stairs/box/key landed. The subject does not claim those. Kelp sprinkle is real `mksobj_at`, not a no-op.

Cadence **#1335** 44/44 does not newly prove kelp (tut-1 P/W `rn2(10)` was already in the D-0353 prefix). Journal admits public path unhit except that prefix. Private node P/W/M place, endgame skip, waterlevel WATER no `rn2`, defaults `rn2(10)×2+rn2(30)` are the right checks for **these** guards. They do not prove `lspo_mineralize`. The C comment “except on the plane of water” is implemented as `In_endgame`; this SHA copied that predicate, not a water-plane-only rewrite.

Stamping the Open item **Addressed:** D-1059 is fair. Fill hash `c0d5279a` in this commit.

## Density (§2b)

One Open cluster: C’s kelp envelope inside `mineralize` / `water_has_kelp`. Two related guards in one function family, not an unrelated multi-subsystem rewrite and not a one-bullet `if` peel. ~30 lines `mklev.js`. Slightly lean vs the 50–300 target; still one falsifier. Right size. Stairs left named on purpose.

C default `kelp_pool=10` / `kelp_moat=30` (`mklev.c:1457–1460`) is the tut-1 path (`mineralize(-1,-1,-1,-1,FALSE)`). A 1-in-10 POOL/WATER roll and 1-in-30 MOAT roll match that call, not a tut-1 hardcoded frond count.

## Verification

Journal: private node special P/W/M `kelp_pool=1` places 3, no `rn2(1000)`; `In_endgame` skip → 0 kelp; `skip_lvl_checks` still kelps; waterlevel WATER skip → no WATER kelp / no `rn2`; defaults `rn2(10)×2 + rn2(30)×1`. green+strict PASS; seed0009 **73**/73; cohort **8**/8. Path thin except tut-1 P/W already in prefix.

This review iter ran cadence full `sessions` (**#1335** **44**/44 Scr **11405**/11405 RNG **792838**/792838). C read of `mklev.c:1430–1573`, `dungeon.h:115`/`141`, `rm.h:72–74`, JS `mklev.js:766–775`/`15217–15221`/`18038–18069`/`18321–18324`, `const.js:2959–2961` is the audit. Grep of the `js/mklev.js` hunks: no `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / seed names in control flow.

## Actionable C-wrongs

None in the kelp guards this SHA shipped.

Named omits (map, not queue): tut-1 stairs / large-box / food / `place_lregion` / `tut_key` / nhcore disable (live Open); `lspo_mineralize` Lua opcode.

Do not skip `mineralize` `In_endgame` before kelp. Do not kelp WATER without `!Is_waterlevel`. Do not restore WATER≡POOL `rn2`. Do not peel RANGE_LEVEL timers. Do not treat tut-1.lua as having `des.mineralize`.

`KELP_FROND` is `objectNames.indexOf('KELP_FROND')` (`mklev.js:125`). C `mksobj_at` uses the `KELP_FROND` otyp. Same object. No tut-1 coordinate hardcode.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `water_has_kelp` short-circuit and `In_endgame` return-before-kelp match C branch order and RNG, with tut-1 still using the shared `mklev()` `mineralize(-1,-1,-1,-1,FALSE)` call.
