# Review 1132 — fae41579 — dig.c use_pick_axe dir loop (D-2166)

Metadata: SHA `fae41579`, js/ +22/−9 in `dig.js` only (import
name + `DIG_DIR_CHARS` reorder + loop body) + map row. D-log
D-2166. Subject promises: direction prompt listed `[kyu>]`
instead of C `[yku>]` — scen-kit-Archeologist-92022 step
11/88, screen-first at `dig.c:1151`.

Intent vs deliverable: promise matches diff. Actually adds:
(1) table reordered to C `sdir` order with xdir/ydir/zdir
coords, (2) loop sets u.dx/u.dy/u.dz per entry (movecmd
equivalent) with the live `dxdy_moveok()` planar gate and the
`(u.dz > 0) ^ downok` vertical arm. No scope creep.

Inventory: no new functions; one reworked loop + table.
Callee closure: `dxdy_moveok → js/lock.js:129 sync` — LIVE;
`imports.mjs --can dig.js lock.js dxdy_moveok` → ALREADY
(existing edge). `dig_typ/isok/can_reach_floor/getdir` all
pre-existing in-module use. No deleted symbols.

**C ↔ JS fidelity**: confirm against pinned C
(`dig.c:1091–1156`, via `csym.mjs use_pick_axe` + direct
read). Table: C `sdir[] = "hykulnjb><"` (`cmd.c:3346`) with
xdir/ydir/zdir (`decl.c:77–79`) — JS now walks
h,y,k,u,l,n,j,b,>,< with matching (dx,dy,dz) triples,
including the `>`-before-`<` tail the old table had swapped.
Loop: uswallow bypass first (C `:1127–1128`, JS `:2138` —
present, verified); planar arm sets u.dx/u.dy/u.dz=0 then
`dxdy_moveok` → isok/`dig_typ` (C `:1129–1136`); vertical arm
skips on `(u.dz>0)^downok` (C `:1137–1145`). State-leak check:
the loop leaves u.dx/dy/dz at the last entry, but C's
`movecmd` does exactly the same during its own scan, and
`getdir` overwrites via the chosen char — no divergence
beyond C. The movecmd key-remap gap (num_pad/swap_yz) is OMIT
with a C citation, same pre-existing shape as the getdir path.

Hallucinations / overclaim: none — and the D-log's trickiest
claim checks out. Its Verify bullet admits the new owner
prints as "js-throw" but asserts that is the owner-null
fallback label with `kind=screen`, `error null`. I ran
`hidden-proxy.mjs show scen-kit-Archeologist-92022` myself:
`error: null, kind: screen, owner: null`, region map/menu
row-1 (C menu row vs JS blank), screens 68/88 — no throw
exists. Accurate disclosure, not a re-label.

Density: ~35 insertions; D-log notes the bulk was already
ported (D-0951/D-1018) and this was the exact remaining gap.
Fine.

Verification: D-log Verify bullet shows `verify.mjs --fn
use_pick_axe` → hidden step 11 → 68 + green + strict +
cohort 7/7. Re-measured myself:
`hidden-proxy.mjs verify use_pick_axe --base fae41579~1` →
`0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
(Archeologist-92022 moved → step 68, was 11) — matches
exactly, forward movement, no regression. No
FORCE/DIAG/seed-gate in the diff.

**Actionable C-wrongs**: none. (Step-68 owner-null map/menu
row is next-owner territory per the D-log, correctly not
claimed.)

Verdict: **ACCEPT**
