# Review 1672 — 0b705b5f — `sp_lev.c` wall_property + level_flags + engraving (D-2713)

Metadata: commit `0b705b5f`, D-2713, `js/mklev.js` +186/−1 (tables, local `set_wall_property`, 3 exported entries; `ENGR_BLOOD` + `MARK as ENGRAVE_MARK` on the existing const edge). Pops head Open row (wall_property MISSING) + 2 same-C-file rows (level_flags, engraving MISSING). No prior review claimed closed.

## Intent vs deliverable

Subject promises: three whole-body des entries in unpacked-opts form. Diff ships all three in C order with per-arm cites. Promise matches deliverable.

## Inventory

New JS: `LSPO_WPROPS/2I`, `set_wall_property` (file-local), `lspo_wall_property`, `lspo_level_flags`, `LSPO_ENGRTYPES/2I`, `lspo_engraving`. Nothing deleted or re-pointed.

## Callee closure

Required `sym.mjs` outputs pasted verbatim (all additions):

```text
lspo_wall_property js/mklev.js:3808   sync
lspo_level_flags js/mklev.js:18848   sync
lspo_engraving   js/mklev.js:1287   sync
```

Remaining callees verified live: `splev_opt_index`, `splev_feature_boolopt` (D-2712 raw-index semantics, reused), `get_coord_unpacked`, `get_table_xy_or_coord`, `get_location`, `get_location_coord`, `get_table_region_unpacked`, `sel_set_wall_property`, `create_des_coder`, `make_engr_at` (`engrave.js:588` `(x,y,text,pristine,e_time,e_type)` — call passes `(x,y,txt,null,0,etyp)` ✓), `engr_at`, `isok`. Const values verified C-vs-JS: `MARK 4` (`engrave.h:29` ≡ `const.js:1133`, aliased `ENGRAVE_MARK` at the mklev import `:68`), `ENGR_BLOOD 5` (`const.js:1134`). No STUB in any arm; no new module edge.

## C ↔ JS fidelity

C loci (csym, whole bodies read): `lspo_wall_property` `:5875–5908`, `set_wall_property` `:1000–1013`, `lspo_level_flags` `:3758–3831` (74 L), `lspo_engraving` `:3880–3936` (57 L), `get_table_coords_or_region` `:5560–5577`. RNG: none on these paths.

- wall_property: `set_wall_property` exact (clamp x 1..COLNO−1 / y 0..ROWNO−1, y-outer loop into `sel_set_wall_property`) ✓. Entry: create ✓; no-arg ≡ `{}` / non-table throws (lcheck) ✓; x1..y2 `−1` defaults ✓; region consulted only when all four are `−1` (csym-verified) with required region ✓; property default `nondiggable` ✓; unset ends → `xs−1/ys−1/xs+xsz+1/ys+ysz+1` with `1/0/COLNO−1/ROWNO` defaults matching `reset_xystart_size` (`mklev.js:1962–1967`, read) ✓; both corners through `get_location` ANY_LOC ✓.
- level_flags: rest-args ≡ Lua stack, empty/non-string/unknown throw ✓; all 26 strcmpi arms in C order via one lowercase compare ✓; int targets follow the file's boolean convention (`= true` / temperature `0/1/−1` / `rndmongen=false`/`deathdrops=false` — readers use truthiness, e.g. `!flags.corrmaze` across mklev; `icedpools` is a module `let` boolean, `= true` established) ✓; `noflipx/noflipy` bit-clear, `noflip = 0` ✓; coder arms post-create ✓. Sokoban writes the triple (`sokoban_rules` + `sokoban` + `game.Sokoban`) — a superset of C's global, mirroring the soko loaders (disclosed).
- engraving: DUST default; table form (required-text throw, `degrade`/`guardobjects` via raw-index boolopt with nil→default then `!== 0` — `"false"→1→true`, exactly C's `boolean = index` assignment) / 3-arity (`get_coord_unpacked` + required-text) / else Wrong-parameters ✓; post-dispatch coder croom ✓; `make_engr_at(x,y,txt,NULL,0,etyp)` arg order verified ✓; unconditional `guardobjects`/`nowipeout = !wipeout` tail with C `boolean→0/1` spelled out ✓.

## Hallucinations / overclaim

None. The commit message's own `Named:` line and the D-log's omissions (get_coord fatal collapse, `|0` int collapse, `&0xff` wrap skip) are stated, not hidden.

## Density

Breadth phase: three whole C entries (34+74+57 L) + one staticfn, one module, one C file. Within the raised ceiling, right-sized.

## Verification

Re-measured per-SHA re-runs (`--base 0b705b5f~1 --reach-all`, all three):

```text
smoke lspo_wall_property: no RNG-tagged reach; fixed smoke spread (24 run, 3.4s): 24 PASS, 0 regressed → REACH-OK
smoke lspo_level_flags: no RNG-tagged reach; fixed smoke spread (24 run, 3.5s): 24 PASS, 0 regressed → REACH-OK
smoke lspo_engraving: no RNG-tagged reach; fixed smoke spread (24 run, 3.6s): 24 PASS, 0 regressed → REACH-OK
```

All 0-blocked vacuous + REACH-OK, no REGRESSED — as disclosed. Diff grep: no FORCE/DIAG/seed/fastforward/coords. Rulecheck clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
