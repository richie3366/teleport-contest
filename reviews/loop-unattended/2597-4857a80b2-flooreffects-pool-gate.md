# Review 2597 — 4857a80b2 — flooreffects pool Splash/Plop gate

SHA: `4857a80b2` (D-3727). Underwater-idiom family residual, 1 gate,
`js/do.js` only (+3/−1). Ledger: flooreffects ported (D-3240
stands).

## Intent vs deliverable

Promise: C stays silent on Splash/Plop for a submerged hero
(do.c:277); JS read dead-false sticky `u.Underwater` → gate
reads live `(u.uinwater | 0)`. Diff actually adds: the
one-gate rewire + C-cite comment. Promise matches diff.

## Inventory

- `flooreffects` (js/do.js:774, async) ↔ C
  nethack-c/upstream/src/do.c:161–359 (csym range), pool arm
  :271–287, gate :277.

## C ↔ JS fidelity

C `:274–282` confirmed verbatim: `(Blind || (Levitation ||
Flying)) && !Deaf && u_at(x, y)` envelope, `if (!Underwater)`
gate, `weight > WT_SPLASH_THRESHOLD → "Splash!"` /
`Levitation || Flying → "Plop!"` arms. JS now gates on
`!(game.u?.uinwater | 0)` inside the same envelope with the
same two arms — envelope, predicate, and messages match C.
Underwater ≡ u.uinwater verified 2591. `sym.mjs flooreffects`
→ `js/do.js:774 ASYNC` — canonical export, no clone, no
STUB. Adjacent-clone audit: the envelope's `Deaf()` is a local
clone (js/do.js:481, one of 14); C Deaf ≡ `(HDeaf || EDeaf ||
u.uroleplay.deaf)` (youprop.h:125) and the clone adds only `||
u.Deaf` — zero writers to the sticky flat anywhere in `js/`
(grep confirmed), so dead-false and behaviorally C-exact, not
a C-wrong. Untouched by this SHA in any case.

## Hallucinations / overclaim

None.

## Density

One whole gate + focused test + ledger + verify on an empty
queue. Right-sized; successor lead (D-3728
do_play_instrument) named.

## Verification

Re-measured: `verify flooreffects --base 4857a80b2~1
--reach-all` → 0 blocked (vacuous, as stated) + `reach
flooreffects: 1 baseline-PASS session(s) reach it (1 run,
1.3s): 1 PASS, 0 regressed → REACH-OK`. Matches the D-log.
Rule #2 clean. Diff grep FORCE/DIAG/RNG/coords: no hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
