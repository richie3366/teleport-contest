# Review 2869 — 47e4f1e35 — passiveum AT_BOOM calls rehumanize

## Metadata

- SHA: `47e4f1e35938c114474afde43c74dbcf2a4783e2` (D-4027)
- Cliff: `polyself.c` rehumanize row, scen-sweep-Barbarian-
  620085 s212 (parent-block row 6, first live row)
- js/ diff: `js/mhitu.js` +4/-1 (deferral → await +
  comment); `scripts/passiveum-atboom-rehumanize.test.mjs`
- Method: full per-function (cliff commit, 1 arm)

## Intent vs deliverable

Promise: the AD_PHYS/AT_BOOM arm printed `You explode!`
then `// rehumanize deferred`; C calls `rehumanize()`
inline (KMH balance patch). Wire `await rehumanize()` in
C order (pline → rehumanize → assess_dmg return), no new
edge. 620085 FULL PASS.

Diff actually: exactly that swap + a C-citing comment.
Promise == diff.

## Inventory

- `passiveum` (`js/mhitu.js:3020`, async; C
  `mhitu.c:2434-2613` per `csym.mjs`): AT_BOOM arm now
  `await pline → await rehumanize() → return
  assess_dmg(mtmp, tmp)`.

## C ↔ JS fidelity

- C arm read at `mhitu.c:2526-2530`: `You("explode!");
  /* KMH, balance patch -- this is okay with unchanging */
  rehumanize(); return assess_dmg(mtmp, tmp);` — JS is
  the verbatim sequence with awaits.
- Guarding context already live and C-ordered (read
  `js/mhitu.js:3104-3112`): `if (!Upolyd(u)) return`
  then `if (rn2(3)) switch (oldu_mattk.adtyp|0)` —
  matches C `:2519-2524`. No new RNG draw; call-for-call
  preserved.
- `rehumanize`: canonical async export
  (`js/polyself.js:1229` per `sym.mjs`), imported at
  `mhitu.js:110` with 5 pre-existing await sites — this
  is the 6th, on the existing edge (no re-point, so the
  required `sym.mjs` paste is N/A).
- `assess_dmg` return path: C `mhitu.c:2354-2365`
  (staticfn, 12 lines) vs the pre-existing local clone
  `js/mhitu.js:2996-3007` — mhp decrement, dies pline,
  xkilled, DEADMONSTER check, both return codes match.
  Un-awaited `return assess_dmg(...)` adopts correctly
  in the async caller (house style in every arm here).
- Grep of the `js/` hunk: no FORCE/DIAG/RNG/seed/coords.
  Rule #2 clean (`imports.mjs --rulecheck`, HEAD — `js/`
  untouched since the 2868 run).

## Hallucinations / overclaim

None. The D-log does not claim the function whole
(`Ledger: passiveum partial` + 3 named defers with C
lines). The no-regression note (old JS reached this arm
only by diverging) is sound: C prints the return-to-form
message unconditionally via polyman.

## Density

Legitimate head work: parent block rows 1–3+5 are dupe-rc
kin (re-verified in-commit), row 4 is the 95340 marker
(forensics already in this D-log's Next, shipped as
D-4028), row 7 the 95344 stale-PASS — row 6 is the first
live row. `Ledger:` passiveum updated (D-4027 + omit).

## Verification

Re-measured `--base 47e4f1e35~1 --no-reach` in one call:
`verify rehumanize: 1 PASS, 0 moved past, 0 unchanged, 0
worse → PROGRESS` (620085 PASS) — exact match to the
D-log's `1 PASS, 0 moved, 0 no-movement`. `verify
passiveum` vacuous (0 blocked at baseline), as expected:
the board owner is rehumanize. Focused test 1/1 on HEAD.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
