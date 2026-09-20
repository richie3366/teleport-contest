# Review 1654 — 471b8f58 — `sp_lev.c` set_door_orientation caller wiring (D-2695)

Metadata: commit `471b8f58`, D-2695, `js/mklev.js` only (+16:
one-liner `set_door_orientation(mx + rx, my + ry); // C
sel_set_door :4659` in 15 closures + doc). No prior review
claimed closed. Pops the `set_door_orientation` PARTIAL row and
parks `count_surround_traps` + `find_objtype` STALE in the same
iteration.

## Intent vs deliverable

Subject promises: sel_set_door-caller wiring + 2 Stale parks.
Diff actually wires 15 des.door closures (medDoor×3/barDoor×2/
wizDoor×3/meDoor×3/priDoor×2/arcDoor×2) and parks the two rows
with arm-by-arm evidence. The D-log claims the 15 are "**each**
des.door coord-form closure" — that completeness claim is
false (see Fidelity). The 2 parks audit clean (see below).

## Inventory

Changed JS: 15 call sites added; `set_door_orientation` body
(js/mklev.js:16902, pre-existing) untouched. Same-module local
call — no new edge, no TDZ (function declaration hoists). No
deleted/re-pointed symbols.

## C ↔ JS fidelity

C locus: `sel_set_door` `sp_lev.c:4646–4662` (csym, 17 L — whole
body read), `set_door_orientation` `:1041–1085` (csym, 45 L —
whole body read), `lspo_door` `:4670–4734` (csym — both forms
read). C callers of `set_door_orientation`: exactly two —
`:1133` (`link_doors_rooms`, pre-existing JS full-scan at
js/mklev.js:17009, verified this session) and `:4659`
(`sel_set_door`). `create_door` (wall-form) never calls it
(verified: no orientation/horizontal reference in its body).

- Order: C writes typ → strips D_SECRET → calls
  `set_door_orientation` → writes doormask. JS inserts the call
  after the typ write, before doormask. Confirm (orientation
  reads neighbors + writes `horizontal` only).
- Body: pre-existing JS matches C arm-for-arm (isok-gated
  wall/door/sdoor quads, DOORJOIN fallback, `? 1 : 0` under
  `if (loc)`). Confirm by read this session.
- Wired side is clean: all 15 closures serve coord-form
  positions (spot-verified: load_wiz_loca invokes wizDoor with
  exactly Wiz-loca.lua's 4 coord-form doors `(55,8)/(55,12)/
  (47,8)/(47,12)`; the 5 wall-form secret doors route
  elsewhere). No extra call. Confirm.

The miss — C-wrong family (Must-fix below): `lspo_door` routes
**every** coord-form `des.door(state,x,y)` (argc==3 with x,y)
through `sel_set_door` → `:4659`. The `.lua` sources prove the
unwired closures are coord-form: castle.lua 18 coord doors
(`des.door("closed",07,03)` ≡ JS `castleDoor(7, 3, …)`),
Kni-strt.lua 15 (`("locked",24,03)` ≡ `kniDoor(24, 3, …)`),
knox.lua 11, astral.lua 9, Ran-goal.lua 12, Tou-goal.lua 12,
Bar-goal.lua 2, Mon-strt.lua 8, asmodeus.lua 4, orcus.lua 8,
wizard2.lua 2, valley.lua 3, tower1.lua 7, Rog-strt.lua 8+,
Sam-strt.lua 6+, minetn-1.lua 10 (`"random",5,8` — "random" is
a *state*, coordinates present → coord path), medusa-2.lua 1
(`("locked", 71,07)` ≡ the :3866 inline block), sanctum.lua 4
coord (+1 wall, correctly excluded). None of these closures
got the call — 26 of 41 `*Door` closures unwired.

Mitigation checked, fails: C's `link_doors_rooms` (`:1127–
1141`) re-orients every door map-wide, and JS ports it
faithfully — but only loaders that call it benefit. Grepped
every door loader: NO `link_doors_rooms()` epilogue in
load_castle, load_asmodeus, load_orcus, load_wizard2,
load_kni_strt, load_rog_strt, load_sam_strt/goal/loca,
load_hea_strt/loca, load_tou_strt/loca/goal, load_ran_goal,
load_mon_strt, load_tower1/2/3, load_minetn_1,
load_val_strt, load_cav_strt, load_tut2 (knox/valley/sanctum/
astral/medusa-2/bar-goal HAVE it — benign there). In the
no-epilogue loaders `horizontal` stays `undefined` where C
writes 0/1 from adjacent walls — read by the SDOOR/H/V glyph
path (js/display.js:3374–3541 per D-log). Real, C-proven,
castle/quest/gehennom-wide divergence. D-2395 genus: unwired
call sites sold as complete.

Parks (D-2691 lesson applied — caller-completeness checked):
`count_surround_traps` — single C caller `:2761` → wired
js/artifact.js:2406 (`mkot_trap_warn`); 1/1 complete. STANDS.
`find_objtype` — 4 C sites `:3543/:3602/:3615/:3629`, all
inside two object-parse helpers the D-log maps to
`lspo_object_normalize_table`/`lspo_object_from_string`;
structurally covered. STANDS (falsifier protects both).

Diff grep: no FORCE/DIAG/seed/coordinate. Rule #2 clean
(iteration-wide check at end of audit).

## Hallucinations / overclaim

Yes — completeness overclaim: "wired at **each** des.door
coord-form closure" with an enumeration
(medDoor/barDoor/wizDoor/meDoor/priDoor/arcDoor) presented as
exhaustive, while kni/rog/sam/hea/tou/ran/mon/knox/castle/
valley/asmo/orcus/wiz2/sanctum/tower/minetn coord-form
closures exist in-file with the identical pre-patch shape.
The 15 wired sites are correct; the "each" is false.

## Density

16 insertions. As a remainder-close it would be fine — but the
row is not closed: ~26 sites remain. Density is not the
problem; completeness is.

## Verification

D-log Verify pattern per siblings (incl. full 44/44 — shared
file). Re-ran `hidden-proxy.mjs verify set_door_orientation
--base 471b8f58~1 --reach-all`: "0 blocked (0 at baseline…)"
— vacuous note properly stated — plus "24 PASS, 0 regressed →
REACH-OK". No REGRESSED. Corpus-clean (special-level doors
don't gate corpus RNG), which is exactly why the audit-against-C
— not the fortress — catches this one.

## Actionable C-wrongs

1. (Must-fix, queued) `sp_lev.c` `sel_set_door` `:4659`
   orientation missing from every remaining coord-form
   des.door closure — castleDoor, asmoDoor, orcusDoor,
   wiz2Door, kniDoor, rogDoor, samDoor×2, heaDoor,
   heaLocaDoor, touStrtDoor/Loca/Goal, ranGoalDoor, monDoor,
   knoxDoor, barGoalDoor, twDoor×2 (+tower3/medusa-2/val_strt/
   cav_strt/tut2 inline sites), astralDoor, tnDoor×3,
   valleyDoor, sanctDoor (coord doors only). Same one-liner in
   C `:4659` position; wall-form `create_door` sites (e.g.
   D_NODOOR writes) and `lev.doormask = 0` clearing stay
   untouched per C. Verify each site against its `.lua`
   (coord-form `des.door(state,x,y)` ⇔ wire; table-form ⇔
   skip). One `js/mklev.js` iteration; no-epilogue loaders
   (castle/quests/gehennom/minetn) change glyphs, epilogue
   loaders must stay byte-identical (recompute no-op proof).

Verdict: **QUALITY-RISK**

**Addressed:** D-2697 `3de22e5b`
