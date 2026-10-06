# Review 2449 — 4f670fdff — postmov ptr refresh after mintrap (D-3566)

**Metadata.** SHA `4f670fdff` (2026-10-06, D-3566). Type: **cliff**:
writer port (one deferred refresh line) for the cliffs head `monmove.c
distfleeck`. `js/` insertions: 6 (`js/monmove.js` +6/−3) + 1 test
file (58 lines).

## Intent vs deliverable

Promise: add the C post-move `ptr = mtmp.data` refresh after mintrap
so a poly-trap form change reaches the `hides_under` hide-check;
dig-Valk-94335 →PASS + desc-Tou-94007 →PASS; 36-draw replay test
red→green.

Diff actually adds: the refresh line + cite, and the stale deferral
comment updated. Promise matches diff.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | `postmov` (one refresh line; body pre-existing) | partial (via `m_move`) | [monmove.js](/home/debian/dev/teleport-contest/js/monmove.js:1742) | monmove.c:1508–1519, :1690–1699 |

Helpers: none. No imports touched.

## C ↔ JS fidelity

**The line:** C monmove.c:1517
`ptr = mtmp->data; /* in case mintrap() caused polymorph */` —
unconditional, after the trapret/offmap early returns (:1510–1516),
before door handling (:1519+) — read. JS :1742 is the identical line
in the identical position (after the mintrap + migrated/offmap return,
before "open a door") ✓. Code and placement C-exact.

**Cite drift (debt, not a C-wrong):** the subject cites `:1514`
(commit message, D-log, both new JS comments), but the line is
uniquely at **:1517** (`:1514` is `} else if (mon_offmap(mtmp)) {`).
The pre-existing comment this diff replaced had the correct `:1517`.
Next touch of these lines should restore `:1517` (row eligibility
excludes cite drift from Must-fix; precedent 2432/2433: noted, ACCEPT).

**The load-bearing read:** C hide gate :1692
`if (hides_under(ptr) || ptr->mlet == S_EEL)` + :1696
`if (mundetected || (!helpless && rn2(5)))` — read; JS :1893–1897
mirrors both lines and reads the cached `ptr` (not `mtmp.data`) ✓, so
the stale-kitten-ptr mechanism (skipped `rn2(5)` → 1-draw shift) is
real and the refresh closes exactly it. TMPLOG: 0 residue in `js/`
(wc) ✓. The one-draw-shift audit (23 matched, same-value
different-caller `rn2(5)=3`, shifted tail) is consistent with a single
skipped gate draw.

## Hallucinations / overclaim

None on the mechanism. The only overstatement is the repeated `:1514`
cite (above). "Only rn2(5) in postmov" holds for the ported gate path.
The Next-bullet `mons()` 383-vs-394 audit note is properly fenced as
follow-up, not this unit.

## Density

Cliff §10.18: distfleeck-head writer, one line the code itself had
marked deferred, own `Ledger:` entry ✓. Two full-session PASSes from
one line (one on each owner family) with the 5 residuals per-session
scoped (named draws/owners). Per-function verdict ACCEPT → SHA ACCEPT.

## Verification

- Added-code grep: clean.
- Rule #2: clean this iteration (see 2445).
- `node --test scripts/postmov-mintrap-ptr-refresh.test.mjs`: 1/1 pass.
- Re-measure (mine, `--base 4f670fdff~1 --reach-all`, current code):
  `m_move`: **1 PASS (desc-Tou-94007, exact), 0 moved, 2 unchanged
  (sokoban pair), 0 worse → PROGRESS**; `reach m_move`: **684/684, 0
  regressed → REACH-OK**; `distfleeck`: **3 PASS (94335 exact +
  2 longruns via later D-3567), 0 moved, 1 unchanged (Wiz-94142@96),
  0 worse → PROGRESS**; `reach distfleeck`: **744/744, 0 regressed →
  REACH-OK**. Both D-3566 PASS claims durable. No REGRESSED.

## Actionable C-wrongs

None (the `:1514`→`:1517` cite correction rides the next touch of
those lines; not queueable as Must-fix).

Verdict: **ACCEPT**
