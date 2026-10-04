# Review 2363 — c7fcf5bd7 — impossible audit + m_initgrp appear drain (D-3410)

- SHA: `c7fcf5bd7` — "Open head: impossible audit + m_initgrp group-member appear drain (D-3410)."
- D-entry: D-3410. Diff: js/makemon.js (+40/−0, two hunks); ledger
  makemon/pline/wizcmds; journal + index + queue + scoreboard header.
- Scope: 2 functions (m_initgrp, impossible) — whole Method per function.
- `sym.mjs`: nothing deleted or re-pointed this SHA (new queue const +
  drain prologue only) — no paste obligation.

## Intent vs deliverable

Promise: (1) mid-game group-member appear-Noreps via a primary-tagged
queue drained members-first by makemon_appear_msg, C order, no cascade;
(2) impossible audited whole modulo Rule #2 omits; (3) ledger: shared
m_initgrp clause retired on 3 rows, "makemon keeps its verified
remainder (m_dowear F&F :3761, starting-pet)", "wiz_show_nhuuid
corrected to its nhuuid clause", sanity_check clause dropped as
paste-error.
Delivers: (1) and (2) exactly. (3) is FALSE on disk for two rows (see
Actionable 1): makemon's and wiz_show_nhuuid's omit fields carry
"- `m_initgrp`: none — whole.", not their D-log-named remainders.

## Inventory

```text
m_initgrp  | ported  | js/makemon.js:m_initgrp  | C makemon.c:78-145 (csym)
impossible | partial | js/display.js:impossible | C pline.c:583-634 (csym)
```

Ledger entries present for both + makemon/wiz rows touched; Left open
none (true — no manifest; coverage-row iter).

## C ↔ JS fidelity

- `m_initgrp` WHOLE + faithful drain. Body vs C :78-145: `rnd(n)` once
  (RNG call-for-call), ulevel tuning divide (trunc ≡ C int div, positive
  operands), `if (!cnt) cnt = 1`, peace_minded skip, enexto_gpflags,
  nested `makemon(data, mm.x, mm.y, mmflags|MM_NOGRP)`, mpeaceful=0,
  mavenge=0, set_malign — every line. HPUX blocks :87-120 compiled out
  (verified ifdef). Queue push: `!in_mklev` gate ≡ C :1476
  `if (!gi.in_mklev)`; recorded flags `mmflags|MM_NOGRP` ≡ the nested
  call's. Drain: members-before-primary ≡ C (nested makemon completes
  :1476-1504 before the outer primary's own block); contiguity holds
  (one m_initgrp per makemon, C :1430-1440 if/else-if); stale-prefix
  drop only fires for primaries whose own message is missing too
  (disclosed pre-existing gap). Deferral is RNG-safe: the deferred block
  draws nothing — mhidden_description (no rn2/rnd/rn1/Hallu in
  pager.c:186-280), dochugw(FALSE) (monmove.c:203-238, `rd=0`, no draws),
  canseemon/sensemon/Amonnam/Norep/newsym all draw-free — so running it
  after the primary's inventory RNG cannot diverge the keystream.
  Message content reuses the 2362-verified makemon_appear_msg.
- `impossible` partial CORRECT. vs C :583-634: recursion panic → throw
  (JS Error idiom), vsnprintf+chop at BUFSZ-1 (prefix chop exact),
  fuzzer_panic → throw pre-pline, URGENT pline + reset, sanity early
  return + latch reset, disorder/worth-saving/DEVTEAM/support lines
  (support `!= null` ≡ C non-NULL pointer test), latch `= 0` tail.
  Omits legitimate: :598 paniclog is filesystem; :621-631 CRASHREPORT
  block is dead-gated on contest builds (CRASHREPORTURL commented out
  in sys/unix/sysconf → crashreporturl NULL) with a network submission
  tail — Rule #2, named. `partial` + "audited D-3410: remaining omit
  cannot ship" is the accurate certification (not a `ported` overclaim).
- Ledger-side code claims verified: m_dowear F&F real at
  js/makemon.js:3761 (`m_dowear(mtmp, true)` un-awaited, C :1445);
  sanity drop justified (zero `sanity_check` in makemon.c; the clause
  lives on sanity_check's own row); nhuuid omit documented at
  js/wizcmds.js:2275-2278. All true — and none of it is in the rows.

## Hallucinations / overclaim

- "makemon keeps its verified remainder (m_dowear F&F :3761,
  starting-pet)" — the row omit is "- `m_initgrp`: none — whole."; the
  remainders have no row home. FALSE.
- "wiz_show_nhuuid corrected to its nhuuid clause" + row note "true
  omit replaces the D-3409 m_initgrp paste-over" — the row omit is
  "- `m_initgrp`: none — whole.". FALSE.
- This is the second consecutive iter stamping one clause across rows:
  D-3409 pasted the m_initgrp clause into 3 rows (docs-only, out of
  scope, but 2362.1's prescription — m_dowear/starting-pet/nhuuid homes
  — was never written); D-3410 pasted the m_initgrp whole-claim into 2
  rows. The finish-recording path, not the author, is the suspect.

## Density

Two-function iter, no manifest (coverage rows, operator override — not
a batch-cap matter). Per-function Ledger entries + Verify line present.
m_initgrp ACCEPT; impossible ACCEPT. SHA verdict = QUALITY-RISK via the
ledger remainder homes (message-named remainders missing from the map,
2362.1 family — still open after two iters).

## Verification

- Re-measured both fns in one call (`--base c7fcf5bd7~1 --reach-all`):
  m_initgrp 0 blocked (vacuous, as D-logged) + reach 167/167 PASS →
  REACH-OK (stronger than the D-log's 80-spread); impossible 0 blocked
  + smoke 24/24 → REACH-OK. 0 regressed, 0 worse. Claims hold.
- `imports.mjs --rulecheck`: "Rule #2 clean" (whole scored tree).
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate gates.
- Scoreboard hunk is header-only (commit/at/full:false) — no row edits.

## Actionable C-wrongs

1. D-3410 ledger remainder homes missing (2362.1 still open) —
   makemon row omit := "- `m_initgrp`: none — whole." must become the
   D-3410 Named text: m_dowear fire-and-forget (makemon.c:1445; sync
   level gen, js/makemon.js:3761) + starting-pet in_mklev
   observable-match (dog.js makedog awaits no appear msg); wiz_show_nhuuid
   row omit := "- `m_initgrp`: none — whole." must become the nhuuid-value
   clause (platform get_nhuuid; JS prints game.svn?.nhuuid ?? '',
   js/wizcmds.js:2275-2278); refresh m_initgrp's stale D-3409 note on the
   now-ported row. Fix in one iter: direct `ledger.mjs set` ×3 (NOT via
   finish-iteration — two iters prove it stamps one clause across rows;
   verify each sub-omit still unshipped first) + `hidden-proxy verify`
   on the 3 rows. Source: reviews/loop-unattended/2363-c7fcf5bd7-m-initgrp-drain.md

Verdict: **QUALITY-RISK**
