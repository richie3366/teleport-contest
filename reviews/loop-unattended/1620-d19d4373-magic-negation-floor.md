# Review 1620 — d19d4373 — mhitu.c magic_negation intrinsic floor hero-polyform disjunct (D-2661)

**Metadata:** SHA `d19d4373`, `mhitu.c` `magic_negation`,
D-2661. JS: `js/mhitm.js` (+13/−8: single-`if` restore +
`form` + comment). Closes review 1617's Must-fix (already
stamped `**Addressed:** D-2661` in this diff's set).

## Intent vs deliverable

Subject promises: restore C's one `if` so the
aligned-cleric/minion floor reads `mon->data` even when
`mon == &youmonst` (hero poly'd into couatl/Aleax,
M2_MINION + polyok, got mc 0 where C gives 1). Diff
delivers exactly that. Promise matches deliverable.

## Inventory

- `magic_negation(mon)` (mhitm.js:2416, sync, exported) —
  intrinsic-floor arm only; rest of the 50 L body untouched.
- No new/deleted symbols, no import changes (all names
  already in scope). No `sym.mjs` re-point output required.

## C ↔ JS fidelity

C locus read in full: `magic_negation :1088–1137` (body
above), callers (`--callers`: insight.c:1800 hero,
uhitm.c:86 `mdef`). No RNG either side. Branch-by-branch
confirm of the changed arm:

- C `:1129–1134`: one `if ((is_you && (...:1130...))
  || (mon->data == &mons[PM_ALIGNED_CLERIC] || ...
  is_minion(mon->data)))`. JS is now the same single
  `if` with C short-circuit order ✓ (the old
  `if (is_you) … else if (aligned/minion)` dropped the
  second disjunct for heroes — the kept C-wrong).
- `form = is_you ? (mon?.data ?? game.youmonst?.data)
  : mon.data`: C reads `mon->data` on both paths; with
  `mon == &youmonst` that is the hero polyform, and with
  the JS null-hero idiom `game.youmonst.data` is the same
  slot ✓. `mon` non-null whenever `!is_you`, so the
  `mon.data` read cannot throw ✓.
- Callees LIVE: `monsndx` (mondata.js:144,
  `ptr?.mndx ?? ptr?.mnum`, null-safe ✓), `is_minion`
  (monsters.js:615, `?.mflags2`, null-safe ✓).
- `HProtection/ublessed/uspellprot` operands untouched
  (D-2347 flat-mirror idiom, pre-existing).

## Hallucinations / overclaim

None. "Short-circuit order matches C" is checkable above
and true.

## Density

Breadth phase: Must-fix single-arm fix, 27-line hunk —
right-sized, alone as required.

## Verification

D-log Verify bullet claims PASS (syntax · rule2 · hidden
note · REACH-OK smoke 24/24 · green · strict · cohort).
Re-measured here: `hidden-proxy.mjs verify magic_negation
--base d19d4373~1 --reach-all` → 0 blocked both sides
(vacuous note, correctly labeled — the Must-fix cited no
corpus blocks, only the polyform C-wrong) + smoke 24/24
PASS, 0 regressed → REACH-OK. Claim true. Diff grep: 0
hits for FORCE/DIAG/getRngLog/fastforward. `imports.mjs
--rulecheck`: clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
