# Review 831 — 5e4b0423 — themerms.lua Garden fill (D-1861)

Metadata: SHA `5e4b0423`, D-1861, `js/mklev.js` (3 functions + dispatch) +
`js/detect.js` (+3: sdoor clear). Queue: popped induced_align, refilled 5 from
`hidden-proxy queue` (mkswamp/mgc_negated/dopush/zoo_mon_sound/minimal_xname) —
legitimate, band kept.

## Intent vs deliverable

Subject promises Garden fill + fountain + garden-walls postprocess + dispatch
registration + sdoor uncover clear. Diff delivers exactly that. Matches.

## Inventory

New: `themeroom_fill_garden`, `themeroom_garden_fountain`,
`make_garden_walls_postprocess`, 1 dispatch arm, 1 postprocess arm, sdoor clear.
No deleted/re-pointed symbols.

## C ↔ JS fidelity

Loci: `dat/themerms.lua:117–130` (contents), `themerms.lua:1072–1078` (walls),
`sp_lev.c:4633–4643 sel_set_feature`, `sp_lev.c:4844–4896 lspo_feature`,
`sp_lev.c:5051+ lspo_replace_terrain`, `mkmaze.c:82–88` garden hack,
`detect.c:1589–1603 cvt_sdoor_to_door`, `rm.h:224`. All read. Confirm:

- Fill: lua `numpoints/6` float loop = floor for positive; JS `(n/6)|0` matches.
  `des.monster(asleep=true)` → `splev_room_monster` + `msleeping=1` (established
  helper; the induced_align `rn2(3)` first-diff is empirically closed — session
  now PASS). `percent(30)` fountain per nymph; fresh `selection_from_mkroom`
  queued, mirroring lua's two `selection.room()` calls.
- Fountain: string-form `des.feature("fountain")` → `SP_COORD_PACK_RANDOM(0)` +
  DRY → `get_location_coord` → `sel_set_feature` (isok + IS_FURNITURE guard,
  typ only, no recount). JS mirrors all four facts, including the notable
  no-`nfountains`-bump (C recount lives in `set_levltyp`, not this path).
- Walls: lua issues two `replace_terrain` passes (walls→TREE, S→A). C burns
  `rn2(100)` per *matched* cell per pass (`sp_lev.c:5127–5133`, x-outer/y-inner).
  JS `lspo_replace_terrain_sel` is RNG-identical for pass 1 (same order,
  `match && rn2(100)<chance`); the SDOOR loop burns exactly one `rn2(100)` per
  SDOOR cell in the same order — `rn2(100)<100` is an always-true burn, ugly
  but C-faithful. SDOOR→AIR keeps typ + sets the flag via the `mkmaze.c:82`
  hack; JS writes both `arboreal_sdoor` and `candig` (one C bit per `rm.h:224`,
  two JS props) and `cvt_sdoor_to_door` clears both, matching C
  `detect.c:1601` (`arboreal_sdoor = 0 /* clears candig */`).
- `selection_grow(sel)` defaults to all-directions = lua `:grow()`. Named omits
  (Buried treasure/Massacre/Statuary, induced_align-clone drift) in map. No
  STUB in a live arm; no FORCE/DIAG/seed/RNG-log hits.

## Hallucinations / overclaim

None. First-diff chain (`induced_align → somex → … → m_initinv S_NYMPH`) is a
real C call path, and the fix restores its head draw.

## Density

One themeroom family, ~70 lines across two already-coupled modules. Right-sized.

## Verification

D-log: syntax, rule2, hidden 1 PASS, green, strict ×2, cohort 7/7, full 44/44.
Re-ran `hidden-proxy.mjs verify induced_align --base 5e4b0423~1` myself:
`1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
(ind-Monk-146641968-c5e5ab94: PASS). Claim true.

## Actionable C-wrongs

None found.

Verdict: **ACCEPT**
