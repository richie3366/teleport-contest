# Review 1337 — 1e326cc7 — poly_obj invent side effects via addinv_core1/2 (D-2371)

Metadata: SHA `1e326cc7`, 2 js files (`js/u_init.js` 2-word exports,
`js/zap.js` import extend + 2 awaits). No new modules or edges
(`zap.js → u_init.js` pre-exists; `u_init.js` imports nothing from
`zap.js` — verified acyclic by grep). D-log: D-2371, map-named row, 0
blocked on poly_obj/addinv_core1/arti_invoke.

## Intent vs deliverable

Subject promises the latent C-wrong in otherwise-live `poly_obj`: the
invent path skipped C's `addinv_core1(otmp)` + `addinv_core2(otmp)`
(coin botl, uhave achievements, questart artitouch, W_ART intrinsic,
prize, decipher). Diff exports both cores and awaits them in C
position after `freeinv_core(obj)`. Matches the promise.

## Inventory

- `poly_obj` invent arm — 2 awaits (no new helpers, no clones, no
  stubs). Docstring retires the omit.

## C ↔ JS fidelity

Vs C `zap.c:1910–1914` (body re-read above): `freeinv_core(obj)` →
`addinv_core1(otmp)` → `addinv_core2(otmp)` — order exact; both cores
are async (D-2370 made core1 async; core2 already was) and both awaited.
`sym.mjs`: `addinv_core1 js/u_init.js:937 ASYNC`, `addinv_core2 :904
ASYNC` — LIVE exports, awaited at the call site. Both cores' bodies
were shipped in prior iters (this SHA changes zero body lines), so no
re-audit of their arms is owed here. Confirm.

The old-obj invoked-toggle reversal + `arti_invoke` vehicle stays named
(sync locus with 25 freeinv sites vs async arti_invoke) and was queued
as its own Open row this same commit — verified present in
`LOOP-QUEUE.md` Open (the set_artifact_intrinsic row; docs-only
`b9518fbb` restored it after the finisher auto-archived it on D-id
mention). Correct queue hygiene, not a stub-in-live-arm: the deferred
piece is a different C locus (artifact.c:880–885) with its own row.
Confirm.

## Hallucinations / overclaim

None. "No new module edges" verified: import extends the existing
`./u_init.js` line; reverse grep shows no `zap` import in `u_init.js`.

## Density

~17 lines, one C call sequence — minimal and exactly the locus.
Acceptable.

## Verification

- Added-line banned grep: clean.
- Re-measured: `verify poly_obj --base 1e326cc7~1` → `0 blocked (0 at
  baseline, 0 working)` — vacuous as disclosed; row cited 0 blocks.
  Confirm.
- Green/strict/cohort per D-log `verify.mjs --fn poly_obj` → VERIFY:
  PASS (quoted; tree has since moved).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
