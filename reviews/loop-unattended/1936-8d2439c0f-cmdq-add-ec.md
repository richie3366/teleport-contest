# Review 1936 — 8d2439c0f — cmdq_add_ec (D-2977)

- SHA: `8d2439c0f` (coverage; `cmd.c` `cmdq_add_ec` plus the `ext_func_tab_from_func` lookup it calls; `shk.js` drops its `get_obj_location` clone)
- Files: `js/cmd.js` (`+137/−84`), `js/shk.js` (`+2/−22`)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, or `fastforward` in the `js/` hunks. Seed names appear only in the commit message. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs`:

```
cmdq_add_ec              js/cmd.js:428   sync
ext_func_tab_from_func   js/cmd.js:1848   sync
get_obj_location         js/timeout.js:1637   sync
which_armor              js/worn.js:408   sync
                         !! ALSO 2 LOCAL CLONE(S): js/sit.js:211  js/trap.js:3786
```

`--can js/cmd.js js/pray.js dosacrifice`, `--can js/cmd.js js/artifact.js doinvoke`, and `--can js/shk.js js/timeout.js get_obj_location` all print `ALREADY`. No later commit touches `js/`.

**Addressed:** D-2978 `4ce18a4e0`

## Intent vs deliverable

Subject: a queued extended command kept empty `txt` and flags unless the caller passed a tab, so `rhack` skipped `can_do_extcmd` and the row flags. Dip, sit, ride, untrap, and offer were lambdas, so the lookup could not see `ef_funct`. `shk.js` had a `get_obj_location` clone that dropped `OBJ_MINVENT` and `OBJ_BURIED`.

The diff does call `ext_func_tab_from_func` first, replaces those lambdas with the functions, and deletes the shop clone. `doloot` and `dotip` are still absent from `FUNCT_TXT`.

## Inventory

| JS | Class | C |
|----|-------|---|
| `cmdq_add_ec` | live sync `cmd.js:428` | `cmd.c:253–270` |
| `ext_func_tab_from_func` | live; map is partial | `cmd.c:3015–3025` |
| `FUNCT_TXT` | local identity map | `extcmdlist[].ef_funct` |
| `get_obj_location` | imported `timeout.js:1637` | `zap.c:653–689` |
| deleted `shk.js` `get_obj_location` | clone removed | subset of the same function |
| `which_armor` | not edited; ledger stale-ported | `worn.c:1005–1036` |

## C ↔ JS fidelity

No `rn2`. `cmdq_add_ec` builds a `CMDQ_EXTCMD` node, calls `ext_func_tab_from_func(fn)`, and `push`es it. Lookup wins over a caller tab. On a hit, `txt` and `flags` come from that row and `ec_entry` is the row. On a miss, `txt` / `flags` come from the tab (or empty / 0) and `ec_entry` is null. C has no tab; a miss is a NULL `ec_entry`. The fallback is the named path for an unported `ef_funct`.

`ext_func_tab_from_func` walks `EXTCMDLIST` for the `txt` that `FUNCT_TXT` stored for that function. C walks `extcmdlist` and returns the first row whose `ef_funct` is `fn` (`cmd.c:3020–3022`), including `INTERNALCMD`. The map uses one txt per function. Alternates are separate functions: `dip_into` → `altdip` (`cmd.c:2063`, flags `INTERNALCMD` 0x40), `remarm_swapwep` → `altunwield`, `ia_dotakeoff` → `alttakeoff`, `adjust_split` → `altadjust`. `do_reqmenu` → `reqmenu` (flags `PREFIXCMD` 0x200). A string argument looks up `txt` directly; C takes only a function pointer. Callers of `cmdq_add_ec` pass functions.

`doloot` and `dotip` are not in the map. Both are imported (`cmd.js:121`) and ported. C `cmd.c:1762` is `doloot` / `"loot"` with `AUTOCOMPLETE|CMD_M_PREFIX` (0x0002|0x0080 = 130, `extcmdlist_data.js` `"loot"`). `cmd.c:1905` is `dotip` / `"tip"` with the same flags. Live queues that pass only the function therefore store empty `txt` and flags 0:

- `act_on_act_here` `MCMD_LOOT` / `MCMD_TIP` (`cmd.js:2415–2416`), called from `:2935`
- `domouseaction` container click (`:2496`), inert while `mousebtn` is unset
- `IA_TIP_CONTAINER` (`iactions.js:204`)

The here-menu loot and the item-action tip are not the “unported function” case the D-log names. The other functions those menus queue (`dodrink`, `dosit`, `doride`, `dountrap`, `dosacrifice`, `doeat`, `dofire`, …) are in the map, and the former lambdas now pass those functions.

`MCMD_LOOK_TRAP` still queues `async () => import('./pager.js').doidtrap` (`cmd.js:2657`). `pager.js` does not export `doidtrap`. `act_on_act` has no caller, so the arm does not run. `cmd.c:4912` stays unwired (`bind_mousebtn` unset). `end.c:1010`, `lock.c:887`, and `pray.c:2215` (`#if 0`) stay named.

