# Review 1627 — f0550a81 — sp_lev.c table-region readers + search_door/create_corridor (D-2668)

**Metadata:** SHA `f0550a81`, `sp_lev.c`
`get_table_region` / `get_table_intarray_entry` +
same-file `search_door` / `create_corridor`, D-2668.
JS: `js/mklev.js` (+195/−21: 2 unpacked readers + 3
call-site rewires + 2 new exports).

## Intent vs deliverable

Subject promises: unpacked ports of the two Lua table
readers wired into the lregion/exclusion callers, plus
same-file `search_door` + `create_corridor` ports. Diff
delivers all of it. Promise matches deliverable.

## Inventory

- `get_table_intarray_entry_unpacked` (:5282-area,
  local) + `get_table_region_unpacked` (local) — C
  `staticfn`s, file-local kept.
- `search_door(croom, wall, cnt)` (exported, sync),
  `create_corridor(c)` (exported, async for the
  awaited impossible).
- Rewires: `l_teleport_region`, `l_levregion`,
  `lspo_exclusion` (required/optional flags per C).
  No imports, no deletions, no clones.

## C ↔ JS fidelity

C loci read in full: readers `:5259–5279`/`:5281–
5316`, `search_door :2491–2540`, `create_corridor
:2670–2725`, `l_get_lregion :5406–5436`. No RNG.
Confirm:

- Readers: 1-based entry read; number → `Math.trunc`
  (≡ `lua_tointeger`, no ToInt32 wrap, named);
  numeric-string coercion (≡ `lua_isnumber`); else
  throw ≡ `nhl_error` ✓. Optional-absent → null
  keeping caller -1s (`:5292–5295`) ✓; required-nil /
  non-table → throw ≡ `luaL_checktype :5297` ✓;
  non-4 → `throw 'Not a region' :5303–5308` ✓;
  4 entries in order `:5309–5312` ✓.
- `l_get_lregion` closure: required region, exclude
  over pre-set -1s, `del_islev` forced when x1 < 0 —
  all three call sites match ✓ (the dropped `| 0`s are
  safe: entries now arrive truncated).
- `search_door`: 4 wall arms, panic default, scan
  loop, `cnt-- <= 0` return, null ≡ FALSE — all
  verbatim ✓ (intermediate `*x/*y` writes are
  caller-invisible) ✓.
- `create_corridor`: −1 room → makecorridors, W_ANY/
  W_RANDOM guard → impossible + return, both
  `search_door` gates, both wall-adjust switches,
  `(void) dig_corridor` discard — verbatim ✓.
- Callee closure: `search_door`'s only C callers
  (:2688/:2692) are both wired ✓. `create_corridor`
  itself has no JS caller yet — its two C callers
  (`:4551` table-form, `:4571` random) are named
  in-commit + in the map (no des.corridor caller in
  tree; random ≡ inline makecorridors), not silent.

## Hallucinations / overclaim

None. Both verify lines (get_table_region +
create_corridor, incl. full 44/44) are pasted in the
D-log.

## Density

Breadth phase: one C-file reader/callee cluster, one
module — right-sized.

## Verification

D-log Verify bullet claims double PASS (syntax · rule2
· hidden note · REACH-OK smoke 24/24 ×2 · green ·
strict · cohort · full 44/44 shared-file). Re-measured
here: both `--base f0550a81~1 --reach-all` → 0 blocked
both sides (vacuous notes, correctly labeled) + smoke
24/24 each, 0 regressed → REACH-OK. Claim true. Diff
grep: 0 hits for FORCE/DIAG/getRngLog/fastforward/
coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
