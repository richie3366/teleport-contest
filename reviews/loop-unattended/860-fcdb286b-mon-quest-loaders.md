# Review 860 — fcdb286b — mkmaze.c makemaz Mon quest 5/5 (D-1890)

Metadata: SHA `fcdb286b`, D-1890. Files: `js/mklev.js` (+583/−1: 5
loaders + 5 dispatch arms). Next index 860.

Intent vs deliverable: subject promises Mon-strt/-loca/-goal/-fila/-filb
(Monk 0/5 → 5/5; 402 lua lines). The diff delivers all five +
dispatch. Only the 5 loaders are new — `splev_des_room`,
`splev_room_monster`, `selection_all_room_floors`, `make_engr_at`,
`makecorridors` are all pre-existing LIVE helpers. No new module
edges.

Inventory: file-local `load_mon_strt/loca/goal/fila/filb`.

**C ↔ JS fidelity** (confirm — deepest checks this series needed):

- Strt (Pri-strt skeleton): STONE solidfill + triple flags; temple
  (24,6,33,13) lit=1 with NO `filled` key → `needfill = 0` ✓
  (`lspo_region` assigns the raw value, default 0, `sp_lev.c:5600` —
  this commit states the rule correctly; contrasts Pri filled=2 →
  FILL_LVFLAGS). Forest replace strips chance 10; `floodfill(05,04)`
  BEFORE `des.terrain` in both lua and JS ✓ (flood matches the
  under-typ, then set). Down stair (52,09); 18 doors in lua order;
  noalign altar (28,09); Grand Master (28,10) + robe +6 + 8 abbots via
  the accepted Bar-strt idiom (`find_montype_gender` +
  `induced_align(80)` + `makemon` + discard + give — C draws
  `induced_align(80)` for every RANDOM-amask monster,
  `sp_amask_to_amask`, `sp_lev.c:1917`, and JS `sp_amask_to_amask`
  does the same, so BOTH spawn idioms keep RNG parity); rect
  nondiggable (18,3,55,16, not whole-map); 2 dart rndcoord + 4 random
  traps; 8 earth elementals + 4 xorns rndcoord; tin quan-2 spinach
  (random BUC verified: C `get_table_buc` defaults "random"→0→
  keep-mkobj, `sp_lev.c:3449/2232`; JS `create_object` mirrors the
  switch) + ration quan-4 at map-relative coords; pre-flip branch
  cell (5,4).
- Loca: solidfill-STONE, mazelevel only, 76×21 winding-cave map,
  whole-map lit, random up/down stairs, whole-map nondiggable, 15
  objects, tinloc vignette — `selection.negate()` with no args ≡
  all-cells-set (`nhlsel.c:265–268`) + `filter_mapchar('.')`; JS
  `selection_all_room_floors` filters typ ROOM, which coincides with
  '.' on this roomless maze level (no CORR cells) — equivalent here
  by construction, and the helper cites the rule. `rndcoord(0)` ≡
  `(..., false)`; blessed spinach tin + BURN Elbereth engraving at
  the absolute tinloc (map-relative x/y into `l_create_object`,
  absolute into `make_engr_at` — soko idiom) ✓. 6 traps; 14
  elementals + 9 xorns default (undefined ≡ C BOOL_RANDOM →
  `peace_minded`, moot for these) ✓.
- Goal: mines-only init (solidfill commented out ✓), lava mines
  fg="L" bg=".", Pri-goal-identical 26×11 map, `place`
  {{14,04},{13,07}} with the accepted Pri-goal `rn2(2)` pick (lua
  `math.random` treatment is series-settled), unlit rect (lava stays
  lit via shared `light_region`), up stair (20,05), blessed +0 Eyes
  lenses (no oerodeproof — no eroded key ✓), 14 objects, 4 placed
  fire + 2 random traps, Kaen + noalign altar on the pick, 9 + 9
  monsters ✓.
- Fila/filb: six ordinary `des.room` + contents callbacks in lua
  order (stairs/objects/traps/E-X-0 vs default-named monsters
  matching lua's explicit-vs-default peaceful keys) +
  `random_corridors` → `makecorridors` ✓.
- Maps content-identical, same dims/centering (76/76/26 → xstart
  3/3/27). The lua-coord convention verified at the C source:
  explicit coords get `+= xstart/ystart` (`get_location`,
  `sp_lev.c:1224`).
- Named omits (humidity, ensure_way_out, m_dowear, and now
  explicitly the flip-level lregion coord update) all carried with C
  cites — the flip question is tracked debt as of this commit.

Hallucinations / overclaim: none — vacuous verify stated explicitly.

Density: 5 loaders, one quest family — coherent.

Verification: D-log `verify.mjs --fn makemaz` → PASS (syntax, rule2,
green 2/2, strict, cohort 7/7, full 44/44 auto) + map probe (which
caught and fixed a drafted leading-`|` on loca row 20). Re-measured
myself: `hidden-proxy.mjs verify makemaz --base fcdb286b~1` → 0
blocked at baseline and HEAD → vacuous, shipped on public gates per
the proxy instruction. No banned patterns.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
