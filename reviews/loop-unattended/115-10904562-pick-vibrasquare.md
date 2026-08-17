# Review 115 — 10904562 — pick_vibrasquare_location / hellfill VS (D-1154)

## Metadata
- Full / short hash: `10904562e7173bc9671882599ae39067a8129289` / `10904562`
- Parent: `b332516f` (D-1153). This file audits **this SHA only**. Archive row **Addressed:** D-1154 `10904562` was filled by D-1155.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 12:34:06 +0200
- D-id: **D-1154**
- Stats: 13 files, +204 / −55 — `js/mklev.js` +94 / −7 (picker + VS `create_trap` + hellfill + `occupied`); `js/hack.js` / `js/teleport.js` comments.
- Claims to close: Open queue `mkmaze.c` `inv_pos` / VIBRATING_SQUARE (named from invocation_pos). Not teleds. Reviews **102** / **111** named `mkmaze.c` placement. `reviews/loop-2026-08-15/` has no open inv_pos Must-fix.
- JS / map: `mklev.js` `pick_vibrasquare_location` / `splev_create_trap` / `load_hellfill` / `occupied`; `hack.js` `invocation_pos` already reads `game.svi.inv_pos`. `c-js-map/data.md` hellfill. `makemaz("")` `create_maze` VS, `Can_dig_down` !Invocation_lev, apply.js clone, shared `dungeon.c` export still named.
- Prior reviews this SHA claims to close: **102** / **111** named `inv_pos`; D-1153 next-port.

## Intent vs deliverable

Git subject promises: “Match C mkmaze.c pick_vibrasquare_location so Invocation_lev hellfill stores svi.inv_pos and places a VIBRATING_SQUARE, instead of always planting a down stair.”

Old JS `load_hellfill` always `splev_create_stair(false)`. `occupied` commented invocation as always-false. `svi.inv_pos` was never written, so D-1141/D-1150 `invocation_message` could not fire from a generated square.

C `dat/hellfill.lua:437–441`: `u.invocation_level` → `des.trap("vibrating square")` else down stair. `sp_lev.c:1818–1821` `create_trap` VS: `pick_vibrasquare_location(); maketrap(svi.inv_pos.x, svi.inv_pos.y, VIBRATING_SQUARE); return` (no DRY). `mkmaze.c:1042–1087` picks away from upstairs. `makemaz` `:1211–1216` is the non-lua twin (named omit).

The diff **does** port the picker, the VS `create_trap` arm, hellfill’s invocation branch, and `occupied`’s `invocation_pos`. It does **not** wire `makemaz("")` `create_maze` (`mkmaze.c:1214–1216`; JS `makemaz` empty proto still returns). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `pick_vibrasquare_location` | C callee, **new** | `mkmaze.c:1042–1093` |
| `splev_create_trap(VS)` | C `create_trap`, **new arm** | `sp_lev.c:1818–1821`; no DRY |
| `load_hellfill` VS vs down | C lua, **rewritten** | `hellfill.lua:437–441` / `nhlua.c:2021` `Invocation_lev` |
| `occupied` `invocation_pos` | C conjunct, **added** | `mklev.c:1806–1811` |
| `Invocation_lev_mk` | C `Invocation_lev`, **clone** | `dungeon.c:2017–2021` / `In_hell` hellish |
| `invocation_pos_mk` | C `invocation_pos`, **clone** | `hack.c:982–986`; writes via `svi_inv_pos` |
| `svi_inv_pos` | C `svi.inv_pos`, **bag** | `decl.c` always a coord; JS creates `{0,0}` |
| `stairway_find_dir(true)` | C callee, **local** | upstairs; no-upstairs short-circuit |
| `SPACE_POS` / `distmin` / `rn1` | C, **imported** | `const.js` `typ > DOOR`; `hacklib.js` |
| `maketrap(..., VIBRATING_SQUARE)` | C callee, **imported** | existing |
| `makemaz("")` VS | C caller, **named omit** | `mkmaze.c:1214–1216` |
| `hack.js` `invocation_pos` | C callee, **pre-existing** | reads `game.svi.inv_pos` this SHA writes |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names. `INVPOS_*` are C macros (`6-2`, `5-2`, `11`), not recorded cells. Rule #2 clean.

**New RNG on this path:** two `rn1` per try (x then y) until upstairs-constraint / `SPACE_POS` / `occupied` pass or `trycnt>1000`. No-upstairs: **one** pair (C `while ((stway = stairway_find_dir(TRUE)) && …)` short-circuits). Hellfill non-invocation still only down-stair RNG. Path **public-unhit** on Invocation_lev.

