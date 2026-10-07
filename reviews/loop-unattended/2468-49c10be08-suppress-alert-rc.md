# Review 2468 — 49c10be08 — suppress_alert rc pack + live doset row (D-3586)

**Metadata.** SHA `49c10be08` (2026-10-07, D-3586). Type: **cliff**:
writer port for the cliffs head `options.c handler_pickup_types`.
`js/` insertions: 28 (`js/options.js` +28/−2) + committed test.

## Intent vs deliverable

Promise: rc `suppress_alert:3.4.3` was stored as a raw string
(get_val read it as 0 → «(none)») and doset hardcoded «(none)»;
the colon arm now packs via get_feature_notice_ver in C order, a
valueless arm blocks the boolean fallback, and the doset row calls
the live get_val. Probe Tourist-94111 21→do_statusline1@23.

Diff actually adds: the colon arm, the valueless no-op arm, the
doset get_val row. Promise matches diff. No symbols deleted or
re-pointed (all three helpers imported pre-change at :189/:250).

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | parseNethackrc suppress_alert arms | ported (feature_alert_opts row) | [options.js](/home/debian/dev/teleport-contest/js/options.js:4976) | options.c:4134–4161, 7557–7585 |
| 2 | doset suppress_alert row | ported (same row) | [options.js](/home/debian/dev/teleport-contest/js/options.js:11110) | options.c:9038–9044 |

Helpers: none added. `optfn_suppress_alert` is the live async
export (options.js:11678); `doset_compopt_get_val` (:3573, read)
awaits async optfns like the 30+ sibling rows. No clone→import
re-point, so no `sym.mjs` re-point output is required.

## C ↔ JS fidelity

**do_set chain matches C arm-for-arm.** `csym
optfn_suppress_alert` → options.c:4134–4161 (negated→err,
op!=empty→feature_alert_opts) and `csym feature_alert_opts` →
:7557–7585 (fnv==0 keep prior, future→config_error_add at
opt_initial, store packed :7576) — the JS colon arm follows in C
order, including the opt_initial branch (config_error_add, no
You_cant/pline) ✓. optlist.h:740–741 (read): negateok-No,
dupeok-Yes ✓, so the `:626` skip-first shape holds; the silent
skip (vs bad_negation text) has 4+ sibling precedents (:4892,
:5017, :5032, :5047) and is named ✓. get_val
options.js:11692–11698 (read): 0→«(none)», else MAJ.MIN.PATCH
from the packed long — 50594560 → «3.4.3» ✓.

**The valueless guard is load-bearing and correct.** Without it,
bare `suppress_alert` falls to the chain terminal
`result.flags[lname] = value` (:5559, read; value=!negated from
:5264) → `true`→«0.0.0» / `false`→«(none)», exactly the comment's
claim; C :4146 (op==empty→keep prior) makes no-op right ✓.
`result.flags === game.flags when defaultsInitialized` verified
at :4785 (read) ✓. No RNG anywhere on these paths (screen-only).

## Hallucinations / overclaim

None. The "fix (1) alone gave NO MOVEMENT" disclosure correctly
attributes half the fix to the display row. Named omissions (rc
negation text, opt_set_in_config, duplicate tracking) are each
scoped to sibling-wide pre-existing shape.

## Density

Cliff §10.18: cliffs-head writer, two arms of one ported row, own
`Ledger:` touch (feature_alert_opts gains D-3586). Per-function
verdicts ACCEPT ×2 → SHA ACCEPT.

## Verification

- Added-code grep: only hit is the commit message's own
  "No DIAG/FORCE/seed gates" — code clean.
- Rule #2: clean this iteration (see 2462).
- Committed test `suppress-alert-rc.test.mjs`: 3/3 PASS now
  (pre-fix pack failure proven via probe in-ship).
- Re-measure (mine): `verify handler_pickup_types --base
  49c10be08~1 --reach-all` → **0 PASS, 1 moved past, 0 unchanged,
  0 worse** (Tourist-94111 21→do_statusline1@23) + smoke 24/24
  REACH-OK — the D-log's line exactly.
- Full `sessions` 44/44 claimed in-ship, re-covered by this audit's
  gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
