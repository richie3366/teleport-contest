# Review 1779 — 3c5dbb972 — view_from (D-2820)

- SHA: `3c5dbb972` (coverage; Algorithm C start row and range panic)
- Files: `js/vision.js` `view_from` `:689` (file-local; C is `staticfn`)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck` on the working tree: "Rule #2 clean".
- `csym view_from` does not index this `staticfn`. Body cited from `vision.c:2001–2091`.

## Intent vs deliverable

Subject promises one `view_from`: panic when a nonzero range is outside 1..15, assign the start row's left/right instead of widening, and leave `vis_func` set. The diff does that. `right_side` / `left_side` are not edited. `MAX_RADIUS` is imported from `const.js`.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `view_from` | file-local body | `vision.c:2001–2091` `staticfn` |
| `circle_ptr` | `vision.js:77` | `vision.h:62` `&circle_data[circle_start[z]]` |
| `mark_visible_range` | file-local `:94` | `set_cs` + `set_min` + `set_max` |
| `right_side` / `left_side` | file-local, not this diff | `vision.c:1769` / `:1929` |
| `MAX_RADIUS` | imported const `15` | `vision.h:59` |

Callers in `vision.c`: `:558` blind `vision_recalc` → `js/vision.js:972`; `:624` the seeing path → `:1020`; `:2115` off-hero `do_clear_area` → `:787`. The `:93` line is the forward declaration.

`sym.mjs`:

```
view_from        NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/vision.js:689
MAX_RADIUS       js/const.js:1079   sync   export const
circle_ptr       js/vision.js:77   sync
```

One local function. C is `staticfn`. That is not a second clone.

## C ↔ JS fidelity

Globals first (`vision.c:2018–2023`): `start_col/row`, `cs_rows/left/right`, `vis_func`, `varg`. JS stores those on `game` before any circle use.

Clear start (`:2029–2043`): `is_clear` is `viz_clear_rows[row][col]` (`:1162`). The JS row arrays are `viz_clear`. Open cell: `left_ptrs` / `right_ptrs`. Stone: column 0 stays 0, otherwise the previous cell's `left_ptrs` when that cell is clear, else `scol - 1`. The right edge is the mirror with `COLNO - 1`.

`if (range)` (`:2046–2055`): `range > MAX_RADIUS || range < 1` panics (`NORETURN`). JS throws before the lookup. Otherwise `limits = circle_ptr(range) + 1`, which is `circle_data[circle_start[range] + 1]`. JS `limitsIdx` is that index; `-1` stands in for the null pointer when range is 0. Then clamp `left` / `right` to `scol ± range`. `right_side` treats `limitsIdx < 0` as `lim_max = COLNO - 1` and otherwise `circle_data[limitsIdx]`, and the recursive call uses `limitsIdx + 1`, which is the C pointer increment.

Start row (`:2057–2068`). With `func`, call it from `left` through `right` as `(col, row, arg)`. Without `func`, `set_cs` is `rowp[col] = COULD_SEE` (`:1164–1167`), then `cs_left[srow] = left` and `cs_right[srow] = right` (assignment, not `set_min` / `set_max`). The old `mark_visible_range` (`:104–105`) only moves a bound when it widens. The new start row overwrites. `COULD_SEE` is `0x1`.

Quadrants (`:2076–2090`): `nrow = srow + 1` while `< ROWNO`, `step = 1`, `right_side` when `scol < COLNO - 1`, `left_side` when `scol`. Then `nrow = srow - 1` while `>= 0`, `step = -1`, same column tests. No `vis_func = null` after that. The next `view_from` overwrites it at entry.

`right_side` `left == lim_max` (`:1769–1775`) is `vis_func` or `set_cs` + `set_max` only. JS `:577` calls `mark_visible_range`, which also does `set_min`. `left_side` `right == lim_min` (`:1929–1935`) is `set_cs` + `set_min` only. JS `:643` sets both. Named in `docs/c-js-map/data.md` in this commit. A null `loc_cs_rows` with a null `func` throws on `rowp[i]`; C would dereference. The off-hero caller passes null rows with a non-null `func`, so that path uses the callback and does not index the rows.

## Hallucinations / overclaim

The subject says the start row is an assignment, the bad range panics, and `vis_func` stays set. Those three are what the diff changes. It does not say `right_side` / `left_side` were rewritten. The map line cites the same two boundary arms.

## Density

One static function. The quadrant helpers stay the previous bodies.

## Verification

Re-run on this SHA: `node scripts/hidden-proxy.mjs verify view_from --base 3c5dbb972~1 --reach-all`.

```
verify view_from: baseline 3c5dbb972~1 (scoreboard at fc6ad8bdf) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke view_from: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note, not a false PASS. No `REGRESSED` session. D-2820's green, strict, cohort, and full 44 were not re-run here.

## Actionable C-wrongs

None. The two boundary arms are the named map lines.

Verdict: **ACCEPT**
