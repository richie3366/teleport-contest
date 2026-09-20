# Review 1602 — d76b7205 — sp_lev.c sp_level_coder_init whole-body port (D-2643)

**Metadata:** SHA `d76b7205`, `sp_lev.c` `sp_level_coder_init` (+
`update_croom`, `create_des_coder`, `load_special` entry/exit),
D-2643. JS: `js/mklev.js` only (+97: two new exports, one local,
one split wrapper, one module let, one const import). Same-file
only, no new import edges. No prior review claimed closed.

## Intent vs deliverable

Subject promises: new exported `sp_level_coder_init` in C order
(alloc⇔literal, flags, MAX_NESTED_ROOMS+1 arrays, statics,
prior-coder update_croom, container zero, invent static null,
SpLev_Map clear, level-flags arm, reset_xystart_size), new exported
`update_croom`, local `create_des_coder` guard, and the
`load_special_proto` split (wrapper with entry-create + finally
Free/NULL over the renamed dispatch body with its old preamble
removed as subsumed). Diff delivers all of it. Promise matches
deliverable.

## Inventory

- `sp_level_coder_init` (mklev.js:1495, sync) + `update_croom`
  (new exports), `create_des_coder` (new local),
  `load_special_proto` → wrapper + `load_special_proto_body`.
- `invent_carrying_monster` module let (sp_lev.c:198), nulled per
  `:6364` (writers are future lspo rows).
- No deleted symbol, no local→import re-point.

## C ↔ JS fidelity

C loci `sp_lev.c:6335–6376` (42 L) + `update_croom :6323–6333`
(11 L) + `create_des_coder :6443–6448` + `load_special :6454–6501`
entry/exit (all read here); struct `sp_lev.h:87–98`. Check by
check (no RNG either side):

- Literal carries all 10 struct fields with C values (allow_flips
  3, n_subroom 1, rest falsy) ✓; `MAX_NESTED_ROOMS+1` arrays
  (5=5 both sides, verified) ✓; statics via the existing helper
  in C position (pre/post-array order is unobservable on fresh
  objects) ✓.
- `:6358` update_croom reads the PRIOR `game.gc.coder`, not the
  local under construction — exactly C's read of `gc.coder`
  before the caller assigns the return; documented in the comment
  ✓. update_croom body exact (`?? null` maps OOB to C NULL;
  strictly safer than C, same invariant).
- Container zero + idx, invent null, SpLev_Map fresh Set (the
  file's existing Set convention, :1455/:2224) ✓.
- Level-flags arm: maze 0, temperature = hellish-flag read ≡
  `In_hell` (mklev.js:1416 precedent), rndmongen/deathdrops 1 ✓;
  `game.level.flags` deref is unconditional like C's
  (level-gen context always has game.level; full 44/44 held) —
  C-equivalent, not a row.
- Entry/exit lifecycle: C `create_des_coder` guard
  (`if (!gc.coder)` → init) + `give_up: Free + NULL` on EVERY
  path (verified lines :6459/:6497–6499). JS wrapper creates at
  entry and NULLs in `finally` — covers throws too, which C's
  gotos also reach ✓. Old preamble (reset+statics without fresh
  init) correctly removed as subsumed: since `finally` always
  NULLs, entry always finds null and always fully inits — no stale-
  coder path survives, matching C's fresh alloc per load ✓.
  (`if (!game.gc) game.gc = {}` mirrors C's always-present gc
  global; cmd.js precedent.)
- Callee closure: statics helper, update_croom, reset_xystart_size,
  container/statics module state — all LIVE/same-file. Named:
  alloc⇔GC (allocation, not semantics), load_special epilogue
  reads (each loader's own rows), lvl_is_joined kept w/o reader
  (per C `:6347`) — all same-commit named, no live-arm stubs.

## Hallucinations / overclaim

The `/tmp/smoke_coder.mjs → ALL PASS` scratch check is D-log due
diligence, not re-runnable here; the audit rests on the C
comparison + gates instead. `--can: IN-SCC` is moot (no new
edges — same-file only). No dispatch-vs-stub overclaim.

## Density

42-line C function + 11-line helper + lifecycle split, one
module, ~97 insertions. Right-sized (one function family).

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff added-lines grep: 0 `FORCE`/`DIAG`/`getRngLog`/`fastforward`.
- Re-measured: `hidden-proxy.mjs verify sp_level_coder_init --base
  d76b7205~1 --reach-all` → `0 session(s) blocked` (vacuous-note
  path, honestly labeled — coverage row, no corpus owner) + `smoke
  24/24 PASS, 0 regressed → REACH-OK`. Both summary lines cited;
  no REGRESSED session. Matches the D-log's bullet.

## Actionable C-wrongs

None. Init values, ordering, guard, and the free+NULL lifecycle
all match C.

Verdict: **ACCEPT**
