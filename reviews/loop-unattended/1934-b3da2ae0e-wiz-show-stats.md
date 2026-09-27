# Review 1934 — b3da2ae0e — wiz_show_stats (D-2975)

- SHA: `b3da2ae0e` (coverage; `wizcmds.c` `wiz_show_stats` and the chain helpers, plus `worm.c` `size_wseg`)
- Files: `js/wizcmds.js` (`+326/−4`), `js/worm.js` (`+16/−0`), `js/getline.js` (`+10/−0`)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed name in the `js/` hunks. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs` (file-local helpers are the C `staticfn`s; one copy each):

```
wiz_show_stats   js/wizcmds.js:1438   ASYNC — await required
size_wseg        js/worm.js:147   sync
size_obj         NOT EXPORTED — 1 local js/wizcmds.js:1251
count_obj        NOT EXPORTED — 1 local js/wizcmds.js:1277
obj_chain        NOT EXPORTED — 1 local js/wizcmds.js:1305
mon_invent_chain NOT EXPORTED — 1 local js/wizcmds.js:1327
contained_stats  NOT EXPORTED — 1 local js/wizcmds.js:1350
size_monst       NOT EXPORTED — 1 local js/wizcmds.js:1381
mon_chain        NOT EXPORTED — 1 local js/wizcmds.js:1411
overview_stats   js/dungeon.js:2001   sync
misc_stats       js/wizcmds.js:1073   sync
show_text_pages  js/pager.js:259   ASYNC — await required
strncmpi         js/hacklib.js:419   sync
```

`imports.mjs --can js/wizcmds.js js/dungeon.js overview_stats` and `--can … js/worm.js size_wseg` print `ALREADY`. `--can js/wizcmds.js js/pager.js show_text_pages` is `IN-SCC` and `VERDICT: SAFE` (hoisted function). The call is a dynamic `import()` inside `wiz_show_stats`, then `await show_text_pages(lines)`.

## Intent vs deliverable

Subject: `#stats` was an autocomplete name with no runner. Object, monster, overview, and miscellaneous memory totals were never collected or shown.

The diff adds the command, the chain helpers, `size_wseg`, and the `EXT_CMDS` runner.

## Inventory

| JS | Class | C |
|----|-------|---|
| `wiz_show_stats` | live async `wizcmds.js:1438` | `wizcmds.c:1616–1697` |
| `size_obj` | file-local | `wizcmds.c:1117–1132` |
| `count_obj` | file-local | `wizcmds.c:1135–1151` |
| `obj_chain` | file-local | `wizcmds.c:1156–1174` |
| `mon_invent_chain` | file-local | `wizcmds.c:1177–1196` |
| `contained_stats` | file-local | `wizcmds.c:1199–1225` |
| `size_monst` | file-local | `wizcmds.c:1228–1254` |
| `mon_chain` | file-local | `wizcmds.c:1257–1281` |
| `size_wseg` | live sync `worm.js:147` | `worm.c:827–830` |
| `walk_chain` / `c_str_bytes` / `stats_row` | local adapters | `nobj`/`nmon`, `strlen+1`, `template[]` |
| `overview_stats`, `misc_stats` | already live, now called | `dungeon.c` / `wizcmds.c` |
| `show_borlandc_stats` | not compiled | `#if __BORLANDC__ && !_WIN32` |

Caller: `cmd.c:1876–1877` extcmdlist `"stats"` → `js/getline.js:901–909`. `csym --callers wiz_show_stats` prints 0 because the site is a function-pointer field, not a call. `size_wseg` is called from `wizcmds.c:1233` only (`extern.h:3913`).

## C ↔ JS fidelity

No `rn2`. Title, then objects: header (`wizcmds.c:1113`), `Objects, base size` plus `sizeof (struct obj)`, `obj_chain` of invent and fobj with `force`, buried / migrating objs / billobjs without, `mon_invent_chain` of fmon and migrating mons, `contained_stats`, separator, `Obj total`. Then monsters: blank line, base size, `mon_chain` of fmon forced and migrating not, `mydogs` only when the pointer is set and not forced, `Mon total`. Then overview and miscellaneous the same way, then a blank line, separator, and the grand total of the four pairs. Return is `ECMD_OK`. Borland is the named `#if`.

