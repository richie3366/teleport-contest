# Review 841 — a631bae4 — sounds.c zoo_mon_sound zoo_msg print (D-1871)

Metadata: SHA `a631bae4`, D-1871, `js/sounds.js` (+38/−? single module:
`zoo_mon_sound` body + `get_iter_mons` async + six awaited call sites +
envelope comment), map + queue/archive stamps. NOTES.md shrunk 52 lines
in this commit (scratchpad churn, not review-relevant).

## Intent vs deliverable

Subject promises the `zoo_mon_sound` print arm for its corpus owner (C
prints the seal-barking topline, JS stays silent). Diff delivers the arm
plus the necessary async plumbing through the shared iterator. Matches.

## Inventory

Changed: `zoo_mon_sound` (sync → async, RNG-only → print); `get_iter_mons`
(sync → async, `await bfunc`); six `dosounds` call sites awaited (throne,
beehive, morgue, zoo, temple, oracle — I counted all six in the diff; no
other callers of sounds.js's local iterator exist — `dig.js`/`dokick.js`
have their own file-locals, untouched). No deleted symbols, no new imports.

## C ↔ JS fidelity

C locus `sounds.c:114–128` (via csym), walked call-for-call — full confirm:

- Gate `(msleeping || is_animal(data)) && mon_in_room(ZOO)` ✓ (untouched).
- `hallu = Hallucination ? 1 : 0` → JS `Hallucination() ? 1 : 0`, imported
  from `display.js:926` — the C-locus youprop export (timeout-only,
  D-1493), not one of the 8 file-local clones ✓.
- `selection = rn2(2) + hallu` over the 3-element `zoo_msg` — strings
  byte-match C ("…elephant stepping on a peanut." / "…seal barking." /
  "Doctor Dolittle!") ✓; RNG-neutral vs the old code (still exactly one
  `rn2(2)`), so this is a pure screen fix ✓.
- `You_hear1(...)` → file-local `You_hear` (`sounds.js:101`, Deaf/
  acoustics gate + `pline("You hear …")`, no Soundeffect) — matches C
  `You_hear1` semantics; "no Soundeffect on this arm" verified, not just
  claimed ✓. `return TRUE/FALSE` preserved ✓.
- Fresh per-call `hallu` matches C (the local inside `zoo_mon_sound`);
  the dosounds sticky-`hallu` used by other arms is untouched and named.

Callee closure: all LIVE (`is_animal`, `mon_in_room`, `Hallucination`,
`rn2`, `You_hear`). The still-deferred You_hear plines
(throne/beehive/morgue/barracks/court) are RNG-only stubs in *other* arms,
named in the envelope comment + map — "dispatch ported, callee stubbed"
does not apply here since the shipped arm itself is fully live; the stubs
predate this commit and stay named.

## Hallucinations / overclaim

None. The commit message's "i.e. C `You_hear1`" and "faithful youprop
helper" both check out against the code above.

## Density

One print arm + mechanical await propagation through its own iterator, one
module. Right-sized.

## Verification

Re-ran `hidden-proxy.mjs verify zoo_mon_sound --base a631bae4~1` myself:
`1 blocked → explore-seed0116-wizard-wear-shop-d07e6ea5: PASS →
PROGRESS`. D-log claim true. Green + strict ×2 + cohort per D-log; full
suite skipped (single-module change — reasonable). Rule #2 clean. No
FORCE/DIAG/seed/coordinate hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
