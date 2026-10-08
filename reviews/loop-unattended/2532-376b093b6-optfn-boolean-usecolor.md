# Review 2532 — 376b093b6 — optfn_boolean use_color gate convention

Metadata: SHA `376b093b67891a041b749b7b2e7b1211a04086d2`, D-3653, cliff-head
`options.c` optfn_boolean. js diff +9/−2 in `js/options.js` (two one-line
gates + comments; +2 focused tests).

## Intent vs deliverable

Promise: the lit_corridor/dark_room redraw gate read truthy `use_color`,
which stays unset in JS (no TERM probe under Rule #2), so the doset-tail
docrt→cls→more `--More--` never fired; both gates go to the house
`!== false` convention. Diff actually changes exactly the two gates (whole
`optfn_boolean` + doset mirror `optfn_boolean_do_set`) with C-cite
comments. Matches; nothing bundled.

## Inventory

- `optfn_boolean` (`js/options.js:10693`, async, exported) — one gate line.
  C: `nethack-c/upstream/src/options.c:5191–5449` (per `csym.mjs`); the arm
  is `case opt_lit_corridor / opt_dark_room` with `if (iflags.use_color)
  go.opt_need_redraw = TRUE` at `:5372–5373` (verified by direct read).
- `optfn_boolean_do_set` (`js/options.js:10990` at HEAD) — mirror gate, same
  arm. No helpers added, removed, or re-pointed; no new import.

## C ↔ JS fidelity

The changed arm, C `:5362–5374` (read directly): comment + `vision_recalc(2)`
+ `gv.vision_full_recalc = 1` + `if (iflags.use_color) go.opt_need_redraw =
TRUE`. JS keeps the first two lines untouched and flips only the gate
polarity from truthy to `!== false`. Branch order, RNG (none in this arm),
and prints (none here — the `--More--` emerges downstream via doset
`:8973` → reset_needed_visuals → docrt → cls → NEED_MORE→more(), as the
D-log traces) are unchanged.

Convention audit (this review, not the subject's word): `!== false` is the
established tree-wide read for probe-set flags — `display.js:5083`
precedent plus ~10 `use_color` sites (`getpos.js:601`, `pager.js:1259`,
`display.js:5389/5618/5634/5676/5911/7528/7791`) all use `!== false` or
`=== false`. After this SHA no truthy `use_color` read remains (grep).
No `use_color =` assignment exists anywhere in `js/` (grep), so the gate
reads TRUE in every reachable state — exactly C on the scored
color-terminal build (TERM probes set it; recorded C screens carry ANSI
colors). The explicit-false arm stays live for a future mono path.
`color`-option concern pre-empted correctly: `color` maps to
`&iflags.wc_color` (`optlist.h:236–238`, verified), not `use_color`.
`sym.mjs optfn_boolean`: exported async at `js/options.js:10693` — no clone
issue; nothing deleted or re-pointed.

Risk considered: constant-true gate if nothing ever sets false. That is
precisely C-on-the-scored-build, stated openly in the D-log ("Nothing ever
sets use_color false … exactly C on the scored color-terminal build"), not
a hidden simplification. ACCEPT-level.

## Hallucinations / overclaim

None. "MEASURED (JS replay trace + C topl.c/wintty.c reads…)" is backed by
the cited chain and the DIAG line quoted in the message was a temp probe
(the only `DIAG` grep hit is in the commit message text, not in `js/`).
"grep-verified" claims re-verified above.

## Density

Cliff-phase §2b: one cliff, head function itself, minimal correct fix at
the root cause with both mirror sites handled (whole-body discipline:
D-3623 had shipped the mirror arms but missed this gate). Ledger entry
updated. No bundling. Per-function: `optfn_boolean` whole, ACCEPT;
`optfn_boolean_do_set` mirror gate, ACCEPT.

## Verification

- Diff grep: no `FORCE`/`getRngLog`/`fastforward`/seed/coordinate gates in
  `js/`; the `DIAG` hit is commit-message prose about a removed temp probe.
  Rule #2: clean (same-file flag read, no new imports).
- D-log Verify: `verify optfn_boolean: 1 PASS` (Tourist-94171 → PASS) +
  REACH-OK + green/strict/cohort + full 44/44; focused unit 6/6 + replay
  1/1, each failed pre-fix.
- Re-measure: `verify optfn_boolean --base 376b093b6~1 --reach-all` →
  `1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
  (Tourist-94171: PASS) + smoke 24/24 REACH-OK. Claim reproduced exactly.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
