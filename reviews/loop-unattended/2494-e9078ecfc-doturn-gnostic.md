# Review 2494 — e9078ecfc — doturn gnostic NaN (D-3613)

- SHA: `e9078ecfcccc364e7463b88aaacfad60f0c814ba`
- Subject: cliffs-head doturn: first-break `gnostic++` on undefined left NaN
  (Priest-92096 → PASS) (D-3613)
- Type: cliff (1 C function), js +9/−1 in `js/pray.js` + new test
- Prior reviews closed: none

## Intent vs deliverable

Promise: the in-file `| 0` idiom at the :2426 site so the first break sets
exactly 1 and the :2442 test returns ECMD_TIME; Priest-92096 → PASS. Diff
does exactly that. Matches.

## Inventory

- `doturn` (`js/pray.js:2963+`) — changed, 1 site. C:
  `nethack-c/upstream/src/pray.c:2413-2487` (`csym` range, whole body read).
- No new/deleted symbols. Precedent confirmed: identical `| 0` idiom at
  js/pray.js:2023 (dopray) and :2468 (dosacrifice).

## C ↔ JS fidelity

C :2426 `if (!u.uconduct.gnostic++)`: post-increment always runs; livelog
only when the old value was 0 (C ints zero-init). Old JS
`!(u.uconduct.gnostic++)` took the right branch on `undefined` (`!NaN`)
but stored NaN, so the :2442 `(gnostic == 1) ? ECMD_TIME : ECMD_OK` test
(JS :2982, pre-existing `(gnostic|0)===1`) wrongly returned ECMD_OK — no
monster turn, no `--More--`. New JS: `!(g|0)` → set exactly 1 + livelog;
else `(g|0)+1`, no livelog — C-identical on all paths (absent/0/N≥1). The
rest of doturn is untouched; the D-0912 named items (non-Cleric/Knight
fallback, resist TELL pline) stay named and are off this probe's path. No
RNG at this site.

Cheat grep: clean. Rule #2 clean (run this iteration).

## Hallucinations / overclaim

None. The mechanism (NaN → ECMD_OK → no monster turn → missing More) fully
explains the observed divergence (JS drew nothing at step 149 where C drew
distfleeck/mattacku/hitmu).

## Density

Cliff phase: owner doturn is the cliff head probe itself; one function, one
site, probe PASS. Per-function verdict: doturn — ACCEPT.

## Verification

Re-measured myself: `verify doturn --base e9078ecfc~1 --reach-all` →
Priest-92096 PASS, `1 PASS → PROGRESS`, smoke reach 24/24, 0 regressed.
Matches the D-log exactly.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
