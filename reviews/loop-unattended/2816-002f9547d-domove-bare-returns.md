# Review 2816 — 002f9547d — domove fight arms return bare like C

- **SHA:** `002f9547d` (Thu 2026-10-15) — cliffs-head writer (D-3970).
- **D-entry:** D-3970. **Ledger:** `hack.c` (`domove` re-stamped; `domove_core` stays partial/audited D-3432).
- **Diff size:** `js/cmd.js` −7/+5 (two arms + cites); +1 focused test.
- **Method:** cliff (behavior fix inside one merged function) — whole Method + movement re-measure.

## Intent vs deliverable (promise vs diff)

The subject promises: on the scen-symset-Healer-50059079 s478
divergence (toplines identical, row 23 C «T:182» vs JS «T:187», RNG
57981/57981 matched, true moves 187 both sides) the writer is
`domove`'s fight arms — C returns bare on attackmon-done and on
ironbars/web/empty-TRUE, keeping `context.run` (stale T paint), while
JS called `end_running(true)` on both (fresh T). The fix deletes both
JS-only clears plus a redundant `move = 1`, leaving C-exact bare
returns. 3 moved (Healer 478→585, Barbarian 314→389, Ranger 156→213).

The diff does exactly that and nothing else: two `if` bodies reduced
to bare `return;` with C cites, no new helpers, no new exports, no
callee changes. Promise and diff agree.

## Inventory

- `js/cmd.js` `domove` (~:6691, async): attackmon-done arm — deleted
  `if (game.context?.run) end_running(true)`; bare `return;` with
  `C hack.c:2796-2797` cite.
- Same function: ironbars/web/empty-TRUE arm — deleted
  `end_running(true)` + `game.context.move = 1`; bare `return;` with
  `C hack.c:2802-2808` cite.
- `scripts/domove-fightempty-run.test.mjs` (new): replays Healer to
  478, asserts stale `T:182` on row 23.
- Ledger: `domove` re-stamped D-3970 (status unchanged `ported`);
  `domove_core` untouched (`partial`, audited D-3432).

No function added, deleted, renamed, or re-pointed; no clone created
or removed. `node scripts/sym.mjs domove` → `js/cmd.js:6691 ASYNC`.
The step-3 sym-run requirement is vacuous (no symbol deleted or
re-pointed). Diff grep: no `FORCE`, `DIAG`, `getRngLog`, seed names,
`fastforward`, or hardcoded coordinates.

## C ↔ JS fidelity

C `domove_core` (`nethack-c/upstream/src/hack.c:2711-2991` per
`csym.mjs fn domove_core`):

- Attack arm: `if (domove_attackmon_at(mtmp, x, y, &displaceu))
  return;` — bare, no `nomul`, no `end_running`. The only
  run-ending on this path is the earlier visible-monster gate
  (`nomul(0); svc.context.move = 0; return;`) and whatever
  `domove_attackmon_at`/uhitm do inside — none of which the JS arm
  mirrors at this site. JS now `if (atk.done) return;`. Exact.
- Fight arms: `if (domove_fight_ironbars(x, y)) return;` then web,
  then empty — three bare returns. JS now matches with one combined
  `if (… || … || …) return;`. Exact.
- `nomul` placement: C `domove_fight_empty`
  (`hack.c:2228-2338`) contains exactly one `nomul(0)` (the futile
  arm; the dig arm returns TRUE without one). JS
  `domove_fight_empty` (`js/cmd.js:3940`) likewise contains exactly
  one `nomul(0)` before its `return true`. The D-log's "mirrors
  already faithful" is confirmed, not assumed.
- `move = 1` removal: C sets nothing on these bare-return paths;
  `svc.context.move = 1` is the allmain preset before occupation/
  rhack. JS presets `g.context.move = 1` at `js/allmain.js:1520`
  with the same cite, and nothing between the preset and these arms
  clears it on this path (the `move = 0` sites are the
  visible-monster gate mirror and multi/exhaustion paths). Deleting
  the redundant set is C-faithful.

Named omission (in-map, not Must-fix): the u_rooted outer
`end_running` (~:6837) is kept as redundant-but-harmless; C
`u_rooted()` itself ends the run inside, and the JS mirror does too,
so the outer call can only re-clear an already-cleared run. True as
stated.

No RNG on these paths either side; branch order is deletion-only, so
there is no reordering risk.

## Hallucinations / overclaim

None. The D-log does not claim "Match C" for any dispatch-with-stubbed-callee:
the changed callees (`domove_fight_empty`, `nomul`, `end_running`)
are all live imports, and the one kept redundancy is explicitly named
with its locus. The "reconstructed TRUE moves = 187 both sides" claim
is the standard stale-T arithmetic (C `T:182` stale by 5, JS fresh
`T:187`) and the focused test pins the C paint. The Ranger-50059072
`js-throw` label at the new step is disclosed in the Verify bullet as
a null-owner print artifact (`jsPanic=null, kind=screen`) rather than
hidden.

## Density

Cliff phase: the owner is the `do_statusline2` region-heuristic row
(head at the parent SHA), and the port is its writer (`domove` fight
arms) — exactly the §10.18 deliverable, not a symptom re-port. The
function is not re-ported whole, but this is a two-line behavior fix
in an already-`ported`/audited merged body, with the ledger row
re-stamped rather than newly claimed; no missing arm is sold as done.
One cliff, one writer, code + ledger + verify in one handoff. No
bundled C file, no idiom sweep, no self-filed row.

## Verification

Re-measured by this audit
(`hidden-proxy.mjs verify … --base 002f9547d~1 --reach-all`):

- `verify domove`: no session blocked at parent — vacuous for the
  writer itself, as expected (owner is `do_statusline2`); smoke
  24/24 PASS → REACH-OK.
- `verify do_statusline2`: `0 PASS, 4 moved past (1 still
  do_statusline2 at a later step), 13 unchanged, 0 worse →
  PROGRESS`. All three D-log movements reproduce exactly:
  Healer-50059079 478→on_msg@585, Barbarian-50059021
  314→do_screen_description@389, Ranger-50059072 156→js-throw@213.
  A fourth session (Healer-50255002 23→380, later step) also moved;
  the unchanged count (13 vs 11) differs only because the corpus
  grew after this SHA. Zero regressions; smoke 24/24 → REACH-OK.
- Public gates per the D-log: green 2/2, strict ×2, cohort 7/7,
  full 44/44. The audit's end-of-iteration rescore re-covers the
  fortress.

No seed/step/coordinate/RNG-index reads; no trace shaping. The
focused test asserts the C paint value (`T:182`), not a JS
self-consistency property.

## Actionable C-wrongs

None. No Must-fix.

Verdict: **ACCEPT**
