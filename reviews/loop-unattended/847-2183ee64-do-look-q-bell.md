# Review 847 — 2183ee64 — pager.c do_look whatis-menu `q` bells, menu stays (D-1877)

## Metadata

- SHA: `2183ee64` ("pager.c do_look whatis-menu `q` bells, menu stays (do_look corpus owner) (D-1877).")
- D-id: D-1877. Queue row: Open (`do_look` corpus owner), popped in order.
- Files: `js/pager.js` (+8/−1), docs + map + scoreboard. No new imports.

## Intent vs deliverable

Subject promises: split the `q`/ESC arm in `whatis_menu_choice()` so `q`
bells with the menu kept, ESC still dismisses. Diff actually adds exactly
that: `key === 27` keeps dismiss + `return 'q'`; new `ch === 'q'` arm does
`tty_nhbell(); continue;` with a C citation. Promise kept, nothing else.

## Inventory

| JS function | Status |
|---|---|
| `whatis_menu_choice` (pager.js, `q` arm) | changed: bell+continue instead of dismiss |

Single-arm change; no new/deleted symbols (`sym.mjs` has nothing to
resolve — no symbol deleted or re-pointed, so the Required `sym.mjs`
paste is vacuous here).

## C ↔ JS fidelity

C locus: `process_menu_window` (`nethack-c/upstream/win/tty/wintty.c:1328–1768`,
via `node scripts/csym.mjs process_menu_window`), default arm at `:1739–1743`:

```c
default:
    if (cw->how == PICK_NONE || !strchr(resp, morc)) {
        /* unacceptable input received */
        tty_nhbell();
        break;
```

`break` exits the switch; the menu loop re-reads — menu stays, bell,
screen-silent. JS `tty_nhbell(); continue;` is the same observable.

`'q'`-not-in-`resp` verified, not assumed: `resp` is built at
`:1531–1537` as selectors + `gacc` + `" "` + `"0123456789\033\n\r"`
+ `mapped_menu_cmds` + `default_menu_cmds`, and `default_menu_cmds`
(`:287–292`) is only the page keys (`MENU_FIRST_PAGE/LAST/NEXT/PREV/
SELECT_ALL/UNSELECT_ALL/INVERT_ALL/SELECT_PAGE/UNSELECT_PAGE/
INVERT_PAGE/SEARCH`). `q` appears in none of these under the default
keymap, so C takes the bell path. ESC (`\033`) *is* in `resp` and is
handled by its own cancel case upstream (returns −1 → `do_look` `> 0`
false → `ECMD_OK`); JS dismiss + `return 'q'` → `do_look` case `'q'`
→ return reaches the same outcome. ✓

`tty_nhbell` is a LIVE import (export `js/display.js:2277`, imported at
pager.js:28). No clone, no stub. The remaining `whatis_menu_choice` arms
are untouched; space/CR re-prompt divergence is explicitly named in the
commit and map (turns.md), not silently kept.

## Hallucinations / overclaim

None. D-log claims "No new imports" (true — no import hunk) and "1
corpus PASS" (matches Verify bullet). No "Match C" dispatch claim beyond
the one arm actually ported.

## Density

+8/−1 is small, but §2b excuses it when "C is that small" — the C locus
is a 4-line switch arm, and the fix is exactly that arm. Acceptable;
not a split-hypothesis waste.

## Verification

- Diff grep: no FORCE/DIAG/getRngLog/seed/coordinate content (display
  keypress logic only). Rule #2 untouched (no imports changed).
- Re-measured myself: `node scripts/hidden-proxy.mjs verify do_look
  --base 2183ee64~1` → `1 PASS, 0 moved past, 0 worse → PROGRESS`
  (`random-seed0116-wizard-wear-shop-1021c3a5: PASS`). Matches the D-log
  bullet exactly — not vacuous.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
