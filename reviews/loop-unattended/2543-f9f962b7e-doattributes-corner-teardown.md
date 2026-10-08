# Review 2543 — f9f962b7e — doattributes corner teardown

Metadata: SHA `f9f962b7e918846f7ac171c4808c05dc3f12a54c`, D-3667,
cliff-head `fountain.c` drinkfountain (MISATTRIBUTED owner, park
stands) via writer doattributes teardown. js diff +10/−1 in
`js/invent.js`; + focused test
`scripts/doattributes-corner-dismiss.test.mjs`.

## Intent vs deliverable

Promise: Rogue-92037 @227 (attributes-menu dismiss on a Hallu turn)
showed substitute-glyph diffs: JS teardown ran an unconditional
`docrt()` (6 display draws) where C's corner destroy is a 0-draw
gbuf reprint. Branch on `offx`: fullscreen → docrt as before,
corner → live `erase_menu_or_text`. Diff does exactly that; nothing
bundled.

## Inventory

- `doattributes` teardown (`js/invent.js:8711–8722`): `clear_overlay()`
  + offx branch + existing flush. C: `erase_menu_or_text`,
  `wintty.c:965–984`; destroy site `:1999`; `docorner :3649–3721`;
  `doattributes`, `insight.c:2009–2018`.
- No new helpers/imports (import `:57` from `./display.js`
  pre-exists); no symbols deleted or re-pointed.

## C ↔ JS fidelity

- C `:966–984` (direct read): offx==0 → offy/clear/docrt+flush arms;
  else `docorner(cw->offx, cw->maxrow+1, 0)` ✓. NHW_MENU offy=0
  (`:1920` ✓), so fullscreen+clear=FALSE = docrt+flush — JS
  fullscreen arm (docrt + kept flush) identical to before ✓.
- C `doattributes` (`:2009–2018`, direct read) contains no docrt —
  the destroy comes from the menu path ✓, as the D-log says.
- JS `erase_menu_or_text` (`js/display.js:7942`) mirrors every C arm
  including its own `maxrow+1` for docorner ✓. Caller passes
  `lines.length+1` = C single-page maxrow (`nitems+1`, `:2771` ✓),
  so docorner gets nitems+2 on both sides ✓ exact.
- 0-draw claim verified both sides: no `rn2/rnd/rand/ndice` in C
  `:3649–3721`, no `rn2/rnd/rn1/random` in JS `docorner` ✓.
- `offx` is the same menu's geometry (`:8651`, in scope) ✓.
  Multi-page/`!menu_overlay` force offx=0 → docrt arm, behavior
  unchanged there — the diff is strictly corner single-page ✓.
- Callee closure: `docrt`, `flush_screen`, `clear_overlay` live.

## Hallucinations / overclaim

None. The "better than predicted 227→229+" full PASS is a measured
result, not a prediction; the D-3666 sub-mystery closure follows
from the PASS. The `:1098` Named item is pre-existing (D-3627).

## Density

Cliff-phase §2b: one cliff, writer (D-3666 [measure]) ported as the
exact C destroy arm with the live export, Ledger `doattributes
ported` updated. Per-function: ACCEPT.

## Verification

- Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/coords/`fastforward`.
- Re-measure on the SHA's own code (scratch worktree):
  `verify drinkfountain,erase_menu_or_text --base f9f962b7e~1
  --reach-all` → `1 PASS (Rogue-92037), 0 worse → PROGRESS` +
  `reach drinkfountain 49/49 → REACH-OK` + erase smoke 24/24.
  Claim reproduced exactly, including the 49/49 tagged reach;
  no REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
