# Review 1895 — 4dd4bd973 — dealloc_killer (D-2936)

- SHA: `4dd4bd973` (coverage; `end.c` `dealloc_killer`)
- Files: `js/end.js` walks the delayed-killer chain, `impossible`s a missing node, and runs `debugpline1` after the unlink. `debugcore` is the `files.js` export.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` diff. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs` (`debugpline1` is a macro, so the helper is file-local):

```
dealloc_killer   js/end.js:2011   sync
debugcore        js/files.js:1322   sync
debugpline1_end  NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/end.js:1997
```

`imports.mjs --can js/end.js js/files.js debugcore` → `ALREADY`.

## Intent vs deliverable

Subject promises a null pointer returns, a node that is not on the list is `impossible`, and a node that is on the list is unlinked and then reported through `debugcore`. The diff is that. `free` drops the JS object. `impossible` and the debug `pline` are not awaited.

## Inventory

| JS | Class | C |
|----|-------|---|
| `dealloc_killer` | live sync `end.js:2011` | `end.c:1738–1757` |
| `debugpline1_end` | file-local macro body `:1997` | `lint.h:31–37` and `:61` |
| `debugcore` | live `files.js:1322` | `files.c` `debugcore` |
| `find_delayed_killer` | already walked `.next` | `end.c` same list |

## C ↔ JS fidelity

`end.c:1740–1756`: `prev` starts at `&svk.killer`. A null `kptr` returns. The walk is `svk.killer.next` until null, breaking when `k == kptr`. If the walk ends on null, `impossible("dealloc_killer (#%d) not on list", kptr->id)`. Otherwise `prev->next = k->next`, `free(k)`, and `debugpline1("freed delayed killer #%d", kptr->id)`.

JS uses `game.killer` as that sentinel. `delayed_killer` (`end.js:1968`) creates `{ name, format, next }` and pushes real nodes onto `.next`. The walk starts at `.next`, so the death-message object itself is not a list node. A missing `game.killer` makes `k` null, so a non-null pointer is not on the list and `impossible` runs. C's static sentinel is the same empty walk. `kptr.id | 0` is the `%d`. `impossible` substitutes `%d` (`display.js:8124`).

`DEBUG` is on (`patchlevel.h:36`). This build is not `_MSC_VER`, so `debugpline1` is `ifdebug(pline(...))` (`lint.h:61`), not the CRT reporter at `:52`. `ifdebug` (`:31–37`) calls `debugcore(file, TRUE)`. The false arm does not pline. The true arm saves `iflags.last_msg`, plines, and restores it. JS does that. `pline` is async: the call runs until its first `await` (`display.js:7918`), and `last_msg` on the main path is written inside that await. The restore therefore runs before the debug line finishes. The commit names that. Empty `sysopt.debugfiles` makes `debugcore` return false (`files.js:1326`), which is the usual arm, and that arm does not pline.

Callers: `polyself.c:245` → `polyself.js:1085`. `potion.c:191` `make_sick` cure → `potion.js:1063`. `potion.c:210` `make_slimed` → `potion.js:968`. `potion.c:237` `make_stoned` → `potion.js:991`. `timeout.c:463` `slimed_to_death` → `timeout.js:883`. `timeout.c:474` is the second call in that function → `timeout.js:895`. `timeout.c:682` petrify expiry → `timeout.js:1284`. `timeout.c:711` illness expiry → `timeout.js:1318`. The `impossible` string at `end.c:1751` is the body, not a caller.

## Hallucinations / overclaim

The subject says no arm of the unlink is omitted. The null return, the not-on-list `impossible`, the unlink, and the debug pline are present. It also says the true arm restores `last_msg` the way C does after `pline` returns. The restore is in the source after the call, and it runs before the promise finishes. That sentence is the overclaim, and the same commit names it.

## Density

The coverage row asked for `dealloc_killer`. The whole body shipped, and the eight C call sites already called this export. Not an arm peel.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify dealloc_killer --base 4dd4bd973~1 --reach-all`.

```
verify dealloc_killer: baseline 4dd4bd973~1 (scoreboard at b88b8599f, 2026-09-27T02:19:54.792Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify dealloc_killer: no corpus session is blocked on it at 4dd4bd973~1 — a vacuous verify is NOT a corpus PASS. …
smoke dealloc_killer: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, and cohort, and the skipped full suite, are the port's own verify line (one file, `end.js`).

## Actionable C-wrongs

None. A missing node is reported, and a node that is on `.next` is unlinked. The debug `last_msg` restore is early only when `debugcore('end.c', true)` is true.

Verdict: **ACCEPT**
