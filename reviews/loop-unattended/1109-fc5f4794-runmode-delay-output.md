# Review 1109 — fc5f4794 — runmode_delay_output movement-delay frames (D-2143)

Metadata: SHA `fc5f4794`, `js/hack.js` + `js/cmd.js` + `js/allmain.js`
(~+40/−4 in `js/`). Queue row: NEXT supplemental, 0 sessions blocked
(anim metric, not a corpus owner). No prior review claimed closed.

## Intent vs deliverable

Subject promises a new exported `runmode_delay_output()` in C-faithful
home `js/hack.js` wired at all 4 C call sites, lifting anim frames
123/1483 → 1440/1483. Diff delivers exactly that: one new function +
4 call-site wirings + edge-local imports only.

## Inventory

- `runmode_delay_output` (new, `js/hack.js:1049`, async, exported):
  runmode normalization + gate + leap `% 7` + `time_botl` re-arm +
  `curs_on_u` + `nh_delay_output` (×5 crawl).
- Call sites: `domove` try-tail (`js/cmd.js`), `moveloop multi<0`
  (`js/allmain.js`), post-occupation (`js/allmain.js`),
  `continue_run` (`js/cmd.js`).

## C ↔ JS fidelity

C `hack.c:2994–3017`: gate `(run || multi) && runmode != RUN_TPORT`;
leap updates iff `!(moves % 7)`; `disp.time_botl = flags.time`;
`curs_on_u()`; `nh_delay_output()`; +4 more iff CRAWL. JS matches
gate order, leap condition (`(game.moves|0) % 7`), and crawl ×5
verbatim. Callees both LIVE async (`curs_on_u` `js/display.js:5240`,
`nh_delay_output` `js/display.js:4354`; `sym.mjs` confirms, both awaited).
`--callers` lists exactly the 4 C sites
(`allmain.c:381,509,517`, `hack.c:2990`) and JS wires all 4 —
full closure, no stub in a live arm. Normalization order
teleport→run→walk→crawl confirmed against `options.c:3638–3642`
(`optfn_runmode`); default RUN_LEAP matches C's normal mode. One nit,
not queueable: C assigns `disp.time_botl = flags.time`
unconditionally while JS only sets-true under `if (flags.time)` (and
also sets `game.flags.time_botl`, which C never touches) — but this
mirrors the established `end_running` JS pattern (`js/hack.js:988–991`)
line-for-line, and the `!time`-option edge is unreachable in every
session. Zero RNG draws; no state mutation besides the two
C-named flags. Branch-by-branch confirm.

## Hallucinations / overclaim

None. D-log explicitly marks the hidden check vacuous ("no corpus
session blocked ... NOT claimed as a corpus PASS") and documents the
`RUN_STEP` deviation from the spec. The "cannot un-emit a matched
frame" no-regression argument is mechanism-stated, and full 44/44 is
cited as the actual proof.

## Density

One display-path function + its 4-site envelope in one commit —
right-sized per §2b (one C locus family). Supplemental anim work with
0 corpus blocks is priority-soft while scen-* sits at 7/275, but it is
RNG-free, full-suite-verified, and the cited row was queued NEXT, so
this is ACCEPT-range judgment, not a process violation.

## Verification

D-log Verify: syntax/rule2 PASS, hidden vacuous (honest), green 2/2,
strict ×2, cohort 7/7, full 44/44 (auto on shared-file change), plus
anim 1440/1483 with bellwether seed0014 995/995. Per Method step 6 the
corpus re-measure is N/A by the D-log's own explicit statement (0-block
row); `imports.mjs --rulecheck` re-run here: Rule #2 clean. No
FORCE/DIAG/seed/coordinate gates in the hunks.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
