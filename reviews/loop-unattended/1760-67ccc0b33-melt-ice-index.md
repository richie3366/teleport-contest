# Review 1760 — 67ccc0b33 — MELT_ICE_AWAY index 8 (D-2801)

- SHA: `67ccc0b33` (Must-fix from review 1753; string `MELT_ICE_AWAY` stored as `ROT_ORGANIC`)
- Files: `js/const.js` (enum export), `js/mkobj.js` (`timeout_func_index`, store, match, dispatch)
- Queue row: review 1753 Must-fix, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck` on this SHA: "Rule #2 clean".
- No clone was re-pointed at a different module. `MELT_ICE_AWAY` changed from the string token to the enum short.

## Intent vs deliverable

Subject promises index 8, `NUM_TIME_FUNCS` 9, string/`melt-ice` mapped before the range check, an unknown string panicking as -1, and `run_timers` calling `melt_ice_away` on the packed long. Spot, stop, and peek compare through the same index. The diff does that. `TIMER_FUNC.MELT_ICE_AWAY` stays the string name token.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `MELT_ICE_AWAY` | enum short `SHRINK_GLOB + 1` | `timeout.h:37–48` index 8 |
| `NUM_TIME_FUNCS` | `MELT_ICE_AWAY + 1` → 9 | same enum |
| `timeout_func_index` | local string adapter | no C function; C callers pass the short |
| `start_timer` | stores `funcN` | `timeout.c:2247–2292` |
| `run_timers` melt arm | calls imported `melt_ice_away` | `timeout.c:2231–2237` → `zap.c:5118–5131` |
| `TIMEOUT_FUNC_NAMES` | name table in enum order | `timeout.c:1978–1990` |

`csym --callers start_timer`: 21 references. Live numeric callers unchanged (`FIG_TRANSFORM`, `ROT_ORGANIC`, `HATCH_EGG`, `SHRINK_GLOB`, `BURN_OBJECT`, `ZOMBIFY_MON`). Ice: `zap.c:5108` → `js/zap.js:1022`; `nhlua.c:1634` → `js/mklev.js:29129`. Both pass `MELT_ICE_AWAY`, now 8, with `TIMER_LEVEL`. Named still unwired: `nhlobj.c:591`, `objnam.c:5223`, `zap.c:1355`. `dig.c:2036–2039` is `#if 0`.

`sym.mjs`:

```
MELT_ICE_AWAY    js/const.js:2262   sync
NUM_TIME_FUNCS   js/const.js:3035   sync
timeout_func_index NOT EXPORTED — 1 LOCAL at js/mkobj.js:1225
start_timer      js/mkobj.js:1249   sync
melt_ice_away    js/zap.js:1030   ASYNC — await required
SHRINK_GLOB      js/const.js:1453   sync
```

`timeout_func_index` is not a second C function. It is the adapter that stops `'MELT_ICE_AWAY' | 0` from becoming 0.

## C ↔ JS fidelity

`timeout.h:37–48` and the `const.js` chain are the same order: `ROT_ORGANIC` 0 … `SHRINK_GLOB` 7, `MELT_ICE_AWAY` 8, `NUM_TIME_FUNCS` 9. `TIMEOUT_FUNC_NAMES` is `rot_organic` through `melt_ice_away` (`timeout.c:1980–1989`).

`start_timer` range test matches `:2254–2256`: bad kind or `func_index` outside `0 .. NUM_TIME_FUNCS-1` throws after `kind_name`. A known name string becomes its table index. `'MELT_ICE_AWAY'`, `'melt_ice_away'`, and `'melt-ice'` become 8 before that table, so they are not `indexOf` misses and not `ROT_ORGANIC`. An unknown string is -1 and panics. A number passes through with `| 0`. The node stores `action: funcN` (`:2284`). Duplicate match is kind + index + `a_void` (`:2261–2263`). `impossible` is still not awaited. No RNG inside `start_timer`.

`run_timers` (`:2231–2237`) calls `timeout_funcs[func_index].f(&arg, timeout)`. Index 8 is `melt_ice_away`. JS calls `melt_ice_away(a_long)` only when `kind === TIMER_LEVEL`. Both C ice starters use `TIMER_LEVEL`, so the extra kind test does not drop them. `zap.c:5119–5131`: save `mon_moving`, set it true, `y = where & 0xFFFF`, `x = (where >> 16) & 0xFFFF`, `melt_ice`, restore. `js/zap.js:1030–1037` does that on the packed long. The C `timeout` argument is unused.

Spot, stop, and peek compare indices, so a query with the number 8 and a query with the legacy string find the same node.

## Hallucinations / overclaim

The subject matches the store and the dispatch. It does not claim `l_obj_timer_start`, the wish-corpse timer, or the cancel-corpse restart. Those stay named. "string | 0 is ROT_ORGANIC" describes the bug this commit removes, not the new path.

## Density

The helper plus the match sites. Right size for the Must-fix. Not a second port of `start_timer`'s other arms.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify start_timer --base 67ccc0b33~1 --reach-all` on this SHA:

```
verify start_timer: baseline 67ccc0b33~1 (scoreboard at cc5cb2a89, 2026-09-25T20:44:27.391Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify start_timer: no corpus session is blocked on it at 67ccc0b33~1 — a vacuous verify is NOT a corpus PASS. …
smoke start_timer: no RNG-tagged reach; fixed smoke spread (12 run, 3.1s): 12 PASS, 0 regressed → REACH-OK
```

`start_timer` itself draws no RNG, so reach is the smoke spread. The Must-fix cited 0 blocks. D-log "smoke 12/12, 0 regressed" matches. No `REGRESSED` session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
