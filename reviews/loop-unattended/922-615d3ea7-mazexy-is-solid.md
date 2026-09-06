# Review 922 — 615d3ea7 — mkmaze.c mazexy + is_solid maze solidity predicates (D-1952)

## Metadata

- SHA: `615d3ea7` (D-1952). JS: `js/mklev.js` +40/−6 (`is_solid` export replacing `isSolidTile`; `mazexy` export; `wall_cleanup` re-pointed).
- Subject promises: `is_solid` in C order with short-circuit, clone deleted + caller re-pointed behavior-identical, `mazexy` in C order with loud throw, full 44/44 auto, named omits (create_maze envelope, iswall clones).
- Prior reviews closed: none.

## Intent vs deliverable

Promise matches diff. No DIAG/FORCE/seed gates. Rule #2 clean.

## Inventory

| Symbol | Class |
|---|---|
| `is_solid(x, y)` | new export; ports C `mkmaze.c:69–73` (staticfn → exported) |
| `mazexy(cc)` | new export; ports C `mkmaze.c:1314–1350` |
| `isSolidTile` (deleted) | required `sym.mjs` output, pasted verbatim: `isSolidTile  NOT FOUND in js/** (no export, no local function/const). / This index includes js/generated/. Do not add a local clone.` — clean deletion, zero remaining references; single call site (`wall_cleanup` 8-neighbor gate) re-pointed in this diff |

## C ↔ JS fidelity

- `is_solid`: C `(boolean)(!isok(x,y) \|\| IS_STWALL(levl[x][y].typ))` → JS `!isok(x\|0,y\|0) \|\| IS_STWALL(at(...)?.typ ?? STONE)`. `\|\|` short-circuit preserves C's out-of-bounds safety (verified: `at()` unevaluated when `!isok`). Old clone was behavior-identical on reachable inputs (only delta is `\|0` coercion; the sole caller passes integers) — "live, behavior-identical" claim holds.
- `mazexy`: do-while `rnd` attempts (JS `rnd` = 1..N ≡ C `1+rn2(N)`, obscure-idiom comment carried), `++cpt < 100` shape, x-outer/y-inner systematic scan `1..MAX`, out-param `cc.x/cc.y`, loud `throw` ≡ C `panic` (lev_json.js idiom, cited). `allowedtyp` from `corrmaze` flag ≡ C.
- Bounds: C reads mutable globals `gx.x_maze_max`/`gy.y_maze_max` whose defaults are `(COLNO-1)&~1` / `(ROWNO-1)&~1` (decl.c:827, decl.c:840); JS uses the same-valued consts (mklev.js:1432–1433). The only C divergence source — `create_maze`'s temporary scaled-bounds mutation (`mkmaze.c:990–1001`) — has no JS counterpart yet and is map-named under the D-0906 omit with all `mazexy` callers deferred; using defaults is the faithful available choice, disclosed in-commit.
- Named omits: `populate_maze`/`makemaz`/`create_maze`/`maze0xy`/`walkfrom`/`maze_remove_deadends` wiring, `iswall`/`iswall_or_stone` clones (pre-existing). None are live arms touched here.
- Re-point audit (`wall_cleanup` 8-neighbor gate): old clone `if (!isok(x, y)) return true; return IS_STWALL(at(x,y)?.typ ?? STONE)` vs new `!isok(x|0,y|0) || IS_STWALL(at(x|0,y|0)?.typ ?? STONE)` — identical on all integer inputs (the only kind the call site passes: `x±1`, `y±1` of loop ints). The `||` short-circuit keeps the out-of-bounds safety the early-return provided.
- `rnd` parity for `mazexy`: JS `rnd(N) = RND(N)+1` (rng.js:97–100) ≡ C `rnd(N) = 1+rn2(N)`; the C comment block about `1+rn2(N)`/boundary-wall waste is carried in the JSDoc, so a future reader sees why attempts can waste. Systematic-scan order (x-outer, y-inner, `1..MAX` inclusive) and the panic string are character-identical to C.

## Cited ranges (tool-pinned)

- C: `is_solid` mkmaze.c:69–73; `mazexy` mkmaze.c:1314–1350;
  defaults decl.c:827 (`x_maze_max`), decl.c:840 (`y_maze_max`);
  scaled mutation mkmaze.c:990–1001 (deferred, named).
- JS: consts mklev.js:1432–1433; `is_solid` mklev.js (~27557);
  `mazexy` mklev.js (~27640); `wall_cleanup` gate (~27597).
- Const values verified equal: C `(COLNO - 1) & ~1` = 78 and
  `(ROWNO - 1) & ~1` = 20; JS identical expressions with the
  same `// 78` / `// 20` annotations — not coincidental literals.

## Hallucinations / overclaim

None. Vacuous hidden note explicit (both functions, 0 blocks).

## Density

Right-sized §2b: one C locus family (solidity predicate + its maze-point picker + the one call site that consumed the clone).

## Verification

- `hidden-proxy verify mazexy --base 615d3ea7~1`: 0 blocked at baseline and now — matches D-log.
- No new import edge (same-module only) — `--can` correctly skipped. Callee closure: `isok`, `IS_STWALL`, `rnd`, `at` all same-module/pre-existing.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
