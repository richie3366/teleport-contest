# Review 865 — 1cc129db — mkmaze.c makemaz tut-2 load_special (D-1895)

Metadata: SHA `1cc129db`, D-1895. Files: `js/mklev.js` (+89/−1:
`load_tut2` + dispatch arm + doc-list line). Next index 865.

Intent vs deliverable: subject promises the missing tutorial-dlevel-2
loader completing the tut-1/tut-2 pair. The diff delivers one new
function, one dispatch arm, one doc word; no new imports, no RNG
touch. Promise ≡ diff.

Inventory: `load_tut2` (new, file-local). All callees are
same-module LIVE helpers (`nhlib_shuffle_align`, `splev_initlev`,
`mapfrag_fromstr`, `splev_map_center_start`, `sel_set_ter`,
`l_create_stairway`, `cmd_from_ecname`, `make_engr_at`, `maketrap`,
`mktrap_seen_victim`, `fixup_special`); nothing deleted or
re-pointed, so no `sym.mjs` re-point output is owed.

**C ↔ JS fidelity** (line-by-line against `dat/tut-2.lua`, all 27
lines, via `mkmaze.c makemaz :1127–1223` → `load_special`): L2
solidfill/`fg=' '` → `splev_initlev` SOLIDFILL/STONE ✓; L3–4 flags →
`is_maze_lev`/`nomongen`/`deathdrops=false`/`noautosearch`, and
`noflip` → skip flip, matching `load_tut1`'s own tail
(`fixup_special()` with no flip call — verified both bodies) ✓;
L6–15 14×8 map → byte-identical `TUT2_MAP` via centered
`sel_set_ter` loop (same block shape as tut-1) ✓; L18
`area(01,01,73,16)` lit → clamped light loop, identical to tut-1's ✓;
L20 up stair at (2,2) → `l_create_stairway(1, 2, 2, null, false)` —
the helper adds `game.splev_xstart/ystart` itself
(`js/mklev.js:19269`, `x = mx + rx`), and the call runs after the
splev extents are stored, so (2,2) lands map-relative-correct like the
hand-offset engraving/trap lines ✓; L22 burn engraving → exact text
``Use '${up}' to go up the stairs`` with `cmd_from_ecname('up')`,
BURN, `nowipeout` (degrade=false) ✓; L25 seen magic portal at (11,5)
→ `maketrap` + `mktrap_seen_victim({seen:true})` ✓; L27
non_diggable → whole-map loop identical to tut-1's ✓; tail
`fixup_special()` with no flip ✓. `wallify`/`map_cleanup`/
`count_level_features` stay deferred — correct, since tut-2.lua
contains no such calls (unlike the Cav lua files in review 863) and
tut-1 defers the same cluster boundary.

Hallucinations / overclaim: none. The "packed up stair" phrasing is
loose (the call is coordinate-form like the other 5 call sites) but
the coordinates are right, which is what matters.

Density: 89 insertions, one loader in one family — right-sized.

Verification: D-log `verify.mjs --fn makemaz` → full 44/44 (auto on
the shared file) with the vacuous-hidden note stated, not hidden.
Re-measured myself: `hidden-proxy.mjs verify makemaz --base
1cc129db~1` → `0 session(s) blocked (0 at baseline, 0 in the working
scoreboard)` — vacuous as claimed; the queue row cited no blocks
(HELDOUT Tier B content row), so public gates carry it. No banned
patterns in the diff.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
