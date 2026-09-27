# Review 1886 — 84b9c5dc9 — end_of_input (D-2927)

- SHA: `84b9c5dc9` (coverage; `cmd.c` `end_of_input`)
- Files: `js/cmd.js` (`end_of_input`, `tty_exit_nhwindows`, `exit_nhwindows`, `hangup` now async). `js/end.js` adds `nh_terminate`. `js/allmain.js` awaits the call in `moveloop_core`.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` diff. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs` (new imports `clearlocks` and `nh_terminate`; both already exported, not local clones):

```
clearlocks       js/files.js:532   sync
nh_terminate     js/end.js:993   sync
dosave0          js/save.js:463   ASYNC — await required
free_pickinv_cache js/invent.js:3833   sync
```

`imports.mjs --can js/cmd.js js/files.js clearlocks` → `ALREADY`. `--can js/cmd.js js/end.js nh_terminate` → `ALREADY`.

## Intent vs deliverable

Subject promises `end_of_input` awaits `dosave0`, then the sound hook, `exit_nhwindows(null)`, `clearlocks`, and `nh_terminate(0)`. The diff does that. `NOSAVEONHANGUP` has no definition (`csym --macro`). `SAFERHANGUP` is `unixconf.h:301`, so the `done_hup++` guard around `dosave0` is compiled out. No RNG.

## Inventory

| JS | Class | C |
|----|-------|---|
| `end_of_input` | async `cmd.js:343` | `cmd.c:5182–5209` |
| `dosave0` | live async | `cmd.c:5200` |
| `exit_nhwindows` / `tty_exit_nhwindows` | file-local | `wintty.c:809–845` |
| `free_pickinv_cache` | live sync | `wintty.c:818` |
| `clearlocks` | live `files.js:532` | `files.c:732–750` |
| `nh_terminate` | live `end.js:993` | `end.c:1673–1703` |
| `hangup` | async `cmd.js:974` | `cmd.c:5158–5180` |
| `moveloop_core` | `allmain.js:1098` | `allmain.c:183` |
| `rhack` | `cmd.js:4544` | `cmd.c:3640` |
| `readchar_core` | `cmd.js:1042` | `cmd.c:5245` |

## C ↔ JS fidelity

`cmd.c:5185–5194`: the `NOSAVEONHANGUP` block is not compiled. The tutorial arm sets `something_worth_saving = 0`. JS does that via `In_tutorial`.

`cmd.c:5196–5200`: with `SAFERHANGUP`, `dosave0()` runs whenever `something_worth_saving` is still set. JS awaits it. The old float is gone.

`cmd.c:5201–5204`: if `sound_exit_nhsound` is set, call it with `"end_of_input"`. If `window_inited`, `exit_nhwindows(NULL)`. JS calls the pointer only when it is a function, then the local `exit_nhwindows`. An installed `win_exit_nhwindows` replaces the tty body, which is what the macro does.

`wintty.c:814–844`: `free_pickinv_cache`, the non-base windows, `WIN_MAP` / `WIN_MESSAGE` / `WIN_INVEN` / `WIN_STATUS = WIN_ERR`, `term_shutdown`, `window_inited = 0`. JS runs the cache clear, assigns the four ids `WIN_ERR`, and clears `window_inited`. `settty`, `tty_raw_print("")`, `wins[]`, `BASE_WINDOW`, `ttyDisplay`, and `term_shutdown` are named: there is no tty object, and the function does not paint a second frame.

`files.c:732–750`: if `preserve_locks`, return. Ignore signals. `delete_levelfile` from `maxledgerno()` down through 0. `files.js:532–537` is that loop on the in-memory level slots. Signal ignore is named (no JS signals). `HANGUPHANDLING` is `global.h:278`, so the preserve-locks return is live.

`end.c:1673–1703`: `in_moveloop = 0`, `l_nhcore_call`, then if not panicking `freedynamicdata`, `dlb_cleanup`, `l_nhcore_done`, then `exiting = 1` and `nethack_exit(status)`. `MACOS9` and `VMS` are not this build. JS sets `in_moveloop = 0`, `exiting = 1`, `exit_status`, and `gameover`. The three cleanup calls are an empty block. Named: no Lua core, `freedynamicdata` unported, `dlb_cleanup` is a data-library file. Unix `nethack_exit` is `exit`; scored JS cannot exit the process.

`cmd.c:5158–5179` `hangup`: if `exiting`, clear `in_moveloop`; `nhwindows_hangup()`; `done_hup++`; return while `in_moveloop && something_worth_saving`; else `end_of_input`. JS matches except `nhwindows_hangup`, which stays named. `readchar_core` still stores `ESC` after `hangup`, which is the C line after a hangup that returned. When C actually calls `nh_terminate`, that store is not reached.

C callers of `end_of_input`: `allmain.c:183`, `cmd.c:3640`, and `hangup` at `cmd.c:5179`. `cmd.c:5245` calls `hangup`. All three await. Other `nh_terminate` sites (`earlyarg.c:439`, `end.c:1589`, `save.c:65`) stay on the older helpers. Named. They are not callers of `end_of_input`.

## Hallucinations / overclaim

The subject says no compiled arm of `end_of_input` is omitted. The tutorial clear, the `SAFERHANGUP` save, the sound hook, window teardown, `clearlocks`, and `nh_terminate(0)` are present. The `NOSAVEONHANGUP` arms are not in the unix compile. The empty `nh_terminate` cleanup is a named omit of three callees, not a second `end_of_input`. `clearlocks` is the live export, not a no-op.

## Density

The coverage row asked for the whole function. The compiled body shipped. Callers that already invoked it now await `dosave0`. No stub arm inside `end_of_input`.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify end_of_input --base 84b9c5dc9~1 --reach-all`.

```
verify end_of_input: baseline 84b9c5dc9~1 (scoreboard at b88b8599f, 2026-09-27T02:19:54.792Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify end_of_input: no corpus session is blocked on it at 84b9c5dc9~1 — a vacuous verify is NOT a corpus PASS. …
smoke end_of_input: no RNG-tagged reach; fixed smoke spread (12 run, 3.4s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, cohort, and full 44/44 are the port's own verify line (`allmain.js` is shared).

## Actionable C-wrongs

None. A hangup that is still worth saving awaits `dosave0`, then clears the window ids and the in-memory level slots, then sets `gameover`.

Verdict: **ACCEPT**
