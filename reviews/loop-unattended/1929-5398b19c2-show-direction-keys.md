# Review 1929 — 5398b19c2 — show_direction_keys (D-2970)

- SHA: `5398b19c2` (coverage; `cmd.c` `show_direction_keys`)
- Files: `js/dokeylist.js` (`+36/−34`), `js/lock.js` (`+2/−36`). The lock.js function is deleted; `help_dir` calls the export.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunks (`NODIAG` is the grid-bug macro, not a diagnostic). `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs`:

```
show_direction_keys js/dokeylist.js:692   sync
cmd_from_func    js/dokeylist.js:473   sync
visctrl          js/dokeylist.js:58   sync
cmd_from_dir     js/dokeylist.js:567   sync
```

The deleted lock.js body called `cmd_from_dir`. `lock.js` no longer references it. `imports.mjs --can js/lock.js js/dokeylist.js show_direction_keys` prints `ALREADY` (the import line was already there for `visctrl`). The call is inside `help_dir`, not at module top level.

## Intent vs deliverable

Subject: the key-list grid always used the default `!num_pad` letters, a hardcoded `.`, and `?` when a direction was unbound. It never drew the cardinal-only cross. Direction help had a second copy of the same C function.

The diff replaces `dokeylist.js` `show_direction_keys(lines)` with `(lines, centerchar, nodiag)`, labels via `visctrl(cmd_from_func(ecname))`, and adds the `nodiag` cross. `dokeylist_lines` passes `'.'` and false. `help_dir` passes `'.'` or `' '` and a grid-bug test. The lock.js copy is gone.

## Inventory

| JS | Class | C |
|----|-------|---|
| `show_direction_keys` | live sync `dokeylist.js:692` | `cmd.c:4121–4165` |
| `cmd_from_func` | live sync `dokeylist.js:473` | `cmd.c:3035–3066` |
| `visctrl` | live sync `dokeylist.js:58` | `hacklib.c:468–493` |
| `efTxt` | string stand-in for `ef_funct` | `cmd.c:2008–2022` `ef_txt` |
| `lines.push` | caller text-window buffer | `putstr(win, 0, buf)` |
| `cmd_from_dir` | not called | old lock.js clone only |

Callers: `cmd.c:2919` `dokeylist` → `js/dokeylist.js:754`. `cmd.c:4268` `help_dir` → `js/lock.js:263`. `cmd.c:139` is the prototype.

## C ↔ JS fidelity

`if (!centerchar) centerchar = ' '`. C's `char` is falsy only for `'\0'`. Both live callers pass `'.'` or `' '`, which stay. A numeric code is turned into a character; C already receives a `char`. No `rn2`.

`nodiag` true is the cardinal grid, in order: `do_move_north`, the bar line `"             |   "`, `west - center - east`, the bar again, `do_move_south`. False is the eight-way grid: northwest/north/northeast, `"           \\ | / "`, the same west/center/east line, `"           / | \\ "`, southwest/south/southeast. The JS template strings are those `Sprintf` formats. `VISCTRL_NBUF` is 5 (`hacklib.c:466`), so three `visctrl` results in one `Sprintf` do not alias. JS builds a new string per call, so the three labels stay distinct the same way.

Each label is `visctrl(cmd_from_func(do_move_*))`. The extcmd `ef_txt` values are `movenorth`, `movewest`, `moveeast`, `movesouth`, `movenorthwest`, `movenortheast`, `movesouthwest`, `movesoutheast` (`cmd.c:2008–2022`, same rows in `extcmdlist_data.js`). `efTxt` returns a string argument unchanged, and `cmd_from_func` matches `binds[i].txt` to that name: the port's stand-in for `bind->cmd->ef_funct == fn`. The walk skips space until the last-resort `cmdbind_get(' ')`, skips digits and `'-'` on `fight` when `!num_pad`, returns a printable match immediately, and otherwise keeps the oldest non-printable. Unbound returns 0. `visctrl(0)` is `^@` (`c < 040`, `c | 0100`), which is what C prints. The old `?` fallback is gone.

`visctrl` matches the C cases: high bit → `M-` and mask `0177`; below space → `^` plus `c | 0100`; DEL → `^?`; else the character itself.

`help_dir` computes `nodiag` as `u.umonnum === PM_GRID_BUG`, which is `NODIAG` (`hack.h:1414`). The center character is `!prefixhandling ? '.' : ' '`. `prefixhandling` is `spkey !=` the ESC special key, matching `cmd.c:4184–4185`. `dokeylist` passes `'.'` and false, matching `cmd.c:2919`.

`putstr` into `NHW_TEXT` is the caller's `lines` array. `dokeylist_lines` returns that array for the key-list window. `help_dir` keeps pushing and the existing text-page display shows it. Neither caller drops the five grid lines.

## Hallucinations / overclaim

The subject does not claim `help_dir`'s other arms. The `#if 0` bad-prefix block stays compiled out, as the comment at `lock.js:214` says. `cmd_from_dir` remains exported; this commit only stops `help_dir` from using it. No arm of `show_direction_keys` is a stub.

## Density

Both grids and both C callers shipped. The deleted lock.js copy was the second body, not a leftover arm. Insertions are small because the eight-way spacing was already in the old key-list function; the new work is the live bind lookup and the cardinal cross.

## Verification

```
verify show_direction_keys: baseline 5398b19c2~1 (scoreboard at f02368fbc, 2026-09-27T13:32:22.826Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify show_direction_keys: no corpus session is blocked on it at 5398b19c2~1 — a vacuous verify is NOT a corpus PASS. ...
smoke show_direction_keys: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks. D-2970 records green 2/2, strict ×2, cohort 7/7, and skip full. This re-run shows no `REGRESSED` session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
