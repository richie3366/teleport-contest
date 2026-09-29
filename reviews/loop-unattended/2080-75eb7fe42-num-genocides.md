# Review 2080 — 75eb7fe42 — num_genocides unique arm + livelog wiring

- SHA: `75eb7fe42` (D-3120)
- Subject: "`insight.c` num_genocides unique+impossible arm + `read.c:2956` do_genocide livelog caller wiring (coverage)"
- js/ insertions: ~20 (js/insight.js + js/read.js)
- Prior index: 2079; queue Must-fix at review time: empty

## Intent vs deliverable

Promise: complete PARTIAL `num_genocides` (add the genocided-unique
+ impossible arm) and wire its read.c:2956 livelog caller into
`do_genocide`, lifting the header omission.

Diff actually adds: the 6-line arm in num_genocides, the 9-line
livelog block in do_genocide's REALLY arm, and the one-word header
comment lift. Matches the promise; nothing else.

## Inventory

- `num_genocides` (js/insight.js:483, export) — C
  insight.c:2952–2966 (csym range). Live: whole body now
  (G_GENOD count + UniqCritterIndx/impossible :2960–2962).
- `do_genocide` (js/read.js:2677, async export) — caller wiring
  only, no body port: the read.c:2956–2961 livelog guard.

Helpers: none added. `UniqCritterIndx` is a pre-existing in-file
local (:1013) implementing the C **macro** (:2777–2778) verbatim
(`geno & G_UNIQ && mndx != PM_HIGH_CLERIC`) — a macro local, not
a clone of an export. `impossible` is the live async export
(js/display.js:8481, sym.mjs: single site). Nothing deleted or
re-pointed.

## C ↔ JS fidelity

`num_genocides`: loop LOW_PM..NUMMONS, G_GENOD count, unique
guard with the exact format string `"unique creature '%d: %s'
genocided?"` and `(i, pmnames[i][NEUTRAL])` args. Branch order
identical; no RNG either side. The fire-and-forget `impossible`
(no await in a sync function) is disclosed and safe: the callee
never throws (early return on re-entry, message via
urgent_pline), the arm is definitionally unreachable, and the
record_achievement precedent is cited.

Caller wiring: C read.c:2955–2964 read in full — `if (how &
REALLY)` (REALLY=1 ≡ local GENO_REALLY=1, verified), the
first/subsequent livelog with verbatim strings and
`(uhis(), makeplural(realbuf))` args, **then** the G_GENOD set.
JS inserts the read at :2719–2726 before the mvitals set: order,
strings, flags (`LL_CONDUCT|LL_GENOCIDE` vs `LL_GENOCIDE`), and
callees (`livelog_printf` imported :171, `uhis` live, `realbuf`
local :2710) all check. Dynamic insight.js import mirrors the
do_class_genocide :2508 precedent in the same file.

Callers: all 6 C sites per D-log table (insight.c:2158/3029,
read.c:2739/2956, topten.c:437/598); the new :2956→:2682 wiring
verified in-diff, the other five pre-existing with JS sites
named. The "do_genocide livelog" header omission is lifted —
no longer claimed anywhere.

Diff grep: no FORCE/DIAG/getRngLog/seed/coordinates. Rule #2
clean (iteration-wide).

## Hallucinations / overclaim

None. "Conduct/gamelog path, no RNG" accurate; "0 blocked"
framed as a note, not a PASS.

## Density

Single function + caller wiring at ~20 insertions — below the
~80 floor, but the unless-clause is real: the parent's coverage
block held exactly one insight.c row (the head itself), and the
callee closure (macro local + live impossible) holds nothing
Open. Verified against `75eb7fe42~1:docs/LOOP-QUEUE.md`, not the
D-log's word. Verdict: ACCEPT (thin but complete; file exhausted).

## Verification

Re-measured (`--base 75eb7fe42~1 --reach-all`): 0 blocked at
baseline and working tree, vacuous note, smoke 24/24 → REACH-OK.
Matches the D-log; no REGRESSED session. Shared gates per D-log:
syntax 2 files, rule2, green 2/2, strict ×2, cohort 7/7.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
