# Review 1920 — a30a7de84 — remove_timer (D-2961)

- SHA: `a30a7de84` (coverage; `timeout.c` `remove_timer`)
- Files: `js/mkobj.js` adds file-local `remove_timer` and two union readers. `stop_timer` calls it and writes the list head back.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunks. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- Nothing was deleted or re-pointed onto an import. `sym.mjs` on HEAD (D-2965 later shifted this file by two lines; the bodies are the same):

```
remove_timer     NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mkobj.js:1237
stop_timer       js/mkobj.js:1260   sync
timer_element_a_void NOT EXPORTED — local js/mkobj.js:1212
timer_arg_a_void NOT EXPORTED — local js/mkobj.js:1223
timeout_func_index NOT EXPORTED — local js/mkobj.js:1334
```

C `remove_timer` is `staticfn`. The one file-local function is that body, not a second copy of an export.

## Intent vs deliverable

Subject promises one file-local `remove_timer` that unlinks the first node whose `func_index` and `a_void` match, and a `stop_timer` that uses it for every kind. The diff is those helpers plus the `stop_timer` rewrite. The node is returned with `next` still set. No free.

## Inventory

| JS | Class | C |
|----|-------|---|
| `remove_timer` | live file-local `mkobj.js:1235` at this SHA | `timeout.c:2483–2502` |
| `timer_element_a_void` | union reader `:1210` | `anything.a_void` on the node |
| `timer_arg_a_void` | union reader `:1221` | `anything.a_void` on the arg |
| `timeout_func_index` | live file-local | `timeout_funcs` index |
| `stop_timer` | live export `:1258` | `timeout.c:2299–2318` |
| burn block | partial `cleanup_burn` | `timeout.c:1828–1844` |

## C ↔ JS fidelity

`timeout.c:2490–2501`. `prev` starts null, `curr` is `*base`. The loop breaks on `curr->func_index == func_index && curr->arg.a_void == arg->a_void`. A hit with `prev` sets `prev->next = curr->next`; a head hit sets `*base = curr->next`. The node is returned. A miss returns null. No RNG.

JS `:1235–1249` is that walk. `timeout_func_index` runs on both sides before the `&&`, so a function miss does not read `a_void`. `start_timer` stores one of object, monster, or `a_long` (`:1375–1379` at HEAD). The reader returns that same word. `obj_to_any` / `monst_to_any` (`hack.js:200`, `:212`) return the pointer, so object and monster `===` is the C pointer compare. A numeric arg compares to `a_long`.

`stop_timer` (`timeout.c:2305–2316`) calls `remove_timer(&gt.timer_base, …)`. On a hit it snapshots `timeout`, decrements `timed` for `TIMER_OBJECT`, calls `timeout_funcs[func_index].cleanup` when non-null, then `memset`/`free`, and returns `timeout - moves`. The table (`:1978–1990`) has a cleanup only for `burn_object`. JS `:1261` returns 0 when the arg is falsy, before the walk. `:1269–1277` decrements `timed` (clamped at 0) and, for `BURN_OBJECT` while `lamplit`, runs `del_light_source`, `age += expire - moves`, and clears `lamplit`. It does not call `impossible` when the object is dark, and it does not `update_inventory` for `OBJ_INVENT`. Both are named. `memset`/`free` are GC, named.

`csym --callers`: prototype `timeout.c:1956` and the call `timeout.c:2305`. That call is `mkobj.js:1264` at this SHA. `obj_stop_timers` keeps its own walk; C does not call `remove_timer` there.

## Hallucinations / overclaim

The subject says no arm of the match or the unlink is omitted. The func test, the `a_void` test, the head write, and the predecessor write are present. It does not claim the full `cleanup_burn`. The falsy-arg return, the `timed` clamp, and the two `cleanup_burn` lines are named in the same commit. Only `burn_object` has a cleanup pointer, so skipping the other eight rows is the table, not a missing dispatch.

## Density

The coverage row asked for `remove_timer`. C is 16 code lines; the whole body shipped, and the one caller was rewired in the same commit. Not an arm peel.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify remove_timer --base a30a7de84~1 --reach-all`.

```
verify remove_timer: baseline a30a7de84~1 (scoreboard at f7def900a, 2026-09-27T10:28:49.129Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify remove_timer: no corpus session is blocked on it at a30a7de84~1 — a vacuous verify is NOT a corpus PASS. …
smoke remove_timer: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty blocked-line is the vacuous note. No `REGRESSED` session. The D-log's green, strict, and cohort are the port's own verify line; full suite was skipped because `mkobj.js` is not on the shared-file list.

## Actionable C-wrongs

None. The dark-lamp `impossible`, the inventory refresh, the `timed` clamp, and a falsy arg are the named `stop_timer` edges, not a stub inside `remove_timer`.

Verdict: **ACCEPT**
