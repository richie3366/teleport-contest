# Review 2291 — 390bbccbf — somex teleport.js clone removal

- SHA: `390bbccbf` (D-3335)
- Files: `js/teleport.js` (+ new somex rewire test)
- Insertions: ~5 js/; single-symbol 2-site rewire

## Intent vs deliverable

Subject promises: "`mkroom.c` somex teleport.js clone removal (2
sites → live js/mklev.js export)". The diff delivers exactly that:
one clone deleted, one new static teleport→mklev edge, one C-cite
comment per site (2, both in `somexy`). No DIAG/FORCE/seed; Rule #2
clean (iteration-wide rulecheck).

## Inventory

- `somex`: deleted teleport.js clone (2 sites in `somexy`,
  regular + irregular arms) → live mklev.js:32977.

## C ↔ JS fidelity

C `somex` (mkroom.c:665–669): `rn1(hx - lx + 1, lx)` — 5 lines,
one RNG call. Live JS (mklev.js:32977): `rn1(croom.hx -
croom.lx + 1, croom.lx)` — byte-identical, RNG call-for-call.
The deleted clone differed only by `|0` coercions on integer room
coords — behavior-identical, as claimed. Sibling `somey`
(teleport.js:941) and dog.js:876/879 clones are distinct functions
out of cluster (future rows, not this SHA's debt). Required
`sym.mjs` output:

```
somex            js/mklev.js:32977   sync
             !! ALSO 1 LOCAL CLONE(S) in 1 files — IMPORT the export; do NOT add another
               js/dog.js:876
```

One `somex` clone remains (dog.js — different file, future row).

## Hallucinations / overclaim

None. "Behavior-identical" is exact (same rn1 draw, same args).
"Whole C body live" holds (5-line body).

## Density

Single-symbol 2-site rewire; ~5 insertions below the bar, defended
(head's C file holds no further Open rows). `Ledger:` somex entry;
per-function Verify line present. Gates per D-log: syntax · rule2
· hidden-note · reach · green · strict · cohort · skip full
(single leaf file — correct call).

## Verification

Re-measured (`hidden-proxy.mjs verify somex --base 390bbccbf~1
--reach-all`): 0 blocked (row cited 0 — honestly vacuous, D-log
says so) + **reach 705/705 PASS, 0 regressed → REACH-OK** — real
RNG-tagged reach, stronger than the D-log's 80-spread sample (my
`--reach-all` ran all 705). The rewire is proven neutral across
every baseline-PASS session that executes it.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
