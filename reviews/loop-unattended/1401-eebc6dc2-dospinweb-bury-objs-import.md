# Review 1401 — eebc6dc2 — polyself.js dospinweb bury_objs import wired (D-2442)

- Commit: `eebc6dc2` — "`polyself.js` dospinweb `bury_objs` import wired (ReferenceError deleted) (D-2442)."
- Files: `js/polyself.js` only (1-line import change); docs + map + queue pop.
- D-log: D-2442. Closes review 1395 item 2 (Must-fix, stamped **Addressed:** D-2442 `eebc6dc2` in this commit).
- Prior review: `1395-c9f61087-dogaze-dospinweb-rehumanize.md` (QUALITY-RISK).

## Intent vs deliverable

Subject promises the one-line fix review 1395 prescribed: import
`bury_objs` so the live `dospinweb` PIT/SPIKED_PIT arm stops
throwing. Diff delivers exactly that — `buried_ball_to_freedom`
becomes `buried_ball_to_freedom, bury_objs` from `./dig.js`.
Promise kept, nothing else touched.

## Inventory

Changed JS: import statement only (`js/polyself.js:89`). No new
function, no deleted or re-pointed symbol. Required `sym.mjs` run:

- `node scripts/sym.mjs bury_objs` → `js/dig.js:450 ASYNC — await required`

The callee is LIVE (pre-existing export, not a clone or stub), so
this is a local-missing → import wiring with no new module edge.

## C ↔ JS fidelity

C locus via csym: `bury_objs dig.c:2049–2081` (33 lines, `void
bury_objs(int x, int y)` — floor-object burial with shkp/costly
handling). The C caller is the `dospinweb` pit arm (review 1395
verified the call site sits in the C-order trap arm). JS call site
(`js/polyself.js:2584`, unchanged since c9f61087):

- `await bury_objs(x, y)` — `(x, y)` matches C's `(int x, int y)`;
  `await` satisfies the ASYNC export.
- `node scripts/imports.mjs --can polyself.js dig.js bury_objs` →
  ALREADY (pre-existing static edge); no new edge, no cycle risk,
  no TDZ read (called only at runtime inside `dospinweb`).
- Callee body fidelity belongs to the original `dig.js` port, out
  of this SHA's scope; the export exists, is async, and takes
  `(x, y)` per its signature.

Banned-pattern grep on the `js/` hunk: zero hits in code (the only
`DIAG|FORCE` match in `git show` is the commit message's own "No
DIAG/FORCE/seed logic" sentence).

## Hallucinations / overclaim

None. "`js/dig.js:450` is `export async`" matches sym exactly.
"No new edge" verified true via `--can`. The D-log does not claim
corpus movement — honest that no session executes dospinweb.

## Density

One Must-fix item, alone, one import token. Correct minimal scope.
With this SHA, both review-1395 C-wrongs are closed and the
Must-fix list returns to empty.

## Verification

D-log: `verify.mjs --fn dospinweb` → PASS (syntax · rule2 · hidden
note · smoke 24/24 · green · strict · cohort). My re-run on this SHA:

- `hidden-proxy.mjs verify dospinweb --base eebc6dc2~1 --reach-all`
  → "0 session(s) blocked on it (0 at baseline, 0 in the working
  scoreboard)" + "smoke dospinweb: no RNG-tagged reach; fixed smoke
  spread (24 run): 24 PASS, 0 regressed → REACH-OK". Vacuous on
  corpus blocks, exactly as the D-log states — no false PASS claim.
- No REGRESSED session; global `imports.mjs --rulecheck` clean.

The fix itself is not corpus-observable (no session reaches the
arm), so verification is structural: the guaranteed ReferenceError
is gone by construction, and every gate that can run passes.

## Actionable C-wrongs

None. Review 1395 item 2 is closed by this SHA; per the D-log,
"review 1395 both C-wrongs now closed".

Verdict: **ACCEPT**
