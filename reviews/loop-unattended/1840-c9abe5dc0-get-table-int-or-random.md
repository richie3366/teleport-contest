# Review 1840 — c9abe5dc0 — get_table_int_or_random (D-2881)

- SHA: `c9abe5dc0` (coverage; `sp_lev.c` `get_table_int_or_random`)
- Files: `js/mklev.js` (+76/−). 76 `js/` insertions.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `get_table_int_or_random`: nil and case-blind `"random"` return `rndval` with no RNG, any other non-number is `nhl_error`, a number is `luaL_checkinteger`. `lspo_object_normalize_table` calls it for `spe` (`-127`) and `quantity` (`-1`). The diff adds that function and those two calls. `sym.mjs`:

```
get_table_int_or_random NOT EXPORTED — local js/mklev.js:21904
lua_isnumber_unpacked   NOT EXPORTED — local js/mklev.js:21867
lua_tostring_unpacked   NOT EXPORTED — local js/mklev.js:21882
lspo_strcmpi            NOT EXPORTED — local js/mklev.js:21659
nhl_error               NOT EXPORTED — local js/mklev.js:21669
luaL_checkinteger_unpacked NOT EXPORTED — local js/mklev.js:21679
luaL_optinteger         NOT FOUND
```

`sym.mjs` prints "LOCAL CLONE" for every file-local function. These are the one C `staticfn` and the unpacked Lua stand-ins already in this file. No second copy. `luaL_optinteger` has no JS symbol; the nil arm returns before that call, which is what C's optinteger would do with a nil.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `get_table_int_or_random` | file-local `mklev.js:21904` | `sp_lev.c:3407–3437` (`csym` 3405–3437) |
| `lua_isnumber_unpacked` | local stand-in | Lua `lua_isnumber` |
| `lua_tostring_unpacked` | local stand-in | Lua `lua_tostring` |
| `lspo_strcmpi` | existing local | `strcmpi` → `strncmpi(a, b, -1)` (`global.h:113`) |
| `nhl_error` | existing local | `nhlua.c:198`; throws |
| `luaL_checkinteger_unpacked` | existing local | Lua `luaL_checkinteger` via `luaL_optinteger` |

## C ↔ JS fidelity

`csym` body is `sp_lev.c:3405–3437`. Callers: declaration `sp_lev.c:118`, `tmpobj.spe` at `:3634` with `-127`, `tmpobj.quan` at `:3638` with `"quantity"` and `-1`. Both are wired (`mklev.js:21933`, `:21942`). No RNG on this function. `"random"` does not call `rnd`.

Nil (`null` or missing, the unpacked `LUA_TNIL`) returns `rndval | 0`. A value the stand-in rejects is `lua_tostring`'d. A string equal to `"random"` under `toLowerCase` returns `rndval`. `strncmpi(..., -1)` compares the whole string; `"random"` is ASCII, so the fold matches `strcmpi`. Any other string, or a boolean / table (`lua_tostring` is NULL, JS returns null for a non-string), builds `Expected integer or "random" for "<name>", got "<text>"` or `<Null>` and `nhl_error` throws. The `return 0` after it is the C `/*NOTREACHED*/` line (`:3434`). A finite number or a numeric string is `Math.trunc`. Integers and `"3"` match. A non-integral finite number is truncated; Lua 5.4 `luaL_checkinteger` rejects it. The commit states `Math.trunc`. That is the same stand-in review 1821 accepted for `get_coord`, not a new arm. A non-finite number fails `lua_isnumber_unpacked` and then the `<Null>` error, because `lua_tostring_unpacked` ignores numbers. C would fail inside `luaL_checkinteger` with "number has no integer representation". Named.

`create_object` still treats `spe !== -127` as an override (`sp_lev.c:2230`, `mklev.js:21330`). `"random"` now stays `-127`, so `mksobj`'s roll is left alone. The old `"random" | 0` path was 0.

The `quan` copy (`mklev.js:21940`) runs only when `quantity` is nil and `quan` is set. Hand-rolled tables store the lua key under `quan`. A numeric `quan` is what C would have read as `quantity`. Absent both fields, `quan` becomes `-1`.

## Hallucinations / overclaim

The subject says the number arm is `luaL_checkinteger_unpacked` and immediately says `Math.trunc`. It does not claim Lua's integer-representation error. `lua_pop` is named as having no stack. The two C call sites are the two JS calls. No third caller is invented.

## Density

The 33-line C function and both call sites. 76 insertions. `lspo_object` field order around those two calls was already there.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify get_table_int_or_random --base c9abe5dc0~1 --reach-all`.

```
verify get_table_int_or_random: baseline c9abe5dc0~1 (scoreboard at d3d2063c1) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke get_table_int_or_random: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
