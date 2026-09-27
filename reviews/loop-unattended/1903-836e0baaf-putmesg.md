# Review 1903 — 836e0baaf — putmesg (D-2944)

- SHA: `836e0baaf` (coverage; `pline.c` `putmesg`, plus the tty message arm it calls)
- Files: `js/display.js` adds file-local `putmesg`, `putstr`, `show_topl`, and splits `update_topl` so a wait is a real `more()` promise. `pline_after_consume` calls `putmesg` before the trailer.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, or `fastforward` in the `js/` hunks. `seed0014` appears in the commit message as the screen that failed the first full run, not in control flow. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- Nothing was deleted and re-pointed. `sym.mjs` (C `putmesg` / `tty_putstr` / `update_topl` / `show_topl` are not exports; one file-local each is the static, not a second clone):

```
putmesg          NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/display.js:8177
putstr           NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/display.js:8127
update_topl      NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/display.js:7997
show_topl        NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/display.js:8075
SoundSpeak       js/sndprocs.js:67   sync
```

**Addressed:** D-2952 `7661793ac`

## Intent vs deliverable

Subject promises one file-local `putmesg` in C order: return on `debug_prevent_pline`, OR `ATR_URGENT` / `ATR_NOHISTORY` when `wincap2` has the bits, `putstr(WIN_MESSAGE)`, then `SoundSpeak`. The diff is that function, a message-window `putstr`, `show_topl`, and the `update_topl` split. `wincap2` stays 0, so both ORs stay clear.

## Inventory

| JS | Class | C |
|----|-------|---|
| `putmesg` | file-local (C `staticfn`) `display.js:8177` | `pline.c:64–80` |
| `putstr` | file-local message arm `:8127` | `wintty.c:2225–2301` |
| `update_topl` | file-local `:7997` | `topl.c:250–302` |
| `show_topl` | file-local `:8075` | `topl.c:144–166` |
| `SoundSpeak` | live no-op `sndprocs.js:67` | `sndprocs.h:275` (`!SND_LIB_*`) |
| `pline_after_consume` | caller `:8204` | `pline.c:276` |

## C ↔ JS fidelity

`pline.c:68–79`. `attr` starts `ATR_NONE`. `iflags.debug_prevent_pline` returns before `putstr` and before `SoundSpeak`. `URGENT_MESSAGE` and `WC2_URGENT_MESG` OR `ATR_URGENT`. `SUPPRESS_HISTORY` and `WC2_SUPPRESS_HIST` OR `ATR_NOHISTORY`. Then `putstr(WIN_MESSAGE, attr, line)` and `SoundSpeak(line)`. JS `:8178–8191` is that order. A `more()` inside `putstr` resolves before `SoundSpeak`. `sndprocs.h:193–197` enables the speaking macro only for `SND_LIB_*`. The `#else` at `:275` is empty. `SoundSpeak` ignores its argument. The one C caller is `pline.c:276` (the `:12` line is the prototype). `pline_after_consume` awaits that wait, then sets `prevmsg` and runs the trailer (`:8220–8224`).

`wintty.c:111–119` sets `WC2_URGENT_MESG | WC2_SUPPRESS_HIST` on tty `wincap2`. `game.windowprocs.wincap2` is unset (`allmain.js:207`, `options.js:1060`). Both ORs stay 0. `putstr` therefore always takes `update_topl`. `show_topl` does not run.

`wintty.c:2260–2300`, message arm. Urgent and `WIN_STOP`: clear the window and the stop bit, then set `WIN_NOSTOP`. History off: `remember_topl` then `show_topl`. Else `update_topl`. Then `cw->flags &= ~WIN_NOSTOP` on every message, including one that did not set the urgent attribute. JS `:8135–8158` sets and clears `_win_nostop` only when `attr & ATR_URGENT`. With `wincap2` at 0 that attribute is never set, so the clear does not run. `urgent_pline` (`:8232–8247`) sets `_win_nostop` before `vpline` and clears it in `finally`, so the bit stays set through `putstr` and through the trailer `more()`. C clears it before `putstr` returns, so the trailer does not see it. The inner `update_topl` `more()` is the one C's one-shot covers.

`update_topl` (`topl.c:257–301`). `skip` is `(WIN_STOP|WIN_NOSTOP)==WIN_STOP`. Append when `NEED_MORE || skip`, `cury==0`, room (`n0 + strlen + 3 < CO - 8`), and `strncmp(bp, "You die", 7) != 0` (that assignment is the last `&&` term). Else if not skip and `NEED_MORE`, `more()`, else the `cury` `docorner` arm. Then `remember_topl`, copy, wrap spaces to newlines, clear `WIN_STOP` when `!notdied`, `redotoplin` when not skip. JS `:8000–8017` matches skip, the room test, and the 7-character "You die" assignment. It does not test `cury==0`. The `docorner` arm is the named omit. `more()` in JS clears `_toplines` (`:7319`), so `remember_topl` runs before the wait; `remember_topl` (`:2561`) returns on an empty buffer, and the second call in `update_topl_rest` is a no-op. `strncmp` versus `startsWith('You die')` agrees on those seven characters.

`show_topl` (`topl.c:150–165`) clears both stop bits, clears the window when `ttyDisplay->cury` and `NON_EMPTY`, homes, `addtopl`, then `NON_EMPTY` when `cury` and not `SPECIAL_PROMPT`. JS `:8076–8112` is that shape and is not reached while `wincap2` is 0. `HUPSKIP`, `WIN_ERR` `tty_raw_print`, `compress_str`, `end_glyphout`, and the other window types are named and are not on `putmesg`'s `WIN_MESSAGE` call.

## Hallucinations / overclaim

The subject says no arm of `putmesg` is omitted. The return, both attribute ORs, `putstr`, and `SoundSpeak` are present. It also says the ORs stay clear because `wincap2` is unset. That is true, and it is why `tty_putstr`'s unconditional `WIN_NOSTOP` clear (`:2300`) is not what `putstr` does. The promise-only-on-`more()` note is the await boundary, not a seed test. `seed0014` is the verify anecdote in the message.

## Density

The coverage row asked for `putmesg`. The 17-line body shipped, and its one caller is wired. `putstr` / `update_topl` / `show_topl` are the callees of that call, not a second subsystem. The `WIN_NOSTOP` clear is one statement in the live message arm.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify putmesg --base 836e0baaf~1 --reach-all`.

```
verify putmesg: baseline 836e0baaf~1 (scoreboard at b88b8599f, 2026-09-27T02:19:54.792Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify putmesg: no corpus session is blocked on it at 836e0baaf~1 — a vacuous verify is NOT a corpus PASS. …
smoke putmesg: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, cohort, and full 44/44 are the port's own verify line (`display.js` is shared). The subject says the first full run was 43/44 and the re-run passed.

## Actionable C-wrongs

1. `tty_putstr` (`wintty.c:2300`) clears `WIN_NOSTOP` on every message-window call. `putstr` clears it only when this call's `ATR_URGENT` bit is set. `wintty.c:119` advertises `WC2_URGENT_MESG | WC2_SUPPRESS_HIST`. Leave those bits on `windowprocs.wincap2` so `putmesg` sets the attributes, and clear `_win_nostop` at the end of every message `putstr` so it does not survive into the vpline trailer. `urgent_pline` (`display.js:8232–8247`) is the stand-in that depends on the missing clear.

Verdict: **QUALITY-RISK**
