# Review 1669 — f1fce922 — `sp_lev.c` four lspo entries + helpers (D-2710)

Metadata: commit `f1fce922`, D-2710, `js/mklev.js` +284/−1 (3 opt helpers, `count_level_features`, `spo_endroom`, `splev_coder_build_room`, 4 exported `lspo_*` entries; 2 import identifiers). Pops head Open row (lspo_drawbridge MISSING) + 3 same-C-file rows (gold/room/finalize MISSING); parks `sortspells` STALE in the same handoff. No prior review claimed closed.

## Intent vs deliverable

Subject promises: four Lua `des.*` entries live in unpacked-opts form + `build_room`/`spo_endroom`/`count_level_features`. Diff ships exactly that, in one module, with per-arm C cites. Promise matches deliverable.

## Inventory

New JS: `splev_opt_int/index/boolean` (file-local, nhlua.c semantics), `count_level_features` (file-local), `spo_endroom` (file-local, UNUSED-arg shape kept), `splev_coder_build_room` (file-local, C `build_room` layering), exported `lspo_drawbridge/gold/room/finalize_level`, `SPLEV_H_LEFT/RIGHT` consts (C `:167,169` — verified `TOP 1/BOTTOM 5` at `sp_lev.c:172–173`, so the values coincide). Imports: `In_W_tower` joins the existing dungeon edge; `makemap_prepost` — `--can` returned ALREADY (no new edge). No deleted/re-pointed symbols.

## Callee closure

Required `sym.mjs` outputs pasted verbatim (all additions; nothing deleted or re-pointed):

```text
lspo_drawbridge  js/mklev.js:1075   sync
lspo_gold        js/mklev.js:1098   sync
lspo_room        js/mklev.js:1346   sync
lspo_finalize_level js/mklev.js:1413   ASYNC — await required
spo_endroom      NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:1023
count_level_features NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:1005
splev_coder_build_room NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:1044
In_W_tower       js/dungeon.js:902   sync
```

