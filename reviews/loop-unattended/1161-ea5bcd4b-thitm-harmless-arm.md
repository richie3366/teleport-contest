# Review 1161 — ea5bcd4b — thitm harmless arm + tail

Subject promises: `trap.c:6711–6773` thitm `stone_missile`/`passes_rocks` harmless arm + `pline_mon`/dealloc tail (D-2195, map-driven, vacuous corpus verify), plus adjacent same-function C-wrongs in the same unit.
Diff actually adds: `js/trap.js` thitm rewrite of hit/miss/tail (+~25/−~20) + `AD_RBRE=242` const + two import widenings (`stone_missile` from dothrow.js, `dealloc_obj` from mkobj.js); `stone_missile` local→export in `js/dothrow.js` (+1/−1). Nothing else.

## Intent vs deliverable

Promise matches diff. The four shipped items (harmless gate, `pline`→`pline_mon` ×2, `-AD_RBRE`, dealloc tail) are all inside
the cited 64-line C function — one locus family, legitimate combined unit. Live path named: monster-branch `trapeffect_rocktrap`
`thitm(0, mtmp, otmp, d(2,6))` — ROCK (MINERAL) vs a rock-passer struck and wrongly damaged before.

## Inventory

- `thitm` (`js/trap.js:1192`): hit/miss/tail arms.
- `stone_missile` (`js/dothrow.js:1099`): visibility widening only.

## C ↔ JS fidelity

C `trap.c:6710–6773` (`node scripts/csym.mjs thitm`), branch by branch:

```c
    if (!strike) {
        if (obj && cansee(mon->mx, mon->my))
            pline_mon(mon, "%s is almost hit by %s!", Monnam(mon), doname(obj));
    } else {
        int dam = 1;
        boolean harmless = (obj && stone_missile(obj) && passes_rocks(mon->data));
        if (obj && cansee(mon->mx, mon->my))
            pline_mon(mon, "%s is hit by %s%s", Monnam(mon), doname(obj),
                      harmless ? " but is not harmed." : "!");
        if (d_override) dam = d_override;
        else if (obj) { dam = dmgval(obj, mon); if (dam < 1) dam = 1; }
        if (!harmless) {
            mon->mhp -= dam;
            if (mon->mhp <= 0) {
                monkilled(mon, "", nocorpse ? -AD_RBRE : AD_PHYS);
                if (DEADMONSTER(mon)) { newsym(xx, yy); trapkilled = TRUE; }
            }
        } else strike = 0; /* harmless; don't use up the missile */
    }
    if (obj && (!strike || d_override)) { place_object(obj, ...); stackobj(obj); }
    else if (obj) dealloc_obj(obj);
```

JS matches every line: miss `pline_mon` ✓; `harmless` computed before the message ✓ (`!!(...)`, same shape as live `hittmu`);
hit suffix ternary ✓; `dam` computed (hence `dmgval` RNG drawn) before the harmless gate ✓ — RNG order preserved on harmless
hits; `monkilled(mon, "", nocorpse ? -AD_RBRE : AD_PHYS)` ✓ (`AD_RBRE=242` confirmed at `monattk.h:89`; `DEADMONSTER` `<1` ≡
JS `<=0` on ints); `else strike = 0` ✓; tail `place+stack iff !strike||d_override else dealloc_obj` verbatim ✓ (missile-leak
stub closed).

Callee closure (`node scripts/sym.mjs` — required since `stone_missile` goes local→export):

```text
stone_missile    js/dothrow.js:1099   sync
dealloc_obj      js/mkobj.js:2608   sync
passes_rocks     NOT EXPORTED — but 2 LOCAL CLONE(S) in 2 file(s):
               js/dothrow.js:1094  js/trap.js:3253
```

`stone_missile` body matches `obj.h:274` (GEMSTONE/MINERAL, ≠RING_CLASS) and is now the canonical export — no second clone
created. `passes_rocks` uses the same-file `trap.js:3253` clone (matches `mondata.h:208`); the census shows 2 pre-existing
clones and the commit adds no third — unification is named pre-existing debt, not smuggled in. `dealloc_obj` LIVE (existing
mkobj import widened); `pline_mon` async-awaited, pre-imported. `--can trap.js dothrow.js` → ALREADY (existing static edge
widened). Dealloc-safety (all otmp call sites pass fresh `t_missile` output, no post-return use) is stated and corroborated by
full 44/44 + green/strict. Local `monkilled` clone kept per D-0150, named — legitimate.

## Hallucinations / overclaim

None. "Match C" is earned per arm including RNG order; "thitm now complete" is bounded to the cited range with the clone
exception named.

## Density

~45 JS lines for the remaining unported delta of one 64-line C function — right-sized §2b unit.

## Verification

D-log states the corpus check is vacuous (map-driven row, 0 blocked) and ships on public gates incl. forced full 44/44. Re-measured:

```text
verify thitm: baseline ea5bcd4b~1 (scoreboard at 3fbdad72) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify thitm: no corpus session is blocked on it at ea5bcd4b~1 — a vacuous verify is NOT a corpus PASS.
```

Vacuous claim true and explicitly labeled. Diff grep: no FORCE/DIAG/getRngLog/seed/coordinate gates. Rule #2 clean (re-run this iteration).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
