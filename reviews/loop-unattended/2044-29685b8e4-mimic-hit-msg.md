# Review 2044 — 29685b8e4 — mimic_hit_msg restart (D-3084)

Metadata: SHA `29685b8e4`, D-3084, js/zap.js (+19/−11). Single-function
coverage restart (review-430 clone cleanup).

## Intent vs deliverable

Promise: "C switch + live simple_typename" — replace the early-return
guards with the C 4-case switch and the `objectNames[ap]` lowercasing
with live `simple_typename`. Diff delivers exactly that + the
simple_typename import + doc touch. Kept.

## Inventory

- `mimic_hit_msg` (RESTARTED js/zap.js:3874, file-local — matches the
  pre-existing local; C mon.c exports it but the sole caller is in this
  TU's counterpart, and the local predates this SHA): ap-first, full
  switch, otyp gate, live The/simple_typename/pline_mon. Callees all
  LIVE (below). Deleted: the inline `objectNames[ap]`-lowercase clone
  naming (re-pointed to the live import — `sym.mjs` pasted below).
- No other symbols added/removed.

## C ↔ JS fidelity

C locus (csym range): nethack-c/upstream/src/mon.c:5775–5793. Line walk:

- `ap = mtmp.mappearance` first (:5779) ✓ (`| 0` narrows like C short).
- Full switch :5781–5792 ✓: NOTHING/FURNITURE/MONSTER no-op breaks
  verbatim, OBJECT arm with `otyp === SPE_HEALING || otyp ===
  SPE_EXTRA_HEALING` gate (:5786) ✓.
- `pline_mon(mtmp, "%s seems a more vivid %s than before.",
  The(simple_typename(ap)), c_obj_colors[objects[ap].oc_color])`
  (:5787–5790) ✓: template string exact; `The` live (already imported);
  `simple_typename` live newly imported over the existing objnam.js edge
  (no new module link); color `C_OBJ_COLORS_ZAP[game.objects?.[ap]?.
  oc_color | 0]` with table head `'black','red','green',...` ≡ C
  decl.c:20–23 (`"black" /* CLR_BLACK */`, ...) ✓.
- Dropped `|| 'colorless'` is dead-code removal, not a behavior change:
  every table entry is a non-empty string, so corrupt-ap (index 0 →
  'black') prints identically; only an out-of-range oc_color (C: UB)
  would print `undefined` instead of 'colorless'. C-valid behavior
  identical — observation, not a C-wrong.
- No RNG in C body; none in JS ✓. Async `await pline_mon` ≡ the C
  caller's sync context via the async boundary (sole caller awaits).

`sym.mjs` output (re-point check, Method §3):

```text
simple_typename  js/objnam.js:3893   sync
The              js/objnam.js:1798   sync
pline_mon        js/display.js:7808   ASYNC — await required
```

(`The` has a pre-existing unrelated clone in js/mthrowu.js:800 —
untouched by this SHA; the import here is the export.)

Caller: C sole call site zap.c:456 (`mimic_hit_msg(mtmp, otyp)`) under
`is_obj_mappear(mtmp, STRANGE_OBJECT)` → set_mimic_sym else-branch.
JS js/zap.js:4343 `await mimic_hit_msg(mtmp, otyp)` inside bhitm (def
:3929) under the equivalent `M_AP_TYPE === M_AP_OBJECT && mappearance
=== STRANGE_OBJECT` guard (:4337–4342) ✓ — D-1469 wiring, untouched,
faithful.

Per-function verdict: ACCEPT — exact body, live callees, wired caller.

## Hallucinations / overclaim

None. "none in-body — whole body, every callee live" holds (3/3 +
verified data table). The no-test justification mirrors 2043's (live
mimic mid-bhitm; sessions frozen); verify gates are the coverage, and
the D-log says so plainly.

## Density

Single whole 19-line function, ~30 js insertions — below the §2b
200–800 line target, and unlike review 2037's single the closure is not
exhausted (mon.c still holds Open rows; `validspecmon` is live in the
block now). Thin handoff on density; fidelity exact. Under-size is the
supervisor's density call, not a review QR trigger (no C-wrong to
queue). `Ledger:` ported ✓ (`C 12/JS 14 ok D-3084`).

## Verification

- Re-measured `hidden-proxy verify mimic_hit_msg --base 29685b8e4~1
  --reach-all`: `0 session(s) blocked (0 at baseline, 0 in working)` +
  `fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK`.
  Matches the D-log; honestly vacuous (coverage row cited 0), 0 regressed.
- Ban-grep on the js hunk: clean. `imports.mjs --rulecheck`: Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
