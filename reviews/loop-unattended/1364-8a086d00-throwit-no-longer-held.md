# Review 1364 — 8a086d00 — throwit obj_no_longer_held miswire fix (D-2398)

- SHA: `8a086d00`, D-2398 (review-1359 Must-fix). JS file:
  `js/dothrow.js` only (−6/+6). No test file (`/tmp` probe, stated,
  deleted after run).
- Prior reviews closed: 1359 (its single C-wrong is the work packet).

## Intent vs deliverable

Subject promises moving the canonical call out of dead `throw_gold`
into `throwit` at the C `:1808` position. Diff does exactly that and
nothing else: one block deleted, the identical block inserted at the
landing. Promise kept in full.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `throw_gold` block | deleted call | dead code removed — C `throw_gold` never calls it (zero hits outside `:1808` in pinned `dothrow.c`) |
| `throwit` landing block | moved call | LIVE, `sym.mjs obj_no_longer_held → js/do.js:651 ASYNC`, awaited |
| dynamic `import('./do.js')` | same shape as removed | no new static edge, no TDZ risk |

No symbol deleted or clone-repointed, so no further `sym.mjs` owed.

## C ↔ JS fidelity

C locus: `throwit` landing (`dothrow.c:1804–1818`, read in pinned
source); sole `obj_no_longer_held` hit in the file is `:1808`.

- Neighbors exact: `flooreffects(…, "fall")` + early return
  (`:1804–1807` ≡ js/dothrow.js:2307–2312, verified in working tree),
  then `await obj_no_longer_held(obj)` (`:1808` ≡ :2319–2320,
  single-arg call matches C), then pick-snatch (`is_pick`, named
  omit) and `snuff_candle` (`:1818` ≡ the comment + arm at :2321+). ✓
- Deletion correct: `grep obj_no_longer_held` over pinned
  `dothrow.c` returns only `:1808` — gold is never CRYSKNIFE, the old
  block was unreachable in C terms. ✓
- Arg shape: C passes `obj` only; JS passes `obj` only. The canonical
  body's own `mon_moving` billing gate (review 1359) is untouched. ✓
- No RNG in this landing strip. ✓

## Hallucinations / overclaim

None. D-log states the vacuous verify explicitly and keeps the
pick-snatch + sync-core callers named. The `/tmp` probe claim
(normal-crysknife revert incl. the `mon_moving` billing interaction)
is behaviorally checkable and consistent with the reviewed body.

## Density

One Must-fix move, one file, ±6 lines. Right-sized (C locus this
small is the §2b exception).

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward` → 0.
- Re-measured: `hidden-proxy verify throwit --base 8a086d00~1` →
  `0 session(s) blocked (0 at baseline, 0 working)`. Matches D-log.
- `imports.mjs --rulecheck` → Rule #2 clean (re-run this iter under
  1363).
- D-log's green 2/2 + strict ×2 + cohort 7/7 accepted.

## Actionable C-wrongs

None. The 1359 Must-fix is fully delivered.

Verdict: **ACCEPT**
