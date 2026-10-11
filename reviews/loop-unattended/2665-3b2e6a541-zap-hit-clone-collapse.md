# Review 2665 — 3b2e6a541 — zap hit import, clones deleted (D-3801)

Metadata. SHA `3b2e6a541` (2026-10-11), D-3801, parent
`a885aeb77` (HEAD). js diff: `js/zap.js` — import
`hit` from mthrowu.js, rewire 6 call sites
(`hit_zap`×4, `hit_msg`×2 → `hit`), delete both
clones + tombstones; `js/apply.js` one comment word.
Works cliffs row-2 toss_up (95211 + 95229 PASS).

## Intent vs deliverable

Promise: 95229@554 — blind + telepathic hero: C
names «the purple worm» (canspotmon true via ESP)
while JS said «it» (`hit_zap` gated on canseemon,
false when blind); 95211@600 joins by the same fix
(C-length msg1 pulls the insult onto C's next
More-page). D-1849 pattern: import the export,
delete the clones. Diff does exactly that. Promise
and diff match.

## Inventory

Changed JS (1 writer import + 6 rewired sites):

- `hit` — canonical `js/mthrowu.js:834` (async
  export). C: `zap.c:3555–3568` (csym range).
- Deleted: `hit_zap` (canseemon gate), `hit_msg`
  (dropped youmonst/engulfing arms). Call sites:
  dobuzz ×4 + disintegrate_mon + apply comment.

## C ↔ JS fidelity

**C-exact.** C `:3561–3564`: verbose ⟺ youmonst
|| (verbose && (cansee(bhitpos) || canspotmon ||
engulfing_u)). Canonical `hit` implements all four
disjuncts verbatim. Deleted `hit_zap` read
`canseemon` (wrong macro — misses ESP-sensed) and
`hit_msg` dropped the youmonst/engulfing arms, so
both deletions remove divergence. Slot check: the
disintegrate_mon site previously read `game._bhitpos`
via `hit_msg`; canonical `hit` reads `game.bhitpos`
— C-exact (C has one gb.bhitpos slot), and this
audit confirmed dobuzz sets `game.bhitpos` per beam
step (`js/zap.js:2483`) before all six sites. The
kept twins are correctly scoped: `miss_msg`
(gate already canspotmon — verified `js/zap.js:3985`)
and `hit_youmonst` (youmonst-only "you" — verified
`js/dothrow.js:1298`). Behavior changes only where
C names and JS said "it". Required sym.mjs paste
(symbols the diff deletes / re-points to):

```text
hit              js/mthrowu.js:834   ASYNC — await required
hit_zap          NOT FOUND in js/** (no export, no local function/const).
hit_msg          NOT FOUND in js/** (no export, no local function/const).
```

## Hallucinations / overclaim

None. Diff grep: zero hits. The geom-probe (0 cells
differ, RNG 42342/42342) + prefix-state probe
(blind+ESP, canspotmon=true, cansee=false) isolates
a pure message predicate — the right evidence.

## Density

Cliff-phase §2b: one row-2 writer, clone-collapse
with tombstones. Row-1 randomize falsifier
re-verified unfired live (per CURRENT handoff:
still D-3733 void).

## Verification

D-log Verify: focused 1/2 → 2/2; toss_up 2 PASS;
reach 24/24 ×2; gates + manual full 44/44 PASS.

Re-measured by this audit (`verify toss_up,hit
--base 3b2e6a541~1 --reach-all`, re-run on HEAD
code):

```text
verify toss_up: 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-worldtour-Caveman-95211: PASS
  scen-worldtour-Wizard-95229: PASS
smoke toss_up/hit: 24 PASS, 0 regressed → REACH-OK (each; hit vacuous as logged)
```

Matches the D-log exactly. Committed scoreboard:
1045 → 1047 (+95211, +95229), 0 lost.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
