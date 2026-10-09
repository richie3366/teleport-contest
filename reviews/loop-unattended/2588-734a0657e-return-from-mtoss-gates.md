# Review 2588 — 734a0657e — return_from_mtoss Deaf + Underwater gates

SHA: `734a0657e` (D-3718). Deaf-macro/Underwater-idiom residual, 1
function × 3 gates, `js/mthrowu.js` only (+9/−3). Ledger:
return_from_mtoss ported.

## Intent vs deliverable

Promise: C gates land/thud You_hear on `!Deaf` (:909/:918) and
Splash!/Plop! on `!Deaf && !Underwater` (:952); JS read raw `u.Deaf`
(dead false) + sticky `u.Underwater` (dead false) → all three gates
call `hero_Deaf()`, Splash gate reads live `u.uinwater`. Diff actually
adds: three gate rewires + C-cite comments. No helpers, no imports.
Promise matches diff.

## Inventory

- `return_from_mtoss` (js/mthrowu.js:1074 land / :1089 thud / :1137
  Splash gates) ↔ C nethack-c/upstream/src/mthrowu.c:849–965 (csym
  range). All three gate line cites verified exact against pinned C
  (:909, :918, :952 — counted from the verbatim bodies above).

## C ↔ JS fidelity

All three C gates confirmed verbatim: `} else if (!Deaf) { You_hear(
"%s land near %s."…` / `"…hit %s with a thud!"…`, and `if (!Deaf &&
!Underwater)` guarding the `is_pool || (is_lava && !is_flammable)` →
`Soundeffect` + `Splash!/Plop!` block. JS now: `else if
(!hero_Deaf())` ×2 with the same live-You_hear emits (message strings
untouched, pre-existing), and `if (!hero_Deaf() && !(uinwater|0))`
with the pool/lava arm untouched. `hero_Deaf` (monmove.js:1197,
verified 2582) + D-3400 live-bit idiom; both dead-code disjuncts
disclosed. Soundeffect :953 stays a live no-op call (faithful
empty-macro port, disclosed). Catch/damage/place path untouched — the
"no RNG delta" claim holds structurally (`rn2(2)`/`rnd(3)` sit outside
the gates).

## Hallucinations / overclaim

None. D-log states the vacuous verify and the three-gate scope
plainly; the Unaware-dream delta analysis matches the live-You_hear
inner-gate semantics used across the family.

## Density

One function, three same-family gates, one focused test (3/10 → 10/10
claimed) + ledger + verify on an empty queue. Right-sized; successor
(light predicate in the same function) named.

## Verification

Re-measured: `verify return_from_mtoss --base 734a0657e~1 --reach-all`
→ 0 blocked (vacuous, as stated) + `smoke: 24 run, 24 PASS, 0
regressed → REACH-OK`. Matches the D-log. Rule #2 clean (no imports
touched). Diff grep FORCE/DIAG/RNG/coords: no hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
