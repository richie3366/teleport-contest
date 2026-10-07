# Review 2513 — a1ff9df9c — config_erradd whole (ready-arm windowed plines)

Metadata: SHA `a1ff9df9c` (D-3633), labeled batch @9f919260b: 1 function in
cfgfiles.c (open 0 · partial 1 · recheck 0). js diff +33/−13 in
`js/cfgfiles.js` + new `scripts/config-erradd-ready-windowed.test.mjs`.
≤10-function SHA: whole Method on the single function (the §10.17 sample
clauses (b)–(d) are vacuous: 1 function, 0 `audited`, 0 `Left open:`).

## Intent vs deliverable

Promise: split config_erradd's ready arm (`:1577–1589`) by window state like
the D-3630 !ready arm — pre-window → configMsg unchanged (C raw_print);
windowed → `(async () => { if (showOrig) await pline('\n%s', origline); await
pline('%s %s%s%s', tag, lineno, text, punct); })()`, C `:1579` + `:1587` in
order, no wait_synch per C; num_errors++ stays sync; origline paint snapshots
sync for exactly-once under detached callers. Claims: no corpus session
blocked (coverage, honest), REACH-OK, green + cohort, test 1/2→2/2.

Diff actually adds: exactly that arm split + docstrings. Matches the promise.

## Inventory

- `config_erradd` (`js/cfgfiles.js:308`) ready arm — windowed pline path new;
  pre-window bytes unchanged.

## C ↔ JS fidelity

C `config_erradd` (`nethack-c/upstream/src/cfgfiles.c:1543–1589`, via
`csym.mjs` in review 2510). Ready arm, line by line:

- `:1577` `num_errors++` — JS keeps it sync, same position. ✓
- `:1578–1580` origline gate — JS snapshots `showOrig` + `origline` and sets
  `origline_shown` synchronously, then paints per window state. Exactly-once
  preserved: a second call sees the flag set even if the first paint is still
  floating — matching C, which paints immediately at call time. ✓
- `:1582–1586` lineno (`'Line N: '` iff `line_num > 0 && !secure`) ✓ verbatim.
- `:1587` `pline("%s %s%s%s", secure ? "Error:" : " *", lineno, buf, punct)`
  — JS windowed call is that exact shape; pre-window `configMsg(tag + ' ' +
  ...)` is the unchanged prior concatenation. ✓
- No `wait_synch` in this arm — correct vs C (unlike `:1562`). ✓
- RNG: none in the body. Callees (`punctTail`/c_eos, `configMsg`/raw_print,
  `pline`) all live; sole C caller `:1889` propagates via D-3630 plumbing. ✓
- Whole-function claim holds: !ready split (D-3630) + in_lua (pre-existing) +
  ready split (here) = all of `:1543–1589`. `Ledger: config_erradd ported`. ✓

Reachability honesty verified, not assumed: every JS `config_error_init`
caller (`files.js:213`, `earlyarg.js:236`, `cfgfiles.js:1270/1377/1384/1389`,
`options.js:8996/9060`) is a pre-window parser path — no windowed JS caller
exists (read_sym_file MISSING), so "ships unreached" is true and disclosed
in both the code comment and the D-log. `sym.mjs` re-point check: N/A (no
symbol added/deleted/re-pointed; pline already imported).

## Hallucinations / overclaim

None. The D-log never claims movement ("no corpus session blocked on it at
baseline", "coverage row, not a cliff"), never claims a live windowed
caller, and the test (not the board) is presented as the evidence. No
dispatch-over-stub: the new path's only callees are live. Diff grep clean;
Rule #2 globally clean (2506).

## Density

One process observation, verdict-neutral: the cliffs block at the parent was
non-empty (12 rows, dosounds head), while playbook §2b reserves the batch
unit for an empty block. Against that: (1) CURRENT's Next cluster explicitly
scheduled this batch; (2) it is a same-function completion of D-3630's named
arm, making a partial whole per §2a's whole-function rule — not a cold-file
context switch; (3) real code + test, REACH-OK, zero regressions; (4) the
D-log Next hands back to the cliffs head (dosounds). The verdict triggers do
not include "batch with open block", and a QUALITY-RISK here would demand a
Must-fix that changes nothing (the head is auto-next). Noted for the
supervisor's density healing; not a C-wrong. §10.17 batch substance holds:
manifest of HEAD ✓, 1 ≤ 100 ✓, 0 Left open ✓, one Verify line for the
function ✓ (no literal "sweep" line exists, but with 1 function and 0 open
there is nothing to sweep-list). Not a no-op: non-empty js/ diff, no ledger
text as deliverable.

## Verification

Re-measured:
`node scripts/hidden-proxy.mjs verify config_erradd --base a1ff9df9c~1 --reach-all`:

- `verify config_erradd: no corpus session is blocked on it at a1ff9df9c~1`
  (0 at baseline — exactly as the D-log says; no PASS claimed)
- `smoke config_erradd: 24 PASS, 0 regressed → REACH-OK`

Matches the D-log Verify bullet. No REGRESSED session. Committed test
re-ran: 2 pass / 0 fail.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
