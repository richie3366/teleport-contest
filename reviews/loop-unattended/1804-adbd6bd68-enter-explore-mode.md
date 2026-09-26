# Review 1804 — adbd6bd68 — enter_explore_mode (D-2845)

- SHA: `adbd6bd68` (coverage; `cmd.c` `enter_explore_mode`)
- Files: `js/cmd.js` (+137), `js/allmain.js` (+7), `js/getline.js` (+11)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, seed name, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `enter_explore_mode`: the already-explore `You`, otherwise `authorize_explore_mode`, the non-wizard refusal or the wizard note, the Beware line, and `paranoid_query`. Yes sets explore and clears wizard. No leaves the mode flags. Both arms clear the message window. `moveloop_preamble` calls it when a restore has `deferred_X`. `#exploremode` and M-X run the same function. `check_user_string` allows a leading `*`, matches `plname` when `sysopt.check_plname` is set, and otherwise asks `get_unix_pw`. The diff adds those functions, the preamble call, and an `EXT_CMDS` row. It does not change `set_playmode`.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `enter_explore_mode` | async export `cmd.js:222` | `cmd.c:952–983` |
| `authorize_explore_mode` | sync export `cmd.js:203` | `unixmain.c:640–651` |
| `check_user_string` | sync export `cmd.js:166` | `unixmain.c:695–729` |
| `get_unix_pw` | STUB, named `cmd.js:154` | `unixmain.c:731–760` |
| `wizardOn` / `discoverOn` | local aliases `cmd.js:128` / `:132` | `flag.h:30,33` |
| `cIsspace` | local | C `isspace` |
| `paranoid_query` | LIVE `getline.js:1422` | `cmd.c` via `ParanoidQuit` |
| `You` / `pline` / `clear_nhwindow_message` | LIVE imports | the message arms |

`sym.mjs` (nothing deleted or re-pointed):

```
enter_explore_mode     js/cmd.js:222   ASYNC — await required
authorize_explore_mode js/cmd.js:203   sync
check_user_string      js/cmd.js:166   sync
get_unix_pw            NOT EXPORTED — local js/cmd.js:154
wizardOn               NOT EXPORTED — local js/cmd.js:128
discoverOn             NOT EXPORTED — local js/cmd.js:132
paranoid_query         js/getline.js:1422   ASYNC — await required
```

## C ↔ JS fidelity

`csym` body is `cmd.c:951–983`. Callers the tool prints: `allmain.c:54` and the `cmd.c:24` extern. The extcmd row is a function pointer, not a call, so `csym --callers` misses it. The row is `cmd.c:1720–1721`: `M('X')`, `"exploremode"`, flags `IFBURIED|GENERALCMD|NOFUZZERCMD` (1|8|32 = 41, the generated `extcmdlist` row, key 216). JS `EXT_CMDS` adds that name with `autocomplete: false`, matching the C comment that `#e` must stay enhance. `rhack`'s bound path looks up the generated key and `extcmd_run_by_txt`. M-X and `#exploremode` both reach the export.

`allmain.c:53–54` is `if (resuming && iflags.deferred_X) enter_explore_mode()` before `phase_of_the_moon`. JS `moveloop_preamble` awaits it in that place.

Branch order:

1. `discover` → `You("are already in explore mode.")`. JS `discoverOn` is `flags.explore || flags.discover`. The only write of `flags.discover` is this function's yes arm, next to `flags.explore`. The extra read does not open a second gate.
2. `oldmode` is `"normal game"` unless `wizard`, else `"debug mode"`. `wizardOn` also reads `flags.wizard` and `game.wizard`. The yes arm clears all three with `flags.debug`. No `js/` assignment sets `game.wizard = true`.
3. `!authorize_explore_mode()`. SYSCF is on (`config.h:232–234`). Empty or missing `sysopt.explorers` sets `iflags.explore_error_flag` and returns false. A non-empty list returns true only when `check_user_string` matches. The `#else return TRUE` is not compiled.
4. Failure and `!wizard` → `You("cannot access explore mode.")` and `ECMD_OK`. Failure and wizard → the Note `pline`, then fall through.
5. Beware `pline` with `oldmode`. `pline` is `vpline`, so `%s` is substituted.
6. `paranoid_query(ParanoidQuit, …)`. `ParanoidQuit` is `(flags.paranoia_bits & PARANOID_QUIT) != 0` (`flag.h:558`, bit `0x0002`). JS passes that boolean. Yes sets `discover` and clears `wizard`, then `clear_nhwindow(WIN_MESSAGE)`, then the non-scoring `You`. No clears the window, then `pline("Continuing with %s.", oldmode)`. Flags are not touched on No. Return `ECMD_OK`. No RNG.

`check_user_string`: leading `*` (`charCodeAt(0) === 42`) returns true. Else `sysopt.check_plname` uses `game.plname`; otherwise `get_unix_pw()`. A word matches on `strncmp` of `pwlen` with the next character NUL or space. Spaces are skipped. `cIsspace` is the C locale set (space, tab, LF, VT, FF, CR).

`get_unix_pw` returns null. C caches `getlogin` / `USER` / `getpwuid` (`:731–759`). Scored ESM has no passwd database. Named in `turns.md`. With the stub, a non-`*` EXPLORERS list authorizes only when `check_plname` is set and `plname` is a whole word on the list. `CHECK_PLNAME` stays the named-true config sink, so that flag stays unset until something stores it. The `*` arm does not need the password.

Other `check_user_string` sites: `authorize_wizard_mode` (`unixmain.c:631`) and `dosh` (`unixunix.c:350`, `#ifdef SHELL`). Neither function is in `js/`. Not a missed re-point of a live caller.

`authorize_explore_mode`'s other caller is `set_playmode` (`options.c:10148`). `js/options.js:793–802` still skips it. The map names that: an empty EXPLORERS list would clear `playmode:explore`, and the green gate starts that way. The VMS, Windows, pc, and libnh copies are other ports. This build is the UNIX body.

## Hallucinations / overclaim

The subject says `#exploremode` and M-X had a command row and no function. The generated row (key 216) predates this commit; the runnable `EXT_CMDS` entry is what this diff adds. It says a normal save restored under an explore request never ran the confirm. `moveloop_preamble` now does, under `resuming && deferred_X`, which is the C `if`. It says `get_unix_pw` returns null. The function does. It does not claim the passwd lookup matches C. `set_playmode` is named as still unwired, and the diff does not touch it.

## Density

The whole `enter_explore_mode` body, both call sites that exist in this tree, and the UNIX authorize/check pair. `get_unix_pw` is a named omit, not a silent stub inside the command. `set_playmode`'s authorize call stays a named caller gap on a function this commit did not claim to finish. C for the command is 33 lines.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify enter_explore_mode --base adbd6bd68~1 --reach-all`.

```
verify enter_explore_mode: baseline adbd6bd68~1 (scoreboard at f71b591e6) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke enter_explore_mode: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. D-2845 says the same. No `REGRESSED` session. The parent scoreboard stamp is still `f71b591e6`; the blocked count is 0 either way. Green, strict, cohort, and full 44 were not re-run in this audit.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
