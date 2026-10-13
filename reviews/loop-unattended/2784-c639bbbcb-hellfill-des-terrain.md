# Review 2784 — c639bbbcb — hellfill hells[6] des.terrain routing

- **SHA:** `c639bbbcb` (Tue 2026-10-13) — cliffs-head get_location writer (D-3931).
- **D-entry:** D-3931. **Ledger:** `lspo_terrain` note refresh + `load_special` partial (+load_hellfill, omits).
- **Diff size:** `js/mklev.js` +6/−2 (comment + 1 call swap). Board: 2 rows (1 PASS, 1 moved).
- **Method:** cliff commit, ≤10 functions — whole Method on the arm + both helpers.

## Intent vs deliverable (promise vs diff)

The subject promises: the hells[6] cold-maze water-walls arm used the
per-cell-`rn2(100)` replace helper where lua runs draw-free
`des.terrain`; routing it through live `lspo_terrain` gives 610064 FULL
PASS and 610093 RNG-full with a residual unattributed screen@336 in a
corrupt oracle tail.

The diff actually swaps one call in `hellfill_style_cold_maze` for
`lspo_terrain(selection_match_mapfrag('w'), 'W')` under the kept
`percent(25)` gate, plus a 4-line C cite. Promise and diff agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | cold-maze arm call swap (mklev.js:28362) | hellfill.lua:405–407 → sp_lev.c:4977–5038 | new routing |
| 2 | `lspo_terrain` (mklev.js:1905, unchanged) | sp_lev.c:4977–5038 (csym) | live, selection arm verified |
| 3 | `selection_match_mapfrag` (mklev.js:30241, unchanged) | nhlsel.c l_selection_match | live, bounds verified |

No symbol deleted or re-pointed; no `sym.mjs` re-point output required
(`lspo_terrain` is an existing same-module export, D-3158).

## C ↔ JS fidelity

Lua :405–407 read directly: `if (percent(25)) then
des.terrain(selection.match("w"), "W");` — exactly as cited. C
`lspo_terrain` (csym :4977–5038; D-log :4978, off-by-one start) selection
arm is `selection_iterate(sel, sel_set_ter, …)` — draw-free ✓. C
`lspo_replace_terrain` (csym :5050–5143) draws `(rn2(100)) < chance`
per matching cell with no chance==100 short-circuit ✓ — the old
helper's `if (match && rn2(100) < ch)` (mklev.js:28155) faithfully
mirrors the *wrong* C function here, confirming the diagnosis (same
cells, draws C never makes).

New path, call-for-call: `percent(25)` gate kept ✓ (lua :405);
`selection_match_mapfrag('w')` scans x∈[1,80)/y∈[0,21] (C
l_selection_match bounds per D-log) testing `mapfrag_match` →
`splev_chr2typ('w')`=MATCH_WALL (chr table mklev.js:30142) →
`match_maptyps`≡IS_STWALL — the same cell set the old helper tested
(same x/y bounds, same predicate) ✓; `lspo_terrain` argc==2 selection
arm (mklev.js:1935–1940 → :1950–1951) paints `check_mapchr('W')`=WATER
with SET_LIT_NOCHANGE via `sel_set_ter` — C order, C lit, zero draws ✓.
RNG walk: old k×rn2(100) → new 0, matching C. ✓

Survey claim ("only the hells[6] site was the wrong helper"):
6 remaining call sites; the hells[1] ×4 cluster carries chances
100/5/20/15 (a chance param proves replace semantics), and I checked
the two chance-100 sites against lua myself — hells[4]
`des.replace_terrain({mapfragment="w", toterrain=wallterrain[1]})` →
:28280 ✓, hells[5] `des.replace_terrain({mapfragment="w",
toterrain="L"})` → :28310 ✓. No same-class miss.

Observation (pre-existing, out of scope): shared `sel_set_ter` also
clears flags/roomno/edge, which its own comment says C sel_set_ter
lacks — a no-op on maze walls→water in practice, and 610064's FULL
PASS proves it here. Not this SHA's change.

Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords. Rule #2:
clean (this iteration, cited for all 8 SHAs).

## Hallucinations / overclaim

- 610093 "corrupt oracle tail": confirmed live shape — RNG 55572/55572
  full, screens through 335, unattributed screen@336, null owner, empty
  toplines. A port bug would implicate a function or shift RNG; a FULL
  PASS on the sibling cold-maze session 610064 through the same writer
  further rules the port out. I did not re-run the C re-record
  forensics ("Signal received", OSC markers) — the shape evidence
  suffices to leave it for the audit rescore as the D-log does.
- Board diff in-commit: exactly the 2 claimed rows (610064 →PASS
  40797/40797; 610093 rngM 46193→55572, step 154→336, owner→null). ✓
- Nit: D-log cites the row "@aa6355704" but its numbers (2/1769, RNG
  39812) match the parent e1f185743's post-grow board — stale tag, right
  row.

## Density

Cliff phase (§10.18): parent head was get_location (verified in
`c639bbbcb~1:docs/LOOP-QUEUE.md`, 2/1769, RNG lost 39812 — matches the
D-log); Must-fix empty. Owner-vs-writer correctly resolved (symptom
owner stands per park + D-3235; this ports the named writer). One
cliff, writer routed with ledger rows, movement + REACH-OK + full 44/44
in one handoff. Named omits (rnd_hell_prefab arms, hells[4] floor
replace) pre-exist in code and the ledger row. ✓

## Verification

Re-measured myself (`--base c639bbbcb~1 --reach-all`, current code):

```
verify get_location: baseline c639bbbcb~1 — 2 session(s) blocked on it (2 at baseline, 0 in the working scoreboard)
  scen-sweep-Archeologist-610093: moved → js-throw at step 336 (was 154)
  scen-worldtour-Wizard-610064: PASS
verify get_location: 1 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
reach get_location: 549 baseline-PASS session(s) reach it (549 run, 460.5s): 548 PASS, 1 regressed → REACH-REGRESSION
```

Movement reproduces the D-log exactly. The 1 regressed is
scen-sweep-Priest-582706 — traced, not a port C-wrong: committed
boards show it PASS (oracle 1166 steps, rngT 66936) at both e1f185743
and c639bbbcb, then FAIL first at d6efb0a28 (a no-`js/` grow commit)
with a *different C oracle* (1238 steps, rngT 82230 — rngT is purely
C-side). The flip came from the re-record, carries the D-3885
UNPORTABLE malloc-reuse signature (screen@1166 map row, cMsgOwners
nhl_gamestate, stepFns getlev/restrap), and is already boarded + parked
("Never a port row") + documented in CURRENT. No Must-fix: re-filing it
would violate the standing terminal park. (The "moved → js-throw at step 336" label is the verify
printer's wording for the owner-null destination, not a throw: fresh
`show` on current code reports `error: null, jsPanic: null,
kind: screen@336, owner: null`, identical to HEAD's committed board
row — the same residual the D-log describes.)

## Actionable C-wrongs

None. Routing, helper survey, counts, and movement all verify; the sole
reach regression is the known oracle-side flake, proven post-commit.

Verdict: **ACCEPT**
