# Review 2881 — 99c3428ef — bhitm nothing/knock/default arms (D-4040)

- SHA: `99c3428ef` (cliff, 1 function: `bhitm`)
- D-entry: D-4040; Ledger: zap.c (bhitm now full body)
- `js/` diff: `js/zap.js` +21/−3 (ret + NOTHING + knock ret + default
  + doc); test `scripts/bhitm-nothing-knock.test.mjs` (new, 2 tests)

## Intent vs deliverable

Promise: distfleeck-head writer with two mechanisms — (a) wand-of-nothing
woke/angered the guard it hit (JS lacked the WAN_NOTHING arm, so
`wake` stayed TRUE and guard mattacku pre-empted the couatl poison);
(b) knock beam hit two monsters (JS always returned 0, C returns 1 to
stop the beam). Diff actually adds `let ret = 0`, the NOTHING arm, the
knock `ret = 1`, the default `impossible`, and `return ret`. No new
imports, no helpers, no clones. Promise = diff.

## Inventory

- `bhitm` (js/zap.js:4124–4608): changed — 4 additions.
  C: `nethack-c/upstream/src/zap.c:159–573` (range per
  `node scripts/csym.mjs bhitm`).

## C ↔ JS fidelity

Every addition verified call-for-call against pinned C: `:162`
`int ret = 0` ✓; knock arm `:401–403` `wake = TRUE; ret = 1;` — JS
sets both in the same order ✓; `WAN_NOTHING :545–547`
`wake = FALSE; break;` ✓; default `:548–551`
`impossible("What an interesting effect (%d)", otyp)` — JS
``await impossible(`What an interesting effect (${otyp | 0})`)`` ✓;
`:571 return ret` ✓. Arm-count cross-check: 27 `case` labels in C's
range vs 27 in JS's — match (the "17 arms" counts case groups).
WAN_NOTHING sits after SPE_DRAIN_LIFE in both (C :521–544 → :545;
verified JS :4397 → :4436); JS continues with WAN_LIGHT where C goes
to default, but every arm ends in `break` — order is semantically
inert, no fallthrough. The `ret` value is consumed: JS `bhit`
(:6547–6556) already breaks the ZAPPED_WAND beam on nonzero fhitm
return (C `:4027–4033`, verified) — the pre-existing live caller chain
takes the new value, so this is not an unwired return. No RNG in the
touched arms either side (knock's `rnd(2)` mhurtle is pre-existing).
No symbol deleted or re-pointed; nothing to `sym.mjs`.

## Hallucinations / overclaim

None. The unchanged third session (51256016 still distfleeck@524) is
disclosed in the subject line itself with a "separate writer" pointer,
not buried. "bhitm is now the full C body" is supported by the
27/27 label count plus the shipped-arm internals pointer to prior
D-entries.

## Density

Cliff-phase: distfleeck-head writer, one C function completed whole,
`Ledger` updated. Named: none new in-unit (standing arm internals
explicitly untouched). Not a no-op: `js/` + test + movement on 2/3
probes with the third honestly unchanged.

## Verification

- Re-measure (this review):
  `hidden-proxy.mjs verify distfleeck --base 99c3428ef~1 --no-reach` →
  `1 PASS, 1 moved past, 1 unchanged, 0 worse` (610081 → disclose@1740;
  50650068 PASS; 51256016 still distfleeck@524) — exact match to the
  D-log line, new owner and stuck session included. Non-vacuous (3
  blocked).
- Focused test re-run: `# pass 2, # fail 0`.
- D-log Verify bullet: REACH-OK distfleeck 80/80 + bhitm 40/40, syntax,
  rule2, green + strict ×2, cohort 7/7 — shipped; final rescore below
  is the regression check.
- `imports.mjs --rulecheck` → clean (this iteration); diff has no
  imports, no FORCE/DIAG/seed/coordinate gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
