# Review 1751 — 75144e146 — optfn_petattr (D-2792)

- SHA: `75144e146` (`options.c` optfn_petattr whole-body port, D-2792)
- Files: `js/options.js` (+138), `js/display.js` (+19)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean" (this audit).

**Addressed:** D-2799 `7a4911ae6`

## Intent vs deliverable

Subject promises `optfn_petattr` and `handler_petattr` in C order, an
unset field reading as wintype `ATR_INVERSE` (7), and `display.js`
mapping stored 7 to terminal inverse. Diff adds `petattr_read`,
`optfn_petattr`, `handler_petattr`, rc do_init / do_set arms, the
doset column, the allopt `optfn`, the `doset_optfn_do_handler` arm,
and `petattr_to_tty`. The hilite_pet enable arm now stores 7 instead
of terminal `ATR_INVERSE`.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `optfn_petattr` | C body, do_handler split out | `options.c:3137–3194` |
| `handler_petattr` | C body, async | `:6151–6164` |
| `petattr_read` | local stand-in for init | `initoptions` `:7264` stores `ATR_INVERSE` |
| `petattr_to_tty` | local paint map, **diverges** | no C function; tty uses the wintype number |
| `match_str2attr` | imported | `coloratt.c:373–389` |
| `attr2attrname` | imported | `coloratt.c:319–328` |
| `query_attr` | imported, PICK_ONE returns `MC_ATR_*` | `coloratt.c:396–472` |
| `string_for_opt` / `bad_negation` | existing locals | `:6664–6680`, `:6693–6700` |
| `config_error_add` | imported no-op sink | — |

`csym --callers optfn_petattr`: 0 (function pointer, `optlist.h:568`).
`csym --callers handler_petattr`: prototype `:404` and `:3191` only.

`sym.mjs`:

```
optfn_petattr    js/options.js:3983   sync
handler_petattr  js/options.js:4050   ASYNC — await required
petattr_to_tty   NOT EXPORTED — 1 LOCAL at js/display.js:299
petattr_read     NOT EXPORTED — 1 LOCAL at js/options.js:3961
match_str2attr   js/botl.js:1267   sync
attr2attrname    js/options.js:3111   sync
query_attr       js/options.js:3562   ASYNC — await required
```

Nothing deleted. `doset` row `val: 'inverse'` was re-pointed at
`doset_compopt_get_val(optfn_petattr)`.

## C ↔ JS fidelity

`do_init` returns `optn_ok`. `do_set`: `string_for_opt(opts, negated)`.
Negated and non-empty → `bad_negation` + `optn_err`. Non-empty:
`match_str2attr(op, FALSE)`; `-1` → `config_error_add` of the whole
`opts` string + `optn_err`; else store the wintype number. Negated
empty → `ATR_NONE`. If not `optn_err`, `hilite_pet = (petattr !=
ATR_NONE)` and `opt_need_redraw` when `!opt_initial`. The `#else`
store at `:3165` is inside the non-tty branch; this build has
`TTY_GRAPHICS`. No RNG.

`get_val` / `get_cnf_val`: `windowport_tty()` is hard-true, so the
arm is `attr2attrname`. Unset reads as 7 via `petattr_read`, which is
the `initoptions:7264` assignment that has no JS caller. Stored 0
spells `none`. The `0x%08x` / `defopt` ("default") arms are in the
function and do not run.

`do_handler` is not inside the sync optfn. `doset` `:5735` calls
`doset_optfn_do_handler('petattr')`, which awaits `handler_petattr`.
That is the sole C caller (`:3191` from doset `:8935`). The handler
stores `query_attr`'s PICK_ONE `MC_ATR_*` value, sets `hilite_pet`,
and redraws. Prompt `"Select pet highlight attribute"` does not start
with `"Choose"`, so it is not the `HL_*` bitmask arm.

`opt_hilite_pet` (`:5307–5308`): enabling while `wc2_petattr` is 0
stores `ATR_INVERSE`. JS stores `MC_ATR_INVERSE` (7). Same number.

**C-wrong:** `petattr_to_tty` maps only null, 0, and 7 to terminal
`ATR_INVERSE` (1) and passes every other stored value through.
`wintype.h` is an enum (`ATR_BOLD` 1, `ATR_DIM` 2, `ATR_ITALIC` 3,
`ATR_ULINE` 4, `ATR_BLINK` 5, `ATR_INVERSE` 7). `js/terminal.js`
is a bitfield (`ATR_INVERSE` 1, `ATR_BOLD` 2, `ATR_UNDERLINE` 4).
A stored bold (1) paints inverse. A stored dim (2) paints bold.
Italic (3) is inverse|bold. Blink (5) is inverse|underline.
Underline (4) matches the underline bit by accident. Inverse (7) is
the only value the helper translates on purpose.

## Hallucinations / overclaim

"Whole-body" matches `:3146–3188` plus the handler, with do_handler
split the way other async optfns are split. "dim / italic / blink
have no terminal bit and pass through" is false: those integers are
terminal bit combinations. The subject does admit that bold paints
inverse. That admission is the C-wrong, not a named omit of an
unported arm.

## Density

~157 JS lines for a 58-line optfn, a 14-line handler, and the paint
helper. In range. Not an arm-only port of the optfn. The paint map
is the miss.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify optfn_petattr --base
75144e146~1 --reach-all`. Parent scoreboard is the 12-row file
written by `38d6c8a36` (stamp `802fa59b6`), not the 953-session board:

```
verify optfn_petattr: baseline 75144e146~1 (scoreboard at 802fa59b6, 2026-09-25T18:32:23.980Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify optfn_petattr: no corpus session is blocked on it at 75144e146~1 — a vacuous verify is NOT a corpus PASS. …
smoke optfn_petattr: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

Same command with `--base 38d6c8a36~1` (last full board, stamp
`086317c06`): 0 blocked, smoke 1 PASS, 0 regressed → REACH-OK.
D-log's "smoke 12/12" is the gutted board. 0 blocks were cited. No
REGRESSED session. The bold/dim collision is not on that smoke path.

## Actionable C-wrongs

1. `js/display.js` `petattr_to_tty` must map wintype `ATR_*` onto the
   terminal bitfield: none → 0, bold → `ATR_BOLD` (2), underline →
   `ATR_UNDERLINE` (4), inverse → `ATR_INVERSE` (1). Dim, italic, and
   blink have no tty bit and must not be passed through as 2, 3, or 5.

Verdict: **QUALITY-RISK**
