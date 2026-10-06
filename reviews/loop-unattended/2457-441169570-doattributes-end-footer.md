# Review 2457 — 441169570 — doattributes single-page `(end)` footer (D-3575)

**Metadata.** SHA `441169570` (2026-10-06, D-3575). Type: **cliff**:
writer port for the cliffs head `botl.c do_statusline2`. `js/`
insertions: 11 (`js/invent.js` +11/−2) + 1 test file.

## Intent vs deliverable

Promise: the doattributes fullscreen branch painted `(p of M)`
unconditionally; per C it must be `(end) ` (trailing space) when
npages==1, `(x of y)` (no trailing space) only when multi-page, with
cursor after the morestr; also fixes the latent ≥10-page cursor (was
hardcoded 9). Probe Samurai-94130 → PASS.

Diff actually adds: the two-branch morestr + computed cursor, with C
cites. Promise matches diff.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | doattributes (fullscreen footer arm) | ported | [invent.js](/home/debian/dev/teleport-contest/js/invent.js:8551) | wintty.c:2740–2750 (tty_end_menu) + :1537–1551 (process_menu_window) |

Helpers: none. No imports, no signature change. Sibling `(end) `
sites confirmed (`grep`: nhw_menu_geometry, paint_corner_nhw_menu,
:3229 branch) — same shape, as claimed.

## C ↔ JS fidelity

**Rule confirmed branch-by-branch.** C :2740–2750 read: "If greater
than 1 page, morestr is `(x of y)` otherwise, `(end) `" — single-page
`dupstr("(end) ")` with trailing space ✓. C :1537–1539 read:
multi-page `Sprintf "(%d of %d)"`, no trailing space ✓. JS matches
both bytes exactly.

**Cursor confirmed.** C :1550: `tty_curs(window, strlen(morestr)+2,
page_lines)` (1-based) ≡ JS 0-based `morestr.length + 1` ✓. Single
page: len 6 → col 7 = C's [7,23] ✓ (was 9). Multi-page ≤9 pages:
`(1 of 1)`-shaped len 8 → 9, byte-identical output to before (only the
comment changed on that path); ≥10 pages now grows instead of the
hardcoded 9 ✓ — a real latent fix, C-correct.

**Scope:** the footer arm only; plist/accelerators/counting/selection
stay distributed per the D-1872/D-1877/D-1879 precedent (wintty rows
stay unknown — disclosed, correct).

## Hallucinations / overclaim

None.

## Density

Cliff §10.18: head writer, one arm, own `Ledger:` touch (doattributes
gains D-3575). Per-function verdict ACCEPT → SHA ACCEPT.

## Verification

- Added-code grep: clean.
- Rule #2: clean this iteration (see 2453).
- Re-measure (mine): `verify do_statusline2 --base 441169570~1
  --reach-all` → **5 PASS, 1 moved, 11 unchanged, 0 worse** + smoke
  24/24 REACH-OK. The claimed session (impaired-Samurai-94130) is
  still PASS; the extra 4 PASS + 1 move are D-3576's later work on
  the same 17 sessions (Satiated ×2 PASS, gold ×3 → 2 PASS + 1
  moved — forward-only); the 11 stills are exactly the D-log's
  predicted residuals minus D-3576's fixes (options ×10 + Monk Pw).
- Committed test pins the footer; full `sessions` 44/44 claimed
  in-ship, re-covered by this audit's gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
