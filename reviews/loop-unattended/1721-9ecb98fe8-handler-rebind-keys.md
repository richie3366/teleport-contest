# Review 1721 — 9ecb98fe8 — handler_rebind_keys + bind writers (D-2762)

- SHA: `9ecb98fe8` (`cmd.c` handler_rebind_keys: whole-body port, D-2762)
- Files: `js/cmd.js` (+344), `js/options.js` (+13), `js/botl.js` (1-word export), 2 test scripts
- D-log: D-2762; queue row: Open (whole-function + dead callees), 0 corpus blocks
- Banned grep: 0 hits

## Intent vs deliverable

Subject promises the rebind menu + bind_key/count writers + doset
wiring. Diff ports six C bodies (`handler_rebind_keys` `:2407–2446`,
`_add` `:2290–2405`, `bind_key` `:2661–2728`, `cmdbind_add` `:2125–2155`,
`cmdbind_remove` `:2157–2177`, `count_bind_keys` `:2207–2231`), wires
the doset row/get_val/arm, exports `config_error_add`, and ships tests.
Promise kept.

## Inventory

All six symbols new-and-live in cmd.js (two staticfn-local per C);
`config_error_add` local→export (same function, no clone deleted).
`sym.mjs` spot-checks: `cmdbind_get`/`key2txt` (dokeylist),
`show_text_pages`, `select_menu_pick_one`, `getlin`/`mungspaces`,
`pgetchar` all live; `CMD_PARAM 0x4000` ≡ `func_tab.h:25`.

## C ↔ JS fidelity

Walked all six bodies. Handler: redo loop, item-3 gate, PICK_ONE
dispatch, NULL-arm drain via `show_text_pages` — exact; count>0 ⟺ ≥1
line holds (same predicates both loops). _add: keyfirst/bindit reads
(`& 0xff` truncation correct — `pgetchar`/`nhgetch` return numeric key
codes; ESC 27), current-bind header, −1 row, extcmd skip mask
(MOVEMENT|INTERNAL|NOT_AVAILABLE) with a_int i+1, CMD_PARAM
getlin+mungspaces+BUFSZ−1 truncation, prevcmd identity compare,
Changed/Bound/failed plines — exact. The `Strcat`-onto-uninit wart
(`:2363`/`:2379`) read as assignment is the only sane port, documented
and named. bind_key: "nothing"→remove+TRUE, paren split
(`(`/`)`, `lastp>p`), strcmpi match + INTERNALCMD skip,
bind-before-error order (empty param still binds), live
`config_error_add` sink — exact. cmdbind_add/remove: key-0 guard,
null-extcmd→remove, in-place set / unlink+null-marker — match C under
the pre-existing overlay design; the null marker clears defaults in
`cmdbinds_live` exactly like C's unlink. Identity audit (the subtle
one): `cmdbinds_live` and `build_default_cmdbinds` store the very
EXTCMDLIST row objects, so `prevcmd !== ec` ≡ C's `prevcmd->cmd != ec`
— same-command rebinds stay silent. doset row/arm ≡ `options.c:8336`
get_val / `:8340` do_handler. No RNG in any path.

Edge noted, not queued: `cmdbind_add(k, null)` with no existing bind
would throw on `extcmd.txt` — unreachable from live callers (bind_key
only passes matched non-null; the null-passing C callers are the named
unported commands_init path). Named omits (`bind->param` store, C
key-0+param crash path, commands_init/reset_commands callers) are all
stated with the reason.

## Hallucinations / overclaim

None. The test-file edit (undefined → line array) tracks the deliberate
contract change with its new drain — not alignment. Re-ran both suites
myself: 23/23 pass.

## Density

~357 insertions for six same-file bodies + wiring + tests: dense, one
family, callee-closed. Right-sized.

## Verification

Re-ran `hidden-proxy.mjs verify handler_rebind_keys --base 9ecb98fe8~1
--reach-all` → 0 blocked, smoke 24/24 REACH-OK. Matches the bullet.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
