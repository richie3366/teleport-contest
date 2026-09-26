# Review 1821 — 4b46eed9c — get_coord (D-2862)

- SHA: `4b46eed9c` (coverage; `sp_lev.c` `get_coord`)
- Files: `js/mklev.js` (+122/−37)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, seed name, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `get_coord` in C order: nil leaves the out-params, a non-nil non-table throws, a non-nil `x` is `luaL_checkinteger` then `y` (or `Not a coordinate`), otherwise a length-2 array goes through `get_table_intarray_entry`. The diff deletes `get_coord_unpacked` (nil / short array / missing `y` became −1,−1; a bad slot became 0) and adds `get_coord`, a file-local `nhl_error`, and `luaL_checkinteger_unpacked`. Nine existing `sp_lev` sites now pass an `{x,y}` seed and copy it back.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `get_coord` | sync export `mklev.js:21697` | `sp_lev.c:5318–5366` |
| `nhl_error` | local clone `mklev.js:21667` | `nhlua.c:198–218` |
| `luaL_checkinteger_unpacked` | local clone `mklev.js:21677` | Lua `luaL_checkinteger` |
| `get_table_intarray_entry_unpacked` | existing local; throw now `nhl_error` | `sp_lev.c:5259–5279` |
| `get_table_xy_or_coord` | existing; coord arm calls `get_coord` | `sp_lev.c:3187–3204` |

`sym.mjs` (symbols the diff deletes or re-points):

```
get_coord_unpacked NOT FOUND in js/** (no export, no local function/const).
get_coord        js/mklev.js:21697   sync
nhl_error        NOT EXPORTED — 1 LOCAL CLONE: js/mklev.js:21667
```

No second `nhl_error` clone. Nothing was switched from a local clone to an import.

## C ↔ JS fidelity

`csym` body is `sp_lev.c:5318–5366`. Callers: `nhlua.c:518`, `sp_lev.c:3198`, `:3262`, `:3608`, `:3913`, `:4419`, `:4439`, `:4450`, `:4496`, `:4866`, `:5007`. `extern.h:3066` is the declaration.

Nil (`null`/`undefined`; JS `typeof null` is `"object"`) returns false and does not write `xy`. A non-nil non-table throws `non-table coord specified`. On a table, a non-nil `x` is checked, then `y`: both set returns true; `y` nil throws `Not a coordinate` and does not fall through to the array. Otherwise `Array.isArray` length must be 2 (a plain object is length 0, matching `lua_len` with no array part) and both slots come from `get_table_intarray_entry_unpacked`, then `return true`. The `return false` lines after `nhl_error` are the C `/*NOTREACHED*/` returns. No RNG.

`get_table_intarray_entry` (`sp_lev.c:5259–5279`) reads 1-based index `entrynum` and the error format argument is the literal `1`, not `entrynum`. The JS message `Array entry #1` matches that. The `tableidx < 0` decrement (`:5263–5264`) is a stack adjust; the unpacked value is already in hand. Named.

`nhl_error` (`nhlua.c:198–218`) throws the message. The `lua_Debug` `line` / `short_src` suffix (`:201–211`) and the `#if 0` `panictrace_setsignals` block are omitted. Named in the map.

`luaL_checkinteger_unpacked` accepts a finite number via `Math.trunc` and a numeric string. Integers match. A non-integral finite number is truncated; Lua 5.4 `luaL_checkinteger` rejects it. Des coordinates are integers, and the same truncating stand-in is what the rest of this file already uses for checkinteger. Not a separate arm of `get_coord`.

Wired call sites, each seeding outs and copying back (C `(void) get_coord`):

| C | JS |
|---|----|
| `:4496` `lspo_gold` | `mklev.js:1257` |
| `:4419` `lspo_trap` | `:1385` |
| `:4439` launchfrom | `:1405` |
| `:4450` teledest | `:1412` |
| `:4866` `lspo_feature` | `:1511` |
| `:3913` `lspo_engraving` | `:1615` |
| `:3198` `get_table_xy_or_coord` | `:21758` |
| `:3608` `lspo_object` | `:21837` |
| `:3262` `lspo_monster` | `:22046` |

`lspo_trap`'s argc-2 arm comments that C `:4400` seeds −1. C declares `x, y` uninitialized there; the string arm is what assigns −1 (`:4413`). The argc-2 guard is `LUA_TTABLE`, and every table path in `get_coord` either writes both outs or `nhl_error`, so the JS −1 seed is not read. `lspo_engraving` argc 3 (`:3911–3915`) copies `ex, ey` that C leaves uninitialized on a nil; the JS seed is the function's `x = y = -1` (`:3892`). A nil argument is not a des form that returns. `get_table_xy_or_coord` still uses `!= null` / `| 0` for `get_table_int_opt`; that predicate was already there. Missing `coord` is nil and keeps −1,−1.

Unwired, both named in `docs/c-js-map/data.md` in this commit: `nhl_get_xy_params` (`nhlua.c:506–522`) and `nhl_getmap` (`:530`) have no JS function. `lspo_terrain` (`sp_lev.c:4978–5037`) has no JS function; `lspo_terrain_sel` (`mklev.js:28944`) only iterates `sel_set_ter`.

## Hallucinations / overclaim

The subject does not claim the two missing functions are ported. `lspo_terrain_sel` does only walk `sel_set_ter`. The D-log line numbers match this commit; later `mklev.js` edits moved `get_coord` to `:21697` without changing the body (`git log -L` from this SHA is empty).

## Density

The 49-line function, its two immediate callees, and every C caller that has a JS site. The two missing callers are named omissions, not a stub inside the live function.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify get_coord --base 4b46eed9c~1 --reach-all` (working tree; `get_coord` unchanged since this SHA).

```
verify get_coord: baseline 4b46eed9c~1 (scoreboard at 4373171cb) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke get_coord: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
