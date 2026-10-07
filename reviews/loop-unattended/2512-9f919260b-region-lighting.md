# Review 2512 — 9f919260b — hand-loader region lighting (L47 flood + castle grow)

Metadata: SHA `9f919260b` (D-3632), cliffs-head `teleport.c` level_tele
(region owner; two region-lighting writers in the hand-loaders). js diff
+30/−16 in `js/mklev.js` only, no new test file (justified: file-local
inlinings, probe sessions are the coverage, fountain-count precedent).
≤10-function SHA: full Method on both inlinings.

## Intent vs deliverable

Promise: (1) wiz-strt L47 des.region inlining → C `lspo_region` irregular-arm
order: `litstate_rnd(0)`, room-cap fallback, smeq + `flood_fill_rm` +
`add_room` over flood bounds + flags; drop `topologize` and the des-rect
`unlitRect`. (2) castle `setLitArea` body → `light_region(...)` (C's own
function: grown ring when lit, lava stays lit). Claims 2 PASS
(quest-Wizard-94196, special-Healer-94177) + REACH-OK; no new edges.

Diff actually adds: exactly those two inlinings + comments. Matches.

## Inventory

- `load_wiz_strt` L47 block (`js/mklev.js`) — flood-based region, C order.
- `load_castle` `setLitArea` (`js/mklev.js`) — one-line `light_region` call.

## C ↔ JS fidelity

C `lspo_region` (`nethack-c/upstream/src/sp_lev.c:5583–5715`, via `csym.mjs`).
Des source `Wiz-strt.lua:47`: `des.region({ region={19,11,33,15}, lit=0,
type="ordinary", irregular=1 })` — no contents fn, filled/joined defaults.

L47, arm by arm: defaults `:5600–5605` (needfill 0, joined TRUE, rlit 0) ✓;
`:5638` `litstate_rnd(0)` = FALSE with no RNG (`mkmap.c:442–448`, verified;
JS local clone `mklev.js:3027` returns `!!0`, no draws — pre-existing clone,
not added here) ✓; room-cap fallback (impossible + `light_region` over the
**des** rect) ✓; `:5678–5681` needfill/needjoining end states ✓ (C add_room
touches neither — `mkroom.c` needfill writes are shop/zoo makers — and JS
`add_room`'s `needjoining: !special` is overwritten after, so end states
match); irregular `:5682–5690` (bounds init, `smeq[nroom]=nroom`,
`flood_fill_rm(dx1,dy1,nroom+ROOMOFFSET,rlit,TRUE)`, `add_room` over **flood**
bounds with FALSE, rlit, irregular) ✓ exact order; `topologize` lives only in
the regular arm (`:5691–5697`) so dropping it is correct (old code wrongly
called it); `add_room(FALSE)` paints no cell lit in either
(`mklev.c:230–301` `if (lit)` gate, JS same) so the flood's lit stands ✓;
flood leaves walls/doors/SDOORs lit when unlighting (`mkmap.c` `if (lit)`
gate) ✓ as the comment says.

Castle selection arm (`:5613–5631`): grow-by-1 only when lit, then per-cell
`sel_set_lit` (`:5534–5540`, `(IS_LAVA||lit)?1:0`) — for a solid rect exactly
`light_region`'s expanded rect (`sp_lev.c:2838–2862`: same lava rule, same
no-expansion-unlit; JS local `mklev.js:30039` is an exact port, pre-existing).
The x0-clamp worry is discharged exactly: centering gives
`2+floor((78−2−63)/2)=8→odd→9`, so map-space lowx ≥ 9 and `max(lowx−1,1)`
never bites. Old code's bare `loc.lit = lit` loop (no grow, lava wrongly
unlit) was the C-wrong; deleted.

Named omits (all in the D-entry with C cites): coder bookkeeping
(`:5700–5711`, no-contents region → null net croom effect); per-room
`add_doors_to_room` (`:5712`) subsumed by global `link_doors_rooms` (C
`lspo_finalize_level` `:6022`, verified; `js/mklev.js:6935` — both sessions
fully PASS 173/299 steps, which exercises castle doors); wiz-strt lit-all
missing grow (map-edge ring, invisible — `Wiz-strt.lua:44` confirms the arm
exists and is named, not silent). RNG: no draws in any ported arm.

`sym.mjs`: `light_region`/`flood_fill_rm` are pre-existing mklev.js locals
(the "clone" warnings are pre-existing map debt); this SHA adds no clone, no
import, no export — "no new edges" true.

## Hallucinations / overclaim

None. "Fortress-safe by construction" is followed by the actual construction
argument (lit/roomno equalities per level), and both probes fully PASS. The
`litstate_rnd` clone situation is not mentioned in the D-log, but the SHA
neither adds nor needs more than `litstate_rnd(0)` (verified no-draw false)
— no overclaim, no new debt. Diff grep clean; Rule #2 globally clean (2506).

## Density

Cliff phase: one cliff row (level_tele, 2 blocks), both writers named by the
probes' arrival vision, both shipped whole in C order. `Ledger: lspo_region
ported` (both inlinings are that function's arms — one entry is right). No
second-file work. Not a no-op: 2/2 probes PASS.

## Verification

Re-measured, one call:
`node scripts/hidden-proxy.mjs verify level_tele,lspo_region --base 9f919260b~1 --reach-all`:

- `verify level_tele: 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
  (quest-Wizard-94196 PASS, special-Healer-94177 PASS)
- `smoke level_tele: 24 PASS, 0 regressed → REACH-OK`
- `verify lspo_region: no corpus session is blocked` (writer, 0 blocked —
  D-log claims no PASS for it)
- `smoke lspo_region: 24 PASS, 0 regressed → REACH-OK`

Matches the D-log Verify bullet exactly. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
