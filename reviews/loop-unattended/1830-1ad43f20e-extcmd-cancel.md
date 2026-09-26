# Review 1830 — 1ad43f20e — extcmd_via_menu cancel (D-2871)

- SHA: `1ad43f20e` (Must-fix from review 1822; `cmd.c` `extcmd_via_menu`)
- Files: `js/getline.js` (+7/−6). No function added or deleted.
- Queue row: review 1822 item 1, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises the cancel-after-prefix arm stops assigning `cbuf`. `ret` stays 0, `matchlevel` goes to 0, the next menu is unfiltered, and the header still shows the abandoned prefix. The diff deletes `cbuf = ''` and does that. Nothing was re-pointed from a local clone to an import. `sym.mjs`:

```
extcmd_via_menu      js/getline.js:1276   ASYNC — await required
select_menu_pick_one js/options.js:6618   ASYNC — await required
```

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `extcmd_via_menu` | async export `getline.js:1276` | `cmd.c:751–882` |
| `select_menu_pick_one` | import, awaited | `select_menu` `cmd.c:858` |
| `strncmpPrefix` | unchanged local clone | `strncmp` at `cmd.c:788` |

## C ↔ JS fidelity

`csym` body is `cmd.c:751–882`. Callers: `win/tty/getline.c:301` (`:24` is the extern; `:864` is the `impossible` format string). `get_ext_cmd` (`getline.js:1396`) still calls it when `game.iflags.extmenu`.

The filter, overflow return, one-choice short-circuit, and letter grouping were not edited. The changed arm is the `n != 1` branch (`cmd.c:873–878`):

```c
} else {
    if (matchlevel) {
        ret = 0;
        matchlevel = 0;
    } else
        ret = -1;
}
```

`cbuf` is not written. JS (`getline.js:1377–1381`) sets `ret = 0` and `matchlevel = 0` and leaves `cbuf`. `while (!ret)` runs again. `!matchlevel` admits every autocomplete command. The header is still `Extended Command: ${cbuf}` (`cmd.c:856`). The next pick rebuilds from `cbuf.slice(0, 0)`, which is `cbuf[0] = ch; cbuf[1] = '\0'` (`cmd.c:869–870`). No RNG.

The comment on the pick test still says `` `:873` `` for `n == 1`. Line 873 is the `else`. `n == 1` is `cmd.c:860`. The new cancel comment (`cmd.c:874–876`) matches the file. That is comment drift on an arm this commit did not change.

## Hallucinations / overclaim

Review 1822 cited `cmd.c:884–887` for this arm. The function ends at 882; the arm is `874–877`. The subject describes the behavior, not those stale numbers, and the deleted assignment is the one 1822 named. `select_menu` stays the live picker. `doset` writing `flags.extmenu` is the named omit from 1822, not a new stub.

## Density

One arm of the function review 1822 already walked. 13 insertions in `js/`. No new callee.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify extcmd_via_menu --base 1ad43f20e~1 --reach-all`.

```
verify extcmd_via_menu: baseline 1ad43f20e~1 (scoreboard at 3f8d66fcb) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke extcmd_via_menu: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The back-out header is not on that smoke path.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
