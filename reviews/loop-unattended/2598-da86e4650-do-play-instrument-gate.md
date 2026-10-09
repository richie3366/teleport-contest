# Review 2598 — da86e4650 — do_play_instrument Underwater gate

SHA: `da86e4650` (D-3728). Underwater-idiom family residual, 1 gate,
`js/music.js` only (+3/−2). Ledger: do_play_instrument ported
(D-2046 stands).

## Intent vs deliverable

Promise: C refuses with "You can't play music underwater!"
for a submerged hero (music.c:765); JS read dead-false sticky
`u.Underwater` → gate reads live `(u.uinwater | 0)`. Diff
actually adds: the one-gate rewire + C-cite comment. Promise
matches diff.

## Inventory

- `do_play_instrument` (js/music.js:900, async) ↔ C
  nethack-c/upstream/src/music.c:758–899 (csym range), gate
  :765.

## C ↔ JS fidelity

C `:765–768` confirmed verbatim: first statement `if
(Underwater) { You_cant("play music underwater!"); return
ECMD_OK; }`. JS now `if ((u?.uinwater | 0))` in the same first
position with the same message and ECMD_OK return — position,
predicate, message, and return match C. Underwater ≡
u.uinwater verified 2591. `sym.mjs do_play_instrument` →
`js/music.js:900 ASYNC` — canonical export, no clone, no
STUB, nothing deleted or re-pointed. C caller is the single
apply.c:4383 site; untouched (gate body only).

## Hallucinations / overclaim

None.

## Density

One whole gate + focused test + ledger + verify on an empty
queue. Right-sized; successor lead (D-3729 throwit) named.

## Verification

Re-measured: `verify do_play_instrument --base da86e4650~1
--reach-all` → 0 blocked (vacuous, as stated) + `smoke
do_play_instrument: no RNG-tagged reach; fixed smoke spread
(24 run, 10.7s): 24 PASS, 0 regressed → REACH-OK`. Matches the
D-log. Rule #2 clean. Diff grep FORCE/DIAG/RNG/coords: no
hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
