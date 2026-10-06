# Review 2444 — c3000735f — MZ_HUMAN 3→MZ_MEDIUM (distfleeck writer)

**Metadata.** SHA `c3000735f` (2026-10-06, D-3561). Type: **cliff**: writer
port (wrong `MZ_HUMAN` literal) for the cliffs head `monmove.c distfleeck`
(5 blocked), down D-3560's measured chain
m_search_items→can_carry→max_mon_load→const. `js/` insertions: 5
(`js/monmove.js`: 1 import name, const, cite) + 1 test file (38 lines).

## Intent vs deliverable

Promise: replace the wrong `MZ_HUMAN = 3` (MZ_LARGE) with `MZ_MEDIUM`,
fixing wraith `max_mon_load` 333→500 so `can_carry` accepts the 357-load
large box and the wraith retargets; Hea-92055 104→141; census test.

Diff actually adds: exactly that. No other JS touched. Promise matches diff.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | `max_mon_load` (const fix; body pre-existing whole) | ported | [monmove.js](/home/debian/dev/teleport-contest/js/monmove.js:322) (const `:180`) | mon.c:1927–1954; monflag.h:177–183 |

## C ↔ JS fidelity

**The const:** C monflag.h:179 `MZ_MEDIUM 2`, :180 `MZ_HUMAN ≡ MZ_MEDIUM`,
:181 `MZ_LARGE 3` — read and confirmed. The old literal `3` was MZ_LARGE:
wrong. `MZ_MEDIUM` added to the existing monsters.js import (no new edge —
diff confirms); `MZ_MEDIUM` is 2 (asserted in-test, green).

**The body** (pre-existing, re-verified whole since the `ported` claim now
rests on it): JS :322–337 matches C mon.c:1927–1954 arm-for-arm —
`!cwt → (MAX_CARR_CAP×msize)/MZ_HUMAN`, strong/cwt arms, `!strong → /2`,
floor 1 (`Math.trunc` ≡ C long division on non-negative operands).
Wraith math re-derived: cwt 0, msize 2 → old (1000×2)/3=666→333 < 357
reject; new (1000×2)/2=1000→500 ≥ 357 carry ✓. Chain: `can_carry` gates on
`max_mon_load` (:416, read) ✓; no RNG in the function either side. Sole
reader of the fixed const in monmove.js is :326 (grep) ✓; the census claim
holds — all 5 js/ homes now `MZ_MEDIUM` or `2` (zap.js:393, uhitm.js:158,
invent.js:360, worn.js:135) ✓. No helpers added: no clone/stub/omit
classification applies. Named: none — true.

## Hallucinations / overclaim

None. The three-step mechanism (fobj dump → predicate eval → load probe)
is measured evidence from the cited /tmp probes, and the re-probe
prediction (541 (44,11)→(43,12) = C's TO square) is the kind of falsifiable
claim the movement below cashes. "Chain bodies already whole" re-verified
for the two load-bearing links (max_mon_load body, can_carry gate).

## Density

Cliff §10.18: distfleeck confirmed as the head row at the parent (5
blocked). Writer port down a measured chain — the exemplary cliff
follow-up to a `[measure]` iteration (D-3560 named m_search_items; this
iter traced and shipped the root const, one step). One cliff, one
function-family fix, own `Ledger:` entry ✓. Row probe Hea-92055 moved
strictly later (+37 steps); the 4 unchanged are :538 call-pattern forks
with per-session writers named (JS draws named per session), and the new
step-141 fork is likewise diagnosed in Next (not claimed as done).
Per-function verdict ACCEPT → SHA ACCEPT.

## Verification

- Added-code grep (`^+.*FORCE|DIAG|getRngLog|fastforward`): clean.
- Rule #2: clean this iteration (see 2439).
- `node --test scripts/max-mon-load-mz-human.test.mjs`: 2/2 pass (0/2
  pre-fix claimed; the assertions fail on the old literal by construction).
- Re-measure (mine, `--base c3000735f~1 --reach-all`):
  `max_mon_load`: 0 blocked (honest "note hidden — draws no RNG" in the
  D-log, not a PASS claim), smoke 24/24 REACH-OK; `distfleeck`: **0 PASS,
  1 moved past, 4 unchanged, 0 worse → PROGRESS** (Hea-92055 →distfleeck
  @141, +37); `reach`: **723/723 PASS, 0 regressed → REACH-OK**. Exact
  match, no REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
