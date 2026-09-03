# Review 736 — cd3e1091 — ball.c Blind move_bc / unplacebc glyph restore (D-1777)

## Metadata
- Full / short hash: `cd3e109184d963fca4a1c8666a960038ffbb6fef` / `cd3e1091`
- Parent: `24ced3ef` (D-1776). Ninth of ten `js/` commits this audit. This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 17:51:06 +0200
- D-id: **D-1777**
- Stats: `js/ball.js` +135/−36; `js/hack.js` +4/−3. Total `js/` insertions **139** <250. Band **150–350**.
- Claims to close: Open `unplacebc` Blind glyph restore **and** `move_bc` Blind glyph as one cluster. Not `ballfall`. Not `maybe_unhide_at`. Review **728** named these consumers of `set_bc`.
- JS / map: `ball.js` Blind `move_bc` / `unplacebc`; `hack.js` `movobj` export. `c-js-map/turns.md`.
- Archive **Addressed:** D-1777 `cd3e1091`.

## Intent vs deliverable

Git subject promises: Match C `ball.c` so a blind hero's felt ball and chain give their remembered glyph back on move and level-leave, instead of leaving a stale felt marker on the map.

`node scripts/csym.mjs move_bc` → `ball.c:436–556` (Blind `:437–532`). `unplacebc_core` → `:146–177`. `movobj` `hack.c:824`. Parent D-1769 `set_bc` wrote snapshots that nothing restored; Blind `move_bc` relocated + `bc_order` only.

The diff **does** port Blind `!before` both/ball/chain arms (`set_levl_glyph` / `map_object` sibling / pickup dest / `movobj` / `bc_order`), `unplacebc` water-swallow + per-piece restore + `bc_felt=0`, change `levl_glyph_at` to snapshot **cells** (D-1767 gbuf fallback), add `set_levl_glyph`, export `movobj`. It **does not** await `maybe_unhide_at`. Named (already queued). It **does not** port `ballfall`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `move_bc` Blind `!before` | LIVE repaired | C `:452–530` |
| `unplacebc` / `unplacebc_core` | LIVE repaired | water swallow + Blind drop |
| `levl_glyph_at` | CLONE stand-in | cell, not int (this SHA) |
| `set_levl_glyph` | CLONE stand-in | write `levl.glyph =` |
| `movobj` | LIVE export | hack.js; was open-coded |
| `map_object` | LIVE | shared-cell top |
| `bc_order` / `BCPOS_*` | CLONE local | already |
| `Blind_bc` | CLONE local | youprop Blind |
| `maybe_unhide_at` | OMIT named | unplacebc + movobj |
| `ballfall` | OMIT named | next SHA |

`node scripts/sym.mjs`:

```
move_bc          js/ball.js:445   sync
unplacebc        js/ball.js:389   sync
levl_glyph_at    NOT EXPORTED — local js/ball.js
set_levl_glyph   NOT EXPORTED — local js/ball.js
movobj           js/hack.js:318   sync
map_object       js/display.js:1907   sync
bc_order         NOT EXPORTED — local js/ball.js
```

`--can ball.js hack.js movobj`: need not invent a cycle; `hack.js` already imported `is_pool` from hack into ball. FORCE/DIAG/`getRngLog`/`fastforward`: **none**. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**. No RNG in these arms.

## C ↔ JS fidelity

**Blind vs sighted (`:440` vs `:513`).** C: `if (Blind) { if (!before) { … } }` — Blind **before** is a no-op; sighted is the `else`. JS: Blind block then `return`; sighted lift/place follows. **Match.**

**Both moved (`:452–467`).** If felt ball, `levl[uball]=bglyph`; if felt chain, `levl[uchain]=cglyph`; `bc_felt=0`; pickup dest glyphs; `movobj` ball then chain. JS `set_levl_glyph` / `levl_glyph_at`. **Match order.**

**Ball only (`:468–488`).** Felt ball: DIFFER restore bglyph; BCPOS_BALL + felt chain → `map_object(uchain,0)` else restore; `bc_felt &= ~BC_BALL`. Pickup: dest glyph if not sharing chain cell else `cglyph`. `movobj` ball. Chain-only is the mirror (`map_object(uball,0)`, inherit `bglyph`). JS the same `BCPOS_*`. **Match.**

**`bc_order()` reset** after Blind `!before`. **Match.**

