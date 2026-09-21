# Review 1696 — e975f7583 — lspo_map + replace_terrain + region (D-2737)

Metadata: commit `e975f7583`, D-2737, `js/mklev.js` only (+461). Coverage row, 0 corpus blocks stated. No prior review claimed closed.

## Intent vs deliverable

Subject promises three whole des bindings in C order with per-arm cites. The diff delivers `lspo_replace_terrain`, `lspo_region`, `lspo_map` plus file-local `sel_set_lit`/`mapfrag_error`/`set_levltyp_lit_tail`. Promise matches deliverable.

## Inventory

Changed JS: three exports + three file-local helpers, all in `js/mklev.js`. Zero import changes. No deleted symbols; helpers are single-use file locals (C staticfn shape), not export clones.

## Callee closure

No deleted/re-pointed symbols (nothing removed; all names new or pre-existing same-file). Spot-verified the load-bearing callees are live/pre-existing: `selection_*` family (incl. D-2709 `selection_do_grow`), `sel_set_ter` (`js/mklev.js:27626`), `mapfrag_*` family, `splev_opt_*`/`splev_chr2typ`/`litstate_rnd`, `light_region`/`flood_fill_rm`/`add_room`/`topologize`/`update_croom`/`spo_endroom`/`add_doors_to_room`, `splev_reset_xystart_size_keep_spmap` (pre-existing, `:3386`). `maketrap` on its existing edge. No STUB in any arm; Lua-VM/framework items (tables, pcall, push-copy, frees) correctly adapted to the unpacked-opts/no-stack house shapes with named lines.

## C ↔ JS fidelity

C loci read verbatim: `lspo_replace_terrain :5051–5143` (loop tail), `lspo_region :5619–5715` (pair arm + room tail), `lspo_map :6195–6236` (switch + clamp) and `:6244–6305` (guard + load), `reset_xystart_size :206–212`, `mapfrag_error :275–295` + `TYP_CANNOT_MATCH :203`, `set_levltyp_lit (mkmaze.c:125–145)`. Branch-by-branch on the risky arms:

- `mapfrag_error`: all three strings exact, odd-check via canmatch shape, truncating `wid/2` center, MAX/INVALID unmatchable ✓.
- lit tail: NOCHANGE-keep, lava-forces, RANDOM→`rn2(2)`, isok-gated assign ✓ verbatim (the `sel_set_ter` "legacy false keeps" gap is covered by the tail here and the explicit clear in lspo_map — consistent split, both disclosed).
- replace loop: `max(1,lx)`/`ly` bounds, getpoint gate, match-then-`rn2(100)` short-circuit in both mf and MATCH_WALL/typ arms, freesel free ✓ verbatim.
- region: `lits[]={"unlit","lit"}` index order verified identical (lit→1); C TODOs kept as TODOs ✓; `litstate_rnd` after the region-required throw, ANY_LOC with NULL croom ✓; light-only path with "Too many rooms" impossible ✓; needfill/needjoining post-applied — verified same-final-state (`add_room` at `:30226` defaults `needfill:0` and never reads it during construction; C pre-writes a slot its `add_room` preserves); irregular smeq/flood/add_room/`rlit`+`irregular`-after ✓; rect `add_room` + `topologize` (non-SPECIALIZATION arm) ✓; subroom push/contents/spo_endroom/doors ✓.
- map: halign/valign tables + switch constants verified verbatim (incl. init-present LEFT ternary, truncating `/`, odd-forcing, `-1` matches no arm); themeroom somex/somey + croom clamp ✓; ystart clamp + 1×1 reset ✓; guard scan with `tryct++<100 && (lr===-1||tb===-1)` redo else failed→skipmap ✓ verbatim; cell load clears flags/horizontal/roomno/edge (via `sel_set_ter`, verified in its body) + SpLev_Map + selection point + terr/ter-tlit ✓; skipmap reset/contents/return-live-selection ✓; `reset_xystart_size` verified to touch only the four vars (never SpLev_Map), so the keep-variant is correct.
- Audited the guarded launchplace-style shapes: none here; the `if (game.smeq)` guard is null-safety on an init-time struct, disclosed by shape.
- RNG: every `rn2`/`rnd` sits in a C-cited position (themeroom placement, `rn2(100)` chance, `rn2(2)` random-lit); none added/reordered.

## Hallucinations / overclaim

None. No FORCE/DIAG/seed/coordinate logic. The dense `:line` cites sampled all check out.

## Density

Three whole C bodies + three helpers, one module, zero new edges — the largest commit in the window (+461) but a coherent single-subsystem cluster (des bindings sharing the selection/mapfrag idiom), under the 1500 cap. Acceptable breadth-phase density.

## Verification

Re-measured all three per-SHA re-runs (`--base e975f7583~1 --reach-all`) — all match the D-log exactly:

```text
reach lspo_map: 136 baseline-PASS session(s) reach it (136 run, 29.2s): 136 PASS, 0 regressed → REACH-OK
reach lspo_replace_terrain: 64 baseline-PASS session(s) reach it (64 run, 35.5s): 64 PASS, 0 regressed → REACH-OK
smoke lspo_region: no RNG-tagged reach; fixed smoke spread (24 run, 5.1s): 24 PASS, 0 regressed → REACH-OK
```

Blocked-lines vacuous as stated; the reach lines are the real evidence (200 baseline-PASS sessions re-run, zero regressed). Green/strict/cohort/full-44 ×3 per D-log. Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
