# Review 1382 — 470f6f36 — ledger_to_dnum bottom-level spill (D-2419)

- SHA: `470f6f36`, D-2419 (Open row: Healer-92042 step 73,
  orc-captain arrival writer). JS files: `js/teleport.js` only
  (one predicate + comment).
- Prior reviews closed: none (corpus-owner row, 1 block).

## Intent vs deliverable

Subject promises the C range predicate so a bottom-ledger level
resolves to its own dungeon instead of spilling to the next.
Diff delivers the one-line predicate with a C-order comment —
plus a 3-case unit test.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `ledger_to_dnum` predicate | rewired condition | LIVE — C `dungeon.c:1408–1411` verbatim |

No imports, no new symbols, nothing deleted or re-pointed.

## C ↔ JS fidelity

C locus read in pinned source: `ledger_to_dnum`
(`dungeon.c:1401–1416`, csym range).

- C: `ledger_start < ledgerno && ledgerno <=
  ledger_start + num_dunlevs` ≡ JS `start < want && want <=
  start + n`. Exact transpose, `|0` coercions only. ✓
- Interval consistency: JS `ledger_no(lev) = ledger_start +
  dlevel` (`dungeon.js:696–699`, same in `teleport.js:2726`)
  ranges `start+1..start+n` for `dlevel` in `1..n` — exactly
  C's `(base+1) <= ledgerno <= (base+count)` comment (`:1406`).
  The old `start <= want < start+n` included `start` (belongs
  to no dungeon) and excluded `start+n` (the spill: mux
  resolved to the next dungeon, stranding the captain). The
  fix is the C predicate, not a tuned bound. ✓
- C's no-match `panic` stays JS `return 0` — pre-existing
  fallthrough, unchanged by this commit. ✓
- RNG-neutral (pure predicate). ✓

## Hallucinations / overclaim

None. The D-log verifies under `migrate_orc` (vacuous, honestly
labeled) and proves the session with a live single-session
replay instead — the right call when the recorded owner is a
downstream symptom (`rloc`).

## Density

6 `js/` lines + a 3-case unit test for one measured arrival
writer. Right-sized.

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward|seed|coord` → 0.
- `imports.mjs --rulecheck` → Rule #2 clean (re-run this audit).
- Corpus claim cross-confirmed: `hidden-proxy verify rloc --base
  2f0f9f76~1` (re-run this audit for 1381) shows
  `scen-tour-Healer-92042: PASS` on the working tree — the
  session this SHA's predicate unblocked. D-log's single-session
  `PASS RNG 18888/18888 Screen 95/95` accepted as stated; no
  D-1831 shape (a full-screens PASS, not a prefix).
- `node --test scripts/ledger-to-dnum.test.mjs` → 3/3 (re-run
  this audit; bottom-boundary case failed pre-fix per D-log).
  Green/cohort/full-44/44 per D-log accepted (shared
  `teleport.js` changed).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
