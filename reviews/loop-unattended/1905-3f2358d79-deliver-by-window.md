# Review 1905 — 3f2358d79 — deliver_by_window (D-2946)

- SHA: `3f2358d79` (coverage; `questpgr.c` `deliver_by_window`, plus `hacklib.c` `eos`)
- Files: `js/questpgr.js` walks with `copynchars` and `eos`, and passes `NHW_MENU` or `NHW_TEXT`. `js/hacklib.js` adds `eos` as an end index.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` diff. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- The diff adds `eos` and imports `copynchars`. It does not delete a clone. `sym.mjs`:

```
eos              js/hacklib.js:216   sync
copynchars       js/hacklib.js:246   sync
             !! ALSO 1 LOCAL CLONE(S) in 1 files — IMPORT the export; do NOT add another
               js/topten.js:55
```

The `topten.js` copy is outside this diff.

## Intent vs deliverable

Subject promises one file-local `deliver_by_window`: `eos`, then `copynchars` of at most `BUFSZ-1`, advance `length+1`, `convert_line`, then a blocking window of the caller's `how`. The diff is that loop, `eos`, and the `output === 3` window type at the one caller.

## Inventory

| JS | Class | C |
|----|-------|---|
| `deliver_by_window` | file-local (C `staticfn`) `questpgr.js:1031` | `questpgr.c:438–456` |
| `eos` | live sync `hacklib.js:216` | `hacklib.c:193–199` |
| `copynchars` | live sync `hacklib.js:246` | `hacklib.c:286–297` |
| `convert_line` | live `questpgr.js:782` | writes `out_line` |
| `show_nhw_menu_text` | live `pager.js:615` | `NHW_MENU` display |
| `show_text_pages` | live `pager.js:259` | `NHW_TEXT` display |

## C ↔ JS fidelity

`questpgr.c:442–455`. `msgend = eos(msg)`. `create_nhwindow(how)` runs before the loop, including when `msg` is empty. While `msgp < msgend`: `copynchars(in_line, msgp, BUFSZ-1)`, then `msgp += strlen(in_line) + 1`, `convert_line`, `putstr(datawin, 0, out_line)`. Then `display_nhwindow(datawin, TRUE)` and `destroy_nhwindow`. No `rn2`.

`copynchars` (`hacklib.c:292–296`) copies while `n > 0` and the byte is not `'\0'` or `'\n'`, then writes a terminator. A full `BUFSZ-1` segment still advances one extra byte, because the `+1` is not "only if a newline was the stop." JS `copynchars` (`:246–256`) stops on `charCode === 10` or on `n`. The slice is `text.slice(msgp, msgend)`, and `msgp += chunk.length + 1`, so the extra byte is skipped the same way. A trailing newline is that extra byte and does not become another `putstr`.

`eos` (`hacklib.c:196–198`) walks until `*s` is 0 and returns that pointer. JS returns the index, and an embedded 0 stops the walk. A string with no embedded 0 ends at `length`. A null argument returns 0; C would dereference. The caller passes the pager `text`.

An empty message does not enter the loop. `show_text_pages` still paints one page when `expanded.length === 0` (`pager.js:280`), which is the empty `create_nhwindow` / `display_nhwindow` / `destroy_nhwindow`. `how === NHW_MENU` uses `show_nhw_menu_text`; any other `how` uses `show_text_pages`. The only caller passes one of those two (`questpgr.c:595` → `questpgr.js:1128`). `flush_topl_more` before the paint is the blocking display's pending `--More--`. `show_nhw_menu_text` flushes again (`:619`); the first call has already cleared a pending line.

The `:26` line is the prototype. `allmain.c:832` `com_pager("legacy"|"pauper_legacy")` stays `com_pager_legacy` (`allmain.js:892`), named, and does not call this function.

## Hallucinations / overclaim

The subject says no arm of `deliver_by_window` is omitted. The loop, the `length+1` advance, and both window types are present. `create_nhwindow` / `putstr` / `destroy_nhwindow` are the pager helpers, and `display.js` `putstr` stays the message window. The legacy pager is named and is not this function's caller.

## Density

The coverage row asked for `deliver_by_window`. The 19-line body shipped, and its one caller passes `NHW_MENU` or `NHW_TEXT`. `eos` is the callee in the same commit. Not an arm peel.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify deliver_by_window --base 3f2358d79~1 --reach-all`.

```
verify deliver_by_window: baseline 3f2358d79~1 (scoreboard at b88b8599f, 2026-09-27T02:19:54.792Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify deliver_by_window: no corpus session is blocked on it at 3f2358d79~1 — a vacuous verify is NOT a corpus PASS. …
smoke deliver_by_window: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, and cohort are the port's own verify line. Full suite was skipped; `questpgr.js` and `hacklib.js` are not on the shared-file list.

## Actionable C-wrongs

None in this function. The `topten.js` `copynchars` clone was already there.

Verdict: **ACCEPT**
