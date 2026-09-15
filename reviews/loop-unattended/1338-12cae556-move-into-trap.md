# Review 1338 — 12cae556 — move_into_trap failed-untrap stumble (D-2372)

Metadata: SHA `12cae556`, `js/trap.js` only (+98/−9: new file-local
async `move_into_trap` + 1-line `try_disarm` wiring). Import extends all
on pre-existing static edges (`--can` ALREADY on trap.js → ball.js /
apply.js / steed.js); `u_on_newpos` (mklev.js) + `spoteffects`
(pickup.js) via runtime `await import`, the file's existing dynamic
pattern. D-log: D-2372, map-named row, 0 blocked.

## Intent vs deliverable

Subject promises the latent C-wrong in otherwise-live `try_disarm`:
the adjacent-`Whoops...` arm ended in a named omit instead of moving
the hero onto the trap with `spoteffects(TRUE)` + `dotrap(FAILEDUNTRAP)`
or the `Fortunately...` followup. Diff adds `move_into_trap` (C home
next to `try_disarm`, both C `staticfn`) and wires the adjacent arm.
Matches the promise.

## Inventory

- `move_into_trap(ttmp)` — new file-local async (C staticfn, correct
  locality). No clones, no stubs.

## C ↔ JS fidelity

Vs C `trap.c:5393–5437` (body re-read above): `door_opened = FALSE` on
entry (verified at C `hack.c:1000`, inside `test_move` proper) ✓;
`Punished` ≡ uball inline per the D-1786 file convention ✓;
`test_move && (!Punished || drag_ball(...))` short-circuit (drag only
when punished) ✓; `ux0/uy0`, `u_on_newpos` + steed share, `umoved`,
`newsym(old)`, `vision_recalc(1)`, `check_leash(old)`, conditional
`move_bc(0,...)` ✓; `tseen = 0` hack, `failing_untrap++` /
`spoteffects(TRUE)` / `--`, re-`t_at` + `tseen = 1`, WIS exercise ✓;
else `Fortunately, you don't move into/onto it` via same-file
`into_vs_onto` (`trap.js:1601`) + `sgn` (`:256`) ✓. `try_disarm`
wiring matches C `:5512–5516` (`under_u → dotrap(FAILEDUNTRAP)` else
`move_into_trap`) ✓. Branch-by-branch confirm.

`test_move` subset: C's own comment says only the doorway-diagonal
check is live on this path ("sgn calls are redundant since adjacent");
JS `test_move_ok` (`steed.js:134`: isok + accessible + diagonal-doorway)
is that subset, and `try_disarm` already gates boulder/reach/diagonal
upstream. Named with rationale — accepted as the live arm, not a stub.

Drag/jerk replication: C `drag_ball` runs `spoteffects(TRUE)` INSIDE
the jerk-back path before returning FALSE (`ball.c:823`, verified) and
none on the encumber path (`:780`); JS `ball.js` defers it caller-side
by pre-existing vehicle design (`ball.js:782`), and this SHA replicates
with the moved-check (`ux,uy !== entry → spotJerk(true)`). Residual
gap (prose-flagged, pre-existing vehicle, NOT this SHA's): jerk with
the hero UNMOVED (monster occupying the chain square) runs spoteffects
in C but is skipped by the moved-check — indistinguishable from the
encumber path through the current `{ok}` vehicle shape, shared with the
domove caller, reachable only punished + failed adjacent disarm + chain
over pit/pool + monster on the exact chain square, 0 corpus blocks. A
vehicle change (ball.js + 3 callers) is outside this cluster; noted
here, not queued. The code comment "Encumber (hero unmoved) has no
spoteffects in C either" is accurate for encumber but over-reads as a
blanket justification — comment nit, not a C-wrong.

Callee closure: `drag_ball`/`move_bc` (ball.js), `check_leash`
(apply.js), `test_move_ok` (steed.js) all LIVE static imports on
pre-existing edges; `u_on_newpos`/`spoteffects` runtime-only dynamic
imports (no TDZ). No stub in a live arm. Confirm.

## Hallucinations / overclaim

None. The three Named groups (test_move arms, u_on_newpos thinness,
drag-jerk damage) are disclosed with C citations; the D-log does not
claim corpus movement.

## Density

~98 lines, one C static function + one call site — right-sized per §2b.

## Verification

- Added-line banned grep: clean.
- Re-measured: `verify move_into_trap --base 12cae556~1` → `0 blocked
  (0 at baseline, 0 working)` — vacuous as disclosed; row cited 0
  blocks. Confirm.
- Green/strict/cohort per D-log `verify.mjs --fn move_into_trap` →
  VERIFY: PASS (quoted; HEAD is this SHA).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
