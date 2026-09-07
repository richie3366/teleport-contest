# Review 976 — c9f485f3 — themeroom Massacre/Statuary/Buried-treasure fills (D-2006)

Metadata: SHA `c9f485f3`, D-2006, Open-row port (reservoir picked
the fills, JS ran nothing; 4 sessions diverging at step 0).
js/ touches 1 file (`js/mklev.js`, +122: three fill bodies +
`make_dig_engraving_postprocess` + runner arm + BODIES +3).
`c-js-map/data.md` row retired. No stamp owed.

## Intent vs deliverable

Subject promises: `themeroom_fill_massacre` (27-name pool, C-order
draws, nhlib `d` semantics, `percent(10)` re-pick, corpses via live
`l_create_object`), `themeroom_fill_statuary`, buried-treasure
chest with in-callback bury before `d(3,4)` inner draws, and the
dig-engraving postprocess. Diff actually adds: exactly that, plus
two same-edge binding extensions (`is_organic`, `ROT_ORGANIC`).
Promise == diff.

## Inventory

- New JS functions: the three fills + `make_dig_engraving_postprocess`.
- No new clones: trap placement reuses same-file DRY
  `get_location_coord_in_room` + `splev_mktrap_at` (both
  pre-existing locals, not re-cloned); engraving via live
  `make_engr_at` (`engrave.js:550`); corpses/chest/inner objects
  via live `l_create_object`.
- No deleted symbols, no new module edges — no `sym.mjs` delete
  audit required.

## C ↔ JS fidelity

Lua loci read verbatim (`nethack-c/upstream/dat/themerms.lua`,
`nhlib.lua`; sp_lev.c/dig.c for the bury order):

- Massacre (`:173–190`): 27-name pool in exact lua order
  (apprentice…archeologist — verified line-for-line). ✓
  `math.random(#mon)` → `lua_random2(1, 27) - 1`; `d(5,5)` →
  five `lua_random2(1, 5)` (nhlib `:29–39`: 2-arg form sums per-die
  `math.random(1, faces)` — the D-log's "nhlib d, not rnd.c d()"
  is correct and load-bearing). ✓ `percent(10)` = lua
  `math.random(0, 99) < 10` → JS `rn2(100) < 10`: one draw, same
  threshold (stylistically `rn2` rather than `lua_random2(0,99)`,
  mathematically identical). ✓ Re-pick inside the loop, corpse via
  `des.object`⇔`l_create_object` DRY. ✓
- Statuary (`:192–200`): `d(5,5)` statues + `d(3)` traps; nhlib
  1-arg form = single `math.random(1, dice)` → JS single
  `lua_random2(1, 3)`. ✓ The 5-draw vs 1-draw asymmetry mirrors
  the lua exactly.
- Buried treasure (`:134–148`): draw order verified against
  sp_lev.c — `create_object` runs the buried arm (`:2428–2437`
  `bury_an_obj`, possibly nulling otmp) BEFORE the lua contents
  callback is invoked (`:3743` pcall, container still pushed until
  `:3747` pop). JS buries inside the callback before `d(3,4)` —
  same draw order by construction. ✓ Rot arm matches dig.c
  `:2031–2045` (`obj_resists(0,0)` gate, extract, wooden
  `is_organic` + `obj_resists(5,95)` + `250+rnd(250)`
  ROT_ORGANIC, `add_to_buried`); `obj_resists` burns its `rn2(100)`
  even when returning false on both sides (`zap.c:1457–1473` vs
  dogmove.js:109, D-0864). ✓ Inner `d(3,4)` → three
  `lua_random2(1,4)`; inner empties still created on the
  NULL-container path (C `:2331–2339` frees them but every mkobj
  draw burns — JS keeps the `l_create_object({})` calls). ✓
  Engraving guard (`xobj.NO_OBJ == nil` ⇔ `if (chest)`) and
  chest-ox/oy coords match.
- Engraving (`:1052–1070`): negate→filter `"."` (pre-existing
  `selection_all_room_floors`), `rndcoord(0)`⇔`rndcoord(false)`,
  `tx = data.x - pos.x - 1` (-1 mirrored), ty, `" here"` /
  `" N east … south"` word order, `make_engr_at(x, y, text, null,
  0, BURN)` (pristine defaults to text, no `rnd` draw since
  BURN > 0). ✓
- Callee closure: every new call resolves to a live import or a
  reused same-file DRY; the two binding extensions ride existing
  edges. Note: C `create_trap` with croom takes the
  `get_free_room_loc` single-pick path (`sp_lev.c:1811–1846`) —
  the D-log's "stairs/ladder retry" remark describes the no-croom
  branch, slightly off-frame but behaviorally moot (no stairs at
  fill time either way). Observation only.
- Standing-convention note (not this SHA's debt): all lua fills
  route `math.random` through game-stream `lua_random2`
  (`lo + rn2(hi-lo+1)`, 56 uses file-wide, predating this SHA);
  C's lua instead uses Lua's built-in xoshiro (nhlua.c:2946
  comment, no `randomseed` anywhere). This SHA conforms to the
  file convention; relitigating the convention belongs to a
  dedicated iteration with the recorder-build facts, not to this
  delta — and the corpus result below shows the fills reproducing
  C step-for-step on real sessions.

## Hallucinations / overclaim

None material. One precision note: my re-run lands
poly-Caveman-91133 on `polyself@67` where the D-log cites
`polymon@58` — both strictly past step 0 with different owners,
and the working tree contains the later D-2007 polymon-tip port
(a poly session), which accounts for the shifted landing. Shape
(2 PASS / 2 moved / 0 worse → PROGRESS) reproduces exactly.

## Density

122 insertions for three fills + one postprocess in one lua-file
family. Right-sized.

## Verification

Re-measured myself: `hidden-proxy verify somex --base c9f485f3~1`
→ `2 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS`
(92025 + 92069 PASS; 91133 and 92038 off step 0 to steps 67/96).
Plus cited green 2/2 + strict ×2, cohort 7/7, full 44/44 (shared
file changed — full run claimed and the fortress score below
re-confirms). Grep of the js hunk: no `FORCE`/`DIAG`/`getRngLog`/
seed/coordinate/`fastforward`. Rule #2 clean (re-ran this
iteration).

## Actionable C-wrongs

None in this delta.

Verdict: **ACCEPT**
