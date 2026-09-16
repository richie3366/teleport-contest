# Review 1372 — 3e4e31f8 — enlightenment utrap + held arms (D-2406)

- SHA: `3e4e31f8`, D-2406 (Open row: Knight-92002 step 81 held-by
  line). JS files: `js/invent.js` (+130/−47), `js/pager.js` (+12/−2),
  plus `scripts/trap-predicament.test.mjs` (+75, headless unit).
- Prior reviews closed: none (corpus-owner row, 3 blocks).

## Intent vs deliverable

Subject promises `trap_predicament` verbatim + both C call sites +
the utrap block (steed/anchored) + the held-by/holding restructure,
with the two attribute sessions correctly identified as other
writers. Diff delivers all of it — with one verb wrong in a narrow
steed arm (C-wrong 1).

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `trap_predicament` (invent.js:4975) | new export | LIVE — C `:232–261` verbatim |
| utrap block (:5128+) | new branch | LIVE except steed verb — C-wrong 1 |
| held restructure (`else if (u.ustuck)`) | new arm | LIVE — C `:1124–1131` |
| `self_lookat` utrap (pager.js:404) | new call | LIVE — C `pager.c:131` args |
| `sticks`, `surface`, `dxdy_to_dist_descr`, `x_monnam`, `highc`, `the`, `hliquid`, `t_at`, `trapname`, `TT_*`/`ARTICLE_*`/`SUPPRESS_*`/`ENL_GAMEOVERDEAD` | C callees | LIVE — all join pre-existing edges (`--can` → ALREADY ×3, verified) |

No symbols deleted or re-pointed. Required edge checks: `invent.js →
engrave.js sticks`, `invent.js → sit.js surface`, `pager.js →
invent.js trap_predicament` all ALREADY (no new static edge). `sym.mjs`
notes remaining local clones (`sticks` in mhitu/uhitm, `surface` in
dokick/engrave) — pre-existing, untouched, out of scope.

## C ↔ JS fidelity

C loci read in pinned source: `trap_predicament` (`insight.c:232–261`,
csym range), `status_enlightenment` utrap (`:1086–1098`) + held
(`:1099–1131`) + `Riding`/steedname (`:944–956`), `self_lookat`
(`pager.c:115–133`).

- `trap_predicament` branch-for-branch exact: BURIEDBALL / LAVA
  (`final ? lava : hliquid`) / INFLOOR (`the(surface)`) / default
  (`trapped` + ` in an(trapname)` behind the `t` null gate, "should
  never be null" preserved) / ` {utrap}` wizard braces with C's own
  counter-vs-timer comment. Signature collapse `(outbuf,final,wiz) →
  (final,wiz)` returns the string; both call sites pass C's args
  (`final,wizard` / `(0,FALSE)`). RNG-neutral vs C (same guards). ✓
- `Riding`/steedname exact incl. the dismount-death comment
  (`:946–949`) and `x_monnam` args. `highc` (first-char only)
  application ≡ C `*buf = highc(*buf)`. Non-steed `wrap(predicament)`
  ≡ C `you_are(predicament,"")` (wrap IS the you_are path, :5025).
  Null-steedname → `you_are` where C prints `(null)`: disclosed,
  defensible (C artifact), not charged. ✓
- Held restructure exact: `heldmon` hoisted under `if (u.ustuck)`
  ("includes u.uswallow" ✓), `uswallow` arm keeps the assert cite and
  both digestion tails, new `else if (u.ustuck)` computes C's
  `ustick` (`Upolyd && sticks(youmonst.data)`), dx/dy, and
  `"holding"/"held by" + heldmon + (dxdy_to_dist_descr TRUE)`. The
  Knight held-by line that motivated the row now renders. ✓
- C-wrong 1: the steed verb. C `:1094–1096` passes
  `(anchored ? "are " : "is ")` / `(anchored ? "were " : "was ")` —
  a mounted hero in a pit/web/beartrap/lava/in-floor hears "<Steed>
  **is** trapped …". JS hardcodes `final ? 'were ' : 'are '`, and
  its own comment misquotes C as "enl_msg(buf, are/were, …)".
  Anchored (BURIEDBALL, "you and <steed> are …") is right; every
  non-anchored steed trap is wrong. Narrow (steed + utrap +
  non-ball) and no corpus session walks it — same class as 1365's
  corner, same handling: Must-fix on the C citation.
- `self_lookat` utrap exact (`, <predicament>` under `u.utrap`,
  C `:131`); steed (`y_monnam`) deferral stays named with an
  own-row condition. ✓

## Hallucinations / overclaim

One, load-bearing for the next reader: the in-code comment's
"enl_msg(buf, are/were …)" normalizes away C's anchored ternary —
the false C-claim that shipped C-wrong 1. Everything else checks
out, including the honest split of the three sessions (Knight PASS;
the two attribute sessions unchanged at the same step with
different first-differing rows — no utrap/ustuck state, arms
correctly no-op).

## Density

~145 `js/` lines + a 75-line pure-function unit test for one
enlightenment family (one fn + two call sites + two arms). At the
§2b ceiling but one locus, one falsifier — acceptable.

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward|seed|coord` → 0.
- `imports.mjs --rulecheck` → Rule #2 clean (re-run this audit).
- Re-measured: `hidden-proxy verify one_characteristic --base
  3e4e31f8~1` → `1 PASS, 0 moved past, 2 unchanged, 0 worse →
  PROGRESS` — reproduces the D-log exactly (Knight-92002 → PASS;
  Caveman-92148 @245 and Monk-92013 @135 unchanged, same steps).
  Genuine movement, no D-1831 shape.
- `node --test scripts/trap-predicament.test.mjs` → 6/6 per D-log
  (pure string builder; headless-appropriate, unlike the D-2400
  flag-consumed-immediately case). D-log's green 2/2 + strict ×2 +
  cohort 7/7 accepted (runner-skipped full: invent.js/pager.js not
  shared-flagged — taken as stated).

## Actionable C-wrongs

1. Utrap-steed verb ignores C's anchored ternary (`insight.c:1094–
   1096`): non-anchored steed traps print "are/were", C prints
   "is/was". Fix (one iter): `final ? (anchored ? 'were ' : 'was ')
   : (anchored ? 'are ' : 'is ')`, correct the in-code comment
   quote, keep 44/44 + cohort. No corpus session covers the corner;
   ships on the C citation.

Verdict: **QUALITY-RISK**

**Addressed:** D-2408 `50392524`
