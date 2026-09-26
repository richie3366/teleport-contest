# Review 1858 — 9cb813fe5 — can_do_extcmd (D-2899)

- SHA: `9cb813fe5` (coverage; `cmd.c` `can_do_extcmd`, plus the bind list `cmd_from_func` walks)
- Files: `js/cmd.js` (body, `nhl_callback`, `nh_callback_run`, bind order), `js/do.js` (tutorial register, safety prefix), `js/dokeylist.js` (`cmd_from_func` walk), `js/getpos.js`, `js/hack.js`, `js/wizcmds.js` (call sites)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean". `imports.mjs --can` for `do.js`→`cmd.js`, `do.js`/`hack.js`/`wizcmds.js`/`getpos.js`→`dokeylist.js`: `ALREADY`. The new names are called from functions, not at module top level.
- No symbol was deleted. `sym.mjs` on the names the diff starts importing:

```
can_do_extcmd    js/cmd.js:646   ASYNC — await required
nhl_callback     js/cmd.js:591   ASYNC — await required
nh_callback_run  js/cmd.js:620   ASYNC — await required
tutorial_cmd_before js/cmd.js:562   sync
cmd_from_func    js/dokeylist.js:473   sync
visctrl          js/dokeylist.js:58   sync
You_cant         js/display.js:7680   ASYNC — await required
impossible       js/display.js:8117   ASYNC — await required
```

## Intent vs deliverable

Subject promises one `can_do_extcmd` in C order: `NHCB_CMD_BEFORE` via `nh_callback_run`, then wizard / buried / fuzzer. It also promises `tutorial_cmd_before` refuses only `"save"`, registered and removed around `nhl_gamestate`, and `cmd_from_func` walks a prepended bind list so overview's oldest non-printable key is Ctrl-O. The diff adds those. It does not add a Lua VM.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `can_do_extcmd` | export `cmd.js:646` | `cmd.c:462–489` |
| `nhl_callback` | export `cmd.js:591` | `nhlua.c:1663–1706` plus `nhcore.lua:17–37` `nh_callback_set` / `nh_callback_rm` |
| `nh_callback_run` | export `cmd.js:620` | `nhcore.lua:39–54` (not a C function; `csym` finds no body) |
| `tutorial_cmd_before` | export `cmd.js:562` | `nhlib.lua:187–194` |
| `cmdbind_order_prepend` / `_unlink` / `_swap_keys` | local | `cmd.c:2125–2155`, `:2157–2177`, `:2194–2204` |
| `cmd_from_func` | live export, walk replaced | `cmd.c:3035–3066` |
| `You_cant` / `pline` / `impossible` | live imports | the three message arms |
| `wizardOn` | existing local | `flag.h:30` `wizard` is `flags.debug`, plus the aliases the old arm already ORed |

## C ↔ JS fidelity

`csym` body is `cmd.c:462–489`. No RNG. Callers: `cmd.c:505` inside `doextcmd` (`js/getline.js:1486`, returns 0 which the extcmd loop treats as done) and `cmd.c:3689` on the `rhack` `tlist` path, including the `do_cmdq_extcmd` label (`js/cmd.js:2082` and `:2129`). Both `await` it. A null row returns false before the C body. C always has a struct.

`NHCB_CMD_BEFORE` is 0 (`hack.h:704`). Names are `decl.c:8–13`: `cmd_before`, `level_enter`, `level_leave`, `end_turn`. The arm runs when `gl.luacore` and `nhcb_counts[0]` are both nonzero. A negative count is still nonzero. `game.luacore` is set at level init (`mklev.js:2668`). False from the callback returns with no `pline`. Then one `else if` chain: `!wizard && WIZMODECMD` → `pline(unavailcmd, ef_txt)` (`cmd.c:157` `"Unavailable command '%s'."`, `pline` is `vpline`); buried without `IFBURIED` → `You_cant("do that while you are buried!")`; fuzzer and `NOFUZZERCMD` → false with no message; else true. `wizardOn` is the expression the previous body already used (`flags.debug` or `flags.wizard` or `game.wizard`). This commit did not widen it.

