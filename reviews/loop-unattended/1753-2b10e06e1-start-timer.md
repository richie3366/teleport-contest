# Review 1753 — 2b10e06e1 — start_timer (D-2794)

- SHA: `2b10e06e1` (`timeout.c` start_timer whole-body port, D-2794)
- Files: `js/mkobj.js` (+92), `js/timeout.js` (`kind_name` export, TIMER_NONE)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean" (this audit).

**Addressed:** D-2801 `67ccc0b33`

## Intent vs deliverable

Subject promises a restart that panics on a bad kind or func_index,
`impossible` on a duplicate, `needs_fixup: 0`, and `return true`.
Diff adds that gate, the monster `a_void` compare, the verbose
duplicate name, and the `kind_name` `TIMER_NONE` arm. The node still
stores `action | 0`. Return value changes from `when` to `true`.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `start_timer` | C body | `timeout.c:2246–2292` |
| `kind_name` | C body, now exported | `:1994–2011` |
| `TIMEOUT_FUNC_NAMES` | table of `timeout_funcs[].name` | `:1978–1990` |
| `insert_timer` | existing local | same file; not edited |
| `impossible` | imported, not awaited | `display.js` async |

`csym --callers`: 21 references. Live JS calls include `begin_burn`
(`timeout.js:1624`, tests the boolean), `mkobj` hatch/fig/shrink/corpse,
`dig`/`mklev` ice and rot, `hack`/`apply` fig, `zap.js:1016` and
`mklev.js:29129` with the string `MELT_ICE_AWAY`. Named unwired:
`objnam.c:5223`, `zap.c:1355`, `nhlobj.c:591`.

`sym.mjs`:

```
start_timer      js/mkobj.js:1231   sync
kind_name        js/timeout.js:2318   sync
insert_timer     NOT EXPORTED — 1 LOCAL at js/mkobj.js:956
impossible       js/display.js:8086   ASYNC — await required
```

## C ↔ JS fidelity

`VERBOSE_TIMER` is defined (`timeout.c:1963`). Names are
`rot_organic` through `melt_ice_away` in enum order. `kind_name`
matches: `TIMER_NONE` → `impossible("no timer type")` then `"none"`;
level/global/object/monster; else `"unknown"`.

Range: `kind <= TIMER_NONE || kind >= NUM_TIMER_KINDS || func_index < 0
|| func_index >= NUM_TIME_FUNCS` panics after `kind_name`
(`:2254–2256`). JS uses `TIMEOUT_FUNC_NAMES.length` (9). The exported
`NUM_TIME_FUNCS` is `MELT_ICE_AWAY + 1`, and that constant is the
string `'MELT_ICE_AWAY'`, so the export is not 9. The length check is
the real bound. A numeric index 0..8 passes. Duplicate: same kind,
func_index, and `a_void` → verbose `"%s timer"` + `impossible` +
`FALSE`. Node: `tid` post-increment (0 raised to 1), `moves + when`,
`needs_fixup` 0, `insert_timer`, object `timed++`, `return TRUE`.
No RNG. `begin_burn` is true when `when` is 0. That matches C.

**C-wrong:** callers pass `MELT_ICE_AWAY`, which is
`'MELT_ICE_AWAY'` (`js/const.js:2257`). `action | 0` is 0, and 0 is
`ROT_ORGANIC`, so the range check does not panic. The node stores
`action: 0`. `run_timers` (`mkobj.js:1543–1548`) tests
`curr.action === ROT_ORGANIC` before the string compare, so the level
timer calls `rot_organic(curr.obj)` with a null object. C's ninth
`timeout_funcs` entry is `melt_ice_away` (index 8) and runs that
function on the packed long (`:1989`).

## Hallucinations / overclaim

"Invalid func_index panics" is true for a number outside 0..8. It is
false for the string token, which becomes a legal 0. "stays unmatched"
is false: `run_timers` takes the `ROT_ORGANIC` arm. The parent already
stored `action | 0`; this restart kept that coercion and described it
as harmless. `zap.c:1355` and `objnam.c:5223` are still unwired, as
named. The non-VERBOSE duplicate format is inside `#else` and is not
compiled.

## Density

~90 insertions for a 47-line function plus `kind_name`. Under the
200-line band because C is that small. Not an arm-only port. The
string index is the miss.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify start_timer --base
2b10e06e1~1 --reach-all`. Parent board is the 12-row file (stamp
field `75144e146`):

```
verify start_timer: baseline 2b10e06e1~1 (scoreboard at 75144e146, 2026-09-25T19:02:46.112Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify start_timer: no corpus session is blocked on it at 2b10e06e1~1 — a vacuous verify is NOT a corpus PASS. …
smoke start_timer: no RNG-tagged reach; fixed smoke spread (12 run, 4.3s): 12 PASS, 0 regressed → REACH-OK
```

0 blocks cited. No REGRESSED session. D-log "smoke 12/12" is that
board. The melt-ice alias is not on the smoke path.

## Actionable C-wrongs

1. `MELT_ICE_AWAY` must be timeout_funcs index 8, and `start_timer`
   must store that index. `run_timers` must call `melt_ice_away` on
   the packed long. A string coerced to 0 must not enter the
   `ROT_ORGANIC` arm.

Verdict: **QUALITY-RISK**
