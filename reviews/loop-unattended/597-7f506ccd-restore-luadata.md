# Review 597 — 7f506ccd — nhlua.c restore_luadata / save_luadata (D-1636)

## Metadata
- Full / short hash: `7f506ccd60132e6170d352e07d34b4ef31db014a` / `7f506ccd`
- Parent: `9eb563b8` (D-1635). This file audits **this SHA only** (seventh of nine `js/` commits since review **590**). Archive **Addressed:** D-1636 `7f506ccd`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 08:15:10 +0200
- D-id: **D-1636**
- Stats: `js/save.js` +209, `js/mklev.js` +5, `js/jsmain.js` +6/−1. Band **150–350** (js/ insertions **~220** <250; id >454 → **200-floor**).
- Claims to close: Open `restore_luadata` after D-1635. Not `restore_gamelog`. Not Lua NHCB. `reviews/loop-2026-08-15/` has no unpaid luadata Must-fix.
- JS / map: `save.js` `restore_luadata` / `save_luadata` / `table_stringify`; `mklev.js` `l_nhcore_init`; `jsmain.js` unixmain no second init. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **589** named `restore_luadata` after `restore_gamelog`.

## Intent vs deliverable

Git subject promises: restgamestate inits luacore if needed then loadstrings the saved `nh_lua_variables` blob (`save_luadata` writes `get_variables_string`), instead of skipping the chunk and shuffling twice after dorecover.

Pinned C `nhlua.c` `restore_luadata` `:1344–1363` (`node scripts/csym.mjs restore_luadata`). `--callers restore_luadata`: `restore.c:722`. Pair `save_luadata` `:1327–1341` (`--callers save_luadata`: `save.c:328`). Callee `get_nh_lua_variables` `:1296–1316`. `l_nhcore_init` `:139–156` (`--callers l_nhcore_init`: `allmain.c:796` newgame, `nhlua.c:1358` restore). `dat/nhcore.lua` `get_variables_string`; `dat/nhlib.lua` `table_stringify`. No Lua VM in scored JS (named).

```1344:1363:nethack-c/upstream/src/nhlua.c
void
restore_luadata(NHFILE *nhfp)
{
    unsigned lua_data_len = 0;
#ifndef SFCTOOL
    char *lua_data;
#endif /* !SFCTOOL */

    Sfi_unsigned(nhfp, &lua_data_len, "luadata-lua_data_len");
    lua_data = (char *) alloc(lua_data_len);
    Sfi_char(nhfp, lua_data, "luadata", lua_data_len);

#ifndef SFCTOOL
    if (!gl.luacore)
        l_nhcore_init();
    luaL_loadstring(gl.luacore, lua_data);
    free(lua_data);
    nhl_pcall_handle(gl.luacore, 0, 0, "restore_luadata", NHLpa_panic);
#endif /* !SFCTOOL */
}
```

```1327:1341:nethack-c/upstream/src/nhlua.c
void
save_luadata(NHFILE *nhfp)
{
    unsigned lua_data_len;
#ifndef SFCTOOL
    char *lua_data = get_nh_lua_variables(); /* note: '\0' terminated */
#endif

    if (!lua_data)
        lua_data = dupstr(emptystr);
    lua_data_len = Strlen(lua_data) + 1; /* +1: include the terminator */
    Sfo_unsigned(nhfp, &lua_data_len, "luadata-lua_data_len");
    Sfo_char(nhfp, lua_data, "luadata", lua_data_len);
    free(lua_data);
}
```

Old JS: named omit after D-1628; JSON had no `luadata` field; `jsmain` called `l_nhcore_init` again after `try_restore_save` (unixmain does not — C restore-path init is only `restore_luadata` `:1357–1358`). The diff **does** JSON-round-trip the assignment chunk, init if `!luacore`, parse via `nhl_loadstring_luadata`, drop the post-restore shuffle. It **does not** port `nhl_variable`, Lua NHCB, binary NHFILE, `nhl_pcall` VM, or `l_nhcore_call(RESTORE)` welcome. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `restore_luadata` | C `:1344–1363`, **LIVE this SHA** | JSON analogue; export save.js |
| `save_luadata` | C `:1327–1341`, **LIVE this SHA** | JSON string field |
| `get_nh_lua_variables` | C `:1296–1316`, **LIVE this SHA** | throw if `!luacore` ≡ C panic |
| `get_variables_string` | C nhcore.lua, **CLONE** | JS builds `nh_lua_variables=…;` |
| `table_stringify` | C nhlib.lua, **CLONE** | persistable keys; insertion order |
| `nhl_loadstring_luadata` | C `luaL_loadstring` arm, **CLONE** | restricted to assignment chunk |
| `parse_table_stringify` / `parse_lua_value` | JS parser of stringify, **CLONE** | not a second C function |
| `l_nhcore_init` | C `:139–156`, **LIVE** | already; restore calls if `!luacore` |
| `nhl_variable` / NHCB / binary NHFILE | **OMIT named** | no Lua VM |
| SFCTOOL `lua_data` global | **OMIT named** | |

`node scripts/csym.mjs restore_luadata` → `nhlua.c:1344-1363`. `save_luadata` → `nhlua.c:1327-1341`. `get_nh_lua_variables` → `nhlua.c:1296-1316`. `l_nhcore_init` → `nhlua.c:139-156`. `--callers restore_luadata`: `restore.c:722` (after `restore_gamelog`). `--callers save_luadata`: `save.c:328` (after `save_gamelog`). `--callers l_nhcore_init`: `allmain.c:796`, `nhlua.c:1358`.

