# Review 1823 — 8dccc7d47 — init_dungeon_levels (D-2864)

- SHA: `8dccc7d47` (coverage; `dungeon.c` `init_dungeon_levels`)
- Files: `js/dungeon.js` (+358/−49)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, seed name, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `init_dungeon_levels` in C order: generated-table `lua_len`, required name/base, optional bonetag/chainlevel/range/nlevels/chance, align before flags, first-byte `boneschar`, `""` chain still `strcmp`s, non-table row panics, then `n_levs` and `LEV_LIMIT`. `get_dgn_flags` / `get_dgn_align` use `luaL_checkoption`. The caller panics when `levels` is neither nil nor a table. The diff is those functions plus the unpacked getters. Nothing was deleted. `sym.mjs`:

```
init_dungeon_levels  NOT EXPORTED — local js/dungeon.js:723
get_dgn_flags        NOT EXPORTED — local js/dungeon.js:440
get_dgn_align        NOT EXPORTED — local js/dungeon.js:472
get_table_str        NOT EXPORTED — local js/dungeon.js:348
get_table_str_opt    NOT EXPORTED — local js/dungeon.js:368
luaL_checkoption     NOT EXPORTED — local js/dungeon.js:297
```

One clone each. `luaL_checkinteger_dgn` stays file-local; `mklev.js` already imports this module.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `init_dungeon_levels` | local `:723` | `dungeon.c:796–864` |
| `get_dgn_flags` | local `:440` | `dungeon.c:743–778` |
| `get_dgn_align` | local `:472` | `dungeon.c:780–794` |
| `get_table_str` / `_opt` / `get_table_int` / `_opt` / `get_table_option` | local clones | `nhlua.c:1016–1133` |
| `lua_len` / `lua_type` / `lua_field` | local unpack | stack ops, no value |
| `strcmp` / `dupstr` | local | equality and copy-to-NUL |
| `dgn_impossible` | local no-op | `impossible` |
| `debugpline_dungeon` | local; true arm drops the line | `debugpline1/2/4` |

## C ↔ JS fidelity

`csym` body is `dungeon.c:796–864`. Callers: `dungeon.c:1036` inside `init_dungeon_dungeons`. `:56` is the static declaration. `extern.h:2139` is a comment.

`nlevels` is `lua_len` (`Array.length`, or 0 for a plain object). Each row is `levels[f]` (C index `f+1`). A table reads, in order: `name` (`get_table_str`), `bonetag` default `emptystr` (`""`), `chainlevel` default `NULL`, `base`, `range` 0, `nlevels` 0, `chance` 100, then `get_dgn_align`, then `get_dgn_flags`. The proto slot is `pd.tmplevel[pd.n_levs + f]`. Fields are name, chainlvl, `lev.base`, `lev.rand`, chance, rndlevs, `flags | align`. `boneschar` is `charCodeAt(0)` of the bonetag, or 0 when that unit is 0. `"".charCodeAt(0)` is `NaN`, which is falsy, so a missing bonetag (the `emptystr` default) stores 0, matching `*""`. `free` is GC. `chain` starts at −1. A non-null chain pointer, including `""`, scans earlier names with `strcmp` and throws `Could not chain level %s to %s` on a miss. A non-table row throws `dungeon[%i].levels[%i] is not a hash`. Then `n_levs += nlevels` and `LEV_LIMIT` throws `init_dungeon: too many special levels`. No RNG in this function (`rn2` stays in `init_level`).

`get_table_str_opt` (`nhlua.c:1053–1076`): string or nil uses the default on nil (`""` is kept; only `null` returns `NULL`). Anything else except a function throws `get_table_str_opt: no string`. A function is called with 0 args; a string or nil result is kept; another result throws. C `luaL_optstring` after `nhl_pcall_handle` would also accept a number. The map names the missing VM. `get_table_int_opt` (`:1028–1039`) keeps `defval` only on nil. `get_table_option` (`:1121–1133`) is `luaL_checkoption` of the field.

`get_dgn_flags`: table walks `lua_len` strings through `luaL_checkoption` of `town/hellish/mazelike/roguelike/unconnected` into `TOWN/HELLISH/MAZELIKE/ROGUELIKE/UNCONNECTED`. A non-string element calls `dgn_impossible` and the scan continues (C does not pop that element; there is no stack here). A single string is one token. Nil is 0. Any other type is `impossible` and returns 0. An unknown token throws rather than dropping the bit. `get_dgn_align` maps `unaligned/noalign/lawful/neutral/chaotic` onto `D_ALIGN_NONE` twice, then lawful, neutral, chaotic. Missing alignment is the default `"unaligned"`.

Caller `init_dungeon_dungeons` (`dungeon.c:1034–1038`): a table calls `init_dungeon_levels` (`dungeon.js:889`); nil leaves the count at 0; any other type throws `dungeon[%i].levels is not an array of hashes`. The rest of that caller still reads `entry.chance ?? 100` and `entry.bonetag || ''`. That is `init_dungeon_dungeons`, not this function. `dgn_impossible` discards the text (`void msg`) because the three plines await and `init_dungeons` does not. `debugpline_dungeon` returns when `debugcore("dungeon.c", true)` is false, and does not pline when it is true. Both are named in `docs/c-js-map/data.md`.

## Hallucinations / overclaim

The subject does not say `init_dungeon_dungeons` was restarted. Align is read before flags. `""` chainlevel does search. `NH` debugplines are not claimed to print.

## Density

The 69-line function, both flag/align callees, and the one C call site. The getters are the callees the body actually calls. 358 insertions, one C file.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify init_dungeon_levels --base 8dccc7d47~1 --reach-all`. No later commit touches `js/dungeon.js`.

```
verify init_dungeon_levels: baseline 8dccc7d47~1 (scoreboard at 4b46eed9c) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke init_dungeon_levels: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
