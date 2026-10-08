# Review 2551 — 3cb2f5ae2 — menu_overlay data home (D-3676)

- SHA: `3cb2f5ae2e4ce91d753ff55b20d2be2bfa5c5a2d`
- Subject: wintty.c tty_display_nhwindow menu_overlay home: geometry readers + select_menu forcers used phantom flags key, menu_overlay-off session kept corner menus (Archeologist-94231 33→36) (D-3676)
- D-entry: D-3676. Type: cliff (writer port, 5 sites across 4 files).
- Diff size: `js/invent.js` + `js/options.js` + `js/pager.js` + `js/questpgr.js` (flags→iflags, 5 sites); + test; ledger `wintty.c` D-tag.

## Intent vs deliverable

Promise: move all five `menu_overlay` geometry readers/forcers
from phantom `game.flags` to `game.iflags` (C `wintty.c:1924–1925`
/ `optlist.h:456`); Archeologist-94231 33→36.

Diff actually does: 3 geometry predicates (`nhw_menu_geometry`,
`show_nhw_menu_text`, questpgr legacy) + 2 select_menu forcers
(pick_one, pick_any) with their finally-restores. Nothing else in
`js/`.

## Inventory

| JS site | Change | C locus |
|---|---|---|
| `nhw_menu_geometry` (`js/invent.js:2981`) | read → iflags | `wintty.c:1924–1925` |
| `show_nhw_menu_text` (`js/pager.js:641`) | read → iflags | same |
| questpgr legacy (`js/questpgr.js:134`) | read → iflags | same |
| `select_menu_pick_one` forcer (`js/options.js:9867–9870,9998`) | force/restore → iflags | `tty_end_menu` maxrow |
| `select_menu_pick_any` forcer (`js/options.js:10237–10243,10450`) | force/restore → iflags | same |

No symbols deleted or re-pointed. No helpers.

## C ↔ JS fidelity

Cites verified against pinned C:

- `wintty.c:1923–1925` (`H2344_BROKEN` arm):
  `if (cw->maxrow >= rows || !iflags.menu_overlay)` → `offx = 0`.
  Home is `iflags` on both `#ifdef` branches. JS predicates now
  read `game.iflags?.menu_overlay === false`. Exact (reverse
  direction from D-3675: the writer was already right).
- `optlist.h:455–456`: `NHOPTB(menu_overlay, …,
  &iflags.menu_overlay, …)` — address on `:456`. ✓
- `flag.h:340`: `boolean menu_overlay;` inside
  `struct instance_flags` (`:251–499`), not `struct flag`. ✓
- Writers already on the C home: DOSET row (`:10519`,
  `{obj:'iflags'}`) + allopt row (`:12252`). ✓

Completeness:

- Zero remaining `game.flags.menu_overlay` reads/writes anywhere
  in `js/` (word-boundary grep, `iflags` excluded). Phantom fully
  evicted — readers and forcers moved in the same commit, so no
  split-brain window where forcers write one home and readers read
  the other.
- Forcer semantics preserved on the new home: save prev, force
  `false` when multi-page (C whole-menu maxrow ≥ rows), restore
  (`delete` when previously undefined) in `finally`. The
  load-bearing claim (page-slice maxrow is short, so the force is
  what keeps multi-page tails fullscreen) matches the pre-existing
  design; the commit only changes the key's home.

## Hallucinations / overclaim

None. No dispatch-vs-callee gap. No FORCE/DIAG/seed reads. Rule
#2 clean (this iteration's `--rulecheck`).

## Density

Cliff phase: D-3669 data-home class, one writer family (the
geometry predicate + its forcers), whole, code + ledger + verify
in one handoff. Right-sized. Sampled verdicts: all 5 sites —
faithful.

## Verification

D-log claim: `verify doterrain: 0 PASS, 1 moved, 0 no-movement`
(33→getpos@36) + REACH-OK both fns + full 44/44.

Committed board diff at this SHA independently confirms the
SHA-specific movement: step 33→36, owner `doterrain`→`getpos`,
the only row changed. Audit re-measure on HEAD code
(`verify doterrain,tty_display_nhwindow --base 3cb2f5ae2~1 --reach-all`):

```text
scen-options-Archeologist-94231: PASS
verify doterrain: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
smoke doterrain: … 24 PASS, 0 regressed → REACH-OK
verify tty_display_nhwindow: … 0 blocked (vacuous, as D-logged) + REACH-OK
```

PASS-today is consistent (D-3677/D-3678 moved the session
further); 0 worse, REACH-OK both. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
