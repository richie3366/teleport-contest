# Review 1888 — 4df3fffc0 — whatdoes_help (D-2929)

- SHA: `4df3fffc0` (coverage; `pager.c` `whatdoes_help`)
- Files: `js/pager.js` only. File-local `whatdoes_help` rewritten. Caller `dowhatdoes` already awaits it for `'&'` and `'?'` (`pager.js:3116`).
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, seed names, or `fs` reads in the `js/` diff. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs` (`readDat` stays the file-local `DAT_TEXT` reader; `whatdoes_help` stays file-local, matching C `staticfn`):

```
whatdoes_help    NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/pager.js:3060
readDat          NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/pager.js:133
flush_topl_more  js/display.js:7479   ASYNC — await required
```

One local each, not a second copy.

## Intent vs deliverable

Subject promises `fgets` keeps a newline that fits in `BUFSZ-1`, `'#'` skips the chunk, leading space and tab are stripped, and `show_text_pages` still runs `compress_str` on that newline. The diff is that loop. `readDat(KEYHELP)` reads `DAT_TEXT["keyhelp"]`. No RNG.

## Inventory

| JS | Class | C |
|----|-------|---|
| `whatdoes_help` | file-local async `pager.js:3060` | `pager.c:2420–2445` static |
| `readDat` | file-local `pager.js:133` | `dlb_fopen(KEYHELP, "r")` |
| `KEYHELP` | `const.js:918` `"keyhelp"` | `global.h:17` |
| `show_text_pages` / `wrap_text_window_line` | live | `putstr` + `display_nhwindow` |
| `compress_str` | live `pager.js:212` | `wintty.c` NHW_TEXT |
| `flush_topl_more` | live async | `display_nhwindow(WIN_MESSAGE, TRUE)` |
| `dowhatdoes` | `pager.js:3116` | `pager.c:2696` |

## C ↔ JS fidelity

`pager.c:2427–2431`: `dlb_fopen(KEYHELP, "r")`. On failure, `pline("Cannot open \"%s\" data file!", KEYHELP)` and `display_nhwindow(WIN_MESSAGE, TRUE)`, then return. JS uses `readDat(KEYHELP)`. `KEYHELP` is `"keyhelp"`. A null text takes that `pline` and `flush_topl_more`. No filesystem call.

`pager.c:2434–2440`: `dlb_fgets(buf, sizeof buf)` with `buf[BUFSZ]`. A chunk whose first byte is `'#'` is skipped. Then a scan skips leading `' '` and `'\t'` and `putstr`s the rest, newline included when `fgets` stored it. JS takes at most `BUFSZ - 1` bytes, includes a newline that sits inside that window, skips `buf[0] === '#'` before the strip, and pushes `buf.slice(p)`. A line longer than the window continues on the next chunk, which is what `fgets` does.

`compress_str` (`pager.js:212–226`) turns `'\n'` into a space and collapses a run, and it runs when the string contains a newline even if the line is shorter than the width. `wrap_text_window_line` calls it before paging (`pager.js:243`). `show_text_pages` paints those wrapped lines. That is the NHW_TEXT `putstr` path. The old `split('\n')` dropped the newline, so `compress_str` returned the line unchanged and a period-plus-indent stayed two spaces. This loop keeps the newline.

`pager.c:2442–2444`: close, `display_nhwindow(tmpwin, TRUE)`, `destroy_nhwindow`. JS has no `wins[]`. `show_text_pages` is that page, including the trailing `--More--`. Named.

The only C call is `pager.c:2696`, inside `q == '&' || q == '?'`. `pager.js:3116` awaits it for char codes 38 and 63. `pager.c:34` is the prototype.

## Hallucinations / overclaim

The subject says no arm of `whatdoes_help` is omitted. The missing-file arm, the `'#'` skip, the whitespace strip, and the text page are present. `dlb_fopen` is not a stubbed callee left in the arm: the bytes are the embedded `DAT_TEXT` entry, which is the Rule #2 stand-in the subject names. `create_nhwindow` is not a second window object.

## Density

The coverage row asked for the whole function. C is 26 lines. The whole body shipped. The one caller was already wired.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify whatdoes_help --base 4df3fffc0~1 --reach-all`.

```
verify whatdoes_help: baseline 4df3fffc0~1 (scoreboard at b88b8599f, 2026-09-27T02:19:54.792Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify whatdoes_help: no corpus session is blocked on it at 4df3fffc0~1 — a vacuous verify is NOT a corpus PASS. …
smoke whatdoes_help: no RNG-tagged reach; fixed smoke spread (12 run, 3.7s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, and cohort are the port's own verify line (one `js/` file, full suite skipped).

## Actionable C-wrongs

None. A keyhelp line keeps its `fgets` newline, and the text window collapses that newline into the space run.

Verdict: **ACCEPT**
