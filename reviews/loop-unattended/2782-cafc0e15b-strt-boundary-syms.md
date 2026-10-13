# Review 2782 — cafc0e15b — load_cav_strt remove_boundary_syms wiring

- **SHA:** `cafc0e15b` (Tue 2026-10-13) — cliffs row-2 m_move writer (D-3929).
- **D-entry:** D-3929. **Ledger:** `load_special` split→partial (js re-pointed to `load_cav_strt`, omits named).
- **Diff size:** `js/mklev.js` +8/−0 (comment + 1 call). Board: 1 row flipped, `full`→false (incremental pattern).
- **Method:** cliff commit, ≤10 functions — whole Method on the wiring + the wired callee.

## Intent vs deliverable (promise vs diff)

The subject promises: `load_cav_strt` skipped the `load_special`
epilogue's `remove_boundary_syms`, so `B`/CROSSWALL cells survived into
`wallification` and became walls; wiring the call (C order) moves
scen-sweep-Caveman-587113 s775→PASS.

The diff actually adds: one `remove_boundary_syms();` call at
mklev.js:13189 plus a 7-line C-cite comment, placed before the
`!corrmaze`-gated `wallification`. No import, body, or signature change
anywhere else. Promise and diff agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | `load_cav_strt` epilogue +1 call (mklev.js:13189) | sp_lev.c:6465 (in `load_special` :6453–6502) | new wiring |
| 2 | `remove_boundary_syms` (mklev.js:19560, unchanged) | sp_lev.c:1015–1038 | pre-existing callee, verified whole below |

No JS function added, deleted, or re-pointed (same-module call).
`sym.mjs remove_boundary_syms`: NOT EXPORTED, 1 local in mklev.js:19560
(expected for a same-module staticfn; no clone #2). No required
re-point output.

## C ↔ JS fidelity

C `load_special` (csym range :6453–6502) epilogue, read in the file:
`link_doors_rooms()` :6464 → `remove_boundary_syms()` :6465 →
conditional `ensure_way_out()` :6467–6469 (`if
(gc.coder->check_inaccessibles)`) → `map_cleanup()` :6471 →
`wallification` gated `!corrmaze`. JS now runs `remove_boundary_syms()`
immediately before `if (!g.level.flags.corrmaze) wallification(...)` —
C order, C gate. ✓

Callee vs C :1015–1038, arm by arm: (1) full-map CROSSWALL scan with
early-out — JS adds `&& !hasBounds` to the outer loop, semantically
identical; (2) guarded rewrite loop over maze bounds setting CROSSWALL
→ ROOM only where `SpLev_Map` marks — JS matches (`X_MAZE_MAX`/
`Y_MAZE_MAX` bounds, `sp.has()` gate, `loc.typ = ROOM`). Neither side
draws RNG — draw-free wiring, no keystream walk applies. ✓

Nits (not C-wrongs, not queueable): (a) the cite `:6464-6466`
under-counts — `map_cleanup` is :6471 and the conditional
`ensure_way_out` :6467–6469 sits between, unnamed in comment, D-log,
and ledger omit. Not behavioral for cav-strt: the session fully PASSes,
so terrain is identical with or without it, and Cav-loca's own doc
(mklev.js:13203) already names `ensure_way_out` as a known cross-loader
gap. (b) The ledger row keeps the stale note "audited D-3406: whole vs
C" under a now-`partial` row — a `ledger.mjs set` for a future
iteration that touches the row, never a queue row.

Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coordinate reads
(8 lines, inspected in full). Rule #2: `imports.mjs --rulecheck` →
clean (run this iteration, cited for all 8 SHAs).

## Hallucinations / overclaim

- "14769 RNG recovered" matches the parent queue row's "RNG lost 14769"
  exactly; "FULL 1561-step marathon PASS" matches the board flip below.
- TEMP-C v2–v6 "fully reverted (md5-match + rebuild)": tracked tree is
  clean (`git status` empty), consistent.
- No "Match C" is claimed for any stubbed callee; the m_move owner is
  correctly left untouched as a faithful symptom owner. None found.

## Density

Cliff phase (§10.18): the parent's generated head was `nhl_gamestate`
parked UNPORTABLE-terminal (verified in
`cafc0e15b~1:docs/LOOP-QUEUE.md`), which by D-3885/NOTES has no port
deliverable — m_move row-2 was the de-facto head, and the D-log's "row
2 per operator override" documents it. Not cherry-picking. One cliff,
writer wired with its own Ledger entry, movement + REACH-OK + full
44/44 in one handoff. The two named omits (link_doors_rooms,
map_cleanup-as-no-op with charset proof) live in the D-entry and the
ledger row. ✓

## Verification

Re-measured myself (`--base cafc0e15b~1 --reach-all`, current code):

```
verify m_move: baseline cafc0e15b~1 — 2 session(s) blocked on it (1 at baseline, 1 in the working scoreboard)
  scen-sweep-Caveman-49956036: still m_move at step 505
  scen-sweep-Caveman-587113: PASS
verify m_move: 1 PASS, 0 moved past, 1 unchanged, 0 worse → PROGRESS
reach m_move: 1285 baseline-PASS session(s) reach it (1285 run, 731.9s): 1285 PASS, 0 regressed → REACH-OK
```

The D-log's "1 PASS, 0 moved, 0 no-movement" reproduces for the
baseline session; the extra unchanged row is 49956036, a Grow-#5
session that postdates this commit (proven different-cause in D-3936).
Board diff in-commit: exactly that 1 row false→true. No REGRESSED
session. Movement + REACH-OK: satisfied.

## Actionable C-wrongs

None. The wiring is C-order with the C gate, the callee is whole vs C,
and the corpus claim re-measures clean (1285/1285 reach, zero
regressions).

Verdict: **ACCEPT**
