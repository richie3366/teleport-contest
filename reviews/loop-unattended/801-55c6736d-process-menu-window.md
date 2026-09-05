# Review 801 — 55c6736d — wintty.c process_menu_window leftover WIN_STATUS (D-1831)

## Metadata
- Full / short hash: `55c6736d313e0a617aab7d6a61d64d991718f6dc` / `55c6736d`
- Parent: `ab55b818` (D-1830). Map-driven Open: 21 corpus blocks; tty menu clears only from its own left column.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-04 23:55:36 +0200
- D-id: **D-1831** (index later marked **partial**; human postmortem `docs/2026-09-05-continuation-postmortem-2238-2240.md`)
- Stats: `js/display.js` +103/−8; `iactions.js` +45/−18; `invent.js` +40/−6; `pager.js` +36/−7; `options.js` +6/−1; `getline.js` +4/−1. `js/` insertions **204** ≤250. Band **80–350**.
- Claims to close: Open `process_menu_window` (21 blocks). Not paging `docorner` repair.
- JS / map: `set_bot_disabled`, `_snapshotStatusGrid`/`_restoreStatusGrid`, `_paintToplineOnlyOverOverlay`, MENU_SEARCH in look-at/itemactions. `c-js-map/turns.md`. Archive row claimed **Addressed:** D-1831 `55c6736d` (later overwritten by the regression Must-fix).

## Intent vs deliverable

Git subject promises: corner `cl_end` only from `offx` so WIN_STATUS left of the menu stays; wrap `set_bot_disabled` around `select_menu_*` / `getlin` / pickinv; MENU_SEARCH overlay wrap.

`node scripts/csym.mjs process_menu_window` → `wintty.c:1328–1768`. `--callers`: `wintty.c:1946`. Extra-page `cl_end` `:1501–1505`. MENU_SEARCH `:1700–1731` → `tty_getlin`. Default unhandled `:1737–1741` `tty_nhbell(); break;` (`page_start` stays — **no redraw**). `select_menu` `windows.c:1855–1865` (`gb.bot_disabled` wrap). `getlin` `:1867–1901` (`:1898–1900`). `bot` `botl.c:252–271` / `timebot` `:277–278` early return.

The diff **does** wrap `set_bot_disabled`, extra-page `cl_end` from `offx`, look-at `:` as MENU_SEARCH, overlay topline wrap, per-window `maxrow`. It also **adds a grid snapshot/restore that C does not have**, and **`itemactions` still `docrt()`s on every key** including unhandled.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `set_bot_disabled` | LIVE new | `select_menu` / `getlin` wrap |
| `bot` / `timebot` early return | LIVE | `_bot_disabled` |
| `_paintToplineOnlyOverOverlay` | LIVE clone | overlay WIN_MESSAGE + wrap `cl_end` |
| extra-page `cl_end` from `offx` | LIVE | `paint_corner_nhw_menu` |
| look-at MENU_SEARCH | LIVE | `process_menu_search` + `dismiss_nhw_menu` |
| `itemactions` unhandled key | STUB vs C | still `docrt`/`cls` then re-paint |
| `_snapshotStatusGrid` / `_restoreStatusGrid` | **clone that contradicts C** | playbook §3 anti-pattern |
| paging `docorner` repair | OMIT named | `previous_page_lines` |

`node scripts/sym.mjs` (HEAD numbers after D-1832 deleted the snapshot pair; at this SHA they lived in `display.js` `:5113` / `:5134`):

```
set_bot_disabled js/display.js:5100   sync
process_menu_search js/invent.js:2240   ASYNC — await required
dismiss_nhw_menu js/invent.js:2489   ASYNC — await required
clear_committed_status js/display.js:5110   sync
_paintToplineOnlyOverOverlay NOT EXPORTED — 1 LOCAL display.js
```

No C-callee clone→import. FORCE/DIAG/`getRngLog`/`fastforward`: **none**. Rule #2: clean. No seed/step/coordinate gate.

## C ↔ JS fidelity

