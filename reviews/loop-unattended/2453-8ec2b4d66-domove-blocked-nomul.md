# Review 2453 — 8ec2b4d66 — domove blocked arms gain C's `nomul(0)` (D-3571)

**Metadata.** SHA `8ec2b4d66` (2026-10-06, D-3571). Type: **Must-fix**
(review 2450 hang) + cliff writer. `js/` insertions: 20 (`js/cmd.js`
+20/−9) + 1 test file (50 lines). Closes review 2450's C-wrong 1
(scen-ride-Knight-94415 hang).

## Intent vs deliverable

Promise: C-order `move = 0; nomul(0);` (hack.c:2843–2846) in all six
`!test_move(DO_MOVE)` blocked arms of JS `domove`; the hang arm is the
rock/bars bump; pre-existing `if (run) end_running(true)` lines removed
as subsumed by nomul; no message/RNG change; probe hang→scored;
`for(;;)` kept.

Diff actually adds: exactly that — six arms gain `nomul(0)` after the
existing `move = 0`, six `end_running` lines out, C-cite comments in.
Promise matches diff.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | domove_core (blocked arms only; merged into JS `domove`) | partial (pre-existing omit stands) | [cmd.js](/home/debian/dev/teleport-contest/js/cmd.js:6447) | hack.c:2843–2849 gate; test_move FALSE sites :1015ff,:1147,:1156–68,:1172–76,:1208–14,:1229 |

Helpers: none added. `nomul` is a live import (single export,
`sym.mjs`: `nomul js/hack.js:1674 sync`, no clones).

## C ↔ JS fidelity

**The gate is real and covers all six arms.** C hack.c:2843–2849 read:
`if (!test_move(...)) { if (!door_opened) { move = 0; nomul(0); } return; }`
✓. Every JS arm maps to a `return FALSE` inside C `test_move`
(:989–1255, read): rock/bars `:1015ff`, diagonal-into-doorway `:1147`,
squeeze `:1156–1168`, worm `:1172–1176` (`--callers worm_cross`
confirms hack.c:1172), diagonal-out `:1208–1214`, moverock `:1229`.
"testdiag" is a JS-local name — no such C symbol — for the two doorway
FALSE sites; correctly attributed. The moverock arm keeps the
`!door_opened` keep-move case (D-1262) ✓.

**`nomul` is C-identical.** C nomul (hack.c:4160–4173 via `csym`):
`multi<nval` early return, botl, uinvulnerable=FALSE, usleep=0,
multi=nval, reason clear, `end_running(TRUE)`, `cmdq_clear(CQ_CANNED)`
— no message, no RNG ✓. JS nomul (js/hack.js:1674–1690, read) mirrors
every line including the canned-cmdq clear ✓. The deleted
`if (run) end_running(true)` lines are strictly subsumed: C nomul ends
the run unconditionally, and the hang's `multi=80` is cleared by the
same call — this is the teardown gap review 2450 hypothesized.

**Root-cause fit:** the zombie state (`mv` set, `multi=80=COLNO`, run
cleared, stale dx/dy into STONE) rebumped the wall through an arm that
never tore down multi; C's gate does. The replay arm itself is
untouched, correctly — with C-faithful teardown the zombie cannot
persist through any blocked move, and no session demonstrates a
remaining spin (full rescore: exactly one row changed).

## Hallucinations / overclaim

None. "nomul owns the end_running(true) teardown, multi/mv included"
verified against both C and JS bodies. The +60 RNG / +16 screens over
the pre-D-3567 prefix at the same step/owner is consistent (cap no
longer truncates the recorded run; later incidental matches count).

## Density

Must-fix, ships alone, one C gate, own `Ledger:` touch (domove row
gains D-3571; `domove_core` partial/audited omit untouched — correct,
the swim gate :2851–2856 and wrapper omits are outside this unit).
Per-function verdict ACCEPT → SHA ACCEPT.

## Verification

- Added-code grep: clean (no FORCE/DIAG/seed/coords; `getRngLog` only
  in the `scripts/` test, which pins the Must-fix acceptance
  prefix ≥ 6682 / screens ≥ 131).
- Rule #2: `imports.mjs --rulecheck` → clean across scored `js/`.
- Re-measure (mine): `verify domove --base 8ec2b4d66~1 --reach-all` →
  0 blocked at baseline (expected — the probe was a hang, not a domove
  block; the commit says so) + smoke 24/24 REACH-OK.
- Probe (mine, `show scen-ride-Knight-94415`): `error: null`,
  dosounds@129, RNG **6742**/7493, screens **147**/259 — exactly the
  D-log's numbers, acceptance met.
- Full public `sessions` 44/44 and full corpus rescore claimed in-ship;
  this audit's end-iteration rescore re-covers both.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
