# Review 2579 — a75bb06aa — mhitm_ad_dgst Deaf-macro gate (D-3709)

## Metadata

- SHA: `a75bb06aa2cbc31c81e9ad97bad93898ecb5225b` (2026-10-09, D-3709)
- Scope: ≤10-function refill — whole Method on `mhitm_ad_dgst` (1 gate)
- Diff: `js/mhitm.js` +5/−2 (gate swap + cites, import already present),
  new `scripts/mhitm-dgst-deaf-gate.test.mjs` (137 lines), ledger
  D-tag, scoreboard header re-stamp only
- Context: omit-2 family, D-3708 Next lead; queue empty, batch no gap

## Intent vs deliverable

Subject promises: C gates the digest-kill "Burrrrp!" on
`flags.verbose && !Deaf`; JS read raw `game.u?.Deaf` (stuck false),
so macro-deaf heroes heard it — full delta even when aware, because
`verbalize` has no inner Deaf gate. Fix: call the already imported
`hero_Deaf()`. The diff delivers exactly that — one gate swap plus
cites, nothing else in `js/`. Promise matches deliverable.

## Inventory

- `mhitm_ad_dgst` (`js/mhitm.js:4259`): 1 gate changed. No new JS
  function.
- Callee: `hero_Deaf js/monmove.js:1197 sync` — already imported
  (js/mhitm.js:151, D-3707); no new edge. Nothing deleted or
  re-pointed.

## C ↔ JS fidelity

C locus (`csym.mjs`: body `uhitm.c:4491–4567`; sole dispatch caller
`:4827` `case AD_DGST`; gate `:4530–4534` read in pinned C):

```c
if (flags.verbose && !Deaf) {
    /* Soundeffect? */
    SetVoice(magr, 0, 80, 0);
    verbalize("Burrrrp!");
}
wake_nearto(magr->mx, magr->my, 2 * 2); /* Burrrrp! */
```

JS: `if (game.flags?.verbose !== false && !hero_Deaf()) {
await verbalize('Burrrrp!'); }` then `wake_nearto(...)` — gate
polarity, `verbose`-first short-circuit order, string, and the
below-the-gate `wake_nearto` all exact. SetVoice stays named (empty
in this build, ledger-noted). The subject's "outer gate is the only
silence" claim was verified in pinned C, not trusted: `pline.c:470`
documents `verbalize` with "The caller is responsible for checking
deafness" — so the old raw read was a full message delta for every
macro-deaf hero, aware or not. RNG: `verbalize` draws nothing;
`wake_nearto`/damage/lifesaver run below the gate identically —
"no RNG delta" confirmed. Branch-by-branch confirm on the arm.

## Hallucinations / overclaim

None. "No corpus divergence", no movement claimed. SetVoice :4532
stays named per the row — disclosed, not silently dropped.

## Density

Legitimate refill under the D-3699 precedent: one C gate,
`js/mhitm.js` only + its test, ledger `ported` kept `ported` with a
D-3709 tag, sibling curs+noises suites re-run (10/10). Not a no-op,
no bundling.

## Verification

- Focused test: `node --test scripts/mhitm-dgst-deaf-gate.test.mjs` →
  5/5 pass (re-ran here).
- Re-measure (`verify mhitm_ad_dgst --base a75bb06aa~1 --reach-all`):
  `0 session(s) blocked on it` at baseline — matches the D-log's
  "note hidden" honestly — and `smoke mhitm_ad_dgst: no RNG-tagged
  reach; fixed smoke spread (24 run, 11.9s): 24 PASS, 0 regressed →
  REACH-OK`. Zero regressions, both summary lines cited.
- Scoreboard hunk is a header-only re-stamp, zero row changes.
- Diff greps clean; Rule #2 clean per the iteration
  `imports.mjs --rulecheck` (review 2573).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
