# Review 2998 — cc4fc3643 — read_engr_at calls surface() before the engraving test

- SHA: `cc4fc3643` (cliff; owner-null reserve row scen-sweep-Ranger-50950041
  s1169 + castmu row scen-hallu-Ranger-51450008 s762; writer engrave.c
  read_engr_at)
- D-entry: D-4158; Ledger: read_engr_at ported
- `js/` diff: js/engrave.js +4 −1

## Intent vs deliverable

Promise: C read_engr_at computes `eloc = surface(x, y)` on entry,
before it tests for an engraving. Over water or lava, surface returns
`hliquid(…)`, which spends one display-RNG draw while the hero
hallucinates. pickup → read_engr_at runs after every hero move, so a
hallucinating flier over water draws on each step. JS returned on `!ep`
or empty text before surface. Diff: the `surface(x, y)` line moves up to
right after `engr_at`. The promise matches the diff.

## Inventory

- `read_engr_at` — engrave.js:699–…; C engrave.c:317–405.
- Callees, unchanged: `surface` (sit.js:492, sync, LIVE; C dungeon.c
  :1749–1788) → `hliquid` (do_name.js:407, sync, LIVE;
  `rn2_on_display_rng(count)` when hallucinating, as in C do_name.c
  :1493–1510).
- Callers unchanged (pickup / domove tail, look_here).

## C ↔ JS fidelity

C, from the top: `ep = engr_at(x, y); eloc = surface(x, y); sensed = 0;
if (ep && ep->engr_txt[actual_text][0]) { switch … }`, followed by the
`sensed` tail. JS now runs engr_at, then surface, then the two early
returns that stand for C's `if` (C has nothing after the block that runs
when `!ep`). The order is call for call. engr_at draws nothing. Among
surface's arms only the pool and lava arms reach hliquid, and only a
hallucinating hero or an empty preference draws. The u.uswallow arm
returns first in both, so an engulfed hero draws nothing, as in C. The
`blind` read stays below the returns, and Blind() is RNG-free, so
keeping it there is harmless.

## Hallucinations / overclaim

None. The fix moves one line. It explains both rows: hallucinated glyphs
in the sweep row, and a hallucinated caster name in the hallu row, both
read off the shared display stream.

## Density

The writer of two rows, one owner-null and one under a symptom owner
(castmu). That fits §10.20: an unattributed row, measured and its writer
named.

## Verification

```text
verify read_engr_at,castmu --base cc4fc3643~1 --no-reach
  read_engr_at: 0 blocked (vacuous — rows were owner-null / castmu)
  castmu: 1 PASS (scen-hallu-Ranger-51450008) → PROGRESS
```

scen-sweep-Ranger-50950041 is PASS at HEAD (see review 2997's
re-measure). The D-log's `score --ids` +2 is reproduced row by row.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
