# Review 1746 — 9d6d893ca — rcfile_interface_options (D-2787)

- SHA: `9d6d893ca` (rc parser, D-2787)
- Files: `js/cfgfiles.js` (+822), `js/options.js` (+59)
- Queue row: Open coverage for the 18-line sequence, 0 corpus blocks cited
- Banned grep: 0 hits in a scan of the new handlers. `imports.mjs --rulecheck`: "Rule #2 clean". Config text comes from `vfsReadFile` (storage VFS), not `fs`.

## Intent vs deliverable

Subject promises `rcfile_interface_options` and the config-line parser,
UNIX open via the VFS, and heed/disregard plus `allopt_array_init`.
Diff delivers the sequence, `rcfile`, `read_config_file`,
`parse_config_line`, the statement table, and the options.c setters.
Startup still does not call `rcfile` (named).

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `rcfile_interface_options` | C body | `cfgfiles.c:1959–1976` |
| `rcfile` | C body | `:1892–1957` |
| `allopt_array_init` | C body | `options.c:7404–7433` |
| `heed_*` / `disregard_*` | C bodies | `:10182–10211` |
| `cnf_line_OPTIONS/NAME/ROLE/dogname/catname/MSGTYPE/MENUCOLOR/HILITE_STATUS/SYMBOLS/ROGUESYMBOLS/WIZKIT` | C bodies | e.g. NAME `:760–765` `strncpy`, ROLE `:767–775` `str2role` |
| `cnf_line_PERS_IS_UID` … `ACCESSIBILITY` | C bodies (spot-checked `:981–991`) | sysconf validators that were transcribed |
| `cnf_line_named_true` | stub for named omits | not one C function |
| `cnf_line_nhUse` / `PORTABLE_DEVICE_PATHS` | UNIX/non-WIN32 TRUE | `:638–758`, `:1134–1149` |

`sym.mjs` (HEAD line numbers; the symbols are this commit):

```
rcfile_interface_options js/cfgfiles.js:956   sync
rcfile           js/cfgfiles.js:899   sync
allopt_array_init js/options.js:6321   sync
allopt_idx       js/options.js:1274   sync
heed_all_options js/options.js:6295   sync
cnf_line_named_true NOT EXPORTED — 1 LOCAL at js/cfgfiles.js:597
```

## C ↔ JS fidelity

The sequence is the C order: init the table, disregard every option
and every config statement, heed `windowtype` and `soundlib`, ignore
unmatched errors, `rcfile()`, then heed statements and options,
disregard those two options, and clear the ignore flag. `allopt_array_init`
is one-shot, writes `initval` through `addr`, heeds, then
`optfn(i, do_init, …)` with the loop index (`:7428`). `rcfile` walks
`NETHACKOPTIONS` / `HACKOPTIONS`, command-line rc, `@file`, the
`BUFSZ/2` name check, `read_config_file`, then extra options. No RNG.

NAME/ROLE/pet names match the short C bodies (`strncpy` length
`PL_NSIZ-1` / `PL_PSIZ-1`; JS `trunc` is the copy). OPTIONS calls
`parseoptions`. SYMBOLS calls `parsesymbols` and skips `switch_symbols`
(named).

`AUTOPICKUP_EXCEPTION`, `BINDINGS`, `AUTOCOMPLETE`, `WARNINGS`,
`BOULDER`, and the six sysconf names CHECK_SAVE_UID, CHECK_PLNAME,
SEDUCE, HIDEUSAGE, MAXPLAYERS, PERSMAX hit `cnf_line_named_true` and
return true. Those bodies are not transcribed. `startup.md` names them
in this commit, so they are omits, not silent stubs. C MAXPLAYERS
(`:960–964`) and PERSMAX (`:968–978`) do store integers; JS drops the
line. That is the named gap.

## Hallucinations / overclaim

"Live handlers" for OPTIONS/NAME/ROLE/pets/MSGTYPE/MENUCOLOR/
HILITE_STATUS/SYMBOLS/ROGUESYMBOLS/WIZKIT and the transcribed
validators matches the functions that are not `cnf_line_named_true`.
The subject also lists the six validators and the autopickup/bindings
family as not transcribed. "Whole body" is the sequence plus the
parser with those omits, not every `cnf_line_*` in `cfgfiles.c`.

## Density

~870 lines. The queued function is 18 lines; the same file's parser
shipped with it. Over the 800-line target, under the 1500 cap. The
omitted validators are named, not an unstated arm of
`rcfile_interface_options`.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify rcfile_interface_options
--base 9d6d893ca~1 --reach-all`:

```
verify rcfile_interface_options: baseline 9d6d893ca~1 (scoreboard at 51c8c5714, 2026-09-25T16:19:09.619Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify rcfile_interface_options: no corpus session is blocked on it at 9d6d893ca~1 — a vacuous verify is NOT a corpus PASS. …
smoke rcfile_interface_options: no RNG-tagged reach; fixed smoke spread (1 run, 1.3s): 1 PASS, 0 regressed → REACH-OK
```

0 blocks cited. No REGRESSED session. The function is not on the
startup path, so the vacuous note is expected.

## Actionable C-wrongs

None. The dropped statement bodies are named in `docs/c-js-map/startup.md`.

Verdict: **ACCEPT**
