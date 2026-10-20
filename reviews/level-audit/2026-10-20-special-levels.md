# Special-level coverage audit — 2026-10-20 (@878852b8f)

Scope: every `nethack-c/upstream/dat/*.lua` level script (126), themed rooms
(`themerms.lua`), and the support files (`dungeon.lua`, `quest.lua`,
`nhlib.lua`, `nhcore.lua`). Asked by the human: "have we ported all the
custom levels?" Answer: **yes, all 126 are ported**. 107 are proven
RNG-exact against C in the corpus, 19 are unreached and statically matched,
and there is one confirmed C-wrong (F1) plus three follow-ups (F2–F4).

Reproduce (both tools are read-only on `js/`):

```bash
python3 scripts/level-audit-static.py   # dispatch, maps, call sequences, epilogue steps
node scripts/level-audit.mjs            # replays .cache/hidden/sessions on a hooked js/ copy (~15 min, 8 jobs)
node scripts/level-audit.mjs --report   # re-print the last run
```

## Results

**Static (`level-audit-static.py`).**
- Dispatch: 126/126 levels have a `load_*` loader in `js/mklev.js` (`load_special_proto_body`).
- Maps: 127/127 Lua `[[…]]` maps are in JS byte-for-byte. water's map is built as `'W'.repeat(76)` × 20, which is the same size.
- Call sequences: all 26 quest filler levels (`*-fila`/`*-filb`) and minefill emit their `des.*` calls in Lua order, with the same arguments.
- Themed rooms: 31/31 rooms and 15/15 fills, with frequency, mindiff and lit-eligibility identical to `themerms.lua`.
- `dungeon.lua` → `js/generated/dungeon_data.js` is extractor-generated (46/46 names). `quest.lua` texts are generated (D-3930).
- Every `nhlib.lua` level helper is ported. The `nh_set/get_variables_string` save-state helpers have no JS equivalent, and they don't affect levels.

**Dynamic (`level-audit.mjs`, 4785 cached corpus sessions, 0 errors).**
- 107/126 levels were built (~7,900 builds). Every build made before a session's first RNG divergence matched C exactly. The 15 exceptions were all earlier, unrelated divergences, mostly the env-only `env:config-path` row at step 0.
- Every themed room and fill was picked at least 13 times (88k rooms in total), all RNG-exact.
- Unreached (19): `Arc-fila Arc-filb Bar-filb Cav-fila Cav-filb Hea-fila Hea-filb Kni-fila Kni-filb Kni-loca Mon-fila Ran-filb Rog-fila Rog-filb Sam-fila Sam-filb Tou-fila Val-fila` (18 fillers + Kni-loca). Kni-loca was compared by hand: same map, region, altar, 45 magic traps, and monster list.
- Thin (1–3 builds): `Bar-fila Mon-filb Ran-fila Tou-filb Rog-goal Rog-loca Hea-loca Arc-loca Bar-loca Ran-loca Sam-goal Sam-loca Tou-loca Val-loca Val-filb`.

Limits: RNG equality is location-blind (D-1849). Screens confirm placement only for scoreboard sessions, and only on cells the hero saw. Per-level branch coverage (which `percent()` arms ran) was not measured.

## Findings

### F1 — C-wrong: hellfill skips `remove_boundary_syms` (and the rest of the load_special head)

- **C:** `sp_lev.c` load_special `:6464–6471` runs `link_doors_rooms()`, `remove_boundary_syms()`, `ensure_way_out()` (only if inaccessibles) and `map_cleanup()` after every level script. `remove_boundary_syms` (`:1015–1038`) turns map `B` (CROSSWALL) cells inside `SpLev_Map` into ROOM.
- **Lua:** `hellfill.lua :207–219` "crosswall temple" prefab, a 7×7 `B` ring around an irregular temple region (`filled=1`) plus an altar. The `B` ring is the region's flood-fill boundary and becomes floor afterwards.
- **JS:** `load_hellfill` (`js/mklev.js`) goes straight to `wallification` and `fixup_special`. It never calls `link_doors_rooms`, `remove_boundary_syms` or `map_cleanup`, so the ring stays CROSSWALL and then gets wallified. The result is a closed wall box where C has an open temple.
- **Reach:** Gehennom filler levels whose style rolls a prefab (hells 2/4/6, `percent(25)`), then about 1 in 10 prefabs. The corpus built hellfill 147 times without catching it.
- **Deliverable:** run the load_special head in C order in `load_hellfill`, or under F3. Verify with `verify.mjs --fn remove_boundary_syms --full`, `node scripts/level-audit.mjs` (no new exception) and a sweep.
- **Addressed:**

