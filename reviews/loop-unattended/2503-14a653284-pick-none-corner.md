# Review 2503 — 14a653284 — PICK_NONE corner overlay (D-3622)

SHA: `14a653284` — cliffs-head enhance_weapon_skill writer (PICK_NONE menu
paint). D-3622.

## Intent vs deliverable

Promise: single-page PICK_NONE menus painted fullscreen at col 0; C's H2344
menu_overlay path paints them at offx>0 over the kept map. Fix branches
`select_menu_pick_none` like the sibling PICK_ONE loop + corner dismiss:
3 PASS.

Diff actually adds: `js/invent.js` (+30/−13 in `select_menu_pick_none`) +
`scripts/menu-pick-none-corner.test.mjs` (4 cases). Same-file helpers only.
No other `js/`.

## Inventory

- `select_menu_pick_none` paint branch (`js/invent.js:3233–3253`, changed) —
  C `wintty.c:1907–1946` NHW_MENU H2344 arm. Status: fixed.
- `select_menu_pick_none` dismiss branch (`js/invent.js:3294–3303`,
  changed) — C `wintty.c:966–985` erase_menu_or_text. Status: fixed.

## C ↔ JS fidelity

H2344_BROKEN is `#define`d (`wintty.c:13`), so C's rule is: fullscreen iff
`maxrow >= rows || !menu_overlay`, else overlay at
`offx = min(min(82, cols/2), cols - maxcol - 1)`. JS: `npages > 1`
(`lmax = rows-1 = 23`, so `nitems ≥ 24`) → fullscreen; else corner with
`nhw_menu_geometry`'s offx = `min(min(82, 40), 80 - maxcol - 1)` — the exact
H2344 formula at cols=80. The `nitems == 23` boundary is covered both ways:
the caller's branch matches C if maxrow counts entries, and the geometry's
own `maxrow ≥ 24 → offx = 0` guard plus the corner painter's internal
`offx === 0` fullscreen sub-branch produce fullscreen paint regardless.
`npages` is menu-level, so multi-page menus stay fullscreen on every page
— correct. The measured C screens (`ESC[34C` + reverse, offx 33/33/40, map
kept left) corroborate the formula.

Dismiss: C offx==0 → docrt+flush, else `docorner(offx, maxrow+1, 0)`. JS
corner path → `dismiss_nhw_menu()` → `docorner(g.offx, maxrow+1, 0)` —
exact. The fullscreen else path is byte-identical to the pre-SHA code
(`clear_overlay` + docrt + flush, no `clear_committed_status` per D-1879),
so no fullscreen behavior changed. The new `{offx:0}` geom store routes
fullscreen dismissals to that path deterministically.

Helper class: both callees pre-existing LIVE same-file helpers
(`paint_corner_nhw_menu`, `dismiss_nhw_menu`), already exercised by the
PICK_ONE path. No clone created or re-pointed, no new import. No
FORCE/DIAG/seed/coordinate in the hunk.

## Hallucinations / overclaim

None. The D-log's named keep (`:8611` doattributes PAGE painter, own C
function) is genuinely out of unit.

## Density

Cliff commit, one writer function, own head per its HEAD queue. This SHA
also explains two earlier re-measure supersets (Monk-94079 here; Monk-94249
moved here by D-3619 then PASS). Ledger: wintty.c row updated (D-3622).

## Verification

Re-measured: `hidden-proxy.mjs verify enhance_weapon_skill --base
14a653284~1 --reach-all` → `3 PASS, 0 moved past, 0 unchanged, 0 worse →
PROGRESS` (all three D-log sessions still PASS); smoke reach 24/24 →
REACH-OK. Exact match. Unit test: 4 pass, 0 fail.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
