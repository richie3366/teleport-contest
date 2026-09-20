# Review 1622 — 18f68dac — worn.c racial_exception race-vs-form fix (D-2663)

**Metadata:** SHA `18f68dac`, `worn.c`
`racial_exception` + dead callee `raceptr`
(`mondata.c:1359`), D-2663. JS: `js/mondata.js` (+15:
new live `raceptr` export) + `js/worn.js` (+6/−4:
`mon?.data` → `raceptr(mon)` + cites) + new
`scripts/racial-exception.test.mjs` (75 L, 4 tests).

## Intent vs deliverable

Subject promises: JS read `mon.data` (the role form)
where C `:1362` reads `raceptr(mon)` (the race table
while unpolyed), so a non-polyed hobbit hero got 0 where
C gives 1; port `raceptr` live and restart the caller.
Diff delivers all of it. Promise matches deliverable.

## Inventory

- `raceptr(mtmp)` (mondata.js:65, sync, exported) —
  new, C-home. No clone existed (dead callee, nowhere in
  `js/`), so no clone→import re-point output required.
- `racial_exception(mon, obj)` (worn.js:688, sync,
  exported) — one-line body change + cites.
- `Upolyd` (const.js:3184, sync, `umonnum !==
  umonster`): joins mondata.js's existing const.js import
  (same edge). `is_elven_armor` (worn.js:156, sync):
  same-module, no edge. Required `sym.mjs` paste:

```text
Upolyd           js/const.js:3184   sync
is_elven_armor   js/worn.js:156   sync
```

## C ↔ JS fidelity

C loci read in full: `raceptr :1358–1364` (7 L, body
above), `racial_exception :1359–1373` (15 L). No RNG
either side. Branch-by-branch confirm:

- `raceptr`: `mtmp == &youmonst && !Upolyd →
  &mons[urace.mnum]`, else `mtmp->data`. JS adds the
  established `|| !!mtmp?._youmonst` hero idiom
  (precedents cited) and null guards (C NONNULLARG);
  `mons(urace?.mnum)` reads the race table ✓.
- `racial_exception`: `ptr == &mons[PM_HOBBIT] &&
  is_elven_armor(obj) → 1`, comment-only `-1` arm stays
  comment, else 0 ✓. C pointer-compare ≡ JS
  `mndx`-compare since `mons()` objects carry `mndx` ✓.
- Caller closure (all 3 C sites pre-wired to the same
  export, so the fix propagates): do_wear.c:2053 →
  do_wear.js:2287/2424, polyself.c:1199 →
  polyself.js:1217, worn.c:887 → worn.js:894 ✓.

## Hallucinations / overclaim

None. The "pre-fix run failed on the missing export"
test claim is consistent with `raceptr` being new.

## Density

Breadth phase: dead-callee port + one-line caller fix +
test, 3 files — right-sized.

## Verification

D-log Verify bullet claims PASS (syntax 2 files · rule2
· hidden note · REACH-OK smoke 24/24 · green · strict ·
cohort 7/7 · full `sessions` 44/44 · new test 4/4).
Re-measured here: `hidden-proxy.mjs verify
racial_exception --base 18f68dac~1 --reach-all` → 0
blocked both sides (vacuous note, correctly labeled
coverage row) + smoke 24/24, 0 regressed → REACH-OK;
`node --test scripts/racial-exception.test.mjs` → pass
4, fail 0 (run here). Claim true. Diff grep: 0 hits for
FORCE/DIAG/getRngLog/fastforward/seed/coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
