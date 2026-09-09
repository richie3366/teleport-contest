# Review 1169 — 2b917b52 — STUNNED timeout expiry arm (D-2203)

Metadata: SHA `2b917b52`, `js/timeout.js` only (+15). D-log:
D-2203. Queue: `potion.c` make_stunned, 1 blocked
(scen-poly-Archeologist-92226 step 112, 0 blocked RNG).

## Intent vs deliverable

Subject promises: generic-loop `p === STUNNED` expiry arm
(`set_itimeout(&HStun,1)` + `make_stunned(0,TRUE)` +
`stop_occupation`). Diff adds exactly that arm, nothing else.
Promise kept.

## Inventory

Changed JS: one `if` arm in `nh_timeout` (`js/timeout.js`).
`make_stunned` LIVE (`js/potion.js:878`, awaited ✓),
`stop_occupation` LIVE, `STUNNED` in scope — no new imports, no
clones/stubs. Nothing deleted or re-pointed.

## C ↔ JS fidelity

Arm vs `timeout.c:737–742` (read): C `set_itimeout(&HStun, 1L);
make_stunned(0L, TRUE); if (!Stunned) stop_occupation()`. JS:
re-arm `(HStun & ~TIMEOUT)|1` + `Stunned` mirror, `await
make_stunned(0, true)`, `if (!(HStun||Stunned))
await stop_occupation()` ✓.

Two equivalences verified myself: (1) `Stunned ≡ HStun` is
literal C — `youprop.h:81` `#define Stunned HStun` — so the
mirrored-flats stop gate is exactly `!Stunned` ✓. (2) JS
`make_stunned` (`js/potion.js:878–903`, read) ports
`potion.c:106–131` faithfully: `old = HStun`, Unaware mutes talk,
`!xtime && old` → "a bit steadier"/"less wobbly" feel pline, botl
on change, `set_itimeout(xtime)` + mirror — so the caller's
re-arm (generic `--` already zeroed it) is load-bearing and
correct: `old=1` lets the steadier pline fire, then both slots
end at 0 and the arm cannot re-fire ✓. Same shape as the
HALLUC/CONFUSION arms. Zero RNG draws either side ✓. The
Hallu-adjective gate delta (`u.Hallucination||u.HHallucination`
vs C `HHallucination && !Halluc_resistance`) is pre-existing,
named, and untouched — not this SHA's debt.

## Hallucinations / overclaim

None. Single-session screen-only claim with the draw-free
diagnosis stated (stepFns carry no make_stunned) — consistent
with a timeout-expiry writer.

## Density

15 lines for one expiry arm closing one queue row. Small but C
is 6 lines; §2b floor is not a padding target. Fine.

## Verification

D-log Verify: syntax, rule2, hidden 1 PASS, green, strict,
cohort 7/7, full skipped per runner. Re-measured myself:
`verify make_stunned --base 2b917b52~1` →
`1 blocked at baseline → Archeologist-92226: PASS → PROGRESS`.
Real baseline block, real PASS, no D-1831 shape. Rule #2 re-run
clean. No FORCE/DIAG/seed/coordinate in the hunk.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
