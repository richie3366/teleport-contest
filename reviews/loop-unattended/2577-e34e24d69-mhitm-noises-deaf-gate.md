# Review 2577 — e34e24d69 — mhitm noises Deaf-macro gate (D-3707)

## Metadata

- SHA: `e34e24d6907667361dd0cadcde3e62e6691cf77d` (2026-10-09, D-3707)
- Scope: ≤10-function refill — whole Method on `noises` (1 gate; the
  whole C body is 13 lines)
- Diff: `js/mhitm.js` +4/−1 (import-name add, gate swap, cites), new
  `scripts/mhitm-noises-deaf-gate.test.mjs` (137 lines), ledger
  `noises` D-tag, scoreboard header re-stamp only
- Context: omit-2 family, D-3706 Next lead; queue empty, batch no gap

## Intent vs deliverable

Subject promises: C skips the far-noise arm for a macro-deaf hero; JS
read raw `game.u?.Deaf` (stuck false), so macro-deaf heroes took
`far_noise`/`noisetime` state updates plus the `You_hear` — including
an audible dream when Unaware. Fix: import `hero_Deaf`, one gate swap
in C short-circuit order. The diff delivers exactly that, nothing else
in `js/`. Promise matches deliverable. The "rate-limit corruption"
framing is accurate: the old bug was state divergence, not just a
message — aware macro-deaf heroes were silenced by `You_hear`'s inner
gate but still rewrote the rate-limit state.

## Inventory

- `noises` (`js/mhitm.js:395`): 1 gate changed; the whole function
  re-verified below. No new JS function.
- Callee: `hero_Deaf js/monmove.js:1197 sync` — canonical export.
  Nothing deleted or re-pointed.
- `imports.mjs --can js/mhitm.js js/monmove.js hero_Deaf` → `ALREADY:
  mhitm.js already statically imports monmove.js. No new edge
  needed.` — subject's claim confirmed verbatim.

## C ↔ JS fidelity

C locus (`csym.mjs`: body `mhitm.c:26–38`; 3 call sites `:89/:729/:980`
+ decl — all intra-file, `staticfn`, signatures unchanged):

```c
boolean farq = (mdistu(magr) > 15);
if (!Deaf && (farq != gf.far_noise || svm.moves - gn.noisetime > 10)) {
    gf.far_noise = farq; gn.noisetime = svm.moves;
    You_hear("%s%s.", (mattk->aatyp == AT_EXPL) ? "an explosion"
        : "some noises", farq ? " in the distance" : "");
}
```

JS: `farq = mdistu(magr) > 15` ✓; gate `!hero_Deaf()` first, then the
identical `farq !== far_noise || moves - noisetime > 10` disjunction
✓ (the `moves` snapshot is taken synchronously just above — same
evaluation point as C, no await between); state writes in C order ✓;
`You_hear` template renders "an explosion/some noises" + optional
" in the distance" + "." — byte-identical to C's `%s%s.` ✓. RNG:
none either side — "no RNG delta" confirmed. Whole-function
branch-by-branch confirm.

## Hallucinations / overclaim

None. "No corpus divergence", no movement claimed. Same-file residuals
(js/mhitm.js:4259 + :4381 raw reads) are disclosed as needing their
own brief-verified rows rather than silently shipped or silently
dropped — correct scoping (they ship as D-3708/D-3709).

## Density

Legitimate refill under the D-3699 precedent: one C gate,
`js/mhitm.js` only + its test, ledger `ported` kept `ported` with a
D-3707 tag, five sibling suites re-run (23/23). Not a no-op, no
bundling.

## Verification

- Focused test: `node --test scripts/mhitm-noises-deaf-gate.test.mjs`
  → 5/5 pass (re-ran here).
- Re-measure (`verify noises --base e34e24d69~1 --reach-all`): `0
  session(s) blocked on it` at baseline — matches the D-log's "note
  hidden" honestly — and `smoke noises: no RNG-tagged reach; fixed
  smoke spread (24 run, 11.9s): 24 PASS, 0 regressed → REACH-OK`.
  Zero regressions, both summary lines cited.
- Scoreboard hunk is a header-only re-stamp, zero row changes.
- Diff greps clean; Rule #2 clean per the iteration
  `imports.mjs --rulecheck` (review 2573).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
