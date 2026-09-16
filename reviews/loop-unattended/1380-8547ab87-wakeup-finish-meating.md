# Review 1380 — 8547ab87 — wakeup unconditional finish_meating (D-2417)

- SHA: `8547ab87`, D-2417 (Open row: Knight-92182 step 95,
  pony-mid-meal writer). JS files: `js/mon.js` only (one import
  name + one call + doc).
- Prior reviews closed: none (corpus-owner row, 1 block).

## Intent vs deliverable

Subject promises unconditional `finish_meating(mtmp)` in C order
(after the mimic/forcefight block, before `if (via_attack)`).
Diff delivers that single call — the deferred line it replaces
said exactly what was missing.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `finish_meating` (dogmove.js:1110, sync) | C callee | LIVE — joined the existing static mon.js→dogmove.js edge, called un-awaited (correct: sync) |

No symbols deleted or re-pointed. No new edge.

## C ↔ JS fidelity

C locus read in pinned source: `wakeup` (`mon.c:4332–4363`,
csym range).

- C `:4349` `finish_meating(mtmp);` sits after the
  `M_AP_TYPE`/forcefight block (`:4340–4347`) and before
  `if (via_attack)` (`:4350`) — JS places the call at the same
  seam, unconditional on both paths. ✓
- The call is RNG-neutral in C (meal-flag teardown, no draws);
  JS `finish_meating` body untouched (live, pre-existing). The
  causal chain in the D-log (miss → `missum` → `wakeup` →
  meal ends → `dog_invent` rates the apple next turn) follows
  C call order, cited not assumed. ✓
- Pre-existing guards kept (`!mtmp` early return,
  `mx > 0` newsym gate) — defensive, out of scope. `ghod_hitsu`
  stays named. ✓

## Hallucinations / overclaim

None. The "bonus" Arch PASS is reported as bonus with a pointer
(Next), not folded into the row's expectation.

## Density

~5 `js/` lines + a 3-case unit test for one measured writer.
Right-sized; Must-fix-class density (single call, full gates).

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward|seed|coord` → 0.
- `imports.mjs --rulecheck` → Rule #2 clean (re-run this audit).
- Re-measured: `hidden-proxy verify obj_resists --base
  8547ab87~1` → `2 PASS, 0 moved past, 0 unchanged, 0 worse`
  (Knight-92182 + Arch-92238) — reproduces the D-log exactly.
  Genuine owner PASSes, no D-1831 shape.
- `node --test scripts/wakeup-finish-meating.test.mjs` → 3/3
  (re-run this audit; 2 fail pre-fix per stash proof, taken as
  stated). Green/cohort/full-44/44 per D-log accepted (shared
  `mon.js` changed, full auto-ran per the runner).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