## Constitution / playbook

Grep of the JS hunks: no seed-named branches. Do not hardcode an inv_pos. Do not skip the upstairs row/col/diagonal/`distmin<=11` retry. Do not treat unset `{0,0}` as a legal maze cell (C: not `isok` as a walk dest; x starts at 1). Do not pull `makemaz("")` create_maze into this peel.

## C ↔ JS fidelity

### Picker RNG and retry

C `mkmaze.c:1065–1087`:

```
int x_range = gx.x_maze_max - 2 - 2*(6-2) - 1,
    y_range = gy.y_maze_max - 2 - 2*(5-2) - 1;
svi.inv_pos.x = svi.inv_pos.y = 0; /*{occupied() => invocation_pos()}*/
do {
    x = rn1(x_range, 2 + 4 + 1);
    y = rn1(y_range, 2 + 3 + 1);
    if (++trycnt > 1000) break;
} while (((stway = stairway_find_dir(TRUE)) != 0)
         && (x == stway->sx || y == stway->sy
             || abs(x - stway->sx) == abs(y - stway->sy)
             || distmin(x, y, stway->sx, stway->sy) <= 11
             || !SPACE_POS(levl[x][y].typ) || occupied(x, y)));
svi.inv_pos.x = x; svi.inv_pos.y = y;
```

JS `mklev.js:9617–9644`: same margins, `maze_x_max()`/`maze_y_max()`, zero `ip` first so `occupied`’s new `invocation_pos` does not self-reject, `rn1` pair, `trycnt>1000` break, `stairway_find_dir(true)` && same disjunction, then store. C small-maze `debugpline2` omitted (debug only). Match.

No-upstairs: C `stway==0` makes the `while` false after the first pair even if the cell is STONE/occupied. JS `&&` same. Documented. Match.

### `create_trap` VS vs hellfill

C `sp_lev.c:1818–1821` returns before DRY `get_location_coord`. JS `splev_create_trap(type)`: `(type|0)===VIBRATING_SQUARE` (23) picks then `maketrap`. Callers `splev_create_trap()` with no arg: `undefined|0 === 23` is false → old DRY path. Match.

`load_hellfill`: `Invocation_lev_mk(g.u.uz)` → `splev_create_trap(VIBRATING_SQUARE)` else down stair. Clone: `In_hell` ≡ `dungeons[dnum].flags.hellish` and `dlevel == num_dunlevs-1` (`dungeon.c:1942–1944`, `:2017–2021`). Lua `u.invocation_level` is that boolean (`nhlua.c:2021`). Match the Open **hellfill** line.

### `occupied` / `invocation_pos`

C `mklev.c:1806–1811`: `t_at || IS_FURNITURE || is_lava || is_pool || invocation_pos`. JS adds `invocation_pos_mk` beside existing `LAVAPOOL`/`LAVAWALL`/`IS_POOL` typ tests. Those typ tests are **pre-existing** in this helper (D-1077/D-1090 `is_lava`/`is_pool` include DRAWBRIDGE_UP+`DB_*`; `occupied` still does not). Not introduced by the VS wire; Gehennom hellfill almost never plants a raised drawbridge on the picker. Named as occupied debt, not a Must-fix on this Open line.

C `invocation_pos`: `Invocation_lev(&u.uz) && x==svi.inv_pos.x && y==svi.inv_pos.y`. Unset coord is `{0,0}` (always present). JS `svi_inv_pos()` creates that bag. `hack.js` `invocation_pos` reads `game.svi.inv_pos` (same store). After this SHA a hellfill Invocation_lev write is visible to D-1141/D-1150. Match.

### `Invocation_lev` clone vs `hack.js`

C `dungeon.c:2017–2021` is `In_hell(lev) && lev->dlevel == dungeons[dnum].num_dunlevs - 1`. `In_hell` is `dungeons[dnum].flags.hellish` (`:1942–1944`). JS `Invocation_lev_mk` same two tests. `hack.js:1537–1541` is a sibling clone; both read `game.dungeons`. `hack.js` `invocation_pos` (`:1584–1589`) reads `game.svi.inv_pos` this SHA writes. After hellfill Invocation_lev, D-1141/D-1150 can fire. Unset `{0,0}`: C always has the coord; JS `svi_inv_pos()` creates it. `(0,0)` is not a legal maze cell (`isok` requires `x>=1`). Match.

### `SPACE_POS` / upstairs

