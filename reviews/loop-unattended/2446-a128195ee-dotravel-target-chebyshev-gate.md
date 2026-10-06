# Review 2446 — a128195ee — dotravel_target: JS-only Chebyshev gate removed (D-3563)

**Metadata.** SHA `a128195ee` (2026-10-06, D-3563). Type: **cliff**:
writer port (removing a JS-only gate) for the cliffs head `monmove.c
distfleeck`. `js/` insertions: 7 (`js/cmd.js` +7/−12) + 1 test file
(55 lines).

## Intent vs deliverable

Promise: delete the JS-only `after <= before` Chebyshev gate so travel
steps C's door-route detour (NW first step toward an east target);
keep the genuine-NOPATH quiet-rest else branch; Tou-94242 72→PASS;
prefix-replay test.

Diff actually adds: gate out, C-cite comment in, `domove` unconditional
inside `if (travelStep)`. Promise matches diff.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | `dotravel_target` (gate removal; rest pre-existing) | ported | [cmd.js](/home/debian/dev/teleport-contest/js/cmd.js:4863) | cmd.c:5346–5377 |

Helpers: none added/removed. `domove`/`findtravelpath` bodies untouched
(diff confirms).

## C ↔ JS fidelity

**No gate in C:** cmd.c:5348–5377 read in full — `dotravel_target` is
two early returns (`isok` :5350, already-here :5354), flag setup
(`travel/travel1/run=8/nopick/DOMOVE_RUSH/multi/mv` :5362–5373), then
bare `domove()` :5375. No distance comparison anywhere ✓. JS :4863–4935
mirrors the same skeleton (early returns, identical flags, `multi =
max(COLNO,ROWNO)`) with `findtravelpath_travel` + `domove(u.dx,u.dy)`
standing in for C's in-`domove` travel step — the removed 12-line
Chebyshev block had no C counterpart, so its deletion is a strict move
toward C ✓.

**The mechanism's C cites check out:** test_move :1097 `flags.autoopen
&& !run` gate (travel's `run=8` skips autoopen) and :1112–1132 bump
path («That door is closed.») read ✓; TEST_TRAV :1134 `goto testdiag`
(paths through closed doors) read ✓. So C's door-route detour +
arrival bump is exactly what the gate suppressed, and the two-turn
message-order argument (monster-phase «door open» before hero-phase
«That door is closed») is consistent with C turn order.

**The kept else branch** (quiet rest on no path) is pre-existing D-0702
code, untouched by this diff; its comment parenthetical is the only new
claim about it, and D-0702's seed0014 holding at full-44 green (D-log;
re-confirmed in this audit's sessions run) keeps it covered. `Ledger:
ported` rests on the now-gateless body + that pre-existing branch —
fair.

## Hallucinations / overclaim

None. "Steps 67–71 byte-equal", "geom-probe hero-only diff (29,5) vs
(30,6)", "16 draws matched, fork at the 17th" are measured probe
outputs; the stash red/green (1/2 pre, 2/2 post) is an authentic-red
check. "D-0702's seed0014 holds — the gate was obsolete" is backed by
the full-44 line.

## Density

Cliff §10.18: distfleeck-head writer, one function, own `Ledger:` entry
✓. The 3 unchanged are the standing per-session :538 writers (named JS
draws each), none a travel fork — scope, not omission. Tou-94242's
72→PASS is full-session PASS (162/162, RNG 6519/6519), the strongest
movement shape. Per-function verdict ACCEPT → SHA ACCEPT.

## Verification

- Added-code grep: clean.
- Rule #2: clean this iteration (see 2445).
- `node --test scripts/dotravel-detour-step.test.mjs`: 2/2 pass.
- Re-measure (mine, `--base a128195ee~1 --reach-all`, current code):
  `dotravel_target`: 0 blocked (honest writer shape — movement was
  claimed on the owner, not here), smoke 24/24 REACH-OK;
  `distfleeck`: **3 PASS, 0 moved, 1 unchanged (Wiz-94142@96, the live
  row), 0 worse → PROGRESS**; `reach distfleeck`: **725/725, 0
  regressed → REACH-OK**. Tou-94242 PASS durable at HEAD. No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
