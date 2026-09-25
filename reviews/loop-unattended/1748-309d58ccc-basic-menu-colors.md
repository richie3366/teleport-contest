# Review 1748 — 309d58ccc — basic_menu_colors (D-2789)

- SHA: `309d58ccc` (`coloratt.c` basic_menu_colors, D-2789)
- Files: `js/options.js` (+45/−16)
- Queue row: Open coverage PARTIAL, 0 corpus blocks cited
- Banned grep: 0 hits. `imports.mjs --rulecheck`: "Rule #2 clean" (this audit).

## Intent vs deliverable

Subject promises a restart of `basic_menu_colors` so the pattern is
`*%s` only when `regex_id` is `pmatchregex`, and `%s` otherwise.
Diff replaces the function body and adds `REGEX_ID = 'posixregex'`.
No new function. `query_color` already called both sides.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `basic_menu_colors` | C body | `coloratt.c:525–580` |
| `add_menu_coloring_parsed` | existing export | called at `:567` |
| `REGEX_ID` | build constant | `sys/share/posixregex.c:52` `"posixregex"` |

`csym --callers`: `coloratt.c:483` TRUE and `:503` FALSE, both inside
`query_color`. JS `query_color` calls `basic_menu_colors(true)` then
`(false)` (`options.js:3463`, `:3471`).

`sym.mjs`:

```
basic_menu_colors js/options.js:3413   sync
add_menu_coloring_parsed js/options.js:3078   sync
```

Nothing deleted. Nothing re-pointed.

## C ↔ JS fidelity

`load_colors` true: save `use_menu_color` and the coloring list, force
the option on. If the alternate list exists, install it. Else
`!strcmpi(regex_id, "pmatchregex")` picks `*%s` or `%s`, clear the
list, and for each `colornames` row until a null name skip
`CLR_BLACK`, `CLR_WHITE`, and `NO_COLOR`, then
`add_menu_coloring_parsed`. Store the new list. False restores both
saved values. No RNG.

Unix `Makefile.src:229` sets `REGEXOBJ` to `posixregex.o`. Line 230
comments out `pmatchregex.o`. `regex_id` is `"posixregex"`, so the
compare is false and the format is `%s`. JS
`REGEX_ID.toLowerCase() === 'pmatchregex'` is that compare; the
`` `*${name}` `` arm is in the function and does not run. The null-name
`break` is present. `MENU_COLORNAMES` has no alias row and no null
sentinel, so the loop visits the same names C visits before the
sentinel (black through "no color"), and the three skips still drop
black, white, and no color.

## Hallucinations / overclaim

"Whole-body" matches `:535–578`, including the `*%s` arm. "Live id
takes the `%s` arm" matches the makefile and `posixregex.c:52`. The
two C callers are the two JS calls.

## Density

45 lines for a 56-line function. Under the 200-line band because C
is that small (playbook: below ~40 is a failed handoff unless C is
that small). Not an arm-only port.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify basic_menu_colors --base
309d58ccc~1 --reach-all`:

```
verify basic_menu_colors: baseline 309d58ccc~1 (scoreboard at a5cb4fedd, 2026-09-25T17:37:40.492Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify basic_menu_colors: no corpus session is blocked on it at 309d58ccc~1 — a vacuous verify is NOT a corpus PASS. …
smoke basic_menu_colors: no RNG-tagged reach; fixed smoke spread (1 run, 1.3s): 1 PASS, 0 regressed → REACH-OK
```

0 blocks cited. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
