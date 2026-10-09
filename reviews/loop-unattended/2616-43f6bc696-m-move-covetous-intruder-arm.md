# Review 2616 — 43f6bc696 — m_move covetous-intruder arm (D-3749)

Metadata. SHA `43f6bc696` (2026-10-09), D-3749, parent
`fc05190da` ([measure] D-3748). js diff: `js/monmove.js`
+31/−0 — the covetous block inside m_move
(`js/monmove.js:2169–2198`). Ledger: `m_move` partial
(omit rewritten). Works its HEAD's cliffs head (`mhitm.c`
mattackm, 4 blocked: 95309, 95216, 95235, 95237 — verified
in the parent queue; owner proven already-whole in D-3748,
writer measured by temp-C dump).

## Intent vs deliverable

Promise (subject + D-log): all 4 probes diverge at C
`rnd(20) @ mattackm(mhitm.c:441)` via the covetous `:1794`
caller — C fights the intruder on the goal, JS falls
through to dochug/distfleeck. Insert the `:1778–1800`
block in C order (after mtame, before shk/gd/priest):
`is_covetous` → goal read → intruder gate → bhitpos /
notonhead stamps → mattackm → AGR_DIED→DIED → postmov
MOVED. Zero new imports.

Diff actually adds exactly that block. Promise and diff
match. No signature change, no caller edits.

## Inventory

Changed JS (1 site):

- m_move covetous block — `js/monmove.js:2169–2198`.
  C: `monmove.c` m_move covetous `region :1778–1802`
  (verified in the printed body: goal read `:1781–1783`,
  intruder gate `:1788–1791` with 5.0 `dist2 ≤ 2`, stamps
  `:1792–1793`, attack `:1794`, AGR_DIED `:1796–1797`,
  postmov MOVED `:1798–1800`), preceded by the wormno
  goto `:1769–1770` and the mtame return `:1772–1776`,
  followed by shk/gd/priest `:1804+`.

## C ↔ JS fidelity

**Branch-for-branch confirm.** `is_covetous(ptr)` gate ✓.
Goal read: C takes `mtmp->mgoal.x/y` from a zeroed struct;
JS `mtmp.mgoal?.x | 0` defaults unset to (0,0) and `isok`
rejects it — same gate-negative behavior as C's
measured goal=(0,0) negatives ✓. Intruder lookup
`isok ? m_at : null` mirrors `:1783` ✓. Gate keeps C's
short-circuit order (`intruder && !== mtmp && dist2 ≤ 2`,
5.0 `≤ 2` admitting diagonal adjacency) ✓. Stamps
(`bhitpos.x/y`, `notonhead = mx!==tx || my!==ty`) match
`:1792–1793` and the live in-file `m_move_aggress` idiom
✓. `await mattackm` (async export `js/mhitm.js:6209`,
verified via sym.mjs) ✓; `& M_ATTK_AGR_DIED → MMOVE_DIED`
matches the 5.0 fix `:1796–1797` ✓; else postmov with
MMOVE_MOVED in the same arg order as the neighboring
mtame arm ✓. Placement exact: after mtame, before shk.

**Callees all LIVE, already imported** (verified by grep:
`is_covetous` :10, `mattackm` :32; `m_at`/`isok`/`dist2`
pre-existing). No clones, no stubs, no new imports.

**Named omits honest.** (1) The wormno early-goto
`:1769–1770` is real C, named in the D-entry and the
ledger omit, with a falsifier; worms are never covetous
so this arm is unaffected — true scoping. (2) The
pre-existing raw-`u.Deaf` omit "stands" per the D-log.

**Ledger-text slip (observation, not a C-wrong):** the
ledger row's `omit` field now carries only (1) — the
(2) raw-`u.Deaf` text was dropped while the D-entry says
it stands, and raw `.Deaf` reads are still live in `js/`
(`apply.js:1799,3274` e.g.). The D-entry is the durable
record so nothing is lost; the next port iter should
restore the clause with one `ledger.mjs set` inside a
real iteration (playbook §2: never a row).

## Hallucinations / overclaim

None. The writer mechanism is temp-C measured (D-3748),
not inferred; the "C fights, JS flees" symptom matches
the recorded draws. Diff grep (FORCE / DIAG / getRngLog
/ fastforward / seed / coords): zero hits. No symbol
deleted or re-pointed, so no `sym.mjs` paste required.
Rule #2: global re-check this audit → clean.

## Density

Cliff-phase §2b: parent head is mattackm (4 blocked, RNG
lost 84556); this commit ships the measured writer whole
for its arm, moves all 4 probes (1 FULL PASS at ship),
names the one real deferral. Follows the single
legitimate [measure] iteration for this owner. One cliff,
one C locus, no bundling. Correct gates (green/strict/
cohort + full 44/44 auto on the shared file).

## Verification

D-log Verify (`verify.mjs --fn m_move,mattackm`):
mattackm 1 PASS + 3 moved + 0 + 0 → PROGRESS (95309
617→839 do_statusline2, 95216 726→934 fumaroles, 95235
PASS, 95237 394→529 next_ident); reach 80/80 + 80/80
spreads → REACH-OK; green/strict/cohort PASS; full 44/44.

Re-measured by this audit (`verify m_move,mattackm
--base 43f6bc696~1 --reach-all`; HEAD code includes 7
later SHAs, so later movement is expected):

```text
verify mattackm: 2 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS
reach m_move: 889 baseline-PASS session(s) reach it (889 run, 414.0s): 889 PASS, 0 regressed → REACH-OK
reach mattackm: 338 baseline-PASS session(s) reach it (338 run, 219.1s): 338 PASS, 0 regressed → REACH-OK
```

95237 is now FULL PASS under later SHAs; 95309/95216 sit
exactly where named. Full (non-spread) reach on both
functions: 1227 sessions, 0 regressed. No vacuous check
(row cited 4; all 4 itemized).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
