# Review 2590 — 6b1d1abec — melt_ice Underwater recalc gate

SHA: `6b1d1abec` (D-3720). Underwater-idiom family residual, 1 gate,
`js/zap.js` only (+2/−1). Ledger: melt_ice ported.

## Intent vs deliverable

Promise: C recalcs vision when the hero is submerged (:5059–5060); JS
read dead-false sticky `u.Underwater` → gate reads live
`(u.uinwater | 0)`. Diff actually adds: the one-condition rewire +
C-cite comment. Promise matches diff.

## Inventory

- `melt_ice` (js/zap.js:985 gate) ↔ C
  nethack-c/upstream/src/zap.c:5039–5079 (csym range), gate :5059–5060.

## C ↔ JS fidelity

C `:5059–5060` `if (Underwater) vision_recalc(1);` confirmed verbatim,
with Underwater ≡ youprop.h:279 (verified 2585). JS now
`if ((game.u?.uinwater | 0)) vision_recalc(1);` — D-3400 idiom, same
expression as the js/zap.js:6951 sibling (confirmed above). The gate's
call envelope matches C order on both sides (trap_ice_effects →
obj_ice_effects → unearth_objs → gate → newsym → Norep), and the JS
`trap_ice_effects(x, y, true)` / `obj_ice_effects(x, y, false)` flags
match C's TRUE/FALSE. Recalc timing only: `vision_recalc` draws no
RNG, so the "no RNG delta" claim holds structurally. No helpers, no
imports, no STUB. Residual check: `grep -n Underwater js/zap.js` →
4 hits: :966 envelope comment, :985 the new comment, :1198 a comment
quoting C, and :2883 the known surface_zap clone (named successor
lead) — the only remaining live sticky read in this file. The focused
test file exists
(scripts/melt-ice-underwater-gate.test.mjs, 73 lines, shipped in this
SHA).

## Hallucinations / overclaim

None. D-log states the vacuous verify plainly.

## Density

One whole gate + focused test (1/3 → 3/3 claimed) + ledger + verify on
an empty queue. Right-sized; successor leads (surface_zap clone et al.)
named with the brief pointer.

## Verification

Re-measured: `verify melt_ice --base 6b1d1abec~1 --reach-all` → 0
blocked (vacuous, as stated) + `smoke: 24 run, 24 PASS, 0 regressed →
REACH-OK`. Matches the D-log. Rule #2 clean (no imports touched). Diff
grep FORCE/DIAG/RNG/coords: no hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
