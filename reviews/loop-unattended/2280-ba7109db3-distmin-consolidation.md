# Review 2280 — ba7109db3 — distmin C-locus consolidation + nh_snprintf by-design

- SHA: `ba7109db3` (D-3324)
- Files: 10 js files (import re-points + 2 deletions), no body changes
- Insertions: small; consolidation-to-live shape

## Intent vs deliverable

Subject promises: "hacklib.c distmin clone removals (shknam local + mon.js
duplicate) + nh_snprintf by-design". The diff delivers exactly that: the
shknam clone and the mon.js duplicate export deleted, all 8 ex-mon.js
importers plus shknam re-pointed at `js/hacklib.js:19`, one C-cite comment
at the shknam site. No call-site expression changed; `nh_snprintf` has no
`js/` by design. No DIAG/FORCE/seed; Rule #2 clean (iteration-wide
rulecheck).

## Inventory

- `distmin`: deleted shknam clone + mon.js export; 9 import lists edited.
  No new/changed bodies; live export re-verified here.
- `nh_snprintf`: by-design resolution, no `js/` (D-3312/D-3314 precedent).

## C ↔ JS fidelity

C `distmin` (hacklib.c:656–669): abs both deltas, return `(dx < dy) ? dy :
dx` — no RNG. Live JS (hacklib.js:19): `Math.max(Math.abs(x1-x2),
Math.abs(y1-y2))` — identical on all inputs (pure function; the deleted
twins were textually identical, so this rewire is behavior-neutral and
only fixes the locus: C has no mon.c distmin). Census confirms a single
definition and zero remaining `from './mon.js'` distmin imports:

```
distmin          js/hacklib.js:19   sync
```

Caller table (D-3324) maps every re-pointed site to its C call site
(shknam.c:700, mhitm.c ×5, dothrow.c, dogmove.c ×3, monmove.c ×5, trap.c,
mthrowu.c ×10, track.c, muse.c ×2) with unchanged expressions — a pure
re-point, no new wiring from sites C never calls from. The mon.js `dist2`
duplicate is disclosed as out-of-scope and untouched (shipped next,
D-3327). `nh_snprintf` (hacklib.c:853–875): `va_start/vsnprintf/va_end`
wrapper whose only live arm is the nul-terminate guard (meaningless for
JS strings) with the `impossible` arm `#if 0`'d out; sole C refs are the
Snprintf macro in unix-port date.c/mdlib.c build code — by-design with a
C citation is correct.

## Hallucinations / overclaim

None. "C has no mon.c distmin" is consistent with `csym` (single hacklib.c
locus). `--can` SAFE claims not re-run (edge additions predate this
review; syntax + full-suite PASS in the D-log Verify stands as the wiring
evidence).

## Density

Consolidation pair; below-bar insertions defended (behavior-neutral locus
fix + cited by-design). `Ledger:` distmin ported, nh_snprintf by-design.
Per-function Verify lines present.

## Verification

Re-measured (`hidden-proxy.mjs verify distmin,nh_snprintf --base
ba7109db3~1 --reach-all`): both 0 blocked (vacuous; rows cited 0 blocks,
honestly noted) + smoke 24/24 each, 0 regressed → REACH-OK — the D-log
tail verbatim.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
