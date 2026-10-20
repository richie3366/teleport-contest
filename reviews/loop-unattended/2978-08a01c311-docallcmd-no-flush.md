# Review 2978 — 08a01c311 — docallcmd drops the post-menu flush_screen

- SHA: `08a01c311` (near-pass cliff; board owner wintty.c
  process_menu_window, writer do_name.c docallcmd)
- D-entry: D-4138; Ledger: docallcmd ported
- `js/` diff: `js/do_name.js` +4/−3

## Intent vs deliverable

Promise: docallcmd goes straight from `select_menu` / `destroy_nhwindow`
to the picked arm's prompt. The corner destroy (docorner) calls bot()
only when the menu reached the status rows. JS followed
dismiss_nhw_menu with `flush_screen(1)`, whose bot() repainted a status
line C had left blank. Diff: the `await flush_screen(1)` is deleted and
the comment says why. Promise = diff.

## Inventory

- `docallcmd_menu` — do_name.js:1555 (select_menu stand-in for
  docallcmd :520–556); C do_name.c:498–601.
- Removed callee `flush_screen` — `sym.mjs`: `js/display.js:8956 ASYNC`
  (still used elsewhere; only this call site goes).

## C ↔ JS fidelity

```c
end_menu(win, "What do you want to name?");
if (select_menu(win, PICK_ONE, &pick_list) > 0) { ch = pick_list[0].item.a_char; ... }
else ch = 'q';
destroy_nhwindow(win);                       /* :556 — no flush, no docrt */
```

The removal is right. Nothing between :556 and the arm's prompt
repaints, and wintty.c docorner bot()s only under the
`ttyDisplay->rows` test (:3715–3720).

The function it touches is a hand-rolled select_menu clone, though, and
two of its arms differ from C:

1. Enter / Space with no item picked: C tty process_menu_window sets
   `finished = TRUE` (wintty.c:1617–1630, `' '` on the last page), so
   select_menu returns 0 and docallcmd takes `ch = 'q'` (nothing
   happens). JS `continue`s and repaints the menu (do_name.js loop). The
   JS header (:1552) admits this ("Space/Return with no pick re-prompts
   (existing JS; C n==0 → 'q')").
2. `lootabc`: C passes selector 0 (`abc ? 0 : any.a_char`), so
   tty_end_menu assigns `a`, `b`, `c`… (wintty.c:2723
   `curr->str[0] = curr->selector = menu_ch`). JS labels each row with
   its group accelerator (`C - a monster`, `y - …`) and accepts only
   those, so `a`/`b` pick nothing.

Neither arm is reached by a corpus session today (the verify set is 0
blocked on docallcmd).

## Hallucinations / overclaim

The D-log calls docallcmd ported. Its menu step is a CLONE that diverges
on the two arms above. This audit moves the ledger row to partial with
both arms in the omit.

## Density

One-line fix in the writer, measured with the setCell stack hook.

## Verification

```text
verify process_menu_window (--base 08a01c311~1): options-Rogue-50557417 PASS,
  options-Monk-50355038 PASS, options-Priest-50162016 PASS (the last two by 4124998f4)
verify docallcmd: 0 blocked
```

Consistent with the D-log (Rogue 166/166).

## Actionable C-wrongs

1. do_name.c docallcmd `:520–556`: docallcmd_menu's select_menu clone.
   Enter/Space with no pick must return 'q' (wintty.c:1617–1630), and
   under `lootabc` rows get tty_end_menu letters a, b, c… (wintty.c:2723).
   This is unreached, so it is ledger debt (partial), not Must-fix. It
   rides as a same-file companion of the next do_name.c cliff.

Verdict: **ACCEPT-WITH-DEBT**
