# Review 2004 — 25bf764f0 — cloak_simple_name caller wiring + cannot_push_msg stale

Metadata: SHA `25bf764f0`, D-3044, js/do_wear.js + js/invent.js +
js/mhitu.js + js/uhitm.js (68 ins, 61 del — mostly twin deletion).

## Intent vs deliverable

Subject promises "cloak_simple_name caller wiring + cannot_push_msg
stale". Diff actually does: deletes mhitu/uhitm local twins, imports the
canonical export at 4 sites, wires 5 do_wear arms + zap.c W_ARMC arm +
suit-guard arm. No cannot_push_msg code (stale, ledger only). Matches.

## Inventory

- `cloak_simple_name` (canonical export, unchanged body) — C objnam.c:5491–5509.
- 2 deleted local twins (mhitu.js, uhitm.js) → re-pointed to import.
- 6 wired caller arms (5 do_wear + 1 invent.js item_what) + suit-guard arm.

## C ↔ JS fidelity

Required sym output (post-delete tree): `cloak_simple_name
js/do_wear.js:1752 sync` — one canonical export, zero clones left
(grep confirms a single `function cloak_simple_name` in js/). Deleted
twins were C-matched (`|0` vs `===` on numeric otyp and the temp-`ocl`
vs inline-optional-chain read are semantically identical), so deletion
is a pure fold, no behavior change.

Caller arms vs pinned C (grep, not trust): do_wear.c:1785 ✓, :2166 ✓,
:2174 (`already_wearing(an(...))` shape kept) ✓, :2181 ✓, :2761
(`Sprintf buf "remove your %s"` → template) ✓; suit guard :1786–1789
(`" and "` join ⇔ conditional Strcat — enumerated the three
uarmc/uarm combinations, all equivalent) ✓; zap.c:5733–5734 W_ARMC →
`cloak_simple_name(uarmc)` ✓. Import-only changes in mhitu/uhitm ride
pre-existing do_wear edges (no new cycle); existing C call sites there
(mhitu.c:1075/2119, uhitm.c:2084) now resolve to the canonical export
automatically. Remaining unwired sites (do_wear.c:1955/3217,
polyself.c, trap.c:1703, objnam.c:5445) are pre-existing coverage owned
by other rows, not regressions of this fold. No RNG; no stubs; no omits
beyond the stale ledger note.

## Hallucinations / overclaim

None. "Both edges already existed — no new cycle" is structurally true
(import-line extensions only).

## Density

A clone-fold + caller-wiring handoff with a same-iteration stale pop —
small in insertions but each touched arm is a whole C call site, and the
fold removes 40 lines of divergence surface. Acceptable; not padded.

## Verification

D-log correctly claims no verify for the stale half. For the wired half
no verify.mjs line is cited in the message — re-measured here:
`hidden-proxy.mjs verify cloak_simple_name --base 25bf764f0~1
--reach-all` → 0 blocked (vacuous, coverage row), smoke 24/24 PASS →
REACH-OK, no regressions. Diff grep: no FORCE/DIAG/RNG-log reads. (Debt
for the record: the commit message should have carried the REACH line
for the non-stale function; the re-run above closes it.)

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