`size_obj` starts at `SIZEOF_OBJ` (112). An `oextra` adds 32, then `c_str_bytes(oname)` (`ONAME`: null, undefined, or the free sentinel 0 add nothing; `""` is one NUL), then `size_monst(omonst, false)` when an attached monster is set, then `strlen+1` of a non-empty `omailcmd`. C tests the `OMAILCMD` pointer; this port stores “no command” as `""`, so the truthiness test skips that placeholder. Contained objects stay out of `size_obj`.

`count_obj` walks the chain. `top` increments count and adds `size_obj`. `recurse` with a `cobj` calls `count_obj(cobj, total, true, true)` before the frame adds its own locals. That is the C order: the recursive call updates the out-params, then this frame adds `count` and `size`.

`obj_chain` counts with `top` true and `recurse` false, and prints when count, size, or `force`. `mon_invent_chain` sums each `minvent` the same way and prints only when nonzero. `contained_stats` uses `top` false and `recurse` true on invent, fobj, buried, migrating objs, then both monster chains. Bill objects and mydogs are not in that walk. A zero sum is silent.

`size_monst` starts at 192. Worm segments are added only when `wormno` and `incl_wsegs`. `size_wseg` is `count_wsegs * 16`. `count_wsegs` (`worm.c:835–846`) counts `wtails[wormno]->nseg`, and the JS copy does the same. `struct wseg` is a pointer plus two `coordxy` (`worm.c:12–15`); 16 is the commit’s LP64 probe, not recompiled here. `mextra` adds 64, then the given name, then egd 640, epri 56, eshk 4960, emin 8, edog 64, ebones 28, each only when that pointer is set. `mcorpsenm` is not a further allocation.

`mon_chain` sets `incl_wsegs` from `strncmpi(src, "fmon", -1) === 0`. `strncmpi` (`hacklib.js:419`) treats a negative count as “walk until NUL”, which is the `strcmpi` macro. `"fmon"` matches; `"migrating"` and `"mydogs"` do not. Every monster on the chain counts.

`stats_row` is `%-27s  %4ld  %6ld` (`wizcmds.c:1112`): `padEnd(27)`, two spaces, `padStart(4)`, two spaces, `padStart(6)`. The header and separator strings match `:1113–1114`. Wide counts are not truncated.

`walk_chain` follows `nobj` / `nmon` on a list. Invent, fmon, migrating monsters, and mydogs are arrays here, so those walks visit non-null slots instead of the link. The D-log names that. Buried objects may be either shape; the helper handles both. An empty `mydogs` array is truthy, so the `if (game.mydogs)` arm runs; `force` is false and the count is 0, so no row is printed. A null `mydogs` still skips the call.

`overview_stats(lines, ovrTot)` and `misc_stats(lines, miscTot)` are the existing bodies. Their C `win` and format-string arguments are the line array. `show_text_pages` is the `NHW_TEXT` wait (`display_nhwindow` / `destroy_nhwindow`).

This review did not recompile the sizeof probe. The constants are the ones printed beside `SIZEOF_TRAP`.

## Hallucinations / overclaim

`overview_stats` and `misc_stats` are called, not left as unused ports. No helper in the live command is a TODO. Borland is the only omitted arm, and it is not in this build. `csym --callers` returning 0 is the function-pointer slot, and `getline.js` wires it.

## Density

The compiled `wiz_show_stats` body and every helper it calls shipped in this commit or was already live. The one C caller is the extcmd slot. Insertions are the helpers and the sizeof table, not one arm of the command.

## Verification

```
verify wiz_show_stats: baseline b3da2ae0e~1 (scoreboard at 8a0963412, 2026-09-27T14:47:12.892Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify wiz_show_stats: no corpus session is blocked on it at b3da2ae0e~1 — a vacuous verify is NOT a corpus PASS. ...
smoke wiz_show_stats: no RNG-tagged reach; fixed smoke spread (12 run, 3.4s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks. D-2975 records green 2/2, strict ×2, cohort 7/7, skip full. This re-run shows no `REGRESSED` session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
