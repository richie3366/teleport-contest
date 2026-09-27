# Review 1907 — dc6fd838d — Shirt_on (D-2948)

- SHA: `dc6fd838d` (coverage; `do_wear.c` `Shirt_on`)
- Files: `js/do_wear.js` replaces the known-bit plus `find_ac` body with the shirt `switch`, `impossible`, and `update_inventory`.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` diff. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- The diff does not delete a symbol. `sym.mjs` (C `Shirt_on` is `staticfn`; one file-local is that function):

```
Shirt_on         NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/do_wear.js:1639
impossible       js/display.js:8258   ASYNC — await required
update_inventory js/invent.js:4745   sync
```

## Intent vs deliverable

Subject promises one file-local `Shirt_on`: Hawaiian shirt and T-shirt break, any other `otyp` is `impossible`, then an unknown shirt becomes known and `update_inventory` runs. The diff is that function. `find_ac` is gone. A null `uarmu` returns 0.

## Inventory

| JS | Class | C |
|----|-------|---|
| `Shirt_on` | file-local (C `staticfn`) `do_wear.js:1639` | `do_wear.c:758–775` |
| `HAWAIIAN_SHIRT` / `T_SHIRT` | `objectNames` 136 / 137 | the two `case` labels |
| `impossible` | live async `display.js:8258` | `do_wear.c:9` `unknown_type` |
| `update_inventory` | live sync `invent.js:4745` | `do_wear.c:772` |

## C ↔ JS fidelity

`do_wear.c:763–775`. Switch on `uarmu->otyp`. `HAWAIIAN_SHIRT` and `T_SHIRT` break. Default calls `impossible(unknown_type, c_shirt, uarmu->otyp)`. `unknown_type` is `"Unknown type of %s (%d)"` (`:9`). `c_shirt` is `"shirt"` (`:11`). Then, if `!uarmu->known`, set `known = 1` and `update_inventory`. Return 0. No `find_ac`. No `rn2`. The comment at `:761–762` is why the switch stays.

JS `:1641–1655` is that order. `impossible` (`display.js:8265–8268`) substitutes `%s` and `%d`, so the line is `Unknown type of shirt (N)`. `update_inventory` is synchronous and is not a second await. `set_wear` awaits `Shirt_on` (`do_wear.js:1686`). `unmul` awaits `afternmv` (`hack.js:1729`).

A null `uarmu` returns 0 before the switch. C would read `uarmu->otyp`. Named. The two shirt indices are not `-1`.

Callers: prototype `do_wear.c:31`. `do_wear.c:1554` `set_wear` → `do_wear.js:1686`. `do_wear.c:2391` stores `afternmv = Shirt_on` → `do_wear.js:3325`. `do_wear.c:1584` `donning` compares that pointer → `do_wear.js:3908`. `do_wear.c:1674` `cancel_don` compares it → `do_wear.js:3860`. No call from a site C never uses the name.

## Hallucinations / overclaim

The subject says no arm is omitted. Both shirt cases, the default `impossible`, and the known-bit `update_inventory` are present. `find_ac` is not in the C function. The null return is named.

## Density

The coverage row asked for `Shirt_on`. The 18-line body shipped. The `set_wear` call and the `afternmv` stores are the C uses of the name. Not an arm peel.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify Shirt_on --base dc6fd838d~1 --reach-all`.

```
verify Shirt_on: baseline dc6fd838d~1 (scoreboard at b88b8599f, 2026-09-27T02:19:54.792Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify Shirt_on: no corpus session is blocked on it at dc6fd838d~1 — a vacuous verify is NOT a corpus PASS. …
smoke Shirt_on: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, and cohort are the port's own verify line. Full suite was skipped; `do_wear.js` was not treated as a shared file.

## Actionable C-wrongs

None. The null `uarmu` return is the named guard.

Verdict: **ACCEPT**
