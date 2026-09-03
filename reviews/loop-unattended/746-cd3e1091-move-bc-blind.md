# Review 746 — cd3e1091 — ball.c Blind move_bc / unplacebc glyph restore (D-1777)

## Metadata
- Full / short hash: `cd3e109184d963fca4a1c8666a960038ffbb6fef` / `cd3e1091`
- Parent: `24ced3ef` (D-1776). **Re-audit** of review **736** (ACCEPT-WITH-DEBT). Independent pinned-C walk.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 17:51:06 +0200
- D-id: **D-1777**
- Stats: `js/ball.js` +132/−39; `js/hack.js` +7/−2. Total `js/` insertions **139** ≤250. Band **150–350**.
- Claims to close: Open Blind `move_bc` / `unplacebc` restore after D-1769. Not `ballfall` (next SHA). Not `maybe_unhide_at` (async vs sync ball). Review **728** named consumers.
- JS / map: `ball.js` cell snapshot; `hack.js` `movobj`. `c-js-map/turns.md`.
- Archive **Addressed:** D-1777 `cd3e1091`.

## Intent vs deliverable

Git subject promises: Match C `ball.c` so a blind hero’s felt ball and chain give their remembered glyph back on move and level-leave, instead of leaving a stale felt marker on the map.

`node scripts/csym.mjs move_bc` → `ball.c:436–556` (Blind `:437–532`; Blind `before` is a no-op). `unplacebc_core` `:146–177`: `Is_waterlevel` swallow still extracts; then Blind restore **after** extract; `maybe_unhide_at` after each extract (`:167`, `:173`). `movobj` `hack.c:824–833`.

Parent: D-1769 stored **integer** `u.bglyph`/`u.cglyph`; Blind `move_bc`/`unplacebc` still extract+place only. The diff **does** snapshot **cells** via `levl_glyph_at` / `set_levl_glyph`, restore Blind felt glyphs, water-swallow extract, export `movobj`. It **does not** await `maybe_unhide_at` from these sync helpers. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `move_bc` Blind arm | LIVE repaired | `:437–532` |
| `unplacebc_core` Blind restore | LIVE repaired | `:146–177` |
| `levl_glyph_at` / `set_levl_glyph` | CLONE stand-in | **cells**, not ints |
| `movobj` | LIVE export | hack.js; no `maybe_unhide_at` |
| `maybe_unhide_at` | LIVE but not called | async; named omit from sync ball |
| `ballfall` | OMIT named | next SHA |

`node scripts/sym.mjs`:

```
move_bc          js/ball.js   ASYNC? (sighted path already async; Blind !before sync restore)
unplacebc        js/ball.js
levl_glyph_at    NOT EXPORTED — 1 LOCAL js/ball.js
set_levl_glyph   NOT EXPORTED — 1 LOCAL js/ball.js
movobj           js/hack.js:318   sync
maybe_unhide_at  js/monmove.js:1138   ASYNC — LIVE, not called from ball.js
```

FORCE/DIAG/`getRngLog`/`fastforward`/seed names: **none**. Rule #2 **clean**. No RNG in these Blind arms.

## C ↔ JS fidelity

**Cell vs int.** D-1769 stored integer ids. This port’s `remembered_glyph` is a tty cell; ints cannot repaint. This SHA snapshots the **cell**. `set_bc` reads `levl_glyph_at`, so new snapshots become cells. **Required for this display model.** Not a C-wrong.

**Blind `move_bc` `!before` (`:437–532`).** Drop felt glyphs / `bc_order` BCPOS_BALL·CHAIN `map_object` the other piece / pick up new glyph / `movobj`. Blind `before` is a no-op. JS the same. **Match.** Sighted `move_bc` was already async; Blind restore on `!before` is the Keep.

**`unplacebc_core` (`:146–177`).** `Is_waterlevel` swallow still extracts. Then Blind restore after extract. `bc_felt=0` last. JS the same. **Match.** Skipping water-level swallow extract would strand the chain.

**`maybe_unhide_at` (`:167`, `:173`).** C always calls it after each extract. JS comments it out because `unplacebc`/`move_bc` stay sync and `maybe_unhide_at` is async (`monmove.js:1138`). Named omit of a **live** callee, not a stub invented here. Hiders under the ball stay `mundetected` after Blind unplace. Overclaim would be “statement-for-statement” while skipping those lines. Review **736** named it. Hold.

**`movobj`.** Exported from `hack.js`. C also calls `maybe_unhide_at`. JS does not. Same named omit.

**Callee closure of Blind restore.** LIVE: `set_levl_glyph`, `map_object`, `movobj`, `bc_order`. OMIT named: `maybe_unhide_at`. STUB: **none** in the glyph restore itself. No RNG in these Blind arms. No public session is Punished+Blind.

## Hallucinations / overclaim

Subject “felt ball and chain give their remembered glyph back” is true for Blind move and level-leave restore. Review **736** holds. Do **not** stamp “Match C `maybe_unhide_at` from `unplacebc`.” Do **not** stamp “Match C `ballfall`.” Do **not** restore integer ids into `remembered_glyph`. No public session is Punished+Blind — **public-unhit**. Admit that.

## Density

§2b: Blind `move_bc` + `unplacebc_core` restore + cell snapshot the consumers need. +139. Did **not** glue `ballfall`.

## Verification

D-log: scratchpad probe with blind viz_array. Green+strict; fortress. Public-unhit. This re-audit re-reads C.

## Actionable C-wrongs

None for Must-fix. Named: `maybe_unhide_at` on unplacebc + `movobj`; `ballfall` (next SHA — and that SHA’s **callers** are a separate C-wrong). Do **not** restore ints into `remembered_glyph`.
Do **not** skip water-level swallow extract.
Do **not** treat `u.bglyph` as an int glyph id after this SHA.
Blind `before` must stay a no-op.
`ballfall` callers are SHA `c4a32e7c` / review **747**, not this file.

**Pinned-C walk this overlay.**
`csym.mjs move_bc` → `ball.c:436–556`.
Blind `before` is a no-op; Blind `!before` restores felt glyphs then
`movobj`.
`unplacebc_core` `:146–177`: `Is_waterlevel` swallow still extracts,
then Blind restore, `bc_felt=0` last.
C calls `maybe_unhide_at` after each extract (`:167`, `:173`).
JS leaves those calls out because `maybe_unhide_at` is async
(`monmove.js:1138`) and these helpers stay sync. Named.
`movobj` is now the `hack.js` export.
Cell snapshots (`levl_glyph_at` / `set_levl_glyph`) replace D-1769
integer ids so tty memory can repaint.
No RNG in these Blind arms.
No public session is Punished+Blind.

Verdict: **ACCEPT-WITH-DEBT**
