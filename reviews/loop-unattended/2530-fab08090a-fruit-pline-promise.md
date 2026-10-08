# Review 2530 — fab08090a — optfn_fruit awaited pline promise (D-3651)

- SHA: `fab08090a` (2026-10-08) — cliffs-head `optfn_fruit`
- D-entry: D-3651; Ledger: `optfn_fruit` ported (D-3651 appended)
- js diff: `js/options.js` (optfn returns pline promise chained to
  OPTN_OK; doset fruit arm awaits; comments); new
  `scripts/optfn-fruit-pline.test.mjs` (3 cases)
- Type: cliff (≤10 functions → whole Method per function)

## Intent vs deliverable

Promise: JS dropped the "Fruit is now" pline screen (fire-and-forget
`void pline(...)`), shifting the 17 screens after it; returning the pline
promise chained to OPTN_OK and awaiting it in the doset fruit arm lands
the paint before the next pick's prompt, like C's synchronous pick loop.
Moves Knight-94331 135→PASS. All other paths stay sync.

Diff actually adds exactly that. Promise = deliverable.

## Inventory

| JS function | Status | C range |
|---|---|---|
| `optfn_fruit` (js/options.js) | pline path returns promise | options.c:1705–1774 (csym), `:1755–1761` |
| `doset_compound_via_getlin` fruit arm | awaits the return | doset `:8941–8956` (sync loop) |

## C ↔ JS fidelity

C (`options.c:1755–1761`, via csym + read): `if (!go.opt_initial) {
fruitadd(...); if (give_opt_msg) pline("Fruit is now ..."); }`, then
`return optn_ok`. C is synchronous: the pline screen exists before doset
prompts the next pick. JS's `pline` is async, so awaiting the returned
promise is the faithful ordering; the `.then(() => OPTN_OK)` shared-return
shape matches the live `optfn_boulder` precedent (verified at its `:1201`
sites).

`give_opt_msg` discipline verified: static TRUE (`:108`); cleared only
by doset_simple (`:8722`, restored `:8733`) — the other writer (`:5318`)
sits inside `#ifndef IDLECHECKPOINT`, compiled out
(`windconf.h:39` defines it). So "full doset never clears it" holds for
the compiled tree, and the doset_simple path (flag false) still returns
OPTN_OK synchronously.

Caller audit (the maybe-promise must not break a sync compare): JS has 4
`optfn_fruit` call sites — the doset arm (now awaited), REQ_GET_VAL
(sync path, no pline), and two config-load sites passing
`optInitial=true` (the `!optInit` pline arm untaken; return values
unused). No sync `=== OPTN_OK` compare can observe a promise. Safe.

RNG: none on this path (2841/2841 matched — pure screen writer). No
clones/stubs/re-points — `sym.mjs` re-point check not applicable. Named:
none new; the D-2783 "pline not awaited" note is retired by this commit
(verified: the promise return is the shared mechanism, not a new omit).

Committed test: 3/3 here (D-log: 1 failed pre-fix — the pline-screen
case, by construction).

## Hallucinations / overclaim

None. The C synchronous-loop claim, the boulder precedent, and the
give_opt_msg discipline all check out in pinned C. No dispatch-over-stub.

## Density

Cliff phase: owner `optfn_fruit` was the cliffs head; the missing screen
(writer = the unawaited pline) shipped with its Ledger entry. One cliff,
same options.c family, no bundle. The Knight chain 88→135→PASS closes
across D-3650→D-3651. Movement + REACH-OK re-measured below. Not a no-op.

## Verification

Rule #2: iteration-wide clean. Diff grep: CLEAN (no matches at all).

Re-measure (this audit):
`hidden-proxy.mjs verify optfn_fruit --base fab08090a~1 --reach-all` →

- `verify optfn_fruit: 1 PASS, 0 moved past, 0 unchanged, 0 worse →
  PROGRESS` (Knight-94331: PASS) + REACH-OK (smoke 24/24)

Exactly the ship-time claim, reproduced. No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
