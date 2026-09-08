# Review 1028 — 61843507 — terrain browse describe (D-2058)

**SHA:** `61843507` · **D-id:** D-2058 · **Files:** `js/display.js`
(+77/−), `js/getpos.js` (+16/−)

## Intent vs deliverable

Subject promises: "reveal int-glyph threading + gather_locs MONS
displayed-glyph (queue owner def_char_is_furniture, misattributed)".
Three screen-first `#terrain` browse divergences (menu `c` =
TER_MAP|TER_TRP|TER_OBJ), toplines only, RNG fully matched both
sides, all C «branch staircase up» vs JS «unexplored area»:

- scen-kit-Archeologist-92170 step 49 (`@` back-to-hero).
- scen-normal-Knight-91100 step 104 (`m` mon-next jump).
- scen-normal-Rogue-92209 step 134 (`<` stairs-match).

Diff actually adds: int-id threading through every
`reveal_terrain_getglyph` arm (`back_to_glyph` / remembered /
trap / stone-default / UNEXPLORED), new `copy_glyph_id` helper,
`reveal_terrain_cmap_hack` id remap, and GLOC_MONS re-pointed from
live-state `look_shown_at` to `glyph_at`. Promise matches diff.
No unrelated edits.

## Inventory

| JS function | Change |
|---|---|
| `reveal_terrain_getglyph` (display.js) | id attached in full / levl / swallowed / strip / trap / seenv arms + tail |
| `reveal_terrain_cmap_hack` (display.js) | id-preserving darkroom→room, litcorr→corr remap |
| `copy_glyph_id` (display.js) | NEW file-local helper (plumbing, not C) |
| `gather_locs_interesting` GLOC_MONS (getpos.js) | live-state read → `glyph_at` + worm-tail exclusion |

## C ↔ JS fidelity

C locus `detect.c:2166–2288` (`csym` range) + tail `:2283–2287`,
and `getpos.c:437–507` (`:456–460` for MONS). Walked arm by arm:

**full arm — confirms.** C `:2194–2198`: `seenv = SVALL; glyph =
back_to_glyph(x, y); restore`. JS saves/restores `seenv` around
`back_to_glyph(x,y)` for the travelling id; ch/color still come
from `terrain_glyph` under the same SVALL window — same inputs,
same id.

**levl_glyph — confirms.** C `:2203–2205`: `hero_memory ?
levl.glyph : seenv ? back_to_glyph : default_glyph`. JS: remembered
int (`mem.glyph`, BSS-0 ≡ stone default) else `default_id`, or
`back_to_glyph`, or `default_id`. `default_id` source verified:
C `reveal_terrain` uses `arboreal ? S_tree : S_stone` (`csym`
lines 21/25); JS `arboreal ? S_TREE_CMAP : S_STONE`. Match.

**swallowed / strip arms — confirm.** C `:2210–2216`: non-swallowed
reads `glyph_at`, swallowed reads `levl_glyph`; monster/warning
strip → `levl_glyph`. JS swaps `copy_glyph` → `copy_glyph_id` on
exactly those two arms so the int survives. `copy_glyph_id` is
JS-representation plumbing (C ints travel by value; JS
{ch,color} objects drop them) — correctly classified as helper,
not clone.

**trap arm — confirms.** C `:2221`: `glyph = trap_to_glyph(t)`.
JS attaches `trap_glyph(t).glyph`; verified `trap_glyph`
(`display.js:1958`) returns `cmap_idx_to_glyph(...)` which carries
`.glyph` via `attach_glyph`. Guarded by `typeof === 'number'`.

**tail — confirms, and fixes a real gap.** C `:2283–2287`:
darkroom→room, litcorr→corr int compare. JS remaps the travelling
id identically. Unclassified cell: old JS fell back to the stone
default; C keeps `glyph_at` (GLYPH_UNEXPLORED for unseen). New JS
attaches `GLYPH_UNEXPLORED` — strictly more faithful.

**GLOC_MONS — confirms exactly.** C `getpos.c:458–460`:
`glyph_is_monster(glyph) && glyph != monnum_to_glyph(TAIL,MALE)
&& glyph != monnum_to_glyph(TAIL,FEMALE)`. JS `glyph_is_monster`
(`display.js:766`) matches the C macro disjunct-for-disjunct
(normal/pet/ridden/detected, checked against
`display.h:770–774`), and `monnum_to_glyph(m,MALE) = MALE_OFF+m`
verified (`glyph_from_mnum` returns `n + off`), so the
`(PM_LONG_WORM_TAIL|0) + GLYPH_MON_*_OFF` exclusion is arithmetic-
identical. `glyph_at` returns an int (`display.js:793`), so both
the predicate and `g|0` are sound. The old live-state read
(`look_shown_at`) is exactly why Knight-91100 jumped to an
unstripped monster — cause matches symptom.

Named deferrals (visible_region/gascloud, swallowed-ustuck-mon,
mimic M_AP_FURNITURE, wall_info recalc, GLOC_OBJS/DOOR/EXPLORE
hybrids, `def_char_is_furniture` itself) are each named in D-log +
map with the no-corpus-demand rationale. Callee closure: all LIVE
(`back_to_glyph`, `glyph_at`, `glyph_is_monster`, `attach_glyph`)
or local plumbing. No stub in any live arm. No RNG added.

## Hallucinations / overclaim

None. The misattribution is stated up front (queue owner
`def_char_is_furniture` untouched, true writers ported). The Rogue
`@174` landing (quaff-message frame ~40 steps past the browse) is
not waved through: D-log shows stash A/B (base loses 2 screens
first @134 vs fixed only @174, RNG 4527/4527 both sides) and reads
it as pre-existing-masked. That is an argued judgment with
evidence, not a hidden regression — machine verdict 0 worse.

## Density

~93 `js/` insertions, one C locus family (browse describe), one
falsifier family. Right-sized.

## Verification

Re-measured myself:

```text
node scripts/hidden-proxy.mjs verify def_char_is_furniture --base 61843507~1
verify def_char_is_furniture: 2 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-kit-Archeologist-92170: PASS
  scen-normal-Knight-91100: PASS
  scen-normal-Rogue-92209: moved → peffect_sickness at step 174 (was 134)
```

Identical to the D-log claim. Full 44/44 ran (shared file
changed) per D-log. `imports.mjs --rulecheck` clean at HEAD.
Diff grep: no FORCE/DIAG/RNG-log/seed/coordinate gates. The
intermediate display-only A/B round documented in the D-log shows
the gather_locs hunk was localized, not guessed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
