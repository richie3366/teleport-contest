# Review 2354 — 1ae9cc180 — feel_location Underwater gate reads live u.uinwater

- SHA: `1ae9cc180` — "`display.c` feel_location Underwater gate reads live u.uinwater (D-3400)."
- D-entry: D-3400 (Must-fix 2348.1, closes the queue row; stamps review 2348).
- Diff size: js/display.js +4/−2 (gate + comment); new `scripts/feel-location-underwater.test.mjs` (+55); ledger + journal + index + archive + scoreboard bookkeeping.
- Method: full per-function (≤10-function SHA).

## Intent vs deliverable

Promise (subject + body): one-line flip of the `feel_location` Underwater gate
from the never-written `(u.Underwater|0)` to `(u.uinwater|0)` plus a
field-citing comment (D-3393 newsym idiom), a new 3-subtest focused test,
scoped to this line (the ~20-site `u.Underwater` alias family untouched per
the queue row).

Diff actually adds: exactly that — the gate line flip and 3-line comment in
`feel_location`, the new test file, and the Must-fix close-out (archive row,
`Addressed: D-3400` stamp on review 2348, `feel_location ported` ledger row).
No other JS function touched. Promise == deliverable.

## Inventory

| JS symbol | File:line (now) | C range | Status |
|---|---|---|---|
| `feel_location` (predicate only) | js/display.js:5233 | display.c:745–909, gate :769–772 | Must-fix flip, whole-body untouched |

No new helpers, no imports changed, no clones introduced or removed.

## C ↔ JS fidelity

C (`csym.mjs feel_location` → display.c:745–909) at :769–772:

```c
/* The hero can't feel non pool locations while under water
   except for lava and ice. */
if (Underwater && !Is_waterlevel(&u.uz)
    && !is_pool_or_lava(x, y) && !is_ice(x, y))
    return;
```

JS after the fix (js/display.js gate):

```js
if ((u.uinwater | 0) && !Is_waterlevel(u.uz)
     && !is_pool_or_lava_disp(x, y) && !is_ice_disp(x, y)) {
     return;
}
```

Branch-by-branch confirm:

- `Underwater` ≡ `(u.uinwater)` — verified at nethack-c/upstream/include/youprop.h:279
  (`#define Underwater (u.uinwater)`), so `(u.uinwater|0)` is the exact macro
  expansion; the old `(u.Underwater|0)` read a field no JS ever writes.
- `!Is_waterlevel` / `!is_pool_or_lava` / `!is_ice` operands and order unchanged
  from the prior (already faithful) port; the fix touches only the first operand.
- Liveness of the new field verified by grep: `u.uinwater` is written via
  `set_uinwater` (js/trap.js:6580,6641,6671; js/zap.js:1199) and directly
  (js/detect.js:1066,1078); `u.Underwater` has zero assigns / bracket-writes /
  object-literal inits port-wide (only reads, e.g. js/monmove.js:1017).
- Callers: none rewired, none needed — the D-log lists every previously wired
  JS site (detect, dokick, hack, lock, display wrapper); the fix rides them all.
  C caller list (`csym --callers`: 24 refs incl. comments) matches the D-log's
  wired set; no C caller is newly unwired.
- No RNG in the gate; no branch-order change elsewhere in the 165-line body.

## Hallucinations / overclaim

None. The D-log's "zero assigns" claim re-verified true at HEAD; the "D-3393
newsym :5375 idiom" citation matches the same `(u.uinwater|0)` pattern. The
test's pre-fix failure description (seenv 255 where C returns) is consistent
with a never-firing gate. No dispatch-vs-callee overclaim (no callee changed).

## Density

Single-function Must-fix (not a batch): the whole C gate arm is ported, the
rest of the body was already whole and is untouched. `Left open:` none. Named
omission (`feel_can_reach_floor` usteed P_RIDING/ustuck/ceiling-hider omit,
doc :5092) is pre-existing and explicitly carried, not newly introduced.
Ledger has its own entry (`feel_location ported`) and the D-log its Verify line.

## Verification

- Re-measured the corpus claim myself:
  `hidden-proxy.mjs verify feel_location --base 1ae9cc180~1 --reach-all` →
  "0 session(s) blocked on it (0 at baseline, 0 in working)", vacuous-verify
  note, "smoke feel_location: no RNG-tagged reach; fixed smoke spread
  (24 run): 24 PASS, 0 regressed → REACH-OK". Matches the D-log bullet
  exactly; vacuous is correct here (Must-fix row, never a corpus-blocked row).
- Focused test re-run: `node --test scripts/feel-location-underwater.test.mjs`
  → 3 pass, 0 fail.
- `node scripts/imports.mjs --rulecheck` → "Rule #2 clean" across scored `js/`.
- Diff grep: no FORCE/DIAG/getRngLog/seed/fastforward/coordinates.
- Full-44/44 + green + strict + cohort claims ride the shared-file verify; the
  end-of-iteration full `sessions` rescore re-proves the fortress on this tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
