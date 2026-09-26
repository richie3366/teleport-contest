# Review 1792 — 92e997504 — genl_player_setup (D-2833)

- SHA: `92e997504` (coverage; `role.c` `genl_player_setup`)
- Files: `js/player_selection.js` the function and `chargen_aspect_menu`; `js/roles.js` `randgend`
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: the only `seed` hit is a deleted comment (`seed0014`). No `FORCE` / `DIAG` / `fastforward` added. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `genl_player_setup` in C order: incompatible `y`/`a`/`ROLE_RANDOM` says "Incompatible …" then `randrole` / `randrace` / `randgend` / `randalign`; a manual facet counts `ok_*` then `valid*` and opens a menu only when `n > 1`; every non-quit choice stores `k`, including `ROLE_NONE` on a redirect; confirm is the `[ynaq]` switch; rename calls `plnamesuffix`. The diff is that body. `pick_*_menu` and the `tty_askname` rename path are gone.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `genl_player_setup` | `player_selection.js:1296` | `role.c:2205–2721` (the `return 0` at `:3016` is the other compile) |
| `shall_i_pick_prompt` | local `:1266` | `#if 1` `yn_function` loop `:57–67` |
| `chargen_aspect_menu` | local `:1234` | `plsel_startmenu` `:2805–2845` plus `setup_*menu`, `role_menu_extra`, `select_menu` |
| `menu_pick` | local `:1173` | `select_menu` `PICK_ONE` with preselected Random |
| `randgend` | LIVE `roles.js:1073` | `role.c:852–877` |
| `randrace_checked` / `randalign_checked` | locals `:435` / `:440` | `randrace` / `randalign` when the index is in range; else `rn2` of the table size |
| `valid*_checked` | locals `:417–432` | false when the role or race index is negative |
| `plnamesuffix` | LIVE async `roles.js:1131` | `role.c:1664–1721`; empty name calls `tty_askname` |
| `maybe_skip_seps` | `:1203` | `role.c:2773–2802` |
| `rigid_role_checks` | existing | called once before the prompt and again inside each menu |

`sym.mjs`:

```
randgend         js/roles.js:1073   sync
plnamesuffix     js/roles.js:1131   ASYNC — await required
tty_askname      js/askname.js:96   ASYNC — await required
```

`imports.mjs --can player_selection.js roles.js randgend` and `plnamesuffix`: both `ALREADY`.

## C ↔ JS fidelity

`csym --callers`: `role.c:2179` passes height 0 (`genl_player_selection`). `wintty.c:636` passes `ttyDisplay->rows`. `player_selection` (`:1719`) passes `nhDisplay.rows` or 24. Height 0 is the named non-tty caller. `maybe_skip_seps(0)` returns 0 in both.

Entry. `in_role_selection` increments. `picksomething` is the four-facet `ROLE_NONE` test, sampled once. `randomall` writes `ROLE_RANDOM` into each unset facet. `rigid_role_checks` runs. If any facet is still `ROLE_NONE`, `build_plselection_prompt` then the `yn` loop: ESC and `q` quit, space / CR / LF become `y`, `@` and `*` become `a`, and the loop stops on `y`/`n`/`a`. `shall_i_pick_prompt` is that loop on row 0 (`NO_COLOR`), not a flush of the splash. Quit returns false and decrements the counter.

`makepicks`. `nextpick` starts at `RS_ROLE`. Each facet sets the following facet first, then picks only when the value is negative or (race and later) `valid*_checked` is false.

Role, `y`/`a` or `initrole == ROLE_RANDOM`: `pick_role(..., PICK_RANDOM)`; `k < 0` plines "Incompatible role!" then `randrole(false)`. Otherwise the menu. `ROLE_NONE` quits. Alignment, gender, or race first stores `ROLE_NONE` in that facet and in `k`, and sets `nextpick`. Filter clears the role, `reset_role_filtering`, `nextpick = RS_ROLE` (C does not test the return here). Menu `ROLE_RANDOM` calls `pick_role` and `randrole(false)` with no pline. Any other choice is `choice - 1`. Then `initrole = k`.

Race, gender, and alignment use the same split. The manual arm counts `ok_*`, and if that is 0 counts `valid*`. `k` stays 0 when both counts are 0. A menu opens only when `n > 1`. Filter on those three tests `reset_role_filtering` and otherwise stays on the same facet. The incompatible plines are "Incompatible race!", "Incompatible gender!", "Incompatible alignment!". `randgend` counts genders with `roles.allow & races.allow & genders[i].allow & ROLE_GENDMASK`, then `rn2(n)` and walks until the remainder hits 0, else `rn2(ROLE_GENDERS)`. An out-of-range role or race skips the mask (named; C would dereference) and still takes that `rn2`. After the menu or the count, the facet is assigned `k`, so a redirect keeps `ROLE_NONE`.

The `do`/`while` repeats while any facet is negative. Confirm runs when `picksomething && pick4u !== 'a' && !randomall`. Yes is preselected (`1`). No (`2`) sets `pick4u = 'n'`, clears all four facets, and restarts at `makepicks` without the shall-I-pick prompt. Rename (`3`) sets `renameinprogress`, clears `plname`, awaits `plnamesuffix`, and restores the four facets. Anything else, including `q` and ESC, quits. Space and return on that menu are Yes.

Success sets `flags.female = (initgend === 1)`. C does that in `u_init.c:949` (`flags.female = flags.initgend`) after `role_init` (`allmain.c:786`). `ROLE_GENDERS` is 2, so 0 and 1 match the boolean. `u_init.js` does not repeat the assignment. `role_init` (`role.c:2010–2015`) may flip `flags.female` and copies it into `initgend` only when `initgend` is invalid; after this function `initgend` is valid, so the early write does not change the facet.

`menu_pick`: ESC is `ROLE_NONE`. Space or return returns the preselected value, which is `ROLE_RANDOM` on these menus (`n == 1` uses `selected[0]`; `n == 0` is also Random). A letter returns that entry's value, which is what C takes from `selected[1]` when `selected[0]` is the preselected Random. The role separator blank uses the excess counted before `plsel_startmenu`'s `rigid_role_checks`; the header blank uses the count after it (`!= 2`).

No `rn2` was added inside `genl_player_setup` itself. The random picks are `pick_*` and `rand*`.

## Hallucinations / overclaim

The subject says `y`/`a`/`ROLE_RANDOM` failures pline. That is the flag test (`init* == ROLE_RANDOM` or `pick4u` `y`/`a`). The menu's Random choice does not pline, and C does not either (`role.c:158–161` and the same shape on the later facets). The `n <= 1` path assigns the counted `k` and does not reopen `nextpick`. The corner-menu and `yn` stand-ins are named and match the choice values above.

## Density

The whole `genl_player_setup` body and `randgend`. Both real callers are accounted for; the JS entry is the tty one. `plnamesuffix` is the live rename callee, not `tty_askname`.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify genl_player_setup --base 92e997504~1 --reach-all`.

```
verify genl_player_setup: baseline 92e997504~1 (scoreboard at 8eb83b375) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke genl_player_setup: no RNG-tagged reach; fixed smoke spread (12 run, 3.5s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. D-2833's green, strict, and cohort were not re-run here. Full suite was skipped in that D-log because `player_selection.js` is outside the shared-file set.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
