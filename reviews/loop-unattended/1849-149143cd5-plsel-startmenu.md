# Review 1849 — 149143cd5 — plsel_startmenu (D-2890)

- SHA: `149143cd5` (coverage; `role.c` `plsel_startmenu`)
- Files: `js/player_selection.js` (header helper replaced; four aspect menus and the confirm menu call it)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `plsel_startmenu`: `rigid_role_checks` first, female `name.f` only when `GEND == 1`, the unset-facet line versus `"<name> the …"`, each field cut to 20, and the blank only when `maybe_skip_seps` is not 2. The old header used the prolog slash (`Caveman/Cavewoman`) whenever gender was unset. The diff deletes `role_display_name` and `aspect_header` and does that. `sym.mjs`:

```
plsel_startmenu   NOT EXPORTED — 1 local js/player_selection.js:924
role_display_name NOT FOUND
aspect_header     NOT FOUND
rigid_role_checks js/player_selection.js:649   sync
maybe_skip_seps   NOT EXPORTED — 1 local js/player_selection.js:1234
add_menu_str      NOT FOUND
```

`role_display_name` and `aspect_header` are gone. Nothing else still calls them.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `plsel_startmenu` | local `player_selection.js:924` | `role.c:2806–2845` |
| `rigid_role_checks` | live export | `role.c` (called at `:2814`) |
| `maybe_skip_seps` | local, one body | `role.c:2777–2802` |
| `add_menu_str` | named omit | `windows.c:1831–1838`; the two strings are the returned lines |
| `chargen_aspect_menu` | callers | `role.c:2310`, `:2404`, `:2492`, `:2580` |
| confirm loop | caller | `role.c:2655` (`RS_filter`) |

## C ↔ JS fidelity

`csym` body is `role.c:2806–2845`. Five call sites. No RNG in this function. `rigid_role_checks` can roll when a facet is `ROLE_RANDOM`; that roll is inside the callee, after the role menu has already stored `excess`.

The ternary is `ROLE < 0` → `"<role>"`, else `GEND == 1 && name.f` → `name.f`, else `name.m` (`:2816–2818`). JS is that if/else. `roles.js` stores `name.f` as `null` or a non-empty string (`Caveman` / `Cavewoman` at `roles.js:170`). A null female name is false in both. The slash form remains on the "Shall I pick" prompt (`:822`, C `:1782`), which is not this function.

Unset name or any facet `< 0` builds `"<role> <race.noun> <gender.adj> <alignment.adj>"` (`:2820–2826`). Otherwise `"<name> the <alignment.adj> <gender.adj> <race.adj> <role>"` (`:2827–2834`). Race is `noun` on the first line and `adj` on the second. JS uses those fields.

`%.20s` is 20 bytes, stopping at NUL. `clip20` is `String.slice(0, 20)`, which is 20 code units. Role, race, gender, and alignment strings in `roles.js` are ASCII, and a 20-byte ASCII prefix is the same 20 characters. Five clipped fields plus `" the "` fit in `QBUFSZ` 128 (`global.h:390`), so the buffer itself does not clip further. `!svp.plname[0]` is a zero length or a leading NUL. JS treats both as empty.

`maybe_skip_seps` returns 0 unless `aspect == RS_ROLE` (`:2782–2783`). The header blank is pushed when the return is not 2 (`:2842–2843`). The role arm still computes `excess` before `plsel_startmenu` (`role.c:2307`, `player_selection.js:1387`), then the separator uses that pre-rigid count (`excess < 1 || excess > 2` at `:2316`). Race, gender, and alignment pass `preExcess == null`, so they always add the blank. Those four calls and the confirm call (`:1669`) are the five C sites. `chargen_aspect_menu` no longer calls `rigid_role_checks` itself.

## Hallucinations / overclaim

`create_nhwindow`, the `WIN_ERR` panic, and `start_menu(MENU_BEHAVE_STANDARD)` are named as the corner-menu prologue. The returned array is the two `add_menu_str` lines, not a winid. The map says the other C callers of `add_menu_str` still build their own lines. The `#else` `genl_player_setup` at `role.c:3016` is the non-TTY stub and stays out. The subject does not claim those window calls are live functions.

## Density

The 41-line body, in C order, with every call site going through this function. The deleted slash header was the previous stand-in, not a second arm left behind.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify plsel_startmenu --base 149143cd5~1 --reach-all`.

```
verify plsel_startmenu: baseline 149143cd5~1 (scoreboard at 91892bcc6) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke plsel_startmenu: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. Public chargen does not leave a corpus session blocked on this name; the smoke spread is the reach gate.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
