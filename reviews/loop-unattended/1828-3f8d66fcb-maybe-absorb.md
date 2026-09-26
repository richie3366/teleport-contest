# Review 1828 — 3f8d66fcb — maybe_absorb_item (D-2869)

- SHA: `3f8d66fcb` (coverage; `steal.c` `maybe_absorb_item`)
- Files: `js/steal.js` (+64/−6), `js/lock.js` (+5/−2)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises the mimic-keeps-the-pick function and the `pick_lock` call. The diff adds the export and awaits it after `stumble_onto_mimic`. `sym.mjs`:

```
maybe_absorb_item js/steal.js:354   ASYNC — await required
bimanual         js/wield.js:1038   sync
             !! ALSO 10 LOCAL CLONE(S) — including js/steal.js:231
```

`imports.mjs --can js/steal.js js/wield.js bimanual`: `ALREADY: steal.js already statically imports wield.js. No new edge needed.`

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `maybe_absorb_item` | export `steal.js:354` | `steal.c:770–810` |
| `obj_resists` | import `dogmove.js:174` | `zap.c:1457–1473`, one `rn2(100)` |
| `bimanual_obj` | import of `wield.js:1038` | `obj.h:257–259`; table field is `oc_big` |
| `remove_worn_item` | same-file export `steal.js:278` | `steal.c:213–290` |
| local `bimanual` | leftover clone `steal.js:231` | reads `oc_bimanual`; not this arm |

## C ↔ JS fidelity

`csym` body is `steal.c:770–810`. Caller: `lock.c:575` inside `pick_lock`, after `stumble_onto_mimic`, then `PICKLOCK_LEARNED_SOMETHING`. `extern.h:3132` is the declaration. `is_door_mappear` (`monst.h:240–242`) is the furniture door appearance the JS `else if` already tests.

A null object returns before any `rn2`. C marks the argument `NONNULL`; `pick_lock` passes `hasTool ? pick : null` because the `#loot` probe has no tool (`lock.js:1321`). Ball, chain, and `ROCK_CLASS` return next. `obj_resists` is called with `100 - ochance` and `100 - achance`, so the lock-pick pair `(50, 10)` resists when `rn2(100) < 50` for an ordinary object and `< 90` for an artifact. Unique invocation items and a rider corpse always resist (`dogmove.js:176–182`). `touch_artifact` runs only when the object does not resist. That is the C `||` short-circuit.

Carried: `remove_worn_item(obj, true)` when worn, then `subfrombill` with `shop_keeper` of `*u.ushops` (`shk.js:260` accepts the character). `cansee` uses `Some_Monnam` and "them" when `quan > 1`. Unseen uses `body_part(HAND)`, pluralized when `bimanual`. That call is the wield export, which reads `oc_big`. Then `freeinv` and `encumber_msg`. Not carried: the absorb line only when `canspotmon`. `mpickobj` runs after either message arm.

The file-local `bimanual` at `steal.js:231` still reads `oc_bimanual` for the steal-ring arm. This function does not call it.

## Hallucinations / overclaim

The subject says the resist roll is `100 -` the absorb percents. The call and `obj_resists` match that. The local `oc_bimanual` clone is not claimed as this arm.

## Density

The whole function and the one `pick_lock` call. 69 insertions. The leftover `bimanual` clone is a different arm and was not edited here.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify maybe_absorb_item --base 3f8d66fcb~1 --reach-all`. `steal.js` and `lock.js` are not edited by a later SHA in this window.

```
verify maybe_absorb_item: baseline 3f8d66fcb~1 (scoreboard at d039fda06) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke maybe_absorb_item: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The `rn2(100)` is inside `obj_resists`, which no corpus session reaches through this function.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
