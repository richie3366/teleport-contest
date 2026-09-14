# Review 1257 — 08a179ab — spec_applies DFLAG2 yours/Upolyd/ulycn arms

Metadata: SHA `08a179ab`, D-2291, queue row `artifact.c` artilist DFLAG2.
js/: 1 file, +10/−3 (`js/artifact.js` only — small-C exception).

Intent vs deliverable: subject promises the C `||` chain verbatim in C
order (mflags2, selfmask arm, were arm). Diff delivers exactly that plus
the doc-comment retire, nothing else.

Inventory: changed local `spec_applies` DFLAG2 arm; `Upolyd`/`ismnum`
join the existing const.js import, `M2_WERE` joins the existing
monsters.js import.

## C ↔ JS fidelity

C locus `artifact.c:1026–1031` (`csym`, inside `spec_applies`
`:1008–1060`):

```c
return ((ptr->mflags2 & weap->mtype)
        || (yours
            && ((!Upolyd && (gu.urace.selfmask & weap->mtype))
                || ((weap->mtype & M2_WERE) && ismnum(u.ulycn)))));
```

JS evaluates mflags2 → return 1; then under `yours`: selfmask arm →
return 1, were arm → return 1; else return 0. Truth table identical to
`A || (yours && (B || C))`, evaluated in C order with C short-circuit
(mflags2 first; the were arm has no Upolyd gate, as C). ✓

- `Upolyd(u)`: pre-existing live const.js import (macro takes no C arg;
  the JS canonical takes `u` — call-time use, established convention). ✓
- `game.urace?.selfmask ?? 0`: C `gu.urace` is a struct, always present;
  the `?.`/`?? 0` only guards JS-unset state — safe-equivalent. ✓
- `ismnum`: pre-existing canonical (`js/const.js:3204`,
  `Number.isInteger(pm) && pm >= LOW_PM`) vs C `monst.h:285`
  (`>= LOW_PM && < NUMMONS`). The dropped upper bound is disclosed in
  the D-log with the ulycn-domain justification — a shared-canonical
  deviation that predates this SHA, not a new C-wrong. ✓
- `| 0` idiom and 1/0 return shape preserved; no RNG in C, none added. ✓
- No clones touched, no symbols deleted/re-pointed — no `sym.mjs --can`
  owed. `M2_WERE`/`ismnum`/`Upolyd` all resolve to live exports. ✓

Hallucinations / overclaim: none. The 8/8 hand-probe claim (deleted
/tmp probe, unreproducible) is at least fully checkable by reading —
each of the 8 cases follows from the truth table above, and I re-derived
them: orc-unpoly applies, human misses, orc-poly misses (Upolyd gate),
lycanthrope applies poly or not (no gate on were arm), non-lycanthrope
misses, monster flagged/unflagged. Probe prose stands.

Density: ~10 lines for a ~6-line C arm — small-C exception, the row's
entire gap.

Verification: D-log `verify --fn spec_applies` PASS (syntax/rule2/green
2/2/strict/cohort). Re-measured: `hidden-proxy verify spec_applies
--base 08a179ab~1` → 0 blocked baseline and working — vacuous claim
confirmed. Banned-pattern grep on the js/ diff: one hit, a false
positive (the commit message's own "No DIAG/FORCE" sentence).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
