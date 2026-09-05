# Review 812 — 9dc829a9 — botl.c do_statusline1 leftover WIN_STATUS (D-1842)

## Metadata
- Full / short hash: `9dc829a9de1c234332eb31dc87065c1278c780c0` / `9dc829a9`
- Parent: `4f6a3bcc` (D-1841). Map-driven Open: 4 corpus blocks (review 801’s two `explore-seed0116` re-attrs + two `ind-*`).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-05 04:46:28 +0200
- D-id: **D-1842**
- Stats: `js/display.js` +104/−7; `js/invent.js` +9/−2. `js/` insertions **113** ≤250. Band **80–350**.
- Claims to close: leftover WIN_STATUS under item-action menu after D-1832 deleted `_snapshotStatusGrid`. Not paging `docorner` / TTY_PERM_INVENT.
- JS / map: `do_statusline1` / `docorner` / `_buildScreenOutput` / `dismiss_nhw_menu`. `c-js-map/turns.md`. Archive **Addressed:** D-1842 `9dc829a9`.

## Intent vs deliverable

Git subject promises: C leftover `"Wizard the Evoker              S"` vs JS full `St:… Neutral`; invent morestr overlay then `docorner` `cl_end` from `tty_curs(BASE, offx)` `--x`; JS `flush_screen` rebuilt the botl cache.

`node scripts/csym.mjs do_statusline1` → `botl.c:47–98`. `--callers`: `botl.c:265` (`!VIA_WINDOWPORT` putstr), `end.c:585`. `bot` `:252–271` (`gb.bot_disabled` `:255–256`; VIA_WINDOWPORT → `bot_via_windowport` `:961–1279`, BL_TITLE `"%-30s"` `:1007`). `docorner` `wintty.c:3649–3721`. `--callers docorner`: `wintty.c:982` (`erase_menu_or_text` corner), `:1523` paging. `tty_curs` `:2057–2158` (`cw->curx = --x`). `erase_menu_or_text` `:965–984`.

The diff **does** rename/export `do_statusline1`, add `docorner`, skip status rebuild while disabled, and switch corner dismiss to `docorner`.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `do_statusline1` | LIVE rename | dump BOTL_NSIZ + windowport col-31 pad |
| `_statusLine1` | alias | 3-line wrapper, not a second C body |
| `docorner` | LIVE new | `erase_menu_or_text` `:982` |
| `_paint_gbuf_cell` | CLONE | `row_refresh` / existing gbuf paint |
| `_buildScreenOutput` skip 22–23 | LIVE | not snapshot; leave tty cells |
| `dismiss_nhw_menu` corner | LIVE | was `flush_screen` cache-repaint |
| `bot` early return | LIVE | already D-1831 |
| paging `ystart_between_menu_pages` / TTY_PERM_INVENT | OMIT named | |
| dump `mrank_sz+15` / SCORE_ON_BOTL / remaining BL_ | OMIT named | |

`node scripts/sym.mjs` (no clone→import; snapshot still gone):

```
do_statusline1   js/display.js:5025   sync
docorner         js/display.js:5665   ASYNC — await required
dismiss_nhw_menu js/invent.js:2490   ASYNC — await required
bot              js/display.js:5811   ASYNC — await required
_snapshotStatusGrid NOT FOUND in js/**
_restoreStatusGrid NOT FOUND in js/**
```

FORCE/DIAG/`getRngLog`/`fastforward`: **none**. Rule #2: clean. No seed/step/coordinate gate.

## C ↔ JS fidelity

**`gb.bot_disabled` (`botl.c:255–256`).** `bot()` still returns before putstr. **Match.**

**Corner dismiss (`erase_menu_or_text` `:982`).** C `docorner(offx, maxrow+1, 0)`. JS was `flush_screen` which `clearScreen` + painted `_lastStatus1`. Now `docorner(g.offx, maxrow+1, 0)`. **Match the callee.**

**`docorner` (`:3686–3719`).** `tty_curs(BASE, xmin, y)` then `cl_end`. `tty_curs` `:2114` `cw->curx = --x` (BASE offx 0) so clear starts at screen col `xmin-1`. JS `x0 = xmin-1`. MAP offx 0 / offy 1: C `row_refresh(xmin, COLNO-1, y-1)`; JS `mx = c+1` from `c=x0` → first map x `xmin`. `ymax >= WIN_STATUS.offy` → `disp.botlx`; `bot()` no-ops while disabled, so leftover left of `x0` stays (invent `"St (end)"` → leftover `"S"`). **Match that `--x` / no-op, not a grid clone.**

**`_buildScreenOutput`.** Still a JS full-grid rebuild C never does. While `_bot_disabled`, it no longer `clearScreen`s rows 22–23 or paints the cache. That is “don’t wipe cells C never wipes”, not D-1831 snapshot/restore. `_paintToplineAndStatus` also skips when disabled.

**`do_statusline1` vs tty.** C tty `bot()` never calls `do_statusline1`; it uses `bot_via_windowport` title `"%-30s"` so `St:` is col 31. Dump path pads to `mrank_sz+15` and `"  Neutral"`. JS keeps the pre-existing col-31 pad, adds BOTL_NSIZ name clip and `suppress_map_output`. Named omit of dump pad / SCORE. **Match the displayed tty title width; do not stamp dump putstr.**

**Callee closure.** One leftover-WIN_STATUS family. `docorner` / `bot` / `set_bot_disabled` LIVE. `_paint_gbuf_cell` is a verified CLONE of the gbuf loop. Named OMITs only. No STUB in the dismiss arm.

## Hallucinations / overclaim

The subject names `do_statusline1` while the corpus owner is leftover cells after `docorner`, not dump `putstr`. They cite windowport `:1007` in the same sentence — not a stubbed callee. Do **not** stamp paging `docorner` or TTY_PERM_INVENT. Three corpus PASS, one later `dopush` — not “no session blocked”.

## Density

§2b: leftover WIN_STATUS / `docorner` dismiss. +113. Did **not** glue `lookat`. Right size.

## Verification

This audit: `node scripts/hidden-proxy.mjs verify do_statusline1 --base 9dc829a9~1` → `4 session(s) blocked`. Summary: **`3 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`** (`explore-seed0116-wizard-wear-shop-71e90577` PASS; `explore-seed0116-wizard-wear-shop-cfabc006` → `dopush` step 127 was 120; `ind-Tourist-662206027-62b71e69` PASS; `ind-Wizard-971871364-8f1ba690` PASS). Matches the D-log. Not vacuous.

## Actionable C-wrongs

None that must block the next port. Named stay on the map.

Verdict: **ACCEPT-WITH-DEBT**
