# Review 2599 — 42475f4c8 — throwit landing Splash/Plop gate

SHA: `42475f4c8` (D-3729). Underwater-idiom family residual, 1 gate,
`js/dothrow.js` only (+3/−1). Ledger: throwit ported
(D-3383/D-3382/D-1346 stand).

## Intent vs deliverable

Promise: C stays silent on landing Splash/Plop for a submerged
hero (dothrow.c:1793); JS read dead-false sticky `u.Underwater`
→ gate reads live `(u.uinwater | 0)` via the in-scope `u`
binding. Diff actually adds: the one-conjunct rewire + C-cite
comment. Promise matches diff.

## Inventory

- `throwit` (js/dothrow.js:2304, async) ↔ C
  nethack-c/upstream/src/dothrow.c:1509–1849 (csym range),
  landing gate :1793–1801.

## C ↔ JS fidelity

C `:1793–1801` confirmed verbatim: `if (!Deaf && !Underwater)`
envelope, `is_pool || (is_lava && !is_flammable)` inner gate,
`Soundeffect(se_splash, 50)` + `weight > WT_SPLASH_THRESHOLD ?
"Splash!" : "Plop!"`, then `flooreffects 'fall'`. JS folds the
nested if into one condition with identical short-circuit
semantics and the same effect order (Soundeffect → pline →
flooreffects) — exact. `u` is `const u = game.u` at :2305,
in scope; bare-`u` dereference matches the file's pervasive
idiom (e.g. :907/:920), so dropping the old `?.` adds no new
null hazard. `sym.mjs throwit` → `js/dothrow.js:2304 ASYNC`
— canonical export, no clone, no STUB. Adjacent-clone audit:
the envelope's `Deaf()` (js/dothrow.js:1210) is a documented
"subset" clone `HDeaf || u.Deaf`, missing C's EDeaf and
`uroleplay.deaf` arms — but EDeaf has zero setters anywhere in
pinned C (macro defined youprop.h:124, never written), and
`uroleplay.deaf` is set only via rcfile roleplay conduct
(u_init.c:947/959) with zero writers in `js/` — so the clone
agrees with C on every reachable state. Pre-existing,
documented, envelope untouched by this SHA: noted, not a
C-wrong.

## Hallucinations / overclaim

None.

## Density

One whole gate + focused test + ledger + verify on an empty
queue. Right-sized; successor leads named (steed.js:277,
steed.js:996, invent.js:4719, display.js:2283, do.js:885,
music.js:902, dothrow.js:937, read.js:1870).

## Verification

Re-measured: `verify throwit --base 42475f4c8~1 --reach-all`
→ 0 blocked (vacuous, as stated) + `reach throwit: 4
baseline-PASS session(s) reach it (4 run, 2.0s): 4 PASS, 0
regressed → REACH-OK`. Matches the D-log. Rule #2 clean.
Diff grep FORCE/DIAG/RNG/coords: no hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
