# Review 2572 — 1f526fb1e — m_move door You_hear arms (D-3702)

## Metadata

- SHA: `1f526fb1e2e4dc9b8ce60d4446d6dbc99288e390` (2026-10-09, D-3702)
- Scope: ≤10-function cliff-phase refill — whole Method on the 4 arms
  (`mb_trapped` + `postmov`, riding `m_move`'s ledger omit)
- Diff: `js/monmove.js` +9/−5, new
  `scripts/monmove-you-hear-doors.test.mjs` (157 lines), ledger `m_move`
  omit (1) retired, stays partial on omit (2)
- Context: supervisor-ordered map refill; queue empty, batch no gap
  (D-3699…D-3701 refill precedent)

## Intent vs deliverable

Subject promises: the four unseen-door-message arms called plain
`pline('You hear …')`, dropping You_hear's inner gates; switch all four
to the live `You_hear` export in C order with cites; outer
`!hero_Deaf()` macro gates untouched. The diff delivers exactly that: one
import-name add, four 2-line emit swaps. No other `js/` touched. Promise
matches deliverable.

## Inventory

- `mb_trapped` (`js/monmove.js:1322`): 1 arm. `postmov` (`:1776–1814`):
  3 arms. No new JS function, no helper added.
- Callee: `You_hear js/hack.js:193 ASYNC` — single definition, no clones;
  awaited at all four sites (sym.mjs: "ASYNC — await required" honored).
- `imports.mjs --can js/monmove.js js/hack.js You_hear` →
  `ALREADY: monmove.js already statically imports hack.js. No new edge
  needed.` — subject's claim confirmed verbatim. Nothing deleted or
  re-pointed.

## C ↔ JS fidelity

C loci (`csym.mjs mb_trapped`): `monmove.c:52–74`; postmov door arms at
`:1565–1617`. All four sites verified against pinned lines:

- `:59–61`: `else if (!Deaf) You_hear("a %s explosion.", mdistu>49 ?
  "distant" : "nearby")` — JS: same outer `!hero_Deaf()`, `dist2>7*7`
  (pre-existing ≡ mdistu), `You_hear('a %s explosion.', far ? 'distant' :
  'nearby')`. Format + arg order exact. ✓
- `:1571–1572`, `:1588–1589`, `:1613–1614`: `else if (!Deaf) You_hear("a
  door …")` ×3 — JS strings byte-identical, same ladder position after
  the pline_mon/You_see arms. ✓
- Callee fidelity: C `You_hear` (`pline.c:436–452`) gates `(Deaf &&
  !Unaware) || !flags.acoustics → return`, then Underwater → "You barely
  hear ", Unaware → "You dream that you hear ", else "You hear ", via
  YouPrefix+strcat+vpline. JS (`js/hack.js:193–207`) mirrors all of it,
  including the vpline-as-va_list shape (D-2941 pattern) and the
  acoustics explicit-false reading of the On default. LIVE, faithful. ✓
- Gate order: outer `!Deaf` (D-3572 macro, untouched) excludes Deaf heroes
  — even Unaware ones — before You_hear's inner `(Deaf && !Unaware)`
  gate; Unaware non-Deaf now reach the dream prefix exactly as in C.
  The commit message's gate-order paragraph is correct.
- RNG: none drawn either side (message-only). Branch-by-branch confirm.
- Ledger framing: `postmov` is C `staticfn` (`monmove.c:1454`), hence no
  own ledger row — riding `m_move`'s omit (1) is the right shape, and the
  omit text named "the four arms", all four now wired. Nit (not a
  C-wrong): `mb_trapped`'s own `ported` row could have taken a D-3702 tag
  for the improved emit — next port iter folds it into real work.

## Hallucinations / overclaim

None. The D-log opens "no corpus divergence — C-fidelity residual" and
claims no movement. Omit (2) (raw-`u.Deaf` reads in other C files' ports)
is honestly kept with a same-file residual (`You_hear_yell` clone,
D-2941-named) disclosed rather than silently shipped.

## Density

Legitimate refill under the D-3699 precedent: one C family,
`js/monmove.js` only + its test, named omit retired with the remainder
kept on the ledger row (stays partial — correct, not padded to ported),
focused 6/12→12/12 with the staging story told. Not a no-op, no bundling.

## Verification

- Focused test: `node --test scripts/monmove-you-hear-doors.test.mjs` →
  12/12 pass (ran here; D-log's 6/12 pre-fix split is plausible staging).
- Re-measure (`verify m_move --base 1f526fb1e~1 --reach-all`): 0 blocked
  at baseline (matches the D-log); `reach m_move: 825 baseline-PASS
  session(s) reach it (825 run, 337.6s): 825 PASS, 0 regressed →
  REACH-OK` — full reach, far stronger than the D-log's 80-run spread.
  Zero regressions.
- Hygiene: diff greps clean; Rule #2 clean per the iteration
  `imports.mjs --rulecheck` (review 2568).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
