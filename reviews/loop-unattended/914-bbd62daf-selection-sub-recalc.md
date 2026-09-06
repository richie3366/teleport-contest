# Review 914 — bbd62daf — nhlsel/selvar selection_sub + selection_recalc_bounds (D-1944)

## Metadata

- SHA: `bbd62daf` (D-1944). JS: `js/mklev.js` +67/−4. Docs-only companion `2d82418d` touches no `js/` — skipped per method.
- Subject promises: file-local `selection_recalc_bounds` + `selection_sub` (`-`/`__sub`), rewiring two Tou call sites to C evaluation order.
- Prior reviews closed: none (new Open-row work; last review 913 at `82cffe79`).

## Intent vs deliverable

Promise matches diff. Adds two file-local functions (`selection_recalc_bounds` mklev.js:25315, `selection_sub` mklev.js:25346) and rewires `load_tou_loca` (union-then-subtract) and `load_tou_goal` (direct subtract). No new import edge. No RNG, no DIAG/FORCE/seed gates (grep clean).

## Inventory

| JS helper | Class |
|---|---|
| `selection_recalc_bounds(sel)` | CLONE of C `selvar.c:98–165` (file-local by design; `sym.mjs` confirms no export, single local) |
| `selection_sub(sela, selb)` | CLONE of C `nhlsel.c:360–385 l_selection_sub` (Lua `__sub`; file-local, single local) |

## C ↔ JS fidelity

- `l_selection_sub` (`nhlsel.c:360–385`, via `csym.mjs`): loops `rect_bounds` union, per cell `val = (a^b)&a`, `selection_setpoint(x,y,selr,val)`, then `selection_recalc_bounds(selr)` (load-bearing: 0-writes dirty fresh bounds). JS iterates sela membership, sets only present-and-not-in-selb points into a fresh zeroed selection, then recalcs. Same membership: C writes 1 exactly for a=1,b=0, i.e. sela−selb; JS adds exactly those keys. Fresh `selection_new()` is all-zero, so skipping the 0-writes is behavior-identical.
- `selection_recalc_bounds` (`selvar.c:98–165`): dirty-gated; empty → lx=COLNO, ly=ROWNO, hx=hy=0; else column/row scans for extremes. JS recomputes unconditionally (min/max over membership, same empty reset). Endpoints identical: C's scans find exactly the membership min/max. The unconditional-recompute justification holds — verified JS `selection_setpoint` (mklev.js:25087): set expands bounds, delete never shrinks, no dirty flag anywhere. So C's dirty=FALSE early-return implies already-tight bounds; unconditional recompute reaches the same endpoints.
- Call-site order: Tou-loca.lua `validtraps - (area+area)` → `selection_sub(validtraps, selection_or(A,B))` matches C `__sub` of `__add`-union evaluation. Old `and(X, not(Y))` had identical membership but clone-wider bounds (no recalc); the new tight-bounds form is strictly closer to C. No RNG in either form, so `selection_rndcoord` downstream draws are unaffected by the rewrite itself.
- Endpoint equivalence, concretely: C scans (left column with any point → lx; right → hx; top row → ly; bottom → hy) yield exactly the membership min/max the JS loop computes; both reset empty to lx=COLNO, ly=ROWNO, hx=hy=0. The dirty-gate difference is provably inert: JS `selection_setpoint` (mklev.js:25087–25099, read in full) expands bounds on set and never shrinks on delete with no dirty flag, so whenever C would early-return (dirty=FALSE) the bounds are already tight and both implementations agree.
- Membership edge: C's union-rect loop visits cells outside both selections and writes val=0 there; JS never visits them. Both are no-ops on a fresh zeroed result — the only observable (membership + tight bounds) is identical.
- Named omits in-commit with C citations: `l_selection_xor`, mutating `selection_clear`, ellipse/gradient/circle, full Lua VM — all named, none live arms. (The follow-up `2d82418d` correctly un-shipped two refill rows that had falsely cited D-1944.)

## Hallucinations / overclaim

None. D-log makes no corpus claim; the "vacuous" note is explicit and accurate (0 blocks at baseline too — confirmed by re-run, not just quoted).

## Cited ranges (tool-pinned)

- C: `nhlsel.c:360–385` (`l_selection_sub`), `selvar.c:98–165`
  (`selection_recalc_bounds`), `selvar.c:191` (getpoint fast path),
  `selvar.c:201–204` (dirty set on 1→0 only).
- JS: `selection_recalc_bounds` mklev.js:25315, `selection_sub`
  mklev.js:25346, `selection_setpoint` mklev.js:25087–25099,
  rewires at load_tou_loca / load_tou_goal.
- `sym.mjs`: both helpers single-local, unexported — file-local clones
  by design (Lua-operator helpers, same module as all callers).

## Density

Right-sized per §2b: one tight family (recalc + its single consumer + two call sites), 67 insertions, map + queue + verify in one handoff.

## Verification

- `imports.mjs --rulecheck`: Rule #2 clean (whole `js/`).
- `hidden-proxy verify selection_sub --base bbd62daf~1`: "0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)" — matches the D-log's "no `--base` re-run owed" (map-driven HELDOUT row, zero blocks cited). No PASS overclaim.
- Same-module change; no `--can` needed (correctly omitted).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
