# Review 1811 — 81fd2232b — start_glob_timeout (D-2852)

- SHA: `81fd2232b` (coverage; `mkobj.c` `start_glob_timeout`)
- Files: `js/mkobj.js`, `js/hack.js`
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, seed name, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `start_glob_timeout`. A non-glob calls `impossible` with `otyp` and `simpleonames` and returns without a timer. `obj->timed` stops `SHRINK_GLOB` through `obj_to_any`. `when < 1` becomes `25 + rn2(5) - 2` (23..27). `start_timer` gets that delay, `TIMER_OBJECT`, `SHRINK_GLOB`, and `obj_to_any`. The function stays sync. The diff replaces the silent non-glob return and the bare object argument with that body, and adds `obj_to_any`.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `start_glob_timeout` | sync export `mkobj.js:1608` | `mkobj.c:1473–1491` |
| `obj_to_any` | sync export `hack.js:203` | `hack.c:96–102` |
| `stop_timer` / `start_timer` | LIVE `mkobj.js:1147` / `:1249` | the two timer calls |
| `impossible` | LIVE `display.js:8116` (async, not awaited) | `impossible(...)` at `:1479` |
| `simpleonames` | LIVE | the format argument |

`sym.mjs`:

```
start_glob_timeout js/mkobj.js:1608   sync
obj_to_any       js/hack.js:203   sync
```

Nothing was deleted. The old body passed `obj` into both timer calls. Those arguments now go through `obj_to_any`, which returns the same object.

## C ↔ JS fidelity

`csym` body is `mkobj.c:1472–1491`. Callers the tool prints: `mkobj.c:968`, `:1551`, `:1571`, `:1663`, `:3742`, `pickup.c:2796`, and the `extern.h:1698` declaration (`NONNULLARG1`). JS calls: `mkobj.js:2216` (pudding init, the `:968` site), `:1894` (`moddelta`, the catch-up at `:1551`), `:1914` (the ice / eating reschedule at `:1571`), `:2001` (the fade-or-reschedule arm at `:1663`), `:3062` (`tm1`, the absorb average at `:3742`), and `muse.js:2915` inside `removed_from_icebox`, which is the `pickup.c:2796` site. All six calls pass the same arguments.

Non-glob: `impossible("start_glob_timeout for non-glob [%d: %s]?", otyp, simpleonames(obj))` then `return`. No `rn2`, no timer. `impossible` is async. The call is `void impossible(...)`, so the promise is not awaited. C returns only after `impossible` finishes, which can wait on `--More--`. The subject and the map name that. A glob does not take the arm. `!obj.globby` throws if `obj` is null; C is `NONNULLARG1`.

If `obj.timed`, `stop_timer(SHRINK_GLOB, obj_to_any(obj))`. Then if `when < 1`, one `rn2(5)` and `when = 25 + that - 2`. Then `start_timer(when, TIMER_OBJECT, SHRINK_GLOB, obj_to_any(obj))`. No other RNG. `start_timer` matches `TIMER_OBJECT` entries with `curr.obj === arg` (`mkobj.js:1276`). `stop_timer` uses the same identity (`:1157`). C `obj_to_any` zeros `gt.tmp_anything` and sets `a_obj` (`hack.c:96–102`). The JS handle is the object, which is the key those two functions compare. `monst_to_any` is the same collapse (`hack.js:192`).

`--callers obj_to_any` prints 52 sites. This commit defines the function and uses it at the two calls inside `start_glob_timeout`. The other sites already pass the object into the same timer key. The subject names `set_corpsenm` and `obj_absorb`'s `stop_timer` as still passing the object. That is the same key, not a second timer protocol.

## Hallucinations / overclaim

The subject says the non-glob arm calls `impossible` and does not start a timer. It does. It says `obj_to_any` is the timer handle. `start_timer` and `stop_timer` compare the object. It says the function stays sync so `rn2` stays on the caller turn. The export is sync, and `impossible` is the only async call, and it is not awaited, which is what the subject says. It does not claim the other 50 `obj_to_any` call sites were switched in this commit.

## Density

The whole function, both timer calls, and all six C callers were already wired and still are. `obj_to_any` is the callee those two calls need. The un-awaited `impossible` is the named error return, not a stub of the glob arm.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify start_glob_timeout --base 81fd2232b~1 --reach-all`.

```
verify start_glob_timeout: baseline 81fd2232b~1 (scoreboard at e6d1ac649, 2026-09-26T08:07:52.787Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke start_glob_timeout: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's own full 44/44 was the commit's verify line. This audit's `sessions` run is the cadence score, not a second claim inside that line.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
