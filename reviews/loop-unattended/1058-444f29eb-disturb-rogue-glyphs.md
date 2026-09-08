# Review 1058 — 444f29eb — disturb wake_msg + ROGUESET object glyphs (D-2088)

## Metadata

- SHA: `444f29eb` — `monmove.c disturb woke the Rogue-level ghost silently and display.js lacked the ROGUESET object-symbol swap (queue owner roguename) (D-2088).`
- JS diff: `js/monmove.js` + `js/display.js` (~45 lines: import name, async conversion + await, DEF_R_OC_SYM + gate + 4 call sites).
- Docs: D-2088 D-log/D-index/CURRENT/NOTES/queue/turns.md map.
- Next index: 1058.

## Intent vs deliverable

Subject promises the missing `wake_msg` («wakes up!» never
printed) and the ROGUESET object-symbol swap (floor armor `[`
vs `]`). Diff delivers both, retires two map rows, and honestly
reports the intermediate state (wake half alone: C-identical
topline but NO MOVEMENT; glyph half moved the session). Two
envelopes in one commit for one session's Rogue-level
presentation — at the edge of §2b but disclosed, and both arms
are live with no stubs.

## Inventory

- Changed: `disturb` (async-converted), `oc_display_sym` (new) +
  4 call sites (`objnum_to_display_glyph`, Hallu-statue memory,
  `obj_glyph` map path + tail).
- `sym.mjs wake_msg` → live async export `js/mon.js:1286`,
  awaited at call time (local-omission → import re-point;
  output pasted in-session).
- Async blast radius: `grep disturb(` shows the sole caller
  `mcalcmove :2167` awaits it; `disturb` is module-local with no
  other callers — no floating promise.
- Diff grep: no `FORCE`/`DIAG`/seed reads, no coordinates.

## C ↔ JS fidelity

`csym.mjs disturb` range: `monmove.c:326–358`. C tail (read
directly) is verbatim:

```c
wake_msg(mtmp, !mtmp->mpeaceful);
mtmp->msleeping = 0;
return 1;
```

JS matches in C position (pre-clear, so the `msleeping` gate
sees the sleeper). Rogue symbols vs `drawing.c:72–79` (read
directly): armor `']'`, amulet `','`, food `':'` exact; gold
rides `_goldsym`, which `assign_graphics` sets to `'*'` on
ROGUESET (display.js:2930–2934 = C GEM_SYM per `:79` «gold — yes
it's the same as gems») — the «same value» claim holds. Driver
`do.js:1604` swaps on Rogue↔Primary transitions and
`assign_graphics` writes `game.currentgraphics`, the exact state
`oc_display_sym` gates on (display.js:2921). Remaining showsyms
(walls/monsters/colors, RogueIBM/load_symset) stay map-named. No
gap found.

## Hallucinations / overclaim

None — the symptom-owner-vs-writer distinction (roguename is a
literal match; the writers are disturb + showsyms) is stated, not
hidden.

## Density

Two related arms, one session, ~45 lines — acceptable as a
single encounter envelope.

## Verification

D-log Verify bullet: `verify --fn roguename` → `0 PASS,
1 moved past, 0 unchanged, 0 worse → PROGRESS` (Tourist-91101
89→maybe_destroy_item@164) + green + strict + cohort + full
44/44 (shared file). Re-measured myself:
`hidden-proxy.mjs verify roguename --base 444f29eb~1` →
identical, 0 worse. Claim reproduced exactly. Rule #2 clean
(prior step).

## Actionable C-wrongs

None.

## Verdict

Verdict: **ACCEPT**
