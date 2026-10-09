# Review 2578 — 5eb7bf9b6 — mhitm_ad_curs Deaf-macro gate (D-3708)

## Metadata

- SHA: `5eb7bf9b670d439d6137778bc337f58ac548eb41` (2026-10-09, D-3708)
- Scope: ≤10-function refill — whole Method on `mhitm_ad_curs` (1 gate)
- Diff: `js/mhitm.js` +5/−1 (gate swap + cites, import already present),
  new `scripts/mhitm-curs-deaf-gate.test.mjs` (136 lines), ledger
  `split` row D-tag; no scoreboard touch
- Context: omit-2 family, D-3707 Next lead; queue empty, batch no gap

## Intent vs deliverable

Subject promises: C's laughter/chuckles arm sits under `!Deaf`; JS
read raw `game.u?.Deaf` (stuck false), so macro-deaf heroes took the
emits — including an audible dream when Unaware, and the
seen-attacker "chuckles" pline which has no inner deaf gate. Fix: call
the already imported `hero_Deaf()`. The diff delivers exactly that —
one gate swap plus cites, nothing else in `js/`. Promise matches
deliverable. The two-channel analysis (dream via `You_hear`'s Unaware
arm vs ungated `pline_mon` chuckles) is correct and shows the gate was
read, not pattern-matched.

## Inventory

- `mhitm_ad_curs` (`js/mhitm.js:4358`): 1 gate changed. No new JS
  function.
- Callee: `hero_Deaf js/monmove.js:1197 sync` — already imported
  (js/mhitm.js:151, D-3707); no new edge. Nothing deleted or
  re-pointed.

## C ↔ JS fidelity

C locus (`csym.mjs`: body `uhitm.c:3014–3096`; sole dispatch caller
`:4803` `case AD_CURS`; arm `:3088–3093` read in pinned C):

```c
if (!Deaf) {
    if (!gv.vis) You_hear("laughter.");
    else if (canseemon(magr))
        pline_mon(magr, "%s chuckles.", Monnam(magr));
}
```

JS: `if (!hero_Deaf()) { if (!_mm_vis) await You_hear('laughter.');
else if (canseemon(magr)) await pline_mon(magr, \`${Monnam(magr)}
chuckles.\`); }` — gate polarity, nested order, both strings exact.
RNG call-for-call: the `!rn2(10)` (under `!magr->mcan`) precedes the
gate in both C (`:3042`) and JS — verified, not trusted — so the swap
is RNG-neutral; `You_hear`/pline draw nothing. "No RNG delta"
confirmed. Branch-by-branch confirm on the arm.

## Hallucinations / overclaim

None. "No corpus divergence", no movement claimed. The successor
residual (mhitm_ad_dgst Burrrrp raw read, C :4530) is brief-verified
and queued as its own row rather than bundled — correct scoping
(it ships as D-3709).

## Density

Legitimate refill under the D-3699 precedent: one C gate,
`js/mhitm.js` only + its test, ledger `split` kept `split` with a
D-3708 tag (no status inflation), sibling noises suite re-run (10/10
combined). Not a no-op, no bundling.

## Verification

- Focused test: `node --test scripts/mhitm-curs-deaf-gate.test.mjs` →
  5/5 pass (re-ran here).
- Re-measure (`verify mhitm_ad_curs --base 5eb7bf9b6~1 --reach-all`):
  `0 session(s) blocked on it` at baseline — matches the D-log's
  "note hidden" honestly — and `reach mhitm_ad_curs: 4 baseline-PASS
  session(s) reach it (4 run, 3.1s): 4 PASS, 0 regressed → REACH-OK`.
  Zero regressions, both summary lines cited.
- Diff greps clean; Rule #2 clean per the iteration
  `imports.mjs --rulecheck` (review 2573).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
