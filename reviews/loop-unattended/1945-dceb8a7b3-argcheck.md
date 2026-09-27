# Review 1945 — dceb8a7b3 — argcheck (D-2986)

- SHA: `dceb8a7b3` (coverage; `earlyarg.c` `argcheck`, plus same-file `debug_fields` and `version.c` `early_version_info`)
- Files: `js/earlyarg.js` (`+222/−0` on top of the existing `scores_only`)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, seed name, coordinate, or `fastforward` in the new lines. Rule #2 on this tree: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs`:

```
argcheck         js/earlyarg.js:201   sync
debug_fields     js/earlyarg.js:129   sync
early_version_info js/earlyarg.js:171   sync
match_optname    js/options.js:8350   sync
dupstr           js/dungeon.js:264   sync
getversionstring js/version.js:91   sync
dump_enums       NOT FOUND
dump_version_info NOT FOUND
```

`--can js/earlyarg.js js/options.js match_optname` and `--can js/earlyarg.js js/version.js getversionstring` both print `ALREADY`. No `js/` file imports `earlyarg.js`, so these edges have no importer to close a cycle. Nothing was deleted.

## Intent vs deliverable

Subject: there was no `argcheck`, so `--debug`, `--version`, `--showpaths`, and the dump switches had no matcher, and `--debug:fuzzer` never set `iflags.fuzzerpending`.

The diff adds the linux enum, `EARLYOPTS`, `debug_fields`, `early_version_info`, and `argcheck`. Dump and bidshow arms return 2 and do not call the printers. `early_options` is not wired, so nothing in play calls `argcheck`.

## Inventory

| JS | Class | C |
|----|-------|---|
| `argcheck` | live sync `earlyarg.js:201` | `earlyarg.c:449–560` |
| `debug_fields` | same-file static, exported | `earlyarg.c:575–621` |
| `early_version_info` | same file | `version.c:279–312` |
| `match_optname` | imported `options.js:8350` | `options.c:6760–6771` |
| `dupstr` | imported `dungeon.js:264` | the `dupstr` C uses |
| `getversionstring` | imported `version.js:91` | the version fill |
| `strncmpi` / `strstri` / `raw_printf` | imported | the C calls |
| `dump_enums`, `dump_glyphids`, `dump_mongen`, `dump_weights`, `dump_version_info`, `crashreport_bidshow` | not present | named; arms return 2 |

## C ↔ JS fidelity

No `rn2`. The enum (`hack.h:433–447`) on this build is debug, version, showpaths, dumpenums (`NODUMPENUMS` is commented out, `config.h:360`), glyph ids, mongen, weights, then `ARG_BIDSHOW` because `CRASHREPORT` is set for `__linux__` (`config.h:249`) and `ARG_WINDOWS` is not (`WIN32` is off). JS values 0–7 match that. `EARLYOPTS` (`earlyarg.c:36–52`) is those eight rows with the same names, minimum lengths, and `valallowed` flags. `TTY_GRAPHICS` is on (`config.h:56`), so `ttystatus` is live. `immediateflips` is the `WIN32` arm and is absent.

`argcheck` finds the row, returns 0 if the row is missing or `argc < 1`, then scans every `argv` slot including `[0]`. A non-string is skipped; C would read `argv[i][0]`. A leading `--` sets `userea` past both dashes and sets `dashdash` to `"-"`. A later single dash does not clear `dashdash` (`earlyarg.c:468–472`). `match_optname` uses `length_without_val` when `valallowed` is true (`options.js:8351–8354`). The value cut afterwards is the first `:` if any, else the first `=`, which is the C `strchr` pair and not the cut inside `match_optname`.

`ARG_DEBUG` copies that tail, drops the separator, and calls `debug_fields`. `free` is GC. `debug_fields` splits on commas by handling the tail first (`earlyarg.c:581–585`), drops a segment longer than `BUFSZ/2`, strips C-locale space, and toggles `negated` on `!` or a leading `no` (`strncmpi`, 2). `test` and `ttystatus` store `!negated`. `fuzzer` sets `iflags.fuzzerpending` and ignores negation (`:618–619`). Separate `if`s, not `else if`, match C.

`ARG_VERSION` accepts `paste` and `copy` (paste buffer true), `show` (falls through), and anything else prints the `raw_printf` and returns 2. `dump` returns 2 without `dump_version_info`. `early_version_info` calls `getversionstring` (the `"test"` fill is overwritten in C), and `strstri` returns the suffix (`hacklib.js:485`). A hit splits at the space of `" ("` and prints `prefix + "\\n" + rest`, capped at `BUFSZ - 1`. `RUNTIME_PASTEBUF_SUPPORT` is `#if MACOS` (`unixconf.h:414–416`), so this build prints `Paste buffer copy is not available.` when `pastebuf` is set. `getversionstring` strips a bare `" ("` when no git fields are appended (`version.js:100–104`), so the split often does not fire. That is that function's result, not a second splitter.

`ARG_SHOWPATHS` is `return 2` in C as well (`earlyarg.c:525–526`). The caller `early_options` sets `deferred_showpaths` (`:283–287`). That caller is not in JS. `ARG_DUMPENUMS`, glyph ids, mongen, weights, and `ARG_BIDSHOW` call the printers and then return 2. JS returns 2 and does not call them. Those six functions are not in `js/`. `early_options` (`earlyarg.c:186–332`) is the only caller chain and stays unwired, so `fuzzerpending` is never read (`allmain.c:101`, `allmain.js:316`).

## Hallucinations / overclaim

"Keeps that C order" is true for the scan, the value cut, `ARG_DEBUG`, and the version `copy`/`show`/error path. It is not true of the six dump and bidshow arms: C calls the printer, JS returns 2. The Named sentence says that, with C lines, and `sym.mjs` shows the printers are absent rather than empty functions. `ARG_SHOWPATHS` really is only `return 2`. `early_options` unwired is named, so the new matcher does not run at startup. Ledger is `earlyarg.c`.

## Density

`argcheck` is the whole 112-line function, with `debug_fields` and `early_version_info` because those are the calls this body makes. The dump printers are separate C functions and are named, not stubbed in place. About 220 lines, inside the breadth band.

## Verification

```
verify argcheck: baseline dceb8a7b3~1 (scoreboard at 406969f14, 2026-09-27T17:19:59.283Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify argcheck: no corpus session is blocked on it at dceb8a7b3~1 — a vacuous verify is NOT a corpus PASS. ...
smoke argcheck: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks. D-2986 records green 2/2, strict ×2, cohort 7/7, skip full. This re-run shows no `REGRESSED` session. Nothing imports `earlyarg.js`, so the public sessions do not execute `argcheck`.

## Actionable C-wrongs

None. The six unported printers and the unwired `early_options` stay the named omissions.

Verdict: **ACCEPT**
