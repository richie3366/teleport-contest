# Review 1845 — f2ba5333b — let_to_name (D-2886)

- SHA: `f2ba5333b` (coverage; `invent.c` `let_to_name` and `free_invbuf`)
- Files: `js/invent.js`, `js/pickup.js`. About 140 `js/` insertions in `invent.js`.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `let_to_name` that keeps the heading in `game.invbuf`, `free_invbuf`, `display_pickinv` showsym only when the menu answers, and floor pickup showsym when `how != PICK_NONE`. The diff does that. `sym.mjs`:

```
let_to_name  js/invent.js:2612   sync
free_invbuf  js/invent.js:2667   sync
def_oc_syms  js/objects.js:85   sync   export const
```

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `let_to_name` | export `invent.js:2612` | `invent.c:4799–4839` |
| `LET_CLASS_NAMES` | local table | `names[]` `:4789–4793` |
| `OTH_SYMBOLS` | local | `oth_symbols[]` `{ CONTAINED_SYM, 0 }` |
| `free_invbuf` | export `invent.js:2667` | `invent.c:4844–4850` |
| `let_to_name_let` | local signed-byte | `char let` on this ABI |

## C ↔ JS fidelity

`csym` body is `invent.c:4799–4839`. No RNG. `let` in `1 .. MAXOCLASSES-1` indexes `names[]`. Slot 0 is a null pointer and is not selected. The JS array matches that list, including `"Illegal objects"` at `ILLOBJ_CLASS`. Otherwise `strchr(oth_symbols, let)`. `CONTAINED_SYM` is `'>'` (`js/const.js:1777`) and selects `"Bagged/Boxed items"`. Any other value uses `names[ILLOBJ_CLASS]`.

A zero `let` makes `strchr` hit the terminator. C then indexes `oth_names` one past the array. JS sees that index, refuses it, and uses `"Illegal objects"`. The commit names that. Real class bytes are not zero.

The length is `Strlen(class_name)` plus `sizeof "unpaid_"` (8, the NUL included) or `sizeof ""` (1), plus `Strlen("  ('%c')")` (8) and the pad of 8 when `oclass` is set. A short buffer is dropped and `invbufsiz` becomes `len + 10`. Unpaid writes `"Unpaid "` plus the class name. `showsym` pads with `while (--mlen > 0)`, which is C's own off-by-one (a 7-character name gets no pad spaces), then `"  ('%c')"` from `def_oc_syms[oclass].sym`. `free_invbuf` clears the buffer and the size.

`display_pickinv` uses `want_reply && menu_head_objsym` (`invent.c:3291`, `invent.js:3941`). Floor `query_objlist_pickup` passes `how != PICK_NONE && menu_head_objsym` (`pickup.c:1121–1122`, `pickup.js:1687`). `query_category` (`pickup.c:1363`, `pickup.js:630`) and `query_objlist` (`pickup.js:824`) already passed that third argument.

## Hallucinations / overclaim

`save.c` `freedynamicdata` does not call `free_invbuf`. Named. A caller that kept the previous return value keeps that string, because JS strings are not the C buffer. The commit says every wired caller copies first (`add_menu_heading`, `putstr`, `Sprintf`). The unpaid size uses `sizeof "unpaid_"`, not the 7 characters of `"Unpaid "`. The written text is `"Unpaid "`. That matches C.

## Density

The 41-line function, `free_invbuf`, and the two showsym gates that were wrong. Not a second inventory menu.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify let_to_name --base f2ba5333b~1 --reach-all`.

```
verify let_to_name: baseline f2ba5333b~1 (scoreboard at 457f75d7b) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke let_to_name: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
