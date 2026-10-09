# Review 2583 — 2c598e80b — hit_bars barsound Deaf-macro gate

SHA: `2c598e80b` (D-3713). Omit-2 family residual, 1 function,
`js/mthrowu.js` only (+3/−1). Ledger: hit_bars ported.

## Intent vs deliverable

Promise: C gates the barsound pline on plain `!Deaf`; JS read raw
`u.Deaf` plus invented `|| acoustics===false` → gate now calls
`hero_Deaf()`, acoustics disjunct dropped. Diff actually adds: the gate
rewire + C-cite comment. No new helpers, no new imports. Promise
matches diff.

## Inventory

- `hit_bars` (js/mthrowu.js:1715 gate) ↔ C
  nethack-c/upstream/src/mthrowu.c:1416–1495 (csym range), barsound arm
  :1447–1470, gate :1447. C callers hack.c:2013 + mthrowu.c:1554
  (unchanged by this diff; signature untouched).

## C ↔ JS fidelity

C :1447 `if (!Deaf)` confirmed in the body above; `Deaf` ≡
youprop.h:125 macro (verified in review 2582). No acoustics arm in C.
The barsounds table (`"", Whang, Whap, Flapp, Clink, Clonk`) and the
bsindx chain (boulder/iron-ball → 1, harmless → 2, flimsy → 3, coin/
gold/silver → 4, else 5) are identical both sides; `Soundeffect`
:1466 stays named per family convention, disclosed. JS
`if (!hero_Deaf())` is the canonical live reader (monmove.js:1197,
verified 2582; dead-code `|| u.Deaf` disjunct disclosed). Noise/wake
path (`noise = 4*4`, break-bars `rn2`) sits outside the gate and is
untouched — the "no RNG delta" claim holds structurally. Nit (not a
C-wrong): the new comment reads "youprop.h:125 H (HDeaf || …" — a
stray "H" typo; cites still resolve.

## Hallucinations / overclaim

None. D-log states "no corpus divergence" and the fixed-smoke-spread
reach line, both accurate.

## Density

Same shape as 2582: one whole gate, focused test (1/5 → 5/5 claimed),
ledger + verify in one handoff on an empty queue. Right-sized.

## Verification

Re-measured: `verify hit_bars --base 2c598e80b~1 --reach-all` → 0
blocked at baseline (vacuous, as stated) + `smoke hit_bars: no
RNG-tagged reach; fixed smoke spread 24 run: 24 PASS, 0 regressed →
REACH-OK`. Matches the D-log Verify bullet. Rule #2 clean (2582 scan
covers scored `js/`; this diff adds no imports). Diff grep
FORCE/DIAG/RNG/coords: no hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
