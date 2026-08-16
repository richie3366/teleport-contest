# Review 27 — 7e330128 — tut-1 `tutorial()` nhcore ENTER/LEAVE disable (D-1066)

## Metadata
- Full / short hash: `7e330128e5c2d66c498de543e5ac7d342e3f35df` / `7e330128`
- Parent: `b140e1a5` (review **26** ACCEPT of `296bc792` D-1065; Must-fix empty; popped Open tut-1 nhcore disable)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 07:05:10 +0200
- D-id: **D-1066**
- Stats: 11 files, +179 / −81 — `js/do.js` +77 (`tutorial_enter` / `tutorial_leave` / `ensure_nhcore_available` / `l_nhcore_call` / `tutorial`; `goto_level` rewire); `js/mklev.js` +9 (`l_nhcore_init` fills `nhcore_call_available`)
- Claims to close: Open queue tut-1 nhcore callback disable on enter/leave only (not Lua `cmd_before` / `tutorial_turn` / Knight jump). Stamped **Addressed:** D-1066 `7e330128` on the archive row in this SHA (hash present, not chicken-egg).
- JS / map: `do.js` `tutorial` / `l_nhcore_call`; `mklev.js` `l_nhcore_init`; `c-js-map/startup.md` still names Knight jump / leftover `obfree` / Lua NHCB / `update_inventory` / `l_nhcore_call` GETPOS_TIP.
- JS-touching since last `reviews/loop-unattended/` file: this SHA and `2e50b318` (review **28**). Docs-only since that file: `b140e1a5` (review 26).
- Prior reviews this SHA claims to close: **26** ACCEPT `296bc792` D-1065 (next was nhcore disable). `reviews/loop-2026-08-15/` has no open Must-fix on nhcore.

## Intent vs deliverable

Git subject promises: “Match C tutorial() so leaving the tutorial disables nhcore ENTER/LEAVE callbacks.” Body is empty beyond Co-authored-by. D-log: JS `goto_level` called `nhl_gamestate` directly and never cleared `nhcore_call_available[ENTER|LEAVE]`, so a later dungeon-cross could re-run the stash/restore.

C `nhlua.c:1837–1846` is `tutorial(boolean entering)`: `l_nhcore_call(ENTER or LEAVE)` then, if `!entering`, both `nhcore_call_available` slots FALSE. C `nhlua.c:169–194` is `l_nhcore_call`: bounds / `!luacore` / `!available` return; `lua_getglobal("nhcore")`; `lua_getfield` `nhcore_call_names[callidx]`; `LUA_TFUNCTION` → pcall, else `available[callidx]=FALSE`. C `nhlua.c:140–156` is `l_nhcore_init`: after `nhl_loadlua("nhcore.lua")` succeeds, every slot TRUE. C `do.c:1503–1515` is the `newdungeon` arm: `In_tutorial(newlevel)` → `tutorial(TRUE)`; else `In_tutorial(&u.uz)` → `tutorial(FALSE)`, `up=FALSE`, `leaving_tutorial=TRUE`. C `hack.h:690–699` enum matches JS `const.js:1493–1500`. C `dat/nhcore.lua` `nhcore` table: `enter_tutorial = tutorial_enter`, `leave_tutorial = tutorial_leave`, `getpos_tip = show_getpos_tip`; `start_new_game` / `restore_old_game` / `moveloop_turn` / `game_exit` are commented out. C `nhl_init` (`nhlua.c:2357–2360`) loads `nhlib.lua` into that Lua state first, so those two names exist when `nhcore.lua` builds the table. C `dat/nhlib.lua` `tutorial_enter` registers `nh.callback("cmd_before"|"end_turn")` then `nh.gamestate()`; `tutorial_leave` removes those callbacks then `nh.gamestate(true)`.

The queue line was enter/leave **disable**, and it explicitly excluded Lua `cmd_before` / `tutorial_turn`. The diff ships `tutorial()` + `l_nhcore_call` + init TRUE + `goto_level` rewire.