**`unplacebc_core`.** Swallow: `Is_waterlevel` still extracts (bubbles); else return without unplace. Then floor ball extract, Blind+felt ball restore **after** extract (C uses `uball->ox` after extract — C `remove_object` keeps ox/oy; JS `obj_extract_self` comment keeps ox/oy). Chain same; `bc_felt=0`. JS water arm + restore + named skip `maybe_unhide_at` then `newsym`. **Match the Blind keep.** `maybe_unhide_at` is a named omit on a live arm that already omitted it on the sighted `move_bc` lift — not a new stub in a newly live restore.

**Glyph model.** C assigns int `levl.glyph`. This port’s memory is a tty cell. Storing ints in D-1769 could not repaint. Cell snapshot + `set_levl_glyph` is the honest write side. Null snapshot clears memory (unexplored). **Match the assignment, given the display model.** Do not treat cell-vs-int as Must-fix.

**Callee closure (Blind arms).** LIVE: `movobj`, `map_object`, `obj_extract_self`, `newsym`, `bc_order`, `Is_waterlevel`. OMIT named: `maybe_unhide_at`. STUB: **none** on the restore itself. Not “dispatch ported, callee stubbed.”

**`set_bc` consumers.** D-1769 stored under-glyphs so Blind `move_bc` / `unplacebc` could restore them. Until this SHA those fields were write-only. Restoring **integers** into `remembered_glyph` would not repaint this port’s tty cells; cell snapshot is required. `feel_location` already maintained `u.bc_felt` (display.js); Blind `move_bc` now clears bits per piece. After both-moved, `bc_felt=0` before pickup — C the same, so a later feel can mark them again.

**`movobj`.** C `hack.c` extracts, sets ox/oy, places, `newsym` both cells. Exporting it avoids a second open-coded Blind relocate. Sighted `move_bc` still uses `place_object` on `!before` (C does not `movobj` there). **Match.**

## Hallucinations / overclaim

Subject “felt ball and chain give remembered glyph back on move and level-leave” is true for the Blind arms. “one cluster” of two Open rows sharing `bc_felt`/`bglyph`/`cglyph` is §2b-legal. Do **not** stamp “Match C `ballfall`.” Do **not** stamp “Match C `maybe_unhide_at`.” Journal 44/44 is no-regression; Punished+Blind **public-unhit** (D-log probe).

## Density

§2b: Blind `move_bc` + `unplacebc_core` + the glyph read/write pair + `movobj` export. +139. Consecutive Open rows, same family, no stub in the restore. Did **not** glue `ballfall`. Did **not** invent a FAIL peel.

## Verification

D-log: save-oracle skip (untagged); green+strict seed8000/0900; full `sessions` **44**/44; per-session strict on seed0006/0007/0012/0014/2200/4500; direct Blind viz-zero probe (both-moved restore order, unplacebc BC_CHAIN). Rule #2 clean. Suite cannot regress Punished+Blind. Admit that. `strict-output-check.mjs` batch leak is pre-existing (NOTES).

## Actionable C-wrongs

None for Must-fix (Blind restore matches C; `maybe_unhide_at`/`ballfall` named). Named: `maybe_unhide_at`; `ballfall`; `drop_ball`. Do **not** restore ints into `remembered_glyph`. Do **not** run sighted lift on Blind `before`. Do **not** skip water-level swallow extract. Do **not** `map_object` the sibling when `BCPOS_DIFFER`. Do **not** re-port D-1769 `set_bc`.

C Blind `move_bc` does **nothing** on `before` (the sighted path lifts then). C `unplacebc_core` restores **after** `obj_extract_self` using still-valid `ox`/`oy`. C shared-cell top uses `map_object(..., 0)` (memory, not show). `maybe_unhide_at` is async in this port against fifteen sync `move_bc`/`unplacebc` sites — already an Open row, not a new stub invented here. `ballfall` is the next SHA.

```146:177:nethack-c/upstream/src/ball.c
staticfn void
unplacebc_core(void)
{
    if (u.uswallow) {
        if (Is_waterlevel(&u.uz)) {
            if (!carried(uball))
                obj_extract_self(uball);
            obj_extract_self(uchain);
        }
        return;
    }
    /* Blind felt restores after extract; bc_felt = 0 last */
}
```

Verdict: **ACCEPT-WITH-DEBT**
