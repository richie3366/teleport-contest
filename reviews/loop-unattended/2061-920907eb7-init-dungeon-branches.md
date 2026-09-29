# Review 2061 — 920907eb7 — init_dungeon_branches + nhlua readers restart

- SHA: `920907eb7` (D-3101)
- Subject: "dungeon.c init_dungeon_branches + nhlua get_table_int/int_opt/option: branch-parse restart (coverage)"
- js/ insertions: ~90 net in js/dungeon.js (rewrite with deletions)
- Prior index: 2060; queue Must-fix at review time: empty

## Intent vs deliverable

Promise: restart PARTIAL `init_dungeon_branches` (raw reads, falsy
chain test, invented fallback loop, missing table-check/debugplines)
in C order through the live get_table_* readers, and restart the three
readers as cited C-order bodies.

Diff actually adds: rewritten `init_dungeon_branches` with per-line C
cites, restructured `get_table_int`/`get_table_int_opt`/`get_table_option`,
BR_DIR/BR_TYPE tables replacing BRTYPE_MAP, deleted invented fallback
loop. Matches the promise; no extra scope.

## Inventory

Per-function (cluster of 4):

- `init_dungeon_branches` (js/dungeon.js:816) — C dungeon.c:866–930
  (csym range). Whole body: len, per-row table check, 6 field reads,
  slot-before-stores, debugplines, chain loop + panic, not-a-hash arm,
  tally + limit panic.
- `get_table_int` (js/dungeon.js:328) — C nhlua.c:1016–1025. Whole body.
- `get_table_int_opt` (js/dungeon.js:343) — C nhlua.c:1028–1039. Whole body.
- `get_table_option` (js/dungeon.js:410) — C nhlua.c:1121–1133. Whole body.
- Deleted: `BRTYPE_MAP` (sole user was the old body).

Helpers: all LIVE file-locals/pre-existing — get_table_str(_opt),
lua_field/lua_len/lua_type, luaL_checkinteger_dgn, luaL_checkoption,
debugpline_dungeon, strcmp. No clones, no stubs. Deleted-symbol check:

```text
BRTYPE_MAP       NOT FOUND in js/** (no export, no local function/const).
```

## C ↔ JS fidelity

`init_dungeon_branches` (C :866–930), branch-by-branch:
- Static 2i tables `:872–879` → BR_DIR/BR_TYPE STRS+BITS. C's trailing
  terminator slots (brdirstr2i[2], brtypes2i[4]) unreachable: JS
  `luaL_checkoption` returns an index into `opts` (0..3 max for branchtype,
  0..1 for direction) or throws — verified in js/dungeon.js:301. Exact.
- `:885–888` len/store/pop → `lua_len` + store. Exact.
- `:892` row table check + `:924` not-a-hash panic (message verbatim
  `dungeon[%i].branches[%i] is not a hash`) — new arm, exact.
- `:893–900` six reads through the live readers in C order, `:901` slot
  assigned before the `:905–910` stores. Exact.
- `:903–904`/`:912` debugplines via live debugpline_dungeon. Exact.
- `:911` `if (br_chain)` pointer test → `!= null`: get_table_str_opt
  returns defval (null) on nil and the string otherwise, so `""` still
  chains — verified in js/dungeon.js:380. Exact, and the old falsy test
  was a real C-wrong now fixed.
- `:913` chain bound `pd.n_levs + f - 1` exact; `?.` skips the past-prefix
  hole where C would read OOB for f≥1 (UB in C; on real data the targets
  f=1,2,4 oracle/castle are found in-loop — D-log verified in
  dungeonProto). Safe rendering, correctly reasoned.
- `:919–920`/`:929` panics → throws, messages verbatim; `:921` free → GC.
  Exact.

Readers: getfield/check/pop/return in C order with per-line cites;
int_opt restructured to `ret=defval` + nil-test (was early-return) —
semantically identical to C `:1031–1038`. No RNG in any body.

Callers: `init_dungeon_branches` has one C caller (dungeon.c:1045) →
JS dungeon.js:940 wired; the caller's `:1046` not-an-array panic arm gap
is named (belongs to init_dungeon_dungeons). Reader C sites outside
dungeon.c (sp_lev/nhlsel/questpgr) are named as other files' ports —
and JS-side those files already carry their own equivalents
(mklev.js splev_opt_int/_index). No silent unwired caller.

Diff grep: no FORCE/DIAG/getRngLog/seed/fastforward/coordinates.

## Hallucinations / overclaim

None. "Whole body, every callee live" is accurate; out-of-cluster gaps
are named per caller in the D-log, not hidden.

## Density

Breadth-phase cluster: 4 functions, one caller/callee closure
(dungeon.c head + its nhlua.c readers) — §10.17 shape. ~90 net js/
insertions, above the ~80 line; each function has its own Inventory
block here, its own `Ledger:` entry, its own Verify line. Verdict per
function: ACCEPT ×4.

## Verification

Re-measured at this SHA (`--base 920907eb7~1 --reach-all`, one call):
all four functions 0 blocked at baseline and working tree, vacuous
notes printed, smoke spread 24 run / 24 PASS / 0 regressed → REACH-OK
each. Matches the D-log exactly. No REGRESSED session. D-log adds
green 2/2 + strict 2/2, cohort 7/7, VERIFY PASS, and full 44/44 with
exact Scr/RNG (justified: fallback-loop removal is load-path). Queue
rows cited no corpus blocks, so the vacuous label is correct.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
