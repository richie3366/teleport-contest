# Review 2145 — c88e33eda — special-level entry closure

SHA `c88e33eda`, D-3185; 2026-10-01; +500/-324 JS. No prior review closure.

**Addressed:** D-3190 `c64bdefb7`, D-3193 `92ffa7863`

Actionable 1 closed; Actionable 2 closed by D-3193 (roomtype validation and diagnostic completion).

## Intent vs deliverable

“Restore special-level entry contracts and Lua integer checks” restarts
nine C bodies, adds shared numeric exports, room/init adapters, and
re-points compiled loaders and three existing terrain/maze callers.

## Inventory — lspo_room

Changed sync export. create_des_coder/lcheck_param_table and boolean
readers are CLONE; nhl_error/panic are mapped throws. Coordinate,
option/int/roomtype, build_room, update_croom, public-room-table,
spo_endroom/add_doors callees are LIVE. get_table_roomtype_opt diverges.

## C ↔ JS fidelity — lspo_room

sp_lev.c:4027–4116 preserves theme guard, nested-limit, field order,
parent success/failure bookkeeping, public callback and endroom/doors.
However its live roomtype callee bypasses get_table_str_opt: `type=true`
should error, but JS diagnoses asynchronously then builds/draws rn2(100).
Function-valued type is stringified rather than evaluated. Integer loss
also bypasses :4059–4060 rejection. Registration :6396 is represented.

## Inventory — build_room

Renamed/exported whole body; create_room/create_subroom/topologize LIVE.

## C ↔ JS fidelity — build_room

sp_lev.c:2806–2833 keeps !chance short-circuit/rn2(100), parent choice,
topologize then fill/join flags. :4081 caller uses canonical export.

## Inventory — get_table_xy_or_coord

Changed/exported reader; get_table_int_opt/get_coord LIVE, latter C-wrong.

## C ↔ JS fidelity — get_table_xy_or_coord

sp_lev.c:3187–3204 reads x/y then coord only for −1/−1. Fifteen caller
sites wired; stair :4164 explicitly OMIT. get_coord :5318–5366 stores
full lua_Integer fields, but JS converts object fields to Number before
storage. `"9223372036854775807"` becomes 9223372036854776000.

## Inventory — lspo_level_flags

Changed export; coder/nhl_error CLONE, checkstring/strcmpi expanded.

## C ↔ JS fidelity — lspo_level_flags

sp_lev.c:3758–3831 has all 25 sequential flag arms, case folding,
C-string termination, and unknown error after earlier mutations. No RNG.
Registration :6383 represented; compiled assignments remain mapped expansions.

## Inventory — lspo_gas_cloud

Changed async export; coordinate/int/region constructors LIVE;
l_selection_check verified Set-backed CLONE, table/error adapters CLONE.

## C ↔ JS fidelity — lspo_gas_cloud

sp_lev.c:4928–4965 preserves argc/table, selection guard, damage/TTL,
constructor choice and zero return. `Number(tx)` before signed-16 cast
loses BigInt array low bits: C gas x=−1, JS x=0. :6413 represented.

## Inventory — lspo_level_init

Changed async export; option/int/mapchar/initlev LIVE; coder/table/boolean CLONE.

## C ↔ JS fidelity — lspo_level_init

sp_lev.c:3835–3875 preserves all six styles, ordered defaults, joined
state and swamp fallback. initlev :2981–3018 retains per-style RNG:
solid/mines/swamp rn2(2) only for random lighting. All loader calls now
use enum-to-public-table adapter; registration :6384 represented.

## Inventory — get_table_mapchr_opt

New export; get_table_str_opt/check_mapchr LIVE; free represented by GC.

## C ↔ JS fidelity — get_table_mapchr_opt

nhlua.c:255–271 preserves optional string/function evaluation, empty
fallback, signed-byte narrowing and invalid error. All five callers wired.

## Inventory — check_mapchr

New export; same-file splev_chr2typ verified CLONE of nhlua.c:381–390.

## C ↔ JS fidelity — check_mapchr

nhlua.c:392–398 checks C-string length one before ordered char-table scan.
Terrain and optional readers wired; mandatory/selection inline consumers
retain mapped caller debt. No RNG.

## Inventory — get_table_int_opt

Exported dungeon reader; luaL_checkinteger_dgn calls shared LIVE conversion.

## C ↔ JS fidelity — get_table_int_opt

nhlua.c:1028–1039 nil default, integral validation then int32 cast match.
Existing noncluster permissive callers remain mapped. Decimal-int/hex-wrap,
float-integrality/error helpers moved without changing bodies; Lua 5.4.8
lobject.c:276–320, lvm.c:123–148, lauxlib.c:437–451 read. The unchecked
Number return remains wrong when a caller needs a full lua_Integer.

## Inventory — existing caller rewires and adapters

lspo_mazewalk/terrain/replace_terrain use canonical mapchar readers;
splev_level_init and splev_des_room translate compiled inputs, not stubs.
Loader changes only substitute the adapter call. No added seed branch.

