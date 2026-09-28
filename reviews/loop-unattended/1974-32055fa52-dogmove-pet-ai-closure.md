# Review 1974 — 32055fa52 — dogmove pet-AI closure

Metadata: SHA `32055fa52` (D-3014). Scored diff: `js/dogmove.js`
(+78/−~25) + `js/monmove.js` (−16, clone deletion). Subject promises:
`can_reach_location` obstructed arm exact-C, `could_reach_item` restarted
exact-C and exported from its C home, monmove clone removed,
`finish_meating` mimic-reset arm; targeting quad retired stale.

## Intent vs deliverable

Promise: the three-function closure plus six stale retirements
(find_targ/find_friends/score_targ/best_target, config_error_nextline,
extend_spine). Diff actually adds exactly that. Promise kept.

## Inventory

- `can_reach_location` (dogmove.js file-local — correct linkage: C
  `dogmove.c:1378–1414` is `staticfn`): obstructed arm restarted.
- `could_reach_item` (dogmove.js:358, newly exported — correct: C
  `:1361–1369` is extern): restarted whole.
- `finish_meating` (dogmove.js:1672, exported — C `:1447–1457` extern):
  mimic arm added.
- Deleted: monmove.js:455 `could_reach_item` clone; both monmove call
  sites ride the existing dogmove import.

## C ↔ JS fidelity

### could_reach_item — verdict: exact-C, ACCEPT

C (`:1361–1369`, csym range):

```c
if ((!is_pool(nx, ny) || is_swimmer(mon->data))
    && (!is_lava(nx, ny) || likes_lava(mon->data))
    && (!sobj_at(BOULDER, nx, ny) || throws_rocks(mon->data)))
    return TRUE;
return FALSE;
```

JS is this predicate verbatim. The old `objects_at` loop + `BOULDER >= 0`
guard is gone. The `mon?.data ?? mons()` guard idiom is documented and
identical on valid inputs. Confirm.

### can_reach_location — verdict: exact-C, ACCEPT

C (`:1378–1414`): goal equality → isok → dist2 → neighbor loop with
isok/dist/OBSTRUCTED/DOOR/item/recursion in C order. The obstructed arm
preserves the critical C precedence:

```c
if (IS_OBSTRUCTED(levl[i][j].typ) && !passes_walls(mon->data)
    && (!may_dig(i, j) || !tunnels(mon->data)
        || Is_rogue_level(&u.uz)))
    continue;
```

JS keeps `|| Is_rogue_level(...)` inside the dig paren with a comment
stating the resolved reading (`passes_walls || (may_dig && tunnels &&
!rogue)`). `IS_DOOR` + `D_CLOSED|D_LOCKED` matches (`loc?.doormask || 0`
is a null-safe read of the same value). Confirm.

### finish_meating — verdict: exact-C, ACCEPT

C (`:1447–1457`):

```c
mtmp->meating = 0;
if (M_AP_TYPE(mtmp) != M_AP_NOTHING && mtmp->data->mlet != S_MIMIC) {
    mtmp->m_ap_type = M_AP_NOTHING;
    mtmp->mappearance = 0;
    newsym(mtmp->mx, mtmp->my);
}
```

JS matches line-for-line. RNG: none of the three draws in C; none added.

### Callee closure — all LIVE, no clones added, no stubs

Required `sym.mjs` outputs (deleted clone → re-point check):

```text
could_reach_item js/dogmove.js:358   sync      (monmove clone gone)
tunnels          js/monsters.js:556   sync      (pre-existing import)
may_dig          js/dig.js:177   sync
sobj_at          js/mkobj.js:3177   sync
```

`passes_walls`/`M_AP_NOTHING`/`Is_rogue_level`/`newsym` all pre-existing
imports. Cycle check:

```text
node scripts/imports.mjs --can js/dogmove.js js/dig.js may_dig
→ ALREADY: dogmove.js already statically imports dig.js. No new edge needed.
```

(The D-log's "new edge" wording is conservative; in effect no new edge.)
Pre-existing note, not this SHA: dogmove.js keeps a file-local `isok`
clone (~:367) that is value-identical to C (`x < COLNO` ≡ `x <=
COLNO-1`) — not a divergence; left for a future import-merge, not queued.

### Stale retirements — locations + caller wiring in ledger notes

Targeting quad (`find_targ`/`find_friends`/`score_targ`/`best_target`)
plus `config_error_nextline`, `extend_spine`. All re-measured below —
including the 174-session reach on `score_targ`.

## Hallucinations / overclaim

None. D-log correctly calls the old code a stub (the `/* passes_walls /
dig stub: pets can't */` comment) and claims no corpus movement. Named:
`can_reach_location` none — accurate. Diff grep: no banned patterns.

## Density

Breadth-phase: 3 whole functions of one C file + 6 stale retirements,
~96 net insertions, ≤10 functions, one closure. D-3014 carries per-function
`Ledger:` entries and per-function Verify lines (all seven symbols listed
individually, incl. the 174-session reach on `score_targ`). Compliant.

## Verification

Re-measured (all seven symbols, `--base 32055fa52~1 --reach-all`):

```text
reach score_targ: 174 baseline-PASS session(s) reach it (174 run): 174 PASS, 0 regressed → REACH-OK
smoke can_reach_location/could_reach_item/finish_meating/find_targ/find_friends/best_target: 24 PASS, 0 regressed → REACH-OK
```

0 blocked at baseline for all (vacuous, honestly labeled as coverage
rows). Zero REGRESSED — matches the D-log claims line-for-line, including
the 174 reach count.

## Actionable C-wrongs

None.

Ledger: all three ported, REACH-OK.
Verify lines: per-function, re-run confirms.

Verdict: **ACCEPT**
