# Review 1825 — 8fbf942b1 — themerooms_post_level_generate (D-2866)

- SHA: `8fbf942b1` (coverage; `mklev.c` `themerooms_post_level_generate`)
- Files: `js/mklev.js` (+45/−15)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, or `fastforward` in the `js/` hunk. Seed names appear only in the commit message (the mid-iteration tutorial regression), not in control flow. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `themerooms_post_level_generate`: missing themes return before reset, the post hook, and wallification; otherwise reset, run the compiled handlers, wallify the map, drop `gc.coder`. Both `makelevel` tails call only this function. `load_tut1` / `load_tut2` wallify when `!corrmaze` before `fixup_special`. The diff deletes `run_themerms_post_level_generate` and does that. `sym.mjs`:

```
run_themerms_post_level_generate NOT FOUND in js/**
themerooms_post_level_generate NOT EXPORTED — local js/mklev.js:30173
```

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `themerooms_post_level_generate` | local `mklev.js:30173` | `mklev.c:1173–1194` |
| `reset_xystart_size` | existing callee | `mklev.c` reset |
| `wallification` | existing `mklev.js:31899` | full-map call |
| `themerms_postprocess` handlers | existing compiled list | `lua` `post_level_generate` |

## C ↔ JS fidelity

`csym` body is `mklev.c:1173–1194`. Callers: `:1420` inside `makelevel`. `:25` is the static declaration.

`themes` is `gl.luathemes[u.uz.dnum]`. JS reads `game._luathemes_loaded[dnum]`, set true on the ordinary `makerooms` path (`mklev.js:26925`). A missing or false value returns immediately. No RNG on that arm.

Otherwise, in order: `reset_xystart_size`, `in_mk_themerooms = true` and `themeroom_failed = false`, the handler list (`make_a_trap`, `make_garden_walls`, `make_dig_engraving`), clear the list, `in_mk_themerooms = false`, `wallification(1, 0, COLNO-1, ROWNO-1)`, then `gc.coder = null` when the coder exists. `iflags.in_lua` is not written (named; no reader). `lua_getglobal` / `nhl_pcall_handle` / `lua_gc` have no Lua heap; the handler list is the compiled stand-in, named in the map.

The one C call is split across the two JS tails that replace the single fall-through: `makelevel_ordinary` (`:27096`) and the maze tail (`:26897`). Ordinary returns before the maze tail, so the function runs once. Rogue rooms do not set `_luathemes_loaded`, so this function returns before wallify. That is the themes-null arm, not an extra wallify.

`load_special` (`sp_lev.c:6479–6480`) wallifies when `!level.flags.corrmaze`, before `fixup_special` (`:6491`). `load_tut1` (`:19528`) and `load_tut2` (`:19613`) do that. `map_cleanup` and `count_level_features` stay deferred, named. Other special loaders in this file already wallify on that same call. The tutorial pair was the one still borrowing the old unconditional tail.

## Hallucinations / overclaim

The subject says the first reach run failed seed8243 and seed0009 and the `load_special` wallify restored it. Those names are not in `js/`. The final function does return when themes are missing, and the tutorial loaders do wallify. `lua_gc` is not claimed to run.

## Density

The 22-line function, both `makelevel` tails, and the `load_special` wallify the early return had been covering for tutorials. 45 insertions. The handler list was already the post hook.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify themerooms_post_level_generate --base 8fbf942b1~1 --reach-all`. The function body is unchanged since this SHA.

```
verify themerooms_post_level_generate: baseline 8fbf942b1~1 (scoreboard at 8dccc7d47) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke themerooms_post_level_generate: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The function draws no RNG, so the reach set is the smoke spread.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
