# Review 2717 — bf0c7986d — dotravel_target stale-step fix (D-3856)

Metadata: SHA `bf0c7986d`, D-3856, cliffs-head `monmove.c`
distfleeck writer (JS zeroed dx/dy on BFS-exhaust NOPATH
where C steps stale). JS: `js/cmd.js` (−10/+22: zeroing
block deleted, three comments corrected). Test:
`scripts/dotravel-nopath-stale-step.test.mjs` (new,
session-prefix, pins RNG past the old 9216 divergence) + 2
test-comment fixes.

## Intent vs deliverable

Promise: Valkyrie-578204@895 — C's TRAVEL BFS fails and the
guess pick-reverse-BFS fails (hero on un-enterable TREE),
so both return FALSE at `:1515` leaving dx/dy stale; C
steps SW into the holder's square (silent escape return →
"You move right into it." → distfleeck rn2(5)) while JS
zeroed and self-stepped into escape rn2(40) fail; delete the
JS-only zeroing (the two true `found:` exits stay in the
callees); session FULL PASS. Diff actually does that. Match.

## Inventory

- dotravel_target (cmd.js:4983): the `if (!travelStep) {
  u.dx=0; u.dy=0; nomul(0); }` block deleted, replaced by a
  C-cited comment; `travel1 = 0` + `domove(u.dx||0, u.dy||0)`
  retained. C: hack.c `:1515` `return FALSE` (read — no
  dx/dy write, no nomul) vs `found:` `:1518–1522` (read —
  zero + nomul(0)); domove_core `:2724–2728` (read — falls
  through, no early return).
- The two true `found:` exits verified in pinned C: the
  `if (u.tx != u.ux || …)` block closes immediately before
  `found:` (dest==hero falls in — zero+nomul), and the only
  `goto found` is `:1489` (guess no-pick TEST_MOVE fail).
- Callees already apply both (read): travel dest==hero
  (:4733), guess dest==hero (:4762) + no-pick (:4859); the
  shared BFS exhausts to a bare `return TRAVEL_NOPATH`
  (:4689, no dx/dy write, no nomul — the `:4658` nomul is C
  `:1400–1418` TRAVEL success/stop, not exhaust).

## C ↔ JS fidelity

Control-flow confirm against pinned C. Pre-fix JS applied
`found:` semantics (zero+nomul) on the `:1515` exhaust path
— C's own structure (exhaust `return FALSE` four lines above
`found:`) proves the two exits differ, and the deleted
comment's claim ("BFS-exhausted exits return NOPATH without
it, so apply it here") was exactly backwards. Post-fix the
stale step flows: callees return NOPATH untouched →
travel1=0 → domove(stale) → sticky/m_at arms run on the
holder's square, C order. The "18 earlier `_` matched"
explains why only the into-holder stale step diverges
(stale-away ≡ self-step under the escape draw) — consistent,
not load-bearing; the FULL PASS is the proof.

## Hallucinations / overclaim

None. "The split callees already apply the two true `found:`
exits" verified above (all three sites read). Standing
travel_test_move omits correctly scoped to test_move's row.
No DIAG/FORCE/seed in code (0 hits).

## Density

Cliff-phase: parent HEAD was distfleeck (1 block, first 895 —
verified in b25b42ecf queue); owner read whole per D-3559 +
parked: SYMPTOM tag, writer port. Ledger: findtravelpath
split + D-3856, dotravel_target ported + D-3856. Reached:
probe FULL PASS.

## Verification

js-hunk grep: 0 hits. Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify distfleeck --base bf0c7986d~1
--reach-all` → `1 session(s) blocked on it (1 at baseline, 0
in the working scoreboard)`, Valkyrie-578204 PASS, `1 PASS,
0 moved past, 0 unchanged, 0 worse → PROGRESS`; reach
1108/1108 REACH-OK (602s). Zero regressed. The FULL-PASS
claim is exactly true.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