It does **not** register or remove NHCB `cmd_before` / `end_turn`. Named, and excluded from the queue line. It does **not** port `leaving_tutorial` FREEING / `delete_levelfile` / `remdun_mapseen` (`do.c:1640–1664`). Named (sibling local in the same `else if`; JS already copied `up=false` and still has no savelev FREEING path). It does **not** wire `welcome` `l_nhcore_call(START|RESTORE)` (`allmain.c:860`) or moveloop / `game_exit` / `handle_tip(TIP_GETPOS)`. Named. It does **not** port Knight jump. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `tutorial` | C function, new JS | `nhlua.c:1837–1846`; ENTER/LEAVE then both FALSE after leave |
| `l_nhcore_call` | C function, new JS clone | name lookup replaced by a switch; GETPOS_TIP is a no-op keep-TRUE |
| `ensure_nhcore_available` | JS helper | fills TRUE if missing / wrong length; C is a static array |
| `l_nhcore_init` | C function, retouched | C does not shuffle `align[]`; JS already did (nhlib clone) |
| `tutorial_enter` / `tutorial_leave` | Lua clones | `nhcore.lua` wrappers → `nhlib.lua`; JS only `nhl_gamestate` |
| `nhl_gamestate` | imported C callee, **not this SHA** | `nhlua.c:1722–1801`; already D-1015/D-1020/D-1035 |
| `goto_level` tutorial arm | C call site | `do.c:1509–1514`; was raw `nhl_gamestate` |
| `NHCORE_*` / `NUM_NHCORE_CALLS` | imported C enum | `hack.h:690–699`; `const.js:1493–1500` |
| `nhcore_call_names[]` | C table, not in JS | `"enter_tutorial"` / `"leave_tutorial"` / `"getpos_tip"` / … |
| `welcome` START/RESTORE | C caller, **not this SHA** | `allmain.c:860`; JS `welcome` never calls `l_nhcore_call` |
| `handle_tip(TIP_GETPOS)` | C caller, **not this SHA** | `hack.c:1871–1872`; JS `getpos.js` calls `show_getpos_tip` directly |
| `leaving_tutorial` | C local, **not this SHA** | `do.c:1514` + `1640–1664`; JS has no equivalent |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names in control flow / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched.

## Constitution / playbook

Grep of the `js/do.js` + `js/mklev.js` hunks: no trace-index gates, no recorded coordinates as control flow, no `fastforward` burns. Contest Rule #2: no Node builtins in scored code. `in_tutorial_branch` is a pre-existing JS-only flag in the same `goto_level` block; this SHA did not add it.

## C ↔ JS fidelity

### `tutorial()` — call then both FALSE after leave

C `nhlua.c:1837–1846`:

```
void tutorial(boolean entering)
{
    l_nhcore_call(entering ? NHCORE_ENTER_TUTORIAL
                           : NHCORE_LEAVE_TUTORIAL);
    if (!entering) { /* after leaving, can't go back */
        nhcore_call_available[NHCORE_ENTER_TUTORIAL]
            = nhcore_call_available[NHCORE_LEAVE_TUTORIAL]
                = FALSE;
    }
}
```

JS (`do.js:1082–1091`): `await l_nhcore_call(entering ? ENTER : LEAVE)` then the same two writes when `!entering`. Re-enter after leave: `available[ENTER]` is FALSE, so `l_nhcore_call` returns without stashing; `tutorial(true)` does not re-disable. Match for this envelope.

### `l_nhcore_call` — available gate, function vs nil

C `nhlua.c:169–194`: out of range / no `luacore` / `!available` return. Field is a function → pcall. Else `available[callidx]=FALSE` (commented-out `nhcore` keys are nil).

JS (`do.js:1062–1076`): bounds + `!avail[callidx]` return. ENTER/LEAVE always invoke `tutorial_enter`/`tutorial_leave` (the Lua functions exist in pinned `nhcore.lua`). Other indices except GETPOS_TIP set FALSE without a name lookup. That matches C for the four commented-out keys **if those indices are actually called**. JS `welcome` / moveloop / `end.c` never call them, so those slots stay TRUE for the whole session; C `welcome` (`allmain.c:860`) would disable START or RESTORE on first welcome. Invisible unless something reads the array. Named.

GETPOS_TIP: C pcalls `show_getpos_tip` (`nhcore.lua`; `hack.c:1871–1872`). JS skips the call and does not disable. Nothing in JS calls `l_nhcore_call(GETPOS_TIP)`; `getpos.js` already paints the same Lua `[[...]]` lines via `show_getpos_tip`. Dead arm in this SHA. Named (`startup.md`).

### `l_nhcore_init` — all TRUE after nhcore.lua loads

C `nhlua.c:145–153`: only if `nhl_loadlua("nhcore.lua")` succeeds. JS (`mklev.js:891–898`) always fills TRUE and still shuffles `align[]` (pre-existing nhlib clone inside this C name). `allmain.js:605` calls it on newgame before `maybe_do_tutorial`, so `goto_level` → `tutorial()` sees a live array. Match for the success path.

`ensure_nhcore_available` (`do.js:1047–1052`) rebuilds all-TRUE if the array is missing or the wrong length. `resetGame()` wipes `game`; the next init/ensure matches a new C process. It does **not** revive ENTER/LEAVE after a same-session leave (the array still exists).

### `goto_level` — `tutorial()` not raw `nhl_gamestate`

C `do.c:1503–1514` (after `In_endgame` amulet, which JS still omits in this block):

