# Review 994 — b488e0f5 — polymon golemhp + home-elemental ×3 (D-2024)

Metadata: SHA `b488e0f5`, D-2024, Open-row port
(do_statusline2-symptom writer, 2/8 sessions). js/
touches `js/makemon.js` (+1/−1: `export` on `golemhp`)
and `js/polyself.js` (+3/−2: import + two arm bodies).
No stamp owed.

## Intent vs deliverable

Subject promises: golem arm uses the fixed table instead
of `d(mlvl,8)`; else-arm triples home-elemental HP. Maxima
differ (iron golem C 120 vs JS 85; stone golem C 100 vs
JS 57), so the writer — not the D-1990 painter — is
wrong. Diff actually adds: exactly those two bodies,
importing instead of cloning. Promise == diff.

## Inventory

- Changed JS function: `polymon` mhmax block only. No
  new helpers, no deleted symbols — no `sym.mjs` delete
  audit required.
- Classification: both callees LIVE, not clones —
  `export` on the existing `golemhp` kills a would-be
  clone #2, and `is_home_elemental` is imported from its
  home module. `imports.mjs --can` on both names: ALREADY
  statically imported (stronger than the D-log's CHECK
  wording — names on an existing edge, no TDZ possible).
- Named: dragon-arm `In_endgame` gate (already live);
  polymon Stoned/Sick/Slimed/strangle/glib/hideunder/
  utrap/Blind-restore/egg/swallow/skinback/
  livelog-first-poly/retouch arms (pre-existing envelope);
  `golemhp` default 0 for non-golems (C-identical,
  unreachable behind the `is_golem` gate).

## C ↔ JS fidelity

Against `polyself.c:859–872`, plus the two ordering /
table loci I pulled myself. First, `set_uasmon()` runs
at `:815`, BEFORE the mhmax block — so C's
`is_golem(youmonst.data)` is already the NEW form ≡ JS
`is_golem(mdat)`; the D-log's "same object set_uasmon
installs" claim checks out ✓. `u.mhmax = golemhp(mntmp)`
verbatim (`:863`) ✓, and the C table at
`makemon.c:2233` (iron→120, stone→100, …) exactly
explains both corpus sessions — the table is fixed, zero
RNG on this arm ✓. Else-arm `rnd(4)` / `d(mlvl,8)`
untouched with `is_home_elemental(mdat) → ×3` appended in
C position (`:869–870`) ✓. The imported helper body
re-checked line-for-line against `makemon.c:33–50`:
S_ELEMENTAL gate, four plane checks (air/fire/earth/
water), default false; C `monsndx(ptr)` ≡ JS `ptr.mndx`
for a table entry ✓. `u.mh = u.mhmax` follows in both ✓.

## Hallucinations / overclaim

None — and the REGRESSION-labeled row is the opposite of
an overclaim: the D-log carries a stash-rerun proof
(rerun WITHOUT the fix reproduces rngM 2745 / scrM 83 /
step 82 / identical rowDiff exactly) plus a code-path
argument (recipe never polyselfs — wish-lembas-eat; the
changed lines execute only inside `polymon`).

## Density

Two arms of one C block, two files already linked.
Right-sized.

## Verification

Re-measured myself:

```
node scripts/hidden-proxy.mjs verify do_statusline2 --base b488e0f5~1
→ 0 PASS, 2 moved past, 5 unchanged, 1 worse → REGRESSION
```

Reproducing the D-log exactly (Priest-91137 →
dmgval@123, rngM 3114→3260, scrM 86→123; Tourist-92047
→ do_attack@154, rngM 2874→4659, scrM 88→158; five
unchanged byte-identical; wish-Tourist-91125 same-step
flag with rngM 2746→2745). The flag survives on HEAD code
containing three later ports, consistent with the D-log's
rebase-window-drift (d7b4d542→b18a67bd) attribution
rather than this diff — and this diff's lines are
unreachable without `polymon`. Attribution accepted. js/
hunk grep: no banned patterns. Rule #2 clean (global
re-run). Cited green + strict ×2, cohort 7/7, full 44/44.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
