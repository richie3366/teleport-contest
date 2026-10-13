# Review 2757 — 7e420439e — zappable spe==0 wrest message

- SHA: `7e420439ec74fcfceb6c06f865228f8d8f6c4d37`
- Subject: D-3901 zappable wrest You() (Barb-585441 s352 → distfleeck@s566)
- Type: cliff (≤10 functions), whole Method on the function
- D-entry: `## D-3901` (DIVERGENCE-LOG.md)

## Intent vs deliverable

Promise: `zappable` dropped the spe==0 wrest `You()`, so a worn-out wand
zap showed the direction prompt where C prints wrest+More; fix makes
zappable async and awaits the message in C order (before spe--),
updating all three call sites, moving Barb-585441 352→566.

Diff actually adds: `js/zap.js` — zappable body (message arm replaces the
"deferred until needed" comment) + dozap call site awaited;
`js/engrave.js:1093`, `js/apply.js:1240` — call sites awaited. `You`
already imported, no new edge. No other `js/` hunks.

## Inventory

| JS function | C locus | Status |
|---|---|---|
| `zappable` (js/zap.js:2843) | zap.c:2513–2522 (csym) | changed, now async |
| dozap / doengrave / do_break_wand sites | zap.c:2645 / engrave.c:792 / apply.c:3954 | awaited |

## C ↔ JS fidelity

C (`zap.c:2513–2522`, csym): fail gate (`spe<0 || (spe==0 &&
rn2(WAND_WREST_CHANCE))` → 0) → `if (spe==0) You("wrest one last
charge...")` → `spe--` → return 1. JS is now line-for-line that shape:
same gate, same message (exact string), same consume order. RNG
call-for-call: one `rn2` in the gate, none in the arm — matches the
"RNG matched through the wrest draw" evidence.

Callers (csym `--callers`: apply.c:3954, engrave.c:792, zap.c:2645 —
exactly 3): JS greps exactly 3 call sites, all awaited; `sym.mjs
zappable` → `js/zap.js:2843 ASYNC — await required`. Sync→async
conversion is complete — no truthy-Promise straggler. (C apply.c:3959's
"put the charge back" is pre-existing behavior, untouched by this diff.)

Helper classification: `You` is a LIVE callee; no clones, no stubs.

Grep: zero `FORCE`/`DIAG`/`getRngLog`/`fastforward`/seed/coords in `js/` hunks.

## Hallucinations / overclaim

None. "Message before spe--" and "precedes dozap's getdir :2653" both
verified against C order. The D-3900-continuity note (same session
346→352) is accurate.

## Density

Cliff phase: `zappable` was a live cliff row (Barb-585441, head-adjacent
chain from D-3900); `Ledger:` entry present; zappable now whole vs C
`:2514–2522`. Movement deliverable honest for a mid-session divergence.
Not a no-op.

## Verification

D-log: `verify zappable: 0 PASS, 1 moved` (352→distfleeck@566), reach
10/10, green/strict/cohort, full public 44/44 forced.
Audit re-measure (`verify zappable --base 7e420439e~1 --reach-all`):
`moved → distfleeck at step 566 (was 352)`;
`0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`; reach 10/10 →
REACH-OK. Claim confirmed verbatim. No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
