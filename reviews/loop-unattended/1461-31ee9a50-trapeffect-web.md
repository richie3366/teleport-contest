# Review 1461 — 31ee9a50 — `trap.c` trapeffect_web whole-body port (D-2502)

Metadata: SHA `31ee9a50`, `js/trap.js` only (+139/−31 in the hunk).
C `trap.c:2105–2276` (`trapeffect_web`, 172 lines, staticfn). D-log: D-2502.

## Intent vs deliverable

Promise: restart in C order — hero arm (flags, steed article, feeltrap,
destroy/webmaker skips, caught message, `set_utrap(1)`, steed mintrap
pre-pass, strength ladder, str≥69 tear) + monster-arm fixes (`se_roar`,
`pline_mon` ×3). Diff delivers all of it. Promise = deliverable.

## Inventory

- Changed: hero arm added under the existing `is_youmonst` dispatch;
  monster arm: `Soundeffect(se_roar, 60)` + three `pline` → `pline_mon`;
  import extended (`se_roar`).
- `sym.mjs` (required): nothing deleted or re-pointed. Callee checks:
  `mintrap` trap.js:5653 ASYNC (awaited ✓), `feeltrap` trap.js:2337
  sync, `webmaker` monsters.js:994 sync, `acurr` attrib.js:110 sync,
  `strongmonst` monsters.js:735 sync — all LIVE.

## C ↔ JS fidelity

Dispatch `is_youmonst(mtmp)` (youmonst identity or dotrap `_youmonst`
stand-in, trap.js:1423) ≡ C `mtmp == &gy.youmonst` ✓.

Hero arm ≡ `:2116–2202`: NOWEBMSG/FORCETRAP|FAILEDUNTRAP/VIASITTING
decode ✓; steed-article suppression for named steed outside
Hallucination ✓; `feeltrap` → destroy-skip → webmaker-walk with both
messages ✓; `verbbuf` three-way (caught-by / lead-into with
`x_monnam(steed, article, 'poor', SUPPRESS_SADDLE)` / `u_locomotion`
stumble-into) + `You('%s %s spider web!', verbbuf, a_your[madeby_u])`
where `a_your = ['a','your']` ≡ C's `a_your[]` ✓; `set_utrap(1)` before
the ladder ("time will be adjusted below" ✓); steed pre-pass
(`mx/my` sync, `mintrap != Finished → mtrapped = 0, strongmonst →
str 17`, else `reset_utrap(FALSE)` + return, `webmsgok = FALSE`) ✓;
strength ladder `rn1(6,6)/rn1(6,4)/rn1(4,4)/rn1(4,2)/rn1(2,2)/rnd(2)/
1/0+tear` — RNG call-for-call in C order ✓; str≥69 tear with
`deltrap` + `newsym` ✓; final `set_utrap(tim)` ✓.

Monster arm ≡ `:2204–2276` (pre-existing, fixed here): owlbear/bugbear
unsighting `Soundeffect(se_roar, 60)` + roar + `mtrapped = 1` + return
`Trap_Caught_Mon` (≡ C break-then-trappped-ternary ✓); huge tear list
verbatim; S_GIANT/extra-nasty/long-worm default; `tear_web ? 0 : 1`;
forcetrap-avoid arm; `in_sight = canseemon || == usteed` ✓. The three
`pline` → `pline_mon` match C's `pline_mon(mtmp, ...)` call-for-call
(text-identical; `pline_mon` = cursor-anchored `vpline`) ✓.

Callee closure: all LIVE. Named: none in the ported body ("every C arm
is live" — holds). No STUB, no clone. Sole C caller `trap.c:2972`
dispatches through the existing in-module wiring (unchanged here).

## Hallucinations / overclaim

None.

## Density

One 172-line C staticfn, one file. Right-sized.

## Verification

Re-ran here (`--base 31ee9a50~1 --reach-all`):

```text
verify trapeffect_web: baseline 31ee9a50~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke trapeffect_web: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

0 blocked both sides (vacuous, as stated). Diff grep: no FORCE/DIAG/
`getRngLog`/seed/fastforward/coords (hits are the D-log prose).

## Actionable C-wrongs

None. No Must-fix.

Verdict: **ACCEPT**