C `SPACE_POS(typ)` is `typ > DOOR` (`rm.h`). JS `const.js` same. STONE/wall fail the retry; ROOM/CORR pass if not occupied. `stairway_find_dir(TRUE)` is upstairs (`s.up===true`). Hellfill always plants `splev_create_stair(true)` first, so the no-upstairs short-circuit is for `makemaz` / missing stairs, not the Open hellfill path.

### `makemaz("")` still named

C `mkmaze.c:1211–1216` also picks VS instead of a down stair when `Invocation_lev`. JS `makemaz` empty protofile still returns; `makelevel_ordinary` still does not take the hell `makemaz("")` branch. Named. This SHA’s subject scoped **hellfill**. Honest.

`occupied` typ tests (`LAVAPOOL`/`IS_POOL`) vs D-1077/D-1090 `is_lava`/`is_pool` (DRAWBRIDGE_UP+`DB_*`) stay a pre-existing clone on a helper this SHA extended. Hellfill styles do not plant raised drawbridges on the picker. Map debt, not Must-fix.

## Hallucinations / overclaim

D-log / CURRENT / subject say Invocation_lev hellfill stores `svi.inv_pos` and places a VIBRATING_SQUARE instead of always a down stair. **That is the hunk:** picker + VS `create_trap` + hellfill branch + occupied conjunct. Stamping **Addressed:** D-1154 is fair for the Open **hellfill / lua** line. Hash `10904562` is on the archive row (filled by D-1155). Do **not** stamp it as “Match C `makemaz("")` create_maze VS” or “apply.js now shares `Invocation_lev`.” This is **not** “Match C dispatch, callee is a stub”: `maketrap` / `SPACE_POS` / `distmin` / `stairway_find_dir` are real or matching clones.

## Density

Picker + VS arm + hellfill branch + occupied conjunct is one C family (lua trap ≡ `create_trap` VS ≡ picker). ~90 JS. Right size (§2b). Not `mkinvokearea`. Not QUALITY-RISK.

## Verification

Journal: private canary **33**/33 (range; stairs row/col/diag/distmin; SPACE_POS; no-stairs 2 `rn1`; occupied + invocation_pos on/off Invocation_lev; botlevel/not-hellish; maketrap VS; fountain/trap/STONE skip; pool; stale 99,99; (0,0) vs (1,0); !isok); green+strict seed8000/0900; cohort **24**/24 including 0360/4500 hellfill + 0012 vault + 0004/2200/0030/0002/0006/0007/0009/0014/0017/0060/0102/0106/0108/0116/0361/0367/0373/0383/0700/1500/1800 + strict 0012/0004/0360/4500/2200/0030/0002/0367. Path **public-unhit** on Invocation_lev. Cadence does not generate the vibrating square.

C read of `mkmaze.c:1042–1093`, `:1211–1216`, `sp_lev.c:1818–1821`, `hellfill.lua:437–441`, `mklev.c:1806–1811`, `dungeon.c:2017–2021`, `hack.c:982–986`; JS SHA picker + hellfill + occupied. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| hellfill Invocation_lev | pick + maketrap VS, no down stair | **same** |
| hellfill not invocation | down stair | **same** |
| no upstairs | first rn1 pair kept | **same** |
| occupied now sees inv_pos | yes (after store) | **same** |
| `makemaz("")` Invocation_lev | pick + VS | **named skip** |

## Actionable C-wrongs

None that Must-fix this next iter. Hellfill + `create_trap` VS match pinned C.

Named omits / do-nots (map / Open, not Must-fix):

1. `makemaz("")` `create_maze` Invocation_lev VS (`mkmaze.c:1214–1216`).
2. `occupied` still uses LAVAPOOL/`IS_POOL` typ tests, not D-1077/D-1090 `is_lava`/`is_pool` (pre-existing clone).
3. Shared `dungeon.c` `Invocation_lev` export; apply.js local `invocation_pos`.
4. `Can_dig_down` !Invocation_lev; `mkinvokearea`.
5. Do not restore always-down-stair hellfill. Do not skip upstairs `distmin<=11`. Do not treat missing `svi.inv_pos` as a live square.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: hellfill on Invocation_lev now runs C’s picker into `svi.inv_pos` and `maketrap(VIBRATING_SQUARE)` instead of a down stair, and `occupied` finally sees that cell.
- Must-fix stays empty for this SHA; next port popped Open `expire_gas_cloud`. **Addressed:** D-1155 `df99ab32`. Not `makemaz("")`.
