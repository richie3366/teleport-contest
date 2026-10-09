# Review 2580 — 26c2814b6 — mdig_tunnel wall-arm You_hear rewire (D-3710)

## Metadata

- SHA: `26c2814b67af501d4dc9ed5190a0aae322929dd5` (2026-10-09, D-3710)
- Scope: ≤10-function refill — whole Method on `mdig_tunnel` (1 arm)
- Diff: `js/dig.js` +4/−2 (import-name add, gate+emit rewire, cites),
  new `scripts/mdig-tunnel-crashing-rock-you-hear.test.mjs` (87
  lines), ledger D-tag, scoreboard header re-stamp only
- Context: omit-2 family, D-3709 Next lead; queue empty, batch no gap

## Intent vs deliverable

Subject promises: C's wall arm has **no** outer Deaf gate — verbose +
`!rn2(5)` → Soundeffect + `You_hear` — while JS gated on raw
`game.u?.Deaf` plus a plain pline: macro-deaf heroes heard the rock,
and `You_hear`'s inner acoustics/Underwater/Unaware arms were dropped
(the D-3702 rewire shape, not a 1-predicate swap). Fix: drop the raw
gate, await the live export. The diff delivers exactly that, nothing
else in `js/`. Promise matches deliverable. The triage (rewire vs
swap) is the point of the commit and it is right: adding a macro gate
here would have diverged from C for Deaf+Unaware heroes, whom C's
ungated `You_hear` lets dream.

## Inventory

- `mdig_tunnel` (`js/dig.js:1160`): 1 arm rewired. No new JS function.
- Callee: `You_hear js/hack.js:193 ASYNC` — live export, awaited;
  verified whole vs `pline.c:436–452` in review 2572. Nothing deleted
  or re-pointed.
- `imports.mjs --can js/dig.js js/hack.js You_hear` → `ALREADY:
  dig.js already statically imports hack.js. No new edge needed.` —
  subject's claim confirmed verbatim.

## C ↔ JS fidelity

C locus (`csym.mjs`: body `dig.c:1413–1497`; caller
`monmove.c:1645`; arm `:1467–1471` read in pinned C):

```c
if (IS_WALL(here->typ)) {
    if (flags.verbose && !rn2(5)) {
        Soundeffect(se_crashing_rock, 75);
        You_hear("crashing rock.");
    }
```

JS: `if (IS_WALL(here.typ)) { if (game.flags?.verbose !== false &&
!rn2(5)) { await You_hear('crashing rock.'); }` — ladder, gate
polarity, draw order, string all exact; Soundeffect stays named
(correct — no SND_LIB build). By deleting the outer gate instead of
"fixing" it to the macro, the port recovers C's exact audibility
table: Deaf non-Unaware silent via the export's inner gate, Deaf
Unaware dreaming, Underwater "barely", acoustics-off silent. RNG
call-for-call: `rn2(5)` precedes the emit in both; `You_hear` draws
nothing — "no RNG delta" confirmed. Branch-by-branch confirm.

## Hallucinations / overclaim

None. "No corpus divergence", no movement claimed; Soundeffect :1469
stays named per the row.

## Density

Legitimate refill under the D-3699 precedent: one C arm, `js/dig.js`
only + its test, ledger `ported` kept `ported` with a D-3710 tag.
Not a no-op, no bundling.

## Verification

- Focused test: `node --test
  scripts/mdig-tunnel-crashing-rock-you-hear.test.mjs` → 5/5 pass
  (re-ran here).
- Re-measure (`verify mdig_tunnel --base 26c2814b6~1 --reach-all`):
  `0 session(s) blocked on it` at baseline — matches the D-log's
  "note hidden" honestly — and `reach mdig_tunnel: 112 baseline-PASS
  session(s) reach it (112 run, 135.4s): 112 PASS, 0 regressed →
  REACH-OK` — full reach, stronger than the D-log's 80-run spread.
  Zero regressions, both summary lines cited.
- Scoreboard hunk is a header-only re-stamp, zero row changes.
- Diff greps clean; Rule #2 clean per the iteration
  `imports.mjs --rulecheck` (review 2573).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
