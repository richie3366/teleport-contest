# Review 2643 — 0929ad09c — container-menu corner dismiss (D-3779)

Metadata. SHA `0929ad09c` (2026-10-10), D-3779, parent
`96615e374`. js diff: `js/pickup.js` +7/−3 (corner
dismiss: open-coded docrt → shared helper) +
`scripts/inorout-menu-dismiss-hallu.test.mjs` (new).
Ledger: `use_container` ported-note. Works the
cliffs head (menu_loot, 95343).

## Intent vs deliverable

Promise: 95343@599 — dismissing the corner bag menu
docrt'd, re-newsyming every cell and re-picking all
Hallu glyphs (6 cells flipped, RNG intact 100 steps
past → pure display-RNG desync). Fix: dismiss via
the shared helper (corner → docorner, no burns).

Diff delivers exactly that call. Promise and diff
match. No import change (already imported).

## Inventory

Changed JS (1 writer, 1 dismiss site):

- in_or_out_menu dismiss — `js/pickup.js:2774–2783`.
  C: `win/tty/wintty.c:966–984`
  (erase_menu_or_text: `offx==0 → docrt()+flush`
  else `docorner(offx, maxrow+1, 0)` — read).
  Callee `dismiss_nhw_menu` (`js/invent.js:3146`,
  LIVE export, read whole).

## C ↔ JS fidelity

**Dismiss C-exact.** The helper mirrors C's branch
exactly: `!g || offx===0 → docrt()+flush`, else
`erase_menu_or_text(offx, 0, maxrow, false)` with no
flush — C's corner arm likewise flushes nothing.
Preserved behavior: `_menu_overlay=false` still set
(:3148); offx==0 still docrt's (old behavior is the
fallback, so a missing geom cannot regress). The
mechanism (docrt→newsym→Hallu re-pick vs docorner
gbuf resend) is the documented tty split and fits
the evidence (glyph flip, RNG whole). No symbol
deleted or re-pointed, so no sym.mjs paste is owed
beyond the export check above.

## Hallucinations / overclaim

None. Diff grep: zero hits. The "JS fmon == C
fmon" inference is measured (flip content absent
all steps 0–598, RNG split 100 steps later), not
assumed. Named honestly leaves other open-coded
docrt-dismiss menus for rows with evidence.

## Density

Cliff-phase §2b: one row, one writer site, no
bundling. 95343 599 → flooreffects@602. Focused
test 0/2 pre-fix → 2/2 post-fix, C-pinned rows.

## Verification

D-log Verify: menu_loot 1 moved; smoke 24/24 ×2;
gates + cohort PASS.

Re-measured by this audit (`verify
menu_loot,use_container --base 0929ad09c~1
--reach-all`):

```text
verify menu_loot: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Caveman-95343: moved → flooreffects at step 602 (was 599)
smoke menu_loot: 24 PASS, 0 regressed → REACH-OK
verify use_container: […] vacuous […]
smoke use_container: 24 PASS, 0 regressed → REACH-OK
```

Movement + smoke match the D-log exactly, 0
regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
