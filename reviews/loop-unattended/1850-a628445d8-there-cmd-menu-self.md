# Review 1850 — a628445d8 — there_cmd_menu_self (D-2891)

- SHA: `a628445d8` (coverage; `cmd.c` `there_cmd_menu_self`)
- Files: `js/cmd.js` (self builder, `mcmd_addmenu`, caller `K`)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean". `imports.mjs --can cmd.js trap.js t_at` → `ALREADY: cmd.js already statically imports trap.js`. Same for `do_name.js` `x_monnam`. No new top-level edge.

## Intent vs deliverable

Subject promises one `there_cmd_menu_self` in C order, plus `mcmd_addmenu`, replacing hardcoded "fountain"/"sink" and "Dismount your steed", an empty-array invent treated as occupied, and a local trap lookup. The diff deletes `there_cmd_menu_self_items` and does that. `there_cmd_menu` adds the returned `K`. `sym.mjs`:

```
there_cmd_menu_self       NOT EXPORTED — 1 local js/cmd.js:2556
there_cmd_menu_self_items NOT FOUND
mcmd_addmenu              NOT EXPORTED — 1 local js/cmd.js:2537
u_at                      js/const.js:3195   sync
                          ALSO clones: js/teleport.js:118  js/zap.js:824
t_at                      js/trap.js:1098   sync
                          ALSO clone: js/steed.js:169
travel_t_at               NOT EXPORTED — 1 local js/cmd.js:2775
defsym_explanation        js/uhitm.js:4344   sync
x_monnam                  js/do_name.js:944   sync
stairway_at               js/mklev.js:405   sync
objects_at                js/mkobj.js:3335   sync
Is_container              js/const.js:3199   sync
doname                    js/objnam.js:3104   sync
num_spells                js/spell.js:1393   sync
can_reach_floor           js/engrave.js:385   sync
```

`cmd.js` imports `u_at` and `t_at`. It does not add another clone. `travel_t_at` remains for `travel_avoids_cell` (`:2792`), not for this menu.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `there_cmd_menu_self` | local `cmd.js:2556` | `cmd.c:4435–4520` |
| `mcmd_addmenu` | local push `{act, text}` | `cmd.c:4420–4431` |
| `u_at` | live import | `you.h:562` |
| `stairway_at` | live import | `stairs.c` |
| `can_reach_floor` | live import | `engrave.c:385` |
| `defsym_explanation` | live import | `defsyms[].explanation` |
| `x_monnam` | live import | `do_name.c`; call matches `:4469–4471` |
| `objects_at` | live import | `level.objects[x][y]` |
| `Is_container` / `doname` | live imports | container and name |
| `num_spells` | live import | `spell.c` |
| `t_at` | live import | `trap.c:1098` in the port |

## C ↔ JS fidelity

`csym` body is `cmd.c:4435–4520`. The only call is `cmd.c:4857` (`K += there_cmd_menu_self(win, x, y, &act)`). The fourth argument is `UNUSED`. JS omits it. No `rn2` in this function. `x_monnam` can roll when the hero is hallucinating; that roll is inside the callee.

`u_at` is `ux === x && uy === y`. C is `==` (`you.h:562`). Both sides are map coordinates. A miss returns `K`, which is 0.

Then, in order: fountain or sink and `can_reach_floor(false)` → drink, using `defsym_explanation(S_fountain)` or `S_sink`. Those indices are 37 and 36 (`const.js`). The explanation table has `'fountain'` and `'sink'` (`uhitm.js:4327`), which is `defsym.h:133–134`. Fountain again and `can_reach_floor(false)` → dip. Throne → sit. Altar → offer. `can_reach_floor` is called on each guard, not cached. Stairs: `stway.up` then `!stway.up`, with `isladder` choosing "ladder" or "stairs". `stairway_add` stores those fields (`mklev.js:394`). Steed → `Dismount ` plus `x_monnam(..., ARTICLE_THE, null, SUPPRESS_SADDLE, false)`. The `#if 0` poly ability (`:4475–4481`) is absent.

`objects_at` is the pile head. Pickup uses `nexthere` ? `"items"` : `doname`. Container adds loot and tip. `oclass == FOOD_CLASS` adds eat. Empty `game.invent` (`[]`) does not add Inventory or Drop; a non-empty array or a list head does. Rest, search, and look always append. `num_spells() > 0` adds Cast. `t_at` then `tseen` and `ttyp != VIBRATING_SQUARE` adds disarm. Each `mcmd_addmenu` increments `K` with the comma operator, and the function returns `K`.

`there_cmd_menu` calls it when `u_at` (`cmd.c:4856–4857`) and adds `there_cmd_menu_common`'s length. `K == 0` returns `'\0'`.

## Hallucinations / overclaim

`mcmd_addmenu` does not call `add_menu`. The glyph, color, attribute, and accelerator are named (D-2706). The picker reads `act` and `text`, which is what `any.a_int` and `txt` are. `there_cmd_menu_next2u`, `there_cmd_menu_far`, the `K==0` travel fallback, and the `K==1` `act_on_act` path stay named on `there_cmd_menu`, not on this function. The other `mcmd_addmenu` sites (`:4544`, `:4631`, `:4651`) are those omitted builders; common still pushes its own row.

## Density

The whole self function, including the invent and trap arms the old helper got wrong. One call site wired. The `#if 0` arm is compiled out, not a stub in a live arm.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify there_cmd_menu_self --base a628445d8~1 --reach-all`.

```
verify there_cmd_menu_self: baseline a628445d8~1 (scoreboard at ef40ca579) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke there_cmd_menu_self: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
