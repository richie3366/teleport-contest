# Review 2726 — f7cc0401e — newman newuhs (D-3866)

Metadata: SHA `f7cc0401e`, D-3866, cliffs-head
`botl.c` do_statusline2 writer (newman dropped
`:436` newuhs — stale Satiated). JS:
`js/polyself.js` (+3: one await + C cite). Test:
`scripts/newman-uhs-recompute.test.mjs` (new).

## Intent vs deliverable

Promise: Rogue-578101 — C newman re-rolls
uhunger at `:414` and recomputes uhs at `:436`
before the new-form announce, but JS never
called newuhs on the survived path, so the
status line kept stale Satiated; one `await
newuhs(false)` at the C `:436` position;
marathon FULL PASS. Diff actually does that.
Match.

## Inventory

- newman survived path (polyself.js:1185): one
  `await newuhs(false)` after the uhp<=0/dead-arm
  check (with its lifesaved return), before the
  newform/female/race announce block. C:
  polyself.c `:414` uhunger re-roll … `:419–
  435` uhp<=0/dead arm (lifesaved newuhs at
  `:433` + return) … `:436` newuhs(FALSE) …
  `:437+` newform (all read) — position exact.
- newuhs is the live async eat.js:528 export
  (`sym.mjs`: ASYNC — await required),
  imported at polyself.js:18, awaited. The
  lifesaved-arm newuhs at :1117 (C `:433`)
  pre-exists — the function now carries both C
  calls, no double-fire (disjoint arms).

## C ↔ JS fidelity

Position-and-order confirm. The insert sits
exactly where C `:436` runs: post-dead-arm,
pre-announce. uhs recompute reads the re-rolled
uhunger — the stale-Satiated mechanism is
direct (no recompute ⇒ old uhs paints). No RNG
drawn by newuhs itself (pure recompute +
botl); the `:414` rn1 re-roll is untouched and
already matched (status-only divergence).

## Hallucinations / overclaim

None. This delivers exactly the previous
audit's predicted Next ("Rogue-578101 s580 …
polyself-turn hunger writer (uhs/uhunger), not
the painter") — prediction and writer match.
No DIAG/FORCE/seed in the js hunk.

## Density

Cliff-phase: do_statusline2 head; writer ported
(a 3-line whole-arm completion — newman now
whole vs C `:335–466` per the D-log), painter
untouched. Ledger: polyself.c row + D-3866.
Reached: probe FULL PASS.

## Verification

Rule #2 clean (iteration-wide). Re-measure
(mine): `verify do_statusline2 --base
f7cc0401e~1 --reach-all` → `1 session(s)
blocked on it (1 at baseline, 0 in the working
scoreboard)`, Rogue-578101 PASS, `1 PASS, 0
moved past, 0 unchanged, 0 worse → PROGRESS`;
smoke 24/24 REACH-OK. Zero regressed. (This
also explains review 2721's second PASS:
578101 stayed blocked through e0e05880b and
fell here — later progress, correctly
unclaimed there.) The FULL-PASS claim is
exactly true.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
