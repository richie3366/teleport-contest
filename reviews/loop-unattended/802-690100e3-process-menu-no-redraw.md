# Review 802 — 690100e3 — wintty.c process_menu_window no redraw on unhandled key (D-1832)

## Metadata
- Full / short hash: `690100e392f97c576fc15ebeebcdfe29ae8f5a21` / `690100e3`
- Parent: `2eb1af15` (docs-only postmortem that queued the D-1831 Must-fix). Closes review **801**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-05 00:44:31 +0200
- D-id: **D-1832**
- Stats: `js/display.js` +6/−48; `iactions.js` +39/−40; `pager.js` +44/−25; `invent.js` +4/−0. `js/` insertions **93** ≤250. Band **80–350**.
- Claims to close: Must-fix leftover WIN_STATUS / `_snapshotStatusGrid` (12 corpus blocks). Not paging `docorner`, PICK_ANY invert-all, apply catalogue.
- JS / map: `itemactions` / `whatis_menu_choice` / `dohelp` unhandled → `tty_nhbell`; snapshot pair deleted. `c-js-map/turns.md`. Archive **Addressed:** D-1832 `690100e3`.

## Intent vs deliverable

Git subject promises: unhandled keys `tty_nhbell` only (no `docrt`/`cls`); valid pick/cancel `dismiss_nhw_menu`; fullscreen dismiss `_statusSuppressed`; delete `_snapshotStatusGrid` / `_restoreStatusGrid`.

`node scripts/csym.mjs process_menu_window` → `wintty.c:1328–1768`. Default `:1737–1741` `tty_nhbell(); break;`. MENU_SEARCH `:1700–1731`. `tty_nhbell` `termcap.c:750–757`. `docrt_flags` `display.c:1708–1773` (`:1769–1770` `disp.botlx = TRUE`; caller `bot()` later). `--callers process_menu_window`: `wintty.c:1946`.

The diff **does** that. Commit-message `--base 620f7672` is another D-1830 hash whose scoreboard still had 21 blocks; D-log cites `ab55b818`. Same 21-row set.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `itemactions` unhandled | LIVE repaired | `tty_nhbell`; page stays |
| `whatis_menu_choice` / `dohelp` unhandled | LIVE repaired | same |
| `dismiss_nhw_menu` | LIVE | corner skip `docrt`; fullscreen `clear_committed_status` |
| `_snapshotStatusGrid` / `_restoreStatusGrid` | **deleted** | anti-pattern gone |
| `_buildScreenOutput` botl cache | LIVE | unless `_statusSuppressed` |
| paging `docorner` / PICK_ANY invert-all / apply catalogue | OMIT named | |

`node scripts/sym.mjs` (deleted snapshot + re-points):

```
_snapshotStatusGrid  NOT FOUND in js/**
_restoreStatusGrid   NOT FOUND in js/**
tty_nhbell           js/display.js:2172   sync
dismiss_nhw_menu     js/invent.js:2486   ASYNC — await required
set_bot_disabled     js/display.js:5100   sync
clear_committed_status js/display.js:5150   sync
docrt                js/display.js:4788   ASYNC — await required
```

FORCE/DIAG/`getRngLog`/`fastforward`: **none**. Rule #2: clean.

## C ↔ JS fidelity

**Unhandled (`:1737–1741`).** `itemactions`, look-at, and `dohelp` paint once, then `nhgetch` loop: MENU_SEARCH / quit / pick dismiss; else `tty_nhbell()` and stay. **Match C** — no per-key `docrt`/`cls`.

**Dismiss.** Corner `dismiss_nhw_menu` skips `docrt` (docorner ≡ gbuf reprint). Fullscreen `offx==0` still `docrt` then `clear_committed_status` — `docrt_flags` `:1769–1770` sets `botlx` and does **not** call `bot()`; D-0467 leftover stays blank until a later `bot()`. **Match that split.**

**Snapshot gone.** `_buildScreenOutput` `clearScreen`s then paints the botl cache unless `_statusSuppressed`. While `gb.bot_disabled`, `bot()`/`cls` skip (`botl.c:255–256`). Leftover cells left of `offx` come from not wiping them in `paint_corner_nhw_menu`, not from copying a post-`cls` grid. **Match the C side effect, not a grid clone.**

**Callee closure.** Must-fix one item. `tty_nhbell` / `dismiss_nhw_menu` LIVE. Named OMITs only. No STUB in the unhandled arm.

## Hallucinations / overclaim

Do **not** stamp paging `docorner` repair, PICK_ANY invert-all, or the apply catalogue. The `--base 620f7672` vs `ab55b818` hash mismatch is the same 21-row scoreboard, not a vacuous 0-blocked check. The two `explore-seed0116` rows are leftover WIN_STATUS under `do_statusline1` (already Open) — not this Must-fix.

## Density

§2b: Must-fix alone. +93. Did **not** glue `itemactions` Engrave/Write. Right size.

## Verification

This audit, worktree at `690100e3` (HEAD `hidden-proxy.mjs` + that SHA’s `js/`):

`node scripts/hidden-proxy.mjs verify process_menu_window --base 690100e3~1`
→ `12 session(s) blocked`. Summary: **`12 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`** (includes `ind-Healer-264813587-946e8e73` and `explore-seed0200-monk-north-search-70435b72`).

Same tree, `--base ab55b818` (the 21 the D-log cites): **`19 PASS, 2 moved past (2 re-attributed at the same step), 0 unchanged, 0 worse → PROGRESS`**. The two are `explore-seed0116` ×2 → `do_statusline1`. **The D-log 19+2 line is true.** Green + cohort + full 44/44 as recorded.

## Actionable C-wrongs

None that must block the next port. Named stay on the map. Review 801’s Must-fix is shipped here — do not re-queue it.

Verdict: **ACCEPT-WITH-DEBT**
