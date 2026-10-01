# Review 2170 — b9de54524 — s_suffix suffixed clones (8 more missed)

SHA `b9de54524`, D-3210; 2026-10-01; 5 js files (+20/−15) + new
`scripts/s_suffix_clones.test.mjs` (6 tests). Must-fix closing the
review-2160 item (5 named homes). Closes review 2160's queued item
literally — but re-asserts completion falsely (below).

## Metadata

- Subject: "`hacklib.c` s_suffix suffixed-clone completion (review
  2160: drop `|| endsWith('S')` ×4 + zap 4-arm rewrite) (D-3210)".
- Promises: the 4 one-line disjunct drops + zap 4-arm restart; "all
  11 homes now C-exact"; Named: none.

**Addressed:** D-3217 `cdbc41097`

## Intent vs deliverable

Half kept. The 5 queued homes are fixed exactly as review 2160
prescribed (verified C-exact below). But "all 11 homes now C-exact"
is false: a definition census (`grep -rn "function s_suffix" js/`)
finds **20** homes, of which **8 further suffixed clones** at genuine
C call sites keep the identical C-wrong family — four with the same
`|| endsWith('S')` disjunct, four with full pre-fix shapes (missing
it/you arms, z/x/ch/sh arm, falsy passthrough). Second iteration in
a row the sweep was name-exact and the "completion" label buries the
remainder.

## Inventory — s_suffix (5 touched homes)

In-place body edits, zero new edges, every caller keeps its callee:
`s_suffix_eat` (eat.js:3392), `s_suffix_mm` (mhitm.js:5819),
`s_suffix_throw_gold` (dothrow.js:872), `s_suffix_pot`
(potion.js:3010), `s_suffix_zap` (zap.js:2688). Deleted/re-pointed:
none — no symbol output beyond the home census:

```text
s_suffix         js/do_name.js:411   sync
             !! ALSO 5 LOCAL CLONE(S) in 5 files — IMPORT the export; do NOT add another
               js/explode.js:146  js/minion.js:84  js/mthrowu.js:188  js/questpgr.js:673  js/shk.js:242
```

Note the mechanism of both misses: `sym.mjs` reports only the 5
name-exact plain clones, never the `s_suffix_*` suffixed ones. Any
sweep driven by it (or by grepping the queued names) cannot see the
rest. The falsifier for the next fix is the definition census above,
not `sym.mjs`.

## C ↔ JS fidelity — s_suffix

C `hacklib.c:344–359` (review-2160 range, re-used): Strcpy;
case-insensitive it→+s / you→+r; lowercase-'s'-only →+`; else →+'s.
All 5 touched bodies now match the canonical export arm-for-arm
(read each in post-image): toLowerCase strcmpi ✓, case preserved in
output ✓, lowercase-only `endsWith('s')` ✓, `String(s ?? '')`
(empty/null/undefined → `'s`, ≡ C's buf[-1] read) ✓, zap's you arm
present and z/x/ch/sh + falsy passthrough gone ✓. No RNG in C; none
added. Verdict on the diff: ACCEPT.

The 8 still-divergent homes (current tree, each read with body +
callers + C call site):

`|| endsWith('S')` (same one-line C-wrong):

- `s_suffix_objnam` js/objnam.js:2802 — doc'd "C ref: hacklib.c
  s_suffix"; called js/objnam.js:1290 (`mnam = …`) ← C objnam.c:1855
  `mnam = s_suffix(mnam)` ✓ genuine.
- `s_suffix_apply` js/apply.js:3223 — called :3525 (yank) ← C
  apply.c:3236 and :4986 (flame) ← C apply.c:1685 ✓ genuine.
- `s_suffix_fig` js/apply.js:4347 — called :4468 ("pack") ← C
  apply.c:2478 ✓ genuine.
- `s_suffix_hatch` js/timeout.js:2271 — called :2441 ("pack") ← C
  timeout.c:1145 ✓ genuine.

Full pre-fix shapes (each doc'd s_suffix, each at a genuine site):

- `s_suffix_towel` js/weapon.js:1823 — falsy passthrough, NO it/you
  arms, lowercased-last-char z/x/sh/ch arm; called :1871/:1893 ← C
  weapon.c:1056/1081.
- `s_suffix_leash` js/apply.js:1445 — no it/you arms ("you"→"you's"
  vs C "your"), z/x/ch/sh arm; called :1647/:1721 ← C apply.c:972/848.
- `s_suffix_poison` js/mhitu.js:1086 — falsy→`'the'`,
  case-sensitive it/you only, z/x/sh/ch arm; called :2238
  ("hissing!") ← C uhitm.c:4226.
- `s_suffix_inv` js/invent.js:4355 — falsy passthrough,
  case-sensitive It/You only, z/x/ch/sh arm; called :4386 ← C
  invent.c:5356.

Each is a CLONE by taxonomy and diverges from C, so each is a
C-wrong, not a named omit. Census cross-checks: `s_suffix_ucatch`
(mthrowu.js:49) is an import alias of the canonical export (exact
✓); dothrow.js:811 uses the canonical import ✓; `s_suffix_hitmsg`
(mhitu.js:397) is pre-existing C-exact; no arrow-function clones
hide in the remaining mentioning files (dig/pray/trap/dog/detect/
priest/read/steal/player_selection all import the export). Final
tally: 20 definitions, 12 C-exact, 8 divergent.

The new test pins only the 5 queued homes (CLONES list, 6/6 pass —
ran). Observable gaps persist e.g. all-caps names through objnam
(C `XERXES's`, JS `XERXES'`), "you" through leash (C "your", JS
"you's"), falsy through poison (C "'s", JS "the").

Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate gates.
Rule #2 clean (iteration-wide rulecheck).

## Hallucinations / overclaim

"All 11 homes now C-exact" + "Named: none in the body" jointly claim
s_suffix done while 8 documented clones keep the fixed bug (4 keep
it verbatim, 4 keep worse). The census was 11 because the sweep
enumerated 6 + the 5 queued names instead of the 20 definitions.
Same overclaim shape as D-3200, second iteration running.

## Density

Must-fix ships alone per §2b; the 5 queued homes are whole and
correct. But the commit's own completion claim makes the left
remainder its quality debt.

- Ledger: s_suffix split — QUALITY-RISK (8 unlisted divergent homes).

## Verification

Re-measured (one call, current tree incl. this SHA):

```text
verify s_suffix: baseline b9de54524~1 (scoreboard at c70774a6c) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke s_suffix: no RNG-tagged reach; fixed smoke spread (24 run, 13.2s): 24 PASS, 0 regressed → REACH-OK
```

Matches the D-log (vacuous note + REACH-OK, green/strict/cohort).
No REGRESSED session. Verification cannot see the missed homes
(message-text, no RNG tag) — hence Must-fix with a census falsifier.

## Actionable C-wrongs

1. s_suffix second-wave family (8 homes): drop `|| endsWith('S')`
   in s_suffix_objnam/apply/fig/hatch; restart s_suffix_towel/
   leash/poison/inv to the canonical 4-arm body. Extend the test's
   CLONES list to all 20 definitions (or derive it from the census
   grep) so the next sweep cannot miss. One port iter. Queueable
   below.

Verdict: **QUALITY-RISK**
