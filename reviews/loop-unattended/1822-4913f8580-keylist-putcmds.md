# Review 1822 — 4913f8580 — keylist_putcmds / extcmd_via_menu (D-2863)

- SHA: `4913f8580` (coverage; `cmd.c` `keylist_putcmds`, same file `extcmd_via_menu`)
- Files: `js/dokeylist.js` (+125/−49), `js/getline.js` (+146/−1), `js/cmd.js` (+23/−15). 294 `js/` insertions.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, seed name, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `keylist_putcmds` and one `keylist_func_has_key` in C order (space skipped only when `!flags.rest_on_space`, binds from `cmdbind_get`, `CMD_PARAM` quotes the stored param), plus `bind_key` storing at most 30 characters, clear/swap of that slot, an `rhack` `{cmd, param}` stamp, and `extcmd_via_menu` (autocomplete filter, one-choice short-circuit, letter-grouped menu) called from `get_ext_cmd` when `iflags.extmenu`. The diff does those. Nothing was deleted. `sym.mjs`:

```
keylist_putcmds      NOT EXPORTED — local js/dokeylist.js:601
keylist_func_has_key NOT EXPORTED — local js/dokeylist.js:577
extcmd_via_menu      js/getline.js:1274   ASYNC
bind_param_get/set   js/dokeylist.js:321 / :329   sync
bind_key             js/cmd.js:1350   sync
cmdbind_add/remove/swapkeys  local js/cmd.js:1267 / :1319 / :1524
get_ext_cmd          js/getline.js:1394   ASYNC
```

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `keylist_putcmds` | local `dokeylist.js:601` | `cmd.c:2801–2863` |
| `keylist_func_has_key` | local `dokeylist.js:577` | `cmd.c:2784–2799` |
| `bind_param_get/set/clear/swap` | sync exports | `Cmd_bind.param` beside the cmd |
| `extcmd_via_menu` | async export `getline.js:1274` | `cmd.c:751–882` |
| `strncmpPrefix` | local clone of `strncmp` | libc; same walk as `strncmpN` |
| `cmdbind_add` / `remove` / `swapkeys` | existing; param slot now cleared or swapped | `cmd.c:2130–2154`, `:2157–2173`, `:2194–2204` |
| `bind_key` | existing; stores the param | `cmd.c:2661–2709` |
| `rhack_dispatch_bound` | existing; stamps `param` | `cmd.c:3679` |

`cmdbind_get` returns the `EXTCMDLIST` object (`cmdbinds_live`), so `cmd === extcmd` is the C pointer compare. No second clone of `keylist_putcmds`.

## C ↔ JS fidelity

`csym` `keylist_putcmds` is `cmd.c:2801–2863`. Callers are all inside `dokeylist`: `:2987`, `:2990`, `:2994`, `:2997`, `:3002`, `:3006` (`:146` is the static declaration). JS `dokeylist_lines` calls those six with the same `keysUsed` array. `docount` increments and does not mark the key. A live bind is skipped when `incl_flags` misses or `excl_flags` hits. `CMD_PARAM` prints `bind_param_get` in quotes; a missing slot becomes `""` (C would pass a null `%s` only if `bind_key` never stored one). Then keyless rows use the pre-update snapshot and `keylist_func_has_key`. Format is `%-7s %-13s` and `#%-20s`. No RNG.

`keylist_func_has_key` (`cmd.c:2784–2799`) walks 0..255, skips `skip_keys_used[i]`, returns true when `cmdbind_get(i)` is that extcmd. Callers: `:2851` inside `keylist_putcmds`, and `:2909` inside `dokeylist` (the "also commands with no key assignment" subtitle). Both are wired (`dokeylist.js:642` and `:716`).

