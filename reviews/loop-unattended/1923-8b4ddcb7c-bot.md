# Review 1923 — 8b4ddcb7c — bot (D-2964)

- SHA: `8b4ddcb7c` (coverage; `botl.c` `bot`, plus `status_eval_next_unhilite` and `hilite_reset_needed`)
- Files: `js/display.js` `bot`. `js/botl.js` replaces the throw with the hilite test and adds the expiry walk. `js/allmain.js`, `js/options.js`, and `js/trap.js` gain the C call sites.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunks. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `_botSuppressed` is gone. `sym.mjs`:

```
bot              js/display.js:7284   ASYNC — await required
bot_via_windowport js/botl.js:2362   sync
status_eval_next_unhilite js/botl.js:636   sync
hilite_reset_needed NOT EXPORTED — local js/botl.js:621
status_update    NOT EXPORTED — local js/botl.js:900
_botSuppressed   NOT FOUND in js/**
```

`hilite_reset_needed` is `staticfn`. One file-local. `imports.mjs --can js/display.js js/botl.js bot_via_windowport` → `ALREADY` (the commit message recorded `SAFE` before that import existed).

## Intent vs deliverable

Subject promises `bot` paints only when HP is not -1, a monster form exists, status updates are on, and the map is not suppressed; the windowport arm calls `bot_via_windowport`; the other arm commits the two status lines; the three flags clear either way. It also promises the hilite expiry walk and a real `hilite_reset_needed`. The diff is those three functions plus the `moveloop`, `reset_needed_visuals`, `swallowed`, and `chest_trap` calls.

## Inventory

| JS | Class | C |
|----|-------|---|
| `bot` | live async `display.js:7284` (no await in the body) | `botl.c:253–271` |
| `_commitStatusLines` | tty cache `:6121` | `curs` / `putstr` / `putmixed` on `WIN_STATUS` |
| `bot_via_windowport` | live sync `botl.js:2362` | `botl.c:962–1279` |
| `status_update` | throw stub `:900` | windowport callback |
| `status_eval_next_unhilite` | live sync `:636` | `botl.c:2278–2316` |
| `hilite_reset_needed` | live file-local `:621` | `botl.c:2257–2274` |
| `Is_Temp_Hilite` | file-local `:613` | `botl.c:675` macro |

## C ↔ JS fidelity

`botl.c:255–270`. `gb.bot_disabled` returns with the flags still set. The paint is `u.uhp != -1 && youmonst.data && iflags.status_updates && !suppress_map_output()`. `VIA_WINDOWPORT()` is `wincap2 & (WC2_HILITE_STATUS | WC2_FLUSH_STATUS)` (`botl.h:213–214`). That arm calls `bot_via_windowport`. The other arm is `curs` / `putstr(do_statusline1())` / `curs` / `putmixed(do_statusline2())`. Then `disp.botl = disp.botlx = disp.time_botl = FALSE`. No RNG.

JS `:7286` returns on `_bot_disabled`. `:7292–7295` is the four-part gate. Undefined `status_updates` stays enabled; `false` and `0` skip. A missing `youmonst.data` skips the paint. `install_tty_wincap2` (`display.js:8210`) stores only `WC2_URGENT_MESG | WC2_SUPPRESS_HIST`, so the mask is clear and the tty arm runs. That arm clears `_statusSuppressed` and calls `_commitStatusLines`, which is `do_statusline1` via `_statusLine1` (`:5880`) and `_statusLine2`. The windowport arm calls `bot_via_windowport` with no await. Both `flags` and `disp` copies of the three bits clear after a skipped paint. `bot` is `async` with no `await`, so `void bot()` in `swallowed` (`:5349`) still finishes the cache update before the map walk.

`hilite_reset_needed` (`:2257–2274`): non-zero `gm.multi` returns false; a rule that is not `BL_TH_UPDOWN` returns false; `time == 0` or `time >= augmented_time` returns false; otherwise true. JS `:621–628` is that order. `Is_Temp_Hilite` is `rule && rule.behavior == BL_TH_UPDOWN`.

`status_eval_next_unhilite` (`:2285–2315`): store `moves`, then for each field, if `chg` stamp `time` (`bl_hilite_moves + hilite_delta` for a temp rule, else 0), copy it to the previous slot, clear both `chg`, set `disp.botl`. If `disp.botl` is set, skip the due-time test. Otherwise a positive `time` that is the soonest and that `hilite_reset_needed(curr, time + 1)` accepts becomes `next_unhilite`, and a value already below `bl_hilite_moves` sets `disp.botl`. JS `:636–668` is that loop. A missing row reads as no `chg` and `time` 0. The `continue` reads `flags.botl`, which this function sets together with `disp.botl`. `allmain.c:405–407` is `if (iflags.hilite_delta)` inside `STATUS_HILITES`. JS `allmain.js:1295` is that `if`. `botl.c:1578` now passes `bl_hilite_moves` (`botl.js:968`).

`options.c:9006` `disp.botl || disp.botlx` → `options.js:7429`, which also accepts the `flags` copies. `trap.c:6494` → `trap.js:8113`. `display.c:1339` `swallowed` → `:5349`.

## Hallucinations / overclaim

The subject says no arm of the three functions is omitted. The disabled return, the four-part gate, both paint arms, the flag clear, the `chg` stamp, and the due-time test are present. `status_update` (`botl.js:900`) still throws. It is reached from `bot_via_windowport` (`:992`), which `bot` calls only when the windowport bits are set. Those bits are not installed, and the commit names the throw. `timebot` (`:7328`) still calls `bot()` and does not test `suppress_map_output` first; that function was not in this diff, and the D-log names it. `wintty.c:436` is the resize `bot()` after `docrt_flags`; there is no JS resize handler. That is named, not a gameplay caller left silent.

## Density

The coverage row asked for `bot`. The 12-line body shipped with the two same-file hilite functions the row's callees needed. Not an arm peel. The windowport callback stays the named throw.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify bot --base 8b4ddcb7c~1 --reach-all`.

```
verify bot: baseline 8b4ddcb7c~1 (scoreboard at a6c00e025, 2026-09-27T11:47:21.612Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify bot: no corpus session is blocked on it at 8b4ddcb7c~1 — a vacuous verify is NOT a corpus PASS. …
smoke bot: no RNG-tagged reach; fixed smoke spread (12 run, 3.5s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty blocked-line is the vacuous note. No `REGRESSED` session. The D-log's green, strict, cohort, and full 44/44 are the port's own verify line (`display.js` and `allmain.js` are shared).

## Actionable C-wrongs

None. The windowport `status_update` throw is named and not on the installed tty capability mask.

Verdict: **ACCEPT**
