# Review 2711 — 8619ac360 — domove run-stop nomul(0) (D-3850)

Metadata: SHA `8619ac360`, D-3850, cliffs-head `botl.c`
do_statusline2 writer (region-heuristic symptom owner, not
re-ported). JS: `js/cmd.js` (+6/−2: one call swap + C cite).
Test: `scripts/runstop-furniture-nomul.test.mjs` (new, 1 `it`,
chain-prefix to step 621).

## Intent vs deliverable

Promise: Archeologist-578126@621 — JS domove's furniture
run-stop called end_running (run cleared, no botl) where C
calls nomul(0) (botl when multi>=0), so check_here skipped
nomul and flush_screen skipped bot(): live Stressed never
painted; swap the call; session moves 621→824. Diff actually
does that — one call, predicates untouched. Match.

## Inventory

- domove run-stop arm (js/cmd.js:7070): `end_running(true)` →
  `nomul(0)` under the pre-existing `run && run<8 &&
  (typ===DOOR || IS_OBSTRUCTED || IS_FURNITURE)` guard. C:
  hack.c domove_core `:2937–2943` (`run<8` + the three
  predicates → `nomul(0)`); nomul `:4161–4175`
  (`disp.botl |= multi>=0`, uinvulnerable/usleep clear,
  multi=nval, reason clear, end_running, cmdq_clear).
- `nomul` already imported (cmd.js:136, used :3987/:4021/:4061)
  — no new edge. No helpers added, none deleted.

## C ↔ JS fidelity

Call-for-call confirm. C `:2937–2943` (read) gates on
`svc.context.run` + `<8` + IS_DOOR/IS_OBSTRUCTED/IS_FURNITURE
of dest tmpr, then `nomul(0)` — the JS guard is the same
shape over the same dest cell, and the swapped call is now
C's call. JS nomul (hack.js:1675, read) matches C `:4161–4175`
line-for-line: `multi<nval` early return, botl iff
multi>=0, uinvulnerable=false, usleep=0, multi=nval,
reason clear, end_running(true), canned-queue clear. The
paint mechanism follows: run multi is max(COLNO,ROWNO) ≥ 0,
so botl sets and check_here's flush_screen→bot paints the
already-correct Stressed. Run-onto-grave is the only newly
botl-setting path — narrow, C-cited.

## Hallucinations / overclaim

None. The "temp DIAG (reverted)" is message-only (0 js-hunk
grep hits); run-flag-0-at-check_here + invent/near_capacity
reads are measured state, and the movement is the proof.
Standing notes (domove_core partial omits, check_leash order)
are correctly scoped as pre-existing, not this divergence.

## Density

Cliff-phase: parent HEAD was do_statusline2 (3 blocks, first
621 — verified in e78b87757 queue); writer identified from
the first divergence, not a painter re-port. Ledger:
domove_core partial + D-3850. Reached: probe moved 621→824
at ship (re-measured below at 1070 — D-3851 moved it again).

## Verification

js-hunk grep: 0 hits. Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify do_statusline2 --base 8619ac360~1
--reach-all` → `3 session(s) blocked on it (3 at baseline, 2
in the working scoreboard)`, Archeologist `moved → ghitm at
step 1070 (was 621)`, Knight-578142 + Rogue-578101 still
do_statusline2 (same two writers the D-log names: T:39-vs-40,
Satiated), `0 PASS, 1 moved past, 2 unchanged, 0 worse →
PROGRESS`; smoke 24/24 REACH-OK (no RNG-tagged reach).
Zero regressed. The movement claim is exactly true.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
