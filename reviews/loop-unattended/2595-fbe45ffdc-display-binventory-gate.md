# Review 2595 — fbe45ffdc — display_binventory pool/lava overlay gate

SHA: `fbe45ffdc` (D-3725). Underwater-idiom family residual, 1 gate,
`js/invent.js` only (+4/−1). Ledger: display_binventory ported
stands.

## Intent vs deliverable

Promise: C skips the under-liquid item list when submerged
(invent.c:5501); JS read dead-false sticky `u.Underwater` →
gate reads live `(u.uinwater | 0)`. Diff actually adds: the
one-conjunct rewire + C-cite comment. Promise matches diff.

## Inventory

- `display_binventory` (js/invent.js:4715, async) ↔ C
  nethack-c/upstream/src/invent.c:5488–5546 (csym range), gate
  :5501.

## C ↔ JS fidelity

C `:5501–5502` `if (is_pool_or_lava(x, y) && !Underwater &&
(obj = svl.level.objects[x][y]) != 0)` confirmed verbatim. JS
now `(is_pool(x, y) || is_lava(x, y)) && !(game.u?.uinwater |
0)` followed by `const obj = objects_at(x, y); if (obj)` —
`is_pool || is_lava` is exactly `is_pool_or_lava`, and splitting
the obj fetch out of the condition preserves short-circuit
order (pure predicates, no RNG). Underwater ≡ u.uinwater
verified 2591. `sym.mjs display_binventory` →
`js/invent.js:4715 ASYNC` — canonical export, no clone, no
STUB, nothing deleted or re-pointed. C caller is the single
zap.c:3258 WAN_PROBING site; untouched (gate body only).

## Hallucinations / overclaim

None.

## Density

One whole gate + focused test + ledger + verify on an empty
queue. Right-sized; successor lead (D-3726 covers_objects)
named.

## Verification

Re-measured: `verify display_binventory --base fbe45ffdc~1
--reach-all` → 0 blocked (vacuous, as stated) + `smoke
display_binventory: no RNG-tagged reach; fixed smoke spread
(24 run, 10.6s): 24 PASS, 0 regressed → REACH-OK`. Matches the
D-log. Rule #2 clean. Diff grep FORCE/DIAG/RNG/coords: no
hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
