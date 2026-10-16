# Review 2849 — 2540a6635 — dog_move leash kludge assigns via dirtocoord

## Metadata

- SHA: `2540a6635a4e93cac2b259945b1e9cdfe7f2c8c0` (D-4005)
- Cliff writer: `obj_resists` head, 1 block (full PASS)
- js/ diff: `js/dogmove.js` import line + both kludge loops
  (accumulate → `dirtocoord` calls) + rewritten comment; new
  `scripts/dogmove-kludge-stay.test.mjs`
- Method: full per-function (≤10-function cliff commit)

## Intent vs deliverable

Promise: Hachi (leashed dog) dropped a dagger at (64,5) in
turn 432's tail; C turn 433 checks the dagger (obj_resists
draw) and stays, but JS had kludged to (63,4) at the end of
432 and walked on — because the leash-kludge spiral
accumulated `xdir/ydir` onto `cc` while C's `dirtocoord`
ASSIGNS `cc = (xdir[j], ydir[j])`, testing unreachable
near-origin squares so every candidate fails and the stay
fallback runs. Call the live `dirtocoord` in both loops.

Diff actually: exactly that + the import swap + comment.
Promise == diff.

## Inventory

- `dog_move` leash kludge (`js/dogmove.js:1641-1679`, C
  `dogmove.c:1318-1352` read, loops `:1335-1345`): both
  loops re-pointed to the live import.

## C ↔ JS fidelity

- C `dirtocoord` (`cmd.c:3858-3865` via `csym.mjs`): `cc->x =
  xdir[dd]; cc->y = ydir[dd];` under `dd > DIR_ERR && dd <
  N_DIRS_Z` ✓ — ASSIGN confirmed, and `DIR_ERR = -1`
  (`hack.h:640`) makes the JS guard (`const.js:257-262`
  read: `dd > -1 && dd < N_DIRS_Z`) identical.
- `sym.mjs dirtocoord` output: `dirtocoord  js/const.js:257
  sync` — LIVE import, C-shaped body; the re-point deletes a
  wrong local accumulation, not a clone. It joins the
  existing const.js import block (`xytodir` was already
  imported there) — no new edge, as promised. `xdir`/`ydir`
  names removed from the import have no remaining uses in
  the file (one comment mention only).
- Kludge unit now C-exact ✓ (`dogmove.c:1318-1352` read vs
  `dogmove.js:1641-1679` read): `cc = hero + sgn(omx-ux,
  omy-uy)`; goodpos skips the loops (= `goto dognext`);
  `i = xytodir(nx, ny)`; both `DIR_LEFT/RIGHT`,
  `DIR_LEFT2/RIGHT2` loops call `dirtocoord` with the
  `placed` flag emulating goto-on-first-goodpos; fallback
  `cc = mtmp pos`; `m_in_out_region → MMOVE_MOVED`;
  remove/place/newsym/set_apparxy in C order. No RNG in the
  unit either side — the step-433 fork it heals was purely
  positional (TEMP-C spiral trace cited in the comment).
- Causation measured: dagger identity-marked same-ref at
  (64,5), pre-fix JS at (63,4)→(62,4) vs C staying — the
  `d` vs backtick map fork and the missing obj_resists/
  dog_invent draws follow necessarily.

Diff grep clean; Rule #2 iteration-wide clean (review 2844).

## Hallucinations / overclaim

None. "Kludge arms now C-exact" verified arm-by-arm above.
The `--reach-all 438/438` writer-attach claim is a D-log
number I did not re-run (audit runs no `--reach-all` per
§10.21); the re-measure below plus the full-rescore
regression check at iteration end cover it.

## Density

Cliff writer on its HEAD's head: 1 block → full PASS
(1520/1520). Ledger: `dog_move ported` +D-4005, single-function entry
(verified in `dogmove.c.jsonl`). Committed test re-run green
(1/1).

## Verification

D-log: `verify obj_resists: 1 PASS, 0 moved past, 0 unchanged,
0 worse → PROGRESS`. Re-measure (`--base 2540a6635~1
--no-reach`, HEAD code): **1 PASS, 0 moved past, 0 unchanged,
0 worse** — Samurai-50156002 PASS, exact match.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
