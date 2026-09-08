# Review 1108 — d850333f — find_roll_to_hit encumbrance/utrap (D-2142)

Metadata: SHA `d850333f`, `js/uhitm.js` only (+7/−2 in `js/`, +1 import).
Queue row fired: Open `uhitm.c passive` (scen-poly-Archeologist-92226 step 107).
No prior review claimed closed.

## Intent vs deliverable

Subject promises encumbrance + `utrap` penalties in `find_roll_to_hit`
(C `uhitm.c:407–411`) to explain a same-die flipped to-hit verdict.
Diff delivers exactly that: `near_capacity` joins the existing
`invent.js` edge plus two penalty lines in C order.

## Inventory

- `find_roll_to_hit` (changed): + `near_capacity()` penalty, + `u.utrap` penalty.
- Import: `near_capacity` added to existing static `invent.js` edge.

## C ↔ JS fidelity

C `uhitm.c:362–427`: `tmp = 1 + abon() + find_mac + uhitinc + luck + maybe_polyd`;
monster-state adds; monk/orc role arms (`:398–405`); encumbrance
`if ((tmp2 = near_capacity()) != 0) tmp -= (tmp2*2)-1;` + `if (u.utrap) tmp -= 3;`
(`:407–411`); weapon arms after. All adds are commutative, so JS placing
the two new lines before the (deferred, absent) monk/orc arms changes
nothing arithmetically. `if (cap)` ≡ C `!= 0`; `cap*2-1` matches
`(tmp2*2)-1`; `if (u.utrap) tmp -= 3` exact. `near_capacity` is LIVE
(`js/invent.js:1028`, sync export, `sym.mjs` confirms). No RNG in this
function, so no draw-order risk. Monk-armor / orc-vs-elf stay
named-deferred in map `turns.md:3336`, untouched by this path — legitimate
named omits, and the corpus session (polymorphed, encumbered) does not
reach them. `imports.mjs --can`: ALREADY, no new edge. Branch-by-branch
confirm for the shipped lines; no gap.

## Hallucinations / overclaim

None. D-log says "PROGRESS ... moved past", not PASS; subject says
"monk-armor / orc-vs-elf stay named-deferred". Accurate. No dispatch-vs-stub
shape — the callee (`near_capacity`) is live.

## Density

~9 `js/` insertions for a 5-line C locus — below the ~40-line soft floor,
but C is that small (the whole arm is two `if`s), so this is the
allowed small-locus exception, not a waste split.

## Verification

D-log Verify bullet cites `verify.mjs --fn passive` → PROGRESS
(Archeologist-92226 moved 107 → hurtle_step 110) + green/strict/cohort +
full 44/44. Re-measured myself:
`hidden-proxy.mjs verify passive --base d850333f~1` →
`0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
(scen-poly-Archeologist-92226: moved → hurtle_step at step 110, was 107).
Matches the claim exactly — forward movement, no regression.
`imports.mjs --rulecheck`: Rule #2 clean. No FORCE/DIAG/seed/coordinate
gates in the diff.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
