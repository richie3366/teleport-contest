# Review 2535 — bb5cef33f — mfind0 via_warning flush + set_msg_xy

Metadata: SHA `bb5cef33f7826c27d97d40e5896d9f878026206d`, D-3656, cliff-head
`detect.c` mfind0. js diff +12/−6 in `js/detect.js` (3 `set_msg_xy` + 1
flush + doc updates; + focused test `scripts/mfind0-warn-flush.test.mjs`).

## Intent vs deliverable

Promise: pure capture-timing diff — C step 64 holds the warning `1` because
the screen is captured at mfind0's mid-function `display_nhwindow` flush,
before `mundetected` is cleared; JS lacked the flush (and all three
`set_msg_xy`). Wire all three in C order + `await flush_topl_more()` after
the danger-sense pline (house idiom, no new import). Diff does exactly
that plus doc-deferral updates. Matches; nothing bundled.

## Inventory

- `mfind0` (`js/detect.js:379`, local async) — the only changed JS
  function. C: `nethack-c/upstream/src/detect.c:1964–2013` (50 lines,
  staticfn, per `csym.mjs`). C callers: `detect.c:2065` (in `dosearch0`,
  `mfind0(mtmp,0)`) and `detect.c:2118` (in `warnreveal`, via_warning).
- No helpers added/removed/re-pointed. `set_msg_xy` + `flush_topl_more`
  were already imported in `js/detect.js:63` (verified) — no new edge.

## C ↔ JS fidelity

Full C body walked against JS at SHA:

- `via_warning && !warning_of → -1` ✓; `M_AP_TYPE → seemimic` ✓;
  `found = !canspotmon` ✓; hider gate (`is_hider||hides_under||S_EEL`) ✓.
- via_warning arm: `set_msg_xy(x,y)` (`:1984`) now wired ✓; `Your("danger
  sense…")` text identical incl. the `Blind` ternary ✓ (`pline` wrapper is
  the house message path); `display_nhwindow(WIN_MESSAGE,FALSE)` (`:1987`)
  → `await flush_topl_more()` with the wintty + precedent cite ✓, placed
  before `mundetected=0` + `newsym` exactly as in C ✓.
- `mundetected=0; found=TRUE; newsym` ✓.
- Found tail: invisible-glyph early `-1` ✓; `exercise(A_WIS,TRUE)` ✓;
  `!canspotmon → map_invisible + set_msg_xy (:2004) + You_feel` ✓;
  `!sensemon → set_msg_xy (:2007) + You("find %s")` ✓ (tame/a_monnam via
  house `x_monnam*` + pline — pre-existing, text-identical per D-log).
- `return 1 / 0` ✓. RNG: none. Prints: the three message arms ✓.
- Callers wired both sides: JS `warnreveal` calls `mfind0(mtmp,1)` and the
  dosearch path calls `mfind0(mtmp,0)` ✓.
- `sym.mjs mfind0`: local-only — correct, C is `staticfn`. Nothing
  deleted or re-pointed.

One placement note (confirm, not a gap): the flush runs only on the
via_warning hider arm, matching C `:1987` exactly — not on the mimic or
tail arms, where C has no flush. Correct restraint.

## Hallucinations / overclaim

None. "MEASURED (recorded C screens 61–66 + geom-probe…)" names its
evidence; "pure capture-timing diff, not a state writer" follows from
RNG 7824/7824 + single-cell terrain-identical probe. "Named: none" holds —
all previously deferred items in this body are now wired.

## Density

Cliff-phase §2b: one cliff, head function itself, whole-body completion
(last two deferrals closed). Ledger entry updated. No bundling.
Per-function: `mfind0` whole, ACCEPT.

## Verification

- Diff grep: no `FORCE`/`DIAG`/`getRngLog`/`fastforward` in `js/`.
  Rule #2: no new imports.
- D-log Verify: `VERIFY: PASS` (syntax/rule2/green/strict/cohort).
- Re-measure: `verify mfind0 --base bb5cef33f~1 --reach-all` →
  `1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` (Healer-94396:
  PASS — exactly the claimed 64→PASS) + smoke 24/24 REACH-OK.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
