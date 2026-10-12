# Review 2713 — a98ee8462 — drinkfountain fatal-sip drains (D-3852)

Metadata: SHA `a98ee8462`, D-3852, cliffs-head `hack.c` losehp
writer (case-21 juice losehp never drained done()). JS:
`js/fountain.js` (2 imports + both case-21 arms drain in C
order). Test: `scripts/drinkfountain-fatal-juice.test.mjs`
(new, runSegment pin of the C step-536 topline).

## Intent vs deliverable

Promise: Rogue-578205@536 — a fatal PoisRes sip set gameover
+ _losehp_needs_done and JS fell through to the dryup prompt
with the death pending, skipping «You die...», lifesave and
dryup order; drain fatal → finish_losehp_done (true death
returns, wizard lifesave breaks to the dryup tail), else
finish_maybe_wail; gate the non-PoisRes arm the same way
after poison_strdmg; session moves 536→1211. Diff actually
does that. Match.

## Inventory

- PoisRes arm (fountain.js:828): after losehp(rnd(4), …):
  `if (_losehp_needs_done) { await finish_losehp_done(); if
  (gameover) return; } else { await finish_maybe_wail(); }`,
  then break. C: fountain.c `:299–304` (pline + losehp +
  break) + losehp `:4283–4292` (fatal → urgent_pline + done
  noreturn; else-if low HP → maybe_wail) + switch tail
  `:390` dryup(TRUE) — all read.
- Non-PoisRes arm (:847): after poison_strdmg: gameover →
  return (losestr drains its own death, D-3782); same oil
  drain; then exercise(A_CON,false). C `:305–309` (read).
- Imports: finish_maybe_wail joins the existing `./hack.js`
  static import; finish_losehp_done static from `./end.js`.
  `sym.mjs`: both ASYNC, both awaited. Caller potion.c:546 →
  js/potion.js:2458 pre-wired (D-3833).

## C ↔ JS fidelity

Order-for-order confirm. Fatal PoisRes sip: C losehp never
returns (done(DIED)) — JS returns on gameover, skipping the
dryup tail exactly as C's noreturn does. Wizard lifesave: C
resumes past done() → break → `:390` dryup — JS breaks to
the post-switch `await dryup(u.ux, u.uy, true)` (fountain.js
:941, read). Non-fatal: C's `else if (n>0 && uhp*10<uhpmax)
maybe_wail()` is the else-branch wail drain. Non-PoisRes:
C poison_strdmg is noreturn-when-fatal (losestr/losehp
inside), so exercise runs only on survival — JS matches
with the gameover return before exercise. Edge claims check
out stronger than stated: `imports.mjs --can` → ALREADY for
both `./hack.js` and `./end.js` (no new edge at all, not
just "IN-SCC like potion.js").

## Hallucinations / overclaim

None. The C-screens-533–540 timeline is a measured recording
read, and the focused test's pre-fix red
('Dry up fountain? [yn] (n)' where C has 'You die...--More--')
reproduces the exact probe symptom. Standing case-29 omit is
correctly scoped to another arm.

## Density

Cliff-phase: parent HEAD was losehp (1 block, first 536 —
verified in 9a973377e queue); the divergence names the
caller writer and the 2026-09-14 drinkfountain park is
correctly distinguished (different session/arm). Ledger:
drinkfountain partial + D-3852. Reached: probe moved
536→1211 at ship (re-measured below at PASS — D-3853 moved
it again).

## Verification

js-hunk grep: 0 hits. Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify losehp --base a98ee8462~1
--reach-all` → `1 session(s) blocked on it (1 at baseline, 0
in the working scoreboard)`, Rogue-578205 PASS, `1 PASS,
0 moved past, 0 unchanged, 0 worse → PROGRESS`; smoke 24/24
REACH-OK (no RNG-tagged reach). Zero regressed. The movement
claim holds (strictly later than claimed — now PASS).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
