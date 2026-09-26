# Review 1829 — bde9dd8fa — set_levltyp_lit (D-2870)

- SHA: `bde9dd8fa` (coverage; `mkmaze.c` `set_levltyp_lit`)
- Files: `js/trap.js` (+30), `js/mklev.js` (+42/−100)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `set_levltyp_lit`: `set_levltyp` first, then unless `SET_LIT_NOCHANGE` a sanity check, lava forced to 1, `SET_LIT_RANDOM` draws `rn2(2)`, and `.lit` is assigned. The four C callers are wired. The diff deletes `set_levltyp_lit_tail` and does that. `sym.mjs`:

```
set_levltyp_lit      js/trap.js:909   sync
set_levltyp_lit_tail NOT FOUND in js/**
impossible           js/display.js:8116   ASYNC — await required
```

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `set_levltyp_lit` | export `trap.js:909` | `mkmaze.c:124–145` |
| `set_levltyp` | same-file export `trap.js:865` | `mkmaze.c:76–121` |
| `impossible` | import, not awaited | `config.h:637` keeps `EXTRA_SANITY_CHECKS` |
| `lvlfill_solid` / `lvlfill_swamp` | callers | `sp_lev.c:380`, `:402`, `:412`, `:415`, `:418` |
| `sel_set_ter` / `lspo_replace_terrain` | callers | `sp_lev.c:4614`, `:5128`, `:5133` |

## C ↔ JS fidelity

`csym` body is `mkmaze.c:124–145`. Callers: `sp_lev.c:380`, `:402`, `:412`, `:415`, `:418`, `:4614`, `:5128`, `:5133`. `:133` is the `impossible` format inside the function.

`set_levltyp` runs first and returns false when the cell is out of bounds, the type is outside `STONE`..`MAX_TYPE`, or `CAN_OVERWRITE_TERRAIN` fails. Lava sets `.lit = 1` inside that function (`trap.js:873`), so a later `SET_LIT_NOCHANGE` still leaves lava lit. When the return is true and the cell is in bounds, `lit != -2` enters the light arm. `lit < -2` or `lit > 1` calls `impossible` with the C format; `display.js:8123` fills `%d`. The call is not awaited (`impossible` is async). Lava then forces 1 and does not draw. Otherwise `SET_LIT_RANDOM` (`-1`) draws `rn2(2)`. The value is stored as that integer, not `!!l`. Then the function returns the `set_levltyp` result.

`lvlfill_solid` (`mklev.js:19726`) continues when the call returns false, then clears flags, horizontal, roomno, and edge. `lvlfill_swamp` calls the four sites and does not clear those fields. The `rn2(3)` at `:19905` is after the first light roll, matching `:410`. `lspo_replace_terrain` (`:1828`, `:1833`) calls it at both sites after `rn2(100) < chance`. The hand-rolled `hellfill_replace_terrain_all`, `lspo_replace_terrain_region`, and `lspo_replace_terrain_sel` call it with `SET_LIT_NOCHANGE` instead of `sel_set_ter`, so they no longer clear flags or paint a door mask. That is what `sp_lev.c:5128` and `:5133` do.

`sel_set_ter` maps boolean `false` to `SET_LIT_NOCHANGE` and passes numeric 0 through. It still clears flags, horizontal, roomno, and edge after a successful set. C `sel_set_ter` does not. The map names that, and names `set_levltyp`'s missing SDOOR→AIR return and the full `count_level_features` rescan. Those are not arms of this function.

## Hallucinations / overclaim

The subject says solid and swamp fill used to store `SET_LIT_NOCHANGE` as a truthy light. The deleted loops assigned `!!l`, and `!!(-2)` is true. The new function leaves `.lit` alone on that value. The sanity `impossible` is the live function, not a stub, and the commit says it is not awaited.

## Density

The 22-line function, the deleted tail, and the C call sites. 72 insertions in `js/`. The flag clear that remains on `sel_set_ter` is named in `docs/c-js-map/data.md`.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify set_levltyp_lit --base bde9dd8fa~1 --reach-all`. This SHA is HEAD.

```
verify set_levltyp_lit: baseline bde9dd8fa~1 (scoreboard at 3ff465fee) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke set_levltyp_lit: no RNG-tagged reach; fixed smoke spread (12 run, 3.4s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. `SET_LIT_RANDOM` is the only `rn2` in the function, and no corpus session reaches it.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
