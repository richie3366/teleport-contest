# Review 1397 — a28c8688 — adjattrib whole body in C order (D-2438)

- Commit: `a28c8688` — "`attrib.c` adjattrib whole body in C order (coverage PARTIAL → live) (D-2438)."
- Files: `js/attrib.js` only (+52/−25 eff.); docs + map + queue pop.
- D-log: D-2438. Queue row popped: adjattrib PARTIAL (C 79 L / JS 53 L).

## Intent vs deliverable

Subject promises the dropped `:172–190` ACURR-unmoved arms plus the
abase/amax snapshots and abonflg. Diff delivers exactly that, plus local
`ATTRNAME` from C `:20–21` and the dynamic→static `You_feel` re-point.
Promise matches deliverable.

## Inventory

Changed JS: `adjattrib` (restart) + `ATTRNAME` const. One re-point:
`You_feel` dynamic `import('./display.js')` → existing static import
(required `sym.mjs`: `You_feel js/display.js:7332 ASYNC — await
required`; call site awaits ✓ — correct direction, ALREADY edge).

## C ↔ JS fidelity

C locus `attrib.c:116–199` (csym range) walked arm-by-arm:

- `Fixed_abil || !incr → FALSE` ✓; dunce-cap INT/WIS abort with
  msgflg==0-exact constrict pline ✓; triple snapshot (acurr/base/peak) ✓;
  `ABASE += incr` ✓; gain arm (peak-raise + ATTRMAX clamp) and loss arm
  (`rn2(min-base+1)` peak shave + floor) preserved with identical RNG
  shape ✓; `abonflg = ABON<0 / >0` with `ABON(x) ≡ u.abon.a[x]`
  (`attrib.h:22`) ✓.
- ACURR-unmoved `:172–190`: msgflg==0-exact (not <=0) ✓,
  verbose-default-on (`!== false`, jsmain init) ✓, base+peak-unmoved →
  "You're currently/already as {attr} as you can get" ✓, else "Your
  innate {name} has improved/declined" via inline prefix — text-identical
  to `Your()`, no new clone (4 pre-existing file-local Your spellings
  noted in brief, none added) ✓; `ATTRNAME` strings verified against C
  `:20–21` ✓; FALSE return ✓.
- Post-change: AEXE reset, disp.botl, `msgflg<=0 → You_feel(very?+attr)`
  ✓, `in_moveloop && (STR||CON) → encumber_msg` ✓, TRUE return ✓
  (all pre-existing, untouched).
- Named: `u_init_carry_attr_boost` STR/CON loop — stub at
  `u_init.js:1689` makes no adjattrib calls and its caller (`:2021`)
  matches C's unconditional call; the loop interior (inv_weight-gated)
  is the honestly named gap, pending its own coverage row ✓.
  Banned-pattern grep on added lines: 0 hits. (Bonus: the deleted
  session-referential comment "not hit by vary_init_attr on seed8000" is
  gone — correct per anti-patterns.)

## Hallucinations / overclaim

None. "No 5th Your clone per brief" verified (no new local). Vacuous
verify framed as "hidden note (0 blocked)".

## Density

One 84-line C function, one module, +52/−25. Whole-body claim holds;
every arm live or map-named.

## Verification

D-log: `verify.mjs --fn adjattrib` → syntax · rule2 · hidden note ·
smoke 24/24 · green · strict · cohort · PASS. Independent re-measure:

- `hidden-proxy.mjs verify adjattrib --base a28c8688~1 --reach-all` →
  0 blocked (vacuous, as logged) + `smoke: 24 PASS, 0 regressed →
  REACH-OK`. Confirms the D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