RNG: `l_nhcore_init` still Fisher-Yates `rn2(i)` for `splev_align` (nhlib shuffle analogue, already live). This SHA does not add a new `rn2` in save/restore. Dropping the **second** post-dorecover init matches unixmain (do not burn the shuffle twice on restore). No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
restore_luadata  js/save.js:733   sync
save_luadata     js/save.js:412   sync
get_nh_lua_variables js/save.js:394   sync
get_variables_string js/save.js:384   sync
table_stringify  js/save.js:354   sync
nhl_loadstring_luadata NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/save.js:709
parse_table_stringify NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/save.js:635
l_nhcore_init    js/mklev.js:1223   sync
```

No deleted export. `l_nhcore_init` stays the mklev.js C-home; save.js **imports** it (`node scripts/imports.mjs --can save.js mklev.js l_nhcore_init` → ALREADY, hoisted SAFE). Do not add `table_stringify` #2 in mklev.

## C ↔ JS fidelity

C `restgamestate` `:722` always reads the luadata chunk after gamelog. JS `try_restore_save` now calls `restore_luadata(payload)` at that slot. C unixmain on dorecover success does **not** call `l_nhcore_init` again (`allmain.c:796` is newgame). JS `jsmain.js:226–230` comment + omitted second call **Match unixmain.** Newgame still `allmain.js` `l_nhcore_init()` ≡ `allmain.c:796`.

C restore: Sfi length+chars; `if (!gl.luacore) l_nhcore_init()`; `luaL_loadstring` + `nhl_pcall_handle(..., NHLpa_panic)`. JS: `if (!game.luacore) l_nhcore_init()` first; missing JSON field = old save (still init, leave nhcore `{}`); present string must start `nh_lua_variables=` then parse `table_stringify` + optional `;`. Throw ≡ panic on bad source. Empty / emptystr = empty Lua chunk (table stays `{}`). Trailing NUL stripped. **JSON analogue of the assignment chunk, not a Lua VM.** That is named debt, not a live-arm stub: the C callee `luaL_loadstring` has no JS Lua state; the parser is the verified clone of **this** blob grammar.

C `get_nh_lua_variables`: panic if `!luacore`; `lua_getglobal(..., "get_variables_string")`; if not a function or pcall fail, return NULL; else `dupstr`. JS throws if `!luacore`; `get_variables_string()` builds the same assignment; catch → null so `save_luadata` writes `''` ≡ C `emptystr`. **Match the NULL→emptystr arm.**

C `table_stringify` (nhlib): persistable string/boolean/number/table/nil; skip functions; `[[...]]` strings without escaping `]]`. JS same; `Object.keys` insertion order vs Lua `pairs()` — analogue named (no VM). Nested tables recurse; arrays skipped (C Lua tables used as maps here). **Match the persistable subset.**

`l_nhcore_init` JS: `luacore={}`, `nh_lua_variables={}`, all `nhcore_call_available` TRUE, plus the already-live align shuffle. C loads `nhcore.lua` which sets `nh_lua_variables={}`. Restore then overwrites via loadstring. **Match the `!luacore` init-then-load order** when the JSON field is present. Missing field cannot happen in C NHFILE (always a chunk); JS old saves skip loadstring after init — named old-save analogue.

Callee closure (restore arm). LIVE: `restore_luadata`, `save_luadata`, `get_nh_lua_variables`, `l_nhcore_init`. CLONE: `table_stringify` / `get_variables_string` / `nhl_loadstring_luadata` (assignment grammar only). OMIT named: `nhl_variable`, NHCB, binary Sfi, SFCTOOL, `nhl_pcall` VM, `l_nhcore_call(RESTORE)`. STUB: none in the JSON arm. Combined-arm ships.

Diff grep: no FORCE / DIAG / getRngLog / fastforward / seed names / hardcoded coords. `node scripts/imports.mjs --rulecheck`: Rule #2 clean (no fs; blob is JSON VFS, not `readFileSync`).

## Hallucinations / overclaim

Subject restgamestate inits if needed then loadstrings the blob; save writes `get_variables_string`; no second unixmain shuffle: **true.** JSON analogue: **true and named.** Do **not** stamp “Match C `luaL_loadstring` / Lua 5.3 VM.” Do **not** stamp “Match C `nhl_variable`.” Do **not** stamp “Match C NHCB `nh_callback_*`.” Do **not** stamp “Match C binary NHFILE Sfi_unsigned.” Do **not** stamp “Match C `restore_gamelog`” (D-1628). seed0013-friday13 hits restore; other seeds’ lua tables stay `{}`.

## Density

+220: C restore 20 + save 15 + get_nh_lua_variables 21 plus stringify/parse + unixmain caller. §2b one luadata family. Did not glue NHCB or `restore_cham`. Above a one-`if` peel.

## Verification

Wired: save field after gamelog; restore after gamelog; `!luacore` init; missing field old save; emptystr; bad prefix throws; jsmain no second init. Unwired C: Lua VM / NHCB / `nhl_variable`. Conf: no new `rn2` in save.js; restore must not call `l_nhcore_init` twice (would double-shuffle `splev_align`). No seed gate.

D-log private canary **22**/22; focused seed0013-friday13 restore PASS+strict; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for a non-empty `nh_lua_variables` table (fortress `{}`).

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `nhl_variable`; Lua NHCB `nh_callback_*` / `cmd_before`/`end_turn`; binary NHFILE; SFCTOOL; `nhl_pcall` VM; `l_nhcore_call(RESTORE)` welcome; Lua `pairs()` vs JS key order. Do not add `table_stringify` #2. Do not static-import a Lua VM. Do not restore the post-dorecover second `l_nhcore_init`. Do not re-port `restore_gamelog` (D-1628).

Verdict: **ACCEPT-WITH-DEBT**
