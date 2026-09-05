# Review 849 — c209ccc7 — wintty.c erase_menu_or_text corner dismiss keeps WIN_STATUS (D-1879)

## Metadata

- SHA: `c209ccc7` ("wintty.c erase_menu_or_text corner dismiss keeps WIN_STATUS (process_menu_window corpus owner) (D-1879).")
- D-id: D-1879. Queue row: Open (`process_menu_window` corpus owner), popped in order.
- Files: `js/options.js` (+9/−9), docs + map + scoreboard. No import changes.

## Intent vs deliverable

Subject promises: route the three `select_menu_pick_any` dismiss sites
(ESC / Enter / space-finish) through `dismiss_nhw_menu({ keep_status:
true })` so corner dismiss keeps WIN_STATUS. Diff does exactly that —
three hand-rolled `overlay=false; docrt(); flush` blocks replaced, plus
C-citing comments. Promise kept.

## Inventory

| JS change | Status |
|---|---|
| 3 dismiss sites in `select_menu_pick_any` | changed: delegate to LIVE `dismiss_nhw_menu` |

No new/deleted symbols (`sym.mjs` vacuous); `dismiss_nhw_menu` was
already imported in options.js at parent (line 90), `keep_status`
pre-existed in `invent.js` at parent (line 2508) — both D-log claims
confirmed from the parent tree.

## C ↔ JS fidelity

C locus `erase_menu_or_text` (`nethack-c/upstream/win/tty/wintty.c:965–984`,
via `node scripts/csym.mjs erase_menu_or_text`):

```c
if (cw->offx == 0) { ... docrt(); flush_screen(1); ... }
else { docorner((int) cw->offx, cw->maxrow + 1, 0); }
```

`dismiss_nhw_menu` (`js/invent.js:2496`, LIVE async, pre-existing and
C-cited): missing/fullscreen geom → `docrt()` + `flush_screen(1)`
(= C fullscreen else-branch; with `keep_status` it additionally skips
`clear_committed_status`, so the fullscreen grid effect is byte-identical
to the replaced hand-roll); corner geom → `docorner(offx, maxrow+1, 0)`
(= C corner arm exactly). The mechanism story checks out against C
`select_menu` (`src/windows.c:1858–1863`, `gb.bot_disabled` held across
the menu — read at HEAD): corner `docorner` → `bot()` no-ops while
disabled, so rows 22–23 persist; the old code's unconditional
`docrt()` (= `cls`, wipes 22–23) + flush-while-disabled was precisely
the divergence. This is the playbook's preferred shape: delete wrong JS,
reuse the faithful helper. No STUB, no clone, no RNG on the path.

Named (not hidden): identical hand-rolled corner dismisses remain in
`js/pickup.js` loot/pickup loops — explicitly named as the same C-wrong
with its own future row conditioned on a corpus block, plus fullscreen
`clear_committed_status` semantics (D-0467) and search/getlin repaint.
Sibling-file debt outside this diff; naming it here is honest map debt,
not a Must-fix for this SHA.

## Hallucinations / overclaim

None. "Proxy owner is heuristic" is stated outright; the D-log does not
dress the heuristic as a measurement. "No new imports" true. "1 corpus
PASS" matches the Verify bullet.

## Density

+9/−9 against a 20-line C function — C-locus-sized, one cluster. Fine.

## Verification

- Diff grep: no FORCE/DIAG/seed/coordinate content (dismiss plumbing
  only). Rule #2 untouched.
- D-log includes a mechanism double-check (throwaway grid dump: rows
  22–23 blank before, status-identical after, rows 0–21 unchanged).
- Re-measured myself: `node scripts/hidden-proxy.mjs verify
  process_menu_window --base c209ccc7~1` → `1 PASS, 0 worse →
  PROGRESS` (`...-b1a64b99: PASS`). Matches the D-log exactly.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
