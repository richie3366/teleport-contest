# Review 2153 — 92ffa7863 — roomtype validation/diagnostic closure

SHA `92ffa7863`, D-3193; 2026-10-01; +214/−175, all in `js/mklev.js`.
Closes review 2145 Actionable 2 (roomtype validation + diagnostic completion).

## Metadata

- Subject: "close lspo_room→get_table_roomtype_opt validation/diagnostic closure"
- Substance: `get_table_roomtype_opt` restarted on canonical
  `get_table_str_opt` + awaited `impossible`; async propagated through 21
  defs (2 entries, 2 adapters, 9 load_*, themeroom fns).
- Must-fix ships alone: density exception, no coverage row bundled.

## Intent vs deliverable

Promise: `type=true` must error before room RNG; function-valued type must
resolve cleanly; the unknown-type diagnostic must complete before build RNG
and contents callbacks. Diff delivers the reader restart plus a mechanical
async/await closure (85 splev_des_room awaits, 6 themeroom dispatches, 12
nest() calls, contents invocations in both entries). Promise kept.

## Inventory — get_table_roomtype_opt

Restarted async export (js/mklev.js:23656). Callees: canonical
`get_table_str_opt` (dungeon.js, LIVE), `splev_roomtype_entry` (verified
pre-existing CLONE of the room_types scan, D-3185), `impossible` (async
LIVE, js/display.js:8578). No new helper, no deleted symbol.

## C ↔ JS fidelity — get_table_roomtype_opt

Confirmed against C `sp_lev.c:4003–4020`: read via get_table_str_opt with
emptystr default → `if (roomstr && *roomstr)` → strcmpi scan → impossible on
unknown → Free (GC no-op) → return res. JS mirrors each step, including the
`roomstr.length !== 0` empty check. The canonical reader
(js/dungeon.js:372–412, read in full) implements `nhlua.c:1053–1076`:
nil→defval, function→zero-arg call then optstring (string/number/nil),
else throw 'no string' (mapped nhl_error). Removing the old `String()`
coercion is exactly what makes `type=true` reject before RNG and function
values resolve — review 2145's demand, verified by arm order, not by trust.

## Inventory — async closure (lspo_room / lspo_region / adapters / loaders)

`lspo_room` (js/mklev.js:1835), `lspo_region` (:2129) now async; both
contents invocations awaited (the sole `contents(` site in each entry —
verified by body grep, not sampled). `splev_des_room` async; all 85 call
sites awaited (full-tree grep; the removed-lines count 86 = 85 calls + the
def line). `splev_build_room` async, zero live callers (dead adapter —
async is free). `themeroom_nested_room`: 6/6 call sites awaited; 6/6
themeroom dispatches awaited inside async `themerooms_generate`; all 12
`nest(` calls awaited. All 9 load_* call sites (`const p = load_*()`)
followed by `if (isThenable(p)) await p` (3497, 3504, 3554, 3777, 3784,
3964, 3971, 3978, 3996, 4003 — spot-confirmed pattern at each). No other JS
callers of the three entries exist. `load_arc_filb` correctly stays sync
(it calls `splev_ordinary_room`, never the async builder).

```text
get_table_roomtype_opt js/mklev.js:23656   ASYNC — await required
lspo_room        js/mklev.js:1835   ASYNC — await required
lspo_region      js/mklev.js:2129   ASYNC — await required
```

No symbol deleted or re-pointed (async added, names kept) — sym pasted as
context per Method. No cycle-forced clone claimed; no new cross-module edge
(`get_table_str_opt` was already imported).

## C ↔ JS fidelity — closure ordering

C `lspo_room :4072` reads roomtype before build RNG `:4081` and contents
pcall `:4092–4098`; C `lspo_region :5604` likewise. JS awaits the reader
before both, and awaits contents before `spo_endroom`/`add_doors_to_room`.
RNG call order unchanged (no RNG added/removed — pure suspension points).

Diff grep: no FORCE, DIAG, getRngLog, seed names, fastforward. The
`type: 'ordinary'` literals are existing Lua-content mirrors, not hardcoded
coordinates. Rule #2 clean (iteration-wide rulecheck).

## Hallucinations / overclaim

None. The /tmp probe claim ("all assertions passed") is throwaway evidence
by design; the D-log discloses the missing tests/ harness and leans on the
fortress instead. My independent call-site audit corroborates the counts
(85/6/12). No dispatch-over-stub claim.

## Density

Must-fix single item, alone — per §2b. Per-function Ledger (all three
ported) and Verify lines present. Verdicts: get_table_roomtype_opt ACCEPT;
lspo_room ACCEPT; lspo_region ACCEPT. SHA verdict: ACCEPT.

## Verification

Re-measured (one call, current tree incl. this SHA):

```text
verify get_table_roomtype_opt/lspo_room/lspo_region: 0 blocked at 92ffa7863~1 (vacuous — review row)
smoke each: no RNG-tagged reach; 24 run: 24 PASS, 0 regressed → REACH-OK
```

Matches the D-log (green 2/2, strict ×2, cohort 7/7, full 44/44 auto).
No REGRESSED session; no vacuous-PASS overclaim.

## Actionable C-wrongs

None. Review 2145 is now fully closed (Actionable 1 by D-3190, 2 here).
Housekeeping: 2145's `**Addressed:**` line still lacks the D-3193 short
hash — filled as `92ffa7863` in this review commit.

Verdict: **ACCEPT**
