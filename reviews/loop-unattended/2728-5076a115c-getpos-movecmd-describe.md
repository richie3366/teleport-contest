# Review 2728 — 5076a115c — getpos movecmd describeAt fallback (D-3868)

## Metadata

- SHA: `5076a115c` (cliffs-head writer port)
- D-entry: D-3868; Ledger: getpos/pager rows touched
- js diff: `js/getpos.js` (signature 4→3 params, fallback deleted),
  `js/pager.js` (sole 4-arg call site + dead `brief_at` deleted)
- Type: cliff writer port, ≤10 functions → full Method on each.

## Intent vs deliverable (promise vs diff)

Subject promises: the movecmd arm's JS-only `describeAt` fallback
described with autodescribe off; deleting it (signature back to C's 3
params) moves Rogue-578133 1427→PASS.

The diff actually adds: exactly that — the `describeAt` param and its
`!autodescribe` fallback block are gone from `getpos`, replaced by a
`:914–920` cite; `brief_at` + its call arg deleted from pager.js.
Deletions only, no new imports/edges. Promise == deliverable.

## Inventory

- `getpos` (`js/getpos.js:1352`, async) — 4th param removed; movecmd
  arm now truncate + `continue` with no describe.
- `brief_at` (was `js/pager.js`) — deleted file-local helper.
  Required `sym.mjs` paste:
  `brief_at NOT FOUND in js/** (no export, no local function/const).`
  `getpos js/getpos.js:1352 ASYNC — await required`
- No symbol re-pointed (no local clone → import); deletion verified
  dead: repo-wide grep shows every remaining `getpos(` call passes ≤3
  args (`litter_getpos` is a different function).

## C ↔ JS fidelity

C locus (`node scripts/csym.mjs getpos`):
`nethack-c/upstream/src/getpos.c:769–1167`, signature
`getpos(coord *ccp, boolean force, const char *goal)` — 3 params, no
describe callback. Movecmd arm (`:914–920`, read from pinned C):
`movecmd(c, MV_WALK)` → dx/dy → `truncate_to_map(&cx, &cy, dx, dy)` →
`goto nxtc` — no arm describes. Loop top (`:865–866`):
`else if (iflags.autodescribe && !msg_given) auto_describe(cx, cy)` —
the loop's only describe path. JS now matches all three: 3 params,
silent truncate arm, loop-top-only describe.

Branch-by-branch confirm for the deleted path: the fallback fired only
when autodescribe was OFF — exactly when C's `:865–866` gate is closed.
There is no C caller on which a describe-callback 4th argument exists
(C `do_look` calls 3-arg `getpos`; JS `do_look` now does too). The
removed paint had no C counterpart on any caller, as the D-log claims.
RNG: none on this path either side (screen-only divergence, RNG
37294/37294 full at the step).

## Hallucinations / overclaim

None. The cause chain is recorded-state (C's `#`-toggle topline at step
567, goal message at 572, no re-toggle in the recipe) plus the post-pick
`:1271` prefix path correctly excluded. No FORCE/DIAG/seed markers in
the js hunks; Rule #2 clean (imports scan, review 2727). The D-3556
partial omit for getpos stands untouched — correctly not claimed whole.

## Density

Cliff-head writer port with movement (use_whip row's writer; symptom
owner correctly not re-ported — region-heuristic misattribution to the
apply.c:3140 literal, same shape as D-3592). One cliff, code + ledger +
verify in one handoff. Two `Ledger` rows (getpos, pager) for the two
touched units. Not a no-op; not a bundled second C file (pager.js edit
is the same unit's call site).

## Verification

Re-measured by this audit
(`verify use_whip,getpos,do_look --base 5076a115c~1 --reach-all`):

- `verify use_whip: 1 PASS → PROGRESS` (scen-sweep-Rogue-578133: PASS).
- `verify getpos: 0/0/1/0 → NO MOVEMENT` — the 1 unchanged is
  scen-sweep-Samurai-582701@1814, a Grow-#2 session absent at baseline
  (0 at baseline); not this SHA's probe, not a regression.
- `verify do_look`: vacuous (0 blocked — expected; D-log said so).
- Smoke spreads 24/24 REACH-OK ×3; 0 regressed anywhere.

No REGRESSED session. The "1 PASS" movement claim is confirmed on
current code.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
