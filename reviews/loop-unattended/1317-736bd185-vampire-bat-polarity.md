# Review 1317 — 736bd185 — done_in_by vampire-bat arm polarity (D-2351)

Metadata: SHA `736bd185`, D-2351, closes the review-1314 Must-fix
(stamped `**Addressed:** D-2351` in this same commit). Method: `js/`
hunk read (1 file, +3/−2); C `done_in_by` imitator arm
(`nethack-c/upstream/src/end.c:184-190` branch order via
`csym.mjs done_in_by`, full body range `:184-344`); added-line
banned grep (0 hits); `imports.mjs --rulecheck` (clean, re-run);
`hidden-proxy verify done_in_by --base 736bd185~1` re-run. No
symbol deleted or re-pointed (one operator + comment) → no
`sym.mjs` clone→import output owed (`done_in_by` stays
`js/end.js:1199` ASYNC).

## Intent vs deliverable

Subject promises the one-character fix review 1314 ordered:
the vampire-bat arm fired on `!==` where C fires on equality.
Diff delivers exactly that — `!==` → `===` plus a C-cited
comment — no new modules, imports, or edges. Promise kept.

## Inventory

- `js/end.js` `done_in_by` imitator arm only: predicate
  operator + two-line C comment.
- Named: none new (ghost arms stay named per D-2341).

## C ↔ JS fidelity

Branch-by-branch confirm against C (`end.c`, imitator arm):

```c
} else if (alt && strstri(realnm, "vampire")
           && !strcmp(fakenm, "vampire bat")) {
    /* ... "vampire in bat form" ... */
    fakenm = "bat";
}
```

JS now `else if (alt && strstri(realnm, 'vampire') &&
fakenm === 'vampire bat')` → `'bat'` — same position (second
`else if` after the `mimicker` arm), same three conjuncts in C
order, `===` ≡ `!strcmp` on equality. Both inverted directions
from review 1314 resolve: bat-form no longer prints
"vampire in vampire bat form", fog-form no longer steals
"bat". `strstri` truthiness and the `shape` article arms are
pre-existing and untouched by this SHA. No clone / stub /
callee shape — single predicate, nothing to classify.

## Hallucinations / overclaim

None. No dispatch/stub shape; the D-log claims only the
operator fix and names no new behavior.

## Density

Must-fix alone, +3/−2, one predicate, one falsifier.
Exemplary per §2b (Must-fix stays one item, alone).

## Verification

D-log: `verify.mjs --fn done_in_by` PASS (syntax / rule2 /
hidden-vacuous-disclosed / green 2/2 / strict ×2 / cohort 7/7)
+ truth-table probe (deleted). Re-measured:

```text
verify done_in_by: baseline 736bd185~1 — 0 session(s) blocked on it
  (0 at baseline, 0 working) — vacuous, NOT a corpus PASS
```

Matches exactly; vacuous honestly labeled, row cited 0 blocks
so no older `--base` owed. Added-line banned grep 0 hits;
`--rulecheck` clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
