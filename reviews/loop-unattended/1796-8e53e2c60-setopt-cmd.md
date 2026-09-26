# Review 1796 — 8e53e2c60 — setopt_cmd (D-2837)

- SHA: `8e53e2c60` (coverage; `pager.c` `setopt_cmd`, callees `cmd_from_func` / `cmdname_from_func` / `copynchars`)
- Files: `js/pager.js`, `js/dokeylist.js`, `js/hacklib.js`, `js/options.js`, `js/cmd.js`, `js/getline.js`
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, seed, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `setopt_cmd` in C order, with `cmd_from_func` and `cmdname_from_func` supplying the live key or the `#name`. The diff is those three functions, `copynchars`, the `dohelp` item, the paranoid-confirm `'m'` substitution, and three `do_reqmenu` call sites that had a hardcoded `m`. Default binds still produce `'#optionsfull' or 'm O'`.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `setopt_cmd` | `pager.js:3216` | `pager.c:2905–2957` |
| `hash31` | local `Sprintf` stand-in | `%.31s` plus optional `#` |
| `cmd_from_func` | `dokeylist.js:394` | `cmd.c:3035–3066` |
| `cmdname_from_func` | `dokeylist.js:435` | `cmd.c:3105–3155` |
| `strncmpN` | local | `strncmp` in the short-name loop |
| `copynchars` | LIVE `hacklib.js:186` | `hacklib.c:286–297` |
| `visctrl` | LIVE `dokeylist.js` | key text |
| `efTxt` | adapter | `ef_funct` is `ef_txt` on this table |

The diff adds imports; it does not delete a symbol. `sym.mjs`:

```
cmd_from_func    js/dokeylist.js:394   sync
cmdname_from_func js/dokeylist.js:435   sync
copynchars       js/hacklib.js:186   sync
             !! ALSO 1 LOCAL CLONE(S) — js/topten.js:44
setopt_cmd       js/pager.js:3216   sync
```

`imports.mjs --can dokeylist.js hacklib.js copynchars` and `pager.js dokeylist.js cmd_from_func`: `ALREADY`. `topten.js:44` stays the local slice, named.

## C ↔ JS fidelity

`csym` `setopt_cmd` is `pager.c:2905–2957`. Caller: declaration `:52`; `pager.c:2882` when the help item's function is `dispfile_optmenu`. That item is `dohelp`'s `i` row (`pager.js` template `Using the ${setopt_cmd()} command to set options.`). Other help rows do not call it.

The body copies `'`, then `cmd_from_func(doset)`. `doset` is extcmd `optionsfull` (key 0 in `extcmdlist_data.js`). Unbound falls through: `cmdname_from_func(..., TRUE)` or the literal `optionsfull`, then `' or '`, then `do_reqmenu` (`reqmenu`, default key 109 `'m'`), a space, then `doset_simple` (`options`, default key 79 `'O'`), then `'`. `hash31` is `Sprintf(eos, "%s%.31s", lead, name)`: lead is `#` unless the name already starts with `#`, and the name is clipped at 31. No `rn2`. With the default binds the string is `'#optionsfull' or 'm O'`.

`cmd_from_func` (`cmd.c:3035–3066`): skip space; skip `'0'`–`'9'` and `'-'` when the function is `do_fight` (`txt === 'fight'`) while `!num_pad`; a printable `' '`–`'~'` returns immediately; a non-printable is remembered; space is the last resort via `cmdbind_get(' ')`. JS uses `cmdbinds_live()` index 0..255, not the `gc.Cmd.cmdbinds` link. One key per command returns the same character. Two printable keys return the lower code here and the earlier list node in C. Two non-printable keys return the higher code here and the later list node in C. The commit and the map name that.

`cmdname_from_func` (`cmd.c:3105–3155`): first `extcmdlist` row whose `ef_txt` matches; null if none. `fullname` returns that text (`strcpy` into the caller buffer; JS returns the table string, and these callers do not write into it). The short name starts `len` at 0, increments, stops at `Strlen`, and scans from the last prefix hit, skipping the command itself, `CMD_NOT_AVAILABLE`, and `WIZMODECMD` when `!wizard` (`flags.debug`). `strncmp` of `len` characters: JS `strncmpN` treats a missing character as NUL. Then `copynchars(outbuf, res, len)`. `EXTCMDLIST` has no null `ef_txt` sentinel; the scan stops at `length`, which is the same end. `debugpline2` is absent. `debugcore` (`files.c:3126`) is false when `debugfiles` is empty, so that pline does not run in this build. Named.

`copynchars` (`hacklib.c:286–297`) copies at most `n` characters, stops on NUL or newline, and terminates. JS returns that string. A null `src` becomes `""`. C would dereference. Named.

`handler_paranoid_confirmation` (`options.c:5973–5983`): if the explain contains `'m'` and `cmd_from_func(do_reqmenu) != 'm'`, substitute `visctrl` clipped to 9 or the `#name` clipped to 31. JS `options.js` is that test (`0x6d`) and `strsubst`. The per-command `[m]` tag in `doc_extcmd_flagstr` stays the letter `m` (`cmd.c:548`). The footnote (`:536–537`) uses `visctrl`. `do_reqmenu` (`:1579`) and `doextcmd` (`:509`, JS `getline.js`) use the same `visctrl`.

`csym --callers cmd_from_func` has 42 references. Wired here: `cmd.c:509`, `:537`, `:1579`, `options.c:5974`, `pager.c:2916/2929/2944`, and `cmd_from_ecname` (`:3078`) which already calls `cmd_from_func_ecname`. `cmd_from_dir` (`:3031`) already returned `cmd_from_func`. Still unwired, and named: `cmd.c:3475`, `:3696`, `:4134–4162`, `do.c:2334`, `getpos.c` help lines and the `:898` run/rush test (the map says the getpos sites), `hack.c:1866`, `wizcmds.c:53`. `cmdname_from_func` callers are the four sites above plus `extern.h` (not a call). All four are live.

## Hallucinations / overclaim

The subject says default binds still render `'#optionsfull' or 'm O'`. `optionsfull` is unbound, `reqmenu` is `'m'`, `options` is `'O'`. It says the bind walk is index order. That is the code, including the printable early return, not only the non-printable last-key case the named sentence highlights. It does not claim the remaining `cmd_from_func` sites were wired.

## Density

`setopt_cmd` plus the two callees it calls, `copynchars`, and the same-file callers that already had a hardcoded `m` or a named skip of this substitution. One command-name family.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify setopt_cmd --base 8e53e2c60~1 --reach-all`.

```
verify setopt_cmd: baseline 8e53e2c60~1 (scoreboard at 57e3529ab) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke setopt_cmd: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. D-2837's green, strict, cohort, and full 44 were not re-run here.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
