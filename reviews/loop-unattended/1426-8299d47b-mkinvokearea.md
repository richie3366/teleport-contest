# Review 1426 — 8299d47b — mkinvokearea whole-body port (D-2467)

Metadata: SHA `8299d47b`, `js/mklev.js` only (+226/−3). Coverage
MISSING → live. D-log: D-2467.

## Intent vs deliverable

Promise: whole `mkinvokearea` body in C order + static `mkinvpos` /
`mkinvk_check_wall`, sole caller `deadbook` deferred. Diff ships
exactly that: `export async function mkinvokearea`, module-local
`mkinvpos` / `mkinvk_check_wall`, import edges only. No second
subsystem.

## Inventory

- Added: `export async function mkinvokearea` (exported, correct — C
  is global `mklev.c:2409–2497`).
- Added: module-local `async function mkinvpos(x, y, dist)` (C
  staticfn `:2502–2598`), `function mkinvk_check_wall(x, y)` (C
  staticfn `:2601–2613`). Local scope matches C static.
- Edges: `buried_ball_to_punishment`/`fracture_rock` (dig.js),
  `obfree` (shk.js), `You` (zap.js), `flush_screen`/`nh_delay_output`
  (display.js), `reset_utrap`/`mintrap` (trap.js),
  `seemimic`/`minliquid` (mon.js) — all `sym.mjs` LIVE exports
  (async ones awaited at every site).
- No deleted/re-pointed clones for `sym.mjs` (`mkstairs`,
  `svi_inv_pos` checked below — pre-existing, untouched).

## C ↔ JS fidelity

C `mklev.c:2409–2497` vs JS, branch by branch:

- Shake + wall-count loop: `pline_The` → `pline('The …')` (file
  idiom); `dist!=3` wider-than-high, skip-y-when-x-found
  (`if (!wallct)`), no early stop on wallct — exact, C comments
  verbatim.
- `display_nhwindow(WIN_MESSAGE, TRUE)` named omit (no JS export;
  pline flushes) — mechanism, not behavior.
- Utrap release: `u.utrap` → `buried_ball_to_punishment()` (awaited;
  C void call) iff `TT_BURIEDBALL`, then `reset_utrap(false)` — exact.
- Reset-after-check + center `mkinvpos(0)` + dist 1..6 rings with
  `flush_screen(1)` + `nh_delay_output()` per ring — exact; ring
  geometry (top/bottom skip at dist 3, left/right always) duplicated
  exactly in both loops.
- Stairwell: `You(...)` + `mkstairs(u.ux, u.uy, 0, null, false)` (=
  C `(0, NULL, FALSE)`; local `mkstairs` is the established D-1061
  port) + `newsym` + `vision_full_recalc = 1` — exact.

`mkinvpos` (`:2502–2598`): maze clip (`dist < (7-2)` =
`dist < 5`); `!isok → throw` ≡ C `panic`, else `await impossible`
(C `errfunc` select — exact); deltrap; `make_rocks`
(`dist!==1,4,5`); fracture-first-then-obfree loop; seenv/doormask/
`lit iff dist<6`/waslit/`horizontal=false`; viz short-circuit
(`IN_SIGHT|COULD_SEE` iff `dist<6` — JS adds a `viz_array[y]` guard,
defensive only); dist switch (1 = pool-break before ROOM +
FIRE_TRAP + tseen; 0/2/3/6 ROOM; 4/5 MOAT; default impossible) —
exact; mimic wake + `mintrap(NO_TRAP_FLAGS)` / `minliquid`
(C `(void)` discards, JS awaits — same order); `does_block` →
`unblock_point`; `newsym`. No RNG in C, none added.

`mkinvk_check_wall` (`:2601–2613`): `!isok → 0`,
`IS_STWALL || IRONBARS → 1` — exact (C asserts covered by guard).

Caller: sole C caller `deadbook` (`spell.c:290`) confirmed deferred
(`js/spell.js:734` comment) — no live caller to wire; named in map,
not a miss.

`sym.mjs` notes: `svi_inv_pos` is a struct-field accessor (C
`svi.inv_pos` is a field, not a function) — not a C-function clone.
`mkstairs` local is the established whole-body port, untouched.

## Hallucinations / overclaim

None. "Whole body, every callee live" holds: every callee is an
imported LIVE export or an established file-local port; the two
new module-locals are the C staticfns themselves.

## Density

One 89-line C function + two staticfns (~199 L C), 226 JS
insertions, one module: right-sized breadth port.

## Verification

- `hidden-proxy verify mkinvokearea --base 8299d47b~1 --reach-all`
  (re-run): 0 blocked both sides — vacuous, but the D-log says
  exactly that ("no corpus session blocked", "note hidden"), so the
  claim is honest, not false. Smoke 24/24 PASS, 0 regressed →
  REACH-OK. Matches.
- Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coordinate
  logic (only hit is the commit-message word "wider-than-high"
  context). Rule #2: no new Node imports (checked in final
  `--rulecheck`).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
