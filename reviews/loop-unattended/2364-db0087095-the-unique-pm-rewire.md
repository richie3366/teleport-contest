# Review 2364 — db0087095 — the_unique_pm clone → live export (D-3412)

- SHA: `db0087095` — "Must-fix review 2359: eat.js the_unique_pm divergent clone → live objnam export (D-3412)."
- D-entry: D-3412. Diff: js/eat.js (+2/−24: import + deletion); ledger
  objnam; new scripts/the-unique-pm-rewire.test.mjs; review stamps.
- Scope: 1 function — whole Method. Closes review 2359 C-wrong 1.

## Intent vs deliverable

Promise: delete the eat.js:2741 `the_unique_pm` clone (three
`ptr === mons(PM_*)` arms dead — `mons()` allocates fresh per call),
extend the existing objnam.js import (no new edge), drop the orphaned
consts + G_UNIQ import, re-point the taste-line comment; census test
8/8.
Delivers: exactly that, nothing else. Promise == deliverable.

## Inventory

```text
the_unique_pm | ported | js/objnam.js:the_unique_pm | C objnam.c:1120-1140 (csym)
```

Helper classification: deleted local = CLONE (divergent, correctly
removed); replacement = LIVE import (canonical export, verified below).
No new helpers, no stubs.

## C ↔ JS fidelity

- Canonical export whole vs C objnam.c:1120-1140: type_is_pname → FALSE
  (local ≡ mondata.h:135 `mflags2 & M2_PNAME`); G_UNIQ gate; High
  Priest + long worm tail → FALSE and Wizard → TRUE via `(ptr.mndx|0)`
  compares — the correct idiom for C's `ptr == &mons[PM_*]` pointer
  compares, since JS `mons()` returns fresh objects. Branch order
  preserved (pname first, uniq default, two falses, Wizard-true last,
  so Wizard wins). No RNG in C body; none in JS.
- Both eat.js call sites now ride the import (same identifier):
  eatcorpse taste line :2694 (`the_unique_pm(ptr) ? 'The ' : 'This '`,
  C eat.c:2000-2004) and tin which=2 :3813 (C eat.c:1573 arm).
  Observable fix confirmed by construction: High Priest corpse now
  prints "This …" (export returns false; clone returned true).
- Deletion safety: zero remaining `G_UNIQ` / `PM_HIGH_CLERIC` /
  `PM_LONG_WORM_TAIL` / `PM_WIZARD_OF_YENDOR` references in eat.js —
  the import + const removals dangle nothing. `mons` import retained
  (still used elsewhere in eat.js).
- Ledger row: `ported`, js ref `js/objnam.js:the_unique_pm`, D-3412 —
  the pointer now names the canonical home, not the deleted clone.

## Hallucinations / overclaim

None. "ALREADY-imported, no new edge" verified; "2 census subtests
failed before the fix" is consistent with the test's assertions
(clone def + missing import both detected pre-fix shapes).

## Density

Single-function Must-fix, ships alone. Per-function Ledger entry +
Verify line present. the_unique_pm ACCEPT. SHA verdict ACCEPT.

## Verification

- `sym.mjs the_unique_pm` (required paste — diff deletes a clone):
  `the_unique_pm  js/objnam.js:2794  sync` — single home, zero clones.
- `imports.mjs --can eat.js objnam.js the_unique_pm`: "ALREADY: eat.js
  already statically imports objnam.js. No new edge needed." — the
  no-cycle claim holds; no TDZ read added (function import, called at
  runtime only).
- Re-measured (`--base db0087095~1 --reach-all`): 0 blocked (vacuous,
  as D-logged — row cited none) + smoke 24/24 PASS → REACH-OK,
  0 regressed. Claim holds.
- `node --test scripts/the-unique-pm-rewire.test.mjs`: 8/8 pass
  (6 behavior incl. High Priest/worm-tail false + Wizard/Oracle true,
  2 census incl. whole-js/ single-def scan). Census test guards the
  fix against re-cloning.
- `imports.mjs --rulecheck`: Rule #2 clean (whole tree, this iter).
  Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