`nhl_callback` matches the count update: unknown name returns, `rm` decrements and `impossible` if the count goes negative without clamping, otherwise increment, then `_CB_<name>[fn] = true` or delete. C's `!gl.luacore` `panic` is not in this function. Callers run after `luacore` exists. `nh_callback_run` returns true for a missing table after creating `{}`, which is what an empty `pairs` does. A false handler stops the walk. `tutorial_cmd_before` is `cmd ~= "save"` (`nhlib.lua:183–193`); the commented `nh.pline` stays out. Unknown names are skipped. The commit names that: there is no `_G`, and the only registered name is `tutorial_cmd_before`. `tutorial_enter` / `tutorial_leave` (`nhlib.lua:196–215`) call `nh.callback` then `nh.gamestate`. `end_turn` / `tutorial_turn` stays unregistered, as the commit says.

`cmdbind_add` (`cmd.c:2125–2155`): key 0 returns; `!extcmd` and an existing node unlinks; a null command on a new key prepends a null node; an existing key updates in place; a new key prepends. `cmdbind_remove` unlinks. `cmdbind_swapkeys` exchanges key fields and leaves the nodes in place. The JS order array stores keys, index 0 = head. Swapping the two slots' key values is the walk order after C exchanges the fields. `reset_commands(true)` starts that array empty, then `commands_init` prepends. Overview is `C('o')` on the extcmd row (`cmd.c:1789`) and later `M('O')` (`cmd.c:2775`). Both are outside `' '..'~'`. The walk is newest-first, so the older key, Ctrl-O, is the one `ret` keeps. The old `0..255` scan kept the higher code, M-O. Digits and `'-'` on `fight` are skipped when `!num_pad`. Space is skipped until `cmdbind_get(' ')`.

`cmd_from_func('movewest')` and the other direction txts are the `ef_txt` strings (`cmd.c:2008–2017`, `runwest` at `:2042`, `reqmenu` at `:1829`, `wizidentify` at `:1963`). `wiz_identify` (`wizcmds.c:53–60`) stores that key, or `C('I')` when it is 0. `0x1f & 73` is `C('I')`. `getpos` help (`getpos.c:175–193`) and the unknown-direction note (`:1122–1128`) use those keys. `do.c:2333–2334` and `hack.c:1865–1866` use `do_reqmenu`. `getpos.c:898` (run/rush before the next position key) is still not that read. The commit names it.

## Hallucinations / overclaim

The subject says tutorial `#save` is refused. That is `tutorial_cmd_before` once `nhl_callback` has raised `nhcb_counts[0]` and `luacore` is set. The local check in the D-log is that setup, not a corpus session. "No Lua VM" matches the named `lua_*` / `nhl_pcall_handle` omit. `pairs` order is named as insertion order; with one registered name the order does not matter. The wizard message is `unavailcmd`, not a second sentence. The buried string is `You_cant`, replacing the previous hand-built `pline`.

## Density

`can_do_extcmd` is the whole 28-line body and both C call sites. The callback and the bind list are the callees and the `cmd_from_func` walk that body does not itself call; the commit shipped them because the old scan disagreed with `gc.Cmd.cmdbinds`. Same command subsystem. `getpos.c:898` is a named omit, not a stub inside `can_do_extcmd`. Under a large-file cap; js insertions are about 222.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify can_do_extcmd --base 9cb813fe5~1 --reach-all`.

```
verify can_do_extcmd: baseline 9cb813fe5~1 (scoreboard at a0ee642cf, 2026-09-26T21:19:40.713Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify can_do_extcmd: no corpus session is blocked on it at 9cb813fe5~1 — a vacuous verify is NOT a corpus PASS. If the queue row cited N corpus blocks, re-run with --base <the commit that row was queued at>; otherwise ship with the public gates + the reach line below and say so in the D-log.
smoke can_do_extcmd: no RNG-tagged reach; fixed smoke spread (12 run, 3.5s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, cohort, and full 44/44 are the port's own verify line.

## Actionable C-wrongs

None. The callback arm, the three refusal arms, and the bind-list walk match the cited C and the two Lua functions. `getpos.c:898` and `tutorial_turn` stay named omits.

Verdict: **ACCEPT**
