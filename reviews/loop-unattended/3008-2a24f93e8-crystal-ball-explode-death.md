# Review 3008 — 2a24f93e8 — use_crystal_ball drains losehp's deferred death

- SHA: `2a24f93e8` (cliff; board row explmm, scen-wish-Barbarian-50152020
  s34, 17 screens, 36 RNG; writer detect.c use_crystal_ball)
- D-entry: D-4168; Ledger: use_crystal_ball ported (→ partial, this review)
- `js/` diff: detect.js +5

## Intent vs deliverable

Promise: the explode arm (detect.c:1246–1252) calls losehp. When that
kills, C's losehp runs `urgent_pline("You die...")` and `done(DIED)`
inline. JS's losehp defers the fatal arm behind `_losehp_needs_done` for
the caller to drain. use_crystal_ball never drained it, so the game ended
silently.

Diff: after losehp, `if (game._losehp_needs_done) await
finish_losehp_done();`, plus the end.js import (`--can` SAFE). The promise
matches the diff.

## Inventory

- use_crystal_ball — detect.js (C detect.c `:1246–1252` explode arm).
- finish_losehp_done — end.js:2038 (existing). It drains showdamage and
  rehumanize, then the deferred done.

## C ↔ JS fidelity

C case 5: `pline("%s!", Tobjnam(obj, "explode")); useup(obj); *optr = obj
= 0; losehp(Maybe_Half_Phys(rnd(30)), "exploding crystal ball",
KILLED_BY_AN); break;` and then `if (obj) consume_obj_charge` is skipped.
On the fatal path, JS now runs pline «You die...» and done(DIED) at C's
point, before control returns to apply. That is the C order. The callers
(apply.js:2638, artifact.js:2442 #invoke) are unchanged, which is right
because the finisher runs inside the callee.

**Gap (debt, unreached).** JS losehp defers one more C-inline arm. When
the hero is polymorphed and `u.mh < 1`, it sets
`_losehp_needs_rehumanize` (hack.js:1892), standing in for C's
`rehumanize()` at hack.c `:4275–4276`. Only finish_losehp_done and
finish_maybe_wail drain it (grep: no other reader), and this commit
calls the finisher only under `_losehp_needs_done`. So a polymorphed hero
whose form dies to the shards is not rehumanized here. The flag waits for
whatever later finisher runs, if any. Every non-fatal losehp caller in
ball.js / dig.js / dokick.js closes with `finish_maybe_wail()` for this
reason. The apply.js wand-break "precedent" has the same hole. The
D-log's 38-caller reading list covers the family. No corpus session
reaches it (polymorphed + cursed crystal ball). Ledger set to `partial`
with the omit text. There is no Must-fix.

## Hallucinations / overclaim

None. Its Named reading list is explicitly "not a defect list".

## Density

Five lines for the measured writer. Right-sized.

## Verification

```text
verify explmm,use_crystal_ball --base 2a24f93e8~1 --no-reach
  explmm: 1 PASS (scen-wish-Barbarian-50152020) → PROGRESS
  use_crystal_ball: 0 blocked (vacuous)
```

This reproduces the claim.

## Actionable C-wrongs

1. use_crystal_ball explode arm: on the non-fatal path, drain with
   `finish_maybe_wail()` (rehumanize at C's point). Unreached; ledger
   partial.

Verdict: **ACCEPT-WITH-DEBT**
