# Review 2250 — be60a5eca — u_on_rndspot On_W_tower_level gate

Metadata: SHA `be60a5eca7a2e94487d4b83b8a9f53b75b3f9328` (D-3289,
2026-10-02). `js/mklev.js` only (import name +
doc + gate + `| 0` ×4). One function:
`u_on_rndspot` (C dungeon.c:1604–1638; this
SHA: the :1614 gate).

Intent vs deliverable: subject promises the
tower branch keyed off the destination level
instead of `nlx` presence. The diff ships the
canonical gate, the `| 0` coercions, and
retires the doc's "gate deferred" line.
Delivers what it promises.

Inventory:

- Gate (:741): `was_in_W_tower &&
  On_W_tower_level(game.u?.uz)` replaces
  `was_in_W_tower && dndest.nlx`.
- `| 0` on the four tower-branch rect args,
  sibling-arm idiom.
- `On_W_tower_level` added to the existing
  dungeon.js import — same-edge name, no new
  module edge. No symbol deleted or
  re-pointed → ran `sym.mjs` anyway:
  `On_W_tower_level js/dungeon.js:1291
  sync`, single export, no mklev clone ✓.

**C ↔ JS fidelity**: gate ≡ C :1614 verbatim
(`was_in_W_tower && On_W_tower_level(&u.uz)`,
short-circuit order kept; JS `!!(upflag & 2)`
≡ C int in boolean context) ✓. Tower
place_lregion args ≡ C :1616–1619 (dndest
n-rect, zero exclusion, LR_DOWNTELE, null)
✓. `| 0` matches C shorts; `nlx == 0`
on-tower → lx 0 → whole level is exactly C's
"Unspecified region (.lx == 0) defaults to
entire level" comment ✓. Gate callee LIVE:
body is the wiz1/2/3 `on_wiz_level` disjunct
(read :1291–1295), sync-called-from-async ✓.
Old behavior (stale-nlx off-tower takes
tower branch; nlx-0 on-tower misses it) was
a genuine C-wrong; the fix removes both
directions ✓. Callers: all 4 C sites
pre-wired per the D-log (cmd.c:1045,
do.c:1736/1740 = the D-3287 arms, do.c:1804,
stairs.c:120), unchanged here ✓. No RNG in
the gate ✓.

Hallucinations / overclaim: none. "No corpus
divergence — C-fidelity residual" disclosed;
no corpus PASS claimed.

Density: single-gate fix on a whole-function
claim (`u_on_rndspot` body otherwise
pre-ported: up/down arms + switch_terrain);
exception documented (callees all live,
nothing more Open). `Ledger: u_on_rndspot
ported` ✓, one Verify ✓.

Verification: D-log Verify shows hidden-vacuous
+ smoke 24/24 + green/strict/cohort/full.
Re-measured (`verify u_on_rndspot --base
be60a5eca~1 --reach-all`): `0 blocked` +
vacuous note + `smoke 24 PASS, 0 regressed →
REACH-OK`. Exact match; zero REGRESSED.
Banned-pattern grep: clean. Rule #2 clean
(iteration-wide).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
