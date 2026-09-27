# Review 1925 — b43d2c68f — auto_describe (D-2966)

- SHA: `b43d2c68f` (coverage; `getpos.c` `auto_describe`)
- Files: `js/getpos.js` adds `auto_describe` and `curs_win_map`; `js/cmd.js` `doclicklook` awaits the export.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunks. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs`:

```
auto_describe    js/getpos.js:638   ASYNC — await required
curs_win_map     NOT EXPORTED — local js/getpos.js:613
auto_describe_text js/getpos.js:595   sync
custompline      js/display.js:7842   ASYNC — await required
do_screen_description js/pager.js:1383   sync
is_valid_travelpt js/cmd.js:4077   ASYNC — await required
```

`imports.mjs --can js/getpos.js js/cmd.js is_valid_travelpt` and `--can js/cmd.js js/getpos.js auto_describe` both print `ALREADY`. Each binding is read only inside a function, so the cycle is not a top-level TDZ read.

## Intent vs deliverable

Subject: there was no `auto_describe`; the autodescribe arm preferred `describeAt` or a firstmatch helper, wrote `_pending_message`, and flushed with the cursor forced onto the cell; `doclicklook` imported a missing export. It promises one function in C order, five `%s` through `custompline`, predicates behind their flags, both callers wired, and the WIN_MAP cursor applied after `flush_screen(0)` because JS flush parks on the hero.

The diff adds `curs_win_map` and `auto_describe`, replaces the getpos autodescribe arm with `await auto_describe(cx, cy)`, and makes `doclicklook` a static import plus await. `auto_describe_text` stays the firstmatch helper.

## Inventory

| JS | Class | C |
|----|-------|---|
| `auto_describe` | live async `getpos.js:638` | `getpos.c:640–662` |
| `do_screen_description` | live sync | looked TRUE, `sym` 0, `firstMatch.v` starts `"unknown"` |
| `coord_desc` | live sync `display.js:7571` | return string stands in for the `tmpbuf` out-param |
| `custompline` | live async | three flags, five `%s` |
| `is_valid_travelpt` | live async `cmd.js:4077` | only when `getloc_travelmode` |
| `curs_win_map` | local WIN_MAP slice | `wintty.c:2113–2123` (`curx = --x`, `y += offy`) |
| `flush_screen` | live async | called with `0` |

## C ↔ JS fidelity

`getpos.c:648–650`: a false `do_screen_description` returns without a message and without moving the cursor. JS returns at `:648` the same way.

On a hit, C writes `coord_desc` into `tmpbuf`, then `custompline` with `firstmatch`, a space only when `*tmpbuf` is non-empty, the coord text, `" (invalid target)"` only when `autodescribe && getpos_getvalid && !(*getpos_getvalid)(cx, cy)`, and `" (no travel path)"` only when `getloc_travelmode && !is_valid_travelpt`. Both `&&` chains match (`:656`, `:662`). No `rn2`.

C then `curs(WIN_MAP, cx, cy)` and `flush_screen(0)` (`:659–660`). JS does `await flush_screen(0)` then `curs_win_map`. C `flush_screen` moves to the hero only when `cursor_on_u` is set (`display.c:2262–2263`). JS `_buildScreenOutput` always `setCursor`s the hero when `u.ux > 0` (`display.js:6496–6502`) and ignores the mode. The swap puts the cursor back on the cell after that paint. `curs_win_map` is `setCursor(x - 1, y + 1)`: contest 80×24, `offx` 0, `offy` 1, clipping off. Full `tty_curs` (other windows, clipping, `cmov`/`nocmov`) is the named omit.

Callers: `getpos.c:866` (`autodescribe && !msg_given`) → `getpos.js:1381`, and that arm no longer uses `describeAt`. `cmd.c:5383–5389` `doclicklook` → `cmd.js:2356–2362` (`isok`, `context.move = 0`, await, `ECMD_OK`).

## Hallucinations / overclaim

"Keeps that C order" is the print and the two predicates. The message then states the curs/flush swap. The cell is the cursor after the function returns. `custompline` with `NO_CURS_ON_U` also flushes with mode 0 (`display.js:8267`), which parks on the hero before the explicit flush; the following `curs_win_map` is what the next read sees.

## Density

The whole 18-line body shipped. Both C callers are wired. `auto_describe_text` is not a second `auto_describe`; `show_glyph` and `dolookaround` do not call this function in C.

## Verification

```
verify auto_describe: baseline b43d2c68f~1 (scoreboard at 8b4ddcb7c, 2026-09-27T12:13:22.820Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify auto_describe: no corpus session is blocked on it at b43d2c68f~1 — a vacuous verify is NOT a corpus PASS. ...
smoke auto_describe: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the vacuous note matches. D-2966 also records green 2/2, strict ×2, cohort 7/7, and a full `sessions` 44/44 in that commit. This re-run shows no `REGRESSED` session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
