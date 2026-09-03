# Review 743 — 1f5d551a — display.c newsym I-arm lev->glyph (D-1774)

## Metadata
- Full / short hash: `1f5d551afe6d1a3b5fbf3f8642f49161a571bc8b` / `1f5d551a`
- Parent: `3bebe475` (docs retarget). **Re-audit** of review **733** (ACCEPT-WITH-DEBT). Independent pinned-C walk.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 13:35:45 +0200
- D-id: **D-1774**
- Stats: `js/display.js` +32/−10; `js/uhitm.js` +18/−7; `js/cmd.js` +11/−4; `js/mhitm.js` +4/−4. Total `js/` insertions **67** ≤250. Band **150–350**.
- Claims to close: Open `newsym` I-arm leftover gbuf after D-1767. Not `ridden_mon_to_glyph` usteed (later D-1784). Review **726** named gbuf vs `lev->glyph`.
- JS / map: `display.js` `memory_glyph_is_invisible`; fight_empty `glyph_at`. `c-js-map/turns.md`.
- Archive **Addressed:** D-1774 `1f5d551a`.

## Intent vs deliverable

Git subject promises: Match C `display.c` `newsym` so remembered I uses `lev->glyph`, not leftover gbuf, instead of `fight_empty` punching the corpse tile after an unseen kill.

`node scripts/csym.mjs newsym` → `display.c:916–1099`, I-arm `:1032–1033` `glyph_is_invisible(lev->glyph)`. `unmap_invisible` `:387–396` also `levl.glyph`. `hack.c:2242–2245` fight_empty uses `glyph_at`. `uhitm.c:577–580` atk_done plants I on living unseen forcefight. `ridden_mon_to_glyph` callers: `display.h` usteed macro only.

Parent: I-arm used leftover gbuf / hybrid `glyph_is_invisible(loc)`. The diff **does** split memory vs gbuf: `newsym` / `unmap_invisible` / `mondead` → memory; fight_empty + `attack_checks` → `disp_glyph`. It **does not** wire `ridden_mon_to_glyph` into `display_self`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `memory_glyph_is_invisible` | LIVE new | `lev->glyph` stand-in |
| `glyph_is_invisible_id` | LIVE | gbuf integer |
| `glyph_is_invisible(loc)` | CLONE leftover hybrid | memory OR disp_glyph OR `.invisible` |
| `newsym` I-arm | LIVE repaired | memory only |
| `unmap_invisible` | LIVE repaired | memory |
| fight_empty / `attack_checks` | LIVE repaired | **gbuf** `glyph_at` |
| `do_attack` atk_done | LIVE repaired | `:577–580` |
| `ridden_mon_to_glyph` usteed | OMIT named | later D-1784 |
| trap.js mondead clone | CLONE leftover | still hybrid |

`node scripts/sym.mjs`:

```
memory_glyph_is_invisible js/display.js:1095   sync
glyph_is_invisible_id     js/display.js:649   sync
glyph_is_invisible        js/display.js:1017   sync   (hybrid leftover)
unmap_invisible           js/display.js:1120   sync
newsym                    js/display.js:4406   sync
ridden_mon_to_glyph       js/display.js:461   sync   (caller named)
```

FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none** (comments cited `seed0014 @43789`; later D-1775 replaced those). Rule #2 **clean**. No new RNG.

## C ↔ JS fidelity

**`newsym` I-arm (`:1032–1033`).** C: if remembered `lev->glyph` is invisible, show that, not the physical. JS `memory_glyph_is_invisible` reads `remembered_glyph.glyph` / memory cell, **not** `disp_glyph`. **Match.** Do not OR gbuf into this arm. Mixing memory I into fight_empty is the inverse bug (corpse punch after unseen kill).

**fight_empty (`hack.c:2242–2245`).** C uses `glyph_at` (gbuf). JS `glyph_is_invisible_id(disp_glyph)`. **Match the split.** `uhitm.c:577–580` atk_done: killing blow skipped; living unseen forcefight plants I. JS the same. Empty-cell `unmap_invisible` is C `:2813` after `domove_fight_empty` returns false; JS fight_empty path returns after the helper’s own `unmap_object`.

**`unmap_invisible` / mondead.** C `:387–396` also `levl.glyph`. This SHA’s `mondead` path uses the memory predicate. trap.js mondead clone still calls hybrid `glyph_is_invisible(loc)` (memory OR disp_glyph OR `.invisible`). Named leftover, not the repaired `newsym` arm.

**`ridden_mon_to_glyph` usteed.** C caller is the `maybe_display_usteed` macro only. This SHA names it; later D-1784 wires it. Do not Must-fix a later SHA’s Keep on this one.

**Callee closure.** LIVE: memory predicate, gbuf predicate, `newsym`, `unmap_invisible`. OMIT named: ridden usteed. STUB: **none** in the I-arm this SHA claimed. FORCE/DIAG none; Rule #2 clean; no new RNG.

## Hallucinations / overclaim

Subject “remembered I uses `lev->glyph`, not leftover gbuf” is true for `newsym`/`unmap_invisible`/`mondead` this SHA edited. “fight_empty punching the corpse” is the gbuf path, correctly left on `glyph_at`. Review **733** holds. Do **not** stamp “Match C `ridden_mon_to_glyph` display_self.” Do **not** stamp “every `glyph_is_invisible(loc)` hybrid is gone.”

## Density

§2b: one C `newsym` arm + the fight_empty/`glyph_at` counterpart that made the bug visible. +67. Did **not** glue usteed.

## Verification

D-log: seed0014 leftover was this I-glyph, not gbuf stamp (D-1767) and not skipped `nonrotting_corpse`. Green+strict; fortress recovered. Rule #2 clean. This re-audit re-reads C.

## Actionable C-wrongs

None for Must-fix. Named: leftover hybrid `glyph_is_invisible(loc)` (trap.js mondead); `ridden_mon_to_glyph` usteed (later D-1784). Do **not** OR `disp_glyph` into `newsym`’s I-arm.
Do **not** use memory I for fight_empty.
FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**
(comments cited `seed0014 @43789`; later D-1775 replaced those).
`glyph_is_invisible(loc)` hybrid remains in potion/zap/apply/getpos
as well as trap.js mondead — named leftover, not this SHA’s I-arm.

**Pinned-C walk this overlay.**
`csym.mjs newsym` I-arm is `display.c:1032–1033`
`glyph_is_invisible(lev->glyph)` — memory, not gbuf.
`unmap_invisible` `:387–396` same `levl.glyph`.
`hack.c:2242–2245` fight_empty uses `glyph_at` (gbuf).
Mixing those predicates is the seed0014 leftover this SHA fixed.
`uhitm.c:577–580` atk_done plants I on a living unseen forcefight
and skips the killing-blow plant.
HEAD `memory_glyph_is_invisible` reads `remembered_glyph`;
`glyph_is_invisible_id` reads `disp_glyph`.
trap.js mondead still calls the hybrid `glyph_is_invisible(loc)`.
`ridden_mon_to_glyph` usteed is later D-1784 — do not Must-fix it here.
No new RNG. Rule #2 clean.

Verdict: **ACCEPT-WITH-DEBT**
