# Review 2118 — 850d390ba — lspo_mazewalk + lspo_terrain

- SHA: `850d390ba71d7f38dddd6b01d701bd9abb572aa5` (D-3158)
- Date: 2026-09-30. `js/` delta: +183 mklev.js.
- Cluster: 2 ports + 2 stale dispositions, one C file.
- Prior-review closure claimed: none (but it wires review 2116's
  named `:5025` caller — verified below).

## Intent vs deliverable

Subject promises the two des entries. Diff actually adds: both ports
in the unpacked-args idiom, own mazewalk dir tables, and the test
suite (12/12, re-ran). Promise matches deliverable.

## Inventory (per function)

| JS function | Change | Class |
|---|---|---|
| `lspo_mazewalk` (mklev.js, export) | new, C order | whole |
| `lspo_terrain` (mklev.js:1857, export) | new, C order | whole |
| `sp_amask_to_amask`, `set_wallprop_in_selection` | ledger stale → ported | dispositions (sites verified) |

Callee closure, all LIVE same-file locals or const/live exports:
`create_des_coder`, `luaL_checkinteger_unpacked`, `splev_opt_index`
(throws on unknown ≡ `luaL_checkoption`), `get_table_xy_or_coord`,
`splev_chr2typ`, `splev_opt_boolean`, `splev_opt_int`, `get_coord`,
`get_location_coord`, `random_wdir`, `walkfrom`, `fill_empty_maze`,
`selection_iterate`, `sel_set_ter` (all resolved via `sym.mjs`).
Named in-commit: `lcheck_param_table`, `get_table_mapchr[_opt]` /
`check_mapchr`, `l_selection_check`, `luaL_checkinteger` (all inline
equivalents, behavior verified below). No stubs. Nothing
deleted/re-pointed.

Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/step/coordinate reads,
`fastforward`, or hardcoded coordinates. Rule #2 clean (run this iteration).

## C ↔ JS fidelity (per function)

**`lspo_mazewalk`** — C `sp_lev.c:5768–5869` (`csym`). Own tables
match C `mwdirs`/`mwdirs2i` order and values (north/south/east/west/
random → W_*) ✓; triple vs table dispatch on argc ✓; table form:
xy-or-coord ✓, typ missing/empty → ROOM default with non-1-char or
unknown → "Erroneous map char" (≡ C `get_table_mapchr_opt`
`nhlua.c:256–271` + `check_mapchr`'s `strlen==1` gate `:393–397`,
verified) ✓, stocked/boolean + dir/option defaults ✓; ANY_LOC
locate + isok throw ✓; ftyp<1 corrmaze default ✓; W_RANDOM roll
(single RNG site, in order) ✓; move switch exact incl. the default
arm impossibling then falling through to the write like C ✓;
non-door write ✓; x-parity arm writes with no IS_DOOR check like C
(the `loc2` null guard is the `level.at` adaptation) ✓; y-parity arm
moves only ✓; walkfrom + stocked fill + return 0 ✓. Confirm.

**`lspo_terrain`** — C `:4977–5038`. All four argc arms: table
(xy-or-coord, −1,−1 selection-field read with USERDATA-shape throw ≡
`l_selection_check` `nhlsel.c:58–66` no-nil-pass, required typ,
lit default NOCHANGE) ✓; coord-pair arm gated on table-but-not-
selection (a selection is LUA_TUSERDATA, not TABLE — the gate is
C-exact) ✓; selection-pair arm ✓; triple ✓; else "wrong
parameters" ✓. Shared INVALID gate ✓. `sel` → `selection_iterate`
with the tmpterrain unpack closure — this wires C `:5025`, closing
review 2116's named omission (verified the call site cites it) ✓;
else ANY_LOC + isok + single `sel_set_ter` ✓. `check_mapchr` never
throws inline (INVALID flows to the shared gate) — JS matches in all
three arms ✓. Confirm.

## Hallucinations / overclaim

None. The D-entry names every inline equivalent and the file
precedent for the nhl_error line-suffix omit.

## Density

- Whole-function verdicts: both whole (every arm verified, `:5025`
  wired, tables own and C-ordered).
- Cluster: one C file, 2 ports + 2 stales = 4 functions ≤ 10. One
  `Ledger:` entry per function — present.

## Verification

Re-measured myself (`--base 850d390ba~1 --reach-all`, both):

```text
verify <each of 2>: baseline 850d390ba~1 — 0 session(s) blocked on it
smoke <each of 2>: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

Zero `REGRESSED`; D-log claims match. Focused suite 12/12 (re-ran).
No seed/step/coordinate read.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
