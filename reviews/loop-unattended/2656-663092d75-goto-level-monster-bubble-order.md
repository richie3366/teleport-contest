# Review 2656 — 663092d75 — goto_level stash monster/bubble order (D-3792)

Metadata. SHA `663092d75` (2026-10-10), D-3792, parent
`2e9bcf454` (HEAD). js diff: `js/do.js` +7/−3 —
the two monster lines move before
restore_waterlevel + C-order comments. Works
cliffs row-2 getlev (95203).

## Intent vs deliverable

Promise: 95203@388 — C `rnd(10)` (getlev
catchup) vs JS `rn2(6)` (mv_bubble): traced
flat logs show 761=761 draws with IDENTICAL
multisets in swapped block order (C [51
catchup][66 bubbles-ini], JS reversed) and the
raw ISAAC stream in lockstep — a pure order
bug, not a missing draw.

Diff moves exactly the two lines. Promise and
diff match.

## Inventory

Changed JS (1 writer order):

- goto_level stash arm — `js/do.js:2069–2077`.
  C: `restore.c:1181–1228` (whole span read:
  monster loop `:1181–1221` incl. the `:1219`
  hide_monst `rnd(10)` gate, rest_bubbles
  `:1226`, load_exclusions `:1227`, rest_track
  `:1228`).

## C ↔ JS fidelity

**Order C-exact.** C runs the monster loop
(place + catchup + `:1219` gate) before
rest_bubbles; JS now does place → catchup →
restore_waterlevel → exclusions in the same
relative order, with `:1226/:1227/:1228` cites
in place. No line's content changed, so no
callee audit is owed. The untouched orders are
correctly excluded: dorecover has elapsed=0
(catchup draws nothing there), the ghostly
path short-circuits the `:1219` gate (no
`rnd(10)` drawn), and timers/lights/rooms
restores draw nothing on this path. The
multiset+lockstep measurement is the strongest
possible evidence for an order-only fix. No
symbol deleted or re-pointed, so no sym.mjs
paste is owed.

## Hallucinations / overclaim

None. Diff grep: zero hits. The flatlen pins
(catchup-entry 36506, bubbles-entry 36608)
and the same-117-u64s stream claim are
measured, and the "Sokoban/exclusions
untouched" scope is named.

## Density

Cliff-phase §2b: one row-2 writer order fix,
no bundling. 95203 388 → 418 (+30). do.js
shared — full 44/44 ran.

## Verification

D-log Verify: getlev 1 moved; REACH-OK 60/60;
gates + cohort + full PASS.

Re-measured by this audit (`verify getlev
--base 663092d75~1 --reach-all`):

```text
verify getlev: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-worldtour-Samurai-95203: moved → distfleeck at step 418 (was 388)
reach getlev: 60 PASS, 0 regressed → REACH-OK
```

Matches the D-log exactly. 0 regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
