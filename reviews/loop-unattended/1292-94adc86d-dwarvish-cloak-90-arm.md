# Review 1292 — 94adc86d — zap.c dwarvish-cloak 90 arm (D-2326)

Metadata: SHA `94adc86d`, D-2326, Must-fix from review 1291 (row cited 0 blocks). Method: `git show` full `js/` hunk (`js/invent.js` +6/−1, comment + arm); C `u_adtyp_resistance_obj zap.c:5674–5698` full body + `--callers` (2 C refs); `sym.mjs` on the symbol; added-lines banned-pattern grep (0 hits); `hidden-proxy verify u_adtyp_resistance_obj --base 94adc86d~1` re-run.

## Intent vs deliverable

Subject promises the dwarvish-cloak 90 arm review 1291 kept as Must-fix. Diff delivers exactly that: one predicate + `return 90` in C position, plus doc-comment update. Promise kept, nothing else touched.

## Inventory

- Cloak arm (`js/invent.js:4853–4857`): null-guarded `uarmc`, otyp vs `DWARVISH_CLOAK`, `AD_COLD || AD_FIRE` → 90.
- Comment retires the "deferred" note, cites `:5676–5698`.

## C ↔ JS fidelity

Arm-for-arm vs C `:5690–5694`: `uarmc &&` null guard ✓ (`game.u?.uarmc` then truthiness); `uarmc->otyp == DWARVISH_CLOAK` ≡ `(uarmc.otyp|0) === objectNames.indexOf('DWARVISH_CLOAK')` (the `do_wear.js:102` convention, verified) ✓; `dmgtyp == AD_COLD || dmgtyp == AD_FIRE` in C order ✓; placed after the 99 arm, before `return 0` ✓. `game.u.uarmc` ≡ C `uarmc` (`you.h` macro for `u.uarmc`, same convention as the neighboring 99 arm). No callee closure to check — the arm calls nothing. Both JS callers (`inventory_resistance_check :4872`, enlightenment `:4951`) are same-file; the function stays file-local, which `sym.mjs` confirms (local at `invent.js:4849`, no second clone). The review-1291 claim that the enlightenment `protection < 99 → "somewhat"` branch was already expecting 90 checks out at `:4951`.

C body (`zap.c:5674–5698`, via `csym.mjs`) in full — the function is 25 lines:

```c
int prop = adtyp_to_prop(dmgtyp);
if (!prop) return 0;
/* items that give an extrinsic resistance when worn or wielded or
   carried give 99% protection to your items */
if ((u.uprops[prop].extrinsic & (W_ARMOR | W_ACCESSORY | W_WEP | W_ART)) != 0L)
    return 99;
/* worn dwarvish cloaks give 90% protection against heat and cold to
   carried items */
if (uarmc && uarmc->otyp == DWARVISH_CLOAK
    && (dmgtyp == AD_COLD || dmgtyp == AD_FIRE))
    return 90;
return 0;
```

The JS hunk mirrors this tail exactly: 99 arm, then the cloak arm, then `return 0` — no other branch exists on either side, so there is no second gap hiding behind this one. The `|0` on `uarmc.otyp` guards the same undefined-otyp shape the 99 arm's extrinsic mask already tolerates.

RNG consequence (why this Must-fix mattered): pre-fix, a cloak-wearing hero hit by ERODE_BURN drew zero RNG and always eroded; post-fix the BURN gate draws `rn2(100)` and wards 90%, matching C. Acid side provably unaffected (cloak covers fire/cold only — the predicate says so on both sides). `sym.mjs` output for the record:

```text
u_adtyp_resistance_obj NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/invent.js:4849
```

File-local by design (both callers same-file); no second clone written.

## Hallucinations / overclaim

None. The hand-probe rate claim (0.901/0.894 ≈ 90%) is consistent with `rn2(100) < 90` and required no tree residue (probe deleted, disclosed). "No new module edges" verified — zero import lines in the hunk.

## Density

6 insertions for a Must-fix single arm. Correct per rule (Must-fix ships alone).

## Verification

D-log tail PASS (syntax/rule2/green 2/2/strict ×2/cohort 7/7, no D-1831 gap) + honest vacuous-hidden note. Re-measured:

```text
verify u_adtyp_resistance_obj: baseline 94adc86d~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches. Banned grep on added lines: 0 hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
