# Review 2043 — a2037c0d5 — create_particular_creation whole restart (D-3083)

Metadata: SHA `a2037c0d5`, D-3083, js/read.js (+~110/−43), js/muse.js
(+2/−1, flash_mon export). Must-fix for review 2035 item 1 (class-`d`
created the role monster; `*` always false). Ships alone.

## Intent vs deliverable

Promise: "class-d mkclass + randmonst + post-flags" — restart creation
whole in C order: named-path cant_revive gate, per-iteration
mkclass/rndmonst select, gender arms (re-anchored), MM_MINVIS,
break/continue on makemon failure, tame/peaceful/hostile, saddled,
hidden, sleeping, flash_mon, doppelganger newcham. Diff delivers all of
it plus the import set and the flash_mon export. Kept.

## Inventory

- `create_particular_creation` (RESTARTED js/read.js:2866, file-local —
  C staticfn): full body below. New imports: MM_MINVIS/OBJ_AT (const),
  is_pool (hack), tamedog (dog), mkclass/set_malign (makemon),
  is_hider/hides_under (monsters), can_saddle/put_saddle_on_mon
  (steed), flash_mon (muse). Deleted symbols: none. Re-pointed: none
  (clone→import count 0; which_armor/canspotmon already imported the
  exports — the sym-flagged clones live in unrelated files, untouched).
- `flash_mon` (js/muse.js:1348): `async function` → `export async
  function` + doc line. Body untouched.

## C ↔ JS fidelity

C locus (csym range): nethack-c/upstream/src/read.c:3251–3357. Walked
arm-by-arm against the printed body:

- Preamble :3255–3273 ✓: whichpm NULL, firstchoice NON_PM, madeany
  FALSE; `!randmonst` gate (the old early-`return false` for `*` is
  gone); cant_revive remap + worm-tail exception + `Creating %s
  instead; force %s?` y_n (unchanged lines, previously verified);
  whichpm = mons(d.which).
- Select :3278–3281 ✓: `d.monclass !== -1` → `mkclass(d.monclass, 0)`
  (JS mkclass(mletClass, spc=0) takes the S_* string — parse sets -1 or
  S_* only, js/read.js:2751/2823–2838, 2035-confirmed); else
  `randmonst` → `rndmonst()` (no-arg both sides); named keeps :3273
  whichpm. The 2035 C-wrong is gone: class letters now create class
  members, `*` rolls.
- Gender :3282–3312 ✓: genderconf arms byte-identical to the verified
  old lines, citations re-anchored (:3282–3289/:3290–3312 match the
  printed body). MM_MINVIS :3313 ✓.
- makemon :3315–3322 ✓: `makemon(whichpm, ux, uy, mmflags)` (ux/uy
  loop-invariant hoist — nothing in the loop moves the player);
  `!mtmp` → break-if-named / continue-if-class-or-`*` ≡ C.
- appear: makemon_appear_msg per-iteration post-makemon kept (D-2096
  design — C's Norep is inside makemon; pre-existing split, disclosed).
- tame/peace/hostile :3324–3329 ✓: `await tamedog(mtmp, null, false)`
  ≡ C `(obj *)0, FALSE` (C third param is `givemsg`, dog.c:1142–1148;
  JS `givemsg=false` ✓); else mtame=0 + mpeaceful + set_malign ✓.
- saddled :3331–3334 ✓: `can_saddle && !which_armor(W_SADDLE)` →
  `put_saddle_on_mon(null, mtmp)` — arg order (obj, mon) ≡ C.
- hidden :3335–3340 ✓: three-disjunct `mundetected=1` with
  `S_MIMIC`/`S_EEL` literals ≡ C mlet compares; OBJ_AT/is_pool (x,y) ✓.
- sleeping :3341–3342 ✓. flash :3343–3347 ✓: `(hidden||invisible) &&
  !canspotmon` → `await flash_mon` (async boundary disclosed).
- newcham :3349–3354 ✓: guard unchanged; sound because makemon sets
  `mtmp.cham = NON_PM` then shapeshifter cham (js/makemon.js:3507–3510
  ≡ C mon.c:2935), so `!== NON_PM` fires only for real chams; class/`*`
  requests skip via firstchoice NON_PM ≡ C.
- Caller: C read.c:3405 `return create_particular_creation(&d)` ≡
  js/read.js:3009 ✓. No direct RNG in C body — draws flow through live
  callees (mkclass/rndmonst/makemon/tamedog) in C order.

Callee closure (all LIVE, `sym.mjs` output pasted per Method §3):

```text
mkclass          js/makemon.js:856   sync      rndmonst  js/makemon.js:662  sync
cant_revive      js/zap.js:3056      sync      makemon   js/makemon.js:3195 sync
tamedog          js/dog.js:563       ASYNC     set_malign js/makemon.js:734 sync
can_saddle       js/steed.js:177     sync      which_armor js/worn.js:418  sync
put_saddle_on_mon js/steed.js:266    sync      is_hider/hides_under js/monsters.js:372/377 sync
OBJ_AT           js/const.js:3201    sync      is_pool   js/hack.js:1982   sync
canspotmon       js/display.js:1382  sync      flash_mon js/muse.js:1348   ASYNC
newcham          js/makemon.js:1977  sync      y_n       js/getline.js:1789 sync
```

`await` on sync newcham/y_n is a harmless no-op. Async tamedog/flash_mon
awaited ✓. `imports.mjs --can js/read.js js/muse.js flash_mon` and the
steed edge both print ALREADY (no new edge — the "no cycle" claim is
vacuously true). No clones, no stubs, D-log "none in-body" holds.

## Hallucinations / overclaim

None. "whole body, every callee live" verified above (17/17). The
no-test justification (live level needed; sessions/** frozen) is honest
about what coverage exists (verify gates); the verify bullet's "0
blocks" is labeled expected-for-review-row, not a corpus PASS.

## Density

Must-fix ships alone ✓. One function, one `Ledger:` (ported) ✓ —
`ledger.mjs show` reads `C 60/JS 58 ok D-3083,D-2004` ✓. Whole-body
restart with every post-flag live beats the containment-guard alternative
the review allowed. §2b-shaped.

## Verification

- Re-measured `hidden-proxy verify create_particular_creation --base
  a2037c0d5~1 --reach-all`: `0 session(s) blocked (0 at baseline, 0 in
  working)` + `fixed smoke spread (24 run): 24 PASS, 0 regressed →
  REACH-OK`. Matches the D-log exactly; honestly vacuous (row cited 0
  blocks), 0 regressed.
- Ban-grep on the js hunks: clean. `imports.mjs --rulecheck`: Rule #2
  clean (full scored js/).

## Actionable C-wrongs

None. Review 2035 item 1 is closed: class-`d` → mkclass per iteration,
`*` → rndmonst, post-flags live.

Verdict: **ACCEPT**
