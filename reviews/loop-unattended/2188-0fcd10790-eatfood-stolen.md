# Review 2188 — 0fcd10790 — eatfood stolen-food arm + reset semantics

SHA `0fcd10790`, D-3227; 2026-10-01; js/eat.js (+19/−12) only.
Single-function cluster (eat.c). Closes no prior review.

## Metadata

- Subject: "eat.c eatfood stolen-food arm + eating-gate reset
  semantics (D-3227)."
- Promises: restart the local in C order — stolen guard via live
  same-module carried/obj_here; `!food → do_reset_eat + return 0`;
  `!eating → return 0` with victual untouched; usedtime/bite/done
  arms unchanged with C citations.

## Intent vs deliverable

Kept. The diff rewrites exactly the `eatfood` head (guard +
two early returns), re-comments the tail arms, and fixes one
cross-ref word in the `cant_finish_meal` comment. Same
name/signature; all `game.occupation === eatfood` identity gates
untouched.

## Inventory — eatfood

Changed: `eatfood` (js/eat.js, local async) — head restart only.
No new functions, no new imports, no deleted/re-pointed symbols
(`sym.mjs` re-point check vacuous).

## C ↔ JS fidelity — eatfood

C `eat.c:518–541` (csym range; sole call site `:3885` in
maybe_finished_meal ✓, `:3908` a comment ✓). Line-for-line:

- `:521` piece read → `let food = …victual?.piece` ✓ (let, since
  the guard nulls it).
- `:523–524` stolen guard → `food && !carried(food) &&
  !obj_here(food, ux|0, uy|0)` → `food = null` ✓ exact predicate.
- `:525–528` `!food` → `await do_reset_eat(); return 0` ✓ (await
  is the async adaptation; old code wiped `victual = {}` and never
  stopped the occupation — the C-wrong, now fixed).
- `:529–530` `!eating` → bare `return 0`, victual untouched ✓
  (old merged branch wiped — fixed).
- `:532` `++usedtime <= reqtime` ✓; `:533–535` bite → 0 / still-
  busy 1 ✓; `:536–539` done_eating(TRUE) → 0 ✓.

Null-safety: the `!eating` check uses `?.` (missing context →
return 0, safe); the usedtime line is reachable only when
`eating` is truthy, which implies context exists ✓.

Callee closure, all same-module (C eat.c): `carried` exported
(js/eat.js:2685) LIVE ✓ (invent-membership extension is
pre-existing named); `obj_here` local — floor-pile walk via
objects_at, matches C obj_here ✓; `do_reset_eat` local (:938) ✓;
`bite` local (:1586) ✓; `done_eating` local (above) ✓. No RNG in
C; none added ✓.

Diff grep: 1 hit, in the commit message ("No DIAG/FORCE/seed
gates"), 0 in code. Rule #2 clean (no new imports).

## Hallucinations / overclaim

None. The "phantom food" diagnosis matches the removed code (no
guard, wipe instead of reset). The cant_finish_meal comment fix is
accurate (eatfood no longer wipes).

## Density

One whole C function (24 lines), one file, no Must-fix bundled ✓.
Below the ~80 guideline by C size with 6 stale pops retired en
route — legitimate small-C exception, named in the D-log.

- Ledger: eatfood ported — ACCEPT.

## Verification

Re-measured (current tree):

```text
verify eatfood: baseline 0fcd10790~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke eatfood: no RNG-tagged reach; fixed smoke spread (24 run, 12.7s): 24 PASS, 0 regressed → REACH-OK
```

Matches the D-log (vacuous note + REACH-OK, green/strict/cohort).
No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