### F2 — C-wrong: two readers miss W_NONDIGGABLE written to `loc.flags`

- **C:** `rm.h:215` `#define wall_info flags`, a single field.
- **JS:** `loc.flags` and `loc.wall_info` are two fields. Most readers OR them, as in D-0865 (`dig.js rm_wall_info`, `mon.js`, `teleport.js`, `apply.js`, `monmove.js`, `muse.js`). About 23 writers in `js/mklev.js` (tower1–3 solidify and non_diggable, sokoban, bigroom and others) set `loc.flags |= W_NONDIGGABLE`.
- **Wrong sites:**
  - `js/mthrowu.js` hit_bars: `nodissolve = loc.wall_info & W_NONDIGGABLE` (C `mthrowu.c:1425`) ignores `.flags`, so acid can dissolve non-diggable bars.
  - `js/hack.js` moverock_core: the boulder-fills-hole arm clears only `wall_info` (C `hack.c:562`), leaving a `.flags` W_NONDIGGABLE bit set.
- **Deliverable:** both sites use the OR (read) or clear both fields, with a grep for any other single-field W_* reader or clearer.
- **Addressed:**

### F3 — C-wrong (structural): the load_special epilogue is inlined per loader, unevenly

- **C:** the same epilogue runs for every level (`sp_lev.c :6464–6494`): link_doors_rooms → remove_boundary_syms → (ensure_way_out) → map_cleanup → wallification → flip_level_rnd → count_level_features → (solidify_map) → fixup_special → (premap_detect).
- **JS:** each loader inlines its own copy. Measured counts: link_doors_rooms 16/126, remove_boundary_syms 15/126, map_cleanup 17/126, flip_level_rnd 93/126, fixup_special 126/126. count_level_features is already shared in `load_special_proto`. The skipped steps consume no RNG, so RNG-exact replay cannot see them. Room door lists, `horizontal` door orientation, CROSSWALL markers, and boulders, traps or engravings on liquid can all differ silently.
- **Deliverable:** port the epilogue once, in C order, in `load_special_proto` (the dispatch wrapper), and delete the per-loader copies. Keep any genuinely level-specific step, such as lregion placement around the flip, where C puts it (`fixup_special` handles lregions). The noflip, solidify, premapped and inaccessibles flags come from the coder (`gc.coder`), as in C.
- **Verify:** `node scripts/level-audit.mjs` must show the same 107 RNG-exact levels and no new exceptions, plus `python3 scripts/level-audit-static.py` (section 4 counts become 126/126) and a full `hidden-proxy sweep moveloop_core`.
- **Ride-along:** refresh the loaders' "Named omissions" headers. 124/126 carry them and many are stale: hellfill prefabs (shipped D-4019), "humidity-aware get_location" (`pm_to_humidity` is live in `splev_create_monster`), themerms "Water vault / Blocked center" (ported), castle BARRACKS and others (RNG-exact across 198 castle builds).
- **Addressed:**

### F4 — Coverage: 19 levels never built by the corpus, 15 built ≤ 3 times

- The quest filler levels sit between the quest locate and goal levels. `scen-questtour` and `scen-quest` level-teleport past them.
- **Deliverable (grow slot, not a port):** a scenario family, or a questtour reshape, that walks `strt → fila → loca → filb → goal` for every role, and reaches Kni-loca. Then re-run `level-audit.mjs` until "unreached" is empty.
- **Addressed:**
