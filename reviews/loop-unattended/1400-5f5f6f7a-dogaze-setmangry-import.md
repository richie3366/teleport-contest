# Review 1400 — 5f5f6f7a — polyself.js dogaze setmangry import wired (D-2441)

- Commit: `5f5f6f7a` — "`polyself.js` dogaze `setmangry` import wired (ReferenceError deleted) (D-2441)."
- Files: `js/polyself.js` only (1-line import change); docs + map + queue pop.
- D-log: D-2441. Closes review 1395 item 1 (Must-fix, stamped **Addressed:** D-2441 `5f5f6f7a` in this commit).
- Prior review: `1395-c9f61087-dogaze-dospinweb-rehumanize.md` (QUALITY-RISK).

## Intent vs deliverable

Subject promises the one-line fix review 1395 prescribed: import
`setmangry` so the live `dogaze` gaze-confirm arm stops throwing.
Diff delivers exactly that — `wakeup, egg_type_from_parent` becomes
`wakeup, egg_type_from_parent, setmangry` from `./mon.js`.
Promise kept, nothing else touched.

## Inventory

Changed JS: import statement only (`js/polyself.js:38`). No new
function, no deleted or re-pointed symbol. Required `sym.mjs` run:

- `node scripts/sym.mjs setmangry` → `js/mon.js:1121 ASYNC — await required`

The callee is LIVE (pre-existing export, not a clone or stub), so
this is a local-missing → import wiring with no new module edge.

## C ↔ JS fidelity

C locus via csym: `setmangry mon.c:4260–4318` (59 lines, `void
setmangry(struct monst *, boolean)` — annoyance/ramification
handling). The C caller is `dogaze` (review 1395 verified the call
site sits in the C-order gaze-confirm arm). JS call site
(`js/polyself.js:2439`, unchanged since c9f61087):

- `await setmangry(mtmp, true)` — `via_attack=TRUE` matches C's
  confirm-gaze call; `await` satisfies the ASYNC export.
- `node scripts/imports.mjs --can polyself.js mon.js setmangry` →
  ALREADY (pre-existing static edge); no new edge, no cycle risk,
  no TDZ read (function declaration hoisting, called only at
  runtime inside `dogaze`).
- Callee body fidelity belongs to the original `mon.js` port, out
  of this SHA's scope; the export exists, is async, and takes
  `(mtmp, via_attack)` per its signature.

Banned-pattern grep on the `js/` hunk: zero hits in code (the only
`DIAG|FORCE` match in `git show` is the commit message's own "No
DIAG/FORCE/seed logic" sentence).

## Hallucinations / overclaim

None. "`js/mon.js:1120` is `export async`" is off by one line
(sym: 1121 — comment-shift, not substance). "No new edge" verified
true via `--can`. The D-log does not claim corpus movement — honest
that no session executes dogaze.

## Density

One Must-fix item, alone, one import token. Correct minimal scope;
a Must-fix iter ships alone per the breadth-phase rule.

## Verification

D-log: `verify.mjs --fn dogaze` → PASS (syntax · rule2 · hidden
note · smoke 24/24 · green · strict · cohort). My re-run on this SHA:

- `hidden-proxy.mjs verify dogaze --base 5f5f6f7a~1 --reach-all` →
  "0 session(s) blocked on it (0 at baseline, 0 in the working
  scoreboard)" + "smoke dogaze: no RNG-tagged reach; fixed smoke
  spread (24 run): 24 PASS, 0 regressed → REACH-OK". Vacuous on
  corpus blocks, exactly as the D-log states — no false PASS claim.
- No REGRESSED session; global `imports.mjs --rulecheck` clean.

The fix itself is not corpus-observable (no session reaches the
arm), so verification is structural: the guaranteed ReferenceError
is gone by construction, and every gate that can run passes.

## Actionable C-wrongs

None. Review 1395 item 1 is closed by this SHA; item 2 (`bury_objs`)
stays open as its own Must-fix row, correctly not folded in.

Verdict: **ACCEPT**
