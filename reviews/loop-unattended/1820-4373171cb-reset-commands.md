# Review 1820 — 4373171cb — reset_commands (D-2861)

- SHA: `4373171cb` (coverage; `cmd.c` `reset_commands`)
- Files: `js/cmd.js` (+456), `js/options.js`, `js/dokeylist.js`
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, seed name, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `reset_commands` in C order: initial boot clears the four flags, copies `spkeys_binds`, runs `commands_init`, then the common tail; a later call restores the direction backup, syncs `num_pad`, and applies `swap_yz` / pcHack / phone. The first JS call with no slot array runs the TRUE boot once because `options.c:7158` has no JS function. The diff is that function, the slot table, and the three live callers (`optfn_number_pad`, `handler_number_pad`, `rest_on_space`).

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `reset_commands` | sync export `cmd.js:1667` | `cmd.c:3343–3476` |
| `commands_init` | local `cmd.js:1584` | `cmd.c:2749–2782` |
| `update_rest_on_space` | sync export `cmd.js:1643` | `cmd.c:3479–3503` |
| `cmdbind_swapkeys` | local `cmd.js:1521` | `cmd.c:2194–2204` |
| `bind_key_fn` | local `cmd.js:1569` | `cmd.c:2731–2746` |
| `ext_func_tab_from_func` | sync export `cmd.js:1553` | `cmd.c:3015–3025` |
| `cmdbind_add` | existing; slot arm added | `cmd.c` add |

`sym.mjs`: `reset_commands` `cmd.js:1667` sync; `update_rest_on_space` `:1643` sync; `ext_func_tab_from_func` `:1553` sync. Nothing deleted. `dotypeinv` is the imported function mapped to txt `inventtype`.

## C ↔ JS fidelity

`csym` body is `cmd.c:3343–3476`. Callers: `options.c:2618`, `:5944`, `:7158`. `:2006` and `:3478` are comments.

Initial: `updated = 1`, `num_pad` and the three mode flags false, `spkeys[nhkf] = key` for `cmd.c:3161–3190` (ESC `0x1b`, `.` `46`, `s` `115`, `?` `63`, `_` `95`, `n` `110`, `@` `64`, `.` `,` `;` `:` `$` `#` `m` `M` `o` `O` `d` `D` `x` `X` `z` `Z` `a` `A` `?` `"` `*` `!` — the JS codes match those characters), then `commands_init`. That init binds every extcmd with a key, then `C('l')` redraw, `h` help, `j` jump, `k` kick, `l` loot, `C('n')` annotate, `N` name, `u` untrap, `5` run, `M('5')` rush, `-` fight, `M('O')` overview, `M('2')` twoweapon, `M('N')` name. The `#if 0` space→wait (`:2779–2781`) is absent. `bind_mousebtn` (`:2752–2753`) is not called. Named.

Non-initial: if the backup is live, `cmdbind_add(key, cmd, FALSE)` for `N_DIRS` × `N_MOVEMODES`. `N_DIRS` is `N_DIRS_Z - 2` (`hack.h:655`), 8, so up/down stay out of this loop. `MV_WALK` is 0 and `N_MOVEMODES` is 3 (`hack.h:630–636`). Then `num_pad` copies `iflags.num_pad`. `swap_yz` is bit 0 of `num_pad_mode` and `!num_pad`; on a change, ylist `'y' 'Y' C('y') M('y') M('Y') M(C('y'))` swaps with `c+1`. pcHack is bit 0 and `num_pad`; on a change, `M('0')` binds `dotypeinv` or is removed. The `#if 0` `M('5')` swap (`:3402–3408`) is absent. Phone is bit 2 and `num_pad`; on a change, `'1'+i` swaps with `+6` and `M('1')+i` swaps with `+6`, `i` in 0..2. `cmdbind_swapkeys` (`cmd.c:2194–2204`) no-ops unless both nodes exist. After the letter boot, `'y'` has no extcmd node, so the y/z swap does nothing and the later movement bind takes `z`. That is the C order (the FIXME at `:3388`).

Tail, always: `serialno++` only when `updated` is nonzero. `dirchars` is `hykulnjb><` / `hzkulnjb><` / `47896321><` / `41236987><`. `alphadirchars` is `dirchars` or `hykulnjb><`. Backup then `cmdbind_remove`, then `bind_key_fn` of `move_funcs` (`cmd.c:2070–2082`: west through southwest, then down/up which this loop does not reach). Letter layout binds highc run and Ctrl rush. Number pad binds Meta for run only; rush is the same Meta key and is not bound again (`:3471`). `update_rest_on_space`, then `extcmd_char = cmd_from_func(doextcmd)`. JS passes `'#'`, the txt `FUNCT_TXT` stores for `doextcmd`. `cmd_from_func` walks the live binds and skips space until the end (`dokeylist.js:404–421`).

`update_rest_on_space`: if the space bind exists and is not the rest clone, remember it (null cmd included), then bind space to the clone or that saved cmd. The clone is a distinct object (`txt` `wait`, description `"rest one move via 'rest_on_space' option"`). No RNG.

A FALSE call with no slots runs TRUE first, then the FALSE body. The static `backed_dir_cmd` starts false, and JS never ran `options.c:7158`, so that inner call is the missing boot, not a second C site. `user` FALSE writes the slot and drops an overlay mask on that key. A null cmd with slots stores `NULL_BIND` (`_nullBind`). Before slots exist, a null cmd returns without a node. Named.

`optfn_number_pad` copies `num_pad` / `num_pad_mode` onto `game.iflags` when the parse bag is not `game.iflags`, then `reset_commands(false)` (`options.c:2618`). `handler_number_pad` calls it at `:5944`. `rest_on_space` calls `update_rest_on_space` (`options.c:5426`). `get_val` reads `game.Cmd` only when `Cmd.num_pad` is a boolean; before the boot it derives the same four bits from `iflags`. `initoptions_finish` (`options.c:7364`) has no JS site.

`rhack` still takes letter `isMovementKey` / `isRunKey` for movement. Digit keys are what `cmdbind_get` and `getdir` see after this function. Named. `cmdq_add_ec` (`cmd.c:260`) and the dokick door check (`hack.c:1105`) do not call the new `ext_func_tab_from_func`.

## Hallucinations / overclaim

The subject does not say a session boots through `reset_commands(true)` or that `rhack` walks digits. The `#if 0` blocks are ifdef-off in the cited ranges. `bind_mousebtn` is named as not called.

## Density

The 134-line function, `commands_init`, `update_rest_on_space`, and the three compiled callers that have JS sites. `options.c:7158` is the synthetic first call, not a skipped arm of the function.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify reset_commands --base 4373171cb~1 --reach-all`.

```
verify reset_commands: baseline 4373171cb~1 (scoreboard at 41bf49099) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke reset_commands: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
