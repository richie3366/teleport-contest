# Review 2910 — f87e29d03 — dodip shortestname: is_plural + pair_of

- SHA: `f87e29d03` (cliff, writer port: 1 expression)
- D-entry: D-4069; Ledger: potion.c (`dodip`, D-4069)
- `js/` diff: `js/potion.js` +4/−3, `js/wield.js` +1/−1 (`export`)

## Intent vs deliverable

Promise: `shortestname` skipped `pair_of`, so a single pair of boots got
«Dip it into the moat?» for «Dip them …» with `verbose` off
(worldtour-Monk-50650072 → FULL PASS). The diff uses the canonical
`is_plural` (objnam.js) and exports wield.js's already-faithful
`pair_of`. Promise = diff.

## Inventory

- `dodip` shortestname — potion.js:2751. C: potion.c dodip `:2286`.
- `is_plural` — objnam.js:2546. C: obj.h:421–424.
- `pair_of` — wield.js:71 (now exported). C: obj.h:427.
- Named second copy: invent.js:4768 `pair_of_inv` (same body).

## C ↔ JS fidelity

C (csym potion.c dodip + obj.h):

```c
    shortestname = (is_hands || is_plural(obj) || pair_of(obj)) ? "them"
                                                                  : "it";

#define is_plural(o) \
    ((o)->quan != 1L                                                    \
     /* "the Eyes of the Overworld" are plural, but                     \
        "a pair of lenses named the Eyes of the Overworld" is not */    \
     || ((o)->oartifact == ART_EYES_OF_THE_OVERWORLD                    \
         && !undiscovered_artifact(ART_EYES_OF_THE_OVERWORLD)))
#define pair_of(o) ((o)->otyp == LENSES || is_gloves(o) || is_boots(o))
```

JS `is_plural`: `quan !== 1` or (Eyes artifact && discovered), which
matches. The old JS `quan !== 1` missed the Eyes arm and the whole
`pair_of`. JS `pair_of`: LENSES, or ARMOR_CLASS with
`oc_skill ∈ {ARM_GLOVES, ARM_BOOTS}`. `is_gloves` / `is_boots` in C are
`oclass == ARMOR_CLASS && oc_armcat == ARM_GLOVES/BOOTS`, and JS stores
armcat in `oc_skill` (the same field C aliases). So it is equivalent.
`shortestname` is used only in the four `verbose ? obuf : shortestname`
prompts (fountain, pool/moat, potion, generic), so the change is
confined to prompt text with no RNG.

`imports.mjs`: potion.js → wield.js is a new static edge on a hoisted
function with call-time use only, so there is no TDZ (js/ is one SCC
already).

## Hallucinations / overclaim

None. The `pair_of_inv` duplicate is named, not merged (same body, no
behavior).

## Density

A one-expression writer with movement on its probe. One `Ledger:`
entry. No unreached work.

## Verification

Re-measure (`--base f87e29d03~1 --no-reach`):

```text
verify dodip: 1 blocked
  scen-worldtour-Monk-50650072: PASS
verify dodip: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
```

This is an exact match with the D-log. There were no FORCE/DIAG/seed
strings, and the rulecheck is clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