`shk.js` no longer defines `get_obj_location`. The three shop sites call `timeout.js`. That body matches `zap.c:654–688`: invent and floor, minvent only when `ocarry.mx` is set, buried only with `BURIED_TOO`, contained only with `CONTAINED_TOO` (0x1, `obj.h:450`), else null. C writes `*xp = *yp = 0` and returns false; JS returns null. `costly_alteration` (`shk.js:2407`) treats a miss as the hero’s square, which is this caller’s own else, not the zap function. `CONTAINED_TOO` at `:2407` and `:3408` is the 0x1 the deleted clone already passed.

`worn.js:408` `which_armor` matches `worn.c:1006–1035` (hero `uarm*` slots, else `minvent`). `sym.mjs` still reports clones at `sit.js:211` and `trap.js:3786` (minvent only, no hero switch). `makemon.js` / `mklev.js` are `which_armor_local`, `steed.js` is `which_armor_saddle`, `weapon.js` is `which_armor_magr`. This commit does not edit them. The D-log groups those names as one minvent scan.

## Hallucinations / overclaim

The subject says the queued command stores the extcmd row. That is true for functions in `FUNCT_TXT`. It is false for `doloot` and `dotip`, and the D-log’s “unported function” sentence does not cover them. `ext_func_tab_from_func` is ledger `partial`, which matches the hole. `cmdq_add_ec` is ledger `ported` while those two live callers still miss the row. `which_armor` `ported` matches `worn.js`; the two `which_armor` clones remain.

## Density

The 11-line `cmdq_add_ec` body and the lookup it calls shipped. The lookup’s identity map omits two ported commands that this file and `iactions.js` queue. One port iter: add `[doloot, 'loot']` and `[dotip, 'tip']` to `FUNCT_TXT`.

## Verification

```
verify cmdq_add_ec: baseline 8d2439c0f~1 (scoreboard at b3da2ae0e, 2026-09-27T15:16:28.487Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify cmdq_add_ec: no corpus session is blocked on it at 8d2439c0f~1 — a vacuous verify is NOT a corpus PASS. ...
smoke cmdq_add_ec: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks. D-2977 records green 2/2, strict ×2, cohort 7/7, skip full, and seed0101 / seed0106 / seed0116 PASS. This re-run shows no `REGRESSED` session. The loot/tip flag hole is not one of those sessions.

## Actionable C-wrongs

1. `FUNCT_TXT` must map `doloot` to `"loot"` and `dotip` to `"tip"` (`cmd.c:1762`, `:1905`; both `AUTOCOMPLETE|CMD_M_PREFIX`). `act_on_act_here` (`cmd.js:2415–2416`) and `IA_TIP_CONTAINER` (`iactions.js:204`) otherwise queue flags 0.

Verdict: **QUALITY-RISK**
