# Review 2450 — fe0e9911e — runSegment: skeleton cap → C `for(;;)` (D-3567)

**Metadata.** SHA `fe0e9911e` (2026-10-06, D-3567). Type: **cliff**:
writer port (the harness drive loop) for the cliffs head `monmove.c
distfleeck`. `js/` insertions: 11 (`js/jsmain.js` +11/−2) + 1 test
file (69 lines).

## Intent vs deliverable

Promise: delete the starter-skeleton `max(moves*8, 1024)` cap so
turn-dense segments run to input exhaustion like C; both longrun
sessions →PASS; hang protection becomes the worker timeout; red/green
replay test.

Diff actually adds: cap out, `for (; !gameover;)` + try/catch + C-cite
comment. Promise matches diff — but the blast-radius claim below it
("exactly these 2 segments exceed their cap, so no other session can
change behavior") is false: one session regressed from scoring to a
hang (see Verification).

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | drive loop (`runSegment`; `moveloop` body pre-existing whole) | ported | [jsmain.js](/home/debian/dev/teleport-contest/js/jsmain.js:409) | allmain.c:586–597 |

Helpers: none. `moveloop_core` live, untouched.

## C ↔ JS fidelity

**Unbounded in C:** allmain.c:586–597 read — `moveloop` is preamble
(:589), tutorial (:592), then `for (;;) { moveloop_core(); }` (:594–596)
with no cap; exits are noreturn (death/quit/save) ✓. The JS driver is
now the same loop with the two harness stops explicit: the loop
condition + post-core `gameover` break (`dosave` sets `gameover=true`,
save.js:1418, read) and the `Input queue empty` catch-break ✓.
Non-input exceptions rethrow ✓.

**The exposed livelock (C-wrong 1):** C :515–531 read — the `multi >
0` + `mv` arm replays arg-less `domove()`, which recomputes travel
per step and terminates the run on arrival/blockage. JS
(allmain.js:1543–1549) replays `domove(dx, dy)` with a stale explicit
direction and only decrements `multi` below COLNO. A travel-shaped
zombie state (`mv` set, `multi = 80 = COLNO`, `run` cleared) therefore
spins forever: no decrement, no input read (by design), no move, no
termination — where C's arg-less `domove()` would end the run. The cap
masked this livelock; removing the cap without fixing the arm shipped
the hang. The `for(;;)` itself is C-correct and stays; the arm is the
C-wrong.

## Hallucinations / overclaim

The mechanism for the 2 longruns is sound (iter==maxIter probe,
seg1-consequential analysis — Valk's full PASS through the D-3565
prompt path additionally integration-tests 2448). But "corpus-wide
scan of all 941 cached sessions: exactly these 2 segments exceed
their cap, so no other session can change behavior" is false:
scen-ride-Knight-94415 (259 moves, cap 2072) scored truncated at the
parent and hangs now — it exceeded its cap yet was not in the scan's
exceed set (941 cached ≠ 953 corpus; a no-draw spin is invisible to a
draw-count scan). A blast-radius claim that misses a hang is a false
verification claim.

## Density

Cliff §10.18: distfleeck-head writer, one loop, own `Ledger:` entry;
the 2 longrun PASSes are real movement. But a REGRESSED session
(scored → hang) is a C-wrong the port introduced, and the D-log's
no-other-session claim is false. Per-function verdict QUALITY-RISK →
SHA QUALITY-RISK.

## Verification

- Added-code grep: clean.
- Rule #2: clean this iteration (see 2445).
- `node --test scripts/moveloop-unbounded-drive.test.mjs`: 2/2 pass.
- Re-measure (mine, `--base fe0e9911e~1 --reach-all`, current code):
  `moveloop`: 0 blocked, smoke 24/24 REACH-OK; `distfleeck`: **2 PASS
  (both longruns), 1 unchanged (Wiz-94142@96), 0 worse**; `reach
  distfleeck`: **746/746 → REACH-OK**. The D-log's owner/reach claims
  hold — the regression is outside every sampled set, caught only by
  this audit's full rescore.
- Full-rescore catch: scen-ride-Knight-94415 `dosounds@129`
  (6682/7493 RNG, 131/259 screens) → `error: "worker: "` hang.
  Bisect (direct replay): 4f670fdff js/ scores normally;
  fe0e9911e js/ hangs (spawnSync ETIMEDOUT, RNG 0/0). Counted /tmp
  drive (/tmp/hang-drive.mjs): moves/qlen/multi frozen at 46/128/80
  (= COLNO — never decrements), hero (68,14); CPU profile chain
  `moveloop_core → domove → flush_screen → render_map_row` every tick.

## Actionable C-wrongs

1. **Hang: scen-ride-Knight-94415 spins forever in the `multi>0` +
   `mv` replay arm** (allmain.js:1543–1549) after the cap removal —
   `multi = 80 = COLNO` never decrements, stale-`dx/dy` `domove` never
   moves or ends the run, input never read. Fix the non-termination
   against C allmain.c:515–531 + arg-less `domove()` travel handling
   (likely the explicit-`dx/dy` replay skipping travel recompute, or a
   run/mv/multi teardown gap); keep C's `for(;;)` — do NOT restore the
   cap. Session must score ≥ its pre-D-3567 prefix (6682 RNG / 131
   screens). Diagnose with /tmp/hang-drive.mjs (counted drive) + CPU
   profile recipe in this review.

Verdict: **QUALITY-RISK**

**Addressed:** D-3571 `8ec2b4d66`
