# Review 1786 — f5cea8a9c — inv_weight boulder skip (D-2827)

- SHA: `f5cea8a9c` (Must-fix from review 1778; `hack.c` `inv_weight` plus `u_init.c` `u_init_carry_attr_boost`)
- Files: `js/invent.js` `inv_weight`; `js/u_init.js` the boost loop
- Queue row: Must-fix review 1778, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck` (this tree): "Rule #2 clean".

## Intent vs deliverable

Subject promises `inv_weight` in C order, including the boulder/`throws_rocks` skip, and the `while (inv_weight() > 0)` STR-then-CON boost. The diff is that loop and that caller. No other scored function changes.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `inv_weight` | body `invent.js:1128` | `hack.c:4350–4365` |
| `throws_rocks` | imported `monsters.js:583` | `mondata.h:134` `M2_ROCKTHROW` |
| `weight_cap` | existing `invent.js` | `gw.wc = weight_cap()` at `:4363` |
| `u_init_carry_attr_boost` | `u_init.js:1797` | `u_init.c:928–940` |
| `adjattrib` | imported async `attrib.js:510` | `attrib.c:116–199`; `msgflg > 0` is silent |

`sym.mjs` (symbols the diff adds to the import lists):

```
throws_rocks     js/monsters.js:583   sync
inv_weight       js/invent.js:1128   sync
adjattrib        js/attrib.js:510   ASYNC — await required
```

`imports.mjs --can`: `invent.js` → `monsters.js` `throws_rocks` ALREADY; `u_init.js` → `invent.js` `inv_weight` ALREADY; `u_init.js` → `attrib.js` `adjattrib` ALREADY. Both new calls sit inside functions.

`M2_ROCKTHROW` is `0x08000000` in `monflag.h:149` and `js/monsters.js:109`. `throws_rocks` is `(mflags2 & M2_ROCKTHROW) != 0`, with a null `ptr` returning false.

## C ↔ JS fidelity

`csym` `inv_weight` `hack.c:4350–4365`. Walk `gi.invent` via `nobj`. Coins add `(int)((quan + 50) / 100)`. Else add `owt` when `otyp != BOULDER || !throws_rocks(youmonst.data)`. Then `gw.wc = weight_cap()` and return `wt - wc`.

`invent.js:1129–1142` walks `game.invent`. Coins use `Math.trunc((quan + 50) / 100)` then `| 0` (toward zero, matching the positive C division). The `else if` is the same predicate: `otyp !== OTYP_BOULDER` (`objectNames` index of `BOULDER`) or `!throws_rocks(youmonst.data)`. A boulder whose form has `M2_ROCKTHROW` adds nothing. `weight_cap()` is stored on `game._weight_cap` and subtracted. `| 0` on the running total and the return is the 32-bit `int` width.

`throws_rocks(null)` is false, so a null `youmonst.data` counts the boulder. C would dereference. Named, and it matches the helper.

`csym --callers`: the live calls are already on this function. `dokick.c:225` / `:1432` → `dokick.js:990` / `:1761`. `dothrow.c:826` → `dothrow.js:3054`. `hack.c:140` → `hack.js:280`. `hack.c:968` → `mon.js:245`. `hack.c:4374` and `:4393` are `calc_capacity` / `near_capacity` in `invent.js`. `insight.c:1235` and `:1245` → `invent.js:5272` and `:5278`. `timeout.c:914` → `timeout.js:1042`. `trap.c:5463` → `trap.js:7187`. `u_init.c:932` is the boost. `do.c:1325` is the comment the D-log names, not a call. `decl.h` / `weight.h` are not calls.

`u_init.c:928–940`: while overweight, `adjattrib(A_STR, 1, TRUE)` then `A_CON`; either success continues; both false breaks. `u_init.c:1392` is the only call, after `vary_init_attr`. `u_init.js:1797–1802` is that loop. `adjattrib(..., true)` is `msgflg | 0 === 1`, so the `msgflg == 0` and `msgflg <= 0` messages stay off (`attrib.c:124` comment: positive means no message). `encumber_msg` still waits on `in_moveloop`. The sole JS call is `await` at `u_init.js:2025`, after `vary_init_attr`, matching `:1392`. Positive `incr` does not call `rn2`.

## Hallucinations / overclaim

The subject says the boulder is skipped for a rock-thrower and that `hurtle_step` / the crevice then see `wt - wc + wc` without that `owt`. The predicate is the C predicate, and those two callers already add `inv_weight() + weight_cap()`. The boost is the C loop, not a second weight formula. The null-data count and the `doup` `near_capacity` omit match the code.

## Density

The whole 16-line C function, plus the stub caller the subject names. Callers that already invoked `inv_weight` keep that call. No stub in the live arm.

## Verification

Re-run on this SHA: `node scripts/hidden-proxy.mjs verify inv_weight --base f5cea8a9c~1 --reach-all`.

```
verify inv_weight: baseline f5cea8a9c~1 (scoreboard at 2ec49fa86) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke inv_weight: no RNG-tagged reach; fixed smoke spread (12 run, 3.5s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. D-2827's green, strict, and cohort were not re-run here.

## Actionable C-wrongs

None. The null `youmonst.data` count and the `do.c:1324` climb comment are the named omits.

Verdict: **ACCEPT**
