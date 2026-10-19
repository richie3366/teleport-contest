# Review 2955 — 32772b877 — EXT_CMDS gets call / redraw / remove / retravel / whatdoes

- SHA: `32772b877` (cliff, live-queue owner `docallcmd`, 2 rows)
- D-entry: D-4115; Ledger: docallcmd ported; dotravel_target ported
- `js/` diff: `js/getline.js` +51, `js/cmd.js` +1/−1 (export)

## Intent vs deliverable

Promise: C's extcmdlist binds 'C' to "call" → docallcmd. JS's runner
table had no "call" row, so rhack's `cmdbind_get('C')` found the
binding, found no runner, and printed «Unknown command 'C'.». The rows
for "redraw", "remove", "retravel" and "whatdoes" were missing the same
way. Diff: five EXT_CMDS rows, each importing the live C-named function,
and `dotravel_target` exported (body unchanged). Promise = diff.

## Inventory

| Row | C extcmdlist | Flags (C) | JS runner (live) |
|-----|--------------|-----------|------------------|
| call | cmd.c:1687–1688 `'C'` | IFBURIED\|GENERALCMD | do_name.js:1610 docallcmd |
| redraw | :1818–1819 `C('r')` | IFBURIED\|GENERALCMD\|CMD_INSANE | display.js:7104 doredraw |
| remove | :1820–1821 `'R'` | 0 | do_wear.js:2319 doremring |
| retravel | :1831–1832 `C('_')` | 0 | cmd.js:4931 dotravel_target |
| whatdoes | :1934–1935 `'&'` | IFBURIED\|GENERALCMD | pager.js:3312 dowhatdoes |

## C ↔ JS fidelity

None of the five C rows has AUTOCOMPLETE, and none is WIZMODECMD. JS
sets `autocomplete: false, wiz: false` on all five. So typed `#call`
needs an exact match (ECM_IGNOREAC), and the autocomplete scan
(`availableExtCmds`, getline.js:1455) gains no new prefix candidates. The
runners are imports, not clones. `sym.mjs` gives one export each for
docallcmd, doremring, dowhatdoes and doredraw.
`extcmd_run_by_txt` (getline.js:1466) is the rhack path the sessions
take, and it returns the first row whose name matches. No existing row
was named call, redraw, remove, retravel or whatdoes, so nothing is
shadowed. 'name' still maps to docallcmd as before.

dotravel_target (C cmd.c:5347–5377): the JS body was not changed by
this SHA. It keeps C's two early arms («No travel destination set.»,
«You are already here.» plus the travelcc reset), then the context
writes, `multi = max(COLNO, ROWNO)` and domove. JS also writes
`u.tx/u.ty = travelcc`. C has no such write here, but every C writer of
travelcc sets u.tx in the same statement (cmd.c:4685, :4871, :4929,
:5340), so the values agree. This is not a divergence.

## Hallucinations / overclaim

None. The D-log names what is still unknown: `#wizbury` / `#wizcast`
have no JS body, and the movement/run/rush rows have no `#`-typed
runner.

## Density

Five table rows wire C callers to live bodies. That is the right size
for a dispatch-table miss.

## Verification

```text
verify docallcmd (--base 32772b877~1): 2 blocked
  scen-extcmd-Samurai-51257006: PASS
  scen-extcmd-Valkyrie-51450069: PASS
verify docallcmd: 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
verify dotravel_target: 0 blocked (vacuous; export only)
```

Exact match with the D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
