# Review 3000 — 3fcdc917f — dothrow uses the live freeinv (luck recomputed)

- SHA: `3fcdc917f` (cliff; board head pleased, scen-sweep-Ranger-50156013
  s1064; writer dothrow.c throw_obj / throw_gold → invent.c freeinv)
- D-entry: D-4160; Ledger: throw_obj ported; throw_gold ported
- `js/` diff: js/dothrow.js +18 −22

## Intent vs deliverable

Promise: throw_obj (`:267`) and throw_gold (`:2670`) remove the thrown
object with invent.c freeinv, whose freeinv_core calls set_moreluck when
the object confers luck. dothrow.js kept a splice-only clone, so throwing
a cursed luckstone left `u.moreluck` at −3. Much later, pleased's
`rn1(prayer_luck + 2, 1)` rolled with −1 against C's 0.

Diff: the clone is deleted and invent.js `freeinv` is imported. A small
`throw_freeinv` keeps only the JS-only `_goldCount` decrement, then calls
freeinv. The three call sites use it. The promise matches the diff.

## Inventory

- Deleted: dothrow.js local `freeinv` (old :311).
- Added: `throw_freeinv` — dothrow.js:319 (JS-only cache shim + the
  import).
- Imported: invent.js `freeinv` :9924 → `freeinv_core` :9863.
- Sites: throw_obj split arm and last-item arm (C :259–269), throw_gold
  (C :2670).

`sym.mjs` (required, re-pointed symbol):

```text
freeinv          js/invent.js:9924   sync
             !! ALSO 2 LOCAL CLONE(S): js/steal.js:354  js/steed.js:197
throw_freeinv    NOT EXPORTED — 1 def, js/dothrow.js:319
```

## C ↔ JS fidelity

C freeinv: `extract_nobj(obj, &invent); obj->pickup_prev = 0;
freeinv_core(obj); update_inventory();`. JS invent.js freeinv: splice,
re-link the `nobj` chain, `pickup_prev = 0`, `where = OBJ_FREE`, then
freeinv_core and update_inventory. Same order. freeinv_core's coin arm
sets botl and returns, which covers the old clone's botl line. Its later
arms are luck (`confers_luck → set_moreluck`, C :1388–1390), artifact
intrinsics, Amulet/invocation flags, loadstone and figurine/tin timers,
all now live for thrown objects. Both functions are sync, like the
clone, so no call site changes shape. `_goldCount` is decremented before
freeinv, as the old clone did. It is a JS-only cache and draws no RNG.
set_moreluck draws none either. The divergence surfaced many turns later
in pleased's draw, consistent with stale luck.

Comment nit: throw_gold's "Local freeinv above already decrements the
_goldCount cache" now means throw_freeinv. Harmless.

## Hallucinations / overclaim

The Named "same freeinv clone remains in steal.js:354 and steed.js:197"
is half right. The steal.js clone **does** call freeinv_core, so its
luck is correct; it only lacks `where` / `pickup_prev` /
update_inventory. The steed.js clone is splice-only, but its one caller,
use_saddle (steed.js:373), only ever frees a saddle, and no freeinv_core
arm fires for a saddle. Neither is a reachable luck bug. Both are clone
drift for their files' iterations, and neither needs a Must-fix.

## Density

The head's writer, fixed by deleting a clone. Right-sized.

## Verification

```text
verify pleased,throw_obj,throw_gold --base 3fcdc917f~1 --no-reach
  pleased: 1 PASS (scen-sweep-Ranger-50156013) → PROGRESS
  throw_obj / throw_gold: 0 blocked (vacuous)
```

This reproduces the claim (1279/1279, RNG 47404/47404).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
