# Review 2645 — 96439ea60 — shudder rehumanize drain (D-3781)

Metadata. SHA `96439ea60` (2026-10-10), D-3781, parent
`a72a653d4`. js diff: `js/polyself.js` +6/−1 (one
drain call + import) +
`scripts/polyself-shudder-rehumanize-drain.test.mjs`
(new). Ledger: `polyself` ported-note. Works the
cliffs row-2 (exercise; row-1 randomize exhausted).

## Intent vs deliverable

Promise: 95346@474 — poly shudder's losehp drops
mh<1; C rehumanizes synchronously inside losehp so
:493 exercise(A_CON) draws with Upolyd false, while
JS exercised with stale Upolyd true (attrib.c:496
gate → no draw). Fix: drain finish_maybe_wail in C
order between losehp and the done gate.

Diff delivers exactly that call. Promise and diff
match. ALREADY edge (hack.js already imported).

## Inventory

Changed JS (1 writer, 1 arm):

- polyself shudder arm — `js/polyself.js:2032–2045`.
  C: `polyself.c:488–496` (shudder :491, losehp
  :492, exercise :493, return :494 — read).
  Callee `finish_maybe_wail` (`js/hack.js:1997`,
  LIVE: showdamage→rehumanize→wail, each
  flag-gated — read); `rehumanize`
  (`js/polyself.js:1226`, handles post-revert
  uhp<1 via done(DIED) — read).

## C ↔ JS fidelity

**Drain C-exact.** C's losehp tail is synchronous
(damage → mh<1 revert → death), so :493 always
reads settled Upolyd; JS now settles before
exercising. Death orders preserved: revert-death
runs inside the drain (rehumanize's own done),
human-fatal still hits the done gate below
(`needs_done || gameover` → finish_losehp_done).
The Upolyd exercise gate (`js/attrib.js:496`,
read) is why the stale bit skipped exactly C's
rn2(2). Non-issue noted: exercise has no gameover
guard, so a true-death shudder draws a trailing
rn2(2) C never draws — unobservable (terminal
step), pre-existing, not this diff. No symbol
deleted or re-pointed, so no sym.mjs paste is owed.

## Hallucinations / overclaim

None. Diff grep: zero hits. The "same-step
re-attribution" is labeled as such with a
quantitative row diff (rngM +1944, scrM 477→745,
toplines identical), not sold as a later step —
and the new HP 18-vs-19 divergence is honestly
left as its own future writer (Named-2).

## Density

Cliff-phase §2b: one row, one writer arm, no
bundling. 95346 exercise@474 → do_statusline2@474
with +1944 RNG — genuine movement (owner changed,
stream advanced), tool-graded PROGRESS.

## Verification

D-log Verify: exercise 1 moved (re-attributed);
reach 80/80 + 27/27; gates + cohort PASS.

Re-measured by this audit (`verify
exercise,polyself --base 96439ea60~1 --reach-all`):

```text
verify exercise: 0 PASS, 1 moved past (1 re-attributed at the same step), 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Healer-95346: moved → do_statusline2 at step 474 (was 474)
reach exercise: 962 PASS, 0 regressed → REACH-OK
verify polyself: […] vacuous […]
reach polyself: 27 PASS, 0 regressed → REACH-OK
```

Matches the D-log exactly; full 962/962 reach, 0
regressed — supersedes the spread.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
