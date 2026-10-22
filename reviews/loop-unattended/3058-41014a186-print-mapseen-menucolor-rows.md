# Review 3058 — 41014a186 — print_mapseen's overview rows carry add_menu's menucolor

- SHA: `41014a186` (cliffs head `save_dungeon`, a region label; writer
  print_mapseen: scen-options-Priest-53051011 step 111, final overview)
- D-entry: D-4218; Ledger: print_mapseen ported (+ nhl_text note fix)
- `js/` diff: dungeon.js +16 −10

## Intent vs deliverable

Promise: print_mapseen adds each level row with add_menu (`:3583`) and
each feature, place, branch and cemetery line with add_menu_str
(`:3635–3723`). windows.c add_menu applies menucolors to all of them;
only the dungeon name is a heading. JS pushed those rows plain, so the
end-of-game overview («Level 1: <- You were here.», «Final resting place
for») stayed gray. The rows now carry menu_row_coloring. The commit also
fixes the nhl_text ledger note that D-4217 left stale.

Diff:

- add_overview_str takes `ctx` and spreads `ctx.menu_row_coloring(text)`.
- The level row spreads it when `why !== -1` (the non-selectable row).
- The four add_overview_str call sites pass ctx.
- show_overview's existing dynamic `import('./options.js')` also pulls
  menu_row_coloring into ctx.
- nhlua.c.jsonl nhl_text gets a real note in place of «seed: no scored
  analogue».

The promise matches the diff.

## Inventory

- print_mapseen — dungeon.js:3054 (C dungeon.c `:3516–3728`). Level
  row and add_overview_str calls changed.
- add_overview_str — dungeon.js:2932, a JS-local wrapper standing for C
  add_menu_str. Changed.
- show_overview — dungeon.js:~3277 (C `:3305–3341`). ctx gains
  menu_row_coloring.
- sym.mjs:

```text
add_overview_str NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/dungeon.js:2932
print_mapseen    NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/dungeon.js:3054
menu_row_coloring js/options.js:6291   sync
```

  Each has a single definition. add_overview_str is a thin
  add_menu_str stand-in that now does add_menu's menucolor step, so it
  matches C for the rows it builds. No symbol deleted. The options.js
  import is dynamic and inside an async function, so no TDZ.

## C ↔ JS fidelity

C level row `:3577–3584`:

```c
any = cg.zeroany;
if (final == -1)
    any.a_int = ledger_no(&(mptr->lev)) + 1;
add_menu(win, &nul_glyphinfo, &any, 0, 0, ATR_NONE, NO_COLOR,
         buf, MENU_ITEMFLAGS_NONE);
```

- No SKIPMENUCOLORS, so windows.c `:1803–1807` colours the row in both
  cases. With final == -1 the row has an identifier, so it is
  selectable. select_menu_pick_one already colours selectable rows on
  the bare text with attr_n 4 (review 3055), so JS skips the spread
  there to avoid double handling. Otherwise the row has no identifier,
  wintty attr_n is 0, and JS colours the whole line via the spread. Both
  arms match.
- Heading `:3553`: add_menu_heading, so SKIPMENUCOLORS, and at gameover
  ATR_NONE/NO_COLOR (windows.c `:1822–1824`). JS still uses
  ctx.menu_heading_style, which carries the gameover gate. Unchanged and
  correct.
- add_menu_str sites `:3635` (features), `:3672`/`:3677` (places),
  `:3692` (branch), `:3705`/`:3717`/`:3723` (cemetery/killer). All go
  through add_menu_str, which means ATR_NONE/NO_COLOR, then menucolor.
  JS routes all of them through add_overview_str, which now applies
  menu_row_coloring. Same. add_overview_str's `if (!text) return` means
  a helper returned no line. The C sites are each inside their own
  `if`, so a row is pushed in exactly the cases C adds one.
- Gameover: add_menu's menucolor step has no gameover gate (only the
  heading does), so the end-of-game overview is coloured. That matches
  the capture (`\e[97m` on rows 1–3).
- No RNG.

## Hallucinations / overclaim

None. The ledger fix is accurate: the nhl_text note now describes the
D-4217 state. The D-log has no named omission for print_mapseen, which
is true for the menucolor step.

## Density

One cliff, one writer, and the row family of one C function. This is
the third one-caller instance of the per-caller menucolor shape whose
debt review 3056 records (D-4216 doset, D-4217 nhl_text, D-4218
print_mapseen, all on the same probe session, three iterations). Each
was the cliffs head of its parent, so the one-cliff rule was followed.
The cost is the shape, not this SHA.

## Verification

```text
verify save_dungeon,print_mapseen --base 41014a186~1 --no-reach
  verify save_dungeon: 1 session(s) blocked (1 at baseline)
    scen-options-Priest-53051011: PASS
  verify save_dungeon: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  verify print_mapseen: 0 blocked (vacuous; board names save_dungeon)
```

This matches the D-log (frozen runner PASS RNG 2736/2736, Screen
115/115). The diff has no seed, step or coordinate reads. The D-log
lists green 2/2, strict ×2, cohort 7/7, full 44/44 and sweep 710/710
REACH-OK.

## Actionable C-wrongs

None. The shared per-caller-menucolor debt is in review 3056.

Verdict: **ACCEPT**