**`gb.bot_disabled` (`windows.c:1858–1863`, `:1898–1900`; `botl.c:255–256`).** JS wrap around `select_menu_pick_*`, `getlin`, pickinv, itemactions, look-at. `bot()`/`cls` skip while set. **Match that flag.** C `bot()` simply does not `putstr` WIN_STATUS; tty cells stay. JS `_buildScreenOutput` always `clearScreen()`s, so leftover cells are not “not painted” — they must not be wiped.

**Unhandled key (`:1737–1741`).** C: `tty_nhbell(); break;` — same page, no `docrt`. Look-at switched to `dismiss_nhw_menu` (closer). **`itemactions` still `docrt()` + `flush_screen(1)` on every key including invalid, then loops.** That is not C.

**Snapshot (`display.js` at this SHA `:5113–5145`, `:5370` / `:5418–5419`).** Not a C callee. Copies grid rows 22–23 across `clearScreen` while `_bot_disabled`. After `itemactions`’ `docrt()`→`cls()` those rows are already blank, so restore **paints blank WIN_STATUS**. C shows the previous frame twice.

**MENU_SEARCH / extra-page / maxrow.** `:1700–1731` and `:1501–1505` are real. Look-at `:` is no longer rejected. Per-window `maxrow` is the right geometry. **Those arms match.** Overlay wrap is a clone of `topl_putsym` CO-1, not a stub.

**Callee closure.** `select_menu` wrap LIVE. Dispatch “leftover WIN_STATUS” while the itemactions unhandled arm still redraws is **dispatch vs callee**: the snapshot is not a C callee; it papers over `docrt`. One STUB/anti-pattern in a live arm.

## Hallucinations / overclaim

D-log Verify said `PASS hidden (no corpus session blocked on process_menu_window)` for a queue row that existed because **21** sessions were blocked. An earlier verify in that iteration rewrote the working rows; the last four edit rounds (including the snapshot) were never re-run on them. That is the D-1831 vacuous-verify hole. Do **not** stamp leftover WIN_STATUS on unhandled `itemactions` keys. Do **not** stamp `_snapshotStatusGrid` as `gb.bot_disabled`.

## Density

§2b: one `process_menu_window` family (leftover + MENU_SEARCH wrap + maxrow). +204. Right size. The miss is the snapshot anti-pattern, not thinness.

## Verification

This audit, worktree at `55c6736d` (HEAD `hidden-proxy.mjs` + that SHA’s `js/`):

`node scripts/hidden-proxy.mjs verify process_menu_window --base 55c6736d~1`

→ `21 session(s) blocked` (21 at `ab55b818`). Summary: **`7 PASS, 14 moved past (2 re-attributed at the same step; 12 still process_menu_window at a later step), 0 unchanged, 0 worse → PROGRESS`**.

The 12 (e.g. `ind-Healer-264813587-946e8e73` step 21→22, `explore-seed0200-monk-north-search-70435b72` 46→47) still show blank WIN_STATUS one frame later. The two `explore-seed0116` rows moved to `do_statusline1` at the same step. The D-log “PASS hidden / 0 blocked” line is **false**. Public 44/44 is not a corpus PASS.

## Actionable C-wrongs

1. **Unhandled corner-menu key must not redraw.** Match `wintty.c:1737–1741`: `tty_nhbell(); break;` — no `docrt`/`cls` in `itemactions` (and any other corner loop still doing it) on invalid/unhandled keys. Valid pick/cancel dismisses with `dismiss_nhw_menu` (corner `docorner`), not `docrt`. Keep D-0467 `_statusSuppressed` for post-fullscreen invent blank (seed0002 @530 / seed5002 @277). **Delete** `_snapshotStatusGrid` / `_restoreStatusGrid`; `_buildScreenOutput` paints the botl cache unless suppressed. Falsifier: `node scripts/hidden-proxy.mjs verify process_menu_window --base ab55b818` — the 12 “still fn one step later” sessions PASS or move to a later owner.

**Shipped in D-1832 `690100e3` (review 802).** Not re-queued at HEAD.

Verdict: **QUALITY-RISK**
