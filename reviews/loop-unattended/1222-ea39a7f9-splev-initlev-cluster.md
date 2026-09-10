# Review 1222 — ea39a7f9 — splev_initlev cluster (D-2256)

Metadata: SHA `ea39a7f9` (D-2256). Queue row `sp_lev.c` splev_initlev,
3 sessions in traces (not as owner). js/mklev.js +215/−287.

## Intent vs deliverable

Subject promises `lspo_level_init` table defaults,
`splev_init_present`/`icedpools` statics, MINES `linit->icedpools`,
`sel_set_ter` ICE/CLOUD. Diff adds those plus `sp_level_coder_init_statics`
at `load_special_proto`/`clear_level_structures`, retargets all 149
loaders from `splev_initlev` to `lspo_level_init` (drops 127
`icedpools:` literals), MAZEGRID `maze_x_max()`, and the ICE/CLOUD
arms. Promise kept.

## Inventory

New: `lspo_level_init`, `sp_level_coder_init_statics`, module statics.
Changed: `splev_initlev` MINES/MAZE/MAZEGRID, `sel_set_ter`. `sym.mjs`:

```text
lspo_level_init  NOT EXPORTED — 1 LOCAL js/mklev.js:17832
splev_initlev    NOT EXPORTED — 1 LOCAL js/mklev.js:17856
sel_set_ter      NOT EXPORTED — 1 LOCAL js/mklev.js:25053
del_engr_at      js/engrave.js:150   sync
maze_x_max       NOT EXPORTED — 1 LOCAL js/mklev.js:17913
create_maze      NOT EXPORTED — 1 LOCAL js/mklev.js:18109
makeroguerooms   js/extralev.js:234   sync
mkmap            js/mkmap.js:339   ASYNC
lvlfill_solid    NOT EXPORTED — 1 LOCAL js/mklev.js:17608
```

`--can mklev.js engrave.js del_engr_at` ALREADY. Only remaining
`splev_initlev(` is the callee of `lspo_level_init`.

Callee closure — `lspo_level_init` (`sp_lev.c:3835–3875`):
`create_des_coder` analogue = load-start reset (C is a no-op if coder
exists, `:6443–6448`); table defaults LIVE (inlined); `splev_initlev`
LIVE; `gc.coder->lvl_is_joined` OMIT (named; write-only in pinned C).

`splev_initlev` (`:2981–3018`): SOLIDFILL `rn2`+`lvlfill_solid` LIVE;
MAZEGRID `lvlfill_maze_grid` LIVE; MAZE `create_maze` LIVE; ROGUE
`makeroguerooms` LIVE; MINES `rn2`+fill+`icedpools` assign+`mkmap`
LIVE; SWAMP `rn2`+`lvlfill_swamp` LIVE. `sel_set_ter` ICE/CLOUD:
`del_engr_at` LIVE. `set_levltyp_lit` FALSE-return OMIT (named,
pre-existing write-unconditional).

## C ↔ JS fidelity

- Defaults vs `:3853–3865`: style SOLIDFILL, fg ROOM, bg
  INVALID_TYPE, smoothed/joined/walled false, lit BOOL_RANDOM,
  filling = fg, corrwid/wallthick −1, `rm_deadends =
  !deadends(TRUE)` → `tbl.rm_deadends ?? false`. C.
- bg INVALID_TYPE → MOAT iff SWAMP else STONE (`:3868–3869`). C.
- `splev_init_present = true` before the call (`:3851`). C.
- MINES `:3009` `linit.icedpools = icedpools` (the `:192` static,
  not a loader literal). C. Five Val loaders set `icedpools = true`
  where lua `level_flags("icedpools")` is (`:3788–3789`), after
  solidfill and before map `sel_set_ter`.
- Reset vs `:6350–6351` at coder init; JS at proto load and
  `clear_level_structures` (fresh coder per level). C
  `create_des_coder` does not re-reset on a second `level_init` in
  the same proto (hellfill solidfill then mines); JS matches.
- MAZEGRID uses `maze_x_max()`/`maze_y_max()` (`gx.x_maze_max`). C.
- `sel_set_ter` `:4625–4628`: ICE after init → `ICED_POOL` iff
  icedpools else `ICED_MOAT`; CLOUD → `del_engr_at`. C. RNG: none
  in this cluster; `icedpool` is later `melt_ice` only.
- Pre-existing `tlit` falsy→nochange (D-0807/D-0928) named.

## Hallucinations / overclaim

None. Hidden is labeled not a corpus PASS (trace reach). Dispatch
callees are LIVE or named OMIT, not stubs.

## Density

+215/−287 is mostly 149 call-site retargets and −127 dead literals.
New C is ~60 lines of init+statics+two ter arms. One cluster. In-band.

## Verification

Audit re-ran the corpus claim itself:

```text
verify splev_initlev: baseline ea39a7f9~1 — 0 session(s) blocked
on it (0 at baseline, 0 in the working scoreboard)
```

Vacuous-0-confirmed as owner (row was trace reach). Green 2/2 +
strict ×2 + cohort 7/7 + full 44/44 pasted. Diff grep: no
FORCE/DIAG/seed/coordinates/fs. Rule #2 clean (repo-wide).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