`bind_key` (`cmd.c:2696–2709`): `maxlen = min(30, strlen(p)) + 1`; empty (`maxlen <= 1`) errors; otherwise `strncpy` of that many bytes and a NUL at `maxlen-1`. JS `bind_param_set(k, p.slice(0, maxlen - 1))` keeps at most 30 characters. `cmdbind_add` clears the slot on update and on a new node (`:2141–2143`, `:2150`). `cmdbind_remove` clears it (`:2169–2170`). `cmdbind_swapkeys` (`:2194–2204`) swaps only when both nodes exist, by exchanging key fields so param stays with the command. JS swaps the cmd slots and `bind_param_swap` under the same `exists` guard.

`extcmd_via_menu` (`cmd.c:751–882`). `MAX_EXT_CMD` is 200 (`cmd.c:737`). The filter is `CMD_NOT_AVAILABLE|INTERNALCMD`, requires `AUTOCOMPLETE`, and drops `WIZMODECMD` when `!wizard`. Prefix match is `!matchlevel || !strncmp(ef_txt, cbuf, matchlevel)`. Overflow clears `iflags.extmenu` and returns −1. Both `impossible` calls are under `#if NH_DEVEL_STATUS != NH_STATUS_RELEASED`; `patchlevel.h:33` is `NH_STATUS_RELEASED`, so they are compiled out. One choice returns `choices[0] - extcmdlist`; zero choices return −1. Otherwise the letter menu: `one_per_line` when `nchoices < ROWNO - 3`, wrap when `acount >= 2` and the prompt would pass `min(QBUFSZ, COLNO-6)`, selector is `ef_txt[matchlevel]` (0 past the end). `get_ext_cmd` calls it when `game.iflags.extmenu` (`getline.c:300–301`) and maps the `EXTCMDLIST` index through `availableExtCmds` by lowercase `ef_txt`, the same translation the getlin path already uses because JS `doextcmd` indexes that list.

Cancel after a prefix does not match. C (`cmd.c:884–887`):

```c
if (matchlevel) {
    ret = 0;
    matchlevel = 0;
} else
    ret = -1;
```

`cbuf` is left as the abandoned prefix. The next pass matches every command (`!matchlevel`) and the `end_menu` header is still `Extended Command: ` plus that prefix (`:870`). JS (`getline.js:1375–1378`) also sets `cbuf = ''`, so the header comes back empty. The following pick overwrites `cbuf` from index 0 in both, so the filter recovers; the header on the back-out screen does not.

`dokeylist_lines` still sets `const numPad = false` and marks special keys from `SPKEYS_DEFAULT`. That mask is what `keylist_putcmds` treats as already used. C `dokeylist` uses `iflags.num_pad` and `gc.Cmd.spkeys` (`cmd.c:2892–2901`). Those two lines were not edited in this commit; the command rows themselves now read `cmdbind_get`. Not a second arm of `keylist_putcmds`.

## Hallucinations / overclaim

The subject does not say `parsebindings` stores a parameter, and the map names that strip. `NH_DEVEL_STATUS` really is released, so the `impossible` arms are absent. The allopt `extmenu` address is `flags` (`options.js:7846`) while `get_ext_cmd` reads `iflags`; that split is named in `docs/c-js-map/turns.md` in this commit. The subject does not mention clearing `cbuf` on cancel.

## Density

`keylist_putcmds`, `keylist_func_has_key`, and `extcmd_via_menu` are the same C file. Callers that exist in JS are wired. 294 insertions, one family. The cancel clear is one arm of the menu function, not a stubbed callee.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify keylist_putcmds --base 4913f8580~1 --reach-all`. No later commit touches `js/dokeylist.js`, `js/getline.js`, or `js/cmd.js`.

```
verify keylist_putcmds: baseline 4913f8580~1 (scoreboard at d904f5bb1) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke keylist_putcmds: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The back-out header is not on that smoke path.

## Actionable C-wrongs

1. `extcmd_via_menu` cancel-after-prefix (`cmd.c:884–887`) must leave `cbuf` in place. `js/getline.js:1375–1378` assigns `cbuf = ''`, so the next `Extended Command:` header drops the abandoned prefix.

Verdict: **QUALITY-RISK**
