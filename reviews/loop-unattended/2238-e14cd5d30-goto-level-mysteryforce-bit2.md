# Review 2238 — e14cd5d30 — goto_level mysteryforce + W-tower bit 2

Metadata: SHA `e14cd5d307e72141361bc940df1323ff5828dd25` (D-3277,
2026-10-02). `js/do.js` (+71/−? arm + bit-2 call) and
`js/dungeon.js` (+8 `dunlev` export). Two functions:
`goto_level` arms (C do.c:1478–1998) + `dunlev` whole body
(C dungeon.c:1324–1328).

Intent vs deliverable: subject promises the Gehennom
amulet mysteryforce arm + W-tower rndspot bit 2. The diff
adds the :1541–1573 arm in C order, the `:1804` bit-2 call,
entry `was_in_W_tower` capture, `new_ledger` const→let,
and a canonical `dunlev` export. Delivers what it
promises; no clone re-pointed, none deleted.

Inventory:

- `goto_level` mysteryforce arm (js/do.js:1695–1727):
  In_hell && up && amulet && !newdungeon && !portal &&
  dunlev < max−3 gate; rn2 kick-in; odds/paranoia;
  assign_rnd_level + descent recompute; W-tower diff=0;
  pline; mysteryforce += rn2; same-level safe_teleds +
  next_to_u return; else new_ledger recompute + stair
  flags cleared.
- `was_in_W_tower` entry capture (:1655) via live
  `In_W_tower`; bit-2 OR at the :2157 `u_on_rndspot`
  call.
- `dunlev` (js/dungeon.js:1080): new canonical sync
  export `lev?.dlevel ?? 1`; 3 pre-existing clones
  (dokick/fountain/trap) deliberately not re-pointed
  (D-log: own rows).
- No symbol deleted or re-pointed → no required
  `sym.mjs` paste; ran anyway: `assign_rnd_level`,
  `In_W_tower`, `On_W_tower_level`, `on_level`,
  `ledger_no` all live; `dunlev` new export + 3 known
  clones; `safe_teleds`/`next_to_u`/`u_on_rndspot`
  async and awaited ✓.

**C ↔ JS fidelity — `goto_level` arm** (vs C
do.c:1541–1573): gate conjuncts in C order ✓ (`up`
from entry `depth_of` compare ✓; uhave dual-shape
is the file's 4-site idiom ✓); `!rn2(4+mf)` kick-in
✓; `odds = 3 + ualign.type` with A_CHAOTIC=−1 (2..4)
✓; `(odds <= 1) ? 0 : rn2(odds)` paranoia ✓;
`assign_rnd_level` LIVE (verified: matches C
dungeon.c:1985–1995 line-for-line) ✓; actual-descent
recompute ✓; `was_in_W_tower && !On_W_tower_level`
diff=0 ✓; diff==0 → assign_level ✓; pline text
identical ✓; `mysteryforce += rn2(diff+2)` ✓;
same-level safe_teleds + next_to_u + return ✓; else
new_ledger recompute + at_stairs/at_ladder clear ✓.
Clones used all verified: `In_hell` ≡ C
dungeon.c:1941–1945 (`flags.hellish`) ✓;
`on_level`/`ledger_no` standard shape ✓;
`assign_level` is do.js's own export ✓. Citation
nit: D-log/JS cite `:1541–1570`, the arm closes at
:1573 — substance complete, range 3 lines short.
**C ↔ JS fidelity — `dunlev`**: `return lev->dlevel`
≡ `lev?.dlevel ?? 1` (`?? 1` unreachable) ✓.
**Bit-2 call**: `(up?1:0)|(was?2:0)` matches C :1804
exactly ✓. Callee `u_on_rndspot` decodes bit 2 but
keeps its pre-existing NAMED `On_W_tower_level`-gate
omit (`dndest.nlx` truthiness, mklev.js doc) — named
before this SHA, not introduced here. Stale doc:
mklev.js still lists "bit 2 (D-1179)" as Named while
do.js retires D-1179 — trivia, unqueued.

Hallucinations / overclaim: none. "Match C" is earned
branch-for-branch; the pre-existing `else if
(!at_stairs)` vs C plain `else` is disclosed as
untouched/out-of-scope, not hidden.

Density: arm completion on partial `goto_level` +
whole `dunlev`; below-80 exception applies (D-log:
`rows --write` = 0 globally, both rows were the
missing-arm pair). One `Ledger` entry + Verify line
per function ✓.

Verification: D-log Verify shows vacuous note +
reach + green/strict/cohort/full 44/44. Re-measured
(`hidden-proxy.mjs verify goto_level,dunlev --base
e14cd5d30~1 --reach-all`): goto_level 0 blocked
(rows cited none — honest) + reach 33/33 PASS →
REACH-OK; dunlev 0 blocked + smoke 24/24 → REACH-OK.
Zero regressed. Banned-pattern grep: clean. Rule #2
clean (`imports.mjs --rulecheck` this iter).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
