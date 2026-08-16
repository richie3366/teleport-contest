# Review 25 — dc354c44 — tut-1 `levregion_add` / TELE dest copy (D-1064)

## Metadata
- Full / short hash: `dc354c44ba746e56acf390ba54335393b0874f97` / `dc354c44`
- Parent: `3f376b74` (D-1063 ACCEPT this review iter; Must-fix empty; popped Open tut-1 `place_lregion`)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 05:58:43 +0200
- D-id: **D-1064**
- Stats: 10 files, +292 / −65 — `js/mklev.js` +188 (`get_location`, `levregion_add`, `l_teleport_region`, leftover `fixup_special`, `load_tut1` call + epilogue)
- Claims to close: Open queue tut-1 `place_lregion` only (not key / nhcore). Stamped **Addressed:** D-1064 on the archive row **without** the short hash (chicken-egg). This review commit fills `dc354c44`.
- JS / map: `mklev.js` `levregion_add` / `fixup_special` / `load_tut1`; `c-js-map/startup.md` names tut_key / nhcore / leftover `obfree`. Cadence still **#1340** **44**/44.
- JS-touching since last `reviews/loop-unattended/` file: `3f376b74` (review 24) and this SHA.

## Intent vs deliverable

Git subject promises: “Match C levregion_add so tut-1 teleport_region dests use ANY_LOC get_location and omit-exclude -1.” Body: `load_tut1` copied `updest`/`dndest` with exclude `0,0,0,0`; C `levregion_add` then `fixup_special` dest copy; `place_lregion` runs from `goto_level` `u_on_rndspot`, not at load.

C `sp_lev.c:5371–5402` is `levregion_add`: `get_location(..., ANY_LOC, NULL)` unless `in_islev` / `del_islev`, then append `gl.lregions`. C `sp_lev.c:5410–5436` is `l_get_lregion`: omitted exclude stays `-1,-1,-1,-1` and forces `del_islev` so `-1` is not random. C `sp_lev.c:5443–5459` is `lspo_teleport_region`: default dir `"both"` → `LR_TELE`. C `mkmaze.c:570–646` leftover switch copies TELE dests only (`place_lregion` comment: from `goto_level`). C `dungeon.c:1605–1634` `u_on_rndspot` calls `place_lregion` with those dests. C `dat/tut-1.lua:59` is `des.teleport_region({ region = { 9,3, 9,3 } })` (no exclude, no dir).

The queue line was tut-1 `place_lregion`. The diff ships unpacked `l_teleport_region` + `levregion_add` + packed `get_location` ANY_LOC, retargets the tut-1 call, and teaches shared `fixup_special` the leftover TELE dest copy (C `load_special` epilogue). `place_lregion` / `u_on_rndspot` were already C-shaped; this SHA changes **what dests they receive**.

It does **not** add Lua argc parse. Named. It does **not** rewire earth/fire/air/hell `load_*` that still push/drain lregions by hand. Named. It does **not** port tut-1 `tut_key` / nhcore disable. Those remain Open. It does **not** move C `setup_waterlevel` into the start of shared `fixup_special`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `levregion_add` | C function, new JS | `sp_lev.c:5371–5402`; mutates in/del then `game.lregions.push` |
| `l_teleport_region` | C `lspo_teleport_region` + `l_get_lregion`, unpacked | `sp_lev.c:5410–5459`; default `LR_TELE` |
| `get_location` | C function, new JS subset | `sp_lev.c:1202–1269`; packed add origin; ANY_LOC skips `!isok` clamp |
| `get_location_random` | existing helper | random arm only; **unhit** by tut-1 packed `{9,3}` |
| `fixup_special` leftover | C leftover loop, new JS | `mkmaze.c:585–636`; TELE dest copy; PORTAL/STAIR/BRANCH `place_lregion` |
| `fixup_special` branch fallback | C callee, retouched gate | C `!added_branch && Is_branchlev`; JS still also `!game.made_branch` |
| `place_lregion` | imported existing C callee | `mkmaze.c:356–410`; **not** called at tut-1 load |
| `u_on_rndspot` | existing C callee | `dungeon.c:1605–1634`; **not this SHA** |
| `find_level` | imported C callee | PORTAL name in leftover; unhit by TELE |
| `load_tut1` call + `fixup_special()` | C `load_special` site + epilogue | `tut-1.lua:59`; noflip so flip does not rewrite lregions |
| other `load_*` drain loops | pre-existing clones | empty the array **before** `fixup_special`; leftover no-op there |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names in control flow. `{9,3}` is the baked `tut-1.lua` region already used by the previous `xstart+9` copy, not a public-trace hardcode. Rule #2 clean. Frozen contracts untouched.

