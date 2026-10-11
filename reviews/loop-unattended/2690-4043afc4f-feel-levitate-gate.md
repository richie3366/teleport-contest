# Review 2690 — 4043afc4f — feel_location gate reads live Levitation/Flying

Metadata: SHA `4043afc4f`, D-3827, cliffs head `detect.c` mfind0
writer (mfind0 untouched — whole per D-3656). JS: `js/display.js`
(import + gate predicate). Test:
`scripts/feel-levitate-gate.test.mjs`.

## Intent vs deliverable

Promise: `feel_can_reach_floor` tested dead `u.Levitation`/
`u.Flying` mirrors (never set under FROMFORM), so blind
FROMFORM-levitating search ran the reachable arm; read the live
mhitu exports. Claimed: 95342 → PASS. Diff actually does:
exactly that — two reads re-pointed, omits documented. Match.

## Inventory

- `feel_can_reach_floor` (js/display.js:5683) — changed: the
  Levitation/Flying tests now call the live exports. C
  `can_reach_floor(FALSE)` (`engrave.c:186–214`, csym):
  uswallow/ustuck-hugs/Levitation-block → FALSE (`:190–199`),
  usteed `:201`, ceiling-hider `:203`, Flying/msize `:206` →
  TRUE, check_pit tail `:209–211` (correctly skipped — FALSE
  arg). Gate context: `feel_location :745–909` with
  `if (!can_reach_floor(FALSE))` at `:777` (csym).
- Imported: `Levitation` (js/mhitu.js:699, sync), `Flying`
  (js/mhitu.js:707, sync) — both LIVE; `sym.mjs` (required —
  clone reads → imports): Levitation has 10 remaining clones,
  Flying 7, elsewhere — untouched, not swept. display→mhitu
  edge ALREADY (no new edge; `--can` confirms).

## C ↔ JS fidelity

Ported arms match C in C order: uswallow → Levitation(+air/
water exception) → Flying → default TRUE. Every omitted arm is
named with its C line: ustuck-hugs (`:192–197`), usteed
(`:201`), ceiling-hider (`:203`) pre-existing; msize≥MZ_HUGE
(`:206`) newly named — and I verified it is unobservable in the
inline (it returns TRUE, the inline's default; no earlier arm
can misfire onto it). The taken-arm diagnosis (Levitation Rules
→ room arm → `!Is_rogue` false → stone-blank) is measured
(prefix probes + geom-probe 680/680 + RNG-full), and the probe
PASS validates the pre-existing body's arm end-to-end. At the
probe state (`u.Levitation` undefined, HLev FROMFORM, live
`Levitation()` true) the gate flips TRUE→FALSE exactly as C's
property does. No RNG; none added. Gap: none.

## Hallucinations / overclaim

None. The D-log does not claim the whole feel_location was
re-ported — only the gate predicate — and the Callers bullet
maps every previously-wired `can_reach_floor` site the fix
rides (fresh line numbers, signature unchanged).

## Density

Cliff-phase: head writer correct (gate predicate, not a re-port
of mfind0). The inline documents its contract against C
(`can_reach_floor(FALSE)` minus 4 named arms) — whole on the
ported arms. Ledger: `feel_location ported`. Verify bullet: 1
PASS + REACH-OK ×2 + green + strict + cohort + full 44 (auto on
shared-file change). Not unreached: probe PASSES.

## Verification

js-hunk grep: 0 hits. Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify feel_location,mfind0 --base
4043afc4f~1 --reach-all` → `verify mfind0: 1 PASS, 0 moved past,
0 unchanged, 0 worse → PROGRESS` (95342 PASS), smoke 24/24
REACH-OK ×2; feel_location vacuous at baseline (as the D-log
says). Exactly the D-log claim, zero regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
