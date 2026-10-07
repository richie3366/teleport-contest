# Review 2475 — f11d0acff — doterrain corner dismiss (D-3594)

**Metadata.** SHA `f11d0acff` (2026-10-07, D-3594). Type: **cliff**:
writer port for the cliffs head `detect.c reveal_terrain` (owner
C-whole per D-3556, untouched). `js/` insertions: 22
(`js/detect.js` +22/−8) + committed test.

## Intent vs deliverable

Promise: `doterrain`'s menu dismiss ran full `docrt()` (regen +
Hallu repaints) on every key where C's corner menu takes the
draw-free `docorner` arm; dismissing via live `dismiss_nhw_menu`
on terminal keys only (invalid re-prompts) moves Wizard-94001
135→178.

Diff actually adds: the three dismiss calls, the invalid-key
re-prompt, import-name swaps (drop `docrt`/`flush_screen`, add
`dismiss_nhw_menu` on the existing dynamic invent edge), doc
cites. Promise matches diff. No symbols deleted or re-pointed.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | doterrain dismiss arm | ported (whole body incl. fix) | [detect.js](/home/debian/dev/teleport-contest/js/detect.js:1448) | cmd.c:1097–1191, wintty.c:965–984/:1914–1931/:1999 |

Helpers: none added. `dismiss_nhw_menu` is LIVE
(`sym.mjs`: invent.js:3095 async, awaited at all 3 sites) with 34
existing call sites across 8 files — the sibling-precedent claim
is real.

## C ↔ JS fidelity

**Corner-dismiss geometry is exactly C.** `erase_menu_or_text`
(wintty.c:965–984, read): `offx==0` → docrt+flush, else
`docorner(offx, maxrow+1, 0)` ✓. Menu geometry (:1914–1931,
read): offx = max(10, cols−s_maxcol−1), forced 0 only when narrow
/ too tall / overlay off — the doterrain menu (46-col rows, 6
lines) is corner ✓. Select-end erase at :1999 runs inside
`tty_select_menu`, i.e. inside the dismiss, never a regen ✓. C
`doterrain` (cmd.c:1097–1191 via `csym.mjs`) contains no
docrt/flush anywhere ✓. JS `dismiss_nhw_menu` routes corner geom
(offx≠0, set by the shared `paint_corner`→`nhw_menu_geometry`
path) to `docorner`, whose body (display.js:7785–7813, read) is
cl_end + `row_refresh` gbuf resend — no newsym/vision_recalc/
see_monsters burns ✓. So the Hallu triple-paint (2 docrt regens +
1 moveloop) collapses to C's single paint by deleting wrong JS,
not by shaping RNG ✓.

**Menu semantics preserved.** ESC→−1, space/enter→preselected-or-1
(C's n==0/n==1 twins), letter→explicit pick (C's n>1 sel[1] arm
folds to the same outcome), all 6 which-cases with C's TER_*
flags, ECMD_OK tail ✓. Invalid keys now re-prompt with the menu
open (C `select_menu` stays open) instead of docrt-dismissing —
a second C-faithful behavior change in the same arm ✓. C dispatch
(cmd.c:1897 extcmd entry) ⟺ JS getline dispatch (:555–561, live).

## Hallucinations / overclaim

None material. The display-RNG trace story is labeled measured
(temp DIAG, reverted — no DIAG/FORCE in the diff, grepped) and
its conclusion (streams in sync, C painted once) is the only
reading consistent with E == draw #21 plus the movement it
produced. Nit: the D-log cites the JS dispatch at getline.js:1694
— the live entry is at :555–561 (cite drift, wiring itself live).

## Density

Cliff §10.18: cliffs-head writer (second in the head chain after
D-3592), one arm completing the whole body, own `Ledger:` touch
(D-append on ported doterrain). Per-function verdict ACCEPT → SHA
ACCEPT.

## Verification

- Added-code grep: clean.
- Rule #2: clean this iteration (see 2471).
- Committed test `doterrain-corner-dismiss.test.mjs`: 1/1 PASS
  now (pins row 17 to C's E through moves[134]).
- Re-measure (mine): `verify doterrain,reveal_terrain --base
  f11d0acff~1 --reach-all` → doterrain vacuous + smoke REACH-OK;
  reveal_terrain **0 PASS, 1 moved past, 0 unchanged, 0 worse**
  (Wizard-94001 → welcome@227, was 135 — the D-log's 135→178
  plus D-3595) + smoke 24/24 REACH-OK. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
