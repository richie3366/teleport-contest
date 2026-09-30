# Review 2115 — 8a2b677db — cost impossible arm + async

- SHA: `8a2b677dbea2dfdc4ffa3808f39a670de539fbaf` (D-3155)
- Date: 2026-09-30. `js/` delta: +5/−3 write.js (import + tail + caller await).
- Cluster: `cost` arm completion + `case_insensitive_comp` stale disposition.
- Prior-review closure claimed: none.

## Intent vs deliverable

Subject promises: "cost impossible arm + async". Diff actually adds:
the `await impossible(...)` tail in `cost`, `cost` → async with the
single caller awaiting, one import-name addition, plus ledger stale
for `case_insensitive_comp`. Promise matches deliverable.

## Inventory

| JS function | Change | Class |
|---|---|---|
| `cost` (write.js:96, local — C `staticfn`) | tail: `await impossible` + `return 1000`; now async | whole |
| `dowrite` (write.js, caller) | `await cost(...)` | wiring only |
| `case_insensitive_comp` (date.js:31) | no code change — ledger stale → ported | disposition |

`sym.mjs cost` reports "NOT EXPORTED — 1 LOCAL" — correct, C is
`staticfn` (`write.c:13`); the generic "clone drift" caution does not
apply. Nothing deleted or re-pointed. `impossible` joins a
pre-existing `./display.js` edge — no new cross-module import.

Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/step/coordinate reads,
`fastforward`, or hardcoded coordinates. Rule #2 clean (run this iteration).

## C ↔ JS fidelity

**`cost`** — C `write.c:13–57` (`csym`), sole caller `write.c:256`.
Walked the full JS body against C arm-for-arm: SPBOOK `10*oc_level`
(`:17–18`) ✓; SCR_MAIL → 2 (`:22–23`) ✓ with `MAIL_STRUCTURES`
confirmed unconditionally defined (`include/global.h:430`, verified);
the 8/10/12/14/16/20/30 groups list exactly C's scroll set
(`:25–52`) ✓; BLANK_PAPER/default falls to `impossible("You can't
write such a weird scroll!")` then `return 1000` (`:53–57`) ✓ —
previously returned 1000 silently. No RNG in C, none in JS. Async is
justified: C `:55` `impossible` can block on --More--; the single
caller awaits. Confirm.

**`case_insensitive_comp` stale** — spot-checked: JS `date.js:31`
ports C `hacklib.c:921–937` exactly (ASCII lower, NUL-terminated,
`u1-u2`), wired at `:118` for the `date.c:90` caller. Stale note
accurate. Confirm.

## Hallucinations / overclaim

None. "coverage gap, not a corpus divergence" is accurate; the
`impossible` callee's own omits are correctly left on its partial row.

## Density

- Whole-function verdict: `cost` whole (all arms verified, sole caller wired).
- Small delta (+5/−3) on a coverage row — below the ~80 band, but the
  head row (`cost` PARTIAL) held only this one missing arm and the
  iteration also retired the `case_insensitive_comp` head row as
  stale; acceptable, not padding-worthy.
- One `Ledger:` entry per function (ported + stale) — present.

## Verification

Re-measured myself (`--base 8a2b677db~1 --reach-all`):

```text
verify cost: baseline 8a2b677db~1 — 0 session(s) blocked on it
smoke cost: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

Zero `REGRESSED`; D-log claims match. Vacuous-but-honest: the queue
row cited no blocks. No seed/step/coordinate read.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