## Constitution / playbook

Grep of the `js/mklev.js` hunks: no trace-index gates, no `fastforward` burns. Packed region comes from the embedded map loader. Contest Rule #2: no Node builtins in scored code.

## C ↔ JS fidelity

### Packed `get_location` ANY_LOC — add origin; humidity unused; skip `!isok` clamp

C `levregion_add` (`5373–5377`) for `!in_islev`:

```
get_location(&inarea.x1, &inarea.y1, ANY_LOC, NULL);
get_location(&inarea.x2, &inarea.y2, ANY_LOC, NULL);
```

C `get_location` (`1222–1224`, `1260–1268`): if `*x >= 0`, `*x += mx; *y += my` (`mx/my` = `gx.xstart/ystart` when `croom` is NULL). Humidity is **not** consulted on this arm (`is_ok_location` is random-only). Then: if `!(ANY_LOC) && !isok` → maze-max. ANY_LOC skips that clamp.

JS packed (`mklev.js` `get_location`): `splev_map_origin()` → `splev_xstart/ystart` (tut-1 set both + `xsize` before the call). `x >= 0` → add mx/my. `!(humidity & ANY_LOC) && !isok` clamp. `l_teleport_region` passes ANY_LOC, NULL croom. Match for packed `{9,3,9,3}`.

`get_location_coord` (objects/stairs) is still a parallel packed add, not a call through this new `get_location`. C `get_location_coord` **does** call `get_location`. Two JS helpers. Packed add-origin matches on both for tut-1 (origins set). Named split, not a tut-1 dest wrong.

Random arm (`x < 0`): C `rn2(sx)/rn2(sy)` + `is_ok_location`. JS `get_location_random`. Unhit: omit-exclude forces `del_islev`, so delarea `-1` is **not** passed to `get_location`. Do not treat mixed-coord random as this Open line.

### Omit exclude — `-1` + `del_islev`, not `0,0,0,0`

C `l_get_lregion` (`5420–5435`): exclude defaults `x1=y1=x2=y2=-1`; optional table; `in_islev`/`del_islev` default false; **if `x1 < 0` then `del_islev = TRUE`** so `-1` is not a random `get_location`.

JS `l_teleport_region`: no exclude → delarea all `-1`; `if (!exclude || (exclude[0]|0) < 0) del_islev = true`. Then `levregion_add` skips `get_location` on delarea. Match.

Old JS wrote `nlx:0,nly:0,nhx:0,nhy:0`. C omit-exclude is `-1` with `del_islev`.

`within_bounded_area` (`dungeon.h:144–145`; JS `mklev.js:382–384`) is `X>=LX && X<=HX && Y>=LY && Y<=HY`. Exclude `(0,0,0,0)` contains only `(0,0)`. Exclude `(-1,-1,-1,-1)` contains only `(-1,-1)`. Tut-1 oneshot landing is origin+9,+3. **Neither exclude rejects that cell.** Hero landing on seed0009 does not newly prove the `-1` sentinel. The dest **fields** now match C for later `u_on_rndspot` / branch comments. Fair for the queue line; do not overclaim a tut-1 landing bug that `0,0,0,0` was causing.

Dir default `"both"` → `LR_TELE` (`teledirs2i`). JS `dir || 'both'` then up/down/else TELE. Copies **both** `updest` and `dndest` in leftover (`mkmaze.c:615–634`). Old JS also copied both. Match.

### Leftover `fixup_special` — dest copy, not place, at load

C leftover TELE (`mkmaze.c:611–636`): write `svu.updest` / `svd.dndest` from inarea/delarea; **no** `place_lregion` here. PORTAL/STAIR/BRANCH goto `place_it`. Then `if (!added_branch && Is_branchlev) place_lregion(0,0,0,0,...)`. Then Medusa / cleric / stronghold / baalz / ransacked. Then `free(gl.lregions); num_lregions=0`.

