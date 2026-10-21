# Review 3020 — f4ad3fe0a — hellfill runs the load_special head

- SHA: `f4ad3fe0a` (Must-fix F1 of the 2026-10-20 level audit; non-RNG)
- D-entry: D-4180; Ledger: load_special partial (`load_hellfill` added)
- `js/` diff: mklev.js +8

## Intent vs deliverable

Promise: sp_lev.c load_special runs link_doors_rooms,
remove_boundary_syms and map_cleanup after every level script
(`:6464–6471`). load_hellfill skipped all three, so hellfill.lua's
crosswall-temple prefab (`:207–219`) kept its `B` ring as CROSSWALL and
wallification closed it.

Diff: three calls after `hellfill_populatemaze()` and before the
`!corrmaze` wallification. ensure_way_out is skipped by comment because
hellfill never sets "inaccessibles". The promise matches the diff.

## Inventory

- load_hellfill — mklev.js:28116 (C sp_lev.c load_special :6453–6502,
  head :6464–6471): three LIVE calls to the existing sp_lev.c ports.
- No helper added, deleted or re-pointed (no `sym.mjs` output owed).

## C ↔ JS fidelity

C (`csym load_special`, :6453–6502), after `load_lua`:

```c
link_doors_rooms();
remove_boundary_syms();
if (gc.coder->check_inaccessibles) ensure_way_out();
map_cleanup();
if (!svl.level.flags.corrmaze) wallification(1, 0, COLNO - 1, ROWNO - 1);
```

JS now has the same order between the script body and wallification.
hellfill.lua has no `inaccessibles` level flag (only minetn-6.lua does,
by grep of dat/*.lua), so skipping ensure_way_out is C-equal. None of the
three draws RNG. The commit was superseded the same evening by D-4182,
which replaced this inline copy with `load_special_head()`. The order is
unchanged.

## Hallucinations / overclaim

None. "No corpus session picks this prefab" is consistent with a non-RNG
fix to a `percent(25)` × 1-in-10 prefab, and the D-log says so.

## Density

A Must-fix row closed with three calls. Right-sized.

## Verification

The D-log's probe is level-audit (111 hellfill sessions, 147/147 builds
RNG-exact), not a blocked owner. A verify of these three functions has
no blocked row, so it is vacuous by construction. The audit's full
rescore is the regression check.

```text
verify remove_boundary_syms,map_cleanup,link_doors_rooms --base f4ad3fe0a~1 --no-reach
  remove_boundary_syms, map_cleanup, link_doors_rooms: 0 blocked at
  the parent or in the working board (vacuous, as expected)
```

The full rescore shows 0 PASS→FAIL. Public 44/44.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
