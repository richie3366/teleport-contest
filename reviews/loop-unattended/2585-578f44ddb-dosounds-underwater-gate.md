# Review 2585 — 578f44ddb — dosounds EOT-gate Underwater arm

SHA: `578f44ddb` (D-3715). Underwater-idiom family residual, 1
function, `js/sounds.js` only (+3/−1). Ledger: dosounds ported.

## Intent vs deliverable

Promise: C gates every ambient EOT roll on
`Deaf || !acoustics || uswallow || Underwater` (:208) with Underwater ≡
`u.uinwater`; JS read the sticky `u.Underwater` flat (dead false) → gate
now reads live `(u.uinwater | 0)`. Diff actually adds: the one-disjunct
rewire + C-cite comment. No helpers, no imports. Promise matches diff.

## Inventory

- `dosounds` (js/sounds.js:839 gate) ↔ C sounds.c dosounds `:202–339`
  (D-log range; csym header truncated in my read but the gate below is
  verbatim), EOT gate :208. C caller allmain.c:352 (moveloop EOT).

## C ↔ JS fidelity

C :208 `if (Deaf || !flags.acoustics || u.uswallow || Underwater)
return;` confirmed verbatim from pinned C above; youprop.h:279
`#define Underwater (u.uinwater)` confirmed verbatim. JS now:
`Deaf || acoustics===false || u.uswallow || (u.uinwater | 0)` — all
four disjuncts match C order and sense (inline Deaf expression is the
HDeaf|EDeaf|uroleplay.deaf|dead-u.Deaf set, same as the canonical
reader). "Zero writers" claim verified: `grep '\.Underwater *=' js/`
returns nothing, so the old disjunct was dead-false and the delta is
exactly the submerged hero: C stays silent (no rn2(400)/rn2(300)/…
draws), old JS drew and printed. Direction of fix is C-ward. Same-file
check holds: the only other water read (js/sounds.js:1954) already
takes the live bit.

## Hallucinations / overclaim

None. D-log discloses "no corpus divergence" and an RNG delta, names
the reach line, and correctly scopes other-C-file readers as separate
rows.

## Density

One whole gate + focused test (1/3 → 3/3 claimed) + ledger + verify on
an empty queue, with a briefed successor row. Right-sized.

## Verification

Re-measured stronger than the D-log's 80-spread: `verify dosounds
--base 578f44ddb~1 --reach-all` → 0 blocked (vacuous, as stated) +
`reach: 729 baseline-PASS reach, 729 run: 729 PASS, 0 regressed →
REACH-OK`. No REGRESSED session from the RNG-delta change. Rule #2
clean (no imports touched). Diff grep FORCE/DIAG/RNG/coords: no hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
