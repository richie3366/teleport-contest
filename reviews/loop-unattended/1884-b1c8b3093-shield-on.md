# Review 1884 — b1c8b3093 — Shield_on (D-2925)

- SHA: `b1c8b3093` (coverage; `do_wear.c` `Shield_on`)
- Files: `js/do_wear.js` only. File-local `Shield_on` rewritten. Caller `set_wear` already awaited it (`do_wear.js:1666`).
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` diff. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs` (the old body called `find_ac`; this body calls `update_inventory` and `impossible`. `Shield_on` stays file-local, matching C `staticfn`):

```
Shield_on        NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/do_wear.js:1450
update_inventory js/invent.js:4745   sync
find_ac          js/u_init.js:1409   sync
impossible       js/display.js:8117   ASYNC — await required
```

One local, not a second clone. `find_ac` remains the live export and is no longer called from this function.

## Intent vs deliverable

Subject promises the nine-shield switch, `impossible` for any other `otyp`, then `known = 1` and `update_inventory` when the shield was unknown, with no `find_ac`. The diff is that body. No RNG.

## Inventory

| JS | Class | C |
|----|-------|---|
| `Shield_on` | file-local async `do_wear.js:1450` | `do_wear.c:704–730` static |
| `impossible` | live async | `do_wear.c:723` `unknown_type` |
| `update_inventory` | live sync `invent.js:4745` | `do_wear.c:727` |
| `set_wear` | existing caller `do_wear.js:1666` | `do_wear.c:1566` |
| shield `otyp` consts | `objectNames.indexOf` | `objects.h` names |

## C ↔ JS fidelity

`do_wear.c:712–724`: switch on `uarms->otyp`. Nine cases (`SMALL_SHIELD` through `SHIELD_OF_REFLECTION`) break. Default calls `impossible("Unknown type of %s (%d)", "shield", uarms->otyp)` and falls through. JS matches. `objectNames` indices are 150–158 and none is `-1`. `impossible` (`display.js:8124`) substitutes `%s` and `%d` in order, so the string is `Unknown type of shield (N)`.

`do_wear.c:725–728`: if `!uarms->known`, set `known = 1` and `update_inventory`. JS matches. `update_inventory` is sync, so the await is only on the default `impossible`.

`do_wear.c:729` returns 0. JS returns 0. A null `uarms` returns 0 before the switch. C would dereference. `set_wear` only calls when `u.uarms` is set (`do_wear.c:1565–1566`, `do_wear.js:1666`). Named.

C's comment (`do_wear.c:705–710`) says shield extrinsics are set in `setworn` before this function. This SHA does not add that work. `Shield_off` is a different function and was not in this diff.

The only C call is `do_wear.c:1566` inside `set_wear`. `do_wear.c:30` is the prototype. `do_wear.c:710` is a comment. No other JS caller was added, and none is missing.

## Hallucinations / overclaim

The subject says no arm of `Shield_on` is omitted. The nine cases, the default, and the `known` arm are present. Dropping `find_ac` matches C: this function never called it. The claim is not a dispatch with a stubbed callee. `impossible` and `update_inventory` are live.

## Density

The coverage row asked for the whole function. C is 27 lines. The whole body shipped. One caller, already wired.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify Shield_on --base b1c8b3093~1 --reach-all`.

```
verify Shield_on: baseline b1c8b3093~1 (scoreboard at b88b8599f, 2026-09-27T02:19:54.792Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify Shield_on: no corpus session is blocked on it at b1c8b3093~1 — a vacuous verify is NOT a corpus PASS. …
smoke Shield_on: no RNG-tagged reach; fixed smoke spread (12 run, 3.8s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, and cohort are the port's own verify line (one `js/` file, full suite skipped).

## Actionable C-wrongs

None. Putting on a shield names the nine `otyp`s, rejects any other, and marks an unknown shield known.

Verdict: **ACCEPT**
