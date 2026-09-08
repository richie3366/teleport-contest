# Review 1060 — 068dfccc — dochug cuss arm + mcastu Antimagic (D-2090)

Metadata: SHA `068dfccc`, `js/monmove.js` + `js/mcastu.js`, queue owner
dochug (2 sessions). D-log D-2090.

## Intent vs deliverable

Subject promises: (1) port the MS_CUSS `!rn2(5)` cuss arm (was a named
omit); (2) fix file-local `Antimagic()` ignoring uprops so cloak-MR
takes the correct arm. Diff actually adds: `cuss` on the pre-existing
`./wizard.js` import + local `MS_CUSS = 34` + 5-line gate in `dochug`;
`ANTIMAGIC` on the `./const.js` import + uprops-OR in `Antimagic()` and
the death-touch inline. Promise == deliverable.

## Inventory

Changed: `dochug` (new arm), `Antimagic()`, death-touch uselessness
inline. New import edges: none (`cuss` joins an existing edge;
`ANTIMAGIC` joins `./const.js`). No deleted/re-pointed symbols, so the
`sym.mjs` paste requirement is the status lines: `cuss →
js/wizard.js:673 ASYNC` (LIVE, awaited at the call site — callee
closure LIVE); `Antimagic → NOT EXPORTED, 9 local clones` — this commit
writes no 10th clone, it repairs the mcastu one in place.

## C ↔ JS fidelity

Cuss arm, `monmove.c` (dochug csym range :689–989), verbatim:

```
if (inrange && mtmp->data->msound == MS_CUSS && !mtmp->mpeaceful
    && couldsee(mtmp->mx, mtmp->my) && !mtmp->minvis && !rn2(5))
    cuss(mtmp);
```

JS gate: `inrange && mdat?.msound === MS_CUSS && !mpeaceful &&
couldsee && !minvis && !rn2(5)` → `await cuss(mtmp)`, placed directly
after `quest_talk` as in C. Predicate-for-predicate match; `MS_CUSS =
34` confirmed against `monflag.h:49` (beside `MS_BRIBE = 33`).
`cuss` body (`wizard.c:845–883`) needs no port here — it is the
already-live import, and the corpus divergence is the missing *draw*,
not its text.

Antimagic: C `youprop.h:55–57` (upstream include/) is
`HAntimagic ≡ uprops[ANTIMAGIC].intrinsic`,
`EAntimagic ≡ uprops[ANTIMAGIC].extrinsic`, `Antimagic ≡ H || E` — C has
*no flats at all*. JS's flats are a pre-existing JS-side shape; OR-ing
`uprops[ANTIMAGIC]` intrinsic/extrinsic moves strictly toward C on the
cloak-MR path (D-1089 confer pattern). Residual: flats kept for
eat/poly paths means the clone can still read true where C reads false
— pre-existing, map-named ("confer mirror itself is not touched"; other
8 files' flat-only clones named as future rows). Not a new C-wrong from
this commit. Combined-arm closure for dochug: `quest_talk` pre-existing
live, `cuss` LIVE — arm ships.

## Hallucinations / overclaim

None. "imports.mjs ALREADY / SAFE" for joining existing edges is
accurate (no new edge added). No dispatch-over-stub: both halves are
live code on the divergent path.

## Density

Two files, one falsifier family (dochug owner, 2 sessions), ~30
insertions — right-sized cluster (§2b: caller/callee pair on one owner).

## Verification

- `imports.mjs --rulecheck`: Rule #2 clean (whole `js/`).
- Ban grep on added lines: one hit — `scen-tour-Wizard-92103` inside a
  `/** */` provenance comment, not control flow. No seed/step/RNG-index
  read, no coordinates, no FORCE/DIAG. Acceptable cite.
- Re-measured `hidden-proxy.mjs verify dochug --base 068dfccc~1`:
  "0 PASS, 2 moved past (1 re-attributed at the same step), 0 unchanged,
  0 worse → PROGRESS" (Priest-92235 → zap_hit same step 59;
  Wizard-92103 → really_done step 110) — byte-identical to the D-log
  claim. No vacuity, no regression.
- Green/strict/cohort/full-44/44 per D-log (shared-file change ran full).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