```
} else if (In_tutorial(newlevel)) {
    tutorial(TRUE);
} else if (In_tutorial(&u.uz)) {
    tutorial(FALSE);
    up = FALSE;
    leaving_tutorial = TRUE;
}
```

JS (`do.js:1312–1321`): same `In_tutorial(newlevel)` / `In_tutorial(u.uz)` / `tutorial(true|false)` / `up=false`. Extra `flags.in_tutorial_branch` was already there. **Does not** set `leaving_tutorial`. C later uses that flag for `cant_go_back` FREEING, `free_luathemes(tut_themes)`, `delete_levelfile` of tutorial ledgers, `remdun_mapseen`, `discard_migrations` (`do.c:1640–1664`). JS `goto_level` has no `cant_go_back` / `savelev(FREEING)` path. Pre-existing omit; this SHA did not claim it. The disable flags still prevent a second `nhl_gamestate(false)` stash in the same process.

C checks `new_ledger <= 0` **after** the tutorial arm; JS already returned on that before the arm. Pre-existing order, not this SHA.

### Lua `tutorial_enter` / `tutorial_leave` — gamestate yes, NHCB no

Pinned `nhcore.lua`: `enter_tutorial = tutorial_enter` (nhlib). Pinned `nhlib.lua` `tutorial_enter`: `nh.callback("cmd_before", "tutorial_cmd_before")`, `nh.callback("end_turn", "tutorial_turn")`, **then** `nh.gamestate()`. Leave removes those callbacks then `nh.gamestate(true)`.

JS `tutorial_enter`/`tutorial_leave` (`do.js:1031–1040`) only `await nhl_gamestate(false|true)`. Callback order is therefore irrelevant. The queue line said not Lua `cmd_before` / `tutorial_turn`. `nhl_gamestate` itself is the already-ported C function (`nhlua.c:1722–1801`), not a stub: stash `setnotworn`+`freeinv`, restore `useupall`+`addinv_nomerge`+`setworn`, memcpy u/disco/mvitals/spl_book. Named leftovers on that callee (`obfree`, `update_inventory` at `nhlua.c:1800`, `impossible` on inconsistent `reststate`/`gmst_stored`) predate this SHA.

No RNG in `tutorial` / `l_nhcore_call` / the available writes.

### Callers — C sites vs this SHA

| C caller | Index | JS |
|----------|-------|-----|
| `allmain.c:860` `welcome` | START or RESTORE | **not called**; JS `welcome` (`allmain.js:511`) builds the pline only |
| `allmain.c:269` moveloop | MOVELOOP_TURN | **not called** |
| `end.c:1678` | GAME_EXIT | **not called** |
| `hack.c:1871–1872` `handle_tip(TIP_GETPOS)` | GETPOS_TIP | `getpos.js:1036–1038` calls `show_getpos_tip` directly; `hack.js:850–863` `handle_tip` only implements TIP_SWIM |
| `nhlua.c:1839` `tutorial()` | ENTER / LEAVE | **this SHA** |

C `welcome` (`allmain.c:860`) runs `l_nhcore_call` **before** the welcome pline. First START/RESTORE looks up a commented-out field, sets that slot FALSE, and continues. JS `jsmain.js:197–200` restore path comments `l_nhcore_call(RESTORE)` and instead calls `l_nhcore_init()` (shuffle + now all-TRUE). That re-init matches a **new** C process (`restore_luadata` `nhlua.c:1357–1358` calls `l_nhcore_init` only if `!gl.luacore`). It is **not** C `welcome`’s RESTORE pcall. Named; unhit by public newgame sessions.

C `handle_tip` (`hack.c:1857–1873`): if the bit is unset, set it, then `TIP_GETPOS` → `l_nhcore_call`. JS `getpos.js` uses a separate `context.tips_given.TIP_GETPOS` flag and never goes through `l_nhcore_call`. Pre-existing split. This SHA’s GETPOS_TIP keep-TRUE arm is dead unless a later port wires `handle_tip`.

### `nhl_gamestate` callee — already C, leftovers named

C `nhlua.c:1733–1801`: restore requires `reststate && gmst_stored`; save requires `!reststate && !gmst_stored`; else `impossible`. Both arms end with `update_inventory()`. JS `tutorial_enter_gamestate` / `tutorial_leave_gamestate` silent-return on the inverse flags (`do.js:956`, `989`) and still omit `update_inventory`. Named since D-1035. This SHA does not retouch those bodies except comments.

Second enter after leave: C `l_nhcore_call` sees `available[ENTER]==FALSE` and does not reach `nhl_gamestate`, so the `impossible("save" vs "already stored")` path is not the disable mechanism. JS same: skip before `tutorial_enter`. Match.

### Pinned `nhcore.lua` table (what “function vs nil” means)

