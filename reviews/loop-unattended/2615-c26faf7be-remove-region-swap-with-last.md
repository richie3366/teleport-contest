# Review 2615 — c26faf7be — remove_region swap-with-last (D-3747)

Metadata. SHA `c26faf7be` (2026-10-09), D-3747, parent
`53d7adbbd` (audit). js diff: `js/region.js` +8/−2 in
`remove_region` (splice → swap-with-last + `export`) + doc
word swap + `scripts/remove-region-order.test.mjs` (new, 4
its). Ledger: `remove_region` ported (note corrected — the
old "equivalent list removal" audit claim was wrong). Works
its HEAD's cliffs head (`region.c` inside_gas_cloud, 3
blocked: 95309, 95206, 95237 — verified in the parent
queue; owner proven already-whole per D-1146, so the writer
is remove_region's list drop).

## Intent vs deliverable

Promise (subject + D-log): all 3 probes diverge in the same
inside_gas_cloud arm with different `dam = reg->arg`
(95309@239 C `rnd(12)` vs JS `rnd(8)`; 95206@480 C
`rnd(11)` vs JS `rnd(10)`; 95237@393 C hero-arm `rnd(12)`
vs JS monster-arm `rnd(9)`); creation RNG matched
(`rn1(10,5)` dams 5..14, all six in range), so the same
clouds existed but `run_regions` processed them in different
order — JS `splice` vs C swap-with-last. Fix the drop,
export it (extern decl :30) for the order test.

Diff actually adds exactly that. Promise and diff match. No
new import, no signature change, no caller edits.

## Inventory

Changed JS (1 function):

- remove_region — `js/region.js:650–692` (drop at :659–663).
  C: `region.c` remove_region `:343–386` (printed range;
  locus cited in csym output). Drop at `:355–357`
  (`if (--svn.n_regions != i) regions[i] =
  regions[n_regions]; regions[n_regions] = 0`), unknown
  no-op `:351–352`, ttl/visible two-pass `:359–383`,
  free `:385`.

## C ↔ JS fidelity

**Drop exact.** C decrements to `last`, moves the last entry
into slot `i` unless removing the tail, NULLs the freed
slot. JS computes `last = length-1`, assigns unless
`last === i`, truncates — identical survivor order
(elements `i+1..last-1` keep indices, last takes `i`);
truncation ⇔ NULL + count. Unknown-region silent no-op
matches `:351–352`.

**Consumer loop shape matches.** C `run_regions` walks
expiry backward (`:424–431`, "Do it backward because the
array will be modified"); JS `:1062–1070` walks backward
identically, so the swapped-in element (already visited,
index > i) is neither skipped nor double-processed — same
as C. The age/inside_f forward pass and the monster-list
swap-drop (`mids[j] = mids[k]`, `j--`) also mirror C
`:434–458` line for line (verified in both bodies).

**Callers all wired** (D-log's three, verified by grep):
`run_regions` :429 → `js/region.js:1067`; `rest_regions`
:887 → `:825` (ttl==0 gate); prayer cloud fix :1396 →
`:1303`. Export matches C extern linkage (decl :30).

**Owner-whole claim holds.** `inside_gas_cloud`
(JS :477–554 vs C :1091–1165) checked arm-for-arm: fog
ttl<20 gate, `dam<1` early return, hero arm (poisongas /
Blind sting + make_blinded / poison-resistance burn with
`rnd(dam)+5` + towel halve), monster arm (`cansee ||
distu<8` cough — exact, incl. the disjunct — wake_nearto,
heros_fault setmangry, eyes blind, resists gate,
`rnd(dam)+5`, killed/monkilled, lifesave recheck). No arm
missing; the writer diagnosis is sound.

**Test.** 4 its pin head/middle/tail removal order plus the
unknown no-op; head-removal fails under splice (3/4
pre-fix per D-log) and all pass post-fix. Adequate.

## Hallucinations / overclaim

None. The "same clouds, different order" mechanism is
demonstrated (matched creation draws, in-range dams,
same-arm different-dam divergences). Diff grep (FORCE /
DIAG / getRngLog / fastforward / seed / coords): zero hits.
Symbol re-point (module-local → export): `sym.mjs`
pasted below — single export, sync, no clones.

```text
remove_region    js/region.js:650   sync
```

Rule #2: global re-check this audit → clean.

## Density

Cliff-phase §2b: parent head is inside_gas_cloud (3
blocked, RNG lost 61381); this commit ships the writer its
probes' divergence names (list-order writer, owner read not
re-ported) and moves all 3 probes. One cliff, one C locus,
no bundling. Correct gates (green/strict/cohort; full
skipped — region.js not shared — honest).

## Verification

D-log Verify (`verify.mjs --fn
inside_gas_cloud,remove_region`): inside_gas_cloud 0 PASS +
3 moved + 0 + 0 → PROGRESS (95309 239→617 mattackm, 95206
480→629 one_characteristic, 95237 393→394 mattackm); reach
4/4 + smoke 24/24 → REACH-OK; green/strict/cohort PASS.

Re-measured by this audit (`verify
inside_gas_cloud,remove_region --base c26faf7be~1
--reach-all`; HEAD code includes 8 later SHAs, so later
movement is expected):

```text
verify inside_gas_cloud: 1 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS
reach inside_gas_cloud: 4 baseline-PASS session(s) reach it (4 run, 3.5s): 4 PASS, 0 regressed → REACH-OK
smoke remove_region: no RNG-tagged reach; fixed smoke spread (24 run, 8.8s): 24 PASS, 0 regressed → REACH-OK
```

95309 moved further (→do_statusline2@839) and 95237 is now
FULL PASS under later SHAs; 95206 sits exactly where named
(629 one_characteristic). No vacuous check (row cited 3;
all 3 itemized), 0 worse, 0 regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
