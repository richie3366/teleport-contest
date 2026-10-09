# Review 2581 — 47fdd9a35 — spitmm mcan-arm Deaf-macro gate (D-3711)

## Metadata

- SHA: `47fdd9a35422738c645d1645ba69fea8fb804d24` (2026-10-09, D-3711)
- Scope: ≤10-function refill — whole Method on `spitmm` (1 gate)
- Diff: `js/mthrowu.js` +5/−1 (**new static import** `hero_Deaf` from
  monmove.js + gate swap + cites), new
  `scripts/spitmm-mcan-deaf-gate.test.mjs` (115 lines), ledger D-tag,
  scoreboard header + **full re-stamp** (see Verification)
- Context: omit-2 family, same-iteration map refill+ship; queue empty,
  batch no gap

## Intent vs deliverable

Subject promises: C gates the dry-rattle message on
`!Deaf && mdistu < BOLT_LIM²` with no acoustics arm; JS read raw
`u.Deaf` (stuck false) plus an invented `|| acoustics===false` — so
macro-deaf heroes heard the rattle, and acoustics-off heroes missed
the spotted pline C prints. Fix: import `hero_Deaf`, drop the
acoustics disjunct. The diff delivers exactly that, nothing else in
`js/`. Promise matches deliverable.

## Inventory

- `spitmm` (`js/mthrowu.js:389`): 1 gate changed. No new JS function.
- Callee: `hero_Deaf js/monmove.js:1197 sync` — canonical export,
  hoisted `export function` declaration. Nothing deleted or
  re-pointed.
- **New edge audit (required — this SHA adds a static import):**
  `js/monmove.js:68` already statically imports `./mthrowu.js`, so
  the new `mthrowu.js:84` import closes a 2-cycle — the same shape as
  D-3706. Cycle-safe as claimed: `hero_Deaf` is a hoisted function
  declaration used only at runtime inside function bodies — no
  top-level TDZ read. (Historical `--can: SAFE` now reads ALREADY;
  the safety reasoning was confirmed independently from the
  declaration shape, and the committed tree loads: all gates below
  ran on it.)

## C ↔ JS fidelity

C locus (`csym.mjs`: body `mthrowu.c:1015–1077`; callers mhitm.c:550
+ mthrowu.c:1270; arm `:1021–1030` read in pinned C):

```c
if (mtmp->mcan) {
    if (!Deaf && mdistu(mtmp) < BOLT_LIM * BOLT_LIM) {
        if (canspotmon(mtmp))
            pline("A dry rattle comes from %s throat.",
                  s_suffix(mon_nam(mtmp)));
        else { Soundeffect(se_dry_throat_rattle, 50);
               You_hear("a dry rattle nearby."); }
    }
    return M_ATTK_MISS;
}
```

JS: `!hero_Deaf() && dist2(...) < lim2` (dist2 ≡ squared mdistu,
pre-existing), spotted pline string byte-identical, unspotted
`You_hear('a dry rattle nearby.')`, `M_ATTK_MISS` return outside the
gate — exact. Deleting the acoustics disjunct (not "fixing" it) is
the faithful move: C prints the spotted pline with acoustics off,
and unspotted silence comes from inside `You_hear` — the comment
says exactly this. Soundeffect :1027 stays named (correct, no
SND_LIB). RNG: none — "no RNG delta" confirmed. Branch-by-branch
confirm on the arm.

## Hallucinations / overclaim

None. "No corpus divergence", no movement claimed; Soundeffect stays
named per the row.

## Density

Legitimate refill under the D-3699 precedent: one C gate,
`js/mthrowu.js` only + its test, ledger `ported` kept `ported` with
a D-3711 tag. The new import edge is the documented, checked cost of
the canonical reader. Not a no-op, no bundling.

## Verification

- Focused test: `node --test scripts/spitmm-mcan-deaf-gate.test.mjs`
  → 7/7 pass (re-ran here).
- Re-measure (`verify spitmm --base 47fdd9a35~1 --reach-all`): `0
  session(s) blocked on it` at baseline — matches the D-log's "note
  hidden" honestly — and `reach spitmm: 15 baseline-PASS session(s)
  reach it (15 run, 26.4s): 15 PASS, 0 regressed → REACH-OK`. Zero
  regressions, both summary lines cited.
- Scoreboard hunk: header re-stamp **plus** `fullCommit/fullAt`
  re-stamp at 26c2814b6 — the disclosed incidental full `score`
  (still 939/953, zero row changes). Harmless: this audit's rescore
  is the last hidden-proxy command of the iteration per the ALSO
  block, and it re-stamps `full` again.
- Diff greps clean; Rule #2 clean per the iteration
  `imports.mjs --rulecheck` (review 2573).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