JS leftover: same TELE copy into `game.updest`/`game.dndest`; PORTAL/STAIR/BRANCH call `place_lregion`; then `if (!added_branch && !game.made_branch && is_branchlev())` fallback. Extra `made_branch` is the documented clone so inline-BRANCH loaders do not double-place. Tut-1 is not a branchlev path that this cohort broke (seed0009 **73**/73). Named, not a tut-1 TELE wrong.

`load_tut1` now calls `fixup_special()` at end (C `load_special` epilogue after the lua body; tut-1 `noflip` so no `flip_level` rewrite of lregions). `load_special_proto('tut-1')` returns after `load_tut1` — no second fixup. Other loaders drain `game.lregions` **then** call `fixup_special`; leftover is empty; fallback equals the previous `!made_branch && is_branchlev` test. Shared leftover is behavior-neutral there.

C `fixup_special` starts with water/air `hero_memory=0` + `setup_waterlevel()` **before** leftover. JS water/air loaders still setup+drain inline. Named. Tut-1 is not water/air.

`place_lregion` is **not** a stub. `u_on_rndspot` already called it. This SHA does not newly wire that path.

`u_on_rndspot` W-tower arm is a pre-existing clone: `if (was_in_W_tower && dndest.nlx)` instead of C `On_W_tower_level`. Omit-exclude `-1` is **truthy**, so that arm would now fire if bit 2 were set; old `nlx=0` would not. Function comment already names the W-tower path untested. Tutorial entry does not set that bit. Named omit, not this Open line.

LR_* numbers: C `dungeon.h:35–43` `LR_DOWNSTAIR=0` … `LR_TELE=4`, `LR_UPTELE=5`, `LR_DOWNTELE=6`. JS `const.js:886–892` the same increments. Default `"both"` is `LR_TELE` on both. Match.

`place_lregion` oneshot (`lx==hx && ly==hy`) is origin+9,+3 after add. C `rn1(1, lx)` is that cell; `put_lregion_here` TELE relocates a monster or `u_on_newpos`. That call is still from `u_on_rndspot`, not this SHA. `if (!lx)` whole-level default is false (lx is origin+9, not 0). Clamp `lx<1` / `ly<0` does not fire. Exclude `-1` is not the in-area.

Flip: C `load_special` tut-1 is `noflip`. JS `load_tut1` does not call `flip_level`. `flip_level`’s lregion inarea/delarea rewrite (`mklev.js:8344+`) is unhit here. Dest coords stay origin-added, not flipped.

RNG at load: packed `get_location` has no `rn2`. Leftover TELE copy has no RNG. `fixup_special` Medusa `rnd(4)` / `rn2(2)` / `rndmonnum` gates on `Is_medusa_level` — false for tutorial. Branch fallback gates on `is_branchlev` — seed0009 prefix matched, so no extra `place_lregion` `rn1` on that session. Match for this envelope.

`get_location` origin when `splev_xsize==0` falls back to `{mx:1,my:0}`. C NULL-croom uses `gx.xstart` even if size is 0. Tut-1 sets size from the mapfrag before TELE. `get_location_coord` packed uses `splev_xstart` directly (no size check). Split helper; same numbers on this loader.

C `levregion_add` realloc+memcpy the new slot (`5386–5401`). JS `push` a shallow copy of inarea/delarea/rname. TELE `rname.str` is NULL; leftover does not `free`. Named. PORTAL leftover `name[0]` digit vs `find_level`: C dereferences `r->rname.str` without a NULL check (TELE never enters that case). JS `if (name)` guards. Unhit by TELE.

C `get_table_region` for `"region"` is required (`FALSE` optional flag) as `{x1,y1,x2,y2}`. Tut-1 `{9,3,9,3}` is that order. JS `region[0..3]` as x1,y1,x2,y2. C `"exclude"` uses `TRUE` optional and leaves the `-1` defaults. JS omits the key. Match.

