# Review 2485 — f2b082ce6 — gethungry debug_hunger gate (D-3604)

**Metadata.** SHA `f2b082ce6` (2026-10-07, D-3604). Type: **cliff**:
writer fix for the cliffs head `allmain.c moveloop_core` (1
corpus block) — the moveloop turn block is whole; the
divergence names gethungry's unread flag. `js/` insertions: 9
(`js/eat.js` +5/−1, `js/options.js` +4/−3 comments) + new test.

## Intent vs deliverable

Promise: wire the `:3167` `debug_hunger` early return C
exercises (Valkyrie toggled it on at step 8) so JS stops
drawing hunger RNG every turn; Valkyrie 47→92 with RNG
2696/2696.

Diff actually adds: the `||` gate + C cites + stale-comment
retirement in options.js. Promise matches diff. No symbols
deleted or re-pointed; no new imports.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | gethungry :3167 gate | ported | [eat.js](/home/debian/dev/teleport-contest/js/eat.js:706) | eat.c:3162–3277 (:3167) + flag.h:309 + optlist.h:275–276 |

Helpers: none (flag read from the live game bag).

## C ↔ JS fidelity

**C gate confirmed.** `csym gethungry` → eat.c:3162–3277, head
`if (u.uinvulnerable || iflags.debug_hunger) return;` (:3167,
read) — before the rn2(10)/rn2(20) draws ✓. Flag
`debug_hunger` at flag.h:309 ("debug: prevent hunger", read) ✓;
option NHOPTB(debug_hunger) optlist.h:275–276 with
`&iflags.debug_hunger` (read) ✓. C callers allmain.c:354 +
hack.c:3056 (csym, both bare calls) → JS allmain.js:1324 +
hack.js:1622 (both pre-existing awaits, grepped) — gate sits
inside gethungry so both inherit it ✓.

**JS mirrors C.** `if (game.u?.uinvulnerable ||
game.iflags?.debug_hunger) return;` — same order, same
disjunction ✓. The uinvulnerable-falsification cite holds too
(C's TRUE-setter pray.c:2269, re-read under D-3600) ✓. The
allopt-twin null stays named in-row (config/parseoptions path;
SET_WIZNOFUZ wizard-only, no corpus reach) — honest scoping,
not a silent stub. The doset toggle → `game.iflags` write path
is proven live end-to-end: the gate change alone moved the
session, so the flag the menu toggled at step 8 is the flag
the gate reads.

## Hallucinations / overclaim

None. "Measured, not theorized" is earned (recorder message +
menu row + RNG log, each cited with step numbers), and the
`p`/`on\non` keystroke accounting pre-empts the obvious
alternative (an off-toggle).

## Density

Cliff §10.18: parent queue head is moveloop_core
(Valkyrie-94311 step 47 — re-read from
`f2b082ce6~1:docs/LOOP-QUEUE.md`) ✓. One cliff, own `Ledger:`
touch (D-3604 on gethungry, note rewritten from "unwired" to
live), probe moved with full RNG match. Per-function verdict
ACCEPT → SHA ACCEPT.

## Verification

- Added-code grep: clean (gate + comments).
- Rule #2: `imports.mjs --rulecheck` clean (run this iteration).
- Committed test `gethungry-debug-hunger.test.mjs`: 3/3 PASS now.
- Re-measure (mine): `verify moveloop_core --base f2b082ce6~1
  --reach-all --jobs 8` → **0 PASS, 1 moved past, 0 unchanged,
  0 worse** (Valkyrie-94311 47→mlevel_tele_trap@92 — exactly
  the D-log landing) + reach 818/818 REACH-OK. No REGRESSED
  session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
