# Review 2087 — d3ab32283 — enlght_line port + enlght_out split

- SHA: `d3ab32283` (D-3127)
- Subject: "`insight.c` enlght_line port + enlght_out split (coverage)"
- js/ insertions: ~16 ins / 27 del (js/insight.js + js/invent.js)
- Prior index: 2086; queue Must-fix at review time: empty

## Intent vs deliverable

Promise: port `enlght_line` whole (C-order body over live
strstri/strsubst), export it, delete the invent.js clone onto the
import, split `enlght_out` across the per-builder sinks; head row
stale-declared.

Diff actually adds: the exported 4-param `enlght_line` with
strstri gate + per-row strsubst, the hacklib import pair, the
invent.js import alias, and the 18-line clone deletion. Matches
the promise. No new helpers.

## Inventory

- `enlght_line` (js/insight.js:252, export) — C
  insight.c:126–156 (csym range). Live: whole body now.
- invent.js `enlght_line_txt` clone — deleted; re-pointed to
  the import (js/invent.js:253).

Helpers: none added. Callees `strstri` (js/hacklib.js:585) +
`strsubst` (js/hacklib.js:636) pre-existing live; `CONTRA`
(js/insight.js:150) pre-existing, verified byte-equal to C
:136–143 below. Nothing else deleted or re-pointed.

Required sym output (deleted clone → import):

```text
enlght_line_txt  NOT FOUND in js/** (no export, no local function/const).
enlght_line      js/insight.js:252   sync
strsubst         js/hacklib.js:636   sync
strstri          js/hacklib.js:585   sync
```

## C ↔ JS fidelity

`enlght_line`, branch by branch against insight.c:126–156:
format `` ` ${start}${middle}${end}${ps}.` `` ≡ Sprintf :148;
gate `if (strstri(buf, ' not '))` ≡ :150 (JS strstri returns
the tail string or null — truthiness ≡ C's non-NULL pointer);
loop calls `strsubst(buf, from, to)` unconditionally per row ≡
:151–153 (JS strsubst is first-only case-sensitive, no-op when
absent — read in full, matches hacklib.c:534–551). CONTRA's 6
rows match C :136–143 verbatim. `NO_ENLGHT_CONTRACTIONS` is
defined nowhere (only the two `#ifndef`s in insight.c itself),
so the table arm is live in the contest build. The old code's
case-sensitive gate + replace-all per row were both C-wrongs;
both are gone. No RNG either side.

`:155 enlght_out(buf)` → return-the-text: C enlght_out
(:117–124, read) is a two-arm window sink
(en_via_menu→add_menu_str else putstr). JS builders already
consumed the return value, so no caller edit was needed; the
ledger `split` names the three sink homes. Characterization
honest: the emit is per-builder dispatch, not a missing call.

Callers: enl_msg macro :106 → js/insight.js:263 (4-arg);
direct :641 → js/insight.js:437 (4-arg); builder macros → 107
invent.js sites. The dropped `ps = ''` default is safe — my
own balanced-paren arity audit of js/invent.js: 107 calls,
all exactly 4-arg (trailing commas accounted).

Stale declares (spot-verified, all hold): qst_guardians_respond
whole at js/mon.js:1396 (fmon sweep, DEADMONSTER, canseemon
count, Hallucination-gated pline_The) and wired from setmangry
js/mon.js:1473; attrval 3 arms exact at js/invent.js:4976;
trap_predicament all 4 switch arms + `{utrap}` suffix exact at
js/invent.js:5695.

Diff grep: no FORCE/DIAG/getRngLog/seed/coordinates. Rule #2
clean (iteration-wide).

## Hallucinations / overclaim

None. "Vacuous verify is NOT a corpus PASS" is stated in the
re-measured output and the D-log claims only the note +
REACH-OK. The no-TDZ claim (hoisted export, runtime-only
calls, pre-existing invent↔insight edge since
background_enlightenment) is structural and plausible.

## Density

One function + split + 3 stale declares at ~16 insertions —
below the ~80 floor, but the unless-clause holds: parent queue
head was the stale mon.c row (correctly popped via direct
`ledger.mjs set`, verified above), enlght_line was the next
row, the callee closure is closed (strstri/strsubst live), and
the D-log names why same-file growth needs its own iterations
(status_enlightenment 326L campaign-scale). Verdict: ACCEPT.

## Verification

Re-measured (`--base d3ab32283~1 --reach-all`, both fns one
call): 0 blocked at baseline and working tree for each,
vacuous notes, smoke 24/24 → REACH-OK both. Matches the
D-log; no REGRESSED session. Shared gates per D-log: syntax 2
files, rule2, green 2/2, strict ×2, cohort 7/7 → VERIFY PASS.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
