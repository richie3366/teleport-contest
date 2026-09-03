# Review 753 — 7870c5c6 — display.h maybe_display_usteed ridden bank (D-1784)

## Metadata
- Full / short hash: `7870c5c6b27b11f3ac0dcc7025200485f056f3fc` / `7870c5c6`
- Parent: `22730962` (D-1783). This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 20:18:59 +0200
- D-id: **D-1784**
- Stats: `js/display.js` +22/−3. Total `js/` insertions **22** ≤250. Band **150–350**. C is a two-line macro — undersize exception applies.
- Claims to close: Open `ridden_mon_to_glyph` usteed. Not `reset_glyphmap` Rogue `NO_COLOR`. Review **733** named this omit.
- JS / map: `display.js` `hero_display_glyph` + `display_self`. `c-js-map/turns.md`.
- Archive **Addressed:** D-1784 `7870c5c6`.

## Intent vs deliverable

Git subject promises: Match C `display.h` `maybe_display_usteed` so a ridden steed lands in the `GLYPH_RIDDEN_*` bank, instead of a monster glyph that left `glyph_is_ridden_monster` dead.

`node scripts/csym.mjs --macro maybe_display_usteed` → `display.h:246–249`. `--macro ridden_mon_to_glyph` → `:560–562`. `display_self` `:251–260`. The commit’s `:2986–2997` citation is **`reset_glyphmap`**, not `map_glyphinfo`.

Parent painted the steed with `mon_glyph` → `GLYPH_MON_*`. The diff **does** switch `hero_display_glyph` to `ridden_mon_to_glyph` and takes wizmgender from the **steed**. It **does not** implement `map_glyphinfo` / `reset_glyphmap`. Named: Rogue `has_rogue_color` → `NO_COLOR` on ridden glyphs.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `maybe_display_usteed` | LIVE inlined | C macro; no JS symbol (correct) |
| `ridden_mon_to_glyph` | LIVE pre-existing | now **called** |
| `hero_display_glyph` / `display_self` | LIVE repaired | |
| `glyph_is_ridden_monster` | LIVE | ids can now hit it |
| `map_glyphinfo` / `reset_glyphmap` | OMIT named | Rogue color |

`node scripts/sym.mjs`:

```
maybe_display_usteed NOT FOUND   (C macro, inlined — do not add a JS clone)
ridden_mon_to_glyph js/display.js:461   sync
glyph_is_ridden_monster js/display.js:630   sync
glyph_to_mon        js/display.js:734   sync
display_self        js/display.js:1756   sync
hero_display_glyph  NOT EXPORTED — 1 LOCAL
map_glyphinfo       NOT FOUND
reset_glyphmap      NOT FOUND
```

FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**. Rule #2 **clean**. No new import edges.

## C ↔ JS fidelity

```246:260:nethack-c/upstream/include/display.h
#define maybe_display_usteed(otherwise_self)                 \
    ((u.usteed && mon_visible(u.usteed))                     \
         ? ridden_mon_to_glyph(u.usteed, rn2_on_display_rng) \
         : (otherwise_self))
```

JS: `if (steed && mon_visible(steed)) return ridden_mon_to_glyph(steed);` then the same U_AP_TYPE cascade. `ridden_mon_to_glyph` returns `GLYPH_RIDDEN_*` ids. **`glyph_is_ridden_monster` can be true.** `glyph_to_mon` ridden subtracts those offsets. **Match the macro.** Parent `mon_glyph` produced GLYPH_MON_* (pony 483 vs ridden 3165 in the commit’s female-pony probe). Same `ch`/`colour` — suite-invisible.

**Wizmgender / MG_FEMALE.** `reset_glyphmap` sets `MG_RIDDEN | MG_FEMALE`/`MG_MALE` from the **ridden bank**; ridden glyphs do **not** get `MG_PET`. JS `hg.kind === 'ridden' ? wizmgender_inverse(!!u.usteed?.female) : hero_map_attr()` is that stand-in: steed gender, **not** `hilite_pet`. **Match the live tty arm.**

**`display_monster`.** C has no usteed arm there; ridden is `display_self` only. Comment fix is correct.

**RNG.** Parent `mon_glyph` already called `mon_to_glyph(..., rn2_on_display_rng)`. Hallu still one `random_monster` draw; only the **offset** changes.

**Named rogue color.** With `has_rogue_color`, C forces ridden `NO_COLOR`. JS `show_glyph_cell` already `NO_COLOR`s when `rogue_nocolor_active()`. IBM-rogue-with-color ridden vs yellow is the named ROGUESET deferral.

**Callee closure.** LIVE: `ridden_mon_to_glyph`, `mon_visible`, `rn2_on_display_rng`. OMIT named: `reset_glyphmap` rogue. STUB: **none**. C is a two-line macro — §2b undersize exception applies.

## Hallucinations / overclaim

“Match C `maybe_display_usteed`” is true for the glyph id. “`map_glyphinfo` `:2986–2997`” is the wrong **function name** (`reset_glyphmap`); the steed-gender claim is still right. “Suite cannot distinguish them” is true (same `ch`/`color`). Do **not** stamp “Match C `reset_glyphmap`.” Stale comment still on `ridden_mon_to_glyph` (“display_self still named”) is leftover text, not a second bank.

## Density

+22. C is a two-line macro plus the attr stand-in. Playbook §2b undersize exception: **there is nothing more of this function to port.** Did not glue `reset_glyphmap`. OK.

## Verification

Commit: green+strict; 44/44; riding sessions unchanged **screens** (expected); private female-pony probe (mon id 483 vs ridden 3165). Glyph-id **public-unhit**. Admit that. This audit read the macro vs `hero_display_glyph`.

## Actionable C-wrongs

None for Must-fix. Named: `reset_glyphmap` ridden `has_rogue_color` → `NO_COLOR`. Do **not** paint the steed with `mon_to_glyph`. Do **not** use `hero_map_attr()` / `hilite_pet` on a ridden glyph. Do **not** add a `maybe_display_usteed` JS clone.
Do **not** put a steed arm in `display_monster`.
Riding sessions 0103/0104 screens unchanged is expected
(same `ch`/`colour`; only the glyph id bank moves).
Rogue `has_rogue_color` → `NO_COLOR` stays named.

**Pinned-C walk this overlay.**
`csym.mjs --macro maybe_display_usteed` → `display.h:246–249`.
`ridden_mon_to_glyph` `:560–562`.
`display_self` `:251–260`.
HEAD `hero_display_glyph` returns `ridden_mon_to_glyph(steed)` when
`mon_visible`; `display_self` takes wizmgender from
`hg.kind === 'ridden'` (steed female), not `hero_map_attr()`.
Commit probe: pony mon id 483 vs ridden 3165, same `ch`.
`map_glyphinfo` / `reset_glyphmap` still NOT FOUND.
C is a two-line macro — §2b undersize exception.
No new import edges. Rule #2 clean.

Verdict: **ACCEPT-WITH-DEBT**