("CLONE" is the tool's generic local label; each C function has exactly one port at the des-loader home module.) Remaining callees verified live: `create_des_coder`, `get_table_xy_or_coord`, `get_location_coord`, `update_croom`, `add_doors_to_room`, `link_doors_rooms`, `remove_boundary_syms`, `ensure_way_out`, `map_cleanup`, `wallification` (sym batch); `flip_level_rnd` (`mklev.js:17755`), `solidify_map` (`:2783`), `fixup_special` (`:1647`), `premap_detect` (`detect.js:899`, pre-existing import `:146`), `level_finalize_topology` (`:31333`), `fill_special_room` (`:26106` async — awaited ✓), `mkgold` (`mkobj.js:3550`), `create_room` (`:29323`), `topologize` (`:29562`), `reset_xystart_size` (`:1962`), `get_coord_unpacked` (`:20425`), `splev_roomtype` (lowercased-map ≡ strcmpi, verified in body) — all definition sites confirmed. No STUB in any live arm. Async discipline: only `lspo_finalize_level` is async (awaits `fill_special_room` + `makemap_prepost`); sync entries call only sync callees.

## C ↔ JS fidelity

C loci (csym, whole bodies read): `lspo_drawbridge` `:5719–5763` (45 L), `lspo_gold` `:4479–4522` (44 L), `lspo_room` `:4027–4116` (90 L), `lspo_finalize_level` `:6013–6064` (52 L), `count_level_features` `mklev.c:827–842`, `spo_endroom` `:4118–4134`, `build_room` `:2806–2833`, `get_table_boolean` `nhlua.c:1078–1104`, `get_table_boolean_opt` `:1106–1118`, `get_table_roomtype_opt` `:4004–4018`, `sp_level_coder_init` `:6335–6376` (croom=NULL default). RNG call-for-call: `db_open −1 → !rn2(2)` ✓, `amount<0 → rnd(200)` ✓, `chance → rn2(100)` in build_room ✓.

- drawbridge: static dir/state tables verbatim ✓; raw-coord `isok` guard ✓ (same coords C checks); `dir −1` flows into `create_drawbridge` → default/impossible + WEST fallthrough like C `:5745` ✓ (verified D-2708 arms); SpLev_Map mark on post-location coords ✓. `SP_COORD_PACK` replaced by the unpacked `(rx,ry)` form — the established in-file precedent (`get_location_coord` `:20176` takes rx/ry; `−1,−1` → random/in-room path).
- gold: argc 3/2-table/table dispatch ✓; singletons throw like C `:4510` ✓; `x=y=−1` → RANDOM via the unpacked `−1,−1` path ✓. One shape nit (not queued): C calls `create_des_coder()` unconditionally at entry while JS numeric arms skip it — unobservable, since a fresh coder has `croom = NULL` (csym above) ≡ the JS null-croom path; real `.lua` levels always run inside a coder.
- room: nesting `panic` → throw (noreturn-equivalent; tail structure mirrors C's fall-through) ✓; align tables exact incl. `"none"/"random" → −1` ✓ (`TOP 1/BOTTOM 5` coincide with `SPLEV_TOP/BOTTOM` — C range read); x/y + w/h half-absence throws ✓; roomtype via case-insensitive match + impossible-keeping-OROOM, exactly C `get_table_roomtype_opt` ✓; `failed_room`/`tmproomlist`/`n_subroom` bookkeeping, parent-irregular marking, contents-callback-for-pcall, `spo_endroom`, `add_doors_to_room` in C order ✓. `build_room`: chance gate, subroom slot `rooms[MAXNROFROOMS+1+nsubroom−1]` post-increment (verified against `add_subroom` `:21314–21333` — stores then increments, so the read-back is the new room) ✓, topologize + needfill/needjoining, null on failure ✓.
- finalize: `fromDes ≡ L`-null arms (coder-gated flips/solidify/premap/ensure_way_out) ✓; C's own FIXME/TODO comments carried as C's ✓; `ensure_way_out` called (not deferred) ✓; `wtower` via live `In_W_tower` (call shape matches the `mon.js:2990` precedent) ✓; `makemap_prepost(false, wtower)` awaited (async adaptation) ✓; `lua_testing = false` unconditional ✓.
- helpers: `count_level_features` exact incl. `x = 1` lower bound ✓; `spo_endroom` exact incl. `xsize/ysize ≤ 1` reset ✓; `splev_opt_int/index/boolean` match the nhlua getters (nil→defval is the `_opt` wrapper, csym-verified; exact string match; boolean/0/1/else-throw) ✓.

## Hallucinations / overclaim

None. D-log discloses the Lua-bridge, `wiz_load_splua`, and inline-expansion omissions; the two /tmp-smoke misses are owned as harness artifacts.

## Density

Breadth phase: four whole C functions (45+44+90+52 L) + 7 helpers, one module, one C file — a same-file cluster with every callee live or in-commit. Within the raised ceiling, right-sized.

## Verification

Re-measured per-SHA re-runs (`--base f1fce922~1 --reach-all`, all four):

```text
smoke lspo_drawbridge: no RNG-tagged reach; fixed smoke spread (24 run, 3.6s): 24 PASS, 0 regressed → REACH-OK
reach lspo_gold: 12 baseline-PASS session(s) reach it (12 run, 6.4s): 12 PASS, 0 regressed → REACH-OK
smoke lspo_room: no RNG-tagged reach; fixed smoke spread (24 run, 3.7s): 24 PASS, 0 regressed → REACH-OK
smoke lspo_finalize_level: no RNG-tagged reach; fixed smoke spread (24 run, 3.8s): 24 PASS, 0 regressed → REACH-OK
```

Gold's 12-session reach (real baseline-PASS sessions, all still PASS) is stronger than smoke and matches the D-log. No REGRESSED anywhere. Diff grep: no FORCE/DIAG/seed/fastforward/coords. Rulecheck clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