C `load_special` order after the lua body: maybe wallify, maybe flip, then `fixup_special`. Tut-1.lua has no wallify call in the snippet after TELE; JS `load_tut1` already applied `des.non_diggable` as a cell walk (pre-existing) and skips flip. Calling `fixup_special` at the end of `load_tut1` is the C epilogue, not a second pass from `load_special_proto`.

## Hallucinations / overclaim

“Match C levregion_add so tut-1 teleport_region dests use ANY_LOC get_location and omit-exclude -1” is **true for packed origin add, ANY_LOC skip-clamp, omitted exclude `-1`+`del_islev`, leftover TELE dest copy, and calling `fixup_special` after the tut-1 body.** It is **not** true that `place_lregion` was missing and this SHA dispatched it (it already ran from `u_on_rndspot`), that Lua argc parse exists, that every `load_*` now uses `l_teleport_region`, or that C `setup_waterlevel` moved into shared `fixup_special`. The D-log deferred list says those.

This is **not** “Match C dispatch, callee is a stub.” `levregion_add` / leftover copy are the C functions; `place_lregion` is the existing C callee used later.

Cadence **#1340** 44/44 does not newly prove exclude `-1` vs `0` on tut-1’s oneshot cell (both `within_bounded_area` misses origin+9,+3). Journal admits private dest-field checks; seed0009 already landed in this region under the old `0,0,0,0` copy.

Stamping the Open item **Addressed:** D-1064 is fair for the tut-1 TELE dest envelope. Fill hash `dc354c44` in this commit.

## Density (§2b)

One Open cluster: C’s `des.teleport_region` → `lspo_teleport_region` / `levregion_add` / ANY_LOC `get_location` / leftover TELE dest copy. Sibling leftover PORTAL/STAIR/BRANCH arms shipped with the switch (not a one-`if` peel). ~188 executable lines in `mklev.js` plus one call-site and the load epilogue. Other loaders left on their drain clones on purpose. Right size. Not “finish `sp_lev.c` lregions.” Food was the previous SHA, not this one.

## Verification

Journal: private node packed `{9,3}` → inarea origin+9,+3, delarea `-1` `del_islev`, `LR_TELE`; `region_islev` skips add; exclude gets `get_location` when not omitted. green+strict PASS; seed0009 **73**/73; cohort **12**/12 (8000/0900/0009/0030/0060/0102/0116/0360/0373/1500/1800/2200). Shared leftover is empty on drain-first loaders; they did not run the full CURRENT cohort list. Path: seed0009 tutorial prefix hits dest copy + later `u_on_rndspot`; exclude sentinel itself is public-unhit on this oneshot region.

This review iter did not re-run sessions (cadence **#1340** already refreshed Score). C read of `sp_lev.c:1202–1269` / `5371–5459`, `mkmaze.c:341–351` `bad_location` / `356–410` `place_lregion` / `570–704` `fixup_special`, `dungeon.c:1605–1634` `u_on_rndspot`, `dungeon.h:35–44` LR_* + `144–145` `within_bounded_area`, `dat/tut-1.lua:59`, JS `mklev.js` `levregion_add` / `l_teleport_region` / `get_location` / leftover `fixup_special` / `load_tut1` / existing `u_on_rndspot` is the audit. Grep of the `js/mklev.js` hunks: no `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / seed names in control flow.

## Actionable C-wrongs

None in the packed TELE dest-copy envelope this SHA shipped.

Named omits (map, not queue): tut-1 `tut_key` / eckey / nhcore disable (live Open); Lua argc parse; other `load_*` still hand-push/drain lregions; `fixup_special` water/air `setup_waterlevel` at start; extra `made_branch` fallback vs C `added_branch`-only; `get_location` not yet the single callee of `get_location_coord`; `u_on_rndspot` W-tower `On_W_tower_level` vs `dndest.nlx` truthiness; `is_ok_location` `Is_waterlevel` / `is_ok_location_func`; wallify / map_cleanup / `count_level_features` on tut-1.

Do not restore tut-1 `updest`/`dndest` copy. Do not exclude `0,0,0,0` for omitted exclude. Do not put trailing `confdir` inside shared `getdir`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: tut-1 `des.teleport_region` now goes through `levregion_add` ANY_LOC origin add and omit-exclude `-1` `del_islev`, and leftover `fixup_special` copies TELE dests instead of a load-time `0,0,0,0` write.
