# Review 1166 — fda2efaf — make_hallucinated set/clear (D-2200)

Metadata: SHA `fda2efaf`, `js/display.js` +8, `js/timeout.js`
+13/−2 (one import name, one expiry arm). D-log: D-2200. Queue:
`potion.c` make_hallucinated, 1 session blocked
(scen-intrinsic-Caveman-92052).

## Intent vs deliverable

Subject promises: docrt-entry `--More--` flush (set side, step 17)
plus HALLUC expiry arm (clear side, step 75) for the same session.
Diff actually adds both, nothing else. Promise kept.

## Inventory

Changed JS: `docrt()` head (`js/display.js`); generic-timeout HALLUC
arm (`js/timeout.js`). `make_hallucinated` LIVE at
`js/potion.js:998` ASYNC (awaited ✓); `flush_topl_more`
`js/display.js:7133` ASYNC (awaited ✓); `stop_occupation`
`js/hack.js:1034` ASYNC (awaited ✓); `Hallucination()` live predicate
imported from display.js. Same-edge import (timeout.js←potion.js
already carries make_confused/made_deaf). Nothing deleted.

## C ↔ JS fidelity

Expiry arm vs `timeout.c:778–783` (read directly): C
`set_itimeout(&HHallucination,1L); make_hallucinated(0L,TRUE,0L);
if (!Hallucination) stop_occupation()`. JS: re-arm flat
`(HHallucination & ~TIMEOUT)|1`, `await
make_hallucinated(0,true,0)`, `if (!Hallucination())
await stop_occupation()` ✓ — including the re-arm-from-zero trick
(the generic `--` above already zeroed it; C's `set_itimeout(1L)`
does the same from 0, so `old=1≠0` lets the "SO boring" pline +
see_* refresh fire). Mirrors the live CONFUSION-arm shape
(`js/timeout.js:885–893`), except the stop gate calls the real
`Hallucination()` predicate where C calls `Hallucination` — more
faithful than the CONFUSION arm's flat check. Confirm.

Set side: `await flush_topl_more()` first inside `docrt()`'s guarded
body (after the in_docrt latch, before uswallow/vision arms), so the
pending More waits on the intact see_* paint (`potion.c:424–426`
paints before the pline) rather than the mid-redraw floor — matches
C `cls` flushing WIN_MESSAGE before clearing WIN_MAP, per the code
comment. No-op when nothing pends; display-only, zero RNG surface.
Confirm (full 44/44 below rules out collateral timing shifts).

Named omits stay in the map (EHalluc_resistance mask polish,
eatmupdate mimic-orange, update_inventory, itch/flatten messages,
HALLUC-intrinsic save/restore) — map-named, not Must-fix. No clones,
no stubs in a live arm.

## Hallucinations / overclaim

None. Two-sided claim (17→75 on the docrt half, PASS on the expiry
half) is specific and re-measured true below.

## Density

~21 js insertions for one function family (set + clear) closing one
queue row with a recorded PASS. §2b right-sized.

## Verification

D-log Verify: syntax, rule2, hidden 1 PASS, green 2/2, strict ×2,
cohort 7/7, full 44/44 (shared files changed, so full ran).
Re-measured myself:
`verify make_hallucinated --base fda2efaf~1` →
`1 session blocked at baseline, 0 now — Caveman-92052: PASS →
PROGRESS`. No vacuity, no D-1831 rewrite (the baseline block is
real, the PASS is on this SHA's code). Rule #2 re-run clean. No
FORCE/DIAG/seed/coordinate in the hunks.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
