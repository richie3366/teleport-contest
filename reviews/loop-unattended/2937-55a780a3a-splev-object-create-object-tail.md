# Review 2937 — 55a780a3a — des.object stand-ins route through lspo_object/create_object

- SHA: `55a780a3a` (cliff, writer behind `dog_invent` ×3 /
  `readobjnam_postparse1` / owner-null Priest)
- D-entry: D-4096; Ledger: sp_lev.c (`create_object` split, D-4096)
- `js/` diff: `js/mklev.js` +13/−15 (two stand-in bodies)

## Intent vs deliverable

Promise: the hand-rolled loaders' `des.object()` stand-ins,
`splev_create_object` (137 sites) and `splev_room_object` (98 sites),
called `mkobj_at` + `stackobj`. That skipped create_object's tail,
which resets erosion, erodeproof and grease. So special-level objects
kept mkobj_erosions' random damage («cracked crystal plate mail»).
Diff: both stand-ins now call the existing `l_create_object` (the
lspo_object port). The empty-table arm is used for a null class, and the
one-letter string arm (`def_oc_syms[oclass].sym`) for a class constant.
Promise = diff.

## Inventory

- `splev_create_object` — mklev.js:22150–22153; C lspo_object
  sp_lev.c:3556–3755 → create_object :2192–2440.
- `splev_room_object` — mklev.js:24266–24270; same C, with
  `coder->croom`.
- Callees: `l_create_object(o, contentsFn, croom)` (mklev.js:23486,
  exported). `lspo_object_from_string(paramstr, arg2, arg3)` maps a room
  object in arg2 (`lx/ly/hx`) to croom. `create_object` (mklev.js:22712).
  All LIVE.
- Call-site census (grep of mklev.js): `splev_room_object(r)` ×98,
  `splev_create_object(null)` ×62, and class constants GEM ×13, WAND,
  SCROLL, RING, FOOD ×9 each, POTION ×8, SPBOOK ×6, TOOL ×5, WEAPON ×3,
  ARMOR ×2, ROCK ×1. Each of these classes has a one-char
  `def_oc_syms` symbol, so the letter arm always gets a 1-length string,
  as C's `strlen(paramstr) == 1` requires. No call site passes
  RANDOM_CLASS or COIN_CLASS.

## C ↔ JS fidelity

```c
if (argc == 1 && lua_type(L, 1) == LUA_TSTRING) { …
    if (strlen(paramstr) == 1) { tmpobj.class = *paramstr; tmpobj.id = STRANGE_OBJECT; }
…
get_location_coord(&x, &y, DRY, croom, o->coord);
if (!c) otmp = mkobj_at(RANDOM_CLASS, x, y, !named);
else if (o->id != -1) …
else { oclass = def_char_to_objclass(c); … otmp = mkobj_at(oclass, x, y, !named); }
```

- **Letter arm.** class = char, id STRANGE_OBJECT → l_create_object
  sets id −1 (:3663–3667) → create_object takes the
  `def_char_to_objclass` arm → `mkobj_at(oclass, …, TRUE)`. These are
  the same draws as the old direct `mkobj_at(oclass, …, true)`.
- **Empty table.** class −1 → c = 0 → `mkobj_at(RANDOM_CLASS, …)`, the
  same as before.
- **Location.** C's random arm `get_location_coord(DRY, croom, -1/-1)`
  replaces `get_location_random()` and `get_location_coord_in_room`.
  This is the same DRY loop. The old room variant returned early on
  `pos.x < 0`, but C has no such return, so the change is toward C.
- **Tail.** spe −127 means no change. curse_state 0 means no draw.
  `eroded` 0 means `oeroded = oeroded2 = oerodeproof = 0` (:2273–2283).
  `greased` 0 (:2296). `stackobj` for !SP_OBJ_CONTENT (:2422). This tail
  is what the commit is after, and it draws no RNG.
- `quancnt` is 0 because id is not a real otyp, so the do/while runs
  once.

Minor: `lspo_object_from_string` does not set C's `tmpobj.tknown = -1`
(:3591). This predates the commit, and only trapped containers named by
otyp read it, which none of these default records are. Noted only.

## Hallucinations / overclaim

None. «same signatures, all now reach create_object via
l_create_object» is true. The `(sym, croom)` / `({}, null, croom)`
asymmetry looks wrong at first sight, but it is correct because of the
string arm's arg2-room detection.

## Density

Two stand-ins replaced by calls to the whole port: two clones removed,
none added. The Ledger `create_object` split lists both.

## Verification

```text
verify dog_invent (--base 55a780a3a~1): 3 blocked → 3 PASS
  (sweep-Samurai-51450041, sweep-Valkyrie-50055061, sweep-Valkyrie-50456039)
verify readobjnam_postparse1: 2 blocked
  scen-symset-Archeologist-50058510: PASS
  scen-trek-Monk-50850075: still at step 319 (named «another shape»)
verify create_object: 0 blocked (vacuous)
show scen-sweep-Priest-50150089: passed true
```

Five sessions flip, as the D-log says. The change affects 235
level-gen sites, so the audit's full rescore below is the real
regression check for this SHA. See the CURRENT fortress line for
PASS→FAIL.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
