# Review 2076 — c21da30e8 — selection_filter_mapchar restart

- SHA: `c21da30e8` (D-3116)
- Subject: "`selvar.c` selection_filter_mapchar restart + getpoint/setpoint guards (coverage)"
- js/ insertions: js/mklev.js only (+99/−41 region)
- Prior index: 2075; queue Must-fix at review time: 1 (2070 resists-clone row)

## Intent vs deliverable

Promise: restart `selection_filter_mapchar` whole in C order
(NULL guard, fresh ret, getbounds scan with getpoint +
match_maptyps short-circuit, full lit switch incl. the rn2 arm),
align getpoint/setpoint guards to C order, audit match_maptyps.

Diff actually adds: exactly that; the old ROOM-only clone is
deleted. Matches the promise; no extra scope.

## Inventory

Per function (cluster of 4, one file + callee):

- `selection_filter_mapchar` (now exported — C extern.h:2857) —
  C selvar.c:247–281 (csym range). Live: guard, fresh ret,
  getbounds rect, x-outer/y-inner scan, full lit switch
  (default/−2, −1 rn2(2), 0/1 levl.lit match). Named: sole C
  caller nhlsel.c:669 (Lua bridge absent).
- `selection_getpoint` — C :167–178. Guards now C-order
  (`!sel.pts` ≡ `!sel->map`, sel-scoped wid/hei with the
  `?? COLNO` recalc idiom); membership model unchanged.
- `selection_setpoint` — C :180–208. Same guard alignment;
  body below untouched (pre-existing).
- `match_maptyps` — C sp_lev.c:215–224. Audited line-exact,
  untouched (callee, in-closure).

Helpers: selection_new/getbounds/getpoint/setpoint LIVE;
match_maptyps local VERIFIED exact; rn2 live. No new clones —
and one old clone deleted (the ROOM-equality inline match is
replaced by the live match_maptyps: MATCH_WALL/MAX_TYPE
wildcards now work). Nothing re-pointed across modules
(sym.mjs N/A — same-file).

## C ↔ JS fidelity

Filter vs C :247–281: NULL→null, fresh ret, getbounds, scan
nesting, and the getpoint→levl→match short-circuit all exact;
switch arm order (`default:`+`case -2:` first) verbatim;
`(loc.lit | 0) === lit` correctly normalizes JS bool/0/1
against C's `(unsigned) lit` compare; `rn2(2)` sits in the
setpoint arg like C (same draw order). Default `lit = -2`
verified against nhlsel.c:663 `luaL_optinteger(L, 3, -2)`.
The `!loc` guard is JS-only defensive (C indexes direct) —
skips only where C would read garbage; harmless.

Return-shape change is safe: both in-file callers (negate-all
:30624 with a hand-built no-wid/hei shape, teleport-hub :30635)
feed `selection_rndcoord`, which reads only `.pts`+getbounds —
verified working for both the hand-built input shape (recalc
early-returns on carried lx..hy, `??` defaults apply) and the
new selection_new output. The new `!sel.pts` guard additionally
fixes an old crash (`.has` on undefined) and matches C.

Getpoint/setpoint guards: `!sel.pts` ≡ `!sel->map` exact;
sel-scoped bounds exact on live shapes, `??`-defaulted
elsewhere. Dead-on-live as claimed.

Diff grep: clean. Rule #2 clean (iteration-wide rulecheck).

## Hallucinations / overclaim

None. "Live paths draw no RNG" holds (both callers take the
default −2 arm); the rn2 arm is ported, not stubbed.

## Density

4-function one-file + callee cluster, per-function Ledger +
Verify lines, ≤10, no Must-fix bundled. ~100 js/ insertions
with a clone deletion. Per-function verdicts: all ACCEPT. SHA
verdict: ACCEPT.

## Verification

Re-measured (`--base c21da30e8~1 --reach-all`, all 4 in one
call): 0 blocked at baseline and working tree each, vacuous
notes printed, smoke 24/24 → REACH-OK ×4. Matches the D-log.
No REGRESSED session. Green 2/2, strict ×2, cohort 7/7, full
44/44 (shared file) per D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