```
nhcore = {
  -- start_new_game = function() ... end,     -- commented
  -- restore_old_game = function() ... end,   -- commented
  -- moveloop_turn = mk_dgl_extrainfo,        -- commented
  -- game_exit = function() end,              -- commented
  getpos_tip = show_getpos_tip,               -- live
  enter_tutorial = tutorial_enter,            -- live (nhlib)
  leave_tutorial = tutorial_leave,            -- live (nhlib)
};
```

`nhl_init` loads `nhlib.lua` first (`nhlua.c:2357–2360`), so `tutorial_enter` is a real Lua function when this table is built. JS hardcoding ENTER→`nhl_gamestate(false)` is the same binding minus NHCB. Commenting out START is why C disables that slot on first `welcome`; JS never takes that call, so the slot stays TRUE. Named.

## Hallucinations / overclaim

“Match C tutorial() so leaving the tutorial disables nhcore ENTER/LEAVE callbacks” is **true for C `tutorial()`’s `nhcore_call_available[ENTER|LEAVE]` flags, for `goto_level` calling `tutorial()` instead of raw `nhl_gamestate`, and for init filling every slot TRUE.** It is **not** true that Lua `nh.callback` cmd_before / end_turn now register or disable, that `l_nhcore_call` is a Lua `nhcore.<name>` lookup, that GETPOS_TIP / START / RESTORE / MOVELOOP / EXIT now run through this function, that `leaving_tutorial` discards levels, or that `welcome` matches `allmain.c:860`. The D-log deferred list says those.

This is **not** “Match C dispatch, callee is a stub.” `tutorial()` and `nhl_gamestate` are the C functions. `tutorial_enter`/`tutorial_leave` are named Lua clones that omit NHCB. The GETPOS_TIP arm of `l_nhcore_call` is a no-op clone; it is not the getpos tip path (that remains `getpos.js`).

Stamping the Open item **Addressed:** D-1066 `7e330128` is fair for the enter/leave disable envelope. Hash already on the archive row.

## Density (§2b)

One Open cluster: C `tutorial()` + `l_nhcore_call` + `l_nhcore_init` available[] + the `goto_level` call site. ~77 lines in `do.js` plus the init fill. Sibling Lua NHCB and `leaving_tutorial` FREEING left named on purpose (queue line excluded NHCB; FREEING is a savelev cluster). Right size. Not “finish `nhlua.c`.” Not another eckey peel.

## Verification

Journal: private node enter keeps both TRUE + stashes; leave restores and disables both; second enter skips stash; nil start_new_game disables that slot; GETPOS stays TRUE. green+strict PASS; seed0009 **73**/73; cohort **12**/12 (8000/0900/0009/0030/0060/0102/0116/0360/0373/1500/1800/2200). Path: seed0009 **enters** the tutorial (stash). **Leave-disable and second-enter skip are public-unhit** (seed0009’s captured prefix does not leave the branch).

This review iter ran cadence **#1350** full `sessions` (same iteration): **44**/44 Scr **11405**/11405 RNG **100%** speed `31+0.26/turn` (R² 0.87). That does not newly prove leave-disable. C read of `nhlua.c:101–110`/`140–194`/`1722–1846`/`2351–2360`, `do.c:1503–1515`/`1640–1664`, `allmain.c:269`/`796`/`860`, `hack.c:1857–1873`, `hack.h:690–699`, pinned `dat/nhcore.lua` `nhcore={...}`, `dat/nhlib.lua` `tutorial_enter`/`tutorial_leave`, JS `do.js:1020–1091`/`1311–1321`, `mklev.js:885–898`, `const.js:1493–1500`, `allmain.js:511–677`/`604–605`, `jsmain.js:197–200`, `getpos.js:984–1039`, `hack.js:850–863`. Grep of the JS hunks: no `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / seed names in control flow.

## Actionable C-wrongs

None in the tut-1 `tutorial()` enter/leave disable envelope this SHA shipped.

Named omits (map, not queue): Lua `nh.callback` cmd_before / `tutorial_turn`; `leaving_tutorial` FREEING / delete tutorial ledgers; `welcome` / moveloop / exit `l_nhcore_call`; GETPOS_TIP via `l_nhcore_call` (still `getpos.js`); Knight jump; leftover `obfree`; `update_inventory` after `nhl_gamestate`; `nhl_gamestate` `impossible` on inconsistent save/restore; `In_endgame` arm above the tutorial `newdungeon` chain.

Do not skip `tutorial()` available[] disable or raw-`nhl_gamestate` from `goto_level`. Do not restore hardcoded tut-1 key strings vs `nh.eckey`/`tut_key`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `goto_level` now goes through C `tutorial()`, which runs `nhl_gamestate` via `l_nhcore_call` and then clears both ENTER/LEAVE slots so a later dungeon-cross cannot re-stash, matching the Open disable line without pretending the Lua NHCB VM exists.