## C ↔ JS fidelity — existing caller rewires and adapters

sp_lev.c:5768–5869, :4977–5038, :5050–5143 retain dispatch, coordinate,
selection, walk/fill and per-matching-cell rn2(100) order. Mapchar replacement
matches changed loci; integer-coercion debt is named outside the cluster.
Room adapter establishes/restores coder parent around the public entry.

## Hallucinations / overclaim

“No missing whole-body arm” overlooks live roomtype validation and exact
coordinate transport. D-log’s 213 oracle vectors exclude unsafe object
coords and sink roomtype lookup. Extended extracted-C probes demonstrate
three coordinate and two roomtype mismatches; placement dependencies are
observation sinks. These are callee C-wrongs, not silent named omissions.
Required re-pointed/deleted sym output (historical):

```text
splev_coder_build_room NOT FOUND in js/** (no export, no local function/const).
This index includes js/generated/. Do not add a local clone.
build_room js/mklev.js:1210 sync
lspo_level_init js/mklev.js:20701 ASYNC — await required
splev_level_init NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
js/mklev.js:20729
=> Do NOT write clone #2. Check pinned C; if C has one
function, this is clone drift (map debt / Open row).
lua_number_unpacked js/nhlua.js:10 sync
lua_integer_unpacked js/nhlua.js:52 sync
luaL_checkinteger_unpacked js/nhlua.js:64 sync
lua_tointeger_unpacked js/nhlua.js:76 sync
get_table_int_opt js/dungeon.js:335 sync
get_table_xy_or_coord js/mklev.js:22569 sync
splev_chr2typ NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
js/mklev.js:29305
=> Do NOT write clone #2. Check pinned C; if C has one
function, this is clone drift (map debt / Open row).
check_mapchr js/mklev.js:20680 sync
```

Historical full Rule #2 clean. Diff scan: fixed loader map coordinates
are existing Lua content; no FORCE/DIAG/getRngLog/seed gate/fastforward.
No cycle-forced clone claimed; moved numeric module has no game-state reads.

## Density

Nine whole C bodies in one callee closure; three existing caller rewires.
Every claimed body has Ledger/Verify; no Must-fix bundled.

- Ledger: lspo_room ported — QUALITY-RISK.
- Ledger: build_room ported — ACCEPT.
- Ledger: get_table_xy_or_coord partial — QUALITY-RISK.
- Ledger: lspo_level_flags ported — ACCEPT.
- Ledger: lspo_gas_cloud ported — QUALITY-RISK.
- Ledger: lspo_level_init ported — ACCEPT.
- Ledger: get_table_mapchr_opt ported — ACCEPT.
- Ledger: check_mapchr partial — ACCEPT-WITH-DEBT.
- Ledger: get_table_int_opt partial — ACCEPT-WITH-DEBT.
- Existing terrain/maze rewires — ACCEPT-WITH-DEBT.

## Verification

Historical nine-function `hidden-proxy verify ... --base c88e33eda~1
--reach-all --jobs 8`, one call on this SHA:

| Function | verify summary | reach summary |
|---|---|---|
| lspo_room | 0 blocked, vacuous | smoke 24 PASS/0 regressed, REACH-OK |
| build_room | 0 blocked, vacuous | reach 648 PASS/0 regressed, REACH-OK |
| get_table_xy_or_coord | 0 blocked, vacuous | smoke 24 PASS/0 regressed, REACH-OK |
| lspo_level_flags | 0 blocked, vacuous | smoke 24 PASS/0 regressed, REACH-OK |
| lspo_gas_cloud | 0 blocked, vacuous | smoke 24 PASS/0 regressed, REACH-OK |
| lspo_level_init | 0 blocked, vacuous | smoke 24 PASS/0 regressed, REACH-OK |
| get_table_mapchr_opt | 0 blocked, vacuous | smoke 24 PASS/0 regressed, REACH-OK |
| check_mapchr | 0 blocked, vacuous | smoke 24 PASS/0 regressed, REACH-OK |
| get_table_int_opt | 0 blocked, vacuous | smoke 24 PASS/0 regressed, REACH-OK |

D-log green/strict, relevant level-generation cohort 7/7, full 44/44.
Corpus claims hold; they do not cover these input-boundary defects.

## Actionable C-wrongs

1. Preserve lua_Integer through get_coord/get_table_xy_or_coord until
   each C destination cast; narrow gas BigInts without Number rounding.
   Reproduce object/array `"9223372036854775807"`: room rejects mixed
   −1/0 before RNG; gas constructor receives −1/0. C sp_lev.c:5318–5366,
   :3187–3204, :4027–4116, :4928–4965.
2. Close lspo_room→get_table_roomtype_opt: use canonical optional-string
   validation/function evaluation and finish impossible before room RNG
   or callbacks. `type=true` must fail before rn2(100); function returning
   “ordinary” must resolve without impossible. C :4003–4020/nhlua.c:1053–1076.

Verdict: **QUALITY-RISK**
