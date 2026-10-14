# Review 2803 — 558d41b7f — Bullwhip disarm calls live freeinv, clone deleted

- **SHA:** `558d41b7f` (Wed 2026-10-14) — cliffs-head writer (D-3954).
- **D-entry:** D-3954. **Ledger:** `use_misc` re-tagged (already ported).
- **Diff size:** `js/muse.js` +1 import name / −9 clone lines / 1 call rewire; +1 test file (2 its).
- **Method:** cliff (1 fn) — whole Method on the rewire + movement re-measure.

## Intent vs deliverable (promise vs diff)

The subject promises: the MUSE_BULLWHIP disarm arm dropped
`where=OBJ_FREE` because it called a local `freeinv_hero` clone; wire
it to the live `freeinv` export and delete the clone — healing 4
step-0 throw-voids misattributed to `randomize_gem_colors` (2 PASS,
2 moved to steps 880/843).

The diff is exactly that: +1 import name, 1 call rewire with a C
citation, −9 clone lines. Promise and diff agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | `muse.js:44` — add `freeinv` to invent.js import | — | ALREADY edge, no new import |
| 2 | `muse.js:3271` — `freeinv_hero(obj)` → `freeinv(obj)` | muse.c:2597 `freeinv(obj)` | call-for-call |
| 3 | `muse.js:289` — delete `freeinv_hero` clone | — (anti-C: dropped where) | sole caller was this arm |
| 4 | `scripts/use-misc-disarm-freeinv.test.mjs` — 2 its | muse.c:2549–2615 | red→green per D-log |

No new helper, no signature change.

## C ↔ JS fidelity

**C arm.** `muse.c:2596–2597` (re-read): `remove_worn_item(obj,
FALSE); freeinv(obj);` — the JS call site now mirrors both lines in
order. C `freeinv` (`invent.c:1402–1409`, via csym): `extract_nobj`
+ `pickup_prev = 0` + `freeinv_core` + `update_inventory`.

**Live callee (whole).** `js/invent.js:9791 freeinv`: invent splice
+ nobj-chain unlink + `nobj = null` + `pickup_prev = 0` +
`where = OBJ_FREE` + `freeinv_core` + `update_inventory` — every C
statement present; `where=OBJ_FREE` is the `extract_nobj`
(`mkobj.c:2612`) effect the clone dropped. LIVE, verified.

**Deleted clone.** `freeinv_hero` (splice + `nobj = null` only) was a
divergent CLONE (D-1849 pattern); `git grep` at this SHA shows zero
remaining references, and the diff shows this arm was its sole
caller — safe deletion, confirmed on HEAD too (only a test comment
mentions the name).

**Required sym output** (diff re-points clone → import):

```
freeinv          js/invent.js:9791   sync
             !! ALSO 3 LOCAL CLONE(S) in 3 files — IMPORT the export; do NOT add another
               js/dothrow.js:311  js/steal.js:354  js/steed.js:197
```

The 3 remaining clones are pre-existing in other files, untouched by
this SHA — standing, not this commit's debt.

**Required can-check:** `imports.mjs --can js/muse.js js/invent.js
freeinv` → `ALREADY: muse.js already statically imports invent.js.
No new edge needed.` — matches the D-log claim.

Diff grep: no FORCE/DIAG/seed/coordinate patterns (14-line diff,
read whole). Rule #2 clean iteration-wide (`imports.mjs
--rulecheck`: no bare/node specifiers or fs calls in js/).

## Hallucinations / overclaim

None. "Rest of the arm C-exact" is a re-statement of the D-3437
whole-audit plus the cited line walk, not a new claim. The throw-void
misattribution mechanism (worker abort → scorer names first C draw)
matches the recorded `place_object ... not free` stack in the D-log.

## Density

Cliff discipline holds: one writer, the probe row's 4 throw-voids
all move (2 PASS + 2 strictly later), owner `randomize_gem_colors`
correctly left alone as already-whole (parked-REFUTED honored). Each
function has its Ledger entry (use_misc re-tagged D-3954). No
bundled work from another C file. The 2 no-movement sessions are
named with their own writers (dobjsfree, hatch_egg) as future pops —
legitimate, not NO-MOVEMENT-as-omission.

## Verification

Re-measured myself (`verify use_misc,randomize_gem_colors --base
558d41b7f~1 --reach-all`) — reproduces the D-log **exactly**:

```
verify use_misc: 0 session(s) blocked (writer, expected) — vacuous note, not claimed as PASS
reach use_misc: 18 baseline-PASS reach it: 18 PASS, 0 regressed → REACH-OK
verify randomize_gem_colors: 2 PASS, 2 moved past, 2 unchanged, 0 worse → PROGRESS
  50055101 PASS; 49955024 PASS; 50055051 → one_characteristic@880; 49955018 → zhitu@843
reach randomize_gem_colors: 2822 baseline-PASS reach it: 2822 PASS, 0 regressed → REACH-OK
```

All landings match the D-log. No REGRESSED session. The 2 unchanged
(50157014, 50056058) are the named other-writer voids.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
