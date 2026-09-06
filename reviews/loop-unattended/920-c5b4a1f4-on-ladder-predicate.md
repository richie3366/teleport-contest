# Review 920 — c5b4a1f4 — stairs.c On_ladder ladder predicate singleton (D-1950)

## Metadata

- SHA: `c5b4a1f4` (D-1950). JS: `js/mklev.js` +6 (new sync export `On_ladder` after `stairway_at`).
- Subject promises: C-order port, `|0` idiom, full 44/44 auto (shared file), probe, caller wiring named.
- Prior reviews closed: none.

## Intent vs deliverable

Promise matches diff. 6 added lines. No imports, no RNG, no gates.

## Inventory

| Symbol | Class |
|---|---|
| `On_ladder(x, y)` | new export; ports C `stairs.c:153–159` |
| `stairway_at` | LIVE same-module callee |

## C ↔ JS fidelity

Complete confirm: C `stway = stairway_at(x, y); return (boolean)(stway && stway->isladder)` → JS `stairway_at(x|0, y|0)` then `!!(stway && stway.isladder)`. Short-circuit order preserved (lookup before flag read). Sole C caller `dig.c:1812` (`adj_pit_checks` ladder arm) verified via `--callers`; named omitted in-commit with the `js/dig.js` map locus.
- Same-module callee re-read (not assumed): JS `stairway_at` (mklev.js, directly above the new export) scans for a stairway record at (x, y) and returns the record or null; the new `On_ladder` sits adjacent to it beside the stairway lookups, per the `hack.js`/`dogmove.js` `On_stairs`-clone idiom cited in the D-log. No import edge, no cycle question at all.
- `| 0` coercion audit: `stairway_at` compares against integer cell coords; on C-reachable (integer) inputs the coercion is identity. The D-log's 4-case probe (no-stairs→false, stairs-non-ladder→false, ladder→true, off-cell→false) covers the full truth table of the two-conjunct boolean — sufficient for a 7-line predicate with no state and no RNG.
- `!!` vs C `(boolean)`: both normalize to a real boolean; downstream `dig.c:1812` uses it as a condition only, so no width/strict-equality consumer can observe a difference.

## Hallucinations / overclaim

None. Vacuous hidden note explicit; no corpus claim.

## Cited ranges (tool-pinned)

- C body in full (`stairs.c:153–159`, via `csym.mjs`):
  `stairway *stway = stairway_at(x, y);`
  `return (boolean) (stway && stway->isladder);`
  plus the sole caller `dig.c:1812`
  (`} else if (On_ladder(cc->x, cc->y)) {`).
- JS: `stairway_at` mklev.js (~362), `On_ladder` directly after;
  map locus `js/dig.js` zap_dig header (`adj_pit_checks` deferred).
- D-log probe matrix (inline, no file): no stairs → false;
  stairs non-ladder → false; ladder → true; off-cell → false.
- Diff size (+6/−0): lookup + boolean + JSDoc citation only —
  the smallest possible complete port of a 7-line C function.

## Density

Minimal but C-complete: the C function is 7 lines (§2b "unless C is that small").

## Verification

- `hidden-proxy verify On_ladder --base c5b4a1f4~1`: 0 blocked at baseline and now — matches D-log.
- No new edges. Callee closure: single LIVE same-module callee.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
